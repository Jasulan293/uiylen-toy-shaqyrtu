import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Calendar, Clock, MapPin, Sparkles } from 'lucide-react';
import { WeddingData } from '../types';
import { KineticTypography } from './KineticTypography';

interface HeroSectionProps {
  data: WeddingData;
  formattedDate: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ data, formattedDate }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Parallax scroll hooks
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const photoY = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);
  const photoScale = useTransform(scrollYProgress, [0, 1], [1, 1.06]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.35], [1, 0.15]);

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-gradient-to-b from-[#F5EFE6]/60 via-transparent to-transparent blur-3xl pointer-events-none -z-10" />

      {/* Floating subtle ambient particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
        <motion.div
          animate={{
            y: [-10, 15, -10],
            x: [-5, 10, -5],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-24 left-10 w-2 h-2 rounded-full bg-[#C5A880]/40 blur-xs"
        />
        <motion.div
          animate={{
            y: [10, -15, 10],
            x: [5, -10, 5],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="absolute top-48 right-12 w-2.5 h-2.5 rounded-full bg-[#EADBCE]/50 blur-xs"
        />
      </div>

      {/* 1. First Screen: Pure Minimalist Editorial Entrance with ONLY Groom & Bride Names */}
      <div className="h-[100dvh] min-h-[100dvh] flex flex-col items-center justify-center text-center w-full max-w-4xl mx-auto px-4 relative">
        <motion.div
          style={{ opacity: textOpacity }}
          className="w-full flex flex-col items-center justify-center my-auto"
        >
          {/* Kinetic Typography showcasing the couple */}
          <KineticTypography
            groomName={data.groomName}
            brideName={data.brideName}
          />
        </motion.div>
      </div>

      {/* 2. Scroll Reveal Section: "Үйлену тойына шақыру", Date, Photo & Invitation Details */}
      <motion.div
        id="invitation-reveal"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-4xl mx-auto flex flex-col items-center text-center pt-12 pb-20 px-4"
      >
        {/* Unified Luxury Invitation Details Card */}
        <div className="glass-card w-full max-w-md mx-auto rounded-2xl p-4 sm:p-5 mb-6 text-center">
          <div className="inline-flex items-center gap-2 text-[11px] sm:text-xs tracking-[0.2em] uppercase text-[#1D1D1F] font-semibold mb-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
            <span>Үйлену тойына шақыру</span>
          </div>
          <div className="text-[11px] uppercase tracking-widest text-[#86868B] font-medium mb-3">
            {data.city}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 pt-3 border-t border-black/[0.06] text-[11px] sm:text-xs text-[#1D1D1F]">
            <span className="flex items-center gap-1.5 font-semibold">
              <Calendar className="w-3.5 h-3.5 text-[#C5A880]" />
              {formattedDate}
            </span>
            <span className="text-black/20" aria-hidden="true">|</span>
            <span className="flex items-center gap-1.5 font-semibold">
              <Clock className="w-3.5 h-3.5 text-[#C5A880]" />
              {data.time}
            </span>
            <span className="text-black/20" aria-hidden="true">|</span>
            <span className="flex items-center gap-1.5 font-semibold">
              <MapPin className="w-3.5 h-3.5 text-[#C5A880]" />
              {data.venueName}
            </span>
          </div>
        </div>

        {/* Hero Editorial Image with Smooth Scroll Parallax */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 25 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="w-full relative rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.08)] border border-black/[0.06] bg-neutral-100 aspect-[16/9] md:aspect-[21/9]"
        >
          <motion.div
            style={{ y: photoY, scale: photoScale }}
            className="w-full h-full"
          >
            <img
              src={data.heroImage}
              alt={`${data.groomName} және ${data.brideName}`}
              className="w-full h-full object-cover object-center filter saturate-[1.02]"
              referrerPolicy="no-referrer"
            />
          </motion.div>

          {/* Subtle bottom gradient scrim */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent pointer-events-none" />

          <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between text-white/95 text-xs md:text-sm pointer-events-none">
            <span className="font-serif-luxury text-base md:text-lg italic tracking-wide">
              {data.groomName} & {data.brideName} — Бірлескен өмірдің басы
            </span>
            <span className="opacity-80 tabular-nums font-mono">{data.date}</span>
          </div>
        </motion.div>

        {/* Warm invitation statement in frosted glass card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="glass-card mt-6 max-w-lg px-5 py-5 rounded-2xl mx-4"
        >
          <p className="font-serif-luxury text-xl md:text-2xl text-[#1D1D1F] italic leading-snug mb-2">
            «{data.heroHeadline}»
          </p>
          <p className="text-xs md:text-sm text-[#424245] leading-snug">
            {data.invitationText}
          </p>
          <p className="mt-3 text-[11px] md:text-xs font-semibold tracking-wide text-[#86868B]">
            {data.parentsText}
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
};
