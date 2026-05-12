import { Badge, Button, Input, LinkButton, Logo } from "@/components";
import { signUpAction } from "@/app/auth/actions";

type RegisterPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

export default async function RegisterPage({ searchParams }: RegisterPageProps) {
  const params = await searchParams;
  const error = typeof params?.error === "string" ? params.error : "";

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#070d1c] px-5 py-8">
      <img
        alt="Camino iluminado al amanecer"
        className="absolute inset-0 h-full w-full object-cover opacity-78"
        src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1800&q=88"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,13,28,0.88),rgba(12,33,71,0.42),rgba(7,13,28,0.78)),linear-gradient(180deg,rgba(7,13,28,0.12),#070d1c)]" />
      <div className="relative mx-auto grid min-h-[calc(100vh-4rem)] max-w-6xl items-center gap-10 lg:grid-cols-[1fr_0.78fr]">
        <section>
          <a aria-label="Camino inicio" href="/">
            <Logo />
          </a>
          <Badge className="mt-12">Comenzar</Badge>
          <h1 className="serif-display mt-5 max-w-3xl text-6xl leading-[0.95] text-[#fff8e8]">
            Abrir un espacio para volver a respirar.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-white/72">
            Tu cuenta guarda tu camino, tu diario y tus momentos de oracion con privacidad y cuidado.
          </p>
        </section>

        <section className="rounded-[28px] border border-[#f6dfa2]/24 bg-[#fff8e8]/92 p-6 text-[#101b36] shadow-[0_30px_100px_rgba(0,0,0,0.38)] backdrop-blur-xl sm:p-8">
          <Badge tone="olive">Crear cuenta</Badge>
          <h2 className="serif-display mt-4 text-4xl leading-tight">Tu espacio de paz</h2>
          <p className="mt-3 text-sm leading-6 text-[#101b36]/62">
            Despues vamos a personalizar el acompanamiento segun lo que estes viviendo.
          </p>
          {error ? (
            <div className="mt-5 rounded-md border border-[#ef7979]/35 bg-[#ef7979]/14 px-4 py-3 text-sm text-[#7f2437]">
              {error}
            </div>
          ) : null}
          <form action={signUpAction} className="mt-7 grid gap-4">
            <Input autoComplete="name" id="full_name" label="Nombre" name="full_name" placeholder="Tu nombre" required />
            <Input autoComplete="email" id="email" label="Email" name="email" placeholder="tu@email.com" required type="email" />
            <Input
              autoComplete="new-password"
              hint="Minimo 8 caracteres."
              id="password"
              label="Contrasena"
              name="password"
              placeholder="********"
              required
              type="password"
            />
            <Button className="mt-2" type="submit">
              Crear cuenta
            </Button>
          </form>
          <div className="mt-5 flex items-center justify-between gap-3 text-sm text-[#101b36]/62">
            <span>Ya tenes cuenta?</span>
            <LinkButton href="/login" size="sm" variant="ghost">
              Ingresar
            </LinkButton>
          </div>
        </section>
      </div>
    </main>
  );
}
