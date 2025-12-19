import React, { useState, useEffect, useRef } from "react";
import styles from "../styles/Collector.module.css";
import { 
  Bell, X, CheckCircle, AlertCircle, MapPin, Camera, 
  User, LogOut, Package, Clock, ChevronDown, ChevronUp,
  FileText, Upload, Eye, Download, Calendar, MapPin as MapPinIcon,
  Weight, UserCheck, Filter, MoreVertical, Copy, FileCheck,
  Database, BarChart3, Leaf, Hash, Type, Globe, CalendarDays,
  Plus, ChevronRight
} from 'lucide-react';

// THEME COLORS
const THEME = "#639601";
const THEME_LIGHT = "#f0f9ec";
const THEME_VERY_LIGHT = "#f9fcf7";
const THEME_DARK = "#4e7c00";

const STAGE_DATA = [
  {
    id: 1,
    title: "Stage 1: ",
  },
  {
    id: 2,
    title: "Stage 2: ",
  },
  {
    id: 3,
    title: "Stage 3: ",
  },
  {
    id: 4,
    title: "Stage 4: ",
  },
  {
    id: 5,
    title: "Stage 5: ",
  }
];

const NOTIFICATIONS = [
  {
    id: 1,
    type: "admin",
    title: "New Quality Standards Update",
    message: "Updated AAA grading criteria effective from Nov 15th",
    time: "2 hours ago",
    read: false
  },
  {
    id: 2,
    type: "tester",
    title: "Lab Test Results Ready",
    message: "Batch BATCH-2024-7283 passed all quality tests",
    time: "1 day ago",
    read: false
  },
  {
    id: 3,
    type: "system",
    title: "Weather Alert",
    message: "Heavy rain predicted in South region tomorrow",
    time: "2 days ago",
    read: true
  },
  {
    id: 4,
    type: "admin",
    title: "Monthly Collection Target",
    message: "You've achieved 85% of monthly target",
    time: "3 days ago",
    read: true
  },
  {
    id: 5,
    type: "tester",
    title: "Sample Rejection",
    message: "Batch BATCH-2024-7251 rejected due to moisture content",
    time: "5 days ago",
    read: true
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

  const [stage1Form, setStage1Form] = useState({
    farmerName: "",
    fid: "",
    visitDate: "",
    geotag: "",
    exactAddress: "",
    notes: "",
    species: "",
    estimatedQty: "",
    farmPhoto: null,
    irrigationType: "",
    soilType: ""
  });

  const [stage2Form, setStage2Form] = useState({
    growthPhotos: [],
    observations: "",
    farmerUpdates: "",
    growthStage: "Early Growth"
  });

  const [stage3Form, setStage3Form] = useState({
    assessmentPhotos: [],
    healthStatus: "Good",
    pestIssues: "",
    irrigationIssues: "",
    recommendations: ""
  });

  const [stage4Form, setStage4Form] = useState({
    preHarvestPhotos: [],
    harvestReadiness: "85%",
    expectedHarvestDate: "",
    qualityCheck: "Pass",
    issues: ""
  });

  const [stage5Form, setStage5Form] = useState({
    batchId: "BATCH-" + new Date().getFullYear() + "-" + Math.floor(Math.random() * 10000),
    finalHarvestDate: "",
    finalQuantity: "",
    sampleCollected: false,
    finalPhoto: null,
    finalGeotag: "",
    dispatchAuth: false
  });

  const [currentStage, setCurrentStage] = useState(1);
  const [stageStatus, setStageStatus] = useState(["current", "waiting", "waiting", "waiting", "waiting"]);
  const [toast, setToast] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState(NOTIFICATIONS);
  const [showProfile, setShowProfile] = useState(false);
  const [activeTab, setActiveTab] = useState("stage1");
  const [showCreateBatchDialog, setShowCreateBatchDialog] = useState(false);
  const [batchIdFromAdmin, setBatchIdFromAdmin] = useState("");

  // New states for batches
  const [batches, setBatches] = useState([
    {
      id: "BATCH-2024-7283",
      name: "Tulsi Batch 7283",
      farmer: "Rajesh Kumar",
      stage: 5,
      status: "completed",
      date: "2024-11-15",
    },
    {
      id: "BATCH-2024-7251",
      name: "Ashwagandha Batch 7251",
      farmer: "Priya Sharma",
      stage: 3,
      status: "in-progress",
      date: "2024-11-10",
    },
    {
      id: "BATCH-2024-7219",
      name: "Neem Batch 7219",
      farmer: "Amit Patel",
      stage: 2,
      status: "waiting",
      date: "2024-11-05",
    },
    {
      id: "BATCH-2024-7198",
      name: "Brahmi Batch 7198",
      farmer: "Suresh Nair",
      stage: 4,
      status: "in-progress",
      date: "2024-10-30",
    },
    {
      id: "BATCH-2024-7176",
      name: "Turmeric Batch 7176",
      farmer: "Meena Reddy",
      stage: 1,
      status: "not-started",
      date: "2024-10-25",
    }
  ]);

  const [selectedBatch, setSelectedBatch] = useState(null);
  const [showBatchesPanel, setShowBatchesPanel] = useState(true);

  const notificationRef = useRef(null);
  const profileRef = useRef(null);

  // Close notifications when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfile(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setForm(f => ({ ...f, date: today }));
    setStage1Form(s => ({ ...s, visitDate: today }));
    setStage4Form(s => ({ ...s, expectedHarvestDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0] }));
    setStage5Form(s => ({ ...s, finalHarvestDate: today }));
  }, []);

  const updateForm = (key, value) => {
    setForm(prev => ({ ...prev, [key]: value }));
  };

  const updateStage1Form = (key, value) => {
    setStage1Form(prev => ({ ...prev, [key]: value }));
  };

  const updateStage2Form = (key, value) => {
    setStage2Form(prev => ({ ...prev, [key]: value }));
  };

  const updateStage3Form = (key, value) => {
    setStage3Form(prev => ({ ...prev, [key]: value }));
  };

  const updateStage4Form = (key, value) => {
    setStage4Form(prev => ({ ...prev, [key]: value }));
  };

  const updateStage5Form = (key, value) => {
    setStage5Form(prev => ({ ...prev, [key]: value }));
  };

  const handleGPS = () => {
    if (!navigator.geolocation) {
      setToast("GPS not supported on this device");
      return;
    }

    setToast("Capturing GPS location...");

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const newGPS = `${latitude.toFixed(8)}, ${longitude.toFixed(8)}`;

        updateForm("gps", newGPS);
        setToast(" GPS location captured!");

        setTimeout(() => setToast(""), 3000);
      },
      (error) => {
        setToast(" Unable to fetch GPS. Give location permission.");
        console.error(error);
        setTimeout(() => setToast(""), 3000);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  };

  const handleStage1GPS = () => {
    if (!navigator.geolocation) {
      setToast("❌ GPS not supported on this device");
      return;
    }

    setToast("📍 Capturing precise farm location...");

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        // Step 1: Save lat-long
        const coords = `${latitude.toFixed(8)}, ${longitude.toFixed(8)}`;
        updateStage1Form("geotag", coords);

        // Step 2: Reverse Geocode (Fetch full address)
        try {
          const url = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`;

          const res = await fetch(url, {
            headers: {
              "User-Agent": "HerbChain-Farmer-Portal/1.0",
              "Accept": "application/json"
            }
          });

          const data = await res.json();
          console.log("REVERSE GEOCODE RESPONSE:", data);

          if (data && data.display_name) {
            updateStage1Form("exactAddress", data.display_name);
            setToast("✅ Exact address captured!");
          } else {
            setToast("⚠️ No address found for this location");
          }

        } catch (err) {
          console.error("Reverse geocode error:", err);
          setToast("⚠️ GPS OK but address lookup failed.");
        }

        setTimeout(() => setToast(""), 3000);
      },

      (error) => {
        console.error(error);
        setToast("❌ Unable to fetch GPS. Allow location access.");
        setTimeout(() => setToast(""), 3000);
      },

      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 0,
      }
    );
  };

  const handleStage5GPS = () => {
    if (!navigator.geolocation) {
      setToast("❌ GPS not supported on this device");
      return;
    }

    setToast("📍 Capturing precise farm location...");

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        // Step 1: Save lat-long
        const coords = `${latitude.toFixed(8)}, ${longitude.toFixed(8)}`;
        updateStage5Form("finalGeotag", coords);

        // Step 2: Reverse Geocode (Fetch full address)
        try {
          const url = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`;

          const res = await fetch(url, {
            headers: {
              "User-Agent": "HerbChain-Farmer-Portal/1.0",
              "Accept": "application/json"
            }
          });

          const data = await res.json();
          console.log("REVERSE GEOCODE RESPONSE:", data);

          if (data && data.display_name) {
            setToast("✅ Final GPS location captured!");
          } else {
            setToast("⚠️ GPS location captured, but no address found");
          }

        } catch (err) {
          console.error("Reverse geocode error:", err);
          setToast("✅ GPS location captured!");
        }

        setTimeout(() => setToast(""), 3000);
      },

      (error) => {
        console.error(error);
        setToast("❌ Unable to fetch GPS. Allow location access.");
        setTimeout(() => setToast(""), 3000);
      },

      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 0,
      }
    );
  };

  const handlePhotoUpload = (stage, file) => {
    if (stage === 1) {
      updateStage1Form("farmPhoto", file);
      setToast("✅ Farm photo uploaded successfully!");
    } else if (stage === 5) {
      updateStage5Form("finalPhoto", file);
      setToast("✅ Final harvest photo uploaded!");
    } else if (stage === 2) {
      const newPhotos = [...stage2Form.growthPhotos, file];
      updateStage2Form("growthPhotos", newPhotos);
      setToast("✅ Growth photo uploaded!");
    } else if (stage === 3) {
      const newPhotos = [...stage3Form.assessmentPhotos, file];
      updateStage3Form("assessmentPhotos", newPhotos);
      setToast("✅ Assessment photo uploaded!");
    } else if (stage === 4) {
      const newPhotos = [...stage4Form.preHarvestPhotos, file];
      updateStage4Form("preHarvestPhotos", newPhotos);
      setToast("✅ Pre-harvest photo uploaded!");
    }
    setTimeout(() => setToast(""), 3000);
  };

  const handleMultiplePhotoUpload = (e, stage) => {
    const files = Array.from(e.target.files);
    if (stage === 2) {
      const newPhotos = [...stage2Form.growthPhotos, ...files];
      updateStage2Form("growthPhotos", newPhotos);
      setToast(`✅ ${files.length} growth photos uploaded!`);
    } else if (stage === 3) {
      const newPhotos = [...stage3Form.assessmentPhotos, ...files];
      updateStage3Form("assessmentPhotos", newPhotos);
      setToast(`✅ ${files.length} assessment photos uploaded!`);
    } else if (stage === 4) {
      const newPhotos = [...stage4Form.preHarvestPhotos, ...files];
      updateStage4Form("preHarvestPhotos", newPhotos);
      setToast(`✅ ${files.length} pre-harvest photos uploaded!`);
    }
    setTimeout(() => setToast(""), 3000);
  };

  const removePhoto = (stage, index) => {
    if (stage === 2) {
      const newPhotos = stage2Form.growthPhotos.filter((_, i) => i !== index);
      updateStage2Form("growthPhotos", newPhotos);
      setToast("✅ Photo removed!");
    } else if (stage === 3) {
      const newPhotos = stage3Form.assessmentPhotos.filter((_, i) => i !== index);
      updateStage3Form("assessmentPhotos", newPhotos);
      setToast("✅ Photo removed!");
    } else if (stage === 4) {
      const newPhotos = stage4Form.preHarvestPhotos.filter((_, i) => i !== index);
      updateStage4Form("preHarvestPhotos", newPhotos);
      setToast("✅ Photo removed!");
    }
    setTimeout(() => setToast(""), 2000);
  };

  const handleStageClick = (stageId) => {
    setCurrentStage(stageId);
    setActiveTab(`stage${stageId}`);
    setToast(`Stage ${stageId}`);
    setTimeout(() => setToast(""), 3000);
  };

  const markStageDone = (stageId) => {
    const newStatus = [...stageStatus];
    newStatus[stageId - 1] = "done";
    if (stageId < 5) newStatus[stageId] = "current";
    setStageStatus(newStatus);

    setToast(`Stage ${stageId} completed!`);
    setTimeout(() => setToast(""), 3000);

    if (stageId === 5) {
      setTimeout(() => {
        setToast("Batch completed and ready for dispatch!");
      }, 500);
    }
  };

  const handleCreateBatchClick = () => {
    // Generate a batch ID from admin (simulated)
    const adminBatchId = `BATCH-${new Date().getFullYear()}-${Math.floor(Math.random() * 9000 + 1000)}-ADM`;
    setBatchIdFromAdmin(adminBatchId);

    // Show the dialog
    setShowCreateBatchDialog(true);
  };

  const confirmCreateBatch = () => {
    // Close dialog
    setShowCreateBatchDialog(false);

    // Update stage 5 with the batch ID from admin
    updateStage5Form("batchId", batchIdFromAdmin);

    // Move to stage 2
    const newStatus = [...stageStatus];
    newStatus[0] = "done";
    newStatus[1] = "current";
    setStageStatus(newStatus);
    setCurrentStage(2);
    setActiveTab("stage2");

    setToast(`New batch created: ${batchIdFromAdmin}`);
    setTimeout(() => setToast(""), 4000);
  };

  const toggleNotificationDropdown = () => {
    const newShowState = !showNotifications;
    setShowNotifications(newShowState);
    setShowProfile(false);

    // Mark all as read when opening notifications
    if (newShowState) {
      setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    }
  };

  const toggleProfileDropdown = () => {
    setShowProfile(!showProfile);
    setShowNotifications(false);
  };

  const handleLogout = () => {
    console.log("Logout initiated");
    alert("Logout successful");
  };

  const handleMarkNotificationRead = (id) => {
    setNotifications(prev => prev.map(n =>
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case "admin": return "👨‍💼";
      case "tester": return "🔬";
      case "system": return "⚙️";
      default: return "📢";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "done": return "COMPLETED";
      case "current": return "IN PROGRESS";
      default: return "PENDING";
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleBatchSelect = (batch) => {
    setSelectedBatch(batch);
    
    // Update current stage based on selected batch
    if (batch.stage) {
      setCurrentStage(batch.stage);
      setActiveTab(`stage${batch.stage}`);
      
      // Update stage status based on batch progress
      const newStatus = ["waiting", "waiting", "waiting", "waiting", "waiting"];
      for (let i = 0; i < batch.stage; i++) {
        newStatus[i] = i === batch.stage - 1 ? "current" : "done";
      }
      setStageStatus(newStatus);
      
      // Set toast notification
      setToast(`✅ Loaded batch: ${batch.id}`);
      setTimeout(() => setToast(""), 3000);
    }
  };

  const handleNewBatch = () => {
    // Reset to stage 1
    setCurrentStage(1);
    setActiveTab("stage1");
    setSelectedBatch(null);
    
    // Reset stage status
    setStageStatus(["current", "waiting", "waiting", "waiting", "waiting"]);
    
    // Reset forms
    setStage1Form({
      farmerName: "",
      fid: "",
      visitDate: new Date().toISOString().split("T")[0],
      geotag: "",
      exactAddress: "",
      notes: "",
      species: "",
      estimatedQty: "",
      farmPhoto: null,
      irrigationType: "",
      soilType: ""
    });
    
    setToast("✨ Starting new batch creation");
    setTimeout(() => setToast(""), 3000);
  };

  const renderTimelineItem = (stage) => {
    const status = stageStatus[stage.id - 1];

    return (
      <div
        key={stage.id}
        className={`${styles["vhc-timeline-item"]} ${status === "current" ? styles["vhc-timeline-item-current"] : ""}`}
        onClick={() => handleStageClick(stage.id)}
        style={{
          borderLeft: status === "current" ? `3px solid ${THEME}` : "3px solid #e5e7eb",
          backgroundColor: status === "current" ? THEME_VERY_LIGHT : "transparent"
        }}
      >
        <div 
          className={`${styles["vhc-timeline-dot"]} ${styles[status]}`}
          style={{
            backgroundColor: status === "current" ? THEME : 
                           status === "done" ? "#10b981" : "#9ca3af",
            color: status === "current" ? "white" : "white"
          }}
        >
          {status === "done" ? "✓" : stage.id}
        </div>
        <div className={styles["vhc-timeline-content"]}>
          <div className={styles["vhc-timeline-stage"]}>
            {stage.title}
          </div>
          <div className={`${styles["vhc-timeline-status"]} ${styles[status]}`}
               style={{
                 color: status === "current" ? THEME : 
                        status === "done" ? "#10b981" : "#6b7280",
                 backgroundColor: status === "current" ? THEME_LIGHT : "#f3f4f6"
               }}>
            {getStatusText(status)}
          </div>
        </div>
      </div>
    );
  };

  const renderStageContent = () => {
    switch (currentStage) {
      case 1:
        return (
          <div className={styles["vhc-stage-content"]}>
            <h3 className={styles["vhc-stage-title"]} style={{ color: THEME }}>
              Stage 1: 
            </h3>
            <p className={styles["vhc-stage-subtitle"]}>
              Collect initial farm data and documentation
            </p>

            <div className={styles["vhc-form-grid"]}>
              <div className={styles["vhc-field"]}>
                <label className={styles["vhc-label"]}>
                  <User size={16} style={{ marginRight: "8px", color: THEME }} />
                  Farmer Name <span className={styles["vhc-required"]}>*</span>
                </label>
                <input
                  className={styles["vhc-input"]}
                  type="text"
                  value={stage1Form.farmerName}
                  onChange={(e) => updateStage1Form("farmerName", e.target.value)}
                  placeholder="Enter farmer's full name"
                />
              </div>

              <div className={styles["vhc-field"]}>
                <label className={styles["vhc-label"]}>
                  <Hash size={16} style={{ marginRight: "8px", color: THEME }} />
                  Farmer ID (FID) <span className={styles["vhc-required"]}>*</span>
                </label>
                <input
                  className={styles["vhc-input"]}
                  type="text"
                  value={stage1Form.fid}
                  onChange={(e) => updateStage1Form("fid", e.target.value)}
                  placeholder="Enter FID"
                />
              </div>

              <div className={styles["vhc-field"]}>
                <label className={styles["vhc-label"]}>
                  <CalendarDays size={16} style={{ marginRight: "8px", color: THEME }} />
                  Visit Date <span className={styles["vhc-required"]}>*</span>
                </label>
                <input
                  className={styles["vhc-input"]}
                  type="date"
                  value={stage1Form.visitDate}
                  onChange={(e) => updateStage1Form("visitDate", e.target.value)}
                />
              </div>

              <div className={styles["vhc-field"]}>
                <label className={styles["vhc-label"]}>
                  <Leaf size={16} style={{ marginRight: "8px", color: THEME }} />
                  Herb Species <span className={styles["vhc-required"]}>*</span>
                </label>
                <select
                  className={styles["vhc-select"]}
                  value={stage1Form.species}
                  onChange={(e) => updateStage1Form("species", e.target.value)}
                  style={{ borderColor: THEME_LIGHT }}
                >
                  <option value="">Select species</option>
                  <option value="Tulsi (Holy Basil)">Tulsi (Holy Basil)</option>
                  <option value="Ashwagandha">Ashwagandha</option>
                  <option value="Neem">Neem</option>
                  <option value="Brahmi">Brahmi</option>
                  <option value="Turmeric">Turmeric</option>
                </select>
              </div>

              <div className={styles["vhc-field"]}>
                <label className={styles["vhc-label"]}>
                  <Weight size={16} style={{ marginRight: "8px", color: THEME }} />
                  Estimated Quantity (kg) <span className={styles["vhc-required"]}>*</span>
                </label>
                <input
                  className={styles["vhc-input"]}
                  type="number"
                  value={stage1Form.estimatedQty}
                  min="0"
                  step="0.1"
                  placeholder="e.g., 25.5"
                  onChange={(e) => updateStage1Form("estimatedQty", e.target.value)}
                />
              </div>

              <div className={styles["vhc-field"]}>
                <label className={styles["vhc-label"]}>
                  <BarChart3 size={16} style={{ marginRight: "8px", color: THEME }} />
                  Irrigation Type
                </label>
                <select
                  className={styles["vhc-select"]}
                  value={stage1Form.irrigationType}
                  onChange={(e) => updateStage1Form("irrigationType", e.target.value)}
                  style={{ borderColor: THEME_LIGHT }}
                >
                  <option value="">Select irrigation type</option>
                  <option value="Drip">Drip Irrigation</option>
                  <option value="Sprinkler">Sprinkler</option>
                  <option value="Flood">Flood</option>
                  <option value="Rainfed">Rainfed</option>
                </select>
              </div>

              <div className={styles["vhc-field"]}>
                <label className={styles["vhc-label"]}>
                  <Globe size={16} style={{ marginRight: "8px", color: THEME }} />
                  Soil Type
                </label>
                <select
                  className={styles["vhc-select"]}
                  value={stage1Form.soilType}
                  onChange={(e) => updateStage1Form("soilType", e.target.value)}
                  style={{ borderColor: THEME_LIGHT }}
                >
                  <option value="">Select soil type</option>
                  <option value="Loamy">Loamy</option>
                  <option value="Clay">Clay</option>
                  <option value="Sandy">Sandy</option>
                  <option value="Silty">Silty</option>
                </select>
              </div>

              <div className={`${styles["vhc-field"]} ${styles["vhc-field-full"]}`}>
                <label className={styles["vhc-label"]}>
                  <MapPinIcon size={16} style={{ marginRight: "8px", color: THEME }} />
                  GPS Location <span className={styles["vhc-required"]}>*</span>
                </label>
                <div className={styles["vhc-gps-row"]}>
                  <input
                    className={`${styles["vhc-input"]} ${styles["vhc-gps-input"]}`}
                    value={stage1Form.geotag}
                    readOnly
                    placeholder="Click Capture GPS to get location"
                  />
                  <button
                    type="button"
                    className={styles["vhc-gps-btn"]}
                    onClick={handleStage1GPS}
                    style={{ backgroundColor: THEME, color: "white" }}
                  >
                    <MapPin size={16} /> Capture GPS
                  </button>
                </div>
              </div>

              <div className={`${styles["vhc-field"]} ${styles["vhc-field-full"]}`}>
                <label className={styles["vhc-label"]}>
                  <MapPinIcon size={16} style={{ marginRight: "8px", color: THEME }} />
                  Exact Address
                </label>
                <textarea
                  className={styles["vhc-textarea"]}
                  value={stage1Form.exactAddress}
                  readOnly
                  placeholder="Will be auto-filled after GPS capture"
                  rows="2"
                  style={{ borderColor: THEME_LIGHT }}
                />
              </div>

              <div className={`${styles["vhc-field"]} ${styles["vhc-field-full"]}`}>
                <label className={styles["vhc-label"]}>
                  <Camera size={16} style={{ marginRight: "8px", color: THEME }} />
                  Farm Photo
                </label>
                <div className={styles["vhc-photo-upload"]}>
                  {stage1Form.farmPhoto ? (
                    <div className={styles["vhc-photo-preview"]}>
                      <img src={URL.createObjectURL(stage1Form.farmPhoto)} alt="Farm preview" />
                      <button
                        className={styles["vhc-remove-photo"]}
                        onClick={() => updateStage1Form("farmPhoto", null)}
                        style={{ backgroundColor: THEME }}
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ) : (
                    <label className={styles["vhc-upload-area"]}
                           style={{ borderColor: THEME, borderStyle: "dashed" }}>
                      <Camera size={24} style={{ color: THEME }} />
                      <span>Click to upload farm photo</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handlePhotoUpload(1, e.target.files[0])}
                        hidden
                      />
                    </label>
                  )}
                </div>
              </div>

              <div className={`${styles["vhc-field"]} ${styles["vhc-field-full"]}`}>
                <label className={styles["vhc-label"]}>
                  <FileText size={16} style={{ marginRight: "8px", color: THEME }} />
                  Notes & Observations
                </label>
                <textarea
                  className={styles["vhc-textarea"]}
                  value={stage1Form.notes}
                  onChange={(e) => updateStage1Form("notes", e.target.value)}
                  placeholder="Record your observations about soil health, plant condition, pests, etc."
                  rows="4"
                  style={{ borderColor: THEME_LIGHT }}
                />
              </div>
            </div>

            <div className={styles["vhc-create-batch-section"]}>
              <button
                className={styles["vhc-create-batch-btn"]}
                onClick={handleCreateBatchClick}
                disabled={!stage1Form.farmerName || !stage1Form.fid || !stage1Form.species}
                style={{
                  backgroundColor: !stage1Form.farmerName || !stage1Form.fid || !stage1Form.species ? "#9ca3af" : THEME,
                  color: "white"
                }}
              >
                <CheckCircle size={20} /> Create New Herb Batch
              </button>
            </div>
          </div>
        );

      case 2:
        return (
          <div className={styles["vhc-stage-content"]}>
            <h3
              className={styles["vhc-stage-title"]}
              style={{
                color: "#16a34a",
                display: "flex",
                alignItems: "center",
                gap: "10px"
              }}
            >
              Stage 2: 
            </h3>

            {/* STATUS BOX */}
            <div
              className={styles["vhc-waiting-box"]}
              style={{
                borderColor: "#16a34a",
                backgroundColor: "#ecfdf5"
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "6px",
                  animation: "fadeSlideUp 0.6s ease-out"
                }}
              >
                <CheckCircle
                  size={32}
                  color="#16a34a"
                  style={{ animation: "tickBounce 0.8s ease-out" }}
                />
                <p style={{ fontWeight: 600 }}>Data uploaded</p>
                <span>Submission received successfully</span>
              </div>
            </div>

            {/* ACTION */}
            <div className={styles["vhc-create-batch-section"]}>
              <button
                className={styles["vhc-create-batch-btn"]}
                onClick={() => markStageDone(2)}
                style={{
                  backgroundColor: "#16a34a",
                  color: "white"
                }}
              >
                <CheckCircle size={20} />
                Approve Growth Monitoring
              </button>
            </div>

            {/* INLINE ANIMATIONS */}
            <style>
              {`
                @keyframes tickPop {
                  0% { transform: scale(0); opacity: 0; }
                  70% { transform: scale(1.2); }
                  100% { transform: scale(1); opacity: 1; }
                }

                @keyframes tickBounce {
                  0% { transform: scale(0); opacity: 0; }
                  60% { transform: scale(1.3); }
                  80% { transform: scale(0.95); }
                  100% { transform: scale(1); opacity: 1; }
                }

                @keyframes fadeSlideUp {
                  0% { opacity: 0; transform: translateY(8px); }
                  100% { opacity: 1; transform: translateY(0); }
                }
              `}
            </style>
          </div>
        );

      case 3:
        return (
          <div className={styles["vhc-stage-content"]}>
            <h3
              className={styles["vhc-stage-title"]}
              style={{
                color: stage3Form.assessmentPhotos.length > 0 ? "#16a34a" : THEME,
                display: "flex",
                alignItems: "center",
                gap: "8px"
              }}
            >
              {stage3Form.assessmentPhotos.length > 0 && (
                <CheckCircle size={20} color="#16a34a" />
              )}
              Stage 3: 
            </h3>

            {/* STATUS BOX */}
            <div
              className={styles["vhc-waiting-box"]}
              style={{
                borderColor:
                  stage3Form.assessmentPhotos.length > 0 ? "#16a34a" : THEME_LIGHT,
                backgroundColor:
                  stage3Form.assessmentPhotos.length > 0 ? "#ecfdf5" : THEME_VERY_LIGHT
              }}
            >
              {stage3Form.assessmentPhotos.length > 0 ? (
                <>
                  <CheckCircle size={28} color="#16a34a" />
                  <p style={{ fontWeight: 600 }}>Data uploaded</p>
                  <span>Health assessment submitted successfully</span>
                </>
              ) : (
                <>
                  {/* Animated Info / Pending Icon */}
                  <div
                    style={{
                      width: "42px",
                      height: "42px",
                      borderRadius: "50%",
                      background: "rgba(239,68,68,0.1)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      animation: "pulseWarn 1.6s infinite"
                    }}
                  >
                    <span
                      style={{
                        color: "#ef4444",
                        fontSize: "18px",
                        fontWeight: 700
                      }}
                    >
                      !
                    </span>
                  </div>

                  <p style={{ fontWeight: 600, color: "#b91c1c" }}>
                    Data yet to be submitted
                  </p>
                  <span>Waiting for farmer health assessment</span>
                </>
              )}
            </div>

            {/* ACTION */}
            <div className={styles["vhc-create-batch-section"]}>
              <button
                className={styles["vhc-create-batch-btn"]}
                disabled={stage3Form.assessmentPhotos.length === 0}
                onClick={() => markStageDone(3)}
                style={{
                  backgroundColor:
                    stage3Form.assessmentPhotos.length > 0 ? "#16a34a" : "#9ca3af",
                  color: "white"
                }}
              >
                <CheckCircle size={20} />
                Approve Health Assessment
              </button>

              {stage3Form.assessmentPhotos.length === 0 && (
                <p className={styles["vhc-verification-note"]}>
                  Approval enabled after data submission
                </p>
              )}
            </div>

            {/* INLINE ANIMATION */}
            <style>
              {`
                @keyframes pulseWarn {
                  0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(239,68,68,0.4); }
                  70% { transform: scale(1.1); box-shadow: 0 0 0 12px rgba(239,68,68,0); }
                  100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(239,68,68,0); }
                }
              `}
            </style>
          </div>
        );

      case 4:
        return (
          <div className={styles["vhc-stage-content"]}>
            <h3 className={styles["vhc-stage-title"]} style={{ color: THEME }}>
              Stage 4: 
            </h3>

            {/* STATUS BOX */}
            <div className={styles["vhc-waiting-box"]}
                 style={{ borderColor: THEME_LIGHT, backgroundColor: THEME_VERY_LIGHT }}>
              {stage4Form.preHarvestPhotos.length === 0 ? (
                <>
                  <p>Waiting for farmer to upload pre-harvest data</p>
                  <span>No submission received yet</span>
                </>
              ) : (
                <>
                  <CheckCircle size={28} style={{ color: THEME }} />
                  <p>Farmer has submitted pre-harvest data</p>
                  <span>Data is locked and cannot be viewed</span>
                </>
              )}
            </div>

            {/* ACTION */}
            <div className={styles["vhc-create-batch-section"]}>
              <button
                className={styles["vhc-create-batch-btn"]}
                disabled={stage4Form.preHarvestPhotos.length === 0}
                onClick={() => markStageDone(4)}
                style={{
                  backgroundColor: stage4Form.preHarvestPhotos.length === 0 ? "#9ca3af" : THEME,
                  color: "white"
                }}
              >
                <CheckCircle size={20} />
                Approve Pre-Harvest Check
              </button>

              {stage4Form.preHarvestPhotos.length === 0 && (
                <p className={styles["vhc-verification-note"]}>
                  Approval enabled only after farmer submission
                </p>
              )}
            </div>
          </div>
        );

      case 5:
        return (
          <div className={styles["vhc-stage-content"]}>
            <h3 className={styles["vhc-stage-title"]} style={{ color: THEME }}>
              Stage 5: 
            </h3>
            <p className={styles["vhc-stage-subtitle"]}>
              Complete final documentation before dispatch
            </p>

            <div className={styles["vhc-form-grid"]}>
              <div className={styles["vhc-field"]}>
                <label className={styles["vhc-label"]}>
                  <Hash size={16} style={{ marginRight: "8px", color: THEME }} />
                  Batch ID
                </label>
                <input
                  className={styles["vhc-input"]}
                  type="text"
                  value={stage5Form.batchId}
                  readOnly
                  style={{ backgroundColor: THEME_VERY_LIGHT }}
                />
              </div>

              <div className={styles["vhc-field"]}>
                <label className={styles["vhc-label"]}>
                  <CalendarDays size={16} style={{ marginRight: "8px", color: THEME }} />
                  Final Harvest Date <span className={styles["vhc-required"]}>*</span>
                </label>
                <input
                  className={styles["vhc-input"]}
                  type="date"
                  value={stage5Form.finalHarvestDate}
                  onChange={(e) => updateStage5Form("finalHarvestDate", e.target.value)}
                />
              </div>

              <div className={styles["vhc-field"]}>
                <label className={styles["vhc-label"]}>
                  <Weight size={16} style={{ marginRight: "8px", color: THEME }} />
                  Final Quantity (kg) <span className={styles["vhc-required"]}>*</span>
                </label>
                <input
                  className={styles["vhc-input"]}
                  type="number"
                  value={stage5Form.finalQuantity}
                  min="0"
                  step="0.1"
                  placeholder="Enter actual harvested quantity"
                  onChange={(e) => updateStage5Form("finalQuantity", e.target.value)}
                />
              </div>

              <div className={styles["vhc-field"]}>
                <label className={styles["vhc-label"]}>
                  <Package size={16} style={{ marginRight: "8px", color: THEME }} />
                  Sample Collected
                </label>
                <div className={styles["vhc-checkbox-group"]}>
                  <label className={styles["vhc-checkbox-label"]}>
                    <input
                      type="checkbox"
                      checked={stage5Form.sampleCollected}
                      onChange={(e) => updateStage5Form("sampleCollected", e.target.checked)}
                      className={styles["vhc-checkbox"]}
                      style={{ accentColor: THEME }}
                    />
                    <span>Lab sample collected</span>
                  </label>
                </div>
              </div>

              <div className={`${styles["vhc-field"]} ${styles["vhc-field-full"]}`}>
                <label className={styles["vhc-label"]}>
                  <MapPinIcon size={16} style={{ marginRight: "8px", color: THEME }} />
                  Final GPS Location <span className={styles["vhc-required"]}>*</span>
                </label>
                <div className={styles["vhc-gps-row"]}>
                  <input
                    className={`${styles["vhc-input"]} ${styles["vhc-gps-input"]}`}
                    value={stage5Form.finalGeotag}
                    readOnly
                    placeholder="Click Capture GPS to get location"
                  />
                  <button
                    type="button"
                    className={styles["vhc-gps-btn"]}
                    onClick={handleStage5GPS}
                    style={{ backgroundColor: THEME, color: "white" }}
                  >
                    <MapPin size={16} /> Capture GPS
                  </button>
                </div>
              </div>

              <div className={`${styles["vhc-field"]} ${styles["vhc-field-full"]}`}>
                <label className={styles["vhc-label"]}>
                  <Camera size={16} style={{ marginRight: "8px", color: THEME }} />
                  Final Harvest Photo
                </label>
                <div className={styles["vhc-photo-upload"]}>
                  {stage5Form.finalPhoto ? (
                    <div className={styles["vhc-photo-preview"]}>
                      <img src={URL.createObjectURL(stage5Form.finalPhoto)} alt="Final harvest preview" />
                      <button
                        className={styles["vhc-remove-photo"]}
                        onClick={() => updateStage5Form("finalPhoto", null)}
                        style={{ backgroundColor: THEME }}
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ) : (
                    <label className={styles["vhc-upload-area"]}
                           style={{ borderColor: THEME, borderStyle: "dashed" }}>
                      <Camera size={24} style={{ color: THEME }} />
                      <span>Click to upload final harvest photo</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handlePhotoUpload(5, e.target.files[0])}
                        hidden
                      />
                    </label>
                  )}
                </div>
                <div className={styles["verify"]}>
                  <button 
                    onClick={() => alert('Herb Verified Successfully!')}
                    style={{ backgroundColor: THEME, color: "white" }}
                  >
                    Verify Herb
                  </button>
                </div>
              </div>

              <div className={styles["vhc-field"]}>
                <label className={styles["vhc-label"]}>
                  <FileCheck size={16} style={{ marginRight: "8px", color: THEME }} />
                  Dispatch Authorization
                </label>
                <div className={styles["vhc-checkbox-group"]}>
                  <label className={styles["vhc-checkbox-label"]}>
                    <input
                      type="checkbox"
                      checked={stage5Form.dispatchAuth}
                      onChange={(e) => updateStage5Form("dispatchAuth", e.target.checked)}
                      className={styles["vhc-checkbox"]}
                      style={{ accentColor: THEME }}
                    />
                    <span>Authorize dispatch</span>
                  </label>
                </div>
              </div>
            </div>

            <div className={styles["vhc-final-verification"]}>
              <button
                className={styles["vhc-create-batch-btn"]}
                onClick={() => markStageDone(5)}
                disabled={!stage5Form.finalHarvestDate || !stage5Form.finalQuantity}
                style={{
                  backgroundColor: !stage5Form.finalHarvestDate || !stage5Form.finalQuantity ? "#9ca3af" : THEME,
                  color: "white"
                }}
              >
                <CheckCircle size={20} /> Complete Final Verification
              </button>
              <p className={styles["vhc-verification-note"]}>
                Note: Once verified, batch will be locked and sent for processing
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <>
      {/* Toast Notification */}
      {toast && (
        <div className={styles["vhc-toast"]} style={{ backgroundColor: THEME }}>
          {toast}
        </div>
      )}

      {/* Create Batch Dialog */}
      {showCreateBatchDialog && (
        <div className={styles["vhc-dialog-overlay"]}>
          <div className={styles["vhc-dialog-container"]} style={{ borderColor: THEME_LIGHT }}>
            <div className={styles["vhc-dialog-header"]}>
              <h3 className={styles["vhc-dialog-title"]} style={{ color: THEME }}>
                Batch Creation Confirmation
              </h3>
              <button
                className={styles["vhc-dialog-close"]}
                onClick={() => setShowCreateBatchDialog(false)}
                style={{ color: THEME }}
              >
                <X size={20} />
              </button>
            </div>

            <div className={styles["vhc-dialog-content"]}>
              <div className={styles["vhc-dialog-icon"]} style={{ backgroundColor: THEME_LIGHT, color: THEME }}>
                📋
              </div>
              <h4 className={styles["vhc-dialog-message"]}>
                Batch Assigned Successfully!
              </h4>
              <p className={styles["vhc-dialog-description"]}>
                Your batch has been registered with the following ID:
              </p>

              <div className={styles["vhc-batch-id-display"]} style={{ borderColor: THEME }}>
                <div className={styles["vhc-batch-id-label"]}>Batch ID</div>
                <div className={styles["vhc-batch-id-value"]} style={{ color: THEME }}>
                  {batchIdFromAdmin}
                </div>
                <div className={styles["vhc-batch-id-note"]}>
                  (Received from Admin System)
                </div>
              </div>

              <div className={styles["vhc-batch-details"]}>
                <div className={styles["vhc-batch-detail-item"]}>
                  <span className={styles["vhc-detail-label"]}>Farmer Name:</span>
                  <span className={styles["vhc-detail-value"]}>
                    {stage1Form.farmerName || "Not specified"}
                  </span>
                </div>
                <div className={styles["vhc-batch-detail-item"]}>
                  <span className={styles["vhc-detail-label"]}>Herb Species:</span>
                  <span className={styles["vhc-detail-value"]}>
                    {stage1Form.species || "Not selected"}
                  </span>
                </div>
                <div className={styles["vhc-batch-detail-item"]}>
                  <span className={styles["vhc-detail-label"]}>Estimated Quantity:</span>
                  <span className={styles["vhc-detail-value"]}>
                    {stage1Form.estimatedQty ? `${stage1Form.estimatedQty} kg` : "Not estimated"}
                  </span>
                </div>
                <div className={styles["vhc-batch-detail-item"]}>
                  <span className={styles["vhc-detail-label"]}>Location:</span>
                  <span className={styles["vhc-detail-value"]}>
                    {stage1Form.exactAddress ? stage1Form.exactAddress.split(',')[0] + '...' : "Not captured"}
                  </span>
                </div>
              </div>

              <div className={styles["vhc-dialog-note"]} style={{ backgroundColor: THEME_VERY_LIGHT }}>
                <AlertCircle size={16} style={{ color: THEME }} />
                <span>This batch will now move to Stage 2. Track progress using the Batch ID.</span>
              </div>
            </div>

            <div className={styles["vhc-dialog-footer"]}>
              <button
                className={styles["vhc-dialog-btn-cancel"]}
                onClick={() => setShowCreateBatchDialog(false)}
                style={{ borderColor: THEME_LIGHT, color: THEME }}
              >
                Edit Details
              </button>
              <button
                className={styles["vhc-dialog-btn-confirm"]}
                onClick={confirmCreateBatch}
                disabled={!stage1Form.farmerName || !stage1Form.fid || !stage1Form.species}
                style={{ 
                  backgroundColor: !stage1Form.farmerName || !stage1Form.fid || !stage1Form.species ? "#9ca3af" : THEME,
                  color: "white"
                }}
              >
                <CheckCircle size={18} />
                Proceed to Stage 2
              </button>
            </div>
          </div>
        </div>
      )}

      {/* NAVBAR - Green Theme */}
      <nav className={styles["vhc-navbar"]} style={{ backgroundColor: THEME }}>
        <div className={styles["vhc-navbar-left"]}>
          <img
            src="https://res.cloudinary.com/dmolvlt7e/image/upload/v1766070051/Gemini_Generated_Image_ysxwkbysxwkbysxw-removebg-preview_jezctz.png"
            alt="AyuSethu Logo"
            className={styles["vhc-nav-LogoImage"]}
          />
          <div className={styles["vhc-nav-logo"]} style={{ color: "white" }}>
            AyuSethu
          </div>
        </div>

        <div className={styles["vhc-navbar-right"]}>
          {/* Notifications */}
          <div className={styles["vhc-notification-container"]} ref={notificationRef}>
            <button
              className={styles["vhc-notification-btn"]}
              onClick={toggleNotificationDropdown}
              style={{ color: "white" }}
            >
              <Bell size={20} />
              {unreadCount > 0 && (
                <span className={styles["vhc-notification-badge"]} style={{ backgroundColor: "white", color: THEME }}>
                  {unreadCount}
                </span>
              )}
            </button>

            {showNotifications && (
              <div className={styles["vhc-notification-dropdown"]}>
                <div className={styles["vhc-notification-header"]}>
                  <h4>Notifications</h4>
                  <button
                    className={styles["vhc-notification-close"]}
                    onClick={toggleNotificationDropdown}
                  >
                    <X size={16} />
                  </button>
                </div>

                <div className={styles["vhc-notification-tabs"]}>
                  <button
                    className={`${styles["vhc-notification-tab"]} ${activeTab === 'admin' ? styles['active'] : ''}`}
                    onClick={() => setActiveTab('admin')}
                    style={{
                      backgroundColor: activeTab === 'admin' ? THEME : THEME_LIGHT,
                      color: activeTab === 'admin' ? 'white' : THEME_DARK
                    }}
                  >
                    Admin
                  </button>
                  <button
                    className={`${styles["vhc-notification-tab"]} ${activeTab === 'tester' ? styles['active'] : ''}`}
                    onClick={() => setActiveTab('tester')}
                    style={{
                      backgroundColor: activeTab === 'tester' ? THEME : THEME_LIGHT,
                      color: activeTab === 'tester' ? 'white' : THEME_DARK
                    }}
                  >
                    Tester
                  </button>
                </div>

                <div className={styles["vhc-notification-list"]}>
                  {notifications
                    .filter(n => activeTab === 'all' || n.type === activeTab)
                    .map(notification => (
                      <div
                        key={notification.id}
                        className={`${styles["vhc-notification-item"]} ${!notification.read ? styles['unread'] : ''}`}
                      >
                        <div className={styles["vhc-notification-icon"]}>
                          {getNotificationIcon(notification.type)}
                        </div>
                        <div className={styles["vhc-notification-content"]}>
                          <div className={styles["vhc-notification-title"]}>
                            {notification.title}
                          </div>
                          <div className={styles["vhc-notification-message"]}>
                            {notification.message}
                          </div>
                          <div className={styles["vhc-notification-time"]}>
                            {notification.time}
                          </div>
                        </div>
                        <button
                          className={styles["vhc-mark-read-btn"]}
                          onClick={() => handleMarkNotificationRead(notification.id)}
                          style={{ backgroundColor: THEME, color: "white" }}
                        >
                          Mark Read
                        </button>
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>

          {/* Profile */}
          <div className="relative" ref={profileRef}>
            <button
              className="profile-btn-large"
              onClick={() => {
                setShowProfile(!showProfile);
                setShowNotifications(false);
              }}
            >
              <div className="animated-avatar-profile">
                <img src={"https://img.freepik.com/premium-photo/young-optimistic-woman-doctor-is-holding-clipboard-her-hands-while-standing-sunny-clinic-portrait-friendly-female-physician-with-stethoscope-perfect-medical-service-hospital-me_665183-12973.jpg"} alt="Profile" />
              </div>
            </button>

            {showProfile && (
              <div className="dropdown-panel">
                <div className="profile-header">
                  <div className="profile-info">
                    <div className="profile-avatar-lg">
                      <img src={"https://img.freepik.com/premium-photo/young-optimistic-woman-doctor-is-holding-clipboard-her-hands-while-standing-sunny-clinic-portrait-friendly-female-physician-with-stethoscope-perfect-medical-service-hospital-me_665183-12973.jpg"} alt="Profile" />
                    </div>
                    <div className="profile-details">
                      <h4>Dr. Sarah Chen</h4>
                      <p>Lead Quality Tester</p>
                      <button
                        className="btn-logout"
                        onClick={() => {
                          handleLogout();
                        }}
                      >
                        <h3>LogOut</h3>
                      </button>
                    </div>
                  </div>
                </div>

                <div className="profile-stats">
                  <div className="stat-item">
                    <div className="stat-label">Customer ID</div>
                    <div className="stat-value">CID-2024-001</div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-label">Active Batches </div>
                    <div className="stat-value">16</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* MAIN CONTENT */}
      <main className={styles["vhc-main"]}>
        <div className={styles["vhc-grid"]}>
          {/* LEFT PANEL: STAGE CONTENT */}
          <section className={`${styles["vhc-card"]} ${styles["vhc-stage-card"]}`}>
            {renderStageContent()}
          </section>

          {/* RIGHT PANEL: BATCHES & TIMELINE TOGGLE */}
          <aside className={styles["vhc-card"]} style={{ borderColor: THEME_LIGHT }}>
            {/* Batch Selection Toggle */}
            <div className={styles["vhc-batches-toggle"]}>
              <button
                className={`${styles["vhc-batches-tab"]} ${showBatchesPanel ? styles["active"] : ""}`}
                onClick={() => setShowBatchesPanel(true)}
                style={{
                  backgroundColor: showBatchesPanel ? THEME : THEME_LIGHT,
                  color: showBatchesPanel ? "white" : THEME_DARK
                }}
              >
                <Database size={16} />
                Batches
              </button>
              <button
                className={`${styles["vhc-batches-tab"]} ${!showBatchesPanel ? styles["active"] : ""}`}
                onClick={() => setShowBatchesPanel(false)}
                style={{
                  backgroundColor: !showBatchesPanel ? THEME : THEME_LIGHT,
                  color: !showBatchesPanel ? "white" : THEME_DARK
                }}
              >
                <Clock size={16} />
                Timeline
              </button>
            </div>

            {showBatchesPanel ? (
              /* BATCHES PANEL */
              <div className={styles["vhc-batches-panel"]}>
                <div className={styles["vhc-batches-header"]}>
                  <h3 className={styles["vhc-batches-title"]} style={{ color: THEME }}>
                    Herb Batches
                  </h3>
                  <button
                    className={styles["vhc-new-batch-btn"]}
                    onClick={handleNewBatch}
                    style={{ backgroundColor: THEME, color: "white" }}
                  >
                    <Plus size={16} />
                    New Batch
                  </button>
                </div>

                <div className={styles["vhc-batches-list"]}>
                  {batches.map((batch) => (
                    <div
                      key={batch.id}
                      className={`${styles["vhc-batch-item"]} ${selectedBatch?.id === batch.id ? styles["selected"] : ""}`}
                      onClick={() => handleBatchSelect(batch)}
                      style={{
                        borderLeft: `4px solid ${batch.color}`,
                        backgroundColor: selectedBatch?.id === batch.id ? THEME_VERY_LIGHT : "white"
                      }}
                    >
                      <div className={styles["vhc-batch-header"]}>
                        <div className={styles["vhc-batch-id"]} style={{ color: batch.color }}>
                          {batch.id}
                        </div>
                        <div className={`${styles["vhc-batch-status"]} ${styles[batch.status]}`}>
                          {batch.status === "completed" ? " Completed" : 
                           batch.status === "in-progress" ? "In Progress" : 
                           batch.status === "waiting" ? " Waiting" : "Not Started"}
                        </div>
                      </div>
                      
                      <div className={styles["vhc-batch-name"]}>
                        {batch.name}
                      </div>
                      
                      <div className={styles["vhc-batch-details"]}>
                        <div className={styles["vhc-batch-detail"]}>
                          <User size={12} />
                          <span>{batch.farmer}</span>
                        </div>
                        <div className={styles["vhc-batch-detail"]}>
                          <Calendar size={12} />
                          <span>{new Date(batch.date).toLocaleDateString('en-GB')}</span>
                        </div>
                      </div>
                      
                      <div className={styles["vhc-batch-stage"]}>
                        <div className={styles["vhc-stage-progress"]}>
                          <div className={styles["vhc-stage-dots"]}>
                            {[1, 2, 3, 4, 5].map((stageNum) => (
                              <div
                                key={stageNum}
                                className={`${styles["vhc-stage-dot"]} ${
                                  stageNum <= batch.stage ? styles["active"] : ""
                                }`}
                                style={{
                                  backgroundColor: stageNum <= batch.stage ? batch.color : "#e5e7eb"
                                }}
                              />
                            ))}
                          </div>
                          <div className={styles["vhc-stage-text"]}>
                            Stage {batch.stage}/5
                          </div>
                        </div>
                        <ChevronRight size={16} className={styles["vhc-batch-arrow"]} />
                      </div>
                    </div>
                  ))}
                </div>

                {selectedBatch && (
                  <div className={styles["vhc-selected-batch-info"]}>
                    <div className={styles["vhc-selected-header"]}>
                      <h4 style={{ color: THEME }}>Selected Batch</h4>
                      <button
                        className={styles["vhc-clear-selection"]}
                        onClick={() => setSelectedBatch(null)}
                        style={{ color: THEME }}
                      >
                        Clear
                      </button>
                    </div>
                    <div className={styles["vhc-selected-details"]}>
                      <div className={styles["vhc-selected-item"]}>
                        <span className={styles["vhc-selected-label"]}>Batch ID:</span>
                        <span className={styles["vhc-selected-value"]} style={{ color: selectedBatch.color }}>
                          {selectedBatch.id}
                        </span>
                      </div>
                      <div className={styles["vhc-selected-item"]}>
                        <span className={styles["vhc-selected-label"]}>Status:</span>
                        <span className={styles["vhc-selected-value"]}>
                          {selectedBatch.status}
                        </span>
                      </div>
                      <div className={styles["vhc-selected-item"]}>
                        <span className={styles["vhc-selected-label"]}>Current Stage:</span>
                        <span className={styles["vhc-selected-value"]}>
                          {STAGE_DATA[selectedBatch.stage - 1]?.title}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* TIMELINE PANEL */
              <>
                <div className={styles["vhc-timeline-header"]}>
                  <h2 className={styles["vhc-timeline-title"]} style={{ color: THEME }}>
                    Batch Integrity Timeline
                  </h2>
                  <p className={styles["vhc-timeline-subtitle"]}>
                    Track progress through all stages. Click any stage to manage.
                  </p>
                </div>

                <div className={styles["vhc-timeline-container"]}>
                  <div className={styles["vhc-timeline-line"]} style={{ backgroundColor: THEME_LIGHT }} />
                  <div>
                    {STAGE_DATA.map((stage) => renderTimelineItem(stage))}
                  </div>
                </div>

                {/* LIVE PREVIEW */}
                <div className={styles["vhc-live-preview"]}>
                  <h3 className={styles["vhc-live-preview-title"]} style={{ color: THEME }}>
                    Live Batch Preview
                  </h3>

                  <div className={styles["vhc-preview-container"]}>
                    {currentStage === 1 ? (
                      <div className={styles["vhc-preview-grid"]}>
                        <div className={styles["vhc-preview-item"]}>
                          <div className={styles["vhc-preview-label"]}>Farmer Name</div>
                          <div className={styles["vhc-preview-value"]}>
                            {stage1Form.farmerName || <span className={styles["vhc-preview-empty"]}>Not entered</span>}
                          </div>
                        </div>

                        <div className={styles["vhc-preview-item"]}>
                          <div className={styles["vhc-preview-label"]}>Farmer ID</div>
                          <div className={styles["vhc-preview-value"]}>
                            {stage1Form.fid || <span className={styles["vhc-preview-empty"]}>Not entered</span>}
                          </div>
                        </div>

                        <div className={styles["vhc-preview-item"]}>
                          <div className={styles["vhc-preview-label"]}>Visit Date</div>
                          <div className={styles["vhc-preview-value"]}>
                            {stage1Form.visitDate ? new Date(stage1Form.visitDate).toLocaleDateString('en-GB') :
                              <span className={styles["vhc-preview-empty"]}>Not set</span>}
                          </div>
                        </div>

                        <div className={styles["vhc-preview-item"]}>
                          <div className={styles["vhc-preview-label"]}>Species</div>
                          <div className={styles["vhc-preview-value"]}>
                            {stage1Form.species || <span className={styles["vhc-preview-empty"]}>Not selected</span>}
                          </div>
                        </div>

                        <div className={styles["vhc-preview-item"]}>
                          <div className={styles["vhc-preview-label"]}>Estimated Qty</div>
                          <div className={styles["vhc-preview-value"]}>
                            {stage1Form.estimatedQty ? `${stage1Form.estimatedQty} kg` :
                              <span className={styles["vhc-preview-empty"]}>Not estimated</span>}
                          </div>
                        </div>

                        <div className={styles["vhc-preview-item"]}>
                          <div className={styles["vhc-preview-label"]}>Soil Type</div>
                          <div className={styles["vhc-preview-value"]}>
                            {stage1Form.soilType || <span className={styles["vhc-preview-empty"]}>Not specified</span>}
                          </div>
                        </div>

                        <div className={styles["vhc-preview-item"]}>
                          <div className={styles["vhc-preview-label"]}>Irrigation</div>
                          <div className={styles["vhc-preview-value"]}>
                            {stage1Form.irrigationType || <span className={styles["vhc-preview-empty"]}>Not specified</span>}
                          </div>
                        </div>

                        <div className={styles["vhc-preview-item"]}>
                          <div className={styles["vhc-preview-label"]}>GPS Location</div>
                          <div className={`${styles["vhc-preview-value"]} ${styles["vhc-preview-gps"]}`}>
                            {stage1Form.geotag || <span className={styles["vhc-preview-empty"]}>Not captured</span>}
                          </div>
                        </div>

                        <div className={`${styles["vhc-preview-item"]} ${styles["vhc-field-full"]}`}>
                          <div className={styles["vhc-preview-label"]}>Exact Address</div>
                          <div className={`${styles["vhc-preview-value"]} ${styles["vhc-preview-address"]}`}>
                            {stage1Form.exactAddress ?
                              <span className={styles["vhc-address-truncated"]}>{stage1Form.exactAddress.substring(0, 50)}...</span> :
                              <span className={styles["vhc-preview-empty"]}>Not captured</span>
                            }
                          </div>
                        </div>

                        <div className={styles["vhc-preview-notes"]}>
                          <div className={styles["vhc-notes-label"]}>Observations</div>
                          <div className={styles["vhc-notes-content"]}>
                            {stage1Form.notes || <span className={styles["vhc-preview-empty"]}>No observations added</span>}
                          </div>
                        </div>
                      </div>
                    ) : currentStage === 2 ? (
                      <div className={styles["vhc-preview-grid"]}>
                        <div className={styles["vhc-preview-item"]}>
                          <div className={styles["vhc-preview-label"]}>Growth Stage</div>
                          <div className={styles["vhc-preview-value"]}>
                            {stage2Form.growthStage || <span className={styles["vhc-preview-empty"]}>Not specified</span>}
                          </div>
                        </div>

                        <div className={styles["vhc-preview-item"]}>
                          <div className={styles["vhc-preview-label"]}>Photos Uploaded</div>
                          <div className={styles["vhc-preview-value"]}>
                            <span className={`${styles["vhc-preview-status-badge"]} ${stage2Form.growthPhotos.length > 0 ? styles['success'] : styles['pending']}`}
                                  style={{ 
                                    backgroundColor: stage2Form.growthPhotos.length > 0 ? THEME_LIGHT : "#fef3c7",
                                    color: stage2Form.growthPhotos.length > 0 ? THEME_DARK : "#92400e"
                                  }}>
                              {stage2Form.growthPhotos.length} photos
                            </span>
                          </div>
                        </div>

                        <div className={styles["vhc-preview-item"]}>
                          <div className={styles["vhc-preview-label"]}>Farmer Updates</div>
                          <div className={styles["vhc-preview-value"]}>
                            {stage2Form.farmerUpdates ?
                              <span className={styles["vhc-address-truncated"]}>{stage2Form.farmerUpdates.substring(0, 50)}...</span> :
                              <span className={styles["vhc-preview-empty"]}>No updates</span>
                            }
                          </div>
                        </div>

                        <div className={`${styles["vhc-preview-item"]} ${styles["vhc-field-full"]}`}>
                          <div className={styles["vhc-preview-label"]}>Observations</div>
                          <div className={styles["vhc-preview-value"]}>
                            {stage2Form.observations || <span className={styles["vhc-preview-empty"]}>No observations</span>}
                          </div>
                        </div>
                      </div>
                    ) : currentStage === 3 ? (
                      <div className={styles["vhc-preview-grid"]}>
                        <div className={styles["vhc-preview-item"]}>
                          <div className={styles["vhc-preview-label"]}>Health Status</div>
                          <div className={styles["vhc-preview-value"]}>
                            <span className={`${styles["vhc-preview-status-badge"]} ${stage3Form.healthStatus === 'Excellent' || stage3Form.healthStatus === 'Good' ? styles['success'] : styles['pending']}`}
                                  style={{ 
                                    backgroundColor: (stage3Form.healthStatus === 'Excellent' || stage3Form.healthStatus === 'Good') ? THEME_LIGHT : "#fef3c7",
                                    color: (stage3Form.healthStatus === 'Excellent' || stage3Form.healthStatus === 'Good') ? THEME_DARK : "#92400e"
                                  }}>
                              {stage3Form.healthStatus}
                            </span>
                          </div>
                        </div>

                        <div className={styles["vhc-preview-item"]}>
                          <div className={styles["vhc-preview-label"]}>Assessment Photos</div>
                          <div className={styles["vhc-preview-value"]}>
                            <span className={`${styles["vhc-preview-status-badge"]} ${stage3Form.assessmentPhotos.length > 0 ? styles['success'] : styles['pending']}`}
                                  style={{ 
                                    backgroundColor: stage3Form.assessmentPhotos.length > 0 ? THEME_LIGHT : "#fef3c7",
                                    color: stage3Form.assessmentPhotos.length > 0 ? THEME_DARK : "#92400e"
                                  }}>
                              {stage3Form.assessmentPhotos.length} photos
                            </span>
                          </div>
                        </div>

                        <div className={styles["vhc-preview-item"]}>
                          <div className={styles["vhc-preview-label"]}>Pest Issues</div>
                          <div className={styles["vhc-preview-value"]}>
                            {stage3Form.pestIssues ?
                              <span className={styles["vhc-address-truncated"]}>{stage3Form.pestIssues.substring(0, 50)}...</span> :
                              <span className={styles["vhc-preview-empty"]}>None reported</span>
                            }
                          </div>
                        </div>

                        <div className={styles["vhc-preview-item"]}>
                          <div className={styles["vhc-preview-label"]}>Irrigation Issues</div>
                          <div className={styles["vhc-preview-value"]}>
                            {stage3Form.irrigationIssues ?
                              <span className={styles["vhc-address-truncated"]}>{stage3Form.irrigationIssues.substring(0, 50)}...</span> :
                              <span className={styles["vhc-preview-empty"]}>None reported</span>
                            }
                          </div>
                        </div>
                      </div>
                    ) : currentStage === 4 ? (
                      <div className={styles["vhc-preview-grid"]}>
                        <div className={styles["vhc-preview-item"]}>
                          <div className={styles["vhc-preview-label"]}>Harvest Readiness</div>
                          <div className={styles["vhc-preview-value"]}>
                            <span className={`${styles["vhc-preview-status-badge"]} ${parseInt(stage4Form.harvestReadiness) > 80 ? styles['success'] : styles['pending']}`}
                                  style={{ 
                                    backgroundColor: parseInt(stage4Form.harvestReadiness) > 80 ? THEME_LIGHT : "#fef3c7",
                                    color: parseInt(stage4Form.harvestReadiness) > 80 ? THEME_DARK : "#92400e"
                                  }}>
                              {stage4Form.harvestReadiness}%
                            </span>
                          </div>
                        </div>

                        <div className={styles["vhc-preview-item"]}>
                          <div className={styles["vhc-preview-label"]}>Expected Harvest</div>
                          <div className={styles["vhc-preview-value"]}>
                            {stage4Form.expectedHarvestDate ? new Date(stage4Form.expectedHarvestDate).toLocaleDateString('en-GB') :
                              <span className={styles["vhc-preview-empty"]}>Not set</span>}
                          </div>
                        </div>

                        <div className={styles["vhc-preview-item"]}>
                          <div className={styles["vhc-preview-label"]}>Quality Check</div>
                          <div className={styles["vhc-preview-value"]}>
                            <span className={`${styles["vhc-preview-status-badge"]} ${stage4Form.qualityCheck === 'Pass' ? styles['success'] : styles['pending']}`}
                                  style={{ 
                                    backgroundColor: stage4Form.qualityCheck === 'Pass' ? THEME_LIGHT : "#fee2e2",
                                    color: stage4Form.qualityCheck === 'Pass' ? THEME_DARK : "#dc2626"
                                  }}>
                              {stage4Form.qualityCheck}
                            </span>
                          </div>
                        </div>

                        <div className={styles["vhc-preview-item"]}>
                          <div className={styles["vhc-preview-label"]}>Pre-Harvest Photos</div>
                          <div className={styles["vhc-preview-value"]}>
                            <span className={`${styles["vhc-preview-status-badge"]} ${stage4Form.preHarvestPhotos.length > 0 ? styles['success'] : styles['pending']}`}
                                  style={{ 
                                    backgroundColor: stage4Form.preHarvestPhotos.length > 0 ? THEME_LIGHT : "#fef3c7",
                                    color: stage4Form.preHarvestPhotos.length > 0 ? THEME_DARK : "#92400e"
                                  }}>
                              {stage4Form.preHarvestPhotos.length} photos
                            </span>
                          </div>
                        </div>
                      </div>
                    ) : currentStage === 5 ? (
                      <div className={styles["vhc-preview-grid"]}>
                        <div className={styles["vhc-preview-item"]}>
                          <div className={styles["vhc-preview-label"]}>Batch ID</div>
                          <div className={`${styles["vhc-preview-value"]} ${styles["vhc-preview-batchid"]}`}
                               style={{ color: THEME }}>
                            {stage5Form.batchId}
                          </div>
                        </div>

                        <div className={styles["vhc-preview-item"]}>
                          <div className={styles["vhc-preview-label"]}>Final Harvest Date</div>
                          <div className={styles["vhc-preview-value"]}>
                            {stage5Form.finalHarvestDate ? new Date(stage5Form.finalHarvestDate).toLocaleDateString('en-GB') :
                              <span className={styles["vhc-preview-empty"]}>Not set</span>}
                          </div>
                        </div>

                        <div className={styles["vhc-preview-item"]}>
                          <div className={styles["vhc-preview-label"]}>Final Quantity</div>
                          <div className={styles["vhc-preview-value"]}>
                            {stage5Form.finalQuantity ? `${stage5Form.finalQuantity} kg` :
                              <span className={styles["vhc-preview-empty"]}>Not recorded</span>}
                          </div>
                        </div>

                        <div className={styles["vhc-preview-item"]}>
                          <div className={styles["vhc-preview-label"]}>Sample Collected</div>
                          <div className={styles["vhc-preview-value"]}>
                            <span className={`${styles["vhc-preview-status-badge"]} ${stage5Form.sampleCollected ? styles['success'] : styles['pending']}`}
                                  style={{ 
                                    backgroundColor: stage5Form.sampleCollected ? THEME_LIGHT : "#fef3c7",
                                    color: stage5Form.sampleCollected ? THEME_DARK : "#92400e"
                                  }}>
                              {stage5Form.sampleCollected ? 'Yes' : 'No'}
                            </span>
                          </div>
                        </div>

                        <div className={styles["vhc-preview-item"]}>
                          <div className={styles["vhc-preview-label"]}>Dispatch Auth</div>
                          <div className={styles["vhc-preview-value"]}>
                            <span className={`${styles["vhc-preview-status-badge"]} ${stage5Form.dispatchAuth ? styles['success'] : styles['pending']}`}
                                  style={{ 
                                    backgroundColor: stage5Form.dispatchAuth ? THEME_LIGHT : "#fef3c7",
                                    color: stage5Form.dispatchAuth ? THEME_DARK : "#92400e"
                                  }}>
                              {stage5Form.dispatchAuth ? 'Authorized' : 'Pending'}
                            </span>
                          </div>
                        </div>

                        <div className={styles["vhc-preview-item"]}>
                          <div className={styles["vhc-preview-label"]}>Final GPS</div>
                          <div className={`${styles["vhc-preview-value"]} ${styles["vhc-preview-gps"]}`}>
                            {stage5Form.finalGeotag || <span className={styles["vhc-preview-empty"]}>Not captured</span>}
                          </div>
                        </div>

                        <div className={styles["vhc-preview-photo"]}>
                          <div className={styles["vhc-notes-label"]}>Final Photo</div>
                          <div className={styles["vhc-photo-status"]}>
                            {stage5Form.finalPhoto ? (
                              <span className={styles["vhc-photo-uploaded"]}
                                    style={{ color: THEME }}>
                                ✅ Photo uploaded
                              </span>
                            ) : (
                              <span className={styles["vhc-preview-empty"]}>No photo uploaded</span>
                            )}
                          </div>
                        </div>
                      </div>
                    ) : null}

                    <div className={styles["vhc-preview-status"]}>
                      <div className={styles["vhc-preview-status-icon"]}
                           style={{ 
                             backgroundColor: stageStatus[currentStage - 1] === "done" ? THEME_LIGHT : 
                                           stageStatus[currentStage - 1] === "current" ? THEME_LIGHT : "#f3f4f6",
                             color: stageStatus[currentStage - 1] === "done" ? THEME : 
                                    stageStatus[currentStage - 1] === "current" ? THEME : "#6b7280"
                           }}>
                        {stageStatus[currentStage - 1] === "done" ? "✅" :
                          stageStatus[currentStage - 1] === "current" ? "🔄" : "⏳"}
                      </div>
                      <div className={styles["vhc-preview-status-text"]}>
                        <div className={styles["vhc-preview-status-title"]}>
                          {STAGE_DATA[currentStage - 1]?.title}
                        </div>
                        <div className={styles["vhc-preview-status-subtitle"]}
                             style={{ 
                               color: stageStatus[currentStage - 1] === "current" ? THEME : 
                                      stageStatus[currentStage - 1] === "done" ? "#10b981" : "#6b7280"
                             }}>
                          Status: {getStatusText(stageStatus[currentStage - 1])}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </aside>
        </div>
      </main>
    </>
  );
}

export default App;

