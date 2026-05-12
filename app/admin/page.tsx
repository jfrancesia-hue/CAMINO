import { AppShell, Badge, Card, PageHeader } from "@/components";
import { createSupabaseServerClient } from "@/lib/supabase/server";

type AdminMetrics = {
  conversations: number;
  crisisEvents: number;
  journalEntries: number;
  prayerRequests: number;
  users: number;
};

type CrisisEvent = {
  created_at: string;
  detected_risk: string;
  id: string;
};

export default async function AdminPage() {
  const { crisisEvents, loadError, metrics } = await getAdminData();

  return (
    <AppShell>
      <PageHeader
        description="Vista reservada para administradores y superadministradores."
        eyebrow="Admin"
        title="Panel de control"
      />
      {loadError ? (
        <Card className="mt-10">
          <Badge tone="neutral">Pendiente</Badge>
          <p className="mt-5 text-sm leading-6 text-white/68">{loadError}</p>
        </Card>
      ) : null}
      <section className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <MetricCard label="Usuarios" value={metrics.users} />
        <MetricCard label="Conversaciones" value={metrics.conversations} />
        <MetricCard label="Diario" value={metrics.journalEntries} />
        <MetricCard label="Crisis" value={metrics.crisisEvents} />
        <MetricCard label="Pedidos" value={metrics.prayerRequests} />
      </section>
      <Card className="mt-10">
        <Badge tone="olive">Crisis recientes</Badge>
        <div className="mt-5 grid gap-3">
          {crisisEvents.map((event) => (
            <div className="rounded-md border border-white/10 bg-white/[0.055] px-4 py-3 text-sm" key={event.id}>
              <span className="font-semibold text-[#f4dfaa]">{event.detected_risk}</span>
              <span className="ml-3 text-white/48">{new Date(event.created_at).toLocaleString("es")}</span>
            </div>
          ))}
          {crisisEvents.length === 0 ? <p className="text-sm text-white/60">Sin eventos visibles.</p> : null}
        </div>
      </Card>
    </AppShell>
  );
}

function MetricCard({ label, value }: { label: string; value: number }) {
  return (
    <Card>
      <p className="text-xs uppercase tracking-[0.12em] text-white/45">{label}</p>
      <p className="mt-3 text-3xl font-semibold text-white">{value}</p>
    </Card>
  );
}

async function getAdminData(): Promise<{ crisisEvents: CrisisEvent[]; loadError: string; metrics: AdminMetrics }> {
  const emptyMetrics: AdminMetrics = {
    conversations: 0,
    crisisEvents: 0,
    journalEntries: 0,
    prayerRequests: 0,
    users: 0,
  };

  try {
    const supabase = await createSupabaseServerClient();

    const [profiles, conversations, journalEntries, crisisEventsCount, prayerRequests, recentCrises] =
      await Promise.all([
        supabase.from("profiles").select("id", { count: "exact", head: true }),
        supabase.from("conversations").select("id", { count: "exact", head: true }),
        supabase.from("journal_entries").select("id", { count: "exact", head: true }),
        supabase.from("crisis_events").select("id", { count: "exact", head: true }),
        supabase.from("prayer_requests").select("id", { count: "exact", head: true }),
        supabase
          .from("crisis_events")
          .select("id,detected_risk,created_at")
          .order("created_at", { ascending: false })
          .limit(8),
      ]);

    return {
      crisisEvents: recentCrises.data ?? [],
      loadError: "",
      metrics: {
        conversations: conversations.count ?? 0,
        crisisEvents: crisisEventsCount.count ?? 0,
        journalEntries: journalEntries.count ?? 0,
        prayerRequests: prayerRequests.count ?? 0,
        users: profiles.count ?? 0,
      },
    };
  } catch {
    return {
      crisisEvents: [],
      loadError: "Supabase no esta configurado todavia. El admin queda listo al conectar la base y asignar rol admin.",
      metrics: emptyMetrics,
    };
  }
}
