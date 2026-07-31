import { notFound } from 'next/navigation';
import Link from 'next/link';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import { getAllPosts, getAllSlugs, getPostBySlug } from '@/lib/posts';
import { mdxComponents } from '@/components/MDXComponents';
import AdSlot from '@/components/AdSlot';

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  const { title, description, tags, author, date } = post.frontmatter;
  const url = `/blog/${slug}`;

  return {
    title,
    description,
    keywords: tags,
    authors: [{ name: author }],
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      title,
      description,
      url,
      publishedTime: date,
      authors: [author],
      tags,
      // images auto-populated from /app/blog/[slug]/opengraph-image.js
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      // images auto-populated from opengraph-image.js
    },
  };
}

function formatDate(iso) {
  try {
    return new Date(iso).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  } catch {
    return iso;
  }
}

export default async function PostPage({ params }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const all = getAllPosts();
  const idx = all.findIndex((p) => p.slug === slug);
  const prev = idx > 0 ? all[idx - 1] : null;
  const next = idx < all.length - 1 ? all[idx + 1] : null;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.frontmatter.title,
    description: post.frontmatter.description,
    datePublished: post.frontmatter.date,
    author: [{ '@type': 'Person', name: post.frontmatter.author }],
    keywords: post.frontmatter.tags.join(', '),
  };

  return (
    <article className="mx-auto max-w-3xl px-6 py-12 md:py-16">
      {/* Breadcrumb */}
      <div className="mb-8 flex items-center gap-2 font-mono text-xs text-muted-foreground">
        <Link href="/" className="hover:text-foreground">
          index
        </Link>
        <span>/</span>
        <Link href="/#articles" className="hover:text-foreground">
          articles
        </Link>
        <span>/</span>
        <span className="text-foreground">{slug}</span>
      </div>

      {/* Header */}
      <header className="border-b border-border/70 pb-8">
        <div className="flex flex-wrap items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
          <time dateTime={post.frontmatter.date}>
            {formatDate(post.frontmatter.date)}
          </time>
          <span>·</span>
          <span>{post.readingTime}</span>
          <span>·</span>
          <span>by {post.frontmatter.author}</span>
        </div>
        <h1 className="mt-4 font-serif text-4xl leading-[1.08] tracking-tight md:text-6xl">
          {post.frontmatter.title}
        </h1>
        <p className="mt-4 text-lg text-muted-foreground md:text-xl">
          {post.frontmatter.description}
        </p>
        <div className="mt-5 flex flex-wrap gap-1.5">
          {post.frontmatter.tags.map((t) => (
            <span
              key={t}
              className="rounded-sm border border-border bg-muted/40 px-2 py-0.5 font-mono text-[11px] text-muted-foreground"
            >
              #{t}
            </span>
          ))}
        </div>
      </header>

      {/* Ad above content */}
      <AdSlot slot="1000000001" format="horizontal" label="Sponsored" />

      {/* Article body */}
      <div className="prose-blueprint">
        <MDXRemote
          source={post.content}
          components={mdxComponents}
          options={{
            mdxOptions: {
              remarkPlugins: [remarkGfm],
              rehypePlugins: [
                rehypeSlug,
                [
                  rehypeAutolinkHeadings,
                  { behavior: 'wrap', properties: { className: ['heading-link'] } },
                ],
              ],
            },
          }}
        />
      </div>

      {/* Ad at end */}
      <AdSlot slot="1000000002" format="horizontal" label="Advertisement" />

      {/* Prev / Next */}
      <nav className="mt-16 grid gap-4 border-t border-border/70 pt-8 md:grid-cols-2">
        {prev ? (
          <Link
            href={`/blog/${prev.slug}`}
            className="group rounded-md border border-border p-4 transition hover:bg-muted/40"
          >
            <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              ← newer
            </div>
            <div className="mt-1 font-serif text-lg leading-snug group-hover:underline">
              {prev.frontmatter.title}
            </div>
          </Link>
        ) : (
          <div />
        )}
        {next ? (
          <Link
            href={`/blog/${next.slug}`}
            className="group rounded-md border border-border p-4 text-right transition hover:bg-muted/40"
          >
            <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              older →
            </div>
            <div className="mt-1 font-serif text-lg leading-snug group-hover:underline">
              {next.frontmatter.title}
            </div>
          </Link>
        ) : (
          <div />
        )}
      </nav>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </article>
  );
}
