import HeroBanner from '@/components/Homepage/HeroBanner';
import Brands from '@/components/Homepage/Brands';
import ExploreServices from '@/components/Homepage/ExploreServices';
import GetStarted from '@/components/Homepage/GetStarted';
import TopCohorts from '@/components/Homepage/TopCohorts';
import Stories from '@/components/Homepage/Stories';
import FAQ from '@/components/Homepage/FAQ';

import { Box } from '@mui/material';
import FirstStep from '@/components/Homepage/FirstStep';

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
