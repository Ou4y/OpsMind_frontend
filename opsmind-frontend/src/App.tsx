import { Routes, Route, Navigate } from "react-router-dom";

import StudentLayout from "./layouts/StudentLayout";
import TechnicianLayout from "./layouts/TechnicianLayout";
import AdminLayout from "./layouts/AdminLayout";

// Student pages
import StudentDashboard from "./pages/student/Dashboard";
import MyTickets from "./pages/student/MyTickets";
import NewTicket from "./pages/student/NewTicket";

// Technician pages
import TicketQueue from "./pages/technician/TicketQueue";
import SLAView from "./pages/technician/SLAView";
import Workload from "./pages/technician/Workload";

// Admin pages
import AdminDashboard from "./pages/admin/Dashboard";
import Users from "./pages/admin/Users";
import Inventory from "./pages/admin/Inventory";
import Categories from "./pages/admin/Categories";
import SLAs from "./pages/admin/SLAs";

function App() {
  return (
    <Routes>
      {/* Student / Faculty / Employee Portal */}
      <Route path="/student" element={<StudentLayout />}>
        <Route path="dashboard" element={<StudentDashboard />} />
        <Route path="tickets" element={<MyTickets />} />
        <Route path="tickets/new" element={<NewTicket />} />
        <Route index element={<Navigate to="dashboard" replace />} />
      </Route>

      {/* Technician Portal */}
      <Route path="/technician" element={<TechnicianLayout />}>
        <Route path="queue" element={<TicketQueue />} />
        <Route path="sla" element={<SLAView />} />
        <Route path="workload" element={<Workload />} />
        <Route index element={<Navigate to="queue" replace />} />
      </Route>

      {/* Admin Portal */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="users" element={<Users />} />
        <Route path="inventory" element={<Inventory />} />
        <Route path="categories" element={<Categories />} />
        <Route path="slas" element={<SLAs />} />
        <Route index element={<Navigate to="dashboard" replace />} />
      </Route>

      {/* Default redirect */}
      <Route path="*" element={<Navigate to="/student/dashboard" replace />} />
    </Routes>
  );
}

export default App;