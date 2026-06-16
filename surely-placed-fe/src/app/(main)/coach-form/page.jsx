import CoachForm from '@/components/CoachForm/CoachForm';
import HeroContainer from '@/components/CoachForm/HeroContainer';
import FirstStep from '@/components/Homepage/FirstStep';
import { desc, heading } from '../../../../mockData/BecomeMember';
import { buildPageMetadata } from '@/lib/seo';

export const metadata = buildPageMetadata({
  title: 'Mentor Application Form | Join Our Coaches | Surely Placed',
  description:
    'Complete the Surely Placed mentor application to join our coaching network and support learners with structured mentorship, interview prep, and career guidance.',
  path: '/coach-form',
});

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
