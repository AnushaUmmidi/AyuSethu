import React, { useState, useEffect, useRef } from 'react';
import {BellRing, Sprout,Scythe, Leaf } from "lucide-react";

import "../styles/Farmerdashboard.css";

// Mock user data
const USER_DATA = {
  name: "Ramesh Kumar",
  email: "ramesh.kumar@farmer.com",
  farmerId: "FARM-2024-AP-1024",
  phone: "+91 98765 43210",
  location: "Andhra Pradesh, India",
  farmSize: "12.5 acres",
  registrationDate: "2023-06-15",
  verified: true,
  complianceScore: 95,
  profileImg: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ramesh&backgroundType=gradientLinear&backgroundColor=b6e3f4,c0aede,d1d4f9"
};

const MOCK_COLLECTOR_UPDATES = [
  {
    id: 1,
    cropName: "Ashwagandha (Batch A)",
    collectorName: "Suresh Patil",
    pickupDate: "2025-12-10",
    status: "Scheduled",
    vehicleNumber: "AP-02-CD-1234"
  }
];

const MOCK_ACTIVE_CROPS = [
  {
    id: 101,
    species: "Ashwagandha",
    plantedDate: "2025-01-15",
    expectedHarvest: "2025-12-01",
    stage: 3,
    status: "Ready for Harvest",
    updates: 2
  },
  {
    id: 102,
    species: "Tulsi (Holy Basil)",
    plantedDate: "2025-11-20",
    expectedHarvest: "2026-02-20",
    stage: 1,
    status: "Growing",
    updates: 0
  }
];

// --- Reusable Components ---
const Card = ({ children, className = "", onClick }) => (
  <div className={`card ${className}`} onClick={onClick}>
    {children}
  </div>
);

const StatusBadge = ({ status }) => {
  let className = "status-badge ";
  if (status === "Ready for Harvest") className += "ready";
  else if (status === "Scheduled") className += "scheduled";
  else if (status === "Growing") className += "growing";
  
  return <span className={className}>{status}</span>;
};

// --- Main App Component ---
function FarmerDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleProfileDropdown = () => {
    setShowProfileDropdown(!showProfileDropdown);
  };

  const navTo = (tab) => {
    setActiveTab(tab);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.profile-container')) {
        setShowProfileDropdown(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardHome navTo={navTo} />;
      case 'register':
        return <RegisterCropForm navTo={navTo} />;
      case 'updates':
        return <CropUpdates navTo={navTo} />;
      case 'harvest':
        return <HarvestRequest navTo={navTo} />;
      default:
        return <DashboardHome navTo={navTo} />;
    }
  };

  return (
    <div className="app-container">
      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="logo" onClick={() => navTo('dashboard')}>
            <div className="logo-icon float-animation">
              <i className="fas fa-leaf"></i>
            </div>
            <div className="logo-text">
              <h1>AyuSethu</h1>
              <span>Farmer Portal</span>
            </div>
          </div>

          <div className="profile-container">
            {/* Notification Bell */}
            <button className="notification-btn">
              <BellRing className="fas fa-bell"/>
              <span className="badge-count">2</span>
            </button>

            {/* Profile Button */}
            <button className="profile-btn" onClick={toggleProfileDropdown}>
              <img src={USER_DATA.profileImg} alt="Profile" className="profile-img" />
              <span>{USER_DATA.name}</span>
              <i className={`fas fa-chevron-${showProfileDropdown ? 'up' : 'down'}`}></i>
            </button>

            {/* Mobile Menu Button */}
            <button className="mobile-menu-btn" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              <i className={isMobileMenuOpen ? "fas fa-times" : "fas fa-bars"}></i>
            </button>

            {/* Profile Dropdown */}
            <div className={`profile-dropdown ${showProfileDropdown ? 'active' : ''}`}>
              <div className="dropdown-header">
                <img src={USER_DATA.profileImg} alt="Profile" className="dropdown-profile-img" />
                <div className="dropdown-info">
                  <h3>{USER_DATA.name}</h3>
                  <p>{USER_DATA.location}</p>
                </div>
              </div>
              <div className="dropdown-content">
                <button className="dropdown-item">
                  <i className="fas fa-id-card"></i>
                  <div>
                    <strong>Farmer ID</strong>
                    <div style={{ fontSize: '0.8rem', color: 'var(--gray-600)' }}>{USER_DATA.farmerId}</div>
                  </div>
                </button>
                <button className="dropdown-item">
                  <i className="fas fa-chart-line"></i>
                  <div>
                    <strong>Compliance Score</strong>
                    <div style={{ fontSize: '0.8rem', color: 'var(--gray-600)' }}>{USER_DATA.complianceScore}%</div>
                  </div>
                </button>
              </div>
              <div className="dropdown-footer">
                <button className="btn btn-secondary" style={{ fontSize: '0.875rem', padding: '0 1rem', height: '36px' }}>
                  Edit
                </button>
                <button className="btn btn-primary" style={{ fontSize: '0.875rem', padding: '0 1rem', height: '36px' }}>
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="main-content fade-in">
        {renderContent()}
      </main>
    </div>
  );
}

