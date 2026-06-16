import React from 'react';
import HowItWorks from '@/components/BecomeCoach/HowItWorks';
import MemberHeroSection from '@/components/BecomeCoach/MemberHeroSection';
import WhatWeLookFor from '@/components/BecomeCoach/WhatWeLookFor';
import MeetOurCoaches from '@/components/BecomeCoach/MeetOurCoaches';
import FAQ from '@/components/Homepage/FAQ';
import FirstStep from '@/components/Homepage/FirstStep';
import { desc, heading } from '../../../../mockData/BecomeMember';
import { buildPageMetadata } from '@/lib/seo';

export const metadata = buildPageMetadata({
  title: 'Become a Mentor | Coach Global Talent | Surely Placed',
  description:
    'Apply to mentor with Surely Placed. Share your expertise, guide learners through structured cohorts, and help professionals land stronger offers globally.',
  path: '/become-mentor',
});

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
