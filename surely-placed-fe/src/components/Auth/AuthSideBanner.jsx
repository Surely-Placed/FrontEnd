'use client';
import React from 'react';
import { Box, Typography } from '@mui/material';
import { AuthLogo } from '../../../public/images';
import AuthCarousal from '@/common/AuthCarousal';

const AuthSideBanner = () => {
  return (
    <Box
      flex={1}
      className="auth_banner"
      color={'primary.contrastText'}
      sx={{
        display: { xs: 'none', lg: 'block' },
        background: 'url(/Auth/SideBanner.webp) center / cover no-repeat',
        height: '95vh',
        overflow: 'hidden',
        borderRadius: { md: '1.25rem', xl: '1.5rem' },
        m: { md: 2, lg: 2, xl: 3 },
        position: 'relative',
      }}
    >
      <Box
        sx={{
          pt: { md: '1.5rem', xl: '2rem' },
          px: { md: '2rem', xl: '2.5rem' },
        }}
      >
        <AuthLogo />
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        padding={{ md: '2rem 2.5rem' }}
        sx={{ pb: { md: '13rem', lg: '14rem', xl: '15rem' } }}
        width={'100%'}
      >
        <Typography
          fontSize={{ sm: '3rem', lg: '3.75rem', xl: '4.625rem' }}
          fontFamily={'var(--font-avantgarde), sans-serif'}
          fontWeight={{ md: 500, sm: 300 }}
          lineHeight={'normal'}
          maxWidth={'39rem'}
          mb={'2.5rem'}
        >
          Start your Journey with US
        </Typography>
        <Typography variant="h6_nexa" lineHeight={'1.9375rem'} maxWidth={'39rem'} mb={'10rem'}>
          Pellentesque suscipit fringilla libero eu ullamcorper. Cras risus eros, faucibus sit amet
          augue id, tempus pellentesque eros. In imperdiet tristique tincidunt.
        </Typography>

        <AuthCarousal />
      </Box>
    </Box>
  );
};

export default AuthSideBanner;
