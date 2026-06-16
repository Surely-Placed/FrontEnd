export const fallbackFaqsByCategory = {
  Default: [
    {
      question: 'What is Surely Placed?',
      answer:
        'Surely Placed is a career transformation platform that combines mentor-led coaching, application support, and interview analytics to help learners move from rejections to offers with a structured, measurable system.',
    },
    {
      question: 'Who is Surely Placed built for?',
      answer:
        'We work with fresh graduates, career switchers, professionals returning after a break, and working professionals targeting growth roles at top global companies.',
    },
    {
      question: 'Do you guarantee job placement?',
      answer:
        'No. Surely Placed provides guidance, mentorship, and execution support, but outcomes depend on your effort, market conditions, and participation. We focus on improving interview readiness and application quality.',
    },
    {
      question: 'How does the application support work?',
      answer:
        'Our team helps build and manage your application pipeline while you focus on preparation. We track shortlists, interviews, and funnel performance so momentum stays consistent.',
    },
    {
      question: 'What makes Surely Placed different from generic coaching?',
      answer:
        'We combine mentorship, a done-with-you applications engine, and analytics-backed feedback loops. Learners get structured cohorts, accountability, and measurable progress instead of one-off advice.',
    },
    {
      question: 'How do I get started?',
      answer:
        'Book a call with our team to assess your goals and current stage. We will recommend the right cohort, mentorship path, and execution plan based on your target role and timeline.',
    },
    {
      question: 'Do you support global job searches?',
      answer:
        'Yes. Surely Placed supports learners targeting opportunities across India, the US, UAE, and other global markets with role-specific preparation and positioning.',
    },
  ],
  Cohorts: [
    {
      question: 'What are Surely Placed cohorts?',
      answer:
        'Cohorts are mentor-led learning groups aligned to career goals and skill level. Each cohort follows structured milestones for skill building, portfolio development, and interview readiness.',
    },
    {
      question: 'How are cohorts structured?',
      answer:
        'Cohorts are organized using the DROPS framework (Desert, River, Pond, Ocean, Super), which helps match learners to the right intensity and support level based on current readiness.',
    },
    {
      question: 'What support do I get inside a cohort?',
      answer:
        'You receive mentor sessions, peer accountability, resume and portfolio guidance, mock interviews, and application funnel support designed to improve interview volume and quality.',
    },
    {
      question: 'Can I join if I am switching careers?',
      answer:
        'Yes. Many cohort learners are career switchers. Mentors help you reposition your profile, build relevant proof of work, and prepare for role-specific interviews.',
    },
    {
      question: 'How long does a cohort typically run?',
      answer:
        'Cohort duration varies by track and goals. During your discovery call, we share the recommended timeline, milestones, and expected weekly commitment.',
    },
    {
      question: 'Will I get interview opportunities during the cohort?',
      answer:
        'We focus on building a consistent interview pipeline through profile optimization and application execution. Interview volume depends on role, market, and your participation quality.',
    },
  ],
  Mentors: [
    {
      question: 'Who can become a Surely Placed mentor?',
      answer:
        'We look for experienced operators and practitioners with strong communication, structured coaching ability, and a track record of helping professionals grow in their careers.',
    },
    {
      question: 'What does mentorship at Surely Placed involve?',
      answer:
        'Mentors guide learners through skill development, interview preparation, and execution accountability. You provide practical feedback, mock interviews, and role-specific direction.',
    },
    {
      question: 'Is this a full-time role?',
      answer:
        'Mentor engagements are typically flexible and cohort-based. Availability, domain expertise, and learner fit determine assignment volume.',
    },
    {
      question: 'How are mentors matched with learners?',
      answer:
        'We match based on domain, target role, experience level, and coaching style so learners receive relevant and actionable guidance.',
    },
    {
      question: 'What qualities do you look for in mentors?',
      answer:
        'We value clarity, empathy, high standards, and the ability to translate experience into repeatable frameworks learners can execute.',
    },
    {
      question: 'How do I apply to become a mentor?',
      answer:
        'Visit the Become a Mentor page and complete the application form. Our team reviews your background and schedules a conversation if there is a strong fit.',
    },
  ],
};

export const getFallbackFaqs = (category = 'Default') =>
  fallbackFaqsByCategory[category] || fallbackFaqsByCategory.Default;
