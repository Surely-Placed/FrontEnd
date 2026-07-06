export const SITE_URL = 'https://www.surelyplaced.com';
export const SITE_NAME = 'Surely Placed';
export const DEFAULT_OG_IMAGE = `${SITE_URL}/HomePage/HeroBanner.webp`;
export const SUPPORT_EMAIL = 'support@surelyplaced.com';
export const SITE_PHONES = [
  {
    display: '+1 (917) 755-0774',
    tel: '+19177550774',
  },
  {
    display: '+91-9777771281',
    tel: '+919777771281',
  },
];

export const SOCIAL_LINKS = {
  linkedin: 'https://www.linkedin.com/company/surely-placed/',
  instagram: 'https://www.instagram.com/surely.placed?igsh=MTVnMmI4MG83ZGk3Zg==',
};

export const ORGANIZATION_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/favicon.svg`,
  email: SUPPORT_EMAIL,
  telephone: SITE_PHONES.map((phone) => phone.tel),
  description:
    'Surely Placed is a career transformation platform combining mentorship, applications support, and interview analytics to help learners land better offers globally.',
  sameAs: [SOCIAL_LINKS.linkedin, SOCIAL_LINKS.instagram],
  address: [
    {
      '@type': 'PostalAddress',
      addressLocality: 'Gandhinagar',
      addressRegion: 'Gujarat',
      addressCountry: 'IN',
    },
    {
      '@type': 'PostalAddress',
      addressLocality: 'Salt Lake City',
      addressRegion: 'Utah',
      addressCountry: 'US',
    },
    {
      '@type': 'PostalAddress',
      addressLocality: 'Dubai',
      addressCountry: 'AE',
    },
  ],
};

export const WEBSITE_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: SITE_NAME,
  url: SITE_URL,
  publisher: {
    '@type': 'Organization',
    name: SITE_NAME,
    logo: `${SITE_URL}/favicon.svg`,
  },
};
