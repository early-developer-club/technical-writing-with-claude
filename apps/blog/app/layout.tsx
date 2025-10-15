import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { BLOG_METADATA } from "@/lib/constants";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(BLOG_METADATA.siteUrl),
  title: {
    default: BLOG_METADATA.title,
    template: `%s | ${BLOG_METADATA.title}`,
  },
  description: BLOG_METADATA.description,
  keywords: [
    'Technical Writing',
    'Claude AI',
    'Next.js',
    'MDX',
    'Blog',
    '기술 블로그',
    'AI 블로그',
  ],
  authors: [{ name: BLOG_METADATA.author }],
  creator: BLOG_METADATA.author,
  openGraph: {
    type: 'website',
    locale: BLOG_METADATA.locale,
    url: BLOG_METADATA.siteUrl,
    title: BLOG_METADATA.title,
    description: BLOG_METADATA.description,
    siteName: BLOG_METADATA.title,
    images: [
      {
        url: BLOG_METADATA.ogImage,
        width: 1200,
        height: 630,
        alt: BLOG_METADATA.title,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: BLOG_METADATA.title,
    description: BLOG_METADATA.description,
    creator: BLOG_METADATA.twitterHandle,
    images: [BLOG_METADATA.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    types: {
      'application/rss+xml': `${BLOG_METADATA.siteUrl}/feed.xml`,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang={BLOG_METADATA.language}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
