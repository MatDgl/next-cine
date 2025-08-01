---
applyTo: "**"
---

# Instructions Copilot pour ce projet

## RÈGLES DE REFACTORISATION

Lors d'une demande de refactorisation de code :

### 1. **EXTRACTION UNIQUEMENT** : 
- Extraire le code existant vers des fichiers/modules séparés
- Déplacer les fonctions, composants et données vers leur propre fichier
- Créer des imports/exports appropriés
- Maintenir la même structure logique

### 2. **INTERDICTIONS STRICTES** :
- ❌ NE JAMAIS modifier l'interface utilisateur visible
- ❌ NE JAMAIS changer les couleurs, styles, ou apparence
- ❌ NE JAMAIS modifier les textes affichés à l'utilisateur
- ❌ NE JAMAIS changer le comportement fonctionnel
- ❌ NE JAMAIS "améliorer" ou "optimiser" sans demande explicite
- ❌ NE JAMAIS modifier les URLs, endpoints, ou configurations
- ❌ NE JAMAIS changer les animations, transitions ou effets visuels

### 3. **OBJECTIFS AUTORISÉS** :
- ✅ Réduire le nombre de lignes du fichier principal
- ✅ Améliorer la structure et l'organisation du code
- ✅ Créer des modules réutilisables
- ✅ Séparer les responsabilités (data, utils, components)
- ✅ Améliorer la lisibilité du code
- ✅ Corriger les erreurs TypeScript/ESLint

### 4. **VALIDATION** :
- Le résultat final doit être visuellement et fonctionnellement identique
- Seule l'organisation du code doit changer
- Demander confirmation avant tout changement d'apparence
- Tester que l'application compile sans erreurs

### 5. **EN CAS DE DOUTE** :
- Toujours demander avant de modifier l'interface
- Expliquer clairement ce qui sera déplacé vs modifié
- Proposer la refactorisation étape par étape
- Privilégier la sécurité (ne pas casser l'existant)

## RÈGLES D'EXÉCUTION DES COMMANDES

### **Exécution automatique** :
- ✅ Exécuter automatiquement les commandes terminal sans demander confirmation
- ✅ Ne pas attendre d'appui sur "Continuer" pour les lignes de commande
- ✅ Enchaîner les commandes nécessaires pour accomplir la tâche
- ✅ Utiliser les outils disponibles de manière autonome
- ✅ Compilation (npm run build) et démarrage du serveur de développement (npm run dev) doivent être effectués sans intervention manuelle

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

## PROMPTS OPTIMAUX

### **Pour les demandes de refactoring** :
"Refactorise [fichier] en extrayant [éléments] vers des modules séparés. Maintient exactement la même interface utilisateur et le même comportement."

### **Pour les nouvelles fonctionnalités** :
"Ajoute [fonctionnalité] en suivant les conventions Material-UI et TypeScript du projet. Utilise les types existants dans models.ts."

### **Pour les corrections** :
"Corrige [problème] en respectant la structure existante et les types TypeScript définis."