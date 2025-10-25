export function Footer() {
  return (
    <footer className="border-t mt-12">
      <div className="container mx-auto px-4 py-8 text-center text-sm text-muted-foreground">
        <p>
          Built with{' '}
          <a
            href="https://nextjs.org"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-foreground transition-colors"
          >
            Next.js
          </a>
          {' '}and{' '}
          <a
            href="https://claude.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-foreground transition-colors"
          >
            Claude AI
          </a>
        </p>
        <p className="mt-2">
          © {new Date().getFullYear()} Technical Writing with Claude. All rights reserved.
        </p>
      </div>
    </footer>
  );
}