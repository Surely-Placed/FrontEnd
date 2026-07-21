import SsgHomePage from '@/components/Ssg/SsgHomePage';
import { buildPageMetadata } from '@/lib/seo';

export const metadata = buildPageMetadata({
  title: 'SSG Access — Surely Placed Internal CRM',
  description:
    "SSG Access is Surely Placed's recruitment CRM for managing candidates, tracking applications, and syncing recruitment email using read-only Gmail access with user consent.",
  path: '/homepage',
});

export default function Page() {
  return <SsgHomePage />;
}
