const dashboardData = {
    // Données pour les dates importantes
    dates: [
        {
            date: "15 Mai",
            time: "14:00",
            title: "Remise du projet Java"
        },
        {
            date: "20 Mai",
            time: "10:00",
            title: "Examen Base de données"
        },
        {
            date: "25 Mai",
            time: "09:00",
            title: "Soutenance de stage"
        },
        {
            date: "30 Mai",
            time: "15:30",
            title: "Rendu du rapport final"
        }
    ],

    // Données pour les communications
    communications: [
        {
            author: "Dr. Martin",
            time: "Il y a 2h",
            message: "Report du TP de jeudi au vendredi 14h"
        },
        {
            author: "Administration",
            time: "Il y a 5h",
            message: "Date limite d'inscription aux examens : 30 mai"
        },
        {
            author: "Prof. Durant",
            time: "Hier",
            message: "Documents du cours de POO disponibles sur la plateforme"
        },
        {
            author: "Secrétariat",
            time: "Il y a 2 jours",
            message: "Rappel : Dépôt des dossiers de stage avant le 20 mai"
        }
    ],

    // Données pour les alertes d'examens
    alerts: [
        {
            type: "warning",
            subject: "Algorithmes",
            message: "Interro surprise possible cette semaine"
        },
        {
            type: "info",
            subject: "Base de données",
            message: "Contrôle prévu le 20 mai - Réviser les jointures"
        },
        {
            type: "warning",
            subject: "Java",
            message: "Remise des TPs la semaine prochaine"
        },
        {
            type: "info",
            subject: "Réseaux",
            message: "Session de rattrapage TP le 18 mai"
        }
    ],

    // Données pour le budget
    budget: {
        transport: 25,
        nourriture: 40,
        supportsCours: 20,
        divers: 15
    }
}; 