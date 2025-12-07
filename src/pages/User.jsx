// src/App.js
import React, { useState } from "react";
import BarcodeScannerComponent from "react-qr-barcode-scanner";
import "../styles/User.css";

/**
 * Dummy backend data – in real app this comes from API / DB / blockchain.
 */

const HERB_DB = {
  "1": {
    code: "1",
    name: "Tulasi (Holy Basil)",
    farmerName: "V. Narayana Reddy",
    region: "Tirupati Hills, Andhra Pradesh",
    image: "https://images.unsplash.com/photo-1524593419931-1a1152d41f89?auto=format&fit=crop&w=900&q=80",
    qualityGrade: "A+",
    purity: "99.4% (lab tested, pesticide-free)",
    harvestDate: "2025-01-12",
    dryingMethod: "Shade drying, 3 days, 35°C max",
    moisture: "7.8%",
    batchId: "TUL-AP-2025-01-12-07",
    processingStatus: "Cleaned, cut, pre-sieved; ready for milling",
    description:
      "Bright green leaves, strong aroma, clean stems. No visible pests or foreign matter. Suitable for internal use formulations.",
  },
  "2": {
    code: "2",
    name: "Ashwagandha (Withania somnifera)",
    farmerName: "S. Kavya",
    region: "Solapur, Maharashtra",
    image: "https://images.unsplash.com/photo-1597405490024-9add713d9a8b?auto=format&fit=crop&w=900&q=80",
    qualityGrade: "A",
    purity: "98.1% (soil & heavy metals within limits)",
    harvestDate: "2024-12-05",
    dryingMethod: "Mechanical tray drying, 45°C",
    moisture: "8.5%",
    batchId: "ASH-MH-2024-12-05-03",
    processingStatus:
      "Roots cleaned and sliced; ready for further processing & extraction.",
    description:
      "Uniform root pieces, minimal fibre and soil. Ideal for churna and extract-based formulations.",
  },
};

