import Profile from '@/components/Profile/Profile';
import {
  CallIcon,
  CohortIcon,
  LocationIcon,
  MailIcon,
  ProfileIcon,
  SupportIcon,
} from '../../public/images';
import MyCohorts from '@/components/Profile/MyCohorts';
import Support from '@/components/Profile/Support';

export const sideBarLinks = [
  { icon: ProfileIcon, text: 'My Profile' },
  { icon: CohortIcon, text: 'Cohorts' },
  { icon: SupportIcon, text: 'Support' },
];

export const myCohorts = [
  {
    img: '/Profile/MyCohortImg.webp',
    designation: 'Machine Learning',
    price: '$ 300',
    mentor: 'Bill Cooper',
    starting_from: '20/10/2025 | Monday',
  },
  {
    img: '/Profile/MyCohortImg.webp',
    designation: 'Data Management',
    price: '$ 300',
    mentor: 'Bill Cooper',
    starting_from: '20/10/2025 | Monday',
  },
  {
    img: '/Profile/MyCohortImg.webp',
    designation: 'Machine Learning',
    price: '$ 300',
    mentor: 'Bill Cooper',
    starting_from: '20/10/2025 | Monday',
  },
  {
    img: '/Profile/MyCohortImg.webp',
    designation: 'Data Management',
    price: '$ 300',
    mentor: 'Bill Cooper',
    starting_from: '20/10/2025 | Monday',
  },
];

export const contactInfo = [
  {
    icon: <MailIcon fill="#E6F7F5" color="#38BDB1" width={32} height={32} />,
    text: "contact@company.com",
  },
  {
    icon: <CallIcon fill="#E6F7F5" color="#38BDB1" width={32} height={32} />,
    text: "+1 234 567 890",
  },
  {
    icon: <SupportIcon fill="#E6F7F5" color="#38BDB1" width={32} height={32} />,
    text: "Support",
  },
];
