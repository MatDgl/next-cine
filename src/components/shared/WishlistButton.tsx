'use client';
import React, { useState } from 'react';
import { 
  Bookmark, 
  BookmarkBorder 
} from '@mui/icons-material';
import { Box, Tooltip, IconButton } from '@mui/material';
import { Movie, Serie } from '@/types/models';

interface WishlistButtonProps {
  data: Movie | Serie;
  isInWishlist: boolean;
  onToggleWishlist: (id: number, isInWishlist: boolean) => void;
}

export default function WishlistButton({ data, isInWishlist, onToggleWishlist }: Readonly<WishlistButtonProps>) {
  const [isLoading, setIsLoading] = useState(false);

  const handleToggle = async () => {
    setIsLoading(true);
    try {
      onToggleWishlist(data.id, isInWishlist);
    } catch (error) {
      console.error('Error toggling wishlist:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
      }}
    >
      <Tooltip title={isInWishlist ? "Retirer des envies" : "Ajouter aux envies"}>
        <IconButton
          onClick={handleToggle}
          disabled={isLoading}
          size="small"
          sx={{
            color: '#ffc107',
            '&:hover': {
              backgroundColor: 'rgba(255, 193, 7, 0.1)',
            },
            '&:disabled': {
              opacity: 0.5
            }
          }}
        >
          {isInWishlist ? <Bookmark /> : <BookmarkBorder />}
        </IconButton>
      </Tooltip>
    </Box>
  );
}
