'use client';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { theme } from './theme';
import { ReactNode } from 'react';

interface MuiProviderProps {
  children: ReactNode;
}

export default function MuiProvider({ children }: Readonly<MuiProviderProps>) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
