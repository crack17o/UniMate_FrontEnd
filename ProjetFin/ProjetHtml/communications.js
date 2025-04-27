// Données mockées pour les communications
const communicationsData = [
    {
        id: 1,
        type: 'urgent',
        date: '2024-03-15',
        time: '09:30',
        sender: 'faculty',
        senderName: 'Doyen de la Faculté',
        subject: 'Fermeture exceptionnelle de la faculté',
        content: 'En raison de travaux urgents sur le réseau électrique, la faculté sera fermée le lundi 18 mars 2024. Les cours seront dispensés en ligne selon l\'horaire habituel.',
        status: 'unread',
        attachments: ['planning_cours_en_ligne.pdf']
    },
    {
        id: 2,
        type: 'info',
        date: '2024-03-14',
        time: '14:15',
        sender: 'professor',
        senderName: 'Prof. Martin - Algorithmique',
        subject: 'Changement de salle pour le prochain cours',
        content: 'Le cours d\'algorithmique du mercredi 20 mars aura lieu en salle 204 au lieu de la salle habituelle.',
        status: 'read'
    },
    {
        id: 3,
        type: 'warning',
        date: '2024-03-13',
        time: '11:00',
        sender: 'department',
        senderName: 'Département Informatique',
        subject: 'Rappel - Date limite inscription examens',
        content: 'Nous vous rappelons que la date limite pour l\'inscription aux examens est fixée au 1er avril 2024. Passé ce délai, aucune inscription ne sera acceptée.',
        status: 'unread'
    },
    {
        id: 4,
        type: 'reminder',
        date: '2024-03-12',
        time: '16:45',
        sender: 'professor',
        senderName: 'Prof. Dubois - Base de données',
        subject: 'Documents pour le prochain TP',
        content: 'N\'oubliez pas d\'apporter vos ordinateurs portables pour le TP de vendredi. Les fichiers nécessaires ont été déposés sur la plateforme.',
        status: 'read'
    },
    {
        id: 5,
        type: 'info',
        date: '2024-03-11',
        time: '10:30',
        sender: 'administration',
        senderName: 'Service des inscriptions',
        subject: 'Mise à jour des informations personnelles',
        content: 'Veuillez mettre à jour vos coordonnées personnelles sur la plateforme avant le 31 mars.',
        status: 'unread'
    },
    {
        id: 6,
        type: 'reminder',
        date: '2024-03-10',
        time: '08:00',
        sender: 'department',
        senderName: 'Département Informatique',
        subject: 'Rappel - Réunion d\'information stages',
        content: 'La réunion d\'information concernant les stages de fin d\'année aura lieu le jeudi 21 mars à 14h en Amphi A.',
        status: 'unread'
    },
    {
        id: 7,
        type: 'warning',
        date: '2024-03-09',
        time: '16:30',
        sender: 'professor',
        senderName: 'Prof. Bernard - Réseaux',
        subject: 'Modification planning TP',
        content: 'Suite à un problème technique dans la salle de TP, les séances de cette semaine sont reportées à la semaine prochaine.',
        status: 'read'
    },
    {
        id: 8,
        type: 'info',
        date: '2024-03-08',
        time: '11:45',
        sender: 'faculty',
        senderName: 'Service des Sports',
        subject: 'Nouveaux créneaux sport',
        content: 'De nouveaux créneaux de sport sont disponibles pour ce semestre. Consultez le planning joint pour plus d\'informations.',
        status: 'unread',
        attachments: ['planning_sport_2024.pdf']
    },
    {
        id: 9,
        type: 'urgent',
        date: '2024-03-07',
        time: '15:20',
        sender: 'administration',
        senderName: 'Service Scolarité',
        subject: 'Problème technique - Plateforme examens',
        content: 'La plateforme d\'inscription aux examens rencontre actuellement des difficultés techniques. La date limite d\'inscription est prolongée de 48h.',
        status: 'read'
    },
    {
        id: 10,
        type: 'info',
        date: '2024-03-06',
        time: '13:00',
        sender: 'department',
        senderName: 'Bibliothèque Universitaire',
        subject: 'Nouveaux horaires BU',
        content: 'La bibliothèque universitaire étend ses horaires d\'ouverture. '
}
];

