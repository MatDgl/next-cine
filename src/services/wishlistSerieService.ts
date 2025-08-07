import { Serie } from '@/types/models';

// Données de test pour les séries à voir
const mockWishlistSeries: Serie[] = [
];

export class WishlistSerieService {

  static async getWishlistSeries(): Promise<Serie[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockWishlistSeries);
      }, 500);
    });
  }

  static async getWishlistSerieById(id: number): Promise<Serie> {
    const serie = mockWishlistSeries.find(s => s.id === id);
    if (!serie) {
      throw new Error('Serie not found in wishlist');
    }
    return serie;
  }

  static async addToWishlist(serie: Serie): Promise<Serie> {
    const newSerie = {
      ...serie,
      id: Date.now(),
      followed: false,
      lastModified: new Date().toISOString().split('T')[0]
    };
    mockWishlistSeries.unshift(newSerie);
    return newSerie;
  }

  static async removeFromWishlist(id: number): Promise<void> {
    const index = mockWishlistSeries.findIndex(s => s.id === id);
    if (index !== -1) {
      mockWishlistSeries.splice(index, 1);
    }
  }

  static async toggleWishlist(
    id: number, 
    isCurrentlyInWishlist: boolean,
    allSeries: Serie[],
    setAllSeries: (series: Serie[]) => void
  ): Promise<void> {
    try {
      if (isCurrentlyInWishlist) {
        // Retirer de la wishlist
        await WishlistSerieService.removeFromWishlist(id);
        setAllSeries(allSeries.filter(serie => serie.id !== id));
      } else {
        // Ajouter à la wishlist (cette logique sera implémentée plus tard)
        console.log('Ajouter à la wishlist:', id);
      }
    } catch (err) {
      console.error('Error toggling wishlist:', err);
    }
  }
}
