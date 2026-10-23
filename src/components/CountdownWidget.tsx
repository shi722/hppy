import React, { useState, useEffect } from 'react';
import { Sparkles, Clock, Heart } from 'lucide-react';
import { calculateTimeRemaining, padZero, TimeRemaining } from '../utils/countdown';
import { BIRTHDAY_CONFIG } from '../config/birthdayConfig';

interface CountdownWidgetProps {
  targetDateStr?: string;
}

export const CountdownWidget: React.FC<CountdownWidgetProps> = ({
  targetDateStr = BIRTHDAY_CONFIG.birthdayDate,
}) => {
  const [time, setTime] = useState<TimeRemaining>(() =>
    calculateTimeRemaining(targetDateStr, new Date())
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(calculateTimeRemaining(targetDateStr, new Date()));
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDateStr]);

  const units = [
    { label: 'Days', value: padZero(time.days) },
    { label: 'Hours', value: padZero(time.hours) },
    { label: 'Minutes', value: padZero(time.minutes) },
    { label: 'Seconds', value: padZero(time.seconds) },
  ];

  return (
    <div className="relative w-full max-w-2xl mx-auto my-6 px-4">
      {/* Outer subtle glow ring */}
      <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-amber-400/20 via-pink-500/20 to-purple-600/20 blur-xl opacity-75" />

      <div className="relative glass-panel rounded-2xl p-6 sm:p-8 border border-amber-200/20 text-center box-glow-gold">
        {time.isToday ? (
          /* Birthday Celebration Banner when it is November 3, 2026 */
          <div className="py-4 animate-bounce">
            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-pink-500/20 border border-pink-300/40 text-pink-200 text-xs font-semibold uppercase tracking-widest mb-3">
              <Sparkles className="w-3.5 h-3.5 text-pink-300" />
              The Day Has Arrived
              <Sparkles className="w-3.5 h-3.5 text-pink-300" />
            </div>
            <h3 className="font-display-title text-2xl sm:text-4xl text-amber-100 font-bold tracking-wide text-glow-gold">
              IT&apos;S YOUR DAY, MY BEAUTIFUL GIRL! ♡
            </h3>
            <p className="font-serif-luxury italic text-pink-200 mt-2 text-lg">
              May every second today bring you all the love and smiles you deserve.
            </p>
          </div>
        ) : (
          /* Live Countdown units */
          <>
            <div className="flex items-center justify-center gap-2 text-xs uppercase tracking-widest text-amber-200/80 font-medium mb-6">
              <Clock className="w-3.5 h-3.5 text-amber-300" />
              <span>Counting Down to November 3, 2026</span>
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            </div>

            <div className="grid grid-cols-4 gap-2 sm:gap-4 max-w-lg mx-auto">
              {units.map((unit) => (
                <div
                  key={unit.label}
                  className="glass-panel-subtle rounded-xl p-3 sm:p-4 flex flex-col items-center border border-amber-200/15 transition-transform hover:scale-105"
                >
                  <span className="font-display-title text-2xl sm:text-4xl md:text-5xl font-semibold text-amber-100 tabular-nums text-glow-gold">
                    {unit.value}
                  </span>
                  <span className="text-[10px] sm:text-xs uppercase tracking-wider text-pink-200/70 font-medium mt-1">
                    {unit.label}
                  </span>
                </div>
              ))}
            </div>

            <p className="font-serif-luxury italic text-xs sm:text-sm text-pink-200/80 mt-6 tracking-wide flex items-center justify-center gap-1.5">
              <Heart className="w-3 h-3 text-pink-400 fill-pink-400" />
              <span>Every second brings us closer to your magical day.</span>
              <Heart className="w-3 h-3 text-pink-400 fill-pink-400" />
            </p>
          </>
        )}
      </div>
    </div>
  );
};
