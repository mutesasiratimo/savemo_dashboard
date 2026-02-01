import { Link, useLocation } from 'react-router-dom';
import savmoLogo from '../assets/savemo_logo 1.png';
import './Sidebar.css';

// Font Awesome style SVG icons
const DashboardIcon = () => (
  <svg width="16" height="16" viewBox="0 0 576 512" fill="currentColor">
    <path d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V256H32c-17 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z"/>
  </svg>
);

const TransactionsIcon = () => (
  <svg width="16" height="16" viewBox="0 0 512 512" fill="currentColor">
    <path d="M0 32C0 14.3 14.3 0 32 0H160c17.7 0 32 14.3 32 32V192H0V32zM0 224H192V416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32V224zM224 32c0-17.7 14.3-32 32-32H480c17.7 0 32 14.3 32 32V192H224V32zM224 224H512V416c0 17.7-14.3 32-32 32H256c-17.7 0-32-14.3-32-32V224z"/>
  </svg>
);

const MembersIcon = () => (
  <svg width="16" height="16" viewBox="0 0 640 512" fill="currentColor">
    <path d="M144 0a80 80 0 1 1 0 160A80 80 0 1 1 144 0zM512 0a80 80 0 1 1 0 160A80 80 0 1 1 512 0zM0 298.7C0 239.8 47.8 192 106.7 192h42.7c15.9 0 31 3.5 44.6 9.7c-1.3 7.2-1.9 14.7-1.9 22.3c0 38.2 16.8 72.5 43.5 96c-.5 3.2-1.1 6.4-1.9 9.7H8c-4.4 0-8-3.6-8-8V298.7zM224 256a96 96 0 1 1 192 0 96 96 0 1 1 -192 0zM533.3 192c58.9 0 106.7 47.8 106.7 106.7V416c0 4.4-3.6 8-8 8H490.7c-.8-3.3-1.5-6.6-1.9-9.7c26.7-23.5 43.5-57.8 43.5-96c0-7.6-.7-15-1.9-22.3c13.6-6.2 28.7-9.7 44.6-9.7h42.7zM320 256a96 96 0 1 1 0 192 96 96 0 1 1 0-192zM368 480a144 144 0 1 1 288 0 144 144 0 1 1 -288 0z"/>
  </svg>
);

const EventsIcon = () => (
  <svg width="16" height="16" viewBox="0 0 640 512" fill="currentColor">
    <path d="M211.2 96a64 64 0 1 0 -128 0 64 64 0 1 0 128 0zM32 256c0 17.7 14.3 32 32 32H96c17.7 0 32-14.3 32-32s-14.3-32-32-32H64c-17.7 0-32 14.3-32 32zM576 224c-17.7 0-32 14.3-32 32s14.3 32 32 32h32c17.7 0 32-14.3 32-32s-14.3-32-32-32H576zM211.2 416a64 64 0 1 0 -128 0 64 64 0 1 0 128 0zM96 320H64c-17.7 0-32 14.3-32 32s14.3 32 32 32H96c17.7 0 32-14.3 32-32s-14.3-32-32-32zM428.8 96a64 64 0 1 0 -128 0 64 64 0 1 0 128 0zM384 320c-17.7 0-32 14.3-32 32s14.3 32 32 32h32c17.7 0 32-14.3 32-32s-14.3-32-32-32H384zM544 224a64 64 0 1 0 0-128 64 64 0 1 0 0 128zM512 320H480c-17.7 0-32 14.3-32 32s14.3 32 32 32h32c17.7 0 32-14.3 32-32s-14.3-32-32-32zM320 320a64 64 0 1 0 0-128 64 64 0 1 0 0 128zM288 416H256c-17.7 0-32 14.3-32 32s14.3 32 32 32h32c17.7 0 32-14.3 32-32s-14.3-32-32-32z"/>
  </svg>
);

