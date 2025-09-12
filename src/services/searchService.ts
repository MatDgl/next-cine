import { SearchResponse, TMDBMovie, TMDBSerie } from '@/types/models';
import api from './api';

// Interface pour les réponses de l'API de recherche
interface ApiSearchResponse {
  query: string;
  limit: number;
  total: number;
  results: ApiSearchItem[];
}

interface ApiSearchItem {
  id: number;
  title?: string;
  name?: string;
  media_type?: string;
  poster_path?: string;
  release_date?: string;
  first_air_date?: string;
  overview?: string;
  vote_average?: number;
  [key: string]: unknown;
}

export class SearchService {
  /**
   * Recherche unifiée dans les films et séries via TMDB avec enrichissement local
   */
  static async search(
    query: string,
    limit: number = 20
  ): Promise<SearchResponse> {
    const { data } = await api.get<ApiSearchResponse>('/search', {
      params: { q: query, limit },
    });
    
    console.log('API raw data:', data.results?.[0]); // Log des données brutes
    
    // Transformer les données de l'API pour correspondre aux types frontend
    const transformedResults = data.results?.map((item: ApiSearchItem): TMDBMovie | TMDBSerie => {
      const baseData = {
        ...item,
        tmdbId: item.id,
        title: item.title || item.name || '',
      };

      if (item.media_type === 'tv') {
        return {
          ...baseData,
          type: 'serie' as const,
          name: item.name,
          first_air_date: item.first_air_date,
        } as TMDBSerie;
      } else {
        return {
          ...baseData,
          type: 'movie' as const,
          original_title: item.title,
          release_date: item.release_date,
        } as TMDBMovie;
      }
    }) || [];

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
    const { data } = await api.get<ApiSearchResponse>('/movie/search', {
      params: { q: query, limit },
    });
    
    // Transformer les données de l'API pour correspondre aux types frontend
    const transformedResults = data.results?.map((item: ApiSearchItem): TMDBMovie => ({
      ...item,
      tmdbId: item.id,
      type: 'movie' as const,
      title: item.title || item.name || '',
      original_title: item.title,
      release_date: item.release_date,
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
    const { data } = await api.get<ApiSearchResponse>('/serie/search', {
      params: { q: query, limit },
    });
    
    // Transformer les données de l'API pour correspondre aux types frontend
    const transformedResults = data.results?.map((item: ApiSearchItem): TMDBSerie => ({
      ...item,
      tmdbId: item.id,
      type: 'serie' as const,
      title: item.title || item.name || '',
      name: item.name,
      first_air_date: item.first_air_date,
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
