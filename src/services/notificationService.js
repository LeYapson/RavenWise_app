import { Platform } from 'react-native';

// Import conditionnel pour éviter les erreurs sur le web
let Notifications, Device, Constants;
if (Platform.OS !== 'web') {
  Notifications = require('expo-notifications');
  Device = require('expo-device');
  Constants = require('expo-constants');

  // Configuration des notifications (seulement sur mobile)
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
  });
}

class NotificationService {
  constructor() {
    this.expoPushToken = null;
    this.notificationListener = null;
    this.responseListener = null;
  }

  // Initialiser le service de notifications
  async initialize() {
    // Sur le web, les notifications ne sont pas supportées
    if (Platform.OS === 'web') {
      console.log('🌐 Notifications non supportées sur le web');
      return false;
    }

    // Vérifier si on est dans Expo Go
    const isExpoGo = Constants?.appOwnership === 'expo';
    if (isExpoGo && Constants?.expoVersion && parseFloat(Constants.expoVersion) >= 53) {
      console.log('⚠️ Notifications push non supportées dans Expo Go SDK 53+');
      console.log('📱 Utilisez un development build pour tester les notifications');
      return false;
    }

    try {
      // Demander les permissions
      const permission = await this.requestPermissions();
      if (!permission) {
        console.log('Permission de notification refusée');
        return false;
      }

      // Obtenir le token push
      this.expoPushToken = await this.getExpoPushToken();
      console.log('Push token:', this.expoPushToken);

      // Configurer les listeners
      this.setupNotificationListeners();

      return true;
    } catch (error) {
      console.error('Erreur lors de l\'initialisation des notifications:', error);
      return false;
    }
  }

  // Demander les permissions de notification
  async requestPermissions() {
    if (Platform.OS === 'web') {
      return false;
    }

    if (!Device.isDevice) {
      console.log('Les notifications push ne fonctionnent que sur des appareils physiques');
      return false;
    }

    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== 'granted') {
      console.log('Permission de notification refusée');
      return false;
    }

    return true;
  }

  // Obtenir le token Expo Push
  async getExpoPushToken() {
    if (Platform.OS === 'web') {
      return null;
    }

    try {
      const token = await Notifications.getExpoPushTokenAsync({
        projectId: Constants.expoConfig?.extra?.eas?.projectId || 'default-project-id',
      });
      return token.data;
    } catch (error) {
      console.error('Erreur lors de l\'obtention du token push:', error);
      return null;
    }
  }

  // Configurer les listeners de notifications
  setupNotificationListeners() {
    if (Platform.OS === 'web') {
      return;
    }

    // Listener pour les notifications reçues
    this.notificationListener = Notifications.addNotificationReceivedListener(
      (notification) => {
        console.log('Notification reçue:', notification);
        this.handleNotificationReceived(notification);
      }
    );

    // Listener pour les interactions avec les notifications
    this.responseListener = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        console.log('Interaction avec notification:', response);
        this.handleNotificationResponse(response);
      }
    );
  }

  // Gérer une notification reçue
  handleNotificationReceived(notification) {
    const { title, body, data } = notification.request.content;
    
    // Logique personnalisée selon le type de notification
    if (data && data.type === 'course_reminder') {
      console.log('Rappel de cours reçu:', data);
    }
  }

  // Gérer l'interaction avec une notification
  handleNotificationResponse(response) {
    const { notification } = response;
    const { data } = notification.request.content;
    
    // Navigation ou action selon les données de la notification
    if (data && data.screen) {
      // Ici on pourrait naviguer vers un écran spécifique
      console.log('Naviguer vers:', data.screen);
    }
  }

  // Programmer une notification locale
  async scheduleLocalNotification(title, body, data = {}, trigger = null) {
    if (Platform.OS === 'web') {
      console.log('🌐 Notifications locales non supportées sur le web');
      return null;
    }

    try {
      const notificationId = await Notifications.scheduleNotificationAsync({
        content: {
          title,
          body,
          data,
          sound: true,
        },
        trigger: trigger || { seconds: 1 },
      });
      
      console.log('Notification programmée:', notificationId);
      return notificationId;
    } catch (error) {
      console.error('Erreur lors de la programmation de la notification:', error);
      return null;
    }
  }

  // Programmer un rappel de cours
  async scheduleCourseReminder(courseTitle, reminderDate, courseId) {
    const title = 'Rappel de cours 📚';
    const body = `N'oubliez pas de continuer "${courseTitle}"`;
    const data = {
      type: 'course_reminder',
      courseId: courseId,
      screen: 'CourseTracking'
    };

    const trigger = {
      date: new Date(reminderDate),
    };

    return await this.scheduleLocalNotification(title, body, data, trigger);
  }

  // Programmer des rappels quotidiens
  async scheduleDailyReminder(hour = 19, minute = 0) {
    const title = 'Temps d\'apprentissage ! 🎓';
    const body = 'Continuez vos cours et progressez dans vos objectifs';
    
    const trigger = {
      hour,
      minute,
      repeats: true,
    };

    return await this.scheduleLocalNotification(title, body, {
      type: 'daily_reminder'
    }, trigger);
  }

  // Annuler une notification
  async cancelNotification(notificationId) {
    if (Platform.OS === 'web') {
      console.log('🌐 Annulation de notifications non supportée sur le web');
      return;
    }

    try {
      await Notifications.cancelScheduledNotificationAsync(notificationId);
      console.log('Notification annulée:', notificationId);
    } catch (error) {
      console.error('Erreur lors de l\'annulation de la notification:', error);
    }
  }

  // Annuler toutes les notifications
  async cancelAllNotifications() {
    if (Platform.OS === 'web') {
      console.log('🌐 Annulation de notifications non supportée sur le web');
      return;
    }

    try {
      await Notifications.cancelAllScheduledNotificationsAsync();
      console.log('Toutes les notifications annulées');
    } catch (error) {
      console.error('Erreur lors de l\'annulation des notifications:', error);
    }
  }

  // Obtenir les notifications programmées
  async getScheduledNotifications() {
    if (Platform.OS === 'web') {
      console.log('🌐 Récupération de notifications non supportée sur le web');
      return [];
    }

    try {
      const notifications = await Notifications.getAllScheduledNotificationsAsync();
      console.log('Notifications programmées:', notifications);
      return notifications;
    } catch (error) {
      console.error('Erreur lors de la récupération des notifications:', error);
      return [];
    }
  }

  // Nettoyer les listeners
  cleanup() {
    if (Platform.OS === 'web') {
      return;
    }

    if (this.notificationListener) {
      Notifications.removeNotificationSubscription(this.notificationListener);
    }
    if (this.responseListener) {
      Notifications.removeNotificationSubscription(this.responseListener);
    }
  }

  // Envoyer le token au serveur
  async sendTokenToServer(userId) {
    if (!this.expoPushToken) {
      console.log('Pas de token push disponible');
      return;
    }

    try {
      // Ici vous enverriez le token à votre backend
      const response = await fetch(`${API_BASE_URL}/users/${userId}/push-token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token: this.expoPushToken,
          platform: Platform.OS,
        }),
      });

      if (response.ok) {
        console.log('Token envoyé au serveur avec succès');
      }
    } catch (error) {
      console.error('Erreur lors de l\'envoi du token au serveur:', error);
    }
  }
}

// Instance singleton
const notificationService = new NotificationService();

export default notificationService;
export { notificationService };
