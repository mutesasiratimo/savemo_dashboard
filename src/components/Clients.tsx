import { useState } from 'react';
import './Clients.css';

interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  joinDate: string;
  status: 'Active' | 'Inactive';
}

const Clients = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const clients: Client[] = [
    {
      id: '1',
      name: 'ABC Corporation',
      email: 'contact@abccorp.com',
      phone: '+256 700 111 222',
      company: 'ABC Corp',
      joinDate: '15 Jan, 2024',
      status: 'Active',
    },
    {
      id: '2',
      name: 'XYZ Enterprises',
      email: 'info@xyzent.com',
      phone: '+256 701 222 333',
      company: 'XYZ Ent',
      joinDate: '20 Feb, 2024',
      status: 'Active',
    },
    {
      id: '3',
      name: 'Tech Solutions Ltd',
      email: 'hello@techsol.com',
      phone: '+256 702 333 444',
      company: 'Tech Solutions',
      joinDate: '10 Mar, 2024',
      status: 'Active',
    },
    {
      id: '4',
      name: 'Global Services Inc',
      email: 'contact@globalserv.com',
      phone: '+256 703 444 555',
      company: 'Global Services',
      joinDate: '05 Apr, 2024',
      status: 'Inactive',
    },
    {
      id: '5',
      name: 'Innovation Hub',
      email: 'info@innovhub.com',
      phone: '+256 704 555 666',
      company: 'Innovation Hub',
      joinDate: '22 May, 2024',
      status: 'Active',
    },
  ];

  const filteredClients = clients.filter((client) => {
    const matchesSearch =
      client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.company.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || client.status.toLowerCase() === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="clients-section">
      <div className="section-header">
        <div className="section-title">
          <h2>Clients</h2>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M12 16v-4"></path>
            <path d="M12 8h.01"></path>
          </svg>
        </div>
        <div className="clients-filters">
          <div className="search-input-wrapper">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.35-4.35"></path>
            </svg>
            <input
              type="text"
              placeholder="Search clients..."
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
      <div className="clients-table-container">
        <table className="clients-table">
          <thead>
            <tr>
              <th>CLIENT NAME</th>
              <th>EMAIL</th>
              <th>PHONE</th>
              <th>COMPANY</th>
              <th>JOIN DATE</th>
              <th>STATUS</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {filteredClients.map((client) => (
              <tr key={client.id}>
                <td className="client-name-cell">{client.name}</td>
                <td>{client.email}</td>
                <td>{client.phone}</td>
                <td>{client.company}</td>
                <td>{client.joinDate}</td>
                <td>
                  <span className={`status-badge ${client.status.toLowerCase()}`}>
                    {client.status}
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

export default Clients;
