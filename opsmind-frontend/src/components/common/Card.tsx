import type { ReactNode } from "react";
import clsx from "clsx";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export function Card({ children, className }: CardProps) {
  return (
    <div
      className={clsx(
        "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-[var(--radius-lg)] shadow-[var(--shadow-smooth)] p-4",
        className
      )}
    >
      {children}
    </div>
  );
}