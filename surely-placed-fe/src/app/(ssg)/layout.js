export const metadata = {
  title: 'SSG Access — Surely Placed Internal CRM',
  description:
    "SSG Access is Surely Placed's internal CRM for managing career coaching cohorts, tracking applications, and monitoring interview email activity.",
  robots: { index: true, follow: true },
  ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION && {
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    },
  }),
};

export default function SsgLayout({ children }) {
  return <div style={{ minHeight: '100vh', backgroundColor: '#fff' }}>{children}</div>;
}
