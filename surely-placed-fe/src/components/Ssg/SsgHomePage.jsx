'use client';

import Link from 'next/link';
import { Box, Button, Typography } from '@mui/material';
import { WebLogo } from '../../../public/images';
import { SSG_PUBLIC_ROUTES as R } from '@/routes/ssg-public';
import { SUPPORT_EMAIL } from '@/config/site';

const headerSx = {
  borderBottom: '1px solid',
  borderColor: 'rgba(255,255,255,0.15)',
  bgcolor: 'primary.main',
  px: { xs: 2, sm: 3 },
  py: 2,
};

const navLinkSx = {
  color: 'rgba(255,255,255,0.85)',
  textDecoration: 'none',
  fontSize: '0.875rem',
  '&:hover': { color: '#fff', textDecoration: 'underline' },
};

const featureCardSx = {
  p: 2,
  borderRadius: '0.5rem',
  border: '1px solid',
  borderColor: '#D8E1F4',
  fontSize: '0.875rem',
  color: 'text.subText',
};

export default function SsgHomePage() {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#fff', color: 'text' }}>
      <Box component="header" sx={headerSx}>
        <Box
          sx={{
            mx: 'auto',
            maxWidth: 960,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 2,
            flexWrap: 'wrap',
          }}
        >
          <Box display="flex" alignItems="center" gap={1.5}>
            <WebLogo width={120} height={40} />
            <Box>
              <Typography fontWeight={700} color="#fff" lineHeight={1.1}>
                SSG Access
              </Typography>
              <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.6)' }}>
                by Surely Placed
              </Typography>
            </Box>
          </Box>
          <Box component="nav" display="flex" alignItems="center" gap={2}>
            <Link href={R.privacy} style={navLinkSx}>
              Privacy Policy
            </Link>
            <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>
              <Link href={R.terms} style={navLinkSx}>
                Terms
              </Link>
            </Box>
            <Button
              component="a"
              href={R.signIn}
              sx={{
                bgcolor: '#fff',
                color: 'primary.main',
                fontWeight: 600,
                fontSize: '0.875rem',
                px: 1.5,
                py: 0.75,
                borderRadius: '0.5rem',
                textTransform: 'none',
                '&:hover': { bgcolor: 'rgba(255,255,255,0.9)' },
              }}
            >
              Sign in
            </Button>
          </Box>
        </Box>
      </Box>

      <Box component="main" sx={{ mx: 'auto', maxWidth: 960, px: { xs: 2, sm: 3 }, py: { xs: 4, sm: 6 } }}>
        <Typography
          component="h1"
          fontFamily={'var(--font-avantgarde), sans-serif'}
          fontSize={{ xs: '1.75rem', sm: '2rem' }}
          fontWeight={700}
        >
          SSG Access — Surely Placed Internal CRM
        </Typography>
        <Typography sx={{ mt: 2, maxWidth: 640, lineHeight: 1.7, color: 'text.subText' }}>
          <Box component="strong" fontWeight={600} color="text">
            SSG Access
          </Box>{' '}
          is a private management portal owned and operated by{' '}
          <Box component="strong" fontWeight={600} color="text">
            Surely Placed
          </Box>
          , a career coaching organization. This application is used exclusively by Surely Placed staff
          and invited candidates enrolled in our programs.
        </Typography>

        <Box sx={{ mt: 5 }}>
          <Typography component="h2" fontSize="1.125rem" fontWeight={600} mb={1}>
            Application functionality
          </Typography>
          <Typography variant="body2" color="text.subText" mb={2}>
            SSG Access provides the following features to authorized users:
          </Typography>
          <Box
            sx={{
              display: 'grid',
              gap: 1.5,
              gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
            }}
          >
            {[
              {
                title: 'Candidate management',
                desc: 'View and manage enrolled candidates, profiles, and program status.',
              },
              {
                title: 'Application tracking',
                desc: 'Monitor daily job application counts and progress metrics.',
              },
              {
                title: 'Interview management',
                desc: 'Track scheduled interviews, assignments, and related correspondence.',
              },
              {
                title: 'Team & program oversight',
                desc: 'Manage marketers, mentors, payments, and cohort performance.',
              },
            ].map((item) => (
              <Box key={item.title} sx={featureCardSx}>
                <Typography fontWeight={600} color="text" mb={0.5}>
                  {item.title}
                </Typography>
                <Typography variant="body2">{item.desc}</Typography>
              </Box>
            ))}
          </Box>
        </Box>

        <Box
          sx={{
            mt: 5,
            p: 3,
            borderRadius: '0.75rem',
            border: '1px solid',
            borderColor: 'customBlue.light',
            bgcolor: 'customBlue.main',
          }}
        >
          <Typography component="h2" fontSize="1.125rem" fontWeight={600} mb={1.5}>
            Why we request Google / Gmail data
          </Typography>
          <Typography variant="body2" color="text.subText" lineHeight={1.7} mb={2}>
            SSG Access requests access to a candidate&apos;s Gmail account{' '}
            <Box component="strong" fontWeight={600} color="text">
              only with their explicit consent
            </Box>{' '}
            and only for the following purpose:
          </Typography>
          <Box component="ul" sx={{ pl: 2.5, mb: 2, color: 'text.subText', fontSize: '0.875rem' }}>
            <li>
              To <strong>monitor</strong> job application and interview-related email activity as part of
              Surely Placed&apos;s coaching program
            </li>
            <li>
              To display application and interview progress metrics to the candidate and authorized Surely
              Placed staff
            </li>
            <li>To support coaching, accountability, and program oversight</li>
          </Box>
          <Typography variant="body2" color="text.subText" lineHeight={1.7} mb={2}>
            We do <strong>not</strong> use Gmail data for advertising, sell Gmail data, or store Gmail
            message content on our servers. Gmail data is accessed for real-time monitoring only.
            Candidates may disconnect their Google account at any time.
          </Typography>
          <Typography variant="body2">
            For full details, see our{' '}
            <Link href={R.privacy} style={{ color: '#2857C4', fontWeight: 600 }}>
              Privacy Policy
            </Link>
            .
          </Typography>
        </Box>

        <Box sx={{ mt: 5 }}>
          <Typography component="h2" fontSize="1.125rem" fontWeight={600} mb={1.5}>
            Access &amp; sign in
          </Typography>
          <Typography variant="body2" color="text.subText" lineHeight={1.7} mb={2}>
            SSG Access is invite-only. Public sign-up is not available. Surely Placed staff and enrolled
            candidates receive access from their program administrator. Sign in is optional — all
            information on this page is available without logging in.
          </Typography>
          <Button
            component="a"
            href={R.signIn}
            variant="filled"
            sx={{
              bgcolor: 'primary.main',
              color: '#fff',
              fontWeight: 600,
              textTransform: 'none',
              px: 2,
              py: 1,
              borderRadius: '0.5rem',
              '&:hover': { bgcolor: 'primary.background' },
            }}
          >
            Sign in to SSG Access
          </Button>
        </Box>
      </Box>

      <Box component="footer" sx={{ borderTop: '1px solid #E4E4E4', px: { xs: 2, sm: 3 }, py: 4 }}>
        <Box sx={{ mx: 'auto', maxWidth: 960 }}>
          <Box display="flex" flexWrap="wrap" gap={2} mb={2}>
            <Link href={R.privacy} style={{ color: '#2857C4', fontSize: '0.875rem' }}>
              Privacy Policy
            </Link>
            <Link href={R.terms} style={{ color: '#2857C4', fontSize: '0.875rem' }}>
              Terms and Conditions
            </Link>
            <a href={`mailto:${SUPPORT_EMAIL}`} style={{ color: '#2857C4', fontSize: '0.875rem' }}>
              {SUPPORT_EMAIL}
            </a>
          </Box>
          <Typography variant="body2" color="text.subText">
            &copy; {new Date().getFullYear()} Surely Placed. All rights reserved.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
