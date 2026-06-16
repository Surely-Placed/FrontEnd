import React from 'react';
import RefundCancellationPolicy from '@/components/RefundCancellationPolicy/RefundCancellationPolicy';
import FirstStep from '@/components/Homepage/FirstStep';
import { buildPageMetadata } from '@/lib/seo';

export const metadata = buildPageMetadata({
  title: 'Refund and Cancellation Policy | Surely Placed',
  description:
    'Understand Surely Placed refund and cancellation terms, including eligibility, processing timelines, service access changes, and support contact details.',
  path: '/refund-cancellation-policy',
});

const page = () => {
  return (
    <>
      <RefundCancellationPolicy />
      <FirstStep />
    </>
  );
};

export default page;
