import { startPathAction } from "@/app/app/caminos/actions";
import { AppShell, Badge, Button, Card, PageHeader } from "@/components";
import { createSupabaseServerClient } from "@/lib/supabase/server";

type GuidedPath = {
  category: string;
  description: string;
  duration_days: number;
  id: string;
  title: string;
  user_path_progress?: Array<{ completed: boolean; current_day: number }>;
};

type PathsPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

export default async function PathsPage({ searchParams }: PathsPageProps) {
  const params = await searchParams;
  const error = typeof params?.error === "string" ? params.error : "";
  const { loadError, paths } = await getGuidedPaths();

  return (
    <AppShell>
      <PageHeader
        description="Procesos guiados de varios dias para paz, ansiedad, autoestima, perdon y proposito."
        eyebrow="Caminos"
        title="Caminos guiados"
      />
      {error ? (
        <Card className="mt-10 border-[#ef7979]/35 bg-[#ef7979]/14">
          <p className="text-sm text-[#ffd7d7]">{error}</p>
        </Card>
      ) : null}
      {loadError ? (
        <Card className="mt-10">
          <Badge tone="neutral">Pendiente</Badge>
          <p className="mt-5 text-sm leading-6 text-white/68">{loadError}</p>
        </Card>
      ) : null}
      <section className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {paths.map((path) => {
          const progress = path.user_path_progress?.[0];

          return (
            <Card className="flex min-h-72 flex-col" key={path.id}>
              <Badge tone="olive">{path.category}</Badge>
              <h2 className="mt-4 text-xl font-semibold">{path.title}</h2>
              <p className="mt-3 flex-1 text-sm leading-6 text-white/62">{path.description}</p>
              <p className="mt-4 text-xs text-white/48">{path.duration_days} dias</p>
              {progress ? (
                <a className="mt-5 rounded-md border border-[#d9b45f]/35 px-4 py-3 text-center text-sm font-semibold text-[#f4dfaa] transition hover:bg-[#d9b45f]/12" href={`/app/caminos/${path.id}`}>
                  Dia {progress.current_day} {progress.completed ? "- completo" : ""}
                </a>
              ) : (
                <form action={startPathAction} className="mt-5">
                  <input name="path_id" type="hidden" value={path.id} />
                  <Button className="w-full" type="submit">Iniciar camino</Button>
                </form>
              )}
            </Card>
          );
        })}
      </section>
    </AppShell>
  );
}

async function getGuidedPaths(): Promise<{ loadError: string; paths: GuidedPath[] }> {
  try {
    const supabase = await createSupabaseServerClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { data, error } = await supabase
      .from("guided_paths")
      .select("id,title,description,duration_days,category,user_path_progress(current_day,completed)")
      .order("duration_days");

    if (error || !user) {
      return { loadError: "No pudimos cargar caminos. Revisa que la migracion este aplicada.", paths: [] };
    }

    return { loadError: "", paths: data ?? [] };
  } catch {
    return { loadError: "Supabase no esta configurado todavia. Los caminos quedan listos al conectar la base.", paths: [] };
  }
}