function App() {
  const [activeCode, setActiveCode] = useState("");
  const [activeHerb, setActiveHerb] = useState(null);
  const [sourceLabel, setSourceLabel] = useState(""); // camera / manual / upload
  const [cameraEnabled, setCameraEnabled] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState("");
  const [manualBarcode, setManualBarcode] = useState("");

  // Feedback state
  const [feedback, setFeedback] = useState({
    name: "",
    role: "",
    processStage: "",
    comments: "",
  });
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  const [showFeedbackDialog, setShowFeedbackDialog] = useState(false);

  // Lookup herb info from "backend"
  const loadHerbByCode = (code, source = "Unknown") => {
    const cleanCode = (code || "").trim();
    if (!cleanCode) return;

    const herb = HERB_DB[cleanCode] || null;
    setActiveCode(cleanCode);
    setActiveHerb(herb);
    setSourceLabel(source);

    console.log("Barcode lookup:", { code: cleanCode, herb, source });
  };

  // Barcode scanner handler
  const handleScanUpdate = (err, result) => {
    if (result && result.text) {
      loadHerbByCode(result.text, "Camera scanner");
      setManualBarcode(result.text);
    }
  };

  // File upload (barcode image)
  const handleBarcodeFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setSelectedFileName(file.name);

    // In a real app: send file to backend for decoding barcode.
    // For demo: treat any upload as barcode "1" (Tulasi).
    loadHerbByCode("1", "Uploaded barcode image");
    setManualBarcode("1");
  };

  // Manual barcode submit
  const handleManualSubmit = (e) => {
    e.preventDefault();
    if (!manualBarcode.trim()) return;
    loadHerbByCode(manualBarcode, "Manual entry");
  };

  // Feedback submission
  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...feedback,
      activeCode,
      activeHerbName: activeHerb?.name || null,
      submittedAt: new Date().toISOString(),
    };
    console.log("Feedback submitted:", payload);
    
    // Show feedback dialog
    setShowFeedbackDialog(true);
    setFeedbackSubmitted(true);
    
    // Reset form after submission
    setFeedback({
      name: "",
      role: "",
      processStage: "",
      comments: "",
    });
    
    // Hide dialog after 3 seconds
    setTimeout(() => {
      setShowFeedbackDialog(false);
      setFeedbackSubmitted(false);
    }, 3000);
  };

  // Close feedback dialog
  const closeFeedbackDialog = () => {
    setShowFeedbackDialog(false);
  };

  return (
    <div className="app-root">
      <Header />
      <Hero />
      <main className="main">
        <section id="scanner" className="content-section">
          <SectionHeader
            step="Step 1"
            title="Provide herb barcode"
            subtitle="Scan using camera, upload a barcode image, or enter the barcode manually. The system then shows full herb and farmer details from backend (dummy data here)."
          />
          <div className="grid-2">
            <BarcodePanel
              cameraEnabled={cameraEnabled}
              setCameraEnabled={setCameraEnabled}
              manualBarcode={manualBarcode}
              setManualBarcode={setManualBarcode}
              handleScanUpdate={handleScanUpdate}
              handleBarcodeFileChange={handleBarcodeFileChange}
              selectedFileName={selectedFileName}
              handleManualSubmit={handleManualSubmit}
            />
            <HerbDetailsCard
              activeCode={activeCode}
              activeHerb={activeHerb}
              sourceLabel={sourceLabel}
            />
          </div>
        </section>

        <section id="feedback" className="content-section">
          <SectionHeader
            step="Step 2"
            title="Process improvement feedback"
            subtitle="Share suggestions about sourcing, grading, drying, storage, or logistics for this herb or in general."
          />
          <FeedbackSection
            feedback={feedback}
            setFeedback={setFeedback}
            feedbackSubmitted={feedbackSubmitted}
            onSubmit={handleFeedbackSubmit}
          />
        </section>
      </main>
      
      {/* Feedback Success Dialog */}
      {showFeedbackDialog && (
        <FeedbackDialog onClose={closeFeedbackDialog} />
      )}
      
      <Footer />
    </div>
  );
}

/* ---------------------- SMALL COMPONENTS ---------------------- */

function Header() {
  return (
    <header className="header">
      <div className="header-inner">
        <div className="logo">
          <div className="logo-mark">🌿</div>
          <div>
            <div className="logo-title">HerbTrace</div>
            <div className="logo-subtitle">
              Ayurvedic Herb & Farmer Traceability
            </div>
          </div>
        </div>
        <nav className="nav">
          <a href="#scanner">Barcode</a>
          <a href="#feedback">Feedback</a>
        </nav>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero">
      <div className="hero-overlay" />
      <div className="hero-content">
        <p className="hero-kicker">User Portal</p>
        <h1 className="hero-title">
          Scan a barcode,
          <span className="hero-highlight">
            see the entire Ayurvedic herb story.
          </span>
        </h1>
        <p className="hero-subtitle">
          From herb name and farmer details to region, purity and processing
          notes. This portal simulates how your backend can expose A–Z data for
          every batch.
        </p>
        <div className="hero-actions">
          <a href="#scanner" className="btn btn-primary">
            Start with demo code "1"
          </a>
          <span className="hero-hint">
            Try barcode <strong>1</strong> for Tulasi, <strong>2</strong> for
            Ashwagandha.
          </span>
        </div>
      </div>
    </section>
  );
}

function SectionHeader({ step, title, subtitle }) {
  return (
    <div className="section-header">
      <p className="section-kicker">{step}</p>
      <h2>{title}</h2>
      <p className="section-subtitle">{subtitle}</p>
    </div>
  );
}

/* ------------------------ BARCODE PANEL ------------------------ */

