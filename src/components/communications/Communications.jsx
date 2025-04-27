import React, { useState, useMemo, useEffect } from 'react';
import '../../styles/communications.css';

function Communications() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedComm, setSelectedComm] = useState(null);
  const [filters, setFilters] = useState({
    sender: 'all',
    type: 'all'
  });

  const communicationsData = [
    {
      id: 1,
      title: 'Fermeture exceptionnelle',
      description: 'La faculté sera fermée le lundi 18 mars pour maintenance.',
      type: 'urgent',
      date: '2024-03-15',
      time: '09:30',
      sender: 'faculty',
      senderName: 'Direction de la Faculté',
      department: 'Administration'
    },
    {
      id: 2,
      title: 'Report du cours de Mathématiques',
      description: 'Le cours de mathématiques du 20 mars est reporté au 27 mars.',
      type: 'info',
      date: '2024-03-16',
      time: '14:00',
      sender: 'professor',
      senderName: 'Dr. Martin',
      department: 'Mathématiques'
    },
    {
      id: 3,
      title: 'Conférence sur l\'IA',
      description: 'Une conférence sur l\'Intelligence Artificielle aura lieu dans l\'amphithéâtre principal.',
      type: 'event',
      date: '2024-03-25',
      time: '10:00',
      sender: 'department',
      senderName: 'Département Informatique',
      department: 'Informatique'
    },
    {
      id: 4,
      title: 'Panne système inscription',
      description: 'Le système d\'inscription est temporairement indisponible. Maintenance en cours.',
      type: 'urgent',
      date: '2024-03-17',
      time: '08:15',
      sender: 'faculty',
      senderName: 'Service Informatique',
      department: 'Administration'
    },
    {
      id: 5,
      title: 'Examens - Planning final',
      description: 'Le planning définitif des examens est maintenant disponible sur votre espace étudiant.',
      type: 'info',
      date: '2024-03-18',
      time: '11:30',
      sender: 'department',
      senderName: 'Secrétariat Pédagogique',
      department: 'Administration'
    },
    {
      id: 6,
      title: 'Session de révision collective',
      description: 'Une session de révision collective pour l\'examen de physique est organisée.',
      type: 'event',
      date: '2024-03-22',
      time: '15:00',
      sender: 'professor',
      senderName: 'Dr. Bernard',
      department: 'Physique'
    },
    {
      id: 7,
      title: 'Mise à jour - Plateforme e-learning',
      description: 'La plateforme e-learning sera mise à jour ce weekend. Indisponible samedi matin.',
      type: 'info',
      date: '2024-03-19',
      time: '16:45',
      sender: 'faculty',
      senderName: 'Support Technique',
      department: 'Administration'
    },
    {
      id: 8,
      title: 'Changement de salle TP',
      description: 'Les TP d\'électronique sont déplacés en salle B204 pour cette semaine.',
      type: 'info',
      date: '2024-03-20',
      time: '09:00',
      sender: 'professor',
      senderName: 'Dr. Laurent',
      department: 'Électronique'
    }
  ];

  const itemsPerPage = 5;

  // Fonction de filtrage améliorée
  const filteredComms = useMemo(() => {
    return communicationsData.filter(comm => {
      const matchesSender = filters.sender === 'all' || comm.sender === filters.sender;
      const matchesType = filters.type === 'all' || comm.type === filters.type;
      return matchesSender && matchesType;
    });
  }, [filters]);

  // Pagination mise à jour pour utiliser les communications filtrées
  const totalPages = Math.ceil(filteredComms.length / itemsPerPage);
  const paginatedComms = filteredComms.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Reset de la page courante quand les filtres changent
  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  return (
    <div className="communications-container">
      <div className="communications-header">
        <h1>Communications</h1>
        <div className="filters">
          <select
            value={filters.sender}
            onChange={(e) => handleFilterChange('sender', e.target.value)}
          >
            <option value="all">Tous les émetteurs</option>
            <option value="faculty">Faculté</option>
            <option value="department">Département</option>
            <option value="professor">Professeurs</option>
          </select>
          <select
            value={filters.type}
            onChange={(e) => handleFilterChange('type', e.target.value)}
          >
            <option value="all">Tous les types</option>
            <option value="urgent">Urgent</option>
            <option value="info">Information</option>
            <option value="event">Événement</option>
          </select>
        </div>
      </div>

      <div className="communications-table-container">
        {filteredComms.length > 0 ? (
          <>
            <table className="communications-table">
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Titre</th>
                  <th>Émetteur</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedComms.map((comm) => (
                  <tr key={comm.id}>
                    <td>
                      <span className={`communication-badge ${comm.type}`}>
                        <i className={`fas ${
                          comm.type === 'urgent' ? 'fa-exclamation-circle' :
                          comm.type === 'info' ? 'fa-info-circle' : 'fa-calendar'
                        }`}></i>
                        {comm.type.charAt(0).toUpperCase() + comm.type.slice(1)}
                      </span>
                    </td>
                    <td>{comm.title}</td>
                    <td>{comm.senderName}</td>
                    <td>{new Date(comm.date).toLocaleDateString('fr-FR')}</td>
                    <td>
                      <button 
                        className="view-details-btn"
                        onClick={() => setSelectedComm(comm)}
                      >
                        <i className="fas fa-eye"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {totalPages > 1 && (
              <div className="pagination">
                <button 
                  className="pagination-btn"
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                >
                  <i className="fas fa-chevron-left"></i>
                </button>
                
                <div className="pagination-dots">
                  {[...Array(totalPages)].map((_, idx) => (
                    <button
                      key={idx}
                      className={`pagination-dot ${currentPage === idx + 1 ? 'active' : ''}`}
                      onClick={() => setCurrentPage(idx + 1)}
                    />
                  ))}
                </div>

                <button 
                  className="pagination-btn"
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                >
                  <i className="fas fa-chevron-right"></i>
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="no-results">
            Aucune communication ne correspond aux filtres sélectionnés.
          </div>
        )}
      </div>

      {selectedComm && (
        <div className="alert-modal active">
          <div className="modal-overlay" onClick={() => setSelectedComm(null)}></div>
          <div className="modal-content">
            <button className="close-modal" onClick={() => setSelectedComm(null)}>
              <i className="fas fa-times"></i>
            </button>
            <div className="modal-header">
              <h3>{selectedComm.title}</h3>
              <span className={`communication-badge ${selectedComm.type}`}>
                <i className={`fas ${
                  selectedComm.type === 'urgent' ? 'fa-exclamation-circle' :
                  selectedComm.type === 'info' ? 'fa-info-circle' : 'fa-calendar'
                }`}></i>
                {selectedComm.type.charAt(0).toUpperCase() + selectedComm.type.slice(1)}
              </span>
            </div>
            <div className="modal-body">
              <div className="communication-details">
                <div className="detail-item">
                  <i className="fas fa-user"></i>
                  <div>
                    <div className="label">Émetteur</div>
                    <div className="value">{selectedComm.senderName}</div>
                  </div>
                </div>
                <div className="detail-item">
                  <i className="fas fa-building"></i>
                  <div>
                    <div className="label">Département</div>
                    <div className="value">{selectedComm.department}</div>
                  </div>
                </div>
                <div className="detail-item">
                  <i className="fas fa-calendar"></i>
                  <div>
                    <div className="label">Date</div>
                    <div className="value">
                      {new Date(selectedComm.date).toLocaleDateString('fr-FR')} à {selectedComm.time}
                    </div>
                  </div>
                </div>
                <div className="detail-item description">
                  <i className="fas fa-align-left"></i>
                  <div>
                    <div className="label">Description</div>
                    <div className="value">{selectedComm.description}</div>
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

export default Communications;