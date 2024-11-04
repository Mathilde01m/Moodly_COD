// AppNavigator.tsx
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './screens/HomeScreen'; // Ton écran d'accueil
import PageAchat from './screens/PageAchat';  // Ton écran d'achat

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">  {/* L'écran initial est HomeScreen */}
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Achat" component={PageAchat} />  {/* Ajoute l'écran d'achat */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
