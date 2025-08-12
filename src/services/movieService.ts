import { Movie } from "@/types/models";
import api from "./api";

const ENDPOINT = "/movie";

type CreateMovieDto = {
  title: string;
  src?: string;
  rating?: number;
  wishlist?: boolean;
};

type UpdateMovieDto = Partial<CreateMovieDto>;

type MovieListMeta = {
  totalCount: number;
  wishlistCount: number;
  nonWishlistCount: number;
  avgRatingAll: number | null;
  returnedCount: number;
  avgRating: number | null;
  maxRating: number | null;
  minRating: number | null;
  lastUpdatedAt: string | null;
  firstCreatedAt: string | null;
  withImageCount: number;
  missingImageCount: number;
  unratedCount: number;
  ratedCount: number;
  items: Movie[];
};

export class MovieService {

  static async getMovies(): Promise<Movie[]> {
    const { data } = await api.get<MovieListMeta>(`${ENDPOINT}/non-wishlist`);
    return data.items;
  }

  static async getMoviesWithMeta(): Promise<MovieListMeta> {
    const { data } = await api.get<MovieListMeta>(`${ENDPOINT}/non-wishlist`);
    return data;
  }

  static async getWishlistMovies(): Promise<Movie[]> {
    const { data } = await api.get<MovieListMeta>(`${ENDPOINT}/wishlist`);
    return data.items;
  }

  static async getWishlistMoviesWithMeta(): Promise<MovieListMeta> {
    const { data } = await api.get<MovieListMeta>(`${ENDPOINT}/wishlist`);
    return data;
  }


  static async getMovieById(id: number): Promise<Movie> {
    const { data } = await api.get<Movie>(`${ENDPOINT}/${id}`);
    return data;
  }

  static async getWishlistMovieById(id: number): Promise<Movie> {
    const { data } = await api.get<Movie>(`${ENDPOINT}/${id}`);
    if (!data.wishlist) throw new Error('Movie not in wishlist');
    return data;
  }


  static async create(payload: CreateMovieDto): Promise<Movie> {
    const { data } = await api.post<Movie>(ENDPOINT, payload);
    return data;
  }


  static async update(id: number, payload: UpdateMovieDto): Promise<Movie> {
    const { data } = await api.put<Movie>(`${ENDPOINT}/${id}`, payload);
    return data;
  }

  static async updateRating(id: number, rating: number): Promise<Movie> {
    return this.update(id, { rating });
  }

  static async updateWishlist(id: number, wishlist: boolean): Promise<Movie> {
    return this.update(id, { wishlist });
  }

  static async delete(id: number): Promise<void> {
    await api.delete(`${ENDPOINT}/${id}`);
  }

  // Wishlist methods
  static async addToWishlist(movie: Movie): Promise<Movie> {
    return this.updateWishlist(movie.id, true);
  }

  static async removeFromWishlist(id: number): Promise<void> {
    await this.updateWishlist(id, false);
  }

  static async toggleWishlist(
    id: number,
    isCurrentlyInWishlist: boolean,
    allMovies: Movie[],
    setAllMovies: (movies: Movie[]) => void
  ): Promise<void> {
    try {
      if (isCurrentlyInWishlist) {
        await this.removeFromWishlist(id);
        setAllMovies(allMovies.filter(movie => movie.id !== id));
      } else {
        const updated = await this.updateWishlist(id, true);
        setAllMovies([updated, ...allMovies]);
      }
    } catch (err) {
      console.error('Error toggling wishlist:', err);
    }
  }
}
