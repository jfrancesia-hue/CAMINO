import { NextResponse } from "next/server";
import OpenAI from "openai";
import { buildCaminoSystemPrompt } from "@/lib/ai/systemPrompt";
import { getModeById } from "@/lib/ai/modes";
import { CRISIS_RESPONSE, detectCrisis } from "@/lib/safety/crisisDetection";
import { createSupabaseServerClient } from "@/lib/supabase/server";

type ChatRequest = {
  content?: string;
  conversationId?: string | null;
  mode?: string;
};

export async function POST(request: Request) {
  const body = (await request.json()) as ChatRequest;
  const content = body.content?.trim() ?? "";
  const mode = getModeById(body.mode);

  if (!content) {
    return NextResponse.json({ error: "El mensaje no puede estar vacio." }, { status: 400 });
  }

  let supabase;

  try {
    supabase = await createSupabaseServerClient();
  } catch {
    return NextResponse.json(
      { error: "Supabase no esta configurado en el servidor." },
      { status: 503 },
    );
  }
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Necesitas iniciar sesion." }, { status: 401 });
  }

  let conversationId = body.conversationId ?? null;

  if (conversationId) {
    const { data: existing } = await supabase
      .from("conversations")
      .select("id")
      .eq("id", conversationId)
      .eq("user_id", user.id)
      .maybeSingle();

    if (!existing) {
      return NextResponse.json({ error: "Conversacion no encontrada." }, { status: 404 });
    }
  } else {
    const { data, error } = await supabase
      .from("conversations")
      .insert({
        mode: mode.id,
        title: content.slice(0, 72),
        user_id: user.id,
      })
      .select("id")
      .single();

    if (error || !data) {
      return NextResponse.json({ error: "No pudimos crear la conversacion." }, { status: 500 });
    }

    conversationId = data.id;
  }

  const crisis = detectCrisis(content);

  const { error: userMessageError } = await supabase.from("messages").insert({
    content,
    conversation_id: conversationId,
    role: "user",
    safety_flag: crisis.risk,
    user_id: user.id,
  });

  if (userMessageError) {
    return NextResponse.json({ error: "No pudimos guardar tu mensaje." }, { status: 500 });
  }

  if (crisis.flag === "crisis") {
    await supabase.from("crisis_events").insert({
      action_taken: "crisis_protocol_response_shown",
      detected_risk: crisis.risk ?? "unknown",
      message: content,
      user_id: user.id,
    });

    await supabase.from("messages").insert({
      content: CRISIS_RESPONSE,
      conversation_id: conversationId,
      role: "assistant",
      safety_flag: "crisis_protocol",
      user_id: user.id,
    });

    return NextResponse.json({
      content: CRISIS_RESPONSE,
      conversationId,
      crisis: true,
      safetyFlag: crisis.risk,
    });
  }

  const apiKey = process.env.OPENAI_API_KEY;
  const model = process.env.OPENAI_MODEL;

  if (!apiKey || !model) {
    return NextResponse.json(
      { error: "Falta configurar OPENAI_API_KEY u OPENAI_MODEL en el servidor." },
      { status: 503 },
    );
  }

  const { data: previousMessages } = await supabase
    .from("messages")
    .select("role, content")
    .eq("conversation_id", conversationId)
    .order("created_at", { ascending: false })
    .limit(12);

  const history = [...(previousMessages ?? [])].reverse().map((message) => ({
    content: String(message.content),
    role: message.role === "assistant" ? ("assistant" as const) : ("user" as const),
  }));

  let answer = "";

  try {
    const openai = new OpenAI({ apiKey });
    const completion = await openai.chat.completions.create({
      messages: [
        { content: buildCaminoSystemPrompt(mode.id), role: "system" },
        ...history,
      ],
      model,
      temperature: 0.7,
    });

    answer = completion.choices[0]?.message.content?.trim() ?? "";
  } catch {
    return NextResponse.json({ error: "OpenAI no pudo generar una respuesta." }, { status: 502 });
  }

  if (!answer) {
    return NextResponse.json({ error: "La IA no devolvio respuesta." }, { status: 502 });
  }

  await supabase.from("messages").insert({
    content: answer,
    conversation_id: conversationId,
    role: "assistant",
    safety_flag: null,
    user_id: user.id,
  });

  return NextResponse.json({
    content: answer,
    conversationId,
    crisis: false,
    safetyFlag: null,
  });
}
