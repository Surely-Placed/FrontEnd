import React from 'react';
import Privacy from '@/components/PrivacyPolicy/Privacy';
import FirstStep from '@/components/Homepage/FirstStep';
import { buildPageMetadata } from '@/lib/seo';

export const metadata = buildPageMetadata({
  title: 'Privacy Policy | Surely Placed',
  description:
    'Read how Surely Placed collects, uses, and protects your personal data across mentorship, application support, interview analytics, and platform services.',
  path: '/privacy-policy',
});

const page = () => {
  return (
    <>
      <Privacy />
      <FirstStep />
    </>
  );
};

export default page;
