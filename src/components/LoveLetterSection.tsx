import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Heart, Sparkles, Flame, CheckCircle, RotateCcw } from 'lucide-react';
import { TulipBloom } from './TulipFlower';
import { BIRTHDAY_CONFIG } from '../config/birthdayConfig';
import { soundManager } from '../utils/audioSynthesizer';

interface LoveLetterSectionProps {
  senderName: string;
  recipientName: string;
}

export const LoveLetterSection: React.FC<LoveLetterSectionProps> = ({
  senderName,
  recipientName,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [displayedTextLength, setDisplayedTextLength] = useState(0);
  const [isTypewriterComplete, setIsTypewriterComplete] = useState(false);

  // Combine full letter text for smooth typewriter
  const fullText = [
    BIRTHDAY_CONFIG.letterSalutation,
    '',
    ...BIRTHDAY_CONFIG.letterParagraphs,
    '',
    BIRTHDAY_CONFIG.letterClosing,
    `— ${senderName || BIRTHDAY_CONFIG.senderName}`,
  ].join('\n');

  // Typewriter effect
  useEffect(() => {
    if (!isOpen || isTypewriterComplete) return;

    if (displayedTextLength < fullText.length) {
      const timer = setTimeout(() => {
        setDisplayedTextLength((prev) => Math.min(fullText.length, prev + 3));
      }, 25);
      return () => clearTimeout(timer);
    } else {
      setIsTypewriterComplete(true);
    }
  }, [isOpen, displayedTextLength, fullText.length, isTypewriterComplete]);

  const handleOpenEnvelope = () => {
    setIsOpen(true);
    setDisplayedTextLength(0);
    setIsTypewriterComplete(false);
    soundManager.playChime(1.2);
  };

  const handleRevealAll = () => {
    setDisplayedTextLength(fullText.length);
    setIsTypewriterComplete(true);
    soundManager.playChime(1.4);
  };

  const handleFoldBack = () => {
    setIsOpen(false);
    setDisplayedTextLength(0);
    setIsTypewriterComplete(false);
  };

  return (
    <section id="love-letter" className="relative py-28 px-6 overflow-hidden">
      {/* Candlelight Glow Ambiance */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute top-1/3 left-1/4 w-80 h-80 rounded-full bg-amber-500/15 blur-[100px] animate-pulse-glow" />
        <div className="absolute top-1/2 right-1/4 w-96 h-96 rounded-full bg-rose-600/10 blur-[120px]" />
      </div>

      <div className="max-w-4xl mx-auto flex flex-col items-center">
        {/* Editorial Index */}
        <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-amber-200/80 font-medium mb-3">
          <span>Chapter 02</span>
          <span aria-hidden="true">·</span>
          <span>From My Heart To Yours</span>
        </div>

        <h2 className="font-display-title text-3xl sm:text-4xl md:text-5xl font-semibold text-center text-white mb-4">
          A Love Letter
        </h2>

        <p className="font-serif-luxury italic text-lg sm:text-xl text-pink-200/80 text-center max-w-xl mb-12">
          Written in the quiet hours, sealed with golden starlight, meant for your eyes only.
        </p>

        {/* Ambient Candle Illustrations */}
        <div className="flex items-center justify-center gap-12 sm:gap-24 mb-8 opacity-85">
          {/* Candle Left */}
          <div className="flex flex-col items-center">
            <div className="w-3 h-5 bg-gradient-to-t from-amber-500 via-amber-300 to-yellow-100 rounded-full blur-[1px] animate-flame shadow-[0_0_15px_rgba(253,224,71,0.8)]" />
            <div className="w-1 h-2 bg-slate-800" />
            <div className="w-5 h-16 bg-gradient-to-b from-amber-100 to-amber-200/80 rounded-t-sm shadow-md" />
          </div>

          {/* Center decorative wax seal icon */}
          <div className="flex items-center gap-2 text-xs font-serif-luxury italic text-amber-200/90">
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>Dedicated to {recipientName || 'You'}</span>
            <Sparkles className="w-4 h-4 text-amber-300" />
          </div>

          {/* Candle Right */}
          <div className="flex flex-col items-center">
            <div className="w-3.5 h-6 bg-gradient-to-t from-amber-500 via-amber-300 to-yellow-100 rounded-full blur-[1px] animate-flame shadow-[0_0_18px_rgba(253,224,71,0.9)]" />
            <div className="w-1 h-2 bg-slate-800" />
            <div className="w-6 h-20 bg-gradient-to-b from-amber-100 to-amber-200/80 rounded-t-sm shadow-md" />
          </div>
        </div>

        {/* Envelope & Letter Container */}
        <div className="relative w-full max-w-2xl min-h-[440px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            {!isOpen ? (
              /* Closed Envelope View with Wax Seal */
              <motion.div
                key="envelope-closed"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ duration: 0.5 }}
                className="relative w-full max-w-lg aspect-[16/11] rounded-2xl glass-panel p-6 border border-amber-300/30 flex flex-col items-center justify-center shadow-[0_15px_50px_rgba(0,0,0,0.5)] overflow-hidden group cursor-pointer"
                onClick={handleOpenEnvelope}
              >
                {/* Envelope Flap Lines */}
                <div className="absolute inset-0 pointer-events-none">
                  {/* Diagonal folds */}
                  <svg className="w-full h-full opacity-20 stroke-amber-200" fill="none">
                    <line x1="0" y1="0" x2="50%" y2="55%" strokeWidth="1.5" />
                    <line x1="100%" y1="0" x2="50%" y2="55%" strokeWidth="1.5" />
                    <line x1="0" y1="100%" x2="50%" y2="55%" strokeWidth="1" />
                    <line x1="100%" y1="100%" x2="50%" y2="55%" strokeWidth="1" />
                  </svg>
                  {/* Subtle paper texture overlay */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-amber-900/10 via-transparent to-pink-900/15" />
                </div>

                {/* Wax Seal in Center with Blooming Tulip Charm */}
                <div className="relative z-10 flex flex-col items-center">
                  <div className="relative w-20 h-20 rounded-full bg-gradient-to-tr from-rose-800 via-rose-700 to-rose-900 shadow-[0_0_25px_rgba(225,29,72,0.45)] border-2 border-rose-400/40 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                    {/* Glowing Tulip tucked behind wax seal */}
                    <div className="absolute -top-7 -right-6 transform rotate-25 opacity-95 pointer-events-none">
                      <TulipBloom color="pink" size={54} />
                    </div>

                    {/* Seal Ring */}
                    <div className="w-16 h-16 rounded-full border border-dashed border-rose-300/60 flex flex-col items-center justify-center">
                      <span className="font-serif-luxury font-bold text-amber-100 text-sm tracking-wider">
                        {BIRTHDAY_CONFIG.waxSealInitials}
                      </span>
                      <Heart className="w-3 h-3 text-pink-300 fill-pink-300 mt-0.5" />
                    </div>
                  </div>

                  <p className="font-serif-luxury italic text-amber-100/90 text-sm mt-5 tracking-wide">
                    To My 18-Year-Old Starlight
                  </p>
                </div>

                {/* Open Button */}
                <button
                  onClick={handleOpenEnvelope}
                  className="relative z-10 mt-6 inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full text-xs font-semibold tracking-wider text-[#221033] bg-gradient-to-r from-amber-200 via-pink-200 to-amber-100 shadow-[0_0_25px_rgba(253,230,138,0.5)] group-hover:shadow-[0_0_35px_rgba(253,230,138,0.8)] transition-all focus-visible:outline-2 focus-visible:outline-amber-300"
                  aria-label="Open love letter"
                >
                  <Mail className="w-3.5 h-3.5 text-pink-700" />
                  <span>OPEN MY HEART 💌</span>
                </button>
              </motion.div>
            ) : (
              /* Unfolded Letter Parchment View */
              <motion.div
                key="letter-open"
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="relative w-full rounded-2xl bg-[#fdfbf7] text-[#2c1d18] p-8 sm:p-12 shadow-[0_25px_70px_rgba(0,0,0,0.65)] border border-amber-200/50"
              >
                {/* Parchment aesthetic top border & watermark with Tulip */}
                <div className="flex items-center justify-between pb-6 border-b border-[#e2d5c8] mb-6">
                  <div className="flex items-center gap-2 text-xs font-serif-luxury uppercase tracking-widest text-[#8b6e60]">
                    <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                    <span>November 3, 2026</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <TulipBloom color="pink" size={32} glow={false} />
                    <span className="font-script-accent text-2xl text-rose-700">
                      Forever & Always
                    </span>
                  </div>
                </div>

                {/* Typewriter text content */}
                <div className="font-serif-luxury text-base sm:text-lg leading-[1.8] text-[#33221b] whitespace-pre-line min-h-[280px]">
                  {fullText.slice(0, displayedTextLength)}
                  {!isTypewriterComplete && (
                    <span className="inline-block w-1.5 h-5 bg-rose-600 ml-1 animate-pulse align-middle" />
                  )}
                </div>

                {/* Bottom Controls */}
                <div className="flex flex-wrap items-center justify-between gap-4 pt-8 mt-6 border-t border-[#e2d5c8]">
                  <div className="flex items-center gap-2">
                    {!isTypewriterComplete ? (
                      <button
                        onClick={handleRevealAll}
                        className="text-xs font-sans font-medium text-amber-800 hover:text-amber-950 bg-amber-100 hover:bg-amber-200/80 px-3.5 py-1.5 rounded-full transition-colors flex items-center gap-1.5"
                      >
                        <CheckCircle className="w-3.5 h-3.5 text-amber-700" />
                        <span>Reveal Complete Letter</span>
                      </button>
                    ) : (
                      <span className="text-xs font-serif-luxury italic text-rose-700 flex items-center gap-1">
                        <Heart className="w-3.5 h-3.5 fill-rose-600" />
                        Every word belongs to you
                      </span>
                    )}
                  </div>

                  <button
                    onClick={handleFoldBack}
                    className="text-xs font-sans text-stone-600 hover:text-stone-900 flex items-center gap-1.5 transition-colors"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Fold back envelope</span>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
