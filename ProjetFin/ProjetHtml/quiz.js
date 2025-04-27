// Données mockées pour les chapitres et questions
const coursesData = {
    algo: {
        name: "Algorithmique",
        chapters: [
            { id: 1, title: "Introduction aux algorithmes" },
            { id: 2, title: "Structures de contrôle" },
            { id: 3, title: "Tableaux et boucles" },
            { id: 4, title: "Fonctions et procédures" },
            { id: 5, title: "Récursivité" },
            { id: 6, title: "Complexité algorithmique" }
        ]
    },
    ia: {
        name: "Introduction à l'IA",
        chapters: [
            { id: 1, title: "Fondements de l'IA" },
            { id: 2, title: "Apprentissage supervisé" },
            { id: 3, title: "Réseaux de neurones" },
            { id: 4, title: "Deep Learning" }
        ]
    },
    bdd: {
        name: "Administration des BDD",
        chapters: [
            { id: 1, title: "Modèle relationnel" },
            { id: 2, title: "SQL avancé" },
            { id: 3, title: "Optimisation des requêtes" },
            { id: 4, title: "Sécurité des BDD" },
            { id: 5, title: "Maintenance et backup" }
        ]
    },
    reseaux: {
        name: "Réseaux",
        chapters: [
            { id: 1, title: "Modèle OSI" },
            { id: 2, title: "Protocoles TCP/IP" },
            { id: 3, title: "Routage" },
            { id: 4, title: "Sécurité réseau" },
            { id: 5, title: "Configuration des switches" },
            { id: 6, title: "VLANs" },
            { id: 7, title: "Administration réseau" }
        ]
    },
    securite: {
        name: "Sécurité Informatique",
        chapters: [
            { id: 1, title: "Cryptographie" },
            { id: 2, title: "Sécurité Web" },
            { id: 3, title: "Malwares" },
            { id: 4, title: "Tests d'intrusion" },
            { id: 5, title: "Forensics" }
        ]
    }
};

