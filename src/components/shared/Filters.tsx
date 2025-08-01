'use client';
import React from 'react';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  SelectChangeEvent
} from '@mui/material';
import { Context, SortOption } from '@/types/models';
import { useFilters } from '@/contexts/FiltersContext';

interface FiltersProps {
  context: Context;
}

export default function Filters({ context }: FiltersProps) {
  const {
    sortValue,
    setSortValue,
    rateValue,
    setRateValue,
    serieTypeValue,
    setSerieTypeValue,
  } = useFilters();

  const sortBy = [
    { label: 'Dernières modifications', value: SortOption.LASTMODIFIED, id: 0 },
    { label: 'Notes décroissantes', value: SortOption.RATING_DESC, id: 1 },
    { label: 'Notes croissantes', value: SortOption.RATING_ASC, id: 2 },
    { label: 'Titres A-Z', value: SortOption.TITLE, id: 3 },
  ];

  const rates = [
    { label: 'Toutes les notes', value: 0, id: -1 },
    { label: '1 étoile', value: 1, id: 0 },
    { label: '2 étoiles', value: 2, id: 1 },
    { label: '3 étoiles', value: 3, id: 2 },
    { label: '4 étoiles', value: 4, id: 3 },
    { label: '5 étoiles', value: 5, id: 4 },
  ];

  const serieTypes = [
    { label: 'Toutes les séries', value: 0, id: -1 },
    { label: 'Séries que je suis', value: 1, id: 0 },
    { label: 'Séries notées', value: 2, id: 1 },
  ];

  const handleSortChange = (event: SelectChangeEvent<SortOption>) => {
    setSortValue(event.target.value as SortOption);
  };

  const handleRateChange = (event: SelectChangeEvent<number>) => {
    setRateValue(event.target.value as number);
  };

  const handleSerieTypeChange = (event: SelectChangeEvent<number>) => {
    setSerieTypeValue(event.target.value as number);
  };

  return (
    <Box 
      sx={{ 
        display: 'flex', 
        gap: 2, 
        mb: 3,
        flexWrap: 'wrap',
        alignItems: 'center'
      }}
    >
      {/* Sort selection */}
      <FormControl size="small" sx={{ minWidth: 200 }}>
        <InputLabel>Trier par</InputLabel>
        <Select
          value={sortValue}
          label="Trier par"
          onChange={handleSortChange}
        >
          {sortBy.map((sort) => (
            <MenuItem key={sort.id} value={sort.value}>
              {sort.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Serie type filter - only for series */}
      {context === Context.SERIE && (
        <FormControl size="small" sx={{ minWidth: 180 }}>
          <InputLabel>Filtrer par statut</InputLabel>
          <Select
            value={serieTypeValue}
            label="Filtrer par statut"
            onChange={handleSerieTypeChange}
          >
            {serieTypes.map((serieType) => (
              <MenuItem key={serieType.id} value={serieType.value}>
                {serieType.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}

      {/* Rating filter */}
      <FormControl size="small" sx={{ minWidth: 160 }}>
        <InputLabel>Filtrer par note</InputLabel>
        <Select
          value={rateValue}
          label="Filtrer par note"
          onChange={handleRateChange}
        >
          {rates.map((rate) => (
            <MenuItem key={rate.id} value={rate.value}>
              {rate.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
