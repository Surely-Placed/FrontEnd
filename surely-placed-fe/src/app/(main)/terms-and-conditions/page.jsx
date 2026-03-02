import React from 'react';
import TermsAndCondition from '@/components/TermsAndCondition/TermsAndCondition';
import FirstStep from '@/components/Homepage/FirstStep';

const page = () => {
  return (
    <>
      <TermsAndCondition />
      <FirstStep />
    </>
  );
};

export const metaData = {
  title: 'Terms And Conditions',
};

export default page;
