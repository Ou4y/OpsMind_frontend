import React from 'react';
import './Dashboard.css'; // Importing the CSS file
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';
import { 
  Ticket, CheckCircle, AlertTriangle, Package, 
  Users, Gavel, Edit3, ArrowUpRight, ChevronRight 
} from 'lucide-react';

// --- Mock Data ---
const chartData = [
  { name: 'Mon', tickets: 40, resolved: 24 },
  { name: 'Tue', tickets: 80, resolved: 50 },
  { name: 'Wed', tickets: 30, resolved: 20 },
  { name: 'Thu', tickets: 60, resolved: 40 },
  { name: 'Fri', tickets: 110, resolved: 70 },
  { name: 'Sat', tickets: 50, resolved: 40 },
  { name: 'Sun', tickets: 90, resolved: 60 },
];

export default function Dashboard() {
  return (
    <div className="dashboard-container">
      
      {/* 1. Top Stats Grid */}
      <div className="stats-grid">
        <StatCard 
          title="Total Tickets" 
          value="1,204" 
          subtext="+5% vs yesterday"
          icon={<Ticket size={20} color="#3b82f6" />} // Blue
          trend="up"
        />
        <StatCard 
          title="SLA Compliance" 
          value="98.5%" 
          subtext="+1.2%"
          icon={<CheckCircle size={20} color="#16a34a" />} // Green
          trend="up"
        />
        <StatCard 
          title="Escalations" 
          value="12" 
          subtext="Active"
          icon={<AlertTriangle size={20} color="#dc2626" />} // Red
          alert={true}
        />
        <StatCard 
          title="Inventory Low" 
          value="8" 
          subtext="Items"
          icon={<Package size={20} color="#ea580c" />} // Orange
          alert={true}
        />
      </div>

      {/* 2. Middle Chart Section */}
      <div className="chart-card">
        <div className="chart-header">
          <h3 className="section-title">Ticket Trends</h3>
          <button className="chart-filter-btn">Last 7 Days ▼</button>
        </div>
        
        <div className="chart-area">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
              <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false} 
                tick={{fill: '#9ca3af', fontSize: 12}} 
                dy={10}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{fill: '#9ca3af', fontSize: 12}} 
              />
              <Tooltip 
                contentStyle={{ 
                  borderRadius: '8px', 
                  border: 'none', 
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)' 
                }} 
              />
              <Line 
                type="monotone" 
                dataKey="tickets" 
                stroke="#2563eb" 
                strokeWidth={3} 
                dot={false} 
                activeDot={{ r: 6, fill: '#2563eb', stroke: 'white', strokeWidth: 2 }}
              />
              <Line 
                type="monotone" 
                dataKey="resolved" 
                stroke="#93c5fd" 
                strokeWidth={3} 
                dot={false} 
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 3. Bottom Split Section */}
      <div className="bottom-grid">
        
        {/* Left: Category Distribution (Visual Placeholder) */}
        <div className="content-card">
          <h3 className="section-title">Category Distribution</h3>
          
          <div className="category-visual">
             <div className="visual-bar" style={{ height: '40%' }}></div>
             <div className="visual-bar" style={{ height: '80%', backgroundColor: '#93c5fd' }}></div>
             <div className="visual-bar" style={{ height: '50%' }}></div>
             <div className="visual-bar" style={{ height: '25%' }}></div>
             <div className="visual-bar" style={{ height: '60%' }}></div>
          </div>
          <div className="category-legend">
            <span>HW</span><span>SW</span><span>NW</span><span>DB</span><span>Cloud</span>
          </div>
        </div>

        {/* Right: Quick Actions */}
        <div className="content-card">
          <h3 className="section-title">Quick Actions</h3>
          <div className="actions-container">
            <ActionRow label="Manage Users" icon={<Users size={18} />} />
            <ActionRow label="Configure SLA Rules" icon={<Gavel size={18} />} />
            <ActionRow label="Update Inventory" icon={<Edit3 size={18} />} />
          </div>
        </div>
      </div>
    </div>
  );
}

// --- Helper Sub-components ---

function StatCard({ title, value, subtext, icon, trend, alert }: any) {
  return (
    <div className="stat-card">
      <div className="stat-header">
        <span className="stat-title">{title}</span>
        {icon}
      </div>
      <div>
        <div className="stat-value">{value}</div>
        <div className={`stat-footer ${trend === 'up' ? 'trend-up' : 'trend-neutral'}`}>
          {trend === 'up' && <ArrowUpRight size={14} />}
          {subtext}
        </div>
      </div>
    </div>
  );
}

function ActionRow({ label, icon }: any) {
  return (
    <button className="action-button">
      <div className="action-left">
        {icon}
        {label}
      </div>
      <ChevronRight size={16} color="#9ca3af" />
    </button>
  );
}
