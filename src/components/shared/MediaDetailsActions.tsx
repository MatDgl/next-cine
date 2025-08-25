import React from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { 
  Favorite, 
  FavoriteBorder, 
  Visibility,
  VisibilityOff 
} from '@mui/icons-material';

interface MediaDetailsActionsProps {
  isInWishlist: boolean;
  isWatched: boolean;
  viewCount?: number;
  saving: boolean;
  mediaType: 'film' | 'série';
  onToggleWishlist: () => void;
  onToggleWatched: (event: React.MouseEvent) => void;
}

const MediaDetailsActions: React.FC<MediaDetailsActionsProps> = ({
  isInWishlist,
  isWatched,
  viewCount = 0,
  saving,
  mediaType,
  onToggleWishlist,
  onToggleWatched
}) => {
  const mediaTypeText = mediaType === 'film' ? {
    addToList: 'Films à voir plus tard',
    markAsWatched: 'Marquer comme vu',
    watchedText: (count: number) => `Vu ${count} fois`,
    watchedTextFeminine: (count: number) => `Vue ${count} fois`
  } : {
    addToList: 'Séries à voir plus tard',  
    markAsWatched: 'Marquer comme vue',
    watchedText: (count: number) => `Vue ${count} fois`,
    watchedTextFeminine: (count: number) => `Vue ${count} fois`
  };

  return (
    <Box sx={{ display: 'flex', gap: 2 }}>
      {/* Bouton Wishlist */}
      <Box
        sx={{
          flex: 1,
          backgroundColor: alpha('#000', 0.3),
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          border: `1px solid ${alpha('#fff', 0.15)}`,
          borderRadius: 12,
          p: 2,
          cursor: 'pointer',
          boxShadow: '0 6px 20px rgba(0,0,0,0.25)',
          transition: 'transform .15s ease, box-shadow .15s ease, background-color .2s ease, border-color .2s ease',
          '&:hover': {
            transform: 'translateY(-1px)',
            boxShadow: '0 10px 28px rgba(0,0,0,0.32)',
          },
          ...(isInWishlist
            ? {
                backgroundColor: alpha('#e91e63', 0.18),
                borderColor: alpha('#e91e63', 0.45),
              }
            : {}),
        }}
        onClick={onToggleWishlist}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box
            sx={{
              backgroundColor: isInWishlist ? '#e91e63' : alpha('#e91e63', 0.2),
              borderRadius: '8px',
              p: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'transform .15s ease',
              '&:active': {
                transform: 'scale(0.95)',
              }
            }}
          >
            {saving ? (
              <CircularProgress size={18} thickness={5} sx={{ color: '#e91e63' }} />
            ) : isInWishlist ? (
              <Favorite sx={{ color: 'white', fontSize: '1.2rem' }} />
            ) : (
              <FavoriteBorder sx={{ color: '#e91e63', fontSize: '1.2rem' }} />
            )}
          </Box>
          <Box>
            <Typography variant="body2" fontWeight="medium" color="white">
              {isInWishlist ? 'Dans ma liste' : 'Ajouter à ma liste'}
            </Typography>
            <Typography variant="caption" sx={{ color: alpha('#fff', 0.6) }}>
              {isInWishlist ? 'Retirer de la wishlist' : mediaTypeText.addToList}
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Bouton Visionnage */}
      <Box
        sx={{
          flex: 1,
          backgroundColor: alpha('#000', 0.3),
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          border: `1px solid ${alpha('#fff', 0.15)}`,
          borderRadius: 12,
          p: 2,
          cursor: 'pointer',
          boxShadow: '0 6px 20px rgba(0,0,0,0.25)',
          transition: 'transform .15s ease, box-shadow .15s ease, background-color .2s ease, border-color .2s ease',
          '&:hover': {
            transform: 'translateY(-1px)',
            boxShadow: '0 10px 28px rgba(0,0,0,0.32)',
          },
          ...(isWatched
            ? {
                backgroundColor: alpha('#4caf50', 0.18),
                borderColor: alpha('#4caf50', 0.45),
              }
            : {}),
        }}
        onClick={onToggleWatched}
        onContextMenu={(e) => {
          e.preventDefault();
          onToggleWatched(e);
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box
            sx={{
              backgroundColor: isWatched ? '#4caf50' : alpha('#4caf50', 0.2),
              borderRadius: '8px',
              p: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'transform .15s ease',
              '&:active': {
                transform: 'scale(0.95)',
              }
            }}
          >
            {saving ? (
              <CircularProgress size={18} thickness={5} sx={{ color: '#4caf50' }} />
            ) : isWatched ? (
              <Visibility sx={{ color: 'white', fontSize: '1.2rem' }} />
            ) : (
              <VisibilityOff sx={{ color: '#4caf50', fontSize: '1.2rem' }} />
            )}
          </Box>
          <Box>
            <Typography variant="body2" fontWeight="medium" color="white">
              {isWatched 
                ? mediaType === 'film' 
                  ? mediaTypeText.watchedText(viewCount || 1)
                  : mediaTypeText.watchedTextFeminine(viewCount || 1)
                : mediaTypeText.markAsWatched}
            </Typography>
            <Typography variant="caption" sx={{ color: alpha('#fff', 0.6) }}>
              Clic gauche +1 | Clic droit -1
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default MediaDetailsActions;
