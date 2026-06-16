import FAQ from '@/components/Homepage/FAQ';
import FirstStep from '@/components/Homepage/FirstStep';
import Stories from '@/components/Homepage/Stories';
import ChooseUs from '@/components/MeetCohorts/ChooseUs';
import CohortsSection from '@/components/MeetCohorts/CohortsSection';
import HeroSection from '@/components/MeetCohorts/HeroSection';
import { Box } from '@mui/material';
import React from 'react';
import { chooseUsDetails } from '../../../../mockData/MeetCohorts';
import { buildPageMetadata } from '@/lib/seo';
import JsonLd from '@/components/seo/JsonLd';
import { SITE_NAME, SITE_URL } from '@/config/site';

export const metadata = buildPageMetadata({
  title: 'Mentor-Led Career Cohorts Using DROPS | Surely Placed',
  description:
    'Join mentor-led career cohorts built on the DROPS framework. Build job-ready skills, improve interview performance, and accelerate your path to global offers.',
  path: '/meet-cohorts',
});

const cohortServiceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Mentor-Led Career Cohorts',
  provider: {
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
  },
  serviceType: 'Career Coaching Cohort',
  areaServed: 'Worldwide',
  description:
    'Structured mentor-led cohorts for career advancement, interview preparation, and application support.',
};

const page = () => {
  return (
    <Box>
      <JsonLd data={cohortServiceSchema} />
      <HeroSection />
      {/* <CohortsSection /> */}
      <ChooseUs chooseUsDetails={chooseUsDetails} />
      <Stories />
      <FAQ category="Cohorts" />
      <FirstStep />
    </Box>
  );
};

export default page;
