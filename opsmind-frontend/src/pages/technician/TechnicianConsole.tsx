import React from "react";
import { useNavigate } from "react-router-dom";
import "./technician.css";

const TechnicianConsole: React.FC = () => {
  const navigate = useNavigate();

  const sampleTickets = [
    { id: 'INC-12345', title: 'Cannot access CRM', category: 'Software Issue', priority: 'high', status: 'New' },
    { id: 'INC-12348', title: 'Printer offline on 3rd floor', category: 'Hardware Issue', priority: 'medium', status: 'In Progress' },
    { id: 'INC-12351', title: 'VPN connection issues', category: 'Network Issue', priority: 'low', status: 'In Progress' },
    { id: 'INC-12332', title: 'Password reset for J. Doe', category: 'User Request', priority: 'low', status: 'Resolved' },
  ];

  const [activeFilter, setActiveFilter] = React.useState('All');

  return (
    <div style={{ padding:'24px' }}>
      {/* Stats Cards Row */}
      <div style={{ display:'flex', gap:16, marginBottom:32 }}>
        <div style={{ flex:1, background:'#eef2f6', padding:'20px', borderRadius:'8px' }}>
          <div style={{ color:'#666', fontSize:'12px', fontWeight:'500', marginBottom:'8px' }}>Assigned to Me</div>
          <div style={{ fontSize:'36px', fontWeight:'800', color:'#1a1a1a' }}>14</div>
        </div>
        <div style={{ flex:1, background:'#eef2f6', padding:'20px', borderRadius:'8px' }}>
          <div style={{ color:'#666', fontSize:'12px', fontWeight:'500', marginBottom:'8px' }}>SLA Warnings</div>
          <div style={{ fontSize:'36px', fontWeight:'800', color:'#f59e0b' }}>3</div>
        </div>
        <div style={{ flex:1, background:'#eef2f6', padding:'20px', borderRadius:'8px' }}>
          <div style={{ color:'#666', fontSize:'12px', fontWeight:'500', marginBottom:'8px' }}>Escalations</div>
          <div style={{ fontSize:'36px', fontWeight:'800', color:'#ec4899' }}>2</div>
        </div>
      </div>

      {/* My Assigned Tickets Header and Filters */}
      <div style={{ marginBottom:'20px' }}>
        <div style={{ fontWeight:'600', fontSize:'14px', color:'#1a1a1a', marginBottom:'12px' }}>My Assigned Tickets</div>
        <div style={{ display:'flex', gap:'8px' }}>
          {['All', 'High Priority', 'New', 'Pending'].map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              style={{
                padding:'6px 14px',
                borderRadius:'6px',
                border:'none',
                fontSize:'12px',
                fontWeight:'500',
                cursor:'pointer',
                background: activeFilter === filter ? '#3b82f6' : '#ddd',
                color: activeFilter === filter ? '#fff' : '#333',
              }}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Ticket List */}
      <div style={{ display:'flex', flexDirection:'column', gap:'8px' }}>
        {sampleTickets.map((t) => (
          <div 
            key={t.id} 
            onClick={() => navigate(`/technician/ticket-details/${encodeURIComponent(t.id)}`)} 
            style={{ 
              display:'flex',
              alignItems:'flex-start',
              gap:'12px',
              padding:'16px',
              background:'#ffffffff',
              borderRadius:'6px',
              cursor:'pointer',
              border:'1px solid #eee'
            }}
          >
            {/* Dot indicator */}
            <div style={{
              width:'8px',
              height:'8px',
              borderRadius:'50%',
              marginTop:'6px',
              background: t.status === 'New' ? '#ef4444' : t.status === 'In Progress' ? '#f59e0b' : '#10b981',
              flexShrink:0
            }} />
            
            {/* Ticket content */}
            <div style={{ flex:1 }}>
              <div style={{ fontSize:'13px', fontWeight:'600', color:'#1a1a1a', marginBottom:'4px' }}>
                {t.id}: {t.title}
              </div>
              <div style={{ fontSize:'12px', color:'#666' }}>{t.category}</div>
            </div>

            {/* Status badge */}
            <div style={{ 
              background: t.status === 'New' ? '#fce7f3' : t.status === 'In Progress' ? '#fef3c7' : '#d1fae5',
              color: t.status === 'New' ? '#ec4899' : t.status === 'In Progress' ? '#d97706' : '#059669',
              padding:'4px 12px',
              borderRadius:'12px',
              fontSize:'11px',
              fontWeight:'600',
              whiteSpace:'nowrap'
            }}>
              {t.status}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TechnicianConsole;



