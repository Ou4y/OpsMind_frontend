import { useState, useMemo } from "react";
import { Card } from "../../components/common/Card";
import { PageHeader } from "../../components/common/PageHeader";
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

// Mock data (would come from API in production)
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

// Category configuration with icons and colors
const categoryConfig: Record<TicketCategory, { color: string; icon: string }> = {
  Network: {
    color: "bg-blue-50 text-blue-700 border border-blue-200",
    icon: "🌐",
  },
  Hardware: {
    color: "bg-amber-50 text-amber-700 border border-amber-200",
    icon: "💻",
  },
  Software: {
    color: "bg-pink-50 text-pink-700 border border-pink-200",
    icon: "📦",
  },
  Account: {
    color: "bg-purple-50 text-purple-700 border border-purple-200",
    icon: "👤",
  },
};

// Status configuration with colors and icons
const statusConfig: Record<TicketStatus, { color: string; dotColor: string; label: string }> = {
  OPEN: {
    color: "bg-emerald-50 text-emerald-700",
    dotColor: "bg-emerald-500",
    label: "Open",
  },
  "IN PROGRESS": {
    color: "bg-amber-50 text-amber-700",
    dotColor: "bg-amber-500",
    label: "In Progress",
  },
  RESOLVED: {
    color: "bg-slate-100 text-slate-600",
    dotColor: "bg-slate-400",
    label: "Resolved",
  },
};

// Filter options
const filterOptions: Array<{ value: string; label: string }> = [
  { value: "All", label: "All Tickets" },
  { value: "OPEN", label: "Open" },
  { value: "IN PROGRESS", label: "In Progress" },
  { value: "RESOLVED", label: "Resolved" },
];

// Ticket Card Component
function TicketCard({ ticket }: { ticket: Ticket }) {
  const category = categoryConfig[ticket.category];
  const status = statusConfig[ticket.status];

  return (
    <Card
      className={clsx(
        "group cursor-pointer transition-all duration-200",
        "hover:shadow-md hover:border-blue-200 hover:-translate-y-0.5",
        "focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2"
      )}
    >
      <button
        className="w-full text-left focus:outline-none"
        aria-label={`View ticket ${ticket.id}: ${ticket.title}`}
      >
        {/* Header Row */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <p className="text-primary font-semibold text-sm tracking-wide">
              {ticket.id}
            </p>
            <h3 className="text-slate-800 font-medium mt-1 line-clamp-2 group-hover:text-slate-900">
              {ticket.title}
            </h3>
          </div>

          {/* Status Badge */}
          <span
            className={clsx(
              "inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full shrink-0",
              status.color
            )}
          >
            <span className={clsx("w-1.5 h-1.5 rounded-full", status.dotColor)} aria-hidden="true" />
            {status.label}
          </span>
        </div>

        {/* Footer Row */}
        <div className="flex flex-wrap items-center justify-between gap-2 mt-4 pt-3 border-t border-slate-100">
          {/* Category Badge */}
          <span
            className={clsx(
              "inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full",
              category.color
            )}
          >
            <span aria-hidden="true">{category.icon}</span>
            {ticket.category}
          </span>

          {/* Due Date */}
          <span
            className={clsx(
              "text-xs font-medium",
              ticket.status === "RESOLVED" ? "text-slate-400" : "text-slate-500"
            )}
          >
            <span className="hidden sm:inline">📅 </span>
            {ticket.due}
          </span>
        </div>
      </button>
    </Card>
  );
}

// Empty State Component
function EmptyState({ searchTerm }: { searchTerm: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
        <span className="text-2xl">🎫</span>
      </div>
      <h3 className="text-lg font-semibold text-slate-700 mb-1">No tickets found</h3>
      <p className="text-sm text-slate-500 max-w-sm">
        {searchTerm
          ? `No tickets match "${searchTerm}". Try a different search term or filter.`
          : "You don't have any tickets in this category yet."}
      </p>
    </div>
  );
}

// Search Icon Component
function SearchIcon() {
  return (
    <svg
      className="w-5 h-5 text-slate-400"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
      />
    </svg>
  );
}

export default function MyTickets() {
  const [filter, setFilter] = useState<string>("All");
  const [search, setSearch] = useState<string>("");

  // Memoized filtered tickets for performance
  const filteredTickets = useMemo(() => {
    return tickets.filter((ticket) => {
      const matchFilter = filter === "All" || ticket.status === filter;
      const searchLower = search.toLowerCase();
      const matchSearch =
        ticket.id.toLowerCase().includes(searchLower) ||
        ticket.title.toLowerCase().includes(searchLower) ||
        ticket.category.toLowerCase().includes(searchLower);

      return matchFilter && matchSearch;
    });
  }, [filter, search]);

  // Ticket counts for filter badges
  const ticketCounts = useMemo(() => {
    return {
      All: tickets.length,
      OPEN: tickets.filter((t) => t.status === "OPEN").length,
      "IN PROGRESS": tickets.filter((t) => t.status === "IN PROGRESS").length,
      RESOLVED: tickets.filter((t) => t.status === "RESOLVED").length,
    };
  }, []);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <PageHeader
        title="My Tickets"
        subtitle={`${filteredTickets.length} ticket${filteredTickets.length !== 1 ? "s" : ""} found`}
      />

        {/* Search Bar */}
        <div className="relative mb-6">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <SearchIcon />
          </div>
          <input
            type="search"
            placeholder="Search by ticket ID, title, or category..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={clsx(
              "w-full h-12 pl-11 pr-4 rounded-xl",
              "bg-white border border-slate-200",
              "text-slate-900 placeholder:text-slate-400",
              "shadow-sm transition-all duration-200",
              "focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            )}
            aria-label="Search tickets"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600"
              aria-label="Clear search"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* Filter Tabs */}
        <div
          className="flex flex-wrap gap-2 sm:gap-3 mb-6"
          role="tablist"
          aria-label="Filter tickets by status"
        >
          {filterOptions.map((option) => {
            const isActive = filter === option.value;
            const count = ticketCounts[option.value as keyof typeof ticketCounts];

            return (
              <button
                key={option.value}
                role="tab"
                aria-selected={isActive}
                onClick={() => setFilter(option.value)}
                className={clsx(
                  "inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium",
                  "transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/20",
                  isActive
                    ? "bg-primary text-white shadow-md shadow-primary/25"
                    : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 hover:border-slate-300"
                )}
              >
                {option.label}
                <span
                  className={clsx(
                    "inline-flex items-center justify-center min-w-[1.25rem] h-5 px-1.5 text-xs rounded-full",
                    isActive ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500"
                  )}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Ticket List */}
        {filteredTickets.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            {filteredTickets.map((ticket) => (
              <TicketCard key={ticket.id} ticket={ticket} />
            ))}
          </div>
        ) : (
          <Card>
            <EmptyState searchTerm={search} />
          </Card>
        )}

        {/* Results Summary */}
        {filteredTickets.length > 0 && (
          <p className="text-center text-sm text-slate-500 mt-6">
            Showing {filteredTickets.length} of {tickets.length} tickets
          </p>
        )}
    </div>
  );
}
