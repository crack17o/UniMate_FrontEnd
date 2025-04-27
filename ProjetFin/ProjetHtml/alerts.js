// Données mockées pour les alertes
const alertsData = [
    {
        id: 1,
        type: 'exam',
        date: '2024-03-25',
        time: '14:00',
        title: 'Examen Base de données',
        subject: 'Base de données',
        status: 'pending',
        professor: 'Dr. Martin',
        room: 'Amphi A',
        duration: '2 heures',
        details: 'Examen portant sur SQL, les index et la normalisation',
        requirements: ['Notes de cours autorisées', 'Calculatrice non autorisée']
    },
    {
        id: 2,
        type: 'tp',
        date: '2024-03-18',
        time: '10:00',
        title: 'Remise TP Algorithmique',
        subject: 'Algorithmique',
        status: 'today',
        professor: 'Prof. Dubois',
        room: 'Salle 101',
        details: 'Remise du TP sur les arbres binaires de recherche',
        requirements: ['Code source', 'Rapport PDF', 'Tests unitaires']
    },
    {
        id: 3,
        type: 'revision',
        date: '2024-03-20',
        time: '09:00',
        title: 'Séance révision Réseaux',
        subject: 'Réseaux',
        status: 'pending',
        professor: 'Dr. Bernard',
        room: 'Salle 205',
        duration: '3 heures',
        details: 'Révision des protocoles TCP/IP et architecture réseau',
        topics: ['TCP/IP', 'Modèle OSI', 'Routage']
    },
    {
        id: 4,
        type: 'important',
        date: '2024-04-01',
        title: 'Date limite inscription examens',
        subject: 'Administration',
        status: 'pending',
        details: 'Date limite pour l\'inscription aux examens de la session de juin',
        requirements: ['Formulaire en ligne', 'Validation du learning agreement']
    },
    {
        id: 5,
        type: 'interro',
        date: '2024-03-15',
        time: '11:00',
        title: 'Interrogation Java',
        subject: 'Programmation Java',
        status: 'past',
        professor: 'Prof. Smith',
        room: 'Salle 304',
        duration: '1 heure',
        details: 'Interrogation sur l\'héritage et le polymorphisme',
        topics: ['Héritage', 'Polymorphisme', 'Interfaces']
    },
    {
        id: 6,
        type: 'tp',
        date: '2024-03-28',
        time: '13:30',
        title: 'Remise TP Architecture',
        subject: 'Architecture des ordinateurs',
        status: 'pending',
        professor: 'Dr. White',
        room: 'Salle 102',
        details: 'Remise du projet sur l\'architecture RISC',
        requirements: ['Rapport technique', 'Présentation PowerPoint']
    },
    {
        id: 7,
        type: 'important',
        date: '2024-03-30',
        title: 'Fin des inscriptions aux options',
        subject: 'Administration',
        status: 'pending',
        details: 'Date limite pour le choix des options du second semestre',
        requirements: ['Formulaire signé', 'Validation en ligne']
    }
];

// Configuration de la pagination
const ITEMS_PER_PAGE = 5;
let currentPage = 1;

// Fonction pour paginer les alertes
function paginateAlerts(alerts) {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return alerts.slice(startIndex, endIndex);
}

// Fonction pour créer la pagination
function createPagination(totalItems) {
    const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
    const paginationContainer = document.createElement('div');
    paginationContainer.className = 'pagination-container';
    
    // Conteneur pour les points de pagination
    const dotsContainer = document.createElement('div');
    dotsContainer.className = 'pagination-dots';
    
    for (let i = 1; i <= totalPages; i++) {
        const dot = document.createElement('span');
        dot.className = `pagination-dot ${i === currentPage ? 'active' : ''}`;
        dot.setAttribute('data-page', i);
        dotsContainer.appendChild(dot);
    }
    
    // Boutons précédent/suivant
    const prevButton = document.createElement('button');
    prevButton.className = 'pagination-btn prev';
    prevButton.innerHTML = '<i class="fas fa-chevron-left"></i>';
    prevButton.disabled = currentPage === 1;

    const nextButton = document.createElement('button');
    nextButton.className = 'pagination-btn next';
    nextButton.innerHTML = '<i class="fas fa-chevron-right"></i>';
    nextButton.disabled = currentPage === totalPages;

    paginationContainer.appendChild(prevButton);
    paginationContainer.appendChild(dotsContainer);
    paginationContainer.appendChild(nextButton);

    return paginationContainer;
}

