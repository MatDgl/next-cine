import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

interface TMDBRatingProps {
  voteAverage: number;
  voteCount?: number;
}

const TMDBRating: React.FC<TMDBRatingProps> = ({ voteAverage, voteCount }) => {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        mb: 3,
        background: 'linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.04))',
        backdropFilter: 'blur(16px)',
        border: '1px solid rgba(255, 255, 255, 0.12)',
        borderRadius: '14px',
        maxWidth: { xs: '100%', sm: 560 },
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1 }}>
          <Typography
            variant="h3"
            fontWeight={800}
            sx={{ color: '#FFD54F', lineHeight: 1 }}
          >
            {voteAverage.toFixed(1)}
          </Typography>
          <Typography variant="h6" sx={{ color: 'rgba(255,255,255,0.8)', fontWeight: 700 }}>
            /10
          </Typography>
        </Box>
        <Box sx={{ textAlign: 'right' }}>
          <Typography variant="subtitle1" sx={{ color: 'rgba(255,255,255,0.95)', fontWeight: 800, letterSpacing: 0.4, textTransform: 'uppercase' }}>
            Note TMDB
          </Typography>
          <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.75)' }}>
            {voteCount?.toLocaleString('fr-FR') || 'N/A'} votes
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
};

export default TMDBRating;
