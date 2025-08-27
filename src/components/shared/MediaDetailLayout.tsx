import React from 'react';
import {
  Box,
  Container,
  Typography,
  Chip,
  Alert,
  CircularProgress,
  Paper,
  IconButton,
} from '@mui/material';
import { Close } from '@mui/icons-material';
import { TMDBMovie, TMDBSerie } from '@/types/models';
import MediaPoster from '@/components/shared/MediaPoster';
import StarRating from '@/components/shared/StarRating';
import MediaDetailsActions from '@/components/shared/MediaDetailsActions';
import TMDBRating from '@/components/shared/TMDBRating';
import MediaDetailsInfo from '@/components/shared/MediaDetailsInfo';
import ReviewSection from '@/components/shared/ReviewSection';

interface MediaDetailLayoutProps {
  media: TMDBMovie | TMDBSerie | null;
  loading: boolean;
  error: string | null;
  saving: boolean;
  userRating: number;
  userReview: string;
  mediaType: 'film' | 'série';
  onAddOrUpdateRating: (rating: number) => Promise<void>;
  onClearRating: () => Promise<void>;
  onToggleWishlist: () => Promise<void>;
  onToggleWatched: (event: React.MouseEvent) => Promise<void>;
  onSaveReview: (review: string) => Promise<void>;
}

const MediaDetailLayout: React.FC<MediaDetailLayoutProps> = ({
  media,
  loading,
  error,
  saving,
  userRating,
  userReview,
  mediaType,
  onAddOrUpdateRating,
  onClearRating,
  onToggleWishlist,
  onToggleWatched,
  onSaveReview,
}) => {
  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4, textAlign: 'center' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  if (!media) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="warning">
          {mediaType === 'film' ? 'Film non trouvé' : 'Série non trouvée'}
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <Box
        sx={{
          display: 'flex',
          gap: 4,
          flexDirection: { xs: 'column', md: 'row' },
          minHeight: '80vh',
        }}
      >
        {/* COLONNE GAUCHE - Affiche et actions */}
        <Box
          sx={{
            width: { xs: '100%', md: '350px' },
            flexShrink: 0,
            display: 'flex',
            flexDirection: 'column',
            gap: 3,
          }}
        >
          {/* Affiche */}
          <MediaPoster
            posterPath={media.poster_path}
            title={media.title}
            mediaType={mediaType}
          />

          {/* Notation utilisateur */}
          <Paper elevation={2} sx={{ p: 3 }}>
            <Typography variant="h6" align="center" sx={{ mb: 1 }}>
              Votre note
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 1 }}>
              <StarRating
                rating={media.local?.rating || userRating}
                onRate={onAddOrUpdateRating}
                readonly={saving}
                iconSize="1.6rem"
              />
              {(media.local?.rating || userRating > 0) && (
                <IconButton
                  aria-label="Supprimer la note"
                  onClick={onClearRating}
                  disabled={saving}
                  size="small"
                  sx={{ color: 'rgba(255,255,255,0.8)' }}
                >
                  <Close fontSize="small" />
                </IconButton>
              )}
            </Box>
          </Paper>

          {/* Boutons d'action */}
          <MediaDetailsActions
            isInWishlist={media.local?.wishlist || false}
            isWatched={media.local?.watched || false}
            viewCount={media.local?.viewCount}
            saving={saving}
            mediaType={mediaType}
            onToggleWishlist={onToggleWishlist}
            onToggleWatched={onToggleWatched}
          />
        </Box>

        {/* COLONNE DROITE - Informations détaillées */}
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 3 }}>
          {/* Titre principal avec chip type */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              mb: 2,
              flexWrap: 'wrap',
            }}
          >
            <Typography
              variant="h3"
              component="h1"
              sx={{
                fontWeight: 800,
                color: 'white',
                letterSpacing: 0.2,
                textShadow: '0 2px 12px rgba(0,0,0,0.25)',
              }}
            >
              {media.title}
            </Typography>
            <Chip
              label={mediaType === 'film' ? 'Film' : 'Série'}
              size="small"
              sx={{
                backgroundColor: 'rgba(255, 255, 255, 0.12)',
                color: 'white',
                fontWeight: 700,
                borderRadius: '16px',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.24)'
              }}
            />
          </Box>

          {/* Chips de genres */}
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.25, mb: 3 }}>
            {media.genres?.map(genre => (
              <Chip
                key={genre.id}
                label={genre.name}
                size="medium"
                sx={{
                  backgroundColor: 'rgba(255, 255, 255, 0.08)',
                  color: 'rgba(255, 255, 255, 0.9)',
                  border: '1px solid rgba(255, 255, 255, 0.16)',
                  fontWeight: 600,
                  fontSize: '0.85rem',
                  height: 32,
                  px: 1.25,
                  borderRadius: '18px',
                  letterSpacing: 0.15,
                  backdropFilter: 'blur(10px)',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.14)',
                    borderColor: 'rgba(255, 255, 255, 0.26)',
                  },
                }}
              />
            ))}
          </Box>

          {/* Note TMDB */}
          {media.vote_average && (
            <TMDBRating
              voteAverage={media.vote_average}
              voteCount={media.vote_count}
            />
          )}

          {/* Informations détaillées */}
          <MediaDetailsInfo media={media} />

          {/* Synopsis */}
          {media.overview && (
            <Paper
              elevation={0}
              sx={{
                p: 3,
                background: 'linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.04))',
                border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: 2,
                boxShadow: '0 8px 20px rgba(0,0,0,0.18)',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                <Box sx={{ width: 6, height: 22, borderRadius: 1, background: 'rgba(255,255,255,0.5)' }} />
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                  Synopsis
                </Typography>
              </Box>
              <Typography variant="body1" sx={{ lineHeight: 1.9, color: 'rgba(255,255,255,0.92)' }}>
                {media.overview}
              </Typography>
            </Paper>
          )}

          {/* Section critique */}
          <ReviewSection
            review={media.local?.review}
            saving={saving}
            mediaType={mediaType}
            hasLocalEntry={!!media.local}
            onSaveReview={onSaveReview}
          />
        </Box>
      </Box>
    </Container>
  );
};

export default MediaDetailLayout;
