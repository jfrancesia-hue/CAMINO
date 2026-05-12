import type { ReactNode } from "react";
import { Logo } from "@/components/logo";
import type { AppRoute } from "@/types/roles";

const defaultRoutes: Array<AppRoute & { icon: string }> = [
  { icon: "+", label: "Inicio", href: "/app" },
  { icon: "C", label: "Chat", href: "/app/chat" },
  { icon: "X", label: "Orar", href: "/app/orar" },
  { icon: "D", label: "Diario", href: "/app/diario" },
  { icon: "R", label: "Reflexiones", href: "/app/reflexiones" },
  { icon: "V", label: "Caminos", href: "/app/caminos" },
  { icon: "O", label: "Comunidad", href: "/app/comunidad" },
  { icon: "P", label: "Perfil", href: "/app/perfil" },
];

type AppShellProps = {
  children: ReactNode;
  routes?: Array<AppRoute & { icon?: string }>;
};

export function AppShell({ children, routes = defaultRoutes }: AppShellProps) {
  return (
    <div className="min-h-screen bg-[#070d1c] text-[#fff8e8]">
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_84%_10%,rgba(240,180,41,0.24),transparent_22rem),radial-gradient(circle_at_72%_54%,rgba(17,167,167,0.16),transparent_26rem),linear-gradient(135deg,#070d1c,#0c2147_48%,#2b1026)]" />
      <aside className="fixed inset-y-0 left-0 z-20 hidden w-72 overflow-y-auto border-r border-[#d7ad4f]/42 bg-[linear-gradient(180deg,#0c2147,#070d1c_62%,#201225)] px-5 py-6 text-[#fff8e8] shadow-[22px_0_90px_rgba(0,0,0,0.36)] lg:block">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(240,180,41,0.24),transparent_13rem),radial-gradient(circle_at_95%_36%,rgba(217,74,53,0.14),transparent_12rem)]" />
        <div className="relative">
          <a aria-label="Camino inicio" href="/app">
            <Logo className="text-[#fff8e8]" markClassName="border-[#f6dfa2]/70 bg-[#d7ad4f]/22" />
          </a>
          <div className="mt-8 rounded-[22px] border border-[#f6dfa2]/28 bg-[#d7ad4f]/12 p-4 shadow-[0_20px_58px_rgba(215,173,79,0.14)]">
            <p className="serif-display text-2xl leading-tight text-[#f6dfa2]">Tu capilla diaria</p>
            <p className="mt-2 text-xs leading-5 text-white/68">Un lugar para hablar, rezar y ordenar el corazon.</p>
          </div>
          <nav className="mt-8 grid gap-2">
            {routes.map((route) => (
              <a
                className="group flex items-center rounded-2xl border border-[#f6dfa2]/10 bg-[#fff8e8]/[0.035] px-3 py-3 text-sm font-semibold text-white/74 transition hover:border-[#f6dfa2]/42 hover:bg-[#d7ad4f]/18 hover:text-[#f6dfa2] hover:shadow-[0_12px_30px_rgba(215,173,79,0.12)]"
                href={route.href}
                key={route.href}
              >
                <span className="mr-3 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#d7ad4f]/38 bg-[radial-gradient(circle_at_35%_25%,#f6dfa2,#d7ad4f_45%,rgba(127,36,55,0.72))] text-xs font-black text-[#101b36] shadow-[0_10px_24px_rgba(215,173,79,0.18)] transition group-hover:scale-105 group-hover:border-[#f6dfa2]/80">
                  {route.icon ?? "+"}
                </span>
                <span>{route.label}</span>
              </a>
            ))}
          </nav>
        </div>
      </aside>
      <header className="relative z-20 border-b border-[#f6dfa2]/18 bg-[#070d1c]/88 px-5 py-4 shadow-[0_18px_50px_rgba(0,0,0,0.22)] backdrop-blur-xl lg:hidden">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center justify-between gap-4">
            <a aria-label="Camino inicio" href="/app">
              <Logo className="text-[#fff8e8]" markClassName="border-[#f6dfa2]/70 bg-[#d7ad4f]/22" />
            </a>
            <details className="group relative">
              <summary className="list-none rounded-full border border-[#d7ad4f]/46 bg-[#d7ad4f]/18 px-4 py-2 text-sm font-semibold text-[#f6dfa2] shadow-[0_12px_34px_rgba(215,173,79,0.14)] marker:hidden">
                Menu
              </summary>
              <nav className="absolute right-0 top-12 grid w-[min(88vw,22rem)] gap-2 rounded-3xl border border-[#f6dfa2]/24 bg-[#0c2147]/96 p-3 shadow-[0_28px_80px_rgba(0,0,0,0.42)] backdrop-blur-xl">
                {routes.map((route) => (
                  <a
                    className="flex items-center rounded-2xl border border-[#f6dfa2]/10 bg-[#fff8e8]/[0.045] px-3 py-3 text-sm font-semibold text-white/78 transition hover:border-[#f6dfa2]/36 hover:bg-[#d7ad4f]/18 hover:text-[#f6dfa2]"
                    href={route.href}
                    key={route.href}
                  >
                    <span className="mr-3 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#d7ad4f]/38 bg-[radial-gradient(circle_at_35%_25%,#f6dfa2,#d7ad4f_45%,rgba(127,36,55,0.72))] text-[11px] font-black text-[#101b36]">
                      {route.icon ?? "+"}
                    </span>
                    {route.label}
                  </a>
                ))}
              </nav>
            </details>
          </div>
        </div>
      </header>
      <main className="relative z-10 min-h-screen px-5 py-6 lg:ml-72 lg:px-10">
        <div className="mx-auto max-w-7xl">{children}</div>
      </main>
    </div>
  );
}
