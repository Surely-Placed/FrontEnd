'use client';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { motion } from 'framer-motion';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import { HomeManager } from '@/services/home/api';
import { ExpandIcon } from '../../../public/images';

const FAQ = ({ p = '0 1rem', category = 'Default' }) => {
  const [expandedIndex, setExpandedIndex] = useState(false);
  const [faqs, setFaqs] = useState([]);
  const didFetchRef = useRef(false);

  const theme = useTheme();
  const isTabScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleChange = (index) => (event, isExpanded) => {
    setExpandedIndex(isExpanded ? index : false);
  };

  useEffect(() => {
    if (didFetchRef.current) return;
    didFetchRef.current = true;
    (async () => {
      try {
        const res = await HomeManager.getFAQs(category);
        let dataArray = Array.isArray(res?.data) ? res.data : [];
        dataArray = dataArray?.slice(0,7);
        setFaqs(dataArray);
      } catch (e) {
        setFaqs([]);
      }
    })();
  }, []);
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
        alignItems={'center'}
        mb={{ xs: '4rem', lg: '8rem' }}
        spacing={{ xs: 2, lg: 0 }}
        p={{ xs: '0 1rem', sm: p, lg: '0 5rem' }}
      >
        <Grid
          size={{ xs: 12, lg: 6 }}
          pr={{ xs: 0, lg: '4rem' }}
          borderRight={{ xs: 'none', lg: '1px solid #E4E4E4' }}
        >
          <Box
            position={'relative'}
            borderRadius={'0.875rem'}
            overflow={'hidden'}
            height={{ xs: '140px', sm: '300px', lg: '100%' }}
            minHeight={{ xs: 'unset', lg: '600px' }}
            width={'100%'}
          >
            <Box
              position={'absolute'}
              width={'100%'}
              height={'100%'}
              zIndex={1}
              sx={{ backgroundColor: 'background.grey', opacity: 0.5 }}
            />
            <Typography
            component={'h2'}
              fontSize={{ xs: '1.5rem', sm: '2.5rem' }}
              fontWeight={600}
              color="extremes.light"
              position={'absolute'}
              top={{ xs: 'unset', lg: '30%' }}
              left={{ xs: '10%', md: '5%', lg: '10%' }}
              bottom={{ xs: '10%', lg: 'unset' }}
              zIndex={1}
              fontFamily={'var(--font-avantgarde), sans-serif'}
            >
              Frequently Asked <br /> Questions
            </Typography>
            <Box width={'100%'} height={'100%'} display={{ xs: 'none', lg: 'block' }}>
              <Image src={'/HomePage/faq.webp'} alt="faq" fill unoptimized />
            </Box>
            <Box width={'100%'} height={'100%'} display={{ xs: 'block', lg: 'none' }}>
              <Image
                src={'/HomePage/FAQMob.webp'}
                alt="faq"
                width={100}
                height={300}
                unoptimized
                className="w_100 h_100"
              />
            </Box>
          </Box>
        </Grid>
        <Grid size={{ xs: 12, lg: 6 }} pl={{ xs: 0, lg: '4rem' }}>
          {faqs.length === 0 ? (
            <Typography color="text.subText">No FAQs available.</Typography>
          ) : (
            faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{
                  opacity: 0,
                  y: 40,
                }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut', delay: (i + 1) * 0.2 }}
                viewport={{ once: true }}
                className="w_100 h_100"
                style={{ borderBottom: '1px solid #E4E4E4' }}
              >
                <Accordion
                  key={i}
                  elevation={0}
                  expanded={expandedIndex === i}
                  onChange={handleChange(i)}
                  sx={{
                    width: '100%',
                  }}
                >
                  <AccordionSummary
                    sx={{
                      padding: { xs: '1rem 0', lg: '2rem 0' },
                    }}
                    expandIcon={<ExpandIcon size={isTabScreen ? 24 : 32} />}
                  >
                    <Typography
                    component={'h3'}
                      fontWeight={500}
                      fontSize={{ xs: '0.875rem', sm: '1rem' }}
                      color="text"
                    >
                      {faq.question}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails sx={{ p: 0, pb: 4 }}>
                    <Typography
                      fontWeight={400}
                      fontSize={{ xs: '0.875rem', sm: '1rem' }}
                      color="text.subText"
                    >
                      {faq.answer}
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              </motion.div>
            ))
          )}
        </Grid>
      </Grid>
    </motion.div>
  );
};

export default FAQ;
