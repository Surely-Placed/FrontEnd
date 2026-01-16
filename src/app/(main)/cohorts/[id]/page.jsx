import CohortDetail from '@/components/CohortDetail/CohortDetail';
import MeetCoaches from '@/components/CohortDetail/MeetCoaches';
import FAQ from '@/components/Homepage/FAQ';
import FirstStep from '@/components/Homepage/FirstStep';
import React from 'react';

const page = () => {
  return (
    <>
      <CohortDetail />
      <MeetCoaches />
      <FAQ p={'5rem'}/>
      <FirstStep />
    </>
  );
};

export default page;
