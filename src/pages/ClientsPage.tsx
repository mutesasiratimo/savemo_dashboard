import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Clients from '../components/Clients';
import './DashboardPage.css';

const ClientsPage = () => {
  return (
    <div className="dashboard-layout">
      <Sidebar />
      <div className="dashboard-main">
        <Header />
        <div className="dashboard-content">
          <div className="content-header">
            <h2>Clients</h2>
          </div>
          <Clients />
        </div>
      </div>
    </div>
  );
};

export default ClientsPage;
