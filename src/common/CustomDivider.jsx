import { Box, Divider, Typography } from '@mui/material';
import React from 'react';

const CustomDivider = ({ text }) => {
  return (
    <Box display={'flex'} alignItems={'center'} gap={1} mt={5}>
      <Typography variant="h6_bold" color="primary">
        |
      </Typography>
      <Typography variant="body2" color="text.variation" minWidth={'fit-content'}>
        {text || "Lorem Ipsum"}
      </Typography>
      <Divider sx={{ width: { xs: '70%', sm: '85%', md: '90%', lg: '95%' } }} />
    </Box>
  );
};

export default CustomDivider;
