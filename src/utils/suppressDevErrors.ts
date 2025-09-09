/**
 * Supprime les erreurs de développement non critiques liées aux source maps
 * et aux React DevTools pour une console plus propre.
 */
export const suppressDevErrors = () => {
  if (process.env.NODE_ENV !== 'development') return;

  const originalError = console.error;
  const originalWarn = console.warn;

  // Liste des messages d'erreur à ignorer
  const ignoredErrorPatterns = [
    'installHook.js.map',
    'react_devtools_backend_compact.js.map',
    'request failed with status 404',
    'can\'t access property "sources", map is undefined',
    'anonymous code',
  ];

  console.error = (...args: any[]) => {
    const message = args[0];
    if (typeof message === 'string') {
      const shouldIgnore = ignoredErrorPatterns.some(pattern => 
        message.includes(pattern)
      );
      if (shouldIgnore) return;
    }
    originalError.apply(console, args);
  };

  console.warn = (...args: any[]) => {
    const message = args[0];
    if (typeof message === 'string') {
      const shouldIgnore = ignoredErrorPatterns.some(pattern => 
        message.includes(pattern)
      );
      if (shouldIgnore) return;
    }
    originalWarn.apply(console, args);
  };
};
