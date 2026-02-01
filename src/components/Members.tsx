import { useState } from 'react';
import './Members.css';

interface Member {
  id: string;
  fullName: string;
  mobile: string;
  email: string;
  idNo: string;
  memberSince: string;
}

const Members = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const members: Member[] = [
    {
      id: '1',
      fullName: 'John Doe',
      mobile: '+256 700 123 456',
      email: 'john.doe@email.com',
      idNo: 'CM123456789',
      memberSince: '15 Jan, 2024',
    },
    {
      id: '2',
      fullName: 'Jane Smith',
      mobile: '+256 701 234 567',
      email: 'jane.smith@email.com',
      idNo: 'CM234567890',
      memberSince: '22 Feb, 2024',
    },
    {
      id: '3',
      fullName: 'Robert Johnson',
      mobile: '+256 702 345 678',
      email: 'robert.johnson@email.com',
      idNo: 'CM345678901',
      memberSince: '10 Mar, 2024',
    },
    {
      id: '4',
      fullName: 'Sarah Williams',
      mobile: '+256 703 456 789',
      email: 'sarah.williams@email.com',
      idNo: 'CM456789012',
      memberSince: '05 Apr, 2024',
    },
    {
      id: '5',
      fullName: 'Michael Brown',
      mobile: '+256 704 567 890',
      email: 'michael.brown@email.com',
      idNo: 'CM567890123',
      memberSince: '18 May, 2024',
    },
  ];

  const filteredMembers = members.filter((member) => {
    const matchesSearch =
      member.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.mobile.includes(searchQuery) ||
      member.idNo.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="members-section">
      <div className="section-header">
        <div className="section-title">
          <h2>Members</h2>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M12 16v-4"></path>
            <path d="M12 8h.01"></path>
          </svg>
        </div>
        <div className="members-filters">
          <div className="search-input-wrapper">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.35-4.35"></path>
            </svg>
            <input
              type="text"
              placeholder="Search members..."
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
            <option value="all">All Members</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
          <button className="invite-member-btn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            Invite Member
          </button>
        </div>
      </div>
      <div className="members-table-container">
        <table className="members-table">
          <thead>
            <tr>
              <th>FULL NAME</th>
              <th>MOBILE</th>
              <th>EMAIL</th>
              <th>ID NO</th>
              <th>MEMBER SINCE</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {filteredMembers.map((member) => (
              <tr key={member.id}>
                <td>
                  <div className="member-name-cell">
                    <div className="member-avatar">
                      {member.fullName
                        .split(' ')
                        .map((n) => n[0])
                        .join('')
                        .toUpperCase()}
                    </div>
                    <span>{member.fullName}</span>
                  </div>
                </td>
                <td>{member.mobile}</td>
                <td>{member.email}</td>
                <td>{member.idNo}</td>
                <td>{member.memberSince}</td>
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

export default Members;
