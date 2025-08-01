import { Movie } from '@/types/models';

// Données de test pour les films à voir
const mockWishlistMovies: Movie[] = [
  {
    id: 101,
    title: 'Dune: Part Two',
    src: 'image_3',
    lastModified: '2024-02-15'
  },
  {
    id: 102,
    title: 'Oppenheimer',
    src: 'image_4',
    lastModified: '2024-02-10'
  },
  {
    id: 103,
    title: 'Killers of the Flower Moon',
    src: 'image_5',
    lastModified: '2024-02-08'
  },
  {
    id: 104,
    title: 'The Batman',
    src: 'image_6',
    lastModified: '2024-02-05'
  },
  {
    id: 105,
    title: 'Top Gun: Maverick',
    src: 'image_7',
    lastModified: '2024-02-03'
  },
  {
    id: 106,
    title: 'Avatar: The Way of Water',
    src: 'image_9',
    lastModified: '2024-02-01'
  }
];

export class WishlistMovieService {
  static async getWishlistMovies(): Promise<Movie[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockWishlistMovies);
      }, 500);
    });
  }

  static async getWishlistMovieById(id: number): Promise<Movie> {
    const movie = mockWishlistMovies.find(m => m.id === id);
    if (!movie) {
      throw new Error('Movie not found in wishlist');
    }
    return movie;
  }

  static async addToWishlist(movie: Movie): Promise<Movie> {
    const newMovie = {
      ...movie,
      id: Date.now(),
      lastModified: new Date().toISOString().split('T')[0]
    };
    mockWishlistMovies.unshift(newMovie);
    return newMovie;
  }

  static async removeFromWishlist(id: number): Promise<void> {
    const index = mockWishlistMovies.findIndex(m => m.id === id);
    if (index !== -1) {
      mockWishlistMovies.splice(index, 1);
    }
  }
}
