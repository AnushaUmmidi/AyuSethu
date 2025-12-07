import React, { useState, useEffect } from "react";

const styles = `
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

:root {
  --primary-green: #0d2a1a;
  --secondary-green: #1a472a;
  --accent-green: #2d7048;
  --light-green: #e9f5eb;
  --card-bg: #ffffff;
  --background: #f8fbf7;
  --border-color: #d0e0c8;
  --text-dark: #1a2c16;
  --text-medium: #3a4a35;
  --text-light: #6c7b65;
  --radius: 12px;
  --transition: all 0.3s ease;
}

@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Poppins:wght@400;500;600;700&display=swap');

html, body, #root {
  width: 100%;
  min-height: 100vh;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
  background: var(--background);
  color: var(--text-dark);
  line-height: 1.6;
}

/* HERO SECTION -------------------------------------------------- */
.vhc-hero {
  width: 100%;
  min-height: 180px;
  background: linear-gradient(rgba(13, 42, 26, 0.95), rgba(13, 42, 26, 0.98)), 
              url("https://t3.ftcdn.net/jpg/16/27/75/38/360_F_1627753819_TLWx2Fs1OZEc5BeHkA27IIsZkdUJerl8.jpg") center/cover;
  position: relative;
  display: flex;
  align-items: center;
  padding: 20px 0;
}

.vhc-hero-content {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 40px;
  display: flex;
  align-items: center;
  gap: 30px;
}

.vhc-profile-section {
  display: flex;
  align-items: center;
  gap: 20px;
  flex-shrink: 0;
}

.vhc-profile-photo {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: 3px solid rgba(255, 255, 255, 0.3);
  background: linear-gradient(135deg, var(--accent-green), var(--secondary-green));
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  color: white;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
}

.vhc-hero-text {
  flex: 1;
}

.vhc-hero-title {
  font-family: 'Poppins', sans-serif;
  font-size: 28px;
  font-weight: 600;
  color: #ffffff;
  margin: 0 0 4px;
}

.vhc-hero-subtitle {
  font-size: 16px;
  color: #e0f0d8;
  font-weight: 300;
  margin-bottom: 16px;
}

.vhc-hero-info {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.vhc-collector-id {
  font-size: 14px;
  font-weight: 500;
  color: #ffffff;
  display: flex;
  align-items: center;
  gap: 8px;
}

.vhc-collector-id::before {
  content: "🆔";
  font-size: 12px;
}

.vhc-collector-role {
  font-size: 13px;
  color: #c5e0b4;
  display: flex;
  align-items: center;
  gap: 6px;
}

.vhc-collector-role::before {
  content: "👨‍🌾";
  font-size: 13px;
}

.vhc-collector-login {
  font-size: 12px;
  color: #a8c9a0;
  display: flex;
  align-items: center;
  gap: 6px;
}

.vhc-collector-login::before {
  content: "🕒";
  font-size: 12px;
}

/* MAIN LAYOUT -------------------------------------------------- */
.vhc-main {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
}

.vhc-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.6fr) minmax(0, 1.4fr);
  gap: 40px;
  align-items: start;
}

@media (max-width: 1024px) {
  .vhc-grid {
    grid-template-columns: 1fr;
    gap: 30px;
  }
  
  .vhc-hero-content {
    flex-direction: column;
    text-align: center;
    padding: 0 20px;
  }
  
  .vhc-profile-section {
    flex-direction: column;
    gap: 15px;
  }
}

.vhc-card {
  background: var(--card-bg);
  border-radius: var(--radius);
  padding: 30px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
  border: 1px solid var(--border-color);
}

/* FORM SECTION -------------------------------------------------- */
.vhc-form-header {
  margin-bottom: 30px;
}

.vhc-card-title {
  font-family: 'Poppins', sans-serif;
  font-size: 22px;
  font-weight: 600;
  color: var(--primary-green);
  margin: 0 0 8px;
}

.vhc-card-sub {
  font-size: 14px;
  color: var(--text-medium);
  line-height: 1.5;
}

/* FORM FIELDS -------------------------------------------------- */
.vhc-form-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin-bottom: 10px;
}

@media (max-width: 768px) {
  .vhc-form-grid {
    grid-template-columns: 1fr;
    gap: 18px;
  }
}

.vhc-field {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.vhc-field-full {
  grid-column: 1 / -1;
}

.vhc-label {
  font-size: 13px;
  font-weight: 600;
  color: var(--text-medium);
  display: flex;
  align-items: center;
  gap: 4px;
}

.vhc-required {
  color: #e63946;
  font-size: 12px;
}

.vhc-input,
.vhc-select,
.vhc-textarea {
  border: 1.5px solid var(--border-color);
  border-radius: 8px;
  padding: 12px 14px;
  font-size: 14px;
  background: #fcfefb;
  color: var(--text-dark);
  font-family: 'Inter', sans-serif;
  transition: var(--transition);
  outline: none;
  width: 100%;
}

.vhc-input:focus,
.vhc-select:focus,
.vhc-textarea:focus {
  border-color: var(--accent-green);
  background: #ffffff;
  box-shadow: 0 0 0 3px rgba(45, 112, 72, 0.1);
}

.vhc-textarea {
  min-height: 100px;
  resize: vertical;
  line-height: 1.5;
}

.vhc-gps-row {
  display: flex;
  gap: 12px;
  align-items: center;
}

.vhc-gps-input {
  flex: 1;
  font-family: 'Monaco', 'Menlo', monospace;
  font-size: 13px;
}

/* BUTTONS -------------------------------------------------- */
.vhc-btn {
  background: var(--accent-green);
  color: white;
  border: none;
  border-radius: 8px;
  padding: 12px 20px;
  font-size: 13px;
  font-weight: 600;
  font-family: 'Inter', sans-serif;
  cursor: pointer;
  transition: var(--transition);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-width: 140px;
}

.vhc-btn:hover {
  background: var(--secondary-green);
  transform: translateY(-1px);
}

.vhc-btn-icon {
  font-size: 14px;
}

/* CREATE BATCH BUTTON -------------------------------------------------- */
.vhc-create-batch-section {
  margin-top: 30px;
  padding-top: 30px;
  border-top: 1px solid var(--border-color);
  text-align: center;
}

.vhc-create-batch-btn {
  background: var(--primary-green);
  color: white;
  border: none;
  border-radius: 8px;
  padding: 14px 32px;
  font-size: 14px;
  font-weight: 600;
  font-family: 'Inter', sans-serif;
  cursor: pointer;
  transition: var(--transition);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  min-width: 200px;
}

.vhc-create-batch-btn:hover {
  background: #0c2416;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(13, 42, 26, 0.2);
}

/* TIMELINE SECTION -------------------------------------------------- */
.vhc-timeline-header {
  margin-bottom: 25px;
}

.vhc-timeline-title {
  font-family: 'Poppins', sans-serif;
  font-size: 22px;
  font-weight: 600;
  color: var(--primary-green);
  margin: 0 0 8px;
}

.vhc-timeline-subtitle {
  font-size: 14px;
  color: var(--text-medium);
  line-height: 1.5;
}

/* TIMELINE -------------------------------------------------- */
.vhc-timeline-container {
  position: relative;
  padding-left: 30px;
  margin-bottom: 30px;
}

.vhc-timeline-line {
  position: absolute;
  left: 15px;
  top: 0;
  bottom: 0;
  width: 2px;
  background: linear-gradient(to bottom, var(--accent-green), var(--border-color));
}

.vhc-timeline-item {
  position: relative;
  margin-bottom: 24px;
  background: white;
  border-radius: 8px;
  border: 1px solid var(--border-color);
  padding: 20px;
  padding-left: 45px;
  transition: var(--transition);
  cursor: pointer;
}

.vhc-timeline-item:hover {
  border-color: var(--accent-green);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.vhc-timeline-dot {
  position: absolute;
  left: -30px;
  top: 50%;
  transform: translateY(-50%);
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: white;
  border: 2px solid var(--border-color);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 600;
  color: var(--text-medium);
  z-index: 2;
}

.vhc-timeline-dot.done {
  background: var(--accent-green);
  border-color: var(--accent-green);
  color: white;
}

.vhc-timeline-dot.current {
  background: #fff8e1;
  border-color: #ffb300;
  color: #ff8f00;
}

.vhc-timeline-stage {
  font-family: 'Poppins', sans-serif;
  font-size: 15px;
  font-weight: 600;
  color: var(--primary-green);
  margin: 0 0 8px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.vhc-timeline-stage-icon {
  font-size: 16px;
}

.vhc-timeline-desc {
  font-size: 13px;
  color: var(--text-medium);
  line-height: 1.5;
  margin-bottom: 12px;
}

.vhc-timeline-status {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.3px;
}

.vhc-timeline-status.done {
  background: #e9f5eb;
  color: var(--accent-green);
  border: 1px solid #c8e6c9;
}

.vhc-timeline-status.done::before {
  content: "✅";
  font-size: 11px;
}

.vhc-timeline-status.current {
  background: #fff3e0;
  color: #ff8f00;
  border: 1px solid #ffcc80;
}

.vhc-timeline-status.current::before {
  content: "🔄";
  font-size: 11px;
}

.vhc-timeline-status.waiting {
  background: #f5f5f5;
  color: var(--text-light);
  border: 1px solid #e0e0e0;
}

.vhc-timeline-status.waiting::before {
  content: "⏳";
  font-size: 11px;
}

/* LIVE PREVIEW -------------------------------------------------- */
.vhc-live-preview {
  margin-top: 30px;
  padding-top: 30px;
  border-top: 1px solid var(--border-color);
}

.vhc-live-preview-title {
  font-family: 'Poppins', sans-serif;
  font-size: 18px;
  font-weight: 600;
  color: var(--primary-green);
  margin: 0 0 20px;
}

.vhc-preview-container {
  background: #f8fbf7;
  border-radius: 8px;
  padding: 24px;
  border: 1px solid var(--border-color);
}

.vhc-preview-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 18px;
  margin-bottom: 24px;
}

@media (max-width: 768px) {
  .vhc-preview-grid {
    grid-template-columns: 1fr;
  }
}

.vhc-preview-item {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.vhc-preview-label {
  font-size: 12px;
  color: var(--text-light);
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.3px;
}

.vhc-preview-value {
  font-size: 14px;
  font-weight: 600;
  color: var(--text-dark);
  display: flex;
  align-items: center;
  gap: 6px;
  min-height: 20px;
}

.vhc-preview-empty {
  color: var(--text-light);
  font-style: italic;
  font-weight: normal;
  font-size: 13px;
}

.vhc-preview-gps {
  font-family: 'Monaco', 'Menlo', monospace;
  font-size: 12px;
  color: var(--text-medium);
}

.vhc-preview-notes {
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px dashed var(--border-color);
}

.vhc-notes-label {
  font-size: 12px;
  color: var(--text-light);
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.3px;
  margin-bottom: 8px;
}

.vhc-notes-content {
  font-size: 13px;
  color: var(--text-dark);
  line-height: 1.5;
  background: white;
  border-radius: 6px;
  padding: 12px;
  border: 1px solid var(--border-color);
  min-height: 60px;
}

.vhc-preview-status {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 20px;
  padding: 16px;
  background: white;
  border-radius: 8px;
  border: 1px solid var(--border-color);
}

.vhc-preview-status-icon {
  font-size: 20px;
}

.vhc-preview-status-text {
  flex: 1;
}

.vhc-preview-status-title {
  font-weight: 600;
  color: var(--primary-green);
  font-size: 14px;
  margin-bottom: 4px;
}

.vhc-preview-status-subtitle {
  font-size: 12px;
  color: var(--text-medium);
}

/* TOAST NOTIFICATION -------------------------------------------------- */
.vhc-toast {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background: var(--primary-green);
  color: white;
  padding: 16px 20px;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(13, 42, 26, 0.3);
  display: flex;
  align-items: center;
  gap: 12px;
  z-index: 1000;
  animation: slideIn 0.3s ease;
  max-width: 350px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

@keyframes slideIn {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

.vhc-toast-icon {
  font-size: 16px;
  flex-shrink: 0;
}

.vhc-toast-content {
  font-size: 13px;
  line-height: 1.4;
}

/* STATUS PILLS -------------------------------------------------- */
.vhc-status-pill {
  display: inline-block;
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.vhc-status-complete {
  background: #e9f5eb;
  color: var(--accent-green);
  border: 1px solid #c8e6c9;
}

.vhc-status-progress {
  background: #fff3e0;
  color: #ff8f00;
  border: 1px solid #ffcc80;
}

.vhc-status-pending {
  background: #f5f5f5;
  color: var(--text-light);
  border: 1px solid #e0e0e0;
}
`;

