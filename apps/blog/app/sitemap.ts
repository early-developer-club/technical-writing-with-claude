import { MetadataRoute } from 'next';
import { getAllPublishedPosts, getAllTags } from '@/lib/posts';
import { BLOG_METADATA } from '@/lib/constants';

/**
 * Sitemap 생성
 * https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPublishedPosts();
  const tags = getAllTags();

  const baseUrl = BLOG_METADATA.siteUrl;

  // 메인 페이지
  const routes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/posts`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/tags`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
  ];

  // 포스트 페이지
  const postRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${baseUrl}/posts/${post.slug}`,
    lastModified: new Date(post.frontmatter.updated || post.frontmatter.date),
    changeFrequency: 'monthly',
    priority: post.frontmatter.featured ? 0.9 : 0.8,
  }));

  // 태그 페이지
  const tagRoutes: MetadataRoute.Sitemap = tags.map((tag) => ({
    url: `${baseUrl}/tags/${encodeURIComponent(tag)}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.6,
  }));

  return [...routes, ...postRoutes, ...tagRoutes];
}