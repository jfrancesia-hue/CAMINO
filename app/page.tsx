import { Badge, Card, LinkButton, Logo } from "@/components";

const painPoints = [
  "La ansiedad se vuelve mas fuerte cuando todo queda en silencio.",
  "La soledad pesa incluso cuando hay gente alrededor.",
  "La culpa y la inseguridad apagan la forma de rezar.",
  "La fe sigue importando, pero a veces parece lejos.",
];

const features = [
  {
    eyebrow: "Acompanamiento",
    title: "Guia IA con alma pastoral",
    description: "Escucha primero, ordena lo que sentis y propone un paso pequeno sin culpa ni dramatismo.",
    image: "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?auto=format&fit=crop&w=1200&q=86",
  },
  {
    eyebrow: "Oracion",
    title: "Oracion guiada",
    description: "Momentos breves para ansiedad, noche, gratitud, decisiones, duelo, perdon y proposito.",
    image: "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?auto=format&fit=crop&w=1200&q=86",
  },
  {
    eyebrow: "Interioridad",
    title: "Diario espiritual",
    description: "Un lugar privado para escribir lo que pesa, reconocer patrones y volver a mirar con ternura.",
    image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1200&q=86",
  },
  {
    eyebrow: "Palabra",
    title: "Reflexiones diarias",
    description: "Versiculo, explicacion simple, pregunta del dia y una accion concreta para vivir la fe.",
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=1200&q=86",
  },
  {
    eyebrow: "Proceso",
    title: "Caminos guiados",
    description: "Procesos de 7, 14 y 21 dias para paz, ansiedad, autoestima, perdon y proposito.",
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=86",
  },
  {
    eyebrow: "Comunidad",
    title: "Pedidos de oracion",
    description: "Acompanamiento humano con privacidad, moderacion y ayuda cuando aparece una crisis.",
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=86",
  },
];

