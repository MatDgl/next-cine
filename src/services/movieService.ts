import { Movie, CreateMovieDto, CreateMovieFromTMDBDto, TMDBMovie } from "@/types/models";
import api from "./api";

const ENDPOINT = "/movie";

type UpdateMovieDto = Partial<CreateMovieDto>;

export class MovieService {

  /**
   * Récupère tous les films locaux
   */
  static async getMovies(): Promise<Movie[]> {
    const { data } = await api.get<Movie[]>(ENDPOINT);
    return data;
  }

  /**
   * Récupère les films en wishlist
   */
  static async getWishlistMovies(): Promise<Movie[]> {
    const { data } = await api.get<Movie[]>(`${ENDPOINT}/wishlist`);
    return data;
  }

  /**
   * Récupère les films notés
   */
  static async getRatedMovies(): Promise<Movie[]> {
    const { data } = await api.get<Movie[]>(`${ENDPOINT}/rated`);
    return data;
  }

  /**
   * Récupère un film local par son ID
   */
  static async getMovieById(id: number): Promise<Movie> {
    const { data } = await api.get<Movie>(`${ENDPOINT}/${id}`);
    return data;
  }

  /**
   * Récupère les détails TMDB d'un film avec statut local
   */
  static async getMovieByTmdbId(tmdbId: number): Promise<TMDBMovie> {
    const { data } = await api.get<TMDBMovie>(`${ENDPOINT}/tmdb/${tmdbId}`);
    return data;
  }

  /**
   * Recherche dans les films avec enrichissement TMDB
   */
  static async searchMovies(query: string, limit: number = 20): Promise<{ results: TMDBMovie[] }> {
    const { data } = await api.get(`${ENDPOINT}/search`, {
      params: { q: query, limit }
    });
    return data;
  }

  /**
   * Crée un film local manuellement
   */
  static async create(payload: CreateMovieDto): Promise<Movie> {
    const { data } = await api.post<Movie>(ENDPOINT, payload);
    return data;
  }

  /**
   * Crée/met à jour un film local à partir d'un ID TMDB
   */
  static async createFromTMDB(payload: CreateMovieFromTMDBDto): Promise<Movie> {
    const { data } = await api.post<Movie>(`${ENDPOINT}/tmdb`, payload);
    return data;
  }

  /**
   * Met à jour un film local
   */
  static async update(id: number, payload: UpdateMovieDto): Promise<Movie> {
    const { data } = await api.put<Movie>(`${ENDPOINT}/${id}`, payload);
    return data;
  }

  /**
   * Supprime un film local
   */
  static async delete(id: number): Promise<void> {
    await api.delete(`${ENDPOINT}/${id}`);
  }

  // Méthodes utilitaires
  static async updateRating(id: number, rating: number): Promise<Movie> {
    return this.update(id, { rating });
  }

  static async updateWishlist(id: number, wishlist: boolean): Promise<Movie> {
    return this.update(id, { wishlist });
  }

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
