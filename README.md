# 📱 RavenWise Mobile - Version Simplifiée

Application mobile d'apprentissage développée avec React Native et Expo, centrée sur 3 fonctionnalités essentielles.

## 🎯 Fonctionnalités Principales

### 1. 📚 Suivi des Cours
- Vue d'ensemble des cours avec progression
- Statuts : Non démarré, En cours, Terminé, En pause
- Programmation de rappels personnalisés

### 2. 🔔 Notifications Push
- Rappels automatiques pour les cours
- Gestion intelligente des permissions
- Configuration personnalisable

### 3. 🧠 Quiz et Évaluation
- Interface de quiz interactive
- Questions à choix multiples
- Calcul de score en temps réel
- Feedback immédiat

## 🛠 Technologies Utilisées

- **React Native** avec Expo SDK 53
- **React Navigation** v6 pour la navigation
- **Expo Notifications** pour les notifications push
- **Axios** pour les appels API
- **AsyncStorage** pour le stockage local
- **React Context** pour la gestion d'état

## 📱 Installation et Démarrage

### Prérequis
- Node.js (version 14 ou supérieure)
- npm ou yarn
- Expo CLI
- Expo Go (app mobile pour les tests)

### Installation
```bash
# Cloner le repository
git clone <repository-url>
cd RavenWise_App

# Installer les dépendances
npm install

# Démarrer le serveur de développement
npx expo start
```

### Test sur Mobile
1. Installer l'app Expo Go sur votre téléphone
2. Scanner le QR code affiché dans le terminal
3. L'application se lancera automatiquement

## 🏗 Architecture du Projet

```
src/
├── components/         # Composants réutilisables
│   ├── Button.js
│   ├── CourseCard.js
│   ├── LoadingSpinner.js
│   └── ProgressBar.js
├── constants/         # Constantes (couleurs, API, routes)
│   └── index.js
├── context/          # Contextes React
│   └── AuthContext.js
├── navigation/       # Configuration de navigation
│   └── AppNavigator.js
├── screens/         # Écrans de l'application
│   ├── auth/        # Authentification
│   ├── main/        # Écrans principaux
│   ├── courses/     # Gestion des cours
│   └── lessons/     # Leçons et exercices
├── services/        # Services API
│   └── api.js
└── utils/          # Fonctions utilitaires
```

## 🔧 Configuration

### Variables d'environnement
Créer un fichier `.env` à la racine :
```
API_BASE_URL=http://localhost:3000/api/v1
```

### Backend
L'application nécessite le backend RavenWise en cours d'exécution sur `http://localhost:3000`

## 📋 Écrans Principaux

### Authentification
- **LoginScreen** : Connexion utilisateur
- **RegisterScreen** : Inscription nouveau compte

### Navigation Principale
- **HomeScreen** : Tableau de bord utilisateur
- **CoursesScreen** : Liste des cours disponibles
- **ProfileScreen** : Profil et statistiques

### Cours et Apprentissage
- **CourseDetailScreen** : Détails d'un cours
- **LessonScreen** : Affichage d'une leçon
- **QuizScreen** : Interface de quiz
- **ExerciseScreen** : Éditeur de code intégré

## 🎨 Design System

### Couleurs
- **Primary** : #007AFF (Bleu principal)
- **Secondary** : #34C759 (Vert)
- **Success** : #34C759
- **Warning** : #FF9500
- **Error** : #FF3B30

### Composants
- **Button** : Bouton configurable avec variants
- **CourseCard** : Carte d'affichage de cours
- **LoadingSpinner** : Indicateur de chargement
- **ProgressBar** : Barre de progression

## 🔐 Sécurité

- Stockage sécurisé des tokens JWT
- Validation des entrées utilisateur
- Gestion des sessions expirées
- Chiffrement des données sensibles

## 🧪 Tests

```bash
# Tests unitaires (non implémentés)
npm test

# Tests E2E (non implémentés)
npm run test:e2e
```

## 📦 Build et Déploiement

```bash
# Build pour Android
npx expo build:android

# Build pour iOS
npx expo build:ios

# Build universel
npx expo build
```

## 🔄 Gestion d'État

L'application utilise React Context pour :
- **AuthContext** : Gestion de l'authentification
- État local avec `useState` et `useReducer`
- Persistance avec AsyncStorage

## 🌐 API Integration

### Endpoints Principaux
- `POST /auth/login` : Connexion
- `POST /auth/register` : Inscription
- `GET /courses` : Liste des cours
- `GET /courses/:id` : Détails d'un cours
- `GET /lessons/:id` : Contenu d'une leçon
- `POST /quizzes/:id/submit` : Soumission de quiz
- `POST /exercises/:id/submit` : Soumission d'exercice

## 🤝 Contribution

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/AmazingFeature`)
3. Commit les changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📄 Licence

Ce projet est sous licence MIT - voir le fichier [LICENSE](LICENSE) pour plus de détails.

## 📞 Support

Pour toute question ou support :
- Email : support@ravenwise.com
- Documentation : [docs.ravenwise.com](https://docs.ravenwise.com)

---

Développé avec ❤️ par l'équipe RavenWise
