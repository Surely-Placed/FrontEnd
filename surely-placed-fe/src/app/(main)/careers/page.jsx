import React from 'react';
import CareersPage from '@/components/Careers/CareersPage';

export const metadata = {
  title: 'Careers at Surely Placed | Join Our Team',
  description:
    'Explore open roles at Surely Placed and apply to join a high-agency team building category-defining outcomes across strategy, content, growth, and operations.',
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://surelyplaced.com/careers',
  },
  openGraph: {
    url: 'https://surelyplaced.com/careers',
    title: 'Careers at Surely Placed | Join Our Team',
    description:
      'Explore open roles at Surely Placed and apply to join a high-agency team building category-defining outcomes across strategy, content, growth, and operations.',
    type: 'website',
    siteName: 'Surely Placed',
    locale: 'en_US',
  },
  twitter: {
    title: 'Careers at Surely Placed | Join Our Team',
    description:
      'Explore open roles at Surely Placed and apply to join a high-agency team building category-defining outcomes across strategy, content, growth, and operations.',
    card: 'summary',
  },
};

const page = () => {
  return <CareersPage />;
};

export default page;
