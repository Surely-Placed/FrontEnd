'use client';
import { AnimatePresence, motion } from 'framer-motion';
import CustomDivider from '@/common/CustomDivider';
import { Box, Grid, Tab, Tabs, Typography, useMediaQuery, useTheme } from '@mui/material';
import React, { useState } from 'react';
import { gettingStarted } from '../../../mockData/HomePage';
import Image from 'next/image';

const GetStarted = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleChange = (e, newValue) => {
    setActiveIdx(newValue);
  };

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
      <Box mb={{ xs: '4rem', md: '8rem' }} p={{ xs: '0 1.5rem', md: '0 5rem' }}>
        <CustomDivider text={'Start Your Journey'} />
        <Grid container spacing={5} mt={5} alignItems={'center'}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography
              component={'h2'}
              fontSize={{ xs: '1.25rem', sm: '2.5rem' }}
              fontWeight={500}
              fontFamily={'var(--font-avantgarde), sans-serif'}
              color="text"
            >
              Join, Build,{' '}
              <Typography
                component={'span'}
                fontSize={{ xs: '1.25rem', sm: '2.5rem' }}
                fontWeight={500}
                fontFamily={'var(--font-avantgarde), sans-serif'}
                color="secondary"
              >
                Apply, Succeed
              </Typography>
            </Typography>
            <Typography
            component={'p'}
              fontSize={{ xs: '0.875rem', sm: '1rem' }}
              fontWeight={400}
              color="text.subText"
              mt={2}
              mb={3}
            >
              Structured career coaching with resume creation, analytics, and buddy-led practice at
              every step.
            </Typography>
            <AnimatePresence mode="wait" custom={activeIdx}>
              <motion.div
                key={activeIdx}
                custom={activeIdx}
                initial={{ x: isMobile ? 0 : -100, opacity: 0 }}
                animate={{ x: isMobile ? 0 : 0, opacity: 1 }}
                exit={{ x: isMobile ? 0 : -100, opacity: 0 }}
                transition={{ duration: 0.6, ease: 'easeInOut' }}
                style={{ width: '100%', height: '500px' }}
              >
                <Image
                  src={gettingStarted[activeIdx]?.img}
                  alt="active-image"
                  width={100}
                  height={100}
                  unoptimized
                  className="w_100 h_auto"
                />
              </motion.div>
            </AnimatePresence>
          </Grid>
          <Grid
            size={{ xs: 12, md: 6 }}
            display={'flex'}
            flexDirection={'column'}
            justifyContent={'space-between'}
          >
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
              {gettingStarted.map((item, i) => (
                <Tab
                  key={i}
                  label={
                    <Box textAlign="left" width={'100%'}>
                      <Typography
                      component={'h3'}
                        fontSize={{ xs: '1rem', sm: '1.25rem', lg: '1.5rem' }}
                        fontWeight={500}
                        fontFamily={'var(--font-avantgarde), sans-serif'}
                        color={activeIdx === i ? 'text.primary' : 'customGray.disabled'}
                        textTransform={'capitalize'}
                        mb={1}
                      >
                        {item.heading}
                      </Typography>
                      <Typography
                      component={'p'}
                        fontSize={{ xs: '0.875rem', sm: '1rem', lg: '1.25rem' }}
                        fontWeight={400}
                        color={activeIdx === i ? 'text.secondary' : 'customGray.text'}
                        textTransform={'none'}
                      >
                        {item.desc}
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
        </Grid>
      </Box>
    </motion.div>
  );
};

export default GetStarted;
