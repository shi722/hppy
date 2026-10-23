import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Heart, X, ChevronLeft, ChevronRight, Image as ImageIcon, Camera } from 'lucide-react';
import { BIRTHDAY_CONFIG, MemoryItem } from '../config/birthdayConfig';
import { soundManager } from '../utils/audioSynthesizer';

export const MemoryGallery: React.FC = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const memories = BIRTHDAY_CONFIG.memories;

  const handleOpenLightbox = (index: number) => {
    setSelectedIndex(index);
    soundManager.playChime(1.15);
  };

  const handleCloseLightbox = () => {
    setSelectedIndex(null);
  };

  const handlePrev = useCallback(() => {
    if (selectedIndex === null) return;
    setSelectedIndex((selectedIndex - 1 + memories.length) % memories.length);
    soundManager.playChime(1.05);
  }, [selectedIndex, memories.length]);

  const handleNext = useCallback(() => {
    if (selectedIndex === null) return;
    setSelectedIndex((selectedIndex + 1) % memories.length);
    soundManager.playChime(1.1);
  }, [selectedIndex, memories.length]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === 'Escape') handleCloseLightbox();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex, handlePrev, handleNext]);

  // Fallback Fairytale Vector Art for memory cards when no custom photo is provided
  const renderCardVisual = (mem: MemoryItem, idx: number) => {
    if (mem.imageUrl && mem.imageUrl.trim() !== '') {
      return (
        <img
          src={mem.imageUrl}
          alt={mem.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      );
    }

    // High-fidelity romantic fairytale illustration cards
    const palettes = [
      'from-purple-900/40 via-pink-900/30 to-amber-900/30',
      'from-indigo-900/40 via-purple-900/30 to-rose-900/30',
      'from-rose-950/40 via-amber-950/30 to-purple-900/30',
      'from-blue-950/40 via-indigo-900/30 to-pink-950/30',
      'from-amber-950/40 via-rose-900/30 to-indigo-950/30',
      'from-purple-950/40 via-rose-950/30 to-amber-900/30',
    ];

    return (
      <div
        className={`w-full h-full bg-gradient-to-br ${palettes[idx % palettes.length]} flex flex-col items-center justify-center p-6 text-center relative overflow-hidden`}
      >
        {/* Soft celestial backdrop patterns */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(246,205,97,0.15)_0%,_transparent_70%)]" />
        <div className="relative z-10 flex flex-col items-center">
          <div className="w-14 h-14 rounded-full bg-white/5 border border-amber-200/25 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
            <Sparkles className="w-6 h-6 text-amber-300/80" />
          </div>
          <span className="text-xs uppercase tracking-widest text-amber-200/90 font-medium mb-1">
            {mem.dateBadge}
          </span>
          <p className="font-serif-luxury italic text-sm text-pink-200/80 max-w-[200px]">
            &ldquo;{mem.subtitle}&rdquo;
          </p>
        </div>
      </div>
    );
  };

  return (
    <section id="memories" className="relative py-28 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        {/* Editorial Index */}
        <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-amber-200/80 font-medium mb-3">
          <span>Chapter 03</span>
          <span aria-hidden="true">·</span>
          <span>Our Little Universe</span>
        </div>

        <h2 className="font-display-title text-3xl sm:text-4xl md:text-5xl font-semibold text-center text-white mb-4">
          Memory Gallery
        </h2>

        <p className="font-serif-luxury text-lg sm:text-xl text-pink-200/85 text-center max-w-2xl leading-relaxed mb-16">
          Every memory with you is a tiny star pinned against my sky. Touch any portrait to revisit our story.
        </p>

        {/* 6-Card Cinematic Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {memories.map((item, idx) => (
            <motion.button
              key={item.id}
              whileHover={{ y: -6 }}
              onClick={() => handleOpenLightbox(idx)}
              className="group relative rounded-2xl overflow-hidden glass-panel border border-white/10 hover:border-amber-300/40 transition-all duration-300 text-left flex flex-col h-[380px] shadow-lg hover:shadow-[0_10px_30px_rgba(246,205,97,0.15)] cursor-pointer"
              aria-label={`View memory: ${item.title}`}
            >
              {/* Media Container */}
              <div className="relative h-60 w-full overflow-hidden bg-[#120a28]">
                {renderCardVisual(item, idx)}

                {/* Date Tag */}
                <div className="absolute top-3 left-3 px-3 py-1 rounded-full glass-panel-subtle text-[11px] text-amber-100 font-medium tracking-wider uppercase border border-white/10">
                  {item.dateBadge}
                </div>

                {/* Hover overlay hint */}
                <div className="absolute inset-0 bg-[#080514]/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1.5 text-xs text-amber-200 font-medium">
                  <Camera className="w-4 h-4 text-amber-300" />
                  <span>View in Lightbox</span>
                </div>
              </div>

              {/* Card Information */}
              <div className="p-5 flex flex-col justify-between flex-1 bg-gradient-to-b from-[#140c2e] to-[#0c071d]">
                <div>
                  <h3 className="font-display-title text-lg text-white font-medium mb-1 group-hover:text-amber-200 transition-colors">
                    {item.title}
                  </h3>
                  <p className="font-serif-luxury italic text-xs text-pink-200/80 line-clamp-1">
                    {item.subtitle}
                  </p>
                </div>

                <p className="text-xs text-slate-400 line-clamp-2 mt-2">
                  {item.note}
                </p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-[#060412]/95 backdrop-blur-xl"
            role="dialog"
            aria-modal="true"
            aria-label="Memory lightbox"
          >
            {/* Close Button */}
            <button
              onClick={handleCloseLightbox}
              className="absolute top-6 right-6 p-3 rounded-full glass-panel text-slate-300 hover:text-white hover:border-amber-300/40 transition-colors z-20 focus-visible:outline-2 focus-visible:outline-amber-300"
              aria-label="Close lightbox"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Previous Button */}
            <button
              onClick={handlePrev}
              className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 p-3 rounded-full glass-panel text-slate-300 hover:text-amber-200 hover:border-amber-300/40 transition-colors z-20 focus-visible:outline-2 focus-visible:outline-amber-300"
              aria-label="Previous photograph"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Next Button */}
            <button
              onClick={handleNext}
              className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 p-3 rounded-full glass-panel text-slate-300 hover:text-amber-200 hover:border-amber-300/40 transition-colors z-20 focus-visible:outline-2 focus-visible:outline-amber-300"
              aria-label="Next photograph"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Lightbox Content Card */}
            <motion.div
              key={selectedIndex}
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-3xl w-full rounded-2xl glass-panel border border-amber-200/20 overflow-hidden shadow-2xl flex flex-col"
            >
              {/* Media view */}
              <div className="relative aspect-[16/10] w-full bg-[#0a0618] flex items-center justify-center">
                {memories[selectedIndex].imageUrl && memories[selectedIndex].imageUrl.trim() !== '' ? (
                  <img
                    src={memories[selectedIndex].imageUrl}
                    alt={memories[selectedIndex].title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <div className="p-8 text-center flex flex-col items-center">
                    <div className="w-20 h-20 rounded-full bg-amber-500/10 border border-amber-300/30 flex items-center justify-center mb-4">
                      <Sparkles className="w-10 h-10 text-amber-300" />
                    </div>
                    <span className="text-xs uppercase tracking-widest text-amber-200 font-medium mb-1">
                      {memories[selectedIndex].dateBadge}
                    </span>
                    <h3 className="font-display-title text-2xl text-white mb-2">
                      {memories[selectedIndex].title}
                    </h3>
                    <p className="font-serif-luxury italic text-pink-200 text-lg max-w-md">
                      &ldquo;{memories[selectedIndex].subtitle}&rdquo;
                    </p>
                  </div>
                )}
              </div>

              {/* Caption details below */}
              <div className="p-6 sm:p-8 bg-gradient-to-t from-[#0e0824] to-[#160d38] border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-amber-200/90 font-medium">
                    <Heart className="w-3.5 h-3.5 text-pink-500 fill-pink-500" />
                    <span>Memory {selectedIndex + 1} of {memories.length}</span>
                  </div>
                  <h4 className="font-display-title text-xl text-white mt-1">
                    {memories[selectedIndex].title}
                  </h4>
                  <p className="text-sm text-slate-300 mt-1 max-w-xl">
                    {memories[selectedIndex].note}
                  </p>
                </div>

                <div className="text-right sm:shrink-0 text-xs text-slate-400">
                  <span>Press <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-amber-200">ESC</kbd> to close</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
