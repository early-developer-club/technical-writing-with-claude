import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPostsByTag, getAllTags } from '@/lib/posts';
import { formatDate } from '@/lib/mdx';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

interface PageProps {
  params: Promise<{
    tag: string;
  }>;
}

/**
 * 정적 경로 생성
 */
export async function generateStaticParams() {
  const tags = getAllTags();
  return tags.map((tag) => ({
    tag,
  }));
}

/**
 * 메타데이터 생성
 */
export async function generateMetadata({ params }: PageProps) {
  const { tag } = await params;
  return {
    title: `Posts tagged with "${tag}" | Technical Writing with Claude`,
    description: `Browse all posts tagged with ${tag}`,
  };
}

export default async function TagPage({ params }: PageProps) {
  const { tag } = await params;
  const posts = getPostsByTag(tag);

  // 태그가 존재하지 않으면 404
  if (posts.length === 0) {
    notFound();
  }

  // 모든 태그 가져오기 (관련 태그 표시용)
  const allTags = getAllTags();
  const relatedTags = allTags.filter((t) => t !== tag).slice(0, 10);

  return (
    <div className="min-h-screen bg-background">
      <Header currentPath="/tags" />

      <main className="container mx-auto px-4 py-12">
        {/* Page Title */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Link
              href="/tags"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              ← All Tags
            </Link>
          </div>
          <h1 className="text-4xl font-bold mb-4">
            <span className="text-primary">#{tag}</span>
          </h1>
          <p className="text-muted-foreground">
            {posts.length} {posts.length === 1 ? 'post' : 'posts'} tagged with {tag}
          </p>
        </div>

        {/* Posts Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-12">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="p-6">
                {post.frontmatter.featured && (
                  <span className="inline-block px-3 py-1 text-xs font-semibold bg-primary text-primary-foreground rounded-full mb-3">
                    Featured
                  </span>
                )}

                <Link href={`/posts/${post.slug}`}>
                  <h3 className="text-xl font-bold mb-2 hover:text-primary transition-colors">
                    {post.frontmatter.title}
                  </h3>
                </Link>

                <p className="text-muted-foreground mb-4 line-clamp-3">
                  {post.frontmatter.description}
                </p>

                <div className="flex items-center justify-between text-sm mb-4">
                  <time className="text-muted-foreground">
                    {formatDate(post.frontmatter.date)}
                  </time>
                  <Link
                    href={`/posts?category=${post.frontmatter.category}`}
                    className="text-primary font-medium hover:underline"
                  >
                    {post.frontmatter.category}
                  </Link>
                </div>

                <div className="flex flex-wrap gap-2">
                  {post.frontmatter.tags.map((postTag) => (
                    <Link
                      key={postTag}
                      href={`/tags/${postTag}`}
                      className={`text-xs px-2 py-1 rounded transition-colors ${
                        postTag === tag
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted hover:bg-muted/80'
                      }`}
                    >
                      #{postTag}
                    </Link>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Related Tags */}
        {relatedTags.length > 0 && (
          <div className="mt-16 pt-8 border-t">
            <h2 className="text-2xl font-bold mb-6">Related Tags</h2>
            <div className="flex flex-wrap gap-3">
              {relatedTags.map((relatedTag) => (
                <Link
                  key={relatedTag}
                  href={`/tags/${relatedTag}`}
                  className="px-4 py-2 bg-muted hover:bg-primary hover:text-primary-foreground rounded-full transition-colors"
                >
                  #{relatedTag}
                </Link>
              ))}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}