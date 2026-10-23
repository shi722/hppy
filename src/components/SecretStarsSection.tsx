import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { Star, Sparkles, Heart, CheckCircle2, Lock, Unlock, RotateCcw } from 'lucide-react';
import { BIRTHDAY_CONFIG } from '../config/birthdayConfig';
import { soundManager } from '../utils/audioSynthesizer';

export const SecretStarsSection: React.FC = () => {
  const [discoveredStarIds, setDiscoveredStarIds] = useState<number[]>([]);
  const [activeStarId, setActiveStarId] = useState<number | null>(null);

  const totalStars = BIRTHDAY_CONFIG.secretStars.length;
  const isAllDiscovered = discoveredStarIds.length === totalStars;

  const handleStarClick = (id: number) => {
    setActiveStarId(id);
    if (!discoveredStarIds.includes(id)) {
      const next = [...discoveredStarIds, id];
      setDiscoveredStarIds(next);
      soundManager.playChime(1.1 + next.length * 0.1);

      // Trigger grand stardust confetti when all stars are found!
      if (next.length === totalStars) {
        setTimeout(() => {
          try {
            confetti({
              particleCount: 75,
              spread: 90,
              origin: { y: 0.6 },
              colors: ['#f6cd61', '#fda4af', '#fef08a', '#ffffff'],
            });
          } catch {
            // fallback
          }
        }, 300);
      }
    } else {
      soundManager.playChime(1.1);
    }
  };

  const handleResetStars = () => {
    setDiscoveredStarIds([]);
    setActiveStarId(null);
    soundManager.playChime(1.0);
  };

  const activeStar = BIRTHDAY_CONFIG.secretStars.find((s) => s.id === activeStarId);

  return (
    <section id="secret-stars" className="relative py-28 px-6 overflow-hidden">
      {/* Background Starry Sky Atmosphere */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-gradient-to-tr from-indigo-900/20 via-purple-900/25 to-pink-900/15 rounded-full blur-[150px]" />
      </div>

      <div className="max-w-5xl mx-auto flex flex-col items-center">
        {/* Editorial Index */}
        <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-amber-200/80 font-medium mb-3">
          <span>Chapter 06</span>
          <span aria-hidden="true">·</span>
          <span>Celestial Secrets</span>
        </div>

        <h2 className="font-display-title text-3xl sm:text-4xl md:text-5xl font-semibold text-center text-white mb-4">
          {BIRTHDAY_CONFIG.starsTitle}
        </h2>

        <p className="font-serif-luxury text-lg sm:text-xl text-pink-200/85 text-center max-w-xl leading-relaxed mb-6">
          &ldquo;{BIRTHDAY_CONFIG.starsSubtitle}&rdquo;
        </p>

        {/* Discovery Counter Badge */}
        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full glass-panel border border-amber-300/25 text-xs text-amber-200 font-medium mb-10 shadow-lg">
          {isAllDiscovered ? (
            <Unlock className="w-4 h-4 text-emerald-400" />
          ) : (
            <Lock className="w-4 h-4 text-amber-300" />
          )}
          <span>
            Constellation Discovered: {discoveredStarIds.length} of {totalStars} Stars
          </span>
          {isAllDiscovered && (
            <Sparkles className="w-4 h-4 text-amber-300 animate-spin" />
          )}
        </div>

        {/* Interactive Constellation Sky Map */}
        <div className="relative w-full max-w-4xl h-[420px] sm:h-[480px] rounded-3xl glass-panel border border-white/10 overflow-hidden shadow-2xl flex items-center justify-center p-6">
          {/* Subtle Constellation Lines connecting stars in SVG */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40" viewBox="0 0 100 100" preserveAspectRatio="none">
            <polyline
              points="18,22 60,28 78,40 72,75 28,68 18,22"
              stroke="rgba(246, 205, 97, 0.35)"
              strokeWidth="0.5"
              strokeDasharray="2 2"
              fill="none"
            />
          </svg>

          {/* Interactive Stars Scattered */}
          {BIRTHDAY_CONFIG.secretStars.map((star) => {
            const isDiscovered = discoveredStarIds.includes(star.id);
            const isActive = activeStarId === star.id;

            return (
              <button
                key={star.id}
                onClick={() => handleStarClick(star.id)}
                style={{
                  top: `${star.coordinates.top}%`,
                  left: `${star.coordinates.left}%`,
                }}
                className={`absolute -translate-x-1/2 -translate-y-1/2 p-3 group transition-all duration-300 z-10 focus-visible:outline-2 focus-visible:outline-amber-300 cursor-pointer`}
                aria-label={`Star: ${star.label}. ${isDiscovered ? 'Discovered' : 'Click to discover secret message'}`}
              >
                {/* Glowing Aura Ring */}
                <div
                  className={`absolute inset-0 rounded-full transition-all duration-500 ${
                    isDiscovered
                      ? 'bg-amber-400/30 scale-125 blur-md'
                      : 'bg-white/10 group-hover:bg-amber-300/25 blur-sm'
                  }`}
                />

                {/* Star Icon */}
                <div
                  className={`relative p-2.5 rounded-full border transition-all duration-300 flex items-center justify-center ${
                    isDiscovered
                      ? 'bg-gradient-to-tr from-amber-400 to-yellow-200 text-[#1b0e35] border-amber-300 shadow-[0_0_25px_rgba(253,230,138,0.9)] scale-110'
                      : 'glass-panel text-slate-300 hover:text-amber-200 border-white/20 group-hover:scale-115'
                  }`}
                >
                  <Star
                    className={`w-5 h-5 transition-transform ${
                      isDiscovered ? 'fill-amber-950 text-amber-950' : 'fill-none'
                    }`}
                  />
                </div>

                {/* Floating label */}
                <span
                  className={`absolute top-full left-1/2 -translate-x-1/2 mt-1 text-[11px] whitespace-nowrap font-sans font-medium transition-colors ${
                    isDiscovered ? 'text-amber-200' : 'text-slate-400 group-hover:text-amber-100'
                  }`}
                >
                  {star.label}
                </span>
              </button>
            );
          })}

          {/* Active Star Note Card Overlay */}
          <AnimatePresence>
            {activeStar && (
              <motion.div
                key={activeStar.id}
                initial={{ opacity: 0, y: 15, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="relative z-20 max-w-md w-full glass-panel-gold rounded-2xl p-6 border border-amber-300/40 text-center shadow-2xl"
              >
                <div className="flex items-center justify-center gap-1.5 text-xs uppercase tracking-widest text-amber-300 font-semibold mb-2">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{activeStar.label}</span>
                </div>
                <p className="font-serif-luxury italic text-lg sm:text-xl text-white leading-relaxed">
                  &ldquo;{activeStar.text}&rdquo;
                </p>
                <span className="block mt-4 text-[10px] uppercase tracking-wider text-pink-300/80">
                  Touch another star to explore the sky
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Mobile Alternative / List Grid */}
        <div className="w-full mt-6 grid grid-cols-2 sm:grid-cols-5 gap-3">
          {BIRTHDAY_CONFIG.secretStars.map((star) => {
            const isDiscovered = discoveredStarIds.includes(star.id);
            return (
              <button
                key={`btn-${star.id}`}
                onClick={() => handleStarClick(star.id)}
                className={`p-3 rounded-xl text-xs font-medium border flex items-center justify-between transition-all ${
                  isDiscovered
                    ? 'glass-panel-gold text-amber-200 border-amber-300/40'
                    : 'glass-panel text-slate-400 hover:text-white border-white/10'
                }`}
              >
                <span>{star.label}</span>
                {isDiscovered ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-300 shrink-0" />
                ) : (
                  <Star className="w-3.5 h-3.5 text-slate-600 shrink-0" />
                )}
              </button>
            );
          })}
        </div>

        {/* Grand Secret Unlocked Box */}
        <AnimatePresence>
          {isAllDiscovered && (
            <motion.div
              initial={{ opacity: 0, y: 25, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="w-full max-w-3xl mt-10 rounded-2xl bg-gradient-to-br from-[#281545]/90 via-[#1f1038]/90 to-[#100822]/90 p-8 sm:p-12 border border-amber-300/40 shadow-[0_20px_50px_rgba(246,205,97,0.25)] text-center relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <Heart className="w-36 h-36 fill-rose-500" />
              </div>

              <div className="relative z-10 flex flex-col items-center">
                <div className="w-14 h-14 rounded-full bg-amber-400/20 border border-amber-300/40 flex items-center justify-center mb-4">
                  <Heart className="w-7 h-7 text-pink-400 fill-pink-400" />
                </div>

                <span className="text-xs uppercase tracking-widest text-amber-300 font-semibold mb-2">
                  Grand Secret Unlocked ✨
                </span>

                <h3 className="font-display-title text-2xl sm:text-3xl text-white font-medium mb-6">
                  Through Loving Eyes
                </h3>

                <p className="font-serif-luxury italic text-xl sm:text-2xl text-pink-100/95 leading-relaxed max-w-2xl mb-8">
                  &ldquo;{BIRTHDAY_CONFIG.grandSecretMessage}&rdquo;
                </p>

                <button
                  onClick={handleResetStars}
                  className="text-xs font-sans text-amber-200/80 hover:text-white glass-panel px-4 py-2 rounded-full border border-white/10 transition-colors flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Rediscover constellation</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
