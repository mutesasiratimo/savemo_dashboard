import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Loans from '../components/Loans';
import './DashboardPage.css';

const LoansPage = () => {
  return (
    <div className="dashboard-layout">
      <Sidebar />
      <div className="dashboard-main">
        <Header />
        <div className="dashboard-content">
          <div className="content-header">
            <h2>Loans</h2>
          </div>
          <Loans />
        </div>
      </div>
    </div>
  );
};

export default LoansPage;
