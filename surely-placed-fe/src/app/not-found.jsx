'use client';

import { Box, Button, Typography, Container } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const NotFound = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <Box
      display="flex"
      flexDirection="column"
      minHeight="calc(100vh - 200px)"
      sx={{
        pt: { xs: '3rem', sm: '4rem' },
      }}
    >
      {/* Main Content */}
      <Box
        flex={1}
        display="flex"
        alignItems="center"
        justifyContent="center"
        px={{ xs: '2rem', sm: '4rem', lg: '6.25rem' }}
        py={{ xs: '3rem', sm: '4rem', lg: '5rem' }}
        position={'relative'}
      >
        <Box position={'absolute'} width={'60%'}>
          <Image
            src={'/404.svg'}
            alt="page-not-found"
            height={100}
            width={100}
            unoptimized
            className="h_auto w_100"
          />
        </Box>
        <Container maxWidth="sm" disableGutters>
          <Box
            textAlign="center"
            sx={{
              position: 'relative',
              zIndex: 1,
            }}
          >
            {/* Heading */}
            <Typography
              variant="h1"
              color="primary"
              sx={{
                fontSize: { xs: '2.5rem', sm: '3rem', lg: '3.5rem' },
                fontWeight: 600,
                mb: { xs: '1rem', sm: '1.5rem' },
                fontFamily: 'var(--font-avantgarde)',
                lineHeight: 1.2,
              }}
            >
              Page not found
            </Typography>

            {/* Description */}
            <Typography
              sx={{
                fontSize: { xs: '0.95rem', sm: '1rem', lg: '1.25rem' },
                fontWeight: 400,
                color: '#292929',
                mb: { xs: '2.5rem', sm: '3rem', lg: '3.5rem' },
                fontFamily: 'var(--font-nexa)',
                lineHeight: 1.6,
              }}
            >
              The page you're looking for doesn't exist or was moved.
            </Typography>

            {/* CTA Button */}
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Link href="/" style={{ textDecoration: 'none' }}>
                <Button
                  variant="filled"
                  sx={{
                    bgcolor: 'primary.main',
                    color: 'extremes.light',
                    textTransform: 'none',
                    fontSize: { xs: '0.9rem', sm: '1rem' },
                    '&:hover': {
                      backgroundColor: '#1e3a8a',
                      boxShadow: '0 4px 12px rgba(30, 64, 175, 0.3)',
                    },
                    transition: 'all 0.3s ease',
                  }}
                >
                  Back to Dashboard
                </Button>
              </Link>
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default NotFound;
