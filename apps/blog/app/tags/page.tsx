import Link from 'next/link';
import { getAllTags, getPostsByTag } from '@/lib/posts';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

export const metadata = {
  title: 'All Tags | Technical Writing with Claude',
  description: 'Browse posts by tags',
};

export default function TagsPage() {
  const tags = getAllTags();

  // 각 태그별 포스트 수 계산
  const tagsWithCount = tags.map((tag) => ({
    name: tag,
    count: getPostsByTag(tag).length,
  }));

  // 포스트 수 기준 내림차순 정렬
  tagsWithCount.sort((a, b) => b.count - a.count);

  return (
    <div className="min-h-screen bg-background">
      <Header currentPath="/tags" />

      <main className="container mx-auto px-4 py-12">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">All Tags</h1>
          <p className="text-muted-foreground">
            {tagsWithCount.length} {tagsWithCount.length === 1 ? 'tag' : 'tags'} available
          </p>
        </div>

        {/* Tags Grid */}
        {tagsWithCount.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No tags found.</p>
            <Link
              href="/"
              className="mt-4 inline-block text-primary hover:underline"
            >
              Go to home
            </Link>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {tagsWithCount.map((tag) => (
              <Link
                key={tag.name}
                href={`/tags/${tag.name}`}
                className="group border rounded-lg p-6 hover:shadow-lg hover:border-primary transition-all"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
                    #{tag.name}
                  </h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  {tag.count} {tag.count === 1 ? 'post' : 'posts'}
                </p>
              </Link>
            ))}
          </div>
        )}

        {/* Popular Tags Section */}
        {tagsWithCount.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-6">Popular Tags</h2>
            <div className="flex flex-wrap gap-3">
              {tagsWithCount.slice(0, 10).map((tag) => {
                // 포스트 수에 따라 크기 조절 (최소 12px, 최대 24px)
                const maxCount = tagsWithCount[0].count;
                const fontSize = Math.max(
                  12,
                  Math.min(24, 12 + (tag.count / maxCount) * 12)
                );

                return (
                  <Link
                    key={tag.name}
                    href={`/tags/${tag.name}`}
                    className="px-4 py-2 bg-muted hover:bg-primary hover:text-primary-foreground rounded-full transition-colors"
                    style={{ fontSize: `${fontSize}px` }}
                  >
                    #{tag.name} ({tag.count})
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}