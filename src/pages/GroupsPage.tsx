import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Groups from '../components/Groups';
import './DashboardPage.css';

const GroupsPage = () => {
  return (
    <div className="dashboard-layout">
      <Sidebar />
      <div className="dashboard-main">
        <Header />
        <div className="dashboard-content">
          <div className="content-header">
            <h2>Groups</h2>
          </div>
          <Groups />
        </div>
      </div>
    </div>
  );
};

export default GroupsPage;
