"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { detectCrisis } from "@/lib/safety/crisisDetection";
import { createSupabaseServerClient } from "@/lib/supabase/server";

const blockedWords = ["insulto-grave-demo", "odio-demo"];

function communityError(message: string): never {
  redirect(`/app/comunidad?error=${encodeURIComponent(message)}`);
}

export async function createPrayerRequestAction(formData: FormData) {
  const content = String(formData.get("content") ?? "").trim();
  const isPublic = formData.get("is_public") === "on";

  if (content.length < 8) {
    communityError("Escribi un pedido un poco mas claro.");
  }

  if (blockedWords.some((word) => content.toLowerCase().includes(word))) {
    communityError("El pedido contiene contenido que necesita moderacion.");
  }

  const crisis = detectCrisis(content);

  try {
    const supabase = await createSupabaseServerClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      redirect("/login");
    }

    if (crisis.flag === "crisis") {
      await supabase.from("crisis_events").insert({
        action_taken: "community_request_blocked_and_crisis_protocol",
        detected_risk: crisis.risk ?? "unknown",
        message: content,
        user_id: user.id,
      });
      communityError("Este pedido parece urgente. Por favor busca ayuda inmediata de una persona de confianza o emergencias.");
    }

    const { error } = await supabase.from("prayer_requests").insert({
      content,
      is_public: isPublic,
      status: "active",
      user_id: user.id,
    });

    if (error) {
      communityError("No pudimos guardar el pedido.");
    }
  } catch {
    communityError("Supabase no esta configurado todavia o falta aplicar la migracion de comunidad.");
  }

  revalidatePath("/app/comunidad");
  redirect("/app/comunidad");
}
