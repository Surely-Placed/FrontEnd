import React from 'react';
import { Box, Typography } from '@mui/material';

const Divider = () => {
  return (
    <Box display={'flex'} alignItems={'center'} sx={{ my: '2.5rem' }}>
      <Box sx={{ flex: 1, height: '1px', backgroundColor: 'rgba(28, 28, 28, 0.10)' }} />
      <Typography
        mx={2}
        fontFamily={'var(--font-nexa), Arial, sans-serif'}
        fontSize={'0.875rem'}
        fontWeight={400}
        color={'text.subText'}
        lineHeight={'normal'}
      >
        or
      </Typography>
      <Box sx={{ flex: 1, height: '1px', backgroundColor: '#E6E6E6' }} />
    </Box>
  );
};

export default Divider;
