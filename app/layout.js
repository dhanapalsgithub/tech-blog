import './globals.css';
import { Inter, JetBrains_Mono, Instrument_Serif } from 'next/font/google';
import Script from 'next/script';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans', display: 'swap' });
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono', display: 'swap' });
const serif = Instrument_Serif({ subsets: ['latin'], weight: '400', variable: '--font-serif', display: 'swap' });

const SITE = {
  name: 'Tech Blueprint',
  title: 'Tech Blueprint — Essays, Patterns, and Code',
  description: 'A minimalist, blueprint-style tech blog covering Next.js, React, TypeScript, and the craft of building on the web.',
  url: process.env.NEXT_PUBLIC_BASE_URL || 'https://tech-blueprint.dev',
};

export const metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: SITE.title, template: `%s — ${SITE.name}` },
  description: SITE.description,
};

export default function RootLayout({ children }) {
  const adsClient = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;
  const gaId = 'G-Q7X80QXNH4'; 

  return (
    <html lang="en" className={`${inter.variable} ${mono.variable} ${serif.variable}`}>
      <head>
        {/* Google Analytics Script */}
        <Script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gaId}');
          `}
        </Script>
      </head>
      <body suppressHydrationWarning className="min-h-screen bg-background font-sans text-foreground antialiased">
        {adsClient && (
          <Script
            async
            strategy="afterInteractive"
            crossOrigin="anonymous"
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsClient}`}
          />
        )}

        <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_1px_1px,theme(colors.foreground/0.06)_1px,transparent_0)] [background-size:24px_24px]" />

        <header className="sticky top-0 z-40 border-b border-border/70 bg-background/70 backdrop-blur">
          <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-6">
            <Link href="/" className="flex items-center gap-2 font-mono text-sm tracking-tight">
              <span className="inline-block h-3 w-3 rounded-sm border border-foreground" />
              <span className="font-semibold">tech.blueprint</span>
            </Link>
            <nav className="flex items-center gap-6 text-sm text-muted-foreground">
              <Link href="/" className="transition hover:text-foreground">Articles</Link>
              <Link href="/#tags" className="transition hover:text-foreground">Tags</Link>
              <Link href="/#about" className="transition hover:text-foreground">About</Link>
              <Link href="/contact" className="transition hover:text-foreground">Contact</Link>
            </nav>
          </div>
        </header>

        <main>{children}</main>

        <footer className="mt-24 border-t border-border/70">
          <div className="mx-auto flex max-w-5xl flex-col gap-4 px-6 py-10 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between">
            <div className="font-mono">© {new Date().getFullYear()} tech.blueprint · built with Next.js + MDX</div>
            <div className="flex gap-4">
              <Link href="/privacy" className="font-mono hover:text-foreground underline underline-offset-4">
                Privacy Policy
              </Link>
              <span className="font-mono">v1.0</span>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}