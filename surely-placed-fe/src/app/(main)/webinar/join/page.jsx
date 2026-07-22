import WebinarJoinClient from '@/components/Webinar/WebinarJoinClient';
import { buildPageMetadata } from '@/lib/seo';

export const metadata = buildPageMetadata({
  title: 'Webinar Join Access | Surely Placed',
  description: 'Open your paid webinar seat. This link works on one device only.',
  path: '/webinar/join',
});

export default function WebinarJoinPage() {
  return <WebinarJoinClient />;
}
