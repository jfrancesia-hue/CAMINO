import type { InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  hint?: string;
};

export function Input({ className, id, label, hint, ...props }: InputProps) {
  return (
    <label className="grid gap-2 text-sm text-white/80" htmlFor={id}>
      {label ? <span className="font-medium text-[#fffaf0]">{label}</span> : null}
      <input
        className={cn(
          "h-11 rounded-md border border-white/14 bg-white/9 px-4 text-[#fffaf0] outline-none transition placeholder:text-white/38 focus:border-[#d9b45f]/70 focus:ring-2 focus:ring-[#d9b45f]/20",
          className,
        )}
        id={id}
        {...props}
      />
      {hint ? <span className="text-xs text-white/55">{hint}</span> : null}
    </label>
  );
}
