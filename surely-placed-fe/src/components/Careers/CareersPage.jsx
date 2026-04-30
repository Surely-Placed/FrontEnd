'use client';

import React from 'react';
import Link from 'next/link';
import { Box, Chip, Typography } from '@mui/material';
import { careersIntro, careersOpenings, getCareerSlug } from '../../../mockData/Careers';

const CareersPage = () => {
  return (
    <Box
      sx={{
        maxWidth: 1200,
        mx: 'auto',
        px: { xs: 2, sm: 1 },
        py: { xs: 2, sm: '6rem' },
        mt: { xs: 10, sm: 10, md: 10 },
      }}
    >
      <Typography
        component={'h1'}
        variant="h4"
        fontWeight={500}
        fontFamily={'var(--font-avantgarde), sans-serif'}
        lineHeight={'normal'}
        sx={{ mb: 2, fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' } }}
      >
        {careersIntro.title}
      </Typography>

      <Typography variant="subtitle1" color="text.secondary" mb={3}>
        Open roles at Surely Placed. Open each role to view complete details and apply.
      </Typography>

      <Box display={'flex'} flexDirection={'column'} gap={2}>
        {careersOpenings.map((job, idx) => (
          <Box
            key={job.title}
            sx={{
              p: { xs: 2, sm: 3 },
              borderRadius: '1rem',
              border: '1px solid',
              borderColor: '#D8E1F4',
              bgcolor: '#fff',
            }}
          >
            <Link href={`/careers/${getCareerSlug(job.title)}`} className="link-styles">
              <Typography component={'h2'} variant="h5" mb={1} sx={{ '&:hover': { color: 'primary.main' } }}>
                {idx + 1}. {job.title}
              </Typography>
            </Link>

            <Box display={'flex'} flexWrap={'wrap'} gap={1} mb={2}>
              <Chip label={`Experience: ${job.experience}`} size="small" />
              <Chip
                label={`Priority: ${job.priority}`}
                size="small"
                color={job.priority === 'High' ? 'primary' : 'default'}
              />
              <Chip label={`Openings: ${job.openings}`} size="small" />
            </Box>

          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default CareersPage;
