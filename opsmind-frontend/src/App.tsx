import { Routes, Route, Navigate } from "react-router-dom";

import StudentLayout from "./layouts/StudentLayout";
import TechnicianLayout from "./layouts/TechnicianLayout";
import AdminLayout from "./layouts/AdminLayout";

// student pages
import StudentDashboard from "./pages/student/Dashboard";
import MyTickets from "./pages/student/MyTickets";
import NewTicket from "./pages/student/NewTicket";

// technician pages
import TechQueue from "./pages/technician/TicketQueue";
import TechWorkload from "./pages/technician/Workload";
import TechSlaRisks from "./pages/technician/SLAView";

// admin pages
import AdminDashboard from "./pages/admin/Dashboard";
import AdminUsers from "./pages/admin/Users";
import AdminAnalytics from "./pages/admin/Analytics";
import AdminSlas from "./pages/admin/SLAs";


export default function App() {
  return (
    <Routes>
      {/* STUDENT / FACULTY / EMPLOYEE */}
      <Route path="/student" element={<StudentLayout />}>
        <Route path="dashboard" element={<StudentDashboard />} />
        <Route path="tickets/" element={<MyTickets />} />
        <Route path="tickets/:new" element={<NewTicket />} />
        

        <Route index element={<Navigate to="dashboard" replace />} />
      </Route>

      {/* TECHNICIAN */}
      <Route path="/technician" element={<TechnicianLayout />}>
        <Route path="queue" element={<TechQueue />} />
        <Route path="workload" element={<TechWorkload />} />
        <Route path="sla-risks" element={<TechSlaRisks />} />
        <Route index element={<Navigate to="queue" replace />} />
      </Route>

      {/* ADMIN */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="users" element={<AdminUsers />} />
        <Route path="analytics" element={<AdminAnalytics />} />
        <Route path="slas" element={<AdminSlas />} />
        <Route index element={<Navigate to="dashboard" replace />} />
      </Route>

      {/* DEFAULT REDIRECT */}
      <Route path="*" element={<Navigate to="/student/dashboard" replace />} />
    </Routes>
  );
}