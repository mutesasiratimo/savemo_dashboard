import { useState } from 'react';
import './Groups.css';

interface Group {
  id: string;
  name: string;
  members: number;
  totalSavings: number;
  createdDate: string;
  status: 'Active' | 'Inactive';
}

const Groups = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const groups: Group[] = [
    {
      id: '1',
      name: 'CEC Group Savings',
      members: 25,
      totalSavings: 500000,
      createdDate: '15 Jan, 2024',
      status: 'Active',
    },
    {
      id: '2',
      name: 'Youth Savings Club',
      members: 18,
      totalSavings: 300000,
      createdDate: '20 Feb, 2024',
      status: 'Active',
    },
    {
      id: '3',
      name: 'Women Empowerment Group',
      members: 30,
      totalSavings: 750000,
      createdDate: '10 Mar, 2024',
      status: 'Active',
    },
    {
      id: '4',
      name: 'Community Development Fund',
      members: 45,
      totalSavings: 1200000,
      createdDate: '05 Apr, 2024',
      status: 'Inactive',
    },
    {
      id: '5',
      name: 'Business Startups Group',
      members: 12,
      totalSavings: 200000,
      createdDate: '22 May, 2024',
      status: 'Active',
    },
  ];

  const filteredGroups = groups.filter((group) => {
    const matchesSearch = group.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || group.status.toLowerCase() === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="groups-section">
      <div className="section-header">
        <div className="section-title">
          <h2>Groups</h2>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M12 16v-4"></path>
            <path d="M12 8h.01"></path>
          </svg>
        </div>
        <div className="groups-filters">
          <div className="search-input-wrapper">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.35-4.35"></path>
            </svg>
            <input
              type="text"
              placeholder="Search groups..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>
          <select
            className="filter-select"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>
      <div className="groups-table-container">
        <table className="groups-table">
          <thead>
            <tr>
              <th>GROUP NAME</th>
              <th>MEMBERS</th>
              <th>TOTAL SAVINGS</th>
              <th>CREATED DATE</th>
              <th>STATUS</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {filteredGroups.map((group) => (
              <tr key={group.id}>
                <td className="group-name-cell">{group.name}</td>
                <td>{group.members}</td>
                <td className="amount-cell">UGX {group.totalSavings.toLocaleString()}</td>
                <td>{group.createdDate}</td>
                <td>
                  <span className={`status-badge ${group.status.toLowerCase()}`}>
                    {group.status}
                  </span>
                </td>
                <td>
                  <div className="actions-cell">
                    <button className="action-btn view" title="View">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                      </svg>
                    </button>
                    <button className="action-btn edit" title="Edit">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                      </svg>
                    </button>
                    <button className="action-btn delete" title="Delete">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="3 6 5 6 21 6"></polyline>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Groups;
