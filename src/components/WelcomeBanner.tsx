import { useState } from 'react';
import './WelcomeBanner.css';

const WelcomeBanner = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="welcome-banner">
      <div className="banner-content">
        <div className="banner-text">
          <span className="banner-greeting">Hey Timothy, 👋</span>
          <span className="banner-message">You're 60% there! Keep going!</span>
        </div>
        <div className="banner-illustration">
          <div className="money-illustration">💰</div>
          <button className="view-analytics-btn">View Analytics →</button>
        </div>
      </div>
      <button className="banner-close" onClick={() => setIsVisible(false)} aria-label="Close banner">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    </div>
  );
};

export default WelcomeBanner;