// Configuration de la pagination
const ITEMS_PER_PAGE = 5;
let currentPage = 1;

// Fonction pour formater la date et l'heure
function formatDateTime(dateStr, timeStr) {
    const date = new Date(dateStr);
    const formattedDate = date.toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });
    return `${formattedDate} à ${timeStr}`;
}

// Fonction pour obtenir le label de l'émetteur
function getSenderLabel(sender) {
    const labels = {
        faculty: 'Faculté',
        department: 'Département',
        professor: 'Professeur',
        administration: 'Administration'
    };
    return labels[sender] || sender;
}

// Fonction pour obtenir l'icône selon le type
function getTypeIcon(type) {
    const icons = {
        info: 'info-circle',
        warning: 'exclamation-triangle',
        reminder: 'clock',
        urgent: 'exclamation-circle'
    };
    return icons[type] || 'bell';
}

// Fonction pour rendre une ligne du tableau
function renderCommunicationRow(comm) {
    return `
        <tr data-comm-id="${comm.id}" class="${comm.status}">
            <td>
                <span class="status-indicator ${comm.status}" 
                      title="${comm.status === 'unread' ? 'Non lu' : 'Lu'}">
                </span>
            </td>
            <td>
                <span class="communication-badge ${comm.type}">
                    <i class="fas fa-${getTypeIcon(comm.type)}"></i>
                    ${comm.type.charAt(0).toUpperCase() + comm.type.slice(1)}
                </span>
            </td>
            <td>${formatDateTime(comm.date, comm.time)}</td>
            <td>${comm.senderName}</td>
            <td>${comm.subject}</td>
            <td>
                <button class="view-details" title="Voir les détails">
                    <i class="fas fa-eye"></i>
                </button>
            </td>
        </tr>
    `;
}

// Fonction pour rendre le contenu de la modal
function renderCommunicationDetails(comm) {
    return `
        <div class="communication-content">
            <div class="communication-meta">
                <div class="meta-item">
                    <i class="fas fa-user"></i>
                    <span>De: ${comm.senderName}</span>
                </div>
                <div class="meta-item">
                    <i class="fas fa-calendar"></i>
                    <span>Date: ${formatDateTime(comm.date, comm.time)}</span>
                </div>
                ${comm.attachments ? `
                    <div class="meta-item">
                        <i class="fas fa-paperclip"></i>
                        <span>Pièces jointes: ${comm.attachments.join(', ')}</span>
                    </div>
                ` : ''}
            </div>
            <div class="communication-body">
                ${comm.content}
            </div>
        </div>
    `;
}

// Fonction de pagination mise à jour
function updatePagination(totalItems) {
    const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
    
    // Supprimer l'ancienne pagination si elle existe
    const oldPagination = document.querySelector('.pagination-container');
    if (oldPagination) {
        oldPagination.remove();
    }

    if (totalPages <= 1) return; // Ne pas afficher la pagination s'il n'y a qu'une seule page

    const paginationContainer = document.createElement('div');
    paginationContainer.className = 'pagination-container';

    // Bouton précédent
    const prevButton = document.createElement('button');
    prevButton.className = `pagination-btn prev ${currentPage === 1 ? 'disabled' : ''}`;
    prevButton.innerHTML = '<i class="fas fa-chevron-left"></i>';
    prevButton.disabled = currentPage === 1;

    // Points de pagination
    const dotsContainer = document.createElement('div');
    dotsContainer.className = 'pagination-dots';

    for (let i = 1; i <= totalPages; i++) {
        const dot = document.createElement('span');
        dot.className = `pagination-dot ${i === currentPage ? 'active' : ''}`;
        dot.setAttribute('data-page', i);
        dotsContainer.appendChild(dot);
    }

    // Bouton suivant
    const nextButton = document.createElement('button');
    nextButton.className = `pagination-btn next ${currentPage === totalPages ? 'disabled' : ''}`;
    nextButton.innerHTML = '<i class="fas fa-chevron-right"></i>';
    nextButton.disabled = currentPage === totalPages;

    // Ajouter les éléments à la pagination
    paginationContainer.appendChild(prevButton);
    paginationContainer.appendChild(dotsContainer);
    paginationContainer.appendChild(nextButton);

    // Ajouter la pagination au conteneur
    document.querySelector('.communications-table-container').appendChild(paginationContainer);

    // Gestionnaires d'événements
    prevButton.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            filterCommunications();
        }
    });

    nextButton.addEventListener('click', () => {
        if (currentPage < totalPages) {
            currentPage++;
            filterCommunications();
        }
    });

    dotsContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('pagination-dot')) {
            currentPage = parseInt(e.target.dataset.page);
            filterCommunications();
        }
    });
}

