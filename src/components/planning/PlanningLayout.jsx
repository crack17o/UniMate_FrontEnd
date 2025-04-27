import React, { useState } from 'react';
import { Calendar } from './Calendar';
import { EventsList } from './EventsList';
import { SearchBar } from './SearchBar';

const PlanningLayout = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);

  const handleSearch = (filters) => {
    const filtered = events.filter(event => {
      const matchesType = filters.type ? event.extendedProps.type === filters.type : true;
      const matchesDate = filters.date ? 
        new Date(event.start).toDateString() === new Date(filters.date).toDateString() : true;
      return matchesType && matchesDate;
    });
    setFilteredEvents(filtered);
  };

  return (
    <div className="planning-container">
      <div className="planning-header">
        <h1>Mon Planning</h1>
        <SearchBar onSearch={handleSearch} />
      </div>

      <div className="planning-content">
        <div className="planning-calendar">
          <Calendar events={filteredEvents.length > 0 ? filteredEvents : events} />
        </div>
        <div className="planning-sidebar">
          <EventsList events={filteredEvents.length > 0 ? filteredEvents : events} />
        </div>
      </div>
    </div>
  );
};

export default PlanningLayout;
