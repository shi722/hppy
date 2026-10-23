import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { Sparkles, Heart, Lock, Unlock, Delete, RotateCcw } from 'lucide-react';
import { soundManager } from '../utils/audioSynthesizer';
import { BIRTHDAY_CONFIG } from '../config/birthdayConfig';

interface OpeningSceneProps {
  onEnter: () => void;
  recipientName: string;
}

export const OpeningScene: React.FC<OpeningSceneProps> = ({ onEnter, recipientName }) => {
  const [passcode, setPasscode] = useState<string>('');
  const [isError, setIsError] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);

  const targetCode = BIRTHDAY_CONFIG.secretPasscode || '0305';

  const triggerSuccess = useCallback(() => {
    setIsSuccess(true);
    setIsError(false);

    // 1. Play celebratory chime
    soundManager.playChime(1.5);
    setTimeout(() => soundManager.playChime(1.8), 200);

    // 2. Fire magical stardust confetti
    try {
      confetti({
        particleCount: 85,
        spread: 95,
        origin: { y: 0.6 },
        colors: ['#f6cd61', '#fda4af', '#f472b6', '#ffffff', '#fed7aa'],
      });
    } catch {
      // Fallback
    }

    // 3. Start background music
    soundManager.play();

    // 4. Smooth cinematic portal transition into universe
    setTimeout(() => {
      setIsTransitioning(true);
    }, 950);

    setTimeout(() => {
      onEnter();
    }, 2100);
  }, [onEnter]);

  // Handle digit press
  const handleDigitPress = useCallback((digit: string) => {
    if (isSuccess || isTransitioning) return;
    if (passcode.length >= 4) return;

    const nextCode = passcode + digit;
    setPasscode(nextCode);
    setIsError(false);

    // Play musical note per digit entry
    const noteMultiplier = 1.0 + nextCode.length * 0.15;
    soundManager.playChime(noteMultiplier);

    // Check if 4 digits reached
    if (nextCode.length === 4) {
      if (nextCode === targetCode) {
        triggerSuccess();
      } else {
        // Wrong passcode
        setIsError(true);
        soundManager.playChime(0.75); // Soft low chime
        setTimeout(() => {
          setPasscode('');
          setIsError(false);
        }, 900);
      }
    }
  }, [passcode, isSuccess, isTransitioning, targetCode, triggerSuccess]);

  // Handle backspace / clear
  const handleDelete = useCallback(() => {
    if (isSuccess || isTransitioning) return;
    if (passcode.length > 0) {
      setPasscode((prev) => prev.slice(0, -1));
      soundManager.playChime(0.9);
      setIsError(false);
    }
  }, [passcode.length, isSuccess, isTransitioning]);

  const handleClear = useCallback(() => {
    if (isSuccess || isTransitioning) return;
    setPasscode('');
    setIsError(false);
    soundManager.playChime(0.85);
  }, [isSuccess, isTransitioning]);

  // Support physical / mobile keyboard entry
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isSuccess || isTransitioning) return;
      if (/^[0-9]$/.test(e.key)) {
        handleDigitPress(e.key);
      } else if (e.key === 'Backspace') {
        handleDelete();
      } else if (e.key === 'Escape') {
        handleClear();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleDigitPress, handleDelete, handleClear, isSuccess, isTransitioning]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto py-10 px-4 bg-gradient-to-b from-[#060411] via-[#0d0924] to-[#170e38] text-white">
      {/* Background celestial scenery */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Soft nebula glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-gradient-to-tr from-purple-900/30 via-pink-600/15 to-amber-300/10 blur-[130px]" />
        <div className="absolute bottom-10 left-1/3 w-[500px] h-[400px] rounded-full bg-indigo-900/25 blur-[100px]" />

        {/* Crescent Moon */}
        <div className="absolute top-10 right-8 md:top-16 md:right-24 flex flex-col items-center">
          <div className="relative">
            <div className="absolute -inset-4 rounded-full bg-amber-200/20 blur-xl animate-pulse" />
            <svg
              className="w-14 h-14 md:w-18 md:h-18 text-amber-100/90 drop-shadow-[0_0_25px_rgba(253,230,138,0.7)]"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
            <div className="absolute -bottom-2 -left-2 animate-ping opacity-75">
              <Sparkles className="w-3.5 h-3.5 text-amber-200" />
            </div>
          </div>
        </div>

        {/* Distant Fairytale Castle Silhouette in the Mist */}
        <div className="absolute bottom-0 inset-x-0 h-44 md:h-56 opacity-25 flex justify-center items-end overflow-hidden">
          <svg
            className="w-full max-w-4xl h-full fill-[#1c1240]"
            viewBox="0 0 1200 400"
            preserveAspectRatio="none"
          >
            <path d="M0,400 L0,320 Q200,290 400,330 L400,260 L420,240 L440,260 L440,330 Q520,310 560,280 L560,180 L575,130 L590,180 L590,280 L610,280 L610,150 L630,110 L650,150 L650,280 L670,280 L670,200 L685,160 L700,200 L700,290 Q800,320 950,290 L950,250 L970,220 L990,250 L990,300 Q1100,330 1200,320 L1200,400 Z" />
          </svg>
          <div className="absolute inset-0 bg-gradient-to-t from-[#060411] via-transparent to-transparent" />
        </div>
      </div>

      {/* Main Secret Gate Content */}
      <AnimatePresence mode="wait">
        {!isTransitioning ? (
          <motion.div
            key="secret-portal-card"
            initial={{ opacity: 0, y: 25, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 1.08, filter: 'blur(12px)' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full max-w-md mx-auto my-auto flex flex-col items-center text-center p-6 sm:p-8 rounded-3xl glass-panel-gold border border-amber-300/30 shadow-[0_20px_70px_rgba(0,0,0,0.6)] backdrop-blur-2xl"
          >
            {/* Celestial Lock Icon Badge */}
            <div className="relative mb-5">
              <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-400/20 via-pink-500/20 to-purple-600/30 border border-amber-200/40 flex items-center justify-center shadow-[0_0_30px_rgba(246,205,97,0.35)]">
                {isSuccess ? (
                  <Unlock className="w-7 h-7 text-emerald-300 animate-bounce" />
                ) : (
                  <Lock className="w-7 h-7 text-amber-200 animate-pulse" />
                )}
              </div>
              <div className="absolute -top-1 -right-1">
                <Sparkles className="w-4 h-4 text-amber-300 animate-spin" />
              </div>
            </div>

            {/* Kicker badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-amber-300/25 bg-amber-500/10 text-[11px] uppercase tracking-widest text-amber-200/90 font-medium mb-3">
              <Sparkles className="w-3 h-3 text-amber-300" />
              <span>Celestial Gate for {recipientName || 'You'}</span>
              <Sparkles className="w-3 h-3 text-amber-300" />
            </div>

            {/* Portal Title */}
            <h1 className="font-display-title text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-shimmer-magic mb-2 leading-tight">
              Enter Our Secret Code
            </h1>

            <p className="font-serif-luxury italic text-sm sm:text-base text-pink-200/90 max-w-xs mb-6">
              &ldquo;A secret key known only to us... Enter the 4-digit code to step inside.&rdquo;
            </p>

            {/* 4 Starlight Rune Digit Slots — Masked with glowing hearts */}
            <motion.div
              animate={isError ? { x: [-10, 10, -8, 8, -4, 4, 0] } : {}}
              transition={{ duration: 0.5 }}
              className="flex items-center justify-center gap-3 sm:gap-4 mb-6"
            >
              {[0, 1, 2, 3].map((index) => {
                const isFilled = passcode[index] !== undefined;
                const isCurrent = passcode.length === index;

                return (
                  <motion.div
                    key={`slot-${index}`}
                    animate={{
                      scale: isFilled ? 1.08 : isCurrent ? [1, 1.04, 1] : 1,
                    }}
                    transition={{
                      scale: { duration: 0.2 },
                      repeat: isCurrent ? Infinity : 0,
                      repeatDelay: 1.2,
                    }}
                    className={`w-12 h-14 sm:w-14 sm:h-16 rounded-2xl flex items-center justify-center transition-all duration-300 border ${
                      isSuccess
                        ? 'bg-emerald-500/25 border-emerald-300 text-emerald-200 shadow-[0_0_25px_rgba(52,211,153,0.8)]'
                        : isError
                        ? 'bg-rose-500/25 border-rose-400 text-rose-200 shadow-[0_0_20px_rgba(244,63,94,0.7)]'
                        : isFilled
                        ? 'bg-gradient-to-b from-amber-200/25 to-pink-500/25 border-amber-300 shadow-[0_0_20px_rgba(253,230,138,0.5)]'
                        : isCurrent
                        ? 'bg-white/10 border-amber-300/80 shadow-[0_0_15px_rgba(246,205,97,0.3)]'
                        : 'bg-white/5 border-white/15 text-slate-500'
                    }`}
                  >
                    {isFilled ? (
                      <motion.div
                        initial={{ scale: 0, rotate: -25 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: 'spring', stiffness: 450, damping: 25 }}
                      >
                        <Heart className="w-5 h-5 sm:w-6 sm:h-6 fill-pink-400 text-pink-300 drop-shadow-[0_0_10px_rgba(244,114,182,0.9)]" />
                      </motion.div>
                    ) : (
                      <Sparkles className="w-3.5 h-3.5 text-amber-200/30" />
                    )}
                  </motion.div>
                );
              })}
            </motion.div>

            {/* Status Message */}
            <div className="h-6 flex items-center justify-center mb-5 text-xs font-medium">
              {isSuccess ? (
                <span className="text-emerald-300 flex items-center gap-1.5 animate-pulse">
                  <Sparkles className="w-3.5 h-3.5" />
                  The stars have aligned! Welcome, my love... ✨
                </span>
              ) : isError ? (
                <span className="text-rose-300 flex items-center gap-1">
                  Incorrect code... Try again! 💫
                </span>
              ) : (
                <span className="text-slate-400 text-[11px] tracking-wide">
                  Enter your 4-digit secret key
                </span>
              )}
            </div>

            {/* On-Screen Celestial Keypad (0-9, Clear, Delete) */}
            <div className="grid grid-cols-3 gap-2 sm:gap-2.5 w-full max-w-[280px] select-none">
              {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((num) => (
                <button
                  key={`key-${num}`}
                  type="button"
                  onClick={() => handleDigitPress(num)}
                  disabled={isSuccess || isTransitioning}
                  className="h-12 sm:h-13 rounded-2xl glass-panel-subtle hover:glass-panel text-lg font-semibold text-amber-100 hover:text-white border border-white/10 hover:border-amber-300/40 active:scale-95 transition-all flex items-center justify-center cursor-pointer shadow-md hover:shadow-amber-400/20"
                >
                  {num}
                </button>
              ))}

              {/* Clear button */}
              <button
                type="button"
                onClick={handleClear}
                disabled={isSuccess || isTransitioning || passcode.length === 0}
                className="h-12 sm:h-13 rounded-2xl glass-panel-subtle hover:glass-panel text-xs font-medium text-slate-300 hover:text-rose-300 border border-white/10 active:scale-95 transition-all flex items-center justify-center cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
                title="Clear"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              {/* 0 Button */}
              <button
                type="button"
                onClick={() => handleDigitPress('0')}
                disabled={isSuccess || isTransitioning}
                className="h-12 sm:h-13 rounded-2xl glass-panel-subtle hover:glass-panel text-lg font-semibold text-amber-100 hover:text-white border border-white/10 hover:border-amber-300/40 active:scale-95 transition-all flex items-center justify-center cursor-pointer shadow-md hover:shadow-amber-400/20"
              >
                0
              </button>

              {/* Backspace Button */}
              <button
                type="button"
                onClick={handleDelete}
                disabled={isSuccess || isTransitioning || passcode.length === 0}
                className="h-12 sm:h-13 rounded-2xl glass-panel-subtle hover:glass-panel text-xs font-medium text-slate-300 hover:text-amber-200 border border-white/10 active:scale-95 transition-all flex items-center justify-center cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
                title="Delete"
              >
                <Delete className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        ) : (
          /* Cinematic Grand Bloom Transition */
          <motion.div
            key="grand-bloom"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-b from-[#1b0e35] via-[#241242] to-[#080514]"
          >
            <motion.div
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: [0.6, 1.4, 3.2], opacity: [0, 1, 0] }}
              transition={{ duration: 1.3, ease: 'easeInOut' }}
              className="w-96 h-96 rounded-full bg-gradient-to-r from-amber-200 via-pink-300 to-purple-400 blur-3xl pointer-events-none"
            />
            <div className="relative z-10 flex flex-col items-center gap-3 text-center">
              <div className="w-16 h-16 rounded-full bg-amber-400/20 flex items-center justify-center border border-amber-300/40 animate-pulse">
                <Heart className="w-8 h-8 text-pink-400 fill-pink-400" />
              </div>
              <h2 className="font-display-title text-2xl sm:text-4xl text-amber-100 tracking-wider">
                Unlocking {recipientName ? `${recipientName}'s` : 'Her'} Universe... ✨
              </h2>
              <p className="font-serif-luxury italic text-pink-200 text-sm sm:text-base">
                Welcome to your 18th Birthday Fairytale
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
