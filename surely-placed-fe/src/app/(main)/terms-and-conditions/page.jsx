import React from 'react';
import TermsAndCondition from '@/components/TermsAndCondition/TermsAndCondition';
import FirstStep from '@/components/Homepage/FirstStep';
import { buildPageMetadata } from '@/lib/seo';

export const metadata = buildPageMetadata({
  title: 'Terms and Conditions | Surely Placed',
  description:
    'Review Surely Placed terms and conditions covering services, user responsibilities, payments, intellectual property, liability, and platform usage policies.',
  path: '/terms-and-conditions',
});

const page = () => {
  return (
    <>
      <TermsAndCondition />
      <FirstStep />
    </>
  );
};

export default page;
