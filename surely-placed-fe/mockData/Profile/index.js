import {
  CallIcon,
  CohortIcon,
  LocationIcon,
  MailIcon,
  ProfileIcon,
  SupportIcon,
} from '../../public/images';

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
    text: 'support@surelyplaced.com',
    href: 'mailto:support@surelyplaced.com',
  },
  {
    icon: <CallIcon fill="#E6F7F5" color="#38BDB1" width={32} height={32} />,
    text: '+1 (917) 755-0774',
    href: 'tel:+19177550774',
  },
  {
    icon: <CallIcon fill="#E6F7F5" color="#38BDB1" width={32} height={32} />,
    text: '+91-9777771281',
    href: 'tel:+919777771281',
  },
  {
    icon: <SupportIcon fill="#E6F7F5" color="#38BDB1" width={32} height={32} />,
    text: 'Support',
  },
];
