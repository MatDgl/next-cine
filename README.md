# NextCine - Gestion de collection de films et séries

## Description

NextCine permet de gérer une collection de films et séries avec des fonctionnalités de notation et de filtrage.

## Technologies utilisées

- **Next.js 15** avec App Router
- **React 18**
- **TypeScript**
- **Material UI (MUI)** pour l'interface utilisateur

## Fonctionnalités

### ✅ Implémentées
- Interface avec Material UI
- Navigation avec Navbar responsive
- Pages Films et Séries avec onglets
- Composant Card pour afficher les films/séries
- Système de notation avec étoiles interactives
- Filtres (tri, notes, statut des séries)
- Context pour la gestion des filtres
- Données de test pour démonstration

### 🔄 En développement
- Connexion à l'API backend
- Recherche de films/séries
- Page de détail pour chaque film/série
- Authentification

## Structure du projet

```
src/
├── app/                   # Pages Next.js (App Router)
│   ├── layout.tsx         # Layout principal avec providers
│   ├── page.tsx           # Page d'accueil avec onglets
│   └── wish/              # Page "Envies de voir"
├── components/
│   ├── pages/             # Composants de pages
│   └── shared/            # Composants réutilisables
├── contexts/              # Contexts React
├── services/              # Services pour la logique métier
├── theme/                 # Thème Material UI
└── types/                 # Types TypeScript
```

## Installation et démarrage

1. Installer les dépendances :
```bash
npm install
```

2. Lancer le serveur de développement :
```bash
npm run dev
```

3. Ouvrir http://localhost:3000 dans le navigateur

## API

L'application utilise actuellement des données mock.
Pour connecter à une vraie API, modifier le service dans `src/services/movieService.ts` et décommenter les appels fetch.

Structure attendue de l'API :
- `GET /movie` - Liste des films
- `GET /movie/:id` - Film par ID
- `PUT /movie/:id` - Mise à jour d'un film
- `GET /series` - Liste des séries (à implémenter)

## Scripts disponibles

- `npm run dev` - Serveur de développement
- `npm run build` - Build de production
- `npm run start` - Serveur de production
- `npm run lint` - Linting du code
