import Link from 'next/link';
import { getAllPublishedPosts, getAllCategories } from '@/lib/posts';
import { formatDate } from '@/lib/mdx';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

interface SearchParams {
  category?: string;
  tag?: string;
  page?: string;
}

interface PageProps {
  searchParams: Promise<SearchParams>;
}

const POSTS_PER_PAGE = 9;

export const metadata = {
  title: 'All Posts | Technical Writing with Claude',
  description: 'Browse all technical blog posts written with Claude AI',
};

export default async function PostsPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const currentPage = parseInt(params.page || '1', 10);
  const selectedCategory = params.category;
  const selectedTag = params.tag;

  // 모든 포스트 가져오기
  let allPosts = getAllPublishedPosts();

  // 카테고리 필터링
  if (selectedCategory) {
    allPosts = allPosts.filter(
      (post) => post.frontmatter.category === selectedCategory
    );
  }

  // 태그 필터링
  if (selectedTag) {
    allPosts = allPosts.filter((post) =>
      post.frontmatter.tags.includes(selectedTag)
    );
  }

  // 페이지네이션 계산
  const totalPosts = allPosts.length;
  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const endIndex = startIndex + POSTS_PER_PAGE;
  const paginatedPosts = allPosts.slice(startIndex, endIndex);

  // 필터 옵션
  const categories = getAllCategories();

  return (
    <div className="min-h-screen bg-background">
      <Header currentPath="/posts" />

      <main className="container mx-auto px-4 py-12">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">All Posts</h1>
          <p className="text-muted-foreground">
            {selectedCategory && `Category: ${selectedCategory} • `}
            {selectedTag && `Tag: ${selectedTag} • `}
            {totalPosts} {totalPosts === 1 ? 'post' : 'posts'} found
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8 flex flex-wrap gap-4">
          {/* Category Filter */}
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Category:</span>
            <Link
              href="/posts"
              className={`text-sm px-3 py-1 rounded-full transition-colors ${
                !selectedCategory
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted hover:bg-muted/80'
              }`}
            >
              All
            </Link>
            {categories.map((category) => (
              <Link
                key={category}
                href={`/posts?category=${category}`}
                className={`text-sm px-3 py-1 rounded-full transition-colors ${
                  selectedCategory === category
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted hover:bg-muted/80'
                }`}
              >
                {category}
              </Link>
            ))}
          </div>

          {/* Tag Filter */}
          {selectedTag && (
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Filtered by tag:</span>
              <Link
                href="/posts"
                className="text-sm px-3 py-1 bg-primary/10 text-primary rounded-full hover:bg-primary/20 transition-colors"
              >
                #{selectedTag} ✕
              </Link>
            </div>
          )}
        </div>

        {/* Posts Grid */}
        {paginatedPosts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No posts found matching your filters.</p>
            <Link
              href="/posts"
              className="mt-4 inline-block text-primary hover:underline"
            >
              Clear filters
            </Link>
          </div>
        ) : (
          <>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-12">
              {paginatedPosts.map((post) => (
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
                      {post.frontmatter.tags.slice(0, 3).map((tag) => (
                        <Link
                          key={tag}
                          href={`/posts?tag=${tag}`}
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

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2">
                {currentPage > 1 && (
                  <Link
                    href={`/posts?page=${currentPage - 1}${
                      selectedCategory ? `&category=${selectedCategory}` : ''
                    }${selectedTag ? `&tag=${selectedTag}` : ''}`}
                    className="px-4 py-2 border rounded hover:bg-muted transition-colors"
                  >
                    Previous
                  </Link>
                )}

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <Link
                    key={page}
                    href={`/posts?page=${page}${
                      selectedCategory ? `&category=${selectedCategory}` : ''
                    }${selectedTag ? `&tag=${selectedTag}` : ''}`}
                    className={`px-4 py-2 border rounded transition-colors ${
                      currentPage === page
                        ? 'bg-primary text-primary-foreground'
                        : 'hover:bg-muted'
                    }`}
                  >
                    {page}
                  </Link>
                ))}

                {currentPage < totalPages && (
                  <Link
                    href={`/posts?page=${currentPage + 1}${
                      selectedCategory ? `&category=${selectedCategory}` : ''
                    }${selectedTag ? `&tag=${selectedTag}` : ''}`}
                    className="px-4 py-2 border rounded hover:bg-muted transition-colors"
                  >
                    Next
                  </Link>
                )}
              </div>
            )}
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}