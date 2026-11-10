import React, { useState } from 'react';
import { motion } from 'motion/react';
import { MapPin, Navigation, Copy, Check } from 'lucide-react';
import { WeddingData } from '../types';

interface VenueSectionProps {
  data: WeddingData;
}

export const VenueSection: React.FC<VenueSectionProps> = ({ data }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyAddress = () => {
    const fullText = `${data.venueName}, ${data.venueAddress}, ${data.city}`;
    navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="venue" className="py-16 px-4 bg-transparent relative z-10">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8 flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6 }}
            className="glass-card py-2.5 px-5 rounded-xl"
          >
            <h2 className="font-serif-luxury text-2xl sm:text-3xl md:text-4xl text-[#1D1D1F] tracking-tight flex items-center justify-center gap-2">
              <MapPin className="w-5 h-5 text-[#C5A880]" />
              <span>Салтанат Орны</span>
            </h2>
          </motion.div>
        </div>

        {/* Apple Style Venue Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          {/* Venue Image */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 rounded-2xl overflow-hidden shadow-[0_12px_40px_rgba(0,0,0,0.06)] border border-black/[0.06] relative min-h-[220px] lg:min-h-[320px] bg-neutral-100"
          >
            <img
              src={data.venueImage}
              alt={data.venueName}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent pointer-events-none" />
            <div className="absolute bottom-5 left-5 right-5 text-white">
              <span className="text-xs uppercase tracking-widest text-[#EADBCE] font-medium block mb-1">
                Салтанат Сарайы
              </span>
              <h3 className="font-serif-luxury text-2xl md:text-3xl font-normal">
                {data.venueName}
              </h3>
              <p className="text-xs md:text-sm text-white/80 mt-1 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#EADBCE]" />
                {data.venueAddress}, {data.city}
              </p>
            </div>
          </motion.div>

          {/* Location Actions & Navigation Cards */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="glass-card lg:col-span-5 flex flex-col justify-between rounded-2xl p-4 md:p-5"
          >
            <div>
              <div className="flex items-start justify-between gap-3 pb-4 border-b border-black/[0.06]">
                <div>
                  <h4 className="text-base font-semibold text-[#1D1D1F] tracking-tight">
                    {data.venueName}
                  </h4>
                  <p className="text-xs md:text-sm text-[#6E6E73] mt-0.5">
                    {data.venueAddress}, {data.city}
                  </p>
                </div>
                <button
                  onClick={handleCopyAddress}
                  type="button"
                  aria-label="Мекенжайды көшіру"
                  className="p-1.5 rounded-xl border border-black/[0.08] hover:bg-neutral-50 text-[#86868B] hover:text-[#1D1D1F] transition-colors shrink-0"
                  title="Мекенжайды көшіру"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Navigation: compact 2GIS icon button */}
            <div className="mt-4 pt-4 border-t border-black/[0.06] flex items-center justify-between gap-3">
              <span className="text-[11px] font-medium text-[#86868B] uppercase tracking-wider">
                Навигация
              </span>

              <a
                href={data.mapGisUrl}
                target="_blank"
                rel="noreferrer"
                aria-label="2GIS арқылы маршрут ашу"
                title="2GIS арқылы маршрут ашу"
                className="inline-flex items-center gap-2 pl-1.5 pr-3.5 py-1.5 rounded-full bg-[#008A27] hover:bg-[#007A22] active:scale-95 text-white text-xs font-semibold shadow-sm transition-all cursor-pointer"
              >
                <span className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                  <Navigation className="w-4 h-4" />
                </span>
                2GIS
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
