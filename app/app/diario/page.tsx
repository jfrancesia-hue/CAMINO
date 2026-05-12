import { AppShell, Badge, Button, Card, Input, LinkButton, PageHeader, Textarea } from "@/components";
import { createJournalEntryAction } from "@/app/app/diario/actions";
import { createSupabaseServerClient } from "@/lib/supabase/server";

type JournalEntry = {
  content: string;
  created_at: string;
  emotion: string | null;
  id: string;
  spiritual_topic: string | null;
  title: string;
};

const emotions = ["ansiedad", "paz", "tristeza", "gratitud", "confusion", "esperanza"];

type JournalPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

export default async function JournalPage({ searchParams }: JournalPageProps) {
  const params = await searchParams;
  const selectedEmotion = typeof params?.emotion === "string" ? params.emotion : "";
  const error = typeof params?.error === "string" ? params.error : "";
  const { entries, loadError } = await getJournalEntries(selectedEmotion);

  return (
    <AppShell>
      <PageHeader
        description="Un lugar privado para escribir, soltar y mirar el dia con honestidad."
        eyebrow="Diario"
        title="Tu diario emocional"
      />
      <section className="mt-10 grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <Card>
          <Badge tone="olive">Nueva entrada</Badge>
          {error ? (
            <div className="mt-5 rounded-md border border-[#ef7979]/35 bg-[#ef7979]/14 px-4 py-3 text-sm text-[#ffd7d7]">
              {error}
            </div>
          ) : null}
          <form action={createJournalEntryAction} className="mt-6 grid gap-4">
            <Input id="title" label="Titulo" name="title" placeholder="Que nombre tiene este momento?" required />
            <Input id="emotion" label="Emocion" name="emotion" placeholder="ansiedad, paz, gratitud..." />
            <Input id="spiritual_topic" label="Tema espiritual" name="spiritual_topic" placeholder="fe, perdon, proposito..." />
            <Textarea
              id="content"
              label="Entrada"
              name="content"
              placeholder="Que sentiste hoy? Que necesitas soltar? Que te gustaria pedirle a Dios?"
              required
            />
            <Button type="submit">Guardar entrada</Button>
          </form>
        </Card>

        <div>
          <div className="mb-4 flex flex-wrap gap-2">
            <LinkButton href="/app/diario" size="sm" variant={selectedEmotion ? "secondary" : "primary"}>
              Todas
            </LinkButton>
            {emotions.map((emotion) => (
              <LinkButton
                href={`/app/diario?emotion=${encodeURIComponent(emotion)}`}
                key={emotion}
                size="sm"
                variant={selectedEmotion === emotion ? "primary" : "secondary"}
              >
                {emotion}
              </LinkButton>
            ))}
          </div>

          {loadError ? (
            <Card>
              <Badge tone="neutral">Pendiente</Badge>
              <p className="mt-5 text-sm leading-6 text-white/68">{loadError}</p>
            </Card>
          ) : null}

          <div className="grid gap-4">
            {entries.map((entry) => (
              <a className="rounded-lg border border-white/12 bg-white/[0.06] p-5 transition hover:bg-white/[0.09]" href={`/app/diario/${entry.id}`} key={entry.id}>
                <div className="flex flex-wrap items-center gap-2">
                  {entry.emotion ? <Badge tone="sky">{entry.emotion}</Badge> : null}
                  {entry.spiritual_topic ? <Badge tone="olive">{entry.spiritual_topic}</Badge> : null}
                </div>
                <h2 className="mt-4 text-xl font-semibold">{entry.title}</h2>
                <p className="mt-3 line-clamp-2 text-sm leading-6 text-white/62">{entry.content}</p>
                <p className="mt-4 text-xs text-white/42">{new Date(entry.created_at).toLocaleDateString("es")}</p>
              </a>
            ))}
            {!loadError && entries.length === 0 ? (
              <Card className="overflow-hidden border-[#d7ad4f]/24 bg-[#fff8e8]/92 p-0 text-[#101b36]">
                <div className="h-2 bg-[linear-gradient(90deg,#7f2437,#d7ad4f,#11a7a7)]" />
                <div className="p-6">
                  <Badge tone="neutral">Sin entradas</Badge>
                  <h2 className="serif-display mt-4 text-3xl">Tu cuaderno esta abierto.</h2>
                  <p className="mt-3 text-sm leading-6 text-[#101b36]/64">
                    Empeza con una frase honesta y pequena. A veces una linea alcanza para volver a respirar.
                  </p>
                </div>
              </Card>
            ) : null}
          </div>
        </div>
      </section>
    </AppShell>
  );
}

async function getJournalEntries(emotion: string): Promise<{ entries: JournalEntry[]; loadError: string }> {
  try {
    const supabase = await createSupabaseServerClient();
    let query = supabase
      .from("journal_entries")
      .select("id,title,content,emotion,spiritual_topic,created_at")
      .order("created_at", { ascending: false });

    if (emotion) {
      query = query.eq("emotion", emotion);
    }

    const { data, error } = await query;

    if (error) {
      return {
        entries: [],
        loadError: "No pudimos cargar el diario. Revisa que la migracion este aplicada.",
      };
    }

    return {
      entries: data ?? [],
      loadError: "",
    };
  } catch {
    return {
      entries: [],
      loadError: "Supabase no esta configurado todavia. El diario queda listo para funcionar al conectar la base.",
    };
  }
}
