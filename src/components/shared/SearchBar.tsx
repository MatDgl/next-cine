'use client';

import React, { useEffect, useState } from 'react';
import {
  Avatar,
  Box,
  Chip,
  CircularProgress,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  Paper,
  Popper,
  TextField,
  Typography,
} from '@mui/material';
import { Clear, Search } from '@mui/icons-material';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SearchService } from '@/services/searchService';
import { SearchResponse, TMDBMovie, TMDBSerie } from '@/types/models';

interface SearchBarProps {
  onSelect?: (result: TMDBMovie | TMDBSerie) => void;
}

export default function SearchBar({ onSelect }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [debounceId, setDebounceId] = useState<ReturnType<
    typeof setTimeout
  > | null>(null);
  const pathname = usePathname();

  const handleSearch = async (value: string) => {
    if (!value.trim()) {
      setResults(null);
      return;
    }
    setLoading(true);
    try {
      const res = await SearchService.search(value, 10);
      setResults(res);
    } catch (e) {
      console.error('Erreur lors de la recherche:', e);
      setResults(null);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setQuery(value);
    setAnchorEl(event.currentTarget);
    if (debounceId) clearTimeout(debounceId);
    const id = setTimeout(() => handleSearch(value), 300);
    setDebounceId(id);
  };

  const handleClear = () => {
    setQuery('');
    setResults(null);
    setAnchorEl(null);
    if (debounceId) clearTimeout(debounceId);
  };

  const handleResultClick = (result: TMDBMovie | TMDBSerie) => {
    // Fermer la recherche immédiatement
    setResults(null);
    setAnchorEl(null);
    setQuery(''); // Vider la recherche lors du clic
    onSelect?.(result);
  };

  const getResultUrl = (result: TMDBMovie | TMDBSerie) => {
    const type = result.type === 'movie' ? 'movie' : 'serie';
    return `/${type}/${result.tmdbId}`;
  };

  const handleClickOutside = React.useCallback((event: MouseEvent) => {
    if (anchorEl && !anchorEl.contains(event.target as Node)) {
      const popperElement = document.querySelector('[data-popper-placement]');
      if (popperElement && !popperElement.contains(event.target as Node)) {
        setResults(null);
        setAnchorEl(null);
      }
    }
  }, [anchorEl]);

  useEffect(() => {
    return () => {
      if (debounceId) clearTimeout(debounceId);
    };
  }, [debounceId]);

  const formatDate = (date?: string) =>
    date ? new Date(date).getFullYear().toString() : '';

  const getImageUrl = (posterPath?: string) =>
    posterPath
      ? SearchService.getTMDBImageUrl(posterPath, 'w92')
      : '/assets/img/movie/default.png';

  const open = Boolean(anchorEl && results && results.results.length > 0);

  useEffect(() => {
    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [open, handleClickOutside]);

  // Vider la recherche lors du changement de page
  useEffect(() => {
    setQuery('');
    setResults(null);
    setAnchorEl(null);
    if (debounceId) clearTimeout(debounceId);
  }, [pathname, debounceId]);

  return (
    <Box sx={{ position: 'relative' }}>
      <TextField
        value={query}
        onChange={handleInputChange}
        placeholder="Rechercher un film ou une série..."
        size="small"
        sx={theme => ({
          width: { xs: 220, sm: 320, md: 380 },
          '& .MuiOutlinedInput-root': {
            borderRadius: 999,
            paddingRight: 0.5,
            backgroundColor: 'rgba(255,255,255,0.06)',
            boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.08)',
            transition: 'box-shadow 0.2s ease, background-color 0.2s ease',
            '& fieldset': { borderColor: 'transparent' },
            '&:hover': {
              backgroundColor: 'rgba(255,255,255,0.09)',
              boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.18)',
            },
            '&.Mui-focused': {
              backgroundColor: 'rgba(255,255,255,0.12)',
              boxShadow: `0 0 0 2px ${theme.palette.primary.main}40`,
              '& fieldset': { borderColor: theme.palette.primary.main },
            },
          },
          '& .MuiInputBase-input': {
            color: theme.palette.getContrastText(theme.palette.primary.main),
            '&::placeholder': { color: 'rgba(255, 255, 255, 0.7)' },
          },
        })}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              {loading ? (
                <CircularProgress size={20} sx={{ color: 'white' }} />
              ) : (
                <Search sx={{ color: 'rgba(255, 255, 255, 0.7)' }} />
              )}
            </InputAdornment>
          ),
          endAdornment: query ? (
            <InputAdornment position="end">
              <IconButton
                onClick={handleClear}
                size="small"
                sx={{ color: 'rgba(255, 255, 255, 0.7)' }}
              >
                <Clear />
              </IconButton>
            </InputAdornment>
          ) : undefined,
        }}
      />

      <Popper
        open={open}
        anchorEl={anchorEl}
        placement="bottom-start"
        style={{
          zIndex: 1300,
          width: anchorEl ? anchorEl.getBoundingClientRect().width : 'auto',
        }}
        modifiers={[
          {
            name: 'offset',
            options: {
              offset: [0, 4],
            },
          },
          {
            name: 'preventOverflow',
            enabled: true,
            options: {
              altAxis: true,
              altBoundary: true,
              tether: true,
              rootBoundary: 'viewport',
            },
          },
        ]}
      >
        <Paper
          sx={theme => ({
            width: '100%',
            maxHeight: 420,
            overflow: 'auto',
            boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
            backgroundColor: theme.palette.background.paper,
            border: `1px solid ${theme.palette.divider}`,
            borderRadius: 2,
          })}
        >
          <List>
            {results?.results.map(result => (
              <ListItem
                key={`${result.type}-${result.tmdbId}`}
                disablePadding
              >
                <Link
                  href={getResultUrl(result)}
                  style={{
                    textDecoration: 'none',
                    color: 'inherit',
                    display: 'flex',
                    width: '100%',
                    alignItems: 'flex-start',
                    padding: '12px 16px',
                  }}
                  onClick={() => handleResultClick(result)}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      width: '100%',
                      cursor: 'pointer',
                      '&:hover': { backgroundColor: 'action.hover' },
                      py: 0.5,
                      borderRadius: 1,
                    }}
                  >
                    <Box sx={{ mr: 2, flexShrink: 0 }}>
                      <Avatar
                        src={getImageUrl(result.poster_path)}
                        alt={result.title}
                        variant="rounded"
                        sx={{ width: 40, height: 60 }}
                      />
                    </Box>
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 1,
                          mb: 0.5,
                        }}
                      >
                        <Typography variant="subtitle2" component="span">
                          {result.title}
                        </Typography>
                        <Chip
                          label={
                            result.type === 'movie' ? 'Film' : 'Série'
                          }
                          size="small"
                          color={
                            result.type === 'movie'
                              ? 'primary'
                              : 'secondary'
                          }
                          sx={{ fontSize: '0.7rem', height: 20 }}
                        />
                        {result.local && (
                          <Chip
                            label="Local"
                            size="small"
                            variant="outlined"
                            sx={{ fontSize: '0.7rem', height: 20 }}
                          />
                        )}
                      </Box>
                      <React.Fragment>
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          component="span"
                          display="block"
                        >
                          {SearchService.isMovie(result)
                            ? formatDate((result as TMDBMovie).release_date)
                            : formatDate((result as TMDBSerie).first_air_date)}
                          {result.vote_average &&
                            ` • ⭐ ${result.vote_average.toFixed(1)}`}
                          {result.local?.rating &&
                            ` • 🎯 ${result.local.rating}/5`}
                        </Typography>
                        {result.overview && (
                          <Typography
                            variant="caption"
                            color="text.secondary"
                            component="span"
                            sx={{
                              display: '-webkit-box',
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: 'vertical',
                              overflow: 'hidden',
                              mt: 0.5,
                            }}
                          >
                            {result.overview}
                          </Typography>
                        )}
                      </React.Fragment>
                    </Box>
                  </Box>
                </Link>
              </ListItem>
            ))}
          </List>
        </Paper>
      </Popper>
    </Box>
  );
}
