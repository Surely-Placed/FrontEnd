'use client';
import CustomDivider from '@/common/CustomDivider';
import { Box, Button, Grid, Typography } from '@mui/material';
import React from 'react';
import { workingDetails } from '../../../mockData/BecomeMember';
import { motion } from 'framer-motion';
import Link from 'next/link';

const HowItWorks = () => {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 40,
      }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      viewport={{ once: true }}
      className="w_100 h_100"
    >
      <Box
        p={{
          xs: '0rem 1rem 4rem',
          sm: '0rem 2rem 4rem',
          md: '0rem 4rem 4rem',
          xl: '0rem 6rem 8rem',
        }}
      >
        <CustomDivider text={'Mentoring Made Simple'} />
        <Box
          display={'flex'}
          gap={{ xs: 2, lg: 0 }}
          flexDirection={{ xs: 'column', lg: 'row' }}
          justifyContent={'space-between'}
          alignItems={{ xs: 'flex-start', lg: 'flex-end' }}
        >
          <Box maxWidth={{ lg: '80%' }}>
            <Typography
              component={'h2'}
              fontSize={{ xs: '1.25rem', sm: '2rem', md: '2.5rem' }}
              fontWeight={500}
              color="text"
              mt={2}
              fontFamily={'var(--font-avantgarde), sans-serif'}
            >
              Your Mentor Journey
            </Typography>
            <Typography
              fontSize={{ xs: '0.875rem', md: '1rem' }}
              fontWeight={'400'}
              color="text.subText"
              mt={1}
            >
              Join, onboard, match, and start mentoring. We make career coaching opportunities easy
              and high-impact.
            </Typography>
          </Box>
          <Link href={'coach-form'} className="link-styles">
            <Button variant="filled" sx={{ bgcolor: 'primary.main', color: 'extremes.light' }}>
              <Typography variant="subtitle2_bold" color="extremes.light" mt={0.1}>
                Start Mentoring Today
              </Typography>
            </Button>
          </Link>
        </Box>
        <Grid
          container
          spacing={4}
          mt={7}
          flexWrap={{ xs: 'wrap', lg: 'nowrap' }}
          sx={{
            overflowX: { xs: 'unset', lg: 'scroll' },
            '&::-webkit-scrollbar': { display: 'none' },
          }}
        >
          {workingDetails?.map((item, i) => (
            <Grid
              key={i}
              size={{ xs: 12, sm: 6, lg: 2.75, xl: 3.25 }}
              height={'inherit'}
              sx={{
                flexShrink: { lg: 0 },
              }}
            >
              <motion.div
                initial={{
                  opacity: 0,
                }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                viewport={{ once: true }}
                className="w_100 h_100"
              >
                <Box
                  display={{ xs: 'flex', sm: 'block' }}
                  alignItems={{ xs: 'center', sm: 'flex-start' }}
                  gap={{ xs: 2, sm: 0 }}
                  width={'100%'}
                  height={'100%'}
                  p={'1.25rem'}
                  borderRadius={'0.9375rem'}
                  border={'1px solid #B9D1FF'}
                >
                  <Box
                    mb={{ xs: 0, sm: 4 }}
                    borderRadius="0.75rem"
                    textAlign="center"
                    px={3.5}
                    py={2}
                    display="inline-flex"
                    alignItems="center"
                    justifyContent="center"
                    sx={{ backgroundColor: 'customBlue.main' }}
                  >
                    <Typography
                      component="p"
                      variant="h4_light"
                      fontWeight={600}
                      color="primary.background"
                      mt={1}
                    >
                      {item.num}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography component={'h3'} variant="body1" fontFamily={'Nexa'} color="text">
                      {item.heading}
                    </Typography>
                    <Typography variant="body2" color="customGray.desc" mt={1}>
                      {item.desc}
                    </Typography>
                  </Box>
                </Box>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Box>
    </motion.div>
  );
};

export default HowItWorks;
