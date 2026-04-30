import React from 'react';
import Link from 'next/link';
import { Box, Button, Chip, Typography } from '@mui/material';
import { careersApplyLink, careersIntro } from '../../../mockData/Careers';

const CareerDetailsPage = ({ job }) => {
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
      <Link href={'/careers'} className="link-styles">
        <Typography variant="subtitle1" color="primary.main" mb={2}>
          {'<- Back to Careers'}
        </Typography>
      </Link>

      <Typography component={'h1'} variant="h4" mb={1}>
        {job.title}
      </Typography>

      <Box display={'flex'} flexWrap={'wrap'} gap={1} mb={2.5}>
        <Chip label={`Experience: ${job.experience}`} size="small" />
        <Chip label={`Priority: ${job.priority}`} size="small" color={job.priority === 'High' ? 'primary' : 'default'} />
        <Chip label={`Openings: ${job.openings}`} size="small" />
      </Box>

      <Typography variant="subtitle1" color="text.secondary" mb={2}>
        {job.summary}
      </Typography>

      <Typography variant="subtitle2_bold" color="text" mb={0.75}>
        What you'll own
      </Typography>
      <Box component={'ul'} sx={{ pl: 2.5, mt: 0, mb: 2 }}>
        {job.owns.map((item) => (
          <Box component={'li'} key={item} sx={{ mb: 0.5 }}>
            <Typography variant="subtitle1" color="text.secondary">
              {item}
            </Typography>
          </Box>
        ))}
      </Box>

      <Typography variant="subtitle2_bold" color="text" mb={0.75}>
        What we're looking for
      </Typography>
      <Box component={'ul'} sx={{ pl: 2.5, mt: 0, mb: 2 }}>
        {job.lookingFor.map((item) => (
          <Box component={'li'} key={item} sx={{ mb: 0.5 }}>
            <Typography variant="subtitle1" color="text.secondary">
              {item}
            </Typography>
          </Box>
        ))}
      </Box>

      <Typography variant="subtitle2_bold" color="text" mb={0.75}>
        AI expectation
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" mb={2}>
        {job.aiExpectation}
      </Typography>

      <Typography variant="subtitle2_bold" color="text" mb={0.75}>
        How we'll measure success
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" mb={job.note ? 1 : 2.5}>
        {job.successMetrics}
      </Typography>

      {job.note && (
        <Typography variant="subtitle1" color="text.secondary" mb={2.5}>
          <strong>Note:</strong> {job.note}
        </Typography>
      )}

      <Box
        sx={{
          p: { xs: 2, sm: 3 },
          borderRadius: '0.875rem',
          bgcolor: 'customGray.light',
          mb: 2.5,
          border: '1px solid',
          borderColor: '#E1E8F8',
        }}
      >
        <Typography variant="subtitle2_bold" color="text" mb={1}>
          On AI fluency
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          {careersIntro.aiFluency}
        </Typography>
      </Box>

      <Link href={careersApplyLink} target="_blank" rel="noopener noreferrer">
        <Button variant="filled" sx={{ bgcolor: 'primary.main', color: 'extremes.light', textTransform: 'none' }}>
          Apply Now
        </Button>
      </Link>
    </Box>
  );
};

export default CareerDetailsPage;
