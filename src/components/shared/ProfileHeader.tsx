import { theme } from '@/theme/theme';
import Image from 'next/image';
import React from 'react';
import { Box } from '@mui/material';

const profile = {
  name: 'Mathieu',
  inscriptionDate: '22 juillet 2025',
  avatar: '/assets/img/avatar.png',
  background: '/assets/img/bg-profile.png',
};

const buttons = [
    { label: 'Notes', index: 0, href: '/' },
    { label: 'Envie de voir', index: 1, href: '/wish' },
    { label: 'Critiques', index: 2, href: '/reviews' },
    { label: 'Cinémas', index: 3, href: '/cinemas' },
    { label: 'Collections', index: 4, href: '/collections' },
    { label: 'Amis', index: 5, href: '/friends' },
    { label: 'Préférences', index: 6, href: '/preferences' },
    { label: 'Profil', index: 7, href: '/profile' },
  ];

export default function ProfileHeader() {
  return (
    <div className="profile-header" style={{ position: 'relative', width: '100%', height: 180, marginBottom: 16 }}>
      <Image
        src={profile.background}
        alt="Background"
        layout="fill"
        objectFit="cover"
        className="profile-bg"
        priority
      />
      <div
        style={{
          position: 'absolute',
          top: 20,
          left: 30,
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Image
          src={profile.avatar}
          alt="Avatar"
          width={70}
          height={70}
          style={{ borderRadius: '50%', border: '3px solid white' }}
        />
        <div style={{ marginLeft: 16, color: 'white', textShadow: '0 1px 4px #000' }}>
          <h2 style={{ margin: 0, fontSize: '1.5rem' }}>{profile.name}</h2>
          <p style={{ margin: 0, fontSize: '0.9rem', opacity: 0.9 }}>Membre inscrit depuis le {profile.inscriptionDate}</p>
        </div>
      </div>
      <div
        style={{
          position: 'absolute',
          bottom: 16,
          left: 30,
          display: 'flex',
          gap: 12,
          flexWrap: 'wrap',
        }}
      >
        {buttons.map((btn) => (
          <Box
            key={btn.label}
            component="a"
            href={btn.href}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '6px 16px',
              background: theme.palette.background.default,
              backgroundColor: theme.palette.background.default,
              color: 'white',
              borderRadius: 2,
              textDecoration: 'none',
              fontWeight: 500,
              fontSize: '0.85rem',
              boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
              transition: 'transform 0.18s cubic-bezier(.4,2,.6,1), background 0.18s',
              cursor: 'pointer',
              willChange: 'transform',
              verticalAlign: 'middle',
              '&:hover': {
                transform: 'scale(1.08)',
                background: theme.palette.background.paper,
              },
            }}
          >
            {btn.label}
          </Box>
        ))}
      </div>
    </div>
  );
}
