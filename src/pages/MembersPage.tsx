import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Members from '../components/Members';
import './DashboardPage.css';

const MembersPage = () => {
  return (
    <div className="dashboard-layout">
      <Sidebar />
      <div className="dashboard-main">
        <Header />
        <div className="dashboard-content">
          <div className="content-header">
            <h2>Members</h2>
          </div>
          <Members />
        </div>
      </div>
    </div>
  );
};

export default MembersPage;