// Questions mockées étendues
const questionsData = {
    // Algorithmique - Introduction aux algorithmes
    'algo-1': [
        {
            question: "Qu'est-ce qu'un algorithme ?",
            options: [
                "Un langage de programmation",
                "Une suite d'instructions pour résoudre un problème",
                "Un type de données",
                "Un logiciel"
            ],
            correct: 1,
            explanation: "Un algorithme est une suite finie et non ambiguë d'instructions permettant de résoudre un problème ou d'obtenir un résultat."
        },
        {
            question: "Quelle est la caractéristique principale d'un bon algorithme ?",
            options: [
                "Il doit être écrit en Python",
                "Il doit être le plus court possible",
                "Il doit être déterministe",
                "Il doit utiliser la récursivité"
            ],
            correct: 2,
            explanation: "Un bon algorithme doit être déterministe, c'est-à-dire qu'il doit toujours produire le même résultat pour les mêmes entrées."
        },
        {
            question: "Quel est le premier élément à considérer lors de la conception d'un algorithme ?",
            options: [
                "Le choix du langage de programmation",
                "La définition claire du problème à résoudre",
                "L'optimisation du code",
                "Le choix des variables"
            ],
            correct: 1,
            explanation: "Avant de commencer à concevoir un algorithme, il est essentiel de bien définir et comprendre le problème à résoudre."
        }
    ],
    // Algorithmique - Structures de contrôle
    'algo-2': [
        {
            question: "Quelle structure de contrôle permet de répéter une action tant qu'une condition est vraie ?",
            options: [
                "if-else",
                "switch-case",
                "while",
                "try-catch"
            ],
            correct: 2,
            explanation: "La structure while permet de répéter un bloc d'instructions tant qu'une condition donnée est vraie."
        },
        {
            question: "À quoi sert la structure if-else ?",
            options: [
                "À répéter du code",
                "À définir des variables",
                "À exécuter du code conditionnellement",
                "À attraper des erreurs"
            ],
            correct: 2,
            explanation: "La structure if-else permet d'exécuter différents blocs de code en fonction d'une condition."
        },
        {
            question: "Quelle est la différence entre while et do-while ?",
            options: [
                "Il n'y en a pas",
                "do-while vérifie la condition après l'exécution",
                "while est plus rapide",
                "do-while ne peut être utilisé qu'une fois"
            ],
            correct: 1,
            explanation: "La boucle do-while exécute le bloc d'instructions au moins une fois avant de vérifier la condition, contrairement à while."
        }
    ],
    // Introduction à l'IA - Fondements
    'ia-1': [
        {
            question: "Qu'est-ce que l'intelligence artificielle ?",
            options: [
                "Un robot humanoïde",
                "Un programme qui simule l'intelligence humaine",
                "Un super ordinateur",
                "Une base de données"
            ],
            correct: 1,
            explanation: "L'IA est un ensemble de techniques permettant aux machines de simuler une forme d'intelligence à travers l'apprentissage et l'adaptation."
        },
        {
            question: "Quel est le test fondamental pour évaluer l'intelligence d'une machine ?",
            options: [
                "Le test de vitesse",
                "Le test de Turing",
                "Le test de mémoire",
                "Le test QI"
            ],
            correct: 1,
            explanation: "Le test de Turing, proposé par Alan Turing, évalue la capacité d'une machine à imiter le comportement humain dans une conversation."
        },
        {
            question: "Quelle est la différence entre l'IA forte et l'IA faible ?",
            options: [
                "La puissance de calcul",
                "Le nombre de données traitées",
                "La capacité à avoir une conscience",
                "La vitesse d'exécution"
            ],
            correct: 2,
            explanation: "L'IA forte fait référence à une machine capable d'avoir une conscience et une compréhension réelle, tandis que l'IA faible simule des comportements spécifiques."
        }
    ],
    // Administration BDD - Modèle relationnel
    'bdd-1': [
        {
            question: "Qu'est-ce qu'une clé primaire ?",
            options: [
                "Une colonne qui peut être null",
                "Un identifiant unique pour chaque ligne",
                "Une contrainte de type check",
                "Une colonne de type texte"
            ],
            correct: 1,
            explanation: "Une clé primaire est un identifiant unique qui permet d'identifier de manière unique chaque enregistrement dans une table."
        },
        {
            question: "Quelle est la différence entre INNER JOIN et LEFT JOIN ?",
            options: [
                "Il n'y en a pas",
                "INNER JOIN retourne uniquement les correspondances, LEFT JOIN garde toutes les lignes de la table de gauche",
                "LEFT JOIN est plus rapide",
                "INNER JOIN permet de joindre plus de deux tables"
            ],
            correct: 1,
            explanation: "LEFT JOIN conserve toutes les lignes de la table de gauche même sans correspondance, alors que INNER JOIN ne garde que les lignes ayant une correspondance dans les deux tables."
        },
        {
            question: "Qu'est-ce que la normalisation ?",
            options: [
                "L'optimisation des requêtes",
                "Le processus d'organisation des données pour réduire la redondance",
                "La sauvegarde des données",
                "La compression des données"
            ],
            correct: 1,
            explanation: "La normalisation est un processus de conception qui organise les tables pour minimiser la redondance et les dépendances, assurant l'intégrité des données."
        }
    ],
    // Réseaux - Modèle OSI
    'reseaux-1': [
        {
            question: "Combien de couches comprend le modèle OSI ?",
            options: [
                "5 couches",
                "6 couches",
                "7 couches",
                "8 couches"
            ],
            correct: 2,
            explanation: "Le modèle OSI comprend 7 couches : Physique, Liaison de données, Réseau, Transport, Session, Présentation et Application."
        },
        {
            question: "Quelle couche est responsable du routage ?",
            options: [
                "Couche Transport",
                "Couche Réseau",
                "Couche Liaison",
                "Couche Session"
            ],
            correct: 1,
            explanation: "La couche Réseau (couche 3) est responsable du routage des paquets à travers le réseau."
        },
        {
            question: "À quelle couche appartient le protocole TCP ?",
            options: [
                "Couche Application",
                "Couche Réseau",
                "Couche Transport",
                "Couche Session"
            ],
            correct: 2,
            explanation: "TCP (Transmission Control Protocol) opère au niveau de la couche Transport (couche 4) du modèle OSI."
        }
    ],
    // Sécurité - Cryptographie
    'securite-1': [
        {
            question: "Quelle est la différence entre le chiffrement symétrique et asymétrique ?",
            options: [
                "Le chiffrement symétrique est plus sécurisé",
                "Le chiffrement asymétrique utilise une seule clé",
                "Le chiffrement symétrique utilise la même clé pour chiffrer et déchiffrer",
                "Il n'y a pas de différence"
            ],
            correct: 2,
            explanation: "Le chiffrement symétrique utilise la même clé pour chiffrer et déchiffrer, tandis que le chiffrement asymétrique utilise une paire de clés (publique et privée)."
        },
        {
            question: "Qu'est-ce qu'une fonction de hachage ?",
            options: [
                "Un algorithme de compression",
                "Une fonction qui transforme des données en une empreinte fixe",
                "Un type de chiffrement",
                "Un protocole de sécurité"
            ],
            correct: 1,
            explanation: "Une fonction de hachage transforme des données de taille variable en une empreinte numérique de taille fixe, utilisée notamment pour vérifier l'intégrité des données."
        },
        {
            question: "Quel est le rôle d'un certificat SSL/TLS ?",
            options: [
                "Compresser les données",
                "Accélérer les connexions",
                "Authentifier un serveur et chiffrer les communications",
                "Bloquer les attaques"
            ],
            correct: 2,
            explanation: "Un certificat SSL/TLS permet d'authentifier l'identité d'un serveur et d'établir une connexion chiffrée sécurisée entre le client et le serveur."
        }
    ],
    // Réseaux - Protocoles TCP/IP
    'reseaux-2': [
        {
            question: "Quelle est la principale différence entre TCP et UDP ?",
            options: [
                "TCP est plus récent qu'UDP",
                "TCP garantit la livraison des paquets, UDP non",
                "UDP est plus sécurisé",
                "TCP ne peut pas être utilisé pour le streaming"
            ],
            correct: 1,
            explanation: "TCP garantit la livraison des paquets, tandis que UDP ne garantit pas la livraison des paquets."
        }
    ],
    // Sécurité Web
    'securite-2': [
        {
            question: "Qu'est-ce qu'une attaque XSS ?",
            options: [
                "Une attaque par force brute",
                "Une injection de code malveillant dans une page web",
                "Un virus informatique",
                "Une attaque sur le serveur DNS"
            ],
            correct: 1,
            explanation: "Le Cross-Site Scripting (XSS) est une attaque qui consiste à injecter du code JavaScript malveillant dans une page web, qui sera exécuté dans le navigateur des visiteurs."
        },
        {
            question: "Comment se protéger contre les attaques SQL Injection ?",
            options: [
                "En utilisant un antivirus",
                "En désactivant SQL",
                "En utilisant des requêtes préparées et en échappant les entrées utilisateur",
                "En bloquant tous les accès à la base de données"
            ],
            correct: 2,
            explanation: "Les requêtes préparées et l'échappement des entrées utilisateur sont les meilleures pratiques pour se protéger contre les injections SQL."
        },
        {
            question: "Qu'est-ce que le CSRF ?",
            options: [
                "Un type de firewall",
                "Une attaque forçant un utilisateur à exécuter des actions indésirables",
                "Un protocole de sécurité",
                "Un système de cryptage"
            ],
            correct: 1,
            explanation: "Le Cross-Site Request Forgery force un utilisateur authentifié à exécuter des actions indésirables sur un site web sans son consentement."
        }
    ],
    // Administration BDD - SQL avancé
    'bdd-2': [
        {
            question: "Qu'est-ce qu'une procédure stockée ?",
            options: [
                "Un type de table",
                "Un ensemble d'instructions SQL précompilées",
                "Un fichier de configuration",
                "Une sauvegarde de la base de données"
            ],
            correct: 1,
            explanation: "Une procédure stockée est un ensemble d'instructions SQL précompilées stockées dans la base de données, qui peuvent être réutilisées."
        },
        {
            question: "Quel est l'avantage principal des transactions ?",
            options: [
                "Elles augmentent la vitesse des requêtes",
                "Elles permettent de sauvegarder les données",
                "Elles assurent l'intégrité des données avec les propriétés ACID",
                "Elles réduisent la taille de la base de données"
            ],
            correct: 2,
            explanation: "Les transactions garantissent les propriétés ACID (Atomicité, Cohérence, Isolation, Durabilité) essentielles pour l'intégrité des données."
        },
        {
            question: "À quoi sert l'indexation dans une base de données ?",
            options: [
                "À trier les données",
                "À accélérer les recherches",
                "À compresser les données",
                "À sécuriser les données"
            ],
            correct: 1,
            explanation: "L'indexation permet d'accélérer les recherches dans une base de données en créant des structures de données optimisées pour la recherche."
        }
    ],
    // Algorithmique - Récursivité
    'algo-5': [
        {
            question: "Qu'est-ce que la récursivité ?",
            options: [
                "Une boucle infinie",
                "Une fonction qui s'appelle elle-même",
                "Un type de variable",
                "Une erreur de programmation"
            ],
            correct: 1,
            explanation: "La récursivité est une technique où une fonction résout un problème en s'appelant elle-même avec des sous-problèmes plus petits."
        },
        {
            question: "Quel est l'élément essentiel d'une fonction récursive ?",
            options: [
                "Une boucle while",
                "Un cas de base (condition d'arrêt)",
                "Un tableau",
                "Une variable globale"
            ],
            correct: 1,
            explanation: "Le cas de base est crucial dans une fonction récursive car il définit quand la récursion doit s'arrêter, évitant ainsi une récursion infinie."
        },
        {
            question: "Quel est l'inconvénient principal de la récursivité ?",
            options: [
                "Elle est toujours plus lente que l'itération",
                "Elle utilise plus de mémoire à cause de la pile d'appels",
                "Elle ne fonctionne pas sur tous les langages",
                "Elle est impossible à déboguer"
            ],
            correct: 1,
            explanation: "La récursivité peut consommer beaucoup de mémoire car chaque appel récursif ajoute un nouveau contexte d'exécution dans la pile d'appels."
        }
    ],
    // IA - Deep Learning
    'ia-4': [
        {
            question: "Qu'est-ce qu'un réseau de neurones profond ?",
            options: [
                "Un ordinateur très puissant",
                "Un réseau avec plusieurs couches cachées",
                "Un algorithme de tri",
                "Une base de données"
            ],
            correct: 1,
            explanation: "Un réseau de neurones profond est un réseau de neurones artificiels avec plusieurs couches cachées entre les couches d'entrée et de sortie."
        },
        {
            question: "Qu'est-ce que la rétropropagation ?",
            options: [
                "Un type de virus",
                "Une méthode pour mettre à jour les poids du réseau",
                "Une fonction d'activation",
                "Un type de données"
            ],
            correct: 1,
            explanation: "La rétropropagation est un algorithme qui calcule le gradient de l'erreur pour chaque neurone, permettant d'ajuster les poids du réseau."
        },
        {
            question: "Quel est le rôle de la fonction d'activation ?",
            options: [
                "Stocker des données",
                "Introduire de la non-linéarité dans le réseau",
                "Accélérer l'apprentissage",
                "Réduire la taille du réseau"
            ],
            correct: 1,
            explanation: "La fonction d'activation introduit de la non-linéarité dans le réseau, permettant d'apprendre des patterns complexes."
        }
    ],
    // Réseaux - Routage
    'reseaux-3': [
        {
            question: "Qu'est-ce qu'une table de routage ?",
            options: [
                "Un meuble pour ranger les routeurs",
                "Une liste des chemins vers les réseaux de destination",
                "Un type de câble réseau",
                "Un protocole de sécurité"
            ],
            correct: 1,
            explanation: "Une table de routage est une table contenant les informations nécessaires pour transmettre les paquets vers leurs réseaux de destination."
        },
        {
            question: "Quelle est la différence entre un routage statique et dynamique ?",
            options: [
                "Le routage statique est plus rapide",
                "Le routage dynamique coûte plus cher",
                "Le routage statique est configuré manuellement, le dynamique s'adapte automatiquement",
                "Il n'y a pas de différence"
            ],
            correct: 2,
            explanation: "Le routage statique nécessite une configuration manuelle des routes, tandis que le routage dynamique utilise des protocoles pour adapter automatiquement les routes en fonction des changements du réseau."
        },
        {
            question: "Qu'est-ce que le protocole OSPF ?",
            options: [
                "Un protocole de messagerie",
                "Un protocole de routage dynamique utilisant l'état des liens",
                "Un type de câble",
                "Un système d'exploitation"
            ],
            correct: 1,
            explanation: "OSPF (Open Shortest Path First) est un protocole de routage dynamique qui calcule les meilleures routes en se basant sur l'état des liens du réseau."
        }
    ],
    // BDD - Optimisation des requêtes
    'bdd-3': [
        {
            question: "Qu'est-ce qu'un plan d'exécution ?",
            options: [
                "Un document de conception",
                "La stratégie utilisée par le SGBD pour exécuter une requête",
                "Un type de backup",
                "Un fichier de configuration"
            ],
            correct: 1,
            explanation: "Le plan d'exécution montre comment le SGBD va exécuter une requête SQL, permettant d'identifier les points d'optimisation potentiels."
        },
        {
            question: "Quel est l'impact des index sur les performances ?",
            options: [
                "Ils ralentissent toujours les requêtes",
                "Ils accélèrent les lectures mais ralentissent les écritures",
                "Ils n'ont aucun impact",
                "Ils accélèrent toutes les opérations"
            ],
            correct: 1,
            explanation: "Les index accélèrent les opérations de lecture en permettant un accès rapide aux données, mais ralentissent les écritures car les index doivent être mis à jour."
        },
        {
            question: "Quelle est la meilleure pratique pour optimiser une requête avec JOIN ?",
            options: [
                "Utiliser toujours INNER JOIN",
                "Éviter les index",
                "Joindre sur des colonnes indexées et minimiser le nombre de lignes avant le JOIN",
                "Utiliser uniquement des vues"
            ],
            correct: 2,
            explanation: "Pour optimiser les JOINs, il est recommandé de joindre sur des colonnes indexées et de réduire le nombre de lignes avant l'opération de JOIN."
        }
    ],
    // IA - Apprentissage supervisé
    'ia-2': [
        {
            question: "Qu'est-ce que l'apprentissage supervisé ?",
            options: [
                "L'apprentissage avec un professeur",
                "L'apprentissage à partir de données étiquetées",
                "L'apprentissage sans données",
                "L'apprentissage en temps réel"
            ],
            correct: 1,
            explanation: "L'apprentissage supervisé est une technique d'apprentissage automatique où le modèle apprend à partir de données étiquetées (entrées associées aux sorties attendues)."
        },
        {
            question: "Quelle est la différence entre classification et régression ?",
            options: [
                "La classification est plus précise",
                "La régression est toujours meilleure",
                "La classification prédit des catégories, la régression des valeurs continues",
                "Il n'y a pas de différence"
            ],
            correct: 2,
            explanation: "La classification prédit des catégories discrètes (ex: spam/non-spam) tandis que la régression prédit des valeurs continues (ex: prix, température)."
        },
        {
            question: "Qu'est-ce que le surapprentissage (overfitting) ?",
            options: [
                "Quand le modèle apprend trop rapidement",
                "Quand le modèle mémorise les données d'entraînement au lieu de généraliser",
                "Quand il y a trop de données",
                "Quand l'apprentissage est trop long"
            ],
            correct: 1,
            explanation: "Le surapprentissage se produit quand un modèle apprend trop spécifiquement les données d'entraînement, perdant sa capacité à généraliser sur de nouvelles données."
        }
    ],
    // Sécurité - Tests d'intrusion
    'securite-4': [
        {
            question: "Qu'est-ce qu'un test d'intrusion ?",
            options: [
                "Un test antivirus",
                "Une simulation d'attaque autorisée pour identifier les vulnérabilités",
                "Un scan de ports",
                "Une mise à jour de sécurité"
            ],
            correct: 1,
            explanation: "Un test d'intrusion est une méthode d'évaluation de la sécurité qui simule une attaque réelle pour identifier et corriger les vulnérabilités."
        },
        {
            question: "Quelle est la première phase d'un test d'intrusion ?",
            options: [
                "L'exploitation",
                "La reconnaissance et la collecte d'informations",
                "Le rapport final",
                "L'installation des outils"
            ],
            correct: 1,
            explanation: "La reconnaissance est la première phase où l'on collecte des informations sur la cible pour identifier les points d'entrée potentiels."
        },
        {
            question: "Qu'est-ce que le 'post-exploitation' ?",
            options: [
                "La rédaction du rapport",
                "L'analyse des actions possibles après avoir gagné l'accès",
                "La correction des vulnérabilités",
                "La facturation du client"
            ],
            correct: 1,
            explanation: "La post-exploitation consiste à évaluer ce qu'un attaquant pourrait faire après avoir compromis un système, comme l'élévation de privilèges ou le mouvement latéral."
        }
    ]
};

