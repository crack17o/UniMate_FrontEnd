import React, { useState } from 'react';

const EventModal = ({ onClose, onSave }) => {
  const [formData, setFormData] = useState({
    title: '',
    type: 'cours',
    date: '',
    time: '',
    details: '',
    professor: '',
    room: '',
    duration: '',
    startDate: '',
    endDate: ''
  });

  const [showExamDates, setShowExamDates] = useState(false);

  const eventTypes = [
    { value: 'cours', label: 'Cours' },
    { value: 'tp', label: 'TP' },
    { value: 'interro', label: 'Interrogation' },
    { value: 'expose', label: 'Exposé' },
    { value: 'exam', label: 'Examen' }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (name === 'type') {
      setShowExamDates(value === 'exam');
    }
  };

  const handleTypeNav = (direction) => {
    const currentIndex = eventTypes.findIndex(type => type.value === formData.type);
    const newIndex = direction === 'next'
      ? (currentIndex + 1) % eventTypes.length
      : (currentIndex - 1 + eventTypes.length) % eventTypes.length;
    
    const newType = eventTypes[newIndex].value;
    setFormData(prev => ({
      ...prev,
      type: newType
    }));
    setShowExamDates(newType === 'exam');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="event-form-modal">
      <div className="modal-overlay" onClick={onClose}></div>
      <div className="modal-content">
        <button className="close-modal" onClick={onClose}>
          <i className="fas fa-times"></i>
        </button>
        <div className="modal-header">
          <h3>Ajouter un événement</h3>
        </div>
        <div className="modal-body">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="eventTitle">Titre*</label>
              <input
                type="text"
                id="eventTitle"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="eventType">Type d'événement*</label>
              <div className="selector-container">
                <button 
                  type="button"
                  className="nav-btn" 
                  onClick={() => handleTypeNav('prev')}
                >
                  ←
                </button>
                <div className="selector-value">
                  {eventTypes.find(type => type.value === formData.type)?.label}
                </div>
                <button 
                  type="button"
                  className="nav-btn" 
                  onClick={() => handleTypeNav('next')}
                >
                  →
                </button>
              </div>
            </div>

            <div className="form-row" style={{ display: showExamDates ? 'none' : 'flex' }}>
              <div className="form-group">
                <label htmlFor="eventDate">Date*</label>
                <input
                  type="date"
                  id="eventDate"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required={!showExamDates}
                />
              </div>
              <div className="form-group">
                <label htmlFor="eventTime">Heure</label>
                <input
                  type="time"
                  id="eventTime"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-row" style={{ display: showExamDates ? 'flex' : 'none' }}>
              <div className="form-group">
                <label htmlFor="examStartDate">Date de début*</label>
                <input
                  type="date"
                  id="examStartDate"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  required={showExamDates}
                />
              </div>
              <div className="form-group">
                <label htmlFor="examEndDate">Date de fin*</label>
                <input
                  type="date"
                  id="examEndDate"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                  required={showExamDates}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="eventDetails">Détails</label>
              <textarea
                id="eventDetails"
                name="details"
                value={formData.details}
                onChange={handleChange}
                rows="3"
              ></textarea>
            </div>

            <div className="form-group">
              <label htmlFor="eventProfessor">Professeur</label>
              <input
                type="text"
                id="eventProfessor"
                name="professor"
                value={formData.professor}
                onChange={handleChange}
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="eventRoom">Salle</label>
                <input
                  type="text"
                  id="eventRoom"
                  name="room"
                  value={formData.room}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="eventDuration">Durée</label>
                <input
                  type="text"
                  id="eventDuration"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  placeholder="ex: 2 heures"
                />
              </div>
            </div>

            <div className="form-actions">
              <button type="button" className="cancel-btn" onClick={onClose}>
                Annuler
              </button>
              <button type="submit" className="submit-btn">
                Ajouter l'événement
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EventModal;
