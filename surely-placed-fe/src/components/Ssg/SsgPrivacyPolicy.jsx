import LegalLayout from '@/components/Ssg/LegalLayout';
import { SITE_PHONES, SUPPORT_EMAIL } from '@/config/site';

export default function SsgPrivacyPolicy() {
  return (
    <LegalLayout title="Privacy Policy">
      <p style={{ color: '#737373' }}>Last updated: February 19, 2026</p>

      <h2>1. Introduction</h2>
      <p>
        SSG Access is the internal CRM and management portal operated by Surely Placed
        (&quot;Surely Placed,&quot; &quot;we,&quot; &quot;our,&quot; or &quot;us&quot;). It is used
        by Surely Placed staff and enrolled candidates to manage programs, track progress, and monitor
        application activity.
      </p>
      <p>
        We are committed to protecting your privacy and handling your personal information in a
        transparent, secure, and responsible manner. This Privacy Policy explains how we collect, use,
        disclose, and protect your information when you access or use SSG Access and related Surely
        Placed services (collectively, the &quot;Services&quot;).
      </p>
      <p>By using SSG Access, you agree to the practices described in this Privacy Policy.</p>

      <h2>2. Scope of This Policy</h2>
      <p>This Privacy Policy applies to:</p>
      <ul>
        <li>The SSG Access website and landing pages</li>
        <li>User accounts, login and onboarding flows</li>
        <li>Cohort programs and mentorship sessions</li>
        <li>Application support and interview analytics services</li>
        <li>Community groups (including WhatsApp, Slack, or similar platforms)</li>
        <li>Calls, forms, and communications with the SSG Access team</li>
      </ul>
      <p>It does not apply to third-party websites or platforms linked from our website.</p>

      <h2>3. Information We Collect</h2>
      <p>
        <strong>a. Information You Provide Directly</strong>
      </p>
      <p>We may collect personal information when you:</p>
      <ul>
        <li>Fill out forms (sign-up, book a call, mentor application, contact forms)</li>
        <li>Join a cohort or service</li>
        <li>Communicate with our team</li>
        <li>Participate in mentorship sessions or interviews</li>
      </ul>
      <p>This may include name, email, phone, location, education, resume, and career goals.</p>

      <p>
        <strong>b. Automatically Collected Information</strong>
      </p>
      <p>
        When you use our website, we may automatically collect IP address, browser type, pages visited,
        and cookies.
      </p>

      <p>
        <strong>c. Interview Recordings &amp; Analytics (With Consent)</strong>
      </p>
      <p>
        With your explicit consent, we may record mock interviews and practice sessions for feedback and
        coaching only. You may withdraw consent at any time.
      </p>

      <p>
        <strong>d. Gmail &amp; Google Account Data (With Consent — Monitoring Only)</strong>
      </p>
      <p>
        SSG Access is Surely Placed&apos;s internal CRM. When a candidate connects a Google or Gmail
        account, we access Gmail data through Google&apos;s OAuth service <strong>only to monitor</strong>{' '}
        job application and interview-related email activity as part of program delivery.
      </p>
      <p>This access is used solely for:</p>
      <ul>
        <li>Monitoring application and interview email activity in real time</li>
        <li>Displaying progress metrics to authorized Surely Placed staff and the candidate</li>
        <li>Supporting coaching and program oversight</li>
      </ul>
      <p>
        <strong>
          We do not store Gmail message content, email bodies, or attachments on our servers.
        </strong>{' '}
        Gmail data is read for monitoring purposes only and is not retained, archived, or used for any
        purpose outside of this internal CRM. We do not use Gmail data for advertising, and we do not
        sell Gmail data.
      </p>
      <p>
        You may disconnect your Google account at any time from within SSG Access or by revoking access
        at{' '}
        <a href="https://myaccount.google.com/permissions" target="_blank" rel="noopener noreferrer">
          https://myaccount.google.com/permissions
        </a>
        . Our use of information received from Google APIs adheres to the{' '}
        <a
          href="https://developers.google.com/terms/api-services-user-data-policy"
          target="_blank"
          rel="noopener noreferrer"
        >
          Google API Services User Data Policy
        </a>
        , including the Limited Use requirements.
      </p>

      <h2>4. How We Use Your Information</h2>
      <ul>
        <li>Deliver and manage our Services and cohorts</li>
        <li>Provide application and interview support</li>
        <li>Monitor application and interview email activity (with consent)</li>
        <li>Communicate updates, reminders, and guidance</li>
        <li>Ensure platform security and prevent misuse</li>
      </ul>
      <p>We do not sell your personal data.</p>

      <h2>5. Data Sharing &amp; Disclosure</h2>
      <p>
        We may share your information only with mentors, internal team members, service providers, when
        required by law, or to protect rights and safety.
      </p>

      <h2>6. Data Retention</h2>
      <ul>
        <li>
          <strong>Account Data:</strong> while your account is active
        </li>
        <li>
          <strong>Gmail Data:</strong> not stored — monitoring only
        </li>
        <li>
          <strong>Payment Records:</strong> as required by law
        </li>
      </ul>

      <h2>7. Contact Us</h2>
      <p>
        Email: <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>
        <br />
        Phone: {SITE_PHONES.map((p) => p.display).join(', ')}
      </p>
    </LegalLayout>
  );
}
