import React from 'react';
import Image from 'next/image';
import { Box, Typography } from '@mui/material';
import AuthSideBanner from '../Auth/AuthSideBanner';
import { WebLogo } from '../../../public/images';

const AuthLayout = ({ children }) => {
  return (
    <Box
      display="flex"
      minHeight="100vh"
      flexDirection={{ xs: 'column', md: 'row' }}
      sx={{
        overflowX: 'hidden',
        overflowY: 'visible',
      }}
    >
      <AuthSideBanner />
      <Box
        flex={1}
        position="relative"
        display="flex"
        flexDirection="column"
        justifyContent={{ xs: 'flex-start', md: 'center' }}
        alignItems="center"
        px={{ xs: 3, sm: 4 }}
        pt={{ xs: '3.62rem', md: 0 }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default AuthLayout;
