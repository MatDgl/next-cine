import { SearchResponse, TMDBMovie, TMDBSerie } from "@/types/models";
import api from "./api";

export class SearchService {
  
  /**
   * Recherche unifiée dans les films et séries via TMDB avec enrichissement local
   */
  static async search(query: string, limit: number = 20): Promise<SearchResponse> {
    const { data } = await api.get<SearchResponse>('/search', {
      params: { q: query, limit }
    });
    return data;
  }

  /**
   * Recherche spécifique dans les films
   */
  static async searchMovies(query: string, limit: number = 20): Promise<SearchResponse> {
    const { data } = await api.get<SearchResponse>('/movie/search', {
      params: { q: query, limit }
    });
    return data;
  }

  /**
   * Recherche spécifique dans les séries
   */
  static async searchSeries(query: string, limit: number = 20): Promise<SearchResponse> {
    const { data } = await api.get<SearchResponse>('/serie/search', {
      params: { q: query, limit }
    });
    return data;
  }

  /**
   * Génère l'URL complète pour une image TMDB
   */
  static getTMDBImageUrl(posterPath: string, size: 'w92' | 'w154' | 'w185' | 'w342' | 'w500' | 'w780' | 'original' = 'w342'): string {
    if (!posterPath) return '/assets/img/movie/default.png';
    return `https://image.tmdb.org/t/p/${size}${posterPath}`;
  }

  /**
   * Vérifie si un résultat de recherche est un film
   */
  static isMovie(result: TMDBMovie | TMDBSerie): result is TMDBMovie {
    return result.type === 'movie';
  }

  /**
   * Vérifie si un résultat de recherche est une série
   */
  static isSerie(result: TMDBMovie | TMDBSerie): result is TMDBSerie {
    return result.type === 'serie';
  }
}
