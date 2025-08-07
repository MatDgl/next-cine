"use client";
import React, { useState } from "react";
import { Bookmark, BookmarkBorder } from "@mui/icons-material";
import { Box, IconButton, Tooltip } from "@mui/material";
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
          backgroundColor: theme.palette.background.paper,
          borderRadius: 2,
          padding: "6px 12px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          cursor: "pointer",
        }}
        onClick={handleToggle}
      >
        <IconButton
          disabled={isLoading}
          size="small"
          sx={{
            color: theme.palette.secondary.main,
            "&:disabled": {
              opacity: 0.5,
            },
          }}
        >
          {data.wishlist ? <Bookmark /> : <BookmarkBorder />}
        </IconButton>
      </Box>
    </Tooltip>
  );
}
