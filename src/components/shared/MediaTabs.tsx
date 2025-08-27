import React, { ReactNode, useState } from 'react';
import { Container, Typography, Box, Button } from '@mui/material';
import ProfileHeader from '@/components/shared/ProfileHeader';
import { Movie as MovieIcon, LiveTv as LiveTvIcon } from '@mui/icons-material';

interface MediaTabsProps {
  readonly title: string;
  readonly tabContents: [ReactNode, ReactNode];
}

export default function MediaTabs({ title, tabContents }: MediaTabsProps) {
  const [value, setValue] = useState(0);

  return (
    <Container maxWidth="xl" sx={{ py: 2 }}>
      <ProfileHeader />
      <Typography
        variant="h3"
        component="h1"
        gutterBottom
        sx={{ textAlign: 'center', mb: 3, fontSize: '2rem' }}
      >
        {title}
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
        <Box
          sx={{
            backgroundColor: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.12)',
            borderRadius: 999,
            padding: 0.5,
            display: 'flex',
            gap: 1,
            boxShadow: '0 8px 24px rgba(0,0,0,0.35)',
            backdropFilter: 'blur(6px)',
            WebkitBackdropFilter: 'blur(6px)',
          }}
        >
          <Button
            variant={value === 0 ? 'contained' : 'text'}
            onClick={() => setValue(0)}
            aria-pressed={value === 0}
            sx={{
              borderRadius: 999,
              px: 3,
              py: 1,
              color: value === 0 ? 'white' : 'rgba(255,255,255,0.8)',
              backgroundColor: value === 0 ? 'primary.main' : 'transparent',
              boxShadow: value === 0 ? '0 6px 16px rgba(0,0,0,0.35)' : 'none',
              transition:
                'background-color .2s ease, box-shadow .2s ease, transform .12s ease, color .2s ease',
              '&:hover': {
                backgroundColor:
                  value === 0 ? 'primary.dark' : 'rgba(255,255,255,0.1)',
                transform: value === 0 ? 'translateY(-1px)' : 'none',
              },
              '& .MuiButton-startIcon': {
                mr: 1,
              },
            }}
          >
            Films
          </Button>
          <Button
            variant={value === 1 ? 'contained' : 'text'}
            onClick={() => setValue(1)}
            aria-pressed={value === 1}
            sx={{
              borderRadius: 999,
              px: 3,
              py: 1,
              color: value === 1 ? 'white' : 'rgba(255,255,255,0.8)',
              backgroundColor: value === 1 ? 'primary.main' : 'transparent',
              boxShadow: value === 1 ? '0 6px 16px rgba(0,0,0,0.35)' : 'none',
              transition:
                'background-color .2s ease, box-shadow .2s ease, transform .12s ease, color .2s ease',
              '&:hover': {
                backgroundColor:
                  value === 1 ? 'primary.dark' : 'rgba(255,255,255,0.1)',
                transform: value === 1 ? 'translateY(-1px)' : 'none',
              },
              '& .MuiButton-startIcon': {
                mr: 1,
              },
            }}
          >
            Séries
          </Button>
        </Box>
      </Box>
      {value === 0 && tabContents[0]}
      {value === 1 && tabContents[1]}
    </Container>
  );
}
