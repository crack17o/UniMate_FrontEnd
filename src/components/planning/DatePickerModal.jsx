import React, { useState } from 'react';

const DatePickerModal = ({ currentDate, onClose, onDateSelect }) => {
  const [selectedMonth, setSelectedMonth] = useState(currentDate.getMonth());
  const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear());
  const [yearInput, setYearInput] = useState(currentDate.getFullYear().toString());
  const [yearError, setYearError] = useState('');

  const months = [
    'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
    'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
  ];

  const currentYear = new Date().getFullYear();

  const validateYear = (year) => {
    const yearNum = parseInt(year);
    if (isNaN(yearNum)) {
      setYearError('L\'année doit être un nombre');
      return false;
    }
    if (yearNum < currentYear) {
      setYearError('L\'année ne peut pas être inférieure à l\'année en cours');
      return false;
    }
    if (yearNum > 3000) {
      setYearError('L\'année ne peut pas être supérieure à 3000');
      return false;
    }
    setYearError('');
    return true;
  };

  const handleYearChange = (e) => {
    const value = e.target.value;
    setYearInput(value);
    if (validateYear(value)) {
      setSelectedYear(parseInt(value));
    }
  };

  const handlePrevMonth = () => {
    if (selectedMonth === 0) {
      setSelectedMonth(11);
      setSelectedYear(prev => prev - 1);
      setYearInput((prev => parseInt(prev) - 1).toString());
    } else {
      setSelectedMonth(prev => prev - 1);
    }
  };

  const handleNextMonth = () => {
    if (selectedMonth === 11) {
      setSelectedMonth(0);
      setSelectedYear(prev => prev + 1);
      setYearInput((prev => parseInt(prev) + 1).toString());
    } else {
      setSelectedMonth(prev => prev + 1);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateYear(yearInput)) {
      const newDate = new Date(parseInt(yearInput), selectedMonth);
      onDateSelect(newDate);
      onClose();
    }
  };

  return (
    <div className="event-form-modal">
      <div className="modal-overlay" onClick={onClose} />
      <div className="modal-content">
        <button className="close-modal" onClick={onClose}>✕</button>
        <div className="modal-header">
          <h3>Sélectionner une date</h3>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Mois</label>
            <div className="month-selector">
              <button type="button" className="month-nav-btn" onClick={handlePrevMonth}>
                ←
              </button>
              <div className="current-month">{months[selectedMonth]}</div>
              <button type="button" className="month-nav-btn" onClick={handleNextMonth}>
                →
              </button>
            </div>
          </div>
          <div className="form-group">
            <label>Année</label>
            <input
              type="number"
              value={yearInput}
              onChange={handleYearChange}
              min={currentYear}
              max={3000}
              className={yearError ? 'error' : ''}
            />
            {yearError && <span className="error-message">{yearError}</span>}
          </div>
          <div className="form-actions">
            <button type="button" className="cancel-btn" onClick={onClose}>
              Annuler
            </button>
            <button 
              type="submit" 
              className="submit-btn"
              disabled={!!yearError}
            >
              Valider
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DatePickerModal; 