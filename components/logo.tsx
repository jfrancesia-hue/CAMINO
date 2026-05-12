import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  markClassName?: string;
};

export function Logo({ className, markClassName }: LogoProps) {
  return (
    <span className={cn("inline-flex items-center gap-3 text-[#fffaf0]", className)}>
      <span
        aria-hidden="true"
        className={cn(
          "relative grid h-11 w-11 place-items-center rounded-full border border-[#f6dfa2]/55 bg-[#d7ad4f]/16 shadow-[0_0_42px_rgba(215,173,79,0.28)]",
          markClassName,
        )}
      >
        <span className="absolute h-7 w-1.5 rounded-full bg-[#f6dfa2]" />
        <span className="absolute h-1.5 w-5 rounded-full bg-[#f6dfa2]" />
        <span className="absolute inset-1 rounded-full border border-[#fff8e8]/18" />
      </span>
      <span className="text-lg font-semibold tracking-normal">Camino</span>
    </span>
  );
}
