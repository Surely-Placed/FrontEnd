'use client';

import { Box } from '@mui/material';

export default function OpsCard({ children, sx }) {
  return (
    <Box
      sx={{
        p: { xs: 2.5, md: 3 },
        width: '100%',
        maxWidth: '100%',
        boxSizing: 'border-box',
        borderRadius: '12px',
        border: '1px solid #D8E1F4',
        bgcolor: '#fff',
        overflow: 'visible',
        fontFamily: 'Inter, Arial, sans-serif',
        '& .MuiTypography-root': {
          fontFamily: 'Inter, Arial, sans-serif',
          overflow: 'visible',
        },
        ...sx,
      }}
    >
      {children}
    </Box>
  );
}
