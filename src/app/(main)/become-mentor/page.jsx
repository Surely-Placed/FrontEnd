import React from 'react';
import HowItWorks from '@/components/BecomeCoach/HowItWorks';
import MemberHeroSection from '@/components/BecomeCoach/MemberHeroSection';
import WhatWeLookFor from '@/components/BecomeCoach/WhatWeLookFor';
import MeetOurCoaches from '@/components/BecomeCoach/MeetOurCoaches';
import FAQ from '@/components/Homepage/FAQ';
import FirstStep from '@/components/Homepage/FirstStep';
import { desc, heading } from '../../../../mockData/BecomeMember';

const page = () => {
  return (
    <>
      <MemberHeroSection />
      <WhatWeLookFor />
      <HowItWorks />
      {/* <MeetOurCoaches /> */}
      <FAQ category='Mentors'/>
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
