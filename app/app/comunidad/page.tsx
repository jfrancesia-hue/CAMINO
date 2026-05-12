import { createPrayerRequestAction } from "@/app/app/comunidad/actions";
import { AppShell, Badge, Button, Card, PageHeader, Textarea } from "@/components";
import { createSupabaseServerClient } from "@/lib/supabase/server";

type PrayerRequest = {
  content: string;
  created_at: string;
  id: string;
  is_public: boolean;
};

type CommunityPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

export default async function CommunityPage({ searchParams }: CommunityPageProps) {
  const params = await searchParams;
  const error = typeof params?.error === "string" ? params.error : "";
  const { loadError, requests } = await getPrayerRequests();

  return (
    <AppShell>
      <PageHeader
        description="Pedidos de oracion publicos o privados, con moderacion basica y cuidado de datos."
        eyebrow="Comunidad"
        title="No caminar solo"
      />
      <section className="mt-10 grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
        <Card>
          <Badge tone="olive">Nuevo pedido</Badge>
          {error ? (
            <div className="mt-5 rounded-md border border-[#ef7979]/35 bg-[#ef7979]/14 px-4 py-3 text-sm text-[#ffd7d7]">
              {error}
            </div>
          ) : null}
          <form action={createPrayerRequestAction} className="mt-6 grid gap-4">
            <Textarea id="content" label="Por que queres que oremos?" name="content" placeholder="Escribi con libertad, sin exponer datos sensibles." required />
            <label className="flex items-center gap-3 rounded-md border border-white/12 bg-white/[0.055] px-4 py-3 text-sm text-white/74">
              <input className="h-4 w-4 accent-[#d9b45f]" name="is_public" type="checkbox" />
              Hacer publico para la comunidad
            </label>
            <Button type="submit">Guardar pedido</Button>
          </form>
        </Card>
        <div>
          {loadError ? (
            <Card>
              <Badge tone="neutral">Pendiente</Badge>
              <p className="mt-5 text-sm leading-6 text-white/68">{loadError}</p>
            </Card>
          ) : null}
          <div className="grid gap-4">
            {requests.map((request) => (
              <Card key={request.id}>
                <Badge tone={request.is_public ? "sky" : "neutral"}>{request.is_public ? "Publico" : "Privado"}</Badge>
                <p className="mt-4 text-sm leading-6 text-white/72">{request.content}</p>
                <p className="mt-4 text-xs text-white/42">{new Date(request.created_at).toLocaleDateString("es")}</p>
              </Card>
            ))}
            {!loadError && requests.length === 0 ? (
              <Card>
                <Badge tone="neutral">Sin pedidos</Badge>
                <p className="mt-5 text-sm leading-6 text-white/68">Todavia no hay pedidos visibles.</p>
              </Card>
            ) : null}
          </div>
        </div>
      </section>
    </AppShell>
  );
}

async function getPrayerRequests(): Promise<{ loadError: string; requests: PrayerRequest[] }> {
  try {
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase
      .from("prayer_requests")
      .select("id,content,is_public,created_at")
      .order("created_at", { ascending: false })
      .limit(30);

    if (error) {
      return { loadError: "No pudimos cargar pedidos. Revisa que la migracion este aplicada.", requests: [] };
    }

    return { loadError: "", requests: data ?? [] };
  } catch {
    return { loadError: "Supabase no esta configurado todavia. La comunidad queda lista al conectar la base.", requests: [] };
  }
}
