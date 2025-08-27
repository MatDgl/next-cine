'use client';
import React from 'react';
import {
  Card as MuiCard,
  CardMedia,
  CardContent,
  Typography,
  Box,
} from '@mui/material';
import Link from 'next/link';
import { Movie, Serie } from '@/types/models';
import StarRating from './StarRating';
import WishlistButton from './WishlistButton';
import { theme } from '@/theme/theme';

interface CardProps {
  data: Movie | Serie;
  onRatingUpdate?: (movieId: number, newRating: number) => void;
  isWishlistMode?: boolean;
  onToggleWishlist?: (id: number, isInWishlist: boolean) => void;
  kind?: 'movie' | 'serie';
}

export default function Card({
  data,
  onRatingUpdate,
  isWishlistMode,
  onToggleWishlist,
  kind = 'movie',
}: Readonly<CardProps>) {
  const defaultImageSrc = '/assets/img/movie/default.png';

  const handleImageError = (event: React.SyntheticEvent<HTMLImageElement>) => {
    const target = event.target as HTMLImageElement;
    target.src = defaultImageSrc;
  };

  const handleRatingUpdate = (newRating: number) => {
    onRatingUpdate?.(data.id, newRating);
  };

  // Déterminer l'image à utiliser
  // Utiliser le poster TMDB si disponible, sinon l'image par défaut
  const getTMDBImageUrl = (posterPath: string) => {
    return `https://image.tmdb.org/t/p/w500${posterPath}`;
  };

  const imageSrc = data.tmdb?.poster_path
    ? getTMDBImageUrl(data.tmdb.poster_path)
    : defaultImageSrc;

  // Déterminer le lien vers la page de détail
  const detailLink = data.tmdbId ? `/${kind}/${data.tmdbId}` : '/'; // Pour les données sans tmdbId, revenir à l'accueil

  return (
    <MuiCard
      sx={{
        maxWidth: 260,
        backgroundColor: theme.palette.background.paper,
        '&:hover': {
          transform: 'scale(1.05)',
          transition: 'transform 0.2s ease-in-out',
        },
      }}
    >
      <Box sx={{ position: 'relative' }}>
        <Link href={detailLink} passHref>
          <CardMedia
            component="img"
            height="360"
            image={imageSrc}
            alt={data.title}
            onError={handleImageError}
            sx={{
              cursor: 'pointer',
              objectFit: 'cover',
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
              backgroundColor: theme.palette.background.paper,
              borderRadius: 2,
              padding: '6px 12px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <StarRating
              data={data}
              onRatingUpdate={handleRatingUpdate}
              kind={kind}
            />
          </Box>
        )}

        {isWishlistMode && (
          <WishlistButton
            data={data}
            onToggleWishlist={onToggleWishlist || (() => {})}
          />
        )}
      </Box>

      <Typography
        variant="body1"
        component="div"
        sx={{
          padding: 1,
          textAlign: 'center',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          fontWeight: 500,
        }}
      >
        {data.title}
      </Typography>
    </MuiCard>
  );
}
