'use client';
import React, { useState } from 'react';
import { 
  Star, 
  StarHalf, 
  StarBorder 
} from '@mui/icons-material';
import { Box, Tooltip } from '@mui/material';
import { Movie } from '@/types/models';
import { MovieService } from '@/services/movieService';

interface StarRatingProps {
  data: Movie;
  onRatingUpdate?: (newRating: number) => void;
}

export default function StarRating({ data, onRatingUpdate }: StarRatingProps) {
  const [hoveredRating, setHoveredRating] = useState<number | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  
  const starIndexes = [0, 1, 2, 3, 4];

  const getDisplayRating = () => hoveredRating ?? data.rating ?? 0;

  const getStarIcon = (index: number) => {
    const rating = getDisplayRating();
    
    if (rating >= index + 1) {
      return <Star sx={{ color: '#ffc107' }} />;
    } else if (rating >= index + 0.5) {
      return <StarHalf sx={{ color: '#ffc107' }} />;
    } else {
      return <StarBorder sx={{ color: '#ffc107' }} />;
    }
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLElement>, index: number) => {
    const target = event.target as HTMLElement;
    const rect = target.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const half = rect.width / 2;
    const isHalf = mouseX < half;
    setHoveredRating(index + (isHalf ? 0.5 : 1));
  };

  const clearHover = () => {
    setHoveredRating(null);
  };

  const handleClickRating = async () => {
    if (isSaving || !hoveredRating) return;

    const oldRating = data.rating;
    data.rating = hoveredRating;
    
    setIsSaving(true);

    try {
      await MovieService.updateRating(data.id, hoveredRating);
      onRatingUpdate?.(hoveredRating);
    } catch (error) {
      data.rating = oldRating;
      console.error('Failed to update rating:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const getTooltipText = () => {
    const rating = getDisplayRating();
    const result = rating + ' - ';
    
    switch (rating) {
      case 0.5:
        return result + 'Nul';
      case 1:
        return result + 'Très Mauvais';
      case 1.5:
        return result + 'Mauvais';
      case 2:
        return result + 'Pas terrible';
      case 2.5:
        return result + 'Moyen';
      case 3:
        return result + 'Pas mal';
      case 3.5:
        return result + 'Bien';
      case 4:
        return result + 'Très bien';
      case 4.5:
        return result + 'Excellent';
      case 5:
        return result + "Chef-d'œuvre";
      default:
        return 'Aucune évaluation';
    }
  };

  return (
    <Box 
      sx={{ 
        display: 'flex', 
        cursor: 'pointer',
        '& .MuiSvgIcon-root': {
          fontSize: '1.2rem'
        }
      }}
      onMouseLeave={clearHover}
    >
      {starIndexes.map((index) => (
        <Tooltip 
          key={index}
          title={getTooltipText()}
          placement="top"
        >
          <Box
            component="span"
            onMouseMove={(e) => handleMouseMove(e, index)}
            onClick={handleClickRating}
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              cursor: isSaving ? 'wait' : 'pointer'
            }}
          >
            {getStarIcon(index)}
          </Box>
        </Tooltip>
      ))}
    </Box>
  );
}
