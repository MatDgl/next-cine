import {
  Serie,
  CreateSerieDto,
  CreateSerieFromTMDBDto,
  TMDBSerie,
} from '@/types/models';
import api from './api';

const ENDPOINT = '/serie';

type UpdateSerieDto = Partial<CreateSerieDto>;

export class SerieService {
  /**
   * Récupère toutes les séries locales
   */
  static async getSeries(): Promise<Serie[]> {
    const { data } = await api.get(`${ENDPOINT}`);
    // L'API retourne un objet avec une propriété 'items'
    return Array.isArray(data.items) ? data.items : [];
  }

  /**
   * Récupère les séries en wishlist
   */
  static async getWishlistSeries(): Promise<Serie[]> {
    const { data } = await api.get(`${ENDPOINT}/wishlist`);
    // L'API retourne un objet avec une propriété 'items'
    return Array.isArray(data.items) ? data.items : [];
  }

  /**
   * Récupère les séries notées
   */
  static async getRatedSeries(): Promise<Serie[]> {
    const { data } = await api.get<Serie[]>(`${ENDPOINT}/rated`);
    return data;
  }

  /**
   * Récupère une série locale par son ID
   */
  static async getSerieById(id: number): Promise<Serie> {
    const { data } = await api.get<Serie>(`${ENDPOINT}/${id}`);
    return data;
  }

  /**
   * Récupère les détails TMDB d'une série avec statut local
   */
  static async getSerieByTmdbId(tmdbId: number): Promise<TMDBSerie> {
    const { data } = await api.get<TMDBSerie>(`${ENDPOINT}/tmdb/${tmdbId}`);
    return data;
  }

  /**
   * Recherche dans les séries avec enrichissement TMDB
   */
  static async searchSeries(
    query: string,
    limit: number = 20
  ): Promise<{ results: TMDBSerie[] }> {
    const { data } = await api.get(`${ENDPOINT}/search`, {
      params: { q: query, limit },
    });
    return data;
  }

  /**
   * Crée une série locale manuellement
   */
  static async create(payload: CreateSerieDto): Promise<Serie> {
    const { data } = await api.post<Serie>(ENDPOINT, payload);
    return data;
  }

  /**
   * Crée/met à jour une série locale à partir d'un ID TMDB
   */
  static async createFromTMDB(payload: CreateSerieFromTMDBDto): Promise<Serie> {
    const { data } = await api.post<Serie>(`${ENDPOINT}/tmdb`, payload);
    return data;
  }

  /**
   * Met à jour une série locale
   */
  static async update(id: number, payload: UpdateSerieDto): Promise<Serie> {
    const { data } = await api.put<Serie>(`${ENDPOINT}/${id}`, payload);
    return data;
  }

  /**
   * Supprime une série locale
   */
  static async delete(id: number): Promise<void> {
    await api.delete(`${ENDPOINT}/${id}`);
  }

  // Méthodes utilitaires
  static async updateRating(id: number, rating: number): Promise<Serie> {
    return this.update(id, { rating });
  }

  static async updateWishlist(id: number, wishlist: boolean): Promise<Serie> {
    return this.update(id, { wishlist });
  }

  static async addToWishlist(serie: Serie): Promise<Serie> {
    return this.updateWishlist(serie.id, true);
  }

  static async removeFromWishlist(id: number): Promise<void> {
    await this.updateWishlist(id, false);
  }

  static async toggleWishlist(
    id: number,
    isCurrentlyInWishlist: boolean,
    allSeries: Serie[],
    setAllSeries: (series: Serie[]) => void
  ): Promise<void> {
    try {
      if (isCurrentlyInWishlist) {
        await this.removeFromWishlist(id);
        setAllSeries(allSeries.filter(serie => serie.id !== id));
      } else {
        const updated = await this.updateWishlist(id, true);
        setAllSeries([updated, ...allSeries]);
      }
    } catch (err) {
      console.error('Error toggling wishlist:', err);
    }
  }
}
