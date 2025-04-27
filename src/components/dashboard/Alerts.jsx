import React from 'react';

const Alerts = ({ alerts }) => {
  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'high':
        return 'exclamation-circle';
      case 'medium':
        return 'exclamation-triangle';
      case 'low':
        return 'info-circle';
      default:
        return 'bell';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'deadline':
        return 'clock';
      case 'exam':
        return 'file-alt';
      case 'grades':
        return 'star';
      default:
        return 'bell';
    }
  };

  return (
    <section className="alerts card">
      <div className="section-header">
        <i className="fas fa-bell section-icon"></i>
        <h2>Alertes et rappels</h2>
      </div>

      <div className="scrollable-content">
        <div className="alerts-list">
          {alerts.map((alert, index) => (
            <div 
              key={index} 
              className={`alert-item priority-${alert.priority}`}
            >
              <div className="alert-header">
                <div className="alert-type">
                  <i className={`fas fa-${getTypeIcon(alert.type)}`}></i>
                  <span>{alert.course}</span>
                </div>
                <div className="alert-priority">
                  <i className={`fas fa-${getPriorityIcon(alert.priority)}`}></i>
                </div>
              </div>

              <div className="alert-content">
                <h3>{alert.title}</h3>
                <p>{alert.description}</p>
                <div className="alert-deadline">
                  <i className="fas fa-calendar"></i>
                  <span>Échéance : {alert.deadline}</span>
                </div>
              </div>

              {alert.actionable && (
                <button className="alert-action">
                  <i className="fas fa-check"></i>
                  Marquer comme fait
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Alerts;
