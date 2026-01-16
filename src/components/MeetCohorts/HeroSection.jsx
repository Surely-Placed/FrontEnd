import RingCarousel from '@/common/RingCarousel';
import { Box, Button, Typography } from '@mui/material';
import Link from 'next/link';
import React from 'react';

const HeroSection = () => {
  return (
    <Box m={{ xs: '6rem 0 4rem', lg: '8rem 0 2rem' }}>
      <Box display={'flex'} flexDirection={'column'} gap={3} alignItems={'center'}>
        <Typography
          variant="h1"
          fontSize={{ xs: '1.5rem', sm: '2rem', md: '2.5rem', lg: '3.75rem' }}
          color="text"
          textAlign={'center'}
          width={{ xs: '95%', sm: '75%', lg: '65%', xl: '50%' }}
          lineHeight={1.2}
          mt={{ xs: 2, lg: 0 }}
        >
          Build Job-Ready Skills With Mentor-Led Cohorts
        </Typography>
        <Typography
          variant="subtitle1"
          fontSize={{ xs: '0.875rem', sm: '1rem' }}
          color="text.secondary"
          textAlign={'center'}
          width={{ xs: '95%', sm: '75%', lg: '50%', xl: '45%' }}
        >
          Learn with mentors, buddies, and career analytics that turn rejections into repeatable
          interview success.
        </Typography>
        {/* <Link href={'/cohorts'} className="link-styles">
          <Button variant="filled" sx={{ bgcolor: 'primary.main', color: 'extremes.light' }}>
            <Typography variant="subtitle2_bold" color="extremes.light" mt={0.1}>
              Explore Cohorts
            </Typography>
          </Button>
        </Link> */}
      </Box>
      <Box
        position="relative"
        zIndex={0} // lower than navbar
        sx={{ transformStyle: 'preserve-3d' }}
      >
        <RingCarousel />
      </Box>
    </Box>
  );
};

export default HeroSection;
