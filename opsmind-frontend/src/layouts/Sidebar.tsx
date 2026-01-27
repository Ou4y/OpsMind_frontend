import { NavLink } from "react-router-dom";
import type { ReactNode } from "react";
import clsx from "clsx";

export interface NavItem {
  label: string;
  to: string;
  icon?: ReactNode;
}

interface SidebarProps {
  items: NavItem[];
  title?: string;
  isOpen?: boolean;
  onClose?: () => void;
}

// Icon components for navigation items
const Icons = {
  Dashboard: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  ),
  Tickets: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
    </svg>
  ),
  Create: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
    </svg>
  ),
  Users: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  ),
  Analytics: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  ),
  SLA: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  Queue: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
    </svg>
  ),
  Workload: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
    </svg>
  ),
  Console: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  ),
  Bell: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
    </svg>
  ),
};

// Map labels to icons
function getIconForLabel(label: string): ReactNode {
  const iconMap: Record<string, () => ReactNode> = {
    Dashboard: Icons.Dashboard,
    "My Tickets": Icons.Tickets,
    "Create Ticket": Icons.Create,
    Users: Icons.Users,
    Analytics: Icons.Analytics,
    "SLA Rules": Icons.SLA,
    "SLA Risks": Icons.SLA,
    Queue: Icons.Queue,
    Workload: Icons.Workload,
    "Technician Console": Icons.Console,
    "Technician Notification Center": Icons.Bell,
  };
  const IconComponent = iconMap[label];
  return IconComponent ? IconComponent() : <Icons.Dashboard />;
}

export function Sidebar({ items, title, isOpen = false, onClose }: SidebarProps) {
  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 lg:hidden transition-opacity"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={clsx(
          "fixed top-0 left-0 z-50 h-screen w-72 flex flex-col",
          "bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800",
          "border-r border-slate-700/50",
          "transition-transform duration-300 ease-in-out",
          // Mobile: hidden by default, shown when isOpen
          "lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Logo / Brand */}
        <div className="flex items-center justify-between h-16 px-5 border-b border-slate-700/50">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-blue-400 flex items-center justify-center shadow-lg shadow-primary/25">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <h1 className="text-white font-bold text-lg tracking-tight">OpsMind</h1>
              {title && (
                <p className="text-xs text-slate-400 -mt-0.5">{title.replace("OpsMind – ", "")}</p>
              )}
            </div>
          </div>
          
          {/* Close button for mobile */}
          <button
            onClick={onClose}
            className="lg:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700/50 transition-colors"
            aria-label="Close menu"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 px-3">
          <ul className="space-y-1">
            {items.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.to.endsWith("dashboard") || item.to.endsWith("queue")}
                  onClick={onClose}
                  className={({ isActive }) =>
                    clsx(
                      "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200",
                      isActive
                        ? "bg-primary text-white shadow-lg shadow-primary/25"
                        : "text-slate-300 hover:bg-slate-700/50 hover:text-white"
                    )
                  }
                >
                  <span className="shrink-0">
                    {item.icon || getIconForLabel(item.label)}
                  </span>
                  <span>{item.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-slate-700/50">
          <div className="flex items-center gap-3 px-3 py-2 rounded-xl bg-slate-800/50">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white text-sm font-bold">
              G
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">Guest User</p>
              <p className="text-xs text-slate-400 truncate">guest@example.com</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
