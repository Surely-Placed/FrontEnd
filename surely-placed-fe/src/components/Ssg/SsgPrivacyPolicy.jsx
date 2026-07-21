import LegalLayout from '@/components/Ssg/LegalLayout';
import { SITE_PHONES, SUPPORT_EMAIL } from '@/config/site';

export default function SsgPrivacyPolicy() {
  return (
    <LegalLayout title="Privacy Policy">
      <p style={{ color: '#737373' }}>Last updated: July 21, 2026</p>

      <h2>1. Introduction</h2>
      <p>
        SSG Access is the internal recruitment CRM and management portal operated by Surely Placed
        (&quot;Surely Placed,&quot; &quot;SSG Access,&quot; &quot;we,&quot; &quot;our,&quot; or
        &quot;us&quot;). It is used by authorized Surely Placed staff and enrolled candidates to
        manage recruitment programs, track progress, and manage candidate communication.
      </p>
      <p>
        We are committed to protecting your privacy and handling your personal information in a
        transparent, secure, and responsible manner. This Privacy Policy explains how we collect, use,
        disclose, and protect your information when you access or use SSG Access and related Surely
        Placed services (collectively, the &quot;Services&quot;), including how we access and handle
        Google and Gmail data.
      </p>
      <p>By using SSG Access, you agree to the practices described in this Privacy Policy.</p>

      <h2>2. Scope of This Policy</h2>
      <p>This Privacy Policy applies to:</p>
      <ul>
        <li>The SSG Access website and landing pages</li>
        <li>User accounts, login and onboarding flows</li>
        <li>Recruitment CRM features, including Gmail integration</li>
        <li>Cohort programs and mentorship sessions</li>
        <li>Calls, forms, and communications with the SSG Access team</li>
      </ul>
      <p>It does not apply to third-party websites or platforms linked from our website.</p>

      <h2>3. Information We Collect</h2>
      <p>
        <strong>a. Information You Provide Directly</strong>
      </p>
      <p>
        We may collect personal information when you fill out forms, join a cohort or service,
        communicate with our team, or participate in mentorship sessions. This may include name,
        email, phone, location, education, resume, and career goals.
      </p>
      <p>
        <strong>b. Automatically Collected Information</strong>
      </p>
      <p>
        When you use our website, we may automatically collect IP address, browser type, pages visited,
        and cookies.
      </p>
      <p>
        <strong>c. Google and Gmail Data (With Your Authorization)</strong>
      </p>
      <p>
        With your explicit authorization through Google, we access Gmail data as described in the
        &quot;Gmail Data Access&quot; section below.
      </p>

      <h2>4. Gmail Data Access</h2>
      <p>
        SSG ACCESS only accesses Gmail data after the user explicitly grants authorization through
        Google&apos;s OAuth 2.0 consent flow. We do not access Gmail data without the user&apos;s
        knowledge and consent.
      </p>
      <p>The application requests only the following Google OAuth scope:</p>
      <ul>
        <li>
          <code>https://www.googleapis.com/auth/gmail.readonly</code>
        </li>
      </ul>
      <p>
        This scope is required solely to provide user-facing recruitment CRM functionality, including:
      </p>
      <ul>
        <li>Displaying complete candidate email conversation history</li>
        <li>Synchronizing recruitment-related email conversations</li>
        <li>Detecting new candidate replies</li>
        <li>Maintaining communication history within the CRM</li>
        <li>Automating recruitment workflow updates and recruiter notifications</li>
      </ul>
      <p>
        The Gmail Read-Only scope is the minimum permission required to provide these features because
        the application must retrieve email content and conversation threads to accurately display
        candidate communications.
      </p>
      <p>
        SSG ACCESS never sends, composes, modifies, deletes, archives, labels, marks as read, or
        otherwise changes Gmail data. All Gmail operations performed by the application are strictly
        read-only.
      </p>

      <h2>5. Gmail Data Usage</h2>
      <p>
        Gmail data is accessed only after explicit user authorization and only for the authenticated
        user&apos;s own Gmail account.
      </p>
      <p>
        We use Gmail data exclusively to provide the recruitment CRM features requested by the user.
        Gmail data is never accessed for any purpose unrelated to these features.
      </p>
      <p>Gmail data is NOT used for:</p>
      <ul>
        <li>Advertising</li>
        <li>Marketing</li>
        <li>User profiling</li>
        <li>Selling user information</li>
        <li>
          Training or improving generalized Artificial Intelligence (AI) or Machine Learning (ML)
          models
        </li>
      </ul>
      <p>
        We do not access, process, or synchronize Gmail data belonging to other users.
      </p>

      <h2>6. Data Protection</h2>
      <p>
        We implement administrative, technical, and organizational safeguards to protect sensitive user
        data.
      </p>
      <p>These measures include:</p>
      <ul>
        <li>HTTPS/TLS encryption for all communications</li>
        <li>Secure storage of OAuth access and refresh tokens</li>
        <li>Encryption of sensitive credentials during transmission</li>
        <li>Access controls restricting Gmail data to authorized application components</li>
        <li>Continuous monitoring and industry-standard security practices</li>
        <li>Protection against unauthorized access, disclosure, alteration, or destruction</li>
      </ul>
      <p>
        Only authorized systems necessary to provide the requested services can access synchronized
        Gmail data.
      </p>

      <h2>7. Data Sharing</h2>
      <p>SSG ACCESS does not sell, rent, or disclose Gmail data to third parties.</p>
      <p>Google user data is shared only:</p>
      <ul>
        <li>When required by applicable law</li>
        <li>When necessary to provide services explicitly requested by the authenticated user</li>
      </ul>

      <h2>8. Data Retention</h2>
      <p>
        Gmail-related data is retained only for as long as necessary to provide the requested services.
      </p>
      <p>
        Users may disconnect their Google account or request deletion of synchronized Gmail data at any
        time.
      </p>
      <p>
        Following account disconnection or a verified deletion request, Gmail-related data is
        permanently removed from our systems within a reasonable period unless retention is required by
        applicable law.
      </p>

      <h2>9. User Controls</h2>
      <p>Users may:</p>
      <ul>
        <li>Connect or disconnect their Google account at any time</li>
        <li>
          Revoke OAuth permissions through their Google Account security settings at{' '}
          <a href="https://myaccount.google.com/permissions" target="_blank" rel="noopener noreferrer">
            https://myaccount.google.com/permissions
          </a>
        </li>
        <li>Request deletion of synchronized Gmail data</li>
        <li>Stop Gmail synchronization at any time</li>
      </ul>

      <h2>10. Google API Services User Data Policy</h2>
      <p>
        SSG ACCESS&apos;s use and transfer of information received from Google APIs adheres to the{' '}
        <a
          href="https://developers.google.com/terms/api-services-user-data-policy"
          target="_blank"
          rel="noopener noreferrer"
        >
          Google API Services User Data Policy
        </a>
        , including the Limited Use requirements.
      </p>
      <p>
        Google API data is used only to provide user-facing functionality explicitly requested by the
        authenticated user.
      </p>
      <p>
        Google Workspace APIs and data obtained through Google APIs are never used to develop, improve,
        or train generalized Artificial Intelligence (AI) or Machine Learning (ML) models.
      </p>
      <p>
        SSG ACCESS does not sell Google user data or use Google API data for advertising or user
        profiling.
      </p>

      <h2>11. Data Deletion</h2>
      <p>
        Users may request deletion of synchronized Gmail data at any time by contacting us or by
        disconnecting their Google account within SSG ACCESS.
      </p>
      <p>
        Upon receiving a verified deletion request, Gmail-related data associated with the user is
        permanently removed from our systems within a reasonable period unless retention is required by
        applicable law.
      </p>

      <h2>12. Contact</h2>
      <p>
        For privacy-related questions, contact us at:
        <br />
        Email: <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>
        <br />
        Phone: {SITE_PHONES.map((p) => p.display).join(', ')}
      </p>
      <p>
        This Privacy Policy will be updated as necessary to reflect changes in our services, applicable
        laws, or Google API requirements.
      </p>
    </LegalLayout>
  );
}
