import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Settings from '../components/Settings';
import './DashboardPage.css';

const SettingsPage = () => {
  return (
    <div className="dashboard-layout">
      <Sidebar />
      <div className="dashboard-main">
        <Header />
        <div className="dashboard-content">
          <Settings />
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
