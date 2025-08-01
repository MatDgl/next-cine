# NextCine - Migration Angular vers Next.js

## Description

NextCine est la version Next.js/React de l'application NgCine (Angular). Cette application permet de gérer une collection de films et séries avec des fonctionnalités de notation et de filtrage.

## Technologies utilisées

- **Next.js 15** avec App Router
- **React 18**
- **TypeScript**
- **Material-UI (MUI)** pour l'interface utilisateur
- **Emotion** pour le styling
- **Tailwind CSS** (inclus avec Next.js)

## Fonctionnalités

### ✅ Implémentées
- Interface avec Material-UI
- Navigation avec Navbar responsive
- Pages Films et Séries avec onglets
- Composant Card pour afficher les films/séries
- Système de notation avec étoiles interactives
- Filtres (tri, notes, statut des séries)
- Context pour la gestion des filtres
- Données de test pour démonstration

### 🔄 En développement
- Connexion à l'API backend
- Page de recherche
- Page "Envies de voir" fonctionnelle
- Upload d'images
- Authentification

## Structure du projet

```
src/
├── app/                    # Pages Next.js (App Router)
│   ├── layout.tsx         # Layout principal avec providers
│   ├── page.tsx           # Page d'accueil avec onglets
│   └── wish/              # Page "Envies de voir"
├── components/
│   ├── pages/             # Composants de pages
│   │   ├── MoviesPage.tsx
│   │   └── SeriesPage.tsx
│   └── shared/            # Composants réutilisables
│       ├── Card.tsx       # Carte de film/série
│       ├── Filters.tsx    # Composants de filtrage
│       ├── Navbar.tsx     # Barre de navigation
│       └── StarRating.tsx # Système de notation
├── contexts/
│   └── FiltersContext.tsx # Context pour les filtres
├── services/
│   └── movieService.ts    # Service API (avec données mock)
├── theme/
│   ├── theme.ts           # Configuration du thème MUI
│   └── MuiProvider.tsx    # Provider MUI
└── types/
    └── models.ts          # Types TypeScript
```

## Correspondance Angular -> Next.js

| Angular | Next.js/React |
|---------|---------------|
| `@Component` | Composants fonctionnels React |
| `@Injectable` services | Classes/fonctions utilitaires |
| Angular Material | Material-UI (MUI) |
| RxJS Observables | React hooks (useState, useEffect) |
| Angular Router | Next.js App Router |
| `@Input()` | Props |
| Template directives (`*ngFor`, `*ngIf`) | JSX avec map(), ternaires |
| Angular Forms | Controlled components |

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

## Migration depuis Angular

Les principales différences lors de la migration :

1. **Gestion d'état** : Remplacement des Observables RxJS par des hooks React
2. **Templating** : Conversion des templates Angular en JSX
3. **Services** : Transformation en fonctions utilitaires ou hooks
4. **Routing** : Utilisation du système de routing de Next.js
5. **Styling** : Migration d'Angular Material vers MUI

## API

L'application utilise actuellement des données mock. Pour connecter à une vraie API, modifier le service dans `src/services/movieService.ts` et décommenter les appels fetch.

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

## Prochaines étapes

1. Implémenter l'API backend
2. Ajouter la fonctionnalité de recherche
3. Compléter la page "Envies de voir"
4. Ajouter l'authentification
5. Optimiser les performances
6. Ajouter des tests
