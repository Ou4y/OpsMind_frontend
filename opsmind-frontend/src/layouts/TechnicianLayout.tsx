import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Sidebar, type NavItem } from "./Sidebar";
import { Topbar } from "./Topbar";
import clsx from "clsx";

const techNav: NavItem[] = [
  { label: "Queue", to: "/technician/queue" },
  { label: "Workload", to: "/technician/workload" },
  { label: "SLA Risks", to: "/technician/sla-risks" },
  { label: "Technician Console", to: "/technician/TechnicianConsole" },
  { label: "Technician Notification Center", to: "/technician/TechnicianNotificationCenter" },
];

const techTitles: Record<string, string> = {
  "/technician/queue": "Ticket Queue",
  "/technician/workload": "Workload",
  "/technician/sla-risks": "SLA Risks",
  "/technician/TechnicianConsole": "Console",
  "/technician/TechnicianNotificationCenter": "Notifications",
};

export default function TechnicianLayout() {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const title = techTitles[location.pathname] ?? "Technician Portal";

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Sidebar */}
      <Sidebar
        items={techNav}
        title="IT Support"
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Topbar */}
      <Topbar
        title={title}
        roleLabel="IT Technician"
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