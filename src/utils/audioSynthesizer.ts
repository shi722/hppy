/**
 * Romantic Fairytale Web Audio Synthesizer
 * "Happy Birthday To You" — Magical Music Box & Celesta Fairytale Arrangement
 *
 * A heartwarming, enchanting, and romantic arrangement of the iconic
 * "Happy Birthday To You" melody with:
 * - Celesta / music box bell timbre with sparkling harmonic overtones
 * - Warm acoustic bass roots (F Major / D Minor romantic progression)
 * - Trailing ambient reverb & warm acoustic filter for a dreamy fairytale atmosphere
 * - 100% self-contained: works instantly in the browser with zero external assets needed.
 */

class RomanticAudioSynthesizer {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private loopTimer: number | null = null;
  private masterGain: GainNode | null = null;
  private reverbSend: GainNode | null = null;
  private currentVolume = 0.45;
  private customAudio: HTMLAudioElement | null = null;
  private listeners: Array<(playing: boolean) => void> = [];

  // "Happy Birthday To You" Fairytale Arrangement (Frequencies in Hz)
  private birthdayMelody = [
    // --- Fairytale Stardust Prelude ---
    { freq: 349.23, bass: 174.61, dur: 0.55 }, // F4 / F3
    { freq: 440.00, bass: null,   dur: 0.55 }, // A4
    { freq: 523.25, bass: 261.63, dur: 0.65 }, // C5 / C4
    { freq: 659.25, bass: null,   dur: 1.10 }, // E5

    // --- Phrase 1: "Happy Birthday to you..." ---
    { freq: 261.63, bass: null,   dur: 0.45 }, // C4 "Hap-"
    { freq: 261.63, bass: null,   dur: 0.35 }, // C4 "-py"
    { freq: 293.66, bass: 174.61, dur: 0.85 }, // D4 "Birth-"
    { freq: 261.63, bass: null,   dur: 0.85 }, // C4 "-day"
    { freq: 349.23, bass: 220.00, dur: 0.95 }, // F4 "to"
    { freq: 329.63, bass: 130.81, dur: 1.85 }, // E4 "you..."

    // --- Phrase 2: "Happy Birthday to you..." ---
    { freq: 261.63, bass: null,   dur: 0.45 }, // C4 "Hap-"
    { freq: 261.63, bass: null,   dur: 0.35 }, // C4 "-py"
    { freq: 293.66, bass: 130.81, dur: 0.85 }, // D4 "Birth-"
    { freq: 261.63, bass: null,   dur: 0.85 }, // C4 "-day"
    { freq: 392.00, bass: 196.00, dur: 0.95 }, // G4 "to"
    { freq: 349.23, bass: 174.61, dur: 1.85 }, // F4 "you..."

    // --- Phrase 3 (The Emotional Heart): "Happy Birthday dear beautiful girl..." ---
    { freq: 261.63, bass: null,   dur: 0.45 }, // C4 "Hap-"
    { freq: 261.63, bass: null,   dur: 0.35 }, // C4 "-py"
    { freq: 523.25, bass: 233.08, dur: 1.10 }, // C5 "Birth-" (High emotional peak)
    { freq: 440.00, bass: 146.83, dur: 0.90 }, // A4 "-day"
    { freq: 349.23, bass: 174.61, dur: 0.85 }, // F4 "dear"
    { freq: 329.63, bass: null,   dur: 0.85 }, // E4 "beau-ti-"
    { freq: 293.66, bass: 116.54, dur: 1.95 }, // D4 "-ful girl..." (Bb bass warmth)

    // --- Phrase 4 (Celebration & Blessing): "Happy Birthday to you! ♡" ---
    { freq: 466.16, bass: null,   dur: 0.50 }, // Bb4 "Hap-"
    { freq: 466.16, bass: null,   dur: 0.35 }, // Bb4 "-py"
    { freq: 440.00, bass: 174.61, dur: 0.90 }, // A4 "Birth-"
    { freq: 349.23, bass: null,   dur: 0.85 }, // F4 "-day"
    { freq: 392.00, bass: 130.81, dur: 1.05 }, // G4 "to"
    { freq: 349.23, bass: 174.61, dur: 2.80 }, // F4 "you! ♡" (Long romantic chime)

    // --- Starlight Music Box Interlude ---
    { freq: 440.00, bass: null,   dur: 0.45 }, // A4
    { freq: 523.25, bass: 174.61, dur: 0.45 }, // C5
    { freq: 698.46, bass: null,   dur: 0.60 }, // F5
    { freq: 880.00, bass: null,   dur: 0.85 }, // A5
    { freq: 783.99, bass: 196.00, dur: 0.55 }, // G5
    { freq: 659.25, bass: null,   dur: 0.65 }, // E5
    { freq: 523.25, bass: 130.81, dur: 0.85 }, // C5
    { freq: 349.23, bass: 174.61, dur: 2.40 }, // F4 (Peaceful resolution)
  ];

