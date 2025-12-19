import React, { useState, useEffect } from 'react';
import '../styles/Doctor.css';

// Icons
import { 
  FaUserMd, FaPills, FaStethoscope, FaShieldAlt, FaHistory, 
  FaFileMedical, FaAllergies, FaBaby, FaHeart, FaLungs, 
  FaLiver, FaBrain, FaBone, FaFlask, FaCapsules, FaLeaf,
  FaCamera, FaQrcode, FaCheckCircle, FaExclamationTriangle,
  FaTimesCircle, FaVideo, FaCalendarAlt, FaClipboardList,
  FaChartLine, FaDatabase, FaLock, FaBell, FaUserCircle
} from 'react-icons/fa';

const VirtuHerbChain = () => {
  // State management
  const [activeTab, setActiveTab] = useState('dashboard');
  const [healthProfile, setHealthProfile] = useState({
    completion: 65,
    basicInfo: {},
    currentComplaints: [],
    conditions: [],
    medications: [],
    allergies: [],
    specialConditions: {},
    medicalHistory: {},
    lifestyle: {},
    herbalPreferences: {}
  });
  const [scanResult, setScanResult] = useState(null);
  const [aiAnalysis, setAiAnalysis] = useState(null);
  const [prescriptionSuggestions, setPrescriptionSuggestions] = useState([]);
  const [showDoctorMeet, setShowDoctorMeet] = useState(false);
  const [appointments, setAppointments] = useState([]);

  // Initialize with sample data
  useEffect(() => {
    // Sample health profile data
    setHealthProfile(prev => ({
      ...prev,
      basicInfo: {
        name: "John Doe",
        age: 42,
        gender: "Male",
        height: "5'10\"",
        weight: "82 kg",
        contact: "+1 (555) 123-4567",
        emergencyContact: "+1 (555) 987-6543"
      },
      currentComplaints: [
        { symptom: "Persistent headaches", duration: "2 weeks", severity: 7 }
      ],
      conditions: ["Hypertension", "Mild Anxiety"],
      medications: [
        { name: "Lisinopril", dose: "10mg daily", prescribed: true },
        { name: "Ashwagandha", dose: "500mg twice daily", prescribed: false }
      ],
      allergies: ["Penicillin (rash)", "Sulfa drugs"],
      specialConditions: {
        pregnant: false,
        breastfeeding: false,
        surgery: false,
        smoking: false
      }
    }));

    // Sample prescription suggestions
    setPrescriptionSuggestions([
      {
        id: 1,
        name: "Brahmi Capsules",
        type: "Herbal",
        form: "Capsules",
        suitability: "High",
        safety: "Safe",
        reason: "Supports cognitive function and reduces anxiety symptoms",
        dosage: "250mg twice daily",
        duration: "4-6 weeks"
      },
      {
        id: 2,
        name: "Arjuna Tea",
        type: "Herbal",
        form: "Tea",
        suitability: "Medium",
        safety: "Caution",
        reason: "Cardiovascular support, monitor blood pressure",
        dosage: "1 cup daily",
        duration: "3 months"
      }
    ]);

    // Sample appointments
    setAppointments([
      {
        id: 1,
        doctor: "Dr. Sarah Chen",
        specialization: "Integrative Medicine",
        date: "2024-03-15",
        time: "14:30",
        status: "Confirmed"
      }
    ]);
  }, []);

  // Scan Medicine Function
  const handleScanMedicine = () => {
    // Simulate blockchain verification
    const mockResult = {
      verified: true,
      medicine: {
        name: "Turmeric Curcumin 95%",
        batchId: "BATCH-2024-02567",
        manufacturer: "HerbalPure Pharmaceuticals",
        source: "Organic Farm, Kerala, India",
        harvestDate: "2023-11-15",
        expiryDate: "2025-11-15",
        quality: "Premium Grade A",
        txId: "0x8a7f6e...d4c3b2a1",
        nftId: "NFT-HERB-567890"
      },
      blockchainData: {
        timestamp: "2024-02-20 10:30:15 UTC",
        blockNumber: 18945623,
        verifier: "VirtuHerbChain Authority"
      }
    };
    
    setScanResult(mockResult);
    setActiveTab('verify');
  };

  // AI Analysis Function
  const handleAnalyzeMedicine = (medicineName) => {
    const analysis = {
      medicine: medicineName || "Turmeric Curcumin",
      status: "safe",
      confidence: 94,
      analysis: {
        interactions: [
          {
            with: "Warfarin",
            risk: "Low",
            explanation: "May increase anticoagulant effect, monitor INR"
          }
        ],
        contraindications: [
          "Gallbladder disease",
          "Bile duct obstruction"
        ],
        benefits: [
          "Anti-inflammatory properties",
          "Antioxidant support",
          "May help with arthritis pain"
        ],
        monitoring: [
          "Monitor liver enzymes if taking high doses",
          "Watch for gastrointestinal discomfort"
        ]
      },
      recommendations: {
        dosage: "500mg twice daily with meals",
        duration: "4-8 weeks",
        timing: "With food to enhance absorption"
      }
    };
    
    setAiAnalysis(analysis);
  };

  // Profile Completion Calculator
  const calculateProfileCompletion = () => {
    const sections = [
      healthProfile.basicInfo,
      healthProfile.currentComplaints,
      healthProfile.conditions,
      healthProfile.medications,
      healthProfile.allergies,
      healthProfile.specialConditions
    ];
    
    const filledSections = sections.filter(section => 
      section && Object.keys(section).length > 0
    ).length;
    
    return Math.min(100, Math.round((filledSections / sections.length) * 100));
  };

  // Schedule Doctor Appointment
  const scheduleAppointment = () => {
    const newAppointment = {
      id: appointments.length + 1,
      doctor: "Dr. Virtual Assistant",
      specialization: "AI-Powered Consultation",
      date: new Date(Date.now() + 86400000).toISOString().split('T')[0], // Tomorrow
      time: "10:00",
      status: "Pending"
    };
    
    setAppointments([...appointments, newAppointment]);
    setShowDoctorMeet(true);
  };

  return (
    <div className="virtuherbchain-dashboard">
      {/* Top Navigation */}
      <nav className="navbar">
        <div className="nav-left">
          <div className="logo">
            <FaLeaf className="logo-icon" />
            <h1>VirtuHerbChain</h1>
            <span className="beta-tag">BETA</span>
          </div>
          <div className="nav-tabs">
            {['dashboard', 'scan', 'profile', 'verify', 'prescribe'].map(tab => (
              <button
                key={tab}
                className={`nav-tab ${activeTab === tab ? 'active' : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>
        <div className="nav-right">
          <button className="notification-btn">
            <FaBell />
            <span className="notification-badge">3</span>
          </button>
          <div className="user-profile">
            <FaUserCircle className="user-avatar" />
            <span>John Doe</span>
          </div>
        </div>
      </nav>

      {/* Main Dashboard */}
      <main className="main-content">
        {/* Dashboard Overview */}
        {activeTab === 'dashboard' && (
          <div className="dashboard-overview">
            <div className="welcome-section">
              <h2>Welcome back, John</h2>
              <p className="subtitle">Your health data is protected with blockchain security</p>
              
              <div className="stats-grid">
                <div className="stat-card security">
                  <FaLock className="stat-icon" />
                  <h3>100% Secure</h3>
                  <p>Blockchain-verified data</p>
                </div>
                <div className="stat-card profile">
                  <FaUserMd className="stat-icon" />
                  <h3>{calculateProfileCompletion()}% Complete</h3>
                  <p>Health Profile</p>
                </div>
                <div className="stat-card medicines">
                  <FaPills className="stat-icon" />
                  <h3>12 Verified</h3>
                  <p>Medicines Scanned</p>
                </div>
                <div className="stat-card appointments">
                  <FaCalendarAlt className="stat-icon" />
                  <h3>{appointments.length} Upcoming</h3>
                  <p>Consultations</p>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="quick-actions">
              <h3>Quick Actions</h3>
              <div className="action-grid">
                <button className="action-btn scan" onClick={() => setActiveTab('scan')}>
                  <FaCamera />
                  <span>Scan Medicine</span>
                </button>
                <button className="action-btn profile" onClick={() => setActiveTab('profile')}>
                  <FaFileMedical />
                  <span>Update Profile</span>
                </button>
                <button className="action-btn verify" onClick={() => setActiveTab('verify')}>
                  <FaShieldAlt />
                  <span>Verify Safety</span>
                </button>
                <button className="action-btn prescribe" onClick={() => setActiveTab('prescribe')}>
                  <FaCapsules />
                  <span>Get Suggestions</span>
                </button>
              </div>
            </div>

            {/* Recent Activity & Upcoming Appointments */}
            <div className="dashboard-grid">
              <div className="recent-activity">
                <h3>Recent Activity</h3>
                <div className="activity-list">
                  <div className="activity-item verified">
                    <FaCheckCircle />
                    <div>
                      <p>Turmeric Curcumin verified</p>
                      <small>2 hours ago • Blockchain confirmed</small>
                    </div>
                  </div>
                  <div className="activity-item analysis">
                    <FaStethoscope />
                    <div>
                      <p>AI analysis completed for Ashwagandha</p>
                      <small>Safe with current medications</small>
                    </div>
                  </div>
                  <div className="activity-item appointment">
                    <FaVideo />
                    <div>
                      <p>Doctor consultation scheduled</p>
                      <small>Tomorrow at 14:30 with Dr. Chen</small>
                    </div>
                  </div>
                </div>
              </div>

              <div className="upcoming-appointments">
                <h3>Upcoming Appointments</h3>
                {appointments.length > 0 ? (
                  appointments.map(apt => (
                    <div key={apt.id} className="appointment-card">
                      <div className="appointment-info">
                        <h4>{apt.doctor}</h4>
                        <p>{apt.specialization}</p>
                        <div className="appointment-time">
                          <FaCalendarAlt />
                          <span>{apt.date} at {apt.time}</span>
                        </div>
                      </div>
                      <div className={`appointment-status ${apt.status.toLowerCase()}`}>
                        {apt.status}
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="no-appointments">No upcoming appointments</p>
                )}
                <button className="schedule-btn" onClick={scheduleAppointment}>
                  <FaVideo /> Schedule Virtual Consultation
                </button>
              </div>
            </div>

            {/* Security Assurance Banner */}
            <div className="security-banner">
              <FaLock className="security-icon" />
              <div>
                <h4>Your Health Data is Protected</h4>
                <p>All medical records are encrypted and verified on our private blockchain network. 
                Only you and authorized healthcare providers can access your data.</p>
              </div>
            </div>
          </div>
        )}

        {/* Scan Medicine Tab */}
        {activeTab === 'scan' && (
          <div className="scan-container">
            <div className="scan-header">
              <h2><FaQrcode /> Medicine Verification</h2>
              <p>Scan OSA code or enter manually for blockchain verification</p>
            </div>

            <div className="scanner-section">
              <div className="scanner-frame">
                <div className="scanner-guide">
                  <div className="scanning-animation"></div>
                  <FaCamera className="scanner-icon" />
                  <p>Align QR/Bar code within frame</p>
                </div>
                <div className="scanner-controls">
                  <button className="scan-btn primary" onClick={handleScanMedicine}>
                    Scan Medicine
                  </button>
                  <div className="manual-input">
                    <input 
                      type="text" 
                      placeholder="Or enter batch code manually"
                    />
                    <button className="scan-btn secondary">
                      Verify
                    </button>
                  </div>
                </div>
              </div>

              {scanResult && (
                <div className="verification-result">
                  <div className={`verification-header ${scanResult.verified ? 'verified' : 'invalid'}`}>
                    {scanResult.verified ? (
                      <>
                        <FaCheckCircle /> Verified Authentic
                      </>
                    ) : (
                      <>
                        <FaTimesCircle /> Invalid Medicine
                      </>
                    )}
                  </div>
                  
                  <div className="medicine-details">
                    <h4>Medicine Details</h4>
                    <div className="details-grid">
                      <div className="detail-item">
                        <strong>Name:</strong>
                        <span>{scanResult.medicine.name}</span>
                      </div>
                      <div className="detail-item">
                        <strong>Batch ID:</strong>
                        <span>{scanResult.medicine.batchId}</span>
                      </div>
                      <div className="detail-item">
                        <strong>Manufacturer:</strong>
                        <span>{scanResult.medicine.manufacturer}</span>
                      </div>
                      <div className="detail-item">
                        <strong>Source:</strong>
                        <span>{scanResult.medicine.source}</span>
                      </div>
                      <div className="detail-item">
                        <strong>Harvest Date:</strong>
                        <span>{scanResult.medicine.harvestDate}</span>
                      </div>
                      <div className="detail-item">
                        <strong>Expiry Date:</strong>
                        <span>{scanResult.medicine.expiryDate}</span>
                      </div>
                      <div className="detail-item">
                        <strong>Quality:</strong>
                        <span className="quality-badge">{scanResult.medicine.quality}</span>
                      </div>
                    </div>
                    
                    <div className="blockchain-info">
                      <h5><FaDatabase /> Blockchain Verification</h5>
                      <div className="blockchain-details">
                        <div className="blockchain-item">
                          <strong>Transaction ID:</strong>
                          <code>{scanResult.medicine.txId}</code>
                        </div>
                        <div className="blockchain-item">
                          <strong>NFT ID:</strong>
                          <span>{scanResult.medicine.nftId}</span>
                        </div>
                        <div className="blockchain-item">
                          <strong>Verified At:</strong>
                          <span>{scanResult.blockchainData.timestamp}</span>
                        </div>
                      </div>
                    </div>
                    
                    <button className="view-trace-btn">
                      View Complete Supply Chain Trace
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="scan-history">
              <h3>Recent Scans</h3>
              <div className="history-list">
                <div className="history-item verified">
                  <FaCheckCircle />
                  <div>
                    <p>Ashwagandha Root Extract</p>
                    <small>Verified • 3 days ago</small>
                  </div>
                </div>
                <div className="history-item verified">
                  <FaCheckCircle />
                  <div>
                    <p>Triphala Powder</p>
                    <small>Verified • 1 week ago</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Health Profile Tab */}
        {activeTab === 'profile' && (
          <div className="profile-container">
            <div className="profile-header">
              <h2><FaFileMedical /> Health Profile</h2>
              <div className="profile-completion">
                <div className="completion-bar">
                  <div 
                    className="completion-fill" 
                    style={{ width: `${healthProfile.completion}%` }}
                  ></div>
                </div>
                <span>{healthProfile.completion}% Complete</span>
              </div>
              <p className="profile-notice">
                Complete your profile for personalized AI analysis and safe prescription recommendations
              </p>
            </div>

            <div className="profile-sections">
              {/* Basic Identity */}
              <div className="profile-section">
                <h3><FaUserCircle /> Basic Identity</h3>
                <div className="form-grid">
                  <div className="form-group">
                    <label>Full Name</label>
                    <input type="text" defaultValue="John Doe" />
                  </div>
                  <div className="form-group">
                    <label>Age</label>
                    <input type="number" defaultValue="42" />
                  </div>
                  <div className="form-group">
                    <label>Gender</label>
                    <select defaultValue="Male">
                      <option>Male</option>
                      <option>Female</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Height</label>
                    <input type="text" defaultValue="510\" />
                  </div>
                  <div className="form-group">
                    <label>Weight</label>
                    <input type="text" defaultValue="82 kg" />
                  </div>
                </div>
              </div>

              {/* Current Health Complaints */}
              <div className="profile-section highlight">
                <h3><FaStethoscope /> Current Health Complaints</h3>
                <div className="form-group">
                  <label>Symptoms</label>
                  <textarea 
                    placeholder="Describe your symptoms..."
                    defaultValue="Persistent headaches, especially in the morning. Mild dizziness occasionally."
                  />
                </div>
                <div className="symptom-details">
                  <div className="form-group">
                    <label>Duration</label>
                    <input type="text" defaultValue="2 weeks" />
                  </div>
                  <div className="form-group">
                    <label>Severity (1-10)</label>
                    <input type="range" min="1" max="10" defaultValue="7" />
                    <span>7/10</span>
                  </div>
                </div>
              </div>

              {/* Diagnosed Conditions */}
              <div className="profile-section">
                <h3><FaHeart /> Diagnosed Conditions</h3>
                <div className="conditions-grid">
                  {['Diabetes', 'Hypertension', 'Heart Disease', 'Asthma', 'Thyroid', 
                    'Kidney Disease', 'Liver Disease', 'Autoimmune', 'Arthritis', 
                    'Gastric Issues', 'Mental Health'].map(condition => (
                    <label key={condition} className="condition-checkbox">
                      <input 
                        type="checkbox" 
                        defaultChecked={healthProfile.conditions.includes(condition)}
                      />
                      <span>{condition}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Current Medications */}
              <div className="profile-section">
                <h3><FaPills /> Current Medications</h3>
                <div className="medications-list">
                  {healthProfile.medications.map((med, index) => (
                    <div key={index} className="medication-card">
                      <div className="medication-info">
                        <strong>{med.name}</strong>
                        <span>{med.dose}</span>
                        <small>{med.prescribed ? 'Prescribed' : 'Self-medicated'}</small>
                      </div>
                      <button className="edit-btn">Edit</button>
                    </div>
                  ))}
                </div>
                <button className="add-medication-btn">+ Add Medication</button>
              </div>

              {/* Allergies */}
              <div className="profile-section warning">
                <h3><FaAllergies /> Allergies & Sensitivities</h3>
                <div className="allergies-list">
                  {healthProfile.allergies.map((allergy, index) => (
                    <div key={index} className="allergy-chip">
                      {allergy}
                      <button className="remove-chip">×</button>
                    </div>
                  ))}
                </div>
                <div className="form-group">
                  <input type="text" placeholder="Add new allergy..." />
                  <button className="add-btn">Add</button>
                </div>
              </div>

              {/* Special Conditions */}
              <div className="profile-section critical">
                <h3><FaBaby /> Special Conditions</h3>
                <div className="toggle-grid">
                  <label className="toggle-item">
                    <span>Pregnant</span>
                    <label className="switch">
                      <input type="checkbox" />
                      <span className="slider"></span>
                    </label>
                  </label>
                  <label className="toggle-item">
                    <span>Breastfeeding</span>
                    <label className="switch">
                      <input type="checkbox" />
                      <span className="slider"></span>
                    </label>
                  </label>
                  <label className="toggle-item">
                    <span>Recent Surgery</span>
                    <label className="switch">
                      <input type="checkbox" />
                      <span className="slider"></span>
                    </label>
                  </label>
                  <label className="toggle-item">
                    <span>Smoking</span>
                    <label className="switch">
                      <input type="checkbox" defaultChecked={healthProfile.specialConditions.smoking} />
                      <span className="slider"></span>
                    </label>
                  </label>
                </div>
              </div>

              {/* Lifestyle */}
              <div className="profile-section">
                <h3><FaChartLine /> Lifestyle & Diet</h3>
                <div className="lifestyle-grid">
                  <div className="lifestyle-item">
                    <label>Diet</label>
                    <select defaultValue="mixed">
                      <option>Vegetarian</option>
                      <option>Non-vegetarian</option>
                      <option>Mixed</option>
                    </select>
                  </div>
                  <div className="lifestyle-item">
                    <label>Water Intake</label>
                    <select defaultValue="adequate">
                      <option>Low</option>
                      <option>Adequate</option>
                      <option>High</option>
                    </select>
                  </div>
                  <div className="lifestyle-item">
                    <label>Sleep Hours</label>
                    <input type="number" defaultValue="6" min="0" max="24" />
                  </div>
                  <div className="lifestyle-item">
                    <label>Activity Level</label>
                    <select defaultValue="moderate">
                      <option>None</option>
                      <option>Light</option>
                      <option>Moderate</option>
                      <option>Heavy</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Herbal Experience */}
              <div className="profile-section">
                <h3><FaLeaf /> Herbal Experience & Preferences</h3>
                <div className="herbal-preferences">
                  <label className="preference-item">
                    <span>Used herbal medicine before?</span>
                    <label className="switch">
                      <input type="checkbox" defaultChecked />
                      <span className="slider"></span>
                    </label>
                  </label>
                  <div className="form-group">
                    <label>Preferred Form</label>
                    <div className="preference-chips">
                      <span className="chip active">Tablets</span>
                      <span className="chip">Powders</span>
                      <span className="chip">Teas</span>
                      <span className="chip">Oils</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="profile-actions">
              <button className="save-btn">Save Profile</button>
              <button className="analyze-btn" onClick={() => setActiveTab('verify')}>
                Proceed to Safety Analysis
              </button>
            </div>
          </div>
        )}

        {/* Verify Medicine Tab */}
        {activeTab === 'verify' && (
          <div className="verify-container">
            <div className="verify-header">
              <h2><FaShieldAlt /> AI Doctor Safety Analysis</h2>
              <p>Check medicine safety based on your complete health profile</p>
            </div>

            <div className="analysis-input">
              <div className="input-section">
                <h4>Enter Medicine to Analyze</h4>
                <div className="medicine-input">
                  <input 
                    type="text" 
                    placeholder="Medicine or herb name..."
                    defaultValue="Turmeric Curcumin"
                  />
                  <button 
                    className="analyze-btn"
                    onClick={() => handleAnalyzeMedicine("Turmeric Curcumin")}
                  >
                    Analyze with AI Doctor
                  </button>
                </div>
                <div className="quick-select">
                  <small>Quick select from history:</small>
                  <div className="quick-chips">
                    <span className="chip" onClick={() => handleAnalyzeMedicine("Ashwagandha")}>
                      Ashwagandha
                    </span>
                    <span className="chip" onClick={() => handleAnalyzeMedicine("Brahmi")}>
                      Brahmi
                    </span>
                    <span className="chip" onClick={() => handleAnalyzeMedicine("Ginger")}>
                      Ginger
                    </span>
                  </div>
                </div>
              </div>

              <div className="ai-doctor-header">
                <div className="doctor-avatar">
                  <FaUserMd />
                </div>
                <div>
                  <h4>Dr. Virtu AI</h4>
                  <small>Assigned to your health profile • Specialized in herb-drug interactions</small>
                </div>
              </div>
            </div>

            {aiAnalysis ? (
              <div className="analysis-result">
                <div className={`safety-status ${aiAnalysis.status}`}>
                  {aiAnalysis.status === 'safe' && <FaCheckCircle />}
                  {aiAnalysis.status === 'caution' && <FaExclamationTriangle />}
                  {aiAnalysis.status === 'danger' && <FaTimesCircle />}
                  <h3>
                    {aiAnalysis.status === 'safe' && '✅ Safe for Use'}
                    {aiAnalysis.status === 'caution' && '⚠️ Use with Caution'}
                    {aiAnalysis.status === 'danger' && '❌ Not Recommended'}
                  </h3>
                  <div className="confidence-badge">
                    {aiAnalysis.confidence}% Confidence
                  </div>
                </div>

                <div className="analysis-details">
                  <div className="detail-section">
                    <h5>Safety Assessment</h5>
                    <div className="assessment-grid">
                      <div className="assessment-item">
                        <strong>Based on your profile:</strong>
                        <ul>
                          <li>No interactions with current medications</li>
                          <li>Safe for hypertension condition</li>
                          <li>No known allergies detected</li>
                        </ul>
                      </div>
                      <div className="assessment-item">
                        <strong>Potential Interactions:</strong>
                        {aiAnalysis.analysis.interactions.length > 0 ? (
                          <ul>
                            {aiAnalysis.analysis.interactions.map((interaction, idx) => (
                              <li key={idx}>
                                <strong>{interaction.with}:</strong> {interaction.risk} risk - {interaction.explanation}
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p className="safe">No significant interactions detected</p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="detail-section">
                    <h5>Recommended Usage</h5>
                    <div className="recommendation-card">
                      <div className="recommendation-item">
                        <strong>Dosage:</strong>
                        <span>{aiAnalysis.recommendations.dosage}</span>
                      </div>
                      <div className="recommendation-item">
                        <strong>Duration:</strong>
                        <span>{aiAnalysis.recommendations.duration}</span>
                      </div>
                      <div className="recommendation-item">
                        <strong>Best Taken:</strong>
                        <span>{aiAnalysis.recommendations.timing}</span>
                      </div>
                    </div>
                  </div>

                  <div className="detail-section">
                    <h5>Monitoring Advice</h5>
                    <div className="monitoring-list">
                      {aiAnalysis.analysis.monitoring.map((item, idx) => (
                        <div key={idx} className="monitoring-item">
                          <div className="monitoring-bullet"></div>
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="medical-disclaimer">
                    <FaExclamationTriangle />
                    <p>
                      <strong>Important:</strong> This AI analysis is for informational purposes only. 
                      Always consult with a healthcare professional before starting any new medication or herbal supplement. 
                      Individual responses may vary.
                    </p>
                  </div>

                  <div className="consultation-cta">
                    <p>Want personalized advice from a human doctor?</p>
                    <button className="consult-btn" onClick={() => setShowDoctorMeet(true)}>
                      <FaVideo /> Schedule Virtual Consultation
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="analysis-pending">
                <div className="loading-analysis">
                  <div className="loading-spinner"></div>
                  <h4>AI Doctor is analyzing...</h4>
                  <p>Checking your health profile, conditions, and potential interactions</p>
                  <div className="loading-steps">
                    <div className="step active">Reviewing medications</div>
                    <div className="step">Checking allergies</div>
                    <div className="step">Analyzing interactions</div>
                    <div className="step">Generating safety report</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Prescribe Tab */}
        {activeTab === 'prescribe' && (
          <div className="prescribe-container">
            <div className="prescribe-header">
              <h2><FaCapsules /> Personalized Medicine Suggestions</h2>
              <p>Get AI-powered recommendations based on your symptoms and health profile</p>
            </div>

            <div className="symptoms-input">
              <h4>Describe Your Problem</h4>
              <textarea 
                placeholder="Example: Persistent stress and anxiety, difficulty sleeping, low energy..."
                defaultValue="Stress management and better sleep"
              />
              <button className="find-options-btn">
                Find Best Options
              </button>
            </div>

            <div className="results-header">
              <h4>Suggested Medicines & Herbs</h4>
              <div className="result-filters">
                <select defaultValue="all">
                  <option value="all">All Types</option>
                  <option value="herbal">Herbal Only</option>
                  <option value="conventional">Conventional</option>
                </select>
                <select defaultValue="all">
                  <option value="all">All Safety Levels</option>
                  <option value="safe">Safe</option>
                  <option value="caution">Caution</option>
                </select>
              </div>
            </div>

            <div className="suggestions-grid">
              {prescriptionSuggestions.map(suggestion => (
                <div key={suggestion.id} className="suggestion-card">
                  <div className="suggestion-header">
                    <div className="suggestion-title">
                      <FaLeaf className="herb-icon" />
                      <h5>{suggestion.name}</h5>
                    </div>
                    <div className={`suitability-badge ${suggestion.suitability.toLowerCase()}`}>
                      {suggestion.suitability} Suitability
                    </div>
                  </div>
                  
                  <div className="suggestion-details">
                    <div className="detail-row">
                      <strong>Type:</strong>
                      <span>{suggestion.type}</span>
                    </div>
                    <div className="detail-row">
                      <strong>Form:</strong>
                      <span>{suggestion.form}</span>
                    </div>
                    <div className="detail-row">
                      <strong>Safety:</strong>
                      <span className={`safety-indicator ${suggestion.safety.toLowerCase()}`}>
                        {suggestion.safety}
                      </span>
                    </div>
                  </div>

                  <div className="suggestion-reason">
                    <strong>Why suggested:</strong>
                    <p>{suggestion.reason}</p>
                  </div>

                  <div className="suggestion-dosage">
                    <div className="dosage-info">
                      <strong>Suggested Dosage:</strong>
                      <span>{suggestion.dosage}</span>
                    </div>
                    <div className="dosage-info">
                      <strong>Duration:</strong>
                      <span>{suggestion.duration}</span>
                    </div>
                  </div>

                  <div className="suggestion-actions">
                    <button className="view-details-btn">
                      View Full Details
                    </button>
                    <button className="add-to-list-btn">
                      Add to My List
                    </button>
                  </div>

                  <div className="verification-note">
                    <FaShieldAlt />
                    <small>Blockchain verification available for this product</small>
                  </div>
                </div>
              ))}
            </div>

            <div className="safety-first-banner">
              <FaExclamationTriangle />
              <div>
                <h5>Safety First</h5>
                <p>
                  These suggestions are generated based on your health profile and AI analysis. 
                  Always verify medicines using our scanner and consult with a healthcare provider 
                  before use. Your safety is our priority.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Doctor Consultation Modal */}
        {showDoctorMeet && (
          <div className="doctor-meet-modal">
            <div className="modal-content">
              <div className="modal-header">
                <h3><FaVideo /> Virtual Doctor Consultation</h3>
                <button className="close-modal" onClick={() => setShowDoctorMeet(false)}>
                  ×
                </button>
              </div>

              <div className="consultation-info">
                <div className="doctor-profile">
                  <div className="doctor-avatar-large">
                    <FaUserMd />
                  </div>
                  <div>
                    <h4>Dr. Sarah Chen</h4>
                    <p className="specialization">Integrative Medicine Specialist</p>
                    <div className="doctor-stats">
                      <span>⭐ 4.9 Rating</span>
                      <span>👨‍⚕️ 15+ Years Experience</span>
                      <span>🌿 Herbal Medicine Expert</span>
                    </div>
                  </div>
                </div>

                <div className="consultation-details">
                  <h5>Appointment Details</h5>
                  <div className="details-grid">
                    <div className="detail-item">
                      <strong>Date:</strong>
                      <span>{appointments[0]?.date || '2024-03-15'}</span>
                    </div>
                    <div className="detail-item">
                      <strong>Time:</strong>
                      <span>{appointments[0]?.time || '14:30'}</span>
                    </div>
                    <div className="detail-item">
                      <strong>Duration:</strong>
                      <span>45 minutes</span>
                    </div>
                    <div className="detail-item">
                      <strong>Platform:</strong>
                      <span>Secure VirtuMeet</span>
                    </div>
                  </div>
                </div>

                <div className="consultation-prep">
                  <h5>Preparation for Consultation</h5>
                  <ul>
                    <li>Have your recent medical reports ready</li>
                    <li>List your current medications</li>
                    <li>Prepare specific questions about your condition</li>
                    <li>Ensure good internet connection and privacy</li>
                  </ul>
                </div>

                <div className="consultation-actions">
                  <button className="join-now-btn">
                    <FaVideo /> Join Consultation Now
                  </button>
                  <button className="reschedule-btn">
                    Reschedule Appointment
                  </button>
                  <button className="cancel-btn" onClick={() => setShowDoctorMeet(false)}>
                    Cancel
                  </button>
                </div>

                <div className="privacy-notice">
                  <FaLock />
                  <p>
                    Your consultation is protected by end-to-end encryption. 
                    All discussions are confidential and comply with healthcare privacy regulations.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="dashboard-footer">
        <div className="footer-content">
          <div className="footer-section">
            <h5>VirtuHerbChain</h5>
            <p>Blockchain-verified medicine with AI-powered healthcare analysis</p>
          </div>
          <div className="footer-section">
            <h5>Security</h5>
            <div className="security-badges">
              <span className="badge">HIPAA Compliant</span>
              <span className="badge">Blockchain Secured</span>
              <span className="badge">Data Encrypted</span>
            </div>
          </div>
          <div className="footer-section">
            <p className="copyright">© 2024 VirtuHerbChain. All rights reserved.</p>
            <p className="disclaimer">
              This platform provides AI-assisted healthcare information. 
              It is not a substitute for professional medical advice.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default VirtuHerbChain;