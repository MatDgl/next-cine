import React from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { theme } from '@/theme/theme';
import {
  Bookmark,
  BookmarkBorder,
  VisibilityOutlined,
  VisibilityOffOutlined,
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
  onToggleWatched,
}) => {
  const mediaTypeText =
    mediaType === 'film'
      ? {
          addToList: 'envie de voir',
          markAsWatched: 'Marquer comme vu',
          watchedText: (count: number) => `Vu ${count} fois`,
          watchedTextFeminine: (count: number) => `Vue ${count} fois`,
        }
      : {
          addToList: 'envie de voir',
          markAsWatched: 'Marquer comme vue',
          watchedText: (count: number) => `Vue ${count} fois`,
          watchedTextFeminine: (count: number) => `Vue ${count} fois`,
        };

  return (
    <Box sx={{ display: 'flex', gap: 2 }}>
      {/* Bouton Wishlist */}
      <Box
        sx={{
          flex: 1,
          backgroundColor: alpha('#000', 0.2),
          border: `2px solid ${alpha(theme.palette.secondary.main, 0.3)}`,
          borderRadius: 12,
          p: 1.25,
          cursor: 'pointer',
          boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
          transition:
            'transform .15s ease, box-shadow .15s ease, background-color .2s ease, border-color .2s ease',
          '&:hover': {
            transform: 'translateY(-1px)',
            boxShadow: '0 4px 12px rgba(0,0,0,0.25)',
            backgroundColor: alpha(theme.palette.secondary.main, 0.2),
          },
          '&:active': {
            transform: 'translateY(0px)',
            transition: 'transform .1s ease',
          },
          ...(isInWishlist
            ? {
                backgroundColor: alpha(theme.palette.secondary.main, 0.15),
              }
            : {}),
        }}
        onClick={onToggleWishlist}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 0.75,
          }}
        >
          {saving ? (
            <CircularProgress
              size={20}
              thickness={5}
              sx={{ color: theme.palette.secondary.main }}
            />
          ) : isInWishlist ? (
            <Bookmark sx={{ color: 'white', fontSize: '1.6rem' }} />
          ) : (
            <BookmarkBorder
              sx={{ color: theme.palette.secondary.main, fontSize: '1.6rem' }}
            />
          )}
          <Typography variant="body2" fontWeight="medium" color="white">
            {isInWishlist ? 'Dans ma liste' : 'Envie de voir'}
          </Typography>
        </Box>
      </Box>

      {/* Bouton Visionnage */}
      <Box
        sx={{
          flex: 1,
          backgroundColor: alpha('#000', 0.2),
          border: `2px solid ${alpha('#4caf50', 0.3)}`,
          borderRadius: 12,
          p: 1.25,
          cursor: 'pointer',
          boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
          transition:
            'transform .15s ease, box-shadow .15s ease, background-color .2s ease, border-color .2s ease',
          '&:hover': {
            transform: 'translateY(-1px)',
            boxShadow: '0 4px 12px rgba(0,0,0,0.25)',
            backgroundColor: alpha('#4caf50', 0.2),
          },
          '&:active': {
            transform: 'translateY(0px)',
            transition: 'transform .1s ease',
          },
          ...(isWatched
            ? {
                backgroundColor: alpha('#4caf50', 0.15),
              }
            : {}),
        }}
        onClick={onToggleWatched}
        onContextMenu={e => {
          e.preventDefault();
          onToggleWatched(e);
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 0.75,
          }}
        >
          {saving ? (
            <CircularProgress
              size={20}
              thickness={5}
              sx={{ color: '#4caf50' }}
            />
          ) : isWatched ? (
            <VisibilityOutlined sx={{ color: 'white', fontSize: '1.6rem' }} />
          ) : (
            <VisibilityOffOutlined
              sx={{ color: '#4caf50', fontSize: '1.6rem' }}
            />
          )}
          <Typography variant="body2" fontWeight="medium" color="white">
            {isWatched
              ? mediaType === 'film'
                ? mediaTypeText.watchedText(viewCount || 1)
                : mediaTypeText.watchedTextFeminine(viewCount || 1)
              : mediaTypeText.markAsWatched}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default MediaDetailsActions;
