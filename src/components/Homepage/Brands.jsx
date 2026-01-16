import React from 'react';
import Marquee from 'react-fast-marquee';
import { brandsImages } from '../../../mockData/HomePage';
import Image from 'next/image';
import { Box } from '@mui/material';

const Brands = () => {
  return (
    <Box mb={12} p={{ xs: '0 1rem', md: '0 3rem' }}>
      <Marquee speed={50} gradient={false}>
        {brandsImages.map((src, i) => (
          <Image
            src={src}
            alt={`Partner ${i + 1}`}
            key={i}
            width={100}
            height={33}
            unoptimized
            className="brands"
          />
        ))}
      </Marquee>
    </Box>
  );
};

export default Brands;
