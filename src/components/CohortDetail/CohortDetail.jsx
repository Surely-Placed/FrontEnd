'use client';
import { Box, Grid, Typography } from '@mui/material';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'next/navigation';
import { HomeManager } from '@/services/home/api';
import Link from 'next/link';
import useAuthRedirect from '@/hooks/useAuthRedirect';

const CohortDetail = () => {
  const [expanded, setExpanded] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const [cohortDetail, setCohortDetail] = useState(null);
  const contentRef = useRef(null);
  const didFetchRef = useRef(false);
  const { id } = useParams();

  // Fetch cohort details using UUID from URL once
  useEffect(() => {
    if (!id || didFetchRef.current) return;
    didFetchRef.current = true;
    (async () => {
      const res = await HomeManager.getCohortDetail(id);
      if (res?.variant === 'success') {
        setCohortDetail(res.data.data);
      }
    })();
  }, [id]);

  useEffect(() => {
    if (contentRef.current) {
      const hasOverflow = contentRef.current.scrollHeight > contentRef.current.clientHeight;
      setIsOverflowing(hasOverflow);
    }
  }, [cohortDetail, expanded]);

  const { ensureAuthFromEvent } = useAuthRedirect();

  const bestSuited = cohortDetail?.interests?.filter((item) => item.best_suited === true)?.[0]?.name  
  return (
    <Box m={{ xs: '5.3rem 0 2rem', md: '8rem 0 2rem', lg: '5.3rem 0 2rem' }}>
      <Box display={{ xs: 'none', sm: 'block' }}>
        {cohortDetail?.image && (
          <Image
            src={cohortDetail?.image}
            alt="hero-banner"
            width={100}
            height={100}
            unoptimized
            className="w_100 h_auto"
            priority
          />
        )}
      </Box>
      <Box display={{ xs: 'block', sm: 'none' }}>
        {cohortDetail?.image && (
          <Image
            src={cohortDetail?.image}
            alt="hero-banner"
            width={100}
            height={100}
            unoptimized
            className="w_100 h_auto"
            priority
          />
        )}
      </Box>
      <Grid
        container
        justifyContent={'space-between'}
        px={{ xs: '1.5rem', sm: '5rem' }}
        mt={5}
        mb={{ xs: 10, md: 15 }}
      >
        <Grid size={{ xs: 12, md: 7, lg: 8 }}>
          <Typography variant="h3" fontSize={{ xs: '1.25rem', sm: '2.5rem' }} color="text" mb={1}>
            {cohortDetail?.name}
          </Typography>
          <Typography
            variant="subtitle1"
            fontSize={{ xs: '0.75rem', sm: '1rem' }}
            color="text.secondary"
            mb={3}
          >
            Porttitor velit elementum non. Fusce nec pellentesque erat, id lobortis nunc.
          </Typography>
          <Box borderBottom={'2px solid #E9EAEB'} mb={3}>
            <Box borderBottom={'1px solid #292929'} width={'fit-content'}>
              <Typography variant="subtitle2" color="text" fontFamily={'Inter'} component={'span'}>
                Overview
              </Typography>
            </Box>
          </Box>
          <Box
            ref={contentRef}
            maxHeight={{
              xs: expanded ? 'fit-content' : '17.8125rem',
              sm: expanded ? 'fit-content' : '7.125rem',
            }}
            overflow={expanded ? 'unset' : 'hidden'}
            mb={3}
          >
            <Typography variant="body1" color="text.secondary">
              {cohortDetail?.cohort_description}
            </Typography>
          </Box>
          {isOverflowing && (
            <Box
              mb={3}
              onClick={() => {
                setExpanded((prev) => !prev);
              }}
            >
              <Typography variant="subtitle1_bold" color="primary" sx={{ cursor: 'pointer' }}>
                Show {expanded ? 'Less' : 'More'}
              </Typography>
            </Box>
          )}
          <Typography fontSize={{ xs: '1.25rem', sm: '1.375rem' }} color="text" mb={3}>
            Background
          </Typography>
          <Grid container spacing={4}>
            <Grid
              size={12}
              display={'flex'}
              justifyContent={'space-between'}
              alignItems={'flex-start'}
              borderBottom={'1px solid rgba(113, 118, 128, 0.72)'}
            >
              <Typography
                variant="subtitle1"
                fontSize={{ xs: '0.875rem', sm: '1rem' }}
                color="text.secondary"
                pt={2}
              >
                Track
              </Typography>
              <Box
                p={'1.0625rem 3.1875rem'}
                border={'1px solid #4CC4B9'}
                borderRadius={'0.75rem'}
                mb={3}
                sx={{ backgroundColor: 'customGreen.background' }}
              >
                <Typography component={'p'} variant="subtitle2_bold" color="secondary" mt={0}>
                  {cohortDetail?.coaches[0]?.current_role}
                </Typography>
              </Box>
            </Grid>
            <Grid size={12} borderBottom={'1px solid rgba(113, 118, 128, 0.72)'}>
              <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'} mb={3}>
                <Typography
                  variant="subtitle1"
                  fontSize={{ xs: '0.875rem', sm: '1rem' }}
                  color="text.secondary"
                >
                  Coach Prev. Experience
                </Typography>
                <Box display={'flex'} alignItems={'center'} gap={{ xs: 2, sm: 4 }}>
                  <Image
                    src={'/AllCohorts/Google.png'}
                    alt="google"
                    width={53}
                    height={53}
                    unoptimized
                  />
                  <Image
                    src={'/AllCohorts/Microsoft.png'}
                    alt="microsoft"
                    width={64}
                    height={64}
                    unoptimized
                  />
                </Box>
              </Box>
            </Grid>
            <Grid size={12} borderBottom={'1px solid rgba(113, 118, 128, 0.72)'}>
              <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'} mb={3}>
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  fontSize={{ xs: '0.875rem', sm: '1rem' }}
                >
                  Number of Sessions
                </Typography>
                <Box
                  p={{ xs: '1.0625rem 2rem', sm: '1.0625rem 3.1875rem' }}
                  border={'1px solid #ABABAB'}
                  borderRadius={'0.75rem'}
                >
                  <Typography variant="body1" color="primary.secondary">
                    {cohortDetail?.number_of_sessions} Recorded
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid size={12} borderBottom={'1px solid rgba(113, 118, 128, 0.72)'}>
              <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'} mb={3}>
                <Typography variant="subtitle1" color="text.secondary">
                  Best Suited For
                </Typography>
                <Box
                  p={{ xs: '1.0625rem 0.5rem', sm: '1.0625rem 3.1875rem' }}
                  border={'1px solid #ABABAB'}
                  borderRadius={'0.75rem'}
                >
                  <Typography variant="body1" color="primary.secondary">
                    {bestSuited}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Grid>
        <Grid size={{ xs: 12, md: 4, lg: 3 }} boxShadow={'0px -1px 4px 0px #00000008 inset'}>
          <Link
            href={cohortDetail?.price ? `/cohorts/${cohortDetail?.uuid}/checkout` : '#'}
            className="link-styles"
            style={{ width: '50%' }}
            onClick={(e) =>
              ensureAuthFromEvent(
                e,
                cohortDetail?.price ? `/cohorts/${cohortDetail?.uuid}/checkout` : '#'
              )
            }
          >
            <Box
              p={'0.625rem 1rem'}
              borderRadius={'0.75rem'}
              display={'flex'}
              justifyContent={'space-between'}
              alignItems={'center'}
              position={{ xs: 'fixed', md: 'relative' }}
              bottom={{ xs: 10, sm: 20, md: 'unset' }}
              left={{ xs: '50%', md: 'unset' }}
              zIndex={{ xs: 2, md: 0 }}
              width={{ xs: '93%', sm: '85%', md: '100%' }}
              sx={{
                transform: { xs: 'translateX(-50%)', md: 'none' },
                backgroundColor: 'primary.background',
              }}
            >
              <Box>
                <Typography variant="h7_bold" color="extremes.light">
                  $ {cohortDetail?.price}
                </Typography>
                <Typography variant="body2" color="secondary.light">
                  TOTAL
                </Typography>
              </Box>
              <Typography variant="body2" color="secondary.light">
                Proceed To Pay
              </Typography>
            </Box>
          </Link>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CohortDetail;
