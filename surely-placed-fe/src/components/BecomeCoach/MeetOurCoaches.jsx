'use client';
import CustomDivider from '@/common/CustomDivider';
import { Box, Grid, Typography, useMediaQuery, useTheme } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { HomeManager } from '@/services/home/api';
import { motion } from 'framer-motion';

const CardItem = ({ img, name, designation, desc }) => (
  <Box
    position="relative"
    sx={{
      overflow: 'hidden',
      zIndex: 0,
      '&:hover .infoBox': {
        width: { xs: '70%', sm: '60%', lg: '80%', xl: '70%' },
        height: { xs: '50%', sm: '36%', md: '30%', lg: '40%', xl: '37%' },
        minWidth: '0',
      },
      '&:hover .desc': {
        opacity: 1,
        transform: 'translateY(0)',
      },
    }}
  >
    <Box
      height={{ xs: '400px', sm: '500px', md: '550px', lg: '450px' }}
      borderRadius={'0.75rem'}
      overflow={'hidden'}
    >
      <Image
        src={img}
        alt="team-member"
        width={100}
        height={100}
        unoptimized
        className="w_100 h_100"
      />
    </Box>

    <Box
      className="infoBox"
      position="absolute"
      bottom={0}
      right={0}
      sx={{
        backgroundColor: 'extremes.light',
        width: { xs: '60%', sm: '43%', lg: '50%', xl: '42%' },
        minWidth: '0',
        height: { xs: '10%', sm: '12%', md: '14%', lg: '17%', xl: '15%' },
        borderRadius: '16px 0 0 0',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        p: 1.5,
        transition: 'width 0.4s ease-in-out, height 0.4s ease-in-out',
        pointerEvents: 'none',
      }}
    >
      <Typography
        variant="h7"
        fontSize={{ xs: '1rem', sm: '1.25rem', lg: '0.95rem', xl: '1.125rem' }}
        color="text"
        mt={{ md: 2, lg: 0 }}
      >
        {name}
      </Typography>
      <Typography
        variant="body1"
        fontSize={{ xs: '0.875rem', sm: '1rem', lg: '0.875rem' }}
        color="text.secondary"
        mb={2}
      >
        {designation}
      </Typography>
      <Typography
        className="desc"
        variant="body2"
        color="text.secondary"
        sx={{
          opacity: 0,
          transform: 'translateY(20px)',
          transition: 'opacity 0.4s ease-in-out, transform 0.4s ease-in-out',
        }}
      >
        {desc}
      </Typography>
    </Box>
  </Box>
);

const MeetOurCoaches = () => {
  const theme = useTheme();
  const isMDScreen = useMediaQuery(theme.breakpoints.up('sm'));
  const [coachesData, setCoachesData] = useState([]);
  const didFetchRef = useRef(false);

  useEffect(() => {
    if (didFetchRef.current) return;
    didFetchRef.current = true;

    (async () => {
      try {
        const meetOurCoaches = await HomeManager.getMeetOurCoaches();
        const dataArray = Array.isArray(meetOurCoaches?.data)
          ? meetOurCoaches.data.slice(0, 3)
          : [];
        setCoachesData(dataArray);
      } catch (e) {
        setCoachesData([]);
      }
    })();
  }, []);

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
      <Box
        p={{
          xs: '0rem 1rem 4rem',
          sm: '0rem 2rem 4rem',
          md: '0rem 4rem 4rem',
          xl: '0rem 6rem 8rem',
        }}
      >
        <CustomDivider />
        <Typography
          fontSize={{ xs: '1.25rem', sm: '2rem', md: '2.5rem' }}
          fontWeight={500}
          color="text"
          mt={2}
          mb={5}
          fontFamily={'var(--font-avantgarde), sans-serif'}
        >
          Meet Our Coaches
        </Typography>
        <Grid container spacing={2} display={{ xs: 'none', lg: 'flex' }}>
          {coachesData.map((item, i) => (
            <Grid key={i} size={4}>
              <CardItem
                img={item?.image}
                name={`${item?.first_name} ${item?.last_name}`}
                designation={item?.current_role}
                desc={item?.description}
              />
            </Grid>
          ))}
        </Grid>
        <Box display={{ xs: 'flex', lg: 'none' }}>
          <Swiper
            slidesPerView={isMDScreen ? 1.35 : 1.25}
            spaceBetween={20}
            autoplay={{ delay: 3000 }}
            className="mySwiper custom-swiper"
          >
            {coachesData.map((item, i) => {
              return (
                <SwiperSlide key={i}>
                  <CardItem
                    img={item?.image}
                    name={`${item?.first_name} ${item?.last_name}`}
                    designation={item?.current_role}
                    desc={item?.description}
                  />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </Box>
      </Box>
    </motion.div>
  );
};

export default MeetOurCoaches;
