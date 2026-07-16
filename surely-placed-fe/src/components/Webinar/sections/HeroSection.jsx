'use client';

import { Box, Chip, LinearProgress, Stack, Typography } from '@mui/material';
import { bodySx, heroHeadingSx, sectionSx } from '../styles';
import { AnimatedSection } from '../ui/AnimatedSection';
import { CountdownBlock } from '../ui/CountdownBlock';
import { ReserveButton } from '../ui/ReserveButton';

export function HeroSection({
  webinarActive,
  datetimeLabel,
  countdown,
  seatsLeft,
  seatsTotal,
  seatsProgress,
  priceLabel,
  onReserve,
}) {
  return (
    <Box sx={{ bgcolor: 'extremes.light', pt: { xs: '6rem', lg: '6.5rem' } }}>
      <AnimatedSection sx={{ ...sectionSx, textAlign: 'center' }}>
        <Chip
          label={
            webinarActive
              ? `Live Webinar · ${datetimeLabel}`
              : 'Stay tuned for live webinar TBD'
          }
          sx={{
            mb: 2,
            bgcolor: 'customGreen.main',
            color: 'secondary.main',
            fontWeight: 600,
            fontSize: { xs: '0.875rem', sm: '1rem' },
            height: 'auto',
            py: 0.75,
            px: 1.5,
          }}
        />
        <Typography component="h1" sx={{ ...heroHeadingSx, mb: 2 }}>
          Stop mass-applying. Start getting interviews.
        </Typography>
        <Typography color="text.subText" sx={{ ...bodySx, maxWidth: 720, mx: 'auto', mb: 3 }}>
          200 applications and silence isn&apos;t a work-ethic problem. It&apos;s a system problem.
          In one live session, learn the exact system engineers now at Amazon, Google, and Microsoft
          used to get shortlisted, crack interviews, and stay ahead of AI-driven hiring.
        </Typography>

        <Stack direction="row" flexWrap="wrap" justifyContent="center" gap={1.5} mb={3}>
          {['Live, instructor-led', 'Career Playbook included', 'Recording included', 'Live Q&A'].map(
            (item) => (
              <Chip
                key={item}
                label={item}
                variant="outlined"
                sx={{ fontSize: { xs: '0.875rem', sm: '1rem' }, height: 'auto', py: 0.75, px: 0.5 }}
              />
            )
          )}
        </Stack>

        {webinarActive && (
          <Stack direction="row" justifyContent="center" gap={1.5} flexWrap="wrap" mb={3}>
            <CountdownBlock label="Days" value={countdown.d} />
            <CountdownBlock label="Hours" value={countdown.h} />
            <CountdownBlock label="Min" value={countdown.m} />
            <CountdownBlock label="Sec" value={countdown.s} />
          </Stack>
        )}

        <Box display="flex" flexDirection="column" alignItems="center" gap={1.5}>
          <ReserveButton
            webinarActive={webinarActive}
            priceLabel={priceLabel}
            onClick={onReserve}
          />
          {webinarActive && (
            <Box width={{ xs: '80%', sm: 240 }}>
              <LinearProgress
                variant="determinate"
                value={seatsProgress}
                sx={{ height: 6, borderRadius: 999, bgcolor: 'customBlue.light' }}
              />
              <Typography
                variant="body1"
                color="text.subText"
                mt={1}
                fontSize={{ xs: '1rem', sm: '1.125rem' }}
              >
                Only{' '}
                <Typography component="span" color="secondary.main" fontWeight={600}>
                  {seatsLeft} of {seatsTotal} seats
                </Typography>{' '}
                remaining
              </Typography>
            </Box>
          )}
        </Box>

        <Stack
          direction="row"
          flexWrap="wrap"
          justifyContent="center"
          gap={{ xs: 2, md: 4 }}
          mt={4}
          pt={3}
          borderTop="1px solid"
          borderColor="customBlue.light"
        >
          {[
            ['890+', 'students placed'],
            ['1,400+', 'registrations'],
          ].map(([n, label]) => (
            <Typography
              key={label}
              variant="body1"
              color="text.subText"
              fontSize={{ xs: '1rem', sm: '1.125rem' }}
            >
              <Typography
                component="span"
                fontWeight={700}
                fontSize={{ xs: '1.375rem', sm: '1.5rem' }}
                color="text"
              >
                {n}
              </Typography>{' '}
              {label}
            </Typography>
          ))}
        </Stack>
      </AnimatedSection>
    </Box>
  );
}
