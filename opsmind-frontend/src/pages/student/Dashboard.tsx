import { useNavigate } from "react-router-dom";
import { Card } from "../../components/common/Card";
import { PageHeader } from "../../components/common/PageHeader";
import { Button } from "../../components/common/Button";
import clsx from "clsx";

// Types
type TicketStatus = "OPEN" | "IN PROGRESS" | "RESOLVED";
type TicketCategory = "Network" | "Hardware" | "Software" | "Account";

interface Ticket {
  id: string;
  title: string;
  category: TicketCategory;
  due: string;
  status: TicketStatus;
}

// Mock data
const tickets: Ticket[] = [
  {
    id: "#IT-84321",
    title: "Cannot connect to campus Wi-Fi",
    category: "Network",
    due: "Due in 3 hours",
    status: "OPEN",
  },
  {
    id: "#HW-58290",
    title: "Laptop screen is flickering",
    category: "Hardware",
    due: "Due in 2 days",
    status: "IN PROGRESS",
  },
  {
    id: "#SW-19874",
    title: "Unable to install licensed software",
    category: "Software",
    due: "Due in 1 week",
    status: "IN PROGRESS",
  },
  {
    id: "#AC-33219",
    title: "Password reset request",
    category: "Account",
    due: "Resolved 2 days ago",
    status: "RESOLVED",
  },
];

// Status configuration
const statusConfig: Record<TicketStatus, { bg: string; text: string; dot: string; label: string }> = {
  OPEN: {
    bg: "bg-emerald-50",
    text: "text-emerald-700",
    dot: "bg-emerald-500",
    label: "Open",
  },
  "IN PROGRESS": {
    bg: "bg-amber-50",
    text: "text-amber-700",
    dot: "bg-amber-500",
    label: "In Progress",
  },
  RESOLVED: {
    bg: "bg-slate-100",
    text: "text-slate-600",
    dot: "bg-slate-400",
    label: "Resolved",
  },
};

// Category configuration
const categoryConfig: Record<TicketCategory, { bg: string; text: string; icon: string }> = {
  Network: { bg: "bg-blue-50", text: "text-blue-700", icon: "🌐" },
  Hardware: { bg: "bg-amber-50", text: "text-amber-700", icon: "💻" },
  Software: { bg: "bg-pink-50", text: "text-pink-700", icon: "📦" },
  Account: { bg: "bg-purple-50", text: "text-purple-700", icon: "👤" },
};

// Stats Card Component
function StatsCard({
  title,
  value,
  icon,
  color,
}: {
  title: string;
  value: number;
  icon: React.ReactNode;
  color: "emerald" | "amber" | "rose" | "blue";
}) {
  const colorStyles = {
    emerald: "from-emerald-500 to-teal-600 shadow-emerald-500/25",
    amber: "from-amber-500 to-orange-600 shadow-amber-500/25",
    rose: "from-rose-500 to-pink-600 shadow-rose-500/25",
    blue: "from-blue-500 to-indigo-600 shadow-blue-500/25",
  };

  return (
    <Card className="relative overflow-hidden">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <p className="text-3xl font-bold text-slate-900 mt-1">{value}</p>
        </div>
        <div
          className={clsx(
            "w-12 h-12 rounded-xl flex items-center justify-center",
            "bg-gradient-to-br shadow-lg",
            colorStyles[color]
          )}
        >
          {icon}
        </div>
      </div>
    </Card>
  );
}

// Ticket Item Component
function TicketItem({ ticket }: { ticket: Ticket }) {
  const status = statusConfig[ticket.status];
  const category = categoryConfig[ticket.category];

  return (
    <div
      className={clsx(
        "flex flex-col sm:flex-row sm:items-center justify-between gap-3 py-4",
        "border-b border-slate-100 last:border-0",
        "hover:bg-slate-50/50 -mx-4 px-4 rounded-lg transition-colors cursor-pointer"
      )}
    >
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm font-semibold text-primary">{ticket.id}</span>
          <span
            className={clsx(
              "inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium rounded-full",
              category.bg,
              category.text
            )}
          >
            <span>{category.icon}</span>
            {ticket.category}
          </span>
        </div>
        <p className="text-slate-800 font-medium mt-1 line-clamp-1">{ticket.title}</p>
        <p className="text-xs text-slate-500 mt-1">{ticket.due}</p>
      </div>

      <span
        className={clsx(
          "inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full shrink-0",
          status.bg,
          status.text
        )}
      >
        <span className={clsx("w-1.5 h-1.5 rounded-full", status.dot)} />
        {status.label}
      </span>
    </div>
  );
}

export default function StudentDashboard() {
  const navigate = useNavigate();

  const openCount = tickets.filter((t) => t.status === "OPEN").length;
  const inProgressCount = tickets.filter((t) => t.status === "IN PROGRESS").length;
  const resolvedCount = tickets.filter((t) => t.status === "RESOLVED").length;

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Page Header */}
      <PageHeader
        title="Welcome back! 👋"
        subtitle="Here's an overview of your support tickets"
      />

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <StatsCard
          title="Open Tickets"
          value={openCount}
          color="emerald"
          icon={
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
        />
        <StatsCard
          title="In Progress"
          value={inProgressCount}
          color="amber"
          icon={
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
        />
        <StatsCard
          title="Resolved"
          value={resolvedCount}
          color="blue"
          icon={
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          }
        />
      </div>

      {/* Quick Action */}
      <Card className="bg-gradient-to-r from-primary to-blue-500 border-0">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold text-white">Need help with something?</h3>
            <p className="text-blue-100 text-sm mt-1">
              Create a new support ticket and we'll get back to you as soon as possible.
            </p>
          </div>
          <Button
            variant="secondary"
            onClick={() => navigate("/student/tickets/new")}
            className="shrink-0 bg-white hover:bg-slate-50 text-primary"
            leftIcon={
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            }
          >
            Create Ticket
          </Button>
        </div>
      </Card>

      {/* Recent Tickets */}
      <Card>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-slate-900">Recent Tickets</h2>
          <button
            onClick={() => navigate("/student/tickets")}
            className="text-sm font-medium text-primary hover:text-primary-dark transition-colors"
          >
            View all →
          </button>
        </div>

        <div className="divide-y divide-slate-100">
          {tickets.slice(0, 4).map((ticket) => (
            <TicketItem key={ticket.id} ticket={ticket} />
          ))}
        </div>

        {tickets.length === 0 && (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🎫</span>
            </div>
            <h3 className="text-lg font-semibold text-slate-700 mb-1">No tickets yet</h3>
            <p className="text-sm text-slate-500">Create your first support ticket to get started.</p>
          </div>
        )}
      </Card>
    </div>
  );
}
