import { PageHeader } from "../../components/common/PageHeader";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const ticketTrendData = [
  { day: "Mon", tickets: 40 },
  { day: "Tue", tickets: 55 },
  { day: "Wed", tickets: 32 },
  { day: "Thu", tickets: 78 },
  { day: "Fri", tickets: 90 },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-10">
      <PageHeader
        title="Admin Dashboard"
        subtitle="Overview of system operations and weekly performance"
      />

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-slate-900 p-8 rounded-xl shadow border border-slate-200 dark:border-slate-800">
          <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-200">Total Registered Users</h3>
          <p className="text-4xl font-bold mt-3 text-slate-900 dark:text-white">1,248</p>
        </div>

        <div className="bg-white dark:bg-slate-900 p-8 rounded-xl shadow border border-slate-200 dark:border-slate-800">
          <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-200">Open Tickets</h3>
          <p className="text-4xl font-bold mt-3 text-slate-900 dark:text-white">63</p>
        </div>

        <div className="bg-white dark:bg-slate-900 p-8 rounded-xl shadow border border-slate-200 dark:border-slate-800">
          <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-200">SLA Compliance</h3>
          <p className="text-4xl font-bold mt-3 text-green-600 dark:text-green-400">92%</p>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white dark:bg-slate-900 rounded-xl shadow p-8 h-80 border border-slate-200 dark:border-slate-800">
        <h3 className="text-lg font-semibold mb-6 text-slate-800 dark:text-slate-100">
          Weekly Ticket Volume
        </h3>

        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={ticketTrendData} margin={{ top: 20, right: 40, left: 10, bottom: 10 }}>
            <defs>
              <linearGradient id="ticketVolumeGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#6366F1" stopOpacity={0.85} />
                <stop offset="100%" stopColor="#818CF8" stopOpacity={0.25} />
              </linearGradient>
            </defs>

            <CartesianGrid
              stroke="#d1d5db"
              strokeDasharray="4 4"
              className="dark:stroke-slate-700"
            />

            <XAxis
              dataKey="day"
              tick={{ fill: "#6b7280", fontWeight: 600 }}
              axisLine={{ stroke: "#cbd5e1" }}
              tickLine={false}
              className="dark:fill-slate-300 dark:stroke-slate-700"
            />

            <YAxis
              tick={{ fill: "#6b7280", fontWeight: 600 }}
              axisLine={{ stroke: "#cbd5e1" }}
              tickLine={false}
              className="dark:fill-slate-300 dark:stroke-slate-700"
            />

            <Tooltip
              contentStyle={{
                background: "#ffffffdd",
                backdropFilter: "blur(6px)",
                borderRadius: "10px",
                border: "1px solid #e5e7eb",
                color: "#111827",
                padding: "10px 12px",
              }}
              labelStyle={{ fontWeight: 700 }}
              cursor={{ fill: "#f3f4f6", opacity: 0.4 }}
            />

            {/* Main Chart Line */}
            <Line
              type="monotone"
              dataKey="tickets"
              stroke="#4F46E5"
              strokeWidth={3}
              dot={{
                r: 6,
                fill: "#fff",
                stroke: "#4F46E5",
                strokeWidth: 3,
              }}
              activeDot={{
                r: 8,
                fill: "#6366F1",
                stroke: "#4F46E5",
                strokeWidth: 4,
              }}
            />

            {/* Underline gradient */}
            <Line
              type="monotone"
              dataKey="tickets"
              stroke="none"
              fill="url(#ticketVolumeGradient)"
              dot={false}
              isAnimationActive={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}