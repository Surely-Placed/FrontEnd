import HeroBanner from '@/components/Homepage/HeroBanner';
import Brands from '@/components/Homepage/Brands';
import ExploreServices from '@/components/Homepage/ExploreServices';
import GetStarted from '@/components/Homepage/GetStarted';
import Stories from '@/components/Homepage/Stories';
import FAQ from '@/components/Homepage/FAQ';

import { Box } from '@mui/material';
import FirstStep from '@/components/Homepage/FirstStep';
import { buildPageMetadata } from '@/lib/seo';

export const metadata = buildPageMetadata({
  title: 'Career Coaching with Interview Analytics | Surely Placed',
  description:
    'Move from rejections to offers with data-backed career coaching, mentor-led cohorts, application support, and interview analytics. Book a strategy call with Surely Placed today.',
  path: '/',
});

export default function Home() {
  return (
    <Box>
      <HeroBanner />
      <Brands />
      <ExploreServices />
      <GetStarted />
      {/* <TopCohorts /> */}
      <Stories />
      <FAQ />
      <FirstStep />
    </Box>
  );
}
