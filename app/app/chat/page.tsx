import { AppShell, PageHeader } from "@/components";
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
      <PageHeader
        description="Un espacio para hablar con calma, ordenar lo que sentis y encontrar un proximo paso pequeno."
        eyebrow="Chat"
        title="Hablar con la guia Camino"
      />
      <ChatClient initialMode={mode.id} />
    </AppShell>
  );
}
