// Ajoutez ces variables globales au début du fichier
let currentCurrency = 'cdf';
const EXCHANGE_RATE = 2500; // 1 USD = 2500 CDF (à ajuster selon le taux actuel)
let balances = {
    cdf: 0,
    usd: 0
};

// Données initiales fictives
let transactions = [
    { id: 1, type: 'income', amount: 100, currency: 'usd', date: new Date('2024-03-15'), category: 'Bourse', title: 'Bourse mensuelle' },
    { id: 2, type: 'expense', amount: 25, currency: 'usd', date: new Date('2024-03-16'), category: 'Transport', title: 'Bus mensuel' },
    { id: 3, type: 'expense', amount: 15, currency: 'usd', date: new Date('2024-03-17'), category: 'Nourriture', title: 'Repas cafétéria' },
    { id: 4, type: 'conversion', amount: 20, fromCurrency: 'usd', toCurrency: 'cdf', convertedAmount: 50000, date: new Date('2024-03-18') }
];

let evolutionChart, expensesChart;

// Fonction de gestion du changement de devise
function handleCurrencyChange(e) {
    const newCurrency = e.target.value;
    console.log('Changement de devise:', newCurrency);
    
    currentCurrency = newCurrency;
    updateAllDisplays();
}

// Fonction pour mettre à jour tous les affichages
function updateAllDisplays() {
    // Mise à jour du solde
    updateBalanceDisplay();
    
    // Mise à jour du seuil
    updateThresholdDisplay();
    
    // Mise à jour des graphiques
    updateCharts();
    
    // Mise à jour de l'historique
    updateTransactionsList();
}

// Fonction pour mettre à jour l'affichage du solde
function updateBalanceDisplay() {
    const balanceElement = document.getElementById('currentBalance');
    if (balanceElement) {
        console.log('Mise à jour du solde:', balances[currentCurrency]); // Debug
        balanceElement.textContent = formatCurrency(balances[currentCurrency], currentCurrency);
    }
}

// Fonction pour mettre à jour l'affichage du seuil
function updateThresholdDisplay() {
    const limitInput = document.getElementById('weeklyLimit');
    const savedLimit = localStorage.getItem('weeklyLimit');
    const savedLimitCurrency = localStorage.getItem('weeklyLimitCurrency');
    
    if (limitInput && savedLimit) {
        const limitValue = parseFloat(savedLimit);
        if (savedLimitCurrency !== currentCurrency) {
            // Conversion du seuil dans la nouvelle devise
            const convertedLimit = savedLimitCurrency === 'usd' 
                ? limitValue * EXCHANGE_RATE 
                : limitValue / EXCHANGE_RATE;
            limitInput.value = convertedLimit.toFixed(2);
            
            // Sauvegarder le nouveau seuil dans la nouvelle devise
            localStorage.setItem('weeklyLimit', convertedLimit);
            localStorage.setItem('weeklyLimitCurrency', currentCurrency);
        }
    }
}

// Fonction pour formater les montants selon la devise
function formatCurrency(amount, currency) {
    const formatter = new Intl.NumberFormat('fr-CD', {
        style: 'currency',
        currency: currency.toUpperCase(),
        minimumFractionDigits: 2
    });
    return formatter.format(amount);
}

// Fonction pour convertir un montant entre les devises
function convertAmount(amount, fromCurrency, toCurrency) {
    if (fromCurrency === toCurrency) return amount;
    return fromCurrency === 'usd' ? amount * EXCHANGE_RATE : amount / EXCHANGE_RATE;
}

// Mise à jour de la fonction de traitement des opérations
function handleOperation(e) {
    e.preventDefault();
    const form = e.target;
    const modalType = document.getElementById('operationModal').dataset.type;
    const amount = parseFloat(form.amount.value);
    const title = form.title.value;
    const category = form.category.value;

    console.log('Nouvelle opération:', { type: modalType, amount, currency: currentCurrency });
    console.log('Solde avant:', balances[currentCurrency]);

    // Créer la nouvelle transaction
    const newTransaction = {
        id: Date.now(),
        type: modalType,
        amount: amount,
        currency: currentCurrency,
        date: new Date(),
        category: category,
        title: title
    };

    // Ajouter à l'historique
    transactions.push(newTransaction);

    // Mettre à jour le solde
    if (modalType === 'income') {
        balances[currentCurrency] = (balances[currentCurrency] || 0) + amount;
    } else if (modalType === 'expense') {
        balances[currentCurrency] = (balances[currentCurrency] || 0) - amount;
    }

    console.log('Solde après:', balances[currentCurrency]);

    // Sauvegarder dans le localStorage
    localStorage.setItem('balances', JSON.stringify(balances));
    localStorage.setItem('transactions', JSON.stringify(transactions));

    // Mettre à jour l'interface
    updateBalanceDisplay();
    updateExpensesChart();
    updateEvolutionChart();
    updateTransactionsList();

    // Fermer la modale et réinitialiser le formulaire
    closeModals();
    form.reset();

    showNotification(
        `${modalType === 'income' ? 'Revenu' : 'Dépense'} ajouté avec succès`,
        'success'
    );
}

