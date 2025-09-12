import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  // Désactiver les source maps pour éviter les erreurs de développement
  productionBrowserSourceMaps: false,
  // Configuration pour réduire les erreurs de console en développement
  experimental: {
    // Désactiver les warnings de source maps manquantes
    optimizePackageImports: ['@mui/material', '@mui/icons-material'],
  },
  // Configuration pour servir avec nginx en mode standalone (Build pour Docker/K8s)
  output: 'standalone',
};

export default nextConfig;
