/**
 * 블로그 메타데이터 상수
 */
export const BLOG_METADATA = {
  title: 'Technical Writing with Claude',
  description: 'Claude AI를 활용한 AI 기반 기술 블로그 자동화 플랫폼',
  author: 'Technical Writing Team',
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  language: 'ko',
  locale: 'ko_KR',
  ogImage: '/og-image.png',
  twitterHandle: '@technical_writing',
  githubUrl: 'https://github.com/early-developer-club/technical-writing-with-claude',
} as const;

/**
 * RSS Feed 설정
 */
export const RSS_CONFIG = {
  title: BLOG_METADATA.title,
  description: BLOG_METADATA.description,
  siteUrl: BLOG_METADATA.siteUrl,
  feedUrl: `${BLOG_METADATA.siteUrl}/feed.xml`,
  imageUrl: `${BLOG_METADATA.siteUrl}${BLOG_METADATA.ogImage}`,
  copyright: `© ${new Date().getFullYear()} ${BLOG_METADATA.author}`,
  language: BLOG_METADATA.language,
  ttl: 60, // 60분
  maxItems: 20, // 최근 20개 포스트
} as const;