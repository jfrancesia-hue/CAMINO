import { notFound } from "next/navigation";
import { AppShell, Badge, Card, LinkButton, PageHeader } from "@/components";
import { createSupabaseServerClient } from "@/lib/supabase/server";

type Prayer = {
  category: string;
  content: string;
  duration: string | null;
  id: string;
  title: string;
};

type PrayerDetailPageProps = {
  params: Promise<{ id: string }>;
};

export default async function PrayerDetailPage({ params }: PrayerDetailPageProps) {
  const { id } = await params;
  const prayer = await getPrayer(id);

  if (!prayer) {
    notFound();
  }

  return (
    <AppShell>
      <PageHeader
        action={<LinkButton href="/app/orar" variant="secondary">Volver</LinkButton>}
        description={prayer.duration ?? "Oracion guiada"}
        eyebrow="Orar"
        title={prayer.title}
      />
      <Card className="mt-10">
        <Badge tone="olive">{prayer.category}</Badge>
        <p className="mt-6 whitespace-pre-wrap text-lg leading-9 text-white/78">{prayer.content}</p>
      </Card>
    </AppShell>
  );
}

async function getPrayer(id: string): Promise<Prayer | null> {
  try {
    const supabase = await createSupabaseServerClient();
    const { data } = await supabase
      .from("prayers")
      .select("id,title,category,content,duration")
      .eq("id", id)
      .maybeSingle();

    return data;
  } catch {
    return null;
  }
}
