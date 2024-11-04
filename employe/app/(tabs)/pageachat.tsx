import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Achat from '../../components/navigation/achat'; // Assurez-vous que le chemin est correct
import SearchResults from '../../components/SearchResults'; // Import du composant de résultats de recherche
import { useRouter } from 'expo-router'; // Utilisation de useRouter pour la navigation
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';

export default function PageAchat() {
  const [texteRecherche, setTexteRecherche] = useState('');
  const [produitSelectionne, setProduitSelectionne] = useState(null); // État pour le produit sélectionné
  const router = useRouter(); // Initialiser useRouter pour naviguer

  // Animation values
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(50);

  // Start animation when component is mounted
  useEffect(() => {
    opacity.value = withTiming(1, { duration: 500 });
    translateY.value = withTiming(0, { duration: 500 });
  }, []);

  // Animated styles
  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [{ translateY: translateY.value }],
    };
  });

  // Liste des produits
  const produits = [
    { id: 1, nom: 'Iphone 14', prix: '$999', type: 'Téléphone', image: require('../../assets/images/iphone14.png') },
    { id: 2, nom: 'Pixel Watch', prix: '$300', type: 'Accessoire', image: require('../../assets/images/pixel-watch (1).png') },
    { id: 3, nom: 'Samsung Galaxy S21', prix: '$799', type: 'Téléphone', image: require('../../assets/images/samsungS21.png') },
    { id: 4, nom: 'Sony WH-1000XM4', prix: '$350', type: 'Casque', image: require('../../assets/images/Sony-WH-1000XM4.png') },
    { id: 5, nom: 'MacBook Pro', prix: '$1299', type: 'Ordinateur', image: require('../../assets/images/macbookpro.png') },
    { id: 6, nom: 'Sony A7 III', prix: '$1999', type: 'Cinéma', image: require('../../assets/images/Sony-A7-III.png') },
    { id: 7, nom: 'GoPro Hero 9', prix: '$399', type: 'Cinéma', image: require('../../assets/images/GoPro-Hero-9.png') },
    { id: 8, nom: 'Apple AirPods', prix: '$199', type: 'Accessoire', image: require('../../assets/images/Apple AirPods.png') },
    { id: 9, nom: 'Huawei Mate 40', prix: '$699', type: 'Téléphone', image: require('../../assets/images/Huawei Mate 40.png') },
    { id: 10, nom: 'iMac 27"', prix: '$1799', type: 'Ordinateur', image: require('../../assets/images/iMac 27.png') },
  ];

  const nouveauxProduits = [
    { id: 13, nom: 'iPhone 15', prix: '$1099', type: 'Téléphone', image: require('../../assets/images/iphone14.png') },
    { id: 14, nom: 'Oculus Quest 2', prix: '$399', type: 'VR', image: require('../../assets/images/iphone14.png') },
    { id: 15, nom: 'Huawei P50', prix: '$599', type: 'Téléphone', image: require('../../assets/images/iphone14.png') },
    { id: 16, nom: 'Samsung Galaxy Buds', prix: '$149', type: 'Accessoire', image: require('../../assets/images/iphone14.png') },
    { id: 17, nom: 'Xbox Series X', prix: '$499', type: 'Console', image: require('../../assets/images/iphone14.png') },
    { id: 18, nom: 'PS5', prix: '$499', type: 'Console', image: require('../../assets/images/iphone14.png') },
  ];

  const produitsEnPromotion = [
    { id: 22, nom: 'Dell XPS 13', prix: '$999', type: 'Ordinateur', image: require('../../assets/images/iphone14.png') },
    { id: 23, nom: 'Sony WH-1000XM5', prix: '$299', type: 'Casque', image: require('../../assets/images/iphone14.png') },
    { id: 24, nom: 'GoPro Hero 8', prix: '$299', type: 'Cinéma', image: require('../../assets/images/iphone14.png') },
  ];

  const produitsRecommandes = [
    { id: 29, nom: 'iPad Pro', prix: '$1099', type: 'Tablette', image: require('../../assets/images/iphone14.png') },
    { id: 30, nom: 'Bose QuietComfort 45', prix: '$349', type: 'Casque', image: require('../../assets/images/iphone14.png') },
    { id: 31, nom: 'Lenovo ThinkPad', prix: '$1299', type: 'Ordinateur', image: require('../../assets/images/iphone14.png') },
    { id: 32, nom: 'Apple Watch Series 7', prix: '$399', type: 'Accessoire', image: require('../../assets/images/iphone14.png') },
  ];

  // Fonction appelée lorsque l'utilisateur sélectionne un produit
  const handleProductClick = (produit) => {
    setProduitSelectionne(produit); // Mise à jour de l'état avec le produit sélectionné
  };

  // Fonction pour réinitialiser la sélection de produit et revenir à la page précédente
  const handleRetour = () => {
    setProduitSelectionne(null); // Réinitialiser la sélection
    router.back(); // Revenir à la page précédente
  };

  // Filtrer les produits en fonction du texte de recherche
  const produitsFiltres = produits
    .concat(nouveauxProduits, produitsEnPromotion, produitsRecommandes)
    .filter((produit) =>
      produit.nom.toLowerCase().includes(texteRecherche.toLowerCase())
    );

  // Si un produit est sélectionné, afficher sa fiche détaillée
  if (produitSelectionne) {
    return (
      <View style={styles.container}>
        <Achat produit={produitSelectionne} onRetour={handleRetour} />
      </View>
    );
  }

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <ScrollView>
        {/* Flèche de retour en haut à gauche */}
        <TouchableOpacity style={styles.backButton} onPress={handleRetour}>
          <Icon name="arrow-back-outline" size={30} color="#000" />
        </TouchableOpacity>

        {/* Barre de recherche */}
        <View style={styles.searchBar}>
          <TextInput
            style={styles.searchInput}
            placeholder="Rechercher"
            value={texteRecherche}
            onChangeText={texte => setTexteRecherche(texte)}
          />
        </View>

        {/* Affichage des résultats de la recherche si du texte est présent dans la barre */}
        {texteRecherche ? (
          <SearchResults produitsFiltres={produitsFiltres} onProductClick={handleProductClick} />
        ) : (
          <>
            {/* Section Meilleures ventes */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Meilleures ventes</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.productsContainer}>
                {produits.map(produit => (
                  <TouchableOpacity key={produit.id} onPress={() => handleProductClick(produit)} style={styles.productBox}>
                    <Image source={produit.image} style={styles.productImage} />
                    <Text style={styles.productName}>{produit.nom}</Text>
                    <Text style={styles.productPrice}>{produit.prix}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            {/* Section Nouveaux produits */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Nouveaux produits</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.productsContainer}>
                {nouveauxProduits.map(produit => (
                  <TouchableOpacity key={produit.id} onPress={() => handleProductClick(produit)} style={styles.productBox}>
                    <Image source={produit.image} style={styles.productImage} />
                    <Text style={styles.productName}>{produit.nom}</Text>
                    <Text style={styles.productPrice}>{produit.prix}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            {/* Section Produits en promotion */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Produits en promotion</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.productsContainer}>
                {produitsEnPromotion.map(produit => (
                  <TouchableOpacity key={produit.id} onPress={() => handleProductClick(produit)} style={styles.productBox}>
                    <Image source={produit.image} style={styles.productImage} />
                    <Text style={styles.productName}>{produit.nom}</Text>
                    <Text style={styles.productPrice}>{produit.prix}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            {/* Section Produits recommandés */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Produits recommandés</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.productsContainer}>
                {produitsRecommandes.map(produit => (
                  <TouchableOpacity key={produit.id} onPress={() => handleProductClick(produit)} style={styles.productBox}>
                    <Image source={produit.image} style={styles.productImage} />
                    <Text style={styles.productName}>{produit.nom}</Text>
                    <Text style={styles.productPrice}>{produit.prix}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </>
        )}
      </ScrollView>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 10,
    zIndex: 10,
  },
  searchBar: {
    marginBottom: 20,
    borderRadius: 10,
    backgroundColor: '#f0f0f0',
    padding: 10,
    marginTop: 60,
  },
  searchInput: {
    fontSize: 16,
    color: '#333',
  },
  section: {
    marginBottom: 40,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  productsContainer: {
    flexDirection: 'row',
  },
  productBox: {
    width: 100,
    height: 150,
    borderRadius: 10,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
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
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 5,
  },
  productPrice: {
    fontSize: 12,
    color: '#666',
  },
});
 

      