import SsgTermsPage from '@/components/Ssg/SsgTermsPage';
import { buildPageMetadata } from '@/lib/seo';

export const metadata = buildPageMetadata({
  title: 'Terms and Conditions | SSG Access',
  description:
    'Terms and Conditions for SSG Access, Surely Placed internal CRM for career coaching program management.',
  path: '/ssg-terms-and-conditions',
});

export default function Page() {
  return <SsgTermsPage />;
}
