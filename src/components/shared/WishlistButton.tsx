"use client";
import React, { useState } from "react";
import { Bookmark, BookmarkBorder } from "@mui/icons-material";
import { Box, IconButton, Tooltip, CircularProgress } from "@mui/material";
import { alpha } from "@mui/material/styles";
import { Movie, Serie } from "@/types/models";
import { theme } from "@/theme/theme";

interface WishlistButtonProps {
  data: Movie | Serie;
  onToggleWishlist: (id: number, isInWishlist: boolean) => void;
}

export default function WishlistButton({
  data,
  onToggleWishlist,
}: Readonly<WishlistButtonProps>) {
  const [isLoading, setIsLoading] = useState(false);

  const handleToggle = async () => {
    setIsLoading(true);
    try {
      onToggleWishlist(data.id, data.wishlist);
    } catch (error) {
      console.error("Error toggling wishlist:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Tooltip
      title={data.wishlist ? "Retirer des envies" : "Ajouter aux envies"}
    >
      <Box
        sx={{
          position: "absolute",
          bottom: 8,
          left: "50%",
          transform: "translateX(-50%)",
          // Glassmorphism container
          backgroundColor: alpha("#000", 0.3),
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          border: `1px solid ${alpha("#fff", 0.15)}`,
          borderRadius: 12,
          padding: "6px 12px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          cursor: "pointer",
          boxShadow: "0 6px 20px rgba(0,0,0,0.25)",
          transition: "transform .15s ease, box-shadow .15s ease, background-color .2s ease, border-color .2s ease",
          '&:hover': {
            transform: "translateX(-50%) translateY(-1px)",
            boxShadow: "0 10px 28px rgba(0,0,0,0.32)",
          },
          // Active state highlight when in wishlist
          ...(data.wishlist
            ? {
                backgroundColor: alpha(theme.palette.secondary.main, 0.18),
                borderColor: alpha(theme.palette.secondary.main, 0.45),
              }
            : {}),
        }}
        onClick={handleToggle}
      >
        <IconButton
          disabled={isLoading}
          size="small"
          sx={{
            color: data.wishlist
              ? theme.palette.secondary.main
              : alpha(theme.palette.secondary.main, 0.9),
            transition: "transform .15s ease, color .2s ease, opacity .2s ease",
            '&:active': {
              transform: "scale(0.95)",
            },
            "&:disabled": {
              opacity: 0.5,
            },
          }}
          aria-label={data.wishlist ? "Retirer des envies" : "Ajouter aux envies"}
        >
          {isLoading ? (
            <CircularProgress size={18} thickness={5} />
          ) : data.wishlist ? (
            <Bookmark />
          ) : (
            <BookmarkBorder />
          )}
        </IconButton>
      </Box>
    </Tooltip>
  );
}
