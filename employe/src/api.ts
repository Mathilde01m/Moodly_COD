import axios from 'axios';

// Configure l'URL de l'API Strapi
const API_URL = 'http://10.76.203.111:1337/api'; // Remplace par l'URL de ton backend Strapi si nécessaire

// Crée une instance Axios avec des paramètres par défaut
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Fonction pour l'inscription
export const registerUser = async (userData) => {
  return await api.post('/users', userData);
};

// Fonction pour la connexion
export const loginUser = async (userData) => {
  // Utilise le bon point de terminaison pour l'authentification
  return await api.post('/auth/local', userData);
};

// Fonction pour récupérer les détails de l'utilisateur avec son ID et le JWT
export const getUserDetails = async (token) => {
  try {
    const response = await api.get(`/users/me?populate=role`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.error("Erreur lors de la récupération des détails de l'utilisateur :", error.response?.data || error.message);
    throw error;
  }
};


export default api;
