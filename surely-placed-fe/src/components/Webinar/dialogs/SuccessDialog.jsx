'use client';

import { Box, Button, Dialog, DialogContent, Typography } from '@mui/material';
import { primaryCtaSx } from '../styles';

export function SuccessDialog({ open, onClose, email, datetimeLabel }) {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogContent sx={{ p: { xs: 3, md: 4 }, textAlign: 'center' }}>
        <Typography
          component="h2"
          variant="h5"
          fontFamily={'var(--font-avantgarde), sans-serif'}
          mb={1}
        >
          You&apos;re in. Congratulations!
        </Typography>
        <Typography variant="body1" color="text.subText" mb={2}>
          Payment confirmed. A confirmation email with your unique Zoom join link is on its way to{' '}
          <Typography component="span" fontWeight={600} color="text">
            {email || 'your email'}
          </Typography>
          .
        </Typography>
        <Box
          sx={{
            bgcolor: 'customBlue.secondary',
            borderRadius: '1rem',
            p: 2.5,
            textAlign: 'left',
            mb: 2,
          }}
        >
          {[
            'Webinar access · ' + datetimeLabel,
            'Unique Zoom join link (check your email)',
            'Calendar details in confirmation email',
            'Software Career Playbook (instant download)',
          ].map((item) => (
            <Typography key={item} variant="body2" color="text.subText" mb={0.75}>
              ✓ {item}
            </Typography>
          ))}
        </Box>
        <Button variant="filled" onClick={onClose} sx={primaryCtaSx}>
          Back to the Page
        </Button>
      </DialogContent>
    </Dialog>
  );
}
