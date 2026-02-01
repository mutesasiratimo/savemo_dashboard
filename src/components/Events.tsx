import { useState } from 'react';
import './Events.css';

interface Event {
  id: string;
  name: string;
  date: string;
  image: string;
  startTime?: number; // Hour in 24-hour format (0-23)
  endTime?: number; // Hour in 24-hour format (0-23)
  isAllDay?: boolean;
}

const Events = () => {
  const [viewMode, setViewMode] = useState<'day' | 'week' | 'month' | 'year'>('month');
  const [currentDate, setCurrentDate] = useState(new Date());

  const events: Event[] = [
    {
      id: '1',
      name: 'Cynosure Festival',
      date: '2025-03-24',
      image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=100&h=100&fit=crop',
    },
    {
      id: '2',
      name: 'Nightor Festival',
      date: '2025-03-30',
      image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=100&h=100&fit=crop',
    },
    {
      id: '3',
      name: 'Cyndrex Festival',
      date: '2025-04-03',
      image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=100&h=100&fit=crop',
    },
    {
      id: '4',
      name: 'Hyper Festival',
      date: '2025-04-10',
      image: 'https://images.unsplash.com/photo-1478147427282-58dbc87cd906?w=100&h=100&fit=crop',
    },
    {
      id: '5',
      name: 'EDM Festival',
      date: '2025-04-15',
      image: 'https://images.unsplash.com/photo-1501281668745-f7f63a4c4c5b?w=100&h=100&fit=crop',
    },
    // Week view sample events
    {
      id: '6',
      name: 'Office',
      date: '2025-01-02',
      image: '',
      startTime: 11,
      endTime: 17,
      isAllDay: false,
    },
    {
      id: '7',
      name: 'Lunch Break 1 - 2pm',
      date: '2025-01-02',
      image: '',
      startTime: 13,
      endTime: 14,
      isAllDay: false,
    },
    {
      id: '8',
      name: 'Lunch Break 1 - 2pm',
      date: '2025-01-03',
      image: '',
      startTime: 13,
      endTime: 14,
      isAllDay: false,
    },
    {
      id: '9',
      name: 'Lunch Break 1 - 2pm',
      date: '2025-01-04',
      image: '',
      startTime: 13,
      endTime: 14,
      isAllDay: false,
    },
    {
      id: '10',
      name: 'Lunch Break 1 - 2pm',
      date: '2025-01-05',
      image: '',
      startTime: 13,
      endTime: 14,
      isAllDay: false,
    },
    {
      id: '11',
      name: 'Lunch Break 1 - 2pm',
      date: '2025-01-06',
      image: '',
      startTime: 13,
      endTime: 14,
      isAllDay: false,
    },
    {
      id: '12',
      name: "Joel Ahumuza's Birthd",
      date: '2025-01-06',
      image: '',
      isAllDay: true,
    },
    {
      id: '13',
      name: "Raymond's Birthday",
      date: '2025-01-06',
      image: '',
      isAllDay: true,
    },
    {
      id: '14',
      name: "Esther's Birthday",
      date: '2025-01-07',
      image: '',
      isAllDay: true,
    },
  ];

  const getCurrentTime = () => {
    const now = new Date();
    return now.getHours() + now.getMinutes() / 60;
  };

  const getHoursForDay = () => {
    const hours = [];
    for (let i = 12; i <= 23; i++) {
      hours.push(i);
    }
    return hours;
  };

  const getHoursForWeek = () => {
    const hours = [];
    for (let i = 12; i <= 22; i++) {
      hours.push(i);
    }
    return hours;
  };

  const getWeekDays = (date: Date) => {
    const weekStart = new Date(date);
    const day = weekStart.getDay();
    const diff = weekStart.getDate() - day; // Get Sunday of the week
    weekStart.setDate(diff);

    const days = [];
    for (let i = 0; i < 7; i++) {
      const currentDay = new Date(weekStart);
      currentDay.setDate(weekStart.getDate() + i);
      days.push(currentDay);
    }
    return days;
  };

  const getEventsForWeekDay = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    return events.filter((event) => event.date === dateStr);
  };

  const getTimeBasedEventsForDay = (date: Date) => {
    return getEventsForWeekDay(date).filter((event) => !event.isAllDay && event.startTime !== undefined);
  };

  const getAllDayEventsForDay = (date: Date) => {
    return getEventsForWeekDay(date).filter((event) => event.isAllDay);
  };

  const formatHour = (hour: number) => {
    if (hour === 12) return '12 PM';
    if (hour > 12) return `${hour - 12} PM`;
    return `${hour} AM`;
  };

  const getEventsForDay = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    return events.filter((event) => event.date === dateStr);
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }
    return days;
  };

  const hasEvent = (date: Date | null) => {
    if (!date) return false;
    const dateStr = date.toISOString().split('T')[0];
    return events.some((event) => event.date === dateStr);
  };

  const isToday = (date: Date | null) => {
    if (!date) return false;
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const formatMonthYear = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  const navigateDate = (direction: 'prev' | 'next') => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev);
      if (viewMode === 'day') {
        newDate.setDate(newDate.getDate() + (direction === 'prev' ? -1 : 1));
      } else if (viewMode === 'week') {
        newDate.setDate(newDate.getDate() + (direction === 'prev' ? -7 : 7));
      } else if (viewMode === 'month') {
        newDate.setMonth(newDate.getMonth() + (direction === 'prev' ? -1 : 1));
      } else if (viewMode === 'year') {
        newDate.setFullYear(newDate.getFullYear() + (direction === 'prev' ? -1 : 1));
      }
      return newDate;
    });
  };

  const formatDayView = (date: Date) => {
    const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    const dayName = days[date.getDay()];
    const dayNumber = date.getDate();
    return { dayName, dayNumber };
  };

  const getAllMonthsForYear = (year: number) => {
    const months = [];
    for (let month = 0; month < 12; month++) {
      months.push(new Date(year, month, 1));
    }
    return months;
  };

  const getDaysInMonthForYear = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    // Add days from previous month
    const prevMonth = new Date(year, month - 1, 0);
    const prevMonthDays = prevMonth.getDate();
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      days.push(new Date(year, month - 1, prevMonthDays - i));
    }
    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }
    // Add days from next month to fill the grid (up to 6 weeks = 42 days)
    const totalDays = days.length;
    const remainingDays = 42 - totalDays;
    for (let day = 1; day <= remainingDays; day++) {
      days.push(new Date(year, month + 1, day));
    }
    return days;
  };

  const isDateInCurrentMonth = (date: Date, month: number) => {
    return date.getMonth() === month;
  };

  const formatMonthName = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'long' });
  };

  const upcomingEvents = events
    .filter((event) => {
      const eventDate = new Date(event.date);
      return eventDate >= new Date();
    })
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 5);

  const formatEventDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  const days = getDaysInMonth(currentDate);
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="events-section">
      <div className="events-layout">
        <div className="calendar-container">
          <div className="calendar-header">
            <div className="calendar-title">
              <button className="calendar-nav-btn" onClick={() => navigateDate('prev')}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
              </button>
              <h2>
                {viewMode === 'day'
                  ? `${formatDayView(currentDate).dayName} ${formatDayView(currentDate).dayNumber}`
                  : viewMode === 'week'
                    ? formatMonthYear(currentDate)
                    : viewMode === 'year'
                      ? currentDate.getFullYear().toString()
                      : formatMonthYear(currentDate)}
              </h2>
              <button className="calendar-nav-btn" onClick={() => navigateDate('next')}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </button>
            </div>
            <div className="calendar-view-filters">
              <button
                className={`view-filter-btn ${viewMode === 'day' ? 'active' : ''}`}
                onClick={() => {
                  setViewMode('day');
                  if (!isToday(currentDate)) {
                    setCurrentDate(new Date());
                  }
                }}
              >
                Day
              </button>
              <button
                className={`view-filter-btn ${viewMode === 'week' ? 'active' : ''}`}
                onClick={() => {
                  setViewMode('week');
                  // Set to current week's Sunday
                  const today = new Date();
                  const day = today.getDay();
                  const diff = today.getDate() - day;
                  const sunday = new Date(today);
                  sunday.setDate(diff);
                  setCurrentDate(sunday);
                }}
              >
                Week
              </button>
              <button
                className={`view-filter-btn ${viewMode === 'month' ? 'active' : ''}`}
                onClick={() => setViewMode('month')}
              >
                Month
              </button>
              <button
                className={`view-filter-btn ${viewMode === 'year' ? 'active' : ''}`}
                onClick={() => setViewMode('year')}
              >
                Year
              </button>
            </div>
          </div>
          <div className="calendar-wrapper">
            {viewMode === 'day' ? (
              <div className="day-view">
                <div className="day-view-header">
                  <div className="day-view-date">
                    {formatDayView(currentDate).dayName} {formatDayView(currentDate).dayNumber}
                  </div>
                  <div className="day-view-timezone">GMT+03</div>
                </div>
                <div className="day-view-timeline">
                  {getHoursForDay().map((hour) => {
                    const currentTime = getCurrentTime();
                    const isCurrentHour = Math.floor(currentTime) === hour && isToday(currentDate);
                    const dayEvents = getEventsForDay(currentDate);
                    const hourStartTime = hour;
                    const hourEndTime = hour + 1;
                    const isCurrentTimeInHour =
                      isCurrentHour && currentTime >= hourStartTime && currentTime < hourEndTime;
                    const timePositionInHour = isCurrentTimeInHour
                      ? ((currentTime - hourStartTime) / (hourEndTime - hourStartTime)) * 100
                      : null;

                    return (
                      <div key={hour} className="day-view-hour-row">
                        <div className="hour-label">{formatHour(hour)}</div>
                        <div className="hour-content">
                          <div className="hour-line"></div>
                          {isCurrentTimeInHour && timePositionInHour !== null && (
                            <div
                              className="current-time-indicator"
                              style={{ top: `${timePositionInHour}%` }}
                            >
                              <div className="current-time-dot"></div>
                              <div className="current-time-line"></div>
                            </div>
                          )}
                          <div className="hour-events">
                            {dayEvents.map((event) => (
                              <div key={event.id} className="day-event-item">
                                {event.name}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : viewMode === 'week' ? (
              <div className="week-view">
                <div className="week-view-timezone">GMT+03</div>
                <div className="week-view-grid">
                  <div className="week-view-header">
                    <div className="week-view-spacer"></div>
                    {getWeekDays(currentDate).map((day, index) => {
                      const dayName = formatDayView(day).dayName;
                      const dayNumber = formatDayView(day).dayNumber;
                      const isTodayDate = isToday(day);
                      return (
                        <div key={index} className={`week-day-header ${isTodayDate ? 'today' : ''}`}>
                          <div className="week-day-name">{dayName}</div>
                          <div className={`week-day-number ${isTodayDate ? 'today' : ''}`}>{dayNumber}</div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="week-all-day-events">
                    <div className="week-view-spacer"></div>
                    {getWeekDays(currentDate).map((day, index) => {
                      const allDayEvents = getAllDayEventsForDay(day);
                      return (
                        <div key={index} className="week-day-all-day">
                          {allDayEvents.map((event) => (
                            <div key={event.id} className="week-all-day-event">
                              {event.name}
                            </div>
                          ))}
                        </div>
                      );
                    })}
                  </div>
                  <div className="week-view-hours">
                    <div className="week-hour-labels">
                      {getHoursForWeek().map((hour) => (
                        <div key={hour} className="week-hour-label">
                          {formatHour(hour)}
                        </div>
                      ))}
                    </div>
                    <div className="week-days-grid">
                      {getWeekDays(currentDate).map((day, dayIndex) => {
                        const dayEvents = getTimeBasedEventsForDay(day);
                        const firstHour = 12;
                        
                        return (
                          <div key={dayIndex} className="week-day-column">
                            {getHoursForWeek().map((hour) => (
                              <div key={hour} className="week-hour-cell"></div>
                            ))}
                            {/* Render events absolutely positioned */}
                            <div className="week-day-events">
                              {dayEvents.map((event) => {
                                if (event.startTime === undefined || event.endTime === undefined) return null;
                                
                                // Calculate position from top of column (starting at 12 PM)
                                const startHour = Math.max(firstHour, event.startTime);
                                const topOffset = event.startTime < firstHour ? 0 : (startHour - firstHour) * 60;
                                
                                // Calculate height: from max(start, 12PM) to end
                                const visibleStart = Math.max(firstHour, event.startTime);
                                const duration = event.endTime - visibleStart;
                                const height = duration * 60;
                                
                                return (
                                  <div
                                    key={event.id}
                                    className={`week-time-event ${event.name.includes('Lunch') ? 'lunch-event' : ''}`}
                                    style={{
                                      top: `${topOffset}px`,
                                      height: `${height}px`,
                                    }}
                                  >
                                    {event.name}
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            ) : viewMode === 'year' ? (
              <div className="year-view">
                {getAllMonthsForYear(currentDate.getFullYear()).map((monthDate, monthIndex) => {
                  const monthDays = getDaysInMonthForYear(monthDate);
                  const monthName = formatMonthName(monthDate);
                  const currentMonth = monthDate.getMonth();

                  return (
                    <div key={monthIndex} className="year-month">
                      <div className="year-month-header">{monthName}</div>
                      <div className="year-month-weekdays">
                        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, idx) => (
                          <div key={idx} className="year-weekday">
                            {day}
                          </div>
                        ))}
                      </div>
                      <div className="year-month-grid">
                        {monthDays.map((date, dayIndex) => {
                          const isCurrentMonth = isDateInCurrentMonth(date, currentMonth);
                          const hasEventOnDay = hasEvent(date);
                          const isTodayDate = isToday(date);

                          return (
                            <div
                              key={dayIndex}
                              className={`year-day ${!isCurrentMonth ? 'other-month' : ''} ${hasEventOnDay ? 'has-event' : ''} ${isTodayDate ? 'today' : ''}`}
                            >
                              <span className="year-day-number">{date.getDate()}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="calendar-grid">
                {weekDays.map((day) => (
                  <div key={day} className="calendar-weekday">
                    {day}
                  </div>
                ))}
                {days.map((date, index) => {
                  const hasEventOnDay = hasEvent(date);
                  const isTodayDate = isToday(date);

                  return (
                    <div
                      key={index}
                      className={`calendar-day ${!date ? 'empty' : ''} ${hasEventOnDay ? 'has-event' : ''} ${isTodayDate ? 'today' : ''}`}
                    >
                      {date && (
                        <>
                          <span className="day-number">{date.getDate()}</span>
                          {hasEventOnDay && <div className="event-indicator"></div>}
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        <div className="upcoming-events-container">
          <div className="upcoming-events-header">
            <h3>Upcoming Events</h3>
            <button className="events-nav-btn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
          </div>
          <div className="upcoming-events-list">
            {upcomingEvents.map((event) => (
              <div key={event.id} className="event-card">
                <div className="event-image">
                  <img src={event.image} alt={event.name} />
                </div>
                <div className="event-details">
                  <div className="event-name">Event : {event.name}</div>
                  <div className="event-date">Date : {formatEventDate(event.date)}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="upcoming-events-footer">
            <a href="#" className="see-all-link">
              See All
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Events;
