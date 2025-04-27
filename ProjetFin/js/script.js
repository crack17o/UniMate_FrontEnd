document.addEventListener('DOMContentLoaded', function() {
    // Vérifier si les données sont disponibles
    if (typeof dashboardData === 'undefined') {
        console.error('Les données du dashboard ne sont pas chargées');
        return;
    }

    // Initialisation du thème
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-theme');
            const icon = this.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-moon');
                icon.classList.toggle('fa-sun');
            }
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

        // Générer la légende
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

    // Initialisation des sliders
    initializeSliders();
});

// Fonction pour initialiser les sliders
function initializeSliders() {
    if (!dashboardData) return;

    const sliders = [
        {
            container: '.important-dates',
            items: dashboardData.dates || [],
            renderItem: (item) => `
                <div class="date-item">
                    <div class="date-info">
                        <span class="date">${item.date}</span>
                        <span class="time">${item.time}</span>
                    </div>
                    <p>${item.title}</p>
                </div>`
        },
        {
            container: '.communications',
            items: dashboardData.communications || [],
            renderItem: (item) => `
                <div class="comm-item">
                    <div class="comm-header">
                        <h4>${item.author}</h4>
                        <span class="time">${item.time}</span>
                    </div>
                    <p>${item.message}</p>
                </div>`
        },
        {
            container: '.exam-alerts',
            items: dashboardData.alerts || [],
            renderItem: (item) => `
                <div class="alert-item ${item.type}">
                    <i class="fas fa-${item.type === 'warning' ? 'exclamation-triangle' : 'info-circle'}"></i>
                    <div class="alert-content">
                        <h4>${item.subject}</h4>
                        <p>${item.message}</p>
                    </div>
                </div>`
        }
    ];

    sliders.forEach(slider => {
        if (slider.items.length > 0) {
            const container = document.querySelector(slider.container);
            if (container) {
                initializeSlider(container, slider.items, slider.renderItem);
            }
        }
    });
}

function initializeSlider(container, items, renderItem) {
    let currentIndex = 0;
    const content = container.querySelector('.slider-content');
    const prevBtn = container.querySelector('.prev');
    const nextBtn = container.querySelector('.next');
    const dotsContainer = container.querySelector('.slider-dots');

    if (!content || !prevBtn || !nextBtn || !dotsContainer || !items.length) return;

    function updateContent() {
        content.innerHTML = renderItem(items[currentIndex]);
        updateDots();
    }

    function updateDots() {
        dotsContainer.innerHTML = items.map((_, index) => `
            <span class="dot ${index === currentIndex ? 'active' : ''}" data-index="${index}"></span>
        `).join('');
    }

    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + items.length) % items.length;
        updateContent();
    });

    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % items.length;
        updateContent();
    });

    dotsContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('dot')) {
            currentIndex = parseInt(e.target.dataset.index);
            updateContent();
        }
    });

    // Initialiser le slider
    updateContent();
} 