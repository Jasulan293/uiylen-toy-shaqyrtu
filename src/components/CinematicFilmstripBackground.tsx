import React, { useEffect, useRef } from 'react';

// Couple's own photos (stored in /public/photos, 4:3 crops, served as static files)
const WEDDING_PHOTOS = [
  '/photos/photo-01-canyon.jpg',
  '/photos/photo-02-mountains.jpg',
  '/photos/photo-03-deck.jpg',
  '/photos/photo-04-hood.jpg',
  '/photos/photo-05-cafe.jpg',
  '/photos/photo-06-snow.jpg',
  '/photos/photo-07-plates.jpg',
  '/photos/photo-08-night.jpg',
  '/photos/photo-09-street.jpg',
];

// Helper to get repeated slices for continuous tape
const getColumnPhotos = (offset: number) => {
  const result: string[] = [];
  for (let i = 0; i < 9; i++) {
    result.push(WEDDING_PHOTOS[(i + offset) % WEDDING_PHOTOS.length]);
  }
  return result;
};

// Scroll range of every column, as a fraction of the column's own height.
// [value at scroll start, value at scroll end]. Opposite signs = opposite directions.
const COLUMN_RANGES: Array<[number, number]> = [
  [0, -0.36], // Col 0: up
  [-0.36, 0], // Col 1: down
  [-0.05, -0.4], // Col 2: up
  [-0.32, 0.04], // Col 3: down
  [-0.02, -0.35], // Col 4: up
];

// Chrome/Android (and other non-Apple browsers that support it) animate the columns with a CSS
// scroll-driven animation (animation-timeline: scroll()). It runs on the compositor thread, so the
// background never lags behind the page even when JS is busy. Safari/iOS keeps the JS path that is
// already smooth there.
const IS_APPLE =
  typeof navigator !== 'undefined' && /iPhone|iPad|iPod|Macintosh/.test(navigator.userAgent);
const USE_CSS_TIMELINE =
  typeof CSS !== 'undefined' &&
  typeof CSS.supports === 'function' &&
  CSS.supports('animation-timeline: scroll()') &&
  !IS_APPLE;

interface ColumnStripProps {
  photos: string[];
  columnId: number;
  setRef: (el: HTMLDivElement | null) => void;
}

