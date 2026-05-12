import { AppShell, Badge, Card, PageHeader } from "@/components";
import { createSupabaseServerClient } from "@/lib/supabase/server";

type Reflection = {
  category: string;
  id: string;
  question: string;
  title: string;
  verse: string;
};

export default async function ReflectionsPage() {
  const { loadError, reflections } = await getReflections();

  return (
    <AppShell>
      <PageHeader
        description="Lecturas diarias con versiculo, explicacion simple, pregunta y accion concreta."
        eyebrow="Reflexiones"
        title="Reflexiones para caminar el dia"
      />
      {loadError ? (
        <Card className="mt-10">
          <Badge tone="neutral">Pendiente</Badge>
          <p className="mt-5 text-sm leading-6 text-white/68">{loadError}</p>
        </Card>
      ) : null}
      <section className="mt-10 grid gap-4 sm:grid-cols-2">
        {reflections.map((reflection) => (
          <a className="rounded-lg border border-white/12 bg-white/[0.06] p-5 transition hover:bg-white/[0.09]" href={`/app/reflexiones/${reflection.id}`} key={reflection.id}>
            <div className="flex flex-wrap gap-2">
              <Badge tone="sky">{reflection.category}</Badge>
              <Badge tone="olive">{reflection.verse}</Badge>
            </div>
            <h2 className="mt-4 text-xl font-semibold">{reflection.title}</h2>
            <p className="mt-3 text-sm leading-6 text-white/62">{reflection.question}</p>
          </a>
        ))}
      </section>
    </AppShell>
  );
}

async function getReflections(): Promise<{ loadError: string; reflections: Reflection[] }> {
  try {
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase
      .from("daily_reflections")
      .select("id,title,verse,question,category")
      .order("created_at", { ascending: false });

    if (error) {
      return { loadError: "No pudimos cargar reflexiones. Revisa que la migracion este aplicada.", reflections: [] };
    }

    return { loadError: "", reflections: data ?? [] };
  } catch {
    return { loadError: "Supabase no esta configurado todavia. Las reflexiones quedan listas al conectar la base.", reflections: [] };
  }
}
