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
        SSG Access only accesses Gmail data after explicit user authorization through Google&apos;s
        OAuth 2.0 authentication process. We do not access any Gmail data unless the user has connected
        their Google account and granted consent.
      </p>
      <p>The application requests only the following scope:</p>
      <ul>
        <li>
          <code>https://www.googleapis.com/auth/gmail.readonly</code>
        </li>
      </ul>
      <p>
        Gmail data is accessed solely to provide user-facing recruitment CRM features, including:
      </p>
      <ul>
        <li>Displaying complete candidate email conversation history</li>
        <li>Synchronizing recruitment-related email conversations</li>
        <li>Detecting new candidate replies</li>
        <li>Maintaining communication history</li>
        <li>Automating recruitment workflow updates</li>
      </ul>
      <p>
        <strong>
          SSG Access never sends, modifies, deletes, archives, labels, or otherwise changes Gmail
          data.
        </strong>{' '}
        The Gmail Read-Only scope provides read-only access, and the application performs read-only
        operations exclusively.
      </p>

      <h2>5. Gmail Data Usage</h2>
      <p>
        Gmail data is used only to provide the features explicitly requested by the authenticated
        user, as described above.
      </p>
      <p>
        Gmail data is accessed only after explicit user authorization and only for the authenticated
        user&apos;s own Gmail account. We do not access, process, or synchronize Gmail data belonging
        to other users.
      </p>
      <p>Gmail data is NOT used for:</p>
      <ul>
        <li>Advertising</li>
        <li>Marketing</li>
        <li>User profiling</li>
        <li>AI model training</li>
        <li>Selling user information</li>
      </ul>

      <h2>6. Data Protection</h2>
      <p>
        We use industry-standard security practices to protect sensitive data, including Gmail data,
        against unauthorized access. These measures include:
      </p>
      <ul>
        <li>HTTPS/TLS encryption for all communication</li>
        <li>Secure storage of OAuth access and refresh tokens</li>
        <li>Access controls restricting data to authorized systems only</li>
        <li>Industry-standard security practices</li>
        <li>Protection against unauthorized access</li>
      </ul>
      <p>
        OAuth access and refresh tokens are encrypted during transmission and stored securely using
        industry-standard security controls.
      </p>
      <p>
        Access to synchronized Gmail data is restricted to authorized application components and
        protected against unauthorized access.
      </p>
      <p>
        We continuously maintain administrative, technical, and physical safeguards to protect
        sensitive user data from unauthorized access, disclosure, alteration, or destruction.
      </p>

      <h2>7. Data Sharing</h2>
      <p>Gmail data is never sold or shared with third parties, except:</p>
      <ul>
        <li>When required by law</li>
        <li>When necessary to provide services explicitly requested by the user</li>
      </ul>

      <h2>8. Data Retention</h2>
      <p>
        Gmail-related data is retained only for as long as necessary to provide the services requested
        by the user. Users may disconnect their Google account or request deletion of synchronized
        Gmail data at any time. Upon account disconnection or a verified deletion request, synchronized
        Gmail data is permanently removed from our systems within a reasonable period unless a longer
        retention period is required by applicable law.
      </p>

      <h2>9. User Controls</h2>
      <p>Users can, at any time:</p>
      <ul>
        <li>Disconnect their Google account from within SSG Access</li>
        <li>
          Revoke OAuth permissions from their Google Account at{' '}
          <a href="https://myaccount.google.com/permissions" target="_blank" rel="noopener noreferrer">
            https://myaccount.google.com/permissions
          </a>
        </li>
        <li>Request deletion of synchronized Gmail data</li>
      </ul>

      <h2>10. Google API Services User Data Policy</h2>
      <p>
        <em>
          &quot;SSG ACCESS&apos;s use and transfer of information received from Google APIs adheres to
          the{' '}
          <a
            href="https://developers.google.com/terms/api-services-user-data-policy"
            target="_blank"
            rel="noopener noreferrer"
          >
            Google API Services User Data Policy
          </a>
          , including the Limited Use requirements.&quot;
        </em>
      </p>
      <p>
        Google user data is used only to provide user-facing functionality explicitly requested by the
        user and is never used for advertising or AI model training.
      </p>
      <p>
        Google Workspace APIs are not used to develop, improve, or train generalized artificial
        intelligence (AI) or machine learning (ML) models.
      </p>
      <p>
        Google user data is accessed only to provide user-facing functionality explicitly requested by
        the authenticated user and only with the user&apos;s explicit consent.
      </p>

      <h2>11. Data Deletion</h2>
      <p>
        Users may request deletion of their synchronized Gmail data or disconnect their Google account
        at any time. Upon receiving a valid deletion request, SSG ACCESS will permanently remove
        Gmail-related data associated with the user&apos;s account within a reasonable period, except
        where retention is required by law.
      </p>

      <h2>12. Contact</h2>
      <p>
        For privacy-related questions, contact us at:
        <br />
        Email: <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>
        <br />
        Phone: {SITE_PHONES.map((p) => p.display).join(', ')}
      </p>
    </LegalLayout>
  );
}
