import type { ReactNode } from "react";
import { Logo } from "@/components/logo";
import type { AppRoute } from "@/types/roles";

const defaultRoutes: AppRoute[] = [
  { label: "Inicio", href: "/app" },
  { label: "Chat", href: "/app/chat" },
  { label: "Orar", href: "/app/orar" },
  { label: "Diario", href: "/app/diario" },
  { label: "Reflexiones", href: "/app/reflexiones" },
  { label: "Caminos", href: "/app/caminos" },
  { label: "Comunidad", href: "/app/comunidad" },
  { label: "Perfil", href: "/app/perfil" },
];

type AppShellProps = {
  children: ReactNode;
  routes?: AppRoute[];
};

export function AppShell({ children, routes = defaultRoutes }: AppShellProps) {
  return (
    <div className="min-h-screen bg-[#08111f] text-[#fffaf0]">
      <aside className="fixed inset-y-0 left-0 hidden w-64 border-r border-white/10 bg-white/[0.045] px-5 py-6 backdrop-blur-xl lg:block">
        <a aria-label="Camino inicio" href="/app">
          <Logo />
        </a>
        <nav className="mt-10 grid gap-1">
          {routes.map((route) => (
            <a
              className="rounded-md px-3 py-2 text-sm text-white/68 transition hover:bg-white/9 hover:text-[#fffaf0]"
              href={route.href}
              key={route.href}
            >
              {route.label}
            </a>
          ))}
        </nav>
      </aside>
      <main className="min-h-screen px-5 py-6 lg:ml-64 lg:px-10">
        <div className="mx-auto max-w-6xl">{children}</div>
      </main>
    </div>
  );
}
