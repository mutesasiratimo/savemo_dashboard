import './AccountSummary.css';

const AccountSummary = () => {
  return (
    <div className="account-summary-section">
      <div className="summary-cards">
        <div className="summary-card">
          <div className="card-label">Total Balance</div>
          <div className="card-value">UGX 456,899</div>
        </div>
        <div className="summary-card">
          <div className="card-label">Total Savings</div>
          <div className="card-value">UGX 16,350</div>
        </div>
        <div className="summary-card">
          <div className="card-label">
            <span className="coin-icon">🪙</span>
            Total Disbursements
          </div>
          <div className="card-value">UGX 100</div>
        </div>
      </div>
      <div className="summary-actions">
        <button className="action-button primary">+ Create Goal</button>
        <button className="action-button secondary">+ Create Payment</button>
      </div>
    </div>
  );
};

export default AccountSummary;
