import { PageHeader } from "../../components/common/PageHeader";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const slaData = [
  { month: "Jan", compliance: 88 },
  { month: "Feb", compliance: 91 },
  { month: "Mar", compliance: 86 },
  { month: "Apr", compliance: 93 },
  { month: "May", compliance: 95 },
];

const workloadData = [
  { tech: "Youssef", tickets: 42 },
  { tech: "Ahmed", tickets: 51 },
  { tech: "Lina", tickets: 33 },
];

export default function AdminAnalytics() {
  return (
    <div className="space-y-10">
      <PageHeader
        title="Analytics"
        subtitle="System performance insights and trends"
      />

      {/* SLA Trend */}
      <div className="bg-white dark:bg-slate-900 rounded-xl shadow p-8 h-80">
        <h3 className="text-lg font-semibold mb-6 text-slate-800 dark:text-slate-100">
          SLA Compliance Trend
        </h3>

        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={slaData} margin={{ top: 20, right: 40, left: 10, bottom: 10 }}>
            <defs>
              <linearGradient id="colorCompliance" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#34d399" stopOpacity={0.8} />
                <stop offset="100%" stopColor="#10b981" stopOpacity={0.15} />
              </linearGradient>
            </defs>

            <CartesianGrid
              stroke="#d1d5db"
              strokeDasharray="4 4"
              className="dark:stroke-slate-700"
            />

            <XAxis
              dataKey="month"
              tick={{ fill: "#6b7280", fontWeight: 600 }}
              axisLine={{ stroke: "#cbd5e1" }}
              tickLine={false}
              className="dark:fill-slate-300 dark:stroke-slate-700"
            />

            <YAxis
              domain={[70, 100]}
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

            {/* Main Line */}
            <Line
              type="monotone"
              dataKey="compliance"
              stroke="#10B981"
              strokeWidth={3}
              dot={{
                r: 6,
                fill: "#fff",
                stroke: "#10B981",
                strokeWidth: 3,
              }}
              activeDot={{
                r: 8,
                fill: "#34d399",
                stroke: "#10B981",
                strokeWidth: 4,
              }}
              isAnimationActive
            />

            {/* Underline gradient (area shadow) */}
            <Line
              type="monotone"
              dataKey="compliance"
              stroke="none"
              fill="url(#colorCompliance)"
              dot={false}
              isAnimationActive={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Technician Workload */}
      <div className="bg-white dark:bg-slate-900 rounded-xl shadow p-8 h-80">
        <h3 className="text-lg font-semibold mb-6 text-slate-800 dark:text-slate-100">
          Technician Ticket Load
        </h3>

        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={workloadData} margin={{ top: 20, right: 40, left: 10, bottom: 10 }}>
            <defs>
              <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#4f46e5" stopOpacity={0.95} />
                <stop offset="100%" stopColor="#6366f1" stopOpacity={0.75} />
              </linearGradient>
            </defs>

            <CartesianGrid
              stroke="#d1d5db"
              strokeDasharray="4 4"
              className="dark:stroke-slate-700"
            />

            <XAxis
              dataKey="tech"
              tick={{ fill: "#6b7280", fontWeight: 600 }}
              axisLine={{ stroke: "#cbd5e1" }}
              tickLine={false}
              className="dark:fill-slate-300 dark:stroke-slate-700"
            />

            <YAxis
              tick={{ fill: "#6b7280", fontWeight: 600 }}
              axisLine={{ stroke: "#cbd5e1" }}
              tickLine={false}
            />

            <Tooltip
              contentStyle={{
                background: "#ffffffdd",
                borderRadius: "10px",
                border: "1px solid #e5e7eb",
                color: "#111827",
                padding: "10px 12px",
                backdropFilter: "blur(6px)",
              }}
              labelStyle={{ fontWeight: 700 }}
              cursor={{ fill: "#f3f4f6", opacity: 0.4 }}
            />

            <Bar
              dataKey="tickets"
              fill="url(#barGradient)"
              radius={[10, 10, 0, 0]}
              isAnimationActive
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}