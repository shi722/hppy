import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Heart, Star, Check } from 'lucide-react';
import { BIRTHDAY_CONFIG } from '../config/birthdayConfig';
import { soundManager } from '../utils/audioSynthesizer';

export const ReasonsSection: React.FC = () => {
  const [revealedIds, setRevealedIds] = useState<number[]>([]);

  const toggleReveal = (id: number) => {
    if (revealedIds.includes(id)) {
      setRevealedIds(revealedIds.filter((item) => item !== id));
    } else {
      setRevealedIds([...revealedIds, id]);
      soundManager.playChime(1.1 + id * 0.08);
    }
  };

  const revealAll = () => {
    setRevealedIds(BIRTHDAY_CONFIG.compliments.map((c) => c.id));
    soundManager.playChime(1.3);
  };

  return (
    <section id="reasons" className="relative py-28 px-6 overflow-hidden">
      {/* Background starlight glow */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute top-1/2 left-1/3 w-[600px] h-[600px] bg-gradient-to-tr from-pink-600/10 via-purple-600/15 to-amber-300/10 rounded-full blur-[140px]" />
      </div>

      <div className="max-w-6xl mx-auto flex flex-col items-center">
        {/* Editorial Index */}
        <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-amber-200/80 font-medium mb-3">
          <span>Chapter 04</span>
          <span aria-hidden="true">·</span>
          <span>Endless Admiration</span>
        </div>

        <h2 className="font-display-title text-3xl sm:text-4xl md:text-5xl font-semibold text-center text-white mb-4">
          Reasons You Are So Special
        </h2>

        <p className="font-serif-luxury text-lg sm:text-xl text-pink-200/85 text-center max-w-2xl leading-relaxed mb-6">
          There are countless reasons why you hold such a sacred place in my life. Touch each card to reveal the truth behind my smile.
        </p>

        {/* Action button to reveal all */}
        <div className="mb-14">
          <button
            onClick={revealAll}
            className="text-xs font-sans font-medium text-amber-200/90 hover:text-amber-100 glass-panel-subtle hover:glass-panel px-4 py-2 rounded-full border border-amber-300/20 transition-all flex items-center gap-1.5 focus-visible:outline-2 focus-visible:outline-amber-300"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Reveal All Reasons at Once</span>
          </button>
        </div>

        {/* Compliment Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {BIRTHDAY_CONFIG.compliments.map((compliment, idx) => {
            const isRevealed = revealedIds.includes(compliment.id);
            return (
              <motion.button
                key={compliment.id}
                whileHover={{ y: -5, scale: 1.02 }}
                onClick={() => toggleReveal(compliment.id)}
                className={`relative rounded-2xl p-7 text-left transition-all duration-300 flex flex-col justify-between min-h-[220px] border cursor-pointer ${
                  isRevealed
                    ? 'glass-panel-gold border-amber-300/40 shadow-[0_10px_30px_rgba(246,205,97,0.2)]'
                    : 'glass-panel hover:glass-panel-gold border-white/10 hover:border-amber-300/30'
                }`}
                aria-label={`Reason ${idx + 1}: ${compliment.tag}. Touch to reveal.`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs uppercase tracking-widest text-amber-300/90 font-medium flex items-center gap-1.5">
                      <Star className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
                      {compliment.tag}
                    </span>
                    <span className="text-[11px] font-mono tabular-nums text-slate-400">
                      0{idx + 1}
                    </span>
                  </div>

                  <p
                    className={`font-serif-luxury text-lg sm:text-xl leading-relaxed transition-all duration-300 ${
                      isRevealed
                        ? 'text-white'
                        : 'text-pink-200/40 filter blur-[3px] select-none'
                    }`}
                  >
                    &ldquo;{compliment.text}&rdquo;
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs">
                  <span className="text-pink-300/80 font-sans">
                    {isRevealed ? (
                      <span className="flex items-center gap-1 text-amber-200">
                        <Check className="w-3.5 h-3.5 text-amber-300" />
                        Revealed with love
                      </span>
                    ) : (
                      'Tap to unveil ✨'
                    )}
                  </span>
                  <Heart
                    className={`w-4 h-4 transition-colors ${
                      isRevealed
                        ? 'text-pink-400 fill-pink-400'
                        : 'text-slate-600'
                    }`}
                  />
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Final Grand Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="w-full max-w-3xl mt-10 rounded-2xl glass-panel-gold p-8 sm:p-10 text-center border border-amber-300/30 shadow-[0_15px_40px_rgba(246,205,97,0.2)]"
        >
          <div className="inline-flex items-center justify-center p-3 rounded-full bg-amber-400/10 border border-amber-300/30 mb-4">
            <Heart className="w-6 h-6 text-pink-400 fill-pink-400" />
          </div>
          <h3 className="font-display-title text-2xl sm:text-3xl text-amber-100 font-medium mb-3">
            To Infinity & Beyond
          </h3>
          <p className="font-serif-luxury italic text-xl sm:text-2xl text-pink-200/95 max-w-xl mx-auto leading-relaxed">
            &ldquo;{BIRTHDAY_CONFIG.finalCompliment}&rdquo;
          </p>
        </motion.div>
      </div>
    </section>
  );
};
