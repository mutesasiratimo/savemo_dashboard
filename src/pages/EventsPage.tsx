import { useState } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Events from '../components/Events';
import EventDialog from '../components/EventDialog';
import './DashboardPage.css';

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

const EventsPage = () => {
  const [isEventDialogOpen, setIsEventDialogOpen] = useState(false);

  const handleEventSubmit = (data: EventFormData) => {
    console.log('Event data:', data);
    // TODO: Implement event creation API call
    setIsEventDialogOpen(false);
  };

  return (
    <div className="dashboard-layout">
      <Sidebar />
      <div className="dashboard-main">
        <Header />
        <div className="dashboard-content">
          <div className="content-header events-page-header">
            <h2>Events</h2>
            <button className="new-event-button" onClick={() => setIsEventDialogOpen(true)}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
              New Event
            </button>
          </div>
          <Events />
        </div>
      </div>
      <EventDialog
        isOpen={isEventDialogOpen}
        onClose={() => setIsEventDialogOpen(false)}
        onSubmit={handleEventSubmit}
      />
    </div>
  );
};

export default EventsPage;
