import React, { useState, useEffect } from 'react';
import '../styles/Manufacturer.css';

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('composition');
  const [selectedBatch, setSelectedBatch] = useState(2);
  const [barcodeData, setBarcodeData] = useState('VHC-MIX-2024-001');
  const [productName, setProductName] = useState('Immunity Boost Syrup');
  const [batchId, setBatchId] = useState('BTH-2024-001');
  const [barcodeType, setBarcodeType] = useState('CODE128');
  const [formulationType, setFormulationType] = useState('multiHerb');
  const [herbs, setHerbs] = useState([
    {
      id: 1,
      name: 'Tulsi (Holy Basil)',
      farm: 'FARM-0456',
      batch: 'BTH-TUL-001',
      percentage: 40,
      quantity: 20,
      purity: '98.5% (Premium)',
      color: 'herb-color-1'
    },
    {
      id: 2,
      name: 'Ginger',
      farm: 'FARM-0789',
      batch: 'BTH-GIN-002',
      percentage: 25,
      quantity: 12.5,
      purity: '97.2% (Premium)',
      color: 'herb-color-2'
    },
    {
      id: 3,
      name: 'Turmeric',
      farm: 'FARM-0123',
      batch: 'BTH-TUR-003',
      percentage: 20,
      quantity: 10,
      purity: '96.8% (Premium)',
      color: 'herb-color-3'
    }
  ]);
  const [isDropdownOpen, setIsDropdownOpen] = useState({
    barcode: false,
    notification: false,
    profile: false
  });
  const [showModal, setShowModal] = useState(false);
  const [modalConfig, setModalConfig] = useState({
    title: '',
    content: '',
    type: 'info',
    confirmText: 'OK',
    cancelText: null,
    onConfirm: null
  });

  const batches = [
    {
      id: 1,
      batchId: 'BTH-2025-002',
      name: 'Organic Turmeric Powder',
      status: 'Processing',
      type: 'single',
      composition: [{ name: 'Turmeric', percentage: 100 }],
      totalQuantity: '40 kg',
      farm: 'Farm-0456',
      statusType: 'inprogress'
    },
    {
      id: 2,
      batchId: 'BTH-2024-001',
      name: 'Immunity Boost Syrup',
      status: 'Ready for QC',
      type: 'multi',
      composition: [
        { name: 'Tulsi', percentage: 40 },
        { name: 'Ginger', percentage: 25 },
        { name: 'Turmeric', percentage: 20 },
        { name: 'Other', percentage: 15 }
      ],
      totalQuantity: '50 kg',
      farm: '3 farms combined',
      statusType: 'pending'
    },
    {
      id: 3,
      batchId: 'BTH-2024-998',
      name: 'Digestive Health Capsules',
      status: 'Processing',
      type: 'multi',
      composition: [
        { name: 'Ginger', percentage: 33 },
        { name: 'Fennel', percentage: 25 },
        { name: 'Cumin', percentage: 20 },
        { name: 'Mint', percentage: 22 }
      ],
      totalQuantity: '35 kg',
      farm: 'Farm-0789',
      statusType: 'inprogress'
    }
  ];

  const qualityTests = [
    {
      id: 1,
      name: 'Microbiological Analysis',
      description: 'Total plate count, yeast & mold, pathogens',
      status: 'approved',
      result: 'Within Limits',
      date: '2024-01-15',
      lab: 'Quality Lab A',
      technician: 'Dr. Sharma'
    },
    {
      id: 2,
      name: 'Heavy Metal Testing',
      description: 'Lead, arsenic, mercury, cadmium levels',
      status: 'approved',
      result: 'Below Threshold',
      date: '2024-01-16',
      lab: 'Metals Lab B',
      technician: 'Dr. Patel'
    },
    {
      id: 3,
      name: 'Active Compound Analysis',
      description: 'Curcumin, gingerol, eugenol content',
      status: 'approved',
      result: 'Optimal Levels',
      date: '2024-01-17',
      lab: 'Chemistry Lab C',
      technician: 'Dr. Reddy'
    },
    {
      id: 4,
      name: 'Pesticide Residue Test',
      description: 'Organophosphates, carbamates, pyrethroids',
      status: 'pending',
      result: 'Sample Submitted',
      date: 'Expected: 2024-01-20',
      lab: 'Residue Lab D',
      technician: 'Priority: High'
    },
    {
      id: 5,
      name: 'Stability Testing',
      description: 'Shelf life, degradation, packaging integrity',
      status: 'pending',
      result: 'Scheduled',
      date: 'Start Date: 2024-01-25',
      lab: 'Duration: 30 days',
      technician: 'Accelerated testing'
    }
  ];

  const activities = [
    {
      id: 1,
      title: 'Barcode generated for Immunity Boost Syrup',
      description: 'Barcode VHC-MIX-2024-001 generated. Ready for printing and application.',
      icon: 'barcode',
      color: 'purple',
      time: 'Today, 10:30 AM'
    },
    {
      id: 2,
      title: 'Quality test passed - Active Compound Analysis',
      description: 'Curcumin, gingerol, eugenol content within optimal levels.',
      icon: 'flask',
      color: 'green',
      time: 'Today, 9:15 AM'
    },
    {
      id: 3,
      title: 'Multi-herb formulation created',
      description: 'Immunity Boost Syrup: Tulsi (40%), Ginger (25%), Turmeric (20%), Other (15%).',
      icon: 'layer-group',
      color: 'blue',
      time: 'Yesterday, 3:45 PM'
    }
  ];

  useEffect(() => {
    // Generate initial barcode
    generateBarcode();
  }, []);

  const generateBarcode = () => {
    // In a real app, this would use a barcode library
    console.log('Generating barcode:', barcodeData, barcodeType);
    return true;
  };

  const toggleDropdown = (dropdown) => {
    setIsDropdownOpen(prev => ({
      ...prev,
      [dropdown]: !prev[dropdown]
    }));
  };

  const closeAllDropdowns = () => {
    setIsDropdownOpen({
      barcode: false,
      notification: false,
      profile: false
    });
  };

  const handleBatchSelect = (batchId) => {
    setSelectedBatch(batchId);
    const batch = batches.find(b => b.id === batchId);
    if (batch) {
      setBatchId(batch.batchId);
      setProductName(batch.name);
      setBarcodeData(`VHC-${batch.batchId.replace('BTH-', '').replace(/-/g, '')}`);
      setFormulationType(batch.type === 'single' ? 'singleHerb' : 'multiHerb');
      generateBarcode();
    }
  };

  const handleAddHerb = () => {
    const newHerb = {
      id: herbs.length + 1,
      name: `New Herb ${herbs.length + 1}`,
      farm: 'Select farm',
      batch: 'New batch',
      percentage: 0,
      quantity: 0,
      purity: '95-98% (Standard)',
      color: `herb-color-${(herbs.length % 6) + 1}`
    };
    setHerbs([...herbs, newHerb]);
  };

  const handleRemoveHerb = (id) => {
    setHerbs(herbs.filter(herb => herb.id !== id));
  };

  const handleHerbChange = (id, field, value) => {
    setHerbs(herbs.map(herb => 
      herb.id === id ? { ...herb, [field]: value } : herb
    ));
  };

  const calculateTotal = () => {
    const totalPercentage = herbs.reduce((sum, herb) => sum + (parseFloat(herb.percentage) || 0), 0);
    const totalQuantity = herbs.reduce((sum, herb) => sum + (parseFloat(herb.quantity) || 0), 0);
    return { percentage: totalPercentage.toFixed(1), quantity: totalQuantity.toFixed(1) };
  };

  const showDialog = (title, content, type = 'info', confirmText = 'OK', cancelText = null, onConfirm = null) => {
    setModalConfig({
      title,
      content,
      type,
      confirmText,
      cancelText,
      onConfirm
    });
    setShowModal(true);
  };

  const handleModalConfirm = () => {
    if (modalConfig.onConfirm) {
      modalConfig.onConfirm();
    }
    setShowModal(false);
  };

  const handleModalCancel = () => {
    setShowModal(false);
  };

  const handleGenerateBarcode = () => {
    if (generateBarcode()) {
      showDialog(
        'Barcode Generated',
        `<div class="modal-content">
          <div class="modal-icon success">
            <i class="fas fa-check-circle"></i>
          </div>
          <h4>Barcode Generated Successfully!</h4>
          <p>Barcode for <strong>${productName}</strong> generated successfully.</p>
          <div class="barcode-preview">
            <p class="barcode-number">${barcodeData}</p>
          </div>
        </div>`,
        'success'
      );
    }
  };

  const handlePrintBarcode = () => {
    showDialog(
      'Print Barcode Labels',
      `<div class="modal-content">
        <div class="modal-icon warning">
          <i class="fas fa-print"></i>
        </div>
        <h4>Ready to Print Barcode Labels</h4>
        <div class="print-details">
          <p><strong>Product:</strong> ${productName}</p>
          <p><strong>Barcode:</strong> ${barcodeData}</p>
          <p><strong>Quantity:</strong> <input type="number" value="5000" min="1" class="print-input" /></p>
          <p><strong>Label Type:</strong> 
            <select class="print-select">
              <option>Primary Packaging (60x40mm)</option>
              <option>Secondary Packaging (100x70mm)</option>
              <option>Shipping Label (150x100mm)</option>
            </select>
          </p>
        </div>
        <p class="modal-info"><i class="fas fa-info-circle"></i> Ensure printer is loaded with correct label stock.</p>
      </div>`,
      'warning',
      'Start Printing',
      'Cancel',
      () => {
        showDialog(
          'Printing Complete',
          `<div class="modal-content">
            <div class="modal-icon success">
              <i class="fas fa-check-circle"></i>
            </div>
            <h4>Printing Completed Successfully!</h4>
            <p>Barcode labels printed for batch ${batchId}.</p>
          </div>`,
          'success'
        );
      }
    );
  };

  const handleSaveFormulation = () => {
    const total = calculateTotal();
    showDialog(
      'Formulation Saved',
      `<div class="modal-content">
        <div class="modal-icon success">
          <i class="fas fa-save"></i>
        </div>
        <h4>Formulation Saved Successfully!</h4>
        <p>Herb composition for <strong>${productName}</strong> has been saved.</p>
        <div class="composition-summary">
          <p class="summary-title">Composition Summary:</p>
          ${herbs.map(herb => 
            `<p>• ${herb.name}: ${herb.percentage}% (${herb.quantity} kg)</p>`
          ).join('')}
          <p class="total">Total: ${total.percentage}% (${total.quantity} kg)</p>
        </div>
      </div>`,
      'success'
    );
  };

  const handleSubmitQC = () => {
    showDialog(
      'Submit for Quality Control',
      `<div class="modal-content">
        <div class="modal-icon warning">
          <i class="fas fa-flask"></i>
        </div>
        <h4>Submit for Quality Control Testing</h4>
        <div class="qc-details">
          <p><strong>Batch:</strong> ${batchId}</p>
          <p><strong>Product:</strong> ${productName}</p>
          <p><strong>Tests Required:</strong> 5 mandatory quality tests</p>
        </div>
        <div class="test-list">
          <p><i class="fas fa-check-circle text-green"></i> Microbiological Analysis</p>
          <p><i class="fas fa-check-circle text-green"></i> Heavy Metal Testing</p>
          <p><i class="fas fa-check-circle text-green"></i> Active Compound Analysis</p>
          <p><i class="fas fa-check-circle text-yellow"></i> Pesticide Residue Test</p>
          <p><i class="fas fa-check-circle text-yellow"></i> Stability Testing</p>
        </div>
        <p class="modal-warning"><i class="fas fa-exclamation-triangle"></i> Submission will initiate the quality control process.</p>
      </div>`,
      'warning',
      'Submit for QC',
      'Cancel',
      () => {
        showDialog(
          'Submitted for QC',
          `<div class="modal-content">
            <div class="modal-icon success">
              <i class="fas fa-flask"></i>
            </div>
            <h4>Submitted for Quality Control!</h4>
            <p>Batch ${batchId} has been submitted for quality control testing.</p>
            <div class="next-steps">
              <p class="steps-title">Next Steps:</p>
              <p>• Samples sent to testing labs</p>
              <p>• Results expected in 3-5 days</p>
              <p>• Certificate will be generated after approval</p>
            </div>
          </div>`,
          'success'
        );
      }
    );
  };

  const handleGenerateCertificate = () => {
    showDialog(
      'Generate Quality Certificate',
      `<div class="modal-content">
        <div class="modal-icon warning">
          <i class="fas fa-certificate"></i>
        </div>
        <h4>Generate Quality Certificate</h4>
        <div class="certificate-details">
          <p><strong>Batch:</strong> ${batchId}</p>
          <p><strong>Product:</strong> ${productName}</p>
          <p><strong>Quality Score:</strong> <span class="score">82%</span> (3/5 tests passed)</p>
          <p><strong>Certificate Type:</strong> 
            <select class="certificate-select">
              <option>Interim Certificate (Tests in progress)</option>
              <option>Final Certificate (All tests passed)</option>
              <option>Government Compliance Certificate</option>
            </select>
          </p>
        </div>
        <p class="modal-info"><i class="fas fa-info-circle"></i> Certificate will include barcode, composition, and test results.</p>
      </div>`,
      'warning',
      'Generate Certificate',
      'Cancel',
      () => {
        showDialog(
          'Certificate Generated',
          `<div class="modal-content">
            <div class="modal-icon success">
              <i class="fas fa-certificate"></i>
            </div>
            <h4>Quality Certificate Generated!</h4>
            <p>Certificate for ${productName} has been generated successfully.</p>
            <div class="certificate-id">
              <p>CERT-${batchId.replace('BTH-', '')}-FINAL</p>
              <p class="id-note">Download available as PDF</p>
            </div>
            <div class="certificate-actions">
              <button class="btn-download"><i class="fas fa-download"></i> Download PDF</button>
              <button class="btn-print"><i class="fas fa-print"></i> Print</button>
            </div>
          </div>`,
          'success'
        );
      }
    );
  };

  const handleUploadCertificate = () => {
    showDialog(
      'Upload & Finalize Certificate',
      `<div class="modal-content">
        <div class="modal-icon warning">
          <i class="fas fa-cloud-upload-alt"></i>
        </div>
        <h4>Upload Final Quality Certificate</h4>
        <div class="upload-form">
          <div class="form-group">
            <label>Certificate File:</label>
            <input type="file" accept=".pdf,.png,.jpg,.jpeg" />
          </div>
          <div class="form-group">
            <label>Certificate Type:</label>
            <select>
              <option>Final Quality Certificate</option>
              <option>Interim Certificate</option>
              <option>Government Compliance</option>
              <option>Export Certificate</option>
            </select>
          </div>
          <div class="form-group">
            <label>Valid Until:</label>
            <input type="date" value="2026-01-15" />
          </div>
        </div>
        <p class="modal-warning"><i class="fas fa-exclamation-triangle"></i> Once finalized, the certificate cannot be modified.</p>
      </div>`,
      'warning',
      'Upload & Finalize',
      'Cancel',
      () => {
        showDialog(
          'Certificate Finalized',
          `<div class="modal-content">
            <div class="modal-icon success">
              <i class="fas fa-check-circle"></i>
            </div>
            <h4>Certificate Finalized Successfully!</h4>
            <p>Quality certificate for ${productName} has been uploaded and finalized.</p>
            <div class="certificate-id">
              <p>CERT-${batchId.replace('BTH-', '')}-FINAL</p>
              <p class="id-note">Uploaded to blockchain for verification</p>
            </div>
            <button class="btn-generate"><i class="fas fa-barcode"></i> Generate Barcode with Certificate</button>
          </div>`,
          'success'
        );
      }
    );
  };

  const handleSingleHerbSelect = () => {
    showDialog(
      'Single Herb Formulation',
      `<div class="modal-content">
        <div class="modal-icon info">
          <i class="fas fa-leaf"></i>
        </div>
        <h4>Single Herb Formulation Selected</h4>
        <p>You've selected single herb formulation. This will simplify the composition to 100% of one herb.</p>
        <p class="modal-info"><i class="fas fa-info-circle"></i> Extra herbs will be removed from composition.</p>
      </div>`,
      'info'
    );
  };

  const totalComposition = calculateTotal();

  return (
    <div className="app" onClick={closeAllDropdowns}>
      {/* Header */}
      <header className="header">
        <div className="container">
          <div className="header-content">
            {/* Logo */}
            <div className="logo">
              <div className="logo-icon">
                <i className="fas fa-leaf"></i>
              </div>
              <div>
                <h1>Virtual HerbChain</h1>
                <p>Advanced Manufacturer Portal</p>
              </div>
            </div>
            
            {/* Header Right Section */}
            <div className="header-right">
              {/* Barcode Quick View */}
              <div className="dropdown-container">
                <button 
                  className="dropdown-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleDropdown('barcode');
                  }}
                >
                  <i className="fas fa-qrcode"></i>
                  <span>Barcodes</span>
                  <span className="badge">3</span>
                </button>
                
                {isDropdownOpen.barcode && (
                  <div className="dropdown-content barcode-dropdown">
                    <div className="dropdown-header">
                      <h3>Recent Barcodes (3)</h3>
                      <button className="btn-view-all">View All</button>
                    </div>
                    
                    <div className="dropdown-items">
                      <div className="dropdown-item">
                        <div className="item-icon">
                          <i className="fas fa-barcode"></i>
                        </div>
                        <div className="item-content">
                          <p className="item-title">VHC-GING-2024-998</p>
                          <p className="item-desc">Premium Ginger Extract • 5000 units</p>
                          <div className="item-footer">
                            <span className="status active">Active</span>
                            <span className="time">Generated: Today</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="dropdown-item">
                        <div className="item-icon">
                          <i className="fas fa-barcode"></i>
                        </div>
                        <div className="item-content">
                          <p className="item-title">VHC-AMLA-2024-995</p>
                          <p className="item-desc">Amla Health Capsules • 3000 units</p>
                          <div className="item-footer">
                            <span className="status printed">Printed</span>
                            <span className="time">Generated: Yesterday</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="dropdown-item">
                        <div className="item-icon">
                          <i className="fas fa-barcode"></i>
                        </div>
                        <div className="item-content">
                          <p className="item-title">VHC-TULSI-2024-990</p>
                          <p className="item-desc">Tulsi Green Tea • 2000 units</p>
                          <div className="item-footer">
                            <span className="status pending">Pending Print</span>
                            <span className="time">Generated: 2 days ago</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="dropdown-footer">
                      <button className="btn-generate">
                        <i className="fas fa-plus"></i> Generate New Barcode
                      </button>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Notifications */}
              <div className="dropdown-container">
                <button 
                  className="dropdown-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleDropdown('notification');
                  }}
                >
                  <i className="far fa-bell"></i>
                  <span className="badge pulse">5</span>
                </button>
                
                {isDropdownOpen.notification && (
                  <div className="dropdown-content notification-dropdown">
                    <div className="dropdown-header">
                      <h3>Notifications (5)</h3>
                      <button className="btn-mark-read">Mark All Read</button>
                    </div>
                    
                    <div className="dropdown-items">
                      <div className="dropdown-item">
                        <div className="item-icon">
                          <i className="fas fa-industry"></i>
                        </div>
                        <div className="item-content">
                          <p className="item-title">Batch Ready for Barcode</p>
                          <p className="item-desc">BTH-2024-998 is ready for barcode generation</p>
                          <div className="item-footer">
                            <span className="status high">High Priority</span>
                            <span className="time">10 min ago</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="dropdown-footer">
                      <button className="btn-view-all">View All Notifications</button>
                    </div>
                  </div>
                )}
              </div>
              
              {/* User Profile */}
              <div className="dropdown-container">
                <div 
                  className="user-profile"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleDropdown('profile');
                  }}
                >
                  <div className="avatar">MP</div>
                  <div className="user-info">
                    <p>Herbal Solutions Inc.</p>
                    <p>ID: MANUF-7890</p>
                  </div>
                  <i className="fas fa-chevron-down"></i>
                </div>
                
                {isDropdownOpen.profile && (
                  <div className="dropdown-content profile-dropdown">
                    <div className="profile-header">
                      <p>Herbal Solutions Inc.</p>
                      <p>Manufacturer ID: MANUF-7890</p>
                    </div>
                    
                    <div className="dropdown-items">
                      <div className="dropdown-item">
                        <div className="item-icon">
                          <i className="fas fa-user"></i>
                        </div>
                        <span>My Profile</span>
                      </div>
                      
                      <div className="dropdown-item">
                        <div className="item-icon">
                          <i className="fas fa-cog"></i>
                        </div>
                        <span>Settings</span>
                      </div>
                      
                      <div className="dropdown-item">
                        <div className="item-icon">
                          <i className="fas fa-question-circle"></i>
                        </div>
                        <span>Help & Support</span>
                      </div>
                    </div>
                    
                    <div className="dropdown-footer">
                      <div className="dropdown-item logout">
                        <div className="item-icon">
                          <i className="fas fa-sign-out-alt"></i>
                        </div>
                        <span>Logout</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Button */}
      <div className="mobile-menu-btn">
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
          <i className={`fas ${isSidebarOpen ? 'fa-times' : 'fa-bars'}`}></i>
        </button>
      </div>

      {/* Main Layout */}
      <div className="container main-container">
        <div className="layout">
          {/* Sidebar */}
          <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
            <div className="sidebar-card">
              <div className="sidebar-section">
                <h3>
                  <i className="fas fa-industry"></i>
                  Manufacturing
                </h3>
                <ul>
                  <li className="active">
                    <i className="fas fa-tachometer-alt"></i>
                    <span>Dashboard</span>
                  </li>
                  <li>
                    <i className="fas fa-inbox"></i>
                    <span>Incoming Batches</span>
                    <span className="badge">12</span>
                  </li>
                  <li>
                    <i className="fas fa-industry"></i>
                    <span>Production</span>
                    <span className="badge">8</span>
                  </li>
                  <li>
                    <i className="fas fa-flask"></i>
                    <span>Formulation</span>
                  </li>
                </ul>
              </div>
              
              <div className="sidebar-section">
                <h3>
                  <i className="fas fa-clipboard-check"></i>
                  Quality & Compliance
                </h3>
                <ul>
                  <li>
                    <i className="fas fa-barcode"></i>
                    <span>Barcode Management</span>
                    <span className="badge purple">3</span>
                  </li>
                  <li>
                    <i className="fas fa-file-certificate"></i>
                    <span>Certificates</span>
                    <span className="badge yellow">5</span>
                  </li>
                  <li>
                    <i className="fas fa-clipboard-check"></i>
                    <span>Quality Control</span>
                    <span className="badge blue">5</span>
                  </li>
                  <li>
                    <i className="fas fa-truck"></i>
                    <span>Logistics</span>
                    <span className="badge blue">3</span>
                  </li>
                </ul>
              </div>
            </div>
            
            {/* Quick Stats */}
            <div className="sidebar-card">
              <h3>
                <i className="fas fa-chart-bar"></i>
                Quick Stats
              </h3>
              <div className="stats">
                <div className="stat-item">
                  <div className="stat-icon">
                    <i className="fas fa-seedling"></i>
                  </div>
                  <span>Verified Batches</span>
                  <span className="stat-value">12</span>
                </div>
                <div className="stat-item">
                  <div className="stat-icon">
                    <i className="fas fa-industry"></i>
                  </div>
                  <span>In Processing</span>
                  <span className="stat-value">8</span>
                </div>
                <div className="stat-item">
                  <div className="stat-icon">
                    <i className="fas fa-barcode"></i>
                  </div>
                  <span>Barcodes</span>
                  <span className="stat-value">24</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="main-content">
            {/* Page Header */}
            <div className="card page-header">
              <div className="header-content">
                <div>
                  <h2>Advanced Manufacturer Console</h2>
                  <p>Formulate, test, and trace herbal products with composition tracking</p>
                </div>
                <div className="header-actions">
                  <button className="btn-export">
                    <i className="fas fa-download"></i>
                    <span>Export Data</span>
                  </button>
                  <button className="btn-new-batch">
                    <i className="fas fa-plus"></i>
                    <span>New Formulation</span>
                  </button>
                </div>
              </div>
            </div>
            
            {/* Barcode Generator Section */}
            <div className="card barcode-section">
              <div className="section-header">
                <div className="header-title">
                  <div className="title-icon">
                    <i className="fas fa-barcode"></i>
                  </div>
                  <div>
                    <h3>Product Barcode & Traceability</h3>
                    <p>Generate unique barcodes for complete product traceability</p>
                  </div>
                </div>
                <span className="status-badge ready">Ready for Barcode</span>
              </div>
              
              <div className="barcode-content">
                {/* Barcode Display */}
                <div className="barcode-display">
                  <div className="barcode-canvas">
                    <div className="barcode-placeholder">
                      Barcode: {barcodeData}
                    </div>
                  </div>
                  <div className="barcode-info">
                    <p className="barcode-number">{barcodeData}</p>
                    <p className="barcode-desc">CODE128 • Herbal Formulation • Govt. Verified</p>
                    <div className="barcode-tags">
                      <span className="tag">On Blockchain</span>
                      <span className="tag">Full Traceability</span>
                      <span className="tag">Quality Certified</span>
                    </div>
                  </div>
                </div>
                
                {/* Barcode Controls & Info */}
                <div className="barcode-controls">
                  <div className="control-group">
                    <label>Barcode Data</label>
                    <input 
                      type="text" 
                      value={barcodeData}
                      onChange={(e) => setBarcodeData(e.target.value)}
                    />
                    <p className="help-text">Unique identifier for product traceability</p>
                  </div>
                  
                  <div className="control-row">
                    <div className="control-group">
                      <label>Product Name</label>
                      <input 
                        type="text" 
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                      />
                    </div>
                    
                    <div className="control-group">
                      <label>Batch ID</label>
                      <input 
                        type="text" 
                        value={batchId}
                        readOnly
                      />
                    </div>
                  </div>
                  
                  <div className="control-group">
                    <label>Barcode Type</label>
                    <select 
                      value={barcodeType}
                      onChange={(e) => setBarcodeType(e.target.value)}
                    >
                      <option value="CODE128">CODE128 (Standard)</option>
                      <option value="QR">QR Code (Enhanced Info)</option>
                      <option value="DATAMATRIX">Data Matrix (High Density)</option>
                      <option value="EAN13">EAN-13 (Retail)</option>
                    </select>
                  </div>
                  
                  <div className="control-actions">
                    <button className="btn-generate-barcode" onClick={handleGenerateBarcode}>
                      <i className="fas fa-barcode"></i>
                      <span>Generate Barcode</span>
                    </button>
                    <button className="btn-print-barcode" onClick={handlePrintBarcode}>
                      <i className="fas fa-print"></i>
                      <span>Print Labels</span>
                    </button>
                    <button className="btn-download-barcode">
                      <i className="fas fa-download"></i>
                      <span>Download</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Dashboard Layout */}
            <div className="dashboard-layout">
              {/* Verified Batches Panel */}
              <div className="card batches-panel">
                <div className="panel-header">
                  <div>
                    <h3>Formulation Batches</h3>
                    <p>Select batch to manage formulation & composition</p>
                  </div>
                  <button className="btn-view-all">View All</button>
                </div>
                
                <div className="batches-list">
                  {batches.map(batch => (
                    <div 
                      key={batch.id}
                      className={`batch-item ${selectedBatch === batch.id ? 'selected' : ''}`}
                      onClick={() => handleBatchSelect(batch.id)}
                    >
                      <div className="batch-header">
                        <span className="batch-id">{batch.batchId}</span>
                        <span className={`status-badge status-${batch.statusType}`}>
                          {batch.status}
                        </span>
                      </div>
                      <h4 className="batch-name">{batch.name}</h4>
                      <div className="batch-composition">
                        <div className="composition-type">
                          <i className={`fas ${batch.type === 'single' ? 'fa-leaf' : 'fa-layer-group'}`}></i>
                          <span>
                            {batch.type === 'single' ? 'Single Herb Formulation' : 
                             `Multi-Herb Combination (${batch.composition.length} herbs)`}
                          </span>
                        </div>
                        <div className="composition-chart">
                          {batch.composition.map((comp, index) => (
                            <div 
                              key={index}
                              className={`chart-bar herb-color-${(index % 6) + 1}`}
                              style={{ width: `${comp.percentage}%` }}
                              title={`${comp.name}: ${comp.percentage}%`}
                            ></div>
                          ))}
                        </div>
                        <div className="composition-details">
                          <span>
                            {batch.composition.map(comp => 
                              `${comp.name}: ${comp.percentage}%`
                            ).join(' • ')}
                          </span>
                          <span>{batch.totalQuantity}</span>
                        </div>
                      </div>
                      <div className="batch-footer">
                        <div className="verification">
                          <i className="fas fa-link"></i>
                          <span>On-chain verified</span>
                        </div>
                        <span className="farm-info">{batch.farm}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Formulation & Quality Control Panel */}
              <div className="card control-panel">
                <div className="panel-tabs">
                  <button 
                    className={`tab-control ${activeTab === 'composition' ? 'active' : ''}`}
                    onClick={() => setActiveTab('composition')}
                  >
                    <i className="fas fa-layer-group"></i>
                    <span>Composition</span>
                  </button>
                  <button 
                    className={`tab-control ${activeTab === 'quality' ? 'active' : ''}`}
                    onClick={() => setActiveTab('quality')}
                  >
                    <i className="fas fa-flask"></i>
                    <span>Quality Tests</span>
                    <span className="tab-badge">5</span>
                  </button>
                  <button 
                    className={`tab-control ${activeTab === 'certificate' ? 'active' : ''}`}
                    onClick={() => setActiveTab('certificate')}
                  >
                    <i className="fas fa-file-certificate"></i>
                    <span>Certificate</span>
                  </button>
                </div>
                
                {/* Composition Tab */}
                {activeTab === 'composition' && (
                  <div className="tab-content">
                    <div className="tab-header">
                      <div>
                        <h3>Herb Composition Formulation</h3>
                        <p>{batchId} • {productName}</p>
                      </div>
                      <span className="status-badge status-pending">Draft Formulation</span>
                    </div>
                    
                    {/* Composition Type Selection */}
                    <div className="formulation-type">
                      <label>Formulation Type</label>
                      <div className="type-options">
                        <div className="type-option">
                          <input 
                            type="radio" 
                            id="singleHerb"
                            name="formulationType"
                            checked={formulationType === 'singleHerb'}
                            onChange={() => {
                              setFormulationType('singleHerb');
                              handleSingleHerbSelect();
                            }}
                          />
                          <label htmlFor="singleHerb">
                            <div className="option-content">
                              <div className="option-check"></div>
                              <div>
                                <p>Single Herb</p>
                                <p>Pure, single herb formulation</p>
                              </div>
                            </div>
                          </label>
                        </div>
                        
                        <div className="type-option">
                          <input 
                            type="radio" 
                            id="multiHerb"
                            name="formulationType"
                            checked={formulationType === 'multiHerb'}
                            onChange={() => setFormulationType('multiHerb')}
                          />
                          <label htmlFor="multiHerb">
                            <div className="option-content">
                              <div className="option-check"></div>
                              <div>
                                <p>Multi-Herb Combination</p>
                                <p>Blend of multiple herbs</p>
                              </div>
                            </div>
                          </label>
                        </div>
                      </div>
                    </div>
                    
                    {/* Herb Composition Form */}
                    <div className="herb-composition">
                      <div className="section-header">
                        <h4>Herb Composition Details</h4>
                        <button className="btn-add-herb" onClick={handleAddHerb}>
                          <i className="fas fa-plus"></i> Add Herb
                        </button>
                      </div>
                      
                      <div className="herbs-list">
                        {herbs.map(herb => (
                          <div key={herb.id} className="herb-item">
                            <div className="herb-header">
                              <div className="herb-title">
                                <div className={`herb-icon ${herb.color}`}>
                                  <i className="fas fa-leaf"></i>
                                </div>
                                <div>
                                  <input 
                                    type="text" 
                                    value={herb.name}
                                    onChange={(e) => handleHerbChange(herb.id, 'name', e.target.value)}
                                    className="herb-name-input"
                                  />
                                  <p className="herb-meta">{herb.farm} • {herb.batch}</p>
                                </div>
                              </div>
                              <button 
                                className="btn-remove-herb"
                                onClick={() => handleRemoveHerb(herb.id)}
                              >
                                <i className="fas fa-times"></i>
                              </button>
                            </div>
                            <div className="herb-controls">
                              <div className="control-group">
                                <label>Percentage (%)</label>
                                <input 
                                  type="number" 
                                  min="0"
                                  max="100"
                                  value={herb.percentage}
                                  onChange={(e) => handleHerbChange(herb.id, 'percentage', e.target.value)}
                                />
                              </div>
                              <div className="control-group">
                                <label>Quantity (kg)</label>
                                <input 
                                  type="number" 
                                  min="0"
                                  value={herb.quantity}
                                  onChange={(e) => handleHerbChange(herb.id, 'quantity', e.target.value)}
                                />
                              </div>
                              <div className="control-group">
                                <label>Purity Level</label>
                                <select 
                                  value={herb.purity}
                                  onChange={(e) => handleHerbChange(herb.id, 'purity', e.target.value)}
                                >
                                  <option>98.5% (Premium)</option>
                                  <option>95-98% (Standard)</option>
                                  <option>90-95% (Basic)</option>
                                </select>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      {/* Total Composition Summary */}
                      <div className="total-composition">
                        <div className="total-header">
                          <span>Total Composition</span>
                          <span className="total-value">
                            {totalComposition.percentage}% ({totalComposition.quantity} kg)
                          </span>
                        </div>
                        <div className="total-note">
                          <i className="fas fa-info-circle"></i>
                          <p>Remaining 15% includes excipients, preservatives, and other non-herbal components.</p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Formulation Notes */}
                    <div className="formulation-notes">
                      <label>Formulation Notes</label>
                      <textarea defaultValue={
                        `Immunity Boost Syrup Formulation:
- Primary herbs: Tulsi (40%), Ginger (25%), Turmeric (20%)
- Excipients: Honey base (10%), Natural preservatives (5%)
- Processing: Cold extraction method
- Target: Maintain bioactive compounds at optimal levels
- Expected yield: 5000 bottles (200ml each)`
                      }></textarea>
                    </div>
                    
                    <div className="formulation-actions">
                      <button className="btn-save" onClick={handleSaveFormulation}>
                        <i className="fas fa-save"></i>
                        <span>Save Formulation</span>
                      </button>
                      <button className="btn-submit-qc" onClick={handleSubmitQC}>
                        <i className="fas fa-flask"></i>
                        <span>Submit for QC Testing</span>
                      </button>
                    </div>
                  </div>
                )}
                
                {/* Quality Control Tab */}
                {activeTab === 'quality' && (
                  <div className="tab-content">
                    <div className="tab-header">
                      <h3>Quality Control Tests</h3>
                      <p>{batchId} • {productName}</p>
                    </div>
                    
                    {/* Quality Test Progress */}
                    <div className="quality-progress">
                      <div className="progress-header">
                        <span>Overall Quality Score</span>
                        <span className="score">82%</span>
                      </div>
                      <div className="progress-bar">
                        <div className="progress-fill" style={{ width: '82%' }}></div>
                      </div>
                      <div className="progress-details">
                        <span>Tests Completed: 3/5</span>
                        <span>Passed: 3 • Pending: 2</span>
                      </div>
                    </div>
                    
                    {/* Quality Tests List */}
                    <div className="quality-tests">
                      {qualityTests.map(test => (
                        <div key={test.id} className={`test-item status-${test.status}`}>
                          <div className="test-header">
                            <div>
                              <p className="test-name">{test.name}</p>
                              <p className="test-desc">{test.description}</p>
                            </div>
                            <span className={`status-badge status-${test.status}`}>
                              {test.status === 'approved' ? 'Passed' : 
                               test.status === 'pending' ? 'In Progress' : 'Pending'}
                            </span>
                          </div>
                          <div className="test-details">
                            <div>
                              <p>Result: <span className="result">{test.result}</span></p>
                              <p className="test-date">{test.date}</p>
                            </div>
                            <div>
                              <p>Lab: <span className="lab">{test.lab}</span></p>
                              <p className="test-tech">{test.technician}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    {/* Add Test Button */}
                    <div className="add-test">
                      <button className="btn-add-test">
                        <i className="fas fa-plus"></i> Add New Quality Test
                      </button>
                    </div>
                  </div>
                )}
                
                {/* Certificate Tab */}
                {activeTab === 'certificate' && (
                  <div className="tab-content">
                    <div className="tab-header">
                      <h3>Quality Certificate Management</h3>
                      <p>{batchId} • {productName}</p>
                    </div>
                    
                    {/* Certificate Status */}
                    <div className="certificate-status">
                      <div>
                        <p className="status-title">Certificate Status</p>
                        <p className="status-desc">Final quality certificate for distribution</p>
                      </div>
                      <span className="status-badge status-pending">Draft Ready</span>
                    </div>
                    
                    {/* Certificate Preview */}
                    <div className="certificate-preview">
                      <div className="preview-header">
                        <div className="certificate-icon">
                          <i className="fas fa-certificate"></i>
                        </div>
                        <h4>Quality Certificate Preview</h4>
                        <p>Certificate will be generated after all tests pass</p>
                      </div>
                      
                      <div className="certificate-details">
                        <div className="detail-row">
                          <span>Product Name:</span>
                          <span>{productName}</span>
                        </div>
                        <div className="detail-row">
                          <span>Batch ID:</span>
                          <span>{batchId}</span>
                        </div>
                        <div className="detail-row">
                          <span>Manufacturing Date:</span>
                          <span>2024-01-15</span>
                        </div>
                        <div className="detail-row">
                          <span>Expiry Date:</span>
                          <span>2026-01-15</span>
                        </div>
                        <div className="detail-row">
                          <span>Quality Score:</span>
                          <span className="score">82%</span>
                        </div>
                        <div className="detail-row">
                          <span>Certificate ID:</span>
                          <span className="cert-id">CERT-2024-001-7890</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Certificate Upload */}
                    <div className="certificate-upload">
                      <h4>Upload Final Certificate</h4>
                      <div className="upload-area">
                        <div className="upload-icon">
                          <i className="fas fa-cloud-upload-alt"></i>
                        </div>
                        <p className="upload-title">Upload Quality Certificate</p>
                        <p className="upload-desc">Drag & drop PDF, PNG, or JPG files here, or click to browse</p>
                        <button className="btn-browse">
                          <i className="fas fa-folder-open"></i> Browse Files
                        </button>
                        <p className="upload-note">Max file size: 10MB • Supported formats: PDF, PNG, JPG</p>
                      </div>
                    </div>
                    
                    {/* Certificate Actions */}
                    <div className="certificate-actions">
                      <div className="certificate-notes">
                        <label>Certificate Notes</label>
                        <textarea defaultValue={
                          `Certificate Details:
- All mandatory quality tests passed (3/3 completed)
- Pending tests: Pesticide residue (in progress), Stability testing (scheduled)
- Interim certificate issued for distribution
- Final certificate will be updated after all tests complete
- Government compliance: AYUSH standards met`
                        }></textarea>
                      </div>
                      
                      <div className="action-buttons">
                        <button className="btn-generate-cert" onClick={handleGenerateCertificate}>
                          <i className="fas fa-file-certificate"></i>
                          <span>Generate Certificate</span>
                        </button>
                        <button className="btn-upload-cert" onClick={handleUploadCertificate}>
                          <i className="fas fa-cloud-upload-alt"></i>
                          <span>Upload & Finalize</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            {/* Activity Log */}
            <div className="card activity-log">
              <div className="panel-header">
                <h3>Recent Activity</h3>
                <button className="btn-show-all">Show All</button>
              </div>
              
              <div className="activities">
                {activities.map(activity => (
                  <div key={activity.id} className="activity-item">
                    <div className={`activity-icon ${activity.color}`}>
                      <i className={`fas fa-${activity.icon}`}></i>
                    </div>
                    <div className="activity-content">
                      <h4>{activity.title}</h4>
                      <p>{activity.description}</p>
                    </div>
                    <div className="activity-time">{activity.time}</div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Footer */}
            <div className="footer">
              <p>© 2024 Virtual HerbChain | Advanced Herbal Manufacturing Platform</p>
              <p>Compliance ID: GOVAUTH-MFG-2024-001 | Ministry of AYUSH Certified • GMP Compliant</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Modal Overlay */}
      {showModal && (
        <div className="modal-overlay" onClick={handleModalCancel}>
          <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{modalConfig.title}</h3>
              <button className="modal-close" onClick={handleModalCancel}>&times;</button>
            </div>
            
            <div 
              className="modal-body"
              dangerouslySetInnerHTML={{ __html: modalConfig.content }}
            ></div>
            
            <div className="modal-footer">
              {modalConfig.cancelText && (
                <button className="btn-cancel" onClick={handleModalCancel}>
                  {modalConfig.cancelText}
                </button>
              )}
              <button 
                className={`btn-confirm ${modalConfig.type}`}
                onClick={handleModalConfirm}
              >
                {modalConfig.confirmText}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;