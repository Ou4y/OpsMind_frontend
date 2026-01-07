import { useNavigate } from "react-router-dom";

export default function StudentDashboard() {
  const navigate = useNavigate();

  const tickets = [
    {
      id: "#IT-84321",
      title: "Cannot connect to campus Wi-Fi",
      category: "Network",
      due: "Due in 3 hours",
      status: "OPEN",
      color: "green",
    },
    {
      id: "#HW-58290",
      title: "Laptop screen is flickering",
      category: "Hardware",
      due: "Due in 2 days",
      status: "IN PROGRESS",
      color: "amber",
    },
    {
      id: "#SW-19874",
      title: "Unable to install licensed software",
      category: "Software",
      due: "Due in 1 week",
      status: "IN PROGRESS",
      color: "amber",
    },
    {
      id: "#AC-33219",
      title: "Password reset request",
      category: "Account",
      due: "Resolved 2 days ago",
      status: "RESOLVED",
      color: "gray",
    },
  ];

  return (
    <div className="space-y-6">

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <p className="text-slate-500 text-sm">Open Tickets</p>
          <p className="text-green-600 text-2xl font-bold">
            {tickets.filter(t => t.status === "OPEN").length}
          </p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <p className="text-slate-500 text-sm">Pending Responses</p>
          <p className="text-amber-500 text-2xl font-bold">
            {tickets.filter(t => t.status === "IN PROGRESS").length}
          </p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <p className="text-slate-500 text-sm">SLA Overdue</p>
          <p className="text-red-500 text-2xl font-bold">0</p>
        </div>
      </div>

      {/* Create Button */}
      <button
        className="bg-primary text-white w-full py-3 rounded-lg shadow text-sm font-semibold"
        onClick={() => navigate("/student/tickets/new")}
      >
        + Create New Ticket
      </button>

      {/* Recent Tickets */}
      <div className="space-y-4">
        <h2 className="font-semibold text-lg">My Recent Tickets</h2>

        {tickets.map((t) => (
          <TicketItem
            key={t.id}
            id={t.id}
            title={t.title}
            status={t.status}
            tag={t.category}
            time={t.due}
            color={t.color}
          />
        ))}
      </div>
    </div>
  );
}

function TicketItem({ id, title, status, tag, time, color }: any) {
  const statusColors: any = {
    green: "text-green-600 bg-green-100",
    amber: "text-amber-600 bg-amber-100",
    rose: "text-rose-600 bg-rose-100",
    gray: "text-gray-600 bg-gray-200",
  };

  return (
    <div className="border-b pb-2 flex justify-between items-center">
      <div>
        <div className="flex justify-between w-full">
          <p className="font-medium">{id} - {title}</p>
          <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">{tag}</span>
        </div>

        <div className="flex items-center gap-3 mt-1 text-sm">
          <span className={`px-2 py-1 rounded-full text-xs ${statusColors[color]}`}>
            {status}
          </span>
          <span className="text-gray-500">Updated: {time}</span>
        </div>
      </div>
    </div>
  );
}
