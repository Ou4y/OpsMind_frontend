import React, { useState } from 'react';
import './Users.css';
import { Search, Plus, ChevronRight, X } from 'lucide-react';

// --- Mock Data ---
const initialUsers = [
  { 
    id: 1, 
    name: 'Aria Martinez', 
    email: 'aria.martinez@opsmind.com', 
    avatar: 'https://i.pravatar.cc/150?u=aria', 
    role: 'Agent',
    permissions: { reports: true, delete: false, billing: false }
  },
  { 
    id: 2, 
    name: 'Liam Chen', 
    email: 'liam.chen@opsmind.com', 
    avatar: 'https://i.pravatar.cc/150?u=liam', 
    role: 'Admin',
    permissions: { reports: true, delete: true, billing: true }
  },
  { 
    id: 3, 
    name: 'Sofia Garcia', 
    email: 'sofia.garcia@opsmind.com', 
    avatar: 'https://i.pravatar.cc/150?u=sofia', 
    role: 'Viewer',
    permissions: { reports: false, delete: false, billing: false }
  },
  { 
    id: 4, 
    name: 'Kenji Tanaka', 
    email: 'kenji.tanaka@opsmind.com', 
    avatar: 'https://i.pravatar.cc/150?u=kenji', 
    role: 'Agent',
    permissions: { reports: true, delete: false, billing: false }
  },
];

export default function Users() {
  const [selectedUser, setSelectedUser] = useState<any>(null);

  return (
    <div className="users-container">
      
      {/* Users List Card */}
      <div className="users-card">
        {/* Header */}
        <div className="users-header">
          <button className="icon-button">
            <Search size={20} />
          </button>
          <h2 className="users-title">User Management</h2>
          <button className="icon-button add-btn">
            <Plus size={20} />
          </button>
        </div>

        {/* List */}
        <div>
          {initialUsers.map((user) => (
            <div 
              key={user.id} 
              className="user-row" 
              onClick={() => setSelectedUser(user)}
            >
              <div className="user-left-content">
                <img src={user.avatar} alt={user.name} className="user-avatar" />
                <div className="user-details">
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span className="user-name">{user.name}</span>
                    <span className="user-role-badge">{user.role}</span>
                  </div>
                  <span className="user-email">{user.email}</span>
                </div>
              </div>
              
              <ChevronRight size={18} color="#9ca3af" />
            </div>
          ))}
        </div>
      </div>

      {/* Edit Modal */}
      {selectedUser && (
        <EditUserModal 
          user={selectedUser} 
          onClose={() => setSelectedUser(null)} 
        />
      )}
    </div>
  );
}

// --- Sub-component: Modal ---
function EditUserModal({ user, onClose }: any) {
  // We use local state to handle the toggles inside the modal
  const [perms, setPerms] = useState(user.permissions);
  const [role, setRole] = useState(user.role);

  const handleToggle = (key: string) => {
    setPerms({ ...perms, [key]: !perms[key] });
  };

  return (
    <div className="users-modal-overlay" onClick={onClose}>
      <div className="users-modal-card" onClick={(e) => e.stopPropagation()}>
        
        {/* Modal Header */}
        <div className="modal-header">
          <div className="modal-title-group">
            <h3>Edit User</h3>
            <p className="modal-subtitle">{user.name}</p>
          </div>
          <button className="icon-button" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* Role Selection */}
        <div className="form-section">
          <label className="input-label">Role</label>
          <select 
            className="select-input" 
            value={role} 
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="Admin">Admin</option>
            <option value="Agent">Agent</option>
            <option value="Viewer">Viewer</option>
          </select>
        </div>

        {/* Permissions Toggles */}
        <div className="form-section">
          <label className="input-label">Permissions</label>
          <div className="permissions-list">
            
            <ToggleRow 
              label="Create Reports" 
              checked={perms.reports} 
              onChange={() => handleToggle('reports')} 
            />
            <ToggleRow 
              label="Delete Users" 
              checked={perms.delete} 
              onChange={() => handleToggle('delete')} 
            />
            <ToggleRow 
              label="Access Billing" 
              checked={perms.billing} 
              onChange={() => handleToggle('billing')} 
            />

          </div>
        </div>

        {/* Footer Actions */}
        <div className="modal-footer">
          <button className="btn-remove">Remove User</button>
          <button className="btn-save" onClick={onClose}>Save Changes</button>
        </div>

      </div>
    </div>
  );
}

// --- Sub-component: Toggle Switch ---
function ToggleRow({ label, checked, onChange }: any) {
  return (
    <div className="permission-item">
      <span className="perm-text">{label}</span>
      <label className="toggle-switch">
        <input type="checkbox" checked={checked} onChange={onChange} />
        <span className="slider"></span>
      </label>
    </div>
  );
}
