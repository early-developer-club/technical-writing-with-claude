import { compileMDX } from 'next-mdx-remote/rsc';
import rehypeHighlight from 'rehype-highlight';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import type { PostFrontmatter } from './posts';

/**
 * MDX 컴파일 옵션
 */
const mdxOptions = {
  mdxOptions: {
    rehypePlugins: [
      rehypeHighlight,
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          behavior: 'wrap',
          properties: {
            className: ['anchor'],
          },
        },
      ],
    ],
  },
};

/**
 * MDX 콘텐츠를 컴파일합니다
 */
export async function compileMDXContent(source: string) {
  const { content, frontmatter } = await compileMDX<PostFrontmatter>({
    source,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    options: mdxOptions as any,
  });

  return { content, frontmatter };
}

/**
 * 날짜를 포맷팅합니다
 */
export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * 읽기 시간을 계산합니다 (대략적인 추정)
 */
export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  const readingTime = Math.ceil(words / wordsPerMinute);
  return readingTime;
}