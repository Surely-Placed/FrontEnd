import React from 'react';
import BookSection from '@/components/BookACall/BookSection';
import FirstStep from '@/components/Homepage/FirstStep';

export const metadata = {
  title: 'Book a Career Guidance Call | Talk to Our Team | Surely Placed',
  description:
    'Unsure about your next move? Speak with the Surely Placed team for personalized career guidance and the right path forward.',
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://surelyplaced.com/book-a-call',
  },
  openGraph: {
    url: 'https://surelyplaced.com/book-a-call',
    title: 'Book a Career Guidance Call | Talk to Our Team | Surely Placed',
    description:
      'Unsure about your next move? Speak with the Surely Placed team for personalized career guidance and the right path forward.',
    type: 'website',
    siteName: 'Surely Placed',
    locale: 'en_US',
  },
  twitter: {
    title: 'Book a Career Guidance Call | Talk to Our Team | Surely Placed',
    description:
      'Unsure about your next move? Speak with the Surely Placed team for personalized career guidance and the right path forward.',
    card: 'summary',
  },
};

const page = () => {
  return (
    <>
      <BookSection />
      <FirstStep />
    </>
  );
};

export default page;
