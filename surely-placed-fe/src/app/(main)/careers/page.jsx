import React from 'react';
import CareersPage from '@/components/Careers/CareersPage';
import { buildPageMetadata } from '@/lib/seo';

export const metadata = buildPageMetadata({
  title: 'Careers at Surely Placed | Open Roles & Hiring',
  description:
    'Explore open roles at Surely Placed across strategy, content, growth, design, and operations. Join a high-agency team building category-defining career outcomes.',
  path: '/careers',
});

const page = () => {
  return <CareersPage />;
};

export default page;
