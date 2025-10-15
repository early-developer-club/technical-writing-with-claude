import { MetadataRoute } from 'next';
import { BLOG_METADATA } from '@/lib/constants';

/**
 * robots.txt 생성
 * https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/'],
      },
    ],
    sitemap: `${BLOG_METADATA.siteUrl}/sitemap.xml`,
    host: BLOG_METADATA.siteUrl,
  };
}