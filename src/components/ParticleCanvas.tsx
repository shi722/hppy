import React, { useEffect, useRef } from 'react';

interface ParticleCanvasProps {
  intensity?: 'gentle' | 'celebration';
  showPetals?: boolean;
  showFireflies?: boolean;
}

interface Star {
  x: number;
  y: number;
  size: number;
  baseAlpha: number;
  twinkleSpeed: number;
  phase: number;
}

interface Petal {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  angle: number;
  angularSpeed: number;
  opacity: number;
  color: string;
}

interface Firefly {
  x: number;
  y: number;
  radius: number;
  vx: number;
  vy: number;
  glow: number;
  glowSpeed: number;
  hue: number;
}

interface ShootingStar {
  x: number;
  y: number;
  length: number;
  speed: number;
  angle: number;
  opacity: number;
  active: boolean;
  color: string;
}

interface FairyDustParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  decay: number;
  rotation: number;
  rotSpeed: number;
}

export const ParticleCanvas: React.FC<ParticleCanvasProps> = ({
  intensity = 'gentle',
  showPetals = true,
  showFireflies = true,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // 1. Generate Twinkling Stars
    const starCount = intensity === 'celebration' ? 140 : 90;
    const stars: Star[] = Array.from({ length: starCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2.2 + 0.6,
      baseAlpha: Math.random() * 0.7 + 0.25,
      twinkleSpeed: Math.random() * 0.035 + 0.012,
      phase: Math.random() * Math.PI * 2,
    }));

    // 2. Generate Floating Tulip Petals
    const petalColors = [
      'rgba(251, 113, 133, 0.8)', // soft pink tulip
      'rgba(253, 186, 116, 0.8)', // champagne peach tulip
      'rgba(254, 240, 138, 0.85)', // golden yellow tulip
      'rgba(216, 180, 254, 0.8)', // lilac purple tulip
      'rgba(255, 228, 230, 0.85)', // pearl blush tulip
      'rgba(244, 63, 94, 0.75)',  // coral tulip
    ];
    const petalCount = showPetals ? (intensity === 'celebration' ? 42 : 24) : 0;
    const petals: Petal[] = Array.from({ length: petalCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 9 + 6,
      speedY: Math.random() * 0.65 + 0.3,
      speedX: Math.random() * 0.5 - 0.25,
      angle: Math.random() * Math.PI * 2,
      angularSpeed: (Math.random() - 0.5) * 0.025,
      opacity: Math.random() * 0.6 + 0.35,
      color: petalColors[Math.floor(Math.random() * petalColors.length)],
    }));

    // 3. Generate Glowing Fireflies
    const fireflyCount = showFireflies ? (intensity === 'celebration' ? 28 : 16) : 0;
    const fireflies: Firefly[] = Array.from({ length: fireflyCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 2.2 + 1.2,
      vx: (Math.random() - 0.5) * 0.65,
      vy: (Math.random() - 0.5) * 0.65,
      glow: Math.random(),
      glowSpeed: Math.random() * 0.03 + 0.018,
      hue: Math.random() > 0.3 ? 45 : 330, // Golden or soft rose warmth
    }));

    // 4. Shooting Stars System
    const shootingStars: ShootingStar[] = [];
    const spawnShootingStar = () => {
      if (shootingStars.length >= 2) return;
      shootingStars.push({
        x: Math.random() * (width * 0.75),
        y: Math.random() * (height * 0.4),
        length: Math.random() * 90 + 70,
        speed: Math.random() * 9 + 11,
        angle: Math.PI / 4 + (Math.random() - 0.5) * 0.2, // ~45 deg downward streak
        opacity: 1,
        active: true,
        color: Math.random() > 0.4 ? 'rgba(253, 230, 138,' : 'rgba(254, 205, 211,',
      });
    };

    // Schedule periodic shooting stars
    const shootingStarInterval = setInterval(() => {
      if (!prefersReducedMotion && Math.random() > 0.25) {
        spawnShootingStar();
      }
    }, 3200);

    // 5. Interactive Fairy Dust Cursor / Touch Trail
    const fairyDust: FairyDustParticle[] = [];
    const dustColors = [
      '#fde047', // golden yellow
      '#fbcfe8', // pastel pink
      '#fed7aa', // champagne
      '#ffffff', // diamond white
      '#f472b6', // romantic rose
    ];

    const addFairyDust = (px: number, py: number) => {
      const count = 3;
      for (let i = 0; i < count; i++) {
        fairyDust.push({
          x: px + (Math.random() - 0.5) * 12,
          y: py + (Math.random() - 0.5) * 12,
          vx: (Math.random() - 0.5) * 1.5,
          vy: Math.random() * 1.2 - 0.5,
          size: Math.random() * 4 + 2,
          color: dustColors[Math.floor(Math.random() * dustColors.length)],
          alpha: 1,
          decay: Math.random() * 0.035 + 0.02,
          rotation: Math.random() * Math.PI * 2,
          rotSpeed: (Math.random() - 0.5) * 0.1,
        });
      }
    };

    const handlePointerMove = (e: MouseEvent) => {
      addFairyDust(e.clientX, e.clientY);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches && e.touches[0]) {
        addFairyDust(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    window.addEventListener('mousemove', handlePointerMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    let isDocumentVisible = !document.hidden;
    const handleVisibility = () => {
      isDocumentVisible = !document.hidden;
    };
    document.addEventListener('visibilitychange', handleVisibility);

    // Helper: Draw 4-pointed sparkle star
    const drawSparkle = (
      x: number,
      y: number,
      size: number,
      color: string,
      alpha: number,
      rot: number
    ) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rot);
      ctx.fillStyle = color;
      ctx.globalAlpha = alpha;

      ctx.beginPath();
      // 4-pointed curved star
      const inner = size * 0.25;
      for (let i = 0; i < 4; i++) {
        ctx.lineTo(Math.cos((i * Math.PI) / 2) * size, Math.sin((i * Math.PI) / 2) * size);
        ctx.quadraticCurveTo(
          0,
          0,
          Math.cos(((i + 1) * Math.PI) / 2 - Math.PI / 4) * inner,
          Math.sin(((i + 1) * Math.PI) / 2 - Math.PI / 4) * inner
        );
      }
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    };

    const render = () => {
      if (!isDocumentVisible) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      ctx.clearRect(0, 0, width, height);

      // Render Stars
      stars.forEach((star) => {
        if (!prefersReducedMotion) {
          star.phase += star.twinkleSpeed;
        }
        const alpha = Math.max(0.12, star.baseAlpha + Math.sin(star.phase) * 0.4);

        ctx.fillStyle = `rgba(255, 248, 230, ${alpha})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();

        // Subtle glow halo for larger stars
        if (star.size > 1.3) {
          ctx.fillStyle = `rgba(246, 205, 97, ${alpha * 0.3})`;
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.size * 2.8, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      // Render Shooting Stars
      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const ss = shootingStars[i];
        if (!ss.active) {
          shootingStars.splice(i, 1);
          continue;
        }

        const headX = ss.x;
        const headY = ss.y;
        const tailX = ss.x - Math.cos(ss.angle) * ss.length;
        const tailY = ss.y - Math.sin(ss.angle) * ss.length;

        const grad = ctx.createLinearGradient(tailX, tailY, headX, headY);
        grad.addColorStop(0, `${ss.color} 0)`);
        grad.addColorStop(0.7, `${ss.color} ${ss.opacity * 0.4})`);
        grad.addColorStop(1, `${ss.color} ${ss.opacity})`);

        ctx.strokeStyle = grad;
        ctx.lineWidth = 2.2;
        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(headX, headY);
        ctx.stroke();

        // Glowing Star Head
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(headX, headY, 2.5, 0, Math.PI * 2);
        ctx.fill();

        // Advance shooting star
        ss.x += Math.cos(ss.angle) * ss.speed;
        ss.y += Math.sin(ss.angle) * ss.speed;
        ss.opacity -= 0.018;

        if (ss.opacity <= 0 || ss.x > width + 100 || ss.y > height + 100) {
          ss.active = false;
        }
      }

      // Render Petals
      if (showPetals) {
        petals.forEach((p) => {
          if (!prefersReducedMotion) {
            p.y += p.speedY;
            p.x += Math.sin(p.angle) * 0.7 + p.speedX;
            p.angle += p.angularSpeed;

            if (p.y > height + 25) {
              p.y = -25;
              p.x = Math.random() * width;
            }
            if (p.x > width + 25) p.x = -25;
            if (p.x < -25) p.x = width + 25;
          }

          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(p.angle);
          ctx.fillStyle = p.color;

          // Authentic tulip petal curve (slightly elongated with soft apex)
          ctx.beginPath();
          ctx.moveTo(0, -p.size);
          ctx.bezierCurveTo(
            p.size * 0.75,
            -p.size * 0.5,
            p.size * 0.75,
            p.size * 0.5,
            0,
            p.size * 0.95
          );
          ctx.bezierCurveTo(
            -p.size * 0.75,
            p.size * 0.5,
            -p.size * 0.75,
            -p.size * 0.5,
            0,
            -p.size
          );
          ctx.fill();
          ctx.restore();
        });
      }

      // Render Fireflies
      if (showFireflies) {
        fireflies.forEach((f) => {
          if (!prefersReducedMotion) {
            f.x += f.vx;
            f.y += f.vy;

            if (f.x < 0 || f.x > width) f.vx *= -1;
            if (f.y < 0 || f.y > height) f.vy *= -1;

            f.glow += f.glowSpeed;
          }

          const currentAlpha = 0.35 + (Math.sin(f.glow) + 1) * 0.38;

          const gradient = ctx.createRadialGradient(
            f.x,
            f.y,
            0,
            f.x,
            f.y,
            f.radius * 7.5
          );
          if (f.hue === 45) {
            gradient.addColorStop(0, `rgba(253, 224, 71, ${currentAlpha * 0.8})`);
            gradient.addColorStop(0.4, `rgba(245, 158, 11, ${currentAlpha * 0.3})`);
            gradient.addColorStop(1, 'rgba(245, 158, 11, 0)');
          } else {
            gradient.addColorStop(0, `rgba(244, 114, 182, ${currentAlpha * 0.8})`);
            gradient.addColorStop(0.4, `rgba(251, 113, 133, ${currentAlpha * 0.3})`);
            gradient.addColorStop(1, 'rgba(251, 113, 133, 0)');
          }

          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(f.x, f.y, f.radius * 7.5, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = `rgba(255, 255, 255, ${currentAlpha})`;
          ctx.beginPath();
          ctx.arc(f.x, f.y, f.radius * 0.95, 0, Math.PI * 2);
          ctx.fill();
        });
      }

      // Render Interactive Fairy Dust Cursor Trail
      for (let i = fairyDust.length - 1; i >= 0; i--) {
        const p = fairyDust[i];
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= p.decay;
        p.rotation += p.rotSpeed;

        if (p.alpha <= 0) {
          fairyDust.splice(i, 1);
          continue;
        }

        drawSparkle(p.x, p.y, p.size, p.color, p.alpha, p.rotation);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('visibilitychange', handleVisibility);
      clearInterval(shootingStarInterval);
      cancelAnimationFrame(animationFrameId);
    };
  }, [intensity, showPetals, showFireflies]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0 h-full w-full opacity-90"
      aria-hidden="true"
    />
  );
};
