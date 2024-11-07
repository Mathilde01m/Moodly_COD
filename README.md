# Moodly_COD
---
Moodly_COD est une application mobile développée avec React Native et Expo, utilisant Strapi comme backend API. L'application permet aux utilisateurs de se connecter avec des rôles spécifiques (Manager ou Employé) et d'accéder à des pages dédiées en fonction de leur rôle.

## Table des matières

- [Technologies](#technologies)
- [Installation](#installation)
- [Configuration](#configuration)
- [Fonctionnalités](#fonctionnalités)
- [Structure des rôles](#structure-des-rôles)
- [API](#api)
- [Déploiement](#déploiement)
- [Contribuer](#contribuer)

---

## Technologies

Le projet utilise les technologies suivantes :

- **React Native** (avec Expo) : pour le développement de l'interface utilisateur mobile.
- **Strapi** : en tant qu'API backend, qui se trouve sur git@github.com:Mathilde01m/moondlyData.git
- **JWT** : pour l'authentification et la gestion des sessions utilisateur.

## Installation

1. **Cloner le projet :**

   ```bash
   git clone https://github.com/votre-repo/Moodly_COD.git
   cd Moodly_COD
   ```

2. **Installer les dépendances du projet :**

   ```bash
   npm install
   ```

3. **Démarrer le serveur Strapi :**

   - Naviguez dans le dossier de votre projet backend Strapi et lancez-le avec :

     ```bash
     npm run develop
     ```

4. **Démarrer l'application Expo :**

   ```bash
   npx expo start
   ```

## Configuration

Dans le fichier de configuration du projet (par exemple, `.env`), définissez les variables suivantes :

- `API_BASE_URL` : L'API chatGPT.
- `JWT_SECRET` : La clé secrète utilisée pour signer les jetons JWT (correspond à celle configurée dans Strapi).

## Fonctionnalités

- **Authentification JWT** : Les utilisateurs peuvent se connecter et recevoir un jeton JWT pour la gestion de la session.
- **Redirection basée sur les rôles** : Les utilisateurs sont redirigés vers différentes pages en fonction de leur rôle (Manager ou Employé).
- **Gestion des utilisateurs** : Récupération des informations de profil utilisateur via l'API Strapi.

## Structure des rôles

Le rôle de chaque utilisateur est déterminé par le champ `role.id` dans la réponse de l'API :

- **Manager** : `role.id` = 0
- **Employé** : `role.id` = 1

Après la connexion, l'application redirige automatiquement les utilisateurs en fonction de leur rôle :
- **Managers** sont redirigés vers `/manager/home`.
- **Employés** sont redirigés vers `/tabs/mail`.

## API

### Endpoints principaux

- **POST /auth/local** : Authentification utilisateur.
- **GET /users/me?populate=role** : Récupère les détails de l'utilisateur connecté et son rôle.

### Exemple de réponse de connexion

```json
{
  "data": {
    "id": 21,
    "username": "Teste5",
    "email": "teste5@gmail.com",
    "role": {
      "id": 1,
      "name": "Employé"
    }
  },
  "jwt": "votre_token_jwt"
}
```

### Utilisation des rôles dans le code

```javascript
const roleId = user.data.role?.id;
if (roleId === 0) {
  router.push('./manager/home');
} else if (roleId === 1) {
  router.push('./tabs/mail');
} else {
  Alert.alert('Erreur', 'Rôle d’utilisateur non reconnu.');
}
```

## Déploiement

1. **Strapi** : Déployez le backend sur un serveur (par exemple, DigitalOcean, Heroku, etc.) et configurez l'URL de l'API dans l'application.
2. **Expo** : Vous pouvez publier l'application en utilisant Expo, ou la compiler en tant qu'application native pour iOS et Android.

## Contribuer

Les contributions sont les bienvenues ! Suivez les étapes ci-dessous pour contribuer :

1. Forkez le projet.
2. Créez une branche (`git checkout -b feature/nom-fonctionnalité`).
3. Commitez vos changements (`git commit -am 'Ajout d'une nouvelle fonctionnalité'`).
4. Poussez votre branche (`git push origin feature/nom-fonctionnalité`).
5. Ouvrez une Pull Request.

## Licence

Ce projet est sous licence MIT. Consultez le fichier `LICENSE` pour plus d’informations.

---

Ce `README` donne une vue d'ensemble du projet et facilite la configuration et le développement pour les nouveaux contributeurs. N'hésitez pas à l'ajuster en fonction des détails spécifiques de votre projet Moodly_COD.
