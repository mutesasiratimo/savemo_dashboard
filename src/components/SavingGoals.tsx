import './SavingGoals.css';

interface SavingGoal {
  id: string;
  name: string;
  icon: string;
  goal: number;
  saved: number;
  target: string;
  remaining: number;
  rule: string;
  autoSave: boolean;
  autoSaveDate?: string;
}

const SavingGoals = () => {
  const goals: SavingGoal[] = [
    {
      id: '1',
      name: 'Vacation Fund',
      icon: '✈️',
      goal: 2000,
      saved: 1400,
      target: 'Sep, 2025',
      remaining: 600,
      rule: 'Fixed per week',
      autoSave: false,
    },
    {
      id: '2',
      name: 'Emergency Fund',
      icon: '➕',
      goal: 50000,
      saved: 10000,
      target: 'Jan, 2027',
      remaining: 40000,
      rule: 'Fixed per week',
      autoSave: true,
      autoSaveDate: 'Feb 25',
    },
    {
      id: '3',
      name: 'New Car',
      icon: '🚗',
      goal: 15000,
      saved: 4350,
      target: 'Sep, 2026',
      remaining: 10650,
      rule: 'Fixed per week',
      autoSave: false,
    },
  ];

  const calculateProgress = (saved: number, goal: number) => {
    return Math.round((saved / goal) * 100);
  };

  return (
    <div className="saving-goals-section">
      <div className="section-header">
        <div className="section-title">
          <h2>Saving goals</h2>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
            <path d="M12 17h.01"></path>
          </svg>
        </div>
        <select className="date-filter">
          <option>Jan - Dec 2025</option>
        </select>
      </div>
      <div className="goals-grid">
        {goals.map((goal) => {
          const progress = calculateProgress(goal.saved, goal.goal);
          return (
            <div key={goal.id} className="goal-card">
              <div className="goal-header">
                <div className="goal-icon">{goal.icon}</div>
                <div className="goal-info">
                  <h3 className="goal-name">{goal.name}</h3>
                  <div className="goal-amount">UGX {goal.goal.toLocaleString()}</div>
                </div>
              </div>
              <div className="goal-progress">
                <div className="progress-info">
                  <span className="progress-text">Saved so far: UGX {goal.saved.toLocaleString()}</span>
                  <span className="progress-percent">{progress}%</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${progress}%` }}></div>
                </div>
              </div>
              <div className="goal-details">
                <div className="detail-item">
                  <span className="detail-label">Target:</span>
                  <span className="detail-value">{goal.target}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Remaining:</span>
                  <span className="detail-value">UGX {goal.remaining.toLocaleString()}</span>
                </div>
                <div className="goal-rule">
                  <select className="rule-select">
                    <option>{goal.rule}</option>
                  </select>
                </div>
                <div className="goal-autosave">
                  <label className="toggle-switch">
                    <input type="checkbox" checked={goal.autoSave} readOnly />
                    <span className="toggle-slider"></span>
                  </label>
                  <span className="autosave-label">Auto-save</span>
                  {goal.autoSave && goal.autoSaveDate && (
                    <span className="autosave-date">{goal.autoSaveDate}</span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SavingGoals;
