import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Import de l'icône de flèche (par exemple, Ionicons)

export default function Achat({ produit, onRetour, onAchat }) {
  return (
    <View style={styles.container}>
      {/* Flèche de retour en haut à gauche */}
      <TouchableOpacity onPress={onRetour} style={styles.arrowBack}>
        <Ionicons name="arrow-back" size={24} color="#000" />
      </TouchableOpacity>

      {/* Détails du produit */}
      <View style={styles.detailsContainer}>
        {/* Image du produit */}
        <Image source={produit.image} style={styles.productImage} />

        <Text style={styles.productName}>{produit.nom}</Text>
        <Text style={styles.productPrice}>{produit.prix}</Text>
        <Text style={styles.productType}>Catégorie : {produit.type}</Text>

        <Text style={styles.productDescription}>
          {produit.nom} est un excellent produit dans la catégorie {produit.type}.
          Il est disponible au prix de {produit.prix}.
        </Text>
      </View>

      {/* Bouton d'achat */}
      <TouchableOpacity onPress={onAchat} style={styles.achatButton}>
        <Text style={styles.achatButtonText}>Acheter</Text>
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
  arrowBack: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 1, // S'assurer que la flèche est par-dessus les autres éléments
  },
  detailsContainer: {
    flex: 1,  // Prend tout l'espace disponible au-dessus du bouton d'achat
    marginTop: 60, // Pour laisser la place à la flèche de retour
  },
  productImage: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  productPrice: {
    fontSize: 20,
    color: '#888',
    marginBottom: 10,
  },
  productType: {
    fontSize: 18,
    color: '#555',
    marginBottom: 20,
  },
  productDescription: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
  },
  achatButton: {
    backgroundColor: '#3E289B',
    padding: 15,
    borderRadius: 5,
    position: 'absolute',  // Positionner le bouton de façon absolue
    bottom: 20,            // 20px à partir du bas de l'écran
    left: 20,
    right: 20,
  },
  achatButtonText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
});
