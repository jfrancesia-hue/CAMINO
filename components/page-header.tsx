import type { ReactNode } from "react";
import { Badge } from "@/components/badge";

type PageHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: ReactNode;
};

export function PageHeader({ eyebrow, title, description, action }: PageHeaderProps) {
  return (
    <header className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
      <div className="max-w-3xl">
        {eyebrow ? <Badge>{eyebrow}</Badge> : null}
        <h1 className="mt-4 text-3xl font-semibold leading-tight text-[#fffaf0] sm:text-5xl">
          {title}
        </h1>
        {description ? <p className="mt-4 text-base leading-7 text-white/68">{description}</p> : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </header>
  );
}
