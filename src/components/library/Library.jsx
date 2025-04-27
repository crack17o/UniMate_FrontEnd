import React, { useState, useMemo } from 'react';
import '../../styles/library.css';

// Données mockées pour les facultés et départements
const faculties = {
  sciences: {
    name: 'Faculté des Sciences',
    departments: ['Informatique', 'Mathématiques', 'Physique', 'Chimie', 'Biologie']
  },
  lettres: {
    name: 'Faculté des Lettres',
    departments: ['Littérature', 'Histoire', 'Philosophie', 'Langues']
  },
  droit: {
    name: 'Faculté de Droit',
    departments: ['Droit privé', 'Droit public', 'Sciences politiques']
  },
  medecine: {
    name: 'Faculté de Médecine',
    departments: ['Médecine générale', 'Pharmacie', 'Dentaire']
  }
};

// Ajout de plus de livres dans les données mockées
const booksData = [
  {
    id: 1,
    title: "Introduction aux Algorithmes",
    author: "Thomas H. Cormen",
    cover: "https://m.media-amazon.com/images/I/51fGRS2kCvL._SX379_BO1,204,203,200_.jpg",
    pages: 1312,
    year: 2009,
    domain: "Informatique",
    faculty: "sciences",
    department: "Informatique"
  },
  {
    id: 2,
    title: "Physique Quantique",
    author: "Claude Cohen-Tannoudji",
    cover: "https://m.media-amazon.com/images/I/41K3NX89VQL._SX345_BO1,204,203,200_.jpg",
    pages: 880,
    year: 2019,
    domain: "Physique",
    faculty: "sciences",
    department: "Physique"
  },
  {
    id: 3,
    title: "Droit Civil - Les Obligations",
    author: "François Terré",
    cover: "https://m.media-amazon.com/images/I/41X1FZXZA4L._SX346_BO1,204,203,200_.jpg",
    pages: 650,
    year: 2020,
    domain: "Droit",
    faculty: "droit",
    department: "Droit privé"
  },
  {
    id: 4,
    title: "Biologie Moléculaire de la Cellule",
    author: "Bruce Alberts",
    cover: "https://m.media-amazon.com/images/I/51GH89HV9BL._SX379_BO1,204,203,200_.jpg",
    pages: 1464,
    year: 2017,
    domain: "Biologie",
    faculty: "sciences",
    department: "Biologie"
  },
  {
    id: 5,
    title: "Histoire de l'Art",
    author: "Ernst Gombrich",
    cover: "https://m.media-amazon.com/images/I/51N8RX45P1L._SX379_BO1,204,203,200_.jpg",
    pages: 688,
    year: 2021,
    domain: "Arts",
    faculty: "lettres",
    department: "Histoire"
  },
  {
    id: 6,
    title: "Pharmacologie Clinique",
    author: "Marie Lambert",
    cover: "https://m.media-amazon.com/images/I/41K7X95Q31L._SX379_BO1,204,203,200_.jpg",
    pages: 892,
    year: 2022,
    domain: "Médecine",
    faculty: "medecine",
    department: "Pharmacie"
  },
  {
    id: 7,
    title: "Analyse Mathématique",
    author: "Walter Rudin",
    cover: "https://m.media-amazon.com/images/I/41XRGV1QHXL._SX379_BO1,204,203,200_.jpg",
    pages: 420,
    year: 2019,
    domain: "Mathématiques",
    faculty: "sciences",
    department: "Mathématiques"
  },
  {
    id: 8,
    title: "Droit Constitutionnel",
    author: "Louis Favoreu",
    cover: "https://m.media-amazon.com/images/I/51QW7X45P1L._SX379_BO1,204,203,200_.jpg",
    pages: 750,
    year: 2023,
    domain: "Droit",
    faculty: "droit",
    department: "Droit public"
  },
  {
    id: 9,
    title: "Littérature Française du XXe siècle",
    author: "Michel Raimond",
    cover: "https://m.media-amazon.com/images/I/41X7X95Q31L._SX379_BO1,204,203,200_.jpg",
    pages: 528,
    year: 2020,
    domain: "Littérature",
    faculty: "lettres",
    department: "Littérature"
  },
  {
    id: 10,
    title: "Introduction à la Chimie Organique",
    author: "Paula Bruice",
    cover: "https://m.media-amazon.com/images/I/51N8RX45P1L._SX379_BO1,204,203,200_.jpg",
    pages: 840,
    year: 2021,
    domain: "Chimie",
    faculty: "sciences",
    department: "Chimie"
  },
  {
    id: 11,
    title: "Philosophie Politique",
    author: "Will Kymlicka",
    cover: "https://m.media-amazon.com/images/I/41K7X95Q31L._SX379_BO1,204,203,200_.jpg",
    pages: 546,
    year: 2018,
    domain: "Philosophie",
    faculty: "lettres",
    department: "Philosophie"
  },
  {
    id: 12,
    title: "Anatomie et Physiologie",
    author: "Elaine Marieb",
    cover: "https://m.media-amazon.com/images/I/51GH89HV9BL._SX379_BO1,204,203,200_.jpg",
    pages: 1264,
    year: 2022,
    domain: "Médecine",
    faculty: "medecine",
    department: "Médecine générale"
  }
];

