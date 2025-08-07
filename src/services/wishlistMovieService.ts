import { Movie } from '@/types/models';
import { mockMovies } from './movieService';

export class WishlistMovieService {

  static async getWishlistMovies(): Promise<Movie[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockMovies.filter((m) => m.wishlist));
      }, 500);
    });
  }

  static async getWishlistMovieById(id: number): Promise<Movie> {
    const movie = mockMovies.find(m => m.id === id);
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
    mockMovies.unshift(newMovie);
    return newMovie;
  }

  static async removeFromWishlist(id: number): Promise<void> {
    const index = mockMovies.findIndex(m => m.id === id);
    if (index !== -1) {
      mockMovies.splice(index, 1);
    }
  }

  static async toggleWishlist(
    id: number, 
    isCurrentlyInWishlist: boolean,
    allMovies: Movie[],
    setAllMovies: (movies: Movie[]) => void
  ): Promise<void> {
    try {
      if (isCurrentlyInWishlist) {
        // Retirer de la wishlist
        await WishlistMovieService.removeFromWishlist(id);
        setAllMovies(allMovies.filter(movie => movie.id !== id));
      } else {
        // Ajouter à la wishlist (cette logique sera implémentée plus tard)
        console.log('Ajouter à la wishlist:', id);
      }
    } catch (err) {
      console.error('Error toggling wishlist:', err);
    }
  }
}
