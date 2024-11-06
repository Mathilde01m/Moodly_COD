import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';

export default function MailScreen() {
  const [selectedTab, setSelectedTab] = useState('Mail'); // Gérer l'onglet sélectionné

  return (
    <View style={styles.container}>
      {/* Icône de profil en haut à droite */}
      <TouchableOpacity style={styles.profileIcon}>
        <Image 
          source={require('../../assets/images/mail.png')} 
          style={styles.profileImage} 
        />
      </TouchableOpacity>

      {/* Icône des réglages */}
      <TouchableOpacity style={styles.settingsIcon}>
        <Image 
          source={require('../../assets/images/mail.png')} 
          style={styles.iconImage} 
        />
      </TouchableOpacity>

      {/* Onglets "Teams" et "Mail" */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'Teams' ? styles.activeTab : styles.inactiveTab]}
          onPress={() => setSelectedTab('Teams')}
        >
          <Text style={selectedTab === 'Teams' ? styles.activeTabText : styles.inactiveTabText}>Teams</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'Mail' ? styles.activeTab : styles.inactiveTab]}
          onPress={() => setSelectedTab('Mail')}
        >
          <Text style={selectedTab === 'Mail' ? styles.activeTabText : styles.inactiveTabText}>Mail</Text>
        </TouchableOpacity>
      </View>

      {/* Liste des mails */}
      <ScrollView contentContainerStyle={styles.mailList}>
        {[1, 2, 3, 4, 5].map((item, index) => (
          <View key={index} style={styles.mailItem}>
            <View style={styles.line} />
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 20,
  },
  profileIcon: {
    position: 'absolute',
    top: 20,    // Ajustement pour être au même endroit que l'icône de la page Home
    right: 20,  // À droite de l'écran
    zIndex: 1,
  },
  settingsIcon: {
    position: 'absolute',
    right: 70, // Alignement horizontal pour qu'il soit juste à côté du profil
    zIndex: 1,
    top: 160,
    
  },
  profileImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  iconImage: {
    width: 30,
    height: 30,
  },
  tabContainer: {
    flexDirection: 'row',
    marginTop: 80,  // Ajusté pour correspondre à l'espacement de l'image
    marginHorizontal: 20,
  },
  tab: {
    flex: 1,
    paddingVertical: 15,  // Hauteur des onglets ajustée
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginHorizontal: 5,
  },
  activeTab: {
    backgroundColor: '#3E289B',
  },
  inactiveTab: {
    backgroundColor: '#E0E0E0',
  },
  activeTabText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,  // Taille de police ajustée
  },
  inactiveTabText: {
    color: '#333',
    fontSize: 18,
  },
  mailList: {
    marginTop: 50,  // Espacement ajusté
    paddingHorizontal: 20,
  },
  mailItem: {
    marginVertical: 10,  // Espacement entre les éléments ajusté
    height: 80,  // Hauteur ajustée pour correspondre à l'image
    backgroundColor: '#F5F5F5',  // Couleur de fond pour simuler les mails
    borderRadius: 10,
    justifyContent: 'center',
    paddingHorizontal: 15,
  },
  line: {
    height: 1,
    backgroundColor: '#333',
  },
});
