/**
 * Her 18th Birthday — A Magical Fairytale Universe
 * Dedicated to her milestone birthday on November 3, 2026.
 */

import React, { useState, useEffect } from 'react';
import { BIRTHDAY_CONFIG } from './config/birthdayConfig';
import { ParticleCanvas } from './components/ParticleCanvas';
import { OpeningScene } from './components/OpeningScene';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { MilestoneSection } from './components/MilestoneSection';
import { LoveLetterSection } from './components/LoveLetterSection';
import { MemoryGallery } from './components/MemoryGallery';
import { ReasonsSection } from './components/ReasonsSection';
import { WishExperience } from './components/WishExperience';
import { SecretStarsSection } from './components/SecretStarsSection';
import { FinalRevealSection } from './components/FinalRevealSection';
import { AudioPlayerControl } from './components/AudioPlayerControl';

export default function App() {
  const [hasEntered, setHasEntered] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      return params.get('autostart') === '1';
    }
    return false;
  });

  const [recipientName, setRecipientName] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('fairytale_recipient');
      if (stored && stored !== '[HER NAME]' && stored !== 'Her Name') {
        return stored;
      }
      return BIRTHDAY_CONFIG.recipientName;
    }
    return BIRTHDAY_CONFIG.recipientName;
  });

  const [senderName, setSenderName] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('fairytale_sender') || BIRTHDAY_CONFIG.senderName;
    }
    return BIRTHDAY_CONFIG.senderName;
  });

  const handleEnterFairytale = () => {
    setHasEntered(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReplay = () => {
    // Smoothly scroll back to top of page and re-engage experience
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen bg-[#080514] text-[#f7e8e5] overflow-x-hidden selection:bg-amber-300/30 selection:text-amber-100">
      {/* Dynamic Canvas Particles (Stars, Drifting Petals, Fireflies) */}
      <ParticleCanvas intensity={hasEntered ? 'gentle' : 'celebration'} />

      {/* Opening Full-Screen Fairytale Portal (unless autostart=1 or already entered) */}
      {!hasEntered ? (
        <OpeningScene onEnter={handleEnterFairytale} recipientName={recipientName} />
      ) : (
        /* The Main Magical Fairytale Experience */
        <div className="relative z-10 flex flex-col animate-in fade-in duration-700">
          {/* Top Navigation Bar */}
          <Navbar onReplay={handleReplay} recipientName={recipientName} />

          <main id="main-content" className="flex-1">
            {/* 1. Enchanted Garden Hero Section & Countdown */}
            <HeroSection recipientName={recipientName} />

            {/* 2. The Age of Magic — Her 18th Birthday Milestone */}
            <MilestoneSection />

            {/* 3. A Love Letter From My Heart */}
            <LoveLetterSection senderName={senderName} recipientName={recipientName} />

            {/* 4. Our Little Universe — Memory Gallery */}
            <MemoryGallery />

            {/* 5. The Reasons You Are So Special */}
            <ReasonsSection />

            {/* 6. A Magical Wish-Making Experience */}
            <WishExperience />

            {/* 7. A Surprise Hidden Behind The Stars */}
            <SecretStarsSection />

            {/* 8. Final Cinematic Birthday Reveal */}
            <FinalRevealSection
              onReplay={handleReplay}
              recipientName={recipientName}
              senderName={senderName}
            />
          </main>

          {/* Floating Ambient Music Control */}
          <AudioPlayerControl />
        </div>
      )}
    </div>
  );
}