const STAGE_DATA = [
  {
    id: 1,
    title: "Plantation Documentation",
    description: "Initial plantation images, leaf health verification and geo-tagging for origin trail",
    icon: "📸"
  },
  {
    id: 2,
    title: "Farmer Engagement",
    description: "Farmer receives instructions, safety guidelines and schedule via SMS/App",
    icon: "👨‍🌾"
  },
  {
    id: 3,
    title: "Growth Verification",
    description: "On-field growth monitoring and quality assessment by collector",
    icon: "🌱"
  },
  {
    id: 4,
    title: "Harvest Scheduling",
    description: "Harvest timing coordination and equipment preparation with farmer",
    icon: "📅"
  },
  {
    id: 5,
    title: "Final Verification",
    description: "Final harvest images, drying verification & dispatch authorization",
    icon: "✅"
  }
];

function App() {
  const [form, setForm] = useState({
    herb: "Tulsi (Holy Basil)",
    qty: "25.5",
    date: "",
    plot: "Plot 5B – Valley North",
    quality: "Premium (AAA)",
    weather: "Clear · 26°C · Humidity 65%",
    gps: "68.165408, 114.720211",
    notes: "Early morning harvest, no spray in last 30 days, leaves hand-plucked. Optimal sunlight exposure throughout growth cycle."
  });

  const [currentStage, setCurrentStage] = useState(2);
  const [stageStatus, setStageStatus] = useState(["done", "current", "waiting", "waiting", "waiting"]);
  const [toast, setToast] = useState("");

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setForm(f => ({ ...f, date: today }));
  }, []);

  const updateForm = (key, value) => {
    setForm(prev => ({ ...prev, [key]: value }));
  };

  const handleGPS = () => {
    setToast("📍 Capturing GPS location...");
    setTimeout(() => {
      const newGPS = `${(Math.random() * 90).toFixed(6)}, ${(Math.random() * 180).toFixed(6)}`;
      updateForm("gps", newGPS);
      setToast("✅ GPS location captured!");
    }, 800);
    
    setTimeout(() => setToast(""), 3000);
  };

  const handleStageClick = (stageId) => {
    setCurrentStage(stageId);
    setToast(`📋 Switched to Stage ${stageId}`);
    setTimeout(() => setToast(""), 3000);
  };

  const markStageDone = (stageId) => {
    const newStatus = [...stageStatus];
    newStatus[stageId-1] = "done";
    if (stageId < 5) newStatus[stageId] = "current";
    setStageStatus(newStatus);
    
    setToast(`✅ Stage ${stageId} completed!`);
    setTimeout(() => setToast(""), 3000);
    
    if (stageId === 5) {
      setTimeout(() => {
        setToast("🎉 Batch completed!");
      }, 500);
    }
  };

  const handleCreateBatch = () => {
    setToast("🌿 Creating new herb batch...");
    setTimeout(() => {
      setToast("✅ New batch created: BATCH-2025-7421");
    }, 1000);
    
    setTimeout(() => setToast(""), 4000);
  };

  const getStatusText = (status) => {
    switch(status) {
      case "done": return "COMPLETED";
      case "current": return "IN PROGRESS";
      default: return "PENDING";
    }
  };

  const renderTimelineItem = (stage) => {
    const status = stageStatus[stage.id - 1];
    
    return (
      <div 
        key={stage.id} 
        className="vhc-timeline-item"
        onClick={() => handleStageClick(stage.id)}
      >
        <div className={`vhc-timeline-dot ${status}`}>
          {status === "done" ? "✓" : stage.id}
        </div>
        <div>
          <div className="vhc-timeline-stage">
            <span className="vhc-timeline-stage-icon">{stage.icon}</span>
            {stage.title}
          </div>
          <div className="vhc-timeline-desc">
            {stage.description}
          </div>
          <div className={`vhc-timeline-status ${status}`}>
            {getStatusText(status)}
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <style>{styles}</style>

      {/* Toast Notification */}
      {toast && (
        <div className="vhc-toast">
          <span className="vhc-toast-icon">
            {toast.includes("📍") ? "📍" : 
             toast.includes("✅") ? "✅" : 
             toast.includes("📋") ? "📋" : 
             toast.includes("🎉") ? "🎉" : 
             toast.includes("🌿") ? "🌿" : "📡"}
          </span>
          <div className="vhc-toast-content">
            {toast.replace(/[📍✅📋🎉🌿📡]/g, '').trim()}
          </div>
        </div>
      )}

      {/* HERO SECTION */}
      <header className="vhc-hero">
        <div className="vhc-hero-content">
          <div className="vhc-profile-section">
            <div className="vhc-profile-photo">
              🌿
            </div>
            <div className="vhc-hero-text">
              <h1 className="vhc-hero-title">VirtuHerbChain Collector Portal</h1>
              <p className="vhc-hero-subtitle">Ayurvedic Traceability & Quality Assurance System</p>
              <div className="vhc-hero-info">
                <div className="vhc-collector-id">Collector ID: COL-7421 • Region: South</div>
                <div className="vhc-collector-role">Senior Field Officer</div>
                <div className="vhc-collector-login">Last login: Today, 09:42 AM</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="vhc-main">
        <div className="vhc-grid">
          {/* LEFT PANEL: FORM */}
          <section className="vhc-card">
            <div className="vhc-form-header">
              <h2 className="vhc-card-title">Create New Herb Batch</h2>
              <p className="vhc-card-sub">
                Record harvest details for traceability, quality scoring, and farmer incentives.
              </p>
            </div>

            <div className="vhc-form-grid">
              <div className="vhc-field">
                <label className="vhc-label">
                  Herb Name <span className="vhc-required">*</span>
                </label>
                <select
                  className="vhc-select"
                  value={form.herb}
                  onChange={(e) => updateForm("herb", e.target.value)}
                >
                  <option value="Tulsi (Holy Basil)">Tulsi (Holy Basil)</option>
                  <option value="Ashwagandha">Ashwagandha</option>
                  <option value="Neem">Neem</option>
                  <option value="Brahmi">Brahmi</option>
                  <option value="Turmeric (Organic)">Turmeric (Organic)</option>
                </select>
              </div>

              <div className="vhc-field">
                <label className="vhc-label">
                  Quantity (kg) <span className="vhc-required">*</span>
                </label>
                <input
                  className="vhc-input"
                  type="number"
                  value={form.qty}
                  min="0"
                  step="0.1"
                  placeholder="e.g., 25.5"
                  onChange={(e) => updateForm("qty", e.target.value)}
                />
              </div>

              <div className="vhc-field">
                <label className="vhc-label">
                  Harvest Date <span className="vhc-required">*</span>
                </label>
                <input
                  className="vhc-input"
                  type="date"
                  value={form.date}
                  onChange={(e) => updateForm("date", e.target.value)}
                />
              </div>

              <div className="vhc-field">
                <label className="vhc-label">Plot / Farm ID</label>
                <input
                  className="vhc-input"
                  value={form.plot}
                  onChange={(e) => updateForm("plot", e.target.value)}
                  placeholder="e.g., Plot 5B – Valley North"
                />
              </div>

              <div className="vhc-field">
                <label className="vhc-label">Quality Grade</label>
                <select
                  className="vhc-select"
                  value={form.quality}
                  onChange={(e) => updateForm("quality", e.target.value)}
                >
                  <option value="Premium (AAA)">Premium (AAA)</option>
                  <option value="Grade A (AA)">Grade A (AA)</option>
                  <option value="Grade B (A)">Grade B (A)</option>
                </select>
              </div>

              <div className="vhc-field">
                <label className="vhc-label">Weather at Harvest</label>
                <input
                  className="vhc-input"
                  value={form.weather}
                  onChange={(e) => updateForm("weather", e.target.value)}
                  placeholder="e.g., Clear · 26°C · Humidity 65%"
                />
              </div>

              <div className="vhc-field vhc-field-full">
                <label className="vhc-label">
                  GPS Location <span className="vhc-required">*</span>
                </label>
                <div className="vhc-gps-row">
                  <input 
                    className="vhc-input vhc-gps-input" 
                    value={form.gps} 
                    readOnly 
                  />
                  <button
                    type="button"
                    className="vhc-btn"
                    onClick={handleGPS}
                  >
                    <span className="vhc-btn-icon">📍</span> Capture GPS
                  </button>
                </div>
              </div>

              <div className="vhc-field vhc-field-full">
                <label className="vhc-label">Collector Notes</label>
                <textarea
                  className="vhc-textarea"
                  value={form.notes}
                  onChange={(e) => updateForm("notes", e.target.value)}
                  placeholder="Harvest observations and special conditions..."
                  rows="3"
                />
              </div>
            </div>

            {/* CREATE BATCH BUTTON */}
            <div className="vhc-create-batch-section">
              <button
                className="vhc-create-batch-btn"
                onClick={handleCreateBatch}
              >
                <span className="vhc-btn-icon">🌿</span> Create New Herb Batch
              </button>
            </div>
          </section>

          {/* RIGHT PANEL: TIMELINE & PREVIEW */}
          <aside className="vhc-card">
            <div className="vhc-timeline-header">
              <h2 className="vhc-timeline-title">Batch Integrity Timeline</h2>
              <p className="vhc-timeline-subtitle">
                Track progress through all stages. Click any stage to manage.
              </p>
            </div>

            <div className="vhc-timeline-container">
              <div className="vhc-timeline-line" />
              <div>
                {STAGE_DATA.map((stage) => renderTimelineItem(stage))}
              </div>
            </div>

            {/* LIVE PREVIEW */}
            <div className="vhc-live-preview">
              <h3 className="vhc-live-preview-title">Live Batch Preview</h3>
              
              <div className="vhc-preview-container">
                <div className="vhc-preview-grid">
                  <div className="vhc-preview-item">
                    <div className="vhc-preview-label">Herb Name</div>
                    <div className="vhc-preview-value">
                      {form.herb || <span className="vhc-preview-empty">Not selected</span>}
                    </div>
                  </div>
                  
                  <div className="vhc-preview-item">
                    <div className="vhc-preview-label">Harvest Date</div>
                    <div className="vhc-preview-value">
                      {form.date ? new Date(form.date).toLocaleDateString('en-GB') : 
                       <span className="vhc-preview-empty">Not set</span>}
                    </div>
                  </div>
                  
                  <div className="vhc-preview-item">
                    <div className="vhc-preview-label">Quality Grade</div>
                    <div className="vhc-preview-value">
                      {form.quality || <span className="vhc-preview-empty">Not graded</span>}
                    </div>
                  </div>
                  
                  <div className="vhc-preview-item">
                    <div className="vhc-preview-label">Plot / Farm ID</div>
                    <div className="vhc-preview-value">
                      {form.plot || <span className="vhc-preview-empty">Not specified</span>}
                    </div>
                  </div>
                  
                  <div className="vhc-preview-item">
                    <div className="vhc-preview-label">Weather</div>
                    <div className="vhc-preview-value">
                      {form.weather || <span className="vhc-preview-empty">Not recorded</span>}
                    </div>
                  </div>
                  
                  <div className="vhc-preview-item">
                    <div className="vhc-preview-label">GPS Location</div>
                    <div className="vhc-preview-value vhc-preview-gps">
                      {form.gps === "Not captured" ? 
                        <span className="vhc-preview-empty">Not captured</span> : 
                        form.gps}
                    </div>
                  </div>
                </div>

                <div className="vhc-preview-notes">
                  <div className="vhc-notes-label">Collector Notes</div>
                  <div className="vhc-notes-content">
                    {form.notes || <span className="vhc-preview-empty">No notes added</span>}
                  </div>
                </div>

                <div className="vhc-preview-status">
                  <div className="vhc-preview-status-icon">
                    {stageStatus[currentStage-1] === "done" ? "✅" : 
                     stageStatus[currentStage-1] === "current" ? "🔄" : "⏳"}
                  </div>
                  <div className="vhc-preview-status-text">
                    <div className="vhc-preview-status-title">
                      Stage {currentStage}: {STAGE_DATA[currentStage-1]?.title}
                    </div>
                    <div className="vhc-preview-status-subtitle">
                      Status: {getStatusText(stageStatus[currentStage-1])}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}

export default App;