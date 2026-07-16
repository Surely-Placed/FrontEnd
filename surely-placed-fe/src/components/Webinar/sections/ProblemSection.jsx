'use client';

import { Box, Chip, Typography } from '@mui/material';
import CustomDivider from '@/common/CustomDivider';
import { WEBINAR_AUDIENCE_PILLS } from '../../../../mockData/Webinar';
import { bodySx, headingSx, sectionSx } from '../styles';
import { AnimatedSection } from '../ui/AnimatedSection';
import { ReserveButton } from '../ui/ReserveButton';

export function ProblemSection({ webinarActive, priceLabel, onReserve }) {
  return (
    <AnimatedSection sx={sectionSx}>
      <CustomDivider text={"Why You're Not Hearing Back"} />
      <Typography component="h2" sx={{ ...headingSx, mt: 2, mb: 2 }}>
        Knowing Java or Python isn&apos;t enough anymore.
      </Typography>
      <Typography color="text.subText" sx={{ ...bodySx, maxWidth: 720, mb: 3 }}>
        Companies now screen for ATS-ready resumes, GitHub portfolios, LinkedIn branding, system
        design, and AI-assisted development. Most candidates never learn this. So they apply
        hundreds of times and hear nothing back. This webinar teaches all of it, in one evening.
      </Typography>
      <Box display="flex" flexWrap="wrap" justifyContent="flex-start" gap={1} mb={3}>
        {WEBINAR_AUDIENCE_PILLS.map((pill) => (
          <Chip
            key={pill}
            label={pill}
            sx={{
              bgcolor: 'customBlue.main',
              fontSize: { xs: '0.875rem', sm: '1rem' },
              height: 'auto',
              py: 0.5,
            }}
          />
        ))}
      </Box>
      <Box>
        <ReserveButton webinarActive={webinarActive} priceLabel={priceLabel} onClick={onReserve} />
      </Box>
    </AnimatedSection>
  );
}
