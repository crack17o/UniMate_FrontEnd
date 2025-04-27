import React, { useState, useEffect } from 'react';
import CalendarControls from './CalendarControls';
import SearchControls from './SearchControls';
import Calendar from './Calendar';
import EventList from './EventList';
import '../styles/planning.css';

const Planning = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [searchParams, setSearchParams] = useState({
    day: '',
    month: '',
    year: '',
    type: ''
  });
  const [events, setEvents] = useState([]);

  // Liste d'événements prédéfinis
  useEffect(() => {
    const predefinedEvents = [
      {
        id: 'event-1',
        title: 'Mathématiques - Algèbre',
        type: 'cm',
        date: new Date(),
        startTime: '09:00',
        endTime: '11:00',
        professor: 'Dr. Martin',
        room: 'A101',
        description: 'Cours d\'algèbre linéaire'
      },
      {
        id: 'event-2',
        title: 'Physique - Mécanique',
        type: 'td',
        date: new Date(),
        startTime: '14:00',
        endTime: '16:00',
        professor: 'Prof. Dubois',
        room: 'B203',
        description: 'Travaux dirigés de mécanique'
      },
      {
        id: 'event-3',
        title: 'Informatique - Programmation',
        type: 'tp',
        date: new Date(new Date().setDate(new Date().getDate() + 1)),
        startTime: '10:00',
        endTime: '12:00',
        professor: 'Mme. Laurent',
        room: 'C305',
        description: 'TP de programmation Python'
      },
      {
        id: 'event-4',
        title: 'Chimie - Organique',
        type: 'exam',
        date: new Date(new Date().setDate(new Date().getDate() + 2)),
        startTime: '09:00',
        endTime: '12:00',
        professor: 'Dr. Bernard',
        room: 'D407',
        description: 'Examen de chimie organique'
      },
      {
        id: 'event-5',
        title: 'Anglais - Conversation',
        type: 'cm',
        date: new Date(new Date().setDate(new Date().getDate() + 3)),
        startTime: '13:00',
        endTime: '15:00',
        professor: 'Prof. Petit',
        room: 'E509',
        description: 'Cours d\'anglais conversationnel'
      }
    ];
    
    setEvents(predefinedEvents);
  }, []);

  const handleDateChange = (newDate) => {
    setCurrentDate(newDate);
  };

  const handleSearch = (params) => {
    setSearchParams(params);
  };

  return (
    <div className="planning-container">
      <div className="planning-header">
        <CalendarControls 
          currentDate={currentDate} 
          onDateChange={handleDateChange} 
        />
        <SearchControls 
          onSearch={handleSearch}
          currentDate={currentDate}
        />
      </div>

      <div className="planning-content">
        <Calendar 
          currentDate={currentDate}
          events={events}
        />
        <EventList 
          currentDate={currentDate}
          searchParams={searchParams}
        />
      </div>
    </div>
  );
};

export default Planning; 