import HeroBanner from '@/components/Homepage/HeroBanner';
import Brands from '@/components/Homepage/Brands';
import ExploreServices from '@/components/Homepage/ExploreServices';
import GetStarted from '@/components/Homepage/GetStarted';
import Stories from '@/components/Homepage/Stories';
import FAQ from '@/components/Homepage/FAQ';

import { Box } from '@mui/material';
import FirstStep from '@/components/Homepage/FirstStep';

export const metadata = {
  title: 'Career Coaching with Interview Analytics | Surely Placed',
  description:
    'Move from rejections to offers with data-backed career coaching, interview analytics, and expert guidance. Book a call with Surely Placed.',
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://surelyplaced.com/',
  },
  openGraph: {
    url: 'https://surelyplaced.com/',
    title: 'Career Coaching with Interview Analytics | Surely Placed',
    description:
      'Move from rejections to offers with data-backed career coaching, interview analytics, and expert guidance. Book a call with Surely Placed.',
    type: 'website',
    siteName: 'Surely Placed',
    locale: 'en_US',
  },
  twitter: {
    title: 'Career Coaching with Interview Analytics | Surely Placed',
    description:
      'Move from rejections to offers with data-backed career coaching, interview analytics, and expert guidance. Book a call with Surely Placed.',
    card: 'summary',
  },
};

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
