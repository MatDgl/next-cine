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
};

export default nextConfig;