const SavingsGroupsIcon = () => (
  <svg width="16" height="16" viewBox="0 0 640 512" fill="currentColor">
    <path d="M211.2 96a64 64 0 1 0 -128 0 64 64 0 1 0 128 0zM32 256c0 17.7 14.3 32 32 32H96c17.7 0 32-14.3 32-32s-14.3-32-32-32H64c-17.7 0-32 14.3-32 32zM576 224c-17.7 0-32 14.3-32 32s14.3 32 32 32h32c17.7 0 32-14.3 32-32s-14.3-32-32-32H576zM211.2 416a64 64 0 1 0 -128 0 64 64 0 1 0 128 0zM96 320H64c-17.7 0-32 14.3-32 32s14.3 32 32 32H96c17.7 0 32-14.3 32-32s-14.3-32-32-32zM428.8 96a64 64 0 1 0 -128 0 64 64 0 1 0 128 0zM384 320c-17.7 0-32 14.3-32 32s14.3 32 32 32h32c17.7 0 32-14.3 32-32s-14.3-32-32-32H384zM544 224a64 64 0 1 0 0-128 64 64 0 1 0 0 128zM512 320H480c-17.7 0-32 14.3-32 32s14.3 32 32 32h32c17.7 0 32-14.3 32-32s-14.3-32-32-32zM320 320a64 64 0 1 0 0-128 64 64 0 1 0 0 128zM288 416H256c-17.7 0-32 14.3-32 32s14.3 32 32 32h32c17.7 0 32-14.3 32-32s-14.3-32-32-32z"/>
  </svg>
);

const LoansIcon = () => (
  <svg width="16" height="16" viewBox="0 0 576 512" fill="currentColor">
    <path d="M64 64C28.7 64 0 92.7 0 128V384c0 35.3 28.7 64 64 64H512c35.3 0 64-28.7 64-64V128c0-35.3-28.7-64-64-64H64zm80 224H208c8.8 0 16 7.2 16 16s-7.2 16-16 16H144c-8.8 0-16-7.2-16-16s7.2-16 16-16zm80 0H368c8.8 0 16 7.2 16 16s-7.2 16-16 16H224c-8.8 0-16-7.2-16-16s7.2-16 16-16zM144 192c0-8.8 7.2-16 16-16H208c8.8 0 16 7.2 16 16s-7.2 16-16 16H160c-8.8 0-16-7.2-16-16zM368 176c8.8 0 16 7.2 16 16s-7.2 16-16 16H224c-8.8 0-16-7.2-16-16s7.2-16 16-16H368zM512 64c17.7 0 32 14.3 32 32v32H448V96c0-17.7 14.3-32 32-32zM448 192h96V128H448v64zM448 320h96V256H448v64zM544 448c-17.7 0-32-14.3-32-32V384H448v32c0 17.7 14.3 32 32 32h64z"/>
  </svg>
);

const SavingsIcon = () => (
  <svg width="16" height="16" viewBox="0 0 576 512" fill="currentColor">
    <path d="M64 80c-8.8 0-16 7.2-16 16V416c0 8.8 7.2 16 16 16H512c8.8 0 16-7.2 16-16V96c0-8.8-7.2-16-16-16H64zM0 96C0 60.7 28.7 32 64 32H512c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96zM128 240c0-9.2 5.5-17.5 14-21.2l64-32c7.1-3.5 15.1-3.5 22.2 0l64 32c8.5 4.2 14 12 14 21.2v80c0 8.8-7.2 16-16 16H144c-8.8 0-16-7.2-16-16V240zM144 208l-64 32v64l64-32V208zm288-16c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16s-7.2 16-16 16H448c-8.8 0-16-7.2-16-16zm0 64c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16s-7.2 16-16 16H448c-8.8 0-16-7.2-16-16zm0 64c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16s-7.2 16-16 16H448c-8.8 0-16-7.2-16-16z"/>
  </svg>
);

const ReportsIcon = () => (
  <svg width="16" height="16" viewBox="0 0 512 512" fill="currentColor">
    <path d="M64 464c-8.8 0-16-7.2-16-16V64c0-8.8 7.2-16 16-16H224v80c0 17.7 14.3 32 32 32h80V448c0 8.8-7.2 16-16 16H64zM288 18.7L365.3 96H288V18.7zM352 160V96h66.7L352 18.7V160zm128 288c0 8.8-7.2 16-16 16H352c-8.8 0-16-7.2-16-16V352c0-8.8 7.2-16 16-16h112c8.8 0 16 7.2 16 16v96zm0-128c0 8.8-7.2 16-16 16H352c-8.8 0-16-7.2-16-16V224c0-8.8 7.2-16 16-16h112c8.8 0 16 7.2 16 16v96z"/>
  </svg>
);

