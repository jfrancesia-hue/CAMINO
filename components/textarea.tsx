import type { TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
  hint?: string;
};

export function Textarea({ className, id, label, hint, ...props }: TextareaProps) {
  return (
    <label className="grid gap-2 text-sm text-white/80" htmlFor={id}>
      {label ? <span className="font-medium text-[#fffaf0]">{label}</span> : null}
      <textarea
        className={cn(
          "min-h-32 resize-y rounded-md border border-white/14 bg-white/9 px-4 py-3 text-[#fffaf0] outline-none transition placeholder:text-white/38 focus:border-[#d9b45f]/70 focus:ring-2 focus:ring-[#d9b45f]/20",
          className,
        )}
        id={id}
        {...props}
      />
      {hint ? <span className="text-xs text-white/55">{hint}</span> : null}
    </label>
  );
}
