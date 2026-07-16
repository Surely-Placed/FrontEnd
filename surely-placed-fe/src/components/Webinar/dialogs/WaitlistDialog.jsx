'use client';

import {
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { primaryCtaSx } from '../styles';

export function WaitlistDialog({
  open,
  onClose,
  name,
  email,
  phone,
  onNameChange,
  onEmailChange,
  onPhoneChange,
  error,
  loading,
  sent,
  onSubmit,
}) {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogContent sx={{ p: 3 }}>
        <Typography component="h3" variant="h6" fontFamily={'var(--font-avantgarde), sans-serif'} mb={1}>
          No webinar scheduled right now
        </Typography>
        {!sent ? (
          <Stack spacing={2}>
            <Typography variant="body2" color="text.subText">
              Leave your details and we&apos;ll notify you as soon as the next live session opens for
              registration.
            </Typography>
            <TextField fullWidth required label="Name" value={name} onChange={onNameChange} />
            <TextField
              fullWidth
              required
              label="Email"
              type="email"
              value={email}
              onChange={onEmailChange}
            />
            <TextField
              fullWidth
              label="Phone (optional)"
              value={phone}
              onChange={onPhoneChange}
            />
            {error && (
              <Typography variant="body2" color="error">
                {error}
              </Typography>
            )}
            <Button
              variant="filled"
              fullWidth
              disabled={loading}
              onClick={onSubmit}
              sx={primaryCtaSx}
            >
              {loading ? <CircularProgress size={22} sx={{ color: '#fff' }} /> : 'Notify Me'}
            </Button>
          </Stack>
        ) : (
          <Typography variant="body2" color="text.subText">
            ✓ You&apos;re on the list. We&apos;ll email you the moment seats open.
          </Typography>
        )}
      </DialogContent>
    </Dialog>
  );
}
