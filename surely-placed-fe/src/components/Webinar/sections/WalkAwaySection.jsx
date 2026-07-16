'use client';

import { Box, Grid, Typography } from '@mui/material';
import CustomDivider from '@/common/CustomDivider';
import { WEBINAR_WALKAWAY_SECTIONS } from '../../../../mockData/Webinar';
import { bodySx, headingSx, sectionSx } from '../styles';
import { AnimatedItem, AnimatedSection } from '../ui/AnimatedSection';
import { ReserveButton } from '../ui/ReserveButton';

export function WalkAwaySection({ webinarActive, priceLabel, onReserve }) {
  return (
    <AnimatedSection sx={sectionSx}>
      <CustomDivider text={"What You'll Walk Away With"} />
      <Typography component="h2" sx={{ ...headingSx, mt: 2, mb: 2 }}>
        A complete system for today&apos;s tech hiring market
      </Typography>
      <Typography color="text.subText" sx={{ ...bodySx, mb: 4, maxWidth: 800 }}>
        One live session covering how companies hire, how to stand out, how to interview with
        confidence, and the exact roadmap and resources to land your next tech role.
      </Typography>

      <Grid container spacing={2.5} alignItems="stretch">
        {WEBINAR_WALKAWAY_SECTIONS.map((section, index) => (
          <Grid key={section.label} size={{ xs: 12, md: 6 }} sx={{ display: 'flex' }}>
            <AnimatedItem delay={index * 0.08} sx={{ width: '100%', height: '100%' }}>
              <Box
                sx={{
                  p: { xs: 2.5, md: 3 },
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: '1rem',
                  border: '1px solid',
                  borderColor: '#D8E1F4',
                  bgcolor: '#fff',
                }}
              >
                <Typography variant="subtitle2_bold" color="secondary.main" mb={1}>
                  {section.label}
                </Typography>
                <Typography
                  component="h3"
                  fontFamily={'var(--font-avantgarde), sans-serif'}
                  fontWeight={600}
                  fontSize={{ xs: '1.1rem', sm: '1.25rem' }}
                  color="text"
                  mb={1.5}
                  lineHeight={1.35}
                >
                  {section.title}
                </Typography>
                <Typography variant="body2" color="text.subText" mb={1.5} lineHeight={1.65}>
                  {section.intro}
                </Typography>
                <Box component="ul" sx={{ pl: 2.5, m: 0 }}>
                  {section.bullets.map((item) => (
                    <Typography
                      component="li"
                      key={item}
                      variant="body2"
                      color="text.subText"
                      mb={0.75}
                      lineHeight={1.6}
                    >
                      {item}
                    </Typography>
                  ))}
                </Box>
              </Box>
            </AnimatedItem>
          </Grid>
        ))}
      </Grid>
      <Box mt={4}>
        <ReserveButton webinarActive={webinarActive} priceLabel={priceLabel} onClick={onReserve} />
      </Box>
    </AnimatedSection>
  );
}
