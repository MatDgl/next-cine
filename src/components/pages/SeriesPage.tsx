"use client";
import React, { useState, useEffect } from "react";
import { Box, Button, Typography, CircularProgress } from "@mui/material";
import { Serie } from "@/types/models";
import { useFilters } from "@/contexts/FiltersContext";
import Card from "@/components/shared/Card";
import Filters from "@/components/shared/Filters";
import { SerieService } from "@/services/serieService";

export default function SeriesPage() {
  const [allSeries, setAllSeries] = useState<Serie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { filterSeries, visibleCount, setVisibleCount } = useFilters();

  useEffect(() => {
    loadSeries();
  }, []);

  const loadSeries = async () => {
    try {
      setLoading(true);
      const series = await SerieService.getSeries();
      setAllSeries(series);
    } catch (err) {
      setError("Erreur lors du chargement des séries");
      console.error("Error loading series:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleRatingUpdate = (serieId: number, newRating: number) => {
    setAllSeries((prevSeries) =>
      prevSeries.map((serie) =>
        serie.id === serieId ? { ...serie, rating: newRating } : serie
      )
    );
  };

  const filteredSeries = filterSeries(allSeries);
  const visibleSeries = filteredSeries.slice(0, visibleCount);
  const canShowMore = filteredSeries.length > visibleSeries.length;

  const showMore = () => {
    setVisibleCount(visibleCount + 20);
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ textAlign: "center", py: 4 }}>
        <Typography color="error">{error}</Typography>
        <Button onClick={loadSeries} sx={{ mt: 2 }}>
          Réessayer
        </Button>
      </Box>
    );
  }

  return (
    <Box>
      <Filters />
      {visibleSeries.length > 0 ? (
        <>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "repeat(2, 1fr)",
                sm: "repeat(3, 1fr)",
                md: "repeat(4, 1fr)",
                lg: "repeat(5, 1fr)",
                xl: "repeat(6, 1fr)",
              },
              gap: 2,
              mb: 3,
            }}
          >
      {visibleSeries.map((serie) => (
              <Box key={serie.id}>
        <Card data={serie} onRatingUpdate={handleRatingUpdate} kind="serie" />
              </Box>
            ))}
          </Box>
          {canShowMore && (
            <Box sx={{ textAlign: "center" }}>
              <Button variant="outlined" onClick={showMore} size="large">
                Voir plus
              </Button>
            </Box>
          )}
        </>
      ) : (
        <Box sx={{ textAlign: "center", py: 4 }}>
          <Typography variant="h6" color="text.secondary">
            Aucune série trouvée.
          </Typography>
        </Box>
      )}
    </Box>
  );
}
