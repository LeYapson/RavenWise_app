// Test simple pour vérifier l'intégration
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from './src/constants';

// Test des composants
import { Button, LoadingSpinner } from './src/components';

const TestScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Test RavenWise App</Text>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Composants</Text>
        <Button 
          title="Test Button"
          onPress={() => console.log('Button pressed')}
          variant="primary"
        />
        <LoadingSpinner text="Test loading..." />
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Couleurs</Text>
        <View style={[styles.colorBox, { backgroundColor: COLORS.primary }]}>
          <Text style={styles.colorText}>Primary</Text>
        </View>
        <View style={[styles.colorBox, { backgroundColor: COLORS.success }]}>
          <Text style={styles.colorText}>Success</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: COLORS.background,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 20,
    textAlign: 'center',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 10,
  },
  colorBox: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    borderRadius: 8,
  },
  colorText: {
    color: COLORS.white,
    fontWeight: 'bold',
  },
});

export default TestScreen;
