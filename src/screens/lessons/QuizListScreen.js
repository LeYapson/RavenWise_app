import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { fetchCourses } from '../../services/api';
import { ROUTES } from '../../constants';

export default function QuizListScreen() {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();

    useEffect(() => {
        fetchCourses()
        .then(data => setCourses(data))
        .catch(err => console.error('Erreur de chargement des cours :', err))
        .finally(() => setLoading(false));
    }, []);

    const handleSelectCourse = (courseId) => {
        navigation.navigate(ROUTES.QUIZ_DETAIL, { courseId });
    };

    if (loading) {
        return (
        <View style={styles.container}>
            <ActivityIndicator size="large" />
        </View>
        );
    }

    return (
        <View style={styles.container}>
        <Text style={styles.title}>Choisissez un cours</Text>
        <FlatList
            data={courses}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
            <TouchableOpacity 
                style={styles.courseItem} 
                onPress={() => handleSelectCourse(item.id)}
            >
                <Text style={styles.courseName}>{item.title}</Text>
            </TouchableOpacity>
            )}
        />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    courseItem: {
        padding: 15,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ccc',
        marginBottom: 10,
    },
    courseName: {
        fontSize: 18,
    },
});
