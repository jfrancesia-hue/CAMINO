import { Badge, Button, Card, Input, LinkButton, Logo } from "@/components";
import { signInAction } from "@/app/auth/actions";

type LoginPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const params = await searchParams;
  const error = typeof params?.error === "string" ? params.error : "";
  const next = typeof params?.next === "string" ? params.next : "/app";

  return (
    <main className="grid min-h-screen place-items-center px-5 py-10">
      <Card className="w-full max-w-md">
        <a aria-label="Camino inicio" href="/">
          <Logo />
        </a>
        <Badge className="mt-8">Ingresar</Badge>
        <h1 className="mt-4 text-3xl font-semibold">Volver a tu camino</h1>
        <p className="mt-3 text-sm leading-6 text-white/66">
          Entra para continuar tu diario, tus reflexiones y tus espacios de acompanamiento.
        </p>
        {error ? (
          <div className="mt-5 rounded-md border border-[#ef7979]/35 bg-[#ef7979]/14 px-4 py-3 text-sm text-[#ffd7d7]">
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
        <div className="mt-5 flex items-center justify-between gap-3 text-sm text-white/62">
          <span>No tenes cuenta?</span>
          <LinkButton href="/register" size="sm" variant="ghost">
            Crear cuenta
          </LinkButton>
        </div>
      </Card>
    </main>
  );
}
