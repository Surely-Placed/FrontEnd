import React from 'react';
import RefundCancellationPolicy from '@/components/RefundCancellationPolicy/RefundCancellationPolicy';
import FirstStep from '@/components/Homepage/FirstStep';

const page = () => {
  return (
    <>
      <RefundCancellationPolicy />
      <FirstStep />
    </>
  );
};

export const metadata = {
  title: 'Refund & Cancellation Policy',
}

export default page;
