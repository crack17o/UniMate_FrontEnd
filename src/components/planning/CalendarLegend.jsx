import React from 'react';

const CalendarLegend = () => {
  const legendItems = [
    { type: 'tp', label: 'Remise TP' },
    { type: 'interro', label: 'Interrogation' },
    { type: 'expose', label: 'Exposé' },
    { type: 'exam', label: 'Période d\'examens' }
  ];

  return (
    <div className="calendar-legend">
      {legendItems.map((item) => (
        <div key={item.type} className="legend-item">
          <span className={`color-dot ${item.type}`}></span>
          <span>{item.label}</span>
        </div>
      ))}
    </div>
  );
};

export default CalendarLegend; 