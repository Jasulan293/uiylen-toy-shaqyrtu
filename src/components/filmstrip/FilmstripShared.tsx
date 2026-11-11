import React from 'react';

// Static pieces shared by BOTH platform files (no scroll logic here).

// Couple's own photos (stored in /public/photos, 4:3 crops, served as static files)
export const WEDDING_PHOTOS = [
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
export const getColumnPhotos = (offset: number) => {
  const result: string[] = [];
  for (let i = 0; i < 9; i++) {
    result.push(WEDDING_PHOTOS[(i + offset) % WEDDING_PHOTOS.length]);
  }
  return result;
};

const Sprockets: React.FC<{ position: 'top' | 'bottom' }> = ({ position }) => (
  <div className={`flex items-center justify-between px-1 opacity-50 ${position === 'top' ? 'mb-1.5' : 'mt-1.5'}`}>
    {Array.from({ length: 5 }).map((_, i) => (
      <span
        key={i}
        className="w-2 h-1.5 rounded-xs bg-[#FBFBFD]/40 border border-black/30 inline-block"
      />
    ))}
  </div>
);

interface FilmCardProps {
  url: string;
  idx: number;
  columnId: number;
}

// One film frame. No CSS filter, no big shadow: both are very expensive on moving layers.
export const FilmCard: React.FC<FilmCardProps> = ({ url, idx, columnId }) => (
  <div className="relative rounded-2xl overflow-hidden bg-black/90 p-2 sm:p-2.5 border border-black/40 shrink-0">
    <Sprockets position="top" />

    <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-black/60 border border-white/10">
      <img
        src={url}
        alt=""
        className="w-full h-full object-cover"
        loading="eager"
        decoding="async"
        draggable={false}
        referrerPolicy="no-referrer"
      />
      {/* Slight darkening (replaces brightness-90) + vintage vignette */}
      <div className="absolute inset-0 bg-black/10 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30 pointer-events-none" />

      <div className="absolute bottom-1.5 left-2 right-2 flex items-center justify-between text-[7px] font-mono tracking-widest text-white/80 uppercase">
        <span>PORTRA 400</span>
        <span className="text-[#C5A880]">▲ 0{((idx + columnId) % 9) + 1}</span>
      </div>
    </div>

    <Sprockets position="bottom" />
  </div>
);

// Replaces the old container opacity (0.60 / 0.70 / 0.75): same look, but a static overlay
// is much cheaper than group opacity on moving layers.
export const FilmOverlays: React.FC = () => (
  <>
    <div className="absolute inset-0 bg-[#FBFBFD] opacity-40 sm:opacity-30 md:opacity-25 pointer-events-none" />
    <div className="absolute inset-0 bg-gradient-to-b from-[#FBFBFD]/40 via-transparent to-[#FBFBFD]/50 pointer-events-none" />
  </>
);
