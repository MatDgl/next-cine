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
}
