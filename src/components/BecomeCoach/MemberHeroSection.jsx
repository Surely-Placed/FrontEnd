'use client';
import { Box, Button, Grid, Typography, useMediaQuery, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import Image from 'next/image';
import React from 'react';
import { heroTexts } from '../../../mockData/BecomeMember';
import { StarIcon } from '../../../public/images';
import Link from 'next/link';

const MemberHeroSection = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'));

  return (
    <Box
      position={'relative'}
      p={{ xs: '8rem 1rem 4rem', sm: '8rem 2rem 4rem', md: '8rem 4rem 4rem', xl: '8rem 6rem' }}
    >
      <Grid
        container
        justifyContent={'space-between'}
        flexDirection={{ xs: 'column', lg: 'row' }}
        position={'relative'}
        alignItems={'center'}
        zIndex={1}
      >
        <Grid size={{ xs: 12, lg: 6 }}>
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
              variant="h1"
              component={'span'}
              display={{ xs: 'unset', md: 'flex' }}
              fontSize={{ xs: '1.5rem', sm: '3rem', lg: '3rem', xl: '3.5rem' }}
              fontWeight={500}
              lineHeight={{ xs: 1, md: 1.5 }}
              color="text"
            >
              Transform Careers.{' '}
            </Typography>
            <Typography
              variant="h1"
              component={'span'}
              fontSize={{ xs: '1.5rem', sm: '3rem', lg: '3rem', xl: '3.5rem' }}
              fontWeight={500}
              maxWidth={'50%'}
              lineHeight={{ xs: 1, md: 1.5 }}
              color="text"
            >
              Become a{' '}
            </Typography>
            <Typography
              variant="h1"
              component={'span'}
              fontSize={{ xs: '1.5rem', sm: '3rem', lg: '3rem', xl: '3.5rem' }}
              fontWeight={500}
              color="secondary"
            >
              Mentor Online.
            </Typography>
            <Typography
              variant="subtitle1"
              fontSize={{ xs: '0.875rem', sm: '1rem' }}
              color="text.subText"
              my={5}
            >
              Share your expertise, coach ambitious talent, and join our global network of
              world-class coaches transforming careers.
            </Typography>
            <Link href={'coach-form'} className="link-styles">
              <Button variant="filled" sx={{ bgcolor: 'primary.main', color: 'extremes.light' }}>
                <Typography variant="subtitle2_bold" color="extremes.light" mt={0.1}>
                  Apply Now
                </Typography>
              </Button>
            </Link>
          </motion.div>
        </Grid>
        <Grid position={'relative'} size={{ xs: 12, lg: 5 }}>
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
            <Box width={{ md: '60%', lg: '100%' }} m={'0 auto'}>
              <Image
                src={'/BecomeMember/BecomeMemberBg.webp'}
                alt="hero-img"
                width={100}
                height={100}
                unoptimized
                className="w_100 h_auto"
              />
            </Box>
          </motion.div>
        </Grid>
      </Grid>
      <Grid
        container
        spacing={3}
        justifyContent={{ xs: 'flex-start', md: 'center', lg: 'flex-start' }}
      >
        {heroTexts.map((item, i) => (
          <Grid key={i} size={{ xs: 12, md: 6, lg: 4 }}>
            <motion.div
              initial={{
                opacity: 0,
                y: 40,
              }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut', delay: (i + 1) * 0.2 }}
              viewport={{ once: true }}
              className="w_100 h_100"
            >
              <Box
                border={'1px solid #D6D6D6'}
                borderRadius={'1rem'}
                display={'flex'}
                alignItems={'center'}
                p={'1rem'}
                zIndex={1}
                gap={1.5}
              >
                <Box
                  p={'1.125rem'}
                  borderRadius={'1rem'}
                  pb={{ xs: '1.125rem', sm: '0.875rem' }}
                  sx={{ background: 'linear-gradient(131.26deg, #38BDB1 3.51%, #1A5751 125.27%)' }}
                >
                  <Box width={{ xs: 16, sm: 24 }} height={{ xs: 16, sm: 24 }}>
                    <StarIcon width="100%" height="100%" />
                  </Box>
                </Box>
                <Typography variant="subtitle1" color="text">
                  {item}
                </Typography>
              </Box>
            </motion.div>
          </Grid>
        ))}
      </Grid>
      <Box
        position={'absolute'}
        height={{ xs: '20%', sm: '25%', md: '25%', lg: '40%' }}
        width={{ xs: '100%', lg: '35%' }}
        top={{ xs: '35%', sm: '40%', lg: '7%' }}
        right={{ xs: '0%', lg: '7%' }}
        zIndex={-1}
        sx={{ backgroundColor: 'customGreen.bg', borderRadius: '100%', filter: 'blur(200px)' }}
      />
    </Box>
  );
};

export default MemberHeroSection;
