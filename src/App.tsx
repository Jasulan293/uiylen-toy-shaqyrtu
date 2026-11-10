/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { WeddingData, RSVPRecord, GuestWish } from './types';
import { INITIAL_WEDDING_DATA, INITIAL_WISHES } from './data/initialData';
import { FloatingAudio } from './components/FloatingAudio';
import { LoadingScreen } from './components/LoadingScreen';
import { CinematicFilmstripBackground } from './components/CinematicFilmstripBackground';
import { HeroSection } from './components/HeroSection';
import { CountdownSection } from './components/CountdownSection';
import { LoveStorySection } from './components/LoveStorySection';
import { VenueSection } from './components/VenueSection';
import { RsvpSection } from './components/RsvpSection';
import { WishesSection } from './components/WishesSection';
import { Footer } from './components/Footer';
import { EditModal } from './components/EditModal';

const STORAGE_KEY_DATA = 'wedding_invitation_data_v2';
const STORAGE_KEY_RSVP = 'wedding_rsvp_records_v1';
const STORAGE_KEY_WISHES = 'wedding_guest_wishes_v1';

export default function App() {
  const [data, setData] = useState<WeddingData>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_DATA);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.groomName === 'Отабек' || !parsed.groomName) {
          parsed.groomName = 'Жасұлан';
          parsed.brideName = 'Шырайлы';
          parsed.monogram = 'Ж & Ш';
          parsed.time = '19:00';
        }
        return {
          ...INITIAL_WEDDING_DATA,
          ...parsed,
          heroImage: parsed.heroImage?.startsWith('/src/assets/') ? INITIAL_WEDDING_DATA.heroImage : parsed.heroImage || INITIAL_WEDDING_DATA.heroImage,
          ringsImage: parsed.ringsImage?.startsWith('/src/assets/') ? INITIAL_WEDDING_DATA.ringsImage : parsed.ringsImage || INITIAL_WEDDING_DATA.ringsImage,
          venueImage: parsed.venueImage?.startsWith('/src/assets/') ? INITIAL_WEDDING_DATA.venueImage : parsed.venueImage || INITIAL_WEDDING_DATA.venueImage,
        };
      }
    } catch {
      // ignore
    }
    return INITIAL_WEDDING_DATA;
  });

  const [rsvpList, setRsvpList] = useState<RSVPRecord[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_RSVP);
      if (saved) {
        const records = JSON.parse(saved) as RSVPRecord[];
        // Remove starter/demo entries; keep only real guest submissions.
        return records.filter((record) => !record.id.startsWith('sample-'));
      }
    } catch {
      // ignore
    }
    return [];
  });

  const [wishes, setWishes] = useState<GuestWish[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_WISHES);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return INITIAL_WISHES;
  });

  const [isEditOpen, setIsEditOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Sync state to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_DATA, JSON.stringify(data));
    } catch {
      // ignore
    }
  }, [data]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_RSVP, JSON.stringify(rsvpList));
    } catch {
      // ignore
    }
  }, [rsvpList]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_WISHES, JSON.stringify(wishes));
    } catch {
      // ignore
    }
  }, [wishes]);

  // Format date to Kazakh format (e.g. 19 қыркүйек 2026 жыл)
  const getFormattedDate = (dateStr: string) => {
    try {
      const [year, month, day] = dateStr.split('-');
      const months = [
        'қаңтар',
        'ақпан',
        'наурыз',
        'сәуір',
        'мамыр',
        'маусым',
        'шілде',
        'тамыз',
        'қыркүйек',
        'қазан',
        'қараша',
        'желтоқсан',
      ];
      const mIdx = parseInt(month, 10) - 1;
      return `${parseInt(day, 10)} ${months[mIdx] || ''} ${year} жыл`;
    } catch {
      return dateStr;
    }
  };

  const handleSaveData = (newData: WeddingData) => {
    setData(newData);
  };

  const handleResetData = () => {
    setData(INITIAL_WEDDING_DATA);
    localStorage.removeItem(STORAGE_KEY_DATA);
  };

  const handleAddRSVP = (record: RSVPRecord) => {
    setRsvpList((prev) => [record, ...prev]);
  };

  const handleAddWish = (wish: GuestWish) => {
    setWishes((prev) => [wish, ...prev]);
  };

  const handleLikeWish = (id: string) => {
    setWishes((prev) =>
      prev.map((w) => (w.id === id ? { ...w, likes: w.likes + 1 } : w))
    );
  };

  const formattedDate = getFormattedDate(data.date);

  return (
    <div className="relative min-h-screen bg-[#FBFBFD] text-[#1D1D1F] selection:bg-[#C5A880]/30 selection:text-[#1D1D1F] overflow-x-hidden">
      {/* Loading Reveal Curtain (michelleandtonye.com style) */}
      {isLoading && (
        <LoadingScreen
          monogram={data.monogram}
          onComplete={() => setIsLoading(false)}
        />
      )}

      {/* Living Cinematic 35mm Filmstrip Background with Scroll Parallax */}
      <CinematicFilmstripBackground />

      {/* Minimal Floating Audio Toggle */}
      <FloatingAudio />

      <main className="relative z-10">
        {/* 1. Hero Presentation */}
        <HeroSection data={data} formattedDate={formattedDate} />

        {/* 2. Live Countdown & Calendar export */}
        <CountdownSection data={data} formattedDate={formattedDate} />

        {/* 3. Love Story Narrative & Editorial Rings */}
        <LoveStorySection data={data} />

        {/* 4. Venue & Direct 2GIS / Yandex / Google Maps Navigation */}
        <VenueSection data={data} />

        {/* 7. Interactive RSVP Confirmation Form */}
        <RsvpSection
          data={data}
          onAddRSVP={handleAddRSVP}
          rsvpList={rsvpList}
        />

        {/* 8. Heartfelt Guest Wishes Book */}
        <WishesSection
          wishes={wishes}
          onAddWish={handleAddWish}
          onLikeWish={handleLikeWish}
        />
      </main>

      {/* 9. Minimalist Footer */}
      <Footer data={data} onOpenEdit={() => setIsEditOpen(true)} />

      {/* 10. Direct Wedding Configuration Editor Modal */}
      <EditModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        data={data}
        onSave={handleSaveData}
        onReset={handleResetData}
      />
    </div>
  );
}
