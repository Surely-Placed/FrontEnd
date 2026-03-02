import FAQ from '@/components/Homepage/FAQ';
import FirstStep from '@/components/Homepage/FirstStep';
import Stories from '@/components/Homepage/Stories';
import ChooseUs from '@/components/MeetCohorts/ChooseUs';
import CohortsSection from '@/components/MeetCohorts/CohortsSection';
import HeroSection from '@/components/MeetCohorts/HeroSection';
import { Box } from '@mui/material';
import React from 'react';
import { chooseUsDetails } from '../../../../mockData/MeetCohorts';

export const metadata = {
  title: 'Mentor-Led Career Cohorts Using DROPS | Surely Placed',
  description:
    'Learn with mentors in analytics-driven cohorts designed for career advancement. Build skills, gain clarity, and land global roles.',
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://surelyplaced.com/meet-cohorts',
  },
  openGraph: {
    url: 'https://surelyplaced.com/meet-cohorts',
    title: 'Mentor-Led Career Cohorts Using DROPS | Surely Placed',
    description:
      'Learn with mentors in analytics-driven cohorts designed for career advancement. Build skills, gain clarity, and land global roles.',
    type: 'website',
    siteName: 'Surely Placed',
    locale: 'en_US',
  },
  twitter: {
    title: 'Mentor-Led Career Cohorts Using DROPS | Surely Placed',
    description:
      'Learn with mentors in analytics-driven cohorts designed for career advancement. Build skills, gain clarity, and land global roles.',
    card: 'summary',
  },
};

const page = () => {
  return (
    <Box>
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
