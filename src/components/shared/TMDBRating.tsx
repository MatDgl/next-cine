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
        p: 2.5, 
        mb: 3, 
        background: 'rgba(255, 255, 255, 0.05)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '12px',
        maxWidth: 'fit-content'
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2.5 }}>
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h4" fontWeight="bold" sx={{ color: '#FFD700', mb: 0.5 }}>
            ⭐ {voteAverage.toFixed(1)}
          </Typography>
          <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
            /10
          </Typography>
        </Box>
        <Box>
          <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.9)', fontWeight: 'medium' }}>
            Note TMDB
          </Typography>
          <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.6)' }}>
            {voteCount?.toLocaleString('fr-FR') || 'N/A'} votes
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
};

export default TMDBRating;
