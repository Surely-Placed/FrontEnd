'use client';
import { Box, Divider, Grid, Tab, Tabs, Typography } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { HomeManager } from '@/services/home/api';
import { useParams } from 'next/navigation';

const MeetCoaches = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [cohortDetail, setCohortDetail] = useState(null);
  const didFetchRef = useRef(false);
  const { id } = useParams();

  const handleChange = (e, newValue) => {
    setActiveIdx(newValue);
  };

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

  return (
    <Box mb={{ xs: '4rem', md: '8rem' }} p={{ xs: '0 1.5rem', md: '0 5rem' }}>
      <Grid
        container
        justifyContent={'space-between'}
        spacing={{ xs: 5, lg: 0 }}
        mt={5}
        alignItems={'center'}
      >
        <Grid
          size={{ xs: 12, lg: 6 }}
          display={'flex'}
          flexDirection={'column'}
          justifyContent={'space-between'}
        >
          <Box display={'flex'} alignItems={'center'} gap={1}>
            <Typography variant="h6_bold" color="primary">
              |
            </Typography>
            <Typography variant="body2" color="text.variation" minWidth={'fit-content'}>
              About the coach
            </Typography>
            <Divider sx={{ width: { xs: '60%', sm: '75%', md: '80%', lg: '85%' } }} />
          </Box>
          <Typography
            component={'span'}
            fontSize={{ xs: '1.25rem', sm: '2rem' }}
            fontWeight={500}
            fontFamily={'var(--font-avantgarde), sans-serif'}
            color="text"
            mt={2}
            mb={3}
          >
            Meet Our Coaches
          </Typography>
          <Box
            borderRadius={'1.25rem'}
            mb={3}
            overflow={'hidden'}
            display={{ xs: 'block', lg: 'none' }}
          >
            {cohortDetail?.coaches?.[activeIdx]?.image && (
              <Image
                src={cohortDetail?.coaches?.[activeIdx]?.image}
                alt="active-image"
                width={100}
                height={100}
                unoptimized
                className="w_100 h_auto block"
              />
            )}
          </Box>
          <Tabs
            orientation="vertical"
            value={activeIdx}
            onChange={handleChange}
            sx={{
              position: 'relative',
              flex: 1,
              '& .MuiTabs-indicator': {
                left: 0,
                width: '4px',
                bgcolor: '#38BDB1',
                zIndex: 1,
                transition: 'all 0.3s ease',
              },
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                bottom: 0,
                width: '4px',
                bgcolor: '#E6E6E6',
                zIndex: 0,
              },
              '& .MuiTab-root': {
                maxWidth: 'unset',
              },
              '& .MuiTabs-list': {
                justifyContent: 'space-between',
                height: '100%',
              },
            }}
          >
            {cohortDetail?.coaches?.map((item, i) => (
              <Tab
                key={i}
                label={
                  <Box textAlign="left" width={'100%'}>
                    <Typography
                      fontSize={{ xs: '1rem', sm: '1.25rem' }}
                      fontWeight={500}
                      fontFamily={'var(--font-avantgarde), sans-serif'}
                      color="text"
                      textTransform={'capitalize'}
                      mb={1}
                    >
                      {item?.first_name?.toLowerCase()} {item?.last_name?.toLowerCase()}
                    </Typography>
                    <Typography
                      fontSize={{ xs: '0.875rem', sm: '1rem', lg: '1.25rem' }}
                      fontWeight={400}
                      color={activeIdx === i ? 'text.secondary' : 'customGray.text'}
                      textTransform={'capitalize'}
                    >
                      {item?.description}
                    </Typography>
                  </Box>
                }
                sx={{
                  alignItems: 'flex-start',
                  py: 2,
                  minHeight: 'auto',
                }}
              />
            ))}
          </Tabs>
        </Grid>
        <Grid
          size={{ xs: 0, lg: 5.5 }}
          borderRadius={'1.25rem'}
          overflow={'hidden'}
          display={{ xs: 'none', lg: 'block' }}
          height={'360px'}
        >
          {cohortDetail?.coaches?.[activeIdx]?.image && (
            <Image
              src={cohortDetail?.coaches?.[activeIdx]?.image}
              alt="active-image"
              width={100}
              height={100}
              unoptimized
              className="w_100 h_100 block"
            />
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default MeetCoaches;
