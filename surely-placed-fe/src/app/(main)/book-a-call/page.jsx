import React from 'react';
import BookSection from '@/components/BookACall/BookSection';
import FirstStep from '@/components/Homepage/FirstStep';
import { buildPageMetadata } from '@/lib/seo';

export const metadata = buildPageMetadata({
  title: 'Book a Career Guidance Call | Surely Placed',
  description:
    'Speak with the Surely Placed team for personalized career guidance, cohort recommendations, and a clear roadmap from preparation to offers.',
  path: '/book-a-call',
});

const page = () => {
  return (
    <>
      <BookSection />
      <FirstStep />
    </>
  );
};

export default page;
