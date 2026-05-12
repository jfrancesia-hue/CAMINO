"use client";

import { FormEvent, useMemo, useState } from "react";
import { Badge, Button } from "@/components";
import { caminoModes, type CaminoModeId } from "@/lib/ai/modes";

type ChatMessage = {
  content: string;
  role: "user" | "assistant";
};

type ChatClientProps = {
  initialMode: CaminoModeId;
};

const modeMarks: Record<CaminoModeId, string> = {
  paz: "I",
  fe: "II",
  proposito: "III",
  relaciones: "IV",
  noche: "V",
  descargo: "VI",
  gratitud: "VII",
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
    <div className="mt-8 grid gap-5 lg:grid-cols-[0.78fr_1.22fr]">
      <aside className="relative overflow-hidden rounded-[28px] border border-[#f6dfa2]/20 bg-[#fff8e8]/92 p-5 text-[#101b36] shadow-[0_26px_90px_rgba(0,0,0,0.28)]">
        <div className="absolute inset-x-0 top-0 h-2 bg-[linear-gradient(90deg,#7f2437,#d7ad4f,#11a7a7,#0c2147)]" />
        <div className="absolute right-[-6rem] top-12 h-56 w-56 rounded-full bg-[#d7ad4f]/22 blur-3xl" />
        <div className="relative">
          <Badge tone="olive">Modo espiritual</Badge>
          <h2 className="serif-display mt-4 text-4xl leading-tight">{selectedMode.label}</h2>
          <p className="mt-3 text-sm leading-6 text-[#101b36]/66">{selectedMode.guidance}</p>
          <div className="mt-6 grid gap-2">
            {caminoModes.map((item) => (
              <button
                className={
                  item.id === mode
                    ? "group flex items-center gap-3 rounded-2xl border border-[#d7ad4f]/70 bg-[#0c2147] px-3 py-3 text-left text-sm font-semibold text-[#f6dfa2] shadow-[0_18px_42px_rgba(12,33,71,0.24)]"
                    : "group flex items-center gap-3 rounded-2xl border border-[#d7ad4f]/18 bg-white/58 px-3 py-3 text-left text-sm font-semibold text-[#101b36]/70 transition hover:border-[#d7ad4f]/52 hover:bg-[#f6dfa2]/42 hover:text-[#101b36]"
                }
                key={item.id}
                onClick={() => setMode(item.id)}
                type="button"
              >
                <span
                  className={
                    item.id === mode
                      ? "inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#d7ad4f] text-xs font-black text-[#101b36]"
                      : "inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#d7ad4f]/34 bg-[#fff8e8] text-xs font-black text-[#7f2437]"
                  }
                >
                  {modeMarks[item.id]}
                </span>
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </aside>

      <section className="relative grid min-h-[680px] overflow-hidden rounded-[28px] border border-[#f6dfa2]/22 bg-[#070d1c] shadow-[0_30px_100px_rgba(0,0,0,0.34)]">
        <img
          alt="Interior calido de iglesia"
          className="absolute inset-0 h-full w-full object-cover opacity-[0.18]"
          src="https://images.unsplash.com/photo-1522441815192-d9f04eb0615c?auto=format&fit=crop&w=1600&q=88"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_18%,rgba(215,173,79,0.22),transparent_18rem),radial-gradient(circle_at_82%_34%,rgba(17,167,167,0.18),transparent_20rem),linear-gradient(180deg,rgba(7,13,28,0.72),rgba(7,13,28,0.96))]" />
        <div className="relative grid min-h-[680px] grid-rows-[auto_1fr_auto]">
          <div className="border-b border-[#f6dfa2]/16 px-5 py-4 sm:px-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#f6dfa2]/70">Acompanamiento</p>
                <h2 className="serif-display mt-1 text-3xl text-[#fff8e8]">Camino escucha</h2>
              </div>
              <span className="rounded-full border border-[#d7ad4f]/38 bg-[#d7ad4f]/16 px-4 py-2 text-xs font-semibold text-[#f6dfa2]">
                {selectedMode.label}
              </span>
            </div>
          </div>

          <div className="space-y-4 overflow-y-auto px-5 py-6 sm:px-6">
            {messages.map((message, index) => (
              <div
                className={
                  message.role === "user"
                    ? "ml-auto max-w-[85%] rounded-[22px] rounded-br-md bg-[#d7ad4f] px-5 py-4 text-sm leading-6 text-[#101b36] shadow-[0_16px_44px_rgba(215,173,79,0.18)]"
                    : "mr-auto max-w-[88%] rounded-[22px] rounded-bl-md border border-[#f6dfa2]/18 bg-[#fff8e8]/10 px-5 py-4 text-sm leading-6 text-[#fff8e8]/82 backdrop-blur-md"
                }
                key={`${message.role}-${index}`}
              >
                {message.content}
              </div>
            ))}
            {isSending ? (
              <div className="mr-auto max-w-[88%] rounded-[22px] rounded-bl-md border border-[#f6dfa2]/18 bg-[#fff8e8]/10 px-5 py-4 text-sm text-[#fff8e8]/62 backdrop-blur-md">
                Camino esta respondiendo...
              </div>
            ) : null}
          </div>

          <div className="border-t border-[#f6dfa2]/16 bg-[#070d1c]/76 px-5 py-5 backdrop-blur-xl sm:px-6">
            {showCrisisHelp ? (
              <a
                className="mb-4 block rounded-2xl border border-[#ef7979]/42 bg-[#ef7979]/18 px-4 py-3 text-center text-sm font-semibold text-[#ffd7d7]"
                href="tel:911"
              >
                Necesito ayuda ahora
              </a>
            ) : null}
            {error ? (
              <div className="mb-4 rounded-2xl border border-[#ef7979]/35 bg-[#ef7979]/14 px-4 py-3 text-sm text-[#ffd7d7]">
                {error}
              </div>
            ) : null}
            <form className="grid gap-3" onSubmit={handleSubmit}>
              <textarea
                className="min-h-28 resize-none rounded-2xl border border-[#f6dfa2]/22 bg-[#fff8e8] px-4 py-3 text-sm leading-6 text-[#101b36] outline-none transition placeholder:text-[#101b36]/42 focus:border-[#d7ad4f] focus:ring-2 focus:ring-[#d7ad4f]/28"
                onChange={(event) => setContent(event.target.value)}
                placeholder="Escribi lo que estas sintiendo..."
                value={content}
              />
              <Button disabled={isSending} type="submit">
                Enviar mensaje
              </Button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
