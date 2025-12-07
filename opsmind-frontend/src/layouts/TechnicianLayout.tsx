import { Outlet, NavLink } from "react-router-dom";

export default function TechnicianLayout() {
  return (
    <div>
      <header>IT Technician Portal</header>

      <nav style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
        <NavLink to="/technician/queue">Ticket Queue</NavLink>
        <NavLink to="/technician/sla">SLA Monitor</NavLink>
        <NavLink to="/technician/workload">Workload</NavLink>
      </nav>

      <main>
        <Outlet />
      </main>
    </div>
  );
}