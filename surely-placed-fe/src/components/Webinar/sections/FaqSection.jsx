'use client';

import { useState } from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { ExpandIcon } from '../../../../public/images';
import { WEBINAR_FAQS } from '../../../../mockData/Webinar';
import { headingSx, sectionSx } from '../styles';
import { AnimatedSection } from '../ui/AnimatedSection';

export function FaqSection() {
  const theme = useTheme();
  const isTabScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [faqOpen, setFaqOpen] = useState(0);

  return (
    <AnimatedSection sx={sectionSx}>
      <Typography component="h2" sx={{ ...headingSx, mb: 3 }}>
        Frequently asked questions
      </Typography>
      {WEBINAR_FAQS.map((faq, i) => (
        <Accordion
          key={faq.q}
          elevation={0}
          expanded={faqOpen === i}
          onChange={() => setFaqOpen(faqOpen === i ? -1 : i)}
          sx={{ borderBottom: '1px solid #E4E4E4', '&:before': { display: 'none' } }}
        >
          <AccordionSummary expandIcon={<ExpandIcon size={isTabScreen ? 24 : 32} />}>
            <Typography component="h3" variant="subtitle1" fontWeight={500}>
              {faq.q}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body2" color="text.subText">
              {faq.a}
            </Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </AnimatedSection>
  );
}