// --- Dashboard Component ---
function DashboardHome({ navTo }) {
  return (
    <div className="fade-in">
      {/* Quick Actions */}
      <div className="glass-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <div>
            <h2 style={{ color: 'var(--moss)', fontSize: '1.75rem', marginBottom: '0.25rem' }}>Quick Actions</h2>
            <p style={{ color: 'var(--gray-600)' }}>Manage your crops with these essential tools</p>
          </div>
        </div>

        <div className="action-grid">
          <button className="action-card moss" onClick={() => navTo('register')}>
            <div className="action-icon">
              <i className="fas fa-seedling"></i>
            </div>
            <h3>Register New Crop</h3>
            <p>Notify authorities 7 days prior to planting.</p>
            <div className="action-link">
              Get Started <i className="fas fa-arrow-right"></i>
            </div>
          </button>

          <button className="action-card blue" onClick={() => navTo('updates')}>
            <div className="action-icon">
              <i className="fas fa-camera"></i>
            </div>
            <h3>Update Growth</h3>
            <p>Upload photos & geotags for compliance.</p>
            <div className="action-link">
              Update Now <i className="fas fa-arrow-right"></i>
            </div>
          </button>

          <button className="action-card orange" onClick={() => navTo('harvest')}>
            <div className="action-icon">
              <i className="fas fa-truck"></i>
            </div>
            <h3>Harvest Request</h3>
            <p>Request a collector for ready crops.</p>
            <div className="action-link">
              Request <i className="fas fa-arrow-right"></i>
            </div>
          </button>
        </div>
      </div>

      {/* Grid: Collector + Active Crops */}
      <div className="dashboard-grid">
        {/* Collector Updates */}
        <div>
          <h3 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.25rem' }}>
            <i className="fas fa-truck" style={{ color: 'var(--moss)' }}></i> Collector Arrivals
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {MOCK_COLLECTOR_UPDATES.map((update) => (
              <Card key={update.id} className="collector-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <StatusBadge status={update.status} />
                  <span style={{ color: 'var(--gray-500)', fontSize: '0.9rem' }}>{update.pickupDate}</span>
                </div>
                <h4 style={{ fontSize: '1.1rem', marginTop: '0.5rem', color: 'var(--gray-900)' }}>{update.cropName}</h4>
                <div style={{ fontSize: '0.9rem', color: 'var(--gray-600)', marginTop: '0.5rem' }}>
                  <div>
                    Collector: <strong>{update.collectorName}</strong>
                  </div>
                  <div>
                    Vehicle: <code style={{ background: 'var(--gray-100)', padding: '0.125rem 0.375rem', borderRadius: '4px' }}>{update.vehicleNumber}</code>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Active Crops */}
        <div>
          <h3 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.25rem' }}>
            <i className="fas fa-leaf" style={{ color: 'var(--moss)' }}></i> Active Crops
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {MOCK_ACTIVE_CROPS.map((crop) => (
              <div key={crop.id} className="card" onClick={() => navTo('updates')} style={{ cursor: 'pointer' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <h4 style={{ fontSize: '1.1rem', color: 'var(--gray-900)' }}>{crop.species}</h4>
                  <StatusBadge status={crop.status} />
                </div>
                <div style={{ fontSize: '0.9rem', color: 'var(--gray-500)', marginBottom: '0.5rem' }}>
                  Stage {crop.updates + 1}/3
                </div>
                <div style={{ background: 'var(--gray-100)', height: '8px', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ width: `${((crop.updates + 0.5) / 3) * 100}%`, background: 'var(--moss)', height: '100%' }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// --- Register Form Component ---
function RegisterCropForm({ navTo }) {
  const [formData, setFormData] = useState({
    species: '',
    startDate: '',
    harvestDate: '',
    farmId: USER_DATA.farmerId,
    coords: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Registration submitted successfully!');
    navTo('dashboard');
  };

  const getCoordinates = () => {
    setFormData({ ...formData, coords: 'Getting location...' });
    setTimeout(() => {
      setFormData({ ...formData, coords: '16.5062° N, 80.6480° E' });
    }, 800);
  };

  return (
    <div className="form-container fade-in">
      <button onClick={() => navTo('dashboard')} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--gray-500)', marginBottom: '1rem', border: 'none', background: 'none', cursor: 'pointer' }}>
        <i className="fas fa-arrow-left"></i> Back
      </button>
      <h2 style={{ color: 'var(--moss)', fontSize: '2rem', marginBottom: '0.5rem' }}>Register New Crop</h2>
      <p style={{ color: 'var(--gray-600)', marginBottom: '2rem' }}>Required: Inform authority 7 days prior to planting.</p>

      <Card>
        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group">
              <label className="form-label">Farm ID</label>
              <input className="form-input" value={formData.farmId} readOnly style={{ background: 'var(--gray-100)', color: 'var(--gray-500)', cursor: 'not-allowed' }} />
            </div>
            <div className="form-group">
              <label className="form-label">Species</label>
              <select
                className="form-select"
                value={formData.species}
                onChange={(e) => setFormData({ ...formData, species: e.target.value })}
                required
              >
                <option value="">Select...</option>
                <option value="Ashwagandha">Ashwagandha</option>
                <option value="Tulsi">Tulsi</option>
                <option value="Aloe Vera">Aloe Vera</option>
                <option value="Brahmi">Brahmi</option>
              </select>
            </div>
          </div>

          <div className="form-grid">
            <div className="form-group">
              <label className="form-label">Planting Date</label>
              <input
                type="date"
                className="form-input"
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Exp. Harvest</label>
              <input
                type="date"
                className="form-input"
                value={formData.harvestDate}
                onChange={(e) => setFormData({ ...formData, harvestDate: e.target.value })}
                required
              />
            </div>
          </div>

          <div style={{ marginBottom: '2rem', padding: '1rem', background: 'var(--blue-50)', borderRadius: '12px', border: '1px solid #dbeafe' }}>
            <label className="form-label" style={{ color: 'var(--blue-600)' }}>
              Geolocation
            </label>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <input
                className="form-input"
                placeholder="Waiting for GPS..."
                value={formData.coords}
                readOnly
                style={{ flex: 1 }}
              />
              <button type="button" className="btn btn-primary" onClick={getCoordinates}>
                <i className="fas fa-map-marker-alt"></i> Get
              </button>
            </div>
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
            Submit Registration
          </button>
        </form>
      </Card>
    </div>
  );
}

// --- Updates Component ---
// --- Updates Component with Full Upload Features ---
function CropUpdates({ navTo }) {
  const [selectedCrop, setSelectedCrop] = useState(MOCK_ACTIVE_CROPS[0]);
  const [stagePhotos, setStagePhotos] = useState({ 1: null, 2: null, 3: null });
  const [voiceNote, setVoiceNote] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [observations, setObservations] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  
  const recordingTimerRef = useRef(null);

  // Handle photo upload
  const handlePhotoUpload = (e, stage) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        alert('File size should be less than 5MB');
        return;
      }
      
      if (!['image/jpeg', 'image/jpg', 'image/png'].includes(file.type)) {
        alert('Please upload only JPG or PNG images');
        return;
      }
      
      // Create preview URL
      const imageUrl = URL.createObjectURL(file);
      setStagePhotos(prev => ({
        ...prev,
        [stage]: { file, preview: imageUrl, name: file.name, size: file.size }
      }));
    }
  };

  // Start voice recording
  const startRecording = () => {
    setIsRecording(true);
    setRecordingTime(0);
    
    // Simulate recording timer
    recordingTimerRef.current = setInterval(() => {
      setRecordingTime(prev => prev + 1);
    }, 1000);
    
    // In a real app, you would use the Web Audio API here
    setTimeout(() => {
      setVoiceNote({
        name: `voice_note_${Date.now()}.wav`,
        duration: '30s',
        size: '2.4 MB',
        timestamp: new Date().toLocaleTimeString()
      });
    }, 2000);
  };

  // Stop voice recording
  const stopRecording = () => {
    setIsRecording(false);
    if (recordingTimerRef.current) {
      clearInterval(recordingTimerRef.current);
    }
  };

  // Format recording time
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Remove photo
  const removePhoto = (stage) => {
    if (stagePhotos[stage] && stagePhotos[stage].preview) {
      URL.revokeObjectURL(stagePhotos[stage].preview);
    }
    setStagePhotos(prev => ({
      ...prev,
      [stage]: null
    }));
  };

  // Remove voice note
  const removeVoiceNote = () => {
    setVoiceNote(null);
  };

  // Simulate upload process
  const handleSubmitUpdate = async () => {
    if (!selectedCrop) {
      alert('Please select a crop first');
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsUploading(false);
            alert('✅ Update submitted successfully!');
            // Reset form
            setStagePhotos({ 1: null, 2: null, 3: null });
            setVoiceNote(null);
            setObservations('');
            setUploadProgress(0);
          }, 500);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      // Clean up object URLs
      Object.values(stagePhotos).forEach(photo => {
        if (photo && photo.preview) {
          URL.revokeObjectURL(photo.preview);
        }
      });
      
      // Clear recording timer
      if (recordingTimerRef.current) {
        clearInterval(recordingTimerRef.current);
      }
    };
  }, []);

  return (
    <div className="fade-in">
      <button onClick={() => navTo('dashboard')} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--gray-500)', marginBottom: '1rem', border: 'none', background: 'none', cursor: 'pointer' }}>
        <i className="fas fa-arrow-left"></i> Back
      </button>
      <h2 style={{ color: 'var(--moss)', fontSize: '2rem', marginBottom: '0.5rem' }}>Crop Growth Updates</h2>
      <p style={{ color: 'var(--gray-600)', marginBottom: '2rem' }}>Provide regular photo and audio evidence to maintain your compliance score.</p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 3fr', gap: '2rem' }}>
        {/* Left Panel - Crop Selection */}
        <div>
          <Card style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ color: 'var(--gray-800)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <i className="fas fa-seedling" style={{ color: 'var(--moss)' }}></i>
              Select Crop
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {MOCK_ACTIVE_CROPS.map(crop => (
                <button
                  key={crop.id}
                  onClick={() => setSelectedCrop(crop)}
                  style={{
                    padding: '1rem',
                    borderRadius: '10px',
                    border: `2px solid ${selectedCrop?.id === crop.id ? 'var(--moss)' : 'var(--gray-200)'}`,
                    background: selectedCrop?.id === crop.id ? 'var(--moss-bg)' : 'white',
                    textAlign: 'left',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontWeight: '600', color: 'var(--gray-800)' }}>{crop.species}</span>
                    {selectedCrop?.id === crop.id && (
                      <i className="fas fa-check-circle" style={{ color: 'var(--moss)' }}></i>
                    )}
                  </div>
                  <div style={{ fontSize: '0.875rem', color: 'var(--gray-500)', marginTop: '0.25rem' }}>
                    Stage {crop.updates + 1}/3 • {crop.status}
                  </div>
                </button>
              ))}
            </div>
          </Card>

          {/* Current Stage Progress */}
          <Card>
            <h3 style={{ color: 'var(--gray-800)', marginBottom: '1rem' }}>Current Progress</h3>
            {selectedCrop && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '0.875rem', color: 'var(--gray-600)' }}>Stage {selectedCrop.updates + 1}</span>
                  <span style={{ fontSize: '0.875rem', fontWeight: '600', color: 'var(--moss)' }}>
                    {Math.round(((selectedCrop.updates + 0.5) / 3) * 100)}%
                  </span>
                </div>
                <div style={{ background: 'var(--gray-100)', height: '8px', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ width: `${((selectedCrop.updates + 0.5) / 3) * 100}%`, background: 'var(--moss)', height: '100%' }}></div>
                </div>
                
                <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid var(--gray-200)' }}>
                  <div style={{ display: 'flex', gap: '1rem', fontSize: '0.875rem', color: 'var(--gray-600)' }}>
                    <div>
                      <i className="fas fa-calendar" style={{ marginRight: '0.5rem' }}></i>
                      Planted: {selectedCrop.plantedDate}
                    </div>
                    <div>
                      <i className="fas fa-clock" style={{ marginRight: '0.5rem' }}></i>
                      Harvest: {selectedCrop.expectedHarvest}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </Card>
        </div>

        {/* Right Panel - Upload Interface */}
        <Card>
          {selectedCrop ? (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <div>
                  <h3 style={{ color: 'var(--gray-800)', fontSize: '1.5rem' }}>
                    Update for <span style={{ color: 'var(--moss)' }}>{selectedCrop.species}</span>
                  </h3>
                  <p style={{ color: 'var(--gray-600)', fontSize: '0.875rem' }}>
                    Submitting evidence for Stage {selectedCrop.updates + 1}
                  </p>
                </div>
                <StatusBadge status={selectedCrop.status} />
              </div>

              {/* Stage Indicators */}
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem', position: 'relative' }}>
                <div style={{
                  position: 'absolute',
                  top: '20px',
                  left: '0',
                  right: '0',
                  height: '3px',
                  background: 'var(--gray-200)',
                  zIndex: 1
                }}></div>
                {[1, 2, 3].map(stage => (
                  <div key={stage} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 2 }}>
                    <div style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      background: stage <= selectedCrop.updates + 1 ? 'var(--moss)' : 'var(--gray-200)',
                      color: stage <= selectedCrop.updates + 1 ? 'white' : 'var(--gray-400)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 'bold',
                      marginBottom: '0.5rem',
                      border: '3px solid white',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                    }}>
                      {stage}
                    </div>
                    <span style={{
                      fontSize: '0.75rem',
                      fontWeight: '600',
                      color: stage <= selectedCrop.updates + 1 ? 'var(--moss)' : 'var(--gray-400)'
                    }}>
                      Stage {stage}
                    </span>
                  </div>
                ))}
              </div>

              {/* Photo Upload Section */}
              <div style={{ marginBottom: '2rem' }}>
                <h4 style={{ color: 'var(--gray-800)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <i className="fas fa-camera" style={{ color: 'var(--moss)' }}></i>
                  1. Upload Stage Photos
                </h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
                  {[1, 2, 3].map(stage => (
                    <div key={stage} style={{
                      border: '2px dashed var(--gray-300)',
                      borderRadius: '12px',
                      padding: '1.5rem',
                      textAlign: 'center',
                      transition: 'all 0.3s ease',
                      background: stagePhotos[stage] ? 'var(--moss-bg)' : 'var(--gray-50)',
                      borderColor: stagePhotos[stage] ? 'var(--moss-border)' : 'var(--gray-300)',
                      cursor: 'pointer',
                      minHeight: '200px'
                    }}
                    onClick={() => {
                      if (!stagePhotos[stage]) {
                        const input = document.createElement('input');
                        input.type = 'file';
                        input.accept = 'image/jpeg,image/jpg,image/png';
                        input.onchange = (e) => handlePhotoUpload(e, stage);
                        input.click();
                      }
                    }}
                    >
                      {stagePhotos[stage] ? (
                        <div>
                          <img 
                            src={stagePhotos[stage].preview} 
                            alt={`Stage ${stage}`}
                            style={{
                              width: '100%',
                              height: '120px',
                              objectFit: 'cover',
                              borderRadius: '8px',
                              marginBottom: '0.75rem'
                            }}
                          />
                          <div style={{ fontSize: '0.75rem', color: 'var(--gray-600)' }}>
                            {stagePhotos[stage].name}
                          </div>
                          <div style={{ fontSize: '0.625rem', color: 'var(--gray-500)', marginTop: '0.25rem' }}>
                            {(stagePhotos[stage].size / 1024 / 1024).toFixed(2)} MB
                          </div>
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              removePhoto(stage);
                            }}
                            style={{
                              marginTop: '0.75rem',
                              background: 'var(--red-50)',
                              color: 'var(--red-600)',
                              border: '1px solid var(--red-200)',
                              padding: '0.25rem 0.75rem',
                              borderRadius: '6px',
                              fontSize: '0.75rem',
                              cursor: 'pointer'
                            }}
                          >
                            <i className="fas fa-trash" style={{ marginRight: '0.25rem' }}></i>
                            Remove
                          </button>
                        </div>
                      ) : (
                        <>
                          <div style={{
                            width: '50px',
                            height: '50px',
                            background: 'var(--gray-200)',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: '0 auto 1rem',
                            color: 'var(--gray-400)'
                          }}>
                            <i className="fas fa-camera"></i>
                          </div>
                          <div style={{ fontSize: '0.875rem', color: 'var(--gray-600)', marginBottom: '0.5rem' }}>
                            Stage {stage}
                          </div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--gray-500)' }}>
                            Click to upload
                          </div>
                        </>
                      )}
                    </div>
                  ))}
                </div>
                <div style={{
                  background: 'var(--blue-50)',
                  padding: '1rem',
                  borderRadius: '8px',
                  marginTop: '1rem',
                  fontSize: '0.875rem',
                  color: 'var(--blue-600)',
                  border: '1px solid var(--blue-100)'
                }}>
                  <i className="fas fa-info-circle" style={{ marginRight: '0.5rem' }}></i>
                  Maximum file size: 5MB per image. Supported formats: JPG, PNG
                </div>
              </div>

              {/* Voice Note Section */}
              <div style={{ marginBottom: '2rem' }}>
                <h4 style={{ color: 'var(--gray-800)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <i className="fas fa-microphone" style={{ color: 'var(--moss)' }}></i>
                  2. Voice Observation (Optional)
                </h4>
                {voiceNote ? (
                  <div style={{
                    background: 'var(--green-50)',
                    border: '1px solid var(--green-100)',
                    borderRadius: '12px',
                    padding: '1.5rem'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                          <div style={{
                            width: '50px',
                            height: '50px',
                            background: 'var(--moss)',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white'
                          }}>
                            <i className="fas fa-microphone"></i>
                          </div>
                          <div>
                            <div style={{ fontWeight: '600', color: 'var(--gray-800)' }}>
                              {voiceNote.name}
                            </div>
                            <div style={{ fontSize: '0.875rem', color: 'var(--gray-600)' }}>
                              Duration: {voiceNote.duration} • Size: {voiceNote.size}
                            </div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--gray-500)', marginTop: '0.25rem' }}>
                              Recorded at: {voiceNote.timestamp}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div style={{ display: 'flex', gap: '1rem' }}>
                        <button style={{
                          background: 'var(--gray-100)',
                          color: 'var(--gray-700)',
                          padding: '0.5rem 1rem',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem'
                        }}>
                          <i className="fas fa-play"></i> Play
                        </button>
                        <button 
                          onClick={removeVoiceNote}
                          style={{
                            background: 'var(--red-50)',
                            color: 'var(--red-600)',
                            padding: '0.5rem 1rem',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem'
                          }}
                        >
                          <i className="fas fa-trash"></i> Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div style={{
                    border: '2px dashed var(--gray-300)',
                    borderRadius: '12px',
                    padding: '2rem',
                    textAlign: 'center',
                    background: isRecording ? 'var(--red-50)' : 'var(--gray-50)',
                    borderColor: isRecording ? 'var(--red-200)' : 'var(--gray-300)'
                  }}>
                    {isRecording ? (
                      <div>
                        <div style={{
                          width: '60px',
                          height: '60px',
                          background: 'var(--red-100)',
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          margin: '0 auto 1.5rem',
                          color: 'var(--red-600)'
                        }}>
                          <i className="fas fa-microphone"></i>
                        </div>
                        <div style={{
                          fontSize: '2rem',
                          fontWeight: 'bold',
                          color: 'var(--red-600)',
                          marginBottom: '1rem'
                        }}>
                          {formatTime(recordingTime)}
                        </div>
                        <div style={{ color: 'var(--gray-600)', marginBottom: '1.5rem' }}>
                          Recording in progress...
                        </div>
                        <button 
                          onClick={stopRecording}
                          style={{
                            background: 'var(--red-600)',
                            color: 'white',
                            padding: '0.75rem 2rem',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            margin: '0 auto'
                          }}
                        >
                          <i className="fas fa-stop"></i> Stop Recording
                        </button>
                      </div>
                    ) : (
                      <>
                        <div style={{
                          width: '60px',
                          height: '60px',
                          background: 'var(--moss)',
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          margin: '0 auto 1.5rem',
                          color: 'white'
                        }}>
                          <i className="fas fa-microphone"></i>
                        </div>
                        <div style={{ fontSize: '1.125rem', fontWeight: '600', color: 'var(--gray-800)', marginBottom: '0.5rem' }}>
                          Record Voice Note
                        </div>
                        <div style={{ color: 'var(--gray-600)', marginBottom: '1.5rem' }}>
                          Share observations about pests, water levels, or growth issues
                        </div>
                        <button 
                          onClick={startRecording}
                          style={{
                            background: 'linear-gradient(135deg, var(--moss) 0%, var(--moss-dark) 100%)',
                            color: 'white',
                            padding: '0.75rem 2rem',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            margin: '0 auto'
                          }}
                        >
                          <i className="fas fa-microphone"></i> Start Recording
                        </button>
                      </>
                    )}
                  </div>
                )}
              </div>

              {/* Observations Text Area */}
              <div style={{ marginBottom: '2rem' }}>
                <h4 style={{ color: 'var(--gray-800)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <i className="fas fa-edit" style={{ color: 'var(--moss)' }}></i>
                  3. Written Observations (Optional)
                </h4>
                <textarea
                  value={observations}
                  onChange={(e) => setObservations(e.target.value)}
                  placeholder="Add any additional notes about crop health, weather conditions, fertilizer usage, or other observations..."
                  style={{
                    width: '100%',
                    minHeight: '120px',
                    padding: '1rem',
                    border: '1px solid var(--gray-300)',
                    borderRadius: '12px',
                    fontSize: '0.875rem',
                    fontFamily: 'inherit',
                    resize: 'vertical',
                    transition: 'all 0.3s ease'
                  }}
                  onFocus={(e) => e.target.style.borderColor = 'var(--moss)'}
                  onBlur={(e) => e.target.style.borderColor = 'var(--gray-300)'}
                />
              </div>

              {/* Location Verification */}
              <div style={{ marginBottom: '2rem' }}>
                <h4 style={{ color: 'var(--gray-800)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <i className="fas fa-map-marker-alt" style={{ color: 'var(--moss)' }}></i>
                  4. Location Verification
                </h4>
                <div style={{
                  background: 'var(--green-50)',
                  border: '1px solid var(--green-100)',
                  borderRadius: '12px',
                  padding: '1.5rem'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{
                      width: '50px',
                      height: '50px',
                      background: 'var(--green-100)',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--green-600)'
                    }}>
                      <i className="fas fa-check-circle"></i>
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: '600', color: 'var(--gray-800)' }}>
                        Location Verified
                      </div>
                      <div style={{ fontSize: '0.875rem', color: 'var(--gray-600)' }}>
                        GPS coordinates: 16.5062° N, 80.6480° E
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--green-600)', marginTop: '0.25rem' }}>
                        <i className="fas fa-satellite"></i> Strong GPS signal • Within 5m of farm boundaries
                      </div>
                    </div>
                    <button style={{
                      background: 'var(--blue-50)',
                      color: 'var(--blue-600)',
                      padding: '0.5rem 1rem',
                      borderRadius: '6px',
                      border: '1px solid var(--blue-100)',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}>
                      <i className="fas fa-sync-alt"></i> Refresh
                    </button>
                  </div>
                </div>
              </div>

              {/* Upload Progress */}
              {isUploading && (
                <div style={{ marginBottom: '2rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span style={{ color: 'var(--gray-800)', fontWeight: '600' }}>Uploading...</span>
                    <span style={{ color: 'var(--moss)', fontWeight: '600' }}>{uploadProgress}%</span>
                  </div>
                  <div style={{ background: 'var(--gray-100)', height: '8px', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ width: `${uploadProgress}%`, background: 'var(--moss)', height: '100%' }}></div>
                  </div>
                  <div style={{
                    fontSize: '0.875rem',
                    color: 'var(--gray-600)',
                    marginTop: '0.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}>
                    <i className="fas fa-spinner fa-spin"></i>
                    Processing images and voice note...
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <button 
                onClick={handleSubmitUpdate}
                disabled={isUploading}
                className="btn btn-primary"
                style={{
                  width: '100%',
                  padding: '1.25rem',
                  fontSize: '1.125rem',
                  opacity: isUploading ? 0.7 : 1,
                  cursor: isUploading ? 'not-allowed' : 'pointer'
                }}
              >
                {isUploading ? (
                  <>
                    <i className="fas fa-spinner fa-spin"></i> Submitting Update...
                  </>
                ) : (
                  <>
                    <i className="fas fa-cloud-upload-alt"></i> Submit Stage Update
                  </>
                )}
              </button>

              {/* Requirements Info */}
              <div style={{
                background: 'var(--orange-50)',
                border: '1px solid var(--orange-100)',
                borderRadius: '12px',
                padding: '1rem',
                marginTop: '1.5rem',
                fontSize: '0.875rem',
                color: 'var(--orange-700)'
              }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                  <i className="fas fa-exclamation-circle" style={{ marginTop: '0.125rem' }}></i>
                  <div>
                    <strong>Compliance Requirements:</strong> At least one photo per stage is required. 
                    Regular updates (every 15 days) help maintain 100% compliance score and ensure 
                    faster payment processing.
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '3rem 2rem' }}>
              <div style={{
                background: 'var(--gray-100)',
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.5rem',
                color: 'var(--gray-400)'
              }}>
                <i className="fas fa-seedling" style={{ fontSize: '2rem' }}></i>
              </div>
              <h3 style={{ color: 'var(--gray-800)', marginBottom: '0.5rem' }}>No Crop Selected</h3>
              <p style={{ color: 'var(--gray-600)', marginBottom: '1.5rem' }}>
                Please select a crop from the left panel to start providing updates.
              </p>
              <button 
                onClick={() => setSelectedCrop(MOCK_ACTIVE_CROPS[0])}
                style={{
                  background: 'var(--moss)',
                  color: 'white',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  margin: '0 auto'
                }}
              >
                <i className="fas fa-seedling"></i> Select Ashwagandha
              </button>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}

// --- Harvest Component ---
function HarvestRequest({ navTo }) {
  return (
    <div className="fade-in">
      <button onClick={() => navTo('dashboard')} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--gray-500)', marginBottom: '1rem', border: 'none', background: 'none', cursor: 'pointer' }}>
        <i className="fas fa-arrow-left"></i> Back
      </button>
      <h2 style={{ color: 'var(--moss)', fontSize: '2rem', marginBottom: '1rem' }}>Harvest Request</h2>
      <Card>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem', padding: '1rem', background: 'var(--orange-100)', borderRadius: '12px', color: 'var(--orange-600)' }}>
          <i className="fas fa-clock" style={{ fontSize: '1.5rem' }}></i>
          <div>
            <strong>Ashwagandha - Ready</strong>
            <div>Est Yield: 500kg</div>
          </div>
        </div>
        <button className="btn btn-primary" style={{ width: '100%' }}>
          Request Collection
        </button>
      </Card>
    </div>
  );
}
function App() {
  return <FarmerDashboard />;
}
export default App;
