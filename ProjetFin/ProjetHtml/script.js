document.addEventListener('DOMContentLoaded', function() {
    // Gestion de l'onglet actif dans la navbar
    function setActiveNavItem() {
        const currentPath = window.location.pathname;
        const navItems = document.querySelectorAll('.sidebar nav ul li');
        
        navItems.forEach(item => {
            item.classList.remove('active');
            const link = item.querySelector('a');
            if (link) {
                const href = link.getAttribute('href');
                // Vérifie si le chemin actuel correspond au lien
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

    // Vérifier si les données sont disponibles
    if (typeof dashboardData === 'undefined') {
        console.error('Les données du dashboard ne sont pas chargées');
        return;
    }

    // Initialisation du thème
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

    // Initialisation du profil dropdown
    const profilePic = document.querySelector('.profile-pic');
    const profileDropdown = document.querySelector('.profile-dropdown');
    if (profilePic && profileDropdown) {
        profilePic.addEventListener('click', function(e) {
            e.stopPropagation();
            profileDropdown.classList.toggle('active');
        });

        document.addEventListener('click', function(e) {
            if (!profileDropdown.contains(e.target)) {
                profileDropdown.classList.remove('active');
            }
        });
    }

    // Initialisation des dates importantes
    const datesContainer = document.querySelector('.important-dates .slider-content');
    if (datesContainer && dashboardData.dates) {
        updateSliderContent('.important-dates', dashboardData.dates, (item) => `
            <div class="date-item">
                <div class="date-info">
                    <span class="date">${item.date}</span>
                    <span class="time">${item.time}</span>
                </div>
                <p>${item.title}</p>
            </div>
        `);
    }

    // Initialisation des communications
    const commsContainer = document.querySelector('.communications .slider-content');
    if (commsContainer && dashboardData.communications) {
        updateSliderContent('.communications', dashboardData.communications, (item) => `
            <div class="comm-item">
                <div class="comm-header">
                    <h4>${item.author}</h4>
                    <span class="time">${item.time}</span>
                </div>
                <p>${item.message}</p>
            </div>
        `);
    }

    // Initialisation des alertes
    const alertsContainer = document.querySelector('.exam-alerts .slider-content');
    if (alertsContainer && dashboardData.alerts) {
        updateSliderContent('.exam-alerts', dashboardData.alerts, (item) => `
            <div class="alert-item ${item.type}">
                <i class="fas fa-${item.type === 'warning' ? 'exclamation-triangle' : 'info-circle'}"></i>
                <div class="alert-content">
                    <h4>${item.subject}</h4>
                    <p>${item.message}</p>
                </div>
            </div>
        `);
    }

    // Initialisation du graphique budget
    const budgetCtx = document.getElementById('budgetChart');
    if (budgetCtx && dashboardData.budget) {
        const budgetChart = new Chart(budgetCtx, {
            type: 'doughnut',
            data: {
                labels: ['Transport', 'Nourriture', 'Supports cours', 'Divers'],
                datasets: [{
                    data: [
                        dashboardData.budget.transport,
                        dashboardData.budget.nourriture,
                        dashboardData.budget.supportsCours,
                        dashboardData.budget.divers
                    ],
                    backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                cutout: '70%',
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }
        });

        // Générer la légende du budget
        const legendContainer = document.querySelector('.budget-legend');
        if (legendContainer) {
            const colors = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'];
            const labels = ['Transport', 'Nourriture', 'Supports cours', 'Divers'];
            const values = [
                dashboardData.budget.transport,
                dashboardData.budget.nourriture,
                dashboardData.budget.supportsCours,
                dashboardData.budget.divers
            ];

            legendContainer.innerHTML = labels.map((label, index) => `
                <div class="legend-item">
                    <span class="legend-color" style="background: ${colors[index]}"></span>
                    <span class="legend-label">${label}: ${values[index]}%</span>
                </div>
            `).join('');
        }
    }
});

// Fonction pour mettre à jour le contenu des sliders
function updateSliderContent(containerSelector, items, renderItem) {
    const container = document.querySelector(containerSelector);
    if (!container || !items || items.length === 0) return;

    const content = container.querySelector('.slider-content');
    const dots = container.querySelector('.slider-dots');
    let currentIndex = 0;

    // Créer les points de navigation
    dots.innerHTML = items.map((_, index) => `
        <span class="dot ${index === 0 ? 'active' : ''}" data-index="${index}"></span>
    `).join('');

    // Fonction pour mettre à jour l'affichage
    function updateDisplay() {
        content.innerHTML = renderItem(items[currentIndex]);
        container.querySelectorAll('.dot').forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }

    // Gestionnaires d'événements pour la navigation
    container.querySelector('.prev').addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + items.length) % items.length;
        updateDisplay();
    });

    container.querySelector('.next').addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % items.length;
        updateDisplay();
    });

    // Gestionnaire d'événements pour les points
    dots.addEventListener('click', (e) => {
        if (e.target.classList.contains('dot')) {
            currentIndex = parseInt(e.target.dataset.index);
            updateDisplay();
        }
    });

    // Afficher le premier élément
    updateDisplay();
} 