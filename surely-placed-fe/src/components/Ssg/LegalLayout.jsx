'use client';

import Link from 'next/link';
import { Box, Typography } from '@mui/material';
import { WebLogo } from '../../../public/images';
import { SSG_PUBLIC_ROUTES as R } from '@/routes/ssg-public';

const headerSx = {
  borderBottom: '1px solid',
  borderColor: 'rgba(255,255,255,0.15)',
  bgcolor: 'primary.main',
  px: { xs: 2, sm: 3 },
  py: 2,
};

const contentSx = {
  mx: 'auto',
  maxWidth: 768,
  px: { xs: 2, sm: 3 },
  py: { xs: 4, sm: 5 },
};

const legalBodySx = {
  mt: 4,
  fontSize: '0.875rem',
  lineHeight: 1.7,
  color: 'text.subText',
  '& h2': {
    mt: 4,
    mb: 1.5,
    fontSize: '1.125rem',
    fontWeight: 600,
    color: 'text',
  },
  '& p': { mb: 1.5 },
  '& ul': {
    mb: 1.5,
    pl: 2.5,
    listStyleType: 'disc',
  },
  '& li': { mb: 0.75 },
  '& a': {
    color: 'primary.main',
    textDecoration: 'underline',
  },
};

export default function LegalLayout({ title, children }) {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#fff', color: 'text' }}>
      <Box component="header" sx={headerSx}>
        <Box
          sx={{
            mx: 'auto',
            maxWidth: 768,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 2,
          }}
        >
          <Link href={R.home} style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
            <WebLogo width={120} height={40} />
          </Link>
          <Link href={R.home} style={{ textDecoration: 'none' }}>
            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.85)', '&:hover': { color: '#fff' } }}>
              Back to homepage
            </Typography>
          </Link>
        </Box>
      </Box>

      <Box component="main" sx={contentSx}>
        <Typography
          component="h1"
          fontFamily={'var(--font-avantgarde), sans-serif'}
          fontSize={{ xs: '1.75rem', sm: '2rem' }}
          fontWeight={700}
        >
          {title}
        </Typography>
        <Box sx={legalBodySx}>{children}</Box>
      </Box>
    </Box>
  );
}
