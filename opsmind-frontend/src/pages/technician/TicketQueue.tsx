import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "../../components/common/Card";
import { PageHeader } from "../../components/common/PageHeader";
import clsx from "clsx";

// Types
type Priority = "High" | "Medium" | "Low";
type TicketStatus = "Open" | "In Progress" | "Pending" | "Resolved";

interface Ticket {
  id: string;
  title: string;
  category: string;
  status: TicketStatus;
  priority: Priority;
  timeLeft: string;
  assignee?: string;
}

// Mock data
const tickets: Ticket[] = [
  { id: "#INC-12345", title: "Network printer is offline", category: "Hardware", status: "In Progress", priority: "High", timeLeft: "2h 15m left", assignee: "John D." },
  { id: "#INC-12346", title: "Cannot access shared drive", category: "Software", status: "Open", priority: "Medium", timeLeft: "8h 30m left" },
  { id: "#INC-12347", title: "VPN connection issues", category: "Network", status: "Open", priority: "Low", timeLeft: "22h 05m left" },
  { id: "#INC-12348", title: "Software license renewal", category: "Software", status: "Pending", priority: "Medium", timeLeft: "3d 4h left", assignee: "Sarah M." },
  { id: "#INC-12349", title: "Server room temperature alert", category: "Hardware", status: "In Progress", priority: "High", timeLeft: "45m left", assignee: "Mike R." },
];

// Priority configuration
const priorityConfig: Record<Priority, { bg: string; text: string; dot: string }> = {
  High: { bg: "bg-rose-50", text: "text-rose-700", dot: "bg-rose-500" },
  Medium: { bg: "bg-amber-50", text: "text-amber-700", dot: "bg-amber-500" },
  Low: { bg: "bg-slate-100", text: "text-slate-600", dot: "bg-slate-400" },
};

// Status configuration
const statusConfig: Record<TicketStatus, { bg: string; text: string }> = {
  Open: { bg: "bg-emerald-50", text: "text-emerald-700" },
  "In Progress": { bg: "bg-blue-50", text: "text-blue-700" },
  Pending: { bg: "bg-amber-50", text: "text-amber-700" },
  Resolved: { bg: "bg-slate-100", text: "text-slate-600" },
};

// Filter options
const filterOptions = {
  priority: ["All", "High", "Medium", "Low"],
  category: ["All", "Hardware", "Software", "Network"],
  status: ["All", "Open", "In Progress", "Pending"],
};

// Ticket Card Component
function TicketCard({ ticket, onClick }: { ticket: Ticket; onClick: () => void }) {
  const priority = priorityConfig[ticket.priority];
  const status = statusConfig[ticket.status];
  const isUrgent = ticket.priority === "High" && ticket.timeLeft.includes("m");

  return (
    <Card
      className={clsx(
        "cursor-pointer transition-all duration-200",
        "hover:shadow-md hover:border-slate-300 hover:-translate-y-0.5",
        isUrgent && "border-l-4 border-l-rose-500"
      )}
    >
      <button onClick={onClick} className="w-full text-left focus:outline-none">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm font-semibold text-primary">{ticket.id}</span>
            <span className={clsx("inline-flex items-center gap-1.5 px-2 py-0.5 text-xs font-medium rounded-full", priority.bg, priority.text)}>
              <span className={clsx("w-1.5 h-1.5 rounded-full", priority.dot)} />
              {ticket.priority}
            </span>
          </div>
          <span className={clsx("text-xs font-medium px-2 py-1 rounded-full shrink-0", status.bg, status.text)}>
            {ticket.status}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-slate-900 font-medium line-clamp-2 mb-3">{ticket.title}</h3>

        {/* Footer */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-slate-100">
          <div className="flex items-center gap-3 text-sm text-slate-500">
            <span className="inline-flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
              {ticket.category}
            </span>
            {ticket.assignee && (
              <span className="inline-flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                {ticket.assignee}
              </span>
            )}
          </div>
          <span className={clsx("text-xs font-semibold", isUrgent ? "text-rose-600" : "text-slate-500")}>
            ⏱ {ticket.timeLeft}
          </span>
        </div>
      </button>
    </Card>
  );
}

export default function TechnicianQueue() {
  const navigate = useNavigate();
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [sortBy, setSortBy] = useState<"priority" | "time">("priority");

  // Filter tickets
  const filteredTickets = tickets.filter((ticket) => {
    const matchPriority = priorityFilter === "All" || ticket.priority === priorityFilter;
    const matchCategory = categoryFilter === "All" || ticket.category === categoryFilter;
    return matchPriority && matchCategory;
  });

  // Sort tickets
  const sortedTickets = [...filteredTickets].sort((a, b) => {
    if (sortBy === "priority") {
      const order = { High: 0, Medium: 1, Low: 2 };
      return order[a.priority] - order[b.priority];
    }
    return 0;
  });

  const urgentCount = tickets.filter((t) => t.priority === "High").length;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <PageHeader
        title="Ticket Queue"
        subtitle={`${filteredTickets.length} tickets • ${urgentCount} high priority`}
      />

      {/* Filters */}
      <Card padding="sm" className="sticky top-20 z-10 bg-white/95 backdrop-blur-sm">
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Priority Filter */}
          <div className="flex-1">
            <label className="text-xs font-medium text-slate-500 mb-1 block">Priority</label>
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            >
              {filterOptions.priority.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>

          {/* Category Filter */}
          <div className="flex-1">
            <label className="text-xs font-medium text-slate-500 mb-1 block">Category</label>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            >
              {filterOptions.category.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>

          {/* Sort */}
          <div className="flex-1">
            <label className="text-xs font-medium text-slate-500 mb-1 block">Sort by</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as "priority" | "time")}
              className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            >
              <option value="priority">Priority</option>
              <option value="time">Time Left</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Ticket List */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
        {sortedTickets.map((ticket) => (
          <TicketCard
            key={ticket.id}
            ticket={ticket}
            onClick={() => navigate(`/technician/TechnicianTicketDetails/${encodeURIComponent(ticket.id)}`)}
          />
        ))}
      </div>

      {/* Empty State */}
      {sortedTickets.length === 0 && (
        <Card>
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">📋</span>
            </div>
            <h3 className="text-lg font-semibold text-slate-700 mb-1">No tickets found</h3>
            <p className="text-sm text-slate-500">Try adjusting your filters to see more results.</p>
          </div>
        </Card>
      )}

      {/* Floating Action Button for mobile */}
      <button
        className={clsx(
          "fixed bottom-6 right-6 w-14 h-14 rounded-full",
          "bg-primary text-white shadow-lg shadow-primary/30",
          "flex items-center justify-center",
          "hover:bg-primary-dark transition-colors",
          "focus:outline-none focus:ring-4 focus:ring-primary/20",
          "lg:hidden" // Hide on larger screens
        )}
        aria-label="Create new ticket"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      </button>
    </div>
  );
}
