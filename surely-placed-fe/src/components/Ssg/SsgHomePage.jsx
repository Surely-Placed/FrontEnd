import Link from 'next/link';
import Image from 'next/image';
import { SSG_PUBLIC_ROUTES as R } from '@/routes/ssg-public';
import { SUPPORT_EMAIL } from '@/config/site';

const styles = {
  page: {
    minHeight: '100vh',
    backgroundColor: '#fff',
    color: '#292929',
    fontFamily: 'var(--font-nexa), Arial, sans-serif',
  },
  header: {
    backgroundColor: '#2857C4',
    borderBottom: '1px solid rgba(255,255,255,0.15)',
    padding: '16px 24px',
  },
  headerInner: {
    maxWidth: 960,
    margin: '0 auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 16,
    flexWrap: 'wrap',
  },
  brandRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
  },
  brandTitle: {
    color: '#fff',
    fontWeight: 700,
    fontSize: '1.25rem',
    lineHeight: 1.1,
    margin: 0,
  },
  brandSub: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: '0.75rem',
    margin: '2px 0 0',
  },
  nav: {
    display: 'flex',
    alignItems: 'center',
    gap: 16,
  },
  navLink: {
    color: 'rgba(255,255,255,0.85)',
    textDecoration: 'none',
    fontSize: '0.875rem',
  },
  signInBtn: {
    display: 'inline-block',
    backgroundColor: '#fff',
    color: '#2857C4',
    fontWeight: 600,
    fontSize: '0.875rem',
    padding: '6px 12px',
    borderRadius: 8,
    textDecoration: 'none',
  },
  main: {
    maxWidth: 960,
    margin: '0 auto',
    padding: '48px 24px',
  },
  h1: {
    fontFamily: 'var(--font-avantgarde), sans-serif',
    fontSize: '2rem',
    fontWeight: 700,
    margin: 0,
  },
  h2: {
    fontSize: '1.125rem',
    fontWeight: 600,
    margin: '0 0 8px',
  },
  body: {
    color: '#737373',
    lineHeight: 1.7,
    margin: '16px 0 0',
  },
  grid: {
    display: 'grid',
    gap: 12,
    gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
    marginTop: 16,
  },
  card: {
    border: '1px solid #D8E1F4',
    borderRadius: 8,
    padding: 16,
    fontSize: '0.875rem',
    color: '#737373',
  },
  highlight: {
    marginTop: 40,
    padding: 24,
    borderRadius: 12,
    border: '1px solid #B9D1FF',
    backgroundColor: '#F0F5FF',
  },
  list: {
    paddingLeft: 20,
    color: '#737373',
    fontSize: '0.875rem',
    lineHeight: 1.7,
  },
  primaryBtn: {
    display: 'inline-block',
    backgroundColor: '#2857C4',
    color: '#fff',
    fontWeight: 600,
    fontSize: '0.875rem',
    padding: '10px 16px',
    borderRadius: 8,
    textDecoration: 'none',
    marginTop: 16,
  },
  footer: {
    borderTop: '1px solid #E4E4E4',
    padding: '32px 24px',
  },
  footerInner: {
    maxWidth: 960,
    margin: '0 auto',
  },
  footerLinks: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 16,
    marginBottom: 16,
  },
  footerLink: {
    color: '#2857C4',
    fontSize: '0.875rem',
    textDecoration: 'underline',
  },
};

