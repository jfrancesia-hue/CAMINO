import { Badge, Button, Input, LinkButton, Logo } from "@/components";
import { signInAction } from "@/app/auth/actions";

type LoginPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const params = await searchParams;
  const error = typeof params?.error === "string" ? params.error : "";
  const next = typeof params?.next === "string" ? params.next : "/app";

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#070d1c] px-5 py-8">
      <img
        alt="Catedral iluminada"
        className="absolute inset-0 h-full w-full object-cover opacity-72"
        src="https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?auto=format&fit=crop&w=1800&q=88"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,13,28,0.94),rgba(12,33,71,0.58),rgba(7,13,28,0.82)),linear-gradient(180deg,rgba(7,13,28,0.08),#070d1c)]" />
      <div className="relative mx-auto grid min-h-[calc(100vh-4rem)] max-w-6xl items-center gap-10 lg:grid-cols-[1fr_0.78fr]">
        <section>
          <a aria-label="Camino inicio" href="/">
            <Logo />
          </a>
          <Badge className="mt-12">Volver</Badge>
          <h1 className="serif-display mt-5 max-w-3xl text-6xl leading-[0.95] text-[#fff8e8]">
            Entrar a tu capilla diaria.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-white/72">
            Retoma tu diario, tus oraciones, tus reflexiones y ese pequeno espacio donde no tenes que cargar todo solo.
          </p>
        </section>

        <section className="rounded-[28px] border border-[#f6dfa2]/24 bg-[#fff8e8]/92 p-6 text-[#101b36] shadow-[0_30px_100px_rgba(0,0,0,0.38)] backdrop-blur-xl sm:p-8">
          <Badge tone="olive">Ingresar</Badge>
          <h2 className="serif-display mt-4 text-4xl leading-tight">Volver a tu camino</h2>
          <p className="mt-3 text-sm leading-6 text-[#101b36]/62">
            Usa tu cuenta para continuar el acompanamiento.
          </p>
          {error ? (
            <div className="mt-5 rounded-md border border-[#ef7979]/35 bg-[#ef7979]/14 px-4 py-3 text-sm text-[#7f2437]">
              {error}
            </div>
          ) : null}
          <form action={signInAction} className="mt-7 grid gap-4">
            <input name="next" type="hidden" value={next} />
            <Input autoComplete="email" id="email" label="Email" name="email" placeholder="tu@email.com" required type="email" />
            <Input autoComplete="current-password" id="password" label="Contrasena" name="password" placeholder="********" required type="password" />
            <Button className="mt-2" type="submit">
              Ingresar
            </Button>
          </form>
          <div className="mt-5 flex items-center justify-between gap-3 text-sm text-[#101b36]/62">
            <span>No tenes cuenta?</span>
            <LinkButton href="/register" size="sm" variant="ghost">
              Crear cuenta
            </LinkButton>
          </div>
        </section>
      </div>
    </main>
  );
}
