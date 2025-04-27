document.addEventListener('DOMContentLoaded', function() {
    // Éléments du DOM
    const chatInput = document.querySelector('.chat-input');
    const sendButton = document.querySelector('.send-btn');
    const messagesList = document.querySelector('.messages-list');
    const newChatBtn = document.querySelector('.new-chat-btn');
    const historyList = document.querySelector('.history-list');

    // État de l'application
    let currentConversationId = generateConversationId();
    let conversations = loadConversations();

    // Gestionnaire d'événements pour l'envoi de messages
    function handleSendMessage() {
        const message = chatInput.value.trim();
        if (message) {
            addMessage('user', message);
            chatInput.value = '';
            adjustTextareaHeight();
            simulateBotResponse(message);
            saveConversation(currentConversationId, message);
        }
    }

    // Ajout d'un message dans l'interface
    function addMessage(type, content) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}`;
        
        const avatar = document.createElement('div');
        avatar.className = `message-avatar ${type}`;
        avatar.innerHTML = type === 'user' ? '<i class="fas fa-user"></i>' : '<i class="fas fa-robot"></i>';

        const messageContent = document.createElement('div');
        messageContent.className = 'message-content';
        messageContent.textContent = content;

        messageDiv.appendChild(avatar);
        messageDiv.appendChild(messageContent);
        messagesList.appendChild(messageDiv);

        // Scroll vers le bas
        messagesList.scrollTop = messagesList.scrollHeight;
    }

    // Simulation de réponse du bot
    function simulateBotResponse(userMessage) {
        // Afficher l'indicateur de frappe
        showTypingIndicator();

        // Simuler un délai de réponse
        setTimeout(() => {
            // Retirer l'indicateur de frappe
            removeTypingIndicator();

            // Générer une réponse basée sur le message de l'utilisateur
            let response = generateBotResponse(userMessage);
            addMessage('bot', response);
            saveConversation(currentConversationId, response, 'bot');
        }, 1500);
    }

    // Afficher l'indicateur de frappe
    function showTypingIndicator() {
        const indicator = document.createElement('div');
        indicator.className = 'typing-indicator';
        indicator.innerHTML = `
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
        `;
        messagesList.appendChild(indicator);
        messagesList.scrollTop = messagesList.scrollHeight;
    }

    // Retirer l'indicateur de frappe
    function removeTypingIndicator() {
        const indicator = document.querySelector('.typing-indicator');
        if (indicator) {
            indicator.remove();
        }
    }

    // Ajuster la hauteur du textarea
    function adjustTextareaHeight() {
        chatInput.style.height = 'auto';
        chatInput.style.height = chatInput.scrollHeight + 'px';
    }

    // Générer une réponse du bot
    function generateBotResponse(userMessage) {
        const responses = [
            "Je comprends ta question sur " + userMessage.toLowerCase() + ". Laisse-moi t'aider avec ça.",
            "Voici ce que je peux te dire à propos de " + userMessage.toLowerCase() + "...",
            "Intéressante question ! Concernant " + userMessage.toLowerCase() + ", voici ce que je sais.",
            "Je vais t'expliquer " + userMessage.toLowerCase() + " de manière simple.",
        ];
        return responses[Math.floor(Math.random() * responses.length)];
    }

    // Gestion de l'historique des conversations
    function generateConversationId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }

    function saveConversation(id, message, type = 'user') {
        let conversations = JSON.parse(localStorage.getItem('conversations') || '[]');
        let conversation = conversations.find(c => c.id === id);
        
        if (!conversation) {
            conversation = {
                id: id,
                title: message.slice(0, 30) + '...',
                messages: []
            };
            conversations.unshift(conversation);
        }
        
        conversation.messages.push({
            type: type,
            content: message,
            timestamp: new Date().toISOString()
        });

        localStorage.setItem('conversations', JSON.stringify(conversations));
        updateHistoryList();
    }

    function loadConversations() {
        return JSON.parse(localStorage.getItem('conversations') || '[]');
    }

    function updateHistoryList() {
        const conversations = loadConversations();
        historyList.innerHTML = '';
        
        conversations.forEach(conv => {
            const historyItem = document.createElement('div');
            historyItem.className = 'history-item';
            if (conv.id === currentConversationId) {
                historyItem.classList.add('active');
            }
            
            historyItem.innerHTML = `
                <i class="fas fa-comment"></i>
                <span>${conv.title}</span>
            `;
            
            historyItem.addEventListener('click', () => loadConversation(conv.id));
            historyList.appendChild(historyItem);
        });
    }

    function loadConversation(id) {
        const conversations = loadConversations();
        const conversation = conversations.find(c => c.id === id);
        
        if (conversation) {
            currentConversationId = id;
            messagesList.innerHTML = '';
            conversation.messages.forEach(msg => {
                addMessage(msg.type, msg.content);
            });
            updateHistoryList();
        }
    }

    // Event Listeners
    chatInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    });

    chatInput.addEventListener('input', adjustTextareaHeight);

    sendButton.addEventListener('click', handleSendMessage);

    newChatBtn.addEventListener('click', () => {
        currentConversationId = generateConversationId();
        messagesList.innerHTML = '';
        updateHistoryList();
    });

    // Initialisation
    updateHistoryList();

    // Gestion du thème
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
        // Vérifier le thème sauvegardé
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            document.body.classList.toggle('dark-theme', savedTheme === 'dark');
            const icon = themeToggle.querySelector('i');
            icon.classList.toggle('fa-moon', savedTheme === 'light');
            icon.classList.toggle('fa-sun', savedTheme === 'dark');
        }

        // Gérer le changement de thème
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-theme');
            const isDark = document.body.classList.contains('dark-theme');
            
            // Mettre à jour l'icône
            const icon = themeToggle.querySelector('i');
            icon.classList.toggle('fa-moon', !isDark);
            icon.classList.toggle('fa-sun', isDark);
            
            // Sauvegarder la préférence
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
        });
    }

    // Gestion du menu profil
    const profileTrigger = document.querySelector('.profile-trigger');
    const profileDropdown = document.querySelector('.profile-dropdown');

    if (profileTrigger && profileDropdown) {
        // Ouvrir/fermer le menu au clic sur le profil
        profileTrigger.addEventListener('click', (e) => {
            e.stopPropagation();
            profileDropdown.classList.toggle('active');
        });

        // Fermer le menu au clic en dehors
        document.addEventListener('click', (e) => {
            if (!profileDropdown.contains(e.target) && !profileTrigger.contains(e.target)) {
                profileDropdown.classList.remove('active');
            }
        });

        // Fermer le menu avec la touche Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                profileDropdown.classList.remove('active');
            }
        });
    }

    // Gestion de la sidebar active
    const currentPath = window.location.pathname;
    const navItems = document.querySelectorAll('.sidebar nav ul li');

    navItems.forEach(item => {
        const link = item.querySelector('a');
        if (link) {
            const href = link.getAttribute('href');
            if (currentPath.endsWith(href)) {
                item.classList.add('active');
            }
        }
    });
}); 