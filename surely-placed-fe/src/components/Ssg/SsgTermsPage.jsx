import Link from 'next/link';
import LegalLayout from '@/components/Ssg/LegalLayout';
import { SSG_PUBLIC_ROUTES as R } from '@/routes/ssg-public';
import { SITE_PHONES, SUPPORT_EMAIL } from '@/config/site';

export default function SsgTermsPage() {
  return (
    <LegalLayout title="Terms and Conditions">
      <p style={{ color: '#737373' }}>Last updated: February 19, 2026</p>

      <h2>1. Acceptance of Terms</h2>
      <p>
        SSG Access is Surely Placed&apos;s internal CRM and management portal. By accessing and using
        SSG Access, you agree to be bound by these Terms and Conditions.
      </p>

      <h2>2. Services Overview</h2>
      <p>
        SSG Access is used internally by Surely Placed to manage cohorts, candidates, and program
        delivery, including career coaching, mentorship, resume support, and interview preparation.
      </p>
      <p>We provide guidance and support, not guaranteed employment.</p>

      <h2>3. User Responsibilities</h2>
      <ul>
        <li>Provide accurate and truthful information</li>
        <li>Participate respectfully in cohorts and communities</li>
        <li>Not misuse content, recordings, or materials</li>
      </ul>

      <h2>4. Google &amp; Gmail Integration (Read-Only)</h2>
      <p>
        If you connect a Google or Gmail account, you authorize SSG Access to read your Gmail data
        using the read-only scope{' '}
        <code>https://www.googleapis.com/auth/gmail.readonly</code>, solely to provide recruitment CRM
        features as described in our <Link href={R.privacy}>Privacy Policy</Link>. SSG Access{' '}
        <strong>never sends, modifies, deletes, archives, labels, or otherwise changes</strong> your
        Gmail data. You may disconnect your account or revoke access at any time.
      </p>

      <h2>5. No Guarantee of Employment</h2>
      <p>
        SSG Access does not guarantee job placement, interview calls, salary levels, or employment
        timelines.
      </p>

      <h2>6. Limitation of Liability</h2>
      <p>Our liability is limited to the amount paid for Services.</p>

      <h2>7. Contact</h2>
      <p>
        Email: <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>
        <br />
        Phone: {SITE_PHONES.map((p) => p.display).join(', ')}
      </p>
    </LegalLayout>
  );
}
