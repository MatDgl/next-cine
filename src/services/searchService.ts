import { SearchResponse, TMDBMovie, TMDBSerie } from '@/types/models';
import api from './api';

export class SearchService {
  /**
   * Recherche unifiée dans les films et séries via TMDB avec enrichissement local
   */
  static async search(
    query: string,
    limit: number = 20
  ): Promise<SearchResponse> {
    const { data } = await api.get<any>('/search', {
      params: { q: query, limit },
    });
    
    console.log('API raw data:', data.results?.[0]); // Log des données brutes
    
    // Transformer les données de l'API pour correspondre aux types frontend
    const transformedResults = data.results?.map((item: any) => ({
      ...item,
      tmdbId: item.id, // Mapper 'id' vers 'tmdbId'
      type: item.media_type === 'tv' ? 'serie' : 'movie', // Mapper 'media_type' vers 'type'
      title: item.title || item.name, // Utiliser 'title' ou 'name' selon le type
    })) || [];

    console.log('Transformed data:', transformedResults[0]); // Log des données transformées

    return {
      query: data.query,
      limit: data.limit,
      total: data.total,
      results: transformedResults,
    };
  }

  /**
   * Recherche spécifique dans les films
   */
  static async searchMovies(
    query: string,
    limit: number = 20
  ): Promise<SearchResponse> {
    const { data } = await api.get<any>('/movie/search', {
      params: { q: query, limit },
    });
    
    // Transformer les données de l'API pour correspondre aux types frontend
    const transformedResults = data.results?.map((item: any) => ({
      ...item,
      tmdbId: item.id, // Mapper 'id' vers 'tmdbId'
      type: 'movie', // Type fixe pour les films
      title: item.title || item.name, // Utiliser 'title' ou 'name'
    })) || [];

    return {
      query: data.query,
      limit: data.limit,
      total: data.total,
      results: transformedResults,
    };
  }

  /**
   * Recherche spécifique dans les séries
   */
  static async searchSeries(
    query: string,
    limit: number = 20
  ): Promise<SearchResponse> {
    const { data } = await api.get<any>('/serie/search', {
      params: { q: query, limit },
    });
    
    // Transformer les données de l'API pour correspondre aux types frontend
    const transformedResults = data.results?.map((item: any) => ({
      ...item,
      tmdbId: item.id, // Mapper 'id' vers 'tmdbId'
      type: 'serie', // Type fixe pour les séries
      title: item.title || item.name, // Utiliser 'title' ou 'name'
    })) || [];

    return {
      query: data.query,
      limit: data.limit,
      total: data.total,
      results: transformedResults,
    };
  }

  /**
   * Génère l'URL complète pour une image TMDB
   */
  static getTMDBImageUrl(
    posterPath: string,
    size:
      | 'w92'
      | 'w154'
      | 'w185'
      | 'w342'
      | 'w500'
      | 'w780'
      | 'original' = 'w342'
  ): string {
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