// Fonction pour filtrer les communications
function filterCommunications() {
    const senderValue = senderFilter.value;
    const typeValue = typeFilter.value;
    const statusValue = statusFilter.value;
    
    const filteredComms = communicationsData.filter(comm => {
        const senderMatch = senderValue === 'all' || comm.sender === senderValue;
        const typeMatch = typeValue === 'all' || comm.type === typeValue;
        const statusMatch = statusValue === 'all' || comm.status === statusValue;
        return senderMatch && typeMatch && statusMatch;
    });

    // Vérifier si la page courante est valide
    const totalPages = Math.ceil(filteredComms.length / ITEMS_PER_PAGE);
    if (currentPage > totalPages) {
        currentPage = totalPages;
    }

    // Calculer l'index de début et de fin pour la pagination
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const paginatedComms = filteredComms.slice(startIndex, endIndex);
    
    // Mettre à jour le tableau
    const tableBody = document.getElementById('communicationsTableBody');
    tableBody.innerHTML = paginatedComms.map(renderCommunicationRow).join('');

    // Mettre à jour la pagination
    updatePagination(filteredComms.length);
    
    // Mettre à jour l'indicateur de messages non lus
    updateUnreadIndicator();
}

// Fonction mise à jour pour l'indicateur de messages non lus
function updateUnreadIndicator() {
    const unreadCount = communicationsData.filter(comm => comm.status === 'unread').length;
    const sidebarLink = document.querySelector('.sidebar a[href="communications.html"]');
    const unreadDot = sidebarLink.querySelector('.unread-dot');
    const unreadIndicator = sidebarLink.querySelector('.unread-indicator');

    if (unreadCount > 0) {
        // Afficher le point et le compteur
        if (unreadDot) unreadDot.style.display = 'block';
        if (unreadIndicator) {
            unreadIndicator.style.display = 'flex';
            unreadIndicator.textContent = unreadCount;
        }
    } else {
        // Cacher le point et le compteur
        if (unreadDot) unreadDot.style.display = 'none';
        if (unreadIndicator) unreadIndicator.style.display = 'none';
    }
}

