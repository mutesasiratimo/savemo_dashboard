import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import WelcomeBanner from '../components/WelcomeBanner';
import AccountSummary from '../components/AccountSummary';
import SavingGoals from '../components/SavingGoals';
import './DashboardPage.css';

const DashboardPage = () => {
  return (
    <div className="dashboard-layout">
      <Sidebar />
      <div className="dashboard-main">
        <Header />
        <div className="dashboard-content">
          <div className="content-header">
            <h2>Dashboard</h2>
          </div>
          <WelcomeBanner />
          <AccountSummary />
          <SavingGoals />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
