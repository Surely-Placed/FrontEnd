import { LightningIcon, MentorsIcon, ProgressGraphIcon, TeamIcon } from '../../public/images';

export const avatarsImgs = [
  '/OurStory/Avatar1.webp',
  '/OurStory/Avatar2.webp',
  '/OurStory/Avatar3.webp',
  '/OurStory/Avatar4.webp',
];

export const teamMemberDetails = [
  {
    img: '/OurStory/Member1.webp',
    name: 'David Elson',
    designation: 'Maecenas dignissim',
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet justo ipsum. Sed accumsan quam vitae est varius fringilla. Pellentesque placerat vestibulum lorem sed porta. Nullam mattis tristique iaculis. Nullam pulvinar sit ',
  },
  {
    img: '/OurStory/Member2.webp',
    name: 'Kathy Pacheco',
    designation: 'Maecenas dignissim',
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet justo ipsum. Sed accumsan quam vitae est varius fringilla. Pellentesque placerat vestibulum lorem sed porta. Nullam mattis tristique iaculis. Nullam pulvinar sit ',
  },
  {
    img: '/OurStory/Member3.webp',
    name: 'Judith Rodriguez',
    designation: 'Maecenas dignissim',
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet justo ipsum. Sed accumsan quam vitae est varius fringilla. Pellentesque placerat vestibulum lorem sed porta. Nullam mattis tristique iaculis. Nullam pulvinar sit ',
  },
];

export const chooseUsDetails = {
  overline: 'What Makes Us Different',
  heading: 'The Surely Placed Edge',
  desc: 'We combine human mentorship and smart analytics to make every step from resume to offer deliberate, efficient, and effective.',
  pointers: [
    {
      heading: 'Elite Mentors',
      desc: 'Mentors from FAANG, Fortune 500 firms, and top global startups bring years of experience.',
      icon: <MentorsIcon />,
    },
    {
      heading: 'Done-for-You Applications',
      desc: 'Our team applies, tracks, and maintains your interview funnel so you can focus on one thing: performing better every time.',
      icon: <LightningIcon />,
    },
    {
      heading: 'Interview Analytics',
      desc: 'Every interview (with consent) is recorded, analyzed, and improved upon. We fix what failed and double down on what works.',
      icon: <ProgressGraphIcon />,
    },
    {
      heading: 'Buddy Accountability',
      desc: 'Each learner joins a small group led by a mentor and buddy, because consistency, not talent, decides who gets placed.',
      icon: <TeamIcon />,
    },
    {
      heading: 'Lifecycle Guidance',
      desc: 'Our support continues beyond placement. We help you navigate your first 90 days, ensuring your transition is confident and complete.',
      icon: <TeamIcon />,
    },
    {
      heading: 'Global Orientation',
      desc: 'We prepare you for roles in the US, UK, Canada, and beyond, building global readiness that lasts beyond one placement.',
      icon: <TeamIcon />,
    },
  ],
};
