import { Badge, Button, Card, Input, Logo } from "@/components";
import { completeOnboardingAction } from "@/app/onboarding/actions";

const searches = [
  "paz interior",
  "volver a orar",
  "ordenar emociones",
  "proposito",
  "sentirme acompanado/a",
];

const emotionalStates = [
  "ansioso/a",
  "cansado/a",
  "triste",
  "confundido/a",
  "con esperanza",
  "sin energia",
];

const faithOptions = [
  "desde la fe",
  "desde lo emocional",
  "desde ambas",
  "quiero ir de a poco",
];

const topics = [
  "ansiedad",
  "soledad",
  "autoestima",
  "culpa",
  "relaciones",
  "duelo",
  "proposito",
  "fe",
  "familia",
  "estudio/trabajo",
];

type OnboardingPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

export default async function OnboardingPage({ searchParams }: OnboardingPageProps) {
  const params = await searchParams;
  const error = typeof params?.error === "string" ? params.error : "";

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#070d1c] px-5 py-8">
      <div className="absolute inset-0 spanish-glass-bg" />
      <div className="absolute left-10 top-20 h-56 w-56 rounded-full bg-[#f0b429]/18 blur-3xl" />
      <div className="absolute bottom-20 right-10 h-64 w-64 rounded-full bg-[#11a7a7]/16 blur-3xl" />
      <div className="mx-auto max-w-5xl">
        <a aria-label="Camino inicio" href="/">
          <Logo />
        </a>
        <div className="relative mt-12 grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
          <div className="rounded-[28px] border border-[#f6dfa2]/20 bg-[#070d1c]/46 p-6 shadow-[0_24px_90px_rgba(0,0,0,0.28)] backdrop-blur-xl">
            <Badge>Onboarding</Badge>
            <h1 className="serif-display mt-5 text-5xl leading-tight">
              Antes de empezar, queremos conocerte con cuidado.
            </h1>
            <p className="mt-5 text-base leading-7 text-white/68">
              Tus respuestas ayudan a que Camino te acompanhe con mas delicadeza. No buscamos etiquetarte, solo entender que necesitas hoy.
            </p>
            <p className="mt-6 rounded-lg border border-[#f6dfa2]/18 bg-white/[0.075] p-4 text-sm leading-6 text-white/68">
              Si estas en peligro inmediato o pensando en hacerte dano, busca emergencias de tu pais o una persona de confianza ahora mismo.
            </p>
          </div>

          <Card className="bg-[#fff8e8]/92 text-[#101b36]">
            {error ? (
              <div className="mb-6 rounded-md border border-[#ef7979]/35 bg-[#ef7979]/14 px-4 py-3 text-sm text-[#ffd7d7]">
                {error}
              </div>
            ) : null}
            <form action={completeOnboardingAction} className="grid gap-8">
              <div className="grid gap-4 sm:grid-cols-2">
                <Input id="full_name" label="Como te llamas?" name="full_name" placeholder="Tu nombre" required />
                <Input id="age" label="Edad" min={13} name="age" placeholder="Ej. 24" type="number" />
                <Input id="country" label="Pais" name="country" placeholder="Ej. Argentina" />
                <Input id="city" label="Ciudad" name="city" placeholder="Ej. Cordoba" />
              </div>

              <ChoiceGroup legend="Que estas buscando hoy?" name="searching_for" options={searches} />
              <ChoiceGroup legend="Como te venis sintiendo ultimamente?" name="emotional_state" options={emotionalStates} required />
              <ChoiceGroup legend="Preferis acompanamiento desde la fe, desde lo emocional o desde ambas?" name="faith_status" options={faithOptions} required />

              <fieldset>
                <legend className="text-sm font-semibold text-[#101b36]">Que temas te pesan mas?</legend>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {topics.map((topic) => (
                    <label className="flex items-center gap-3 rounded-md border border-[#101b36]/10 bg-white/60 px-4 py-3 text-sm text-[#101b36]/76 transition hover:bg-white" key={topic}>
                      <input className="h-4 w-4 accent-[#d9b45f]" name="main_topics" type="checkbox" value={topic} />
                      {topic}
                    </label>
                  ))}
                </div>
              </fieldset>

              <Button size="lg" type="submit">
                Guardar y entrar a Camino
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </main>
  );
}

function ChoiceGroup({
  legend,
  name,
  options,
  required = false,
}: {
  legend: string;
  name: string;
  options: string[];
  required?: boolean;
}) {
  return (
    <fieldset>
      <legend className="text-sm font-semibold text-[#101b36]">{legend}</legend>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {options.map((option, index) => (
          <label className="flex items-center gap-3 rounded-md border border-[#101b36]/10 bg-white/60 px-4 py-3 text-sm text-[#101b36]/76 transition hover:bg-white" key={option}>
            <input className="h-4 w-4 accent-[#d9b45f]" name={name} required={required && index === 0} type="radio" value={option} />
            {option}
          </label>
        ))}
      </div>
    </fieldset>
  );
}
