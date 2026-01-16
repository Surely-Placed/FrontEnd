import { Box, Grid, Skeleton } from '@mui/material';
import React from 'react';

const CohortCardSkeleton = () => {
  return (
    <Grid
      size={{ xs: 12, md: 6 }}
      p={'1.5rem 1.25rem'}
      borderRadius={'0.625rem'}
      boxShadow={'0px 4px 14px 0px #0000001F'}
    >
      {/* Image skeleton */}
      <Skeleton
        variant="rectangular"
        width="100%"
        height={100}
        sx={{ borderRadius: '0.5rem', mb: 2 }}
      />
      
      {/* Title and price skeleton */}
      <Box display={'flex'} justifyContent={'space-between'} mb={1}>
        <Skeleton variant="text" width="60%" height={24} />
        <Skeleton variant="text" width="20%" height={24} />
      </Box>
      
      {/* Mentor skeleton */}
      <Skeleton variant="text" width="80%" height={20} sx={{ mb: 1 }} />
      
      {/* Starting date skeleton */}
      <Skeleton variant="text" width="70%" height={20} sx={{ mb: 1 }} />
      
      {/* WhatsApp section skeleton */}
      <Box display={'flex'} alignItems={'center'} gap={1}>
        <Skeleton variant="circular" width={40} height={40} />
        <Skeleton variant="text" width="60%" height={20} />
      </Box>
    </Grid>
  );
};

export default CohortCardSkeleton;
