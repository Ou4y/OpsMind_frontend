import React from 'react';
import './Analytics.css';
import { 
  BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell 
} from 'recharts';
import { Calendar, Download, TrendingUp, Clock, CheckCircle, ArrowUpRight, ArrowDownRight } from 'lucide-react';

// --- Mock Data ---
const responseTimeData = [
  { day: 'Mon', avgTime: 45, volume: 120 },
  { day: 'Tue', avgTime: 30, volume: 150 },
  { day: 'Wed', avgTime: 55, volume: 180 },
  { day: 'Thu', avgTime: 40, volume: 130 },
  { day: 'Fri', avgTime: 25, volume: 200 },
  { day: 'Sat', avgTime: 35, volume: 90 },
  { day: 'Sun', avgTime: 40, volume: 80 },
];

const categoryData = [
  { name: 'Hardware', value: 400 },
  { name: 'Software', value: 300 },
  { name: 'Network', value: 300 },
  { name: 'Access', value: 200 },
];

const COLORS = ['#2563eb', '#93c5fd', '#3b82f6', '#bfdbfe'];

export default function Analytics() {
  return (
    <div className="analytics-container">
      
      {/* Header with Actions */}
      <div className="page-header">
        <div className="header-title">
          <h2>Performance Analytics</h2>
          <p>Overview of system performance and ticket resolution metrics.</p>
        </div>
        <div className="header-actions">
          <button className="action-btn btn-white">
            <Calendar size={16} />
            Last 30 Days
          </button>
          <button className="action-btn btn-primary">
            <Download size={16} />
            Export Report
          </button>
        </div>
      </div>

      {/* Top Key Metrics */}
      <div className="analytics-stats-grid">
        <StatBox 
          label="Avg Response Time" 
          value="32m" 
          change="-12%" 
          isGood={true}
          icon={<Clock size={20} />}
          colorClass="bg-blue"
        />
        <StatBox 
          label="Resolution Rate" 
          value="94.2%" 
          change="+2.4%" 
          isGood={true}
          icon={<CheckCircle size={20} />}
          colorClass="bg-purple"
        />
        <StatBox 
          label="Ticket Volume" 
          value="1,240" 
          change="+15%" 
          isGood={false}
          icon={<TrendingUp size={20} />}
          colorClass="bg-orange"
        />
      </div>

      {/* Charts Row */}
      <div className="charts-grid">
        
        {/* Main Area Chart */}
        <div className="chart-card">
          <h3 className="chart-title">Response Time Trends</h3>
          <div className="chart-wrapper">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={responseTimeData}>
                <defs>
                  <linearGradient id="colorTime" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                />
                <Area type="monotone" dataKey="avgTime" stroke="#2563eb" strokeWidth={3} fillOpacity={1} fill="url(#colorTime)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Secondary Pie Chart */}
        <div className="chart-card">
          <h3 className="chart-title">Tickets by Category</h3>
          <div className="chart-wrapper">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', fontSize: '0.8rem', color: '#6b7280' }}>
               <span>🔵 Hardware</span>
               <span>🌐 Network</span>
               <span>💻 Software</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent High Priority Table */}
      <div className="table-card">
        <div className="table-header">
          <h3>Unresolved Critical Tickets</h3>
        </div>
        <table className="custom-table">
          <thead>
            <tr>
              <th>Ticket ID</th>
              <th>Subject</th>
              <th>Assigned To</th>
              <th>Time Open</th>
              <th>Priority</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>#ORG-2024</td>
              <td>Server Database Latency</td>
              <td>Liam Chen</td>
              <td>2h 15m</td>
              <td><span className="status-badge status-high">Critical</span></td>
            </tr>
            <tr>
              <td>#ORG-2025</td>
              <td>VPN Authentication Failure</td>
              <td>Aria Martinez</td>
              <td>45m</td>
              <td><span className="status-badge status-high">Critical</span></td>
            </tr>
            <tr>
              <td>#ORG-2026</td>
              <td>Payroll System Error</td>
              <td>Unassigned</td>
              <td>3h 05m</td>
              <td><span className="status-badge status-med">High</span></td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
  );
}

// --- Helper Component ---
function StatBox({ label, value, change, isGood, icon, colorClass }: any) {
  return (
    <div className="stat-box">
      <div className="stat-box-header">
        <div className="stat-label">{label}</div>
        <div className={`stat-icon-bg ${colorClass}`}>
          {icon}
        </div>
      </div>
      <h3 className="stat-number">{value}</h3>
      <div className="stat-footer">
        {isGood ? <ArrowDownRight size={14} className="text-success" /> : <ArrowUpRight size={14} className="text-danger" />}
        <span className={isGood ? 'text-success' : 'text-danger'}>{change}</span>
        <span style={{ color: '#9ca3af' }}>vs last month</span>
      </div>
    </div>
  );
}
