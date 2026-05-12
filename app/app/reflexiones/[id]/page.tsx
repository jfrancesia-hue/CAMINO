import { notFound } from "next/navigation";
import { AppShell, Badge, Card, LinkButton, PageHeader } from "@/components";
import { createSupabaseServerClient } from "@/lib/supabase/server";

type Reflection = {
  action: string;
  category: string;
  content: string;
  id: string;
  question: string;
  title: string;
  verse: string;
};

type ReflectionDetailPageProps = {
  params: Promise<{ id: string }>;
};

export default async function ReflectionDetailPage({ params }: ReflectionDetailPageProps) {
  const { id } = await params;
  const reflection = await getReflection(id);

  if (!reflection) {
    notFound();
  }

  return (
    <AppShell>
      <PageHeader
        action={<LinkButton href="/app/reflexiones" variant="secondary">Volver</LinkButton>}
        description={reflection.verse}
        eyebrow="Reflexion"
        title={reflection.title}
      />
      <Card className="mt-10">
        <Badge tone="sky">{reflection.category}</Badge>
        <p className="mt-6 text-base leading-8 text-white/76">{reflection.content}</p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <div className="rounded-lg border border-white/10 bg-white/[0.055] p-5">
            <h2 className="font-semibold">Pregunta del dia</h2>
            <p className="mt-3 text-sm leading-6 text-white/66">{reflection.question}</p>
          </div>
          <div className="rounded-lg border border-white/10 bg-white/[0.055] p-5">
            <h2 className="font-semibold">Accion concreta</h2>
            <p className="mt-3 text-sm leading-6 text-white/66">{reflection.action}</p>
          </div>
        </div>
      </Card>
    </AppShell>
  );
}

async function getReflection(id: string): Promise<Reflection | null> {
  try {
    const supabase = await createSupabaseServerClient();
    const { data } = await supabase
      .from("daily_reflections")
      .select("id,title,verse,content,question,action,category")
      .eq("id", id)
      .maybeSingle();

    return data;
  } catch {
    return null;
  }
}
