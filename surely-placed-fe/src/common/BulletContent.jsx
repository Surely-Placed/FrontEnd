import React from 'react';
import { Typography } from '@mui/material';

const BulletContent = ({ content }) => (
  <Typography
    lineHeight={'1.25rem'}
    component={'div'}
    variant="subtitle1_normal"
    sx={{
      mb: '0.5rem',
      ml: 2,
      color: 'text',
      '&::before': {
        content: '"• "',
        display: 'inline-block',
        width: '0.5em',
      },
    }}
  >
    {content}
  </Typography>
);
export default BulletContent;
