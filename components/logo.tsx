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
          "relative grid h-9 w-9 place-items-center rounded-full border border-[#d9b45f]/35 bg-[#d9b45f]/12 shadow-[0_0_34px_rgba(217,180,95,0.2)]",
          markClassName,
        )}
      >
        <span className="absolute bottom-2 left-2 h-4 w-5 rounded-br-full border-b-2 border-r-2 border-[#f4dfaa]" />
        <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-[#d9b45f]" />
      </span>
      <span className="text-lg font-semibold tracking-normal">Camino</span>
    </span>
  );
}
