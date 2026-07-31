import './globals.css';
import { Inter, JetBrains_Mono, Instrument_Serif } from 'next/font/google';
import Script from 'next/script';
import Link from 'next/link';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});
const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});
const serif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-serif',
  display: 'swap',
});

const SITE = {
  name: 'Tech Blueprint',
  title: 'Tech Blueprint — Essays, Patterns, and Code',
  description:
    'A minimalist, blueprint-style tech blog covering Next.js, React, TypeScript, and the craft of building on the web.',
  url: process.env.NEXT_PUBLIC_BASE_URL || 'https://tech-blueprint.dev',
};

export const metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: SITE.title,
    template: `%s — ${SITE.name}`,
  },
  description: SITE.description,
  keywords: ['Next.js', 'React', 'TypeScript', 'MDX', 'Tailwind CSS', 'Web Performance'],
  authors: [{ name: SITE.name }],
  creator: SITE.name,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE.url,
    title: SITE.title,
    description: SITE.description,
    siteName: SITE.name,
    // images auto-populated from /app/opengraph-image.js
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE.title,
    description: SITE.description,
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: '/',
    types: {
      'application/rss+xml': [{ url: '/rss.xml', title: 'Tech Blueprint RSS' }],
    },
  },
};

export const viewport = {
  themeColor: '#0f172a',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }) {
  const adsClient = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;
  return (
    <html lang="en" className={`${inter.variable} ${mono.variable} ${serif.variable}`}>
      <body className="min-h-screen bg-background font-sans text-foreground antialiased">
        {adsClient ? (
          <Script
            async
            strategy="afterInteractive"
            crossOrigin="anonymous"
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsClient}`}
          />
        ) : null}

        <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_1px_1px,theme(colors.foreground/0.06)_1px,transparent_0)] [background-size:24px_24px]" />

        <header className="sticky top-0 z-40 border-b border-border/70 bg-background/70 backdrop-blur">
          <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-6">
            <Link href="/" className="flex items-center gap-2 font-mono text-sm tracking-tight">
              <span className="inline-block h-3 w-3 rounded-sm border border-foreground" />
              <span className="font-semibold">tech.blueprint</span>
            </Link>
            <nav className="flex items-center gap-6 text-sm text-muted-foreground">
              <Link href="/" className="transition hover:text-foreground">
                Articles
              </Link>
              <Link href="/#tags" className="transition hover:text-foreground">
                Tags
              </Link>
              <Link
                href="/#about"
                className="transition hover:text-foreground"
              >
                About
              </Link>
            </nav>
          </div>
        </header>

        <main>{children}</main>

        <footer className="mt-24 border-t border-border/70">
          <div className="mx-auto flex max-w-5xl flex-col gap-2 px-6 py-10 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between">
            <div className="font-mono">
              © {new Date().getFullYear()} tech.blueprint · built with Next.js + MDX
            </div>
            <div className="font-mono">v1.0 · blueprint edition</div>
          </div>
        </footer>
      </body>
    </html>
  );
}
