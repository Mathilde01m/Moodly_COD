import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Image } from 'react-native';
import SignatureCanvas from 'react-native-signature-canvas';
import * as Animatable from 'react-native-animatable';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();
  const [employeeStats, setEmployeeStats] = useState({
    mood: 'Neutre',
    moodColor: '#FDE2E4', // Couleur par défaut pour l'humeur
    emoji: '😐', // Emoji par défaut pour l'humeur
  });
  const [isMoodPickerVisible, setMoodPickerVisible] = useState(false);
  const [isSigningModalVisible, setIsSigningModalVisible] = useState(false); // État pour afficher la modal de signature
  const [isSignedIn, setIsSignedIn] = useState(false); // État pour émargement
  const [signature, setSignature] = useState(null); // Stocke la signature
  const signatureRef = useRef(null);

  // Fonction pour valider la signature
  const handleSignature = (signature) => {
    setSignature(signature);
    setIsSigningModalVisible(false); // Fermer la modal après signature
    setIsSignedIn(true); // Valider l'émargement et passer au vert
  };

  // Effacer la signature
  const handleClear = () => {
    signatureRef.current.clearSignature();
  };

  // Fonction pour retourner en arrière sans signer
  const handleCancel = () => {
    setIsSigningModalVisible(false); // Fermer la modal sans valider
  };

  const selectMood = (selectedMood) => {
    setEmployeeStats({
      ...employeeStats,
      mood: selectedMood.mood,
      moodColor: selectedMood.color,
      emoji: selectedMood.emoji,
    });
    setMoodPickerVisible(false); // Fermer le menu déroulant après sélection
  };

  return (
    <View style={styles.container}>
      {/* Icone de profil en haut à droite */}
      <TouchableOpacity style={styles.profileIcon}>
        <Image 
          source={require('../../assets/images/home.png')} 
          style={styles.profileImage} 
        />
      </TouchableOpacity>

      {/* Section Onboarding */}
      <TouchableOpacity 
        style={[styles.section, styles.onboarding]} 
        onPress={() => router.push('/onboarding')}
      >
        <Image 
          source={require('../../assets/images/Screenshot_7.png')} 
          style={styles.onboardingImage}
          resizeMode="cover"
        />
      </TouchableOpacity>

      {/* Section Stat cliquables avec animation */}
      <View style={styles.row}>
        {/* Menu déroulant pour le choix de l'humeur */}
        <Animatable.View animation="fadeIn" duration={1500} style={styles.animatableContainer}>
          <TouchableOpacity 
            style={[styles.sectionSmall, { backgroundColor: employeeStats.moodColor, zIndex: 1 }]} 
            onPress={() => setMoodPickerVisible(!isMoodPickerVisible)}
          >
            <Text style={styles.sectionText}>Humeur: {employeeStats.emoji}</Text>
          </TouchableOpacity>

          {isMoodPickerVisible && (
            <View style={styles.moodPicker}>
              {[
                { mood: 'Motivé', color: 'green', emoji: '😀' },
                { mood: 'Neutre', color: 'orange', emoji: '😐' },
                { mood: 'Fatigué', color: 'red', emoji: '😔' },
              ].map((moodOption, index) => (
                <TouchableOpacity 
                  key={index} 
                  style={styles.moodOption} 
                  onPress={() => selectMood(moodOption)}
                >
                  <Text style={styles.moodOptionText}>{moodOption.emoji} {moodOption.mood}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </Animatable.View>

        {/* Bouton d'émargement */}
        <Animatable.View animation="fadeIn" delay={500} duration={1500} style={styles.animatableContainer}>
          <TouchableOpacity 
            style={[styles.sectionSmall, { backgroundColor: isSignedIn ? 'green' : 'red', zIndex: 1 }]} 
            onPress={() => setIsSigningModalVisible(true)} // Ouvre la modal de signature
          >
            <Text style={styles.sectionText}>{isSignedIn ? 'Signé' : 'Émarger'}</Text>
          </TouchableOpacity>
        </Animatable.View>
      </View>

      {/* Modal de signature */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isSigningModalVisible}
        onRequestClose={() => setIsSigningModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.signatureBox}>
            <Text style={styles.modalText}>Veuillez signer ci-dessous :</Text>

            <SignatureCanvas
              ref={signatureRef}
              onOK={handleSignature}
              onEmpty={() => alert('Signature non valide')}
              descriptionText="Signer ici"
              clearText="Effacer"
              confirmText="Valider"
              webStyle={`.m-signature-pad {box-shadow: none; border: 1px solid #000;}`}
              style={styles.signatureCanvas}
            />

            {/* Boutons pour valider ou effacer */}
            <View style={styles.buttonRow}>
              <TouchableOpacity style={styles.clearButton} onPress={handleClear}>
                <Text style={styles.buttonText}>Effacer</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.confirmButton} onPress={handleCancel}>
                <Text style={styles.buttonText}>Annuler</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Section Boutique */}
      <TouchableOpacity 
        style={[styles.section, styles.boutique]} 
        onPress={() => router.push('/pageachat')}
      >
        <Image 
          source={require('../../assets/images/Screenshot_1.png')} 
          style={styles.boutiqueImage}
          resizeMode="cover"
        />
      </TouchableOpacity>
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
  section: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 20,
  },
  onboarding: {
    backgroundColor: '#E5E2FF',
    borderRadius: 10,
    overflow: 'hidden',
  },
  onboardingImage: {
    width: '100%',
    height: '100%',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    zIndex: 1,
  },
  animatableContainer: {
    flex: 0.5,
    marginHorizontal: 5,
    minHeight: 80,
    justifyContent: 'center',
    zIndex: 1,
  },
  sectionSmall: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 10,
    minHeight: 60,
    minWidth: 60,
    zIndex: 1,
  },
  moodPicker: {
    position: 'absolute',
    top: 70,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    elevation: 5,
    zIndex: 10,
  },
  moodOption: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  moodOptionText: {
    fontSize: 16,
  },
  boutique: {
    backgroundColor: '#D9E2EC',
    borderRadius: 10,
    overflow: 'hidden',
  },
  boutiqueImage: {
    width: '100%',
    height: '100%',
  },
  sectionText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  signatureBox: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    width: '90%',
    height: '50%',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 10,
  },
  signatureCanvas: {
    width: '100%',
    height: 200,
    borderColor: '#000',
    borderWidth: 1,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
  clearButton: {
    backgroundColor: '#ff4d4d',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  confirmButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
});
