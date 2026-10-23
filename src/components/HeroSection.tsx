import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Heart, ArrowDown, Star } from 'lucide-react';
import { CountdownWidget } from './CountdownWidget';
import { TulipGardenRow } from './TulipFlower';
import { BIRTHDAY_CONFIG } from '../config/birthdayConfig';

interface HeroSectionProps {
  recipientName: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ recipientName }) => {
  return (
    <section id="top" className="relative min-h-screen pt-28 pb-20 flex flex-col items-center justify-center overflow-hidden">
      {/* Enchanted Garden at Night Layered Backdrop */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        {/* Sky gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#060412] via-[#100a26] to-[#080514]" />

        {/* Ethereal Moonlight Beam */}
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[600px] h-[750px] bg-gradient-to-b from-amber-100/15 via-pink-400/10 to-transparent blur-3xl transform -rotate-12" />

        {/* Sparkling Lake Water Reflections */}
        <div className="absolute bottom-0 inset-x-0 h-64 bg-gradient-to-t from-[#0e0a24]/90 via-[#170e38]/40 to-transparent">
          {/* Subtle water ripple lines */}
          <div className="w-full h-full opacity-30 bg-[radial-gradient(ellipse_at_bottom,_rgba(246,205,97,0.25)_0%,_transparent_70%)]" />
        </div>

        {/* Glowing Enchanted Tulips at the base */}
        <div className="absolute -bottom-4 inset-x-0 px-4 md:px-12 opacity-60">
          <TulipGardenRow />
        </div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center flex flex-col items-center">
        {/* Kicker badge */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="inline-flex items-center gap-2 px-5 py-1.5 rounded-full glass-panel-subtle border border-amber-200/20 text-xs text-amber-200/90 font-medium tracking-widest uppercase mb-6"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>{BIRTHDAY_CONFIG.heroPreTitle}</span>
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
        </motion.div>

        {/* Main Heading with Celestial Shimmer */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="font-display-title text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-shimmer-magic max-w-4xl leading-[1.12] text-balance mb-6 drop-shadow-[0_0_35px_rgba(246,205,97,0.3)]"
        >
          {BIRTHDAY_CONFIG.heroTitle}
        </motion.h1>

        {/* Name in handwriting accent */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="font-script-accent text-2xl sm:text-4xl md:text-5xl text-pink-300 text-glow-rose mb-6 -rotate-2 flex flex-wrap items-center justify-center gap-2 max-w-full px-2"
        >
          <span>{recipientName ? `Dearest ${recipientName}` : 'Dearest Girl'}</span>
          <Heart className="w-4 h-4 sm:w-6 sm:h-6 text-pink-400 fill-pink-400 inline-block align-middle" />
        </motion.div>

        {/* Supporting text */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="font-serif-luxury text-lg sm:text-xl md:text-2xl text-pink-100/85 max-w-2xl leading-relaxed text-balance mb-8"
        >
          &ldquo;{BIRTHDAY_CONFIG.heroSubtitle}&rdquo;
        </motion.p>

        {/* Countdown Component */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="w-full"
        >
          <CountdownWidget targetDateStr={BIRTHDAY_CONFIG.birthdayDate} />
        </motion.div>

        {/* Action CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.55 }}
          className="flex flex-wrap items-center justify-center gap-4 mt-8"
        >
          <a
            href="#milestone"
            className="px-8 py-4 rounded-full text-sm font-semibold tracking-wide text-[#23153c] bg-gradient-to-r from-amber-200 via-pink-200 to-amber-100 shadow-[0_0_30px_rgba(253,230,138,0.4)] hover:shadow-[0_0_45px_rgba(253,230,138,0.7)] hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-2 focus-visible:outline-2 focus-visible:outline-amber-300"
          >
            <span>{BIRTHDAY_CONFIG.heroCtaPrimary}</span>
            <Heart className="w-4 h-4 fill-pink-500 text-pink-600" />
          </a>

          <a
            href="#secret-stars"
            className="px-7 py-4 rounded-full text-sm font-medium tracking-wide text-amber-100 glass-panel hover:glass-panel-gold hover:text-white border border-white/15 hover:border-amber-300/40 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-2 focus-visible:outline-2 focus-visible:outline-amber-300"
          >
            <span>{BIRTHDAY_CONFIG.heroCtaSecondary}</span>
            <Sparkles className="w-4 h-4 text-amber-300" />
          </a>
        </motion.div>

        {/* Gentle scroll indicator */}
        <div className="mt-14 animate-bounce opacity-60 flex flex-col items-center gap-1">
          <span className="text-[10px] uppercase tracking-widest text-slate-400">Scroll to Explore</span>
          <ArrowDown className="w-3.5 h-3.5 text-amber-200" />
        </div>
      </div>
    </section>
  );
};
