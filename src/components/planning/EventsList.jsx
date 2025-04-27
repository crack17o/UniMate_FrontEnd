import React from 'react';

export const EventsList = ({ events }) => {
  const sortedEvents = [...events].sort((a, b) => new Date(a.start) - new Date(b.start));

  const getStatusIcon = (status) => {
    switch (status) {
      case 'confirmed':
        return <i className="fas fa-check-circle text-success"></i>;
      case 'pending':
        return <i className="fas fa-clock text-warning"></i>;
      case 'cancelled':
        return <i className="fas fa-times-circle text-danger"></i>;
      default:
        return null;
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'course':
        return <i className="fas fa-book"></i>;
      case 'lab':
        return <i className="fas fa-flask"></i>;
      case 'exam':
        return <i className="fas fa-file-alt"></i>;
      default:
        return <i className="fas fa-calendar"></i>;
    }
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="events-list">
      <h2>Événements à venir</h2>
      <div className="events-container">
        {sortedEvents.map(event => (
          <div key={event.id} className={"event-item " + event.type + " " + event.status}>
            <div className="event-time">
              {formatDate(event.start)}
            </div>
            <div className="event-content">
              <div className="event-header">
                <span className="event-type">
                  {getTypeIcon(event.type)}
                </span>
                <span className="event-title">{event.title}</span>
                <span className="event-status">
                  {getStatusIcon(event.status)}
                </span>
              </div>
              <div className="event-details">
                {event.location && (
                  <div className="event-location">
                    <i className="fas fa-map-marker-alt"></i>
                    {event.location}
                  </div>
                )}
                {event.professor && (
                  <div className="event-professor">
                    <i className="fas fa-user"></i>
                    {event.professor}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
