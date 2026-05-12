import { AppShell, Badge } from "@/components";
import { ChatClient } from "@/app/app/chat/chat-client";
import { getModeById } from "@/lib/ai/modes";

type ChatPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

export default async function ChatPage({ searchParams }: ChatPageProps) {
  const params = await searchParams;
  const rawMode = typeof params?.mode === "string" ? params.mode : "paz";
  const mode = getModeById(rawMode);

  return (
    <AppShell>
      <section className="relative overflow-hidden rounded-[32px] border border-[#f6dfa2]/24 bg-[#070d1c] p-7 shadow-[0_34px_120px_rgba(0,0,0,0.34)] sm:p-10">
        <img
          alt="Luz entrando por vitrales de una iglesia"
          className="absolute inset-0 h-full w-full object-cover opacity-[0.46]"
          src="https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=1800&q=88"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,13,28,0.94),rgba(12,33,71,0.68),rgba(43,16,38,0.82)),linear-gradient(180deg,transparent,#070d1c)]" />
        <div className="relative max-w-3xl">
          <Badge>Chat Camino</Badge>
          <h1 className="serif-display mt-5 text-5xl leading-tight sm:text-6xl">
            Habla con calma. Volvemos a poner luz donde hay ruido.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-white/72">
            Un espacio sereno para ordenar lo que sentis, respirar y encontrar un proximo paso pequeno con fe y humanidad.
          </p>
        </div>
      </section>
      <ChatClient initialMode={mode.id} />
    </AppShell>
  );
}
