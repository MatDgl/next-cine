'use client';

import { useEffect } from 'react';
import { suppressDevErrors } from '@/utils/suppressDevErrors';

/**
 * Composant qui supprime les erreurs de développement non critiques
 * uniquement en mode développement
 */
export default function DevErrorSuppressor() {
  useEffect(() => {
    suppressDevErrors();
  }, []);

  return null; // Ce composant n'affiche rien
}
