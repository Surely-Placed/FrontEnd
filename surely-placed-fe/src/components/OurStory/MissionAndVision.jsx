'use client';
import { motion } from 'framer-motion';
import { Box, Grid, Typography, useMediaQuery, useTheme } from '@mui/material';
import Image from 'next/image';
import React from 'react';

const MissionAndVision = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Grid
      container
      spacing={{ xs: 0, sm: 4, md: 0 }}
      m={{ xs: '0 0 4rem', lg: '0 0 8rem' }}
      p={{ xs: '1.5rem', md: '6.25rem 3rem', lg: '6.25rem 5rem' }}
      position={'relative'}
      sx={{
        backgroundColor: 'rgba(62, 104, 202, 0.84)',
      }}
    >
      <Box width={'100%'} height={'100%'} position={'absolute'} left={0} top={0} zIndex={-1}>
        <Image
          src={'/OurStory/MissionVisionBg.webp'}
          alt="mission-vision-bg"
          width={100}
          height={100}
          unoptimized
          className="w_100 h_100"
        />
      </Box>
      <Grid size={12}>
        <Grid container spacing={{ xs: 2, md: 8 }} alignItems={'center'}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Image
              src={'/OurStory/Mission.webp'}
              alt="mission-bg"
              width={100}
              height={100}
              unoptimized
              className="w_100 h_auto"
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <motion.div
              initial={{ x: isMobile ? 0 : -100, opacity: 0 }}
              whileInView={{ x: isMobile ? 0 : 0, opacity: 1 }}
              viewport={{ once: true, amount: 0 }}
              transition={{
                duration: 1,
                ease: 'easeOut',
              }}
            >
              <Typography
                component={'h2'}
                variant="h4_bold"
                fontSize={{ xs: '1rem', sm: '1.875rem' }}
                color="extremes.light"
                mb={3}
              >
                Our Mission
              </Typography>
              <Typography
                component={'p'}
                variant="subtitle1"
                fontSize={{ xs: '0.75rem', sm: '1rem' }}
                color="extremes.light"
                mb={3}
              >
                We want to transform how people prepare for and pursue careers. Surely Placed brings
                together elite mentors, buddy support, and data-backed interview analytics to create
                real, repeatable interview success.
              </Typography>
              <Typography
                component={'p'}
                variant="subtitle1"
                fontSize={{ xs: '0.75rem', sm: '1rem' }}
                color="extremes.light"
                mb={3}
              >
                We build systems, not shortcuts. From your first mock interview to your first 90
                days on the job, Surely Placed stays by your side, guiding growth long after you’re
                hired.
              </Typography>
            </motion.div>
          </Grid>
        </Grid>
      </Grid>
      <Grid size={12}>
        <Grid
          container
          flexDirection={{ xs: 'column-reverse', md: 'row' }}
          spacing={{ xs: 2, md: 8 }}
          alignItems={'center'}
        >
          <Grid size={{ xs: 12, md: 6 }}>
            <motion.div
              initial={{ x: isMobile ? 0 : 100, opacity: 0 }}
              whileInView={{ x: isMobile ? 0 : 0, opacity: 1 }}
              viewport={{ once: true, amount: 0 }}
              transition={{
                duration: 1,
                ease: 'easeOut',
              }}
            >
              <Typography
                component={'h2'}
                variant="h4_bold"
                fontSize={{ xs: '1rem', sm: '1.875rem' }}
                color="extremes.light"
                mb={3}
              >
                Our Vision
              </Typography>
              <Typography
                component={'p'}
                variant="subtitle1"
                fontSize={{ xs: '0.75rem', sm: '1rem' }}
                color="extremes.light"
                mb={3}
              >
                We envision a world where career success is predictable, structured, and accessible,
                not left to chance. Surely Placed aims to be the global benchmark for
                mentorship-driven lifelong career transformation.
              </Typography>
              <Typography
                component={'p'}
                variant="subtitle1"
                fontSize={{ xs: '0.75rem', sm: '1rem' }}
                color="extremes.light"
                mb={3}
              >
                We’re creating a future where every learner, anywhere, can prepare smarter, apply
                confidently, and get surely placed.
              </Typography>
            </motion.div>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Image
              src={'/OurStory/Vision.webp'}
              alt="mission-bg"
              width={100}
              height={100}
              unoptimized
              className="w_100 h_auto"
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default MissionAndVision;
