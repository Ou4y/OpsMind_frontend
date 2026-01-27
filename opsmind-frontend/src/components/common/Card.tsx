import type { ReactNode } from "react";
import clsx from "clsx";

interface CardProps {
  children: ReactNode;
  className?: string;
  padding?: "none" | "sm" | "md" | "lg";
  hover?: boolean;
}

const paddingStyles = {
  none: "p-0",
  sm: "p-3",
  md: "p-4 sm:p-5",
  lg: "p-5 sm:p-6",
};

export function Card({ children, className, padding = "md", hover = false }: CardProps) {
  return (
    <div
      className={clsx(
        "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-[var(--radius-lg)] shadow-[var(--shadow-smooth)]",
        paddingStyles[padding],
        hover && "transition-all duration-200 hover:shadow-md hover:border-slate-300 dark:hover:border-slate-600",
        className
      )}
    >
      {children}
    </div>
  );
}