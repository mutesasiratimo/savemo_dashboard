import { useState } from 'react';
import './TransactionActivity.css';

interface Transaction {
  id: string;
  account: string;
  accountNumber: string;
  date: string;
  status: 'Success' | 'Pending' | 'Failed';
  recipient: string;
  category: string;
  amount: number;
  save: number;
}

const TransactionActivity = () => {
  const [saveFilter, setSaveFilter] = useState(true);
  const [dateRange, setDateRange] = useState('Jan - Feb 2025');
  const [transactionType, setTransactionType] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const transactions: Transaction[] = [
    {
      id: '1',
      account: 'Credit card',
      accountNumber: '9799',
      date: '17 Jan, 2025',
      status: 'Success',
      recipient: 'Coffee Shop',
      category: '↑ Transfer',
      amount: 20,
      save: 5,
    },
    {
      id: '2',
      account: 'Credit card',
      accountNumber: '7689',
      date: '11 Jan, 2025',
      status: 'Success',
      recipient: 'Coffee Shop',
      category: '↑ Transfer',
      amount: 50,
      save: 5,
    },
    {
      id: '3',
      account: 'Credit card',
      accountNumber: '9799',
      date: '07 Jan, 2025',
      status: 'Failed',
      recipient: 'Coffee & CakeShop',
      category: '↑ Transfer',
      amount: 50,
      save: 5,
    },
    {
      id: '4',
      account: 'Credit card',
      accountNumber: '7689',
      date: '05 Jan, 2025',
      status: 'Pending',
      recipient: 'Restaurant',
      category: '↓ Withdrawal',
      amount: 100,
      save: 10,
    },
  ];

  const filteredTransactions = transactions.filter((transaction) => {
    if (statusFilter !== 'all' && transaction.status.toLowerCase() !== statusFilter) {
      return false;
    }
    if (transactionType !== 'all') {
      const isTransfer = transaction.category.includes('Transfer');
      const isWithdrawal = transaction.category.includes('Withdrawal');
      if (transactionType === 'transfer' && !isTransfer) return false;
      if (transactionType === 'withdrawal' && !isWithdrawal) return false;
    }
    return true;
  });

  return (
    <div className="transaction-activity-section">
      <div className="section-header">
        <div className="section-title">
          <h2>Transaction activity</h2>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M12 16v-4"></path>
            <path d="M12 8h.01"></path>
          </svg>
        </div>
        <div className="transaction-filters">
          <label className="save-toggle">
            <input
              type="checkbox"
              checked={saveFilter}
              onChange={(e) => setSaveFilter(e.target.checked)}
            />
            <span>Save $5</span>
          </label>
          <select
            className="filter-select"
            value={transactionType}
            onChange={(e) => setTransactionType(e.target.value)}
          >
            <option value="all">All Types</option>
            <option value="transfer">Transfer</option>
            <option value="withdrawal">Withdrawal</option>
          </select>
          <select
            className="filter-select"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="success">Success</option>
            <option value="pending">Pending</option>
            <option value="failed">Failed</option>
          </select>
          <select
            className="date-filter"
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
          >
            <option>Jan - Feb 2025</option>
            <option>Nov - Dec 2024</option>
            <option>Sep - Oct 2024</option>
          </select>
        </div>
      </div>
      <div className="transaction-table-container">
        <table className="transaction-table">
          <thead>
            <tr>
              <th>ACCOUNT</th>
              <th>DATE</th>
              <th>STATUS</th>
              <th>RECIPIENT</th>
              <th>CATEGORY</th>
              <th>AMOUNT</th>
              <th>SAVE</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.map((transaction) => (
              <tr key={transaction.id}>
                <td>
                  <div className="account-cell">
                    <div className="account-icon">💳</div>
                    <span>{transaction.account} ...{transaction.accountNumber}</span>
                  </div>
                </td>
                <td>{transaction.date}</td>
                <td>
                  <span className={`status-badge ${transaction.status.toLowerCase()}`}>
                    {transaction.status}
                  </span>
                </td>
                <td>{transaction.recipient}</td>
                <td>
                  <span className="category-badge">
                    {transaction.category.includes('↑') ? (
                      <span className="category-icon">↑</span>
                    ) : (
                      <span className="category-icon">↓</span>
                    )}
                    {transaction.category.replace(/[↑↓]/g, '').trim()}
                  </span>
                </td>
                <td className="amount-cell">UGX {transaction.amount}</td>
                <td className="save-cell">{transaction.save}$</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionActivity;
