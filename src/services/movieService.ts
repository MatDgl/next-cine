import { Movie } from '@/types/models';

// Données de test temporaires
const mockMovies: Movie[] = [
//   {
//     id: 1,
//     title: 'The Dark Knight',
//     src: 'dark_knight',
//     rating: 5,
//     lastModified: '2024-01-10'
//   },
//   {
//     id: 2,
//     title: 'Pulp Fiction',
//     src: 'pulp_fiction',
//     rating: 4.5,
//     lastModified: '2024-01-10'
//   },
//   {
//     id: 3,
//     title: 'Inception',
//     src: 'inception',
//     rating: 4,
//     lastModified: '2024-01-10'
//   },
//   {
//     id: 4,
//     title: 'Interstellar',
//     src: 'interstellar',
//     rating: 4.5,
//     lastModified: '2024-01-10'
//   },
//   {
//     id: 5,
//     title: 'Seven',
//     src: 'seven',
//     rating: 4,
//     lastModified: '2024-01-10'
//   },
//   {
//     id: 6,
//     title: 'Django Unchained',
//     src: 'django',
//     rating: 4,
//     lastModified: '2024-01-10'
//   }
];

export class MovieService {
  static async getMovies(): Promise<Movie[]> {
    // Simuler un appel API
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockMovies);
      }, 500);
    });
  }

  static async getMovieById(id: number): Promise<Movie> {
    const movie = mockMovies.find(m => m.id === id);
    if (!movie) {
      throw new Error('Movie not found');
    }
    return movie;
  }

  static async updateRating(id: number, rating: number): Promise<Movie> {
    // Mettre à jour dans les données mock
    const movieIndex = mockMovies.findIndex(m => m.id === id);
    if (movieIndex === -1) {
      throw new Error('Movie not found');
    }
    
    mockMovies[movieIndex] = { ...mockMovies[movieIndex], rating };
    return mockMovies[movieIndex];
  }
}
