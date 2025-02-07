import React, { useState , useEffect} from 'react';
import './AdminPage.css';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const AdminPage = () => {
  const [activeSection, setActiveSection] = useState('dashboard','analytics'); // Default section
  const chartInstances = {};

  useEffect(() => {
    if (activeSection === 'analytics') {
      // Destroy existing charts if they exist
      const destroyChartIfExists = (chartId) => {
        if (chartInstances[chartId]) {
          chartInstances[chartId].destroy();
        }
      };

      const initializeChart = (chartId, ctx, config) => {
        destroyChartIfExists(chartId); // Destroy previous instance
        chartInstances[chartId] = new Chart(ctx, config); // Create new instance
      };

      // User Engagement Chart
      const userEngagementCanvas = document.getElementById('userEngagementChart');
      if (userEngagementCanvas) {
        initializeChart('userEngagementChart', userEngagementCanvas.getContext('2d'), {
          type: 'line',
          data: {
            labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
            datasets: [
              {
                label: 'Active Users',
                data: [50, 100, 150, 200, 170, 180, 220],
                backgroundColor: 'rgba(54, 162, 235, 0.5)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 2,
              },
            ],
          },
          options: {
            responsive: true,
            plugins: { legend: { display: true } },
          },
        });
      }

      // Sales Trends Chart
      const salesTrendsCanvas = document.getElementById('salesTrendsChart');
      if (salesTrendsCanvas) {
        initializeChart('salesTrendsChart', salesTrendsCanvas.getContext('2d'), {
          type: 'bar',
          data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
            datasets: [
              {
                label: 'Sales (in USD)',
                data: [5000, 8000, 6000, 12000, 14000, 18000, 20000],
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
              },
            ],
          },
          options: {
            responsive: true,
            plugins: { legend: { display: true } },
          },
        });
      }

      // Traffic Overview Chart
      const trafficOverviewCanvas = document.getElementById('trafficOverviewChart');
      if (trafficOverviewCanvas) {
        initializeChart('trafficOverviewChart', trafficOverviewCanvas.getContext('2d'), {
          type: 'pie',
          data: {
            labels: ['Direct', 'Referral', 'Social Media', 'Email Campaigns'],
            datasets: [
              {
                data: [40, 25, 20, 15],
                backgroundColor: ['#007bff', '#dc3545', '#ffc107', '#28a745'],
              },
            ],
          },
          options: {
            responsive: true,
            plugins: { legend: { position: 'bottom' } },
          },
        });
      }
    }

    // Cleanup function to destroy all charts when the component unmounts or section changes
    return () => {
      Object.values(chartInstances).forEach((chart) => chart.destroy());
    };
  }, [activeSection]); // Run only when the active section changes
 // Run only when the active section changes
  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return (
          <div className="dashboard-content">
            <h2>Admin Dashboard</h2>
            <p style={ {color:'black'} }>Overview of system activities:</p>
            <div className="dashboard-stats">
              <div className="stat-card">
                <h3>Active Users</h3>
                <p>1,245</p>
              </div>
              <div className="stat-card">
                <h3>Orders Processed</h3>
                <p>342</p>
              </div>
              <div className="stat-card">
                <h3>Pending Tasks</h3>
                <p>5</p>
              </div>
              <div className="stat-card">
                <h3>System Performance</h3>
                <p>95%</p>
              </div>
            </div>
            <h3>Recent Activities</h3>
            <ul className="recent-activities">
              <li>User John Doe updated settings.</li>
              <li>5 new orders dispatched today.</li>
              <li>System performance improved by 5%.</li>
              <li>3 new user accounts created.</li>
            </ul>
          </div>
        );
        case 'userManagement':
          return (
            <div className="user-management-content">
              <h2>User Management</h2>
              <p>Manage and modify user accounts here:</p>
              <table className="user-table">
                <thead>
                  <tr>
                    <th>User ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>John Doe</td>
                    <td>john.doe@pcsassure.me</td>
                    <td>Admin</td>
                    <td>Active</td>
                    <td>
                      <button className="action-button edit">Edit</button>
                      <button className="action-button delete">Delete</button>
                    </td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>Jane Smith</td>
                    <td>jane.smith@pcsassure.me</td>
                    <td>User</td>
                    <td>Inactive</td>
                    <td>
                      <button className="action-button edit">Edit</button>
                      <button className="action-button delete">Delete</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          );        
          case 'settings':
            return (
              <div className="settings-content">
                <h2>System Settings</h2>
                <p>Configure application and system settings below:</p>
          
                <div className="settings-section">
                  <h3>General Settings</h3>
                  <div className="setting-item">
                    <label htmlFor="app-theme">Application Theme</label>
                    <select id="app-theme" className="dropdown">
                      <option value="light">Light</option>
                      <option value="dark">Dark</option>
                      <option value="system">System Default</option>
                    </select>
                  </div>
          
                  <div className="setting-item">
                    <label htmlFor="language">Default Language</label>
                    <select id="language" className="dropdown">
                      <option value="en">English</option>
                      <option value="es">Spanish</option>
                      <option value="fr">French</option>
                    </select>
                  </div>
                </div>
          
                <div className="settings-section">
                  <h3>Security Settings</h3>
                  <div className="setting-item">
                    <label htmlFor="two-factor">Enable Two-Factor Authentication</label>
                    <input type="checkbox" id="two-factor" className="toggle" />
                  </div>
          
                  <div className="setting-item">
                    <label htmlFor="password-expiry">Password Expiry (Days)</label>
                    <input type="number" id="password-expiry" min="1" max="365" placeholder="90" />
                  </div>
                </div>
          
                <div className="settings-section">
                  <h3>Notification Settings</h3>
                  <div className="setting-item">
                    <label htmlFor="email-notifications">Email Notifications</label>
                    <input type="checkbox" id="email-notifications" className="toggle" />
                  </div>
          
                  <div className="setting-item">
                    <label htmlFor="sms-notifications">SMS Notifications</label>
                    <input type="checkbox" id="sms-notifications" className="toggle" />
                  </div>
                </div>
          
                <button className="save-button">Save Changes</button>
              </div>
            );
          
            case 'analytics':
              return (
                <div className="analytics-content">
                  <h2>Performance Analytics</h2>
                  <p>Analyze system and user performance below:</p>
            
                  <div className="analytics-charts">
                    {/* User Engagement Chart */}
                    <div className="chart-card">
                      <h3>User Engagement</h3>
                      <canvas id="userEngagementChart"></canvas>
                    </div>
            
                    {/* Sales Trends Chart */}
                    <div className="chart-card">
                      <h3>Sales Trends</h3>
                      <canvas id="salesTrendsChart"></canvas>
                    </div>
            
                    {/* Traffic Overview Chart */}
                    <div className="chart-card">
                      <h3>Traffic Overview</h3>
                      <canvas id="trafficOverviewChart"></canvas>
                    </div>
                  </div>
                </div>
              );
            
      default:
        return <p>Select an option from the sidebar.</p>;
    }
  };

  return (
    <div className="admin-container">
      <div className="sidebar">
        <button className={`sidebar-button ${activeSection === 'dashboard' ? 'active' : ''}`} onClick={() => setActiveSection('dashboard')}>
          Dashboard
        </button>
        <button className={`sidebar-button ${activeSection === 'userManagement' ? 'active' : ''}`} onClick={() => setActiveSection('userManagement')}>
          User Management
        </button>
        <button className={`sidebar-button ${activeSection === 'settings' ? 'active' : ''}`} onClick={() => setActiveSection('settings')}>
          Settings
        </button>
        <button
          className={`sidebar-button ${activeSection === 'analytics' ? 'active' : ''}`}
          onClick={() => setActiveSection('analytics')}
        >
          Analytics
        </button>
      </div>
      <div className="content">{renderContent()}</div>
    </div>
  );
};

export default AdminPage;
