import FAQ from '@/components/Homepage/FAQ';
import FirstStep from '@/components/Homepage/FirstStep';
import ChooseUs from '@/components/MeetCohorts/ChooseUs';
import FindUs from '@/components/OurStory/FindUs';
import MissionAndVision from '@/components/OurStory/MissionAndVision';
import StoryHeroBanner from '@/components/OurStory/StoryHeroBanner';
import Team from '@/components/OurStory/Team';
import React from 'react';
import { chooseUsDetails } from '../../../../mockData/OurStory';

export const metadata = {
  title: 'The Surely Placed Story | Career Transformation Platform',
  description:
    'Discover the story behind Surely Placed and our mission to make career success structured, global, and predictable. Learn more.',
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://surelyplaced.com/our-story',
  },
  openGraph: {
    url: 'https://surelyplaced.com/our-story',
    title: 'The Surely Placed Story | Career Transformation Platform',
    description:
      'Discover the story behind Surely Placed and our mission to make career success structured, global, and predictable. Learn more.',
    type: 'website',
    siteName: 'Surely Placed',
    locale: 'en_US',
  },
  twitter: {
    title: 'The Surely Placed Story | Career Transformation Platform',
    description:
      'Discover the story behind Surely Placed and our mission to make career success structured, global, and predictable. Learn more.',
    card: 'summary',
  },
};

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
