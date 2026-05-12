import { Badge, Card, LinkButton, Logo } from "@/components";

const painPoints = [
  "ansiedad que aparece cuando todo se apaga",
  "soledad aun estando rodeado de gente",
  "inseguridad, culpa y pensamientos que pesan",
  "sensacion de vacio o desconexion espiritual",
];

const features = [
  {
    title: "Guia IA",
    description: "Un espacio para hablar, ordenar lo que sentis y recibir pasos pequenos con cuidado espiritual.",
  },
  {
    title: "Oracion guiada",
    description: "Oraciones breves para ansiedad, gratitud, noche, decisiones, duelo y proposito.",
  },
  {
    title: "Diario emocional",
    description: "Un lugar privado para escribir, soltar y reconocer patrones sin juicio.",
  },
  {
    title: "Reflexiones",
    description: "Lecturas simples con versiculo, pregunta del dia y una accion concreta.",
  },
  {
    title: "Caminos guiados",
    description: "Procesos de 7, 14 y 21 dias para paz, ansiedad, autoestima, perdon y proposito.",
  },
  {
    title: "Comunidad",
    description: "Pedidos de oracion y acompanamiento humano, con privacidad y moderacion.",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#08111f] text-[#fffaf0]">
      <section className="relative min-h-[96vh] px-5 py-6">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,17,31,0.35),#08111f_92%),linear-gradient(90deg,rgba(8,17,31,0.92),rgba(8,17,31,0.46)_48%,rgba(8,17,31,0.86)),url('https://images.unsplash.com/photo-1476610182048-b716b8518aae?auto=format&fit=crop&w=1800&q=84')] bg-cover bg-center" />
        <div className="absolute inset-0 soft-grid opacity-55" />

        <nav className="relative z-10 mx-auto flex max-w-6xl items-center justify-between rounded-lg border border-white/10 bg-[#08111f]/54 px-4 py-3 backdrop-blur-xl">
        <a aria-label="Camino inicio" href="/">
          <Logo />
        </a>
        <div className="flex items-center gap-2">
          <a className="hidden px-3 py-2 text-sm text-white/68 transition hover:text-[#fffaf0] sm:inline-flex" href="#como-funciona">
            Como funciona
          </a>
          <a className="hidden px-3 py-2 text-sm text-white/68 transition hover:text-[#fffaf0] sm:inline-flex" href="/login">
            Ingresar
          </a>
          <LinkButton href="/register" size="sm">
            Comenzar
          </LinkButton>
        </div>
      </nav>

        <div className="relative z-10 mx-auto grid max-w-6xl gap-10 pb-20 pt-20 lg:grid-cols-[1.08fr_0.92fr] lg:items-end lg:pt-28">
          <div className="max-w-3xl">
            <Badge>Camino</Badge>
            <h1 className="mt-6 max-w-4xl text-5xl font-semibold leading-[1.02] text-[#fffaf0] sm:text-6xl lg:text-7xl">
              Un espacio para encontrar paz, proposito y volver a conectar con la fe.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/75">
              Camino combina acompanamiento espiritual, herramientas emocionales e inteligencia artificial para ayudarte a caminar con mas calma, sentido y esperanza.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <LinkButton href="/register" size="lg">
                Comenzar mi camino
              </LinkButton>
              <LinkButton href="#como-funciona" size="lg" variant="secondary">
                Conocer como funciona
              </LinkButton>
            </div>
            <p className="mt-8 max-w-2xl border-l border-[#d9b45f]/45 pl-4 text-sm leading-6 text-white/62">
              Camino no reemplaza atencion medica, psicologica, pastoral ni emergencias. Es una herramienta de acompanamiento espiritual y emocional.
            </p>
          </div>

          <Card className="mb-2 bg-[#08111f]/58">
            <Badge tone="olive">Hoy</Badge>
            <p className="mt-5 text-2xl font-semibold leading-tight">
              No tenes que poder con todo solo.
            </p>
            <p className="mt-4 text-sm leading-6 text-white/67">
              Entra, respira, escribi lo que pesa y deja que Camino te acompane con una pregunta amable, una oracion o un paso simple.
            </p>
            <div className="mt-7 grid gap-3">
              {["Hablar con la guia", "Orar unos minutos", "Escribir en mi diario"].map((item) => (
                <div className="rounded-md border border-white/10 bg-white/[0.06] px-4 py-3 text-sm text-white/78" key={item}>
                  {item}
                </div>
              ))}
            </div>
          </Card>
        </div>
      </section>

      <section className="px-5 py-20">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <SectionIntro
            eyebrow="El problema"
            title="Muchos cargan en silencio cosas que no saben como nombrar."
            description="Camino nace para ese momento en que la mente va rapido, la fe se siente lejos y pedir ayuda todavia cuesta."
          />
          <div className="grid gap-3 sm:grid-cols-2">
            {painPoints.map((point) => (
              <Card className="bg-white/[0.055]" key={point}>
                <p className="text-base leading-7 text-white/78">{point}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#fffaf0] px-5 py-20 text-[#102038]" id="como-funciona">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div className="min-h-[520px] overflow-hidden rounded-lg bg-[linear-gradient(180deg,rgba(8,17,31,0.04),rgba(8,17,31,0.58)),url('https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1400&q=84')] bg-cover bg-center shadow-[0_24px_80px_rgba(16,32,56,0.2)]" />
          <div>
            <Badge tone="olive">La solucion</Badge>
            <h2 className="mt-5 text-4xl font-semibold leading-tight sm:text-5xl">
              Un refugio digital para volver al centro.
            </h2>
            <p className="mt-5 text-lg leading-8 text-[#102038]/72">
              Camino no intenta resolver tu vida en una frase. Te ayuda a bajar un cambio, reconocer lo que sentis, volver a orar si queres y encontrar el proximo paso posible.
            </p>
            <div className="mt-8 grid gap-4">
              {["Escucha primero", "Cuida tu privacidad", "Recomienda ayuda humana cuando hace falta"].map((item) => (
                <div className="rounded-lg border border-[#102038]/10 bg-white px-5 py-4 shadow-[0_12px_36px_rgba(16,32,56,0.08)]" key={item}>
                  <p className="font-semibold">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-20">
        <div className="mx-auto max-w-6xl">
          <SectionIntro
            eyebrow="Funciones"
            title="Herramientas simples para dias reales."
            description="El MVP de Camino se enfoca en acompanamiento, oracion, diario, reflexion diaria y modos emocionales utiles."
          />
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <Card className="min-h-48" key={feature.title}>
                <h3 className="text-xl font-semibold">{feature.title}</h3>
                <p className="mt-4 text-sm leading-6 text-white/66">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-20">
        <div className="mx-auto grid max-w-6xl gap-5 lg:grid-cols-[0.95fr_1.05fr]">
          <Card className="bg-[#d9b45f]/13">
            <Badge>Etica y seguridad</Badge>
            <h2 className="mt-5 text-4xl font-semibold leading-tight">
              Una IA que acompana sin ocupar lugares que no le corresponden.
            </h2>
            <p className="mt-5 text-base leading-7 text-white/70">
              Camino nunca dice que habla en nombre de Dios, no diagnostica, no promete curacion y no recomienda abandonar tratamientos.
            </p>
          </Card>
          <div className="grid gap-4 sm:grid-cols-2">
            {["Detecta crisis y cambia el protocolo", "Sugiere ayuda humana y profesional", "Evita culpa, manipulacion y dependencia", "Acompana desde la fe con humildad"].map((item) => (
              <Card className="bg-white/[0.055]" key={item}>
                <p className="text-base font-semibold leading-7">{item}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#102038] px-5 py-20">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
          <SectionIntro
            eyebrow="Para comunidades"
            title="Preparado para iglesias, grupos y mentores."
            description="Camino puede evolucionar hacia una plataforma SaaS para comunidades: contenido propio, pedidos de oracion, seguimiento pastoral responsable y recursos para jovenes."
          />
          <Card className="bg-white/[0.065]">
            <div className="grid gap-4">
              {["Panel para comunidades", "Roles de mentor y administrador", "Contenido espiritual curado", "Metricas agregadas sin exponer intimidad"].map((item) => (
                <div className="rounded-md border border-white/10 bg-white/[0.055] px-4 py-3 text-sm text-white/78" key={item}>
                  {item}
                </div>
              ))}
            </div>
          </Card>
        </div>
      </section>

      <section className="px-5 py-20">
        <div className="mx-auto max-w-5xl overflow-hidden rounded-lg border border-white/12 bg-[linear-gradient(135deg,rgba(217,180,95,0.23),rgba(123,143,98,0.16)),rgba(255,255,255,0.07)] p-8 text-center shadow-[0_24px_90px_rgba(0,0,0,0.25)] backdrop-blur-xl sm:p-12">
          <Badge>Empezar</Badge>
          <h2 className="mx-auto mt-5 max-w-3xl text-4xl font-semibold leading-tight sm:text-5xl">
            Unos minutos de paz pueden ser el primer paso.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-white/70">
            Camino esta siendo construido para acompanarte con belleza, cuidado y responsabilidad.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <LinkButton href="/register" size="lg">
              Comenzar mi camino
            </LinkButton>
            <LinkButton href="/login" size="lg" variant="secondary">
              Ya tengo cuenta
            </LinkButton>
          </div>
        </div>
      </section>
    </main>
  );
}

function SectionIntro({
  description,
  eyebrow,
  title,
  tone = "dark",
}: {
  description: string;
  eyebrow: string;
  tone?: "dark" | "light";
  title: string;
}) {
  return (
    <div className="max-w-3xl">
      <Badge tone="sky">{eyebrow}</Badge>
      <h2 className="mt-5 text-4xl font-semibold leading-tight sm:text-5xl">{title}</h2>
      <p className={tone === "light" ? "mt-5 text-base leading-7 text-[#102038]/68" : "mt-5 text-base leading-7 text-white/68"}>{description}</p>
    </div>
  );
}
