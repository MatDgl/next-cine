'use client';
import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Typography,
  CircularProgress,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import { Movie, SortOption } from '@/types/models';
import { MovieService } from '@/services/movieService';
import { useFilters } from '@/contexts/FiltersContext';
import Card from '@/components/shared/Card';

export default function WishMoviesPage() {
  const [allMovies, setAllMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { sortValue, setSortValue, visibleCount, setVisibleCount, sortMovies } =
    useFilters();

  useEffect(() => {
    loadWishlistMovies();
  }, []);

  const handleToggleWishlist = async (
    id: number,
    isCurrentlyInWishlist: boolean
  ) => {
    await MovieService.toggleWishlist(
      id,
      isCurrentlyInWishlist,
      allMovies,
      setAllMovies
    );
  };

  const loadWishlistMovies = async () => {
    try {
      setLoading(true);
      const movies = await MovieService.getWishlistMovies();
      // Protection : s'assurer que movies est un tableau
      setAllMovies(Array.isArray(movies) ? movies : []);
    } catch (err) {
      setError('Erreur lors du chargement des films à voir');
      console.error('Error loading wishlist movies:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  // On ne filtre pas sur la note, on ne garde que le tri
  // Protection : s'assurer que allMovies est un tableau avant de trier
  const safeMovies = Array.isArray(allMovies) ? allMovies : [];
  const sortedMovies = sortMovies(safeMovies, sortValue);
  const displayedMovies = sortedMovies.slice(0, visibleCount);
  const hasMore = sortedMovies.length > visibleCount;

  return (
    <Box>
      {/* Sélecteur de tri uniquement (ordre/dernières modifs) */}
      <FormControl size="small" sx={{ minWidth: 180, mb: 2 }}>
        <InputLabel id="wishlist-sort-label">Trier par</InputLabel>
        <Select
          labelId="wishlist-sort-label"
          id="wishlist-sort"
          value={sortValue}
          label="Trier par"
          onChange={e => setSortValue(e.target.value as typeof sortValue)}
        >
          <MenuItem value={SortOption.LASTMODIFIED}>
            Dernières modifications
          </MenuItem>
          <MenuItem value={SortOption.TITLE}>Ordre alphabétique</MenuItem>
        </Select>
      </FormControl>
      {sortedMovies.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            Aucun film à voir pour le moment
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Ajoutez des films à votre liste d&apos;envies !
          </Typography>
        </Box>
      ) : (
        <>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
              gap: 3,
              mb: 4,
            }}
          >
            {displayedMovies.map(movie => (
              <Card
                key={movie.id}
                data={movie}
                onRatingUpdate={() => {}}
                isWishlistMode={true}
                onToggleWishlist={handleToggleWishlist}
                kind="movie"
              />
            ))}
          </Box>
          {hasMore && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
              <Button
                variant="outlined"
                onClick={() => setVisibleCount(visibleCount + 12)}
                sx={{ borderRadius: 2 }}
              >
                Voir plus ({sortedMovies.length - visibleCount} restants)
              </Button>
            </Box>
          )}
        </>
      )}
    </Box>
  );
}
