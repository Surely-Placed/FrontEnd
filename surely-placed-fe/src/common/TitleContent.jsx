import React from 'react';
import { Typography } from '@mui/material';

const TitleContent = ({ content }) => (
  <Typography
    variant="h5"
    mb={'0.5rem'}
    sx={{
      fontSize: { xs: '1.1rem', sm: '1.5rem' },
    }}
  >
    {content}
  </Typography>
);
export default TitleContent;
