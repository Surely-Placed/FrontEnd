import CoachForm from '@/components/CoachForm/CoachForm';
import HeroContainer from '@/components/CoachForm/HeroContainer';
import FirstStep from '@/components/Homepage/FirstStep';
import { desc, heading } from '../../../../mockData/BecomeMember';

export const metadata = {
  title: 'Mentor Application Form | Join Our Coaches | Surely Placed',
  description:
    'Join our career mentorship network. Complete the mentor application and start guiding learners worldwide with flexibility and support.',
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://surelyplaced.com/coach-form',
  },
  openGraph: {
    url: 'https://surelyplaced.com/coach-form',
    title: 'Mentor Application Form | Join Our Coaches | Surely Placed',
    description:
      'Join our career mentorship network. Complete the mentor application and start guiding learners worldwide with flexibility and support.',
    type: 'website',
    siteName: 'Surely Placed',
    locale: 'en_US',
  },
  twitter: {
    title: 'Mentor Application Form | Join Our Coaches | Surely Placed',
    description:
      'Join our career mentorship network. Complete the mentor application and start guiding learners worldwide with flexibility and support.',
    card: 'summary',
  },
};

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
