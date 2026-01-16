'use client';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Divider,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import React, { useState } from 'react';
import { innovationPoints } from '../../../mockData/Services';
import Image from 'next/image';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';

const Innovation = () => {
  const [active, setActive] = useState(0);
  const [expandedIndex, setExpandedIndex] = useState(0);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, amount: 0 }}
      transition={{
        duration: 1,
        ease: 'easeOut',
      }}
    >
      <Grid
        container
        justifyContent={'space-between'}
        p={{ xs: '0 1rem 3rem', sm: '0 2rem 3rem', lg: '0rem 6rem 6rem' }}
      >
        <Grid size={{ xs: 12, lg: 4.5 }}>
          <Box display={'flex'} alignItems={'center'} gap={1}>
            <Typography variant="h6_bold" color="primary">
              |
            </Typography>
            <Typography variant="body2" color="text.variation" minWidth={'fit-content'}>
              Lorem Ipsum
            </Typography>
            <Divider sx={{ width: { xs: '68%', lg: '81%' } }} />
          </Box>
          <Typography
            component={'span'}
            fontSize={{ xs: '1.5rem', sm: '2.5rem' }}
            fontWeight={500}
            fontFamily={'var(--font-avantgarde), sans-serif'}
            color="text"
          >
            Where Expertise{' '}
            <Typography
              component={'span'}
              fontSize={{ xs: '1.5rem', sm: '2.5rem' }}
              fontWeight={500}
              fontFamily={'var(--font-avantgarde), sans-serif'}
              color="secondary"
            >
              Meets Innovation
            </Typography>
          </Typography>
          <Typography
            variant="body1"
            fontSize={{ xs: '0.875rem', sm: '1rem', lg: '0.875rem' }}
            color="text"
            mt={1}
            mb={{ xs: 4, lg: 0 }}
          >
            Donec dictum tristique porta. Etiam convallis lorem lobortis nulla molestie, nec
            tincidunt ex ullamcorper. Quisque ultrices lobortis elit sed euismod. Duis in ultrices
            dolor, ac rhoncus odio lobortis nulla Donec dictum tristique porta. Etiam convallis
            lorem lobortis.
          </Typography>
          <Box mt={2} display={{ xs: 'none', lg: 'block' }}>
            {innovationPoints.map((item, i) => {
              const activeEle = active === i;
              return (
                <Box
                  key={i}
                  py={2}
                  borderBottom={'1px solid #DADADA'}
                  sx={{ cursor: 'pointer' }}
                  onClick={() => setActive(i)}
                >
                  <Typography
                    fontSize={activeEle ? '1.5rem' : '1.475rem'}
                    fontWeight={activeEle ? 700 : 300}
                    color={activeEle ? 'text' : 'text.subText'}
                  >
                    {item?.heading}
                  </Typography>
                </Box>
              );
            })}
          </Box>
        </Grid>
        <Grid size={{ xs: 12, lg: 7 }}>
          <AnimatePresence mode="wait" custom={active}>
            <motion.div
              key={active}
              custom={active}
              initial={{ x: isMobile ? 0 : 100, opacity: 0 }}
              animate={{ x: isMobile ? 0 : 0, opacity: 1 }}
              exit={{ x: isMobile ? 0 : 100, opacity: 0 }}
              transition={{ duration: 0.6, ease: 'easeInOut' }}
              style={{ width: '100%' }}
            >
              <Box display={{ xs: 'none', lg: 'block' }}>
                <Image
                  src={innovationPoints[active]?.img}
                  alt={`innovation-${active}`}
                  width={100}
                  height={100}
                  unoptimized
                  className="w_100 h_auto"
                />
                <Typography variant="h4_bold" component={'p'} color="text" mt={2}>
                  {innovationPoints[active]?.heading}
                </Typography>
                <Typography variant="subtitle1" component={'p'} color="text.secondary" mt={2}>
                  {innovationPoints[active]?.desc}
                </Typography>
                <Box mt={2}>
                  <Link href={'book-a-call'} className="link-styles">
                    <Button
                      variant="filled"
                      sx={{ bgcolor: 'primary.main', color: 'extremes.light', minWidth: '30%' }}
                    >
                      <Typography variant="subtitle2_bold" color="extremes.light" mt={0.1}>
                        Book a Call
                      </Typography>
                    </Button>
                  </Link>
                </Box>
              </Box>
            </motion.div>
          </AnimatePresence>
          <Box display={{ xs: 'block', lg: 'none' }}>
            {innovationPoints.map((item, index) => {
              const activeEle = active === index;
              return (
                <Accordion
                  key={index}
                  elevation={0}
                  expanded={expandedIndex === index}
                  onChange={() => {
                    setExpandedIndex(expandedIndex === index ? -1 : index);
                  }}
                  sx={{
                    borderLeft: 'none',
                    borderRight: 'none',
                    borderTop: '1px solid #d4d4d4',
                    borderBottom:
                      index !== innovationPoints.length - 1
                        ? '1px solid rgba(212,212,212,0.5)'
                        : '1px solid rgba(212,212,212,1)',
                    borderRadius: 0,
                    '&.Mui-expanded': {
                      margin: 0,
                    },
                  }}
                >
                  <AccordionSummary
                    aria-controls="panel1-content"
                    id="panel1-header"
                    sx={{ padding: '0.5rem 0 0' }}
                    onClick={() => setActive(index)}
                  >
                    <Typography
                      fontSize={{
                        xs: '1rem',
                        sm: '1.5rem',
                      }}
                      fontWeight={500}
                      fontFamily={'var(--font-avantgarde), sans-serif'}
                      color={activeEle ? 'text' : 'text.subText'}
                    >
                      {item.heading}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails sx={{ padding: '0.5rem 0 1.5rem' }}>
                    <Image
                      src={innovationPoints[index]?.img}
                      alt={`innovation-${active}`}
                      width={100}
                      height={100}
                      unoptimized
                      className="w_100 h_auto"
                    />
                    <Typography
                      fontSize={{
                        xs: '0.875rem',
                        sm: '1.25rem',
                      }}
                      fontWeight={400}
                      mt={2}
                      color="text.subText"
                    >
                      {item.desc}
                    </Typography>
                    <Box mt={3}>
                      <Link href={'book-a-call'} className="link-styles">
                        <Button
                          variant="filled"
                          sx={{ bgcolor: 'primary.main', color: 'extremes.light', minWidth: '50%' }}
                        >
                          <Typography variant="subtitle2_bold" color="extremes.light" mt={0.1}>
                            Book a Call
                          </Typography>
                        </Button>
                      </Link>
                    </Box>
                  </AccordionDetails>
                </Accordion>
              );
            })}
          </Box>
        </Grid>
      </Grid>
    </motion.div>
  );
};

export default Innovation;
