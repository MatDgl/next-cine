import { Movie } from "@/types/models";

// Données de test temporaires
export const mockMovies: Movie[] = [
  {
    id: 1,
    title: "The Dark Knight",
    src: "dark_knight",
    rating: 5,
    lastModified: "2024-01-10",
    wishlist: false,
  },
  {
    id: 2,
    title: "Pulp Fiction",
    src: "",
    rating: 4.5,
    lastModified: "2024-01-10",
    wishlist: false,
  },
  {
    id: 3,
    title: "Inception",
    src: "",
    rating: 4,
    lastModified: "2024-01-10",
    wishlist: true,
  },
  {
    id: 4,
    title: "Interstellar",
    src: "",
    lastModified: "2024-01-10",
    wishlist: true,
  },
  {
    id: 5,
    title: "Seven",
    src: "",
    lastModified: "2024-01-10",
    wishlist: true,
  },
  {
    id: 6,
    title: "Django Unchained",
    src: "",
    lastModified: "2024-01-10",
    wishlist: true,
  },
];

export class MovieService {
  static async getMovies(): Promise<Movie[]> {
    // Simuler un appel API
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockMovies.filter((m) => !m.wishlist));
      }, 500);
    });
  }

  static async getMovieById(id: number): Promise<Movie> {
    const movie = mockMovies.find((m) => m.id === id);
    if (!movie) {
      throw new Error("Movie not found");
    }
    return movie;
  }

  static async updateRating(id: number, rating: number): Promise<Movie> {
    // Mettre à jour dans les données mock
    const movieIndex = mockMovies.findIndex((m) => m.id === id);
    if (movieIndex === -1) {
      throw new Error("Movie not found");
    }

    mockMovies[movieIndex] = { ...mockMovies[movieIndex], rating };
    return mockMovies[movieIndex];
  }
}
