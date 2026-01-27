import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Sidebar, type NavItem } from "./Sidebar";
import { Topbar } from "./Topbar";
import clsx from "clsx";

const adminNav: NavItem[] = [
  { label: "Dashboard", to: "/admin/dashboard" },
  { label: "Users", to: "/admin/users" },
  { label: "Analytics", to: "/admin/analytics" },
  { label: "SLA Rules", to: "/admin/slas" },
];

const adminTitles: Record<string, string> = {
  "/admin/dashboard": "Dashboard",
  "/admin/users": "User Management",
  "/admin/analytics": "Analytics",
  "/admin/slas": "SLA Rules",
};

export default function AdminLayout() {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const title = adminTitles[location.pathname] ?? "Admin Portal";

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Sidebar */}
      <Sidebar
        items={adminNav}
        title="Admin Portal"
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Topbar */}
      <Topbar
        title={title}
        roleLabel="Administrator"
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