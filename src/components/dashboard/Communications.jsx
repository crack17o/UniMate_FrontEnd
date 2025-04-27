import React, { useState } from 'react';

const Communications = ({ communications }) => {
  const [selectedType, setSelectedType] = useState('all');

  const filteredCommunications = communications.filter(comm => 
    selectedType === 'all' || comm.type === selectedType
  );

  return (
    <section className="communications card">
      <div className="section-header">
        <i className="fas fa-bullhorn section-icon"></i>
        <h2>Communications</h2>
      </div>

      <div className="comm-filters">
        <button 
          className={`filter-btn ${selectedType === 'all' ? 'active' : ''}`}
          onClick={() => setSelectedType('all')}
        >
          Tous
        </button>
        <button 
          className={`filter-btn ${selectedType === 'faculty' ? 'active' : ''}`}
          onClick={() => setSelectedType('faculty')}
        >
          Faculté
        </button>
        <button 
          className={`filter-btn ${selectedType === 'professor' ? 'active' : ''}`}
          onClick={() => setSelectedType('professor')}
        >
          Professeurs
        </button>
      </div>

      <div className="scrollable-content">
        <div className="comm-list">
          {filteredCommunications.map((comm, index) => (
            <div key={index} className={`comm-item ${comm.type}`}>
              <div className="comm-header">
                <span className="comm-author">
                  <i className={`fas fa-${comm.type === 'faculty' ? 'university' : 'chalkboard-teacher'}`}></i>
                  {comm.author}
                </span>
                <span className="comm-date">{comm.date}</span>
              </div>
              <h3 className="comm-title">{comm.title}</h3>
              <p className="comm-content">{comm.content}</p>
              {comm.attachments && comm.attachments.length > 0 && (
                <div className="comm-attachments">
                  {comm.attachments.map((attachment, idx) => (
                    <a 
                      key={idx}
                      href={attachment.url}
                      className="attachment-link"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fas fa-paperclip"></i>
                      {attachment.name}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Communications;
