export const WEBINAR_FAQS = [
  {
    q: 'Is this beginner friendly?',
    a: 'Yes. No prior interview prep or AI experience is needed. The webinar starts from how hiring works today and builds up from there.',
  },
  {
    q: 'Will I receive the playbook?',
    a: 'Yes. The Software Career Playbook is emailed to you immediately after registration, before the webinar even starts.',
  },
  {
    q: 'Is the webinar live?',
    a: 'Yes. Live and instructor-led on Sunday, July 20, 2026 at 8 PM ET, with a live Q&A at the end.',
  },
  {
    q: 'Will there be Q&A?',
    a: 'Absolutely. Bring your specific questions on resume, visa timing, or interview prep and get them answered live.',
  },
  {
    q: 'Will the recording be shared?',
    a: 'Yes, registered attendees receive the recording, so you can rewatch or catch up if you miss a section.',
  },
  {
    q: 'Is this useful for international students?',
    a: 'Yes. It is built with international candidates in mind: F-1, OPT, STEM OPT, H-1B, green card holders, and US citizens alike.',
  },
  {
    q: 'Do I need AI experience?',
    a: 'No. Module 3 introduces AI tools from zero and shows exactly which ones recruiters expect you to know.',
  },
];

export const WEBINAR_TESTIMONIALS = [
  {
    quote:
      '"I sent 300+ applications and heard nothing. After fixing my resume and application strategy the way they taught, I had 4 interviews in 3 weeks."',
    initials: 'PK',
    name: 'Priya K.',
    role: 'SDE · Amazon',
    tone: 'blue',
  },
  {
    quote:
      '"As an F-1 student I thought my visa status was the problem. It wasn\'t. My positioning was. The roadmap changed how I applied, and I signed my offer before OPT even started."',
    initials: 'RS',
    name: 'Rahul S.',
    role: 'Data Engineer · Microsoft',
    tone: 'teal',
  },
  {
    quote:
      '"The mock interviews were harder than my actual Google interview. That\'s the point. I walked in prepared for everything they asked."',
    initials: 'AM',
    name: 'Ananya M.',
    role: 'Software Engineer · Google',
    tone: 'blue',
  },
];

export const WEBINAR_MODULES = [
  {
    n: 'MODULE 1',
    title: "Understanding today's hiring market",
    items: ['Tech hiring trends', "AI's impact on hiring", 'Most in-demand skills', 'What the market expects'],
  },
  {
    n: 'MODULE 2',
    title: 'Cracking technical interviews',
    items: [
      'Resume & LinkedIn optimization',
      'GitHub best practices',
      'Coding assessments & DSA prep',
      'Technical, HR & system design rounds',
    ],
  },
  {
    n: 'MODULE 3',
    title: 'Becoming AI-ready',
    items: ['Generative AI & coding assistants', 'AI agents', 'Building AI projects', 'Future career opportunities'],
  },
  {
    n: 'MODULE 4',
    title: 'Your career roadmap',
    items: ['30 / 60 / 90-day plans', 'Curated resources', 'Job application strategy'],
  },
];

export const WEBINAR_AUDIENCE_PILLS = [
  "Final-year & master's students",
  'Fresh graduates',
  'Engineers, 0–5 years',
  'Career switchers & bootcamp grads',
  'F-1 · OPT · STEM OPT · H-1B',
  'US citizens & green card holders',
];

export const WEBINAR_COUNTRY_OPTIONS = ['United States', 'India', 'Canada', 'United Kingdom', 'Other'];
export const WEBINAR_STATUS_OPTIONS = [
  'Student',
  'Recent graduate',
  'Working professional',
  'Between jobs',
  'Career switcher',
];
export const WEBINAR_VISA_OPTIONS = ['F-1', 'OPT', 'STEM OPT', 'H-1B', 'Green Card', 'US Citizen', 'Other / N/A'];
export const WEBINAR_EXP_OPTIONS = ['0 (student / fresher)', '1–2 years', '3–5 years', '5+ years'];

export const WEBINAR_PLAN_SLUG = 'webinar-live';
export const WEBINAR_DATETIME_LABEL = 'Sunday, July 20, 2026 · 8 PM ET';

export const WEBINAR_DEFAULTS = {
  price: 19.99,
  seatsLeft: 5,
  seatsTotal: 25,
  webinarDate: '2026-07-20T20:00:00-04:00',
  videoEmbedUrl: 'https://www.youtube.com/embed/m4BUjOgkTPA?start=1178&rel=0',
};

export const EMPTY_WEBINAR_FORM = {
  first: '',
  last: '',
  email: '',
  phone: '',
  country: '',
  status: '',
  visa: '',
  exp: '',
};
