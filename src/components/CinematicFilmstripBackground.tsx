import React from 'react';
import { FilmstripIOS } from './filmstrip/FilmstripIOS';
import { FilmstripAndroid } from './filmstrip/FilmstripAndroid';

/**
 * Picks ONE implementation. They never run together.
 *  - iPhone / iPad            -> FilmstripIOS     (JS requestAnimationFrame + translate3d)
 *  - Android / other browsers -> FilmstripAndroid (CSS scroll-driven animation)
 *  - browser without support for animation-timeline -> FilmstripIOS as a fallback
 */
const ua = typeof navigator !== 'undefined' ? navigator.userAgent : '';
const IS_IOS =
  /iPhone|iPad|iPod/.test(ua) ||
  // iPadOS Safari pretends to be a Mac, but a Mac has no multi-touch screen
  (/Macintosh/.test(ua) && typeof navigator !== 'undefined' && navigator.maxTouchPoints > 1);

const SUPPORTS_CSS_TIMELINE =
  typeof CSS !== 'undefined' &&
  typeof CSS.supports === 'function' &&
  CSS.supports('animation-timeline: scroll()');

export const CinematicFilmstripBackground: React.FC = () =>
  !IS_IOS && SUPPORTS_CSS_TIMELINE ? <FilmstripAndroid /> : <FilmstripIOS />;