// Fonction pour ouvrir la modale avec le bon type
function openOperationModal(type) {
    const modal = document.getElementById('operationModal');
    if (!modal) return;

    // Définir le type d'opération dans la modale
    modal.dataset.type = type;
    
    // Mettre à jour le titre et le bouton
    const title = modal.querySelector('#modalTitle');
    const submitBtn = modal.querySelector('.submit-btn');
    
    if (title) {
        title.textContent = type === 'income' ? 'Nouveau revenu' : 'Nouvelle dépense';
    }
    
    if (submitBtn) {
        submitBtn.textContent = type === 'income' ? 'Ajouter le revenu' : 'Ajouter la dépense';
        submitBtn.style.background = type === 'income' ? '#4CAF50' : '#F44336';
    }
    
    modal.classList.add('active');
}

// Mise à jour de la fonction de conversion
function handleConversion(e) {
    e.preventDefault();
    const form = e.target;
    const amount = parseFloat(form.amount.value);
    const fromCurrency = form.fromCurrency.value;
    const toCurrency = form.toCurrency.value;

    if (fromCurrency === toCurrency) {
        showNotification('Les devises doivent être différentes', 'error');
        return;
    }

    if (balances[fromCurrency] < amount) {
        showNotification('Solde insuffisant', 'error');
        return;
    }

    const convertedAmount = convertAmount(amount, fromCurrency, toCurrency);

    // Créer la transaction de conversion
    const conversionTransaction = {
        id: Date.now(),
        type: 'conversion',
        amount: amount,
        fromCurrency: fromCurrency,
        toCurrency: toCurrency,
        convertedAmount: convertedAmount,
        date: new Date()
    };

    // Mettre à jour les soldes
    balances[fromCurrency] -= amount;
    balances[toCurrency] += convertedAmount;

    // Ajouter à l'historique
    transactions.unshift(conversionTransaction);

    // Mettre à jour l'interface
    updateBalanceDisplay();
    updateCharts();
    updateTransactionsList();

    // Fermer la modale et réinitialiser le formulaire
    closeModals();
    form.reset();
}

// Ajouter dans la fonction d'initialisation (DOMContentLoaded)
function initializeNavigation() {
    // Marquer le lien actif dans la navbar
    const currentPage = window.location.pathname;
    const navLinks = document.querySelectorAll('.sidebar nav ul li a');
    
    navLinks.forEach(link => {
        // Enlever la classe active de tous les liens
        link.classList.remove('active');
        
        // Ajouter la classe active au lien correspondant à la page actuelle
        if (link.getAttribute('href') === currentPage || 
            (currentPage.includes('budget') && link.getAttribute('href').includes('budget'))) {
            link.classList.add('active');
        }
    });
}

// Fonction pour mettre à jour les graphiques
function updateCharts() {
    updateExpensesChart();
    updateEvolutionChart();
}

// Initialisation des graphiques
function initializeCharts() {
    console.log('Initialisation des graphiques');
    updateExpensesChart();
    updateEvolutionChart();
}

