import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/Admin.css';

// Card Component
function Card({ title, value, children, color = 'primary', icon, className = '' }) {
  return (
    <motion.div 
      className={`card ${color} ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02, y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <div className="card-header">
        {icon && <div className="card-icon">{icon}</div>}
        <div>
          <h3 className="card-title">{title}</h3>
          <p className="card-value">{value}</p>
        </div>
      </div>
      {children && <div className="card-content">{children}</div>}
    </motion.div>
  );
}

// Button Component
function Button({ children, variant = 'primary', onClick, icon, size = 'medium', fullWidth = false, className = '' }) {
  return (
    <motion.button 
      className={`btn ${variant} ${size} ${fullWidth ? 'full-width' : ''} ${className}`}
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      {icon && <span className="btn-icon">{icon}</span>}
      {children}
    </motion.button>
  );
}

// Badge Component
function Badge({ children, variant = 'default', size = 'medium' }) {
  return <span className={`badge ${variant} ${size}`}>{children}</span>;
}

// Progress Bar Component
function ProgressBar({ value, max = 100, label, color = 'primary', showPercentage = true }) {
  const percentage = (value / max) * 100;
  
  return (
    <div className="progress-bar-container">
      <div className="progress-bar-header">
        {label && <span className="progress-label">{label}</span>}
        {showPercentage && <span className="progress-percentage">{value}/{max}</span>}
      </div>
      <div className="progress-bar-background">
        <motion.div 
          className={`progress-bar-fill ${color}`}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

// Modal Component
function Modal({ isOpen, onClose, title, children, size = 'medium' }) {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);
  
  if (!isOpen) return null;
  
  return (
    <AnimatePresence>
      <motion.div 
        className="modal-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div 
          className={`modal-content ${size}`}
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="modal-header">
            <h3>{title}</h3>
            <button className="modal-close" onClick={onClose}>×</button>
          </div>
          <div className="modal-body">{children}</div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// Notification Component
function Notification({ message, type = 'info', onClose }) {
  return (
    <motion.div 
      className={`notification ${type}`}
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      transition={{ type: "spring", stiffness: 500, damping: 30 }}
    >
      <div className="notification-content">
        <div className="notification-icon">
          {type === 'success' && '✓'}
          {type === 'error' && '✕'}
          {type === 'warning' && '⚠'}
          {type === 'info' && 'ℹ'}
        </div>
        <span className="notification-message">{message}</span>
      </div>
      <button className="notification-close" onClick={onClose}>×</button>
    </motion.div>
  );
}

// Table Component
function Table({ columns, data, onRowClick, emptyMessage = "No data available" }) {
  return (
    <div className="table-container">
      <table className="data-table">
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th key={index}>{column.header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((row, rowIndex) => (
              <tr 
                key={rowIndex} 
                onClick={() => onRowClick && onRowClick(row)}
                className={onRowClick ? 'clickable' : ''}
              >
                {columns.map((column, colIndex) => (
                  <td key={colIndex}>
                    {column.render ? column.render(row[column.accessor], row) : row[column.accessor]}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length} className="empty-state">
                <div className="empty-content">
                  <div className="empty-icon">📊</div>
                  <p>{emptyMessage}</p>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

// Main Admin Dashboard Component
export default function AdminDashboard() {
  // State Management
  const [notifications, setNotifications] = useState([]);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Farmer Portal Dashboard States
  const [farmers, setFarmers] = useState([
    { 
      id: 1, 
      name: 'Rajesh Kumar', 
      email: 'rajesh@example.com',
      herb: 'Tulsi', 
      location: 'Madurai, Tamil Nadu', 
      status: 'new',
      registeredDate: '2024-01-15',
      collector: null,
      farmSize: '5 acres',
      phone: '+91 9876543210',
      batchId: 'TUL-2024-001'
    },
    { 
      id: 2, 
      name: 'Priya Sharma', 
      email: 'priya@example.com',
      herb: 'Ashwagandha', 
      location: 'Nagpur, Maharashtra', 
      status: 'assigned',
      registeredDate: '2024-01-14',
      collector: 'Govind Singh',
      farmSize: '8 acres',
      phone: '+91 9876543211',
      batchId: 'ASH-2024-002',
      collectorVisit: '2024-01-20 10:00 AM'
    },
    { 
      id: 3, 
      name: 'Vikram Singh', 
      email: 'vikram@example.com',
      herb: 'Giloy', 
      location: 'Dehradun, Uttarakhand', 
      status: 'stage1',
      registeredDate: '2024-01-13',
      collector: 'Anil Kumar',
      farmSize: '3 acres',
      phone: '+91 9876543212',
      batchId: 'GIL-2024-003',
      stage: 'Batch Collection',
      stageProgress: 75
    },
    { 
      id: 4, 
      name: 'Anjali Patel', 
      email: 'anjali@example.com',
      herb: 'Turmeric', 
      location: 'Erode, Tamil Nadu', 
      status: 'completed',
      registeredDate: '2024-01-12',
      collector: 'Ravi Sharma',
      farmSize: '6 acres',
      phone: '+91 9876543213',
      batchId: 'TUR-2024-004',
      finalBatch: 'Turmeric Gold 500kg'
    }
  ]);
  
  // Collector Management
  const [collectors, setCollectors] = useState([
    { 
      id: 1, 
      name: 'Govind Singh', 
      location: 'Madurai, TN', 
      status: 'available',
      assignedFarmers: 3,
      completedCollections: 12,
      rating: 4.8,
      phone: '+91 9876543220',
      nextVisit: '2024-01-20 10:00 AM'
    },
    { 
      id: 2, 
      name: 'Anil Kumar', 
      location: 'Nagpur, MH', 
      status: 'on-duty',
      assignedFarmers: 5,
      completedCollections: 18,
      rating: 4.6,
      phone: '+91 9876543221',
      nextVisit: '2024-01-19 02:00 PM'
    },
    { 
      id: 3, 
      name: 'Ravi Sharma', 
      location: 'Dehradun, UK', 
      status: 'available',
      assignedFarmers: 2,
      completedCollections: 8,
      rating: 4.9,
      phone: '+91 9876543222',
      nextVisit: '2024-01-21 11:00 AM'
    }
  ]);
  
  // Tester Dashboard Data
  const [testers, setTesters] = useState([
    {
      id: 1,
      name: 'Dr. Sharma Lab',
      location: 'Delhi',
      specialization: ['Tulsi', 'Ashwagandha'],
      rating: 4.9,
      bids: 3,
      status: 'active'
    },
    {
      id: 2,
      name: 'AYUSH Testing Center',
      location: 'Bangalore',
      specialization: ['All Herbs'],
      rating: 4.7,
      bids: 5,
      status: 'active'
    }
  ]);
  
  const [testingBatches, setTestingBatches] = useState([
    {
      id: 'TUL-2024-001',
      herb: 'Tulsi',
      quantity: '500 kg',
      farmer: 'Rajesh Kumar',
      location: 'Madurai',
      status: 'bidding',
      bids: 2,
      highestBid: '₹45,000',
      selectedTester: null
    },
    {
      id: 'ASH-2024-002',
      herb: 'Ashwagandha',
      quantity: '800 kg',
      farmer: 'Priya Sharma',
      location: 'Nagpur',
      status: 'testing',
      bids: 3,
      highestBid: '₹78,000',
      selectedTester: 'Dr. Sharma Lab'
    }
  ]);
  
  // Manufacturer Dashboard Data
  const [manufacturers, setManufacturers] = useState([
    {
      id: 1,
      name: 'Himalaya Herbals',
      location: 'Bangalore',
      specialization: 'All Ayurvedic Herbs',
      rating: 4.8,
      activeBids: 2,
      status: 'active'
    },
    {
      id: 2,
      name: 'Dabur India',
      location: 'Delhi',
      specialization: 'Traditional Medicines',
      rating: 4.9,
      activeBids: 3,
      status: 'active'
    }
  ]);
  
  const [manufacturerBatches, setManufacturerBatches] = useState([
    {
      id: 'TUL-2024-001',
      herb: 'Tulsi',
      quantity: '500 kg',
      stage: 'Testing Complete',
      status: 'bidding',
      bids: 3,
      highestBid: '₹85,000',
      selectedManufacturer: null,
      labelId: null
    },
    {
      id: 'ASH-2024-002',
      herb: 'Ashwagandha',
      quantity: '800 kg',
      stage: 'Manufacturing',
      status: 'assigned',
      bids: 4,
      highestBid: '₹1,20,000',
      selectedManufacturer: 'Himalaya Herbals',
      labelId: 'HL-TUR-2024-001'
    }
  ]);
  
  // User/Consumer Feedback Data
  const [feedback, setFeedback] = useState([
    {
      id: 1,
      product: 'Tulsi Gold Capsules',
      batchId: 'TUL-2023-045',
      rating: 4.8,
      feedback: 'Excellent quality, noticed improvement in immunity',
      stage: 'Manufacturing',
      date: '2024-01-15'
    },
    {
      id: 2,
      product: 'Ashwagandha Powder',
      batchId: 'ASH-2023-028',
      rating: 4.5,
      feedback: 'Good product, packaging could be improved',
      stage: 'Distribution',
      date: '2024-01-14'
    }
  ]);
  
  // Analytics Data
  const [analytics, setAnalytics] = useState({
    totalFarmers: 156,
    activeCollectors: 8,
    pendingBatches: 12,
    completedBatches: 89,
    totalRevenue: '₹24,56,789',
    avgProcessingTime: '4.2 days',
    complianceRate: '94.5%',
    farmerSatisfaction: '4.8/5',
    supplyChainEfficiency: 92,
    stageCompletion: {
      planting: 85,
      collection: 88,
      testing: 92,
      manufacturing: 90,
      distribution: 95
    }
  });
  
  // Modals State
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [isFarmerModalOpen, setIsFarmerModalOpen] = useState(false);
  const [isCollectorModalOpen, setIsCollectorModalOpen] = useState(false);
  const [isBatchModalOpen, setIsBatchModalOpen] = useState(false);
  const [isTesterBidModalOpen, setIsTesterBidModalOpen] = useState(false);
  const [isManufacturerBidModalOpen, setIsManufacturerBidModalOpen] = useState(false);
  const [selectedFarmer, setSelectedFarmer] = useState(null);
  const [selectedBatch, setSelectedBatch] = useState(null);
  
  // Show notification
  const showNotification = (message, type = 'info') => {
    const id = Date.now();
    setNotifications(prev => [...prev, { id, message, type }]);
    
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 5000);
  };
  
  // Farmer Portal Functions
  const assignCollector = (farmerId, collectorName) => {
    setFarmers(prev =>
      prev.map(farmer =>
        farmer.id === farmerId
          ? { 
            ...farmer, 
            collector: collectorName, 
            status: 'assigned',
            collectorVisit: new Date(Date.now() + 24 * 60 * 60 * 1000).toLocaleString()
          }
          : farmer
      )
    );
    
    showNotification(`Collector assigned! Farmer will be notified 24 hours before visit.`, 'success');
    setIsAssignModalOpen(false);
  };
  
  const updateBatchStage = (batchId, newStage) => {
    const updatedFarmers = farmers.map(farmer => {
      if (farmer.batchId === batchId) {
        return {
          ...farmer,
          stage: newStage,
          stageProgress: newStage === 'Batch Collection' ? 75 : 
                       newStage === 'Testing' ? 50 : 
                       newStage === 'Complete' ? 100 : 25
        };
      }
      return farmer;
    });
    setFarmers(updatedFarmers);
    showNotification(`Batch ${batchId} updated to ${newStage} stage`, 'success');
  };
  
  // Tester Dashboard Functions
  const handleTesterBid = (batchId, testerName) => {
    setTestingBatches(prev =>
      prev.map(batch =>
        batch.id === batchId
          ? { 
            ...batch, 
            status: 'testing',
            selectedTester: testerName,
            bids: batch.bids + 1
          }
          : batch
      )
    );
    
    showNotification(`${testerName} selected as tester for batch ${batchId}`, 'success');
    setIsTesterBidModalOpen(false);
  };
  
  // Manufacturer Dashboard Functions
  const handleManufacturerBid = (batchId, manufacturerName) => {
    setManufacturerBatches(prev =>
      prev.map(batch =>
        batch.id === batchId
          ? { 
            ...batch, 
            status: 'assigned',
            selectedManufacturer: manufacturerName,
            labelId: `HL-${batchId.split('-')[1]}-${Date.now().toString().slice(-4)}`
          }
          : batch
      )
    );
    
    showNotification(`${manufacturerName} won the bid for batch ${batchId}`, 'success');
    setIsManufacturerBidModalOpen(false);
  };
  
  // Calculate Statistics
  const stats = {
    newFarmers: farmers.filter(f => f.status === 'new').length,
    assignedFarmers: farmers.filter(f => f.status === 'assigned').length,
    inProgressFarmers: farmers.filter(f => f.status === 'stage1' || f.status === 'stage2').length,
    completedFarmers: farmers.filter(f => f.status === 'completed').length,
    availableCollectors: collectors.filter(c => c.status === 'available').length,
    biddingBatches: testingBatches.filter(b => b.status === 'bidding').length
  };
  
  return (
    <div className="admin-dashboard">
      {/* Notification Container */}
      <div className="notifications-container">
        <AnimatePresence>
          {notifications.map(notification => (
            <Notification
              key={notification.id}
              message={notification.message}
              type={notification.type}
              onClose={() => setNotifications(prev => prev.filter(n => n.id !== notification.id))}
            />
          ))}
        </AnimatePresence>
      </div>
      
      {/* Dashboard Header */}
      <div className="dashboard-header">
        <div className="header-content">
          <h1 className="dashboard-title">
            <span className="title-icon">🌿</span>
            AYUSH Supply Chain Admin Portal
          </h1>
          <p className="dashboard-subtitle">Ministry of AYUSH - Herbal Supply Chain Management System</p>
        </div>
        
        <div className="header-actions">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search farmers, batches, collectors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            <span className="search-icon">🔍</span>
          </div>
          
          <div className="user-profile">
            <div className="profile-avatar">
              <span className="avatar-initials">AO</span>
            </div>
            <div className="profile-info">
              <span className="profile-name">Admin Officer</span>
              <span className="profile-role">Ministry of AYUSH</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Navigation Tabs */}
      <div className="main-navigation">
        {['dashboard', 'farmer-portal', 'tester-dashboard', 'manufacturer-dashboard', 'consumer-feedback', 'analytics'].map(tab => (
          <button
            key={tab}
            className={`nav-tab ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab.replace('-', ' ').toUpperCase()}
          </button>
        ))}
      </div>
      
      {/* Quick Stats */}
      <div className="quick-stats">
        <Card
          title="Total Farmers"
          value={analytics.totalFarmers}
          color="primary"
          icon="👨‍🌾"
          className="stat-card"
        >
          <div className="stat-trend positive">+12 this month</div>
        </Card>
        
        <Card
          title="Active Batches"
          value={analytics.pendingBatches}
          color="secondary"
          icon="📦"
          className="stat-card"
        >
          <div className="stat-breakdown">
            <span className="breakdown-item">New: {stats.newFarmers}</span>
            <span className="breakdown-item">In Progress: {stats.inProgressFarmers}</span>
          </div>
        </Card>
        
        <Card
          title="Collectors Online"
          value={`${stats.availableCollectors}/8`}
          color="success"
          icon="🚚"
          className="stat-card"
        >
          <ProgressBar value={stats.availableCollectors} max={8} />
        </Card>
        
        <Card
          title="Supply Chain Efficiency"
          value={`${analytics.supplyChainEfficiency}%`}
          color="warning"
          icon="⚡"
          className="stat-card"
        >
          <div className="stat-trend positive">+2.3% this quarter</div>
        </Card>
      </div>
      
      {/* Main Content Area */}
      <div className="main-content">
        
        {/* Dashboard Overview */}
        {activeTab === 'dashboard' && (
          <div className="dashboard-overview">
            <div className="section-card">
              <div className="section-header">
                <h3>📊 System Overview</h3>
                <div className="section-actions">
                  <Button icon="📈" variant="outline">Generate Report</Button>
                </div>
              </div>
              
              <div className="overview-grid">
                <div className="overview-item">
                  <h4>Supply Chain Status</h4>
                  <div className="stage-progress">
                    {Object.entries(analytics.stageCompletion).map(([stage, percentage]) => (
                      <div key={stage} className="stage-item">
                        <span className="stage-label">{stage}</span>
                        <ProgressBar value={percentage} max={100} color="primary" showPercentage={false} />
                        <span className="stage-percentage">{percentage}%</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="overview-item">
                  <h4>Recent Activity</h4>
                  <div className="activity-list">
                    <div className="activity-item success">
                      <div className="activity-icon">✓</div>
                      <div className="activity-content">
                        <strong>Batch TUR-2024-004 completed</strong>
                        <span>Manufacturer notified for collection</span>
                      </div>
                      <span className="activity-time">10 min ago</span>
                    </div>
                    <div className="activity-item warning">
                      <div className="activity-icon">⚠</div>
                      <div className="activity-content">
                        <strong>New farmer registration</strong>
                        <span>Rajesh Kumar planted Tulsi</span>
                      </div>
                      <span className="activity-time">1 hour ago</span>
                    </div>
                    <div className="activity-item info">
                      <div className="activity-icon">🔄</div>
                      <div className="activity-content">
                        <strong>Tester bid received</strong>
                        <span>Dr. Sharma Lab bid on TUL-2024-001</span>
                      </div>
                      <span className="activity-time">2 hours ago</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Farmer Portal */}
        {activeTab === 'farmer-portal' && (
          <div className="farmer-portal">
            <div className="section-card">
              <div className="section-header">
                <h3>👨‍🌾 Farmer Management Portal</h3>
                <div className="section-actions">
                  <Button icon="➕" onClick={() => setIsFarmerModalOpen(true)}>
                    Register New Farmer
                  </Button>
                  <Button icon="📋" variant="outline">Batch Report</Button>
                </div>
              </div>
              
              <div className="portal-stats">
                <div className="portal-stat">
                  <span className="stat-value">{stats.newFarmers}</span>
                  <span className="stat-label">New Notifications</span>
                </div>
                <div className="portal-stat">
                  <span className="stat-value">{stats.assignedFarmers}</span>
                  <span className="stat-label">Assigned to Collectors</span>
                </div>
                <div className="portal-stat">
                  <span className="stat-value">{stats.inProgressFarmers}</span>
                  <span className="stat-label">In Progress</span>
                </div>
                <div className="portal-stat">
                  <span className="stat-value">{stats.completedFarmers}</span>
                  <span className="stat-label">Completed</span>
                </div>
              </div>
              
              <Table
                columns={[
                  { header: 'Farmer', accessor: 'name' },
                  { header: 'Herb', accessor: 'herb' },
                  { header: 'Location', accessor: 'location' },
                  { 
                    header: 'Status', 
                    accessor: 'status',
                    render: (value, row) => (
                      <Badge variant={
                        value === 'new' ? 'warning' :
                        value === 'assigned' ? 'primary' :
                        value === 'stage1' ? 'info' : 'success'
                      }>
                        {value === 'new' ? 'New Planting' :
                         value === 'assigned' ? 'Collector Assigned' :
                         value === 'stage1' ? 'Stage 1 - Collection' : 'Completed'}
                      </Badge>
                    )
                  },
                  { 
                    header: 'Collector', 
                    accessor: 'collector',
                    render: (value) => value || 'Pending Assignment'
                  },
                  { 
                    header: 'Next Action', 
                    accessor: 'collectorVisit',
                    render: (value, row) => (
                      row.status === 'assigned' ? `Visit: ${value}` :
                      row.status === 'stage1' ? 'Stage 1 Data Collection' : 'Completed'
                    )
                  },
                  { 
                    header: 'Actions', 
                    accessor: 'actions',
                    render: (_, row) => (
                      <div className="action-buttons">
                        {row.status === 'new' && (
                          <Button 
                            size="small"
                            onClick={() => {
                              setSelectedFarmer(row);
                              setIsAssignModalOpen(true);
                            }}
                          >
                            Assign Collector
                          </Button>
                        )}
                        {row.status === 'stage1' && (
                          <Button 
                            size="small"
                            variant="outline"
                            onClick={() => updateBatchStage(row.batchId, 'Testing')}
                          >
                            Update Stage
                          </Button>
                        )}
                        <Button size="small" variant="outline">View Details</Button>
                      </div>
                    )
                  }
                ]}
                data={farmers}
              />
            </div>
            
            {/* Collector Management Section */}
            <div className="section-card">
              <div className="section-header">
                <h3>🚚 Collector Management</h3>
                <div className="section-actions">
                  <Button icon="➕" onClick={() => setIsCollectorModalOpen(true)}>
                    Add Collector
                  </Button>
                </div>
              </div>
              
              <div className="collector-grid">
                {collectors.map(collector => (
                  <div key={collector.id} className="collector-card">
                    <div className="collector-header">
                      <div className="collector-avatar">
                        <span className="avatar-icon">🚚</span>
                      </div>
                      <div className="collector-info">
                        <h4>{collector.name}</h4>
                        <span className="collector-location">{collector.location}</span>
                        <div className="collector-rating">
                          {'★'.repeat(Math.floor(collector.rating))}
                          <span className="rating-value">{collector.rating}</span>
                        </div>
                      </div>
                      <Badge variant={
                        collector.status === 'available' ? 'success' :
                        collector.status === 'on-duty' ? 'warning' : 'error'
                      }>
                        {collector.status}
                      </Badge>
                    </div>
                    
                    <div className="collector-stats">
                      <div className="stat-item">
                        <span className="stat-label">Assigned</span>
                        <span className="stat-value">{collector.assignedFarmers}</span>
                      </div>
                      <div className="stat-item">
                        <span className="stat-label">Completed</span>
                        <span className="stat-value">{collector.completedCollections}</span>
                      </div>
                      <div className="stat-item">
                        <span className="stat-label">Next Visit</span>
                        <span className="stat-value">{collector.nextVisit}</span>
                      </div>
                    </div>
                    
                    <div className="collector-actions">
                      <Button size="small" variant="outline">Schedule</Button>
                      <Button size="small" onClick={() => showNotification(`Notified ${collector.name}`, 'info')}>
                        Notify
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        
        {/* Tester Dashboard */}
        {activeTab === 'tester-dashboard' && (
          <div className="tester-dashboard">
            <div className="section-card">
              <div className="section-header">
                <h3>🧪 Tester Bidding Dashboard</h3>
                <div className="section-actions">
                  <Button icon="📋" variant="outline">Testing Guidelines</Button>
                </div>
              </div>
              
              <div className="dashboard-info">
                <p className="info-text">
                  Batches available for testing. Testers can bid for batches in their region. 
                  First bidder gets priority unless overridden by admin.
                </p>
              </div>
              
              <Table
                columns={[
                  { header: 'Batch ID', accessor: 'id' },
                  { header: 'Herb', accessor: 'herb' },
                  { header: 'Quantity', accessor: 'quantity' },
                  { header: 'Location', accessor: 'location' },
                  { 
                    header: 'Status', 
                    accessor: 'status',
                    render: (value) => (
                      <Badge variant={
                        value === 'bidding' ? 'warning' :
                        value === 'testing' ? 'primary' : 'success'
                      }>
                        {value}
                      </Badge>
                    )
                  },
                  { header: 'Bids', accessor: 'bids' },
                  { header: 'Highest Bid', accessor: 'highestBid' },
                  { 
                    header: 'Selected Tester', 
                    accessor: 'selectedTester',
                    render: (value) => value || 'Pending Selection'
                  },
                  { 
                    header: 'Actions', 
                    accessor: 'actions',
                    render: (_, row) => (
                      <div className="action-buttons">
                        {row.status === 'bidding' && (
                          <Button 
                            size="small"
                            onClick={() => {
                              setSelectedBatch(row);
                              setIsTesterBidModalOpen(true);
                            }}
                          >
                            Select Tester
                          </Button>
                        )}
                        <Button size="small" variant="outline">View Details</Button>
                      </div>
                    )
                  }
                ]}
                data={testingBatches}
              />
            </div>
            
            {/* Available Testers */}
            <div className="section-card">
              <div className="section-header">
                <h3>🏢 Registered Testing Labs</h3>
              </div>
              
              <div className="tester-grid">
                {testers.map(tester => (
                  <div key={tester.id} className="tester-card">
                    <div className="tester-header">
                      <div className="tester-avatar">
                        <span className="avatar-icon">🏢</span>
                      </div>
                      <div className="tester-info">
                        <h4>{tester.name}</h4>
                        <span className="tester-location">{tester.location}</span>
                        <div className="tester-specialization">
                          {tester.specialization.map(spec => (
                            <Badge key={spec} variant="default" size="small">{spec}</Badge>
                          ))}
                        </div>
                      </div>
                      <div className="tester-rating">
                        <span className="rating-value">{tester.rating}</span>
                        <span className="rating-icon">★</span>
                      </div>
                    </div>
                    
                    <div className="tester-stats">
                      <div className="stat-item">
                        <span className="stat-label">Active Bids</span>
                        <span className="stat-value">{tester.bids}</span>
                      </div>
                      <div className="stat-item">
                        <span className="stat-label">Status</span>
                        <Badge variant={tester.status === 'active' ? 'success' : 'error'}>
                          {tester.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        
        {/* Manufacturer Dashboard */}
        {activeTab === 'manufacturer-dashboard' && (
          <div className="manufacturer-dashboard">
            <div className="section-card">
              <div className="section-header">
                <h3>🏭 Manufacturer Bidding Dashboard</h3>
                <div className="section-actions">
                  <Button icon="📋" variant="outline">Manufacturing Guidelines</Button>
                </div>
              </div>
              
              <div className="dashboard-info">
                <p className="info-text">
                  Batches available for manufacturing. Manufacturers bid for tested batches. 
                  Highest bidder wins unless overridden by admin.
                </p>
              </div>
              
              <Table
                columns={[
                  { header: 'Batch ID', accessor: 'id' },
                  { header: 'Herb', accessor: 'herb' },
                  { header: 'Quantity', accessor: 'quantity' },
                  { header: 'Stage', accessor: 'stage' },
                  { 
                    header: 'Status', 
                    accessor: 'status',
                    render: (value) => (
                      <Badge variant={
                        value === 'bidding' ? 'warning' :
                        value === 'assigned' ? 'success' : 'primary'
                      }>
                        {value}
                      </Badge>
                    )
                  },
                  { header: 'Bids', accessor: 'bids' },
                  { header: 'Highest Bid', accessor: 'highestBid' },
                  { header: 'Selected Manufacturer', accessor: 'selectedManufacturer' },
                  { header: 'Label ID', accessor: 'labelId' },
                  { 
                    header: 'Actions', 
                    accessor: 'actions',
                    render: (_, row) => (
                      <div className="action-buttons">
                        {row.status === 'bidding' && (
                          <Button 
                            size="small"
                            onClick={() => {
                              setSelectedBatch(row);
                              setIsManufacturerBidModalOpen(true);
                            }}
                          >
                            Select Winner
                          </Button>
                        )}
                        {row.status === 'assigned' && (
                          <Button 
                            size="small"
                            variant="outline"
                            onClick={() => showNotification(`Label ${row.labelId} sent to manufacturer`, 'success')}
                          >
                            Send Label
                          </Button>
                        )}
                      </div>
                    )
                  }
                ]}
                data={manufacturerBatches}
              />
            </div>
          </div>
        )}
        
        {/* Consumer Feedback */}
        {activeTab === 'consumer-feedback' && (
          <div className="consumer-feedback">
            <div className="section-card">
              <div className="section-header">
                <h3>📊 Consumer Feedback & Analytics</h3>
                <div className="section-actions">
                  <Button icon="📈" variant="outline">Download Report</Button>
                </div>
              </div>
              
              <div className="feedback-stats">
                <Card title="Average Rating" value="4.7/5" color="success" icon="⭐" />
                <Card title="Total Feedback" value="1,234" color="primary" icon="💬" />
                <Card title="Issue Resolution" value="98%" color="warning" icon="✅" />
                <Card title="Customer Satisfaction" value="96%" color="secondary" icon="😊" />
              </div>
              
              <Table
                columns={[
                  { header: 'Product', accessor: 'product' },
                  { header: 'Batch ID', accessor: 'batchId' },
                  { 
                    header: 'Rating', 
                    accessor: 'rating',
                    render: (value) => (
                      <div className="rating-display">
                        <span className="rating-stars">
                          {'★'.repeat(Math.floor(value))}
                          <span className="rating-value">{value}</span>
                        </span>
                      </div>
                    )
                  },
                  { header: 'Feedback', accessor: 'feedback' },
                  { header: 'Stage', accessor: 'stage' },
                  { header: 'Date', accessor: 'date' }
                ]}
                data={feedback}
              />
            </div>
          </div>
        )}
        
        {/* Analytics */}
        {activeTab === 'analytics' && (
          <div className="analytics-dashboard">
            <div className="section-card">
              <div className="section-header">
                <h3>📈 Supply Chain Analytics</h3>
                <div className="section-actions">
                  <Button icon="📊" variant="outline">Export Analytics</Button>
                </div>
              </div>
              
              <div className="analytics-grid">
                <Card title="Supply Chain Efficiency" color="primary" className="chart-card">
                  <div className="chart-placeholder">
                    <div className="chart-bars">
                      {Object.values(analytics.stageCompletion).map((value, index) => (
                        <div key={index} className="chart-bar" style={{ height: `${value}%` }}>
                          <div className="bar-tooltip">{value}%</div>
                        </div>
                      ))}
                    </div>
                    <div className="chart-labels">
                      {Object.keys(analytics.stageCompletion).map((label, index) => (
                        <span key={index} className="chart-label">{label}</span>
                      ))}
                    </div>
                  </div>
                </Card>
                
                <Card title="Revenue Trend" color="secondary" className="chart-card">
                  <div className="chart-placeholder">
                    <div className="chart-line">
                      {[45, 52, 68, 74, 82, 90, 96, 105, 112, 120, 128, 135].map((value, index) => (
                        <div 
                          key={index} 
                          className="chart-point"
                          style={{ 
                            left: `${(index / 11) * 100}%`,
                            bottom: `${(value / 150) * 100}%`
                          }}
                        >
                          <div className="point-tooltip">₹{value}K</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>
                
                <Card title="Regional Distribution" color="success" className="stats-card">
                  <div className="distribution-list">
                    {[
                      { region: 'South India', percentage: 35, color: '#8a9a5b' },
                      { region: 'North India', percentage: 28, color: '#a8b78a' },
                      { region: 'West India', percentage: 22, color: '#6b7c4d' },
                      { region: 'East India', percentage: 15, color: '#5a6840' }
                    ].map((item, index) => (
                      <div key={index} className="distribution-item">
                        <div className="distribution-info">
                          <div 
                            className="distribution-color" 
                            style={{ backgroundColor: item.color }}
                          />
                          <span className="distribution-region">{item.region}</span>
                        </div>
                        <div className="distribution-percentage">{item.percentage}%</div>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Modals */}
      
      {/* Assign Collector Modal */}
      <Modal
        isOpen={isAssignModalOpen}
        onClose={() => setIsAssignModalOpen(false)}
        title="Assign Collector to Farmer"
      >
        {selectedFarmer && (
          <div className="assign-form">
            <div className="form-group">
              <label className="form-label">Farmer Details</label>
              <div className="farmer-details">
                <strong>{selectedFarmer.name}</strong>
                <span>{selectedFarmer.herb} • {selectedFarmer.location}</span>
                <span>Phone: {selectedFarmer.phone}</span>
              </div>
            </div>
            
            <div className="form-group">
              <label className="form-label">Select Collector</label>
              <select className="form-select" defaultValue="">
                <option value="" disabled>Choose a collector</option>
                {collectors
                  .filter(c => c.status === 'available')
                  .map(collector => (
                    <option key={collector.id} value={collector.name}>
                      {collector.name} ({collector.location}) - Rating: {collector.rating}
                    </option>
                  ))
                }
              </select>
            </div>
            
            <div className="form-group">
              <label className="form-label">Collection Date & Time</label>
              <input type="datetime-local" className="form-input" />
            </div>
            
            <div className="form-note">
              <div className="note-icon">ℹ️</div>
              <div className="note-content">
                <strong>Note:</strong> Farmer will be automatically notified 24 hours before 
                the collector's visit. Collector will be notified immediately.
              </div>
            </div>
            
            <div className="form-actions">
              <Button variant="outline" onClick={() => setIsAssignModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => assignCollector(selectedFarmer.id, 'Govind Singh')}>
                Assign & Notify
              </Button>
            </div>
          </div>
        )}
      </Modal>
      
      {/* Tester Bid Modal */}
      <Modal
        isOpen={isTesterBidModalOpen}
        onClose={() => setIsTesterBidModalOpen(false)}
        title="Select Tester for Batch"
      >
        {selectedBatch && (
          <div className="bid-form">
            <div className="form-group">
              <label className="form-label">Batch Details</label>
              <div className="batch-details">
                <strong>{selectedBatch.id} - {selectedBatch.herb}</strong>
                <span>Quantity: {selectedBatch.quantity} • Location: {selectedBatch.location}</span>
                <span>Current Bids: {selectedBatch.bids}</span>
              </div>
            </div>
            
            <div className="form-group">
              <label className="form-label">Available Testers</label>
              <div className="tester-options">
                {testers.map(tester => (
                  <div key={tester.id} className="tester-option">
                    <input 
                      type="radio" 
                      id={`tester-${tester.id}`}
                      name="tester"
                      value={tester.name}
                    />
                    <label htmlFor={`tester-${tester.id}`}>
                      <div className="tester-option-info">
                        <strong>{tester.name}</strong>
                        <span>{tester.location} • Rating: {tester.rating}</span>
                      </div>
                    </label>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="form-actions">
              <Button variant="outline" onClick={() => setIsTesterBidModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => handleTesterBid(selectedBatch.id, 'Dr. Sharma Lab')}>
                Select Tester
              </Button>
            </div>
          </div>
        )}
      </Modal>
      
      {/* Manufacturer Bid Modal */}
      <Modal
        isOpen={isManufacturerBidModalOpen}
        onClose={() => setIsManufacturerBidModalOpen(false)}
        title="Select Manufacturer for Batch"
      >
        {selectedBatch && (
          <div className="bid-form">
            <div className="form-group">
              <label className="form-label">Batch Details</label>
              <div className="batch-details">
                <strong>{selectedBatch.id} - {selectedBatch.herb}</strong>
                <span>Quantity: {selectedBatch.quantity} • Highest Bid: {selectedBatch.highestBid}</span>
              </div>
            </div>
            
            <div className="form-group">
              <label className="form-label">Available Manufacturers</label>
              <div className="manufacturer-options">
                {manufacturers.map(manufacturer => (
                  <div key={manufacturer.id} className="manufacturer-option">
                    <input 
                      type="radio" 
                      id={`manufacturer-${manufacturer.id}`}
                      name="manufacturer"
                      value={manufacturer.name}
                    />
                    <label htmlFor={`manufacturer-${manufacturer.id}`}>
                      <div className="manufacturer-option-info">
                        <strong>{manufacturer.name}</strong>
                        <span>{manufacturer.location} • Rating: {manufacturer.rating}</span>
                        <span>Active Bids: {manufacturer.activeBids}</span>
                      </div>
                    </label>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="form-note">
              <div className="note-icon">💰</div>
              <div className="note-content">
                <strong>Note:</strong> Selected manufacturer will be notified immediately 
                and will receive the batch from the collector.
              </div>
            </div>
            
            <div className="form-actions">
              <Button variant="outline" onClick={() => setIsManufacturerBidModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => handleManufacturerBid(selectedBatch.id, 'Himalaya Herbals')}>
                Select Manufacturer
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}