import React, { useState } from 'react';
import { Box, Typography, Paper, Button, TextField } from '@mui/material';

interface ReviewSectionProps {
  review?: string;
  saving: boolean;
  mediaType: 'film' | 'série';
  hasLocalEntry: boolean;
  onSaveReview: (review: string) => void;
}

const ReviewSection: React.FC<ReviewSectionProps> = ({
  review = '',
  saving,
  mediaType,
  hasLocalEntry,
  onSaveReview,
}) => {
  const [userReview, setUserReview] = useState(review || '');
  const [showReviewForm, setShowReviewForm] = useState(false);

  const handleSave = async () => {
    await onSaveReview(userReview);
    setShowReviewForm(false);
  };

  const handleEdit = () => {
    setShowReviewForm(true);
    setUserReview(review || '');
  };

  const handleCancel = () => {
    setShowReviewForm(false);
    setUserReview(review || '');
  };

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.10)',
        borderRadius: 2,
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
        <Box sx={{ width: 6, height: 22, borderRadius: 1, background: 'rgba(255,255,255,0.5)' }} />
        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          Ma critique
        </Typography>
      </Box>

      {review && !showReviewForm ? (
        <Box>
          <Typography variant="body1" paragraph sx={{ fontStyle: 'italic' }}>
            &ldquo;{review}&rdquo;
          </Typography>
          <Button onClick={handleEdit} size="small">
            Modifier
          </Button>
        </Box>
      ) : (
        <Box>
          <TextField
            fullWidth
            multiline
            rows={5}
            placeholder={`Partagez votre avis sur ${mediaType === 'film' ? 'ce film' : 'cette série'}...`}
            value={userReview}
            onChange={e => setUserReview(e.target.value)}
            variant="outlined"
            sx={{
              mb: 2,
              '& .MuiOutlinedInput-root': {
                background: 'rgba(255,255,255,0.03)',
              },
            }}
          />
          <Box sx={{ display: 'flex', gap: 1.5 }}>
            <Button
              variant="contained"
              onClick={handleSave}
              disabled={saving || !hasLocalEntry}
            >
              {saving ? 'Sauvegarde...' : 'Sauvegarder'}
            </Button>
            {showReviewForm && (
              <Button variant="text" onClick={handleCancel} color="inherit">
                Annuler
              </Button>
            )}
          </Box>
          {!hasLocalEntry && (
            <Typography
              variant="caption"
              color="text.secondary"
              display="block"
              sx={{ mt: 1 }}
            >
              Ajoutez d&apos;abord{' '}
              {mediaType === 'film' ? 'le film' : 'la série'} à votre collection
              pour pouvoir écrire une critique
            </Typography>
          )}
        </Box>
      )}
    </Paper>
  );
};

export default ReviewSection;
