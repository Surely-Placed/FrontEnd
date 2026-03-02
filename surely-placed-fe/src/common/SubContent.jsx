import React from 'react';
import { Typography } from '@mui/material';

const SubContent = ({ content }) => (
  <Typography
    component={'div'}
    variant="h6"
    lineHeight={'1.25rem'}
    color="text"
    sx={{
      m: '1.25rem 0',
    }}
  >
    {content}
  </Typography>
);
export default SubContent;
