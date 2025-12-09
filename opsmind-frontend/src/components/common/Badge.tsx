import clsx from "clsx";
import type { ReactNode } from "react";

type Variant = "success" | "warning" | "danger" | "neutral";

interface BadgeProps {
  children: ReactNode;
  variant?: Variant;
  className?: string;
}

export function Badge({ children, variant = "neutral", className }: BadgeProps) {
  const styles: Record<Variant, string> = {
    neutral: "bg-slate-100 text-slate-700",
    success: "bg-emerald/20 text-emerald",
    warning: "bg-amber/20 text-amber",
    danger: "bg-rose/20 text-rose",
  };

  return (
    <span
      className={clsx(
        "px-2 py-0.5 text-xs font-semibold rounded-full",
        styles[variant],
        className
      )}
    >
      {children}
    </span>
  );
}