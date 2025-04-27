import React from 'react';

const CalendarContent = ({ view, selectedDate, events, openEventModal }) => {
    return (
        <div className="calendar-content">
            <h2>Vue : {view}</h2>
            <p>Date sélectionnée : {selectedDate.toDateString()}</p>
            <ul className="events-list">
                {events.length > 0 ? (
                    events.map((event, index) => (
                        <li
                            key={index}
                            className="event-item"
                            onClick={() => openEventModal(event)}
                        >
                            {event.title} - {event.date}
                        </li>
                    ))
                ) : (
                    <p>Aucun événement pour cette période.</p>
                )}
            </ul>
        </div>
    );
};

export default CalendarContent;