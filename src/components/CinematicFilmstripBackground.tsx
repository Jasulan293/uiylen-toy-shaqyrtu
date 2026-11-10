import React from 'react';
import React from 'react';

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

interface ColumnStripProps {
  photos: string[];
  columnId: number;
}

const ColumnStrip: React.FC<ColumnStripProps> = ({ photos, columnId }) => {
  return (
    <div className="flex flex-col gap-4 sm:gap-6 shrink-0 w-44 sm:w-56 md:w-64">
      {photos.map((url, idx) => (
        <div
          key={`col-${columnId}-item-${idx}`}
          className="relative rounded-2xl overflow-hidden bg-black/90 p-2 sm:p-2.5 shadow-2xl border border-black/40 group shrink-0"
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
            <img
              src={url}
              alt="Той сәті"
              className="w-full h-full object-cover filter contrast-[1.08] brightness-90 saturate-[1.05]"
              loading="lazy"
              referrerPolicy="no-referrer"
            />
            {/* Subtle vintage film vignette */}
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
  // Keep the decorative filmstrip static: scroll-linked blur/transform animations
  // caused repaint flicker and unnecessary work on laptop GPUs.
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none opacity-55 sm:opacity-60"
      style={{ transform: 'translate3d(0,0,0)', backfaceVisibility: 'hidden' }}
    >
      <div className="absolute -inset-x-32 -inset-y-48 flex justify-center items-start gap-4 sm:gap-6 md:gap-8 -rotate-[13deg] origin-center">
        <ColumnStrip columnId={0} photos={getColumnPhotos(0)} />
        <ColumnStrip columnId={1} photos={getColumnPhotos(2)} />
        <ColumnStrip columnId={2} photos={getColumnPhotos(4)} />
        <div className="hidden xl:block">
          <ColumnStrip columnId={3} photos={getColumnPhotos(1)} />
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-[#FBFBFD]/40 via-transparent to-[#FBFBFD]/50 pointer-events-none" />
    </div>
  );
};
