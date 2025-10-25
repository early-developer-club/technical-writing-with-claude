import { getAllPublishedPosts } from '@/lib/posts';
import { RSS_CONFIG } from '@/lib/constants';

/**
 * RSS 2.0 Feed 생성
 */
export async function GET() {
  const posts = getAllPublishedPosts().slice(0, RSS_CONFIG.maxItems);

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${RSS_CONFIG.title}</title>
    <link>${RSS_CONFIG.siteUrl}</link>
    <description>${RSS_CONFIG.description}</description>
    <language>${RSS_CONFIG.language}</language>
    <copyright>${RSS_CONFIG.copyright}</copyright>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${RSS_CONFIG.feedUrl}" rel="self" type="application/rss+xml" />
    <ttl>${RSS_CONFIG.ttl}</ttl>
    ${posts
      .map(
        (post) => `
    <item>
      <title>${escapeXml(post.frontmatter.title)}</title>
      <link>${RSS_CONFIG.siteUrl}/posts/${post.slug}</link>
      <guid isPermaLink="true">${RSS_CONFIG.siteUrl}/posts/${post.slug}</guid>
      <description>${escapeXml(post.frontmatter.description)}</description>
      <pubDate>${new Date(post.frontmatter.date).toUTCString()}</pubDate>
      <author>${escapeXml(post.frontmatter.author)}</author>
      <category>${escapeXml(post.frontmatter.category)}</category>
      ${post.frontmatter.tags.map((tag) => `<category>${escapeXml(tag)}</category>`).join('\n      ')}
    </item>`
      )
      .join('')}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, s-maxage=1200, stale-while-revalidate=600',
    },
  });
}

/**
 * XML 특수문자 이스케이프
 */
function escapeXml(unsafe: string): string {
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case '<':
        return '&lt;';
      case '>':
        return '&gt;';
      case '&':
        return '&amp;';
      case "'":
        return '&apos;';
      case '"':
        return '&quot;';
      default:
        return c;
    }
  });
}