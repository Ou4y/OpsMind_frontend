import type { ReactNode } from "react";
import clsx from "clsx";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
  className?: string;
}

export function PageHeader({ title, subtitle, actions, className }: PageHeaderProps) {
  return (
    <div className={clsx("flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 sm:mb-8", className)}>
      <div className="space-y-1">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
            {subtitle}
          </p>
        )}
      </div>
      {actions && (
        <div className="flex items-center gap-3 shrink-0">
          {actions}
        </div>
      )}
    </div>
  );
}