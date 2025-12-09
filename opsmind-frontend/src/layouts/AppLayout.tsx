import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";
import { Outlet, useLocation } from "react-router-dom";

const navItems = [
  { label: "Dashboard", to: "/" },
  { label: "My Tickets", to: "/tickets" },
  { label: "Create Ticket", to: "/tickets/new" },
];

export function AppLayout() {
  const location = useLocation();

  const pageTitles: Record<string, string> = {
    "/": "Dashboard",
    "/tickets": "My Tickets",
    "/tickets/new": "Create Ticket",
  };

  return (
    <div>
      <Sidebar items={navItems} />
      <Topbar title={pageTitles[location.pathname] || "OpsMind"} />

      <main className="pt-20 pl-72 pr-6 pb-6 min-h-screen bg-background-light">
        <Outlet />
      </main>
    </div>
  );
}