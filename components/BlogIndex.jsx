'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';

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

export default function BlogIndex({ posts, tags }) {
  const [query, setQuery] = useState('');
  const [activeTag, setActiveTag] = useState('all');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return posts.filter((p) => {
      const matchesTag =
        activeTag === 'all' || p.frontmatter.tags.includes(activeTag);
      if (!matchesTag) return false;
      if (!q) return true;
      const hay =
        `${p.frontmatter.title} ${p.frontmatter.description} ${p.frontmatter.author} ${p.frontmatter.tags.join(' ')} ${p.content}`.toLowerCase();
      return hay.includes(q);
    });
  }, [posts, query, activeTag]);

  return (
    <section id="articles" className="py-12">
      <div className="mb-6 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
        <span>fig.02</span>
        <span className="h-px flex-1 bg-border" />
        <span>
          {filtered.length} / {posts.length} articles
        </span>
      </div>

      {/* Search */}
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center">
        <div className="relative flex-1">
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 font-mono text-xs text-muted-foreground">
            {'>'}
          </span>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="search articles, tags, authors…"
            className="w-full rounded-sm border border-border bg-background px-8 py-2.5 font-mono text-sm outline-none transition placeholder:text-muted-foreground/60 focus:border-foreground"
            aria-label="Search articles"
          />
          {query ? (
            <button
              onClick={() => setQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 font-mono text-xs text-muted-foreground hover:text-foreground"
              aria-label="Clear search"
            >
              clear ×
            </button>
          ) : null}
        </div>
        <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
          {query || activeTag !== 'all' ? 'filtered' : 'showing all'}
        </div>
      </div>

      {/* Tag filter */}
      <div className="mb-8 flex flex-wrap gap-1.5">
        <TagChip
          label="all"
          active={activeTag === 'all'}
          onClick={() => setActiveTag('all')}
        />
        {tags.map((t) => (
          <TagChip
            key={t}
            label={t}
            active={activeTag === t}
            onClick={() => setActiveTag(t)}
          />
        ))}
      </div>

      {/* Results */}
      {filtered.length === 0 ? (
        <div className="rounded-md border border-dashed border-border p-10 text-center font-mono text-sm text-muted-foreground">
          <div className="mb-2">// no results</div>
          <div>Try a different query or tag.</div>
        </div>
      ) : (
        <ul className="divide-y divide-border/70">
          {filtered.map((p) => (
            <li key={p.slug} className="group">
              <Link
                href={`/blog/${p.slug}`}
                className="grid grid-cols-[80px_1fr] gap-4 py-6 md:grid-cols-[110px_1fr_120px] md:gap-8"
              >
                <time
                  dateTime={p.frontmatter.date}
                  className="font-mono text-xs text-muted-foreground md:text-sm"
                >
                  {formatDate(p.frontmatter.date)}
                </time>
                <div>
                  <h3 className="font-serif text-xl leading-snug tracking-tight transition group-hover:underline group-hover:decoration-foreground/40 group-hover:underline-offset-4 md:text-2xl">
                    {p.frontmatter.title}
                  </h3>
                  <p className="mt-1.5 line-clamp-2 text-sm text-muted-foreground">
                    {p.frontmatter.description}
                  </p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {p.frontmatter.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-sm border border-border bg-background px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground"
                      >
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="hidden text-right font-mono text-xs text-muted-foreground md:block">
                  {p.readingTime}
                  <div className="mt-1 text-foreground/60">read →</div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

function TagChip({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-sm border px-2.5 py-1 font-mono text-[11px] transition ${
        active
          ? 'border-foreground bg-foreground text-background'
          : 'border-border bg-background text-foreground/80 hover:border-foreground/60'
      }`}
    >
      #{label}
    </button>
  );
}
