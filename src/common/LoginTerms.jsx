import { Box, Typography } from '@mui/material';
import Link from 'next/link';
import React from 'react';

const LoginTerms = () => {
  return (
    <Box>
      <Typography variant="body1" color="text.subText" >
       Don't have an account ?{' '}
        <Link
          href="/signup"
          style={{
            color: '#2857C4',
            textDecoration: 'none',
            fontWeight: 700,
            fontSize: '1rem',
          }}
        >
          Sign Up
        </Link>
      </Typography>
    </Box>
  );
};

export default LoginTerms;
