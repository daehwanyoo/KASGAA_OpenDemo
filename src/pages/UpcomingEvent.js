import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import './UpcomingEvent.css';

const UpcomingEvent = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [hoveredEvent, setHoveredEvent] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:5000/events')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch events');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Fetched events:', data);
        setEvents(data);
      })
      .catch((error) => {
        console.error('Error fetching events:', error);
        setEvents([]); // Fallback to an empty array
      });
  }, []);

  const getMonthDays = (month, year) => {
    const days = new Date(year, month + 1, 0).getDate();
    return [...Array(days).keys()].map((day) => day + 1);
  };

  const renderCalendar = () => {
    if (!Array.isArray(events)) return null;

    const firstDay = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      1
    ).getDay();
    const daysInMonth = getMonthDays(
      currentMonth.getMonth(),
      currentMonth.getFullYear()
    );
    const calendar = [];
    const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    calendar.push(
      ...daysOfWeek.map((day, index) => (
        <div key={`day-header-${index}`} className="calendar-header-cell">
          {day}
        </div>
      ))
    );
  
    for (let i = 0; i < firstDay; i++) {
      calendar.push(<div key={`empty-${i}`} className="calendar-cell"></div>);
    }

    daysInMonth.forEach((day) => {
      const date = new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth(),
        day
      );
      const dateString = date.toISOString().split('T')[0]; // Standardize date format (YYYY-MM-DD)
      const event = events.find((e) => e.date === dateString);

      calendar.push(
        <div
          key={day}
          className={`calendar-cell ${
            selectedEvent?.date === dateString || hoveredEvent?.date === dateString
              ? 'active'
              : ''
          }`}
          onMouseEnter={() => !selectedEvent && setHoveredEvent(event)}
          onMouseLeave={() => !selectedEvent && setHoveredEvent(null)}
          onClick={() => setSelectedEvent(event || null)} // Update selected event
        >
          <span>{day}</span>
        </div>
      );
    });
    const totalCells = Math.ceil(calendar.length / 7) * 7; // Round up to the nearest multiple of 7
    for (let i = calendar.length; i < totalCells; i++) {
      calendar.push(
        <div key={`empty-end-${i}`} className="calendar-cell placeholder"></div>
      );
    }
  
    return calendar;
  };

  const changeMonth = (direction) => {
    const newMonth = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth() + direction
    );
    setCurrentMonth(newMonth);
    setHoveredEvent(null);
    setSelectedEvent(null);
  };

  const displayedEvent = selectedEvent || hoveredEvent;

  return (
    <div>
      <Header pageType="event" />
      <div className="upcoming-event-title-container">
        <h1 className="upcoming-event-title">UPCOMING EVENT</h1>
      </div>
      <main className="upcoming-event-page">
        <div className="calendar-container">
          <div className="calendar-header">
            <span className="nav-arrow" onClick={() => changeMonth(-1)}>
              &lt;
            </span>&nbsp;&nbsp;
            <span className="month-year">
              {currentMonth.toLocaleString('default', { month: 'long' })}
            </span>&nbsp;&nbsp;
            <span className="nav-arrow" onClick={() => changeMonth(1)}>
              &gt;
            </span>
          </div>
          <div className="calendar-grid">{renderCalendar()}</div>
        </div>
        <div className="event-details">
          {displayedEvent ? (
            <>
              <img
                src={`${process.env.PUBLIC_URL}/poster.png`}
                alt="Event"
                className="event-image"
              />
              <div className="event-title">{displayedEvent.title}</div>
              <div className="event-time">{displayedEvent.time}</div>
              <div className="event-location">{displayedEvent.location}</div>
              <div className="event-description">
                {displayedEvent.description}
              </div>
            </>
          ) : (
            <p>Select a date to view event details</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default UpcomingEvent;
