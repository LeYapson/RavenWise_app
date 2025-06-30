// import axios from 'axios';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { API_BASE_URL, STORAGE_KEYS } from '../constants';
// // Configuration de l'instance Axiosconst 
// // api = axios.create({  
// // baseURL: API_BASE_URL,  
// // timeout: 10000,  
// // headers: {    'Content-Type': 'application/json',  },});
// // 
// // // Intercepteur pour ajouter le token d'authentification
// // api.interceptors.request.use(  async (config) => {    
// // try {      const token = await AsyncStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
// //       if (token) {        
// // config.headers.Authorization = `Bearer ${token}`;      
// // }    
// // } catch (error) {      
// // console.error('Erreur lors de la récupération du token:', error);
// //     }    r
// // eturn config;  },  
// // (error) => {    return Promise.reject(error);  });
// // 
// // // Intercepteur pour gérer les erreurs d'authentification
// // api.interceptors.response.use(  
// // (response) => response,  
// // async (error) => {    
// // if (error.response?.status === 401) {      
// // // Token invalide ou expiré      
// // await AsyncStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);      
// // await AsyncStorage.removeItem(STORAGE_KEYS.USER_DATA);    
// // }    
// // 
// // return Promise.reject(error);  });
// // 
// // // Services d'authentification (pour compatibilité)
// // 
// // export const authService = {  login: async (email, password) => {    const response = await api.post('/auth/login', { email, password });    const { token, user } = response.data;        // Sauvegarder le token et les données utilisateur    await AsyncStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token);    await AsyncStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(user));        return { token, user };  },  register: async (email, password, name) => {    const response = await api.post('/auth/register', { email, password, name });    const { token, user } = response.data;        await AsyncStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token);    await AsyncStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(user));        return { token, user };  },  logout: async () => {    await AsyncStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);    await AsyncStorage.removeItem(STORAGE_KEYS.USER_DATA);  },  getCurrentUser: async () => {    try {      const userData = await AsyncStorage.getItem(STORAGE_KEYS.USER_DATA);      return userData ? JSON.parse(userData) : null;    } catch (error) {      console.error('Erreur lors de la récupération des données utilisateur:', error);      return null;    }  },};// Services utilisateur - Basé sur les routes Postman réellesexport const userService = {  createUser: async (clerkId, email, role = 'free') => {    const response = await api.post('/users', { clerkId, email, role });    return response.data;  },  getUserById: async (clerkId) => {    const response = await api.get(`/users/${clerkId}`);    return response.data;  },  checkUserExists: async (clerkId) => {    const response = await api.get(`/users/${clerkId}/exists`);    return response.data;  },  updateUser: async (clerkId, userData) => {    const response = await api.patch(`/users/${clerkId}`, userData);    return response.data;  },};// Services de cours - Basé sur les routes Postman réellesexport const courseService = {  getAllCourses: async () => {    const response = await api.get('/courses');    return response.data;  },  getPublishedCourses: async () => {    const response = await api.get('/courses?published=true');    return response.data;  },  getCourseById: async (courseId) => {    const response = await api.get(`/courses/${courseId}`);    return response.data;  },  getChaptersByCourse: async (courseId) => {    const response = await api.get(`/courses/${courseId}/chapters`);    return response.data;  },  // Routes utilisateur pour les cours suivis  getUserCourses: async (clerkId) => {    const response = await api.get(`/users/${clerkId}/courses`);    return response.data;  },  followCourse: async (clerkId, courseId) => {    const response = await api.post(`/users/${clerkId}/courses`, { courseId });    return response.data;  },  unfollowCourse: async (clerkId, courseId) => {    const response = await api.delete(`/users/${clerkId}/courses`, { data: { courseId } });    return response.data;  },};// Services de chapitres - Basé sur les routes Postmanexport const chapterService = {  getAllChapters: async () => {    const response = await api.get('/chapters');    return response.data;  },  getChapterById: async (chapterId) => {    const response = await api.get(`/chapters/${chapterId}`);    return response.data;  },  getChaptersByCourse: async (courseId) => {    const response = await api.get(`/chapters?courseId=${courseId}`);    return response.data;  },  getChapterCount: async (courseId) => {    const response = await api.get(`/chapters/course/${courseId}/count`);    return response.data;  },};// Services de leçons - Basé sur les routes Postmanexport const lessonService = {  getAllLessons: async () => {    const response = await api.get('/lessons');    return response.data;  },  getLessonById: async (lessonId) => {    const response = await api.get(`/lessons/${lessonId}`);    return response.data;  },  getLessonsByChapter: async (chapterId) => {    const response = await api.get(`/lessons?chapterId=${chapterId}`);    return response.data;  },  getChapterTotalDuration: async (chapterId) => {    const response = await api.get(`/lessons/chapter/${chapterId}/total-duration`);    return response.data;  },  // Marquer une leçon comme terminée  completeLesson: async (clerkId, lessonId) => {    const response = await api.post(`/users/${clerkId}/lessons`, { lessonId });    return response.data;  },  // Obtenir les leçons terminées d'un utilisateur  getUserCompletedLessons: async (clerkId) => {    const response = await api.get(`/users/${clerkId}/lessons`);    return response.data;  },};// Services de quiz - Basé sur les routes Postmanexport const quizService = {  getQuizById: async (quizId) => {    const response = await api.get(`/quizzes/${quizId}/with-answers`);    return response.data;  },  getQuizByLesson: async (lessonId) => {    const response = await api.get(`/quizzes/by-lesson/${lessonId}`);    return response.data;  },  validateQuizAnswer: async (quizId, answerId) => {    const response = await api.post(`/quizzes/${quizId}/validate`, { answerId });    return response.data;  },};// Services d'exercices - Basé sur les routes Postmanexport const exerciseService = {  getExerciseById: async (exerciseId) => {    const response = await api.get(`/exercices/${exerciseId}`);    return response.data;  },  getExerciseByLesson: async (lessonId) => {    const response = await api.get(`/exercices/by-lesson/${lessonId}`);    return response.data;  },};// Services de lectures - Basé sur les routes Postmanexport const lectureService = {  getLectureById: async (lectureId) => {    const response = await api.get(`/lectures/${lectureId}`);    return response.data;  },  getLectureByLesson: async (lessonId) => {    const response = await api.get(`/lectures/by-lesson/${lessonId}`);    return response.data;  },};// Service de progrès (calculé à partir des leçons terminées)export const progressService = {  getUserProgress: async (clerkId) => {    try {      // Récupérer les cours suivis et les leçons terminées      const [userCourses, completedLessons] = await Promise.all([        courseService.getUserCourses(clerkId),        lessonService.getUserCompletedLessons(clerkId)      ]);      // Calculer les statistiques      const totalCourses = userCourses.length;      const completedLessonsCount = completedLessons.length;            return {        totalCourses,        completedLessons: completedLessonsCount,        streak: 7, // Valeur par défaut, à calculer selon la logique métier        pointsEarned: completedLessonsCount * 10, // 10 points par leçon      };    } catch (error) {      console.error('Erreur lors du calcul du progrès:', error);      // Retourner des données par défaut en cas d'erreur      return {        totalCourses: 0,        completedLessons: 0,        streak: 0,        pointsEarned: 0,      };    }  },};// Service API génériqueexport const apiService = {  get: (endpoint) => api.get(endpoint),  post: (endpoint, data) => api.post(endpoint, data),  put: (endpoint, data) => api.put(endpoint, data),  patch: (endpoint, data) => api.patch(endpoint, data),  delete: (endpoint) => api.delete(endpoint),    // Alias pour compatibilité avec les anciens noms  getUserCourses: (clerkId) => courseService.getUserCourses(clerkId),  getEnrolledCourses: (clerkId) => courseService.getUserCourses(clerkId),  getUserProgress: (clerkId) => progressService.getUserProgress(clerkId),};export default api;

