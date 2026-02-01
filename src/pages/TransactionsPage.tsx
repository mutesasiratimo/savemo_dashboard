import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import TransactionActivity from '../components/TransactionActivity';
import './DashboardPage.css';

const TransactionsPage = () => {
  return (
    <div className="dashboard-layout">
      <Sidebar />
      <div className="dashboard-main">
        <Header />
        <div className="dashboard-content">
          <div className="content-header">
            <h2>Transactions</h2>
          </div>
          <TransactionActivity />
        </div>
      </div>
    </div>
  );
};

export default TransactionsPage;
