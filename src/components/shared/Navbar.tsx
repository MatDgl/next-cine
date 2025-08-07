'use client';
import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Box
} from '@mui/material';
import Link from 'next/link';

export default function Navbar() {
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
                fontWeight: 'bold'
              }}
            >
              NextCine
            </Typography>
          </Link>
          <Box sx={{ flexGrow: 1 }} />
          {/* TODO: Ajouter un champ de recherche */}
          <Box sx={{ flexGrow: 1 }} />
        </Box>
      </Toolbar>
    </AppBar>
  );
}
