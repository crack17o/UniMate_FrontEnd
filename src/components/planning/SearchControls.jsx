import React, { useState, useEffect } from 'react';

const SearchControls = ({ onSearch }) => {
  const [searchParams, setSearchParams] = useState({
    day: '',
    month: '',
    year: '',
    type: ''
  });

  const eventTypes = [
    { value: '', label: 'Tous les types' },
    { value: 'tp', label: 'Remise TP' },
    { value: 'interro', label: 'Interrogation' },
    { value: 'expose', label: 'Exposé' },
    { value: 'exam', label: 'Période d\'examens' }
  ];

  const months = [
    { value: '', label: 'Tous les mois' },
    ...Array.from({ length: 12 }, (_, i) => ({
      value: (i + 1).toString(),
      label: new Date(2000, i).toLocaleString('fr-FR', { month: 'long' })
    }))
  ];

  // Mettre à jour la recherche à chaque changement de paramètres
  useEffect(() => {
    onSearch(searchParams);
  }, [searchParams, onSearch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchParams(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNavClick = (field, direction) => {
    const currentValue = searchParams[field];
    let newValue = '';
    
    if (field === 'type') {
      const currentIndex = eventTypes.findIndex(type => type.value === currentValue);
      const newIndex = direction === 'next' 
        ? (currentIndex + 1) % eventTypes.length 
        : (currentIndex - 1 + eventTypes.length) % eventTypes.length;
      newValue = eventTypes[newIndex].value;
    } else if (field === 'month') {
      const currentIndex = months.findIndex(month => month.value === currentValue);
      const newIndex = direction === 'next'
        ? (currentIndex + 1) % months.length
        : (currentIndex - 1 + months.length) % months.length;
      newValue = months[newIndex].value;
    }

    setSearchParams(prev => ({
      ...prev,
      [field]: newValue
    }));
  };

  const getCurrentLabel = (field) => {
    if (field === 'type') {
      return eventTypes.find(type => type.value === searchParams.type)?.label || 'Tous les types';
    } else if (field === 'month') {
      return months.find(month => month.value === searchParams.month)?.label || 'Tous les mois';
    }
    return '';
  };

  return (
    <div className="search-controls">
      <div className="search-field">
        <label htmlFor="day">Jour</label>
        <input
          type="number"
          id="day"
          name="day"
          min="1"
          max="31"
          value={searchParams.day}
          onChange={handleChange}
          placeholder="Jour du mois"
        />
      </div>

      <div className="search-field">
        <label htmlFor="month">Mois</label>
        <div className="selector-container">
          <button 
            className="nav-btn" 
            onClick={() => handleNavClick('month', 'prev')}
          >
            ←
          </button>
          <div className="selector-value">
            {getCurrentLabel('month')}
          </div>
          <button 
            className="nav-btn" 
            onClick={() => handleNavClick('month', 'next')}
          >
            →
          </button>
        </div>
      </div>

      <div className="search-field">
        <label htmlFor="year">Année</label>
        <input
          type="number"
          id="year"
          name="year"
          min="2000"
          max="2100"
          value={searchParams.year}
          onChange={handleChange}
          placeholder="Année"
        />
      </div>

      <div className="search-field">
        <label htmlFor="type">Type d'événement</label>
        <div className="selector-container">
          <button 
            className="nav-btn" 
            onClick={() => handleNavClick('type', 'prev')}
          >
            ←
          </button>
          <div className="selector-value">
            {getCurrentLabel('type')}
          </div>
          <button 
            className="nav-btn" 
            onClick={() => handleNavClick('type', 'next')}
          >
            →
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchControls; 