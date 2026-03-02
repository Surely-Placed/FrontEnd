'use client';
import { motion } from 'framer-motion';
import { Box, Grid, Typography } from '@mui/material';
import Image from 'next/image';
import React from 'react';
import { avatarsImgs } from '../../../mockData/OurStory';

const StoryHeroBanner = () => {
  return (
    <Grid
      container
      spacing={{ xs: 4, lg: 0 }}
      flexDirection={{ xs: 'column', lg: 'row-reverse' }}
      justifyContent={'space-between'}
      m={{ xs: '6rem 0 4rem', lg: '8rem 0 8rem' }}
      p={{ xs: '0 1rem', sm: '0 2rem', md: '0 5rem' }}
      position={'relative'}
    >
      <Grid size={{ xs: 12, lg: 7 }} position={'relative'}>
        <Box display={{ xs: 'none', lg: 'block' }}>
          <Image
            src={'/OurStory/HeroStoryImg.webp'}
            alt="our-story-hero"
            width={100}
            height={100}
            unoptimized
            className="w_100 h_auto"
          />
        </Box>
        <Box display={{ xs: 'block', lg: 'none' }}>
          <Image
            src={'/OurStory/HeroStoryImgMob.webp'}
            alt="our-story-hero"
            width={100}
            height={100}
            unoptimized
            className="w_100 h_auto"
          />
        </Box>
        <Box
          position={'absolute'}
          bottom={{ xs: 0, sm: '5%', md: '7.5%', lg: 0, xl: '7%' }}
          right={{ xs: '-3%', sm: '12%', lg: '3%', xl: '5%' }}
          maxWidth={{ xs: '60%', sm: '42%', lg: '35%', xl: '30%' }}
          zIndex={1}
        >
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{
              duration: 1,
              ease: 'easeOut',
            }}
          >
            <Box position={'relative'} display={'flex'}>
              {avatarsImgs.map((item, i) => (
                <Box
                  key={i}
                  position={'absolute'}
                  left={{ xs: `${i * 35}px`, sm: `${i * 50}px` }}
                  bottom={10}
                >
                  <Box width={{ xs: 40, sm: 58 }} height={{ xs: 40, sm: 58 }}>
                    <Image
                      src={item}
                      alt={`avatar-${i}`}
                      width={58}
                      height={58}
                      unoptimized
                      className="h_100 w_100"
                    />
                  </Box>
                </Box>
              ))}
            </Box>
            <Typography
              component={'span'}
              variant="body1"
              fontSize={{ xs: '0.85rem', sm: '1rem', md: '1.2rem', lg: '0.875rem' }}
              color="text.secondary"
            >
              Our learners have earned{' '}
              <Typography
                component={'span'}
                fontSize={{ xs: '0.85rem', sm: '1rem', md: '1.25rem', lg: '0.875rem' }}
                variant="subtitle2_bold"
                color="text"
              >
                $157M+{' '}
              </Typography>
              in offers and secured{' '}
              <Typography
                component={'span'}
                fontSize={{ xs: '0.85rem', sm: '1rem', md: '1.25rem', lg: '0.875rem' }}
                variant="subtitle2_bold"
                color="text"
              >
                25,000+{' '}
              </Typography>{' '}
              top-tier interviews.
            </Typography>
          </motion.div>
        </Box>
      </Grid>
      <Grid
        size={{ xs: 12, lg: 3.6 }}
        spacing={2}
        display={'flex'}
        flexDirection={'column'}
        justifyContent={'space-between'}
      >
        <Box
          position={'absolute'}
          maxWidth={{ xs: '60%', sm: '55%', md: '50%', lg: '41%', xl: '40%' }}
          top={{ xs: '1%', sm: '0%', md: '0%', lg: 'unset' }}
        >
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{
              duration: 1,
              ease: 'easeOut',
            }}
          >
            <Typography
              component={'h1'}
              fontSize={{ xs: '1.25rem', sm: '2.4rem', md: '3rem', lg: '3rem', xl: '3.75rem' }}
              fontWeight={500}
              fontFamily={'var(--font-avantgarde), sans-serif'}
              color="text"
            >
              The Surely Placed Story:{' '}
              <Typography
                component={'span'}
                fontSize={{ xs: '1.25rem', sm: '2.4rem', md: '3rem', lg: '3rem', xl: '3.75rem' }}
                fontWeight={500}
                fontFamily={'var(--font-avantgarde), sans-serif'}
                color="secondary"
              >
                From Idea to Impact
              </Typography>
            </Typography>
          </motion.div>
        </Box>
        <Box
          display={'flex'}
          flexDirection={'column'}
          justifyContent={'flex-end'}
          height={'100%'}
          pb={3}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 1,
              ease: 'easeOut',
            }}
          >
            <Typography
              component={'p'}
              variant="subtitle1"
              fontSize={{ xs: '0.875rem', sm: '1rem', md: '1.5rem', lg: '0.875rem' }}
              color="text.secondary"
            >
              Surely Placed was born to bridge the gap between ambition and opportunity, replacing
              guesswork with guidance and rejections with repeatable interview success.
            </Typography>
          </motion.div>
        </Box>
      </Grid>
    </Grid>
  );
};

export default StoryHeroBanner;
