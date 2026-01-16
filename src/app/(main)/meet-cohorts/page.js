import FAQ from '@/components/Homepage/FAQ';
import FirstStep from '@/components/Homepage/FirstStep';
import Stories from '@/components/Homepage/Stories';
import ChooseUs from '@/components/MeetCohorts/ChooseUs';
import CohortsSection from '@/components/MeetCohorts/CohortsSection';
import HeroSection from '@/components/MeetCohorts/HeroSection';
import { Box } from '@mui/material';
import React from 'react';
import { chooseUsDetails } from '../../../../mockData/MeetCohorts';

const page = () => {
  return (
    <Box>
      <HeroSection />
      {/* <CohortsSection /> */}
      <ChooseUs chooseUsDetails={chooseUsDetails} />
      <Stories />
      <FAQ category='Cohorts'/>
      <FirstStep />
    </Box>
  );
};

export default page;
