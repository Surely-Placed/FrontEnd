import SsgPrivacyPolicy from '@/components/Ssg/SsgPrivacyPolicy';
import { buildPageMetadata } from '@/lib/seo';

export const metadata = buildPageMetadata({
  title: 'Privacy Policy | SSG Access',
  description:
    'Privacy Policy for SSG Access, Surely Placed internal CRM. Learn how we collect, use, and protect your data including Gmail monitoring with consent.',
  path: '/ssg-privacy-policy',
});

export default function Page() {
  return <SsgPrivacyPolicy />;
}