const principles = [
  "No habla en nombre de Dios.",
  "No diagnostica ni promete curacion.",
  "No reemplaza terapia, pastores, sacerdotes ni emergencias.",
  "Detecta crisis y recomienda ayuda humana inmediata.",
];

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#070d1c] text-[#fff8e8]">
      <section className="relative min-h-screen px-5 py-6">
        <img
          alt="Interior real de una catedral con luz entrando por los vitrales"
          className="absolute inset-0 h-full w-full object-cover"
          src="https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?auto=format&fit=crop&w=2200&q=90"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,13,28,0.16),#070d1c_96%),linear-gradient(90deg,rgba(7,13,28,0.96),rgba(12,33,71,0.58)_52%,rgba(7,13,28,0.72))]" />
        <div className="absolute inset-0 soft-grid opacity-25" />

        <nav className="relative z-10 mx-auto flex max-w-7xl items-center justify-between rounded-lg border border-[#f6dfa2]/18 bg-[#070d1c]/62 px-4 py-3 shadow-[0_18px_70px_rgba(0,0,0,0.3)] backdrop-blur-xl">
          <a aria-label="Camino inicio" href="/">
            <Logo />
          </a>
          <div className="flex items-center gap-2">
            <a className="hidden px-3 py-2 text-sm text-white/68 transition hover:text-[#f6dfa2] md:inline-flex" href="#santuario">
              Santuario
            </a>
            <a className="hidden px-3 py-2 text-sm text-white/68 transition hover:text-[#f6dfa2] md:inline-flex" href="#herramientas">
              Herramientas
            </a>
            <a className="hidden px-3 py-2 text-sm text-white/68 transition hover:text-[#f6dfa2] sm:inline-flex" href="/login">
              Ingresar
            </a>
            <LinkButton href="/register" size="sm">
              Comenzar
            </LinkButton>
          </div>
        </nav>

        <div className="relative z-10 mx-auto grid max-w-7xl gap-12 pb-24 pt-20 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:pt-24">
          <div>
            <Badge>Fe catolica, calma y proposito</Badge>
            <h1 className="serif-display mt-7 text-6xl font-semibold leading-[0.9] text-[#fff8e8] sm:text-7xl lg:text-8xl">
              Camino
            </h1>
            <p className="serif-display mt-6 max-w-4xl text-3xl leading-tight text-[#f6dfa2] sm:text-5xl">
              Un santuario digital con la luz viva de una catedral espanola.
            </p>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-white/76">
              Acompanamiento espiritual, herramientas emocionales e inteligencia artificial segura para jovenes y personas que necesitan paz, sentido y fe sin sentirse juzgadas.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <LinkButton href="/register" size="lg">
                Comenzar mi camino
              </LinkButton>
              <LinkButton href="#santuario" size="lg" variant="secondary">
                Ver el santuario
              </LinkButton>
            </div>
          </div>

          <div className="relative min-h-[720px]">
            <div className="rose-window absolute -right-2 top-0 h-32 w-32 opacity-75 blur-[0.2px]" />
            <div
              aria-label="Cruz catolica iluminada en una iglesia"
              className="organic-arch sacred-photo absolute left-0 top-6 min-h-[620px] w-[74%] overflow-hidden border border-[#f6dfa2]/35 bg-[#070d1c] bg-cover bg-center shadow-[0_38px_130px_rgba(0,0,0,0.54)]"
              role="img"
              style={{
                backgroundImage:
                  "url('https://commons.wikimedia.org/wiki/Special:Redirect/file/A_Cross_illuminated_with_coloured_Sunbeams_at_Norham_Church_-_geograph.org.uk_-_7113245.jpg?width=1280')",
              }}
            >
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,13,28,0.1),rgba(7,13,28,0.88))]" />
              <div className="cross-glow absolute left-1/2 top-16 h-32 w-5 -translate-x-1/2 rounded-full bg-[#f6dfa2]" />
              <div className="cross-glow absolute left-1/2 top-28 h-5 w-36 -translate-x-1/2 rounded-full bg-[#f6dfa2]" />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <Badge tone="gold">No estas solo</Badge>
                <h2 className="serif-display mt-5 text-4xl leading-tight text-[#fff8e8]">
                  La belleza tambien puede acompanarte.
                </h2>
                <p className="mt-4 text-sm leading-6 text-white/74">
                  Habla, ora, escribi y encontra un paso posible. Con limites claros, cuidado real y una fe que no aplasta.
                </p>
              </div>
            </div>
            <div className="absolute right-0 top-24 hidden w-[37%] gap-5 lg:grid">
              <PhotoTile
                alt="Velas encendidas en una iglesia"
                image="https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=700&q=86"
                label="Oracion"
              />
              <PhotoTile
                alt="Biblia abierta para reflexion"
                image="https://images.unsplash.com/photo-1509021436665-8f07dbf5bf1d?auto=format&fit=crop&w=700&q=86"
                label="Palabra"
              />
              <PhotoTile
                alt="Sendero con luz de amanecer"
                image="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=700&q=86"
                label="Camino"
              />
            </div>
            <div className="mosaic-panel absolute bottom-4 right-10 hidden w-72 rounded-lg border border-[#f6dfa2]/24 p-5 shadow-[0_22px_70px_rgba(0,0,0,0.28)] backdrop-blur-xl lg:block">
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#f6dfa2]">Color sagrado</p>
              <p className="serif-display mt-3 text-2xl leading-tight">Azul, oro, rojo y turquesa como vitrales al sol.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-24">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.78fr_1.22fr]">
          <SectionIntro
            eyebrow="Lo que se carga en silencio"
            title="No siempre falta fe. A veces falta un lugar seguro para volver a empezar."
            description="Camino existe para esos dias donde la mente va rapido, el corazon esta cansado y rezar parece dificil."
          />
          <div className="grid gap-4 sm:grid-cols-2">
            {painPoints.map((point) => (
              <Card className="min-h-44 bg-white/[0.055] p-6" key={point}>
                <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-full border border-[#f6dfa2]/32 bg-[#d7ad4f]/12">
                  <span className="relative block h-6 w-4">
                    <span className="absolute left-1/2 h-6 w-1 -translate-x-1/2 rounded-full bg-[#f6dfa2]" />
                    <span className="absolute left-0 top-2 h-1 w-4 rounded-full bg-[#f6dfa2]" />
                  </span>
                </div>
                <p className="text-base leading-7 text-white/80">{point}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="sacred-band px-5 py-24 text-[#101b36]" id="santuario">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="relative min-h-[680px]">
            <div className="relative z-10 min-h-[540px] w-[78%] overflow-hidden rounded-lg border border-[#d7ad4f]/30 shadow-[0_28px_90px_rgba(16,27,54,0.22)]">
              <img
                alt="Vitral catolico real con luz entrando"
                className="absolute inset-0 h-full w-full object-cover"
                src="https://images.unsplash.com/photo-1504150558240-0b4fd8946624?auto=format&fit=crop&w=1200&q=88"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,248,232,0.05),rgba(16,27,54,0.72))]" />
              <div className="absolute bottom-6 left-6 right-6 rounded-lg border border-white/18 bg-[#070d1c]/56 p-5 text-[#fff8e8] backdrop-blur-xl">
                <Badge>Vitral</Badge>
                <p className="serif-display mt-3 text-2xl leading-tight">Luz que entra donde parecia oscuro.</p>
              </div>
            </div>
            <div className="absolute right-0 top-28 z-20 w-[46%]">
              <ImageQuote
                image="https://images.unsplash.com/photo-1499092346589-b9b6be3e94b2?auto=format&fit=crop&w=900&q=86"
                label="Catedral"
                text="Grandeza visual sin perder cercania humana."
              />
            </div>
            <div className="absolute bottom-0 left-[22%] z-30 w-[52%]">
              <ImageQuote
                image="https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=900&q=86"
                label="Silencio"
                text="Una interfaz que baja el volumen interior."
              />
            </div>
            <div className="spanish-glass-bg absolute -bottom-8 -left-8 h-44 w-44 rounded-full opacity-85 blur-2xl" />
          </div>

          <div>
            <Badge tone="olive">La vision</Badge>
            <h2 className="serif-display mt-5 text-5xl font-semibold leading-tight">
              Tecnologia con forma de capilla, no de pantalla fria.
            </h2>
            <p className="mt-6 text-lg leading-8 text-[#101b36]/74">
              La belleza no es decoracion: en Camino es parte del cuidado. Imagenes reales, simbolos cristianos claros, aire visual y una experiencia que invita a detenerse.
            </p>
            <div className="mt-8 grid gap-4">
              {["Cruz clara, no ambigua", "Fotografia real, no fondos vacios", "Azul mariano y oro liturgico", "Copy sereno, nunca culpabilizador"].map((item) => (
                <div className="rounded-lg border border-[#101b36]/10 bg-white/74 px-5 py-4 shadow-[0_14px_38px_rgba(16,27,54,0.1)]" key={item}>
                  <p className="font-semibold">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="spanish-glass-bg px-5 py-24" id="herramientas">
        <div className="mx-auto max-w-7xl">
          <SectionIntro
            eyebrow="Herramientas"
            title="Una liturgia cotidiana para ordenar el corazon."
            description="Cada modulo debe sentirse real, bello y util: hablar, orar, escribir, reflexionar y caminar por etapas."
          />
          <div className="mt-12 columns-1 gap-5 md:columns-2 lg:columns-3">
            {features.map((feature, index) => (
              <Card
                className={`mb-5 break-inside-avoid overflow-hidden bg-white/[0.07] p-0 ${index % 2 === 0 ? "min-h-[460px]" : "min-h-[380px]"}`}
                key={feature.title}
              >
                <div className="relative h-56 overflow-hidden">
                  <img alt={feature.title} className="h-full w-full object-cover" src={feature.image} />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,13,28,0.02),rgba(7,13,28,0.82))]" />
                  <Badge className="absolute bottom-5 left-5" tone="gold">
                    {feature.eyebrow}
                  </Badge>
                </div>
                <div className="p-6">
                  <h3 className="serif-display text-3xl leading-tight text-[#fff8e8]">{feature.title}</h3>
                  <p className="mt-4 text-sm leading-6 text-white/66">{feature.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-20">
        <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-[0.9fr_1.1fr]">
          <Card className="mosaic-panel p-7">
            <Badge>Etica y seguridad</Badge>
            <h2 className="serif-display mt-5 text-5xl leading-tight">
              Una IA que sabe arrodillarse ante sus limites.
            </h2>
            <p className="mt-5 text-base leading-7 text-white/72">
              Camino acompana, pero no suplanta. La fe no se usa para presionar, diagnosticar ni manipular.
            </p>
          </Card>
          <div className="grid gap-4 sm:grid-cols-2">
            {principles.map((item) => (
              <Card className="bg-white/[0.055] p-6" key={item}>
                <p className="text-base font-semibold leading-7">{item}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#101b36] px-5 py-24">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
          <SectionIntro
            eyebrow="Para comunidades"
            title="Una herramienta digna para iglesias, grupos y mentores."
            description="Camino puede crecer como plataforma para comunidades: contenido propio, pedidos de oracion, acompanamiento responsable y recursos para jovenes."
          />
          <div className="relative min-h-[460px] overflow-hidden rounded-lg border border-[#f6dfa2]/18">
            <img
              alt="Comunidad reunida en una iglesia"
              className="absolute inset-0 h-full w-full object-cover"
              src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1300&q=86"
            />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,13,28,0.86),rgba(7,13,28,0.28)),linear-gradient(180deg,transparent,rgba(7,13,28,0.74))]" />
            <div className="absolute bottom-6 left-6 right-6 grid gap-3 sm:grid-cols-2">
              {["Panel para comunidades", "Roles de mentor", "Contenido espiritual", "Metricas cuidadas"].map((item) => (
                <div className="rounded-md border border-white/14 bg-[#070d1c]/54 px-4 py-3 text-sm text-white/82 backdrop-blur-md" key={item}>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-24">
        <div className="relative mx-auto max-w-6xl overflow-hidden rounded-lg border border-[#f6dfa2]/24 p-8 text-center shadow-[0_34px_110px_rgba(0,0,0,0.34)] sm:p-14">
          <img
            alt="Camino con luz al amanecer"
            className="absolute inset-0 h-full w-full object-cover"
            src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1600&q=88"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,13,28,0.48),rgba(7,13,28,0.88))]" />
          <div className="relative mx-auto max-w-3xl rounded-lg bg-[#070d1c]/62 p-7 backdrop-blur-xl">
            <Badge>Empezar</Badge>
            <h2 className="serif-display mx-auto mt-5 max-w-3xl text-5xl leading-tight">
              Unos minutos de paz pueden abrir una puerta.
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-white/72">
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
        </div>
      </section>
    </main>
  );
}

function PhotoTile({ alt, image, label }: { alt: string; image: string; label: string }) {
  return (
    <div className="relative min-h-48 overflow-hidden rounded-lg border border-[#f6dfa2]/18">
      <img alt={alt} className="absolute inset-0 h-full w-full object-cover" src={image} />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(7,13,28,0.82))]" />
      <p className="absolute bottom-4 left-4 text-sm font-semibold text-[#f6dfa2]">{label}</p>
    </div>
  );
}

function ImageQuote({ image, label, text }: { image: string; label: string; text: string }) {
  return (
    <div className="relative min-h-[250px] overflow-hidden rounded-lg border border-[#101b36]/10">
      <img alt={label} className="absolute inset-0 h-full w-full object-cover" src={image} />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(16,27,54,0.08),rgba(16,27,54,0.74))]" />
      <div className="absolute bottom-5 left-5 right-5 text-white">
        <Badge>{label}</Badge>
        <p className="serif-display mt-3 text-2xl leading-tight">{text}</p>
      </div>
    </div>
  );
}

function SectionIntro({
  description,
  eyebrow,
  title,
}: {
  description: string;
  eyebrow: string;
  title: string;
}) {
  return (
    <div className="max-w-3xl">
      <Badge tone="sky">{eyebrow}</Badge>
      <h2 className="serif-display mt-5 text-5xl leading-tight text-[#fff8e8]">{title}</h2>
      <p className="mt-5 text-base leading-7 text-white/68">{description}</p>
    </div>
  );
}
