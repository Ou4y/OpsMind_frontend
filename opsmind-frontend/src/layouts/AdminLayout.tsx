import { Outlet, NavLink } from "react-router-dom";

export default function AdminLayout() {
  return (
    <div>
      <header>Admin Portal</header>

      <nav style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
        <NavLink to="/admin/dashboard">Dashboard</NavLink>
        <NavLink to="/admin/users">Users</NavLink>
        <NavLink to="/admin/inventory">Inventory</NavLink>
        <NavLink to="/admin/categories">Categories</NavLink>
        <NavLink to="/admin/slas">SLAs</NavLink>
      </nav>

      <main>
        <Outlet />
      </main>
    </div>
  );
}