import React from 'react';
import { motion } from 'motion/react';
import confetti from 'canvas-confetti';
import { Sparkles, Heart, RotateCcw, Stars } from 'lucide-react';
import { TulipGardenRow } from './TulipFlower';
import { BIRTHDAY_CONFIG } from '../config/birthdayConfig';
import { soundManager } from '../utils/audioSynthesizer';

interface FinalRevealSectionProps {
  onReplay: () => void;
  recipientName: string;
  senderName: string;
}

export const FinalRevealSection: React.FC<FinalRevealSectionProps> = ({
  onReplay,
  recipientName,
  senderName,
}) => {
  const handleReplayClick = () => {
    soundManager.playChime(1.2);
    try {
      confetti({
        particleCount: 60,
        spread: 80,
        origin: { y: 0.8 },
        colors: ['#f6cd61', '#fda4af', '#e0e7ff'],
      });
    } catch {
      // Confetti fallback
    }
    setTimeout(() => {
      onReplay();
    }, 400);
  };

  return (
    <section id="final-reveal" className="relative min-h-screen py-32 px-6 flex flex-col items-center justify-center overflow-hidden text-center">
      {/* Dreamy Midnight Garden & Fireworks Halo */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        {/* Soft background gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#04020a] via-[#100824] to-[#080514]" />

        {/* Grand Celestial Halo */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full bg-gradient-to-tr from-amber-400/15 via-rose-500/15 to-purple-700/20 blur-[150px] animate-pulse-glow" />

        {/* Distant Fireworks particle sparks (SVG rings) */}
        <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full border border-dashed border-amber-300/30 opacity-40 animate-ping" />
        <div className="absolute top-1/3 right-1/4 w-40 h-40 rounded-full border border-dashed border-pink-300/30 opacity-30 animate-ping [animation-delay:1.5s]" />

        {/* Blooming Glowing Tulips Vector Garden */}
        <div className="absolute -bottom-6 inset-x-0 px-4 md:px-12 opacity-65">
          <TulipGardenRow />
        </div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
        {/* Little celestial badge */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full glass-panel-gold text-xs font-semibold uppercase tracking-widest text-amber-200 mb-8 shadow-lg"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>The Grand Finale · Her 18th Year</span>
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
        </motion.div>

        {/* Main Emotional Heading */}
        <motion.h2
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="font-display-title text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-8 text-balance text-glow-gold flex flex-wrap items-center justify-center gap-3"
        >
          <span>{BIRTHDAY_CONFIG.finalHeading}</span>
          <Heart className="w-8 h-8 sm:w-12 sm:h-12 fill-pink-500 text-pink-500 inline-block align-middle" />
        </motion.h2>

        {/* Recipient Personal Accent */}
        <div className="font-script-accent text-3xl sm:text-4xl md:text-5xl text-pink-300 mb-8 -rotate-1 text-glow-rose flex items-center justify-center gap-2">
          <span>Forever Loved, {recipientName || 'My Angel'}</span>
          <Heart className="w-5 h-5 sm:w-7 sm:h-7 text-pink-400 fill-pink-400 inline-block align-middle" />
        </div>

        {/* Heartfelt Paragraph */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-serif-luxury text-xl sm:text-2xl md:text-3xl text-pink-100/90 max-w-3xl leading-relaxed text-balance mb-8"
        >
          &ldquo;{BIRTHDAY_CONFIG.finalMessage}&rdquo;
        </motion.p>

        {/* Final Tender Closing Line */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="font-serif-luxury italic text-lg sm:text-xl text-amber-200/90 max-w-2xl text-balance mb-14"
        >
          &ldquo;{BIRTHDAY_CONFIG.finalClosingLine}&rdquo;
        </motion.p>

        {/* Replay Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          <button
            onClick={handleReplayClick}
            className="group px-9 py-4 rounded-full text-base font-semibold tracking-wide text-[#23153c] bg-gradient-to-r from-amber-200 via-pink-200 to-amber-100 shadow-[0_0_35px_rgba(253,230,138,0.5)] hover:shadow-[0_0_60px_rgba(253,230,138,0.9)] hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-3 focus-visible:outline-2 focus-visible:outline-amber-300 cursor-pointer"
            aria-label="Replay our fairytale birthday experience"
          >
            <RotateCcw className="w-4 h-4 text-purple-900 group-hover:-rotate-90 transition-transform duration-500" />
            <span>{BIRTHDAY_CONFIG.replayButtonText}</span>
            <Stars className="w-4 h-4 text-amber-600" />
          </button>
        </motion.div>

        {/* Romantic Fairytale Sign-off */}
        <div className="mt-20 pt-8 border-t border-white/10 w-full flex flex-col items-center justify-center gap-3 text-xs text-slate-400">
          <div className="flex items-center gap-2 text-pink-200/90 font-serif-luxury text-sm italic">
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>Crafted with endless love by {senderName || BIRTHDAY_CONFIG.senderName}</span>
            <Sparkles className="w-4 h-4 text-amber-300" />
          </div>
          <p className="text-[11px] text-slate-500 tracking-wider uppercase font-medium">
            Her 18th Birthday Fairytale Universe · Written in the Stars Forever
          </p>
        </div>
      </div>
    </section>
  );
};
