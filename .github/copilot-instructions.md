# Copilot Instructions pour RavenWise Mobile

<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

## Contexte du Projet

RavenWise est une plateforme d'apprentissage en ligne mobile développée avec React Native et Expo. L'application permet aux utilisateurs de suivre des cours, de réaliser des exercices de programmation, de passer des quiz et de suivre leurs progrès.

## Architecture et Technologies

- **Framework** : React Native avec Expo SDK 53
- **Navigation** : React Navigation v6 (Stack & Bottom Tabs)
- **État** : React Context + useState/useReducer
- **API** : Axios pour les appels HTTP vers le backend
- **Stockage** : AsyncStorage pour la persistance locale
- **UI** : Composants natifs + styling custom

## Structure du Projet

```
src/
├── components/        # Composants réutilisables
├── screens/          # Écrans de l'application
├── navigation/       # Configuration de navigation
├── services/         # Services API et utilitaires
├── context/          # Contextes React (Auth, User, etc.)
├── constants/        # Constantes (couleurs, API, etc.)
└── utils/           # Fonctions utilitaires
```

## Conventions de Code

1. **Composants** : PascalCase (ex: `CourseCard.js`)
2. **Fichiers services** : camelCase (ex: `apiService.js`)
3. **Constants** : UPPER_SNAKE_CASE (ex: `API_BASE_URL`)
4. **Styles** : StyleSheet.create() pour chaque composant
5. **Import order** : React/React Native → Librairies → Composants locaux

## Fonctionnalités Principales

1. **Authentification** : Login/Register/Logout
2. **Cours** : Liste, détails, navigation par chapitres
3. **Leçons** : Lectures, exercices de code, quiz interactifs
4. **Profil** : Suivi des progrès, statistiques, paramètres
5. **Hors-ligne** : Synchronisation et cache local

## API Backend

L'app consomme l'API REST du backend RavenWise :
- Base URL : `http://localhost:3000/api/v1`
- Authentification : JWT Bearer tokens
- Endpoints principaux : `/auth`, `/courses`, `/lessons`, `/quizzes`, `/exercices`

## Bonnes Pratiques

- Utiliser les hooks React pour la gestion d'état
- Gérer les erreurs réseau avec try/catch
- Implémenter le loading et les états d'erreur
- Optimiser les performances avec React.memo et useMemo
- Respecter les guidelines d'accessibilité React Native
- Tester sur iOS et Android via Expo Go

## Sécurité

- Stocker les tokens de manière sécurisée
- Valider les entrées utilisateur
- Gérer l'expiration des sessions
- Chiffrer les données sensibles en local
