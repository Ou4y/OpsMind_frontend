import { Outlet, useLocation } from "react-router-dom";
import { Sidebar, type NavItem } from "./Sidebar";
import { Topbar } from "./Topbar";

const studentNav: NavItem[] = [
  { label: "Dashboard", to: "/student/dashboard" },
  { label: "My Tickets", to: "/student/tickets" },
  { label: "Create Ticket", to: "/student/tickets/new" },
];

const studentTitles: Record<string, string> = {
  "/student/dashboard": "Student Dashboard",
  "/student/tickets": "My Tickets",
  "/student/tickets/new": "Create Ticket",
};

export default function StudentLayout() {
  const location = useLocation();
  const title = studentTitles[location.pathname] ?? "Student Portal";

  return (
    <div className="bg-background-light min-h-screen">
      <Sidebar items={studentNav} title="OpsMind – Student" />
      <Topbar title={title} rolelabel="Student / Faculty / Employee" />

      <main className="pt-20 pl-72 pr-6 pb-6">
        <Outlet />
      </main>
    </div>
  );
}
