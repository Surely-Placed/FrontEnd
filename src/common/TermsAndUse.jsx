import { Box, Typography } from '@mui/material';
import Link from 'next/link';
import React from 'react';

const TermsAndUse = () => {
  return (
    <Box>
      <Typography variant="body1" color="text.subText" sx={{ mt: '1rem' }}>
        By signing up, you agree to our{' '}
        <Link href={'/terms-and-conditions'} style={{ color: '#2857C4', textDecoration: 'none' }}>
          Terms of Use
        </Link>{' '}
        and{' '}
        <Link href={'/privacy-policy'} style={{ color: '#2857C4', textDecoration: 'none' }}>
          Privacy Policy
        </Link>
        .
      </Typography>
      <Typography variant="body1" color="text.subText" sx={{ mt: '1.25rem' }}>
        Have an Account ?{' '}
        <Link
          href="/login"
          style={{
            color: '#2857C4',
            textDecoration: 'none',
            fontWeight: 700,
            fontSize: '1rem',
          }}
        >
          Sign In
        </Link>
      </Typography>
    </Box>
  );
};

export default TermsAndUse;
