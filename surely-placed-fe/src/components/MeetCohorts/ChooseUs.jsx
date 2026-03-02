'use client';
import CustomDivider from '@/common/CustomDivider';
import { Box, Grid, Typography } from '@mui/material';
import React from 'react';
import { motion } from 'framer-motion';

const ChooseUs = ({ chooseUsDetails }) => {
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
        <CustomDivider text={chooseUsDetails?.overline} />
        <Typography
          component={'h2'}
          fontSize={{ xs: '1.25rem', sm: '2rem', md: '2.5rem' }}
          fontWeight={500}
          color="text"
          mt={2}
          fontFamily={'var(--font-avantgarde), sans-serif'}
        >
          {chooseUsDetails?.heading}
        </Typography>
        <Typography
          fontSize={{ xs: '0.875rem', md: '1rem' }}
          fontWeight={'400'}
          color="text.subText"
          mt={1}
        >
          {chooseUsDetails?.desc}
        </Typography>
        <Grid
          container
          spacing={2}
          mt={7}
          flexWrap={{ xs: 'wrap', lg: 'nowrap' }}
          sx={{
            overflowX: { xs: 'unset', lg: 'scroll' },
            '&::-webkit-scrollbar': { display: 'none' },
          }}
        >
          {chooseUsDetails?.pointers?.map((item, i) => (
            <Grid
              key={i}
              size={{ xs: 12, sm: 6, lg: 3 }}
              height={'inherit'}
              sx={{
                flexShrink: { lg: 0 },
              }}
            >
              <Box
                p={'1.25rem'}
                borderRadius={'0.9375rem'}
                height={'100%'}
                sx={{ backgroundColor: 'customBlue.main' }}
              >
                <Box mb={4}>{item?.icon}</Box>
                <Typography component={'h3'} variant="h6_light" fontWeight={600} color="text">
                  {item.heading}
                </Typography>
                <Typography variant="body1" color="customGray.desc" mt={2}>
                  {item.desc}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </motion.div>
  );
};

export default ChooseUs;
