import SsgHomePage from '@/components/Ssg/SsgHomePage';
import { buildPageMetadata } from '@/lib/seo';

export const metadata = buildPageMetadata({
  title: 'SSG Access — Surely Placed Internal CRM',
  description:
    "SSG Access is Surely Placed's internal CRM for managing career coaching cohorts, tracking applications, and monitoring interview email activity.",
  path: '/homepage',
});

export default function Page() {
  return <SsgHomePage />;
}
