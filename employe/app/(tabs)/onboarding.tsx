// components/navigation/OnboardingScreen.js
import React, { useState, useRef, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Animated, Dimensions } from 'react-native';
import { useRouter } from 'expo-router'; // Importe useRouter pour la navigation
import { Ionicons } from '@expo/vector-icons'; // Icône de flèche pour revenir en arrière

const { width } = Dimensions.get('window'); // Obtenir la taille de l'écran pour l'animation

export default function OnboardingScreen() {
  const router = useRouter(); // Initialiser useRouter pour naviguer
  const [currentStep, setCurrentStep] = useState(0); // Utiliser un état pour suivre l'étape actuelle

  // Valeurs animées pour les transitions
  const fadeAnim = useRef(new Animated.Value(0)).current; // Valeur pour l'opacité
  const translateXAnim = useRef(new Animated.Value(0)).current; // Animation de translation
  const scaleAnim = useRef(new Animated.Value(1)).current; // Animation de mise à l'échelle
  const rotateAnim = useRef(new Animated.Value(0)).current; // Animation de rotation

  // Contenu de chaque étape de l'onboarding
  const onboardingSteps = [
    {
      title: "Bienvenue dans l'équipe ! 🎉",
      description: "Découvrez les outils pour bien démarrer en tant que community manager.",
      image: require('../../assets/images/onboarding1.png'),
      emoji: "🎉", // Émoticône pour l'effet visuel
      transition: 'slide', // Transition associée à l'étape
    },
    {
      title: "Gérez vos publications 📅",
      description: "Planifiez facilement votre contenu et engagez votre communauté.",
      image: require('../../assets/images/onboarding2.png'),
      emoji: "❤️", // Émoticône pour l'effet visuel
      transition: 'zoom', // Transition associée à l'étape
    },
    {
      title: "Analysez les performances 📊",
      description: "Suivez les statistiques et ajustez votre stratégie.",
      image: require('../../assets/images/onboarding3.png'),
      emoji: "📊", // Émoticône pour l'effet visuel
      transition: 'rotate', // Transition associée à l'étape
    },
  ];

  // Fonction pour passer à l'étape suivante avec animation
  const handleNextStep = () => {
    if (currentStep < onboardingSteps.length - 1) {
      animateTransition(() => setCurrentStep(currentStep + 1), onboardingSteps[currentStep].transition);
    } else {
      setCurrentStep(0); // Réinitialise l'onboarding après la dernière étape
      router.push('/'); // Redirection à la fin de l'onboarding (page d'accueil ou une autre page)
    }
  };

  // Fonction pour revenir à l'étape précédente avec animation
  const handlePreviousStep = () => {
    if (currentStep > 0) {
      animateTransition(() => setCurrentStep(currentStep - 1), onboardingSteps[currentStep].transition);
    } else {
      router.back(); // Revenir à la page précédente si c'est la première étape
    }
  };

  // Fonction pour animer la transition en fonction du type d'animation
  const animateTransition = (callback, transitionType) => {
    const animations = {
      slide: [
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(translateXAnim, {
          toValue: -width,
          duration: 300,
          useNativeDriver: true,
        }),
      ],
      zoom: [
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 0.8,
          duration: 300,
          useNativeDriver: true,
        }),
      ],
      rotate: [
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(rotateAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ],
    };

    Animated.parallel(animations[transitionType]).start(() => {
      callback(); // Changer l'étape après la fin de l'animation

      // Réinitialiser les animations pour la nouvelle étape
      fadeAnim.setValue(0);
      translateXAnim.setValue(0);
      scaleAnim.setValue(1);
      rotateAnim.setValue(0);

      // Lancer l'animation d'apparition
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(translateXAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(rotateAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    });
  };

  useEffect(() => {
    // Démarre l'animation initiale après le rendu
    setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }, 100); // Retarder légèrement le démarrage pour éviter les bugs d'affichage
  }, []);

  return (
    <View style={styles.container}>
      {/* Flèche pour revenir en arrière */}
      <TouchableOpacity style={styles.backButton} onPress={handlePreviousStep}>
        <Ionicons name="arrow-back" size={30} color="#000" />
      </TouchableOpacity>

      {/* Contenu de l'onboarding avec transition */}
      <Animated.View
        style={[
          styles.animatedContainer,
          {
            opacity: fadeAnim,
            transform: [
              { translateX: translateXAnim },
              { scale: scaleAnim },
              { rotate: rotateAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0deg', '360deg'],
                })
              },
            ],
          },
        ]}
      >
        <Image
          source={onboardingSteps[currentStep].image}
          style={[
            styles.image,
            styles.roundedImage, // Appliquer l'arrondissement pour toutes les images
          ]}
        />
        <Text style={styles.title}>{onboardingSteps[currentStep].title}</Text>
        <Text style={styles.description}>{onboardingSteps[currentStep].description}</Text>
        {/* Emoticône */}
        <Text style={styles.emoji}>{onboardingSteps[currentStep].emoji}</Text>
      </Animated.View>

      {/* Bouton Suivant */}
      <TouchableOpacity style={styles.button} onPress={handleNextStep}>
        <Text style={styles.buttonText}>
          {currentStep < onboardingSteps.length - 1 ? 'Suivant' : 'Commencer'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 10,
  },
  animatedContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
    marginBottom: 30,
  },
  roundedImage: {
    borderRadius: 20, // Arrondir les angles des images pour toutes les étapes
    borderWidth: 2, // Ajouter une bordure autour de l'image
    borderColor: '#3E289B', // Couleur de la bordure
    shadowColor: '#000', // Ombre légère
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    overflow: 'hidden',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
    marginBottom: 30,
  },
  emoji: {
    fontSize: 40,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#3E289B',
    padding: 15,
    borderRadius: 30,
    alignItems: 'center',
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
