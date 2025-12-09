import React from "react";
//import { useNavigate } from "react-router-dom";
import "./technician.css";

const TechnicianNotificationCenter: React.FC = () => {
  //const navigate = useNavigate();

  const [activeTab, setActiveTab] = React.useState('All');

  const notifications = [
    {
      id: 'INC-5822',
      title: 'SLA Breach Imminent',
      time: '9m ago',
      type: 'SLA Warning',
      icon: '⚠️',
      color: '#f59e0b',
    },
    {
      id: 'INC-5829',
      title: 'New Ticket Assigned',
      time: '12m ago',
      type: 'Assignment',
      icon: '📋',
      color: '#6366f1',
    },
    {
      id: 'INC-5815',
      title: 'Ticket Escalated',
      time: '1h ago',
      type: 'Alert',
      icon: '⬆️',
      color: '#ef4444',
    },
    {
      id: 'INC-5801',
      title: 'Comment Added by User',
      time: '3h ago',
      type: 'Update',
      icon: '💬',
      color: '#14b8a6',
    },
    {
      id: 'Server-04',
      title: 'High CPU Usage on Server-04',
      subtitle: 'Priority: Critical',
      time: 'Yesterday',
      type: 'Alert',
      icon: '🔴',
      color: '#ec4899',
    },
    {
      id: 'INC-5799',
      title: 'Resolution SLA Met',
      time: '2d ago',
      type: 'SLA Update',
      icon: '✓',
      color: '#10b981',
    },
  ];

  const tabs = ['All', 'Alerts', 'Assignments', 'SLA'];

  return (
    <div style={{ padding: '24px' }}>
      {/* Tabs */}
      <div style={{ display: 'flex', gap: '24px', borderBottom: '1px solid #eee', marginBottom: '24px' }}>
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: '12px 0',
              border: 'none',
              background: 'none',
              fontSize: '13px',
              fontWeight: '500',
              color: activeTab === tab ? '#3b82f6' : '#999',
              borderBottom: activeTab === tab ? '2px solid #3b82f6' : 'none',
              cursor: 'pointer',
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Notifications List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
        {notifications.map((notif) => (
          <div
            key={notif.id}
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '16px',
              padding: '16px',
              background: '#ffffffff',
              borderBottom: '1px solid #ffffffff',
              cursor: 'pointer',
              transition: 'background 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = '#ffffffff')}
            onMouseLeave={(e) => (e.currentTarget.style.background = '#ffffffff')}
          >
            {/* Icon */}
            <div
              style={{
                fontSize: '20px',
                marginTop: '2px',
                flexShrink: 0,
              }}
            >
              {notif.icon}
            </div>

            {/* Content */}
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '13px', fontWeight: '600', color: '#1a1a1a', marginBottom: '4px' }}>
                {notif.title}
              </div>
              <div style={{ fontSize: '12px', color: '#666' }}>
                Ticket {notif.id}
              </div>
              {notif.subtitle && (
                <div style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>
                  {notif.subtitle}
                </div>
              )}
            </div>

            {/* Time and Type */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px' }}>
              <div style={{ fontSize: '12px', color: '#999' }}>
                {notif.time}
              </div>
              <div
                style={{
                  fontSize: '11px',
                  fontWeight: '600',
                  color: notif.color,
                  background: notif.color + '15',
                  padding: '4px 8px',
                  borderRadius: '4px',
                }}
              >
                {notif.type}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TechnicianNotificationCenter;
