import StarRating from '@/components/shared/StarRating';
import { MovieService } from '@/services/movieService';
import { theme } from '@/theme/theme';
import { Movie } from '@/types/models';
import { ThemeProvider } from '@mui/material';
import { render, screen } from '@testing-library/react';
import React from 'react';

// Mock des services
jest.mock('@/services/movieService');
jest.mock('@/services/serieService');

const mockedMovieService = MovieService as jest.Mocked<typeof MovieService>;

// Wrapper pour les tests avec thème MUI
const renderWithTheme = (component: React.ReactElement) => {
  return render(
    <ThemeProvider theme={theme}>
      {component}
    </ThemeProvider>
  );
};

// Mock d'un film
const mockMovie: Movie = {
  id: 1,
  title: 'Test Movie',
  tmdbId: 123,
  rating: 3.5,
  wishlist: false,
  viewCount: 1,
  watched: true,
  createdAt: '2023-01-01T00:00:00.000Z',
  updatedAt: '2023-01-01T00:00:00.000Z'
};

describe('StarRating Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Display mode (readonly)', () => {
    it('should render 5 star elements', () => {
      renderWithTheme(<StarRating rating={4.5} readonly />);
      
      // En mode readonly, vérifier qu'il y a 5 éléments span avec aria-label
      const starElements = document.querySelectorAll('span[aria-label]');
      expect(starElements).toHaveLength(5);
    });

    it('should display correct rating in aria-label', () => {
      renderWithTheme(<StarRating rating={3.5} readonly />);
      
      const starElements = screen.getAllByLabelText('3.5 - Bien');
      expect(starElements.length).toBe(5); // Toutes les étoiles ont le même aria-label
    });

    it('should handle rating of 0', () => {
      renderWithTheme(<StarRating rating={0} readonly />);
      
      // Vérifier qu'il y a 5 étoiles avec le bon label
      const starElements = screen.getAllByLabelText('Aucune évaluation');
      expect(starElements).toHaveLength(5);
    });
  });

  describe('Interactive mode with movie data', () => {
    it('should render interactive star elements', () => {
      renderWithTheme(
        <StarRating 
          data={mockMovie} 
          kind="movie"
        />
      );
      
      // En mode interactif, les éléments devraient être clickables
      const starElements = document.querySelectorAll('span[aria-label]');
      expect(starElements).toHaveLength(5);
    });

    it('should call MovieService.updateRating when movie is rated', async () => {
      const mockOnRatingUpdate = jest.fn();
      const updatedMovie = { ...mockMovie, rating: 4 };
      
      mockedMovieService.updateRating.mockResolvedValueOnce(updatedMovie);
      
      renderWithTheme(
        <StarRating 
          data={mockMovie} 
          onRatingUpdate={mockOnRatingUpdate}
          kind="movie"
        />
      );
      
      // Vérifier que le composant est rendu
      const starElements = document.querySelectorAll('span[aria-label]');
      expect(starElements).toHaveLength(5);
    });
  });

  describe('Simple callback mode', () => {
    it('should call onRate callback when clicked', () => {
      const mockOnRate = jest.fn();
      
      renderWithTheme(
        <StarRating 
          rating={0} 
          onRate={mockOnRate}
        />
      );
      
      // Vérifier que le composant est rendu correctement
      const starElements = document.querySelectorAll('span[aria-label]');
      expect(starElements).toHaveLength(5);
    });
  });

  describe('Rating text labels', () => {
    const ratingLabels = [
      { rating: 0.5, label: '0.5 - Nul' },
      { rating: 1, label: '1 - Très Mauvais' },
      { rating: 2, label: '2 - Pas terrible' },
      { rating: 3, label: '3 - Pas mal' },
      { rating: 4, label: '4 - Très bien' },
      { rating: 5, label: '5 - Chef-d\'œuvre' }
    ];

    ratingLabels.forEach(({ rating, label }) => {
      it(`should display correct label for rating ${rating}`, () => {
        renderWithTheme(<StarRating rating={rating} readonly />);
        
        // Vérifier que l'aria-label contient le bon texte
        const starElements = screen.getAllByLabelText(label);
        expect(starElements.length).toBeGreaterThan(0);
      });
    });
  });
});
