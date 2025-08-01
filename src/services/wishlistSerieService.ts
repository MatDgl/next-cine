import { Serie } from '@/types/models';

// Données de test pour les séries à voir
const mockWishlistSeries: Serie[] = [
  {
    id: 201,
    title: 'House of the Dragon',
    src: 'image_10',
    followed: false,
    lastModified: '2024-02-18'
  },
  {
    id: 202,
    title: 'The Last of Us',
    src: 'image_11',
    followed: false,
    lastModified: '2024-02-16'
  },
  {
    id: 203,
    title: 'Wednesday',
    src: 'image_13',
    followed: false,
    lastModified: '2024-02-14'
  },
  {
    id: 204,
    title: 'Stranger Things 5',
    src: 'image_14',
    followed: false,
    lastModified: '2024-02-12'
  },
  {
    id: 205,
    title: 'The Bear',
    src: 'image_15',
    followed: false,
    lastModified: '2024-02-09'
  },
  {
    id: 206,
    title: 'Abbott Elementary',
    src: 'image_16',
    followed: false,
    lastModified: '2024-02-06'
  }
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

  static async toggleFollow(id: number): Promise<Serie> {
    const serieIndex = mockWishlistSeries.findIndex(s => s.id === id);
    if (serieIndex === -1) {
      throw new Error('Serie not found in wishlist');
    }
    
    mockWishlistSeries[serieIndex].followed = !mockWishlistSeries[serieIndex].followed;
    mockWishlistSeries[serieIndex].lastModified = new Date().toISOString().split('T')[0];
    
    return mockWishlistSeries[serieIndex];
  }
}
