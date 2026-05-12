"use client";

import { FormEvent, useMemo, useState } from "react";
import { Badge, Button, Card } from "@/components";
import { caminoModes, type CaminoModeId } from "@/lib/ai/modes";

type ChatMessage = {
  content: string;
  role: "user" | "assistant";
};

type ChatClientProps = {
  initialMode: CaminoModeId;
};

export function ChatClient({ initialMode }: ChatClientProps) {
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [content, setContent] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      content: "Estoy aca. Contame que estas cargando hoy, con tus palabras y sin apuro.",
      role: "assistant",
    },
  ]);
  const [mode, setMode] = useState<CaminoModeId>(initialMode);
  const [error, setError] = useState("");
  const [showCrisisHelp, setShowCrisisHelp] = useState(false);

  const selectedMode = useMemo(
    () => caminoModes.find((item) => item.id === mode) ?? caminoModes[0],
    [mode],
  );

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const text = content.trim();

    if (!text || isSending) {
      return;
    }

    setError("");
    setContent("");
    setIsSending(true);
    setMessages((current) => [...current, { content: text, role: "user" }]);

    try {
      const response = await fetch("/api/chat", {
        body: JSON.stringify({
          content: text,
          conversationId,
          mode,
        }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      });

      const data = (await response.json()) as {
        content?: string;
        conversationId?: string;
        crisis?: boolean;
        error?: string;
      };

      if (!response.ok) {
        throw new Error(data.error ?? "No pudimos enviar el mensaje.");
      }

      if (data.conversationId) {
        setConversationId(data.conversationId);
      }

      if (data.crisis) {
        setShowCrisisHelp(true);
      }

      setMessages((current) => [
        ...current,
        { content: data.content ?? "Estoy con vos. Probemos de nuevo en un momento.", role: "assistant" },
      ]);
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : "Ocurrio un error inesperado.");
    } finally {
      setIsSending(false);
    }
  }

  return (
    <div className="mt-10 grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
      <Card>
        <Badge tone="olive">Modo</Badge>
        <h2 className="mt-4 text-2xl font-semibold">{selectedMode.label}</h2>
        <p className="mt-3 text-sm leading-6 text-white/64">{selectedMode.guidance}</p>
        <div className="mt-6 grid gap-2">
          {caminoModes.map((item) => (
            <button
              className={
                item.id === mode
                  ? "rounded-md border border-[#d9b45f]/50 bg-[#d9b45f]/18 px-4 py-3 text-left text-sm font-semibold text-[#f4dfaa]"
                  : "rounded-md border border-white/10 bg-white/[0.055] px-4 py-3 text-left text-sm text-white/70 transition hover:bg-white/[0.09]"
              }
              key={item.id}
              onClick={() => setMode(item.id)}
              type="button"
            >
              {item.label}
            </button>
          ))}
        </div>
      </Card>

      <Card className="grid min-h-[640px] grid-rows-[1fr_auto] gap-5">
        <div className="space-y-4 overflow-y-auto pr-1">
          {messages.map((message, index) => (
            <div
              className={
                message.role === "user"
                  ? "ml-auto max-w-[85%] rounded-lg bg-[#d9b45f] px-4 py-3 text-sm leading-6 text-[#111827]"
                  : "mr-auto max-w-[88%] rounded-lg border border-white/10 bg-white/[0.07] px-4 py-3 text-sm leading-6 text-white/78"
              }
              key={`${message.role}-${index}`}
            >
              {message.content}
            </div>
          ))}
          {isSending ? (
            <div className="mr-auto max-w-[88%] rounded-lg border border-white/10 bg-white/[0.07] px-4 py-3 text-sm text-white/60">
              Camino esta respondiendo...
            </div>
          ) : null}
        </div>

        <div>
          {showCrisisHelp ? (
            <a
              className="mb-4 block rounded-md border border-[#ef7979]/35 bg-[#ef7979]/15 px-4 py-3 text-center text-sm font-semibold text-[#ffd7d7]"
              href="tel:911"
            >
              Necesito ayuda ahora
            </a>
          ) : null}
          {error ? (
            <div className="mb-4 rounded-md border border-[#ef7979]/35 bg-[#ef7979]/14 px-4 py-3 text-sm text-[#ffd7d7]">
              {error}
            </div>
          ) : null}
          <form className="grid gap-3" onSubmit={handleSubmit}>
            <textarea
              className="min-h-28 resize-none rounded-md border border-white/14 bg-white/9 px-4 py-3 text-sm text-[#fffaf0] outline-none transition placeholder:text-white/38 focus:border-[#d9b45f]/70 focus:ring-2 focus:ring-[#d9b45f]/20"
              onChange={(event) => setContent(event.target.value)}
              placeholder="Escribi lo que estas sintiendo..."
              value={content}
            />
            <Button disabled={isSending} type="submit">
              Enviar
            </Button>
          </form>
        </div>
      </Card>
    </div>
  );
}
