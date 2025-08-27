import React from 'react';
import { Box, Paper } from '@mui/material';
import { SearchService } from '@/services/searchService';

interface MediaPosterProps {
  posterPath?: string | null;
  title?: string;
  mediaType: 'film' | 'série';
}

const MediaPoster: React.FC<MediaPosterProps> = ({
  posterPath,
  title,
  mediaType,
}) => {
  const gradientColor =
    mediaType === 'film'
      ? 'rgba(25, 118, 210, 0.1)'
      : 'rgba(156, 39, 176, 0.1)';

  return (
    <Paper
      elevation={8}
      sx={{
        borderRadius: 2,
        overflow: 'hidden',
        background: `linear-gradient(135deg, 
          ${posterPath ? 'transparent' : gradientColor} 0%, 
          ${posterPath ? 'transparent' : gradientColor.replace('0.1', '0.05')} 100%)`,
      }}
    >
      <Box
        component="img"
        src={
          posterPath
            ? SearchService.getTMDBImageUrl(posterPath, 'w500')
            : '/assets/img/movie/default.png'
        }
        alt={title}
        sx={{
          width: '100%',
          aspectRatio: '2/3',
          objectFit: 'cover',
          display: 'block',
        }}
        onError={e => {
          (e.target as HTMLImageElement).src = '/assets/img/movie/default.png';
        }}
      />
    </Paper>
  );
};

export default MediaPoster;
