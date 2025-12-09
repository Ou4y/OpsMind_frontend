import { NavLink } from "react-router-dom";
import type { ReactNode } from "react";

export interface NavItem {
  label: string;
  to: string;
  icon?: ReactNode;
}

interface SidebarProps {
  items: NavItem[];
  title?: string;
}

export function Sidebar({ items, title }: SidebarProps) {
  return (
    <aside className="w-64 bg-[#0f172a] text-white h-screen fixed left-0 top-0 p-4">
      <h1 className="text-xl font-bold mb-6">{title}</h1>

      <nav className="space-y-2">
        {items.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end
            className={({ isActive }) =>
              `block px-4 py-3 rounded-lg transition ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "text-slate-300 hover:bg-slate-700"
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
