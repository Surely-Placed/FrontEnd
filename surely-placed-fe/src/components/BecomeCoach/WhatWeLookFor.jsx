'use client';
import { Box, Button, Grid, Typography, useMediaQuery, useTheme } from '@mui/material';
import Image from 'next/image';
import React from 'react';
import { motion } from 'framer-motion';
import { whatWeLookForPoints } from '../../../mockData/BecomeMember';
import { CheckIcon } from '../../../public/images';
import Link from 'next/link';

const WhatWeLookFor = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'));

  return (
    <Box p={{ xs: '4rem 1rem 4rem', sm: '4rem 2rem 4rem', md: '4rem 4rem 4rem', xl: '4rem 6rem' }}>
      <Grid
        container
        columnSpacing={{ xs: 0, lg: 4 }}
        alignItems={'center'}
        p={{ xs: '1.5rem', sm: '2.5rem' }}
        borderRadius={{ xs: '1rem', sm: '2.5rem' }}
        sx={{ backgroundColor: 'customBlue.main' }}
      >
        <Grid size={{ xs: 12, lg: 6 }} fontSize={{ xs: '1.25rem', sm: '2.25rem' }}>
          <motion.div
            initial={{ x: isMobile ? 0 : 100, opacity: 0 }}
            whileInView={{ x: isMobile ? 0 : 0, opacity: 1 }}
            viewport={{ once: true, amount: 0 }}
            transition={{
              duration: 1,
              ease: 'easeOut',
            }}
            className="w_100"
          >
            <Typography
              component={'h2'}
              variant="h3"
              color="text"
              fontSize={{ xs: '1.25rem', sm: '2.25rem' }}
              mb={{ xs: 1.5, sm: 2 }}
            >
              Who We Look For?
            </Typography>
            <Typography variant="body1" color="text" mb={5}>
              We’re looking for proven experts who can simplify complex concepts, mentor global
              learners, and shape careers through structured cohorts.
            </Typography>
            <Box
              width={'100%'}
              height={{ xs: '13.75rem', sm: '20.75rem' }}
              mb={5}
              display={{ xs: 'block', lg: 'none' }}
            >
              <Image
                src={'/BecomeMember/WhatWeLookForMob.webp'}
                alt="what-we-look"
                width={100}
                height={100}
                unoptimized
                className="w_100 h_100 block"
              />
            </Box>
            {whatWeLookForPoints.map((item, i) => (
              <Box key={i} display="flex" alignItems="start" gap={1.5} mb={1}>
                <Box
                  sx={{
                    width: 16,
                    height: 16,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <CheckIcon />
                </Box>
                <Typography
                  variant="body1"
                  fontSize={{ xs: '0.75rem', sm: '1rem', md: '0.875rem' }}
                  color="text"
                >
                  {item}
                </Typography>
              </Box>
            ))}
            <Link href={'coach-form'} className="link-styles">
              <Button
                variant="filled"
                sx={{ bgcolor: 'primary.main', color: 'extremes.light', mt: 6 }}
              >
                <Typography variant="subtitle2_bold" color="extremes.light" mt={0.1}>
                  Apply Now
                </Typography>
              </Button>
            </Link>
          </motion.div>
        </Grid>
        <Grid size={{ xs: 0, lg: 6 }}>
          <Image
            src={'/BecomeMember/WhatWeLookForImg.webp'}
            alt="what-we-look"
            width={100}
            height={100}
            unoptimized
            className="w_100 h_auto"
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default WhatWeLookFor;
