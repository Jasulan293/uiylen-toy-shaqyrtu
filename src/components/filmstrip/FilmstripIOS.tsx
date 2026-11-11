import React, { useEffect, useRef } from 'react';
import { FilmCard, FilmOverlays, getColumnPhotos } from './FilmstripShared';

/**
 * iPhone / iPad (Safari, Chrome-on-iOS) version.
 * Also used as the fallback for any browser without CSS scroll-driven animations.
 *
 * Scroll logic: ONE requestAnimationFrame that only writes transform: translate3d().
 * Do not mix this file with the Android one.
 */

// Scroll range of every column, as a fraction of the column's own height.
// [value at scroll start, value at scroll end]. Opposite signs = opposite directions.
const COLUMN_RANGES: Array<[number, number]> = [
  [0, -0.36], // Col 0: up
  [-0.36, 0], // Col 1: down
  [-0.05, -0.4], // Col 2: up
  [-0.32, 0.04], // Col 3: down
  [-0.02, -0.35], // Col 4: up
];

interface ColumnProps {
  columnId: number;
  offset: number;
  setRef: (el: HTMLDivElement | null) => void;
}

const Column: React.FC<ColumnProps> = ({ columnId, offset, setRef }) => (
  <div
    ref={setRef}
    style={{ willChange: 'transform', transform: 'translate3d(0,0,0)', backfaceVisibility: 'hidden' }}
    className="flex flex-col gap-4 sm:gap-6 shrink-0 w-44 sm:w-56 md:w-64"
  >
    {getColumnPhotos(offset).map((url, idx) => (
      <FilmCard key={`col-${columnId}-item-${idx}`} url={url} idx={idx} columnId={columnId} />
    ))}
  </div>
);

export const FilmstripIOS: React.FC = () => {
  const columnRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
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
      className="fixed top-0 left-0 w-full h-lvh pointer-events-none overflow-hidden z-0 select-none"
      style={{ contain: 'strict' }}
    >
      <div className="absolute -inset-x-32 -inset-y-48 flex justify-center items-start gap-4 sm:gap-6 md:gap-8 transform -rotate-[13deg] origin-center">
        <Column columnId={0} offset={0} setRef={(el) => (columnRefs.current[0] = el)} />
        <Column columnId={1} offset={2} setRef={(el) => (columnRefs.current[1] = el)} />
        <Column columnId={2} offset={4} setRef={(el) => (columnRefs.current[2] = el)} />
        <Column columnId={3} offset={1} setRef={(el) => (columnRefs.current[3] = el)} />
        <div className="hidden lg:block">
          <Column columnId={4} offset={3} setRef={(el) => (columnRefs.current[4] = el)} />
        </div>
      </div>
      <FilmOverlays />
    </div>
  );
};
