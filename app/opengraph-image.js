import { ImageResponse } from 'next/og';

export const alt = 'Tech Blueprint — Essays, Patterns, and Code';
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

export default async function Image() {
  const serifText = 'Notes on building for the modern web. Tech Blueprint';
  const monoText =
    'tech.blueprint essays patterns code Next.js React MDX TypeScript // draft 001 #';
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
        <div style={{ position: 'absolute', top: 40, left: 40, width: 24, height: 24, borderTop: '2px solid #0f172a', borderLeft: '2px solid #0f172a', display: 'flex' }} />
        <div style={{ position: 'absolute', top: 40, right: 40, width: 24, height: 24, borderTop: '2px solid #0f172a', borderRight: '2px solid #0f172a', display: 'flex' }} />
        <div style={{ position: 'absolute', bottom: 40, left: 40, width: 24, height: 24, borderBottom: '2px solid #0f172a', borderLeft: '2px solid #0f172a', display: 'flex' }} />
        <div style={{ position: 'absolute', bottom: 40, right: 40, width: 24, height: 24, borderBottom: '2px solid #0f172a', borderRight: '2px solid #0f172a', display: 'flex' }} />

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
          <div style={{ display: 'flex' }}>draft 001</div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ fontFamily: 'InstrumentSerif', fontSize: 108, lineHeight: 1.02, color: '#0f172a', letterSpacing: -2, display: 'flex' }}>
            Notes on building
          </div>
          <div style={{ fontFamily: 'InstrumentSerif', fontSize: 108, lineHeight: 1.02, color: '#0f172a', letterSpacing: -2, display: 'flex' }}>
            for the modern web.
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: 18,
            color: '#334155',
            letterSpacing: 2,
            textTransform: 'uppercase',
          }}
        >
          <div style={{ display: 'flex' }}>essays · patterns · code</div>
          <div style={{ display: 'flex' }}>Next.js · MDX · TypeScript</div>
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
