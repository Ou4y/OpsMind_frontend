import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Sidebar, type NavItem } from "./Sidebar";
import { Topbar } from "./Topbar";
import clsx from "clsx";

const studentNav: NavItem[] = [
  { label: "Dashboard", to: "/student/dashboard" },
  { label: "My Tickets", to: "/student/tickets" },
  { label: "Create Ticket", to: "/student/tickets/new" },
];

const studentTitles: Record<string, string> = {
  "/student/dashboard": "Dashboard",
  "/student/tickets": "My Tickets",
  "/student/tickets/new": "Create Ticket",
};

export default function StudentLayout() {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const title = studentTitles[location.pathname] ?? "Student Portal";

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Sidebar */}
      <Sidebar
        items={studentNav}
        title="Student Portal"
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Topbar */}
      <Topbar
        title={title}
        roleLabel="Student / Faculty / Employee"
        onMenuClick={() => setSidebarOpen(true)}
      />

      {/* Main Content */}
      <main
        className={clsx(
          "min-h-screen pt-20 pb-8 px-4 sm:px-6 lg:px-8",
          "lg:pl-80", // Account for sidebar on large screens (72 sidebar + 8 padding)
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
