import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

export default function OnboardingManager() {
  // Exemple de données de progression des utilisateurs
  const usersOnboardingData = [
    {
      username: "Utilisateur1",
      steps: [
        { title: "Création de compte", completed: true },
        { title: "Configuration du profil", completed: true },
        { title: "Configuration des préférences", completed: false },
        { title: "Guide d'utilisation", completed: false },
      ],
    },
    {
      username: "Utilisateur2",
      steps: [
        { title: "Création de compte", completed: true },
        { title: "Configuration du profil", completed: true },
        { title: "Configuration des préférences", completed: true },
        { title: "Guide d'utilisation", completed: false },
      ],
    },
    {
      username: "Utilisateur3",
      steps: [
        { title: "Création de compte", completed: true },
        { title: "Configuration du profil", completed: false },
        { title: "Configuration des préférences", completed: false },
        { title: "Guide d'utilisation", completed: false },
      ],
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Suivi d'Onboarding </Text>

      {usersOnboardingData.map((user, index) => (
        <View key={index} style={styles.userContainer}>
          <Text style={styles.username}>{user.username}</Text>

          {/* Boucle à travers les étapes de chaque utilisateur */}
          {user.steps.map((step, stepIndex) => (
            <View key={stepIndex} style={styles.stepContainer}>
              <Text style={styles.stepTitle}>
                {step.title} - {step.completed ? "✅ Complété" : "⏳ En cours"}
              </Text>
            </View>
          ))}
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFF',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  userContainer: {
    marginBottom: 20,
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#F5F5F5',
  },
  username: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#4E32A8',
  },
  stepContainer: {
    marginBottom: 5,
  },
  stepTitle: {
    fontSize: 16,
    color: '#333',
  },
});
