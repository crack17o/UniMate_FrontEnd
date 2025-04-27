import React from 'react';
import TodayClasses from '../components/dashboard/TodayClasses';
import ImportantDates from '../components/dashboard/ImportantDates';
import Communications from '../components/dashboard/Communications';
import Alerts from '../components/dashboard/Alerts';

const Dashboard = () => {
  // Ces données viendront de Firebase dans la version finale
  const mockData = {
    todayClasses: [
      {
        name: 'Programmation Web',
        startTime: '08:00',
        endTime: '10:00',
        status: 'confirmed'
      },
      {
        name: 'Base de données',
        startTime: '14:00',
        endTime: '16:00',
        status: 'pending'
      },
      {
        name: 'Algorithmes',
        startTime: '16:00',
        endTime: '18:00',
        status: 'cancelled'
      }
    ],
    importantDates: [
      {
        date: '15 Avril',
        time: '10:00',
        title: 'Examen de Programmation Web'
      },
      {
        date: '20 Avril',
        time: '14:00',
        title: 'Remise du projet de Base de données'
      },
      {
        date: '25 Avril',
        time: '09:00',
        title: 'TP noté Algorithmes'
      }
    ],
    communications: [
      {
        type: 'faculty',
        author: 'Faculté des Sciences',
        date: '29 Mars 2025',
        title: 'Fermeture exceptionnelle',
        content: 'La faculté sera fermée le lundi 1er avril pour maintenance.',
        attachments: [
          {
            name: 'Planning détaillé.pdf',
            url: '#'
          }
        ]
      },
      {
        type: 'professor',
        author: 'Dr. Martin - Programmation Web',
        date: '28 Mars 2025',
        title: 'Changement de salle',
        content: 'Le cours de lundi se tiendra en salle B204 au lieu de B103.',
      },
      {
        type: 'faculty',
        author: 'Service des examens',
        date: '27 Mars 2025',
        title: 'Planning des examens',
        content: 'Le planning des examens du second semestre est disponible.',
        attachments: [
          {
            name: 'Planning examens S2.pdf',
            url: '#'
          }
        ]
      }
    ],
    alerts: [
      {
        type: 'deadline',
        priority: 'high',
        title: 'Rendu projet Web',
        description: 'Date limite pour le rendu du projet de programmation web',
        deadline: '2025-04-01',
        course: 'Programmation Web',
        actionable: true
      },
      {
        type: 'exam',
        priority: 'medium',
        title: 'Examen Base de données',
        description: 'Examen sur les requêtes SQL et la normalisation',
        deadline: '2025-04-05',
        course: 'Base de données',
        actionable: false
      },
      {
        type: 'grades',
        priority: 'low',
        title: 'Notes disponibles',
        description: 'Les notes du TP2 d\'algorithmes sont disponibles',
        deadline: '2025-03-29',
        course: 'Algorithmes',
        actionable: true
      }
    ]
  };

  return (
    <div className="dashboard-grid">
      <TodayClasses classes={mockData.todayClasses} />
      <ImportantDates dates={mockData.importantDates} />
      <Communications communications={mockData.communications} />
      <Alerts alerts={mockData.alerts} />
    </div>
  );
};

export default Dashboard;
