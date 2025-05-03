# UniMate

**UniMate** est une application web moderne destinée à améliorer la communication, la gestion des cours et l’organisation académique entre étudiants, professeurs et administration facultaire.

---

## Fonctionnalités principales

- **Confirmation de présence** d’un professeur à une séance de cours
- **Notifications et alertes** automatiques (interrogations, révisions, rappels)
- **Calendrier global** des séances et événements académiques
- **Communications** officielles envoyées par les professeurs ou autorités
- **Bibliothèque intégrée** avec téléchargement de livres
- **Visualisation des horaires** et des dates importantes

---

## Technologies utilisées

### Frontend
- **React.js** : Pour une interface utilisateur rapide, interactive et modulaire.

### Backend
- **Express.js (Node.js)** : Pour créer une API RESTful légère et rapide.

### Services Cloud
- **Firebase** :
  - **Firebase Cloud Messaging (FCM)** : Pour envoyer des notifications en temps réel aux utilisateurs.
  - **Firebase Storage** : Pour le stockage et le téléchargement des documents (ex. : livres PDF).
  - **Firebase Authentication** *(optionnel)* : Pour gérer l’inscription et la connexion des utilisateurs si tu le souhaites.

---

## Architecture de l'application
React.js (Frontend)
|
Express.js (API REST)
|
Firebase (Notifications & Stockage de fichiers)


---

## Installation & lancement

### Prérequis
- Node.js & npm
- Compte Firebase (avec un projet configuré)
- Clé Firebase Admin SDK
