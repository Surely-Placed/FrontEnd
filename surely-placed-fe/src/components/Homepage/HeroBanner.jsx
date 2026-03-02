'use client';
import { Box, Button, Grid, Typography, useMediaQuery, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { Quotes } from '../../../public/images';
import { heroFeatures } from '../../../mockData/HomePage';
import Link from 'next/link';
import AnimatedCounter from '@/common/AnimatedCounter';

const HeroBanner = () => {
  const theme = useTheme();

  const isXs = useMediaQuery(theme.breakpoints.only('xs'));
  const isSm = useMediaQuery(theme.breakpoints.only('sm'));
  const isMd = useMediaQuery(theme.breakpoints.only('md'));
  const isLg = useMediaQuery(theme.breakpoints.up('lg'));

  const [offset, setOffset] = useState({ x: 0, y: 0 });

  let top, left;
  if (isXs) {
    top = '31%';
    left = '14%';
  } else if (isSm) {
    top = '35%';
    left = '17%';
  } else if (isMd) {
    top = '35%';
    left = '15%';
  } else if (isLg) {
    top = '7%';
    left = '0%';
  }

  useEffect(() => {
    const updateOffsets = () => {
      setOffset({
        x: (window.innerWidth * parseFloat(left)) / 100,
        y: (window.innerHeight * parseFloat(top)) / 100,
      });
    };

    updateOffsets();
    window.addEventListener('resize', updateOffsets);

    return () => window.removeEventListener('resize', updateOffsets);
  }, [left, top]);

  return (
    <Box
      position={'relative'}
      m={{ xs: '6rem 0 4rem', lg: '5.5rem 0 8rem' }}
      p={{ xs: '0 1rem', md: '0 3rem' }}
      height={{ xs: '85vh', md: '90vh', xl: '85vh', xxl: '50vh' }}
    >
      <Box
        position="absolute"
        left={0}
        display={{ xs: 'none', lg: 'block' }}
        sx={{ width: 94, height: 105 }}
      >
        <Quotes />
      </Box>
      <Box position={'relative'} width={'100%'} height={'100%'}>
        <Box
          position="absolute"
          left={'8%'}
          top={{ xs: '29%', sm: '27%', md: '27%' }}
          display={{ xs: 'block', lg: 'none' }}
          zIndex={2}
          sx={{ width: { xs: 40, sm: 95 }, height: { xs: 50, sm: 105 } }}
        >
          <Quotes color={'#fff'} />
        </Box>
        <motion.div
          initial={{ x: -100, y: -offset.y, opacity: 0 }}
          animate={{ x: offset.x, y: offset.y, opacity: 1 }}
          transition={{
            duration: 1,
            ease: 'easeOut',
          }}
          className="quote-text"
        >
          <Typography
            component={'p'}
            fontSize={{ xs: '0.75rem', sm: '1.25rem', xl: '1.5rem' }}
            position={'absolute'}
            zIndex={1}
            maxWidth={{ xs: '52%', sm: '60%', md: '45%', lg: '20%' }}
            color={{ xs: 'extremes.light', lg: 'text.main' }}
          >
            Talent needs a system: mentors to coach, a team to apply, and analytics to fix what
            matters.
          </Typography>
        </motion.div>
        <Box display={{ xs: 'none', lg: 'block' }} height={'100%'}>
          <Image
            src={'/HomePage/HeroBanner.webp'}
            alt="hero-banner"
            width={100}
            height={100}
            unoptimized
            className="w_100 h_100"
            style={{ maxHeight: '100%' }}
          />
        </Box>
        <Box display={{ xs: 'block', lg: 'none' }} height={'100%'}>
          <Image
            src={'/HomePage/HeroMob.webp'}
            alt="hero-banner"
            width={100}
            height={100}
            unoptimized
            className="w_100 h_100"
            style={{ maxHeight: '100%' }}
          />
        </Box>
        <Box position={'absolute'} bottom={{ xs: '3%', sm: '5%', md: '7%' }} left={'7%'} zIndex={1}>
          <motion.div
            initial={{ y: 200, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              duration: 1,
              ease: 'easeOut',
            }}
            className="w_100"
          >
            <Typography
              component={'h1'}
              fontSize={{ xs: '1.4rem', sm: '2rem', lg: '3.5rem' }}
              fontWeight={{ xs: 500, lg: 600 }}
              color="extremes.light"
              fontFamily={'var(--font-avantgarde), sans-serif'}
            >
              Move From Rejections to <br />Offers With Surely Placed
            </Typography>
            <Typography
              component={'p'}
              fontSize={{ xs: '0.875rem', sm: '1rem' }}
              fontWeight={400}
              color="extremes.light"
              maxWidth={{ xs: '90%', lg: '60%' }}
              my={{ xs: 2, lg: 3 }}
            >
              Surely Placed offers career coaching with mentors, buddies, and analytics that turn
              preparation into offers.
            </Typography>
            <Link href={'/book-a-call'} className="link-styles">
              <Button variant="contained">
                <Typography variant="subtitle2_bold" color="primary" mt={0.3}>
                  Book a Call
                </Typography>
              </Button>
            </Link>
          </motion.div>
        </Box>
        <Box width={'100%'} position={'absolute'} right={'3%'} top={{ xs: '2%', lg: '5%' }}>
          <motion.div
            initial={{ x: 200, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{
              duration: 1,
              ease: 'easeOut',
            }}
            className="w_100"
          >
            <Grid container spacing={1.5} justifyContent={'flex-end'} zIndex={1} width={'100%'}>
              {heroFeatures.map(
                (item, i) =>
                  i <= 1 && (
                    <Grid
                      key={i}
                      size={{ xs: 4, sm: 3, lg: 2.75, xl: 2.2 }}
                      p={{
                        xs: '0.75rem 0.25rem 0.75rem 0.75rem',
                        lg: '1.25rem 0.75rem 1.25rem 1.25rem',
                      }}
                      borderRadius={'1.25rem'}
                      sx={{ bgcolor: 'rgba(255, 255, 255, 0.34)' }}
                    >
                      <Typography
                        component={'p'}
                        fontSize={{ xs: '1rem', sm: '2rem', lg: '2.75rem' }}
                        fontWeight={{ xs: '600', lg: '700' }}
                        color="extremes.light"
                      >
                        {item?.startSymbol}
                        <AnimatedCounter end={item.value} />
                        {item.endSymbol}
                      </Typography>
                      <Typography
                        component={'p'}
                        fontSize={{ xs: '0.75rem', sm: '1rem', lg: '1.25rem' }}
                        fontWeight={400}
                        color="extremes.light"
                        maxWidth={'60%'}
                      >
                        {item.desc}
                      </Typography>
                    </Grid>
                  )
              )}
            </Grid>
          </motion.div>
          <motion.div
            initial={{ x: 200, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{
              duration: 1,
              ease: 'easeOut',
            }}
            className="w_100"
          >
            <Grid
              container
              spacing={2}
              mt={2}
              justifyContent={'flex-end'}
              zIndex={1}
              width={'100%'}
            >
              {heroFeatures.map(
                (item, i) =>
                  i > 1 && (
                    <Grid
                      key={i}
                      size={{ xs: 4, sm: 3, lg: 2 }}
                      p={{ xs: '0.75rem', lg: '1.25rem' }}
                      borderRadius={'1.25rem'}
                      sx={{ bgcolor: 'rgba(255, 255, 255, 0.34)' }}
                    >
                      <Typography
                        component={'p'}
                        fontSize={{ xs: '1.25rem', sm: '2rem', lg: '3.125rem' }}
                        fontWeight={{ xs: '600', lg: '700' }}
                        color="extremes.light"
                      >
                        {item?.startSymbol}
                        <AnimatedCounter end={item.value} />
                        {item.endSymbol}
                      </Typography>
                      <Typography
                        component={'p'}
                        fontSize={{ xs: '0.75rem', sm: '1rem', lg: '1.25rem' }}
                        fontWeight={400}
                        color="extremes.light"
                        maxWidth={'60%'}
                      >
                        {item.desc}
                      </Typography>
                    </Grid>
                  )
              )}
            </Grid>
          </motion.div>
        </Box>
      </Box>
    </Box>
  );
};

export default HeroBanner;
