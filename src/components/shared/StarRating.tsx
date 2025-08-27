'use client';
import React, { useState } from 'react';
import { Star, StarHalf, StarBorder } from '@mui/icons-material';
import { Box, Tooltip } from '@mui/material';
import { Movie } from '@/types/models';
import { MovieService } from '@/services/movieService';
import { SerieService } from '@/services/serieService';
import { theme } from '@/theme/theme';

interface StarRatingProps {
  data?: Movie;
  onRatingUpdate?: (newRating: number) => void;
  kind?: 'movie' | 'serie';
  // Props alternatives pour mode display simple
  rating?: number;
  onRate?: (rating: number) => void;
  readonly?: boolean;
  iconSize?: string | number;
}

export default function StarRating({
  data,
  onRatingUpdate,
  kind = 'movie',
  rating,
  onRate,
  readonly = false,
  iconSize = '1.2rem',
}: Readonly<StarRatingProps>) {
  const [hoveredRating, setHoveredRating] = useState<number | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const starIndexes = [0, 1, 2, 3, 4];

  // Support pour les deux modes : avec data (mode complet) ou avec rating (mode display)
  const getCurrentRating = () => data?.rating ?? rating ?? 0;
  const getDisplayRating = () => hoveredRating ?? getCurrentRating();

  const getStarIcon = (index: number) => {
    const rating = getDisplayRating();

    if (rating >= index + 1) {
      return <Star sx={{ color: theme.palette.secondary.main }} />;
    } else if (rating >= index + 0.5) {
      return <StarHalf sx={{ color: theme.palette.secondary.main }} />;
    } else {
      return <StarBorder sx={{ color: theme.palette.secondary.main }} />;
    }
  };

  const handleMouseMove = (
    event: React.MouseEvent<HTMLElement>,
    index: number
  ) => {
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

  const handleClickRating = async () => {
    if (isSaving || !hoveredRating || readonly) return;

    // Mode display simple (sans data)
    if (!data && onRate) {
      onRate(hoveredRating);
      return;
    }

    // Mode complet avec data
    if (!data) return;

    const oldRating = data.rating;
    data.rating = hoveredRating;

    setIsSaving(true);

    try {
      if (kind === 'serie') {
        await SerieService.updateRating(data.id, hoveredRating);
      } else {
        await MovieService.updateRating(data.id, hoveredRating);
      }
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
        cursor: readonly ? 'default' : 'pointer',
        '& .MuiSvgIcon-root': {
          fontSize: iconSize,
        },
      }}
      onMouseLeave={clearHover}
    >
      {starIndexes.map(index => (
        <Tooltip
          key={index}
          title={getTooltipText()}
          placement="top"
          slotProps={{ tooltip: { sx: { fontSize: '1rem' } } }}
        >
          <Box
            component="span"
            onMouseMove={e => handleMouseMove(e, index)}
            onClick={handleClickRating}
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              cursor: readonly ? 'default' : isSaving ? 'wait' : 'pointer',
            }}
          >
            {getStarIcon(index)}
          </Box>
        </Tooltip>
      ))}
    </Box>
  );
}
