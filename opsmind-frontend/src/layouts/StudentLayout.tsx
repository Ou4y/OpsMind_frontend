import { Outlet, NavLink } from "react-router-dom";

export default function StudentLayout() {
  return (
    <div>
      <header>Student / Faculty / Employee Portal</header>

      <nav style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
        <NavLink to="/student/dashboard">Dashboard</NavLink>
        <NavLink to="/student/tickets">My Tickets</NavLink>
        <NavLink to="/student/tickets/new">New Ticket</NavLink>
      </nav>

      <main>
        <Outlet />
      </main>
    </div>
  );
}