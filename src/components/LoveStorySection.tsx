import React from 'react';
import { motion } from 'motion/react';
import { Heart, Sparkles, Feather } from 'lucide-react';
import { WeddingData } from '../types';

interface LoveStorySectionProps {
  data: WeddingData;
}

export const LoveStorySection: React.FC<LoveStorySectionProps> = ({ data }) => {
  return (
    <section id="story" className="py-16 px-4 bg-transparent relative z-10">
      <div className="max-w-5xl mx-auto">
        {/* Apple Bento 2-column showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Rings Editorial Imagery */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 relative"
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              className="relative rounded-3xl overflow-hidden shadow-[0_12px_40px_rgba(0,0,0,0.06)] border border-black/[0.06] aspect-[4/3] bg-neutral-100 group"
            >
              <img
                src={data.ringsImage}
                alt="Неке жүзіктері"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-5 right-5 flex items-center justify-between text-white text-xs">
                <span className="font-serif-luxury text-sm tracking-wider italic">
                  Мәңгілік адалдық серті
                </span>
                <Sparkles className="w-4 h-4 text-[#EADBCE]" />
              </div>
            </motion.div>

            {/* Decorative subtle corner emblem */}
            <div className="glass-card absolute -bottom-4 -right-4 hidden sm:flex items-center gap-2 px-4 py-2.5 rounded-2xl">
              <Heart className="w-4 h-4 text-[#C5A880] fill-[#C5A880]" />
              <span className="text-xs font-serif-luxury text-[#1D1D1F] italic">
                {data.monogram}
              </span>
            </div>
          </motion.div>

          {/* Right Column: Narrative Story in frosted glass card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="glass-card lg:col-span-6 flex flex-col justify-center p-4 sm:p-5 md:p-6 rounded-2xl"
          >
            <div className="inline-flex items-center gap-1.5 text-xs font-medium tracking-widest text-[#86868B] uppercase mb-3">
              <Feather className="w-3.5 h-3.5 text-[#C5A880]" />
              <span>Біздің Махаббат Хикаямыз</span>
            </div>

            <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl text-[#1D1D1F] leading-tight mb-6">
              «Жүректер тоғысқан сәттен мәңгілікке дейін»
            </h2>

            <p className="font-serif-luxury text-lg text-[#424245] italic leading-relaxed mb-6 border-l-2 border-[#C5A880] pl-4">
              «Махаббат — бұл бір-біріне қарау емес, екеуі бір бағытқа көз тігіп, бір арманмен қол ұстасып өмір сүру.»
            </p>

            <p className="text-sm md:text-base text-[#6E6E73] leading-relaxed mb-4">
              Біз үшін ең үлкен бақыт — осы тарихи қадамды бізді жақсы көретін, әрдайым қолдау білдіретін ең жақын жандарымызбен, яғни Сіздермен бірге атап өту.
            </p>

            <p className="text-sm md:text-base text-[#6E6E73] leading-relaxed">
              Ата-баба салтымен, ақ ниетті батамен басталатын жаңа шаңырағымыздың ашылу сәтіне куә болып, дастарханымыздың қадірлі қонағы болыңыздар!
            </p>

            <div className="mt-8 pt-6 border-t border-black/[0.06] flex items-center justify-between">
              <div>
                <span className="text-xs text-[#86868B] block">Ізгі құрметпен,</span>
                <span className="font-serif-luxury text-xl text-[#1D1D1F] font-semibold">
                  {data.groomName} & {data.brideName}
                </span>
              </div>
              <div className="text-right">
                <span className="text-xs text-[#86868B] block">Салтанат орны</span>
                <span className="text-xs md:text-sm font-medium text-[#1D1D1F]">
                  {data.venueName}
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
