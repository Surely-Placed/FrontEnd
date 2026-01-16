import CoachForm from '@/components/CoachForm/CoachForm';
import HeroContainer from '@/components/CoachForm/HeroContainer';
import FirstStep from '@/components/Homepage/FirstStep';
import { desc, heading } from '../../../../mockData/BecomeMember';

const page = () => {
  return (
    <>
      <HeroContainer />
      <CoachForm />
      <FirstStep
        heading={heading}
        subHeading={desc}
        primaryBtn="Apply Now"
        primaryPath="coach-form"
      />
    </>
  );
};

export default page;
