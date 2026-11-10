import React, { useEffect, useRef } from 'react';

export const FloatingAudio: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Try autoplay as soon as the invitation page opens.
    const startMusic = () => {
      if (audio.paused) {
        audio.play().catch(() => {
          // Browsers may block audible autoplay until the visitor interacts.
        });
      }
    };

    startMusic();
    // If autoplay is blocked, start silently in the background on the visitor's
    // first tap/click/key press anywhere on the page (no music button needed).
    document.addEventListener('pointerdown', startMusic, { once: true });
    document.addEventListener('keydown', startMusic, { once: true });
    return () => {
      document.removeEventListener('pointerdown', startMusic);
      document.removeEventListener('keydown', startMusic);
    };
  }, []);

  return (
    <audio
      ref={audioRef}
      src="/music/bolashaq-kelinshegim.mp3"
      preload="auto"
      autoPlay
      loop
    />
  );
};
