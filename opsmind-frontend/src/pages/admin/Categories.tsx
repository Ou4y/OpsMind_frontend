import React, { useState } from 'react';
import './Categories.css';
import { Search, Plus, ChevronRight, X, Layers, Settings, Database, Cloud } from 'lucide-react';

// Mock Data
const initialCategories = [
  { id: 1, name: 'Hardware', description: 'Laptops, Peripherals, and Servers', count: 120, color: '#eff6ff', iconColor: '#2563eb', icon: <Database size={20} /> },
  { id: 2, name: 'Software', description: 'OS, Licenses, and Installation', count: 85, color: '#f0fdf4', iconColor: '#16a34a', icon: <Layers size={20} /> },
  { id: 3, name: 'Network', description: 'WiFi, VPN, and Connectivity', count: 42, color: '#fff7ed', iconColor: '#ea580c', icon: <Cloud size={20} /> },
  { id: 4, name: 'Access', description: 'Login, Password Reset, permissions', count: 210, color: '#fdf4ff', iconColor: '#c026d3', icon: <Settings size={20} /> },
];

export default function Categories() {
  const [selectedCategory, setSelectedCategory] = useState<any>(null);

  return (
    <div className="categories-container">
      
      {/* Categories List Card */}
      <div className="categories-card">
        <div className="cat-header">
          <button className="cat-icon-btn"><Search size={20} /></button>
          <h2 className="cat-title">Ticket Categories</h2>
          <button className="cat-icon-btn btn-add"><Plus size={20} /></button>
        </div>

        <div>
          {initialCategories.map((cat) => (
            <div 
              key={cat.id} 
              className="category-item" 
              onClick={() => setSelectedCategory(cat)}
            >
              <div className="category-content">
                {/* Visual Icon Box */}
                <div 
                  className="category-icon-box" 
                  style={{ backgroundColor: cat.color, color: cat.iconColor }}
                >
                  {cat.icon}
                </div>
                
                <div className="category-details">
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span className="category-name">{cat.name}</span>
                    <span className="count-badge">{cat.count} tickets</span>
                  </div>
                  <span className="category-desc">{cat.description}</span>
                </div>
              </div>
              
              <ChevronRight size={18} color="#9ca3af" />
            </div>
          ))}
        </div>
      </div>

      {/* Edit Modal */}
      {selectedCategory && (
        <CategoryModal 
          category={selectedCategory} 
          onClose={() => setSelectedCategory(null)} 
        />
      )}
    </div>
  );
}

// --- Sub-component: Modal ---
function CategoryModal({ category, onClose }: any) {
  return (
    <div className="cat-modal-overlay" onClick={onClose}>
      <div className="cat-modal-card" onClick={(e) => e.stopPropagation()}>
        
        <div className="modal-header">
          <h3 className="cat-title">Edit Category</h3>
          <button className="cat-icon-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* Name Input */}
        <div className="form-group">
          <label className="form-label">Category Name</label>
          <input type="text" className="form-input" defaultValue={category.name} />
        </div>

        {/* Description Input */}
        <div className="form-group">
          <label className="form-label">Description</label>
          <textarea className="form-textarea" rows={3} defaultValue={category.description} />
        </div>

        {/* Color Picker Visual */}
        <div className="form-group">
          <label className="form-label">Color Code</label>
          <div className="color-options">
            <div className="color-circle selected" style={{ backgroundColor: '#2563eb' }}></div>
            <div className="color-circle" style={{ backgroundColor: '#16a34a' }}></div>
            <div className="color-circle" style={{ backgroundColor: '#ea580c' }}></div>
            <div className="color-circle" style={{ backgroundColor: '#c026d3' }}></div>
            <div className="color-circle" style={{ backgroundColor: '#6b7280' }}></div>
          </div>
        </div>

        {/* Buttons */}
        <div className="cat-modal-actions">
          <button className="btn-delete">Delete</button>
          <button className="btn-save" onClick={onClose}>Save Changes</button>
        </div>

      </div>
    </div>
  );
}
