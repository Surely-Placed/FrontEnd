import SsgPrivacyPolicy from '@/components/Ssg/SsgPrivacyPolicy';
import { buildPageMetadata } from '@/lib/seo';

export const metadata = buildPageMetadata({
  title: 'Privacy Policy | SSG Access',
  description:
    'Privacy Policy for SSG Access, Surely Placed recruitment CRM. Learn how we access, use, protect, and retain data, including read-only Gmail access under Google OAuth with explicit user consent.',
  path: '/ssg-privacy-policy',
});

export default function Page() {
  return <SsgPrivacyPolicy />;
}
