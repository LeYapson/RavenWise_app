// Configuration de l'API
export const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL || 'http://localhost:3000/api/v1';

// Clés de stockage (pour compatibilité avec l'ancien système)
export const STORAGE_KEYS = {
  AUTH_TOKEN: '@ravenwise_auth_token',
  USER_DATA: '@ravenwise_user_data',
  COURSES_CACHE: '@ravenwise_courses_cache',
  NOTIFICATIONS_SETTINGS: '@ravenwise_notifications_settings',
};

// Couleurs RavenWise - Charte graphique officielle
export const COLORS = {
  // Couleurs principales RavenWise
  primary: '#6366F1',        // Indigo principal (violet-bleu)
  primaryDark: '#4F46E5',    // Indigo foncé
  primaryLight: '#A5B4FC',   // Indigo clair
  
  // Couleurs secondaires
  secondary: '#10B981',      // Emerald (vert)
  accent: '#F59E0B',         // Amber (orange/jaune)
  
  // Arrière-plans
  background: '#F8FAFC',     // Slate 50 - fond principal
  surface: '#FFFFFF',        // Blanc pour les cartes
  surfaceSecondary: '#F1F5F9', // Slate 100
  
  // Texte
  text: '#0F172A',          // Slate 900 - texte principal
  textSecondary: '#64748B',  // Slate 500 - texte secondaire
  textMuted: '#94A3B8',     // Slate 400 - texte discret
  
  // États
  success: '#10B981',       // Emerald 500
  warning: '#F59E0B',       // Amber 500
  error: '#EF4444',         // Red 500
  info: '#3B82F6',          // Blue 500
  
  // Bordures et séparateurs
  border: '#E2E8F0',        // Slate 200
  borderLight: '#F1F5F9',   // Slate 100
  
  // Éléments interactifs
  white: '#FFFFFF',
  black: '#000000',
  shadow: 'rgba(15, 23, 42, 0.1)', // Slate 900 avec opacité
};

// Routes de navigation - Fonctionnalités essentielles uniquement
export const ROUTES = {
  // Authentification
  LOGIN: 'Login',
  REGISTER: 'Register',
  
  // Fonctionnalités principales
  COURSE_TRACKING: 'CourseTracking',
  QUIZ: 'Quiz',
  QUIZ_DETAIL: 'QuizDetail',
  PROFILE: 'Profile',
  
  // Utilitaires
  LOADING: 'Loading',
};

// Types de notifications
export const NOTIFICATION_TYPES = {
  COURSE_REMINDER: 'course_reminder',
  DAILY_REMINDER: 'daily_reminder',
  QUIZ_AVAILABLE: 'quiz_available',
  DEADLINE_APPROACHING: 'deadline_approaching',
};

// Configuration des notifications
export const NOTIFICATION_CONFIG = {
  DEFAULT_REMINDER_HOUR: 19,
  DEFAULT_REMINDER_MINUTE: 0,
  COURSE_REMINDER_DAYS_BEFORE: 1,
};

// Types de quiz
export const QUIZ_TYPES = {
  MULTIPLE_CHOICE: 'multiple_choice',
  TRUE_FALSE: 'true_false',
  OPEN_ENDED: 'open_ended',
};

// Statuts des cours
export const COURSE_STATUS = {
  NOT_STARTED: 'not_started',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed',
  PAUSED: 'paused',
};