const ColumnStrip: React.FC<ColumnStripProps> = ({ photos, columnId, setRef }) => {
  return (
    <div
      ref={setRef}
      // The GPU layer is created once; JS only changes translate3d().
      style={{ willChange: 'transform', transform: 'translate3d(0,0,0)', backfaceVisibility: 'hidden' }}
      className={`film-col film-col-${columnId} flex flex-col gap-4 sm:gap-6 shrink-0 w-44 sm:w-56 md:w-64`}
    >
      {photos.map((url, idx) => (
        <div
          key={`col-${columnId}-item-${idx}`}
          // No big blurred shadow here: shadows on 45 moving cards are very expensive on iOS.
          className="relative rounded-2xl overflow-hidden bg-black/90 p-2 sm:p-2.5 border border-black/40 shrink-0"
        >
          {/* Top Film Sprocket Strip */}
          <div className="flex items-center justify-between px-1 mb-1.5 opacity-50">
            {Array.from({ length: 5 }).map((_, i) => (
              <span
                key={i}
                className="w-2 h-1.5 rounded-xs bg-[#FBFBFD]/40 border border-black/30 inline-block"
              />
            ))}
          </div>

          {/* Photo container */}
          <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-black/60 border border-white/10">
            {/* No CSS filter on moving images (it forces a re-render every frame).
                The slight darkening is done by the cheap static overlay below. */}
            <img
              src={url}
              alt=""
              className="w-full h-full object-cover"
              loading="eager"
              decoding="async"
              draggable={false}
              referrerPolicy="no-referrer"
            />
            {/* Subtle vintage film vignette + slight darkening (replaces brightness-90) */}
            <div className="absolute inset-0 bg-black/10 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30 pointer-events-none" />

            {/* Frame metadata label */}
            <div className="absolute bottom-1.5 left-2 right-2 flex items-center justify-between text-[7px] font-mono tracking-widest text-white/80 uppercase">
              <span>PORTRA 400</span>
              <span className="text-[#C5A880]">▲ 0{((idx + columnId) % 9) + 1}</span>
            </div>
          </div>

          {/* Bottom Film Sprocket Strip */}
          <div className="flex items-center justify-between px-1 mt-1.5 opacity-50">
            {Array.from({ length: 5 }).map((_, i) => (
              <span
                key={i}
                className="w-2 h-1.5 rounded-xs bg-[#FBFBFD]/40 border border-black/30 inline-block"
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export const CinematicFilmstripBackground: React.FC = () => {
  const columnRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    if (USE_CSS_TIMELINE) return; // CSS handles the motion, no JS needed

    let rafId = 0;
    let maxScroll = 1;
    let columnHeights: number[] = [];
    let lastWidth = window.innerWidth;

    const measure = () => {
      const doc = document.documentElement;
      // Use the largest viewport height so the iOS address bar collapsing
      // does not change the scroll range and make the background "jump".
      maxScroll = Math.max(1, doc.scrollHeight - Math.max(window.innerHeight, doc.clientHeight));
      columnHeights = columnRefs.current.map((el) => (el ? el.offsetHeight : 0));
    };

    const render = () => {
      rafId = 0;
      const progress = Math.min(1, Math.max(0, window.scrollY / maxScroll));
      for (let i = 0; i < COLUMN_RANGES.length; i++) {
        const el = columnRefs.current[i];
        if (!el) continue;
        const [from, to] = COLUMN_RANGES[i];
        const y = (from + (to - from) * progress) * columnHeights[i];
        // Only compositor-friendly property, no layout/paint.
        el.style.transform = `translate3d(0, ${y.toFixed(2)}px, 0)`;
      }
    };

    const requestRender = () => {
      if (!rafId) rafId = requestAnimationFrame(render);
    };

    const onResize = () => {
      // Ignore height-only resizes (mobile address bar show/hide).
      if (window.innerWidth === lastWidth) return;
      lastWidth = window.innerWidth;
      measure();
      requestRender();
    };

    measure();
    render();

    window.addEventListener('scroll', requestRender, { passive: true });
    window.addEventListener('resize', onResize, { passive: true });
    window.addEventListener('orientationchange', onResize);

    // Page content can change height (loading screen, fonts, images).
    const ro = new ResizeObserver(() => {
      measure();
      requestRender();
    });
    ro.observe(document.body);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', requestRender);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('orientationchange', onResize);
      ro.disconnect();
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      // h-lvh = fixed height (toolbar collapsed), so the fixed layer is NOT resized
      // every time the iOS address bar moves. No opacity on this container (see overlay below).
      className={`${USE_CSS_TIMELINE ? 'film-css ' : ''}fixed top-0 left-0 w-full h-lvh pointer-events-none overflow-hidden z-0 select-none`}
      style={{ contain: 'strict' }}
    >
      {/* Tilted Multi-column Film Grid */}
      <div className="absolute -inset-x-32 -inset-y-48 flex justify-center items-start gap-4 sm:gap-6 md:gap-8 transform -rotate-[13deg] origin-center">
        <ColumnStrip columnId={0} photos={getColumnPhotos(0)} setRef={(el) => (columnRefs.current[0] = el)} />
        <ColumnStrip columnId={1} photos={getColumnPhotos(2)} setRef={(el) => (columnRefs.current[1] = el)} />
        <ColumnStrip columnId={2} photos={getColumnPhotos(4)} setRef={(el) => (columnRefs.current[2] = el)} />
        <ColumnStrip columnId={3} photos={getColumnPhotos(1)} setRef={(el) => (columnRefs.current[3] = el)} />
        <div className="hidden lg:block">
          <ColumnStrip columnId={4} photos={getColumnPhotos(3)} setRef={(el) => (columnRefs.current[4] = el)} />
        </div>
      </div>

      {/* Replaces the old container opacity (0.60 / 0.70 / 0.75): same look, but a static
          overlay is much cheaper than group opacity on moving layers. */}
      <div className="absolute inset-0 bg-[#FBFBFD] opacity-40 sm:opacity-30 md:opacity-25 pointer-events-none" />

      {/* Light atmospheric vignette that keeps text crisp */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#FBFBFD]/40 via-transparent to-[#FBFBFD]/50 pointer-events-none" />
    </div>
  );
};