const SettingsIcon = () => (
  <svg width="16" height="16" viewBox="0 0 512 512" fill="currentColor">
    <path d="M495.9 166.6c3.2 8.7 .5 18.4-6.4 24.6l-43.3 39.4c1.1 8.3 1.7 16.8 1.7 25.4s-.6 17.1-1.7 25.4l43.3 39.4c6.9 6.2 9.6 15.9 6.4 24.6c-4.4 11.9-9.7 23.3-15.8 34.3l-4.7 8.1c-6.6 11-14 21.4-22.1 31.2c-5.9 7.2-15.7 9.6-24.5 6.8l-55.7-17.7c-13.4 10.3-28.2 18.9-44 25.4l-12.5 57.1c-2 9.1-9 16.3-18.2 17.8c-13.8 2.3-28 3.5-42.5 3.5s-28.7-1.2-42.5-3.5c-9.2-1.5-16.2-8.7-18.2-17.8l-12.5-57.1c-15.8-6.5-30.6-15.1-44-25.4L83.1 425.9c-8.8 2.8-18.6 .3-24.5-6.8c-8.1-9.8-15.5-20.2-22.1-31.2l-4.7-8.1c-6.1-11-11.4-22.4-15.8-34.3c-3.2-8.7-.5-18.4 6.4-24.6l43.3-39.4C64.6 273.1 64 264.6 64 256s.6-17.1 1.7-25.4L22.4 191.2c-6.9-6.2-9.6-15.9-6.4-24.6c4.4-11.9 9.7-23.3 15.8-34.3l4.7-8.1c6.6-11 14-21.4 22.1-31.2c5.9-7.2 15.7-9.6 24.5-6.8l55.7 17.7c13.4-10.3 28.2-18.9 44-25.4l12.5-57.1c2-9.1 9-16.3 18.2-17.8C227.3 1.2 241.5 0 256 0s28.7 1.2 42.5 3.5c9.2 1.5 16.2 8.7 18.2 17.8l12.5 57.1c15.8 6.5 30.6 15.1 44 25.4l55.7-17.7c8.8-2.8 18.6-.3 24.5 6.8c8.1 9.8 15.5 20.2 22.1 31.2l4.7 8.1c6.1 11 11.4 22.4 15.8 34.3zM256 336a80 80 0 1 0 0-160 80 80 0 1 0 0 160z"/>
  </svg>
);

const Sidebar = () => {
  const location = useLocation();

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: <DashboardIcon /> },
    { path: '/transactions', label: 'Transactions', icon: <TransactionsIcon /> },
    { path: '/savings', label: 'Savings', icon: <SavingsIcon /> },
    { path: '/loans', label: 'Loans', icon: <LoansIcon /> },
  ];

  const adminNavItems = [
    { path: '/members', label: 'Members', icon: <MembersIcon /> },
    { path: '/reports', label: 'Reports', icon: <ReportsIcon /> },
    { path: '/events', label: 'Events', icon: <EventsIcon /> },
    { path: '/savings-groups', label: 'Groups', icon: <SavingsGroupsIcon /> },
    { path: '/clients', label: 'Clients', icon: <SavingsGroupsIcon /> },

  ];

  return (
    <aside className="dashboard-sidebar">
      <div className="sidebar-logo-section">
        <div className="logo-container">
          <img src={savmoLogo} alt="Save Mo" className="logo-image" />
          <span className="logo-text">Save Mo</span>
        </div>
      </div>
      <div className="sidebar-user-section">
        <div className="user-profile">
          <div className="user-info">
            <div className="group-name">CEC Group Savings</div>
          </div>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </div>
      </div>

      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
          </Link>
        ))}
      </nav>

      <div className="sidebar-admin-section">
        <div className="sidebar-section-title">ADMIN</div>
        <nav className="sidebar-admin-nav">
          {adminNavItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>

      <div className="sidebar-divider"></div>

      <div className="sidebar-bottom-nav">
        <Link
          to="/settings"
          className={`nav-item ${location.pathname === '/settings' ? 'active' : ''}`}
        >
          <span className="nav-icon"><SettingsIcon /></span>
          <span className="nav-label">Settings</span>
        </Link>
      </div>

      <div className="sidebar-support">
        <Link to="/support" className="support-link">Get Support</Link>
        <div className="trial-banner">
          <div className="trial-text">Your free trial ends in 10 days</div>
          <Link to="/plans" className="trial-link">See plan →</Link>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
