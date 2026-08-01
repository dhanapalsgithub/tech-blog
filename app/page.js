import Link from 'next/link';
import Image from 'next/image';
import { getAllPosts, getAllTags } from '@/lib/posts';
import BlogIndex from '@/components/BlogIndex';

export const metadata = {
  title: 'Tech Blueprint — Essays, Patterns, and Code',
  description:
    'A minimalist, blueprint-style tech blog covering Next.js, React, TypeScript, MDX, and the craft of building on the modern web.',
};

function formatDate(iso) {
  try {
    return new Date(iso).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  } catch {
    return iso;
  }
}

export default function HomePage() {
  const posts = getAllPosts();
  const tags = getAllTags();
  const [hero, ...rest] = posts;

  return (
    <div className="mx-auto max-w-5xl px-6">
      {/* Hero */}
      <section className="relative border-b border-border/70 py-16 md:py-24">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-foreground/30 to-transparent" />
        <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
          <span className="inline-block h-2 w-2 rounded-sm bg-foreground" />
          <span>blueprint.log · draft 001</span>
        </div>
        <h1 className="mt-6 font-serif text-5xl leading-[1.05] tracking-tight md:text-7xl">
          Notes on <em className="not-italic underline decoration-foreground/30 underline-offset-8">building</em>
          <br />
          for the modern web.
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl">
          Essays, patterns, and code walk-throughs for engineers who care about
          craft. Written with Next.js 15, MDX, and a lot of coffee.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Link
            href={`/blog/${hero?.slug ?? ''}`}
            className="inline-flex items-center gap-2 rounded-sm border border-foreground bg-foreground px-4 py-2 text-sm font-medium text-background transition hover:bg-foreground/85"
          >
            Read the latest
            <span aria-hidden>→</span>
          </Link>
          <a
            href="#articles"
            className="inline-flex items-center gap-2 rounded-sm border border-border px-4 py-2 text-sm font-medium transition hover:bg-muted"
          >
            Browse all articles
          </a>
        </div>
      </section>

      {/* Featured */}
      {hero ? (
        <section className="border-b border-border/70 py-12">
          <div className="mb-4 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
            <span>fig.01</span>
            <span className="h-px flex-1 bg-border" />
            <span>featured</span>
          </div>
          <Link
            href={`/blog/${hero.slug}`}
            className="group grid gap-6 md:grid-cols-[1.2fr_1fr] md:gap-10"
          >
            <div>
              <div className="flex flex-wrap items-center gap-2 font-mono text-xs text-muted-foreground">
                <time dateTime={hero.frontmatter.date}>{formatDate(hero.frontmatter.date)}</time>
                <span>·</span>
                <span>{hero.readingTime}</span>
                <span>·</span>
                <span>{hero.frontmatter.author}</span>
              </div>
              <h2 className="mt-3 font-serif text-3xl leading-tight tracking-tight transition group-hover:underline group-hover:decoration-foreground/40 group-hover:underline-offset-8 md:text-4xl">
                {hero.frontmatter.title}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">
                {hero.frontmatter.description}
              </p>
              <div className="mt-5 flex flex-wrap gap-1.5">
                {hero.frontmatter.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-sm border border-border bg-muted/40 px-2 py-0.5 font-mono text-[11px] text-muted-foreground"
                  >
                    #{t}
                  </span>
                ))}
              </div>
            </div>

            {/* Updated Featured Image Section */}
            <div className="relative min-h-[220px] overflow-hidden rounded-md border border-border">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,theme(colors.foreground/0.15)_1px,transparent_0)] [background-size:14px_14px]" />

              {hero.frontmatter.image ? (
                <Image
                  src={hero.frontmatter.image} // இப்போது இது சரியாக வேலை செய்யும்
                  alt={hero.frontmatter.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <div className="absolute inset-0 flex flex-col justify-between p-5 font-mono text-[11px] text-muted-foreground">
                  <div className="flex items-center justify-between">
                    <span>{hero.slug}</span>
                    <span>□</span>
                  </div>
                  <div>
                    <div className="h-px w-16 bg-foreground/60" />
                    <div className="mt-2">// featured.mdx</div>
                  </div>
                </div>
              )}
            </div>
          </Link>
        </section>
      ) : null}

      {/* Articles list with search + filter (client) */}
      <BlogIndex posts={posts} tags={tags} />

      {/* Tags */}
      <section id="tags" className="border-t border-border/70 py-12">
        <div className="mb-6 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
          <span>fig.03</span>
          <span className="h-px flex-1 bg-border" />
          <span>tag index</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {tags.map((t) => (
            <span
              key={t}
              className="rounded-sm border border-border bg-muted/40 px-3 py-1 font-mono text-xs text-foreground/80"
            >
              #{t}
            </span>
          ))}
        </div>
      </section>

      {/* About */}
      <section id="about" className="border-t border-border/70 py-12">
        <div className="mb-6 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
          <span>fig.04</span>
          <span className="h-px flex-1 bg-border" />
          <span>about</span>
        </div>
        <div className="grid gap-6 md:grid-cols-[1fr_2fr]">
          <h2 className="font-serif text-3xl leading-tight tracking-tight md:text-4xl">
            A blueprint, not a magazine.
          </h2>
          <p className="text-muted-foreground md:text-lg">
            Every article here is written like an engineering document —
            precise headings, working code, and just enough prose to keep you
            reading. Content is authored in <span className="font-mono text-foreground/80">MDX</span>,
            rendered on the server, and shipped with the smallest possible
            client bundle.
          </p>
        </div>
      </section>
    </div>
  );
}