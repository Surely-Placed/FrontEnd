'use client';

import { Box, Button, Stack, Typography } from '@mui/material';
import Link from 'next/link';
import { bodySx, secondaryCtaSx } from '../styles';
import { AnimatedSection } from '../ui/AnimatedSection';
import { ReserveButton } from '../ui/ReserveButton';

export function FinalCtaSection({ webinarActive, priceLabel, onReserve }) {
  return (
    <AnimatedSection sx={{ px: { xs: 2, sm: 3, md: 4 }, pb: { xs: 4, md: 8 } }}>
      <Box
        sx={{
          maxWidth: 1200,
          mx: 'auto',
          p: { xs: '3rem 2rem', sm: '4rem 3rem', md: '5rem 4rem' },
          borderRadius: { xs: '1rem', md: '1.5rem' },
          overflow: 'hidden',
          textAlign: 'center',
          backgroundImage: "url('/HomePage/Container.webp')",
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <Typography
          component="h2"
          fontFamily={'var(--font-avantgarde), sans-serif'}
          fontSize={{ xs: '1.5rem', sm: '2rem', md: '2.5rem' }}
          fontWeight={600}
          color="extremes.light"
          mb={1.5}
          maxWidth={720}
          mx="auto"
        >
          Your next offer starts with better preparation.
        </Typography>
        <Typography color="text.light" sx={{ ...bodySx, maxWidth: 640, mx: 'auto', mb: 3 }}>
          Don&apos;t spend another six months guessing. Reserve your seat for the live webinar, or
          book a call for personalized career guidance.
        </Typography>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={2}
          justifyContent="center"
          alignItems="center"
        >
          <ReserveButton webinarActive={webinarActive} priceLabel={priceLabel} onClick={onReserve} />
          <Link href="/book-a-call" className="link-styles" style={{ color: 'inherit' }}>
            <Button variant="contained" disableElevation sx={secondaryCtaSx}>
              Book a Call
            </Button>
          </Link>
        </Stack>
      </Box>
    </AnimatedSection>
  );
}
