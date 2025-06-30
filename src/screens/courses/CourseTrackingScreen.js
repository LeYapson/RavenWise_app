import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  Alert,
} from 'react-native';
import { courseService } from '../../services/api';
import { notificationService } from '../../services/notificationService';
import { useAuthContext } from '../../context/ClerkAuthContext';
import { COLORS, ROUTES } from '../../constants';
import { ProgressBar, LoadingSpinner } from '../../components';
import { getUserCourses } from '../../services/api'

// Données de démo pour le développement
const getDemoCoursesData = () => [
  {
    id: 1,
    title: 'Introduction à React Native',
    description: 'Apprenez les bases de React Native pour créer des applications mobiles',
    progress: 65,
    totalLessons: 12,
    completedLessons: 8,
    estimatedTime: '2h 30min',
    difficulty: 'Débutant',
    category: 'Mobile',
    nextLesson: {
      id: 9,
      title: 'Navigation avec React Navigation',
      duration: '15 min'
    }
  },
  {
    id: 2,
    title: 'JavaScript Avancé',
    description: 'Maîtrisez les concepts avancés de JavaScript',
    progress: 30,
    totalLessons: 15,
    completedLessons: 4,
    estimatedTime: '3h 45min',
    difficulty: 'Intermédiaire',
    category: 'Programmation',
    nextLesson: {
      id: 5,
      title: 'Closures et Scope',
      duration: '20 min'
    }
  },
  {
    id: 3,
    title: 'Design System avec React',
    description: 'Créez des composants réutilisables et maintenables',
    progress: 90,
    totalLessons: 8,
    completedLessons: 7,
    estimatedTime: '1h 50min',
    difficulty: 'Avancé',
    category: 'Design',
    nextLesson: {
      id: 8,
      title: 'Tests des composants',
      duration: '25 min'
    }
  }
];

const CourseTrackingScreen = ({ navigation }) => {
  const { user } = useAuthContext();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        const fetchEnrolledCourses = async () => {
            try {
                if (!user?.id) {
                    console.warn('Utilisateur non connecté');
                    setCourses(getDemoCoursesData());
                    return;
                }

                const data = await getUserCourses(user.id);
                setCourses(data || []);
            } catch (error) {
                console.error('Erreur lors du chargement des cours:', error);

                if (error.message === 'Network Error') {
                    console.log('🔧 Mode démo : Utilisation de données fictives');
                    setCourses(getDemoCoursesData());
                } else {
                    Alert.alert('Erreur', 'Impossible de charger vos cours');
                }
            } finally {
            setLoading(false);
            }
        };

        fetchEnrolledCourses();
    }, []);


  const onRefresh = async () => {
    setRefreshing(true);
    // await fetchEnrolledCourses();
    setRefreshing(false);
  };

  const renderCourseItem = ({ item }) => (
    <View style={styles.courseCard}>
      <View style={styles.courseHeader}>
        <Text style={styles.courseTitle}>{item.title}</Text>
        <View style={[
          styles.statusBadge,
          { backgroundColor: getStatusColor(item.status) }
        ]}>
          <Text style={styles.statusText}>{getStatusLabel(item.status)}</Text>
        </View>
      </View>
      
      <Text style={styles.courseDescription} numberOfLines={2}>
        {item.description}
      </Text>
      
      <View style={styles.progressSection}>
        <Text style={styles.progressLabel}>
          Progression: {item.completedLessons}/{item.totalLessons} leçons
        </Text>
        <ProgressBar 
          progress={(item.completedLessons / item.totalLessons) * 100}
          showPercentage={true}
          style={styles.progressBar}
        />
      </View>
      
      <View style={styles.courseStats}>
        <Text style={styles.statText}>
          ⏱️ {item.timeSpent || 0} min passées
        </Text>
        <Text style={styles.statText}>
          📊 Score moyen: {item.averageScore || 0}%
        </Text>
      </View>
      
      <View style={styles.actionButtons}>
        <TouchableOpacity 
          style={styles.continueButton}
          onPress={() => handleContinueCourse(item)}
        >
          <Text style={styles.continueButtonText}>Continuer</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.quizButton}
          onPress={() => handleStartQuiz(item)}
        >
          <Text style={styles.quizButtonText}>Quiz</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.reminderButton}
          onPress={() => handleSetReminder(item)}
        >
          <Text style={styles.reminderButtonText}>📅</Text>
        </TouchableOpacity>
      </View>
      
      {item.nextDeadline && (
        <View style={styles.deadlineSection}>
          <Text style={styles.deadlineText}>
            ⏰ Prochaine échéance: {formatDate(item.nextDeadline)}
          </Text>
        </View>
      )}
    </View>
  );

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return COLORS.success;
      case 'in_progress': return COLORS.warning;
      case 'not_started': return COLORS.textSecondary;
      default: return COLORS.textSecondary;
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'completed': return 'Terminé';
      case 'in_progress': return 'En cours';
      case 'not_started': return 'Pas commencé';
      default: return 'Inconnu';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const handleContinueCourse = (course) => {
    // Naviguer vers la prochaine leçon
    if (course.nextLessonId) {
      navigation.navigate(ROUTES.LESSON, { 
        lessonId: course.nextLessonId,
        courseId: course.id 
      });
    } else {
      Alert.alert('Cours terminé', 'Vous avez terminé toutes les leçons de ce cours !');
    }
  };

  const handleStartQuiz = (course) => {
    // Naviguer vers le quiz du cours
    if (course.availableQuizzes && course.availableQuizzes.length > 0) {
      navigation.navigate(ROUTES.QUIZ_DETAIL, { 
        quizId: course.availableQuizzes[0].id,
        courseId: course.id 
      });
    } else {
      Alert.alert('Pas de quiz', 'Aucun quiz disponible pour ce cours');
    }
  };

  const handleSetReminder = (course) => {
    Alert.alert(
      'Programmer un rappel',
      'Quand souhaitez-vous être rappelé pour ce cours ?',
      [
        {
          text: 'Dans 1 heure',
          onPress: () => scheduleReminder(course, 1, 'hour')
        },
        {
          text: 'Demain à 19h',
          onPress: () => scheduleReminder(course, 1, 'day')
        },
        {
          text: 'Dans 3 jours',
          onPress: () => scheduleReminder(course, 3, 'day')
        },
        {
          text: 'Annuler',
          style: 'cancel'
        }
      ]
    );
  };

  const scheduleReminder = async (course, amount, unit) => {
    try {
      const now = new Date();
      let reminderDate;
      
      if (unit === 'hour') {
        reminderDate = new Date(now.getTime() + amount * 60 * 60 * 1000);
      } else if (unit === 'day') {
        reminderDate = new Date(now);
        reminderDate.setDate(now.getDate() + amount);
        reminderDate.setHours(19, 0, 0, 0);
      }
      
      const notificationId = await notificationService.scheduleCourseReminder(
        course.title,
        reminderDate,
        course.id
      );
      
      if (notificationId) {
        Alert.alert(
          'Rappel programmé !',
          `Vous serez rappelé le ${formatDate(reminderDate.toISOString())}`
        );
      } else {
        Alert.alert('Erreur', 'Impossible de programmer le rappel');
      }
    } catch (error) {
      console.error('Erreur lors de la programmation du rappel:', error);
      Alert.alert('Erreur', 'Impossible de programmer le rappel');
    }
  };

