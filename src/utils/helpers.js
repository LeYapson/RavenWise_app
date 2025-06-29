// Utilitaires généraux pour l'application

// Validation d'email
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Validation de mot de passe
export const validatePassword = (password) => {
  return password.length >= 6;
};

// Formatage du temps
export const formatTime = (seconds) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  } else if (minutes > 0) {
    return `${minutes}m ${remainingSeconds}s`;
  } else {
    return `${remainingSeconds}s`;
  }
};

// Formatage de la durée en minutes
export const formatDuration = (minutes) => {
  if (minutes < 60) {
    return `${minutes} min`;
  } else {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return remainingMinutes > 0 
      ? `${hours}h ${remainingMinutes}m` 
      : `${hours}h`;
  }
};

// Formatage de la date
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

// Formatage de la date relative
export const formatRelativeDate = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now - date);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 1) {
    return 'Hier';
  } else if (diffDays < 7) {
    return `Il y a ${diffDays} jours`;
  } else if (diffDays < 30) {
    const weeks = Math.floor(diffDays / 7);
    return `Il y a ${weeks} semaine${weeks > 1 ? 's' : ''}`;
  } else {
    return formatDate(dateString);
  }
};

// Capitaliser la première lettre
export const capitalize = (string) => {
  if (!string) return '';
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};

// Tronquer le texte
export const truncateText = (text, maxLength) => {
  if (!text || text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

// Générer une couleur aléatoire
export const generateAvatarColor = (name) => {
  const colors = [
    '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7',
    '#DDA0DD', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9'
  ];
  
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  
  return colors[Math.abs(hash) % colors.length];
};

// Générer des initiales
export const generateInitials = (name) => {
  if (!name) return 'U';
  
  const words = name.trim().split(' ');
  if (words.length === 1) {
    return words[0].charAt(0).toUpperCase();
  } else {
    return (words[0].charAt(0) + words[words.length - 1].charAt(0)).toUpperCase();
  }
};

// Calculer le score de progression
export const calculateProgressScore = (completed, total) => {
  if (total === 0) return 0;
  return Math.round((completed / total) * 100);
};

// Obtenir le niveau de difficulté
export const getDifficultyLevel = (score) => {
  if (score >= 90) return { level: 'expert', label: 'Expert', color: '#8E24AA' };
  if (score >= 75) return { level: 'advanced', label: 'Avancé', color: '#F57C00' };
  if (score >= 50) return { level: 'intermediate', label: 'Intermédiaire', color: '#FFB300' };
  return { level: 'beginner', label: 'Débutant', color: '#4CAF50' };
};

// Debounce pour les recherches
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Gestion des erreurs réseau
export const handleNetworkError = (error) => {
  if (!error.response) {
    return {
      title: 'Erreur de connexion',
      message: 'Vérifiez votre connexion internet et réessayez.'
    };
  }

  const status = error.response.status;
  
  switch (status) {
    case 401:
      return {
        title: 'Non autorisé',
        message: 'Votre session a expiré. Veuillez vous reconnecter.'
      };
    case 403:
      return {
        title: 'Accès refusé',
        message: 'Vous n\'avez pas les permissions nécessaires.'
      };
    case 404:
      return {
        title: 'Ressource introuvable',
        message: 'Le contenu demandé n\'existe pas ou a été supprimé.'
      };
    case 500:
      return {
        title: 'Erreur serveur',
        message: 'Une erreur est survenue sur le serveur. Réessayez plus tard.'
      };
    default:
      return {
        title: 'Erreur',
        message: error.response.data?.message || 'Une erreur inattendue s\'est produite.'
      };
  }
};
