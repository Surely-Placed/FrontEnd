'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Box, Typography } from '@mui/material';
import { slides } from '../../mockData/Auth';

const AuthCarousal = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length);
    }, 4500);
    return () => clearInterval(id);
  }, []);

  const activeSlide = slides[activeIndex];

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: { md: '1.25rem', lg: '1.5rem' },
        px: { md: '2rem', xl: '2.5rem' },
      }}
    >
      <Box
        sx={{
          maxWidth: { md: '39rem' },
          width: '100%',
          bgcolor: '#ADC5FE',
          color: '#1A1A1A',
          borderRadius: '1.875rem',
          p: { md: '1.875rem' },
          boxShadow: '0 10px 30px rgba(0,0,0,0.12)',
          backdropFilter: 'blur(2px)',
          position: 'relative',
        }}
      >
        <Typography variant="body1" color="text" lineHeight={'1.3125rem'}>
          {activeSlide.quote}
        </Typography>
        <Box display="flex" alignItems="center" mt={'1rem'}>
          <Image
            src={activeSlide.avatar}
            alt={activeSlide.name}
            width={44}
            height={44}
            style={{ borderRadius: '9999px' }}
          />
          <Box ml={1.25}>
            <Typography variant="body1" color="text" lineHeight={'1.5rem'}>
              {activeSlide.name}
            </Typography>
            <Typography variant="caption" color="text" lineHeight={'1.5rem'}>
              {activeSlide.role}
            </Typography>
          </Box>
        </Box>
      </Box>
      {/* Dots outside the card, centered */}
      <Box display="flex" justifyContent="center" mt={'0.5rem'}>
        {slides.map((s, idx) => (
          <Box
            key={s.id}
            onClick={() => setActiveIndex(idx)}
            sx={{
              width: idx === activeIndex ? 10 : 8,
              height: idx === activeIndex ? 10 : 8,
              borderRadius: '50%',
              bgcolor: idx === activeIndex ? '#FFFFFF' : 'rgba(255,255,255,0.55)',
              mx: 0.5,
              cursor: 'pointer',
              transition: 'all .2s ease',
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default AuthCarousal;
