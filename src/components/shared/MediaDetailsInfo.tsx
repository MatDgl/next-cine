import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { TMDBMovie, TMDBSerie } from '@/types/models';
import {
  formatDate,
  formatDuration,
  formatCurrency,
} from '@/utils/formatters';
import { getFeaturedActors } from '@/utils/media';

interface MediaDetailsInfoProps {
  media: TMDBMovie | TMDBSerie;
}

const MediaDetailsInfo: React.FC<MediaDetailsInfoProps> = ({ media }) => {
  const isMovie = media.type === 'movie';

  const renderMovieInfo = (movie: TMDBMovie) => (
    <>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 2,
          alignItems: 'center',
          mb: 2,
        }}
      >
        {movie.release_date && (
          <Typography variant="body1" fontWeight="bold">
            {formatDate(movie.release_date)}
          </Typography>
        )}

        {movie.runtime && (
          <>
            <Typography variant="body2" color="text.secondary">
              |
            </Typography>
            <Typography variant="body1" fontWeight="bold">
              {formatDuration(movie.runtime)}
            </Typography>
          </>
        )}

        {movie.director && (
          <>
            <Typography variant="body2" color="text.secondary">
              |
            </Typography>
            <Typography variant="body1">
              Réalisé par <strong>{movie.director}</strong>
            </Typography>
          </>
        )}
      </Box>

      {/* Cast principal */}
      {movie.credits?.cast && movie.credits.cast.length > 0 && (
        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 0.5 }}>
            Avec
          </Typography>
          <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.92)' }}>
            <strong>
              {getFeaturedActors(movie.credits.cast)
                .map(actor => actor.name)
                .join(', ')}
            </strong>
          </Typography>
        </Box>
      )}

      {/* Informations de production */}
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, mt: 2 }}>
        {movie.budget && movie.budget > 0 && (
          <Box sx={{ p: 2, borderRadius: 2, border: '1px solid rgba(255,255,255,0.12)', background: 'rgba(255,255,255,0.04)' }}>
            <Typography variant="overline" color="text.secondary" display="block" sx={{ letterSpacing: 0.6 }}>
              Budget
            </Typography>
            <Typography variant="body1" fontWeight={700}>
              {formatCurrency(movie.budget)}
            </Typography>
          </Box>
        )}

        {movie.revenue && movie.revenue > 0 && (
          <Box sx={{ p: 2, borderRadius: 2, border: '1px solid rgba(255,255,255,0.12)', background: 'rgba(255,255,255,0.04)' }}>
            <Typography variant="overline" color="text.secondary" display="block" sx={{ letterSpacing: 0.6 }}>
              Recettes
            </Typography>
            <Typography variant="body1" fontWeight={700}>
              {formatCurrency(movie.revenue)}
            </Typography>
          </Box>
        )}

        {movie.original_language && (
          <Box sx={{ p: 2, borderRadius: 2, border: '1px solid rgba(255,255,255,0.12)', background: 'rgba(255,255,255,0.04)' }}>
            <Typography variant="overline" color="text.secondary" display="block" sx={{ letterSpacing: 0.6 }}>
              Langue originale
            </Typography>
            <Typography variant="body1" fontWeight={700}>
              {movie.spoken_languages?.find(
                lang => lang.iso_639_1 === movie.original_language
              )?.name || movie.original_language.toUpperCase()}
            </Typography>
          </Box>
        )}

        {movie.production_countries &&
          movie.production_countries.length > 0 && (
            <Box sx={{ p: 2, borderRadius: 2, border: '1px solid rgba(255,255,255,0.12)', background: 'rgba(255,255,255,0.04)' }}>
              <Typography variant="overline" color="text.secondary" display="block" sx={{ letterSpacing: 0.6 }}>
                Pays de production
              </Typography>
              <Typography variant="body1" fontWeight={700}>
                {movie.production_countries
                  .slice(0, 2)
                  .map(country => country.name)
                  .join(', ')}
              </Typography>
            </Box>
          )}
      </Box>
    </>
  );

  const renderSerieInfo = (serie: TMDBSerie) => (
    <>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 2,
          alignItems: 'center',
          mb: 2,
        }}
      >
        {serie.first_air_date && (
          <Typography variant="body1" fontWeight="bold">
            {formatDate(serie.first_air_date)}
          </Typography>
        )}

        {serie.status && (
          <>
            <Typography variant="body2" color="text.secondary">
              |
            </Typography>
            <Typography variant="body1" fontWeight="bold">
              {serie.status}
            </Typography>
          </>
        )}

        {serie.episode_run_time && serie.episode_run_time.length > 0 && (
          <>
            <Typography variant="body2" color="text.secondary">
              |
            </Typography>
            <Typography variant="body1" fontWeight="bold">
              {serie.episode_run_time[0]}min/épisode
            </Typography>
          </>
        )}

        {serie.director && (
          <>
            <Typography variant="body2" color="text.secondary">
              |
            </Typography>
            <Typography variant="body1">
              Créé par <strong>{serie.director}</strong>
            </Typography>
          </>
        )}
      </Box>

    {/* Informations sur les saisons/épisodes */}
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 2,
          alignItems: 'center',
          mb: 2,
        }}
      >
        {serie.number_of_seasons && (
      <Typography variant="body1" fontWeight={700}>
            <strong>{serie.number_of_seasons}</strong> saison
            {serie.number_of_seasons > 1 ? 's' : ''}
          </Typography>
        )}

        {serie.number_of_episodes && (
          <>
            <Typography variant="body2" color="text.secondary">
              |
            </Typography>
            <Typography variant="body1" fontWeight={700}>
              <strong>{serie.number_of_episodes}</strong> épisode
              {serie.number_of_episodes > 1 ? 's' : ''}
            </Typography>
          </>
        )}
      </Box>

      {/* Cast principal */}
      {serie.credits?.cast && serie.credits.cast.length > 0 && (
        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 0.5 }}>
            Avec
          </Typography>
          <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.92)' }}>
            <strong>
              {getFeaturedActors(serie.credits.cast)
                .map(actor => actor.name)
                .join(', ')}
            </strong>
          </Typography>
        </Box>
      )}

      {/* Informations de production */}
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, mt: 2 }}>
        {serie.original_language && (
          <Box sx={{ p: 2, borderRadius: 2, border: '1px solid rgba(255,255,255,0.12)', background: 'rgba(255,255,255,0.04)' }}>
            <Typography variant="overline" color="text.secondary" display="block" sx={{ letterSpacing: 0.6 }}>
              Langue originale
            </Typography>
            <Typography variant="body1" fontWeight={700}>
              {serie.spoken_languages?.find(
                lang => lang.iso_639_1 === serie.original_language
              )?.name || serie.original_language.toUpperCase()}
            </Typography>
          </Box>
        )}

          {serie.production_countries &&
          serie.production_countries.length > 0 && (
            <Box sx={{ p: 2, borderRadius: 2, border: '1px solid rgba(255,255,255,0.12)', background: 'rgba(255,255,255,0.04)' }}>
              <Typography variant="overline" color="text.secondary" display="block" sx={{ letterSpacing: 0.6 }}>
                Pays de production
              </Typography>
              <Typography variant="body1" fontWeight={700}>
                {serie.production_countries
                  .slice(0, 2)
                  .map(country => country.name)
                  .join(', ')}
              </Typography>
            </Box>
          )}

        {serie.networks && serie.networks.length > 0 && (
          <Box sx={{ p: 2, borderRadius: 2, border: '1px solid rgba(255,255,255,0.12)', background: 'rgba(255,255,255,0.04)' }}>
            <Typography variant="overline" color="text.secondary" display="block" sx={{ letterSpacing: 0.6 }}>
              Diffuseur
            </Typography>
            <Typography variant="body1" fontWeight={700}>
              {serie.networks[0].name}
            </Typography>
          </Box>
        )}
      </Box>
    </>
  );

  return (
    <Paper elevation={0} sx={{ p: 3, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.10)', borderRadius: 2 }}>
      {isMovie
        ? renderMovieInfo(media as TMDBMovie)
        : renderSerieInfo(media as TMDBSerie)}
    </Paper>
  );
};

export default MediaDetailsInfo;
