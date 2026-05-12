import { AppShell, Badge, Card, PageHeader } from "@/components";
import { createSupabaseServerClient } from "@/lib/supabase/server";

type Prayer = {
  category: string;
  duration: string | null;
  id: string;
  title: string;
};

export default async function PrayPage() {
  const { loadError, prayers } = await getPrayers();

  return (
    <AppShell>
      <PageHeader
        description="Oraciones guiadas para ansiedad, gratitud, noche, perdon, proposito y decisiones."
        eyebrow="Orar"
        title="Respirar y orar unos minutos"
      />
      {loadError ? (
        <Card className="mt-10">
          <Badge tone="neutral">Pendiente</Badge>
          <p className="mt-5 text-sm leading-6 text-white/68">{loadError}</p>
        </Card>
      ) : null}
      <section className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {prayers.map((prayer) => (
          <a className="rounded-lg border border-white/12 bg-white/[0.06] p-5 transition hover:bg-white/[0.09]" href={`/app/orar/${prayer.id}`} key={prayer.id}>
            <Badge tone="olive">{prayer.category}</Badge>
            <h2 className="mt-4 text-xl font-semibold">{prayer.title}</h2>
            <p className="mt-3 text-sm text-white/58">{prayer.duration ?? "3 min"}</p>
          </a>
        ))}
      </section>
    </AppShell>
  );
}

async function getPrayers(): Promise<{ loadError: string; prayers: Prayer[] }> {
  try {
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase
      .from("prayers")
      .select("id,title,category,duration")
      .order("category");

    if (error) {
      return { loadError: "No pudimos cargar oraciones. Revisa que la migracion este aplicada.", prayers: [] };
    }

    return { loadError: "", prayers: data ?? [] };
  } catch {
    return { loadError: "Supabase no esta configurado todavia. Las oraciones quedan listas al conectar la base.", prayers: [] };
  }
}
