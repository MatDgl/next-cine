import React, { ReactNode, useState } from 'react';
import { Container, Typography, Box, Button } from '@mui/material';
import ProfileHeader from '@/components/shared/ProfileHeader';

interface MediaTabsProps {
  readonly title: string;
  readonly tabContents: [ReactNode, ReactNode];
}

export default function MediaTabs({ title, tabContents }: MediaTabsProps) {
  const [value, setValue] = useState(0);

  return (
    <Container maxWidth="xl" sx={{ py: 2 }}>
      <ProfileHeader />
      <Typography variant="h3" component="h1" gutterBottom sx={{ textAlign: 'center', mb: 3, fontSize: '2rem' }}>
        {title}
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
        <Box sx={{
          backgroundColor: 'rgba(255,255,255,0.05)',
          borderRadius: 3,
          padding: 0.5,
          display: 'flex',
          gap: 1
        }}>
          <Button
            variant={value === 0 ? 'contained' : 'text'}
            onClick={() => setValue(0)}
            sx={{
              borderRadius: 2,
              px: 3,
              py: 1,
              color: value === 0 ? 'white' : 'rgba(255,255,255,0.7)',
              backgroundColor: value === 0 ? 'primary.main' : 'transparent',
              '&:hover': {
                backgroundColor: value === 0 ? 'primary.dark' : 'rgba(255,255,255,0.1)',
              }
            }}
          >
            Films
          </Button>
          <Button
            variant={value === 1 ? 'contained' : 'text'}
            onClick={() => setValue(1)}
            sx={{
              borderRadius: 2,
              px: 3,
              py: 1,
              color: value === 1 ? 'white' : 'rgba(255,255,255,0.7)',
              backgroundColor: value === 1 ? 'primary.main' : 'transparent',
              '&:hover': {
                backgroundColor: value === 1 ? 'primary.dark' : 'rgba(255,255,255,0.1)',
              }
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
};