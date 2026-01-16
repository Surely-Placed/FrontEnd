'use client';
import React, { useRef, useEffect } from 'react';
import { Box } from '@mui/material';
import { slides } from '../../mockData/MeetCohorts';

const RingCarousel = () => {
  const ringRef = useRef(null);
  const slideRefs = useRef([]);
  const startX = useRef(0);
  const isDragging = useRef(false);
  const rotationY = useRef(360);

  const handleDragStart = (clientX) => {
    isDragging.current = true;
    startX.current = clientX;
  };

  const handleDragMove = (clientX) => {
    if (!isDragging.current) return;
    const delta = clientX - startX.current;
    rotationY.current -= delta * 0.1;
    startX.current = clientX;
    updateSlides();
  };

  const handleDragEnd = () => {
    isDragging.current = false;
  };

  const updateSlides = () => {
    slideRefs.current.forEach((slide, i) => {
      if (!slide) return;
      const rotateY = i * (360 / slides.length);
      const transformDesktop = `rotateY(${rotateY + rotationY.current}deg) translateZ(-900px)`;
      const transformTab = `rotateY(${rotateY + rotationY.current}deg) translateZ(-1000px)`;
      const transformMob = `rotateY(${rotateY + rotationY.current}deg) translateZ(-400px)`;
      const transformLargeMob = `rotateY(${rotateY + rotationY.current}deg) translateZ(-700px)`;
      const transformLarge = `rotateY(${rotateY + rotationY.current}deg) translateZ(-1300px)`;

      const width = window.innerWidth;
      if (width < 400) slide.style.transform = transformMob;
      else if (width < 600) slide.style.transform = transformLargeMob;
      else if (width < 900) slide.style.transform = transformTab;
      else if (width < 1200) slide.style.transform = transformLarge;
      else slide.style.transform = transformDesktop;

      slide.style.backfaceVisibility = 'hidden';
      slide.style.transformStyle = 'preserve-3d';
    });
  };

  useEffect(() => {
    const rotate = () => {
      if (!isDragging.current) {
        rotationY.current += 0.1;
        updateSlides();
      }
      requestAnimationFrame(rotate);
    };

    requestAnimationFrame(rotate);
    const handleResize = () => updateSlides();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    updateSlides();
  }, []);

  return (
    <Box
      width="100%"
      height={{ xs: '35vh', sm: '70vh', lg: '50vh' }}
      overflow="hidden"
      mt={{ xs: 0, sm: -10, lg: 4 }}
      mb={8}
      sx={{
        perspective: { xs: '500px', sm: '900px', lg: '1800px', xl: '2000px' },
        userSelect: 'none',
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      onMouseDown={(e) => handleDragStart(e.clientX)}
      onMouseMove={(e) => handleDragMove(e.clientX)}
      onMouseUp={handleDragEnd}
      onMouseLeave={handleDragEnd}
      onTouchStart={(e) => handleDragStart(e.touches[0].clientX)}
      onTouchMove={(e) => handleDragMove(e.touches[0].clientX)}
      onTouchEnd={handleDragEnd}
    >
      <Box
        ref={ringRef}
        sx={{
          width: '100%',
          height: '100%',
          transformStyle: 'preserve-3d',
          cursor: isDragging.current ? 'grabbing' : 'grab',
          position: 'relative',
        }}
      >
        {slides.map((src, i) => (
          <Box
            key={i}
            ref={(el) => (slideRefs.current[i] = el)}
            sx={{
              position: 'absolute',
              width: { xs: '45%', lg: '25%', xl: '20%' },
              height: '100%',
              top: 0,
              left: '40%',
              transform: 'translateZ(0)',
              borderRadius: '20px',
              backfaceVisibility: 'hidden',
              backgroundImage: `url(${src})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default RingCarousel;
