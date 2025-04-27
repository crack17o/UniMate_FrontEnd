import React from 'react';

const EventModal = ({ event, closeModal }) => {
    return (
        <div className="event-modal">
            <div className="modal-content">
                <h3>{event.title}</h3>
                <p>Date : {event.date}</p>
                <p>Description : {event.description}</p>
                <button onClick={closeModal}>Fermer</button>
            </div>
        </div>
    );
};

export default EventModal;