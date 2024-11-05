import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { loginUser, getUserDetails } from '../src/api'; // Assurez-vous d'importer votre fonction API

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    try {
      console.log('Tentative de connexion avec:', { email, password });
      const response = await loginUser({ identifier: email, password });

      // Récupération du jeton JWT
      const token = response.data.jwt;
      const user = await getUserDetails(token); // Détails de l'utilisateur
      const user2 = response.data.user;

      // Débogage pour vérifier les détails de l'utilisateur
      console.log('Détails de l utilisateur:', user);

      // Accéder au rôle de l'utilisateur
      // Accéder au rôle de l'utilisateur
      const roleId = user.data.role?.id;
      console.log("Role ID :", roleId);




      // Rediriger en fonction du rôle
      if (roleId === 3) {
        router.push('./(tabs2)/ticket');
      } else if (roleId === 1) {
        router.push('./(tabs)/mail');
      } else {
        console.log("Role ID reçu :", roleId); // Pour voir la valeur actuelle de roleId
        Alert.alert('Erreur', 'Rôle d utilisateur non reconnu.');
      }



      Alert.alert('Connexion réussie', `Bienvenue, ${user2.username}!`);
    } catch (error) {
      const errorMessage = error.response?.data?.error?.message || 'Identifiants invalides. Veuillez réessayer.';
      console.error('Erreur de connexion:', errorMessage);
      Alert.alert('Erreur de connexion', errorMessage);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Connexion</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Mot de passe"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Se connecter" onPress={handleLogin} />
      <Button title="S'inscrire" onPress={() => router.push('./inscription')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
});

export default LoginScreen;
