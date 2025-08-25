applyTo: "**"

# Instructions Copilot pour ce projet

## RÈGLES DE REFACTORISATION
- Créer des imports/exports appropriés
- Maintenir la même structure logique
- ❌ NE JAMAIS modifier les textes affichés à l'utilisateur
- ❌ NE JAMAIS changer le comportement fonctionnel

### **RÈGLES DE MODIFICATION DE FICHIERS** :
- ❌ NE JAMAIS créer de fichiers temporaires (`page_new.tsx`, `page_backup.tsx`, etc.)
- ✅ Modifier directement les fichiers existants en place
- ✅ Utiliser uniquement les outils d'édition disponibles (`replace_string_in_file`, `edit_notebook_file`)
- ✅ Effectuer les modifications par petites étapes si nécessaire

### **OBJECTIFS AUTORISÉS** :
- ✅ Réduire le nombre de lignes du fichier principal
- ✅ Corriger les erreurs TypeScript/ESLint

### **VALIDATION** :
- Le résultat final doit être visuellement et fonctionnellement identique
- Seule l'organisation du code doit changer
- Demander confirmation avant tout changement d'apparence
- Tester que l'application compile sans erreurs

### **EN CAS DE DOUTE** :
- Toujours demander avant de modifier l'interface
- Proposer la refactorisation étape par étape

## RÈGLES D'EXÉCUTION DES COMMANDES

- ✅ Ne pas attendre d'appui sur "Continuer" pour les lignes de commande
- ✅ Enchaîner les commandes nécessaires pour accomplir la tâche
### **Exceptions nécessitant confirmation** :
- ⚠️ Suppression de fichiers importants
- ⚠️ Modification de configuration système
- ⚠️ Installation de nouvelles dépendances majeures
- ⚠️ Changements irréversibles

## CONTEXTE DU PROJET

### **Description** :
NextCine est une application web Next.js pour gérer une collection de films et séries. L'application utilise Material-UI pour l'interface utilisateur et TypeScript pour le typage.

### **Stack technique** :
- **Framework** : Next.js 15.4.2 avec App Router
- **Langage** : TypeScript 5
- **UI Library** : Material-UI (MUI) v7.2.0
- **Runtime** : React 19.1.0
- **Styling** : Emotion + CSS globaux
- **Build tool** : Turbopack (mode dev)

### **Architecture** :
- `src/app/` : Pages et layouts (App Router)
- `src/components/` : Composants réutilisables (shared) et pages
- `src/contexts/` : Contextes React
- `src/services/` : Services pour données (movies, series)
- `src/types/` : Définitions TypeScript
- `src/theme/` : Configuration Material-UI

## CONVENTIONS DE CODE

### **Nommage** :
- ✅ Fichiers : PascalCase pour les composants (`Card.tsx`, `MoviesPage.tsx`)
- ✅ Fichiers services : camelCase (`movieService.ts`, `serieService.ts`)
- ✅ Variables/fonctions : camelCase
- ✅ Interfaces/Types : PascalCase (`Movie`, `Serie`)
- ✅ Enums : PascalCase avec valeurs en UPPERCASE (`SortOption.LASTMODIFIED`)

### **Structure des composants** :
```typescript
// Import order: React, Next.js, MUI, internal
import React from 'react';
import { Box, Typography } from '@mui/material';
import type { Movie } from '@/types/models';

// Interface props avant le composant
interface ComponentProps {
  movie: Movie;
}

// Composant fonctionnel avec typage explicite
const Component: React.FC<ComponentProps> = ({ movie }) => {
  return (
    <Box>
      <Typography>{movie.title}</Typography>
    </Box>
  );
};

export default Component;
```

### **Gestion des données** :
- ✅ Types définis dans `src/types/models.ts`
- ✅ Services séparés pour movies et series
- ✅ Contextes pour état global (FiltersContext)
- ✅ Props typées strictement

## RÈGLES SPÉCIFIQUES AU PROJET

### **Material-UI** :
- ✅ Utiliser les composants MUI systématiquement
- ✅ Utiliser les icônes MUI pour les icônes
- ✅ Respecter le thème défini dans `src/theme/`
- ✅ Utiliser `sx` prop pour les styles personnalisés
- ✅ Préférer `Box` comme conteneur générique
- ❌ Éviter les styles CSS inline classiques

### **Images et assets** :
- ✅ Images dans `public/assets/img/`
- ✅ Images de films dans `public/assets/img/movie/`
- ✅ Utiliser `next/image` pour l'optimisation
- ✅ Chemins relatifs depuis `/assets/`

### **Navigation** :
- ✅ App Router Next.js (pas de Pages Router)
- ✅ Fichiers `page.tsx` dans `src/app/`
- ✅ Navigation via `next/navigation` (useRouter, Link)

### **État et contextes** :
- ✅ FiltersContext pour les filtres globaux
- ✅ Props drilling minimal grâce aux contextes
- ✅ État local pour composants isolés

## QUALITÉ ET MAINTENANCE

### **TypeScript** :
- ✅ Mode strict activé
- ✅ Typage explicite des props et fonctions
- ✅ Éviter `any`, utiliser `unknown` si nécessaire
- ✅ Interfaces pour les structures de données
- ✅ Enums pour les valeurs constantes

### **Performances** :
- ✅ Lazy loading des composants si nécessaire
- ✅ Memoization avec `React.memo` pour composants lourds
- ✅ Optimisation des images avec `next/image`
- ✅ Éviter les re-renders inutiles

### **Accessibilité** :
- ✅ Attributs ARIA appropriés
- ✅ Navigation clavier fonctionnelle
- ✅ Contraste des couleurs respecté
- ✅ Labels descriptifs pour les éléments interactifs

### **Tests et validation** :
- ✅ Compiler sans erreurs TypeScript
- ✅ Linter ESLint sans warnings
- ✅ Aucun bug ou erreur SonarQube (qualité et sécurité)
- ✅ Tester manuellement les fonctionnalités modifiées
- ✅ Vérifier la responsivité mobile

## WORKFLOW DE DÉVELOPPEMENT

### **Avant chaque modification** :
1. Comprendre le contexte existant
2. Identifier les fichiers impactés
3. Vérifier les types et interfaces
4. Respecter les conventions établies

### **Après chaque modification** :
1. Vérifier la compilation TypeScript
2. Tester l'application en mode dev
3. Valider l'interface utilisateur
4. Documenter les changements importants

### **Résolution d'erreurs** :
- ✅ Analyser les erreurs TypeScript en priorité
- ✅ Vérifier les imports et exports
- ✅ Valider les types des props
- ✅ Tester les chemins d'assets


## 🔧 GESTION DES SERVEURS DE DÉVELOPPEMENT

### **Avant de lancer un nouveau serveur :**
 ✅ Utiliser le serveur existant si possible
 ✅ Ne relancer que si nécessaire (changements config, erreurs)