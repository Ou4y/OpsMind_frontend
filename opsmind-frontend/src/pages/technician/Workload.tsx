import React from "react";
import "./technician-workload.css";

// SVG Chart Components
const BarChart: React.FC<{ data: { name: string; value: number }[] }> = ({ data }) => {
  const maxValue = Math.max(...data.map((d) => d.value));
  const width = 300;
  const height = 150;
  const barWidth = width / data.length - 8;
  const padding = 40;

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className="chart-svg">
      {data.map((d, i) => {
        const barHeight = (d.value / maxValue) * (height - padding);
        const x = i * (width / data.length) + 4;
        const y = height - padding + (padding - barHeight);
        return (
          <g key={i}>
            <rect x={x} y={y} width={barWidth} height={barHeight} fill="#3b82f6" rx="2" />
            <text x={x + barWidth / 2} y={height - 10} textAnchor="middle" fontSize="11" fill="#666">
              {d.name.slice(0, 3)}
            </text>
          </g>
        );
      })}
    </svg>
  );
};

const DonutChart: React.FC<{ data: { label: string; value: number; color: string }[] }> = ({ data }) => {
  const total = data.reduce((sum, d) => sum + d.value, 0);
  const cx = 75;
  const cy = 75;
  const r = 50;
  let cumulativeAngle = 0;

  const arcs = data.map((d) => {
    const sliceAngle = (d.value / total) * 360;
    const startAngle = cumulativeAngle;
    const endAngle = cumulativeAngle + sliceAngle;
    cumulativeAngle = endAngle;

    const startRad = (startAngle * Math.PI) / 180;
    const endRad = (endAngle * Math.PI) / 180;
    const x1 = cx + r * Math.cos(startRad);
    const y1 = cy + r * Math.sin(startRad);
    const x2 = cx + r * Math.cos(endRad);
    const y2 = cy + r * Math.sin(endRad);

    const largeArc = sliceAngle > 180 ? 1 : 0;
    const pathData = `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2} Z`;

    return { pathData, color: d.color, label: d.label, value: d.value };
  });

  return (
    <div className="donut-container">
      <svg width="150" height="150" viewBox="0 0 150 150" className="chart-svg">
        {arcs.map((arc, i) => (
          <path key={i} d={arc.pathData} fill={arc.color} />
        ))}
      </svg>
      <div className="donut-legend">
        {arcs.map((arc, i) => (
          <div key={i} className="legend-item">
            <span className="legend-color" style={{ backgroundColor: arc.color }}></span>
            <span className="legend-label">{arc.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const LineChart: React.FC<{ data: number[] }> = ({ data }) => {
  const width = 500;
  const height = 180;
  const padding = 30;
  const maxValue = Math.max(...data);
  const graphWidth = width - padding * 2;
  const graphHeight = height - padding * 2;
  const xStep = graphWidth / (data.length - 1);

  const points = data.map(
    (val, i) => `${padding + i * xStep},${padding + graphHeight - (val / maxValue) * graphHeight}`
  );
  const pathData = `M ${points.join(" L ")}`;

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className="chart-svg">
      <path d={pathData} stroke="#3b82f6" strokeWidth="2" fill="none" />
      {data.map((val, i) => (
        <circle
          key={i}
          cx={padding + i * xStep}
          cy={padding + graphHeight - (val / maxValue) * graphHeight}
          r="3"
          fill="#3b82f6"
        />
      ))}
    </svg>
  );
};

const TechnicianWorkload: React.FC = () => {
  // Days of the week data for bar chart
  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const ticketsPerDay = [37, 24, 29, 45, 14];

  const ticketsPerTech = daysOfWeek.map((day, i) => ({ name: day, value: ticketsPerDay[i] }));

  const priorityData = [
    { label: "High", value: 35, color: "#ef4444" },
    { label: "Medium", value: 68, color: "#f59e0b" },
    { label: "Low", value: 39, color: "#10b981" },
  ];

  const slaBreachesData = [3, 5, 2, 6, 4, 3, 5, 7, 4, 6];

  // Technician data for table
  const technicians = [
    { name: "Anna Kowalski", open: 12, closed: 25, sla: "96%" },
    { name: "Dan Fletcher", open: 8, closed: 16, sla: "92%" },
    { name: "Lina Chang", open: 18, closed: 11, sla: "80%" },
    { name: "Sam Rodriguez", open: 25, closed: 20, sla: "87%" },
    { name: "Mia Chen", open: 5, closed: 9, sla: "100%" },
  ];

  return (
    <div className="workload-root">
      <h2 className="workload-title"></h2>

      <div className="cards-row">
        <div className="stat-card">
          <div className="stat-label">Total Open Tickets</div>
          <div className="stat-value">142</div>
          <div className="stat-sub">+5% from last period</div>
        </div>

        <div className="stat-card">
          <div className="stat-label">SLA Breaches</div>
          <div className="stat-value">8</div>
          <div className="stat-sub">-2% from last period</div>
        </div>

        <div className="stat-card">
          <div className="stat-label">Avg. Resolution Time</div>
          <div className="stat-value">6.2 hours</div>
          <div className="stat-sub">+1.5%</div>
        </div>
      </div>

      <div className="charts-row">
        <div className="chart-card">
          <div className="chart-title">Tickets per Day</div>
          <div className="chart-wrapper">
            <BarChart data={ticketsPerTech} />
          </div>
        </div>

        <div className="chart-card">
          <div className="chart-title">Priority Distribution</div>
          <div className="chart-wrapper">
            <DonutChart data={priorityData} />
          </div>
        </div>
      </div>

      <div className="sla-chart-card">
        <div className="chart-title">SLA Breaches Over Time</div>
        <div className="chart-wrapper">
          <LineChart data={slaBreachesData} />
        </div>
      </div>

      <div className="workload-table-card">
        <div className="table-title">Workload Breakdown</div>
        <table className="workload-table">
          <thead>
            <tr>
              <th>Technician</th>
              <th>Open</th>
              <th>Closed</th>
              <th>SLA</th>
            </tr>
          </thead>
          <tbody>
            {technicians.map((t) => (
              <tr key={t.name}>
                <td className="tech-name">{t.name}</td>
                <td>{t.open}</td>
                <td>{t.closed}</td>
                <td className="sla-cell">{t.sla}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TechnicianWorkload;
