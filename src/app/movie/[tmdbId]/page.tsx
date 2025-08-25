'use client';
import React from 'react';
import { useParams } from 'next/navigation';
import { useMediaDetails } from '@/hooks/useMediaDetails';
import MediaDetailLayout from '@/components/shared/MediaDetailLayout';

export default function MovieDetailPage() {
  const params = useParams();
  const tmdbId = parseInt(params.tmdbId as string);

  const {
    media,
    loading,
    error,
    saving,
    userRating,
    userReview,
    handleAddOrUpdateRating,
    handleToggleWishlist,
    handleToggleWatched,
    handleSaveReview
  } = useMediaDetails(tmdbId, 'movie');

  return (
    <MediaDetailLayout
      media={media}
      loading={loading}
      error={error}
      saving={saving}
      userRating={userRating}
      userReview={userReview}
      mediaType="film"
      onAddOrUpdateRating={handleAddOrUpdateRating}
      onToggleWishlist={handleToggleWishlist}
      onToggleWatched={handleToggleWatched}
      onSaveReview={handleSaveReview}
    />
  );
}
