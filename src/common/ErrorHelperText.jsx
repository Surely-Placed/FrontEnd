import { Box, Typography } from '@mui/material';
import React from 'react';

const ErrorHelperText = ({ message = 'Please enter this field' }) => {
  return (
    <Box mt={'0.375rem'}>
      <Typography variant="subtitle2" color="error">
        {message}
      </Typography>
    </Box>
  );
};

export default ErrorHelperText;