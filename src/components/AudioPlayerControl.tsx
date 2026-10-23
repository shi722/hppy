import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Music, Play, Pause, Sparkles, Heart } from 'lucide-react';
import { soundManager } from '../utils/audioSynthesizer';
import { BIRTHDAY_CONFIG } from '../config/birthdayConfig';

interface AudioPlayerControlProps {
  customUrl?: string;
}

export const AudioPlayerControl: React.FC<AudioPlayerControlProps> = ({
  customUrl = BIRTHDAY_CONFIG.audio.customAudioUrl,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(BIRTHDAY_CONFIG.audio.defaultVolume);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    soundManager.setVolume(volume);
    const unsubscribe = soundManager.subscribe((playing) => {
      setIsPlaying(playing);
    });
    return () => unsubscribe();
  }, [volume]);

  const handleToggle = () => {
    soundManager.toggle(customUrl);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVol = parseFloat(e.target.value);
    setVolume(newVol);
    soundManager.setVolume(newVol);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2 font-sans">
      {/* Volume Popup */}
      {isExpanded && (
        <div className="glass-panel rounded-2xl p-4 shadow-2xl flex flex-col gap-3 min-w-[220px] border border-amber-200/20 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <div className="flex items-center justify-between text-xs text-amber-200/90 font-medium">
            <span className="flex items-center gap-1.5 font-semibold text-amber-100">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              {BIRTHDAY_CONFIG.audio.trackTitle}
            </span>
            <span className="tabular-nums text-slate-400">{Math.round(volume * 100)}%</span>
          </div>

          <p className="text-[11px] text-pink-200/90 leading-snug font-serif-luxury italic flex items-center gap-1">
            <span>&ldquo;Happy Birthday to you, Happy Birthday to you, Happy Birthday dear My Babyy Bubuu...&rdquo;</span>
            <Heart className="w-3 h-3 fill-pink-400 text-pink-400 shrink-0" />
          </p>

          <div className="flex items-center gap-2 pt-1">
            <button
              onClick={() => {
                const next = volume === 0 ? 0.45 : 0;
                setVolume(next);
                soundManager.setVolume(next);
              }}
              className="text-amber-300/80 hover:text-amber-200 transition-colors"
              aria-label={volume === 0 ? 'Unmute' : 'Mute'}
            >
              {volume === 0 ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.02"
              value={volume}
              onChange={handleVolumeChange}
              className="w-full accent-amber-300 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
              aria-label="Volume slider"
            />
          </div>
        </div>
      )}

      {/* Main Floating Trigger Pill */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="glass-panel-subtle hover:glass-panel text-slate-300 hover:text-amber-200 text-xs px-2.5 py-2 rounded-full transition-all border border-white/10 flex items-center justify-center shadow-lg"
          aria-label="Open sound controls"
          title="Sound settings"
        >
          {volume === 0 ? <VolumeX className="w-4 h-4 text-rose-300" /> : <Volume2 className="w-4 h-4 text-amber-300" />}
        </button>

        <button
          onClick={handleToggle}
          className={`flex items-center gap-2.5 px-4 py-2.5 rounded-full text-xs font-medium tracking-wide shadow-xl transition-all duration-300 border ${
            isPlaying
              ? 'bg-gradient-to-r from-amber-500/20 via-pink-500/20 to-purple-600/30 text-amber-100 border-amber-300/40 shadow-amber-500/10'
              : 'glass-panel text-slate-300 hover:text-white border-white/15 hover:border-amber-300/30'
          }`}
          aria-label={isPlaying ? 'Pause music' : 'Play romantic bir thday melody'}
        >
          <div className="relative flex items-center justify-center">
            {isPlaying ? (
              <Pause className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
            ) : (
              <Play className="w-3.5 h-3.5 text-pink-300 fill-pink-300/40" />
            )}
          </div>

          <span className="whitespace-nowrap font-medium flex items-center gap-1">
            {isPlaying ? (
              <>
                <span>Playing Birthday Melody</span>
                <Heart className="w-3 h-3 fill-pink-400 text-pink-400" />
              </>
            ) : (
              <span>Play Birthday Melody ✨</span>
            )}
          </span>

          {/* Animated sound bars */}
          {isPlaying && (
            <div className="flex items-center gap-0.5 h-3 ml-0.5" aria-hidden="true">
              <span className="w-0.5 h-full bg-amber-300 animate-[bounce_1s_infinite_100ms] rounded-full" />
              <span className="w-0.5 h-2 bg-pink-300 animate-[bounce_1s_infinite_300ms] rounded-full" />
              <span className="w-0.5 h-3 bg-amber-200 animate-[bounce_1s_infinite_200ms] rounded-full" />
            </div>
          )}
        </button>
      </div>
    </div>
  );
};
