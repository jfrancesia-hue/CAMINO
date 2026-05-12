import { notFound } from "next/navigation";
import { completePathDayAction, startPathAction } from "@/app/app/caminos/actions";
import { AppShell, Badge, Button, Card, LinkButton, PageHeader } from "@/components";
import { createSupabaseServerClient } from "@/lib/supabase/server";

type PathDetail = {
  category: string;
  description: string;
  duration_days: number;
  guided_path_days: Array<{
    content: string;
    day_number: number;
    exercise: string | null;
    prayer: string | null;
    title: string;
    verse: string | null;
  }>;
  id: string;
  title: string;
  user_path_progress?: Array<{ completed: boolean; current_day: number }>;
};

type PathDetailPageProps = {
  params: Promise<{ id: string }>;
};

export default async function PathDetailPage({ params }: PathDetailPageProps) {
  const { id } = await params;
  const path = await getPathDetail(id);

  if (!path) {
    notFound();
  }

  const progress = path.user_path_progress?.[0];
  const currentDay = progress?.current_day ?? 1;
  const day = path.guided_path_days.find((item) => item.day_number === currentDay) ?? path.guided_path_days[0];

  return (
    <AppShell>
      <PageHeader
        action={<LinkButton href="/app/caminos" variant="secondary">Volver</LinkButton>}
        description={path.description}
        eyebrow="Camino guiado"
        title={path.title}
      />
      <section className="mt-10 grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
        <Card>
          <Badge tone="olive">{path.category}</Badge>
          <p className="mt-5 text-sm leading-6 text-white/66">
            Dia {currentDay} de {path.duration_days}
          </p>
          <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/10">
            <div className="h-full rounded-full bg-[#d9b45f]" style={{ width: `${Math.min((currentDay / path.duration_days) * 100, 100)}%` }} />
          </div>
          {!progress ? (
            <form action={startPathAction} className="mt-6">
              <input name="path_id" type="hidden" value={path.id} />
              <Button className="w-full" type="submit">Iniciar camino</Button>
            </form>
          ) : null}
        </Card>
        <Card>
          {day ? (
            <>
              <Badge tone="sky">Dia {day.day_number}</Badge>
              <h2 className="mt-4 text-2xl font-semibold">{day.title}</h2>
              <p className="mt-5 text-base leading-8 text-white/76">{day.content}</p>
              {day.verse ? <p className="mt-5 text-sm text-[#f4dfaa]">{day.verse}</p> : null}
              {day.prayer ? <p className="mt-5 rounded-lg border border-white/10 bg-white/[0.055] p-4 text-sm leading-6 text-white/68">{day.prayer}</p> : null}
              {day.exercise ? <p className="mt-4 rounded-lg border border-white/10 bg-white/[0.055] p-4 text-sm leading-6 text-white/68">{day.exercise}</p> : null}
              {progress && !progress.completed ? (
                <form action={completePathDayAction} className="mt-7">
                  <input name="path_id" type="hidden" value={path.id} />
                  <input name="current_day" type="hidden" value={currentDay} />
                  <input name="duration_days" type="hidden" value={path.duration_days} />
                  <Button type="submit">Marcar dia completado</Button>
                </form>
              ) : null}
            </>
          ) : (
            <p className="text-sm text-white/66">Este camino todavia no tiene dias cargados.</p>
          )}
        </Card>
      </section>
    </AppShell>
  );
}

async function getPathDetail(id: string): Promise<PathDetail | null> {
  try {
    const supabase = await createSupabaseServerClient();
    const { data } = await supabase
      .from("guided_paths")
      .select("id,title,description,duration_days,category,guided_path_days(day_number,title,content,prayer,exercise,verse),user_path_progress(current_day,completed)")
      .eq("id", id)
      .order("day_number", { referencedTable: "guided_path_days", ascending: true })
      .maybeSingle();

    return data;
  } catch {
    return null;
  }
}