// Variables globales
let currentCourse = null;
let currentChapter = null;
let currentQuestions = [];
let currentQuestionIndex = 0;
let score = 0;

// Gestionnaires d'événements au chargement de la page
document.addEventListener('DOMContentLoaded', function() {
    // Gestion des clics sur les cartes de cours
    document.querySelectorAll('.course-card').forEach(card => {
        card.addEventListener('click', () => {
            const courseId = card.dataset.course;
            showChapters(courseId);
        });
    });

    // Gestion des boutons retour
    document.querySelectorAll('.back-btn').forEach(btn => {
        btn.addEventListener('click', handleBackButton);
    });

    // Gestion de la sidebar, du thème et du menu déroulant
    // Gestion de la sidebar active
    const currentPath = window.location.pathname;
    const navItems = document.querySelectorAll('.sidebar nav ul li');
    
    navItems.forEach(item => {
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

    // Gestion du menu déroulant du profil
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

    // Gestion du thème
    const themeToggle = document.querySelector('.theme-toggle');
    const body = document.body;

    // Vérifier s'il y a un thème sauvegardé
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        body.classList.toggle('dark-theme', savedTheme === 'dark');
        if (themeToggle) {
            const icon = themeToggle.querySelector('i');
            icon.classList.toggle('fa-moon', savedTheme === 'light');
            icon.classList.toggle('fa-sun', savedTheme === 'dark');
        }
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            // Basculer le thème
            body.classList.toggle('dark-theme');
            const isDark = body.classList.contains('dark-theme');
            
            // Mettre à jour l'icône
            const icon = themeToggle.querySelector('i');
            icon.classList.toggle('fa-moon', !isDark);
            icon.classList.toggle('fa-sun', isDark);
            
            // Sauvegarder la préférence
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
        });
    }

    // Animation de survol pour les éléments de la sidebar
    const sidebarItems = document.querySelectorAll('.sidebar nav ul li a');
    sidebarItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            if (!item.closest('li').classList.contains('active')) {
                item.style.transform = 'translateX(5px)';
            }
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateX(0)';
        });
    });
});

