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

// Données mockées pour les livres
const booksData = [
    {
        id: 1,
        title: "Introduction aux Algorithmes",
        author: "Thomas H. Cormen",
        cover: "https://via.placeholder.com/200x300",
        pages: 1312,
        year: 2009,
        domain: "Informatique",
        faculty: "sciences",
        department: "Informatique",
        downloadUrl: "#"
    },
    {
        id: 2,
        title: "Clean Code",
        author: "Robert C. Martin",
        cover: "https://via.placeholder.com/200x300",
        pages: 464,
        year: 2008,
        domain: "Informatique",
        faculty: "sciences",
        department: "Informatique",
        downloadUrl: "#"
    },
    {
        id: 3,
        title: "Design Patterns",
        author: "Erich Gamma et al.",
        cover: "https://via.placeholder.com/200x300",
        pages: 416,
        year: 1994,
        domain: "Informatique",
        faculty: "sciences",
        department: "Informatique",
        downloadUrl: "#"
    },
    {
        id: 4,
        title: "Calcul Différentiel",
        author: "James Stewart",
        cover: "https://via.placeholder.com/200x300",
        pages: 568,
        year: 2016,
        domain: "Mathématiques",
        faculty: "sciences",
        department: "Mathématiques",
        downloadUrl: "#"
    },
    {
        id: 5,
        title: "Physique Quantique",
        author: "Claude Cohen-Tannoudji",
        cover: "https://via.placeholder.com/200x300",
        pages: 890,
        year: 2018,
        domain: "Physique",
        faculty: "sciences",
        department: "Physique",
        downloadUrl: "#"
    },
    {
        id: 6,
        title: "Droit Civil",
        author: "Jean Carbonnier",
        cover: "https://via.placeholder.com/200x300",
        pages: 752,
        year: 2017,
        domain: "Droit",
        faculty: "droit",
        department: "Droit privé",
        downloadUrl: "#"
    },
    {
        id: 7,
        title: "Histoire de l'Art",
        author: "Ernst Gombrich",
        cover: "https://via.placeholder.com/200x300",
        pages: 688,
        year: 2006,
        domain: "Arts",
        faculty: "lettres",
        department: "Histoire",
        downloadUrl: "#"
    },
    {
        id: 8,
        title: "Anatomie Humaine",
        author: "Frank H. Netter",
        cover: "https://via.placeholder.com/200x300",
        pages: 640,
        year: 2019,
        domain: "Médecine",
        faculty: "medecine",
        department: "Médecine générale",
        downloadUrl: "#"
    },
    {
        id: 9,
        title: "Les Bases de Données",
        author: "C.J. Date",
        cover: "https://via.placeholder.com/200x300",
        pages: 544,
        year: 2012,
        domain: "Informatique",
        faculty: "sciences",
        department: "Informatique",
        downloadUrl: "#"
    },
    {
        id: 10,
        title: "Philosophie Moderne",
        author: "Roger Scruton",
        cover: "https://via.placeholder.com/200x300",
        pages: 420,
        year: 2015,
        domain: "Philosophie",
        faculty: "lettres",
        department: "Philosophie",
        downloadUrl: "#"
    },
    {
        id: 11,
        title: "Chimie Organique",
        author: "Paula Y. Bruice",
        cover: "https://via.placeholder.com/200x300",
        pages: 1344,
        year: 2016,
        domain: "Chimie",
        faculty: "sciences",
        department: "Chimie",
        downloadUrl: "#"
    },
    {
        id: 12,
        title: "Droit International",
        author: "Pierre-Marie Dupuy",
        cover: "https://via.placeholder.com/200x300",
        pages: 921,
        year: 2018,
        domain: "Droit",
        faculty: "droit",
        department: "Droit public",
        downloadUrl: "#"
    },
    {
        id: 13,
        title: "Réseaux Informatiques",
        author: "Andrew S. Tanenbaum",
        cover: "https://via.placeholder.com/200x300",
        pages: 960,
        year: 2011,
        domain: "Informatique",
        faculty: "sciences",
        department: "Informatique",
        downloadUrl: "#"
    },
    {
        id: 14,
        title: "Pharmacologie Clinique",
        author: "Bertram G. Katzung",
        cover: "https://via.placeholder.com/200x300",
        pages: 1216,
        year: 2017,
        domain: "Pharmacie",
        faculty: "medecine",
        department: "Pharmacie",
        downloadUrl: "#"
    },
    {
        id: 15,
        title: "Littérature Française",
        author: "Michel Jarrety",
        cover: "https://via.placeholder.com/200x300",
        pages: 544,
        year: 2014,
        domain: "Littérature",
        faculty: "lettres",
        department: "Littérature",
        downloadUrl: "#"
    },
    {
        id: 16,
        title: "Algèbre Linéaire",
        author: "Gilbert Strang",
        cover: "https://via.placeholder.com/200x300",
        pages: 480,
        year: 2016,
        domain: "Mathématiques",
        faculty: "sciences",
        department: "Mathématiques",
        downloadUrl: "#"
    },
    {
        id: 17,
        title: "Sciences Politiques",
        author: "Philippe Braud",
        cover: "https://via.placeholder.com/200x300",
        pages: 680,
        year: 2019,
        domain: "Politique",
        faculty: "droit",
        department: "Sciences politiques",
        downloadUrl: "#"
    },
    {
        id: 18,
        title: "Biologie Cellulaire",
        author: "Bruce Alberts",
        cover: "https://via.placeholder.com/200x300",
        pages: 1464,
        year: 2017,
        domain: "Biologie",
        faculty: "sciences",
        department: "Biologie",
        downloadUrl: "#"
    },
    {
        id: 19,
        title: "Intelligence Artificielle",
        author: "Stuart Russell",
        cover: "https://via.placeholder.com/200x300",
        pages: 1152,
        year: 2020,
        domain: "Informatique",
        faculty: "sciences",
        department: "Informatique",
        downloadUrl: "#"
    },
    {
        id: 20,
        title: "Dentisterie Clinique",
        author: "Jean-Marie Pomar",
        cover: "https://via.placeholder.com/200x300",
        pages: 784,
        year: 2018,
        domain: "Dentaire",
        faculty: "medecine",
        department: "Dentaire",
        downloadUrl: "#"
    }
];

