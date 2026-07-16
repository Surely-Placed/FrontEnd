'use client';

import { Box, Typography } from '@mui/material';

export function CountdownBlock({ label, value }) {
  return (
    <Box
      sx={{
        minWidth: { xs: 64, sm: 88 },
        p: '14px 0',
        borderRadius: '0.875rem',
        bgcolor: 'extremes.light',
        border: '1px solid',
        borderColor: 'customBlue.light',
        textAlign: 'center',
      }}
    >
      <Typography
        fontFamily={'var(--font-avantgarde), sans-serif'}
        fontSize={{ xs: '1.75rem', sm: '2.25rem' }}
        fontWeight={700}
        color="primary.main"
      >
        {value}
      </Typography>
      <Typography
        variant="body2"
        color="text.subText"
        textTransform="uppercase"
        fontSize={{ xs: '0.75rem', sm: '0.875rem' }}
      >
        {label}
      </Typography>
    </Box>
  );
}
