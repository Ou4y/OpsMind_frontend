import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Sidebar, type NavItem } from "./Sidebar";
import { Topbar } from "./Topbar";
import clsx from "clsx";

const navItems: NavItem[] = [
  { label: "Dashboard", to: "/" },
  { label: "My Tickets", to: "/tickets" },
  { label: "Create Ticket", to: "/tickets/new" },
];

const pageTitles: Record<string, string> = {
  "/": "Dashboard",
  "/tickets": "My Tickets",
  "/tickets/new": "Create Ticket",
};

export function AppLayout() {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const title = pageTitles[location.pathname] || "OpsMind";

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Sidebar */}
      <Sidebar
        items={navItems}
        title="OpsMind"
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Topbar */}
      <Topbar
        title={title}
        onMenuClick={() => setSidebarOpen(true)}
      />

      {/* Main Content */}
      <main
        className={clsx(
          "min-h-screen pt-20 pb-8 px-4 sm:px-6 lg:px-8",
          "lg:pl-80", // Account for sidebar on large screens
          "transition-all duration-300"
        )}
      >
        <div className="max-w-6xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}