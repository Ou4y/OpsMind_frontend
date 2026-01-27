import { PageHeader } from "../../components/common/PageHeader";
import { Card } from "../../components/common/Card";
import {
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import clsx from "clsx";

const ticketTrendData = [
  { day: "Mon", tickets: 40 },
  { day: "Tue", tickets: 55 },
  { day: "Wed", tickets: 32 },
  { day: "Thu", tickets: 78 },
  { day: "Fri", tickets: 90 },
  { day: "Sat", tickets: 45 },
  { day: "Sun", tickets: 28 },
];

// Stats Card Component
function StatsCard({
  title,
  value,
  change,
  changeType,
  icon,
  color,
}: {
  title: string;
  value: string | number;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  icon: React.ReactNode;
  color: "blue" | "emerald" | "amber" | "purple";
}) {
  const colorStyles = {
    blue: "from-blue-500 to-indigo-600",
    emerald: "from-emerald-500 to-teal-600",
    amber: "from-amber-500 to-orange-600",
    purple: "from-purple-500 to-pink-600",
  };

  const changeStyles = {
    positive: "text-emerald-600 bg-emerald-50",
    negative: "text-rose-600 bg-rose-50",
    neutral: "text-slate-600 bg-slate-100",
  };

  return (
    <Card className="relative overflow-hidden">
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <p className="text-3xl sm:text-4xl font-bold text-slate-900">{value}</p>
          {change && changeType && (
            <span className={clsx("inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium rounded-full", changeStyles[changeType])}>
              {changeType === "positive" && "↑"}
              {changeType === "negative" && "↓"}
              {change}
            </span>
          )}
        </div>
        <div className={clsx("w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br shadow-lg text-white", colorStyles[color])}>
          {icon}
        </div>
      </div>
    </Card>
  );
}

// Recent Activity Component
function RecentActivity() {
  const activities = [
    { id: 1, action: "New ticket created", user: "John Doe", time: "2 min ago", type: "ticket" },
    { id: 2, action: "Ticket resolved", user: "Sarah Smith", time: "15 min ago", type: "resolved" },
    { id: 3, action: "SLA warning triggered", user: "System", time: "1 hour ago", type: "warning" },
    { id: 4, action: "New user registered", user: "Admin", time: "3 hours ago", type: "user" },
  ];

  const typeIcons: Record<string, React.ReactNode> = {
    ticket: <span className="text-blue-500">🎫</span>,
    resolved: <span className="text-emerald-500">✓</span>,
    warning: <span className="text-amber-500">⚠</span>,
    user: <span className="text-purple-500">👤</span>,
  };

  return (
    <Card>
      <h3 className="text-lg font-semibold text-slate-900 mb-4">Recent Activity</h3>
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start gap-3 pb-4 border-b border-slate-100 last:border-0 last:pb-0">
            <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center shrink-0">
              {typeIcons[activity.type]}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-slate-900">{activity.action}</p>
              <p className="text-xs text-slate-500">{activity.user} • {activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

export default function AdminDashboard() {
  return (
    <div className="space-y-6 sm:space-y-8">
      <PageHeader
        title="Dashboard"
        subtitle="Overview of system operations and weekly performance"
      />

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <StatsCard
          title="Total Users"
          value="1,248"
          change="+12% from last month"
          changeType="positive"
          color="blue"
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          }
        />
        <StatsCard
          title="Open Tickets"
          value="63"
          change="-8% from yesterday"
          changeType="positive"
          color="amber"
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
            </svg>
          }
        />
        <StatsCard
          title="SLA Compliance"
          value="92%"
          change="+3% improvement"
          changeType="positive"
          color="emerald"
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
        />
        <StatsCard
          title="Avg Resolution"
          value="4.2h"
          change="Same as last week"
          changeType="neutral"
          color="purple"
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Main Chart */}
        <Card className="lg:col-span-2">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Weekly Ticket Volume</h3>
          <div className="h-64 sm:h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={ticketTrendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="ticketGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3B82F6" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#3B82F6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
                <XAxis
                  dataKey="day"
                  tick={{ fontSize: 12, fill: "#64748B" }}
                  axisLine={{ stroke: "#E2E8F0" }}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 12, fill: "#64748B" }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  contentStyle={{
                    background: "white",
                    border: "1px solid #E2E8F0",
                    borderRadius: "8px",
                    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                  }}
                  labelStyle={{ fontWeight: 600 }}
                />
                <Area
                  type="monotone"
                  dataKey="tickets"
                  stroke="#3B82F6"
                  strokeWidth={2}
                  fill="url(#ticketGradient)"
                  dot={{ fill: "#3B82F6", strokeWidth: 0, r: 4 }}
                  activeDot={{ r: 6, fill: "#3B82F6", stroke: "#fff", strokeWidth: 2 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Recent Activity */}
        <RecentActivity />
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Technicians Online", value: "8", color: "text-emerald-600" },
          { label: "Pending Approvals", value: "12", color: "text-amber-600" },
          { label: "Critical Tickets", value: "3", color: "text-rose-600" },
          { label: "Resolved Today", value: "24", color: "text-blue-600" },
        ].map((stat) => (
          <Card key={stat.label} padding="sm" className="text-center">
            <p className={clsx("text-2xl sm:text-3xl font-bold", stat.color)}>{stat.value}</p>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">{stat.label}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}