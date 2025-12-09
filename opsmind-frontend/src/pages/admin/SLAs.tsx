import React from 'react';
import './SLAs.css';
import { ArrowLeft, AlertCircle, Signal, BatteryMedium, BatteryLow, ShieldAlert } from 'lucide-react';

export default function SLAConfiguration() {
  return (
    <div className="sla-container">
      <div className="sla-card">
        
        {/* Header */}
        <div className="sla-header">
          <button className="sla-back-btn">
            <ArrowLeft size={20} />
          </button>
          <h2 className="sla-title">SLA Configuration</h2>
        </div>

        <div className="sla-content">
          
          {/* --- Section 1: Timelines --- */}
          <span className="sla-section-label">Response & Resolution Times</span>

          {/* P1 Critical */}
          <div className="priority-row">
            <div className="priority-header">
              <ShieldAlert size={18} color="#dc2626" /> {/* Red Icon */}
              <span>P1 - Critical Impact</span>
            </div>
            <div className="priority-inputs">
              <div className="input-wrapper">
                <label className="input-label">Response Time Goal</label>
                <input type="text" className="sla-input" defaultValue="15 minutes" />
                <span className="helper-text">Target for initial acknowledgement.</span>
              </div>
              <div className="input-wrapper">
                <label className="input-label">Resolution Time Goal</label>
                <input type="text" className="sla-input" placeholder="e.g., 2 hours" />
              </div>
            </div>
          </div>

          {/* P2 High */}
          <div className="priority-row">
            <div className="priority-header">
              <Signal size={18} color="#ea580c" /> {/* Orange Icon */}
              <span>P2 - High Impact</span>
            </div>
            <div className="priority-inputs">
              <div className="input-wrapper">
                <label className="input-label">Response Time Goal</label>
                <input type="text" className="sla-input" defaultValue="1 hour" />
              </div>
              <div className="input-wrapper">
                <label className="input-label">Resolution Time Goal</label>
                <input type="text" className="sla-input" defaultValue="4 hours" />
              </div>
            </div>
          </div>

          {/* P3 Medium */}
          <div className="priority-row">
            <div className="priority-header">
              <BatteryMedium size={18} color="#2563eb" /> {/* Blue Icon */}
              <span>P3 - Medium Impact</span>
            </div>
            <div className="priority-inputs">
              <div className="input-wrapper">
                <label className="input-label">Response Time Goal</label>
                <input type="text" className="sla-input" defaultValue="4 hours" />
              </div>
              <div className="input-wrapper">
                <label className="input-label">Resolution Time Goal</label>
                <input type="text" className="sla-input" defaultValue="8 hours" />
              </div>
            </div>
          </div>

          {/* P4 Low */}
          <div className="priority-row">
            <div className="priority-header">
              <BatteryLow size={18} color="#6b7280" /> {/* Gray Icon */}
              <span>P4 - Low Impact</span>
            </div>
            <div className="priority-inputs">
              <div className="input-wrapper">
                <label className="input-label">Response Time Goal</label>
                <input type="text" className="sla-input" defaultValue="8 hours" />
              </div>
              <div className="input-wrapper">
                <label className="input-label">Resolution Time Goal</label>
                <input type="text" className="sla-input" defaultValue="24 hours" />
              </div>
            </div>
          </div>

          {/* --- Section 2: Escalation --- */}
          <span className="sla-section-label" style={{ marginTop: '40px' }}>Escalation Path</span>
          
          <div className="escalation-container">
            {/* Step 1 */}
            <div className="escalation-step">
              <div className="step-number">1</div>
              <div className="step-info">
                <h4>Level 1 Support</h4>
                <p>Handling initial triage, basic troubleshooting, and known issues.</p>
              </div>
            </div>
            
            {/* Step 2 */}
            <div className="escalation-step">
              <div className="step-number">2</div>
              <div className="step-info">
                <h4>Level 2 Technical Support</h4>
                <p>Auto-escalation if resolution time exceeds 50% of SLA.</p>
              </div>
            </div>

             {/* Step 3 */}
             <div className="escalation-step">
              <div className="step-number">3</div>
              <div className="step-info">
                <h4>Engineering / DevOps</h4>
                <p>For critical infrastructure failures or code-level bugs.</p>
              </div>
            </div>
          </div>

        </div>

        {/* Footer Buttons */}
        <div className="sla-actions">
          <button className="btn-reset">Reset to Defaults</button>
          <button className="btn-save">Save Configuration</button>
        </div>

      </div>
    </div>
  );
}
