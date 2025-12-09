import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./technician-ticket-details.css";

type TicketDetail = {
  id: string;
  title: string;
  priority: "High" | "Medium" | "Low";
  slaTime: string;
  requester: string;
  category: string;
  subcategory: string;
  status: string;
  assignee: string;
  description: string;
};

const ticketsData: Record<string, TicketDetail> = {
  "#INC-12345": {
    id: "#INC-12345",
    title: "Network printer is offline",
    priority: "High",
    slaTime: "2h 15m left",
    requester: "Angela Smith",
    category: "Hardware",
    subcategory: "Printers",
    status: "Open",
    assignee: "David Lee",
    description: "The main network printer on the 3rd floor (Model: HP LaserJet Enterprise M608) is showing as 'Offline' for all users. We've tried power cycling it, but it hasn't resolved the issue. Multiple departments rely on this printer for critical document printing. Please investigate as soon as possible.",
  },
  "#INC-12346": {
    id: "#INC-12346",
    title: "Cannot access shared drive",
    priority: "Medium",
    slaTime: "8h 30m left",
    requester: "John Doe",
    category: "Software",
    subcategory: "File Access",
    status: "Open",
    assignee: "Sarah Johnson",
    description: "User unable to access the shared drive Z:// since this morning. Error message shows permission denied.",
  },
  "#INC-12347": {
    id: "#INC-12347",
    title: "VPN connection issues",
    priority: "Low",
    slaTime: "22h 05m left",
    requester: "Bob Wilson",
    category: "Network",
    subcategory: "VPN",
    status: "Open",
    assignee: "Mike Chen",
    description: "VPN client disconnects frequently when working remotely.",
  },
};

const TechnicianTicketDetails: React.FC = () => {
  const navigate = useNavigate();
  const { ticketId } = useParams<{ ticketId?: string }>();
  // URL param may be encoded (encodeURIComponent) so decode it before lookup
  const decodedId = ticketId ? decodeURIComponent(ticketId) : undefined;
  const ticket = decodedId ? ticketsData[decodedId as keyof typeof ticketsData] : ticketsData["#INC-12345"];

  if (!ticket) {
    return (
      <div className="ticket-details-container">
        <div>Ticket not found</div>
      </div>
    );
  }

  const getPriorityColor = (p: string) => {
    switch (p) {
      case "High":
        return "priority-high";
      case "Medium":
        return "priority-medium";
      default:
        return "priority-low";
    }
  };

  return (
    <div className="ticket-details-container">
      {/* Header */}
      <div className="details-header">
        <button className="back-btn" onClick={() => navigate("/technician/TicketQueue")}>← Back</button>
        <h1 className="details-header-title">Ticket Details</h1>
        <button className="menu-btn">⋮</button>
      </div>

      {/* Main Content */}
      <div className="details-content">
        {/* Title and Status */}
        <h2 className="ticket-title-large">{ticket.title}</h2>
        
        <div className="status-badges">
          <span className={`priority-badge ${getPriorityColor(ticket.priority)}`}>
            ⚠️ {ticket.priority} Priority
          </span>
          <span className="sla-badge">⏱️ SLA: {ticket.slaTime}</span>
          <span className="lock-icon">🔒</span>
        </div>

        {/* Tabs */}
        <div className="tabs">
          <button className="tab-btn active">Details</button>
          <button className="tab-btn">Activity</button>
        </div>

        {/* Ticket Information */}
        <section className="info-section">
          <h3>Ticket Information</h3>
          
          <div className="info-row">
            <div className="info-label">Requester</div>
            <div className="info-value">{ticket.requester}</div>
          </div>
          
          <div className="info-row">
            <div className="info-label">Category</div>
            <div className="info-value">{ticket.category}  {ticket.subcategory}</div>
          </div>
          
          <div className="info-row">
            <div className="info-label">Status</div>
            <div className="info-value status-link">{ticket.status}</div>
          </div>
          
          <div className="info-row">
            <div className="info-label">Assignee</div>
            <div className="info-value editable">{ticket.assignee} ✏️</div>
          </div>
        </section>

        {/* Description */}
        <section className="description-section">
          <h3>Description</h3>
          <p className="description-text">{ticket.description}</p>
        </section>
      </div>

      {/* Action Buttons */}
      <div className="action-buttons">
        <button className="btn btn-accept">✓ Accept</button>
        <button className="btn btn-resolve">✓ Resolve</button>
        <button className="btn-more">⋯</button>
      </div>
    </div>
  );
};

export default TechnicianTicketDetails;
