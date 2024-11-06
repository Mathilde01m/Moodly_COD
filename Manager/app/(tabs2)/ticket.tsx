import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import TicketSection from '../../components/ticket';  // Composant pour les tickets
import CommentSection from '../../components/commentaire';  // Composant pour les commentaires

export default function PayScreen() {
  const [activeTab, setActiveTab] = useState<string>('Ticket');  // Gestion de l'onglet actif

  return (
    <View style={styles.container}>
      {/* Icône de profil */}
      <TouchableOpacity style={styles.profileIcon}>
        <Image
          source={require('../../assets/images/mail.png')}  // Remplace par l'icône de profil
          style={styles.profileImage}
        />
      </TouchableOpacity>

      {/* Onglets Commentaire et Ticket */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'Commentaire' ? styles.activeTab : styles.inactiveTab]}
          onPress={() => setActiveTab('Commentaire')}
        >
          <Text style={activeTab === 'Commentaire' ? styles.activeText : styles.inactiveText}>
            Commentaire
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'Ticket' ? styles.activeTab : styles.inactiveTab]}
          onPress={() => setActiveTab('Ticket')}
        >
          <Text style={activeTab === 'Ticket' ? styles.activeText : styles.inactiveText}>
            Ticket
          </Text>
        </TouchableOpacity>
      </View>

      {/* Affichage du composant en fonction de l'onglet actif */}
      {activeTab === 'Ticket' ? (
        <TicketSection />  // Composant pour la gestion des tickets
      ) : (
        <CommentSection />  // Composant pour les commentaires
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#fff',
  },
  profileIcon: {
    alignSelf: 'flex-end',
    padding: 10,
  },
  profileImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 8,
    marginHorizontal: 3,
  },
  activeTab: {
    backgroundColor: '#4E32A8',
  },
  inactiveTab: {
    backgroundColor: '#E0D7F6',
  },
  activeText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  inactiveText: {
    color: '#4E32A8',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
