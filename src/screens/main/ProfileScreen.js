import React, { useContext, useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
  RefreshControl,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuthContext } from '../../context/ClerkAuthContext';
import { progressService } from '../../services/api';
import { COLORS, ROUTES } from '../../constants';

// Données de démo pour le développement
const getDemoUserStats = () => ({
  totalCourses: 3,
  completedCourses: 1,
  inProgressCourses: 2,
  totalLessons: 35,
  completedLessons: 19,
  totalQuizzes: 12,
  completedQuizzes: 8,
  averageScore: 85,
  studyStreak: 7,
  hoursStudied: 24.5,
  certificates: 1,
  level: 'Intermédiaire',
  xp: 1250,
  nextLevelXp: 2000
});

const ProfileScreen = ({ navigation }) => {
  const { userData, signOut, user } = useAuthContext();
  const [userStats, setUserStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchUserStats = async () => {
    try {
      if (!user?.id) {
        console.warn('Utilisateur non connecté');
        setUserStats(getDemoUserStats());
        setLoading(false);
        return;
      }
      
      const response = await progressService.getUserProgress(user.id);
      setUserStats(response);
    } catch (error) {
      console.error('Erreur lors du chargement des statistiques:', error);
      
      // En cas d'erreur réseau, utiliser des données de démo
      console.log('🔧 Mode démo : Utilisation de statistiques fictives');
      setUserStats(getDemoUserStats());
      Alert.alert(
        'Mode démo',
        'Impossible de se connecter au serveur. Affichage des données de démonstration.'
      );
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchUserStats();
    setRefreshing(false);
  };

  const handleLogout = () => {
    Alert.alert(
      'Déconnexion',
      'Êtes-vous sûr de vouloir vous déconnecter ?',
      [
        { text: 'Annuler', style: 'cancel' },
        { text: 'Déconnexion', onPress: signOut, style: 'destructive' },
      ]
    );
  };

  useEffect(() => {
    fetchUserStats();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Chargement du profil...</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {/* Header Profile */}
      <View style={styles.header}>
        <View style={styles.profileImageContainer}>
          <Image
            source={{ uri: userData?.imageUrl || 'https://via.placeholder.com/100' }}
            style={styles.profileImage}
          />
        </View>
        <Text style={styles.userName}>{userData?.fullName || 'Utilisateur'}</Text>
        <Text style={styles.userEmail}>{userData?.email}</Text>
      </View>

      {/* Statistics Cards */}
      {userStats && (
        <View style={styles.statsContainer}>
          <View style={styles.statsRow}>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>{userStats.coursesEnrolled || 0}</Text>
              <Text style={styles.statLabel}>Cours suivis</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>{userStats.lessonsCompleted || 0}</Text>
              <Text style={styles.statLabel}>Leçons terminées</Text>
            </View>
          </View>
          <View style={styles.statsRow}>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>{userStats.quizzesCompleted || 0}</Text>
              <Text style={styles.statLabel}>Quiz réussis</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>{userStats.exercisesCompleted || 0}</Text>
              <Text style={styles.statLabel}>Exercices</Text>
            </View>
          </View>
        </View>
      )}

      {/* Menu Options */}
      <View style={styles.menuContainer}>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => Alert.alert('Progrès', 'Fonctionnalité à venir dans une prochaine version')}
        >
          <Text style={styles.menuItemText}>📊 Mes Progrès</Text>
          <Text style={styles.menuItemArrow}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => Alert.alert('Réalisations', 'Fonctionnalité à venir dans une prochaine version')}
        >
          <Text style={styles.menuItemText}>🏆 Réalisations</Text>
          <Text style={styles.menuItemArrow}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => Alert.alert('Paramètres', 'Fonctionnalité à venir dans une prochaine version')}
        >
          <Text style={styles.menuItemText}>⚙️ Paramètres</Text>
          <Text style={styles.menuItemArrow}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => Alert.alert('Aide', 'Pour toute assistance, contactez-nous à support@ravenwise.com')}
        >
          <Text style={styles.menuItemText}>❓ Aide</Text>
          <Text style={styles.menuItemArrow}>›</Text>
        </TouchableOpacity>
      </View>

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Se déconnecter</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
  },
  loadingText: {
    fontSize: 16,
    color: COLORS.textSecondary,
  },
  header: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: COLORS.primary,
  },
  profileImageContainer: {
    marginBottom: 15,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: COLORS.white,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.white,
    marginBottom: 5,
  },
  userEmail: {
    fontSize: 16,
    color: COLORS.white,
    opacity: 0.8,
  },
  statsContainer: {
    padding: 20,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  statCard: {
    flex: 1,
    backgroundColor: COLORS.white,
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 5,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 12,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
  menuContainer: {
    backgroundColor: COLORS.white,
    marginHorizontal: 20,
    borderRadius: 10,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  menuItemText: {
    fontSize: 16,
    color: COLORS.text,
  },
  menuItemArrow: {
    fontSize: 18,
    color: COLORS.textSecondary,
  },
  logoutButton: {
    backgroundColor: COLORS.error,
    margin: 20,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProfileScreen;
