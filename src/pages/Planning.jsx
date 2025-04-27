import React, { useState, useEffect } from 'react';
import CalendarControls from '../components/planning/CalendarControls';
import CalendarLegend from '../components/planning/CalendarLegend';
import Calendar from '../components/planning/Calendar';
import SearchControls from '../components/planning/SearchControls';
import EventModal from '../components/planning/EventModal';
import '../styles/planning.css';

const Planning = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [searchParams, setSearchParams] = useState({
    day: '',
    month: '',
    year: '',
    type: ''
  });

  // Générer des événements aléatoires au chargement
  useEffect(() => {
    const generateRandomEvents = () => {
      const eventTypes = ['tp', 'interro', 'expose', 'exam'];
      const eventTitles = [
        'Mathématiques',
        'Physique',
        'Informatique',
        'Chimie',
        'Biologie',
        'Anglais',
        'Français',
        'Histoire'
      ];
      const professors = [
        'Dr. Martin',
        'Prof. Dubois',
        'Mme. Laurent',
        'Dr. Bernard',
        'Prof. Petit',
        'M. Durand'
      ];
      const rooms = ['A101', 'B203', 'C305', 'D407', 'E509', 'F611'];

      const randomEvents = [];
      const today = new Date();
      
      // Générer 20 événements aléatoires
      for (let i = 0; i < 20; i++) {
        const randomDate = new Date(today);
        randomDate.setDate(today.getDate() + Math.floor(Math.random() * 30));
        
        const randomType = eventTypes[Math.floor(Math.random() * eventTypes.length)];
        const randomTitle = eventTitles[Math.floor(Math.random() * eventTitles.length)];
        const randomProfessor = professors[Math.floor(Math.random() * professors.length)];
        const randomRoom = rooms[Math.floor(Math.random() * rooms.length)];
        
        if (randomType === 'exam') {
          // Pour les examens, générer une date de début et de fin
          const startDate = new Date(randomDate);
          const endDate = new Date(randomDate);
          endDate.setDate(endDate.getDate() + Math.floor(Math.random() * 3) + 1);
          
          randomEvents.push({
            id: `event-${i}`,
            title: `${randomTitle} - Examen`,
            type: randomType,
            startDate: startDate.toISOString().split('T')[0],
            endDate: endDate.toISOString().split('T')[0],
            professor: randomProfessor,
            room: randomRoom,
            details: `Examen de ${randomTitle}`
          });
        } else {
          // Pour les autres types d'événements, générer une heure de début et une durée
          const startTime = Math.floor(Math.random() * 14) + 8; // Entre 8h et 22h
          const duration = Math.floor(Math.random() * 3) + 1; // Entre 1h et 4h
          
          randomEvents.push({
            id: `event-${i}`,
            title: randomTitle,
            type: randomType,
            date: randomDate.toISOString().split('T')[0],
            time: `${startTime.toString().padStart(2, '0')}:00`,
            duration: duration,
            professor: randomProfessor,
            room: randomRoom,
            details: `Cours de ${randomTitle} avec ${randomProfessor}`
          });
        }
      }
      
      setEvents(randomEvents);
    };

    generateRandomEvents();
  }, []);

  const handleDateChange = (date) => {
    setCurrentDate(date);
  };

  const handleAddEvent = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
  };

  const handleSaveEvent = (eventData) => {
    setEvents([...events, { ...eventData, id: `event-${events.length}` }]);
    setIsModalOpen(false);
  };

  const handleSearch = (params) => {
    setSearchParams(params);
  };

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const filteredEvents = events.filter(event => {
    if (searchParams.type && event.type !== searchParams.type) return false;
    
    if (searchParams.day || searchParams.month || searchParams.year) {
      const eventDate = event.date || event.startDate;
      const eventDateObj = new Date(eventDate);
      
      if (searchParams.day && eventDateObj.getDate().toString() !== searchParams.day) return false;
      if (searchParams.month && (eventDateObj.getMonth() + 1).toString() !== searchParams.month) return false;
      if (searchParams.year && eventDateObj.getFullYear().toString() !== searchParams.year) return false;
    }
    
    return true;
  });

  return (
    <div className="planning-container">
      <div className="planning-header">
        <CalendarControls
          currentDate={currentDate}
          onDateChange={handleDateChange}
        />
        <CalendarLegend />
      </div>
      
      <div className="planning-content">
        <div className="calendar-section">
          <Calendar
            currentDate={currentDate}
            events={events}
            onEventClick={handleEventClick}
          />
        </div>

        <div className="search-section">
          <SearchControls onSearch={handleSearch} />
          
          {filteredEvents.length > 0 && (
            <div className="search-results">
              <div className="results-header">
                <h3>Résultats de recherche</h3>
                <button 
                  className="clear-search"
                  onClick={() => setSearchParams({ day: '', month: '', year: '', type: '' })}
                >
                  ✕
                </button>
              </div>
              <div className="results-list">
                {filteredEvents.map(event => (
                  <div 
                    key={event.id} 
                    className={`event event-${event.type}`}
                    onClick={() => handleEventClick(event)}
                  >
                    <div className="event-time">
                      {event.type === 'exam' 
                        ? `${event.startDate} - ${event.endDate}`
                        : `${event.date} ${event.time} (${event.duration}h)`
                      }
                    </div>
                    <div className="event-title">{event.title}</div>
                    <div className="event-details">
                      {event.professor} - {event.room}
                      <br />
                      {event.details}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <button className="add-event-btn" onClick={handleAddEvent}>
        <span>+</span> Ajouter un événement
      </button>

      {isModalOpen && (
        <EventModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSave={handleSaveEvent}
          event={selectedEvent}
        />
      )}
    </div>
  );
};

export default Planning;
