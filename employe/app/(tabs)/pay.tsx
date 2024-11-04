import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

export default function PayScreen() {
  return (
    <View style={styles.container}>
      {/* Icone de profil en haut à droite */}
      <TouchableOpacity style={styles.profileIcon}>
        <Image
          source={require('../../assets/images/mail.png')}  // Remplacer par ton icône de profil
          style={styles.profileImage}
        />
      </TouchableOpacity>

      {/* Panneau violet à gauche */}
      <View style={styles.leftPanel}>
        {/* Section Les essentiels */}
        <Text style={styles.sectionTitle}>Les essentiels</Text>
        <MenuItem icon={require('../../assets/images/mail.png')} label="Tableau de bord" onPress={() => alert('Tableau de bord')} />
        <MenuItem icon={require('../../assets/images/mail.png')} label="Bulletins de paie" onPress={() => alert('Bulletins de paie')} />

        {/* Section Au quotidien */}
        <Text style={styles.sectionTitle}>Au quotidien</Text>
        <MenuItem icon={require('../../assets/images/mail.png')} label="Absences" onPress={() => alert('Absences')} />
        <MenuItem icon={require('../../assets/images/mail.png')} label="Entretiens et objectifs" onPress={() => alert('Entretiens et objectifs')} />

        {/* Section Mon entreprise */}
        <Text style={styles.sectionTitle}>Mon entreprise</Text>
        <MenuItem icon={require('../../assets/images/mail.png')} label="Documents" onPress={() => alert('Documents')} />
      </View>
    </View>
  );
}

function MenuItem({ icon, label, onPress }) {
  return (
    <TouchableOpacity style={styles.menuItem} onPress={onPress}>
      <Image source={icon} style={styles.icon} />
      <Text style={styles.menuText}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',  // Fond blanc pour l'arrière-plan principal
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
  leftPanel: {
    position: 'absolute',  
    left: 0,  // Aligne à gauche de l'écran
    top: 100,  // Aligne en haut de l'écran
    bottom: 30,  // S'étend jusqu'en bas de l'écran
    width: '80%',  // Largeur de 70% de l'écran
    backgroundColor: '#4B0082',  
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    padding: 20,
    justifyContent: 'center',  // Centrer les éléments verticalement
    alignItems: 'flex-start',  // Aligner les éléments à gauche
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginVertical: 10,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 15,
  },
  icon: {
    width: 25,
    height: 25,
    marginRight: 15,
    tintColor: '#fff',  // Couleur blanche pour les icônes
  },
  menuText: {
    fontSize: 16,
    color: '#fff',
  },
});
