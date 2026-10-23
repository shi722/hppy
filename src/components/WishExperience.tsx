import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { Sparkles, Heart, Flame, RotateCcw, Wand2 } from 'lucide-react';
import { BIRTHDAY_CONFIG } from '../config/birthdayConfig';
import { soundManager } from '../utils/audioSynthesizer';

export const WishExperience: React.FC = () => {
  const [candlesLit, setCandlesLit] = useState(true);
  const [wishMade, setWishMade] = useState(false);

  const handleMakeWish = () => {
    // 1. Extinguish candles
    setCandlesLit(false);
    setWishMade(true);

    // 2. Play celebratory magical chime with harmonic flourish
    soundManager.playChime(1.5);
    setTimeout(() => soundManager.playChime(1.8), 200);

    // 3. Fire multi-stage celebratory confetti
    try {
      // Golden, rose, and diamond stardust confetti blast
      confetti({
        particleCount: 100,
        spread: 100,
        origin: { y: 0.65 },
        colors: ['#f6cd61', '#fda4af', '#f472b6', '#ffffff', '#e0e7ff', '#fcd34d'],
      });

      setTimeout(() => {
        confetti({
          particleCount: 70,
          angle: 60,
          spread: 75,
          origin: { x: 0.1, y: 0.7 },
          colors: ['#fcd34d', '#f43f5e', '#fed7aa', '#ffffff'],
        });
        confetti({
          particleCount: 70,
          angle: 120,
          spread: 75,
          origin: { x: 0.9, y: 0.7 },
          colors: ['#fcd34d', '#f43f5e', '#fed7aa', '#ffffff'],
        });
      }, 250);

      setTimeout(() => {
        confetti({
          particleCount: 80,
          spread: 120,
          origin: { y: 0.5 },
          shapes: ['circle'],
          colors: ['#f6cd61', '#fda4af', '#fef08a'],
        });
      }, 550);
    } catch {
      // Confetti fallback
    }
  };

  const handleRelight = () => {
    setCandlesLit(true);
    setWishMade(false);
    soundManager.playChime(1.0);
  };

  // 18 candles arrangement: 10 on top tier, 8 on middle tier
  const topCandles = Array.from({ length: 10 });
  const middleCandles = Array.from({ length: 8 });

  return (
    <section id="wishes" className="relative py-28 px-6 overflow-hidden">
      {/* Background garden twilight */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-r from-amber-400/15 via-rose-500/15 to-purple-800/15 rounded-full blur-[140px]" />
      </div>

      <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
        {/* Editorial Index */}
        <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-amber-200/80 font-medium mb-3">
          <span>Chapter 05</span>
          <span aria-hidden="true">·</span>
          <span>A Starlit Ritual</span>
        </div>

        <h2 className="font-display-title text-3xl sm:text-4xl md:text-5xl font-semibold text-white mb-4">
          {BIRTHDAY_CONFIG.wishCakeTitle}
        </h2>

        <p className="font-serif-luxury text-lg sm:text-xl text-pink-200/85 max-w-xl leading-relaxed mb-12">
          {BIRTHDAY_CONFIG.wishCakeSubtitle}
        </p>

        {/* 18-Candle Realistic Romantic Cake Illustration */}
        <div className="relative w-full max-w-md my-8 flex flex-col items-center">
          {/* Cake Glow Halo */}
          <div className="absolute -inset-8 rounded-full bg-amber-400/15 blur-2xl pointer-events-none" />

          {/* Candle Flames Row 1 (Top Tier - 10 Candles) */}
          <div className="flex items-end justify-center gap-2 sm:gap-3 z-20 mb-[-4px]">
            {topCandles.map((_, i) => (
              <div key={`candle-top-${i}`} className="flex flex-col items-center">
                {/* Flame or extinguished stardust wisp */}
                {candlesLit ? (
                  <div
                    className="w-2.5 h-4 sm:w-3 sm:h-5 rounded-full bg-gradient-to-t from-amber-500 via-amber-300 to-yellow-100 shadow-[0_0_12px_rgba(253,224,71,0.9)] animate-flame opacity-100 scale-100 transition-all duration-700"
                  />
                ) : (
                  <div className="w-2.5 h-4 sm:w-3 sm:h-5 flex items-center justify-center">
                    <Sparkles className="w-2 h-2 text-amber-200/70 animate-ping" />
                  </div>
                )}
                {/* Wick */}
                <div className="w-0.5 h-1.5 bg-stone-700" />
                {/* Candle Stick */}
                <div className="w-1.5 sm:w-2 h-7 sm:h-9 bg-gradient-to-b from-pink-200 to-pink-300 rounded-t-sm shadow-sm" />
              </div>
            ))}
          </div>

          {/* Top Cake Tier (Pastel Strawberry Velvet) */}
          <div className="relative w-56 sm:w-64 h-14 sm:h-16 rounded-t-2xl bg-gradient-to-r from-[#ffe4e6] via-[#fecdd3] to-[#ffe4e6] border border-pink-200/50 shadow-lg flex items-center justify-center z-10">
            {/* Frosting Swirls */}
            <div className="absolute inset-x-0 bottom-0 h-2 bg-pink-300/40 rounded-full" />
            <span className="font-script-accent text-pink-700 text-lg">18th Milestone</span>
          </div>

          {/* Candle Flames Row 2 (Middle Tier - 8 Candles) */}
          <div className="flex items-end justify-center gap-3 sm:gap-4 z-20 -mt-2 mb-[-4px]">
            {middleCandles.map((_, i) => (
              <div key={`candle-mid-${i}`} className="flex flex-col items-center">
                {candlesLit ? (
                  <div
                    className="w-2.5 h-4 sm:w-3 sm:h-5 rounded-full bg-gradient-to-t from-amber-500 via-amber-300 to-yellow-100 shadow-[0_0_12px_rgba(253,224,71,0.9)] animate-flame opacity-100 scale-100 transition-all duration-700"
                    style={{ animationDelay: `${i * 120}ms` }}
                  />
                ) : (
                  <div className="w-2.5 h-4 sm:w-3 sm:h-5 flex items-center justify-center">
                    <Sparkles className="w-2 h-2 text-pink-200/70 animate-ping" />
                  </div>
                )}
                {/* Wick */}
                <div className="w-0.5 h-1.5 bg-stone-700" />
                <div className="w-1.5 sm:w-2 h-6 sm:h-8 bg-gradient-to-b from-amber-100 to-amber-200 rounded-t-sm shadow-sm" />
              </div>
            ))}
          </div>

          {/* Middle Cake Tier (Champagne Cream) */}
          <div className="relative w-72 sm:w-80 h-16 sm:h-20 bg-gradient-to-r from-[#fef3c7] via-[#fde68a] to-[#fef3c7] border border-amber-200/50 shadow-xl flex items-center justify-center z-0">
            <div className="absolute inset-x-0 bottom-0 h-3 bg-amber-300/40 rounded-full" />
            <div className="flex items-center gap-3 text-amber-800 text-xs font-serif-luxury italic">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Baked with boundless love</span>
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            </div>
          </div>

          {/* Base Cake Tier & Porcelain Stand */}
          <div className="w-80 sm:w-96 h-14 bg-gradient-to-r from-[#ede9fe] via-[#ddd6fe] to-[#ede9fe] rounded-b-2xl border-t border-purple-200/40 shadow-2xl flex items-center justify-center">
            <div className="flex items-center gap-2">
              <Heart className="w-3.5 h-3.5 fill-pink-500 text-pink-500" />
              <span className="text-xs font-serif-luxury uppercase tracking-widest text-purple-900 font-semibold">
                November 3, 2026
              </span>
              <Heart className="w-3.5 h-3.5 fill-pink-500 text-pink-500" />
            </div>
          </div>

          {/* Golden Stand Base */}
          <div className="w-48 sm:w-56 h-3 bg-gradient-to-r from-amber-300 via-amber-100 to-amber-300 rounded-full shadow-md mt-1" />
        </div>

        {/* Action Controls & Fulfilled Wish Box */}
        <AnimatePresence mode="wait">
          {candlesLit ? (
            <motion.div
              key="wish-button"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="mt-6 flex flex-col items-center"
            >
              <button
                onClick={handleMakeWish}
                className="group px-9 py-4 rounded-full text-base font-semibold tracking-wide text-[#23153c] bg-gradient-to-r from-amber-200 via-pink-200 to-amber-100 shadow-[0_0_35px_rgba(253,230,138,0.5)] hover:shadow-[0_0_55px_rgba(253,230,138,0.85)] hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-3 focus-visible:outline-2 focus-visible:outline-amber-300 cursor-pointer"
                aria-label="Blow out candles and make a birthday wish"
              >
                <Wand2 className="w-5 h-5 text-purple-800" />
                <span>{BIRTHDAY_CONFIG.wishButtonText}</span>
                <Sparkles className="w-5 h-5 text-amber-600 animate-spin" />
              </button>
              <p className="mt-3 text-xs text-pink-200/70 font-serif-luxury italic">
                Touch to gently blow out all 18 candles and set your wish free ✨
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="wish-fulfilled"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="mt-6 w-full max-w-lg rounded-2xl glass-panel-gold p-8 border border-amber-300/40 shadow-[0_15px_45px_rgba(246,205,97,0.25)] flex flex-col items-center text-center"
            >
              <div className="w-12 h-12 rounded-full bg-amber-400/20 border border-amber-300/40 flex items-center justify-center mb-4">
                <Sparkles className="w-6 h-6 text-amber-300" />
              </div>

              <h3 className="font-display-title text-2xl text-white font-medium mb-2">
                {BIRTHDAY_CONFIG.wishFulfilledTitle}
              </h3>

              <p className="font-serif-luxury italic text-xl text-pink-100 leading-relaxed mb-6">
                &ldquo;{BIRTHDAY_CONFIG.wishFulfilledMessage}&rdquo;
              </p>

              {/* Replay Relight Option */}
              <button
                onClick={handleRelight}
                className="text-xs font-sans text-amber-200/90 hover:text-white glass-panel-subtle hover:glass-panel px-4 py-2 rounded-full border border-amber-200/20 transition-all flex items-center gap-2 focus-visible:outline-2 focus-visible:outline-amber-300"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Light the candles again 🕯️</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
