import { useState, useEffect, useRef } from 'react';
import './Savings.css';

interface PaymentFormData {
  memberName: string;
  savingGoal: string;
  paymentMethod: string;
  transactionReference: string;
  attachment: File | null;
}

interface AddPaymentDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: PaymentFormData) => void;
}

const AddPaymentDialog = ({ isOpen, onClose, onSubmit }: AddPaymentDialogProps) => {
  const [formData, setFormData] = useState<PaymentFormData>({
    memberName: '',
    savingGoal: '',
    paymentMethod: '',
    transactionReference: '',
    attachment: null,
  });
  const [memberSearch, setMemberSearch] = useState('');
  const [goalSearch, setGoalSearch] = useState('');
  const [showMemberDropdown, setShowMemberDropdown] = useState(false);
  const [showGoalDropdown, setShowGoalDropdown] = useState(false);
  const memberDropdownRef = useRef<HTMLDivElement>(null);
  const goalDropdownRef = useRef<HTMLDivElement>(null);

  const members = ['John Doe', 'Jane Smith', 'Robert Johnson', 'Sarah Williams', 'Michael Brown'];
  const goals = ['Emergency Fund', 'Vacation', 'Car Purchase', 'Home Renovation', 'Education Fund'];

  const filteredMembers = members.filter((member) =>
    member.toLowerCase().includes(memberSearch.toLowerCase())
  );
  const filteredGoals = goals.filter((goal) =>
    goal.toLowerCase().includes(goalSearch.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (memberDropdownRef.current && !memberDropdownRef.current.contains(event.target as Node)) {
        setShowMemberDropdown(false);
      }
      if (goalDropdownRef.current && !goalDropdownRef.current.contains(event.target as Node)) {
        setShowGoalDropdown(false);
      }
    };

    if (showMemberDropdown || showGoalDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showMemberDropdown, showGoalDropdown]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      memberName: '',
      savingGoal: '',
      paymentMethod: '',
      transactionReference: '',
      attachment: null,
    });
    setMemberSearch('');
    setGoalSearch('');
    onClose();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, attachment: e.target.files[0] });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Add New Payment</h3>
          <button className="modal-close" onClick={onClose}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        <form onSubmit={handleSubmit} className="payment-form">
          <div className="form-group">
            <label htmlFor="member-name">Name *</label>
            <div className="search-select-wrapper" ref={memberDropdownRef}>
              <input
                type="text"
                id="member-name"
                value={memberSearch || formData.memberName}
                onChange={(e) => {
                  setMemberSearch(e.target.value);
                  setShowMemberDropdown(true);
                }}
                onFocus={() => setShowMemberDropdown(true)}
                placeholder="Search and select member"
                required
              />
              {showMemberDropdown && filteredMembers.length > 0 && (
                <div className="dropdown-list">
                  {filteredMembers.map((member) => (
                    <div
                      key={member}
                      className="dropdown-item"
                      onClick={() => {
                        setFormData({ ...formData, memberName: member });
                        setMemberSearch('');
                        setShowMemberDropdown(false);
                      }}
                    >
                      {member}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="saving-goal">Saving Goal/Target *</label>
            <div className="search-select-wrapper" ref={goalDropdownRef}>
              <input
                type="text"
                id="saving-goal"
                value={goalSearch || formData.savingGoal}
                onChange={(e) => {
                  setGoalSearch(e.target.value);
                  setShowGoalDropdown(true);
                }}
                onFocus={() => setShowGoalDropdown(true)}
                placeholder="Search and select saving goal"
                required
              />
              {showGoalDropdown && filteredGoals.length > 0 && (
                <div className="dropdown-list">
                  {filteredGoals.map((goal) => (
                    <div
                      key={goal}
                      className="dropdown-item"
                      onClick={() => {
                        setFormData({ ...formData, savingGoal: goal });
                        setGoalSearch('');
                        setShowGoalDropdown(false);
                      }}
                    >
                      {goal}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="payment-method">Payment Method *</label>
            <select
              id="payment-method"
              value={formData.paymentMethod}
              onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
              required
            >
              <option value="">Select payment method</option>
              <option value="mobile-money">Mobile Money</option>
              <option value="bank-transfer">Bank Transfer</option>
              <option value="cash">Cash</option>
              <option value="card">Card</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="transaction-reference">Transaction Reference *</label>
            <input
              type="text"
              id="transaction-reference"
              value={formData.transactionReference}
              onChange={(e) => setFormData({ ...formData, transactionReference: e.target.value })}
              placeholder="Enter transaction reference"
              required
            />
          </div>

          <div className="form-group full-width">
            <label htmlFor="attachment">Attachment</label>
            <div className="file-upload-wrapper">
              <input
                type="file"
                id="attachment"
                onChange={handleFileChange}
                accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                className="file-input"
              />
              <label htmlFor="attachment" className="file-upload-label">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="17 8 12 3 7 8"></polyline>
                  <line x1="12" y1="3" x2="12" y2="15"></line>
                </svg>
                {formData.attachment ? formData.attachment.name : 'Choose file or drag here'}
              </label>
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="btn-cancel" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

interface Saving {
  id: string;
  member: string;
  amount: number;
  date: string;
  status: 'Active' | 'Completed' | 'Pending';
  goal: string;
  progress: number;
}

const Savings = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showAddPaymentDialog, setShowAddPaymentDialog] = useState(false);

  const handleAddPayment = (data: PaymentFormData) => {
    console.log('Payment data:', data);
    // Handle payment submission here
  };

  const savings: Saving[] = [
    {
      id: '1',
      member: 'John Doe',
      amount: 5000,
      date: '15 Jan, 2025',
      status: 'Active',
      goal: 'Emergency Fund',
      progress: 65,
    },
    {
      id: '2',
      member: 'Jane Smith',
      amount: 3000,
      date: '12 Jan, 2025',
      status: 'Active',
      goal: 'Vacation',
      progress: 40,
    },
    {
      id: '3',
      member: 'Robert Johnson',
      amount: 10000,
      date: '10 Jan, 2025',
      status: 'Completed',
      goal: 'Car Purchase',
      progress: 100,
    },
    {
      id: '4',
      member: 'Sarah Williams',
      amount: 2500,
      date: '08 Jan, 2025',
      status: 'Pending',
      goal: 'Home Renovation',
      progress: 25,
    },
    {
      id: '5',
      member: 'Michael Brown',
      amount: 7500,
      date: '05 Jan, 2025',
      status: 'Active',
      goal: 'Education Fund',
      progress: 75,
    },
  ];

  const filteredSavings = savings.filter((saving) => {
    const matchesSearch =
      saving.member.toLowerCase().includes(searchQuery.toLowerCase()) ||
      saving.goal.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || saving.status.toLowerCase() === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="savings-section">
      <div className="section-header">
        <div className="section-title">
          <h2>Savings</h2>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M12 16v-4"></path>
            <path d="M12 8h.01"></path>
          </svg>
        </div>
        <div className="savings-filters">
          <div className="search-input-wrapper">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.35-4.35"></path>
            </svg>
            <input
              type="text"
              placeholder="Search savings..."
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
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
          </select>
          <button className="add-payment-btn" onClick={() => setShowAddPaymentDialog(true)}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            Add Payment
          </button>
        </div>
      </div>
      <AddPaymentDialog
        isOpen={showAddPaymentDialog}
        onClose={() => setShowAddPaymentDialog(false)}
        onSubmit={handleAddPayment}
      />
      <div className="savings-table-container">
        <table className="savings-table">
          <thead>
            <tr>
              <th>MEMBER</th>
              <th>GOAL</th>
              <th>AMOUNT</th>
              <th>PROGRESS</th>
              <th>DATE</th>
              <th>STATUS</th>
            </tr>
          </thead>
          <tbody>
            {filteredSavings.map((saving) => (
              <tr key={saving.id}>
                <td>
                  <div className="member-cell">
                    <div className="member-avatar-small">
                      {saving.member
                        .split(' ')
                        .map((n) => n[0])
                        .join('')
                        .toUpperCase()}
                    </div>
                    <span>{saving.member}</span>
                  </div>
                </td>
                <td>{saving.goal}</td>
                <td className="amount-cell">UGX {saving.amount.toLocaleString()}</td>
                <td>
                  <div className="progress-cell">
                    <div className="progress-bar-small">
                      <div
                        className="progress-fill-small"
                        style={{ width: `${saving.progress}%` }}
                      ></div>
                    </div>
                    <span className="progress-text-small">{saving.progress}%</span>
                  </div>
                </td>
                <td>{saving.date}</td>
                <td>
                  <span className={`status-badge ${saving.status.toLowerCase()}`}>
                    {saving.status}
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

export default Savings;
