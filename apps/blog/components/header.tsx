import Link from 'next/link';
import { ThemeToggle } from './theme-toggle';

interface HeaderProps {
  currentPath?: string;
}

export function Header({ currentPath = '/' }: HeaderProps) {
  const isActive = (path: string) => currentPath === path;

  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold hover:text-primary transition-colors">
            Technical Writing with Claude
          </Link>

          <div className="flex items-center gap-6">
            <nav className="flex gap-6">
              <Link
                href="/"
                className={`transition-colors ${
                  isActive('/') ? 'text-primary font-semibold' : 'hover:text-primary'
                }`}
              >
                Home
              </Link>
              <Link
                href="/posts"
                className={`transition-colors ${
                  isActive('/posts') ? 'text-primary font-semibold' : 'hover:text-primary'
                }`}
              >
                Posts
              </Link>
              <Link
                href="/tags"
                className={`transition-colors ${
                  isActive('/tags') ? 'text-primary font-semibold' : 'hover:text-primary'
                }`}
              >
                Tags
              </Link>
            </nav>

            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}