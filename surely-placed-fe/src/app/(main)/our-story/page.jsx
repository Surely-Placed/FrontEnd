import FAQ from '@/components/Homepage/FAQ';
import FirstStep from '@/components/Homepage/FirstStep';
import ChooseUs from '@/components/MeetCohorts/ChooseUs';
import FindUs from '@/components/OurStory/FindUs';
import MissionAndVision from '@/components/OurStory/MissionAndVision';
import StoryHeroBanner from '@/components/OurStory/StoryHeroBanner';
import Team from '@/components/OurStory/Team';
import React from 'react';
import { chooseUsDetails } from '../../../../mockData/OurStory';
import { buildPageMetadata } from '@/lib/seo';

export const metadata = buildPageMetadata({
  title: 'The Surely Placed Story | Career Transformation Platform',
  description:
    'Discover how Surely Placed is building a structured path from ambition to opportunity with mentorship, application support, and analytics for measurable career outcomes.',
  path: '/our-story',
});

const page = () => {
  return (
    <>
      <StoryHeroBanner />
      <MissionAndVision />
      <ChooseUs chooseUsDetails={chooseUsDetails} />
      <FindUs />
      {/* <Team /> */}
      <FAQ />
      <FirstStep />
    </>
  );
};

export default page;
