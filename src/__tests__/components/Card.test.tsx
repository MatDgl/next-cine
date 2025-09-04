import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Card from '@/components/shared/Card';
import { Movie } from '@/types/models';
import { ThemeProvider } from '@mui/material';
import { theme } from '@/theme/theme';

// Mock des composants enfants
jest.mock('@/components/shared/StarRating', () => {
  return function MockStarRating({
    onRatingUpdate,
  }: {
    onRatingUpdate: (rating: number) => void;
  }) {
    return (
      <div data-testid="star-rating">
        <button onClick={() => onRatingUpdate(4)}>Rate 4 stars</button>
      </div>
    );
  };
});

jest.mock('@/components/shared/WishlistButton', () => {
  return function MockWishlistButton({
    onToggleWishlist,
  }: {
    onToggleWishlist: (id: number, isInWishlist: boolean) => void;
  }) {
    return (
      <div data-testid="wishlist-button">
        <button onClick={() => onToggleWishlist(1, false)}>
          Toggle Wishlist
        </button>
      </div>
    );
  };
});

// Wrapper pour les tests avec thème MUI
const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

// Mock d'un film avec toutes les propriétés requises
const mockMovie: Movie = {
  id: 1,
  title: 'Test Movie',
  tmdbId: 123,
  rating: 4.5,
  wishlist: false,
  review: 'Great movie!',
  viewCount: 2,
  watched: true,
  createdAt: '2023-01-01T00:00:00.000Z',
  updatedAt: '2023-01-02T00:00:00.000Z',
  tmdb: {
    poster_path: '/test-poster.jpg',
  },
};

// Mock d'un film sans données TMDB
const mockMovieWithoutTMDB: Movie = {
  id: 2,
  title: 'Movie Without TMDB',
  wishlist: true,
  viewCount: 0,
  watched: false,
  createdAt: '2023-01-01T00:00:00.000Z',
  updatedAt: '2023-01-01T00:00:00.000Z',
};

describe('Card Component', () => {
  describe('Basic rendering', () => {
    it('should render movie title', () => {
      renderWithTheme(<Card data={mockMovie} kind="movie" />);

      expect(screen.getByText('Test Movie')).toBeInTheDocument();
    });

    it('should render movie image with TMDB poster', () => {
      renderWithTheme(<Card data={mockMovie} kind="movie" />);

      const image = screen.getByAltText('Test Movie') as HTMLImageElement;
      expect(image).toBeInTheDocument();
      expect(image.src).toContain(
        'https://image.tmdb.org/t/p/w500/test-poster.jpg'
      );
    });

    it('should use default image when no TMDB data', () => {
      renderWithTheme(<Card data={mockMovieWithoutTMDB} kind="movie" />);

      const image = screen.getByAltText(
        'Movie Without TMDB'
      ) as HTMLImageElement;
      expect(image).toBeInTheDocument();
      expect(image.src).toContain('/assets/img/movie/default.png');
    });

    it('should create link to movie detail page', () => {
      renderWithTheme(<Card data={mockMovie} kind="movie" />);

      const link = screen.getByRole('link');
      expect(link).toHaveAttribute('href', '/movie/123');
    });

    it('should link to home when no tmdbId', () => {
      renderWithTheme(<Card data={mockMovieWithoutTMDB} kind="movie" />);

      const link = screen.getByRole('link');
      expect(link).toHaveAttribute('href', '/');
    });
  });

  describe('Rating mode', () => {
    it('should show star rating when movie has rating and not in wishlist mode', () => {
      renderWithTheme(
        <Card data={mockMovie} kind="movie" isWishlistMode={false} />
      );

      expect(screen.getByTestId('star-rating')).toBeInTheDocument();
      expect(screen.queryByTestId('wishlist-button')).not.toBeInTheDocument();
    });

    it('should not show star rating when no rating', () => {
      const movieWithoutRating = { ...mockMovie, rating: undefined };
      renderWithTheme(
        <Card data={movieWithoutRating} kind="movie" isWishlistMode={false} />
      );

      expect(screen.queryByTestId('star-rating')).not.toBeInTheDocument();
    });

    it('should call onRatingUpdate when rating is updated', async () => {
      const mockOnRatingUpdate = jest.fn();
      const user = userEvent.setup();

      renderWithTheme(
        <Card
          data={mockMovie}
          kind="movie"
          onRatingUpdate={mockOnRatingUpdate}
          isWishlistMode={false}
        />
      );

      const rateButton = screen.getByText('Rate 4 stars');
      await user.click(rateButton);

      expect(mockOnRatingUpdate).toHaveBeenCalledWith(1, 4);
    });
  });

  describe('Wishlist mode', () => {
    it('should show wishlist button when in wishlist mode', () => {
      renderWithTheme(
        <Card data={mockMovie} kind="movie" isWishlistMode={true} />
      );

      expect(screen.getByTestId('wishlist-button')).toBeInTheDocument();
      expect(screen.queryByTestId('star-rating')).not.toBeInTheDocument();
    });

    it('should call onToggleWishlist when wishlist is toggled', async () => {
      const mockOnToggleWishlist = jest.fn();
      const user = userEvent.setup();

      renderWithTheme(
        <Card
          data={mockMovie}
          kind="movie"
          isWishlistMode={true}
          onToggleWishlist={mockOnToggleWishlist}
        />
      );

      const toggleButton = screen.getByText('Toggle Wishlist');
      await user.click(toggleButton);

      expect(mockOnToggleWishlist).toHaveBeenCalledWith(1, false);
    });
  });

  describe('Image error handling', () => {
    it('should handle image load errors by setting default image', () => {
      renderWithTheme(<Card data={mockMovie} kind="movie" />);

      const image = screen.getByAltText('Test Movie') as HTMLImageElement;

      // Simuler une erreur de chargement d'image
      const errorEvent = new Event('error');
      Object.defineProperty(errorEvent, 'target', {
        writable: false,
        value: image,
      });

      image.dispatchEvent(errorEvent);

      expect(image.src).toContain('/assets/img/movie/default.png');
    });
  });

  describe('Serie type', () => {
    it('should create correct link for serie type', () => {
      renderWithTheme(<Card data={mockMovie} kind="serie" />);

      const link = screen.getByRole('link');
      expect(link).toHaveAttribute('href', '/serie/123');
    });
  });
});
