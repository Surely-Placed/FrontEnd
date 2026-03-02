'use client';
import { motion } from 'framer-motion';
import { Box, Button, Grid, Typography, useMediaQuery, useTheme } from '@mui/material';
import Image from 'next/image';
import React from 'react';
import { expertiseFeatures } from '../../../mockData/Services';
import Link from 'next/link';
import AnimatedCounter from '@/common/AnimatedCounter';

const Expertise = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'));

  return (
    <Box p={{ xs: '8rem 1rem 4rem', sm: '8rem 2rem 4rem', md: '8rem 4rem 4rem', xl: '8rem 6rem' }}>
      <Grid
        container
        justifyContent={'space-between'}
        flexDirection={{ xs: 'column-reverse', lg: 'row' }}
        position={'relative'}
        alignItems={'center'}
      >
        <Grid size={{ xs: 12, lg: 5 }}>
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
              fontSize={{ xs: '1.5rem', sm: '3.75rem', lg: '3rem', xl: '3.75rem' }}
              fontWeight={{ xs: 500, lg: 600 }}
              color="text"
            >
              Where Expertise{' '}
            </Typography>
            <Typography
              variant="h1"
              component={'span'}
              fontSize={{ xs: '1.5rem', sm: '3.75rem', lg: '3rem', xl: '3.75rem' }}
              fontWeight={{ xs: 500, sm: 600 }}
              color="secondary"
            >
              Meets Innovation
            </Typography>
            <Typography
              variant="subtitle1"
              fontSize={{ xs: '0.875rem', sm: '1rem' }}
              color="text.subText"
              mt={2}
            >
              Lorem ipsum dolor sit amet consectetur adipiscing eli mattis sit phasellus mollis sit
              aliquam sit nullam neque ultrices.
            </Typography>
            <Grid container spacing={2} mt={4} mb={4}>
              {expertiseFeatures.map((item, i) => (
                <Grid
                  key={i}
                  size={4}
                  borderRight={i !== expertiseFeatures.length - 1 ? '1px solid #D8D8D8' : 'none'}
                  pr={{ xs: 1, sm: 3 }}
                >
                  <Typography
                    variant="subHeading"
                    fontSize={{ xs: '1.25rem', sm: '1.75rem' }}
                    fontWeight={{ xs: 500, sm: 600 }}
                    color="text"
                  >
                    <AnimatedCounter end={item.value} />
                    {item.endSymbol}
                  </Typography>
                  <Typography
                    variant="body1"
                    fontSize={{ xs: '0.75rem', sm: '0.875rem' }}
                    color="text"
                    mt={1}
                  >
                    {item?.desc}
                  </Typography>
                </Grid>
              ))}
            </Grid>
            <Link href={'book-a-call'} className="link-styles">
              <Button variant="filled" sx={{ bgcolor: 'primary.main', color: 'extremes.light' }}>
                <Typography variant="subtitle2_bold" color="extremes.light" mt={0.1}>
                  Book a Call
                </Typography>
              </Button>
            </Link>
          </motion.div>
        </Grid>
        <Grid size={{ xs: 12, lg: 5.5 }} position={'relative'}>
          <motion.div
            initial={{ x: isMobile ? 0 : 100, opacity: 0 }}
            whileInView={{ x: isMobile ? 0 : 0, opacity: 1 }}
            viewport={{ once: true, amount: 0 }}
            transition={{
              duration: 1,
              ease: 'easeOut',
            }}
          >
            <Box position="relative" width={'100%'} display="inline-block">
              <Box display={{ xs: 'none', lg: 'block' }}>
                <Image
                  src={'/Services/Expertise.webp'}
                  alt="expertise"
                  width={100}
                  height={100}
                  unoptimized
                  className="w_100 h_auto"
                />
              </Box>
              <Box
                width={'100%'}
                display={{ xs: 'block', lg: 'none' }}
                height={{ xs: '375px', sm: '500px', md: '600px' }}
                mb={8}
              >
                <Image
                  src={'/Services/Expertise.webp'}
                  alt="expertise"
                  width={100}
                  height={375}
                  unoptimized
                  className="w_100 h_100"
                />
              </Box>
              <Box
                position={'absolute'}
                borderRadius={'1.25rem'}
                p={{ xs: '1rem', lg: '1.25rem' }}
                border={'1px solid #BECDED'}
                maxWidth={{ xs: '12.1875rem', sm: '18rem', md: '20rem', xl: '16.0625rem' }}
                sx={{ backgroundColor: 'extremes.light' }}
                bottom={{ xs: '5%', lg: '15%', xl: '25%' }}
                left={{ xs: 'unset', lg: '-15%' }}
                right={{ xs: '15%', sm: '20%', lg: 'unset' }}
              >
                <Typography fontSize={'1.875rem'}>🔥</Typography>
                <Typography
                  variant="h6_light"
                  fontWeight={{ xs: 500, sm: 400 }}
                  fontSize={{ xs: '1rem', sm: '1.25rem' }}
                  color="text"
                  mb={1}
                >
                  Flexible Learning
                </Typography>
                <Typography
                  component={'p'}
                  variant="body1"
                  fontSize={{ xs: '0.75rem', sm: '0.875rem' }}
                  color="text.subText"
                  mb={1}
                >
                  At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis At vero
                </Typography>
              </Box>
            </Box>
          </motion.div>
        </Grid>
        <Box
          position={'absolute'}
          width={'58.75rem'}
          height={'49.5rem'}
          borderRadius={'100%'}
          top={'-5%'}
          right={'-10%'}
          zIndex={-1}
          display={{ xs: 'none', lg: 'block' }}
          sx={{ backgroundColor: 'customGreen.light', filter: 'blur(200px)' }}
        />
      </Grid>
      <Grid container spacing={{ xs: 4, md: 10 }} mt={{ xs: 8, md: 16 }}>
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
              variant="h4"
              fontSize={{ xs: '1.25rem', sm: '2rem' }}
              fontFamily={'var(--font-avantgarde), sans-serif'}
            >
              Ut sodales, ex sit amet consectetur accumsan, nibh ex sollicitudin metus, volutpat
              lacinia arcu nibh
            </Typography>
          </motion.div>
        </Grid>
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
              variant="h6_light"
              fontSize={{ xs: '1rem', sm: '1.25rem' }}
              fontFamily={'var(--font-nexa), Arial, sans-serif'}
            >
              Vestibulum tempus imperdiet sem ac porttitor. Vivamus pulvinar commodo orci, suscipit
              porttitor velit elementum non. Fusce nec pellentesque erat, id lobortis nunc. Donec
              dui leo, ultrices quis turpis nec
            </Typography>
          </motion.div>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Expertise;
