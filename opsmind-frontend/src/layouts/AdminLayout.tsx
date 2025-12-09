import { Outlet, useLocation } from "react-router-dom";
import { Sidebar, type NavItem } from "./Sidebar";
import { Topbar } from "./Topbar";

const adminNav: NavItem[] = [
  { label: "Dashboard", to: "/admin/dashboard" },
  { label: "Users", to: "/admin/users" },
  { label: "Analytics", to: "/admin/analytics" },
  { label: "SLA Rules", to: "/admin/slas" },
];

const adminTitles: Record<string, string> = {
  "/admin/dashboard": "Admin Dashboard",
  "/admin/users": "User Management",
  "/admin/analytics": "Analytics",
  "/admin/slas": "SLA Rules",
};

export default function AdminLayout() {
  const location = useLocation();
  const title = adminTitles[location.pathname] ?? "Admin Portal";

  return (
    <div className="bg-background-light min-h-screen">
      <Sidebar items={adminNav} title="OpsMind – Admin" />
      <Topbar title={title} roleLabel="Admin" />
      <main className="pt-20 pl-72 pr-6 pb-6">
        <Outlet />
      </main>
    </div>
  );
}