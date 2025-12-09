interface TopbarProps {
  title: string;
  roleLabel?: string;
}

export function Topbar({ title, roleLabel }: TopbarProps) {
  return (
    <header className="h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 pl-72 pr-6 flex items-center justify-between fixed top-0 left-0 right-0 z-10">
      <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
        {title}
      </h2>

      <div className="flex items-center gap-3">
        {/* Role label tag */}
        <span className="text-xs font-medium px-2 py-1 rounded-full bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200">
          {roleLabel}
        </span>

        {/* Avatar placeholder */}
        <div className="w-9 h-9 rounded-full bg-slate-300" />
      </div>
    </header>
  );
}