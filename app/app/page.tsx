import { signOutAction } from "@/app/auth/actions";
import { AppShell, Badge, LinkButton } from "@/components";
import { getCurrentProfile } from "@/lib/supabase/profile";

const quickLinks = [
  { href: "/app/chat", label: "Chat" },
  { href: "/app/diario", label: "Diario" },
  { href: "/app/orar", label: "Oraciones" },
  { href: "/app/reflexiones", label: "Reflexiones" },
  { href: "/app/caminos", label: "Caminos" },
  { href: "/app/comunidad", label: "Comunidad" },
];

const moods = [
  { label: "Esperanza", tone: "bg-[#f0b429]/20 border-[#f0b429]/35" },
  { label: "Calma", tone: "bg-[#11a7a7]/18 border-[#11a7a7]/35" },
  { label: "Ansiedad", tone: "bg-[#d94a35]/16 border-[#d94a35]/35" },
  { label: "Tristeza", tone: "bg-[#1556b7]/16 border-[#1556b7]/35" },
  { label: "Gratitud", tone: "bg-[#6f8051]/18 border-[#6f8051]/35" },
];

export default async function AppHomePage() {
  const profile = await getCurrentProfile();
  const firstName = profile?.full_name?.split(" ")[0] ?? "ahi";
  const emotionalState = profile?.emotional_state?.split("|")[0]?.trim() || "Todavia no registrado";
  const mainTopics = profile?.main_topics?.slice(0, 4) ?? [];

  return (
    <AppShell>
      <section className="relative overflow-hidden rounded-[28px] border border-[#f6dfa2]/28 bg-[#fff8e8] text-[#101b36] shadow-[0_30px_120px_rgba(0,0,0,0.32)]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_12%,rgba(240,180,41,0.34),transparent_18rem),radial-gradient(circle_at_92%_42%,rgba(17,167,167,0.18),transparent_20rem),linear-gradient(135deg,rgba(255,248,232,0.96),rgba(234,220,193,0.82))]" />
        <div className="relative grid gap-0 lg:grid-cols-[1fr_320px]">
          <div className="p-6 sm:p-10">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <Badge tone="olive">Hoy</Badge>
                <h1 className="serif-display mt-4 text-4xl leading-tight text-[#101b36] sm:text-5xl">
                  No tenes que poder con todo solo, {firstName}.
                </h1>
                <p className="mt-4 max-w-2xl text-base leading-7 text-[#101b36]/68">
                  Caminemos unos minutos: nombrar, respirar, orar o escribir. Un paso basta.
                </p>
              </div>
              <form action={signOutAction}>
                <button
                  className="rounded-md border border-[#101b36]/12 bg-white/50 px-4 py-2 text-sm text-[#101b36]/70 transition hover:bg-white"
                  type="submit"
                >
                  Salir
                </button>
              </form>
            </div>

            <div className="mt-9 rounded-[24px] border border-white/70 bg-white/58 p-5 shadow-[0_18px_60px_rgba(16,27,54,0.12)] backdrop-blur-xl">
              <h2 className="text-center text-2xl font-semibold">Como te sentis hoy?</h2>
              <div className="mt-6 grid gap-3 sm:grid-cols-5">
                {moods.map((mood) => (
                  <div
                    className={`rounded-2xl border px-3 py-4 text-center shadow-[0_10px_26px_rgba(16,27,54,0.08)] ${mood.tone}`}
                    key={mood.label}
                  >
                    <div className="mx-auto h-9 w-9 rounded-full bg-white/78 shadow-inner" />
                    <p className="mt-3 text-sm font-semibold">{mood.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              <BigAction href="/app/chat" label="Necesito hablar" tone="gold" />
              <BigAction href="/app/orar" label="Orar ahora" tone="gold" />
              <BigAction href="/app/chat?mode=ansiedad" label="Estoy ansioso/a" tone="blue" />
            </div>

            <div className="mt-8 grid gap-4 lg:grid-cols-[1fr_0.82fr]">
              <div className="rounded-[22px] border border-white/72 bg-white/62 p-6 shadow-[0_18px_56px_rgba(16,27,54,0.12)]">
                <p className="text-sm font-semibold text-[#6f8051]">Progreso del camino</p>
                <h3 className="mt-3 text-2xl font-semibold">Primer tramo iniciado</h3>
                <div className="mt-5 h-3 overflow-hidden rounded-full bg-[#101b36]/10">
                  <div className="h-full w-[18%] rounded-full bg-[#11a7a7]" />
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {mainTopics.length > 0 ? (
                    mainTopics.map((topic) => (
                      <Badge key={topic} tone="neutral">
                        {topic}
                      </Badge>
                    ))
                  ) : (
                    <span className="text-sm text-[#101b36]/58">
                      Tus temas apareceran despues del onboarding.
                    </span>
                  )}
                </div>
              </div>
              <div className="rounded-[22px] border border-white/72 bg-[#d7ad4f]/24 p-6 shadow-[0_18px_56px_rgba(16,27,54,0.12)]">
                <p className="text-sm font-semibold text-[#7f2437]">Estado actual</p>
                <h3 className="mt-3 text-3xl font-semibold">{emotionalState}</h3>
                <p className="mt-4 text-sm leading-6 text-[#101b36]/64">
                  Este dato ayuda a Camino a acompanarte con mas delicadeza.
                </p>
              </div>
            </div>
          </div>

          <aside className="border-t border-[#101b36]/8 bg-white/40 p-6 backdrop-blur-xl lg:border-l lg:border-t-0">
            <div className="rounded-[24px] border border-[#d7ad4f]/24 bg-[linear-gradient(135deg,rgba(215,173,79,0.44),rgba(255,248,232,0.7))] p-6 shadow-[0_20px_60px_rgba(215,173,79,0.22)]">
              <Badge>Reflexion diaria</Badge>
              <h2 className="serif-display mt-5 text-3xl leading-tight">
                La paz tambien se practica de a poco.
              </h2>
              <p className="mt-4 text-sm leading-6 text-[#101b36]/70">
                "Vengan a mi todos ustedes que estan cansados y agobiados, y yo les dare descanso."
              </p>
              <LinkButton className="mt-6" href="/app/reflexiones" variant="secondary">
                Leer mas
              </LinkButton>
            </div>

            <div className="mt-6 rounded-[22px] border border-white/70 bg-white/60 p-5 shadow-[0_16px_42px_rgba(16,27,54,0.1)]">
              <p className="text-sm font-semibold text-[#101b36]/60">Accesos rapidos</p>
              <div className="mt-4 grid gap-2">
                {quickLinks.map((item) => (
                  <a
                    className="rounded-md px-3 py-2 text-sm font-semibold text-[#101b36]/72 transition hover:bg-[#101b36]/6"
                    href={item.href}
                    key={item.href}
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>
    </AppShell>
  );
}

function BigAction({ href, label, tone }: { href: string; label: string; tone: "blue" | "gold" }) {
  return (
    <a
      className={
        tone === "gold"
          ? "rounded-[22px] bg-[#d7ad4f] px-5 py-7 text-center text-lg font-semibold text-[#101b36] shadow-[0_18px_48px_rgba(215,173,79,0.28)] transition hover:-translate-y-0.5"
          : "rounded-[22px] bg-[#1556b7] px-5 py-7 text-center text-lg font-semibold text-white shadow-[0_18px_48px_rgba(21,86,183,0.24)] transition hover:-translate-y-0.5"
      }
      href={href}
    >
      <span className="mx-auto mb-3 block h-10 w-10 rounded-full bg-white/45" />
      {label}
    </a>
  );
}
