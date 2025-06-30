import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ROUTES } from '../../constants';

export default function QuizResultScreen({ route, navigation }) {
  const { score, total, courseId } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Résultat du Quiz</Text>
      <Text style={styles.score}>
        {score} / {total} bonnes réponses
      </Text>

{/* navigation.navigate(ROUTES.QUIZ_LIST, { courseId }) */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('MainTabs', {screen: ROUTES.QUIZ_LIST, params: { courseId }})
    
    }
      >
        <Text style={styles.buttonText}>Retour à la sélection de quiz</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  score: {
    fontSize: 22,
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});