function Library() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    faculty: 'all',
    department: 'all'
  });
  const [showFilterModal, setShowFilterModal] = useState(false);
  const ITEMS_PER_PAGE = 8;

  // Fonction de filtrage améliorée
  const filteredBooks = useMemo(() => {
    return booksData.filter(book => {
      const searchMatch = searchTerm.toLowerCase().trim() === '' ? true :
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.domain.toLowerCase().includes(searchTerm.toLowerCase());
      
      const facultyMatch = filters.faculty === 'all' || book.faculty === filters.faculty;
      const departmentMatch = filters.department === 'all' || book.department === filters.department;
      
      return searchMatch && facultyMatch && departmentMatch;
    });
  }, [searchTerm, filters]);

  // Pagination
  const totalPages = Math.ceil(filteredBooks.length / ITEMS_PER_PAGE);
  const paginatedBooks = filteredBooks.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleFilterReset = () => {
    setFilters({
      faculty: 'all',
      department: 'all'
    });
    setShowFilterModal(false);
  };

  const handleFacultyChange = (e) => {
    const faculty = e.target.value;
    setFilters({
      faculty,
      department: 'all'
    });
  };

  // Amélioration de la barre de recherche
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Retour à la première page lors d'une recherche
  };

  return (
    <div className="library-container">
      <div className="library-header">
        <h1>Bibliothèque Numérique</h1>
        <div className="search-filter-container">
          <div className="search-bar">
            <input 
              type="text"
              placeholder="Rechercher par titre, auteur ou domaine..."
              value={searchTerm}
              onChange={handleSearch}
            />
            <i className="fas fa-search"></i>
          </div>
          <button 
            className="filter-btn"
            onClick={() => setShowFilterModal(true)}
          >
            <i className="fas fa-filter"></i>
            Filtrer
          </button>
        </div>
      </div>

      <div className="books-grid">
        {paginatedBooks.map(book => (
          <div key={book.id} className="book-card">
            <div className="book-cover">
              <img src={book.cover} alt={book.title} />
            </div>
            <div className="book-info">
              <h3 className="book-title">{book.title}</h3>
              <p className="book-author">{book.author}</p>
              <div className="book-details">
                <span className="book-detail">
                  <i className="fas fa-book"></i>
                  {book.pages} pages
                </span>
                <span className="book-detail">
                  <i className="fas fa-calendar"></i>
                  {book.year}
                </span>
              </div>
              <span className="book-domain">{book.domain}</span>
            </div>
            <a href={book.downloadUrl} className="download-btn">
              <i className="fas fa-download"></i>
              Télécharger
            </a>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="pagination-container">
        <button 
          className="pagination-btn prev"
          onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
          disabled={currentPage === 1}
        >
          <i className="fas fa-chevron-left"></i>
        </button>
        <div className="pagination-numbers">
          {[...Array(totalPages)].map((_, idx) => (
            <button
              key={idx}
              className={`pagination-number ${currentPage === idx + 1 ? 'active' : ''}`}
              onClick={() => setCurrentPage(idx + 1)}
            >
              {idx + 1}
            </button>
          ))}
        </div>
        <button 
          className="pagination-btn next"
          onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
          disabled={currentPage === totalPages}
        >
          <i className="fas fa-chevron-right"></i>
        </button>
      </div>

      {/* Modal de filtres */}
      {showFilterModal && (
        <div className="filter-modal active">
          <div className="modal-overlay" onClick={(e) => e.stopPropagation()}></div>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Filtrer les résultats</h3>
              <button className="close-modal" onClick={() => setShowFilterModal(false)}>
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="modal-body">
              <div className="filter-section">
                <label>Faculté</label>
                <select 
                  value={filters.faculty}
                  onChange={handleFacultyChange}
                >
                  <option value="all">Toutes les facultés</option>
                  {Object.entries(faculties).map(([key, faculty]) => (
                    <option key={key} value={key}>{faculty.name}</option>
                  ))}
                </select>
              </div>
              <div className="filter-section">
                <label>Département</label>
                <select
                  value={filters.department}
                  onChange={(e) => setFilters({...filters, department: e.target.value})}
                  disabled={filters.faculty === 'all'}
                >
                  <option value="all">Tous les départements</option>
                  {filters.faculty !== 'all' && 
                    faculties[filters.faculty].departments.map(dept => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))
                  }
                </select>
              </div>
              <div className="filter-actions">
                <button className="reset-filters" onClick={handleFilterReset}>
                  Réinitialiser
                </button>
                <button 
                  className="apply-filters"
                  onClick={() => setShowFilterModal(false)}
                >
                  Appliquer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Library;