import React, { useState, useEffect, useRef, Fragment } from 'react';
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

import '../styles/Admin.css';

const Admin = () => {
  // State management
  const [activeTab, setActiveTab] = useState('dashboard');
  const [activeSubTab, setActiveSubTab] = useState({
    users: 'create-user',
    batches: 'stage-tracking',
    analytics: 'batch-analytics'
  });
  const [modalOpen, setModalOpen] = useState(null);
  const [showNotifications, setShowNotifications] = useState(false);

  // Chart references
  const batchChartRef = useRef(null);
  const [chartsInitialized, setChartsInitialized] = useState(false);

  // Stable data - no fluctuations
  const [notifications] = useState([
    { id: 1, title: 'New herb planting request', details: 'from Farmer Rajesh (ID: F-1245)', time: '2 minutes ago', type: 'info' },
    { id: 2, title: 'Tester accepted batch first', details: 'for Batch ID: HB-2023-08-124', time: '15 minutes ago', type: 'success' },
    { id: 3, title: 'Manufacturer quote received', details: 'from AyurPharma for Batch HB-2023-08-119', time: '1 hour ago', type: 'info' },
    { id: 4, title: 'Blockchain mint successful', details: 'for Token ID: 12478 (Batch HB-2023-08-115)', time: '3 hours ago', type: 'success' },
    { id: 5, title: 'Farmer delayed Stage 3', details: 'for Batch ID: HB-2023-08-121 (Ashwagandha)', time: '5 hours ago', type: 'warning' },
  ]);

  const [kpis] = useState({
    activeFarmers: 1247,
    batchesInProgress: 84,
    pendingTesterAssignments: 17,
    pendingManufacturerQuotes: 23,
    completedBatches: 892,
    blockchainTransactions: 5241,
    delayedStages: 12,
    complianceViolations: 4,
  });

  const [batches] = useState([
    {
      id: 'HB-2023-08-124', herb: 'Ashwagandha', farmer: 'Rajesh Kumar', collector: 'Anand Kumar',
      tester: 'HerbCheck Labs', manufacturer: 'Pending', stage: 3, completeness: 40,
      timeline: 'On track', status: 'inprogress', delay: 0
    },
    {
      id: 'HB-2023-08-123', herb: 'Tulsi', farmer: 'Suresh Patel', collector: 'Anand Kumar',
      tester: 'AyurTest Labs', manufacturer: 'Pending', stage: 5, completeness: 80,
      timeline: 'Delayed 2d', status: 'pending', delay: 2
    },
    {
      id: 'HB-2023-08-122', herb: 'Giloy', farmer: 'Mohan Singh', collector: 'Ravi Shankar',
      tester: 'HerbCheck Labs', manufacturer: 'Pending', stage: 2, completeness: 20,
      timeline: 'On track', status: 'inprogress', delay: 0
    },
    {
      id: 'HB-2023-08-121', herb: 'Turmeric', farmer: 'Amit Sharma', collector: 'Sanjay Patel',
      tester: 'AyurTest Labs', manufacturer: 'AyurPharma Ltd.', stage: 6, completeness: 100,
      timeline: 'Manufacturing', status: 'inprogress', delay: 0
    },
    {
      id: 'HB-2023-08-120', herb: 'Neem', farmer: 'Vijay Kumar', collector: 'Ravi Shankar',
      tester: 'HerbCheck Labs', manufacturer: 'Nature\'s Way', stage: 7, completeness: 100,
      timeline: 'Completed', status: 'completed', delay: 0
    },
  ]);

  const [collectors] = useState([
    {
      id: 'C-101', name: 'Anand Kumar', region: 'Vijayawada', phone: '+91 9876543210',
      email: 'anand@virtuherbchain.com', assignedBatches: 'B201', completed: 'Verification',
      avgTime: '18-12-2025', accuracy: 'Reassign', status: 'delayed',
    },
    {
      id: 'C-102', name: 'Ravi Shankar', region: 'Hyderabad', phone: '+91 9876543211',
      email: 'ravi@virtuherbchain.com', assignedBatches: 'B202', completed: 'Collection',
      avgTime: '22-12-2025', accuracy: 'In progress', status: 'active',
    },
    {
      id: 'C-103', name: 'Sanjay Patel', region: 'Warangal', phone: '+91 9876543212',
      email: 'sanjay@virtuherbchain.com', assignedBatches: 'B202', completed: 'Collection',
      avgTime: '15-12-2025', accuracy: 'Reassign', status: 'delayed', rating: 4.2
    },
  ]);

  const [testers] = useState([
    {
      id: 'T-101', name: 'HerbCheck Labs', location: 'Delhi', accreditation: 'NABL Certified',
      turnaround: 'B201', accuracy: '01-01-2026', acceptanceRate: '05-01-2026', rating: 'Approved', status: 'Pass'
    },
    {
      id: 'T-102', name: 'AyurTest Labs', location: 'Bangalore', accreditation: 'ISO 17025',
      turnaround: 'B202', accuracy: '31-12-2025', acceptanceRate: '06-01-2026', rating: 'Pending', status: 'Pending'
    },
    {
      id: 'T-103', name: 'Vedic Quality Labs', location: 'Mumbai', accreditation: 'FSSAI Approved',
      turnaround: 'B203', accuracy: '21-12-2025', acceptanceRate: '02-01-2026', rating: 'Approved', status: 'Pass'
    },
  ]);

  const [manufacturers] = useState([
    {
      id: 'M-101', name: 'AyurPharma Ltd.', location: 'Gujarat', license: 'GMP Certified',
      capacity: '5000 kg/month', successRate: '94%', avgProcessing: '5.2 days', rating: 4.7, status: 'active'
    },
    {
      id: 'M-102', name: 'HerbCare Solutions', location: 'Maharashtra', license: 'USFDA Approved',
      capacity: '3000 kg/month', successRate: '91%', avgProcessing: '6.1 days', rating: 4.5, status: 'active'
    },
    {
      id: 'M-103', name: 'Nature\'s Way', location: 'Kerala', license: 'Organic Certified',
      capacity: '2000 kg/month', successRate: '96%', avgProcessing: '4.8 days', rating: 4.9, status: 'active'
    },
  ]);

  const [manufacturerQuotes] = useState([
    {
      id: 'Q-001', batchId: 'HB-2023-08-119', manufacturer: 'AyurPharma Ltd.', amount: '₹124,500',
      time: '5 days', score: '94/100', status: 'pending', submitted: '2023-08-15'
    },
    {
      id: 'Q-002', batchId: 'HB-2023-08-119', manufacturer: 'HerbCare Solutions', amount: '₹118,200',
      time: '6 days', score: '91/100', status: 'pending', submitted: '2023-08-15'
    },
    {
      id: 'Q-003', batchId: 'HB-2023-08-118', manufacturer: 'Nature\'s Way', amount: '₹135,800',
      time: '4 days', score: '96/100', status: 'selected', submitted: '2023-08-14'
    },
  ]);

  const [geoFencingData] = useState({
    allowedZones: ['North India', 'South India', 'East India', 'West India'],
    violations: [
      { id: 'GV-001', batchId: 'HB-2023-08-110', type: 'Season Window', details: 'Harvested outside allowed season', date: '2023-08-10' },
      { id: 'GV-002', collectorId: 'C-103', type: 'Geo-fence', details: 'Moved 15km outside allowed zone', date: '2023-08-12' },
    ],
    compliance: {
      harvestRules: 98,
      qualityThresholds: 99,
      aiValidation: 99.3
    },
    mapMarkers: [
      { id: 1, lat: 28.7041, lng: 77.1025, type: 'farm', name: 'Rajesh Kumar Farm' },
      { id: 2, lat: 19.0760, lng: 72.8777, type: 'manufacturer', name: 'HerbCare Solutions' },
      { id: 3, lat: 12.9716, lng: 77.5946, type: 'tester', name: 'AyurTest Labs' },
      { id: 4, lat: 22.5726, lng: 88.3639, type: 'farm', name: 'East Region Farm' }
    ]
  });

const mapContainerStyle = {
  width: "100%",
  height: "400px",
  borderRadius: "8px",
};

const center = {
  lat: 17.385044, // Hyderabad (change if needed)
  lng: 78.486671,
};

const [blockchainData] = useState({
    fabric: {
      transactions: 5241,
      chaincodeCalls: 8920,
      worldState: 1247,
      lastTx: 'Tx-2023-08-124'
    },
    polygon: {
      nftsMinted: 892,
      contractAddress: '0x8a4...c3f2',
      lastTokenId: '#12478',
      lastTxHash: '0x5b2...9e1a'
    },
    smartLabeling: {
      labelsGenerated: 892,
      productIDs: 892,
      ipfsAvailable: '100%',
      nftSuccessRate: '100%',
      lastLabelId: 'LBL-2023-08-124'
    }
  });

  const [analytics] = useState({
    batch: {
      completionRate: 92,
      avgDuration: '45 days',
      successRate: 94,
      delayPatterns: { stage3: 12, stage5: 8, testing: 5 }
    },
    sustainability: {
      carbonFootprint: '1.2 ton CO2',
      waterSaved: '12,500 liters',
      organicCompliance: 98,
      geoConservation: 95
    }
  });

  const [settings] = useState({
    notifications: {
      delayReminders: true,
      visitSchedule: true,
      batchCompletion: true,
      testerAcceptance: true,
      manufacturerQuotes: false,
      blockchainTx: true
    },
    automation: {
      autoSelectTester: true,
      autoEscalate: true,
      weeklyAnalytics: false,
      autoSyncIPFS: true,
      autoAssignCollector: false,
      autoValidateAI: true
    },
    system: {
      fabricCA: 'https://fabric-ca.virtuherbchain.com',
      polygonRPC: 'https://polygon-rpc.com',
      nftContract: '0x8a4...c3f2',
      ipfsGateway: 'https://ipfs.io/ipfs'
    }
  });

  // Initialize charts
  useEffect(() => {
    const initializeCharts = async () => {
      try {
        const { Chart } = await import('chart.js/auto');

        // Batch Completion Chart
        if (batchChartRef.current) {
          const ctx = batchChartRef.current.getContext('2d');
          new Chart(ctx, {
            type: 'line',
            data: {
              labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
              datasets: [{
                label: 'Batches Completed',
                data: [65, 78, 90, 85, 92, 88, 95, 124],
                borderColor: '#2e7d32',
                backgroundColor: 'rgba(46, 125, 50, 0.1)',
                borderWidth: 2,
                fill: true,
                tension: 0.4
              }, {
                label: 'Batches in Progress',
                data: [45, 52, 60, 55, 70, 68, 75, 84],
                borderColor: '#ffb300',
                backgroundColor: 'rgba(255, 179, 0, 0.1)',
                borderWidth: 2,
                fill: true,
                tension: 0.4
              }]
            },
            options: {
              responsive: true,
              maintainAspectRatio: false,
              plugins: { legend: { position: 'top' } },
              scales: {
                y: {
                  beginAtZero: true,
                  title: { display: true, text: 'Number of Batches' }
                }
              }
            }
          });
        }

        setChartsInitialized(true);
      } catch (error) {
        console.error('Chart.js initialization error:', error);
      }
    };

    if (!chartsInitialized) {
      initializeCharts();
    }
  }, [chartsInitialized]);

  // Navigation
  const navItems = [
    { id: 'dashboard', icon: 'fa-tachometer-alt', label: 'Dashboard' },
    { id: 'collectors', icon: 'fa-truck-pickup', label: 'Collector Management' },
    { id: 'testers', icon: 'fa-flask', label: 'Tester Management' },
    { id: 'manufacturers', icon: 'fa-industry', label: 'Manufacturer Management' },
    { id: 'geofencing', icon: 'fa-map-marker-alt', label: 'Geo-Fencing' },
    { id: 'analytics', icon: 'fa-chart-bar', label: 'Analytics' },
    { id: 'settings', icon: 'fa-cog', label: 'Settings' },
  ];

  const userSubTabs = ['create-user', 'assign-permissions'];
  const batchSubTabs = ['batch-creation', 'compliance'];
  const analyticsSubTabs = ['batch-analytics', 'sustainability'];

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  const handleSubTabClick = (subTabId, parentTab) => {
    setActiveSubTab(prev => ({ ...prev, [parentTab]: subTabId }));
  };

  // Modal functions
  const openModal = (modalId) => {
    setModalOpen(modalId);
  };

  const closeModal = () => {
    setModalOpen(null);
  };

  // Action functions
  const generateLabel = () => {
    alert('Label generation initiated! ProductID: PRD-2023-08-119-01\nLabelID will be generated and QR code created.');
    closeModal();
  };

  const mintNFT = () => {
    openModal('mintNFTModal');
  };

  const confirmMint = () => {
    alert('NFT minting transaction submitted to Polygon network!\nTransaction hash: 0x5b2...9e1a\nTokenID: #12479');
    closeModal();
  };

  const assignCollector = () => {
    alert('Collector assigned successfully!');
    closeModal();
  };

  const assignTester = () => {
    alert('Tester assigned successfully!');
    closeModal();
  };

  const selectManufacturer = (quoteId) => {
    alert(`Manufacturer selected for quote ${quoteId}`);
  };

  const updateGeoFencingRules = () => {
    alert('Geo-fencing rules updated successfully!');
  };

  // Status badge component
  const StatusBadge = ({ status }) => {
    const statusConfig = {
      'pending': { class: 'status-pending', label: 'Pending' },
      'completed': { class: 'status-completed', label: 'Completed' },
      'inprogress': { class: 'status-inprogress', label: 'In Progress' },
      'active': { class: 'status-completed', label: 'Active' },
      'delayed': { class: 'status-pending', label: 'Delayed' },
      'selected': { class: 'status-completed', label: 'Selected' }
    };

    const config = statusConfig[status] || { class: '', label: status };
    return <span className={`status ${config.class}`}>{config.label}</span>;
  };

  // Progress bar component
  const ProgressBar = ({ percentage, color = '#2e7d32' }) => (
    <div style={{ width: '100%', height: '8px', backgroundColor: '#e0e0e0', borderRadius: '4px', overflow: 'hidden' }}>
      <div style={{ width: `${percentage}%`, height: '100%', backgroundColor: color, borderRadius: '4px' }}></div>
    </div>
  );

  // KPI Cards for dashboard
  const kpiCards = [
    { id: 'farmers', title: 'Active Farmers', value: kpis.activeFarmers.toLocaleString(), icon: 'fa-user-tie', change: { type: 'positive', value: '12% from last month' } },
    { id: 'batches', title: 'Batches in Progress', value: kpis.batchesInProgress, icon: 'fa-spinner', change: { type: 'negative', value: '3% delayed' } },
    { id: 'tester', title: 'Pending Tester Assignments', value: kpis.pendingTesterAssignments, icon: 'fa-tasks', change: { type: 'positive', value: 'Assign now' } },
    { id: 'quotes', title: 'Pending Manufacturer Quotes', value: kpis.pendingManufacturerQuotes, icon: 'fa-file-invoice-dollar', change: { type: 'neutral', value: 'Waiting for review' } },
    { id: 'completed', title: 'Completed Batches', value: kpis.completedBatches, icon: 'fa-check-circle', change: { type: 'positive', value: '8% this month' } },
    { id: 'delayed', title: 'Delayed Stages', value: kpis.delayedStages, icon: 'fa-clock', change: { type: 'negative', value: 'Needs attention' } },
  ];

  // Render functions for different tabs
  const renderDashboard = () => (
    <>
      <div className="dashboard-grid">
        {kpiCards.map(kpi => (
          <div className="card" key={kpi.id}>
            <div className="card-header">
              <div className="card-title">{kpi.title}</div>
              <div className="card-icon">
                <i className={`fas ${kpi.icon}`}></i>
              </div>
            </div>
            <div className="card-value">{kpi.value}</div>
            <div className={`card-change ${kpi.change.type}`}>
              {kpi.change.type === 'positive' && <i className="fas fa-arrow-up"></i>}
              {kpi.change.type === 'negative' && <i className="fas fa-arrow-down"></i>}
              {kpi.change.value}
            </div>
          </div>
        ))}
      </div>

      <div className="charts-section">
        <div className="chart-container">
          <h3 className="section-title"><i className="fas fa-chart-line"></i> Batch Completion Timeline</h3>
          <div style={{ height: '250px' }}>
            <canvas ref={batchChartRef}></canvas>
          </div>
        </div>

        <div className="notifications-container">
          <h3 className="section-title"><i className="fas fa-bell"></i> Recent Activity</h3>
          <div className="activity-list">
            <div className="activity-item">
              <div className="activity-icon success"><i className="fas fa-check-circle"></i></div>
              <div>
                <strong>Batch HB-2023-08-124</strong> moved to Stage 3
                <div className="activity-time">10 minutes ago</div>
              </div>
            </div>
            <div className="activity-item">
              <div className="activity-icon warning"><i className="fas fa-exclamation-triangle"></i></div>
              <div>
                <strong>Collector C-103</strong> delayed visit by 2 hours
                <div className="activity-time">45 minutes ago</div>
              </div>
            </div>
            <div className="activity-item">
              <div className="activity-icon info"><i className="fas fa-info-circle"></i></div>
              <div>
                <strong>New manufacturer</strong> HerbCare Solutions registered
                <div className="activity-time">2 hours ago</div>
              </div>
            </div>
            <div className="activity-item">
              <div className="activity-icon success"><i className="fas fa-link"></i></div>
              <div>
                <strong>Blockchain sync</strong> completed for 5 batches
                <div className="activity-time">3 hours ago</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="table-container">
        <h3 style={{ padding: '20px 20px 0 20px', color: '#1b5e20' }}>Recent Batches</h3>
        <table>
          <thead>
            <tr>
              <th>Batch ID</th>
              <th>Herb</th>
              <th>Stage</th>
              <th>Completeness</th>
              <th>Timeline</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {batches.map(batch => (
              <tr key={batch.id}>
                <td>{batch.id}</td>
                <td>{batch.herb}</td>
                <td>Stage {batch.stage}/7</td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: '60px' }}>{batch.completeness}%</div>
                    <ProgressBar percentage={batch.completeness} />
                  </div>
                </td>
                <td>{batch.timeline}</td>
                <td><StatusBadge status={batch.status} /></td>
                <td><button className="btn btn-primary" style={{ padding: '5px 10px', fontSize: '0.9rem' }} onClick={() => openModal('batchDetailsModal')}>View Details</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );

  const renderCollectorManagement = () => (
    <>
      <h2 className="section-title"><i className="fas fa-truck-pickup"></i> Collector Management</h2>
      <div className="dashboard-grid">
        <div className="card">
          <div className="card-header">
            <div className="card-title">Active Collectors</div>
            <div className="card-icon">
              <i className="fas fa-user-check"></i>
            </div>
          </div>
          <div className="card-value">{collectors.filter(c => c.status === 'active').length}</div>
          <div className="card-change positive"><i className="fas fa-arrow-up"></i> 5 new this month</div>
        </div>

        <div className="card">
          <div className="card-header">
            <div className="card-title">Avg. Assignment Time</div>
            <div className="card-icon">
              <i className="fas fa-clock"></i>
            </div>
          </div>
          <div className="card-value">2.4 hrs</div>
          <div className="card-change negative"><i className="fas fa-arrow-up"></i> 0.3 hrs longer</div>
        </div>

        <div className="card">
          <div className="card-header">
            <div className="card-title">Missed Visits</div>
            <div className="card-icon">
              <i className="fas fa-calendar-times"></i>
            </div>
          </div>
          <div className="card-value">12</div>
          <div className="card-change positive"><i className="fas fa-arrow-down"></i> 3 less than last month</div>
        </div>
      </div>

      <div className="table-container" style={{ marginTop: '30px' }}>
        <h3 style={{ padding: '20px 20px 0 20px', color: '#1b5e20' }}>Collector Status</h3>
        <table>
          <thead>
            <tr>
              <th>Collector ID</th>
              <th>Name</th>
              <th>Region</th>
              <th>Assigned Batch ID</th>
              <th>Current Task</th>
              <th>Due By</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {collectors.map(collector => (
              <tr key={collector.id}>
                <td>{collector.id}</td>
                <td>{collector.name}</td>
                <td>{collector.region}</td>
                <td>{collector.assignedBatches}</td>
                <td>{collector.completed}</td>
                <td>{collector.avgTime}</td>
                <td><StatusBadge status={collector.status} /></td>
                <td>{collector.accuracy}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );

  const renderTesterManagement = () => (
    <>
      <h2 className="section-title"><i className="fas fa-flask"></i> Tester Management</h2>
      <div className="dashboard-grid">
        <div className="card">
          <div className="card-header">
            <div className="card-title">Pending Tests</div>
            <div className="card-icon">
              <i className="fas fa-hourglass-half"></i>
            </div>
          </div>
          <div className="card-value">{kpis.pendingTesterAssignments}</div>
          <div className="card-change">Awaiting results</div>
        </div>

        <div className="card">
          <div className="card-header">
            <div className="card-title">Avg. Turnaround Time</div>
            <div className="card-icon">
              <i className="fas fa-stopwatch"></i>
            </div>
          </div>
          <div className="card-value">36 hrs</div>
          <div className="card-change positive"><i className="fas fa-arrow-down"></i> 4 hrs faster</div>
        </div>

        <div className="card">
          <div className="card-header">
            <div className="card-title">Test Accuracy</div>
            <div className="card-icon">
              <i className="fas fa-check-double"></i>
            </div>
          </div>
          <div className="card-value">99.1%</div>
          <div className="card-change">AI validated</div>
        </div>

      </div>

      <div className="table-container" style={{ marginTop: '30px' }}>
        <h3 style={{ padding: '20px 20px 0 20px', color: '#1b5e20' }}>Testing Labs</h3>
        <table>
          <thead>
            <tr>
              <th>Lab ID</th>
              <th>Name</th>
              <th>Accreditation</th>
              <th>Batch ID</th>
              <th>Sample Received On</th>
              <th>Expected Result Date</th>
              <th>Status</th>
              <th>Action</th>

            </tr>
          </thead>
          <tbody>
            {testers.map(tester => (
              <tr key={tester.id}>
                <td>{tester.id}</td>
                <td>{tester.name}</td>
                <td>{tester.accreditation}</td>
                <td>{tester.turnaround}</td>
                <td>{tester.accuracy}</td>
                <td>{tester.acceptanceRate}</td>
                <td><StatusBadge status={tester.status} /></td>
                <td>{tester.rating}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );

  const renderManufacturerManagement = () => (
    <>
      <h2 className="section-title"><i className="fas fa-industry"></i> Manufacturer Management</h2>

      <div className="dashboard-grid">
        <div className="card">
          <div className="card-header">
            <div className="card-title">Pending Quotes</div>
            <div className="card-icon">
              <i className="fas fa-file-invoice-dollar"></i>
            </div>
          </div>
          <div className="card-value">{kpis.pendingManufacturerQuotes}</div>
          <div className="card-change">Awaiting review</div>
        </div>

        <div className="card">
          <div className="card-header">
            <div className="card-title">Avg. Processing Time</div>
            <div className="card-icon">
              <i className="fas fa-clock"></i>
            </div>
          </div>
          <div className="card-value">5.2 days</div>
          <div className="card-change positive"><i className="fas fa-arrow-down"></i> 0.8 days faster</div>
        </div>

        <div className="card">
          <div className="card-header">
            <div className="card-title">Quote Success Rate</div>
            <div className="card-icon">
              <i className="fas fa-percentage"></i>
            </div>
          </div>
          <div className="card-value">87%</div>
          <div className="card-change positive"><i className="fas fa-arrow-up"></i> 5% increase</div>
        </div>
      </div>

      <div className="table-container" style={{ marginTop: '30px' }}>
        <h3 style={{ padding: '20px 20px 0 20px', color: '#1b5e20' }}>Manufacturer Quotes</h3>
        <table>
          <thead>
            <tr>
              <th>Quote ID</th>
              <th>Batch ID</th>
              <th>Manufacturer</th>
              <th>Quote Amount</th>
              <th>Processing Time</th>
              <th>Quality Score</th>
              <th>Submitted</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {manufacturerQuotes.map(quote => (
              <tr key={quote.id}>
                <td>{quote.id}</td>
                <td>{quote.batchId}</td>
                <td>{quote.manufacturer}</td>
                <td>{quote.amount}</td>
                <td>{quote.time}</td>
                <td>{quote.score}</td>
                <td>{quote.submitted}</td>
                <td><StatusBadge status={quote.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );

  const renderGeofencing = () => (
    <>
      <h2 className="section-title"><i className="fas fa-map-marker-alt"></i> Geo-Fencing & Compliance Monitoring</h2>

      <div className="dashboard-grid">
        <div className="card">
          <div className="card-header">
            <div className="card-title">Allowed Zones</div>
            <div className="card-icon">
              <i className="fas fa-globe-asia"></i>
            </div>
          </div>
          <div className="card-value">{geoFencingData.allowedZones.length}</div>
          <div className="card-change">India: North, South, East, West</div>
        </div>

        <div className="card">
          <div className="card-header">
            <div className="card-title">Season Window Violations</div>
            <div className="card-icon">
              <i className="fas fa-calendar-times"></i>
            </div>
          </div>
          <div className="card-value">{geoFencingData.violations.filter(v => v.type === 'Season Window').length}</div>
          <div className="card-change negative"><i className="fas fa-arrow-up"></i> This month</div>
        </div>

        <div className="card">
          <div className="card-header">
            <div className="card-title">AI Threshold Compliance</div>
            <div className="card-icon">
              <i className="fas fa-robot"></i>
            </div>
          </div>
          <div className="card-value">{geoFencingData.compliance.aiValidation}%</div>
          <div className="card-change positive"><i className="fas fa-arrow-up"></i> Within limits</div>
        </div>

        <div className="card">
          <div className="card-header">
            <div className="card-title">Out-of-Range Violations</div>
            <div className="card-icon">
              <i className="fas fa-exclamation-triangle"></i>
            </div>
          </div>
          <div className="card-value">{geoFencingData.violations.filter(v => v.type === 'Geo-fence').length}</div>
          <div className="card-change negative"><i className="fas fa-arrow-up"></i> Collector moved</div>
        </div>
      </div>

<LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
  <GoogleMap
    mapContainerStyle={mapContainerStyle}
    center={center}
    zoom={6}
  >
    {/* Farm */}
    <Marker position={{ lat: 17.5, lng: 78.4 }} />

    {/* Manufacturer */}
    <Marker position={{ lat: 16.8, lng: 80.6 }} />

    {/* Testing Lab */}
    <Marker position={{ lat: 18.1, lng: 79.2 }} />

    {/* Violation */}
    <Marker
      position={{ lat: 15.9, lng: 77.5 }}
      icon="http://maps.google.com/mapfiles/ms/icons/red-dot.png"
    />
  </GoogleMap>
</LoadScript>
 <div style={{ display: 'flex', gap: '100px', marginTop:'40px' }}>
          <div style={{ background: 'white', padding: '25px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)',marginLeft:'100px' }}>
            <h3 style={{ color: '#1b5e20', marginBottom: '15px' }}>Compliance Dashboard</h3>
            <div style={{ marginBottom: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                <span>_checkHarvestRules()</span>
                <span><i className="fas fa-check-circle" style={{ color: 'green' }}></i> {geoFencingData.compliance.harvestRules}% Pass</span>
              </div>
              <ProgressBar percentage={geoFencingData.compliance.harvestRules} />
            </div>
            
            <div style={{ marginBottom: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                <span>_checkQualityThresholds()</span>
                <span><i className="fas fa-check-circle" style={{ color: 'green' }}></i> {geoFencingData.compliance.qualityThresholds}% Pass</span>
              </div>
              <ProgressBar percentage={geoFencingData.compliance.qualityThresholds} />
            </div>
            
            <div style={{ marginBottom: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                <span>AI Model Validation</span>
                <span><i className="fas fa-check-circle" style={{ color: 'green' }}></i> {geoFencingData.compliance.aiValidation}% Pass</span>
              </div>
              <ProgressBar percentage={geoFencingData.compliance.aiValidation} />
            </div>
          </div>
          
          <div style={{ background: 'white', padding: '25px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
            <h3 style={{ color: '#1b5e20', marginBottom: '15px' }}><i className="fas fa-exclamation-triangle"></i> Recent Violations</h3>
            {geoFencingData.violations.map(violation => (
              <div key={violation.id} style={{ background: '#fff3cd', padding: '15px', borderRadius: '8px', marginBottom: '10px' }}>
                <div style={{ fontWeight: 'bold' }}>{violation.type}</div>
                <div style={{ fontSize: '0.9rem' }}>{violation.details}</div>
                <div style={{ fontSize: '0.8rem', color: '#666', marginTop: '5px' }}>
                  {violation.batchId || violation.collectorId} • {violation.date}
                </div>
              </div>
            ))}
          </div>
        </div>
    </>
  );

  const renderAnalytics = () => {
    const currentSubTab = activeSubTab['analytics'] || 'batch-analytics';

    return (
      <>
        <h2 className="section-title"><i className="fas fa-chart-bar"></i> Analytics & Reports</h2>

        <div className="tabs">
          {analyticsSubTabs.map(subTab => (
            <div
              key={subTab}
              className={`tab ${currentSubTab === subTab ? 'active' : ''}`}
              onClick={() => handleSubTabClick(subTab, 'analytics')}
            >
              {subTab.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
            </div>
          ))}
        </div>

        {currentSubTab === 'batch-analytics' && (
          <div id="batch-analytics" className="subtab-content active">
            <div className="dashboard-grid">
              <div className="card">
                <div className="card-header">
                  <div className="card-title">Batch Completion Rate</div>
                  <div className="card-icon">
                    <i className="fas fa-chart-line"></i>
                  </div>
                </div>
                <div className="card-value">{analytics.batch.completionRate}%</div>
                <div className="card-change positive"><i className="fas fa-arrow-up"></i> 5% this quarter</div>
              </div>

              <div className="card">
                <div className="card-header">
                  <div className="card-title">Average Duration</div>
                  <div className="card-icon">
                    <i className="fas fa-clock"></i>
                  </div>
                </div>
                <div className="card-value">{analytics.batch.avgDuration}</div>
                <div className="card-change positive"><i className="fas fa-arrow-down"></i> 3 days faster</div>
              </div>

              <div className="card">
                <div className="card-header">
                  <div className="card-title">Success Rate</div>
                  <div className="card-icon">
                    <i className="fas fa-check-double"></i>
                  </div>
                </div>
                <div className="card-value">{analytics.batch.successRate}%</div>
                <div className="card-change positive">Quality maintained</div>
              </div>

              <div className="card">
                <div className="card-header">
                  <div className="card-title">Delay in Stage 3</div>
                  <div className="card-icon">
                    <i className="fas fa-exclamation-triangle"></i>
                  </div>
                </div>
                <div className="card-value">{analytics.batch.delayPatterns.stage3}</div>
                <div className="card-change negative">Requires attention</div>
              </div>
            </div>

            <div style={{ background: 'white', padding: '25px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', marginTop: '30px' }}>
              <h3 style={{ color: '#1b5e20', marginBottom: '15px' }}>Delay Analysis by Stage</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div>
                  {Object.entries(analytics.batch.delayPatterns).map(([stage, count]) => (
                    <div key={stage} style={{ marginBottom: '15px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                        <span>Stage {stage.replace('stage', '')}:</span>
                        <span>{count} delays</span>
                      </div>
                      <ProgressBar percentage={(count / Math.max(...Object.values(analytics.batch.delayPatterns))) * 100} color="#ffb300" />
                    </div>
                  ))}
                </div>
                <div>
                  <h4 style={{ color: '#1b5e20', marginBottom: '15px' }}>Performance Insights</h4>
                  <div style={{ background: '#e8f5e9', padding: '15px', borderRadius: '8px' }}>
                    <div style={{ marginBottom: '10px' }}>
                      <div style={{ fontWeight: 'bold' }}>Top Performing Stage</div>
                      <div>Stage 6 (Manufacturing): 96% success rate</div>
                    </div>
                    <div style={{ marginBottom: '10px' }}>
                      <div style={{ fontWeight: 'bold' }}>Areas for Improvement</div>
                      <div>Stage 3 delays: Collector scheduling optimization needed</div>
                    </div>
                    <div>
                      <div style={{ fontWeight: 'bold' }}>Overall Efficiency</div>
                      <ProgressBar percentage={analytics.batch.completionRate} color="#2e7d32" />
                      <div style={{ textAlign: 'right', fontSize: '0.9rem', marginTop: '5px' }}>{analytics.batch.completionRate}% Completion Rate</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {currentSubTab === 'sustainability' && (
          <div id="sustainability" className="subtab-content">
            <div className="dashboard-grid">
              <div className="card">
                <div className="card-header">
                  <div className="card-title">Carbon Footprint</div>
                  <div className="card-icon">
                    <i className="fas fa-leaf"></i>
                  </div>
                </div>
                <div className="card-value">{analytics.sustainability.carbonFootprint}</div>
                <div className="card-change positive"><i className="fas fa-arrow-down"></i> 15% reduction</div>
              </div>

              <div className="card">
                <div className="card-header">
                  <div className="card-title">Water Saved</div>
                  <div className="card-icon">
                    <i className="fas fa-tint"></i>
                  </div>
                </div>
                <div className="card-value">{analytics.sustainability.waterSaved}</div>
                <div className="card-change positive">Traditional farming</div>
              </div>

              <div className="card">
                <div className="card-header">
                  <div className="card-title">Organic Compliance</div>
                  <div className="card-icon">
                    <i className="fas fa-seedling"></i>
                  </div>
                </div>
                <div className="card-value">{analytics.sustainability.organicCompliance}%</div>
                <div className="card-change positive">Certified organic</div>
              </div>

              <div className="card">
                <div className="card-header">
                  <div className="card-title">Geo-Conservation</div>
                  <div className="card-icon">
                    <i className="fas fa-globe"></i>
                  </div>
                </div>
                <div className="card-value">{analytics.sustainability.geoConservation}%</div>
                <div className="card-change positive">Biodiversity preserved</div>
              </div>
            </div>
          </div>
        )}
      </>
    );
  };

  const renderSettings = () => (
    <>
      <h2 className="section-title"><i className="fas fa-cog"></i> Settings & Automation</h2>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '25px' }}>
        <div style={{ background: 'white', padding: '25px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
          <h3 style={{ color: '#1b5e20', marginBottom: '20px' }}>Notification Rules</h3>

          <div className="form-group">
            <label>
              <input type="checkbox" checked={settings.notifications.delayReminders} readOnly />
              Delay reminders
            </label>
          </div>
          <div className="form-group">
            <label>
              <input type="checkbox" checked={settings.notifications.visitSchedule} readOnly />
              Visit schedule alerts
            </label>
          </div>
          <div className="form-group">
            <label>
              <input type="checkbox" checked={settings.notifications.batchCompletion} readOnly />
              Batch completion alerts
            </label>
          </div>
          <div className="form-group">
            <label>
              <input type="checkbox" checked={settings.notifications.testerAcceptance} readOnly />
              Tester acceptance alerts
            </label>
          </div>
          <div className="form-group">
            <label>
              <input type="checkbox" checked={settings.notifications.manufacturerQuotes} readOnly />
              Manufacturer quote alerts
            </label>
          </div>
          <div className="form-group">
            <label>
              <input type="checkbox" checked={settings.notifications.blockchainTx} readOnly />
              Blockchain transaction alerts
            </label>
          </div>

          <button className="btn btn-primary" style={{ marginTop: '15px' }}>Save Notification Settings</button>
        </div>

        <div style={{ background: 'white', padding: '25px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
          <h3 style={{ color: '#1b5e20', marginBottom: '20px' }}>Automation Settings</h3>

          <div className="form-group">
            <label>
              <input type="checkbox" checked={settings.automation.autoSelectTester} readOnly />
              Auto-select first tester
            </label>
          </div>
          <div className="form-group">
            <label>
              <input type="checkbox" checked={settings.automation.autoEscalate} readOnly />
              Auto-escalate delayed stages
            </label>
          </div>
          <div className="form-group">
            <label>
              <input type="checkbox" checked={settings.automation.weeklyAnalytics} readOnly />
              Auto-generate analytics weekly
            </label>
          </div>
          <div className="form-group">
            <label>
              <input type="checkbox" checked={settings.automation.autoSyncIPFS} readOnly />
              Auto-sync IPFS reports
            </label>
          </div>
          <div className="form-group">
            <label>
              <input type="checkbox" checked={settings.automation.autoAssignCollector} readOnly />
              Auto-assign nearest collector
            </label>
          </div>
          <div className="form-group">
            <label>
              <input type="checkbox" checked={settings.automation.autoValidateAI} readOnly />
              Auto-validate AI thresholds
            </label>
          </div>

          <button className="btn btn-primary" style={{ marginTop: '15px' }}>Save Automation Settings</button>
        </div>
      </div>
    </>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return renderDashboard();
      case 'users':
        return renderUserManagement();
      case 'collectors':
        return renderCollectorManagement();
      case 'testers':
        return renderTesterManagement();
      case 'manufacturers':
        return renderManufacturerManagement();
      case 'geofencing':
        return renderGeofencing();
      case 'analytics':
        return renderAnalytics();
      case 'settings':
        return renderSettings();
      default:
        return renderDashboard();
    }
  };

  return (
    <div className="app">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="logo">
          <h1>AyuSethu</h1>
        </div>
        <ul className="nav-menu">
          {navItems.map(item => (
            <li
              key={item.id}
              className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
              onClick={() => handleTabClick(item.id)}
            >
              <i className={`fas ${item.icon}`}></i>
              <span>{item.label}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Top Bar */}
        <div className="top-bar">
          <div className="page-title">
            <h2>Admin Dashboard</h2>
            <div style={{ fontSize: '0.9rem', color: '#666' }}>
              {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} • {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </div>
          </div>
          <div className="user-info">
            <div className="notification-icon-container">
              <i
                className="fas fa-bell"
                style={{ fontSize: '1.2rem', color: '#2e7d32', cursor: 'pointer', position: 'relative' }}
                onClick={() => setShowNotifications(!showNotifications)}
              >
                {/* Notification Badge */}
                {notifications.length > 0 && (
                  <span className="notification-badge">{notifications.length}</span>
                )}
              </i>

              {/* Notifications Dropdown */}
              {showNotifications && (
                <div className="notifications-dropdown">
                  <div className="notifications-header">
                    <h4>Notifications ({notifications.length})</h4>
                    <button
                      className="btn btn-sm btn-secondary"
                      onClick={() => setShowNotifications(false)}
                    >
                      <i className="fas fa-times"></i>
                    </button>
                  </div>
                  <div className="notifications-list">
                    {notifications.map(notification => (
                      <div key={notification.id} className={`notification-dropdown-item ${notification.type}`}>
                        <div className="notification-dropdown-content">
                          <strong>{notification.title}</strong>
                          <p>{notification.details}</p>
                          <small>{notification.time}</small>
                        </div>
                        <button className="notification-mark-read">
                          <i className="fas fa-check"></i>
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="notifications-footer">
                    <button className="btn btn-sm btn-block btn-secondary">
                      Mark all as read
                    </button>
                    <button className="btn btn-sm btn-block btn-primary">
                      View all notifications
                    </button>
                  </div>
                </div>
              )}
            </div>
            <div className="user-avatar">AD</div>
            <div>
              <div style={{ fontWeight: '600' }}>Admin User</div>
              <div style={{ fontSize: '0.9rem', color: '#666' }}>Super Administrator</div>
            </div>
          </div>
        </div>

        {/* Tab Content */}
        <div id={activeTab} className="tab-content active">
          {renderTabContent()}
        </div>
      </div>

      {/* Modals */}
      {modalOpen === 'assignCollectorModal' && (
        <div className="modal" style={{ display: 'flex' }}>
          <div className="modal-content">
            <div className="modal-header">
              <h2 style={{ color: '#1b5e20' }}>Assign Collector</h2>
              <span className="close-modal" onClick={closeModal}>&times;</span>
            </div>
            <div className="form-group">
              <label>Select Batch</label>
              <select defaultValue="">
                <option value="">Select a batch...</option>
                {batches.filter(b => b.stage === 1).map(batch => (
                  <option key={batch.id} value={batch.id}>{batch.id} ({batch.herb})</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Select Collector</label>
              <select defaultValue="">
                <option value="">Select a collector...</option>
                {collectors.filter(c => c.status === 'active').map(collector => (
                  <option key={collector.id} value={collector.id}>
                    {collector.name} ({collector.region}) - Rating: {collector.rating}/5.0
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Scheduled Visit Date</label>
              <input type="date" min={new Date().toISOString().split('T')[0]} />
            </div>
            <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
              <button className="btn btn-primary" onClick={assignCollector}>Assign Collector</button>
              <button className="btn btn-secondary" onClick={closeModal}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {modalOpen === 'generateLabelModal' && (
        <div className="modal" style={{ display: 'flex' }}>
          <div className="modal-content">
            <div className="modal-header">
              <h2 style={{ color: '#1b5e20' }}>Generate Smart Label</h2>
              <span className="close-modal" onClick={closeModal}>&times;</span>
            </div>
            <div className="form-group">
              <label>Select Batch for Labeling</label>
              <select defaultValue="">
                <option value="">Select a completed batch...</option>
                {batches.filter(b => b.stage === 7).map(batch => (
                  <option key={batch.id} value={batch.id}>{batch.id} ({batch.herb}) - Manufacturing Complete</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Label Type</label>
              <select defaultValue="standard">
                <option value="standard">Standard QR Label</option>
                <option value="enhanced">Enhanced Security Label</option>
                <option value="premium">Premium Holographic Label</option>
              </select>
            </div>
            <div style={{ background: '#e8f5e9', padding: '15px', borderRadius: '8px', margin: '20px 0' }}>
              <h4 style={{ color: '#1b5e20', marginBottom: '10px' }}>Will Generate:</h4>
              <ul>
                <li>ProductID: PRD-{new Date().toISOString().slice(0, 10).replace(/-/g, '')}-01</li>
                <li>LabelID: LBL-{Math.random().toString(36).substring(2, 15)} (hashed QR)</li>
                <li>MetadataCID: Qm{Math.random().toString(36).substring(2, 15)} (IPFS)</li>
                <li>NFT Token ID: #{parseInt(blockchainData.polygon.lastTokenId.slice(1)) + 1}</li>
                <li>QR Code for consumer verification</li>
              </ul>
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button className="btn btn-primary" onClick={generateLabel}>Generate Label & Mint NFT</button>
              <button className="btn btn-secondary" onClick={closeModal}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {modalOpen === 'mintNFTModal' && (
        <div className="modal" style={{ display: 'flex' }}>
          <div className="modal-content">
            <div className="modal-header">
              <h2 style={{ color: '#1b5e20' }}>Mint Herb NFT</h2>
              <span className="close-modal" onClick={closeModal}>&times;</span>
            </div>
            <div className="form-group">
              <label>Batch ID</label>
              <input type="text" value="HB-2023-08-119" readOnly />
            </div>
            <div className="form-group">
              <label>Metadata CID (IPFS)</label>
              <input type="text" value="QmXyZ123...abc456" readOnly />
            </div>
            <div className="form-group">
              <label>Manufacturing Summary</label>
              <textarea rows="4" readOnly>Turmeric powder, 100kg, Organic certified, Harvested Aug 2023, Processed by AyurPharma Ltd., Expiry: Aug 2025</textarea>
            </div>
            <div style={{ background: '#e8f5e9', padding: '15px', borderRadius: '8px', margin: '20px 0' }}>
              <h4 style={{ color: '#1b5e20', marginBottom: '10px' }}>NFT Minting Details</h4>
              <div>Network: Polygon Mainnet</div>
              <div>Contract: {blockchainData.polygon.contractAddress}</div>
              <div>Gas Estimate: ~0.01 MATIC</div>
              <div>Token ID: #{parseInt(blockchainData.polygon.lastTokenId.slice(1)) + 1}</div>
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button className="btn btn-primary" onClick={confirmMint}>Confirm & Mint NFT</button>
              <button className="btn btn-secondary" onClick={closeModal}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;