// Fonction pour afficher les chapitres d'un cours
function showChapters(courseId) {
    currentCourse = courseId;
    const course = coursesData[courseId];
    const chaptersGrid = document.querySelector('.chapters-grid');
    const chaptersSection = document.getElementById('chaptersList');
    
    // Masquer la grille des cours
    document.getElementById('coursesGrid').classList.add('hidden');
    
    // Générer la liste des chapitres
    chaptersGrid.innerHTML = course.chapters.map(chapter => `
        <div class="chapter-item" data-chapter="${courseId}-${chapter.id}">
            <h3>${chapter.title}</h3>
            <i class="fas fa-chevron-right"></i>
        </div>
    `).join('');

    // Afficher la section des chapitres
    chaptersSection.classList.remove('hidden');

    // Ajouter les événements aux chapitres
    document.querySelectorAll('.chapter-item').forEach(item => {
        item.addEventListener('click', () => startQuiz(item.dataset.chapter));
    });
}

// Fonction pour démarrer le quiz
function startQuiz(chapterId) {
    currentChapter = chapterId;
    currentQuestions = questionsData[chapterId] || [];
    currentQuestionIndex = 0;
    score = 0;

    // Masquer la liste des chapitres
    document.getElementById('chaptersList').classList.add('hidden');
    
    // Afficher la section quiz
    const quizSection = document.getElementById('quizSection');
    quizSection.classList.remove('hidden');

    // Mettre à jour le titre et le score
    document.getElementById('quizTitle').textContent = 
        `${coursesData[currentCourse].name} - ${getCurrentChapterTitle()}`;
    updateScore();

    // Afficher la première question
    showQuestion();
}