function BarcodePanel({
  cameraEnabled,
  setCameraEnabled,
  manualBarcode,
  setManualBarcode,
  handleScanUpdate,
  handleBarcodeFileChange,
  selectedFileName,
  handleManualSubmit,
}) {
  return (
    <div className="card card--barcode">
      <h3>Barcode & Image Input</h3>
      <p className="card-subtext">
        Choose any method below to provide a barcode. In real use, backend will
        decode and return herb details.
      </p>

      {/* Camera scanner for barcode */}
      <div className="block">
        <div className="block-header">
          <span className="block-title">1. Barcode Camera Scanner</span>
          <button
            type="button"
            className={`btn-pill ${
              cameraEnabled ? "btn-pill--active" : "btn-pill--inactive"
            }`}
            onClick={() => setCameraEnabled((v) => !v)}
          >
            {cameraEnabled ? "Stop Scanner" : "Start Scanner"}
          </button>
        </div>
        <div className="scanner-frame">
          {cameraEnabled ? (
            <BarcodeScannerComponent
              width={"100%"}
              height={230}
              onUpdate={handleScanUpdate}
            />
          ) : (
            <div className="scanner-placeholder">
              <span className="scanner-icon">📷</span>
              <p>Enable camera to scan a barcode.</p>
            </div>
          )}
        </div>
      </div>

      {/* File upload section */}
      <div className="block">
        <div className="field">
          <label className="field-label">2. Upload Barcode Image</label>
          <div className="upload-area">
            <input
              type="file"
              accept="image/*"
              className="upload-input"
              id="barcode-upload"
              onChange={handleBarcodeFileChange}
            />
            <label htmlFor="barcode-upload" className="upload-label">
              <span className="upload-icon">📁</span>
              <span>Choose barcode image file</span>
            </label>
            {selectedFileName && (
              <p className="field-helper">
                Selected: <strong>{selectedFileName}</strong> (demo maps to barcode "1")
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Manual entry */}
      <form className="block block--manual" onSubmit={handleManualSubmit}>
        <div className="field">
          <label className="field-label">3. Enter Barcode Manually</label>
          <input
            type="text"
            className="field-input"
            placeholder='Try "1" for Tulasi or "2" for Ashwagandha'
            value={manualBarcode}
            onChange={(e) => setManualBarcode(e.target.value)}
          />
        </div>
        <button 
          type="submit" 
          className="btn btn-submit-action"
        >
          🌿 Fetch Herb Details
        </button>
      </form>
    </div>
  );
}

/* ------------------------ HERB DETAILS ------------------------ */

function HerbDetailsCard({ activeCode, activeHerb, sourceLabel }) {
  // Background image for herb details (same as hero background)
  const backgroundImageUrl = "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=1600&q=80";

  return (
    <div className="card card--details">
      <h3>Herb & Farmer Details</h3>

      {!activeCode && (
        <div className="details-empty">
          <div className="empty-icon">🌿</div>
          <p>No barcode scanned yet.</p>
          <p className="details-hint">
            Use any method on the left. For demo, enter barcode <strong>1</strong> to
            see Tulasi, or <strong>2</strong> for Ashwagandha.
          </p>
        </div>
      )}

      {activeCode && !activeHerb && (
        <div className="details-empty">
          <div className="empty-icon">❌</div>
          <p>
            No herb found for barcode <strong>{activeCode}</strong>.
          </p>
          <p className="details-hint">
            Currently only demo codes <strong>1</strong> and <strong>2</strong> have
            data.
          </p>
        </div>
      )}

      {activeHerb && (
        <div className="details-content">
          <div className="details-badge-row">
            <span className="details-badge">Barcode: {activeHerb.code}</span>
            {sourceLabel && (
              <span className="details-source">via {sourceLabel}</span>
            )}
          </div>

          {/* Herb image with background styling */}
          <div className="herb-image-container">
            <div 
              className="herb-image-bg"
              style={{ backgroundImage: `url(${backgroundImageUrl})` }}
            >
              <div className="herb-image-overlay">
                <div className="herb-image-content">
                  <h4>{activeHerb.name}</h4>
                  <p className="herb-image-sub">
                    Farmer: <strong>{activeHerb.farmerName}</strong>
                  </p>
                  <p className="herb-image-sub">
                    Region: <strong>{activeHerb.region}</strong>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="details-description">
            <p>{activeHerb.description}</p>
          </div>

          <div className="details-grid">
            <DetailItem label="Quality grade" value={activeHerb.qualityGrade} />
            <DetailItem label="Purity" value={activeHerb.purity} />
            <DetailItem label="Harvest date" value={activeHerb.harvestDate} />
            <DetailItem label="Drying method" value={activeHerb.dryingMethod} />
            <DetailItem label="Moisture" value={activeHerb.moisture} />
            <DetailItem label="Batch ID" value={activeHerb.batchId} />
          </div>

          <div className="details-footer">
            <span className="details-status">
              Processing status: {activeHerb.processingStatus}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

function DetailItem({ label, value }) {
  return (
    <div className="detail-item">
      <div className="detail-label">{label}</div>
      <div className="detail-value">{value}</div>
    </div>
  );
}

/* ------------------------ FEEDBACK SECTION ------------------------ */

function FeedbackSection({
  feedback,
  setFeedback,
  feedbackSubmitted,
  onSubmit,
}) {
  const update = (key, value) =>
    setFeedback((prev) => ({ ...prev, [key]: value }));

  return (
    <div className="card card--feedback">
      <form className="form" onSubmit={onSubmit}>
        <div className="form-grid">
          <div className="field">
            <label className="field-label">Your name</label>
            <input
              className="field-input"
              type="text"
              placeholder="Enter your full name"
              value={feedback.name}
              onChange={(e) => update("name", e.target.value)}
              required
            />
          </div>
          <div className="field">
            <label className="field-label">Role / department</label>
            <input
              className="field-input"
              type="text"
              placeholder="E.g. Raw material QC, Production, Warehouse"
              value={feedback.role}
              onChange={(e) => update("role", e.target.value)}
            />
          </div>
        </div>

        <div className="field">
          <label className="field-label">Process stage</label>
          <select
            className="field-input select-field"
            value={feedback.processStage}
            onChange={(e) => update("processStage", e.target.value)}
          >
            <option value="">Select stage</option>
            <option value="sourcing">Sourcing & procurement</option>
            <option value="grading">Sorting & grading</option>
            <option value="drying">Drying & storage</option>
            <option value="transport">Transport & logistics</option>
            <option value="documentation">Documentation & GMP</option>
            <option value="other">Other / general</option>
          </select>
        </div>

        <div className="field">
          <label className="field-label">Improvement suggestions</label>
          <textarea
            className="field-textarea"
            placeholder="Describe issues, risks, or improvements you see in the current process. Be as practical and specific as possible."
            value={feedback.comments}
            onChange={(e) => update("comments", e.target.value)}
            rows={4}
          />
        </div>

        <button type="submit" className="btn btn-feedback-submit">
          📤 Submit Feedback
        </button>
      </form>
    </div>
  );
}

/* ------------------------ FEEDBACK DIALOG ------------------------ */

function FeedbackDialog({ onClose }) {
  return (
    <div className="dialog-overlay" onClick={onClose}>
      <div className="dialog-content" onClick={(e) => e.stopPropagation()}>
        <div className="dialog-header">
          <div className="dialog-icon">✓</div>
          <h3>Feedback Submitted Successfully!</h3>
        </div>
        <div className="dialog-body">
          <p>Your feedback has been recorded and will be reviewed by our team.</p>
          <p className="dialog-note">
            In a real implementation, this would be saved to your backend or blockchain.
          </p>
        </div>
        <div className="dialog-footer">
          <button className="btn btn-primary" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

/* ----------------------------- FOOTER ----------------------------- */

function Footer() {
  return (
    <footer className="footer">
      <span>HerbTrace User Portal</span>
      <span className="footer-dot">•</span>
      <span>Built in React for Ayurvedic herb traceability 🌿</span>
    </footer>
  );
}

export default App;