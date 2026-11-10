import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles } from 'lucide-react';

interface LoadingScreenProps {
  monogram: string;
  onComplete: () => void;
}

const DURATION_MS = 2000; // прогресс ұзақтығы
const HOLD_MS = 250;      // 100% көрсетілгеннен кейінгі үзіліс

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ monogram, onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    const start = performance.now();
    let raf = 0;
    let holdTimer: ReturnType<typeof setTimeout>;
    let doneTimer: ReturnType<typeof setTimeout>;

    const tick = (now: number) => {
      const t = Math.min((now - start) / DURATION_MS, 1);
      const eased = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
      setProgress(Math.round(eased * 100));

      if (t < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        holdTimer = setTimeout(() => {
          setIsVisible(false);
          doneTimer = setTimeout(() => onCompleteRef.current(), 600);
        }, HOLD_MS);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(holdTimer);
      clearTimeout(doneTimer);
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="loader-curtain"
          initial={{ y: 0 }}
          exit={{ y: '-100%' }}
          transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#FBFBFD] text-[#1D1D1F] select-none"
        >
          {/* Subtle ambient luxury light in background */}
          <div className="absolute w-96 h-96 rounded-full bg-[#EADBCE]/30 blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center text-center px-6">
            {/* Animated Monogram */}
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="relative mb-6"
            >
              <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full border border-black/[0.08] bg-white shadow-[0_8px_30px_rgba(0,0,0,0.04)] flex items-center justify-center">
                <span className="font-serif-luxury text-2xl sm:text-3xl font-normal text-[#1D1D1F] tracking-normal leading-none whitespace-nowrap">
                  {monogram}
                </span>
              </div>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                className="absolute -inset-1.5 border border-[#C5A880]/30 rounded-full border-dashed pointer-events-none"
              />
            </motion.div>

            {/* Subtitle */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-center gap-1.5 text-xs uppercase tracking-[0.25em] text-[#86868B] font-medium mb-8"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
              <span>Үйлену тойына шақырту</span>
            </motion.div>

            {/* Apple style minimal Progress Line & Tabular Percent */}
            <div className="w-48 sm:w-56 h-[2px] bg-black/[0.06] rounded-full overflow-hidden mb-3 relative">
              <motion.div
                className="h-full bg-[#1D1D1F]"
                style={{ width: `${progress}%` }}
                transition={{ ease: 'easeOut', duration: 0.1 }}
              />
            </div>

            <div className="font-mono text-xs tabular-nums text-[#86868B] tracking-wider">
              {progress}%
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
