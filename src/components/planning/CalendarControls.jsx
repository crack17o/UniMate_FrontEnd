import React, { useState } from 'react';
import DatePickerModal from './DatePickerModal';

const CalendarControls = ({ currentDate, onDateChange }) => {
    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

    const formatDate = (date) => {
        const options = { 
            month: 'long', 
            year: 'numeric'
        };
        return date.toLocaleDateString('fr-FR', options);
    };

    const handlePrev = () => {
        const newDate = new Date(currentDate);
        newDate.setMonth(currentDate.getMonth() - 1);
        onDateChange(newDate);
    };

    const handleNext = () => {
        const newDate = new Date(currentDate);
        newDate.setMonth(currentDate.getMonth() + 1);
        onDateChange(newDate);
    };

    const handleToday = () => {
        onDateChange(new Date());
    };

    const handleDateSelect = (newDate) => {
        onDateChange(newDate);
    };

    return (
        <div className="calendar-controls">
            <div className="nav-buttons">
                <button className="nav-btn" onClick={handlePrev}>
                    <span>←</span>
                </button>
                <button className="today-btn" onClick={handleToday}>
                    Aujourd'hui
                </button>
                <button className="nav-btn" onClick={handleNext}>
                    <span>→</span>
                </button>
            </div>
            <div 
                className="current-date clickable"
                onClick={() => setIsDatePickerOpen(true)}
            >
                {formatDate(currentDate)}
            </div>

            {isDatePickerOpen && (
                <DatePickerModal
                    currentDate={currentDate}
                    onClose={() => setIsDatePickerOpen(false)}
                    onDateSelect={handleDateSelect}
                />
            )}
        </div>
    );
};

export default CalendarControls;