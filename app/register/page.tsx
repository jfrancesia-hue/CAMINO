import { Badge, Button, Card, Input, LinkButton, Logo } from "@/components";
import { signUpAction } from "@/app/auth/actions";

type RegisterPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

export default async function RegisterPage({ searchParams }: RegisterPageProps) {
  const params = await searchParams;
  const error = typeof params?.error === "string" ? params.error : "";

  return (
    <main className="grid min-h-screen place-items-center px-5 py-10">
      <Card className="w-full max-w-md">
        <a aria-label="Camino inicio" href="/">
          <Logo />
        </a>
        <Badge className="mt-8">Comenzar</Badge>
        <h1 className="mt-4 text-3xl font-semibold">Crear tu espacio de paz</h1>
        <p className="mt-3 text-sm leading-6 text-white/66">
          Empeza con una cuenta privada. Despues vamos a personalizar tu acompanamiento.
        </p>
        {error ? (
          <div className="mt-5 rounded-md border border-[#ef7979]/35 bg-[#ef7979]/14 px-4 py-3 text-sm text-[#ffd7d7]">
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
        <div className="mt-5 flex items-center justify-between gap-3 text-sm text-white/62">
          <span>Ya tenes cuenta?</span>
          <LinkButton href="/login" size="sm" variant="ghost">
            Ingresar
          </LinkButton>
        </div>
      </Card>
    </main>
  );
}
