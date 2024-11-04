import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const SearchResults = ({ produitsFiltres, onProductClick }) => {
  return (
    <View style={styles.resultsContainer}>
      {produitsFiltres.length > 0 ? (
        produitsFiltres.map(produit => (
          <TouchableOpacity key={produit.id} onPress={() => onProductClick(produit)} style={styles.productBox}>
            {produit.image && (
              <Image source={produit.image} style={styles.productImage} />
            )}
            <Text style={styles.productName}>{produit.nom}</Text>
            <Text style={styles.productPrice}>{produit.prix}</Text>
          </TouchableOpacity>
        ))
      ) : (
        <Text style={styles.noResultsText}>Aucun résultat trouvé</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  resultsContainer: {
    marginTop: 20,
  },
  productBox: {
    width: '100%',
    borderRadius: 10,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  productImage: {
    width: 80,
    height: 80,
    marginBottom: 10,
    resizeMode: 'contain',
  },
  productName: {
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 5,
  },
  productPrice: {
    fontSize: 14,
    color: '#666',
  },
  noResultsText: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default SearchResults;