// Graphique de répartition des dépenses
function updateExpensesChart() {
    const ctx = document.getElementById('expensesChart');
    if (!ctx) {
        console.error('Canvas expensesChart non trouvé');
        return;
    }

    // Calculer les dépenses par catégorie
    const expensesByCategory = transactions
        .filter(t => t.type === 'expense' && t.currency === currentCurrency)
        .reduce((acc, t) => {
            acc[t.category] = (acc[t.category] || 0) + t.amount;
            return acc;
        }, {});

    console.log('Dépenses par catégorie:', expensesByCategory);

    const data = {
        labels: Object.keys(expensesByCategory),
        datasets: [{
            data: Object.values(expensesByCategory),
            backgroundColor: [
                '#FF6384', // Rouge
                '#36A2EB', // Bleu
                '#FFCE56', // Jaune
                '#4BC0C0', // Vert
                '#9966FF'  // Violet
            ]
        }]
    };

    if (expensesChart) {
        expensesChart.destroy();
    }

    expensesChart = new Chart(ctx, {
        type: 'doughnut',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'right',
                    labels: {
                        color: document.body.classList.contains('dark-theme') ? '#ffffff' : '#666666'
                    }
                },
                title: {
                    display: true,
                    text: `Répartition des dépenses (${currentCurrency.toUpperCase()})`,
                    color: document.body.classList.contains('dark-theme') ? '#ffffff' : '#666666'
                }
            }
        }
    });
}
// Graphique d'évolution
function updateEvolutionChart() {
    const ctx = document.getElementById('evolutionChart').getContext('2d');
    
    // Obtenir les 7 derniers jours
    const last7Days = [...Array(7)].map((_, i) => {
        const date = new Date();
        date.setDate(date.getDate() - (6 - i));
        return date;
    });

    // Préparer les données
    const chartData = last7Days.map(date => {
        const dayTransactions = transactions.filter(t => 
            t.date.toDateString() === date.toDateString() &&
            t.currency === currentCurrency
        );

        const dayIncome = dayTransactions
            .filter(t => t.type === 'income')
            .reduce((sum, t) => sum + t.amount, 0);

        const dayExpense = dayTransactions
            .filter(t => t.type === 'expense')
            .reduce((sum, t) => sum + t.amount, 0);

        return {
            date: date.toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric' }),
            income: dayIncome,
            expense: dayExpense,
            balance: dayIncome - dayExpense
        };
    });

    const data = {
        labels: chartData.map(d => d.date),
        datasets: [{
            label: 'Solde',
            data: chartData.map(d => d.balance),
            borderColor: '#1a73e8',
            backgroundColor: 'rgba(26, 115, 232, 0.1)',
            fill: true,
            tension: 0.4
        }, {
            label: 'Revenus',
            data: chartData.map(d => d.income),
            borderColor: '#4CAF50',
            borderDash: [5, 5],
            fill: false,
            tension: 0.4
        }, {
            label: 'Dépenses',
            data: chartData.map(d => d.expense),
            borderColor: '#F44336',
            borderDash: [5, 5],
            fill: false,
            tension: 0.4
        }]
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    padding: 20,
                    color: document.body.classList.contains('dark-theme') ? '#ffffff' : '#666666'
                }
            },
            tooltip: {
                mode: 'index',
                intersect: false,
                callbacks: {
                    label: function(context) {
                        return `${context.dataset.label}: ${formatCurrency(context.raw, currentCurrency)}`;
                    }
                }
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                grid: {
                    color: document.body.classList.contains('dark-theme') 
                        ? 'rgba(255, 255, 255, 0.1)' 
                        : 'rgba(0, 0, 0, 0.1)'
                },
                ticks: {
                    color: document.body.classList.contains('dark-theme') ? '#ffffff' : '#666666',
                    callback: function(value) {
                        return formatCurrency(value, currentCurrency);
                    }
                }
            },
            x: {
                grid: {
                    display: false
                },
                ticks: {
                    color: document.body.classList.contains('dark-theme') ? '#ffffff' : '#666666'
                }
            }
        }
    };

    if (evolutionChart) {
        evolutionChart.destroy();
    }

    evolutionChart = new Chart(ctx, {
        type: 'line',
        data: data,
        options: options
    });
}