// Configuration de la pagination
const BOOKS_PER_PAGE = 10;
let currentPage = 1;
let filteredBooks = [...booksData];

// Fonction pour rendre une carte de livre
function renderBookCard(book) {
    return `
        <div class="book-card">
            <div class="book-cover">
                <img src="${book.cover}" alt="${book.title}">
            </div>
            <div class="book-info">
                <h3 class="book-title">${book.title}</h3>
                <p class="book-author">${book.author}</p>
                <div class="book-details">
                    <span class="book-detail">
                        <i class="fas fa-book"></i>
                        ${book.pages} pages
                    </span>
                    <span class="book-detail">
                        <i class="fas fa-calendar"></i>
                        ${book.year}
                    </span>
                </div>
                <span class="book-domain">${book.domain}</span>
            </div>
            <a href="${book.downloadUrl}" class="download-btn">
                <i class="fas fa-download"></i>
                Télécharger
            </a>
        </div>
    `;
}

// Fonction pour mettre à jour la pagination
function updatePagination(totalItems) {
    const totalPages = Math.ceil(totalItems / BOOKS_PER_PAGE);
    const paginationContainer = document.querySelector('.pagination-container');
    
    if (totalPages <= 1) {
        paginationContainer.innerHTML = '';
        return;
    }

    let paginationHTML = `
        <button class="pagination-btn prev" ${currentPage === 1 ? 'disabled' : ''}>
            <i class="fas fa-chevron-left"></i>
        </button>
        <div class="pagination-numbers">
    `;

    for (let i = 1; i <= totalPages; i++) {
        paginationHTML += `
            <button class="pagination-number ${i === currentPage ? 'active' : ''}">${i}</button>
        `;
    }

    paginationHTML += `
        </div>
        <button class="pagination-btn next" ${currentPage === totalPages ? 'disabled' : ''}>
            <i class="fas fa-chevron-right"></i>
        </button>
    `;

    paginationContainer.innerHTML = paginationHTML;

    // Gestionnaires d'événements pour la pagination
    paginationContainer.querySelectorAll('.pagination-number').forEach(btn => {
        btn.addEventListener('click', () => {
            currentPage = parseInt(btn.textContent);
            updateBooks();
        });
    });

    paginationContainer.querySelector('.prev').addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            updateBooks();
        }
    });

    paginationContainer.querySelector('.next').addEventListener('click', () => {
        if (currentPage < totalPages) {
            currentPage++;
            updateBooks();
        }
    });
}

// Fonction pour mettre à jour l'affichage des livres
function updateBooks() {
    const startIndex = (currentPage - 1) * BOOKS_PER_PAGE;
    const endIndex = startIndex + BOOKS_PER_PAGE;
    const booksToShow = filteredBooks.slice(startIndex, endIndex);
    
    const booksGrid = document.getElementById('booksGrid');
    booksGrid.innerHTML = booksToShow.map(renderBookCard).join('');
    
    updatePagination(filteredBooks.length);
}

