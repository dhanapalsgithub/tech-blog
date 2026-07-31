'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Reusable AdSense slot.
 * Props:
 *  - slot: string (data-ad-slot)
 *  - format: 'horizontal' | 'rectangle' | 'auto'
 *  - label: string (label shown above the ad)
 *  - responsive: boolean
 */
export default function AdSlot({
  slot = '0000000000',
  format = 'auto',
  label = 'Advertisement',
  responsive = true,
  className = '',
}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  const client = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;

  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setInView(true);
            io.disconnect();
          }
        });
      },
      { rootMargin: '200px' }
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!inView || !client) return;
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      // silent — AdSense not loaded (dev)
    }
  }, [inView, client]);

  const heights = {
    horizontal: 'min-h-[100px] md:min-h-[120px]',
    rectangle: 'min-h-[280px] md:min-h-[300px]',
    auto: 'min-h-[120px]',
  };

  return (
    <div ref={ref} className={`my-10 ${className}`}>
      <div className="mb-2 flex items-center gap-3">
        <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          {label}
        </span>
        <span className="h-px flex-1 bg-border" />
      </div>

      {client && inView ? (
        <ins
          className="adsbygoogle block"
          style={{ display: 'block' }}
          data-ad-client={client}
          data-ad-slot={slot}
          data-ad-format={format}
          data-full-width-responsive={responsive ? 'true' : 'false'}
        />
      ) : (
        <div
          className={`grid place-items-center rounded-md border border-dashed border-border bg-[radial-gradient(circle_at_1px_1px,theme(colors.muted.foreground/0.25)_1px,transparent_0)] [background-size:12px_12px] text-xs uppercase tracking-[0.25em] text-muted-foreground ${heights[format] ?? heights.auto}`}
        >
          <div className="text-center">
            <div>Ad Slot · {format}</div>
            <div className="mt-1 font-mono text-[10px] text-muted-foreground/70">
              slot: {slot}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
