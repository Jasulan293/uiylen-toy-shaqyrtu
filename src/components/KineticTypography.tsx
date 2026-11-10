import React, { useState } from 'react';
import { motion } from 'motion/react';

interface KineticTypographyProps {
  groomName: string;
  brideName: string;
}

interface LetterProps {
  char: string;
  index: number;
}

const InteractiveLetter: React.FC<LetterProps> = ({ char, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  // Random slight rotation offset on hover for organic, playful kinetic feel (like michelleandtonye.com)
  const randomRotate = (index % 2 === 0 ? 1 : -1) * ((index % 3) * 3 + 4);

  return (
    <motion.span
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={() => setIsHovered(true)}
      onTouchEnd={() => setTimeout(() => setIsHovered(false), 300)}
      animate={
        isHovered
          ? {
              y: -14,
              scale: 1.18,
              rotate: randomRotate,
              color: '#C5A880',
              textShadow: '0 0 12px rgba(236, 240, 248, 1), 0 0 28px rgba(205, 212, 226, 0.8), 0 0 52px rgba(190, 199, 217, 0.55)',
            }
          : {
              y: 0,
              scale: 1,
              rotate: 0,
              color: '#1D1D1F',
              textShadow: '0 0 8px rgba(226, 231, 240, 0.9), 0 0 18px rgba(205, 212, 226, 0.65), 0 0 38px rgba(190, 199, 217, 0.45)',
            }
      }
      transition={{
        type: 'spring',
        stiffness: 450,
        damping: 17,
        mass: 0.8,
      }}
      className="inline-block cursor-pointer select-none font-serif-luxury font-normal transition-colors"
      style={{ willChange: 'transform' }}
    >
      {char}
    </motion.span>
  );
};

export const KineticTypography: React.FC<KineticTypographyProps> = ({
  groomName,
  brideName,
}) => {
  const [waveActive, setWaveActive] = useState(false);

  const triggerMobileWave = () => {
    setWaveActive(true);
    setTimeout(() => setWaveActive(false), 1200);
  };

  return (
    <div
      onClick={triggerMobileWave}
      className="relative flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 md:gap-6 lg:gap-8 my-auto text-center select-none py-4"
    >
      {/* Groom Name */}
      <div className="inline-flex items-center tracking-tight sm:tracking-wide text-5xl sm:text-6xl md:text-7xl lg:text-8xl drop-shadow-xs">
        {groomName.split('').map((char, i) => (
          <InteractiveLetter key={`groom-${i}`} char={char} index={i} />
        ))}
      </div>

      {/* Luxury Ampersand & with gentle pulse */}
      <motion.div
        animate={
          waveActive
            ? { scale: [1, 1.3, 1], rotate: [0, 15, -15, 0] }
            : { scale: 1, rotate: 0 }
        }
        whileHover={{ scale: 1.25, rotate: 10, color: '#1D1D1F' }}
        transition={{ type: 'spring', stiffness: 400, damping: 15 }}
        className="flex items-center justify-center"
      >
        <span
          style={{ textShadow: '0 0 8px rgba(226, 231, 240, 0.9), 0 0 18px rgba(205, 212, 226, 0.65), 0 0 38px rgba(190, 199, 217, 0.45)' }}
          className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#C5A880] italic font-light px-2 select-none leading-none"
        >
          &
        </span>
      </motion.div>

      {/* Bride Name */}
      <div className="inline-flex items-center tracking-tight sm:tracking-wide text-5xl sm:text-6xl md:text-7xl lg:text-8xl drop-shadow-xs">
        {brideName.split('').map((char, i) => (
          <InteractiveLetter key={`bride-${i}`} char={char} index={i + 10} />
        ))}
      </div>
    </div>
  );
};
