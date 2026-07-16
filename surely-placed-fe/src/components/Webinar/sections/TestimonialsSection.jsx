'use client';

import { Box, Grid, Typography } from '@mui/material';
import { WEBINAR_TESTIMONIALS } from '../../../../mockData/Webinar';
import { headingSx, sectionSx } from '../styles';
import { AnimatedItem, AnimatedSection } from '../ui/AnimatedSection';

export function TestimonialsSection() {
  return (
    <AnimatedSection sx={{ ...sectionSx, bgcolor: 'extremes.light' }}>
      <Typography component="h2" sx={{ ...headingSx, mb: 3 }}>
        Success stories
      </Typography>
      <Grid container spacing={2} alignItems="stretch">
        {WEBINAR_TESTIMONIALS.map((t, index) => (
          <Grid key={t.name} size={{ xs: 12, md: 4 }} sx={{ display: 'flex' }}>
            <AnimatedItem delay={index * 0.12} sx={{ width: '100%', height: '100%' }}>
              <Box
                sx={{
                  p: 2.5,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: '0.5rem',
                  border: '1px solid #91E4DD',
                  bgcolor: 'customGreen.main',
                }}
              >
                <Typography variant="body2" color="text.dark" mb={2}>
                  {t.quote}
                </Typography>
                <Box display="flex" alignItems="center" gap={1.5} sx={{ mt: 'auto', pt: 2 }}>
                  <Box
                    sx={{
                      width: 44,
                      height: 44,
                      borderRadius: '50%',
                      bgcolor: t.tone === 'blue' ? 'customBlue.secondary' : 'customGreen.background',
                      color: t.tone === 'blue' ? 'primary.main' : 'secondary.main',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 700,
                    }}
                  >
                    {t.initials}
                  </Box>
                  <Box>
                    <Typography variant="subtitle2" color="text.dark">
                      {t.name}
                    </Typography>
                    <Typography variant="caption" color="text.dark">
                      {t.role}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </AnimatedItem>
          </Grid>
        ))}
      </Grid>
    </AnimatedSection>
  );
}
