'use client';

import {
  Button,
  Dialog,
  DialogContent,
  IconButton,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { CloseIcon } from '../../../../public/images';

export function ExitIntentDialog({
  open,
  onClose,
  name,
  email,
  onNameChange,
  onEmailChange,
  sent,
  onSubmit,
}) {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogContent sx={{ p: 3, position: 'relative' }}>
        <IconButton
          aria-label="Close"
          onClick={onClose}
          sx={{ position: 'absolute', top: 8, right: 8 }}
        >
          <CloseIcon />
        </IconButton>
        <Typography
          component="h3"
          variant="h6"
          fontFamily={'var(--font-avantgarde), sans-serif'}
          mb={1}
          pr={4}
        >
          Wait, before you leave
        </Typography>
        {!sent ? (
          <Stack spacing={2}>
            <Typography variant="body2" color="text.subText">
              Get the <strong>free Resume Checklist</strong> we use with every placed student. No
              payment needed.
            </Typography>
            <TextField fullWidth label="Name" value={name} onChange={onNameChange} />
            <TextField
              fullWidth
              label="Email"
              type="email"
              value={email}
              onChange={onEmailChange}
            />
            <Button
              variant="filled"
              fullWidth
              onClick={onSubmit}
              sx={{ bgcolor: 'secondary.main', color: 'extremes.light' }}
            >
              Send Me the Free Checklist
            </Button>
          </Stack>
        ) : (
          <Typography variant="body2" color="text.subText">
            ✓ Checklist sent. Check your inbox. Your seat is still waiting if you change your mind.
          </Typography>
        )}
      </DialogContent>
    </Dialog>
  );
}
