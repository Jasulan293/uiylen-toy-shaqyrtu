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

    const stopMusic = () => audio.pause();
    startMusic();
    // If autoplay is blocked, start after the visitor's first interaction.
    document.addEventListener('pointerdown', startMusic, { once: true });
    document.addEventListener('keydown', startMusic, { once: true });
    window.addEventListener('pagehide', stopMusic);
    return () => {
      document.removeEventListener('pointerdown', startMusic);
      document.removeEventListener('keydown', startMusic);
      window.removeEventListener('pagehide', stopMusic);
      audio.pause();
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
