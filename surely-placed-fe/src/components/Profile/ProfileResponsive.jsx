'use client';
import { Accordion, AccordionDetails, AccordionSummary, Box, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { CohortIcon, ProfileIcon, SupportIcon } from '../../../public/images';
import Profile from './Profile';
import MyCohorts from './MyCohorts';
import Support from './Support';

const ProfileResponsive = ({ activeEle, setActiveEle }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [expandedIndex, setExpandedIndex] = useState(activeEle);

  const mobileAccordionData = [
    { icon: ProfileIcon, text: 'My Profile', details: Profile },
    { icon: CohortIcon, text: 'Cohorts', details: MyCohorts },
    { icon: SupportIcon, text: 'Support', details: Support },
  ];

  const handleAccordionChange = (index) => {
    if (expandedIndex !== index) {
      setExpandedIndex(index);
      setActiveEle(index);

      const params = new URLSearchParams(searchParams);
      params.set('tabValue', index);
      router.replace(`?${params.toString()}`, { scroll: false });
      window.scrollTo({ top: index * 75, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    setExpandedIndex(activeEle);
  }, [activeEle]);

  return (
    <Box>
      {mobileAccordionData.map((item, index) => {
        const IconComponent = item.icon;
        const DetailComponent = item.details;
        return (
          <Accordion
            key={index}
            elevation={0}
            expanded={expandedIndex === index}
            onChange={() => {
              handleAccordionChange(index);
            }}
            sx={{
              border: 'none',
              boxShadow: 'none',
              borderRadius: 0,
              '&:before': {
                display: 'none',
              },
              '&.Mui-expanded': {
                margin: 0,
              },
            }}
          >
            <AccordionSummary
              expandIcon={null}
              aria-controls="panel1-content"
              id="panel1-header"
              sx={{
                padding: '0.5rem 0 0',
                '& .MuiAccordionSummary-content.Mui-expanded': {
                  margin: 0,
                },
              }}
            >
              <Box display={'flex'} gap={2} alignItems={'center'}>
                <IconComponent fill={'#E9EEF9'} color={'#2857C4'} />
                <Typography variant="subtitle1" color="text">
                  {item.text}
                </Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails sx={{ padding: '0.5rem 0 1.5rem' }}>
              <DetailComponent />
            </AccordionDetails>
          </Accordion>
        );
      })}
    </Box>
  );
};

export default ProfileResponsive;
