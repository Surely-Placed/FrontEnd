'use client';
import { Grid, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import Image from 'next/image';
import React from 'react';
import { expertiseFeatures } from '../../../mockData/CoachForm';
import AnimatedCounter from '@/common/AnimatedCounter';

const HeroContainer = () => {
  return (
    <Grid
      container
      justifyContent={'space-between'}
      alignItems={'center'}
      position={'relative'}
      borderRadius={'0 0 1.25rem 1.25rem'}
      p={{
        xs: '11.5rem 1rem 2.5rem',
        sm: '11.5rem 2rem 4.5rem',
        md: '11.5rem 6rem 5.5rem',
        lg: '8rem 4rem 0',
        xl: '8rem 6rem 0',
      }}
      sx={{
        backgroundImage: "url('/CoachForm/HeroCoachBg.webp')",
        backgroundSize: '100% 100%',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <Grid size={{ xs: 12, lg: 5 }}>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0 }}
          transition={{
            duration: 1,
            ease: 'easeOut',
          }}
        >
          <Typography
            component={'h1'}
            variant="h1_light"
            fontSize={{ xs: '1.25rem', sm: '2.5rem', lg: '3rem', xl: '3.75rem' }}
            color="extremes.light"
            mb={1}
          >
            Become a Mentor
          </Typography>
          <Typography
            component={'p'}
            variant="subtitle1"
            fontSize={{ xs: '0.875rem', sm: '1rem' }}
            color="extremes.light"
          >
            We’re looking for experienced leaders for career mentorship. Share your details,
            experience, and interests to join our elite community of career coaches.
          </Typography>
          {/* <Grid container spacing={2} mt={4} mb={4}>
            {expertiseFeatures.map((item, i) => (
              <Grid
                key={i}
                size={4}
                borderRight={i !== expertiseFeatures.length - 1 ? '1px solid #D8D8D8' : 'none'}
                pr={{ xs: 1, sm: 3 }}
              >
                <Typography
                  variant="subHeading"
                  fontSize={{ xs: '1rem', sm: '1.75rem' }}
                  fontWeight={{ xs: 500, sm: 600 }}
                  color="extremes.light"
                >
                  <AnimatedCounter end={item.value} />
                  {item.endSymbol}
                </Typography>
                <Typography
                  variant="body1"
                  fontSize={{ xs: '0.75rem', sm: '0.875rem' }}
                  color="extremes.light"
                  mt={1}
                >
                  {item?.desc}
                </Typography>
              </Grid>
            ))}
          </Grid> */}
        </motion.div>
      </Grid>
      <Grid size={{ xs: 0, lg: 5, xl: 4 }}>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0 }}
          transition={{
            duration: 1,
            ease: 'easeOut',
          }}
        >
          <Image
            src={'/CoachForm/HeroCoachFormImg.webp'}
            alt="hero-img"
            width={100}
            height={100}
            unoptimized
            className="w_100 h_auto block"
          />
        </motion.div>
      </Grid>
    </Grid>
  );
};

export default HeroContainer;
