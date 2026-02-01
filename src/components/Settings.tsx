import { useState } from 'react';
import './Settings.css';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('profile');

  const tabs = [
    { id: 'profile', label: 'Profile' },
    { id: 'group-settings', label: 'Group Settings' },
    { id: 'role-management', label: 'Role Management' },
    { id: 'payments', label: 'Payments' },
    { id: 'notifications', label: 'Notifications' },
    { id: 'alerts', label: 'Alerts' },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div className="settings-content">
            <h3>Profile Settings</h3>
            <p>Manage your personal profile information and preferences.</p>
            {/* Add profile form fields here */}
          </div>
        );
      case 'group-settings':
        return (
          <div className="settings-content">
            <h3>Group Settings</h3>
            <p>Configure your group settings and preferences.</p>
            {/* Add group settings form fields here */}
          </div>
        );
      case 'payments':
        return (
          <div className="settings-content">
            <h3>Payment Settings</h3>
            <p>Manage your payment methods and billing information.</p>
            {/* Add payment settings form fields here */}
          </div>
        );
      case 'notifications':
        return (
          <div className="settings-content">
            <h3>Notification Settings</h3>
            <p>Customize your notification preferences.</p>
            {/* Add notification settings form fields here */}
          </div>
        );
      case 'alerts':
        return (
          <div className="settings-content">
            <h3>Alert Settings</h3>
            <p>Configure your alert preferences and thresholds.</p>
            {/* Add alert settings form fields here */}
          </div>
        );
      case 'role-management':
        return (
          <div className="settings-content">
            <h3>Role Management</h3>
            <p>Manage user roles and permissions for your group.</p>
            {/* Add role management form fields here */}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="settings-section">
      <div className="settings-header">
        <h2>Settings</h2>
      </div>
      <div className="settings-container">
        <div className="settings-tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`settings-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="settings-tab-content">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default Settings;
