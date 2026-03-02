'use client'
import { Box, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AuthManager } from '@/services/auth';
import CohortCardSkeleton from '@/common/CohortCardSkeleton';
import { showToast } from '@/hooks/showToast';

const MyCohorts = () => {
  const [cohorts, setCohorts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyCohorts = async () => {
      try {
        setLoading(true);
        const { variant, data } = await AuthManager.myCohorts();
        if (variant === 'success') {
          setCohorts(data || []);
        } else {
          showToast(msg || 'Failed to fetch cohorts', 'error');
          setCohorts([]);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchMyCohorts();
  }, []);

  const renderSkeleton = () => {
    return (
      <>
        {[...Array(4)].map((_, index) => (
          <CohortCardSkeleton key={index} />
        ))}
      </>
    );
  };

  const renderEmptyState = () => {
    return (
      <Grid size={12}>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          py={8}
        >
          <Typography variant="h6" color="text.secondary" textAlign="center">
            No Cohort Found
          </Typography>
          <Typography variant="body2" color="text.secondary" textAlign="center" mt={1}>
            You haven't enrolled in any cohorts yet.
          </Typography>
        </Box>
      </Grid>
    );
  };
  const renderCohorts = () => {
    return cohorts.map((item, i) => (
      <Grid
        key={i}
        size={{ xs: 12, md: 6 }}
        p={'1.5rem 1.25rem'}
        borderRadius={'0.625rem'}
        boxShadow={'0px 4px 14px 0px #0000001F'}
      >
        <Image
          src={item?.cohort?.image}
          alt={`my-cohort-${i}`}
          width={100}
          height={100}
          unoptimized
          className="w_100"
          style={{ borderRadius: '0.625rem', height: '10rem', objectFit: 'cover' }}
        />
        <Box display={'flex'} justifyContent={'space-between'} mt={2} mb={1}>
          <Typography variant="subtitle1_normal" color="text">
            {item?.cohort?.name}
          </Typography>
          <Typography variant="subtitle1" color="text">
            ${item?.cohort?.price}
          </Typography>
        </Box>
        <Typography variant="body1" color="text.subText" mb={1}>
          Mentor: {item?.cohort?.coaches[0]?.first_name} {item?.cohort?.coaches[0]?.last_name}
        </Typography>
        <Typography variant="body1" color="text.subText" mb={1}>
          Starting from:{' '}
          {item?.cohort?.start_date
            ? (() => {
                const date = new Date(item.cohort.start_date);
                const day = String(date.getDate()).padStart(2, '0');
                const month = String(date.getMonth() + 1).padStart(2, '0');
                const year = date.getFullYear();
                const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
                return `${day}/${month}/${year} | ${dayName}`;
              })()
            : 'TBD'}
        </Typography>
        {item?.cohort?.whatsapp_link && (
          <Box display={'flex'} alignItems={'center'} gap={1}>
            <Image
              src={'/Profile/WhatsApp.png'}
              alt="whatsapp"
              width={40}
              height={40}
              unoptimized
            />
            <Link href={'https://wa.me/0987654321?text='} className="link-styles">
              <Typography variant="body1" color="customGreen.link">
                {item?.cohort?.whatsapp_link}
              </Typography>
            </Link>
          </Box>
        )}
      </Grid>
    ));
  };

  return (
    <Box>
      <Typography variant="h6_bold" color="text" display={{ xs: 'none', lg: 'block' }}>
        My Cohorts
      </Typography>
      <Grid container spacing={3} mt={{ xs: 0, sm: 4 }}>
        {loading ? renderSkeleton() : cohorts.length === 0 ? renderEmptyState() : renderCohorts()}
      </Grid>
    </Box>
  );
};

export default MyCohorts;
