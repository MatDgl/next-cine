import { Movie } from '@/types/models';
import { MovieService } from './movieService';
import api from './api';

export class WishlistMovieService {

  static async getWishlistMovies(): Promise<Movie[]> {
    const { data } = await api.get<Movie[]>('/movie/wishlist');
    return data;
  }

  static async getWishlistMovieById(id: number): Promise<Movie> {
    const { data } = await api.get<Movie>(`/movie/${id}`);
    if (!data.wishlist) throw new Error('Movie not in wishlist');
    return data;
  }

  static async addToWishlist(movie: Movie): Promise<Movie> {
    return MovieService.updateWishlist(movie.id, true);
  }

  static async removeFromWishlist(id: number): Promise<void> {
    await MovieService.updateWishlist(id, false);
  }

  static async toggleWishlist(
    id: number, 
    isCurrentlyInWishlist: boolean,
    allMovies: Movie[],
    setAllMovies: (movies: Movie[]) => void
  ): Promise<void> {
    try {
      if (isCurrentlyInWishlist) {
  await WishlistMovieService.removeFromWishlist(id);
  setAllMovies(allMovies.filter(movie => movie.id !== id));
      } else {
  const updated = await MovieService.updateWishlist(id, true);
  setAllMovies([updated, ...allMovies]);
      }
    } catch (err) {
      console.error('Error toggling wishlist:', err);
    }
  }
}
