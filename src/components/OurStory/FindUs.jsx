import CustomDivider from '@/common/CustomDivider';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import React from 'react';

const FindUs = () => {
  return (
    <Box
      p={{
        xs: '0rem 1rem 4rem',
        sm: '0rem 2rem 4rem',
        md: '0rem 4rem 4rem',
        xl: '0rem 6rem 8rem',
      }}
    >
      <CustomDivider text={'Our Locations'} />
      <Typography
        fontSize={{ xs: '1.25rem', sm: '2rem', md: '2.5rem' }}
        fontWeight={500}
        color="text"
        my={2}
        fontFamily={'var(--font-avantgarde), sans-serif'}
      >
        Our Global Presence
      </Typography>
      <Box display={{ xs: 'none', md: 'flex' }} justifyContent={'center'}>
        <Box width={'80%'}>
          <Image
            src={'/OurStory/Map.webp'}
            alt="world-map"
            width={100}
            height={100}
            unoptimized
            className="w_100 h_100"
          />
        </Box>
      </Box>
      <Box display={{ xs: 'flex', md: 'none' }} justifyContent={'center'}>
        <Image
          src={'/OurStory/MapMob.webp'}
          alt="world-map"
          width={100}
          height={100}
          unoptimized
          className="w_100 h_auto"
        />
      </Box>
    </Box>
  );
};

export default FindUs;
