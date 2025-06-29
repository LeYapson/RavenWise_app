import axios from 'axios';
import { useAuth } from '@clerk/clerk-expo';

// Configuration de l'API
const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL || 'http://localhost:3000/api/v1';

// Service API avec authentification Clerk
class ApiService {
  constructor() {
    this.api = axios.create({
      baseURL: API_BASE_URL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  // Méthode pour configurer l'authentification Clerk
  async configureAuth(getToken) {
    this.api.interceptors.request.use(
      async (config) => {
        try {
          if (getToken) {
            const token = await getToken();
            if (token) {
              config.headers.Authorization = `Bearer ${token}`;
            }
          }
        } catch (error) {
          console.error('❌ Erreur lors de la récupération du token Clerk:', error);
        }
        return config;
      },
      (error) => Promise.reject(error)
    );
  }

  // Méthodes API génériques
  async get(endpoint) {
    const response = await this.api.get(endpoint);
    return response.data;
  }

  async post(endpoint, data) {
    const response = await this.api.post(endpoint, data);
    return response.data;
  }

  async put(endpoint, data) {
    const response = await this.api.put(endpoint, data);
    return response.data;
  }

  async delete(endpoint) {
    const response = await this.api.delete(endpoint);
    return response.data;
  }

  // Services spécifiques
  
  // Cours
  async getCourses() {
    return this.get('/courses');
  }

  async getUserCourses() {
    return this.get('/courses/enrolled');
  }

  async getCourseProgress(courseId) {
    return this.get(`/progress/course/${courseId}`);
  }

  // Quiz
  async getQuizzes() {
    return this.get('/quizzes');
  }

  async submitQuizAnswer(quizId, answers) {
    return this.post(`/quizzes/${quizId}/answer`, { answers });
  }

  // Profil utilisateur
  async getUserProfile() {
    return this.get('/user/profile');
  }

  async updateUserProfile(data) {
    return this.put('/user/profile', data);
  }

  // Statistiques
  async getUserStats() {
    return this.get('/user/stats');
  }
}

// Hook personnalisé pour utiliser l'API avec Clerk
export const useApiService = () => {
  const { getToken } = useAuth();
  const apiService = new ApiService();
  
  // Configurer l'authentification lors de l'initialisation
  apiService.configureAuth(getToken);
  
  return apiService;
};

// Instance par défaut (pour compatibilité)
export const apiService = new ApiService();
export default apiService;
