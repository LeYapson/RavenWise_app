import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { useOAuth } from '@clerk/clerk-expo';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../constants';

const LoginScreen = ({ navigation }) => {
  const { startOAuthFlow: startGoogleFlow } = useOAuth({ strategy: 'oauth_google' });
  const { startOAuthFlow: startGitHubFlow } = useOAuth({ strategy: 'oauth_github' });

  const handleGoogleSignIn = async () => {
    try {
      const { createdSessionId, setActive } = await startGoogleFlow();
      if (createdSessionId) {
        setActive({ session: createdSessionId });
      }
    } catch (err) {
      console.error('❌ Erreur connexion Google:', err);
    }
  };

  const handleGitHubSignIn = async () => {
    try {
      const { createdSessionId, setActive } = await startGitHubFlow();
      if (createdSessionId) {
        setActive({ session: createdSessionId });
      }
    } catch (err) {
      console.error('❌ Erreur connexion GitHub:', err);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Logo et titre */}
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Ionicons name="school" size={64} color={COLORS.primary} />
          </View>
          <Text style={styles.title}>RavenWise</Text>
          <Text style={styles.subtitle}>
            Votre plateforme d'apprentissage mobile
          </Text>
        </View>

        {/* Boutons de connexion */}
        <View style={styles.authButtons}>
          <TouchableOpacity
            style={[styles.authButton, styles.googleButton]}
            onPress={handleGoogleSignIn}
          >
            <Ionicons name="logo-google" size={20} color={COLORS.white} />
            <Text style={[styles.authButtonText, styles.googleButtonText]}>
              Continuer avec Google
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.authButton, styles.githubButton]}
            onPress={handleGitHubSignIn}
          >
            <Ionicons name="logo-github" size={20} color={COLORS.white} />
            <Text style={[styles.authButtonText, styles.githubButtonText]}>
              Continuer avec GitHub
            </Text>
          </TouchableOpacity>
        </View>

        {/* Info complémentaire */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Même compte que sur le site web RavenWise
          </Text>
          <Text style={styles.footerSubtext}>
            Synchronisation automatique de vos progrès
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 48,
  },
  logoContainer: {
    width: 100,
    height: 100,
    backgroundColor: COLORS.surface,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
  },
  authButtons: {
    gap: 16,
    marginBottom: 32,
  },
  authButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    gap: 12,
  },
  googleButton: {
    backgroundColor: '#EA4335',
  },
  githubButton: {
    backgroundColor: '#24292e',
  },
  authButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  googleButtonText: {
    color: COLORS.white,
  },
  githubButtonText: {
    color: COLORS.white,
  },
  footer: {
    alignItems: 'center',
    gap: 8,
  },
  footerText: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.text,
    textAlign: 'center',
  },
  footerSubtext: {
    fontSize: 12,
    color: COLORS.textMuted,
    textAlign: 'center',
  },
});

export default LoginScreen;
