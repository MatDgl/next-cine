import api from '@/services/api';
import { MovieService } from '@/services/movieService';
import {
    CreateMovieDto,
    Movie
} from '@/types/models';

// Mock du module API
jest.mock('@/services/api');
const mockedApi = api as jest.Mocked<typeof api>;

describe('MovieService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Tests pour getMovies()
  describe('getMovies', () => {
    it('should return an array of movies when API responds with items', async () => {
      const mockMovies: Movie[] = [
        {
          id: 1,
          title: 'Test Movie',
          tmdbId: 123,
          rating: 8.5,
          wishlist: false,
          review: 'Great movie!',
          viewCount: 2,
          watched: true,
          createdAt: '2023-01-01T00:00:00.000Z',
          updatedAt: '2023-01-02T00:00:00.000Z',
          tmdb: {
            poster_path: '/test-poster.jpg',
          },
        },
      ];

      mockedApi.get.mockResolvedValueOnce({
        data: { items: mockMovies },
      });

      const result = await MovieService.getMovies();

      expect(mockedApi.get).toHaveBeenCalledWith('/movie');
      expect(result).toEqual(mockMovies);
    });

    it('should return empty array when API responds with invalid data', async () => {
      mockedApi.get.mockResolvedValueOnce({
        data: { items: null },
      });

      const result = await MovieService.getMovies();

      expect(result).toEqual([]);
    });

    it('should handle API errors', async () => {
      const errorMessage = 'Network Error';
      mockedApi.get.mockRejectedValueOnce(new Error(errorMessage));

      await expect(MovieService.getMovies()).rejects.toThrow(errorMessage);
    });
  });

  // Tests pour getWishlistMovies()
  describe('getWishlistMovies', () => {
    it('should return wishlist movies', async () => {
      const mockWishlistMovies: Movie[] = [
        {
          id: 1,
          title: 'Wishlist Movie',
          tmdbId: 456,
          rating: 9.0,
          wishlist: true,
          viewCount: 0,
          watched: false,
          createdAt: '2023-01-01T00:00:00.000Z',
          updatedAt: '2023-01-01T00:00:00.000Z',
        },
      ];

      mockedApi.get.mockResolvedValueOnce({
        data: { items: mockWishlistMovies },
      });

      const result = await MovieService.getWishlistMovies();

      expect(mockedApi.get).toHaveBeenCalledWith('/movie/wishlist');
      expect(result).toEqual(mockWishlistMovies);
    });
  });

  // Tests pour getMovieById()
  describe('getMovieById', () => {
    it('should return a movie by id', async () => {
      const mockMovie: Movie = {
        id: 1,
        title: 'Test Movie',
        tmdbId: 123,
        rating: 8.0,
        wishlist: false,
        viewCount: 1,
        watched: true,
        createdAt: '2023-01-01T00:00:00.000Z',
        updatedAt: '2023-01-01T00:00:00.000Z',
      };

      mockedApi.get.mockResolvedValueOnce({
        data: mockMovie,
      });

      const result = await MovieService.getMovieById(1);

      expect(mockedApi.get).toHaveBeenCalledWith('/movie/1');
      expect(result).toEqual(mockMovie);
    });
  });

  // Tests pour create()
  describe('create', () => {
    it('should create a new movie', async () => {
      const createPayload: CreateMovieDto = {
        title: 'New Movie',
        tmdbId: 789,
        rating: 7.5,
        wishlist: true,
        review: 'Good movie',
        watched: false,
      };

      const expectedMovie: Movie = {
        id: 2,
        title: 'New Movie',
        tmdbId: 789,
        rating: 7.5,
        wishlist: true,
        review: 'Good movie',
        watched: false,
        viewCount: 0,
        createdAt: '2023-01-03T00:00:00.000Z',
        updatedAt: '2023-01-03T00:00:00.000Z',
      };

      mockedApi.post.mockResolvedValueOnce({
        data: expectedMovie,
      });

      const result = await MovieService.create(createPayload);

      expect(mockedApi.post).toHaveBeenCalledWith('/movie', createPayload);
      expect(result).toEqual(expectedMovie);
    });
  });

  // Tests pour update()
  describe('update', () => {
    it('should update a movie', async () => {
      const updatePayload = { rating: 9.5 };
      const updatedMovie: Movie = {
        id: 1,
        title: 'Updated Movie',
        tmdbId: 123,
        rating: 9.5,
        wishlist: false,
        viewCount: 3,
        watched: true,
        createdAt: '2023-01-01T00:00:00.000Z',
        updatedAt: '2023-01-04T00:00:00.000Z',
      };

      mockedApi.put.mockResolvedValueOnce({
        data: updatedMovie,
      });

      const result = await MovieService.update(1, updatePayload);

      expect(mockedApi.put).toHaveBeenCalledWith('/movie/1', updatePayload);
      expect(result).toEqual(updatedMovie);
    });
  });

  // Tests pour delete()
  describe('delete', () => {
    it('should delete a movie', async () => {
      mockedApi.delete.mockResolvedValueOnce({ data: {} });

      const result = await MovieService.delete(1);

      expect(mockedApi.delete).toHaveBeenCalledWith('/movie/1');
      expect(result).toEqual({});
    });
  });

  // Tests pour les méthodes utilitaires
  describe('utility methods', () => {
    it('updateRating should call update with rating', async () => {
      const mockMovie: Movie = {
        id: 1,
        title: 'Test Movie',
        rating: 8.5,
        wishlist: false,
        viewCount: 1,
        watched: true,
        createdAt: '2023-01-01T00:00:00.000Z',
        updatedAt: '2023-01-01T00:00:00.000Z',
      };

      mockedApi.put.mockResolvedValueOnce({ data: mockMovie });

      const result = await MovieService.updateRating(1, 8.5);

      expect(mockedApi.put).toHaveBeenCalledWith('/movie/1', { rating: 8.5 });
      expect(result).toEqual(mockMovie);
    });

    it('updateWishlist should call update with wishlist status', async () => {
      const mockMovie: Movie = {
        id: 1,
        title: 'Test Movie',
        wishlist: true,
        rating: 8.0,
        viewCount: 1,
        watched: true,
        createdAt: '2023-01-01T00:00:00.000Z',
        updatedAt: '2023-01-01T00:00:00.000Z',
      };

      mockedApi.put.mockResolvedValueOnce({ data: mockMovie });

      const result = await MovieService.updateWishlist(1, true);

      expect(mockedApi.put).toHaveBeenCalledWith('/movie/1', {
        wishlist: true,
      });
      expect(result).toEqual(mockMovie);
    });
  });
});