// Fonction pour formater la date
function formatDate(dateStr, timeStr = '') {
    const date = new Date(dateStr);
    const formattedDate = date.toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });
    return timeStr ? `${formattedDate} à ${timeStr}` : formattedDate;
}

// Fonction pour obtenir l'icône selon le type
function getAlertIcon(type) {
    const icons = {
        important: 'exclamation-circle',
        exam: 'file-alt',
        tp: 'laptop-code',
        revision: 'book',
        interro: 'pencil-alt'
    };
    return icons[type] || 'bell';
}

// Fonction pour obtenir le label selon le type
function getAlertTypeLabel(type) {
    const labels = {
        important: 'Important',
        exam: 'Examen',
        tp: 'Remise TP',
        revision: 'Révision',
        interro: 'Interrogation'
    };
    return labels[type] || type;
}

// Fonction pour rendre une ligne du tableau
function renderAlertRow(alert) {
    return `
        <tr data-alert-id="${alert.id}">
            <td>
                <span class="alert-badge ${alert.type}">
                    <i class="fas fa-${getAlertIcon(alert.type)}"></i>
                    ${getAlertTypeLabel(alert.type)}
                </span>
            </td>
            <td>${formatDate(alert.date, alert.time)}</td>
            <td>${alert.title}</td>
            <td>${alert.subject}</td>
            <td>
                <span class="status-badge ${alert.status}">
                    ${alert.status === 'pending' ? 'À venir' : 
                      alert.status === 'today' ? 'Aujourd\'hui' : 'Passé'}
                </span>
            </td>
            <td>
                <button class="view-details" title="Voir les détails">
                    <i class="fas fa-eye"></i>
                </button>
            </td>
        </tr>
    `;
}

// Fonction pour rendre les détails dans la modal
function renderAlertDetails(alert) {
    return `
        <div class="alert-details">
            <div class="detail-item">
                <i class="fas fa-calendar"></i>
                <div>
                    <div class="label">Date</div>
                    <div class="value">${formatDate(alert.date, alert.time)}</div>
                </div>
            </div>
            ${alert.professor ? `
                <div class="detail-item">
                    <i class="fas fa-user-tie"></i>
                    <div>
                        <div class="label">Professeur</div>
                        <div class="value">${alert.professor}</div>
                    </div>
                </div>
            ` : ''}
            ${alert.room ? `
                <div class="detail-item">
                    <i class="fas fa-door-open"></i>
                    <div>
                        <div class="label">Salle</div>
                        <div class="value">${alert.room}</div>
                    </div>
                </div>
            ` : ''}
            ${alert.duration ? `
                <div class="detail-item">
                    <i class="fas fa-clock"></i>
                    <div>
                        <div class="label">Durée</div>
                        <div class="value">${alert.duration}</div>
                    </div>
                </div>
            ` : ''}
            <div class="detail-item">
                <i class="fas fa-info-circle"></i>
                <div>
                    <div class="label">Détails</div>
                    <div class="value">${alert.details}</div>
                </div>
            </div>
            ${alert.requirements ? `
                <div class="detail-item">
                    <i class="fas fa-list-ul"></i>
                    <div>
                        <div class="label">Prérequis</div>
                        <div class="value">
                            <ul>
                                ${alert.requirements.map(req => `<li>${req}</li>`).join('')}
                            </ul>
                        </div>
                    </div>
                </div>
            ` : ''}
            ${alert.topics ? `
                <div class="detail-item">
                    <i class="fas fa-bookmark"></i>
                    <div>
                        <div class="label">Sujets</div>
                        <div class="value">
                            <ul>
                                ${alert.topics.map(topic => `<li>${topic}</li>`).join('')}
                            </ul>
                        </div>
                    </div>
                </div>
            ` : ''}
        </div>
    `;
}

