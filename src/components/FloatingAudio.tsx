import React, { useEffect, useRef } from 'react';

/**
 * Background music. Rule: it plays ONLY while the invitation is on screen.
 * The moment the browser / app is minimised, the screen is locked, the tab is switched
 * or the page is closed, the music is paused AND muted.
 *
 * Debug: open the site with  ?audiodebug=1  to see an on-screen log of every event.
 */
export const FloatingAudio: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const logRef = useRef<HTMLPreElement>(null);
  const DEBUG = typeof location !== 'undefined' && new URLSearchParams(location.search).has('audiodebug');

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const log = (msg: string) => {
      const el = logRef.current;
      if (!el) return;
      const t = new Date().toLocaleTimeString();
      const lines = (el.textContent ? el.textContent.split('\n') : []).slice(-11);
      lines.push(`${t} ${msg}`);
      el.textContent = lines.join('\n');
    };

    const isBackground = () => document.hidden || document.visibilityState === 'hidden';

    const tryPlay = (why: string) => {
      if (isBackground() || !audio.paused) return;
      audio.muted = false;
      audio.play().then(() => log(`play ok (${why})`)).catch(() => log(`play blocked (${why})`));
    };

    // Pause AND mute: if pause() were ever ignored, the mute still guarantees silence.
    const stopMusic = (why: string) => {
      audio.muted = true;
      if (!audio.paused) {
        audio.pause();
        log(`PAUSED (${why})`);
      } else {
        log(`stop requested, already paused (${why})`);
      }
    };

    // 1. Start / restart on a user gesture (iOS needs touchend/click, not pointerdown).
    const onGesture = () => tryPlay('gesture');
    const gestureEvents = ['touchend', 'click', 'keydown'] as const;
    gestureEvents.forEach((e) => document.addEventListener(e, onGesture, { passive: true }));

    // 2. Stop when the page / browser / app goes away.
    const onVisibilityChange = () => {
      log(`visibilitychange -> ${document.visibilityState}`);
      if (isBackground()) stopMusic('hidden');
      else tryPlay('visible again');
    };
    const onPageHide = () => {
      log('pagehide');
      stopMusic('pagehide');
      audio.currentTime = 0;
    };
    const onPageShow = () => {
      log('pageshow');
      tryPlay('pageshow');
    };
    const onBlur = () => {
      log('window blur');
      stopMusic('blur');
    };
    const onFocus = () => {
      log('window focus');
      tryPlay('focus');
    };
    const onFreeze = () => stopMusic('freeze');

    document.addEventListener('visibilitychange', onVisibilityChange);
    document.addEventListener('freeze', onFreeze);
    window.addEventListener('pagehide', onPageHide);
    window.addEventListener('beforeunload', onPageHide);
    window.addEventListener('pageshow', onPageShow);
    window.addEventListener('blur', onBlur);
    window.addEventListener('focus', onFocus);

    // 3. Never allow playback in the background (e.g. started from a notification button).
    const onPlay = () => {
      if (isBackground()) stopMusic('play event while hidden');
    };
    audio.addEventListener('play', onPlay);

    // 4. Watchdog for in-app browsers (WhatsApp, Telegram, Instagram...) that do not fire
    //    visibilitychange reliably: hidden, or unfocused for 2 checks in a row -> stop.
    let unfocusedTicks = 0;
    const watchdog = window.setInterval(() => {
      if (audio.paused) {
        unfocusedTicks = 0;
        return;
      }
      if (isBackground()) {
        stopMusic('watchdog: hidden');
        return;
      }
      unfocusedTicks = document.hasFocus() ? 0 : unfocusedTicks + 1;
      if (unfocusedTicks >= 2) stopMusic('watchdog: no focus');
    }, 1000);

    // 5. No lock-screen / notification player for this background music.
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

    log('FloatingAudio ready');
    tryPlay('mount');

    return () => {
      gestureEvents.forEach((e) => document.removeEventListener(e, onGesture));
      document.removeEventListener('visibilitychange', onVisibilityChange);
      document.removeEventListener('freeze', onFreeze);
      window.removeEventListener('pagehide', onPageHide);
      window.removeEventListener('beforeunload', onPageHide);
      window.removeEventListener('pageshow', onPageShow);
      window.removeEventListener('blur', onBlur);
      window.removeEventListener('focus', onFocus);
      audio.removeEventListener('play', onPlay);
      window.clearInterval(watchdog);
      audio.pause();
    };
  }, []);

  return (
    <>
      <audio
        ref={audioRef}
        src="/music/bolashaq-kelinshegim.mp3"
        preload="auto"
        autoPlay
        loop
        playsInline
      />
      {DEBUG && (
        <pre
          ref={logRef}
          className="fixed bottom-2 left-2 right-2 z-[100] max-h-48 overflow-hidden rounded-lg bg-black/80 p-2 text-[10px] leading-tight text-green-300 pointer-events-none"
        />
      )}
    </>
  );
};
