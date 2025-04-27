import React from 'react';

const ImportantDates = ({ dates }) => {
  return (
    <section className="important-dates card">
      <div className="section-header">
        <i className="fas fa-calendar-alt section-icon"></i>
        <h2>Dates importantes</h2>
      </div>
      <div className="scrollable-content">
        <div className="dates-list">
          {dates.map((date, index) => (
            <div key={index} className="date-item">
              <div className="date-info">
                <span className="date">{date.date}</span>
                <span className="time">{date.time}</span>
              </div>
              <p>{date.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImportantDates;
