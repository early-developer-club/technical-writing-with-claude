import Link from 'next/link';
import { getAllPublishedPosts } from '@/lib/posts';
import { formatDate } from '@/lib/mdx';

export default function Home() {
  const posts = getAllPublishedPosts();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold">
              Technical Writing with Claude
            </Link>
            <nav className="flex gap-6">
              <Link href="/" className="hover:text-primary transition-colors">
                Home
              </Link>
              <Link href="/posts" className="hover:text-primary transition-colors">
                Posts
              </Link>
              <Link href="/tags" className="hover:text-primary transition-colors">
                Tags
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="border-b bg-muted/30">
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            AI 기반 기술 블로그 플랫폼
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Claude AI와 Next.js로 만드는 차세대 기술 블로그.
            <br />
            대화만으로 고품질 기술 문서를 작성하세요.
          </p>
        </div>
      </section>

      {/* Posts List */}
      <main className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-8">최근 포스트</h2>

        {posts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">아직 작성된 포스트가 없습니다.</p>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
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

                  <div className="flex items-center justify-between text-sm">
                    <time className="text-muted-foreground">
                      {formatDate(post.frontmatter.date)}
                    </time>
                    <span className="text-primary font-medium">
                      {post.frontmatter.category}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-4">
                    {post.frontmatter.tags.slice(0, 3).map((tag) => (
                      <Link
                        key={tag}
                        href={`/tags/${tag}`}
                        className="text-xs px-2 py-1 bg-muted rounded hover:bg-muted/80 transition-colors"
                      >
                        #{tag}
                      </Link>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>

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
          <p className="mt-2">
            © 2025 Technical Writing with Claude. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
