import { Outlet, useLocation } from "react-router-dom";
import { Sidebar, type NavItem } from "./Sidebar";
import { Topbar } from "./Topbar";

const techNav: NavItem[] = [
  { label: "Queue", to: "/technician/queue" },
  { label: "Workload", to: "/technician/workload" },
  { label: "SLA Risks", to: "/technician/sla-risks" },
  { label: "Technician Console", to: "/technician/TechnicianConsole" },
  { label: "Technician Notification Center", to: "/technician/TechnicianNotificationCenter" },
];

const techTitles: Record<string, string> = {
  "/technician/queue": "Ticket Queue",
  "/technician/workload": "Technician Workload",
  "/technician/sla-risks": "SLA Risks",
  "/technician/TechnicianConsole": "Technician Console",
  "/technician/TechnicianNotificationCenter": "Technician Notification Center",
  
};

export default function TechnicianLayout() {
  const location = useLocation();
  const title = techTitles[location.pathname] ?? "Technician Portal";

  return (
    <div className="bg-background-light min-h-screen">
      <Sidebar items={techNav} title="OpsMind – IT" />
      <Topbar title={title} roleLabel="IT Technician" />
      <main className="pt-20 pl-72 pr-6 pb-6">
        <Outlet />
      </main>
    </div>
  );
}