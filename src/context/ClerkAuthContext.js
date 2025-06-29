import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAuth, useUser } from '@clerk/clerk-expo';
import { notificationService } from '../services/notificationService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { isSignedIn, isLoaded, signOut } = useAuth();
  const { user } = useUser();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isLoaded) {
      setIsLoading(false);
      
      // Initialiser les notifications si l'utilisateur est connecté
      if (isSignedIn && user) {
        initializeNotifications();
      }
    }
  }, [isLoaded, isSignedIn, user]);

  const initializeNotifications = async () => {
    try {
      await notificationService.initialize();
      console.log('🔔 Notifications initialisées pour:', user?.emailAddresses?.[0]?.emailAddress);
    } catch (error) {
      console.error('❌ Erreur initialisation notifications:', error);
    }
  };

  const handleSignOut = async () => {
    try {
      // Annuler toutes les notifications programmées
      await notificationService.cancelAllNotifications();
      
      // Déconnexion Clerk
      await signOut();
      
      console.log('👋 Utilisateur déconnecté et notifications annulées');
    } catch (error) {
      console.error('❌ Erreur lors de la déconnexion:', error);
    }
  };

  const value = {
    // État d'authentification
    isAuthenticated: isSignedIn,
    isLoading,
    
    // Données utilisateur Clerk
    user,
    
    // Actions
    signOut: handleSignOut,
    
    // Données utilisateur formatées pour compatibilité
    userData: user ? {
      id: user.id,
      email: user.emailAddresses?.[0]?.emailAddress,
      firstName: user.firstName,
      lastName: user.lastName,
      imageUrl: user.imageUrl,
      fullName: user.fullName,
    } : null,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};

export { AuthContext };
