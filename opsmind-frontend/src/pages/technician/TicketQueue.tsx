import React from "react";
import { useNavigate } from "react-router-dom";
import "./technician.css";

type Ticket = {
  id: string;
  title: string;
  category: string;
  status: string;
  priority: "High" | "Medium" | "Low";
  timeLeft: string;
};

const tickets: Ticket[] = [
  { id: "#INC-12345", title: "Network printer is offline", category: "Hardware", status: "In Progress", priority: "High", timeLeft: "2h 15m left" },
  { id: "#INC-12346", title: "Cannot access shared drive", category: "Software", status: "Open", priority: "Medium", timeLeft: "8h 30m left" },
  { id: "#INC-12347", title: "VPN connection issues", category: "Network", status: "Open", priority: "Low", timeLeft: "22h 05m left" },
  { id: "#INC-12348", title: "Software license renewal", category: "Software", status: "Pending", priority: "Medium", timeLeft: "3d 4h left" },
  { id: "#INC-12349", title: "Server room temperature alert", category: "Hardware", status: "In Progress", priority: "High", timeLeft: "45m left" },
];

const priorityClass = (p: Ticket["priority"]) => {
  switch (p) {
    case "High":
      return "badge badge-high";
    case "Medium":
      return "badge badge-medium";
    default:
      return "badge badge-low";
  }
};

const TechnicianQueue: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="tech-root">
      <section className="tech-filters">
        <div className="filter-row">
          {["Priority", "Category", "SLA Warning"].map((f) => (
            <button key={f} className="filter-pill">
              <span>{f}</span>
              <span className="chev">▾</span>
            </button>
          ))}
        </div>
        <div className="sort-row">Sort by: <strong>Priority ▾</strong></div>
      </section>

      <main className="tech-list">
        {tickets.map((t) => (
          <article 
            className="ticket-card" 
            key={t.id}
            onClick={() => navigate(`/technician/TechnicianTicketDetails/${encodeURIComponent(t.id)}`)}
            style={{ cursor: "pointer" }}
          >
            <div className="ticket-top">
              <div className="ticket-id">{t.id}</div>
              <div className={priorityClass(t.priority)}>{t.priority}</div>
            </div>
            <h2 className="ticket-title">{t.title}</h2>
            <div className="ticket-bottom">
              <div className="ticket-meta">{t.category} • {t.status}</div>
              <div className="ticket-time">{t.timeLeft}</div>
            </div>
          </article>
        ))}
      </main>

      <button className="fab">＋</button>
    </div>
  );
};

export default TechnicianQueue;
