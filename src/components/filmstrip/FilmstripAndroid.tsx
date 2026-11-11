import React from 'react';
import { FilmCard, FilmOverlays, getColumnPhotos } from './FilmstripShared';
import './filmstrip-android.css';

/**
 * Android / Chrome / desktop-Chromium version.
 * NO JavaScript scroll handling at all: the motion is a CSS scroll-driven animation
 * (see filmstrip-android.css). Do not mix this file with the iOS one.
 */

interface ColumnProps {
  columnId: number;
  offset: number;
}

const Column: React.FC<ColumnProps> = ({ columnId, offset }) => (
  <div
    style={{ willChange: 'transform', backfaceVisibility: 'hidden' }}
    className={`film-col film-col-${columnId} flex flex-col gap-4 sm:gap-6 shrink-0 w-44 sm:w-56 md:w-64`}
  >
    {getColumnPhotos(offset).map((url, idx) => (
      <FilmCard key={`col-${columnId}-item-${idx}`} url={url} idx={idx} columnId={columnId} />
    ))}
  </div>
);

export const FilmstripAndroid: React.FC = () => (
  <div
    aria-hidden="true"
    className="film-android fixed top-0 left-0 w-full h-lvh pointer-events-none overflow-hidden z-0 select-none"
    style={{ contain: 'strict' }}
  >
    <div className="absolute -inset-x-32 -inset-y-48 flex justify-center items-start gap-4 sm:gap-6 md:gap-8 transform -rotate-[13deg] origin-center">
      <Column columnId={0} offset={0} />
      <Column columnId={1} offset={2} />
      <Column columnId={2} offset={4} />
      <Column columnId={3} offset={1} />
      <div className="hidden lg:block">
        <Column columnId={4} offset={3} />
      </div>
    </div>
    <FilmOverlays />
  </div>
);
