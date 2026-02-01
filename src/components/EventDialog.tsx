import { useState, useEffect, useRef } from 'react';
import './EventDialog.css';

interface EventFormData {
  title: string;
  eventType: 'event' | 'reminder';
  singleDay: boolean;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  allDay: boolean;
  doesRepeat: boolean;
  repeatFrequency: 'day' | 'week' | 'month' | 'year' | '';
  eventLink: string;
  location: string;
  guests: string[];
  notifyGuests: boolean;
}

interface EventDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: EventFormData) => void;
}

const EventDialog = ({ isOpen, onClose, onSubmit }: EventDialogProps) => {
  const [formData, setFormData] = useState<EventFormData>({
    title: '',
    eventType: 'event',
    singleDay: true,
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date().toISOString().split('T')[0],
    startTime: '12:30',
    endTime: '13:30',
    allDay: false,
    doesRepeat: false,
    repeatFrequency: '',
    eventLink: '',
    location: '',
    guests: [],
    notifyGuests: false,
  });

  const [guestSearch, setGuestSearch] = useState('');
  const [showGuestDropdown, setShowGuestDropdown] = useState(false);
  const guestDropdownRef = useRef<HTMLDivElement>(null);

  const availableGuests = [
    'John Doe',
    'Jane Smith',
    'Robert Johnson',
    'Sarah Williams',
    'Michael Brown',
    'Emily Davis',
    'David Wilson',
    'Lisa Anderson',
  ];

  const filteredGuests = availableGuests.filter(
    (guest) => guest.toLowerCase().includes(guestSearch.toLowerCase()) && !formData.guests.includes(guest)
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (guestDropdownRef.current && !guestDropdownRef.current.contains(event.target as Node)) {
        setShowGuestDropdown(false);
      }
    };

    if (showGuestDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showGuestDropdown]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      title: '',
      eventType: 'event',
      singleDay: true,
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date().toISOString().split('T')[0],
      startTime: '12:30',
      endTime: '13:30',
      allDay: false,
      doesRepeat: false,
      repeatFrequency: '',
      eventLink: '',
      location: '',
      guests: [],
      notifyGuests: false,
    });
    setGuestSearch('');
    onClose();
  };

  const handleAddGuest = (guest: string) => {
    setFormData({ ...formData, guests: [...formData.guests, guest] });
    setGuestSearch('');
    setShowGuestDropdown(false);
  };

  const handleRemoveGuest = (guest: string) => {
    setFormData({ ...formData, guests: formData.guests.filter((g) => g !== guest) });
  };

  if (!isOpen) return null;

  return (
    <div className="event-modal-overlay" onClick={onClose}>
      <div className="event-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="event-modal-header">
          <input
            type="text"
            placeholder="Add title"
            className="event-title-input"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />
          <button className="event-modal-close" onClick={onClose}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <div className="event-type-buttons">
          <button
            type="button"
            className={`event-type-btn ${formData.eventType === 'event' ? 'active' : ''}`}
            onClick={() => setFormData({ ...formData, eventType: 'event' })}
          >
            Event
          </button>
          <button
            type="button"
            className={`event-type-btn ${formData.eventType === 'reminder' ? 'active' : ''}`}
            onClick={() => setFormData({ ...formData, eventType: 'reminder' })}
          >
            Reminder
          </button>
        </div>

        <form onSubmit={handleSubmit} className="event-form">
          <div className="event-form-section">
            <div className="event-checkbox-group">
              <label className="event-checkbox-label">
                <input
                  type="checkbox"
                  checked={formData.singleDay}
                  onChange={(e) => setFormData({ ...formData, singleDay: e.target.checked })}
                />
                <span>Single Day Event</span>
              </label>
            </div>
          </div>

          <div className="event-form-section">
            <div className="event-time-row">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
              <div className="event-date-time-group">
                {formData.singleDay ? (
                  <>
                    <input
                      type="date"
                      className="event-date-input"
                      value={formData.startDate}
                      onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    />
                    {!formData.allDay && (
                      <>
                        <input
                          type="time"
                          className="event-time-input"
                          value={formData.startTime}
                          onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                        />
                        <span className="event-time-separator">-</span>
                        <input
                          type="time"
                          className="event-time-input"
                          value={formData.endTime}
                          onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                        />
                      </>
                    )}
                  </>
                ) : formData.allDay ? (
                  <>
                    <input
                      type="date"
                      className="event-date-input"
                      value={formData.startDate}
                      onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    />
                    <span className="event-time-separator">-</span>
                    <input
                      type="date"
                      className="event-date-input"
                      value={formData.endDate}
                      onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                      min={formData.startDate}
                    />
                  </>
                ) : (
                  <>
                    <input
                      type="date"
                      className="event-date-input"
                      value={formData.startDate}
                      onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    />
                    <input
                      type="time"
                      className="event-time-input"
                      value={formData.startTime}
                      onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                    />
                    <span className="event-time-separator">-</span>
                    <input
                      type="date"
                      className="event-date-input"
                      value={formData.endDate}
                      onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                      min={formData.startDate}
                    />
                    <input
                      type="time"
                      className="event-time-input"
                      value={formData.endTime}
                      onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                    />
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="event-form-section">
            <div className="event-checkbox-group">
              <label className="event-checkbox-label">
                <input
                  type="checkbox"
                  checked={formData.allDay}
                  onChange={(e) => setFormData({ ...formData, allDay: e.target.checked })}
                />
                <span>All day</span>
              </label>
              <a href="#" className="event-timezone-link">
                Time zone
              </a>
            </div>
          </div>

          <div className="event-form-section">
            <div className="event-checkbox-group">
              <label className="event-checkbox-label">
                <input
                  type="checkbox"
                  checked={formData.doesRepeat}
                  onChange={(e) => setFormData({ ...formData, doesRepeat: e.target.checked, repeatFrequency: e.target.checked ? 'week' : '' })}
                />
                <span>Does Repeat</span>
              </label>
            </div>
            {formData.doesRepeat && (
              <div className="event-dropdown-wrapper">
                <div className="event-repeat-options">
                  <label className="event-radio-label">
                    <input
                      type="radio"
                      name="repeatFrequency"
                      value="day"
                      checked={formData.repeatFrequency === 'day'}
                      onChange={(e) => setFormData({ ...formData, repeatFrequency: e.target.value as 'day' })}
                    />
                    <span>Every day</span>
                  </label>
                  <label className="event-radio-label">
                    <input
                      type="radio"
                      name="repeatFrequency"
                      value="week"
                      checked={formData.repeatFrequency === 'week'}
                      onChange={(e) => setFormData({ ...formData, repeatFrequency: e.target.value as 'week' })}
                    />
                    <span>Every week</span>
                  </label>
                  <label className="event-radio-label">
                    <input
                      type="radio"
                      name="repeatFrequency"
                      value="month"
                      checked={formData.repeatFrequency === 'month'}
                      onChange={(e) => setFormData({ ...formData, repeatFrequency: e.target.value as 'month' })}
                    />
                    <span>Every month</span>
                  </label>
                  <label className="event-radio-label">
                    <input
                      type="radio"
                      name="repeatFrequency"
                      value="year"
                      checked={formData.repeatFrequency === 'year'}
                      onChange={(e) => setFormData({ ...formData, repeatFrequency: e.target.value as 'year' })}
                    />
                    <span>Every year</span>
                  </label>
                </div>
              </div>
            )}
          </div>

          <div className="event-form-section">
            <div className="event-input-group">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
              </svg>
              <input
                type="text"
                placeholder="Link to event"
                value={formData.eventLink}
                onChange={(e) => setFormData({ ...formData, eventLink: e.target.value })}
                className="event-text-input"
              />
            </div>
          </div>

          <div className="event-form-section">
            <div className="event-input-group">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              <input
                type="text"
                placeholder="Add rooms or location"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="event-text-input"
              />
            </div>
          </div>

          <div className="event-form-section">
            <div className="event-input-group" ref={guestDropdownRef}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
              <div className="event-guest-input-wrapper">
                <input
                  type="text"
                  placeholder="Add guests"
                  value={guestSearch}
                  onChange={(e) => {
                    setGuestSearch(e.target.value);
                    setShowGuestDropdown(true);
                  }}
                  onFocus={() => setShowGuestDropdown(true)}
                  className="event-text-input"
                />
                {showGuestDropdown && filteredGuests.length > 0 && (
                  <div className="event-guest-dropdown">
                    {filteredGuests.map((guest) => (
                      <div key={guest} className="event-guest-option" onClick={() => handleAddGuest(guest)}>
                        {guest}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            {formData.guests.length > 0 && (
              <div className="event-selected-guests">
                {formData.guests.map((guest) => (
                  <div key={guest} className="event-guest-tag">
                    {guest}
                    <button type="button" onClick={() => handleRemoveGuest(guest)} className="event-guest-remove">
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="event-form-section">
            <div className="event-checkbox-group">
              <label className="event-checkbox-label">
                <input
                  type="checkbox"
                  checked={formData.notifyGuests}
                  onChange={(e) => setFormData({ ...formData, notifyGuests: e.target.checked })}
                />
                <span>Notify guests of event?</span>
              </label>
            </div>
          </div>

          <div className="event-form-footer">
            <button type="submit" className="event-save-button">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventDialog;
