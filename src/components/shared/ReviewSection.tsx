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
  onSaveReview 
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
    <Paper elevation={2} sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Ma critique
      </Typography>
      
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
            rows={4}
            placeholder={`Partagez votre avis sur ${mediaType === 'film' ? 'ce film' : 'cette série'}...`}
            value={userReview}
            onChange={(e) => setUserReview(e.target.value)}
            variant="outlined"
            sx={{ mb: 2 }}
          />
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button
              variant="contained"
              onClick={handleSave}
              disabled={saving || !hasLocalEntry}
            >
              {saving ? 'Sauvegarde...' : 'Sauvegarder'}
            </Button>
            {showReviewForm && (
              <Button onClick={handleCancel}>
                Annuler
              </Button>
            )}
          </Box>
          {!hasLocalEntry && (
            <Typography variant="caption" color="text.secondary" display="block" sx={{ mt: 1 }}>
              Ajoutez d&apos;abord {mediaType === 'film' ? 'le film' : 'la série'} à votre collection pour pouvoir écrire une critique
            </Typography>
          )}
        </Box>
      )}
    </Paper>
  );
};

export default ReviewSection;
