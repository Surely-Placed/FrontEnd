import React from 'react';
import Privacy from '@/components/PrivacyPolicy/Privacy';
import FirstStep from '@/components/Homepage/FirstStep';

const page = () => {
  return (
    <>
      <Privacy />
      <FirstStep />
    </>
  );
};

export const metadata = {
  title:'Privacy policy'
}

export default page;
