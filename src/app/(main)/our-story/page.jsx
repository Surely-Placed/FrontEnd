import FAQ from '@/components/Homepage/FAQ';
import FirstStep from '@/components/Homepage/FirstStep';
import ChooseUs from '@/components/MeetCohorts/ChooseUs';
import FindUs from '@/components/OurStory/FindUs';
import MissionAndVision from '@/components/OurStory/MissionAndVision';
import StoryHeroBanner from '@/components/OurStory/StoryHeroBanner';
import Team from '@/components/OurStory/Team';
import React from 'react';
import { chooseUsDetails } from '../../../../mockData/OurStory';

const page = () => {
  return (
    <>
      <StoryHeroBanner />
      <MissionAndVision />
      <ChooseUs chooseUsDetails={chooseUsDetails}/>
      <FindUs />
      {/* <Team /> */}
      <FAQ />
      <FirstStep />
    </>
  );
};

export default page;