export default function SsgHomePage() {
  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <div style={styles.headerInner}>
          <div style={styles.brandRow}>
            <Image src="/logo.svg" alt="Surely Placed — SSG Access" width={120} height={40} />
            <div>
              <p style={styles.brandTitle}>SSG Access</p>
              <p style={styles.brandSub}>by Surely Placed</p>
            </div>
          </div>
          <nav style={styles.nav}>
            <Link href={R.privacy} style={styles.navLink}>
              Privacy Policy
            </Link>
            <Link href={R.terms} style={styles.navLink}>
              Terms
            </Link>
            <a href={R.signIn} style={styles.signInBtn}>
              Sign in
            </a>
          </nav>
        </div>
      </header>

      <main style={styles.main}>
        <h1 style={styles.h1}>SSG Access — Surely Placed Internal CRM</h1>
        <p style={styles.body}>
          <strong style={{ color: '#292929' }}>SSG Access</strong> is a private management portal owned
          and operated by <strong style={{ color: '#292929' }}>Surely Placed</strong>, a career coaching
          organization. This application is used exclusively by Surely Placed staff and invited
          candidates enrolled in our programs.
        </p>

        <section style={{ marginTop: 40 }}>
          <h2 style={styles.h2}>Application functionality</h2>
          <p style={{ ...styles.body, marginTop: 8 }}>
            SSG Access provides the following features to authorized users:
          </p>
          <div style={styles.grid}>
            {[
              {
                title: 'Candidate management',
                desc: 'View and manage enrolled candidates, profiles, and program status.',
              },
              {
                title: 'Application tracking',
                desc: 'Monitor daily job application counts and progress metrics.',
              },
              {
                title: 'Interview management',
                desc: 'Track scheduled interviews, assignments, and related correspondence.',
              },
              {
                title: 'Team & program oversight',
                desc: 'Manage marketers, mentors, payments, and cohort performance.',
              },
            ].map((item) => (
              <div key={item.title} style={styles.card}>
                <strong style={{ color: '#292929' }}>{item.title}</strong>
                <p style={{ margin: '8px 0 0' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section style={styles.highlight}>
          <h2 style={styles.h2}>Why we request Google / Gmail data</h2>
          <p style={{ ...styles.body, marginTop: 12 }}>
            SSG Access requests access to Gmail{' '}
            <strong style={{ color: '#292929' }}>
              only after explicit user authorization through Google&apos;s OAuth 2.0 process
            </strong>
            , and requests only the read-only scope{' '}
            <code>https://www.googleapis.com/auth/gmail.readonly</code>. Gmail data is used solely to
            provide the following recruitment CRM features:
          </p>
          <ul style={styles.list}>
            <li>Displaying candidate email conversations</li>
            <li>Synchronizing recruitment emails</li>
            <li>Detecting new candidate replies</li>
            <li>Maintaining communication history</li>
            <li>Automating recruitment workflow updates</li>
          </ul>
          <p style={{ ...styles.body, marginTop: 16 }}>
            SSG Access <strong>never sends, modifies, deletes, archives, labels, or otherwise changes</strong>{' '}
            Gmail data. We do <strong>not</strong> use Gmail data for advertising, marketing, user
            profiling, AI model training, or selling user information. Users may disconnect their
            Google account or revoke access at any time.
          </p>
          <p style={{ fontSize: '0.875rem' }}>
            For full details, see our{' '}
            <Link href={R.privacy} style={{ color: '#2857C4', fontWeight: 600 }}>
              Privacy Policy
            </Link>
            .
          </p>
        </section>

        <section style={{ marginTop: 40 }}>
          <h2 style={styles.h2}>Access &amp; sign in</h2>
          <p style={styles.body}>
            SSG Access is invite-only. Public sign-up is not available. Surely Placed staff and enrolled
            candidates receive access from their program administrator. Sign in is optional — all
            information on this page is available without logging in.
          </p>
          <a href={R.signIn} style={styles.primaryBtn}>
            Sign in to SSG Access
          </a>
        </section>
      </main>

      <footer style={styles.footer}>
        <div style={styles.footerInner}>
          <div style={styles.footerLinks}>
            <Link href={R.privacy} style={styles.footerLink}>
              Privacy Policy
            </Link>
            <Link href={R.terms} style={styles.footerLink}>
              Terms and Conditions
            </Link>
            <a href={`mailto:${SUPPORT_EMAIL}`} style={styles.footerLink}>
              {SUPPORT_EMAIL}
            </a>
          </div>
          <p style={{ color: '#737373', fontSize: '0.875rem', margin: 0 }}>
            &copy; {new Date().getFullYear()} Surely Placed. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
