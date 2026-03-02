'use client';
import React from 'react';
import { Box, Typography } from '@mui/material';
import TitleContent from '@/common/TitleContent';
import SubtitleContent from '@/common/SubtitleContent';
import BulletContent from '@/common/BulletContent';

const PrivacyPolicy = () => {
  return (
    <Box
      sx={{
        maxWidth: 1200,
        mx: 'auto',
        px: { xs: 2, sm: 1 },
        py: { xs: 2, sm: '6rem' },
        mt: { xs: 10, sm: 10, md: 10 },
      }}
    >
      {/* Main Heading */}
      <Typography
        variant="h4"
        fontWeight={500}
        fontFamily={'var(--font-avantgarde), sans-serif'}
        lineHeight={'normal'}
        sx={{
          mb: '0.75rem',
          fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' },
        }}
      >
        Privacy Policy
      </Typography>

      <Typography
        variant="subtitle1"
        fontFamily={'var(--font-avantgarde), sans-serif'}
        lineHeight={'normal'}
        sx={{
          mb: { xs: 3, sm: '2.81rem' },
        }}
      >
        Last updated: February 19, 2026
      </Typography>

      <TitleContent content={'1. Introduction'} />
      <SubtitleContent
        content={
          <>
            Welcome to <strong>Surely Placed</strong> ("Surely Placed," "we," "our," or "us").
            <br /> We are committed to protecting your privacy and handling your personal
            information in a transparent, secure, and responsible manner.
          </>
        }
      />
      <SubtitleContent
        content={
          'This Privacy Policy explains how we collect, use, store, disclose, and protect your information when you access or use our website, services, cohorts, mentoring programs, application support, interview analytics, or community platforms (collectively, the “Services”).'
        }
      />
      <SubtitleContent
        content={
          'By using Surely Placed, you agree to the practices described in this Privacy Policy.'
        }
      />

      <TitleContent content={'2. Scope of This Policy'} />
      <SubtitleContent content={'This Privacy Policy applies to:'} />

      <BulletContent content={'The Surely Placed website and landing pages'} />
      <BulletContent content={'User accounts, login and onboarding flows'} />
      <BulletContent content={'Cohort programs and mentorship sessions'} />
      <BulletContent content={'Application support and interview analytics services'} />
      <BulletContent
        content={'Community groups (including WhatsApp, Slack, or similar platforms)'}
      />
      <BulletContent content={'Calls, forms, and communications with the Surely Placed team'} />

      <SubtitleContent
        content={
          <>
            It does <strong>not</strong> apply to third-party websites or platforms linked from our
            website.
          </>
        }
      />
      
      <TitleContent content={'3. Information We Collect'} />
      <SubtitleContent content={'We may collect personal information when you:'} />
      <BulletContent
        content={'Fill out forms (sign-up, book a call, mentor application, contact forms)'}
      />
      <BulletContent content={'Join a cohort or service'} />
      <BulletContent content={'Communicate with our team'} />
      <BulletContent content={'Participate in mentorship sessions or interviews'} />

      <SubtitleContent content={'This may include:'} />
      <BulletContent content={'Name'} />
      <BulletContent content={'Email address'} />
      <BulletContent content={'Phone number'} />
      <BulletContent content={'Location (city/country)'} />
      <BulletContent content={'Educational and professional background'} />
      <BulletContent content={'Resume, portfolio, or work samples'} />
      <BulletContent content={'Career goals and preferences'} />

      <SubtitleContent
        content={'Violation may result in suspension or termination without refund.'}
      />

      <TitleContent content={'4. No Guarantee of Employment'} />
      <SubtitleContent
        content={
          <>
            Surely Placed does <strong>not</strong> guarantee:
          </>
        }
      />
      <BulletContent content={'Job Placement'} />
      <BulletContent content={'Interview calls'} />
      <BulletContent content={'Salary levels'} />
      <BulletContent content={'Employment timelines'} />
      <SubtitleContent
        content={'Outcomes depend on individual effort, market conditions, and participation.'}
      />

      <TitleContent content={'5. Payments & Access'} />
      <BulletContent content={'Fees must be paid in advance unless stated otherwise.'} />
      <BulletContent content={'Access to cohorts/services begins after payment confirmation.'} />
      <BulletContent content={'Prices may change for future programs.'} />

      <TitleContent content={'6. Intellectual Property'} />
      <SubtitleContent
        content={
          'All content, frameworks, materials, recordings, and methodologies belong to Surely Placed and may not be copied, redistributed, or resold without written permission.'
        }
      />

      <TitleContent content={'7. Termination'} />
      <SubtitleContent content={'We may suspend or terminate access if:'} />
      <BulletContent content={'Terms are violated'} />
      <BulletContent content={'Misconduct occurs'} />
      <BulletContent content={'Fraud or misuse is detected'} />

      <TitleContent content={'8. Limitation of Liability'} />
      <SubtitleContent content={'Surely Placed is not liable for:'} />
      <BulletContent content={'Employment outcomes'} />
      <BulletContent content={'Indirect or consequential damages'} />
      <BulletContent content={'Third-party platform issues'} />
      <SubtitleContent content={'Our liability is limited to the amount paid for Services.'} />

      <TitleContent content={'9. Governing Law'} />
      <SubtitleContent
        content={
          'These Terms are governed by applicable laws in the jurisdictions where Surely Placed operates'
        }
      />

      <TitleContent content={'10. Contact'} />
      <SubtitleContent
        content={
          <>
            <strong>Email:</strong> support@surelyplaced.com
          </>
        }
      />
    </Box>
  );
};

export default PrivacyPolicy;
