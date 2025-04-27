document.addEventListener('DOMContentLoaded', function() {
    // État initial
    let currentDate = new Date();
    let currentView = 'month';
    let events = [
        {
            id: 1,
            title: 'TP Algorithmique',
            type: 'tp',
            date: '2024-03-15',
            time: '10:00',
            details: 'Salle 101 - Remise du TP sur les arbres binaires',
            professor: 'Dr. Martin'
        },
        {
            id: 2,
            title: 'Cours de Base de données',
            type: 'cours',
            date: '2024-03-15',
            time: '08:30',
            details: 'Introduction aux requêtes SQL',
            professor: 'Prof. Dubois'
        },
        {
            id: 3,
            title: 'Interrogation Réseaux',
            type: 'interro',
            date: '2024-03-20',
            time: '14:00',
            details: 'Chapitre 1 à 4 - Protocoles TCP/IP',
            professor: 'Dr. Bernard'
        },
        {
            id: 4,
            title: 'Exposé Architecture',
            type: 'expose',
            date: '2024-03-25',
            time: '11:00',
            details: 'Présentation sur les microprocesseurs',
            duration: '45 minutes'
        },
        {
            id: 5,
            title: 'Session d\'examens',
            type: 'exam',
            startDate: '2024-06-01',
            endDate: '2024-06-15',
            details: 'Session ordinaire - Premier semestre'
        },
        {
            id: 6,
            title: 'Révision Base de données',
            type: 'revision',
            date: '2024-03-18',
            time: '14:00',
            details: 'Révision des jointures SQL et des index',
            room: 'Bibliothèque',
            duration: '2 heures',
            matiere: 'Base de données',
            objectifs: 'Maîtriser les différents types de jointures et comprendre l\'utilisation des index'
        },
        {
            id: 7,
            title: 'Révision Algorithmique',
            type: 'revision',
            date: '2024-03-22',
            time: '10:00',
            details: 'Préparation à l\'interrogation sur les arbres',
            room: 'Salle d\'étude',
            duration: '1h30',
            matiere: 'Algorithmique',
            objectifs: 'Revoir les différents types d\'arbres et leurs implémentations'
        }
    ];

    // Sélecteurs DOM
    const calendar = document.querySelector('.calendar');
    const currentDateElement = document.querySelector('.current-date');
    const viewButtons = document.querySelectorAll('.view-btn');
    const prevButton = document.querySelector('.nav-btn.prev');
    const nextButton = document.querySelector('.nav-btn.next');
    const addEventBtn = document.querySelector('.add-event-btn');
    const eventFormModal = document.getElementById('eventFormModal');
    const eventForm = document.getElementById('eventForm');
    const eventType = document.getElementById('eventType');
    const normalDateInput = document.getElementById('normalDateInput');
    const examDateInput = document.getElementById('examDateInput');
    const daySearch = document.getElementById('daySearch');
    const monthSearch = document.getElementById('monthSearch');
    const yearSearch = document.getElementById('yearSearch');
    const searchResults = document.querySelector('.search-results');
    const resultsList = document.querySelector('.results-list');
    const clearSearch = document.querySelector('.clear-search');
    const calendarWrapper = document.querySelector('.calendar-wrapper');
    const typeSearch = document.getElementById('typeSearch');

    // Gestionnaires d'événements
    viewButtons.forEach(button => {
        button.addEventListener('click', () => {
            viewButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            currentView = button.dataset.view;
            renderCalendar();
        });
    });

    prevButton.addEventListener('click', () => {
        switch(currentView) {
            case 'day':
                currentDate.setDate(currentDate.getDate() - 1);
                break;
            case 'month':
                currentDate.setMonth(currentDate.getMonth() - 1);
                break;
            case 'year':
                currentDate.setFullYear(currentDate.getFullYear() - 1);
                break;
        }
        renderCalendar();
    });

    nextButton.addEventListener('click', () => {
        switch(currentView) {
            case 'day':
                currentDate.setDate(currentDate.getDate() + 1);
                break;
            case 'month':
                currentDate.setMonth(currentDate.getMonth() + 1);
                break;
            case 'year':
                currentDate.setFullYear(currentDate.getFullYear() + 1);
                break;
        }
        renderCalendar();
    });

    // Fonctions de rendu
    function renderCalendar() {
        switch(currentView) {
            case 'day':
                renderDayView();
                break;
            case 'month':
                renderMonthView();
                break;
            case 'year':
                renderYearView();
                break;
        }
        updateCurrentDateDisplay();
    }

    function renderDayView() {
        calendar.innerHTML = '';
        const dayEvents = events.filter(event => {
            const eventDate = new Date(event.date);
            return eventDate.toDateString() === currentDate.toDateString();
        });

        const dayContainer = document.createElement('div');
        dayContainer.className = 'day-view';
        
        dayEvents.forEach(event => {
            const eventElement = createEventElement(event);
            dayContainer.appendChild(eventElement);
        });

        calendar.appendChild(dayContainer);
    }

    function renderMonthView() {
        calendar.innerHTML = '';
        const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        const lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
        
        let currentDay = new Date(firstDay);
        while (currentDay <= lastDay) {
            const dayElement = document.createElement('div');
            dayElement.className = 'calendar-day';
            dayElement.textContent = currentDay.getDate();

            // Créer une nouvelle date pour éviter les problèmes de référence
            const thisDate = new Date(currentDay);
            
            // Vérifier les événements pour ce jour
            const dayEvents = events.filter(event => {
                if (event.type === 'exam') {
                    const start = new Date(event.startDate);
                    const end = new Date(event.endDate);
                    return thisDate >= start && thisDate <= end;
                }
                
                const eventDate = new Date(event.date);
                return eventDate.getFullYear() === thisDate.getFullYear() &&
                       eventDate.getMonth() === thisDate.getMonth() &&
                       eventDate.getDate() === thisDate.getDate();
            });

            if (dayEvents.length > 0) {
                dayElement.classList.add('has-event');
                dayEvents.forEach(event => {
                    dayElement.classList.add(`event-${event.type}`);
                });
            }

            // Gestionnaire de clic avec la bonne date
            dayElement.addEventListener('click', () => {
                showDayDetails(new Date(thisDate));
            });

            calendar.appendChild(dayElement);
            currentDay.setDate(currentDay.getDate() + 1);
        }
    }

    function renderYearView() {
        calendar.innerHTML = '';
        const months = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 
                       'Juil', 'Août', 'Sep', 'Oct', 'Nov', 'Déc'];
        
        const yearContainer = document.createElement('div');
        yearContainer.className = 'year-view';

        months.forEach((month, index) => {
            const monthElement = document.createElement('div');
            monthElement.className = 'month-card';
            monthElement.textContent = month;

            // Vérifier les événements pour ce mois
            const monthEvents = events.filter(event => {
                const eventDate = new Date(event.date);
                return eventDate.getMonth() === index && 
                       eventDate.getFullYear() === currentDate.getFullYear();
            });

            if (monthEvents.length > 0) {
                monthElement.classList.add('has-events');
            }

            yearContainer.appendChild(monthElement);
        });

        calendar.appendChild(yearContainer);
    }

    function createEventElement(event) {
        const eventElement = document.createElement('div');
        eventElement.className = `event event-${event.type}`;
        eventElement.innerHTML = `
            <span class="event-time">${event.time}</span>
            <span class="event-title">${event.title}</span>
        `;
        return eventElement;
    }

    function updateCurrentDateDisplay() {
        const options = { 
            day: 'numeric', 
            month: 'long', 
            year: 'numeric' 
        };
        
        switch(currentView) {
            case 'day':
                currentDateElement.textContent = currentDate.toLocaleDateString('fr-FR', options);
                break;
            case 'month':
                currentDateElement.textContent = currentDate.toLocaleDateString('fr-FR', { 
                    month: 'long', 
                    year: 'numeric' 
                });
                break;
            case 'year':
                currentDateElement.textContent = currentDate.getFullYear();
                break;
        }
    }

    function showDayDetails(date) {
        const modal = document.getElementById('dayModal');
        const modalDate = modal.querySelector('.modal-date');
        const eventsList = modal.querySelector('.events-list');
        
        // S'assurer que la date est un objet Date
        const selectedDate = date instanceof Date ? date : new Date(date);
        
        const formattedDate = selectedDate.toLocaleDateString('fr-FR', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
        
        modalDate.textContent = formattedDate;
        
        // Filtrer les événements du jour en normalisant les dates
        const dayEvents = events.filter(event => {
            if (event.type === 'exam') {
                const start = new Date(event.startDate);
                const end = new Date(event.endDate);
                return selectedDate >= start && selectedDate <= end;
            }
            
            // Normaliser la date de l'événement pour la comparaison
            const eventDate = new Date(event.date);
            return eventDate.getFullYear() === selectedDate.getFullYear() &&
                   eventDate.getMonth() === selectedDate.getMonth() &&
                   eventDate.getDate() === selectedDate.getDate();
        });

        // Trier les événements par heure
        dayEvents.sort((a, b) => {
            if (!a.time) return 1;
            if (!b.time) return -1;
            return a.time.localeCompare(b.time);
        });
        
        if (dayEvents.length > 0) {
            eventsList.innerHTML = `
                <div class="events-count">
                    ${dayEvents.length} événement${dayEvents.length > 1 ? 's' : ''} prévu${dayEvents.length > 1 ? 's' : ''}
                </div>
                ${dayEvents.map(event => {
                    // Contenu commun pour tous les types d'événements
                    let commonContent = `
                        <div class="event-item" data-type="${event.type}">
                            <div class="event-header">
                                <span class="event-badge ${event.type}">
                                    ${getEventTypeLabel(event.type)}
                                </span>
                                ${event.time ? `
                                    <span class="event-time">
                                        <i class="far fa-clock"></i> ${event.time}
                                    </span>
                                ` : ''}
                            </div>
                            <div class="event-title">${event.title}</div>
                    `;

                    // Contenu spécifique selon le type
                    switch(event.type) {
                        case 'tp':
                            commonContent += `
                                <div class="event-details">
                                    ${event.details ? `
                                        <div class="detail-item">
                                            <i class="fas fa-info-circle"></i> ${event.details}
                                        </div>
                                    ` : ''}
                                    ${event.professor ? `
                                        <div class="detail-item">
                                            <i class="fas fa-user-tie"></i> Professeur: ${event.professor}
                                        </div>
                                    ` : ''}
                                    <div class="detail-item">
                                        <i class="fas fa-map-marker-alt"></i> Salle: ${event.room || 'À définir'}
                                    </div>
                                </div>
                            `;
                            break;

                        case 'interro':
                            commonContent += `
                                <div class="event-details">
                                    ${event.details ? `
                                        <div class="detail-item">
                                            <i class="fas fa-book"></i> ${event.details}
                                        </div>
                                    ` : ''}
                                    ${event.professor ? `
                                        <div class="detail-item">
                                            <i class="fas fa-user-tie"></i> Surveillant: ${event.professor}
                                        </div>
                                    ` : ''}
                                    <div class="detail-item">
                                        <i class="fas fa-hourglass-half"></i> Durée: ${event.duration || '1 heure'}
                                    </div>
                                    <div class="detail-item">
                                        <i class="fas fa-map-marker-alt"></i> Salle: ${event.room || 'À définir'}
                                    </div>
                                </div>
                            `;
                            break;

                        case 'expose':
                            commonContent += `
                                <div class="event-details">
                                    ${event.details ? `
                                        <div class="detail-item">
                                            <i class="fas fa-presentation"></i> ${event.details}
                                        </div>
                                    ` : ''}
                                    ${event.duration ? `
                                        <div class="detail-item">
                                            <i class="fas fa-hourglass-half"></i> Durée: ${event.duration}
                                        </div>
                                    ` : ''}
                                    <div class="detail-item">
                                        <i class="fas fa-map-marker-alt"></i> Salle: ${event.room || 'À définir'}
                                    </div>
                                </div>
                            `;
                            break;

                        case 'cours':
                            commonContent += `
                                <div class="event-details">
                                    ${event.details ? `
                                        <div class="detail-item">
                                            <i class="fas fa-book-open"></i> ${event.details}
                                        </div>
                                    ` : ''}
                                    ${event.professor ? `
                                        <div class="detail-item">
                                            <i class="fas fa-user-tie"></i> Professeur: ${event.professor}
                                        </div>
                                    ` : ''}
                                    <div class="detail-item">
                                        <i class="fas fa-map-marker-alt"></i> Salle: ${event.room || 'À définir'}
                                    </div>
                                </div>
                            `;
                            break;

                        case 'exam':
                            commonContent += `
                                <div class="event-details">
                                    ${event.details ? `
                                        <div class="detail-item">
                                            <i class="fas fa-info-circle"></i> ${event.details}
                                        </div>
                                    ` : ''}
                                    <div class="detail-item exam-period">
                                        <i class="fas fa-calendar-alt"></i> 
                                        Du ${new Date(event.startDate).toLocaleDateString('fr-FR')} 
                                        au ${new Date(event.endDate).toLocaleDateString('fr-FR')}
                                    </div>
                                </div>
                            `;
                            break;

                        case 'revision':
                            commonContent += `
                                <div class="event-details">
                                    <div class="detail-item">
                                        <i class="fas fa-book"></i> 
                                        Matière: ${event.matiere}
                                    </div>
                                    ${event.objectifs ? `
                                        <div class="detail-item">
                                            <i class="fas fa-bullseye"></i>
                                            Objectifs: ${event.objectifs}
                                        </div>
                                    ` : ''}
                                    ${event.duration ? `
                                        <div class="detail-item">
                                            <i class="fas fa-hourglass-half"></i>
                                            Durée: ${event.duration}
                                        </div>
                                    ` : ''}
                                    <div class="detail-item">
                                        <i class="fas fa-map-marker-alt"></i>
                                        Lieu: ${event.room || 'Non spécifié'}
                                    </div>
                                </div>
                            `;
                            break;
                    }

                    return commonContent + `
                    </div>
                `;
            }).join('')}
            `;
        } else {
            eventsList.innerHTML = `
                <div class="no-events">
                    <i class="fas fa-calendar-day"></i>
                    <p>Aucun événement prévu pour cette journée</p>
                </div>
            `;
        }
        
        modal.classList.add('active');
    }

    // Ajouter un gestionnaire d'événement pour la touche Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const modal = document.getElementById('dayModal');
            if (modal.classList.contains('active')) {
                modal.classList.remove('active');
            }
        }
    });

    // Fonction helper pour obtenir le label du type d'événement
    function getEventTypeLabel(type) {
        const types = {
            tp: 'Travaux Pratiques',
            interro: 'Interrogation',
            expose: 'Exposé',
            exam: 'Examen',
            cours: 'Séance de cours',
            revision: 'Séance de révision'
        };
        return types[type] || type;
    }

    // Initialisation
    renderCalendar();

    // Fonction de recherche dynamique
    function handleSearch() {
        const day = daySearch.value;
        const month = monthSearch.value;
        const year = yearSearch.value;
        const type = typeSearch.value;

        // Si tous les champs sont vides, afficher le calendrier
        if (!day && !month && !year && !type) {
            searchResults.style.display = 'none';
            calendarWrapper.style.display = 'block';
            return;
        }

        // Filtrer les événements
        let filteredEvents = events.filter(event => {
            // Vérifier d'abord le type si sélectionné
            if (type && event.type !== type) return false;

            if (event.type === 'exam') {
                const start = new Date(event.startDate);
                const end = new Date(event.endDate);
                
                // Si aucune date n'est spécifiée, inclure tous les examens
                if (!day && !month && !year) return true;

                // Créer une date à partir des critères de recherche
                let searchDate;
                if (year && month && day) {
                    searchDate = new Date(year, month - 1, day);
                } else if (year && month) {
                    searchDate = new Date(year, month - 1, 1);
                } else if (year) {
                    searchDate = new Date(year, 0, 1);
                } else if (month) {
                    searchDate = new Date(new Date().getFullYear(), month - 1, day || 1);
                } else if (day) {
                    searchDate = new Date(new Date().getFullYear(), new Date().getMonth(), day);
                }

                return searchDate >= start && searchDate <= end;
            } else {
                const eventDate = new Date(event.date);
                const eventDay = eventDate.getDate();
                const eventMonth = eventDate.getMonth() + 1;
                const eventYear = eventDate.getFullYear();

                const dayMatch = !day || eventDay == parseInt(day);
                const monthMatch = !month || eventMonth == parseInt(month);
                const yearMatch = !year || eventYear == parseInt(year);

                return dayMatch && monthMatch && yearMatch;
            }
        });

        displaySearchResults(filteredEvents);
    }

    // Affichage des résultats
    function displaySearchResults(results) {
        searchResults.style.display = 'block';
        calendarWrapper.style.display = 'none';

        if (results.length === 0) {
            resultsList.innerHTML = `
                <div class="no-results">
                    <i class="fas fa-search"></i>
                    <p>Aucun événement trouvé</p>
                </div>
            `;
            return;
        }

        // Trier les résultats par date
        results.sort((a, b) => {
            const dateA = a.type === 'exam' ? new Date(a.startDate) : new Date(a.date);
            const dateB = b.type === 'exam' ? new Date(b.startDate) : new Date(b.date);
            return dateA - dateB;
        });

        resultsList.innerHTML = results.map(event => `
            <div class="result-item" data-date="${event.type === 'exam' ? event.startDate : event.date}" data-type="${event.type}">
                <div class="result-date">
                    ${event.type === 'exam' 
                        ? `Du ${new Date(event.startDate).toLocaleDateString('fr-FR')}
                           au ${new Date(event.endDate).toLocaleDateString('fr-FR')}`
                        : new Date(event.date).toLocaleDateString('fr-FR')}
                </div>
                <div class="result-details">
                    <div class="result-title">
                        ${event.title}
                        <span class="result-type-badge ${event.type}">
                            ${getEventTypeLabel(event.type)}
                        </span>
                    </div>
                    <div class="result-info">
                        ${event.time ? `<span class="result-time"><i class="far fa-clock"></i> ${event.time}</span>` : ''}
                        ${event.professor ? `<span class="result-professor"><i class="fas fa-user-tie"></i> ${event.professor}</span>` : ''}
                    </div>
                </div>
            </div>
        `).join('');

        // Ajouter les événements de clic
        document.querySelectorAll('.result-item').forEach(item => {
            item.addEventListener('click', () => {
                const date = new Date(item.dataset.date);
                showDayDetails(date);
            });
        });
    }

    // Écouteurs d'événements
    [daySearch, monthSearch, yearSearch].forEach(input => {
        input.addEventListener('input', handleSearch);
    });

    clearSearch.addEventListener('click', () => {
        daySearch.value = '';
        monthSearch.value = '';
        yearSearch.value = '';
        handleSearch();
    });

    function initializeModal() {
        const modal = document.getElementById('dayModal');
        const overlay = modal.querySelector('.modal-overlay');
        const closeBtn = modal.querySelector('.close-modal');

        function closeModal() {
            modal.classList.remove('active');
        }

        // Fermeture par le bouton
        closeBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            closeModal();
        });

        // Fermeture par l'overlay
        overlay.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            closeModal();
        });

        // Fermeture par la touche Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                closeModal();
            }
        });
    }

    // Appeler l'initialisation au chargement de la page
    initializeModal();

    // Ajouter l'écouteur d'événements pour le sélecteur de type
    typeSearch.addEventListener('change', handleSearch);

    // Ajouter un nouveau type d'événement
    const eventTypeSelect = document.getElementById('eventType');
    eventTypeSelect.innerHTML += `<option value="revision">Séance de révision</option>`;

    // Gestionnaire pour le bouton d'ajout
    addEventBtn.addEventListener('click', () => {
        eventFormModal.classList.add('active');
    });

    // Gérer l'affichage des champs de date selon le type
    eventType.addEventListener('change', (e) => {
        if (e.target.value === 'exam') {
            normalDateInput.style.display = 'none';
            examDateInput.style.display = 'flex';
            document.getElementById('examStartDate').required = true;
            document.getElementById('examEndDate').required = true;
            document.getElementById('eventDate').required = false;
        } else {
            normalDateInput.style.display = 'flex';
            examDateInput.style.display = 'none';
            document.getElementById('examStartDate').required = false;
            document.getElementById('examEndDate').required = false;
            document.getElementById('eventDate').required = true;
        }
    });

    // Fermeture du formulaire
    function closeEventForm() {
        eventFormModal.classList.remove('active');
        eventForm.reset();
    }

    eventFormModal.querySelector('.close-modal').addEventListener('click', closeEventForm);
    eventFormModal.querySelector('.cancel-btn').addEventListener('click', closeEventForm);
    eventFormModal.querySelector('.modal-overlay').addEventListener('click', closeEventForm);

    // Générer un ID unique pour les nouveaux événements
    function generateEventId() {
        return 'event_' + Date.now();
    }

    // Sauvegarder les événements dans le localStorage
    function saveEvents() {
        localStorage.setItem('calendarEvents', JSON.stringify(events));
    }

    // Charger les événements du localStorage
    function loadEvents() {
        const savedEvents = localStorage.getItem('calendarEvents');
        if (savedEvents) {
            events = JSON.parse(savedEvents);
            renderCalendar();
        }
    }

    // Soumission du formulaire
    eventForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const newEvent = {
            id: generateEventId(),
            title: document.getElementById('eventTitle').value,
            type: document.getElementById('eventType').value,
            details: document.getElementById('eventDetails').value || '',
            professor: document.getElementById('eventProfessor').value || '',
            room: document.getElementById('eventRoom').value || '',
            duration: document.getElementById('eventDuration').value || ''
        };

        if (newEvent.type === 'exam') {
            newEvent.startDate = document.getElementById('examStartDate').value;
            newEvent.endDate = document.getElementById('examEndDate').value;
        } else {
            newEvent.date = document.getElementById('eventDate').value;
            newEvent.time = document.getElementById('eventTime').value || '';
        }

        // Ajouter des champs spécifiques pour les révisions
        if (newEvent.type === 'revision') {
            newEvent.matiere = document.getElementById('eventTitle').value;
            newEvent.objectifs = document.getElementById('eventDetails').value;
        }

        events.push(newEvent);
        saveEvents();
        renderCalendar();
        closeEventForm();
    });

    // Mettre à jour la fonction getEventTypeLabel
    function getEventTypeLabel(type) {
        const labels = {
            tp: 'TP',
            interro: 'Interrogation',
            expose: 'Exposé',
            exam: 'Examen',
            cours: 'Cours',
            revision: 'Révision'
        };
        return labels[type] || type;
    }

    // Ajouter les styles pour les révisions
    document.head.insertAdjacentHTML('beforeend', `
        <style>
            .event-revision, .result-type-badge.revision {
                background-color: var(--revision-color, #4CAF50);
            }
            .color-dot.revision {
                background-color: var(--revision-color, #4CAF50);
            }
        </style>
    `);

    // Ajouter à la légende
    document.querySelector('.calendar-legend').insertAdjacentHTML('beforeend', `
        <div class="legend-item">
            <span class="color-dot revision"></span>
            <span>Séance de révision</span>
        </div>
    `);

    // Charger les événements au démarrage
    document.addEventListener('DOMContentLoaded', () => {
        loadEvents();
    });

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