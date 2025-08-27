'use client';
import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, CircularProgress } from '@mui/material';
import { Movie } from '@/types/models';
import { MovieService } from '@/services/movieService';
import { useFilters } from '@/contexts/FiltersContext';
import Card from '@/components/shared/Card';
import Filters from '@/components/shared/Filters';

export default function MoviesPage() {
  const [allMovies, setAllMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { filterMovies, visibleCount, setVisibleCount } = useFilters();

  useEffect(() => {
    loadMovies();
  }, []);

  const loadMovies = async () => {
    try {
      setLoading(true);
      const movies = await MovieService.getMovies();
      setAllMovies(movies);
    } catch (err) {
      setError('Erreur lors du chargement des films');
      console.error('Error loading movies:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleRatingUpdate = (movieId: number, newRating: number) => {
    setAllMovies(prevMovies =>
      prevMovies.map(movie =>
        movie.id === movieId ? { ...movie, rating: newRating } : movie
      )
    );
  };

  const filteredMovies = filterMovies(allMovies || []);
  const visibleMovies = filteredMovies.slice(0, visibleCount);
  const canShowMore = filteredMovies.length > visibleMovies.length;

  const showMore = () => {
    setVisibleCount(visibleCount + 20);
  };

  if (loading) {
    return (
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <Typography variant="h6" color="error">
          {error}
        </Typography>
        <Button onClick={loadMovies} sx={{ mt: 2 }}>
          Réessayer
        </Button>
      </Box>
    );
  }

  return (
    <Box>
      <Filters />
      {visibleMovies.length > 0 ? (
        <>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
              gap: 3,
              mb: 3,
            }}
          >
            {visibleMovies.map(movie => (
              <Box key={movie.id}>
                <Card
                  data={movie}
                  onRatingUpdate={handleRatingUpdate}
                  kind="movie"
                />
              </Box>
            ))}
          </Box>
          {canShowMore && (
            <Box sx={{ textAlign: 'center' }}>
              <Button variant="outlined" onClick={showMore} size="large">
                Voir plus
              </Button>
            </Box>
          )}
        </>
      ) : (
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <Typography variant="h6" color="text.secondary">
            Aucun film trouvé.
          </Typography>
        </Box>
      )}
    </Box>
  );
}
