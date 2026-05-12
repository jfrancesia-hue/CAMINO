import { notFound } from "next/navigation";
import { deleteJournalEntryAction } from "@/app/app/diario/actions";
import { AppShell, Badge, Button, Card, LinkButton, PageHeader } from "@/components";
import { createSupabaseServerClient } from "@/lib/supabase/server";

type JournalEntry = {
  content: string;
  created_at: string;
  emotion: string | null;
  id: string;
  spiritual_topic: string | null;
  title: string;
};

type JournalDetailPageProps = {
  params: Promise<{ id: string }>;
};

export default async function JournalDetailPage({ params }: JournalDetailPageProps) {
  const { id } = await params;
  const entry = await getJournalEntry(id);

  if (!entry) {
    notFound();
  }

  return (
    <AppShell>
      <PageHeader
        action={
          <LinkButton href="/app/diario" variant="secondary">
            Volver
          </LinkButton>
        }
        description={new Date(entry.created_at).toLocaleDateString("es")}
        eyebrow="Diario"
        title={entry.title}
      />
      <Card className="mt-10">
        <div className="flex flex-wrap gap-2">
          {entry.emotion ? <Badge tone="sky">{entry.emotion}</Badge> : null}
          {entry.spiritual_topic ? <Badge tone="olive">{entry.spiritual_topic}</Badge> : null}
        </div>
        <p className="mt-6 whitespace-pre-wrap text-base leading-8 text-white/76">{entry.content}</p>
        <form action={deleteJournalEntryAction} className="mt-8">
          <input name="id" type="hidden" value={entry.id} />
          <Button type="submit" variant="danger">
            Eliminar entrada
          </Button>
        </form>
      </Card>
    </AppShell>
  );
}

async function getJournalEntry(id: string): Promise<JournalEntry | null> {
  try {
    const supabase = await createSupabaseServerClient();
    const { data } = await supabase
      .from("journal_entries")
      .select("id,title,content,emotion,spiritual_topic,created_at")
      .eq("id", id)
      .maybeSingle();

    return data;
  } catch {
    return null;
  }
}
