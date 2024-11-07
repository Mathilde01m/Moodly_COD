import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import 'react-native-gesture-handler';
import HistoriqueMood from '../../components/historiquemood'; // Vérifiez que le chemin est correct
import Onboarding from '../../components/onboarding'; // Vérifiez que le chemin est correct

export default function Index() {
  const [activeTab, setActiveTab] = useState<string | null>(null);

  // Fonction pour basculer entre les onglets ou désélectionner si déjà actif
  const toggleTab = (tab: string) => {
    if (activeTab === tab) {
      setActiveTab(null);  // Désélectionner si le même onglet est appuyé
    } else {
      setActiveTab(tab);  // Sélectionner le nouvel onglet
    }
  };

  return (
    <View style={styles.container}>
      {/* Icône de profil en haut à droite */}
      <TouchableOpacity style={styles.profileIcon}>
        <Image
          source={require('../../assets/images/mail.png')} // Chemin vers l'icône, assurez-vous qu'il est correct
          style={styles.profileImage}
        />
      </TouchableOpacity>

      {/* Conteneur centré pour les onglets */}
      <View style={styles.centeredTabContainer}>
        <View style={styles.tabWrapper}>
          <TouchableOpacity
            style={[styles.tabButton, activeTab === 'Onboarding' ? styles.activeTab : styles.inactiveTab]}
            onPress={() => toggleTab('Onboarding')}
          >
            <Text style={activeTab === 'Onboarding' ? styles.activeText : styles.inactiveText}>
              Onboarding suivis
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tabButton, activeTab === 'Mood' ? styles.activeTab : styles.inactiveTab]}
            onPress={() => toggleTab('Mood')}
          >
            <Text style={activeTab === 'Mood' ? styles.activeText : styles.inactiveText}>
              Historique des Moods
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Contenu des onglets, s'affiche uniquement si un onglet est sélectionné */}
      {activeTab === 'Onboarding' && <Onboarding />}
      {activeTab === 'Mood' && <HistoriqueMood />}

      {/* Section Statistique d'équipe avec KPI, masquée lorsque l'un des onglets est actif */}
      {!activeTab && (
        <View style={[styles.section, styles.teamStat]}>
          <Text style={styles.sectionText}>Stat équipe moy/semaine</Text>

          <View style={styles.statContainer}>
            <View style={styles.statRow}>
              <View style={[styles.statBox, styles.stat1]} />
              <Text style={styles.statText}>Stat 1</Text>
            </View>
            <View style={styles.statRow}>
              <View style={[styles.statBox, styles.stat2]} />
              <Text style={styles.statText}>Stat 2</Text>
            </View>
            <View style={styles.statRow}>
              <View style={[styles.statBox, styles.stat3]} />
              <Text style={styles.statText}>Stat 3</Text>
            </View>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
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
  centeredTabContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  tabWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  tabButton: {
    width: '47%',
    paddingVertical: 15,
    marginHorizontal: 5,
    marginVertical: 10,
    borderRadius: 10,
  },
  activeTab: {
    backgroundColor: '#4E32A8',
  },
  inactiveTab: {
    backgroundColor: '#E0D7F6',
  },
  activeText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  inactiveText: {
    color: '#4E32A8',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  section: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 20,
    padding: 20,
  },
  teamStat: {
    backgroundColor: '#E0E0E0',
    flex: 1,
    alignItems: 'flex-start',
    padding: 30,
  },
  statContainer: {
    width: '100%',
    marginTop: 50,
  },
  statRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 50,
  },
  statBox: {
    width: 50,
    height: 50,
    borderRadius: 10,
    marginRight: 20,
  },
  stat1: {
    backgroundColor: '#A8D5BA',
  },
  stat2: {
    backgroundColor: '#F4A261',
  },
  stat3: {
    backgroundColor: '#E76F51',
  },
  sectionText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  statText: {
    fontSize: 16,
    color: '#000',
  },
});