// Fonction pour initialiser les filtres
function initializeFilters() {
    const facultySelect = document.getElementById('facultySelect');
    const departmentSelect = document.getElementById('departmentSelect');

    // Remplir les options des facultés
    Object.entries(faculties).forEach(([key, faculty]) => {
        const option = document.createElement('option');
        option.value = key;
        option.textContent = faculty.name;
        facultySelect.appendChild(option);
    });

    // Gérer le changement de faculté
    facultySelect.addEventListener('change', function() {
        departmentSelect.innerHTML = '<option value="all">Tous les départements</option>';
        departmentSelect.disabled = this.value === 'all';

        if (this.value !== 'all') {
            faculties[this.value].departments.forEach(dept => {
                const option = document.createElement('option');
                option.value = dept;
                option.textContent = dept;
                departmentSelect.appendChild(option);
            });
        }
    });
}

// Gestionnaire pour la recherche
const searchInput = document.getElementById('searchInput');
searchInput.addEventListener('input', function() {
    const searchTerm = this.value.toLowerCase();
    filteredBooks = booksData.filter(book => 
        book.title.toLowerCase().includes(searchTerm) ||
        book.author.toLowerCase().includes(searchTerm) ||
        book.domain.toLowerCase().includes(searchTerm)
    );
    currentPage = 1;
    updateBooks();
});

// Gestionnaire pour la modal de filtres
const filterBtn = document.getElementById('filterBtn');
const filterModal = document.getElementById('filterModal');
const closeModal = filterModal.querySelector('.close-modal');
const applyFilters = filterModal.querySelector('.apply-filters');
const resetFilters = filterModal.querySelector('.reset-filters');

filterBtn.addEventListener('click', () => {
    filterModal.classList.add('active');
});

closeModal.addEventListener('click', () => {
    filterModal.classList.remove('active');
});

filterModal.querySelector('.modal-overlay').addEventListener('click', () => {
    filterModal.classList.remove('active');
});

applyFilters.addEventListener('click', () => {
    const facultyValue = document.getElementById('facultySelect').value;
    const departmentValue = document.getElementById('departmentSelect').value;

    filteredBooks = booksData.filter(book => {
        const facultyMatch = facultyValue === 'all' || book.faculty === facultyValue;
        const departmentMatch = departmentValue === 'all' || book.department === departmentValue;
        return facultyMatch && departmentMatch;
    });

    currentPage = 1;
    updateBooks();
    filterModal.classList.remove('active');
});

resetFilters.addEventListener('click', () => {
    document.getElementById('facultySelect').value = 'all';
    document.getElementById('departmentSelect').value = 'all';
    document.getElementById('departmentSelect').disabled = true;
    filteredBooks = [...booksData];
    currentPage = 1;
    updateBooks();
});

// Gestion du thème et du menu déroulant
document.addEventListener('DOMContentLoaded', function() {
    // Gestion du thème
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
        // Vérifier le thème sauvegardé
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            document.body.classList.toggle('dark-theme', savedTheme === 'dark');
            const icon = themeToggle.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-moon', savedTheme === 'light');
                icon.classList.toggle('fa-sun', savedTheme === 'dark');
            }
        }

        // Gestionnaire de clic pour le changement de thème
        themeToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-theme');
            const isDark = document.body.classList.contains('dark-theme');
            
            // Mettre à jour l'icône
            const icon = this.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-moon', !isDark);
                icon.classList.toggle('fa-sun', isDark);
            }
            
            // Sauvegarder la préférence
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
        });
    }

    // Gestion du menu déroulant du profil
    const profileTrigger = document.querySelector('.profile-trigger');
    const profileDropdown = document.querySelector('.profile-dropdown');

    if (profileTrigger && profileDropdown) {
        // Ouvrir/fermer le menu au clic sur la photo de profil
        profileTrigger.addEventListener('click', function(e) {
            e.stopPropagation();
            profileDropdown.classList.toggle('active');
        });

        // Fermer le menu au clic en dehors
        document.addEventListener('click', function(e) {
            if (!profileDropdown.contains(e.target) && !profileTrigger.contains(e.target)) {
                profileDropdown.classList.remove('active');
            }
        });

        // Fermer le menu avec la touche Escape
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && profileDropdown.classList.contains('active')) {
                profileDropdown.classList.remove('active');
            }
        });
    }

    // Gestion de l'onglet actif dans la sidebar
    function setActiveNavItem() {
        const currentPath = window.location.pathname;
        const navItems = document.querySelectorAll('.sidebar nav ul li');
        
        navItems.forEach(item => {
            item.classList.remove('active');
            const link = item.querySelector('a');
            if (link) {
                const href = link.getAttribute('href');
                if ((currentPath.endsWith(href)) || 
                    (currentPath === '/' && href === 'index.html') ||
                    (currentPath === '/index.html' && href === 'index.html')) {
                    item.classList.add('active');
                }
            }
        });
    }

    // Appel initial pour définir l'onglet actif
    setActiveNavItem();
});

// Initialisation
document.addEventListener('DOMContentLoaded', () => {
    initializeFilters();
    updateBooks();
}); 