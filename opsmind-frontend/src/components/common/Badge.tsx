import clsx from "clsx";
import type { ReactNode } from "react";

type Variant = "success" | "warning" | "danger" | "neutral" | "primary" | "info";
type Size = "sm" | "md";

interface BadgeProps {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  dot?: boolean;
  icon?: ReactNode;
  className?: string;
}

const variantStyles: Record<Variant, { bg: string; dot: string }> = {
  neutral: {
    bg: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
    dot: "bg-slate-400",
  },
  success: {
    bg: "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
    dot: "bg-emerald-500",
  },
  warning: {
    bg: "bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
    dot: "bg-amber-500",
  },
  danger: {
    bg: "bg-rose-50 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400",
    dot: "bg-rose-500",
  },
  primary: {
    bg: "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
    dot: "bg-blue-500",
  },
  info: {
    bg: "bg-cyan-50 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400",
    dot: "bg-cyan-500",
  },
};

const sizeStyles: Record<Size, string> = {
  sm: "px-2 py-0.5 text-xs",
  md: "px-2.5 py-1 text-sm",
};

export function Badge({
  children,
  variant = "neutral",
  size = "sm",
  dot = false,
  icon,
  className,
}: BadgeProps) {
  const style = variantStyles[variant];

  return (
    <span
      className={clsx(
        "inline-flex items-center gap-1.5 font-medium rounded-full",
        sizeStyles[size],
        style.bg,
        className
      )}
    >
      {dot && (
        <span
          className={clsx("w-1.5 h-1.5 rounded-full shrink-0", style.dot)}
          aria-hidden="true"
        />
      )}
      {icon && <span className="shrink-0" aria-hidden="true">{icon}</span>}
      {children}
    </span>
  );
}