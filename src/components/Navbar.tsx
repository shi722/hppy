import React, { useState, useEffect } from 'react';
import { Heart, Sparkles, Menu, X } from 'lucide-react';

interface NavbarProps {
  onReplay: () => void;
  recipientName: string;
}

export const Navbar: React.FC<NavbarProps> = ({ recipientName }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Milestone', href: '#milestone' },
    { label: 'Love Letter', href: '#love-letter' },
    { label: 'Memories', href: '#memories' },
    { label: 'Reasons', href: '#reasons' },
    { label: 'Make a Wish', href: '#wishes' },
  ];

  return (
    <header
      className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-[#080514]/85 backdrop-blur-md border-b border-amber-200/10 shadow-lg'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 md:h-20 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark (Single text element) */}
        <a
          href="#top"
          className="font-display-title text-base sm:text-xl font-semibold tracking-wide text-amber-100 hover:text-amber-200 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5"
        >
          <span>Fairytale · 18</span>
          <span className="hidden sm:inline text-pink-400 text-xs font-script-accent text-glow-rose">
            {recipientName || 'Forever'}
          </span>
        </a>

        {/* Zone 2: 4-5 single-line clean nav links */}
        <nav className="hidden md:flex items-center gap-7 text-xs font-medium tracking-wider uppercase text-slate-300">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="hover:text-amber-200 transition-colors whitespace-nowrap shrink-0 relative py-1 group"
            >
              {link.label}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-300/80 transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* Zone 3: 1 Primary Action */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <a
            href="#final-reveal"
            className="px-3 sm:px-4 py-1.5 sm:py-2 text-[11px] sm:text-xs font-semibold tracking-wide text-[#201036] bg-gradient-to-r from-amber-200 via-pink-200 to-amber-100 rounded-full hover:shadow-[0_0_20px_rgba(253,230,138,0.5)] transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5 focus-visible:outline-2 focus-visible:outline-amber-300"
          >
            <Heart className="w-3 sm:w-3.5 h-3 sm:h-3.5 fill-pink-500 text-pink-600" />
            <span className="hidden xs:inline sm:inline">My Babyy Bubuu&apos;s Day</span>
            <span className="inline xs:hidden sm:hidden">Day 18</span>
          </a>

          {/* Mobile hamburger menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-300 hover:text-white rounded-lg focus-visible:outline-2 focus-visible:outline-amber-300"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open navigation menu'}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-panel border-b border-amber-200/15 px-6 py-4 flex flex-col gap-3 animate-in fade-in slide-in-from-top-2">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-medium text-slate-200 hover:text-amber-200 py-1.5 flex items-center justify-between"
            >
              <span>{link.label}</span>
              <Sparkles className="w-3.5 h-3.5 text-amber-300/60" />
            </a>
          ))}
        </div>
      )}
    </header>
  );
};
