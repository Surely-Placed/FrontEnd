import React from 'react';
import { Typography } from '@mui/material';

const SubtitleContent = ({ content }) => (
  <Typography
    component={'div'}
    variant="subtitle1_normal"
    lineHeight={'1.25rem'}
    color="text"
    sx={{
      m: '1.25rem 0',
    }}
  >
    {content}
  </Typography>
);
export default SubtitleContent;
