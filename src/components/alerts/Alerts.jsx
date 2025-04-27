import React, { useState, useMemo } from 'react';
import { 
  IoSearch, 
  IoChevronBackOutline, 
  IoChevronForwardOutline,
  IoClose,
  IoArrowBack,
  IoArrowForward,
} from 'react-icons/io5';
import '../../styles/alerts.css';

function Alerts() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [alerts] = useState([
    {
      id: 1,
      title: 'Examen Final de Mathématiques',
      description: 'Examen final du module Algèbre. Durée: 3h. Calculatrice autorisée.',
      type: 'Examen',
      priority: 'à venir',
      date: '2024-04-15',
      status: 'non lu',
      department: 'Mathématiques'
    },
    {
      id: 2,
      title: 'Remise du Projet Web',
      description: 'Date limite pour la remise du projet final de développement web.',
      type: 'Remise TP',
      priority: 'actuel',
      date: '2024-04-05',
      status: 'lu',
      department: 'Informatique'
    },
    {
      id: 3,
      title: 'Interrogation surprise',
      description: 'Interrogation sur le chapitre 5: Thermodynamique',
      type: 'Interrogation',
      priority: 'passé',
      date: '2024-03-28',
      status: 'lu',
      department: 'Physique'
    },
    {
      id: 4,
      title: 'Journée Portes Ouvertes',
      description: 'Présentation des projets étudiants',
      type: 'Date Importante',
      priority: 'à venir',
      date: '2024-04-20',
      status: 'non lu',
      department: 'Administration'
    },
    {
      id: 5,
      title: 'Séance de Révision - Analyse',
      description: 'Séance de révision pour l\'examen final',
      type: 'Révision',
      priority: 'à venir',
      date: '2024-04-12',
      status: 'non lu',
      department: 'Mathématiques'
    },
    {
      id: 6,
      title: 'Remise Rapport de Stage',
      description: 'Date limite pour le rapport de stage',
      type: 'Remise TP',
      priority: 'à venir',
      date: '2024-04-25',
      status: 'non lu',
      department: 'Administration'
    },
    // Ajoutez d'autres alertes si nécessaire
  ]);

  const [selectedAlert, setSelectedAlert] = useState(null);
  const [filters, setFilters] = useState({
    search: '',
    type: 'all',
    priority: 'all'
  });

  const filteredAlerts = useMemo(() => {
    return alerts.filter(alert => {
      const matchesSearch = alert.title.toLowerCase().includes(filters.search.toLowerCase()) ||
                          alert.description.toLowerCase().includes(filters.search.toLowerCase());
      const matchesType = filters.type === 'all' || alert.type === filters.type;
      const matchesPriority = filters.priority === 'all' || alert.priority === filters.priority;

      return matchesSearch && matchesType && matchesPriority;
    });
  }, [alerts, filters]);

  // Pagination
  const totalPages = Math.ceil(filteredAlerts.length / itemsPerPage);
  const paginatedAlerts = filteredAlerts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const getAlertIcon = (type) => {
    const icons = {
      'Examen': 'fas fa-graduation-cap',
      'Remise TP': 'fas fa-laptop-code',
      'Interrogation': 'fas fa-pencil-alt',
      'Date Importante': 'fas fa-exclamation-circle',
      'Révision': 'fas fa-book'
    };
    return <i className={icons[type] || 'fas fa-bell'} />;
  };

  return (
    <div className="alerts-page">
      <div className="alerts-header">
        <h1>Alertes</h1>
        <div className="alerts-filters">
          <div className="search-bar">
            <IoSearch />
            <input
              type="text"
              placeholder="Rechercher une alerte..."
              value={filters.search}
              onChange={(e) => setFilters({...filters, search: e.target.value})}
            />
          </div>
          <select
            value={filters.type}
            onChange={(e) => setFilters({...filters, type: e.target.value})}
          >
            <option value="all">Tous les types</option>
            <option value="Examen">Examen</option>
            <option value="Remise TP">Remise TP</option>
            <option value="Interrogation">Interrogation</option>
            <option value="Date Importante">Date Importante</option>
            <option value="Révision">Révision</option>
          </select>
          <select
            value={filters.priority}
            onChange={(e) => setFilters({...filters, priority: e.target.value})}
          >
            <option value="all">Toutes les priorités</option>
            <option value="passé">Passé</option>
            <option value="actuel">Actuel</option>
            <option value="à venir">À venir</option>
          </select>
        </div>
      </div>

      <div className="alerts-table-container">
        <table className="alerts-table">
          <thead>
            <tr>
              <th>Type</th>
              <th>Titre</th>
              <th>Département</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedAlerts.map((alert) => (
              <tr key={alert.id} className={`alert-row ${alert.type.toLowerCase()}`}>
                <td>
                  <span className={`alert-type-indicator ${alert.type.toLowerCase()}`}>
                    {getAlertIcon(alert.type)}
                    <span className="alert-type-text">{alert.type}</span>
                  </span>
                </td>
                <td>{alert.title}</td>
                <td>{alert.department}</td>
                <td>{new Date(alert.date).toLocaleDateString('fr-FR')}</td>
                <td>
                  <button 
                    className="view-details-btn"
                    onClick={() => setSelectedAlert(alert)}
                  >
                    Voir détails
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="pagination">
          <button 
            className="pagination-btn"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <IoArrowBack />
          </button>
          
          <div className="pagination-dots">
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index + 1}
                className={`pagination-dot ${currentPage === index + 1 ? 'active' : ''}`}
                onClick={() => handlePageChange(index + 1)}
              />
            ))}
          </div>

          <button 
            className="pagination-btn"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <IoArrowForward />
          </button>
        </div>
      </div>

      {selectedAlert && (
        <div className="alert-modal active">
          <div className="modal-overlay" onClick={() => setSelectedAlert(null)}></div>
          <div className="modal-content">
            <button className="close-modal" onClick={() => setSelectedAlert(null)}>
              <i className="fas fa-times"></i>
            </button>
            <div className="modal-header">
              <div className="header-content">
                <span className={`alert-type-indicator ${selectedAlert.type.toLowerCase()}`}>
                  {getAlertIcon(selectedAlert.type)}
                  <span className="alert-type-text">{selectedAlert.type}</span>
                </span>
                <h3>{selectedAlert.title}</h3>
              </div>
            </div>
            <div className="modal-body">
              <div className="alert-details">
                <div className="detail-item">
                  <i className="fas fa-calendar"></i>
                  <div>
                    <div className="label">Date</div>
                    <div className="value">
                      {new Date(selectedAlert.date).toLocaleDateString('fr-FR')}
                    </div>
                  </div>
                </div>
                <div className="detail-item">
                  <i className="fas fa-graduation-cap"></i>
                  <div>
                    <div className="label">Département</div>
                    <div className="value">{selectedAlert.department}</div>
                  </div>
                </div>
                <div className="detail-item">
                  <i className="fas fa-info-circle"></i>
                  <div>
                    <div className="label">Description</div>
                    <div className="value">{selectedAlert.description}</div>
                  </div>
                </div>
                <div className="detail-item">
                  <i className="fas fa-clock"></i>
                  <div>
                    <div className="label">Priorité</div>
                    <div className="value">
                      <span className={`priority-badge ${selectedAlert.priority}`}>
                        {selectedAlert.priority}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Alerts;