// Initialisation au chargement de la page
document.addEventListener('DOMContentLoaded', function() {
    const tableBody = document.getElementById('alertsTableBody');
    const typeFilter = document.getElementById('typeFilter');
    const statusFilter = document.getElementById('statusFilter');
    const alertModal = document.getElementById('alertModal');

    // Fonction pour filtrer les alertes
    function filterAlerts() {
        const typeValue = typeFilter.value;
        const statusValue = statusFilter.value;
        
        const filteredAlerts = alertsData.filter(alert => {
            const typeMatch = typeValue === 'all' || alert.type === typeValue;
            const statusMatch = statusValue === 'all' || alert.status === statusValue;
            return typeMatch && statusMatch;
        });

        // Paginer les résultats filtrés
        const paginatedAlerts = paginateAlerts(filteredAlerts);
        tableBody.innerHTML = paginatedAlerts.map(renderAlertRow).join('');

        // Mettre à jour la pagination
        const existingPagination = document.querySelector('.pagination-container');
        if (existingPagination) {
            existingPagination.remove();
        }

        const pagination = createPagination(filteredAlerts.length);
        document.querySelector('.alerts-table-container').appendChild(pagination);

        // Gestionnaires d'événements pour la pagination
        pagination.querySelector('.prev').addEventListener('click', () => {
            if (currentPage > 1) {
                currentPage--;
                filterAlerts();
            }
        });

        pagination.querySelector('.next').addEventListener('click', () => {
            const totalPages = Math.ceil(filteredAlerts.length / ITEMS_PER_PAGE);
            if (currentPage < totalPages) {
                currentPage++;
                filterAlerts();
            }
        });

        pagination.querySelector('.pagination-dots').addEventListener('click', (e) => {
            if (e.target.classList.contains('pagination-dot')) {
                currentPage = parseInt(e.target.dataset.page);
                filterAlerts();
            }
        });
    }

    // Gestionnaires d'événements pour les filtres
    typeFilter.addEventListener('change', filterAlerts);
    statusFilter.addEventListener('change', filterAlerts);

    // Gestionnaire pour l'ouverture de la modal
    tableBody.addEventListener('click', function(e) {
        const row = e.target.closest('tr');
        if (row) {
            const alertId = parseInt(row.dataset.alertId);
            const alert = alertsData.find(a => a.id === alertId);
            if (alert) {
                const modalHeader = alertModal.querySelector('.modal-header h3');
                const modalBadge = alertModal.querySelector('.alert-badge');
                const modalBody = alertModal.querySelector('.modal-body');

                modalHeader.textContent = alert.title;
                modalBadge.className = `alert-badge ${alert.type}`;
                modalBadge.innerHTML = `
                    <i class="fas fa-${getAlertIcon(alert.type)}"></i>
                    ${getAlertTypeLabel(alert.type)}
                `;
                modalBody.innerHTML = renderAlertDetails(alert);

                alertModal.classList.add('active');
            }
        }
    });

    // Fermeture de la modal
    const closeModal = alertModal.querySelector('.close-modal');
    const modalOverlay = alertModal.querySelector('.modal-overlay');

    function closeAlertModal() {
        alertModal.classList.remove('active');
    }

    closeModal.addEventListener('click', closeAlertModal);
    modalOverlay.addEventListener('click', closeAlertModal);
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && alertModal.classList.contains('active')) {
            closeAlertModal();
        }
    });

    // Affichage initial
    filterAlerts();

    // Initialisation du thème
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
        // Vérifier et appliquer le thème sauvegardé
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            document.body.classList.toggle('dark-theme', savedTheme === 'dark');
            const icon = themeToggle.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-moon', savedTheme === 'light');
                icon.classList.toggle('fa-sun', savedTheme === 'dark');
            }
        }

        // Gestionnaire du changement de thème
        themeToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-theme');
            const isDark = document.body.classList.contains('dark-theme');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
            
            const icon = this.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-moon');
                icon.classList.toggle('fa-sun');
            }
        });
    }

    // Initialisation du menu profil
    const profileTrigger = document.querySelector('.profile-trigger');
    if (profileTrigger) {
        // Créer le menu déroulant s'il n'existe pas
        let profileDropdown = document.querySelector('.profile-dropdown');
        if (!profileDropdown) {
            profileDropdown = document.createElement('div');
            profileDropdown.className = 'profile-dropdown';
            profileDropdown.innerHTML = `
                <ul>
                    <li><a href="#"><i class="fas fa-user"></i> Mon profil</a></li>
                    <li><a href="#"><i class="fas fa-cog"></i> Paramètres</a></li>
                    <li><a href="#"><i class="fas fa-sign-out-alt"></i> Déconnexion</a></li>
                </ul>
            `;
            profileTrigger.appendChild(profileDropdown);
        }

        // Gestionnaire pour l'ouverture/fermeture du menu
        profileTrigger.addEventListener('click', function(e) {
            e.stopPropagation();
            profileDropdown.classList.toggle('active');
        });

        // Fermer le menu au clic en dehors
        document.addEventListener('click', function(e) {
            if (!profileTrigger.contains(e.target)) {
                profileDropdown.classList.remove('active');
            }
        });
    }
}); 