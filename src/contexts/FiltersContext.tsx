'use client';
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
  useMemo,
} from 'react';
import { Movie, Serie, SortOption } from '@/types/models';

interface FiltersContextType {
  // Sort
  sortValue: SortOption;
  setSortValue: (value: SortOption) => void;

  // Rate filter
  rateValue: number;
  setRateValue: (value: number) => void;

  // Visible count
  visibleCount: number;
  setVisibleCount: (value: number) => void;

  // Helper functions
  sortMovies: (movies: Movie[], sort: SortOption) => Movie[];
  filterMovies: (movies: Movie[]) => Movie[];
  filterSeries: (series: Serie[]) => Serie[];
}

const FiltersContext = createContext<FiltersContextType | undefined>(undefined);

export function useFilters() {
  const context = useContext(FiltersContext);
  if (!context) {
    throw new Error('useFilters must be used within a FiltersProvider');
  }
  return context;
}

interface FiltersProviderProps {
  readonly children: ReactNode;
}

export function FiltersProvider({ children }: FiltersProviderProps) {
  const [sortValue, setSortValue] = useState<SortOption>(
    SortOption.LASTMODIFIED
  );
  const [rateValue, setRateValue] = useState<number>(0);
  const [visibleCount, setVisibleCount] = useState<number>(20);

  const sortMovies = useCallback(
    (movies: Movie[], sort: SortOption): Movie[] => {
      // Vérification de sécurité : s'assurer que movies est bien un tableau
      if (!movies || !Array.isArray(movies)) {
        console.warn('sortMovies called with invalid data:', movies);
        return [];
      }

      const sorted = [...movies];

      switch (sort) {
        case SortOption.LASTMODIFIED:
          return sorted.sort((a, b) => {
            if (!a.updatedAt && !b.updatedAt) return 0;
            if (!a.updatedAt) return 1;
            if (!b.updatedAt) return -1;
            return (
              new Date(String(b.updatedAt)).getTime() -
              new Date(String(a.updatedAt)).getTime()
            );
          });

        case SortOption.TITLE:
          return sorted.sort((a, b) => a.title.localeCompare(b.title));

        case SortOption.RATING_DESC:
          return sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0));

        case SortOption.RATING_ASC:
          return sorted.sort((a, b) => (a.rating || 0) - (b.rating || 0));

        default:
          return sorted;
      }
    },
    []
  );

  // useCallback : Enregistre une fonction avec ses dépendances pour éviter de la recréer à chaque rendu
  const filterMovies = useCallback(
    (movies: Movie[]): Movie[] => {
      // Vérification de sécurité : s'assurer que movies est bien un tableau
      if (!movies || !Array.isArray(movies)) {
        console.warn('filterMovies called with invalid data:', movies);
        return [];
      }

      let filtered = [...movies];

      // Filter by rating
      if (rateValue > 0) {
        filtered = filtered.filter(movie => movie.rating === rateValue);
      }

      // Sort movies
      return sortMovies(filtered, sortValue);
    },
    [rateValue, sortMovies, sortValue]
  );

  const filterSeries = useCallback(
    (series: Serie[]): Serie[] => {
      // Protection contre les valeurs non-array
      if (!Array.isArray(series)) {
        return [];
      }

      let filtered = [...series];

      // Filter by rating
      if (rateValue > 0) {
        filtered = filtered.filter(serie => serie.rating === rateValue);
      }

      // Sort series (cast to Movie[] for sorting)
      const sortedMovies = sortMovies(filtered as Movie[], sortValue);
      return sortedMovies as Serie[];
    },
    [rateValue, sortMovies, sortValue]
  );

  // useMemo : Mémorise la valeur du contexte pour éviter de la recalculer à chaque rendu
  const value = useMemo<FiltersContextType>(
    () => ({
      sortValue,
      setSortValue,
      rateValue,
      setRateValue,
      visibleCount,
      setVisibleCount,
      sortMovies,
      filterMovies,
      filterSeries,
    }),
    [sortValue, rateValue, visibleCount, sortMovies, filterMovies, filterSeries]
  );

  return (
    <FiltersContext.Provider value={value}>{children}</FiltersContext.Provider>
  );
}
