import Link from 'next/link';
import Image from 'next/image';
import AdSlot from '@/components/AdSlot';

export const mdxComponents = {
  h1: (props) => (
    <h1
      className="mt-10 mb-6 scroll-mt-24 font-serif text-3xl font-semibold tracking-tight md:text-4xl"
      {...props}
    />
  ),
  h2: (props) => (
    <h2
      className="mt-12 mb-4 scroll-mt-24 border-l-2 border-foreground/80 pl-3 font-serif text-2xl font-semibold tracking-tight md:text-3xl"
      {...props}
    />
  ),
  h3: (props) => (
    <h3
      className="mt-8 mb-3 scroll-mt-24 font-serif text-xl font-semibold tracking-tight md:text-2xl"
      {...props}
    />
  ),
  p: (props) => (
    <p className="my-5 leading-[1.8] text-foreground/85" {...props} />
  ),
  a: ({ href = '#', ...props }) => (
    <Link
      href={href}
      className="underline decoration-foreground/30 underline-offset-4 transition-colors hover:decoration-foreground"
      {...props}
    />
  ),
  img: (props) => (
    <Image
      className="my-8 rounded-md border border-border"
      alt={props.alt || 'Blog image'}
      width={800}
      height={400}
      sizes="100vw"
      style={{ width: '100%', height: 'auto' }}
      {...props}
    />
  ),
  ul: (props) => (
    <ul className="my-5 list-disc space-y-2 pl-6 text-foreground/85" {...props} />
  ),
  ol: (props) => (
    <ol className="my-5 list-decimal space-y-2 pl-6 text-foreground/85" {...props} />
  ),
  blockquote: (props) => (
    <blockquote
      className="my-6 border-l-2 border-foreground/40 bg-muted/40 py-2 pl-4 italic text-foreground/80"
      {...props}
    />
  ),
  code: (props) => (
    <code
      className="rounded-sm border border-border bg-muted/60 px-1.5 py-0.5 font-mono text-[0.85em] text-foreground"
      {...props}
    />
  ),
  pre: (props) => (
    <pre
      className="my-6 overflow-x-auto rounded-md border border-border bg-[#0b0b0d] p-4 font-mono text-[0.85rem] leading-relaxed text-zinc-100"
      {...props}
    />
  ),
  table: (props) => (
    <div className="my-6 overflow-x-auto">
      <table
        className="w-full border-collapse border border-border text-sm"
        {...props}
      />
    </div>
  ),
  th: (props) => (
    <th
      className="border border-border bg-muted/60 px-3 py-2 text-left font-semibold"
      {...props}
    />
  ),
  td: (props) => (
    <td className="border border-border px-3 py-2 align-top" {...props} />
  ),
  hr: () => <hr className="my-10 border-border" />,
  AdSlot,
};