import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, SlidersHorizontal, Calendar, MapPin, HeartHandshake, BookOpen } from 'lucide-react';
import { romanticAudio } from '../utils/audioEngine';

interface NavbarProps {
  monogram: string;
  onOpenEdit: () => void;
  rsvpCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({ monogram, onOpenEdit }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);

  useEffect(() => {
    const unsub = romanticAudio.subscribe((playing) => {
      setIsPlaying(playing);
    });

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      unsub();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleToggleAudio = () => {
    romanticAudio.toggle();
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-3 pointer-events-none transition-all duration-300">
      <div
        className={`pointer-events-auto w-full max-w-5xl flex items-center justify-between gap-4 md:gap-8 px-5 py-3 rounded-2xl transition-all duration-300 ${
          scrolled
            ? 'bg-white/85 backdrop-blur-xl border border-black/[0.08] shadow-[0_8px_30px_rgb(0,0,0,0.06)]'
            : 'bg-white/60 backdrop-blur-md border border-black/[0.05]'
        }`}
      >
        {/* Zone 1: Monogram brand */}
        <a
          href="#hero"
          className="font-serif-luxury text-xl md:text-2xl font-semibold tracking-wide text-[#1D1D1F] hover:opacity-80 transition-opacity whitespace-nowrap shrink-0"
        >
          {monogram}
        </a>

        {/* Zone 2: Navigation Links (Single line text with subtle hover) */}
        <nav className="hidden md:flex items-center gap-6 text-xs tracking-wider uppercase font-medium text-[#86868B]">
          <a href="#countdown" className="hover:text-[#1D1D1F] transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" />
            <span>Уақыты</span>
          </a>
          <a href="#schedule" className="hover:text-[#1D1D1F] transition-colors whitespace-nowrap shrink-0">
            Бағдарлама
          </a>
          <a href="#dresscode" className="hover:text-[#1D1D1F] transition-colors whitespace-nowrap shrink-0">
            Дресс-код
          </a>
          <a href="#venue" className="hover:text-[#1D1D1F] transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5" />
            <span>Мекенжай</span>
          </a>
          <a href="#rsvp" className="hover:text-[#1D1D1F] transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5">
            <HeartHandshake className="w-3.5 h-3.5" />
            <span>RSVP</span>
          </a>
          <a href="#wishes" className="hover:text-[#1D1D1F] transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Тілектер</span>
          </a>
        </nav>

        {/* Zone 3: Audio Player toggle & Edit customizer button */}
        <div className="flex items-center gap-2.5 shrink-0">
          {/* Audio toggle button with Apple equalizer */}
          <button
            onClick={handleToggleAudio}
            type="button"
            aria-label={isPlaying ? 'Музыканы өшіру' : 'Музыканы қосу'}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 cursor-pointer ${
              isPlaying
                ? 'bg-[#1D1D1F] text-white shadow-sm'
                : 'bg-black/[0.04] text-[#1D1D1F] hover:bg-black/[0.08]'
            }`}
          >
            {isPlaying ? (
              <>
                <Volume2 className="w-3.5 h-3.5 text-emerald-400" />
                <span className="hidden sm:inline">Сазды әуен</span>
                {/* Dynamic animated equalizer bars */}
                <span className="flex items-end gap-0.5 h-3 w-3">
                  <span className="w-0.5 bg-emerald-400 rounded-full h-full animate-[pulse_0.8s_ease-in-out_infinite]" />
                  <span className="w-0.5 bg-emerald-400 rounded-full h-2/3 animate-[pulse_0.6s_ease-in-out_infinite_0.2s]" />
                  <span className="w-0.5 bg-emerald-400 rounded-full h-4/5 animate-[pulse_0.9s_ease-in-out_infinite_0.4s]" />
                </span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5 opacity-60" />
                <span className="hidden sm:inline">Музыканы қосу</span>
              </>
            )}
          </button>

          {/* Quick Edit Drawer Button */}
          <button
            onClick={onOpenEdit}
            type="button"
            aria-label="Той деректерін өңдеу"
            title="Той деректерін өңдеу (есімдер, күн, мейрамхана)"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-black/[0.04] text-[#1D1D1F] hover:bg-black/[0.08] transition-colors cursor-pointer"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#86868B]" />
            <span className="hidden sm:inline">Өңдеу</span>
          </button>
        </div>
      </div>
    </header>
  );
};