  public init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();

        // 1. Master Output Gain
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.setValueAtTime(this.currentVolume, this.ctx.currentTime);

        // 2. Romantic Warm Lowpass Filter (silky smooth, removes harsh edges)
        const filter = this.ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(3200, this.ctx.currentTime);
        filter.Q.setValueAtTime(0.7, this.ctx.currentTime);

        // 3. Trailing Fairytale Reverb Delay
        const delay = this.ctx.createDelay();
        delay.delayTime.setValueAtTime(0.35, this.ctx.currentTime);

        const delayFeedback = this.ctx.createGain();
        delayFeedback.gain.setValueAtTime(0.38, this.ctx.currentTime);

        const delayFilter = this.ctx.createBiquadFilter();
        delayFilter.type = 'lowpass';
        delayFilter.frequency.setValueAtTime(2000, this.ctx.currentTime);

        // Delay loop
        delay.connect(delayFilter);
        delayFilter.connect(delayFeedback);
        delayFeedback.connect(delay);

        // Send gain to feed delay
        this.reverbSend = this.ctx.createGain();
        this.reverbSend.gain.setValueAtTime(0.45, this.ctx.currentTime);
        this.reverbSend.connect(delay);

        // Route to destination
        this.masterGain.connect(filter);
        filter.connect(this.ctx.destination);
        delayFilter.connect(filter);
      }
    }
  }

  public subscribe(callback: (playing: boolean) => void) {
    this.listeners.push(callback);
    return () => {
      this.listeners = this.listeners.filter((cb) => cb !== callback);
    };
  }

  private notify() {
    this.listeners.forEach((cb) => cb(this.isPlaying));
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  public setVolume(vol: number) {
    this.currentVolume = Math.max(0, Math.min(1, vol));
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(this.currentVolume, this.ctx.currentTime, 0.05);
    }
    if (this.customAudio) {
      this.customAudio.volume = this.currentVolume;
    }
  }

  public getVolume(): number {
    return this.currentVolume;
  }

  /**
   * Plays a single music box bell note with realistic metallic celesta harmonics
   */
  private playBirthdayNote(freq: number, startTime: number, duration: number, bassFreq: number | null) {
    if (!this.ctx || !this.masterGain || !this.reverbSend) return;

    // Melody Tone: Pure sine fundamental + sparkling 2nd & 3rd harmonic
    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const noteGain = this.ctx.createGain();

    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(freq, startTime);

    // Bell chime overtone (2.75x ratio gives authentic celesta/music box sparkle)
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(freq * 2.76, startTime);

    // Envelope: quick bell strike, warm resonance, smooth natural decay
    noteGain.gain.setValueAtTime(0.0001, startTime);
    noteGain.gain.exponentialRampToValueAtTime(0.26, startTime + 0.025);
    noteGain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration * 1.4);

    osc1.connect(noteGain);
    osc2.connect(noteGain);

    noteGain.connect(this.masterGain);
    noteGain.connect(this.reverbSend);

    osc1.start(startTime);
    osc2.start(startTime);
    osc1.stop(startTime + duration * 1.5);
    osc2.stop(startTime + duration * 1.5);

    // Warm acoustic sub-bass accompaniment
    if (bassFreq) {
      const bassOsc = this.ctx.createOscillator();
      const bassGain = this.ctx.createGain();

      bassOsc.type = 'sine';
      bassOsc.frequency.setValueAtTime(bassFreq, startTime);

      bassGain.gain.setValueAtTime(0.0001, startTime);
      bassGain.gain.exponentialRampToValueAtTime(0.19, startTime + 0.04);
      bassGain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration * 1.8);

      bassOsc.connect(bassGain);
      bassGain.connect(this.masterGain);

      bassOsc.start(startTime);
      bassOsc.stop(startTime + duration * 1.9);
    }
  }

  /**
   * Starts playback of the "Happy Birthday" fairytale loop
   */
  private startMelodyLoop() {
    if (!this.ctx || !this.isPlaying) return;

    const scheduleSequence = () => {
      if (!this.ctx || !this.isPlaying) return;
      const now = this.ctx.currentTime;
      let noteTime = now + 0.1;

      for (let i = 0; i < this.birthdayMelody.length; i++) {
        const item = this.birthdayMelody[i];
        this.playBirthdayNote(item.freq, noteTime, item.dur, item.bass);
        noteTime += item.dur * 0.95;
      }

      const totalLoopTime = (noteTime - now) * 1000;
      this.loopTimer = window.setTimeout(() => {
        scheduleSequence();
      }, totalLoopTime);
    };

    scheduleSequence();
  }

  public play(customUrl?: string) {
    if (customUrl && customUrl.trim().length > 0) {
      if (!this.customAudio) {
        this.customAudio = new Audio(customUrl);
        this.customAudio.loop = true;
      }
      this.customAudio.volume = this.currentVolume;
      this.customAudio
        .play()
        .then(() => {
          this.isPlaying = true;
          this.notify();
        })
        .catch(() => {
          // If custom URL fails (e.g. CORS or 404), fall back to built-in synthesizer
          this.playProcedural();
        });
      return;
    }

    this.playProcedural();
  }

  private playProcedural() {
    this.init();
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    this.isPlaying = true;
    this.notify();
    this.startMelodyLoop();
  }

  public pause() {
    this.isPlaying = false;
    this.notify();

    if (this.loopTimer) {
      clearTimeout(this.loopTimer);
      this.loopTimer = null;
    }
    if (this.customAudio) {
      this.customAudio.pause();
    }
    if (this.ctx && this.ctx.state === 'running') {
      this.ctx.suspend();
    }
  }

  public toggle(customUrl?: string) {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play(customUrl);
    }
  }

  /**
   * One-shot magical chime for interactive buttons / star discoveries / candles
   */
  public playChime(pitchMultiplier = 1.0) {
    try {
      this.init();
      if (!this.ctx || !this.masterGain) return;
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }

      const now = this.ctx.currentTime;
      // Pentatonic stardust flourish in F Major
      const notes = [349.23, 440.0, 523.25, 698.46, 880.0].map((f) => f * pitchMultiplier);

      notes.forEach((freq, idx) => {
        const time = now + idx * 0.07;
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, time);

        gain.gain.setValueAtTime(0.0001, time);
        gain.gain.exponentialRampToValueAtTime(0.2, time + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, time + 1.2);

        osc.connect(gain);
        gain.connect(this.masterGain!);

        osc.start(time);
        osc.stop(time + 1.3);
      });
    } catch {
      // Audio context might be restricted before gesture
    }
  }
}

export const soundManager = new RomanticAudioSynthesizer();