const API_BASE_URL = 'http://172.17.48.1:3000/api/v1'; // Ex: 192.168.1.42 ou 10.0.2.2 sur Android Emulator

export async function fetchCourses() {
    const res = await fetch(`${API_BASE_URL}/courses`);
    return res.json();
}

export async function getQuizById(quizId) {
    const res = await fetch(`${API_BASE_URL}/quizzes/${quizId}`);
    return res.json();
}

export async function getUserCourses(clerkId) {
  const res = await fetch(`${API_BASE_URL}/users/${clerkId}/courses`);

  console.log(res)

  if (!res.ok) {
    // Si erreur HTTP, remonte un message avec le status
    throw new Error(`Erreur API : ${res.status} ${res.statusText}`);
  }

  // Tenter de parser le JSON en sécurisant le parse
  try {
    const data = await res.json();
    return data;
  } catch (parseError) {
    throw new Error('Réponse JSON invalide ou vide');
  }
}


export async function fetchRandomQuizByCourse(courseId) {
    try {
        const res = await fetch(`${API_BASE_URL}/quizzes/random-by-course/${courseId}`);

        if (!res.ok) {
        const errorText = await res.text(); // <- lire le corps de l'erreur
        console.error('Réponse erreur API:', errorText);
        throw new Error(`Erreur API ${res.status}: ${errorText}`);
        }

        return await res.json();
    } catch (err) {
        console.error('Erreur de chargement du quiz:', err);
        throw err;
    }
}

export async function fetchQuizzesByCourse(courseId) {
    try {
        const res = await fetch(`${API_BASE_URL}/quizzes/all-quizzes-by-course/${courseId}`);

        if (!res.ok) {
            const errorText = await res.text(); // <- lire le corps de l'erreur
            console.error('Réponse erreur API:', errorText);
            throw new Error(`Erreur API ${res.status}: ${errorText}`);
        }

        return await res.json();
    } catch (err) {
        console.error('Erreur de chargement du quiz:', err);
        throw err;
    }
}
