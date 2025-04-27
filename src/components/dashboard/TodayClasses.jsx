import React from 'react';

const TodayClasses = ({ classes }) => {
  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case 'confirmed':
        return 'confirmed';
      case 'pending':
        return 'pending';
      case 'cancelled':
        return 'cancelled';
      default:
        return '';
    }
  };

  const getStatusText = (status) => {
    switch (status.toLowerCase()) {
      case 'confirmed':
        return 'Cours confirmé';
      case 'pending':
        return 'En attente';
      case 'cancelled':
        return 'Séance levée';
      default:
        return status;
    }
  };

  return (
    <section className="today-classes card">
      <div className="section-header">
        <i className="fas fa-chalkboard-teacher section-icon"></i>
        <h2>Cours du jour</h2>
      </div>
      <div className="scrollable-content">
        <div className="class-list">
          {classes.map((course, index) => (
            <div key={index} className="class-item">
              <h3>{course.name}</h3>
              <p>{course.startTime} - {course.endTime}</p>
              <p className={`status ${getStatusClass(course.status)}`}>
                {getStatusText(course.status)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TodayClasses;
