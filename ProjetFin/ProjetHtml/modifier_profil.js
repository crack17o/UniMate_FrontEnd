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
    // ProjetHtml/modifier_profil.js


    const changePasswordButton = document.querySelector('.form-actions .btn:nth-child(2)'); // Sélectionner le bouton "Changer mot de passe"
    
    if (changePasswordButton) {
        changePasswordButton.addEventListener('click', function() {
            window.location.href = 'changer_mot_de_passe.html'; // Rediriger vers la page de changement de mot de passe
        });
    }
});

