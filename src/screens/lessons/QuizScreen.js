import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { fetchQuizzesByCourse } from '../../services/api';

export default function QuizScreen({ navigation, route }) {
    const { courseId } = route.params;

    const [quizzes, setQuizzes] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedAnswerId, setSelectedAnswerId] = useState(null);
    const [answered, setAnswered] = useState(false);
    const [loading, setLoading] = useState(true);
    const [score, setScore] = useState(0);

    const currentQuiz = quizzes[currentIndex];

    useEffect(() => {
        fetchQuizzesByCourse(courseId)
        .then(data => {
            setQuizzes(data);
            setLoading(false);
        })
        .catch(err => {
            console.error('Erreur de chargement du quiz:', err);
            setLoading(false);
        });
    }, [courseId]);

    const handleSelectAnswer = (answerId) => {
        if (!answered) {
        setSelectedAnswerId(answerId);
        }
    };

    const handleValidate = () => {
        if (selectedAnswerId !== null) {
            setAnswered(true);
            const correctAnswer = currentQuiz.answers.find(a => a.isCorrect);
            if (selectedAnswerId === correctAnswer.id) {
            setScore(prev => prev + 1);
            }
        }
    };

    const handleNextQuiz = () => {
        if (currentIndex < quizzes.length - 1) {
            setCurrentIndex(prev => prev + 1);
            setSelectedAnswerId(null);
            setAnswered(false);
        } else {
            console.log(courseId)
            navigation.navigate('QuizResult', {
                score,
                total: quizzes.length,
                courseId: courseId
            });
        }
    };

    const getAnswerStyle = (answer) => {
        if (!answered) {
        return selectedAnswerId === answer.id ? styles.selectedAnswer : styles.answer;
        }

        if (answer.isCorrect) return [styles.answer, styles.correctAnswer];
        if (answer.id === selectedAnswerId) return [styles.answer, styles.incorrectAnswer];
        return styles.answer;
    };

    if (loading || !currentQuiz) {
        return (
        <View style={styles.container}>
            <ActivityIndicator size="large" />
        </View>
        );
    }

    return (
        <View style={styles.container}>
        {/* Bouton retour */}
        <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.backButton}>Retour</Text>
            </TouchableOpacity>
        </View>

        <Text style={styles.question}>{currentQuiz.question}</Text>

        {currentQuiz.answers.map((answer) => (
            <TouchableOpacity
            key={answer.id}
            style={getAnswerStyle(answer)}
            onPress={() => handleSelectAnswer(answer.id)}
            disabled={answered}
            >
            <Text style={styles.answerText}>{answer.answer}</Text>
            </TouchableOpacity>
        ))}

        {!answered ? (
            <TouchableOpacity
            style={[styles.button, selectedAnswerId === null && styles.buttonDisabled]}
            onPress={handleValidate}
            disabled={selectedAnswerId === null}
            >
            <Text style={styles.buttonText}>Valider</Text>
            </TouchableOpacity>
        ) : (
            <TouchableOpacity
            style={styles.button}
            onPress={handleNextQuiz}
            >
            <Text style={styles.buttonText}>
                {currentIndex < quizzes.length - 1 ? 'Question suivante' : 'Terminer'}
            </Text>
            </TouchableOpacity>
        )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    header: {
        marginBottom: 20,
        alignItems: 'flex-start',
    },
    backButton: {
        fontSize: 16,
        color: '#007BFF',
    },
    question: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    answer: {
        borderWidth: 1,
        borderColor: '#999',
        borderRadius: 10,
        padding: 15,
        marginBottom: 10,
    },
    selectedAnswer: {
        borderWidth: 2,
        borderColor: '#007BFF',
        backgroundColor: '#E0F0FF',
        borderRadius: 10,
        padding: 15,
        marginBottom: 10,
    },
    correctAnswer: {
        backgroundColor: '#d4edda',
        borderColor: '#28a745',
    },
    incorrectAnswer: {
        backgroundColor: '#f8d7da',
        borderColor: '#dc3545',
    },
    answerText: {
        fontSize: 18,
    },
    button: {
        marginTop: 20,
        backgroundColor: '#007BFF',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    buttonDisabled: {
        backgroundColor: '#aaa',
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