//   useEffect(() => {
//     fetchEnrolledCourses();
//   }, []);

  if (loading) {
    return (
      <LoadingSpinner 
        text="Chargement de vos cours..." 
        style={styles.loadingContainer}
      />
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Mes Cours</Text>
        <Text style={styles.headerSubtitle}>
          {courses.length} cours en suivi
        </Text>
      </View>

      <FlatList
        data={courses}
        renderItem={renderCourseItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              Aucun cours en suivi
            </Text>
            <Text style={styles.emptySubtext}>
              Inscrivez-vous à des cours pour commencer votre apprentissage
            </Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  loadingContainer: {
    flex: 1,
  },
  header: {
    padding: 20,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  headerSubtitle: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  listContainer: {
    padding: 15,
  },
  courseCard: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  courseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  courseTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
    flex: 1,
    marginRight: 10,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 10,
    color: COLORS.white,
    fontWeight: 'bold',
  },
  courseDescription: {
    fontSize: 14,
    color: COLORS.textSecondary,
    lineHeight: 20,
    marginBottom: 12,
  },
  progressSection: {
    marginBottom: 12,
  },
  progressLabel: {
    fontSize: 14,
    color: COLORS.text,
    marginBottom: 8,
  },
  progressBar: {
    marginBottom: 8,
  },
  courseStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  statText: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  continueButton: {
    flex: 1,
    backgroundColor: COLORS.primary,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  continueButtonText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: 'bold',
  },
  quizButton: {
    flex: 1,
    backgroundColor: COLORS.warning,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  quizButtonText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: 'bold',
  },
  reminderButton: {
    backgroundColor: COLORS.secondary,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    minWidth: 44,
  },
  reminderButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  deadlineSection: {
    marginTop: 12,
    padding: 8,
    backgroundColor: COLORS.background,
    borderRadius: 6,
  },
  deadlineText: {
    fontSize: 12,
    color: COLORS.error,
    fontWeight: '500',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 18,
    color: COLORS.textSecondary,
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: COLORS.textSecondary,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
});

export default CourseTrackingScreen;
