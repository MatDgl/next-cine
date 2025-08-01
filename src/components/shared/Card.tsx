'use client';
import React from 'react';
import { 
  Card as MuiCard, 
  CardMedia, 
  CardContent, 
  Typography, 
  Box 
} from '@mui/material';
import Link from 'next/link';
import { Movie, Serie } from '@/types/models';
import StarRating from './StarRating';
import WishlistButton from './WishlistButton';

interface CardProps {
  data: Movie | Serie;
  onRatingUpdate?: (movieId: number, newRating: number) => void;
  isWishlistMode?: boolean;
  isInWishlist?: boolean;
  onToggleWishlist?: (id: number, isInWishlist: boolean) => void;
}

export default function Card({ data, onRatingUpdate, isWishlistMode, isInWishlist, onToggleWishlist }: Readonly<CardProps>) {
  const handleImageError = (event: React.SyntheticEvent<HTMLImageElement>) => {
    const target = event.target as HTMLImageElement;
    target.src = '/assets/img/movie/default.png';
  };

  const handleRatingUpdate = (newRating: number) => {
    onRatingUpdate?.(data.id, newRating);
  };

  return (
    <MuiCard 
      sx={{ 
        maxWidth: 200,
        backgroundColor: 'background.paper',
        '&:hover': {
          transform: 'scale(1.05)',
          transition: 'transform 0.2s ease-in-out'
        }
      }}
    >
      <Box sx={{ position: 'relative' }}>
        <Link href="/" passHref>
          <CardMedia
            component="img"
            height="280"
            image={`/assets/img/movie/${data.src}.jpg`}
            alt={data.title}
            onError={handleImageError}
            sx={{ 
              cursor: 'pointer',
              objectFit: 'cover'
            }}
          />
        </Link>
        
        {data.rating && !isWishlistMode && (
          <Box 
            sx={{
              position: 'absolute',
              bottom: 8,
              left: '50%',
              transform: 'translateX(-50%)',
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              borderRadius: 2,
              padding: '6px 12px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <StarRating 
              data={data} 
              onRatingUpdate={handleRatingUpdate}
            />
          </Box>
        )}

        {isWishlistMode && (
          <Box 
            sx={{
              position: 'absolute',
              bottom: 8,
              left: '50%',
              transform: 'translateX(-50%)',
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              borderRadius: 2,
              padding: '6px 12px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <WishlistButton 
              data={data} 
              isInWishlist={isInWishlist || false}
              onToggleWishlist={onToggleWishlist || (() => {})}
            />
          </Box>
        )}
      </Box>
      
      <CardContent sx={{ py: 1.5, px: 1.5 }}>
        <Typography 
          variant="body2" 
          component="div"
          sx={{ 
            textAlign: 'center',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            fontWeight: 500
          }}
        >
          {data.title}
        </Typography>
      </CardContent>
    </MuiCard>
  );
}
