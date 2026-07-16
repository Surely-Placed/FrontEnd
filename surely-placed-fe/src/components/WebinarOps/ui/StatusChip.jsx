'use client';

import { Chip } from '@mui/material';

export default function StatusChip({ status }) {
  const map = {
    paid: { label: 'Paid', color: 'success' },
    created: { label: 'Pending', color: 'warning' },
    failed: { label: 'Failed', color: 'error' },
  };
  const cfg = map[status] || { label: status || '—', color: 'default' };
  return <Chip size="small" label={cfg.label} color={cfg.color} variant="outlined" />;
}
