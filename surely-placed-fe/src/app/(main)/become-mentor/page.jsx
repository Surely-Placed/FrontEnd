import React from 'react';
import HowItWorks from '@/components/BecomeCoach/HowItWorks';
import MemberHeroSection from '@/components/BecomeCoach/MemberHeroSection';
import WhatWeLookFor from '@/components/BecomeCoach/WhatWeLookFor';
import MeetOurCoaches from '@/components/BecomeCoach/MeetOurCoaches';
import FAQ from '@/components/Homepage/FAQ';
import FirstStep from '@/components/Homepage/FirstStep';
import { desc, heading } from '../../../../mockData/BecomeMember';

export const metadata = {
  title: 'Become a Mentor | Coach Global Talent | Surely Placed',
  description:
    'Explore career coaching opportunities with Surely Placed. Become a mentor and share expertise, guide learners, and grow your impact.',
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://surelyplaced.com/become-mentor',
  },
  openGraph: {
    url: 'https://surelyplaced.com/become-mentor',
    title: 'Become a Mentor | Coach Global Talent | Surely Placed',
    description:
      'Explore career coaching opportunities with Surely Placed. Become a mentor and share expertise, guide learners, and grow your impact.',
    type: 'website',
    siteName: 'Surely Placed',
    locale: 'en_US',
  },
  twitter: {
    title: 'Become a Mentor | Coach Global Talent | Surely Placed',
    description:
      'Explore career coaching opportunities with Surely Placed. Become a mentor and share expertise, guide learners, and grow your impact.',
    card: 'summary',
  },
};

const page = () => {
  return (
    <>
      <MemberHeroSection />
      <WhatWeLookFor />
      <HowItWorks />
      {/* <MeetOurCoaches /> */}
      <FAQ category="Mentors" />
      <FirstStep
        heading={heading}
        subHeading={desc}
        primaryBtn="Apply Now"
        primaryPath="coach-form"
      />
    </>
  );
};

export default page;
