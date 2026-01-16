'use client';
import { motion } from 'framer-motion';
import CustomDivider from '@/common/CustomDivider';
import { Box, Button, Grid, Typography } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { HomeManager } from '@/services/home/api';
import { useSelector } from 'react-redux';
import { selectUserData } from '@/store/user/user.reducer';
import useAuthRedirect from '@/hooks/useAuthRedirect';

const CohortsSection = () => {
  const [cohortsDetails, setCohortsDetails] = useState([]);
  const didFetchRef = useRef(false);
  const userData = useSelector(selectUserData);

  useEffect(() => {
    if (didFetchRef.current) return;
    didFetchRef.current = true;
    (async () => {
      const interestUuids = Array.isArray(userData?.preferences)
        ? userData.preferences.map((pref) => pref?.uuid).filter(Boolean)
        : [];
      const params = interestUuids.length ? { interest_uuid: interestUuids } : undefined;
      const cohorts = await HomeManager.getCohorts(params);
      const dataArray = Array.isArray(cohorts?.data) ? cohorts.data.slice(0, 4) : [];
      setCohortsDetails(dataArray);
    })();
  }, []);

  const { ensureAuthFromEvent } = useAuthRedirect();

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
          xl: '4rem 6rem 8rem',
        }}
      >
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
            fontWeight={600}
            color="text"
            fontFamily={'var(--font-avantgarde), sans-serif'}
          >
            Our Top Cohorts
          </Typography>
          <Link href={'/cohorts'} className="link-styles">
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
          Everything you need to land your first IT role abroad — bundled into one outcome-focused
          program.
        </Typography>
        <Link href={'/cohorts'} className="link-styles">
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
        <Box display={'flex'} flexDirection={'column'} gap={{ xs: 4, lg: 2 }} mt={5}>
          {cohortsDetails.map((cohort, i) => (
            <motion.div
              key={i}
              initial={{ y: 100, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0 }}
              transition={{
                duration: 1,
                ease: 'easeOut',
              }}
            >
              <Grid
                container
                spacing={1.5}
                borderRadius={'0.875rem'}
                overflow={'hidden'}
                boxShadow={'0px 4px 14px 0px #0000001C'}
              >
                <Grid size={{ xs: 12, lg: 3 }}>
                  <Image
                    src={cohort?.image}
                    alt="cohort-img"
                    width={100}
                    height={100}
                    unoptimized
                    className="w_100 h_100"
                    style={{ display: 'block', objectFit: 'cover' }}
                  />
                </Grid>
                <Grid
                  size={{ xs: 12, lg: 7 }}
                  p={{ xs: '1rem 1.5rem 0', md: '1.5rem' }}
                  display={'flex'}
                  justifyContent={'center'}
                  flexDirection={'column'}
                >
                  <Box
                    display={'flex'}
                    justifyContent={'space-between'}
                    alignItems={'center'}
                    mb={{ xs: 0, md: 2 }}
                  >
                    <Typography variant="h5" fontSize={{ xs: '1rem', sm: '1.5rem' }} color="text">
                      {cohort?.name}
                    </Typography>
                    <Box
                      p={'0.1875rem 0.5625rem'}
                      display={{ xs: 'flex', lg: 'none' }}
                      alignItems={'center'}
                      borderRadius={'0.5rem'}
                      sx={{ backgroundColor: 'customGreen.secondary' }}
                    >
                      <Typography variant="subtitle1" color="text" fontFamily={'sans-serif'}>
                        {cohort?.rating}
                      </Typography>
                      <Typography variant="subtitle1" color="text" fontFamily={'sans-serif'}>
                        ⭐️
                      </Typography>
                    </Box>
                  </Box>
                  <ul style={{ paddingInlineStart: '0.875rem' }}>
                    {cohort?.cohort_description?.map((item, ind) => (
                      <li key={ind}>
                        <Typography
                          variant="body1"
                          fontSize={{ xs: '0.75rem', sm: '1rem' }}
                          color="text.secondary"
                        >
                          {item}
                        </Typography>
                      </li>
                    ))}
                  </ul>
                </Grid>
                <Grid
                  size={{ xs: 12, lg: 2 }}
                  display={'flex'}
                  flexDirection={'column'}
                  alignItems={'flex-end'}
                  gap={3}
                  p={{ xs: '0rem 1.5rem 1.5rem 1.5rem', lg: '1.5rem 1.5rem 1.5rem 0' }}
                >
                  <Box
                    p={'0.1875rem 0.5625rem'}
                    display={{ xs: 'none', lg: 'flex' }}
                    alignItems={'center'}
                    borderRadius={'0.5rem'}
                    sx={{ backgroundColor: 'customGreen.secondary' }}
                  >
                    <Typography variant="subtitle1" color="text" fontFamily={'sans-serif'}>
                      {cohort?.rating}
                    </Typography>
                    <Typography variant="subtitle1" color="text" fontFamily={'sans-serif'}>
                      ⭐️
                    </Typography>
                  </Box>
                  <Box
                    display={'flex'}
                    flexDirection={{ xs: 'row', md: 'column' }}
                    gap={2}
                    width={'100%'}
                  >
                    <Link
                      href={cohort?.uuid ? `/cohorts/${cohort?.uuid}/checkout` : '#'}
                      className="link-styles"
                      style={{ width: '100%' }}
                      onClick={(e) =>
                        ensureAuthFromEvent(
                          e,
                          cohort?.uuid ? `/cohorts/${cohort?.uuid}/checkout` : '#'
                        )
                      }
                    >
                      <Button variant="filled" sx={{ width: { xs: '100%', md: '100%' } }}>
                        <Typography variant="subtitle2_bold" color="extremes.light" mt={0.1}>
                          Buy Now
                        </Typography>
                      </Button>
                    </Link>
                    <Link
                      href={cohort?.uuid ? `/cohorts/${cohort?.uuid}` : '#'}
                      className="link-styles"
                      style={{ width: '100%' }}
                    >
                      <Button
                        variant="contained"
                        sx={{
                          width: { xs: '100%', md: '100%' },
                        }}
                      >
                        <Typography variant="subtitle2_bold" color="primary" mt={0.1}>
                          View Cohort
                        </Typography>
                      </Button>
                    </Link>
                  </Box>
                </Grid>
              </Grid>
            </motion.div>
          ))}
        </Box>
      </Box>
    </motion.div>
  );
};

export default CohortsSection;
