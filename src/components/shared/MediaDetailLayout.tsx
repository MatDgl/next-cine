import React from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Chip, 
  Alert, 
  CircularProgress, 
  Paper 
} from '@mui/material';
import { TMDBMovie, TMDBSerie } from '@/types/models';
import MediaPoster from '@/components/shared/MediaPoster';
import StarRatingDisplay from '@/components/shared/StarRatingDisplay';
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
  onToggleWishlist,
  onToggleWatched,
  onSaveReview
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
        <Alert severity="warning">{mediaType === 'film' ? 'Film non trouvé' : 'Série non trouvée'}</Alert>
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
      
      <Box sx={{ 
        display: 'flex', 
        gap: 4, 
        flexDirection: { xs: 'column', md: 'row' },
        minHeight: '80vh'
      }}>
        
        {/* COLONNE GAUCHE - Affiche et actions */}
        <Box sx={{ 
          width: { xs: '100%', md: '350px' }, 
          flexShrink: 0,
          display: 'flex',
          flexDirection: 'column',
          gap: 3
        }}>
          
          {/* Affiche */}
          <MediaPoster 
            posterPath={media.poster_path}
            title={media.title}
            mediaType={mediaType}
          />

          {/* Notation utilisateur */}
          <Paper elevation={2} sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="h6" gutterBottom>
              Votre note
            </Typography>
            <StarRatingDisplay
              rating={media.local?.rating || userRating}
              onRate={onAddOrUpdateRating}
              readonly={saving}
            />
            {media.local?.rating && (
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                {media.local.rating}/5
              </Typography>
            )}
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
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2, flexWrap: 'wrap' }}>
            <Typography 
              variant="h3" 
              component="h1" 
              sx={{ 
                fontWeight: 'bold',
                color: 'white'
              }}
            >
              {media.title}
            </Typography>
            <Chip 
              label={mediaType === 'film' ? 'Film' : 'Série'} 
              size="small"
              sx={{
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                color: 'white',
                fontWeight: 'medium',
                borderRadius: '16px',
                backdropFilter: 'blur(10px)'
              }}
            />
          </Box>

          {/* Chips de genres */}
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
            {media.genres?.map((genre) => (
              <Chip 
                key={genre.id}
                label={genre.name} 
                size="small"
                sx={{
                  backgroundColor: 'rgba(255, 255, 255, 0.08)',
                  color: 'rgba(255, 255, 255, 0.87)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  fontWeight: 'medium',
                  fontSize: '0.75rem',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.12)',
                  }
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
            <Paper elevation={2} sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Synopsis
              </Typography>
              <Typography variant="body1" sx={{ lineHeight: 1.7 }}>
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