// Fonction pour afficher une question
function showQuestion() {
    const question = currentQuestions[currentQuestionIndex];
    document.getElementById('questionText').textContent = question.question;
    
    const optionsContainer = document.getElementById('optionsContainer');
    optionsContainer.innerHTML = question.options.map((option, index) => `
        <div class="option" data-index="${index}">
            ${option}
        </div>
    `).join('');

    // Ajouter les événements aux options
    document.querySelectorAll('.option').forEach(option => {
        option.addEventListener('click', () => checkAnswer(parseInt(option.dataset.index)));
    });
}

// Fonction pour vérifier la réponse
function checkAnswer(selectedIndex) {
    const question = currentQuestions[currentQuestionIndex];
    const isCorrect = selectedIndex === question.correct;
    
    if (isCorrect) {
        score++;
        updateScore();
    }

    showFeedback(isCorrect, question.explanation);
}

// Fonction pour afficher le feedback
function showFeedback(isCorrect, explanation) {
    const feedbackContainer = document.getElementById('feedbackContainer');
    const feedbackContent = feedbackContainer.querySelector('.feedback-content');
    
    feedbackContent.innerHTML = `
        <i class="fas fa-${isCorrect ? 'check' : 'times'}-circle"></i>
        <p>${explanation}</p>
        ${currentQuestionIndex < currentQuestions.length - 1 ? 
            '<button class="next-btn">Question suivante</button>' :
            '<button class="next-btn">Terminer le quiz</button>'}
    `;

    feedbackContainer.classList.remove('hidden');

    // Gérer le clic sur "Question suivante"
    feedbackContainer.querySelector('.next-btn').addEventListener('click', () => {
        feedbackContainer.classList.add('hidden');
        if (currentQuestionIndex < currentQuestions.length - 1) {
            currentQuestionIndex++;
            showQuestion();
        } else {
            endQuiz();
        }
    });
}

// Fonctions utilitaires
function updateScore() {
    document.getElementById('currentScore').textContent = score;
    document.getElementById('totalQuestions').textContent = currentQuestions.length;
}

function getCurrentChapterTitle() {
    const chapter = coursesData[currentCourse].chapters.find(
        ch => `${currentCourse}-${ch.id}` === currentChapter
    );
    return chapter ? chapter.title : '';
}

function handleBackButton() {
    if (document.getElementById('quizSection').classList.contains('hidden')) {
        // Retour à la grille des cours
        document.getElementById('chaptersList').classList.add('hidden');
        document.getElementById('coursesGrid').classList.remove('hidden');
    } else {
        // Retour à la liste des chapitres
        document.getElementById('quizSection').classList.add('hidden');
        document.getElementById('chaptersList').classList.remove('hidden');
    }
}

function endQuiz() {
    // Implémenter la logique de fin de quiz ici
    // Par exemple, afficher un récapitulatif du score
    document.getElementById('quizSection').classList.add('hidden');
    document.getElementById('coursesGrid').classList.remove('hidden');
} 