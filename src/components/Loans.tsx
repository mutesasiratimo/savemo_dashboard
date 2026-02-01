import { useState } from 'react';
import './Loans.css';

interface Loan {
  id: string;
  member: string;
  amount: number;
  date: string;
  status: 'Active' | 'Paid' | 'Overdue';
  interest: number;
  dueDate: string;
  remaining: number;
}

const Loans = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const loans: Loan[] = [
    {
      id: '1',
      member: 'John Doe',
      amount: 50000,
      date: '15 Jan, 2025',
      status: 'Active',
      interest: 10,
      dueDate: '15 Apr, 2025',
      remaining: 35000,
    },
    {
      id: '2',
      member: 'Jane Smith',
      amount: 30000,
      date: '12 Jan, 2025',
      status: 'Active',
      interest: 8,
      dueDate: '12 Mar, 2025',
      remaining: 20000,
    },
    {
      id: '3',
      member: 'Robert Johnson',
      amount: 100000,
      date: '10 Jan, 2025',
      status: 'Paid',
      interest: 12,
      dueDate: '10 Feb, 2025',
      remaining: 0,
    },
    {
      id: '4',
      member: 'Sarah Williams',
      amount: 25000,
      date: '08 Jan, 2025',
      status: 'Overdue',
      interest: 15,
      dueDate: '08 Feb, 2025',
      remaining: 25000,
    },
    {
      id: '5',
      member: 'Michael Brown',
      amount: 75000,
      date: '05 Jan, 2025',
      status: 'Active',
      interest: 9,
      dueDate: '05 May, 2025',
      remaining: 50000,
    },
  ];

  const filteredLoans = loans.filter((loan) => {
    const matchesSearch = loan.member.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || loan.status.toLowerCase() === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="loans-section">
      <div className="section-header">
        <div className="section-title">
          <h2>Loans</h2>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M12 16v-4"></path>
            <path d="M12 8h.01"></path>
          </svg>
        </div>
        <div className="loans-filters">
          <div className="search-input-wrapper">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.35-4.35"></path>
            </svg>
            <input
              type="text"
              placeholder="Search loans..."
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
            <option value="paid">Paid</option>
            <option value="overdue">Overdue</option>
          </select>
          <button className="loan-application-btn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            Loan Application
          </button>
        </div>
      </div>
      <div className="loans-table-container">
        <table className="loans-table">
          <thead>
            <tr>
              <th>MEMBER</th>
              <th>AMOUNT</th>
              <th>INTEREST</th>
              <th>REMAINING</th>
              <th>DATE</th>
              <th>DUE DATE</th>
              <th>STATUS</th>
            </tr>
          </thead>
          <tbody>
            {filteredLoans.map((loan) => (
              <tr key={loan.id}>
                <td>
                  <div className="member-cell">
                    <div className="member-avatar-small">
                      {loan.member
                        .split(' ')
                        .map((n) => n[0])
                        .join('')
                        .toUpperCase()}
                    </div>
                    <span>{loan.member}</span>
                  </div>
                </td>
                <td className="amount-cell">UGX {loan.amount.toLocaleString()}</td>
                <td>{loan.interest}%</td>
                <td className="amount-cell">UGX {loan.remaining.toLocaleString()}</td>
                <td>{loan.date}</td>
                <td>{loan.dueDate}</td>
                <td>
                  <span className={`status-badge ${loan.status.toLowerCase()}`}>
                    {loan.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Loans;
