import React, { useState } from 'react';
import { Box, Tooltip } from '@mui/material';
import { Star, StarHalf, StarBorder } from '@mui/icons-material';

interface StarRatingDisplayProps {
  rating: number;
  onRate?: (rating: number) => void;
  readonly?: boolean;
}

const StarRatingDisplay: React.FC<StarRatingDisplayProps> = ({ 
  rating, 
  onRate, 
  readonly = false 
}) => {
  const [hoveredRating, setHoveredRating] = useState<number | null>(null);
  const starIndexes = [0, 1, 2, 3, 4];

  const getDisplayRating = () => hoveredRating ?? rating;

  const getStarIcon = (index: number) => {
    const currentRating = getDisplayRating();
    
    if (currentRating >= index + 1) {
      return <Star sx={{ color: '#f57c00' }} />;
    } else if (currentRating >= index + 0.5) {
      return <StarHalf sx={{ color: '#f57c00' }} />;
    } else {
      return <StarBorder sx={{ color: '#f57c00' }} />;
    }
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLElement>, index: number) => {
    if (readonly) return;
    const target = event.target as HTMLElement;
    const rect = target.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const half = rect.width / 2;
    const isHalf = mouseX < half;
    setHoveredRating(index + (isHalf ? 0.5 : 1));
  };

  const clearHover = () => {
    if (!readonly) setHoveredRating(null);
  };

  const handleClick = () => {
    if (readonly || !hoveredRating || !onRate) return;
    onRate(hoveredRating);
  };

  const getTooltipText = () => {
    const currentRating = getDisplayRating();
    const result = currentRating + ' - ';
    
    switch (currentRating) {
      case 0.5: return result + 'Nul';
      case 1: return result + 'Très Mauvais';
      case 1.5: return result + 'Mauvais';
      case 2: return result + 'Pas terrible';
      case 2.5: return result + 'Moyen';
      case 3: return result + 'Pas mal';
      case 3.5: return result + 'Bien';
      case 4: return result + 'Très bien';
      case 4.5: return result + 'Excellent';
      case 5: return result + "Chef-d'œuvre";
      default: return 'Aucune évaluation';
    }
  };

  return (
    <Box 
      sx={{ 
        display: 'flex', 
        cursor: readonly ? 'default' : 'pointer',
        '& .MuiSvgIcon-root': {
          fontSize: '1.5rem'
        }
      }}
      onMouseLeave={clearHover}
    >
      {starIndexes.map((index) => (
        <Tooltip 
          key={index}
          title={getTooltipText()}
          placement="top"
          slotProps={{ tooltip: { sx: { fontSize: '1rem' } } }}
        >
          <Box
            component="span"
            onMouseMove={(e) => handleMouseMove(e, index)}
            onClick={handleClick}
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              cursor: readonly ? 'default' : 'pointer'
            }}
          >
            {getStarIcon(index)}
          </Box>
        </Tooltip>
      ))}
    </Box>
  );
};

export default StarRatingDisplay;