// Fonction pour mettre à jour l'historique
function updateTransactionsList() {
    const container = document.getElementById('transactionsList');
    container.innerHTML = '';

    const recentTransactions = transactions
        .sort((a, b) => b.date - a.date)
        .slice(0, 10); // Afficher les 10 dernières transactions

    recentTransactions.forEach(transaction => {
        const item = document.createElement('div');
        item.className = 'transaction-item';

        const date = transaction.date.toLocaleDateString('fr-FR', {
            day: 'numeric',
            month: 'short',
            hour: '2-digit',
            minute: '2-digit'
        });

        if (transaction.type === 'conversion') {
            item.innerHTML = `
                <div class="transaction-info">
                    <span class="transaction-date">${date}</span>
                    <span class="transaction-title">Conversion</span>
                    <span class="transaction-amount">
                        ${formatCurrency(transaction.amount, transaction.fromCurrency)} → 
                        ${formatCurrency(transaction.convertedAmount, transaction.toCurrency)}
                    </span>
                </div>
            `;
        } else {
            const icon = transaction.type === 'income' ? 'plus-circle' : 'minus-circle';
            const colorClass = transaction.type === 'income' ? 'income' : 'expense';
            
            item.innerHTML = `
                <div class="transaction-info ${colorClass}">
                    <span class="transaction-date">${date}</span>
                    <span class="transaction-title">${transaction.title}</span>
                    <span class="transaction-amount">
                        <i class="fas fa-${icon}"></i>
                        ${formatCurrency(transaction.amount, transaction.currency)}
                    </span>
                </div>
            `;
        }

        container.appendChild(item);
    });
}

document.addEventListener('DOMContentLoaded', function() {
    // Debug - vérifier que le script se charge
    console.log('Script chargé');

    // Gestion du solde
    const balanceDisplay = document.getElementById('currentBalance');
    if (balanceDisplay) {
        console.log('Balance display trouvé');
        balanceDisplay.style.color = '#000000'; // Force la couleur en noir
    } else {
        console.log('Balance display non trouvé');
    }

    // Gestion des boutons et modales
    const incomeBtn = document.getElementById('incomeButton');
    const expenseBtn = document.getElementById('expenseButton');
    const convertBtn = document.getElementById('convertButton');
    const operationModal = document.getElementById('operationModal');
    const convertModal = document.getElementById('convertModal');

    // Debug - vérifier que les éléments sont trouvés
    console.log('Boutons trouvés:', {
        income: !!incomeBtn,
        expense: !!expenseBtn,
        convert: !!convertBtn
    });
    console.log('Modales trouvées:', {
        operation: !!operationModal,
        convert: !!convertModal
    });

    // Gestionnaires d'événements pour les boutons
    if (incomeBtn) {
        incomeBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Clic sur revenu');
            if (operationModal) {
                operationModal.style.display = 'block';
                document.body.style.overflow = 'hidden'; // Empêche le défilement
            }
        });
    }

    if (expenseBtn) {
        expenseBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Clic sur dépense');
            if (operationModal) {
                operationModal.style.display = 'block';
                document.body.style.overflow = 'hidden';
            }
        });
    }

    if (convertBtn) {
        convertBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Clic sur conversion');
            if (convertModal) {
                convertModal.style.display = 'block';
                document.body.style.overflow = 'hidden';
            }
        });
    }

    // Gestionnaires pour fermer les modales
    document.querySelectorAll('.modal-overlay, .close-modal, .cancel-btn').forEach(element => {
        element.addEventListener('click', function() {
            console.log('Fermeture modale');
            document.querySelectorAll('.modal').forEach(modal => {
                modal.style.display = 'none';
            });
            document.body.style.overflow = 'auto'; // Réactive le défilement
        });
    });

    // Empêcher la fermeture lors du clic sur le contenu de la modale
    document.querySelectorAll('.modal-content').forEach(content => {
        content.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    });

    // Écouteur pour le changement de devise
    const currencySelect = document.getElementById('currencySelect');
    if (currencySelect) {
        currencySelect.addEventListener('change', handleCurrencyChange);
        
        // Initialiser avec la devise sauvegardée ou par défaut
        const savedCurrency = localStorage.getItem('preferredCurrency') || 'cdf';
        currencySelect.value = savedCurrency;
        currentCurrency = savedCurrency;
        updateAllDisplays();
    }

    initializeNavigation();

    // Initialiser le solde à partir du localStorage ou à 0
    const savedBalances = localStorage.getItem('balances');
    if (savedBalances) {
        balances = JSON.parse(savedBalances);
    }

    // Mettre à jour l'affichage initial
    updateBalanceDisplay();
    updateCharts();
    updateTransactionsList();

    // Sauvegarder les soldes à chaque modification
    function saveBalances() {
        localStorage.setItem('balances', JSON.stringify(balances));
    }

    // Observer les changements de solde
    const originalBalances = {...balances};
    setInterval(() => {
        if (JSON.stringify(balances) !== JSON.stringify(originalBalances)) {
            saveBalances();
            Object.assign(originalBalances, balances);
        }
    }, 1000);
});
