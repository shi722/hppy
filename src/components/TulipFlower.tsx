import React from 'react';

interface TulipBloomProps {
  className?: string;
  color?: 'pink' | 'peach' | 'purple' | 'golden';
  size?: number;
  glow?: boolean;
}

export const TulipBloom: React.FC<TulipBloomProps> = ({
  className = '',
  color = 'pink',
  size = 120,
  glow = true,
}) => {
  // Unique gradient IDs per color
  const palette = {
    pink: {
      left: ['#fb7185', '#fda4af', '#f43f5e'],
      right: ['#f43f5e', '#fb7185', '#fda4af'],
      center: ['#fda4af', '#f43f5e', '#be123c'],
      glow: 'rgba(251, 113, 133, 0.7)',
    },
    peach: {
      left: ['#fb923c', '#fdba74', '#ea580c'],
      right: ['#ea580c', '#fb923c', '#fed7aa'],
      center: ['#fdba74', '#fb923c', '#c2410c'],
      glow: 'rgba(251, 146, 60, 0.7)',
    },
    purple: {
      left: ['#c084fc', '#d8b4fe', '#9333ea'],
      right: ['#9333ea', '#c084fc', '#e9d5ff'],
      center: ['#d8b4fe', '#a855f7', '#7e22ce'],
      glow: 'rgba(192, 132, 252, 0.7)',
    },
    golden: {
      left: ['#facc15', '#fde047', '#ca8a04'],
      right: ['#ca8a04', '#facc15', '#fef08a'],
      center: ['#fde047', '#eab308', '#a16207'],
      glow: 'rgba(250, 204, 21, 0.7)',
    },
  }[color];

  const uniqueId = `tulip-${color}-${Math.random().toString(36).substring(2, 7)}`;

  return (
    <svg
      width={size * 0.65}
      height={size}
      viewBox="0 0 100 160"
      fill="none"
      className={`${className} transition-transform duration-500 hover:scale-110`}
      style={glow ? { filter: `drop-shadow(0 0 16px ${palette.glow})` } : undefined}
      aria-label="Enchanted Tulip Flower"
    >
      <defs>
        <linearGradient id={`${uniqueId}-left`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={palette.left[0]} />
          <stop offset="50%" stopColor={palette.left[1]} />
          <stop offset="100%" stopColor={palette.left[2]} />
        </linearGradient>

        <linearGradient id={`${uniqueId}-right`} x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={palette.right[0]} />
          <stop offset="50%" stopColor={palette.right[1]} />
          <stop offset="100%" stopColor={palette.right[2]} />
        </linearGradient>

        <linearGradient id={`${uniqueId}-center`} x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor={palette.center[0]} />
          <stop offset="45%" stopColor={palette.center[1]} />
          <stop offset="100%" stopColor={palette.center[2]} />
        </linearGradient>

        <linearGradient id={`${uniqueId}-stem`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#22c55e" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#15803d" stopOpacity="0.6" />
        </linearGradient>
      </defs>

      {/* Slender Curved Stem */}
      <path
        d="M50 82 Q47 120 50 160"
        stroke={`url(#${uniqueId}-stem)`}
        strokeWidth="3.2"
        strokeLinecap="round"
      />

      {/* Graceful Curved Tulip Leaves */}
      <path
        d="M49 130 C30 115 18 92 20 75 C28 85 40 105 49 116 Z"
        fill="#16a34a"
        fillOpacity="0.65"
      />
      <path
        d="M51 125 C70 112 82 90 80 72 C72 82 60 102 51 112 Z"
        fill="#15803d"
        fillOpacity="0.6"
      />

      {/* Back Inner Cup (Gives 3D depth) */}
      <ellipse cx="50" cy="46" rx="16" ry="24" fill={palette.center[2]} opacity="0.6" />

      {/* Left Outer Tulip Petal */}
      <path
        d="M50 84 C30 80 20 62 25 42 C29 27 42 22 46 32 C38 48 42 68 50 84 Z"
        fill={`url(#${uniqueId}-left)`}
      />

      {/* Right Outer Tulip Petal */}
      <path
        d="M50 84 C70 80 80 62 75 42 C71 27 58 22 54 32 C62 48 58 68 50 84 Z"
        fill={`url(#${uniqueId}-right)`}
      />

      {/* Center Dominant Petal */}
      <path
        d="M50 87 C36 84 32 58 38 36 C43 20 57 20 62 36 C68 58 64 84 50 87 Z"
        fill={`url(#${uniqueId}-center)`}
      />

      {/* Soft Petal Highlights */}
      <ellipse
        cx="50"
        cy="40"
        rx="3"
        ry="10"
        fill="#ffffff"
        opacity="0.35"
        transform="rotate(-5 50 40)"
      />
    </svg>
  );
};

export const TulipGardenRow: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`flex items-end justify-between w-full pointer-events-none select-none ${className}`}>
      <div className="transform -rotate-6 animate-float-slow [animation-delay:0s]">
        <TulipBloom color="pink" size={140} />
      </div>
      <div className="transform rotate-3 animate-float-slow [animation-delay:1.5s] -mb-2">
        <TulipBloom color="peach" size={160} />
      </div>
      <div className="transform -rotate-2 animate-float-slow [animation-delay:3s]">
        <TulipBloom color="golden" size={175} />
      </div>
      <div className="transform rotate-4 animate-float-slow [animation-delay:2s] -mb-1">
        <TulipBloom color="purple" size={155} />
      </div>
      <div className="transform -rotate-4 animate-float-slow [animation-delay:0.8s]">
        <TulipBloom color="pink" size={145} />
      </div>
    </div>
  );
};
