/**
 * Procedural Romantic Ambient Piano & Acoustic Chord Engine
 * Generates an enchanting, peaceful wedding melody using Web Audio API.
 * Guarantees zero broken external network audio streams while sounding elegant and warm.
 */

class RomanticAudioEngine {
  private ctx: AudioContext | null = null;
  private isRunning: boolean = false;
  private timerId: number | null = null;
  private masterGain: GainNode | null = null;
  private volume: number = 0.45;
  private listeners: Array<(playing: boolean) => void> = [];

  // Romantic chord progression (Canon in D / Wedding ambient harmonies)
  // Frequencies corresponding to peaceful acoustic notes
  private chords = [
    // D Major (D4, F#4, A4, D5)
    [293.66, 369.99, 440.0, 587.33],
    // A Major / C# (C#4, E4, A4, C#5)
    [277.18, 329.63, 440.0, 554.37],
    // B Minor (B3, D4, F#4, B4)
    [246.94, 293.66, 369.99, 493.88],
    // F# Minor (F#3, A3, C#4, F#4)
    [185.0, 220.0, 277.18, 369.99],
    // G Major (G3, B3, D4, G4)
    [196.0, 246.94, 293.66, 392.0],
    // D Major (D3, A3, D4, F#4)
    [146.83, 220.0, 293.66, 369.99],
    // G Major (G3, D4, G4, B4)
    [196.0, 293.66, 392.0, 493.88],
    // A7sus4 -> A Major (A3, E4, G4, C#5)
    [220.0, 329.63, 392.0, 554.37],
  ];

  private currentChordIndex = 0;
  private currentNoteIndex = 0;

  private initContext() {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioContextClass();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public subscribe(cb: (playing: boolean) => void) {
    this.listeners.push(cb);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== cb);
    };
  }

  private notify() {
    this.listeners.forEach((cb) => cb(this.isRunning));
  }

  public getIsPlaying(): boolean {
    return this.isRunning;
  }

  public play() {
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    this.isRunning = true;
    this.notify();
    this.scheduleNextNote();
  }

  public pause() {
    this.isRunning = false;
    if (this.timerId !== null) {
      window.clearTimeout(this.timerId);
      this.timerId = null;
    }
    this.notify();
  }

  public toggle(): boolean {
    if (this.isRunning) {
      this.pause();
      return false;
    } else {
      this.play();
      return true;
    }
  }

  public setVolumeLevel(val: number) {
    this.volume = Math.max(0, Math.min(1, val));
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(this.volume, this.ctx.currentTime, 0.05);
    }
  }

  public getVolumeLevel(): number {
    return this.volume;
  }

  private playTone(freq: number, duration: number, isBass: boolean = false) {
    if (!this.ctx || !this.masterGain || !this.isRunning) return;

    const osc = this.ctx.createOscillator();
    const noteGain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    // Warm Rhodes / Celesta harmonic setup
    osc.type = isBass ? 'triangle' : 'sine';
    osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

    // Warm analog low-pass filter
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(isBass ? 400 : 1800, this.ctx.currentTime);
    filter.Q.setValueAtTime(1.5, this.ctx.currentTime);

    // Natural piano-like decay envelope
    const now = this.ctx.currentTime;
    const peakGain = isBass ? 0.35 : 0.22;
    noteGain.gain.setValueAtTime(0.0001, now);
    noteGain.gain.exponentialRampToValueAtTime(peakGain, now + 0.04);
    noteGain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    osc.connect(filter);
    filter.connect(noteGain);
    noteGain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + duration + 0.1);
  }

  private scheduleNextNote() {
    if (!this.isRunning) return;

    const chord = this.chords[this.currentChordIndex];
    const freq = chord[this.currentNoteIndex];

    // Play tone with organic subtle variation
    const isBass = this.currentNoteIndex === 0;
    const duration = isBass ? 3.2 : 2.2;
    this.playTone(freq, duration, isBass);

    // Advance note & chord
    this.currentNoteIndex++;
    if (this.currentNoteIndex >= chord.length) {
      this.currentNoteIndex = 0;
      this.currentChordIndex = (this.currentChordIndex + 1) % this.chords.length;
    }

    // Gentle timing rhythm: ~480ms per acoustic arpeggio pulse
    const delay = isBass ? 580 : 440;
    this.timerId = window.setTimeout(() => {
      this.scheduleNextNote();
    }, delay);
  }
}

export const romanticAudio = new RomanticAudioEngine();