// Initialisation au chargement de la page
document.addEventListener('DOMContentLoaded', function() {
    const tableBody = document.getElementById('communicationsTableBody');
    const senderFilter = document.getElementById('senderFilter');
    const typeFilter = document.getElementById('typeFilter');
    const statusFilter = document.getElementById('statusFilter');
    const communicationModal = document.getElementById('communicationModal');

    // Fonction pour filtrer les communications
    function filterCommunications() {
        const senderValue = senderFilter.value;
        const typeValue = typeFilter.value;
        const statusValue = statusFilter.value;
        
        const filteredComms = communicationsData.filter(comm => {
            const senderMatch = senderValue === 'all' || comm.sender === senderValue;
            const typeMatch = typeValue === 'all' || comm.type === typeValue;
            const statusMatch = statusValue === 'all' || comm.status === statusValue;
            return senderMatch && typeMatch && statusMatch;
        });

        // Vérifier si la page courante est valide
        const totalPages = Math.ceil(filteredComms.length / ITEMS_PER_PAGE);
        if (currentPage > totalPages) {
            currentPage = totalPages;
        }

        // Calculer l'index de début et de fin pour la pagination
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        const endIndex = startIndex + ITEMS_PER_PAGE;
        const paginatedComms = filteredComms.slice(startIndex, endIndex);
        
        // Mettre à jour le tableau
        tableBody.innerHTML = paginatedComms.map(renderCommunicationRow).join('');

        // Mettre à jour la pagination
        updatePagination(filteredComms.length);
        
        // Mettre à jour l'indicateur de messages non lus
        updateUnreadIndicator();
    }

    // Gestionnaires d'événements pour les filtres
    senderFilter.addEventListener('change', () => {
        currentPage = 1;
        filterCommunications();
    });
    typeFilter.addEventListener('change', () => {
        currentPage = 1;
        filterCommunications();
    });
    statusFilter.addEventListener('change', () => {
        currentPage = 1;
        filterCommunications();
    });

    // Gestionnaire pour l'ouverture de la modal et marquer comme lu
    tableBody.addEventListener('click', function(e) {
        const row = e.target.closest('tr');
        if (row) {
            const commId = parseInt(row.dataset.commId);
            const comm = communicationsData.find(c => c.id === commId);
            if (comm) {
                if (comm.status === 'unread') {
                    comm.status = 'read';
                    row.classList.remove('unread');
                    row.classList.add('read');
                    row.querySelector('.status-indicator').classList.replace('unread', 'read');
                    
                    // Mettre à jour l'indicateur immédiatement après avoir marqué comme lu
                    updateUnreadIndicator();
                    
                    // Mettre à jour le tableau si nécessaire
                    filterCommunications();
                }

                // Afficher la modal
                const modalHeader = communicationModal.querySelector('.modal-header h3');
                const modalBadge = communicationModal.querySelector('.communication-badge');
                const modalBody = communicationModal.querySelector('.modal-body');

                modalHeader.textContent = comm.subject;
                modalBadge.className = `communication-badge ${comm.type}`;
                modalBadge.innerHTML = `
                    <i class="fas fa-${getTypeIcon(comm.type)}"></i>
                    ${comm.type.charAt(0).toUpperCase() + comm.type.slice(1)}
                `;
                modalBody.innerHTML = renderCommunicationDetails(comm);

                communicationModal.classList.add('active');
            }
        }
    });

    // Fermeture de la modal
    const closeModal = communicationModal.querySelector('.close-modal');
    const modalOverlay = communicationModal.querySelector('.modal-overlay');

    function closeCommunicationModal() {
        communicationModal.classList.remove('active');
    }

    closeModal.addEventListener('click', closeCommunicationModal);
    modalOverlay.addEventListener('click', closeCommunicationModal);
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && communicationModal.classList.contains('active')) {
            closeCommunicationModal();
        }
    });

    // Affichage initial
    filterCommunications();

    // Gestion du thème
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            document.body.classList.toggle('dark-theme', savedTheme === 'dark');
            themeToggle.querySelector('i').classList.toggle('fa-sun', savedTheme === 'dark');
            themeToggle.querySelector('i').classList.toggle('fa-moon', savedTheme === 'light');
        }

        themeToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-theme');
            const isDark = document.body.classList.contains('dark-theme');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
            
            const icon = this.querySelector('i');
            icon.classList.toggle('fa-moon');
            icon.classList.toggle('fa-sun');
        });
    }

    // Gestion du menu profil
    const profileTrigger = document.querySelector('.profile-trigger');
    if (profileTrigger) {
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

        profileTrigger.addEventListener('click', function(e) {
            e.stopPropagation();
            profileDropdown.classList.toggle('active');
        });

        document.addEventListener('click', function(e) {
            if (!profileTrigger.contains(e.target)) {
                profileDropdown.classList.remove('active');
            }
        });
    }
}); 