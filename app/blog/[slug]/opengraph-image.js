import { ImageResponse } from 'next/og';
import { getPostBySlug } from '@/lib/posts';

export const alt = 'Tech Blueprint article';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

async function loadGoogleFont(family, text) {
  const url = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(
    family
  )}&text=${encodeURIComponent(text)}`;
  const css = await (await fetch(url)).text();
  const resource = css.match(/src: url\((.+?)\) format\('(opentype|truetype)'\)/);
  if (resource) {
    const res = await fetch(resource[1]);
    if (res.status === 200) return await res.arrayBuffer();
  }
  throw new Error(`failed to load font: ${family}`);
}

function formatDate(iso) {
  try {
    return new Date(iso)
      .toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
      .toUpperCase();
  } catch {
    return iso;
  }
}

export default async function Image({ params }) {
  const post = getPostBySlug(params.slug);
  const title = post?.frontmatter?.title || 'Tech Blueprint';
  const description =
    post?.frontmatter?.description ||
    'Essays, patterns, and code for the modern web.';
  const author = post?.frontmatter?.author || 'Tech Blueprint';
  const date = post?.frontmatter?.date
    ? formatDate(post.frontmatter.date)
    : '';
  const tags = post?.frontmatter?.tags || [];
  const readTime = post?.readingTime || '';

  const serifText = `${title} Tech Blueprint fig`;
  const monoText = `${description} ${author} ${date} ${readTime} ${tags.join(' ')} tech.blueprint // ${params.slug} # by BLUEPRINTv1 draft essays patterns code abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789.,·-·:()`;

  const [serif, mono] = await Promise.all([
    loadGoogleFont('Instrument Serif', serifText),
    loadGoogleFont('JetBrains Mono', monoText),
  ]);

  const bgGrid =
    'linear-gradient(rgba(15,23,42,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(15,23,42,0.06) 1px, transparent 1px)';

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px 88px',
          backgroundColor: '#f6f8fb',
          backgroundImage: bgGrid,
          backgroundSize: '30px 30px',
          fontFamily: 'JetBrainsMono',
          position: 'relative',
        }}
      >
        {/* Corner brackets */}
        <div style={{ position: 'absolute', top: 40, left: 40, width: 24, height: 24, borderTop: '2px solid #0f172a', borderLeft: '2px solid #0f172a', display: 'flex' }} />
        <div style={{ position: 'absolute', top: 40, right: 40, width: 24, height: 24, borderTop: '2px solid #0f172a', borderRight: '2px solid #0f172a', display: 'flex' }} />
        <div style={{ position: 'absolute', bottom: 40, left: 40, width: 24, height: 24, borderBottom: '2px solid #0f172a', borderLeft: '2px solid #0f172a', display: 'flex' }} />
        <div style={{ position: 'absolute', bottom: 40, right: 40, width: 24, height: 24, borderBottom: '2px solid #0f172a', borderRight: '2px solid #0f172a', display: 'flex' }} />

        {/* Top bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: 18,
            letterSpacing: 4,
            color: '#334155',
            textTransform: 'uppercase',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 10, height: 10, background: '#0f172a', display: 'flex' }} />
            <div style={{ display: 'flex' }}>tech.blueprint</div>
          </div>
          <div style={{ display: 'flex' }}>{date}</div>
        </div>

        {/* Title block */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div
            style={{
              fontFamily: 'InstrumentSerif',
              fontSize: 84,
              lineHeight: 1.05,
              color: '#0f172a',
              letterSpacing: -1,
              display: 'flex',
            }}
          >
            {title.length > 80 ? title.slice(0, 78) + '…' : title}
          </div>
          <div
            style={{
              fontSize: 22,
              lineHeight: 1.5,
              color: '#475569',
              display: 'flex',
              maxWidth: 900,
            }}
          >
            {description.length > 140
              ? description.slice(0, 138) + '…'
              : description}
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontSize: 18,
              color: '#334155',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 16,
                letterSpacing: 2,
                textTransform: 'uppercase',
              }}
            >
              <div style={{ display: 'flex' }}>by {author}</div>
              {readTime ? <div style={{ display: 'flex' }}>· {readTime}</div> : null}
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              {tags.slice(0, 3).map((t) => (
                <div
                  key={t}
                  style={{
                    padding: '6px 12px',
                    border: '1px solid #0f172a',
                    fontSize: 16,
                    color: '#0f172a',
                    display: 'flex',
                  }}
                >
                  #{t}
                </div>
              ))}
            </div>
          </div>
          <div
            style={{
              fontSize: 14,
              color: '#94a3b8',
              letterSpacing: 3,
              display: 'flex',
            }}
          >
            // BLUEPRINT.v1 · fig.{(params.slug || '').slice(0, 6).toUpperCase()}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: 'InstrumentSerif', data: serif, style: 'normal', weight: 400 },
        { name: 'JetBrainsMono', data: mono, style: 'normal', weight: 400 },
      ],
    }
  );
}
