import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import rehypeHighlight from 'rehype-highlight';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import { getPostBySlug, getAllPostSlugs } from '@/lib/posts';
import { formatDate, calculateReadingTime } from '@/lib/mdx';
import 'highlight.js/styles/github-dark.css';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

/**
 * 정적 경로 생성
 */
export async function generateStaticParams() {
  const slugs = getAllPostSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

/**
 * 메타데이터 생성
 */
export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: post.frontmatter.title,
    description: post.frontmatter.description,
    openGraph: {
      title: post.frontmatter.title,
      description: post.frontmatter.description,
      type: 'article',
      publishedTime: post.frontmatter.date,
      authors: [post.frontmatter.author],
      tags: post.frontmatter.tags,
    },
  };
}

/**
 * 포스트 상세 페이지
 */
export default async function PostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const readingTime = calculateReadingTime(post.content);

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

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-6">
          <Link href="/" className="text-2xl font-bold hover:text-primary transition-colors">
            ← Back to Home
          </Link>
        </div>
      </header>

      {/* Article */}
      <article className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Post Header */}
        <header className="mb-8 pb-8 border-b">
          <div className="flex flex-wrap gap-2 mb-4">
            {post.frontmatter.tags.map((tag) => (
              <Link
                key={tag}
                href={`/tags/${tag}`}
                className="text-xs px-3 py-1 bg-primary/10 text-primary rounded-full hover:bg-primary/20 transition-colors"
              >
                #{tag}
              </Link>
            ))}
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            {post.frontmatter.title}
          </h1>

          <p className="text-xl text-muted-foreground mb-6">
            {post.frontmatter.description}
          </p>

          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <time dateTime={post.frontmatter.date}>
              {formatDate(post.frontmatter.date)}
            </time>
            <span>•</span>
            <span>{post.frontmatter.author}</span>
            <span>•</span>
            <span>{readingTime}분 읽기</span>
            <span>•</span>
            <span className="text-primary font-medium">{post.frontmatter.category}</span>
          </div>
        </header>

        {/* MDX Content */}
        <div className="prose prose-slate dark:prose-invert max-w-none">
          <MDXRemote source={post.content} options={mdxOptions} />
        </div>

        {/* Post Footer */}
        <footer className="mt-12 pt-8 border-t">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="text-primary hover:underline"
            >
              ← 목록으로 돌아가기
            </Link>

            {post.frontmatter.updated && (
              <p className="text-sm text-muted-foreground">
                마지막 수정: {formatDate(post.frontmatter.updated)}
              </p>
            )}
          </div>
        </footer>
      </article>

      {/* Footer */}
      <footer className="border-t mt-12">
        <div className="container mx-auto px-4 py-8 text-center text-sm text-muted-foreground">
          <p>
            Built with{' '}
            <a
              href="https://nextjs.org"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-foreground"
            >
              Next.js
            </a>
            {' '}and{' '}
            <a
              href="https://claude.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-foreground"
            >
              Claude AI
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}