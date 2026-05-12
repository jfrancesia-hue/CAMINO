import type { ReactNode } from "react";
import { Card } from "@/components/card";

type EmptyStateProps = {
  title: string;
  description: string;
  action?: ReactNode;
};

export function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <Card className="grid place-items-center px-6 py-12 text-center">
      <div className="max-w-md">
        <div className="mx-auto mb-5 h-12 w-12 rounded-full border border-[#d9b45f]/28 bg-[#d9b45f]/14" />
        <h2 className="text-xl font-semibold text-[#fffaf0]">{title}</h2>
        <p className="mt-3 text-sm leading-6 text-white/66">{description}</p>
        {action ? <div className="mt-6">{action}</div> : null}
      </div>
    </Card>
  );
}
