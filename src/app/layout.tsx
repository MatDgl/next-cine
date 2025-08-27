import type { Metadata } from 'next';
import './globals.css';
import MuiProvider from '@/theme/MuiProvider';
import { FiltersProvider } from '@/contexts/FiltersContext';
import Navbar from '@/components/shared/Navbar';

export const metadata: Metadata = {
  title: 'NextCine',
  description: 'Gérez votre collection de films et séries avec NextCine',
};

interface RootLayoutProps {
  readonly children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="fr">
      <body className="antialiased">
        <MuiProvider>
          <FiltersProvider>
            <Navbar />
            {children}
          </FiltersProvider>
        </MuiProvider>
      </body>
    </html>
  );
}
