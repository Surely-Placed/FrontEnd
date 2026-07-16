'use client';

import { Stack, Typography } from '@mui/material';
import OpsButton from './OpsButton';

export default function PaginationBar({ pagination, onPageChange, loading }) {
  if (!pagination || pagination.total === 0) return null;
  const { page, totalPages, total, pageSize } = pagination;
  const from = (page - 1) * pageSize + 1;
  const to = Math.min(page * pageSize, total);

  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      mt={2}
      flexWrap="wrap"
      gap={1}
    >
      <Typography variant="body2" color="text.secondary" lineHeight={1.4}>
        {from}–{to} of {total}
        {totalPages > 1 ? ` · page ${page}/${totalPages}` : ''} · EST · USD
      </Typography>
      <Stack direction="row" gap={1}>
        <OpsButton
          tone="secondary"
          size="small"
          disabled={loading || page <= 1}
          onClick={() => onPageChange(page - 1)}
        >
          Previous
        </OpsButton>
        <Typography variant="body2" alignSelf="center" px={1} lineHeight={1.4}>
          Page {page} / {totalPages}
        </Typography>
        <OpsButton
          tone="secondary"
          size="small"
          disabled={loading || page >= totalPages}
          onClick={() => onPageChange(page + 1)}
        >
          Next
        </OpsButton>
      </Stack>
    </Stack>
  );
}
