"use client";

import { cn } from "@/lib/format";
import type { ButtonHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "ghost";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  fullWidth?: boolean;
};

const variants: Record<Variant, string> = {
  primary:
    "bg-accent text-white hover:bg-pressed disabled:bg-[#C5C0BA] disabled:text-white",
  secondary:
    "bg-surface text-ink border border-border hover:border-ink disabled:opacity-50",
  ghost: "bg-transparent text-ink hover:bg-black/[0.04] disabled:opacity-50",
};

export function Button({
  variant = "primary",
  fullWidth,
  className,
  children,
  ...props
}: Props) {
  return (
    <button
      className={cn(
        "inline-flex min-h-11 items-center justify-center gap-2 rounded-xl px-5 text-[16px] font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 disabled:cursor-not-allowed",
        variants[variant],
        fullWidth && "w-full",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
