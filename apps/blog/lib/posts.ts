import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// 포스트 저장소 경로
const POSTS_PATH = path.join(process.cwd(), '../../packages/posts');
const PUBLISHED_PATH = path.join(POSTS_PATH, 'published');
const DRAFTS_PATH = path.join(POSTS_PATH, 'drafts');

export interface PostFrontmatter {
  title: string;
  description: string;
  date: string;
  updated?: string;
  tags: string[];
  category: string;
  author: string;
  status: 'draft' | 'published';
  featured?: boolean;
  coverImage?: string;
}

export interface Post {
  slug: string;
  frontmatter: PostFrontmatter;
  content: string;
}

/**
 * 특정 디렉토리에서 모든 MDX 파일을 읽어옵니다
 */
function getPostsFromDirectory(directory: string): Post[] {
  try {
    if (!fs.existsSync(directory)) {
      return [];
    }

    const files = fs.readdirSync(directory);
    const mdxFiles = files.filter((file) => file.endsWith('.mdx'));

    const posts = mdxFiles.map((filename) => {
      const slug = filename.replace('.mdx', '');
      const filePath = path.join(directory, filename);
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const { data, content } = matter(fileContents);

      return {
        slug,
        frontmatter: data as PostFrontmatter,
        content,
      };
    });

    return posts;
  } catch (error) {
    console.error(`Error reading posts from ${directory}:`, error);
    return [];
  }
}

/**
 * 게시된 모든 포스트를 가져옵니다
 */
export function getAllPublishedPosts(): Post[] {
  const posts = getPostsFromDirectory(PUBLISHED_PATH);

  // 날짜 기준 내림차순 정렬 (최신순)
  return posts.sort((a, b) => {
    return new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime();
  });
}

/**
 * 모든 초안을 가져옵니다
 */
export function getAllDraftPosts(): Post[] {
  const posts = getPostsFromDirectory(DRAFTS_PATH);

  return posts.sort((a, b) => {
    return new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime();
  });
}

/**
 * 특정 slug에 해당하는 포스트를 가져옵니다
 */
export function getPostBySlug(slug: string, includeDrafts = false): Post | null {
  try {
    // 먼저 published에서 찾기
    const publishedPath = path.join(PUBLISHED_PATH, `${slug}.mdx`);
    if (fs.existsSync(publishedPath)) {
      const fileContents = fs.readFileSync(publishedPath, 'utf8');
      const { data, content } = matter(fileContents);
      return {
        slug,
        frontmatter: data as PostFrontmatter,
        content,
      };
    }

    // includeDrafts가 true면 drafts에서도 찾기
    if (includeDrafts) {
      const draftPath = path.join(DRAFTS_PATH, `${slug}.mdx`);
      if (fs.existsSync(draftPath)) {
        const fileContents = fs.readFileSync(draftPath, 'utf8');
        const { data, content } = matter(fileContents);
        return {
          slug,
          frontmatter: data as PostFrontmatter,
          content,
        };
      }
    }

    return null;
  } catch (error) {
    console.error(`Error reading post ${slug}:`, error);
    return null;
  }
}

/**
 * 모든 포스트의 slug 목록을 가져옵니다 (정적 생성용)
 */
export function getAllPostSlugs(): string[] {
  const publishedPosts = getAllPublishedPosts();
  return publishedPosts.map((post) => post.slug);
}

/**
 * 특정 태그를 가진 포스트들을 가져옵니다
 */
export function getPostsByTag(tag: string): Post[] {
  const allPosts = getAllPublishedPosts();
  return allPosts.filter((post) => post.frontmatter.tags.includes(tag));
}

/**
 * 모든 태그 목록을 가져옵니다 (중복 제거)
 */
export function getAllTags(): string[] {
  const allPosts = getAllPublishedPosts();
  const tags = allPosts.flatMap((post) => post.frontmatter.tags);
  return Array.from(new Set(tags));
}

/**
 * 특정 카테고리의 포스트들을 가져옵니다
 */
export function getPostsByCategory(category: string): Post[] {
  const allPosts = getAllPublishedPosts();
  return allPosts.filter((post) => post.frontmatter.category === category);
}

/**
 * 모든 카테고리 목록을 가져옵니다 (중복 제거)
 */
export function getAllCategories(): string[] {
  const allPosts = getAllPublishedPosts();
  const categories = allPosts.map((post) => post.frontmatter.category);
  return Array.from(new Set(categories));
}