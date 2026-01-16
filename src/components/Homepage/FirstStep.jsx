'use client';
import { Box, Button, Typography } from '@mui/material';
import Link from 'next/link';
import React from 'react';
import { motion } from 'framer-motion';
import { defaultDesc, defaultHeading } from '../../../mockData/BecomeMember';

const FirstStep = ({
  heading = defaultHeading,
  desc = defaultDesc,
  primaryBtn = 'Explore Cohorts',
  primaryPath = '/meet-cohorts',
}) => {
  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: false, amount: 0 }}
      transition={{
        duration: 1,
        ease: 'easeOut',
      }}
    >
      <Box
        mb={{ xs: 4, md: 10 }}
        p={{ xs: '2rem', sm: '4rem', md: '8rem' }}
        display={'flex'}
        flexDirection={'column'}
        alignItems={'center'}
        sx={{
          backgroundImage: "url('/HomePage/Container.webp')",
          backgroundRepeat: 'no-repeat',
          backgroundSize: { xs: '100% 100%', sm: 'cover' },
        }}
      >
        <Typography
          fontSize={{ xs: '1.25rem', sm: '2.5rem' }}
          fontWeight={{ xs: 500, sm: 600 }}
          fontFamily={'var(--font-avantgarde), sans-serif'}
          color="extremes.light"
          textAlign={'center'}
          mb={1}
        >
          {heading}
        </Typography>
        <Typography
          fontSize={{ xs: '0.875rem', sm: '1rem' }}
          fontWeight={400}
          color="text.light"
          textAlign={'center'}
          mb={3}
        >
          {desc}
        </Typography>
        <Box display={'flex'} gap={2}>
          {primaryBtn !== 'Explore Cohorts' && (
            <Link href={primaryPath} className="link-styles">
              <Button
                variant="transparent"
                sx={{
                  minWidth: { xs: '150px', sm: '175px' },
                  p: { xs: '0.625rem', sm: '0.625rem 1.25rem' },
                }}
              >
                <Typography variant="subtitle2_bold" color="extremes.light" mt={0.5}>
                  {primaryBtn}
                </Typography>
              </Button>
            </Link>
          )}
          <Link href={'/book-a-call'} className="link-styles">
            <Button
              variant="contained"
              sx={{
                minWidth: { xs: '150px', sm: '175px' },
                p: { xs: '0.625rem', sm: '0.625rem 1.25rem' },
              }}
            >
              <Typography variant="subtitle2_bold" color="text" mt={0.5}>
                Book a Call
              </Typography>
            </Button>
          </Link>
        </Box>
      </Box>
    </motion.div>
  );
};

export default FirstStep;
