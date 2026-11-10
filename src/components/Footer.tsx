import React from 'react';
import { WeddingData } from '../types';

interface FooterProps {
  data: WeddingData;
  onOpenEdit?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ data, onOpenEdit }) => {
  return (
    <footer className="py-20 px-4 bg-transparent relative z-10 text-center">
      <div className="glass-card max-w-xl mx-auto flex flex-col items-center py-5 px-5 rounded-2xl">
        {/* Monogram & Names */}
        <div className="font-serif-luxury text-3xl md:text-4xl font-normal text-[#1D1D1F] mb-2">
          {data.groomName} & {data.brideName}
        </div>

        <p className="font-serif-luxury text-base md:text-lg text-[#86868B] italic max-w-md">
          «Сіздермен бірге бақытымыз еселене түспек»
        </p>

        {onOpenEdit && (
          <button
            onClick={onOpenEdit}
            type="button"
            className="mt-6 text-xs text-[#A1A1A6] hover:text-[#1D1D1F] transition-colors cursor-pointer"
          >
            Той деректерін өңдеу
          </button>
        )}
      </div>
    </footer>
  );
};
