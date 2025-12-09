import React from "react";
import "./technician-sla.css";

const SLAConfig: React.FC = () => {
  return (
    <div className="sla-root">

      <div className="sla-card">
        <h3 className="section-title">Response &amp; Resolution Times</h3>

        <div className="sla-row">
          <div className="sla-item">
            <div className="sla-item-header">P1 - Critical</div>
            <div className="sla-fields">
              <label>
                <div className="field-label">Response Time</div>
                <input className="field-input" defaultValue="15 minutes" />
              </label>
              <label>
                <div className="field-label">Resolution Time</div>
                <input className="field-input" placeholder="e.g., 1 hour" />
              </label>
            </div>
          </div>
        </div>

        <div className="sla-row">
          <div className="sla-item">
            <div className="sla-item-header">P2 - High</div>
            <div className="sla-fields">
              <label>
                <div className="field-label">Response Time</div>
                <input className="field-input" defaultValue="1 hour" />
              </label>
              <label>
                <div className="field-label">Resolution Time</div>
                <input className="field-input" defaultValue="4 hours" />
              </label>
            </div>
          </div>
        </div>

        <div className="sla-row">
          <div className="sla-item">
            <div className="sla-item-header">P3 - Medium</div>
            <div className="sla-fields">
              <label>
                <div className="field-label">Response Time</div>
                <input className="field-input" defaultValue="4 hours" />
              </label>
              <label>
                <div className="field-label">Resolution Time</div>
                <input className="field-input" defaultValue="8 hours" />
              </label>
            </div>
          </div>
        </div>

        <div className="sla-row">
          <div className="sla-item">
            <div className="sla-item-header">P4 - Low</div>
            <div className="sla-fields">
              <label>
                <div className="field-label">Response Time</div>
                <input className="field-input" defaultValue="8 hours" />
              </label>
              <label>
                <div className="field-label">Resolution Time</div>
                <input className="field-input" defaultValue="24 hours" />
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className="escalation-card">
        <h3 className="section-title">Escalation Path</h3>
        <div className="escalation-item">
          <div className="escalation-step">1</div>
          <div className="escalation-content">
            <div className="escalation-title">Level 1 Support</div>
            <div className="escalation-sub">Initial Triage &amp; Known Issues</div>
          </div>
        </div>
      </div>

      <div className="actions-row fixed-actions">
        <div className="actions-inner">
          <button className="btn btn-reset">Reset to Default</button>
          <button className="btn btn-save">Save Changes</button>
        </div>
      </div>
    </div>
  );
};

export default SLAConfig;
