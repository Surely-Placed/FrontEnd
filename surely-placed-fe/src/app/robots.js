import { SITE_URL } from '@/config/site';

export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/', '/api/', '/backend/'],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
