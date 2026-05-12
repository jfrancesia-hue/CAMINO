import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type BadgeTone = "gold" | "olive" | "sky" | "neutral";

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  children: ReactNode;
  tone?: BadgeTone;
};

const tones: Record<BadgeTone, string> = {
  gold: "border-[#d9b45f]/40 bg-[#d9b45f]/16 text-[#f4dfaa]",
  olive: "border-[#7b8f62]/45 bg-[#7b8f62]/18 text-[#dce8c3]",
  sky: "border-[#9fc9d9]/45 bg-[#9fc9d9]/14 text-[#d7f3fb]",
  neutral: "border-white/16 bg-white/10 text-white/78",
};

export function Badge({ children, className, tone = "gold", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em]",
        tones[tone],
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}
