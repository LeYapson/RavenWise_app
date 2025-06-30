import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import { useAuthContext } from '../context/ClerkAuthContext';
import { COLORS, ROUTES } from '../constants';

// Import des écrans essentiels
import LoadingScreen from '../screens/LoadingScreen';
import ClerkLoginScreen from '../screens/auth/ClerkLoginScreen';
import CourseTrackingScreen from '../screens/courses/CourseTrackingScreen';
import QuizScreen from '../screens/lessons/QuizScreen';
import ProfileScreen from '../screens/main/ProfileScreen';
import QuizListScreen from '../screens/lessons/QuizListScreen';
import QuizResultScreen from '../screens/lessons/QuizResultScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Navigation par onglets pour les utilisateurs connectés
const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === ROUTES.COURSE_TRACKING) {
            iconName = focused ? 'book' : 'book-outline';
          } else if (route.name === ROUTES.QUIZ_LIST) {
            iconName = focused ? 'help-circle' : 'help-circle-outline';
          } else if (route.name === ROUTES.PROFILE) {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.textSecondary,
        tabBarStyle: {
          backgroundColor: COLORS.white,
          borderTopColor: COLORS.border,
          borderTopWidth: 1,
          paddingBottom: 5,
          paddingTop: 5,
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
        headerStyle: {
          backgroundColor: COLORS.white,
        },
        headerTintColor: COLORS.text,
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 18,
        },
      })}
    >
      <Tab.Screen 
        name={ROUTES.COURSE_TRACKING} 
        component={CourseTrackingScreen}
        options={{ title: 'Mes Cours' }}
      />
      <Tab.Screen 
        name={ROUTES.QUIZ_LIST} 
        component={QuizListScreen}
        options={{ title: 'Quiz' }}
        />
      <Tab.Screen 
        name={ROUTES.PROFILE} 
        component={ProfileScreen}
        options={{ title: 'Profil' }}
      />
    </Tab.Navigator>
  );
};

const AppNavigator = () => {
  const { isAuthenticated, isLoading } = useAuthContext();

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: COLORS.white,
        },
        headerTintColor: COLORS.text,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerBackTitleVisible: false,
      }}
    >
      {isAuthenticated ? (
        // Navigation pour les utilisateurs connectés
        <>
            <Stack.Screen 
                name="MainTabs" 
                component={MainTabNavigator}
                options={{ headerShown: false }}
            />
            <Stack.Screen 
                name={ROUTES.QUIZ_DETAIL} 
                component={QuizScreen}
                options={{ title: 'Quiz' }}
            />
            <Stack.Screen 
                name="QuizResult" 
                component={QuizResultScreen}
            />
            <Stack.Screen 
                name={ROUTES.QUIZ_LIST} 
                component={QuizListScreen}
                options={{ title: 'Quiz' }}
            />
        </>
      ) : (
        // Écran de connexion Clerk
        <Stack.Screen 
          name={ROUTES.LOGIN} 
          component={ClerkLoginScreen}
          options={{ 
            title: 'Connexion RavenWise',
            headerShown: false 
          }}
        />
      )}
    </Stack.Navigator>
  );
};

export default AppNavigator;
