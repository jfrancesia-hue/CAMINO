import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
type ButtonSize = "sm" | "md" | "lg";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
};

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-[#d9b45f] text-[#111827] shadow-[0_18px_40px_rgba(217,180,95,0.24)] hover:bg-[#f4dfaa]",
  secondary:
    "border border-white/16 bg-white/10 text-[#fffaf0] shadow-[0_16px_36px_rgba(0,0,0,0.18)] hover:bg-white/16",
  ghost: "text-[#fffaf0] hover:bg-white/10",
  danger: "bg-[#ef7979] text-[#111827] hover:bg-[#ff9696]",
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-9 px-3 text-sm",
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-6 text-base",
};

export function buttonStyles({
  className,
  size = "md",
  variant = "primary",
}: {
  className?: string;
  size?: ButtonSize;
  variant?: ButtonVariant;
}) {
  return cn(
    "inline-flex items-center justify-center gap-2 rounded-md font-semibold transition duration-200 focus:outline-none focus:ring-2 focus:ring-[#d9b45f]/70 focus:ring-offset-2 focus:ring-offset-[#08111f] disabled:cursor-not-allowed disabled:opacity-50",
    variants[variant],
    sizes[size],
    className,
  );
}

export function Button({
  children,
  className,
  variant = "primary",
  size = "md",
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      className={buttonStyles({ className, size, variant })}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
}

type LinkButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
};

export function LinkButton({
  children,
  className,
  variant = "primary",
  size = "md",
  ...props
}: LinkButtonProps) {
  return (
    <a className={buttonStyles({ className, size, variant })} {...props}>
      {children}
    </a>
  );
}
