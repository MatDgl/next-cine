import { Serie } from "@/types/models";
import api from "./api";

type CreateSerieDto = {
  title: string;
  src?: string;
  rating?: number;
  wishlist?: boolean;
};

type UpdateSerieDto = Partial<CreateSerieDto>;

const ENDPOINT = "/serie";

type SerieListMeta = {
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
  items: Serie[];
};

export class SerieService {
  static async getSeries(): Promise<Serie[]> {
    const { data } = await api.get<SerieListMeta>(`${ENDPOINT}/non-wishlist`);
    return data.items;
  }

  static async getSeriesWithMeta(): Promise<SerieListMeta> {
    const { data } = await api.get<SerieListMeta>(`${ENDPOINT}/non-wishlist`);
    return data;
  }

  static async getWishlistSeries(): Promise<Serie[]> {
    const { data } = await api.get<SerieListMeta>(`${ENDPOINT}/wishlist`);
    return data.items;
  }

  static async getWishlistSeriesWithMeta(): Promise<SerieListMeta> {
    const { data } = await api.get<SerieListMeta>(`${ENDPOINT}/wishlist`);
    return data;
  }
  static async getSerieById(id: number): Promise<Serie> {
    const { data } = await api.get<Serie>(`${ENDPOINT}/${id}`);
    return data;
  }

  static async getWishlistSerieById(id: number): Promise<Serie> {
    const { data } = await api.get<Serie>(`${ENDPOINT}/${id}`);
    if (!data.wishlist) throw new Error('Serie not in wishlist');
    return data;
  }

  static async create(payload: CreateSerieDto): Promise<Serie> {
    const { data } = await api.post<Serie>(ENDPOINT, payload);
    return data;
  }

  static async update(id: number, payload: UpdateSerieDto): Promise<Serie> {
    const { data } = await api.put<Serie>(`${ENDPOINT}/${id}`, payload);
    return data;
  }

  static async updateRating(id: number, rating: number): Promise<Serie> {
    return this.update(id, { rating });
  }

  static async updateWishlist(id: number, wishlist: boolean): Promise<Serie> {
    return this.update(id, { wishlist });
  }

  static async delete(id: number): Promise<void> {
    await api.delete(`${ENDPOINT}/${id}`);
  }

  // Wishlist methods
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
