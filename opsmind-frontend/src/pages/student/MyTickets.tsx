import { useState } from "react";

export default function MyTickets() {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  const tickets = [
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


  //  Category Colors
  const categoryColors: any = {
    Network: "bg-blue-100 text-blue-700 border border-blue-300",
    Hardware: "bg-amber-100 text-amber-700 border border-amber-300",
    Software: "bg-pink-100 text-pink-700 border border-pink-300",
    Account: "bg-purple-100 text-purple-700 border border-purple-300",
  };

  //  Status Colors
  const statusColors: any = {
    OPEN: "bg-green-100 text-green-700",
    "IN PROGRESS": "bg-amber-100 text-amber-700",
    RESOLVED: "bg-slate-200 text-slate-700",
  };

  //  Apply Search + Filter
  const filteredTickets = tickets.filter((t) => {
    const matchFilter = filter === "All" || t.status === filter;
    const matchSearch =
      t.id.toLowerCase().includes(search.toLowerCase()) ||
      t.title.toLowerCase().includes(search.toLowerCase()) ||
      t.category.toLowerCase().includes(search.toLowerCase());

    return matchFilter && matchSearch;
  });

  return (
    <div className="px-6 py-4">

      {/* Page Title */}
      <h1 className="text-2xl font-bold mb-6">My Tickets</h1>

      {/* Search */}
      <input
        type="text"
        placeholder="Search by keyword or ID"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full h-12 px-4 rounded-xl border border-slate-300 shadow-sm
        focus:ring-2 focus:ring-blue-500 mb-4"
      />

      {/* Filters */}
      <div className="flex gap-3 mb-6 text-sm">
        {["All", "OPEN", "IN PROGRESS", "RESOLVED"].map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={`px-4 py-1.5 rounded-full transition ${
              filter === type
                ? "bg-blue-600 text-white shadow"
                : "bg-slate-200 text-slate-700 hover:bg-slate-300"
            }`}
          >
            {type === "IN PROGRESS" ? "In Progress" : type}
          </button>
        ))}
      </div>

      {/* Ticket List */}
      <div className="space-y-4">
        {filteredTickets.map((ticket) => (
          <div
            key={ticket.id}
            className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm"
          >
            <p className="text-blue-600 font-semibold text-sm">{ticket.id}</p>
            <p className="text-slate-700 text-sm mt-1">{ticket.title}</p>

            {/* Category Badge */}
            <span
              className={`inline-block mt-2 px-3 py-1 text-xs rounded-full ${
                categoryColors[ticket.category] || "bg-slate-100 text-slate-600"
              }`}
            >
              {ticket.category}
            </span>

            {/* Bottom Row */}
            <div className="flex justify-between items-center mt-3 text-xs">
              <span className="text-slate-500">{ticket.due}</span>

              {/* Status Badge */}
              <span
                className={`px-3 py-1 rounded-full ${
                  statusColors[ticket.status]
                }`}
              >
                {ticket.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
