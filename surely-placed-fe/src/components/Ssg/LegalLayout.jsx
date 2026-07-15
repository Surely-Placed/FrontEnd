import Link from 'next/link';
import Image from 'next/image';
import { SSG_PUBLIC_ROUTES as R } from '@/routes/ssg-public';

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
    maxWidth: 768,
    margin: '0 auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 16,
  },
  backLink: {
    color: 'rgba(255,255,255,0.85)',
    textDecoration: 'none',
    fontSize: '0.875rem',
  },
  main: {
    maxWidth: 768,
    margin: '0 auto',
    padding: '40px 24px',
  },
  h1: {
    fontFamily: 'var(--font-avantgarde), sans-serif',
    fontSize: '2rem',
    fontWeight: 700,
    margin: 0,
  },
  body: {
    marginTop: 32,
    fontSize: '0.875rem',
    lineHeight: 1.7,
    color: '#737373',
  },
};

export default function LegalLayout({ title, children }) {
  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <div style={styles.headerInner}>
          <Link href={R.home} style={{ display: 'flex', alignItems: 'center' }}>
            <Image src="/logo.svg" alt="Surely Placed — SSG Access" width={120} height={40} />
          </Link>
          <Link href={R.home} style={styles.backLink}>
            Back to homepage
          </Link>
        </div>
      </header>

      <main style={styles.main}>
        <h1 style={styles.h1}>{title}</h1>
        <style>{`
          .ssg-legal h2 { margin-top: 2rem; margin-bottom: 0.75rem; font-size: 1.125rem; font-weight: 600; color: #292929; }
          .ssg-legal p { margin-bottom: 0.75rem; }
          .ssg-legal ul { margin-bottom: 0.75rem; padding-left: 1.25rem; list-style: disc; }
          .ssg-legal li { margin-bottom: 0.5rem; }
          .ssg-legal a { color: #2857C4; text-decoration: underline; }
        `}</style>
        <div className="ssg-legal" style={styles.body}>
          {children}
        </div>
      </main>
    </div>
  );
}
