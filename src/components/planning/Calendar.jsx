import React from 'react';
import '../../styles/planning.css';

const Calendar = ({ currentDate, events, onEventClick }) => {
  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const getEventsForDay = (day) => {
    return events.filter(event => {
      const eventDate = new Date(event.date || event.startDate);
      return eventDate.getDate() === day &&
             eventDate.getMonth() === currentDate.getMonth() &&
             eventDate.getFullYear() === currentDate.getFullYear();
    });
  };

  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];

    // Ajouter les jours vides au début
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
    }

    // Ajouter les jours du mois
    for (let day = 1; day <= daysInMonth; day++) {
      const dayEvents = getEventsForDay(day);
      const hasEvents = dayEvents.length > 0;

      days.push(
        <div
          key={day}
          className={`calendar-day ${hasEvents ? 'has-events' : ''}`}
        >
          <span className="day-number">{day}</span>
          {hasEvents && (
            <div className="day-events">
              {dayEvents.map((event, index) => (
                <div
                  key={`${day}-${index}`}
                  className={`event-dot event-${event.type.toLowerCase()}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    onEventClick(event);
                  }}
                />
              ))}
            </div>
          )}
        </div>
      );
    }

    return days;
  };

  return (
    <div className="calendar">
      <div className="calendar-grid">
        <div className="weekday">Dim</div>
        <div className="weekday">Lun</div>
        <div className="weekday">Mar</div>
        <div className="weekday">Mer</div>
        <div className="weekday">Jeu</div>
        <div className="weekday">Ven</div>
        <div className="weekday">Sam</div>
        {renderCalendarDays()}
      </div>
    </div>
  );
};

export default Calendar;
