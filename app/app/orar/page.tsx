import { AppShell, Badge, Card, LinkButton } from "@/components";
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
      <section className="relative overflow-hidden rounded-[30px] border border-[#f6dfa2]/28 bg-[#070d1c] p-7 shadow-[0_34px_120px_rgba(0,0,0,0.34)] sm:p-10">
        <img
          alt="Velas encendidas en una iglesia"
          className="absolute inset-0 h-full w-full object-cover opacity-[0.54]"
          src="https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=1800&q=88"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,13,28,0.94),rgba(12,33,71,0.58),rgba(7,13,28,0.76)),linear-gradient(180deg,transparent,#070d1c)]" />
        <div className="relative max-w-3xl">
          <Badge>Orar</Badge>
          <h1 className="serif-display mt-5 text-5xl leading-tight sm:text-6xl">
            Respira. Encende una pequena luz por dentro.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-white/72">
            Oraciones guiadas para ansiedad, gratitud, noche, perdon, proposito y decisiones. Sin apuro, sin exigencia, con fe.
          </p>
        </div>
      </section>
      {loadError ? (
        <Card className="mt-8 border-[#d7ad4f]/28 bg-[#fff8e8]/92 text-[#101b36]">
          <Badge tone="neutral">Pendiente</Badge>
          <p className="mt-5 text-sm leading-6 text-[#101b36]/68">{loadError}</p>
        </Card>
      ) : null}
      <section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {prayers.map((prayer) => (
          <a
            className="group overflow-hidden rounded-[24px] border border-[#f6dfa2]/18 bg-[#fff8e8]/92 text-[#101b36] shadow-[0_22px_70px_rgba(0,0,0,0.22)] transition hover:-translate-y-1 hover:shadow-[0_28px_90px_rgba(215,173,79,0.18)]"
            href={`/app/orar/${prayer.id}`}
            key={prayer.id}
          >
            <div className="h-2 bg-[linear-gradient(90deg,#d7ad4f,#f0b429,#11a7a7)]" />
            <div className="p-6">
              <Badge tone="olive">{prayer.category}</Badge>
              <h2 className="serif-display mt-4 text-3xl leading-tight">{prayer.title}</h2>
              <p className="mt-3 text-sm text-[#101b36]/58">{prayer.duration ?? "3 min"}</p>
              <p className="mt-5 text-sm font-semibold text-[#7f2437] transition group-hover:text-[#101b36]">
                Entrar en oracion
              </p>
            </div>
          </a>
        ))}
        {!loadError && prayers.length === 0 ? (
          <Card className="col-span-full border-[#d7ad4f]/24 bg-[#fff8e8]/92 text-[#101b36]">
            <Badge tone="neutral">Sin oraciones cargadas</Badge>
            <h2 className="serif-display mt-4 text-3xl">La capilla esta lista.</h2>
            <p className="mt-3 text-sm leading-6 text-[#101b36]/64">
              Cuando apliquemos la migracion de oraciones, este espacio se llenara con guias para cada momento.
            </p>
            <LinkButton className="mt-6" href="/app" variant="secondary">
              Volver al inicio
            </LinkButton>
          </Card>
        ) : null}
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
