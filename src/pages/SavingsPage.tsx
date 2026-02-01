import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Savings from '../components/Savings';
import './DashboardPage.css';

const SavingsPage = () => {
  return (
    <div className="dashboard-layout">
      <Sidebar />
      <div className="dashboard-main">
        <Header />
        <div className="dashboard-content">
          <div className="content-header">
            <h2>Savings</h2>
          </div>
          <Savings />
        </div>
      </div>
    </div>
  );
};

export default SavingsPage;
