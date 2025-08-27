'use client';
import React from 'react';
import { AppBar, Toolbar, Typography, Box } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import SearchBar from './SearchBar';
import { TMDBMovie, TMDBSerie } from '@/types/models';
import { SearchService } from '@/services/searchService';

export default function Navbar() {
  const router = useRouter();

  const handleSearchSelect = (result: TMDBMovie | TMDBSerie) => {
    // Rediriger vers la page de détail en utilisant le tmdbId
    if (SearchService.isMovie(result)) {
      router.push(`/movie/${result.tmdbId}`);
    } else {
      router.push(`/serie/${result.tmdbId}`);
    }
  };

  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
          <Link href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            <Typography
              variant="h6"
              component="span"
              sx={{
                cursor: 'pointer',
                fontWeight: 'bold',
              }}
            >
              NextCine
            </Typography>
          </Link>

          <Box sx={{ width: 12 }} />
          <SearchBar onSelect={handleSearchSelect} />
          <Box sx={{ flexGrow: 1 }} />
        </Box>
      </Toolbar>
    </AppBar>
  );
}
