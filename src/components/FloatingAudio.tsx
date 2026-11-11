import React, { useEffect, useRef } from 'react';

export const FloatingAudio: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // The music is wanted whenever the invitation is on screen.
    const wantPlaying = true;

    const isBackground = () => document.hidden || document.visibilityState === 'hidden';

    const tryPlay = () => {
      if (!wantPlaying || isBackground() || !audio.paused) return;
      audio.play().catch(() => {
        // Autoplay blocked: it will start on the first tap/click (see below).
      });
    };

    const stopMusic = () => {
      if (!audio.paused) audio.pause();
    };

    // ---- 1. Start / restart on user gestures -------------------------------------------
    // iOS needs touchend/click (pointerdown does not unlock audio). Listeners stay for the
    // whole life of the page, so any tap restarts the music if it was paused by a blur.
    const onGesture = () => tryPlay();
    const gestureEvents = ['touchend', 'click', 'keydown'] as const;
    gestureEvents.forEach((e) => document.addEventListener(e, onGesture, { passive: true }));

    // ---- 2. Stop when the page / browser / app goes away -------------------------------
    const onVisibilityChange = () => {
      if (isBackground()) stopMusic();
      else tryPlay();
    };
    const onPageHide = () => {
      stopMusic();
      audio.currentTime = 0;
    };
    const onPageShow = () => tryPlay(); // also covers back/forward cache restore
    const onBlur = () => stopMusic(); // window lost focus (app switched, notification shade, etc.)
    const onFocus = () => tryPlay();

    document.addEventListener('visibilitychange', onVisibilityChange);
    document.addEventListener('freeze', stopMusic);
    window.addEventListener('pagehide', onPageHide);
    window.addEventListener('beforeunload', onPageHide);
    window.addEventListener('pageshow', onPageShow);
    window.addEventListener('blur', onBlur);
    window.addEventListener('focus', onFocus);

    // ---- 3. Never allow playback in the background -------------------------------------
    // If something (Android notification / lock-screen button / in-app browser) starts the
    // audio while the page is hidden, pause it right away.
    const onPlay = () => {
      if (isBackground()) stopMusic();
    };
    audio.addEventListener('play', onPlay);

    // Watchdog for WebViews / in-app browsers (WhatsApp, Telegram, Instagram...) that do not
    // fire visibilitychange reliably: if the page is hidden or has lost focus for 2 checks in
    // a row, pause.
    let unfocusedTicks = 0;
    const watchdog = window.setInterval(() => {
      if (audio.paused) {
        unfocusedTicks = 0;
        return;
      }
      if (isBackground()) {
        stopMusic();
        return;
      }
      unfocusedTicks = document.hasFocus() ? 0 : unfocusedTicks + 1;
      if (unfocusedTicks >= 2) stopMusic();
    }, 1000);

    // ---- 4. No lock-screen / notification player for this background music ------------
    if ('mediaSession' in navigator) {
      try {
        navigator.mediaSession.metadata = null;
        const actions: MediaSessionAction[] = ['play', 'pause', 'stop', 'seekbackward', 'seekforward', 'previoustrack', 'nexttrack'];
        actions.forEach((a) => {
          try {
            navigator.mediaSession.setActionHandler(a, null);
          } catch {
            // unsupported action
          }
        });
      } catch {
        // ignore
      }
    }

    tryPlay();

    return () => {
      gestureEvents.forEach((e) => document.removeEventListener(e, onGesture));
      document.removeEventListener('visibilitychange', onVisibilityChange);
      document.removeEventListener('freeze', stopMusic);
      window.removeEventListener('pagehide', onPageHide);
      window.removeEventListener('beforeunload', onPageHide);
      window.removeEventListener('pageshow', onPageShow);
      window.removeEventListener('blur', onBlur);
      window.removeEventListener('focus', onFocus);
      audio.removeEventListener('play', onPlay);
      window.clearInterval(watchdog);
      stopMusic();
    };
  }, []);

  return (
    <audio
      ref={audioRef}
      src="/music/bolashaq-kelinshegim.mp3"
      preload="auto"
      autoPlay
      loop
      playsInline
    />
  );
};