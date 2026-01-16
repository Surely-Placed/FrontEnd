'use client';
import CustomDivider from '@/common/CustomDivider';
import { motion } from 'framer-motion';
import { Box, Button, Grid, Typography, useMediaQuery, useTheme } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import CommonCardItem from '@/common/CommonCardItem';
import { HomeManager } from '@/services/home/api';
import { useSelector } from 'react-redux';
import { selectUserData } from '@/store/user/user.reducer';
import Link from 'next/link';

const TopCohorts = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const isLaptopScreens = useMediaQuery(theme.breakpoints.up('md'));
  const userData = useSelector(selectUserData);

  const [cohortsData, setCohortsData] = useState([]);
  const didFetchRef = useRef(false);

  useEffect(() => {
    if (didFetchRef.current) return;
    didFetchRef.current = true;
    (async () => {
      const interestUuids = Array.isArray(userData?.preferences || userData?.interests)
        ? (userData.preferences || userData.interests).map((item) => item?.uuid).filter(Boolean)
        : [];

      const params = interestUuids.length ? { interest_uuid: interestUuids } : undefined;
      const cohorts = await HomeManager.getCohorts(params);
      const dataArray = Array.isArray(cohorts?.data) ? cohorts.data.slice(0, 3) : [];
      setCohortsData(dataArray);
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
      <Box mb={{ xs: '4rem', lg: '8rem' }}>
        <Box p={{ xs: '0 1rem', sm: '0 2rem', md: '0 4rem', lg: '0 5rem' }}>
          <CustomDivider />
          <Box
            display={'flex'}
            justifyContent={'space-between'}
            alignItems={'center'}
            mt={{ xs: 2, lg: 5 }}
            mb={{ xs: 1 }}
          >
            <Typography
              fontSize={{ xs: '1.25rem', sm: '2rem', md: '2.5rem' }}
              fontWeight={500}
              color="text"
              fontFamily={'var(--font-avantgarde), sans-serif'}
            >
              Our Top Cohorts
            </Typography>
            <Link href={'cohorts'} className="link-styles">
              <Button
                variant="filled"
                sx={{
                  bgcolor: 'primary.main',
                  color: 'extremes.light',
                  display: { xs: 'none', md: 'block' },
                }}
              >
                <Typography variant="subtitle2_bold" color="extremes.light" mt={0.1}>
                  View All
                </Typography>
              </Button>
            </Link>
          </Box>
          <Typography
            fontSize={{ xs: '0.875rem', md: '1rem' }}
            fontWeight={'400'}
            color="text.subText"
          >
            Porttitor velit elementum non. Fusce nec pellentesque erat, id lobortis nunc.
          </Typography>
          <Link href={'cohorts'} className="link-styles">
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
                View All
              </Typography>
            </Button>
          </Link>
          <Grid container spacing={2.5} mt={4} display={{ xs: 'none', lg: 'flex' }}>
            {cohortsData.map((item, i) => (
              <Grid key={i} size={4}>
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
                  <CommonCardItem
                    uuid={item.uuid}
                    img={item?.image}
                    job={item?.name}
                    points={item?.cohort_description}
                  />
                </motion.div>
              </Grid>
            ))}
          </Grid>
          <Box display={{ xs: 'block', lg: 'none' }} mt={4}>
            <Swiper
              slidesPerView={isSmallScreen ? 1.25 : isLaptopScreens ? 2.25 : 1.75}
              spaceBetween={isSmallScreen ? 20 : 30}
              className="mySwiper"
              style={{ paddingBottom: '20px' }}
            >
              {cohortsData.map((item, i) => (
                <SwiperSlide style={{ color: 'background.default', height: 'auto' }} key={i}>
                  <CommonCardItem
                    uuid={item.uuid}
                    job={item.name}
                    img={item.image}
                    points={item.cohort_description}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </Box>
        </Box>
      </Box>
    </motion.div>
  );
};

export default TopCohorts;
