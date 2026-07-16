'use client';

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from '@mui/material';
import OpsButton from './OpsButton';

export default function ConfirmDialog({
  open,
  title,
  description,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  tone = 'danger',
  loading = false,
  onConfirm,
  onClose,
}) {
  return (
    <Dialog open={open} onClose={loading ? undefined : onClose} fullWidth maxWidth="xs">
      <DialogTitle sx={{ fontWeight: 700, fontFamily: 'Inter, Arial, sans-serif', pr: 2 }}>
        {title}
      </DialogTitle>
      <DialogContent>
        {typeof description === 'string' ? (
          <Typography variant="body2" color="text.secondary" lineHeight={1.55}>
            {description}
          </Typography>
        ) : (
          description
        )}
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2.5, gap: 1 }}>
        <OpsButton tone="secondary" disabled={loading} onClick={onClose}>
          {cancelLabel}
        </OpsButton>
        <OpsButton tone={tone} disabled={loading} onClick={onConfirm}>
          {loading ? 'Working…' : confirmLabel}
        </OpsButton>
      </DialogActions>
    </Dialog>
  );
}
