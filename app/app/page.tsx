import { AppShell, Badge, Card, LinkButton, PageHeader } from "@/components";
import { signOutAction } from "@/app/auth/actions";
import { getCurrentProfile } from "@/lib/supabase/profile";

const quickLinks = [
  { description: "Habla con la guia Camino.", href: "/app/chat", label: "Chat" },
  { description: "Escribi sin juicio.", href: "/app/diario", label: "Diario" },
  { description: "Oraciones breves por momento.", href: "/app/orar", label: "Oraciones" },
  { description: "Una lectura para hoy.", href: "/app/reflexiones", label: "Reflexiones" },
  { description: "Procesos de varios dias.", href: "/app/caminos", label: "Caminos" },
  { description: "Pedidos de oracion.", href: "/app/comunidad", label: "Comunidad" },
];

export default async function AppHomePage() {
  const profile = await getCurrentProfile();
  const firstName = profile?.full_name?.split(" ")[0] ?? "ahi";
  const emotionalState = profile?.emotional_state?.split("|")[0]?.trim() || "Todavia no registrado";
  const mainTopics = profile?.main_topics?.slice(0, 4) ?? [];

  return (
    <AppShell>
      <PageHeader
        action={
          <form action={signOutAction}>
            <button className="rounded-md border border-white/14 px-4 py-2 text-sm text-white/70 transition hover:bg-white/10 hover:text-white" type="submit">
              Salir
            </button>
          </form>
        }
        description="Hoy no tenes que poder con todo solo. Caminemos juntos unos minutos."
        eyebrow="Camino"
        title={`Hola, ${firstName}`}
      />

      <section className="mt-10 grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
        <Card className="bg-[linear-gradient(135deg,rgba(217,180,95,0.18),rgba(255,255,255,0.06))]">
          <Badge tone="olive">Reflexion diaria</Badge>
          <h2 className="mt-5 text-3xl font-semibold leading-tight">La paz tambien se practica de a poco.</h2>
          <p className="mt-4 text-sm leading-6 text-white/68">
            "Vengan a mi todos ustedes que estan cansados y agobiados, y yo les dare descanso." Hoy podes empezar por respirar, nombrar lo que sentis y dar un paso pequeno.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <LinkButton href="/app/chat">Necesito hablar</LinkButton>
            <LinkButton href="/app/orar" variant="secondary">
              Orar ahora
            </LinkButton>
            <LinkButton href="/app/chat?mode=ansiedad" variant="secondary">
              Estoy ansioso/a
            </LinkButton>
          </div>
        </Card>
        <Card>
          <Badge tone="sky">Estado actual</Badge>
          <dl className="mt-5 grid gap-4 text-sm">
            <div>
              <dt className="text-white/48">Como venis</dt>
              <dd className="mt-1 text-lg font-semibold text-white/88">{emotionalState}</dd>
            </div>
            <div>
              <dt className="text-white/48">Temas principales</dt>
              <dd className="mt-2 flex flex-wrap gap-2">
                {mainTopics.length > 0 ? (
                  mainTopics.map((topic) => <Badge key={topic} tone="neutral">{topic}</Badge>)
                ) : (
                  <span className="text-white/70">Pendiente</span>
                )}
              </dd>
            </div>
            <div>
              <dt className="text-white/48">Progreso del camino</dt>
              <dd className="mt-2">
                <div className="h-2 overflow-hidden rounded-full bg-white/10">
                  <div className="h-full w-[18%] rounded-full bg-[#d9b45f]" />
                </div>
                <p className="mt-2 text-xs text-white/52">Primer tramo iniciado</p>
              </dd>
            </div>
          </dl>
        </Card>
      </section>

      <section className="mt-5 grid gap-4 md:grid-cols-3">
        <ActionCard href="/app/chat" label="Necesito hablar" />
        <ActionCard href="/app/orar" label="Orar ahora" />
        <ActionCard href="/app/chat?mode=ansiedad" label="Estoy ansioso/a" />
      </section>

      <section className="mt-10">
        <div className="mb-4 flex items-end justify-between gap-4">
          <div>
            <Badge>Accesos rapidos</Badge>
            <h2 className="mt-3 text-2xl font-semibold">Elegí por donde empezar</h2>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {quickLinks.map((item) => (
            <a className="rounded-lg border border-white/12 bg-white/[0.06] p-5 transition hover:-translate-y-0.5 hover:bg-white/[0.09]" href={item.href} key={item.href}>
              <h3 className="font-semibold text-white">{item.label}</h3>
              <p className="mt-2 text-sm leading-6 text-white/62">{item.description}</p>
            </a>
          ))}
        </div>
      </section>
    </AppShell>
  );
}

function ActionCard({ href, label }: { href: string; label: string }) {
  return (
    <a className="rounded-lg border border-[#d9b45f]/18 bg-[#d9b45f]/12 p-5 text-center font-semibold text-[#f4dfaa] transition hover:bg-[#d9b45f]/18" href={href}>
      {label}
    </a>
  );
}
