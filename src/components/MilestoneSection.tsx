import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Heart, Compass, Feather, Star } from 'lucide-react';
import { BIRTHDAY_CONFIG } from '../config/birthdayConfig';
import { soundManager } from '../utils/audioSynthesizer';

export const MilestoneSection: React.FC = () => {
  const [activeCard, setActiveCard] = useState<number | null>(null);

  const cardIcons = [
    <Feather key="feather" className="w-5 h-5 text-amber-300" />,
    <Heart key="heart" className="w-5 h-5 text-pink-400 fill-pink-400/20" />,
    <Compass key="compass" className="w-5 h-5 text-purple-300" />,
  ];

  const handleCardInteraction = (idx: number) => {
    setActiveCard(activeCard === idx ? null : idx);
    soundManager.playChime(1.0 + idx * 0.15);
  };

  return (
    <section id="milestone" className="relative py-28 px-6 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-r from-amber-500/10 via-pink-500/15 to-purple-800/15 rounded-full blur-[140px]" />
      </div>

      <div className="max-w-6xl mx-auto flex flex-col items-center">
        {/* Editorial Index */}
        <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-amber-200/80 font-medium mb-3">
          <span>Chapter 01</span>
          <span aria-hidden="true">·</span>
          <span>The Golden Milestone</span>
        </div>

        {/* Section Heading */}
        <h2 className="font-display-title text-3xl sm:text-4xl md:text-5xl font-semibold text-center text-white mb-6 text-balance">
          {BIRTHDAY_CONFIG.milestoneHeading}
        </h2>

        <p className="font-serif-luxury text-lg sm:text-xl text-pink-200/85 text-center max-w-2xl leading-relaxed mb-16">
          {BIRTHDAY_CONFIG.milestoneDescription}
        </p>

        {/* Huge Illuminated "18" Display Anchor */}
        <div className="relative my-10 flex items-center justify-center">
          {/* Shimmering particle rings & breathing aura */}
          <div className="absolute -inset-14 rounded-full bg-gradient-to-tr from-amber-400/25 via-pink-500/20 to-purple-600/35 blur-3xl animate-aura-breathe" />
          
          {/* Celestial Orbit Ring */}
          <div className="absolute w-72 sm:w-96 md:w-[32rem] h-72 sm:h-96 md:h-[32rem] rounded-full border border-dashed border-amber-300/25 animate-[spin_60s_linear_infinite] pointer-events-none" />
          <div className="absolute w-80 sm:w-[26rem] md:w-[35rem] h-80 sm:h-[26rem] md:h-[35rem] rounded-full border border-amber-200/10 animate-[spin_45s_linear_infinite_reverse] pointer-events-none" />

          {/* Golden Light Trails */}
          <div className="relative z-10 flex items-center justify-center font-display-title text-8xl sm:text-9xl md:text-[13rem] font-bold tracking-tighter leading-none select-none text-transparent bg-clip-text bg-gradient-to-b from-amber-100 via-amber-200 to-amber-500/80 drop-shadow-[0_0_50px_rgba(246,205,97,0.5)]">
            <span className="hover:scale-105 transition-transform duration-300">1</span>
            <span className="hover:scale-105 transition-transform duration-300">8</span>

            {/* Floating golden star charms */}
            <motion.div
              animate={{ y: [-8, 8, -8], rotate: [0, 25, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -top-4 -right-4 sm:-top-8 sm:-right-8 text-amber-300"
            >
              <Sparkles className="w-8 h-8 sm:w-14 sm:h-14 text-amber-300 drop-shadow-[0_0_20px_rgba(246,205,97,0.9)]" />
            </motion.div>

            <motion.div
              animate={{ y: [8, -8, 8], rotate: [0, -25, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -bottom-2 -left-4 sm:-bottom-4 sm:-left-8 text-pink-300"
            >
              <Star className="w-6 h-6 sm:w-12 sm:h-12 fill-pink-300 text-pink-300 drop-shadow-[0_0_20px_rgba(244,114,182,0.9)]" />
            </motion.div>
          </div>
        </div>

        {/* Milestone Cards (3-column layout) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mt-14">
          {BIRTHDAY_CONFIG.milestoneCards.map((card, idx) => {
            const isSelected = activeCard === idx;
            return (
              <motion.button
                key={card.title}
                whileHover={{ y: -4 }}
                onClick={() => handleCardInteraction(idx)}
                className={`relative text-left rounded-2xl p-7 transition-all duration-300 flex flex-col justify-between border cursor-pointer ${
                  isSelected
                    ? 'glass-panel-gold border-amber-300/40 shadow-[0_10px_35px_-5px_rgba(246,205,97,0.25)]'
                    : 'glass-panel hover:glass-panel-gold border-white/10 hover:border-amber-200/30'
                }`}
                aria-label={`Milestone: ${card.title}. Click to reveal deep reflection.`}
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                      {cardIcons[idx]}
                    </div>
                    <span className="text-[11px] font-mono tabular-nums text-amber-200/60 uppercase">
                      0{idx + 1}
                    </span>
                  </div>

                  <h3 className="font-display-title text-xl text-white font-medium mb-2 leading-snug">
                    {card.title}
                  </h3>

                  <p className="text-sm text-pink-200/80 leading-relaxed mb-4">
                    {card.description}
                  </p>
                </div>

                {/* Expanded deep reflection */}
                <div
                  className={`pt-4 border-t border-white/10 transition-all duration-300 ${
                    isSelected ? 'opacity-100 max-h-40' : 'opacity-70 max-h-24'
                  }`}
                >
                  <p className="font-serif-luxury italic text-sm text-amber-100/90 leading-relaxed">
                    &ldquo;{card.detail}&rdquo;
                  </p>
                  <span className="block mt-3 text-[10px] uppercase tracking-wider text-pink-300/80 font-medium">
                    {isSelected ? 'Tap to minimize' : 'Tap for reflection ♡'}
                  </span>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
