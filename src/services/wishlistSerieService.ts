import { Serie } from '@/types/models';
import { SerieService } from './serieService';
import api from './api';

export class WishlistSerieService {
  static async getWishlistSeries(): Promise<Serie[]> {
    const { data } = await api.get<Serie[]>('/serie/wishlist');
    return data;
  }

  static async getWishlistSerieById(id: number): Promise<Serie> {
    const { data } = await api.get<Serie>(`/serie/${id}`);
    if (!data.wishlist) throw new Error('Serie not in wishlist');
    return data;
  }

  static async addToWishlist(serie: Serie): Promise<Serie> {
    return SerieService.updateWishlist(serie.id, true);
  }

  static async removeFromWishlist(id: number): Promise<void> {
    await SerieService.updateWishlist(id, false);
  }

  static async toggleWishlist(
    id: number,
    isCurrentlyInWishlist: boolean,
    allSeries: Serie[],
    setAllSeries: (series: Serie[]) => void,
  ): Promise<void> {
    try {
      if (isCurrentlyInWishlist) {
        await WishlistSerieService.removeFromWishlist(id);
        setAllSeries(allSeries.filter((serie) => serie.id !== id));
      } else {
        const updated = await SerieService.updateWishlist(id, true);
        setAllSeries([updated, ...allSeries]);
      }
    } catch (err) {
      console.error('Error toggling wishlist:', err);
    }
  }
}
