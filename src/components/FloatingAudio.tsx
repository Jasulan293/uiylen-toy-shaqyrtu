import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { romanticAudio } from '../utils/audioEngine';

export const FloatingAudio: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  useEffect(() => {
    const unsub = romanticAudio.subscribe((playing) => {
      setIsPlaying(playing);
    });
    return () => unsub();
  }, []);

  const handleToggle = () => {
    romanticAudio.toggle();
  };

  return (
    <button
      onClick={handleToggle}
      type="button"
      aria-label={isPlaying ? 'Музыканы өшіру' : 'Музыканы қосу'}
      title={isPlaying ? 'Музыканы өшіру' : 'Музыканы қосу'}
      className={`fixed top-4 right-4 z-40 w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 shadow-sm cursor-pointer border ${
        isPlaying
          ? 'bg-[#1D1D1F] text-white border-[#1D1D1F] shadow-md scale-105'
          : 'bg-white/80 backdrop-blur-md text-[#1D1D1F] border-black/[0.08] hover:bg-white hover:scale-105'
      }`}
    >
      {isPlaying ? (
        <span className="relative flex items-center justify-center">
          <Volume2 className="w-4 h-4 text-emerald-400" />
          <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
        </span>
      ) : (
        <VolumeX className="w-4 h-4 opacity-70" />
      )}
    </button>
  );
};
