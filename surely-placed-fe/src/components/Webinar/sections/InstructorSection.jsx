'use client';

import { Box, Grid, Typography } from '@mui/material';
import Image from 'next/image';
import CustomDivider from '@/common/CustomDivider';
import { headingSx, sectionSx } from '../styles';
import { AnimatedSection } from '../ui/AnimatedSection';
import { ReserveButton } from '../ui/ReserveButton';

export function InstructorSection({ webinarActive, priceLabel, onReserve }) {
  return (
    <AnimatedSection sx={sectionSx}>
      <Grid container spacing={4} alignItems="center">
        <Grid size={{ xs: 12, md: 5 }} display="flex" justifyContent="center">
          <Box
            sx={{
              width: '100%',
              maxWidth: 280,
              aspectRatio: '4 / 5',
              borderRadius: '1rem',
              overflow: 'hidden',
              boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
            }}
          >
            <Image
              src="/dh.jpeg"
              alt="Dhiraj Kumar Jain, webinar instructor"
              width={280}
              height={350}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center top',
              }}
            />
          </Box>
        </Grid>
        <Grid size={{ xs: 12, md: 7 }}>
          <CustomDivider text="Meet Your Instructor" />
          <Typography component="h2" sx={{ ...headingSx, mt: 2, mb: 1 }}>
            Dhiraj Kumar Jain
          </Typography>
          <Typography variant="subtitle1" fontWeight={600} color="text.subText" mb={2}>
            Software Engineer, AWS · Distributed storage &amp; search systems · OpenSearch contributor
          </Typography>
          <Typography variant="body1" color="text.subText" mb={2}>
            Dhiraj builds large-scale distributed systems at AWS and contributes to open source. He
            teaches the hiring process the way it works inside big tech: what gets a resume
            shortlisted, what interviewers actually score you on, and how AI is reshaping both.
          </Typography>
          <Typography variant="body1" color="text.subText" mb={3}>
            His approach: replace guesswork with a system.{' '}
            <Typography component="span" fontWeight={600} color="text">
              System beats luck. Every time.
            </Typography>
          </Typography>
          <ReserveButton webinarActive={webinarActive} priceLabel={priceLabel} onClick={onReserve} />
        </Grid>
      </Grid>
    </AnimatedSection>
  );
}
