'use client';
import { Box, Button, Typography, useMediaQuery, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { features } from '../../../mockData/HomePage';
import Image from 'next/image';
import CustomDivider from '@/common/CustomDivider';
import Link from 'next/link';

export const CardItem = ({ heading, desc, img, numericImg }) => (
  <Box
    position={'relative'}
    borderRadius={{ xs: '1rem', md: '1.875rem' }}
    overflow={'hidden'}
    width={'100%'}
  >
    <Box
      display={'flex'}
      justifyContent={'center'}
      flexDirection={'column'}
      width={'100%'}
      sx={{
        backgroundColor: 'background.main',
        backgroundImage: "url('/HomePage/CardBG.webp')",
        backgroundSize: 'cover',
      }}
    >
      <Typography
        component={'h3'}
        fontSize={{ xs: '0.875rem', sm: '1.25rem', md: '1.5rem' }}
        fontWeight={600}
        mt={{ xs: 4, md: 8 }}
        mb={{ xs: 2, md: 5 }}
        color="text"
        textAlign={'center'}
        fontFamily={'var(--font-avantgarde), sans-serif'}
      >
        {heading}
      </Typography>
      <Typography
        component={'p'}
        fontSize={{ xs: '0.75rem', md: '1rem' }}
        color="text"
        mx={{ xs: 2, md: 8 }}
        textAlign={'center'}
      >
        {desc}
      </Typography>
      <Box width={'100%'} mb={2} sx={{ '&:hover': { mb: 0 } }}>
        <Image
          src={img}
          alt="card-bg"
          height={100}
          width={100}
          unoptimized
          className="h_auto w_100"
        />
      </Box>
    </Box>
    <Box
      position={'absolute'}
      display={'flex'}
      borderRadius={'1.875rem'}
      flexDirection={'column'}
      justifyContent={'space-between'}
      width={'100%'}
      height={'100%'}
      zIndex={2}
      top={0}
      sx={{
        backgroundColor: 'background.hover',
        opacity: 0,
        transition: '0.5s ease-in-out',
        backgroundColor: 'background.main',
        backgroundImage: "url('/HomePage/CardHoverBG.webp')",
        backgroundSize: 'cover',
        '&:hover': { opacity: 1 },
      }}
    >
      <Box>
        <Typography
          component={'p'}
          fontSize={{ xs: '0.875rem', sm: '1.5rem' }}
          fontWeight={600}
          m={{ xs: '2rem 1.75rem 1.5rem', md: '4rem 4rem 2.5rem' }}
          color="extremes.light"
          fontFamily={'var(--font-avantgarde), sans-serif'}
        >
          {heading}
        </Typography>
        <Typography
          component={'p'}
          fontSize={{ xs: '0.75rem', sm: '1rem' }}
          color="extremes.light"
          mx={{ xs: 2, md: 8 }}
          textAlign={'center'}
        >
          {desc}
        </Typography>
      </Box>
      <Box width={'100%'} display={{ xs: 'none', md: 'flex' }} justifyContent={'flex-end'}>
        <Image src={numericImg} alt="card-bg" height={201} width={165} unoptimized />
      </Box>
      <Box width={'100%'} display={{ xs: 'flex', md: 'none' }} justifyContent={'flex-end'}>
        <Image src={numericImg} alt="card-bg" height={141} width={95} unoptimized />
      </Box>
    </Box>
  </Box>
);

const ExploreServices = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('lg'));

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, amount: 0 }}
      transition={{
        duration: 1,
        ease: 'easeOut',
      }}
    >
      <Box mb={{ xs: '4rem', lg: '8rem' }}>
        <Box p={{ xs: '0 1rem', sm: '0 2rem', md: '0 4rem', lg: '0 5rem' }}>
          <CustomDivider text={'Our Offerings'} />
          <Box
            display={'flex'}
            justifyContent={'space-between'}
            alignItems={'center'}
            mt={{ xs: 2, lg: 5 }}
            mb={{ xs: 1 }}
          >
            <Typography
              component={'h2'}
              fontSize={{ xs: '1.25rem', sm: '2rem', md: '2.5rem' }}
              fontWeight={500}
              color="text"
              fontFamily={'var(--font-avantgarde), sans-serif'}
            >
              Explore Our Core Services
            </Typography>
            {/* <Link href={'/services'} className="link-styles">
              <Button
                variant="filled"
                sx={{
                  bgcolor: 'primary.main',
                  color: 'extremes.light',
                  display: { xs: 'none', md: 'block' },
                }}
              >
                <Typography variant="subtitle2_bold" color="extremes.light" mt={0.1}>
                  View Services
                </Typography>
              </Button>
            </Link> */}
          </Box>
          <Typography
            component={'p'}
            fontSize={{ xs: '0.875rem', md: '1rem' }}
            fontWeight={'400'}
            color="text.subText"
          >
            From resume review to placement guidance, every service is built to improve your
            results.
          </Typography>
          {/* <Link href={'/services'} className="link-styles">
            <Button
              variant="filled"
              sx={{
                bgcolor: 'primary.main',
                color: 'extremes.light',
                display: { xs: 'block', md: 'none' },
                mt: 2,
              }}
            >
              <Typography variant="subtitle2_bold" color="extremes.light" mt={0.1}>
                View Services
              </Typography>
            </Button>
          </Link> */}
        </Box>
        <Box my={6} ml={{ xs: '1rem', md: '5rem' }}>
          <Swiper slidesPerView={isSmallScreen ? 1.5 : 2.5} spaceBetween={30} className="mySwiper">
            {features.map((feature, i) => (
              <SwiperSlide style={{ color: 'background.default' }} key={i}>
                <CardItem
                  heading={feature.heading}
                  desc={feature.desc}
                  img={feature.img}
                  numericImg={feature.numericImg}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </Box>
      </Box>
    </motion.div>
  );
};

export default ExploreServices;
