import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  hue: number;
}

export const AutomotiveBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const location = useLocation();

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

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

    // Create 45 ambient floating micro-particles (golden automotive dust in studio light beams)
    const particleCount = 42;
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 1.8 + 0.6,
        speedX: (Math.random() - 0.5) * 0.35,
        speedY: -Math.random() * 0.45 - 0.1, // Drifting gently upwards like studio dust
        opacity: Math.random() * 0.45 + 0.15,
        hue: Math.random() > 0.6 ? 40 : 45, // Warm gold hues
      });
    }

    let lightBeamAngle = 0;
    let isTabVisible = true;

    const handleVisibilityChange = () => {
      isTabVisible = !document.hidden;
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    const render = () => {
      if (!isTabVisible) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      ctx.clearRect(0, 0, width, height);

      // 1. Draw Slow-moving Headlight Beam Gradients
      lightBeamAngle += 0.003;
      const beamX1 = width * 0.75 + Math.sin(lightBeamAngle) * (width * 0.12);
      const beamY1 = height * 0.25 + Math.cos(lightBeamAngle * 0.8) * (height * 0.08);

      const grad1 = ctx.createRadialGradient(
        beamX1,
        beamY1,
        20,
        beamX1,
        beamY1,
        width * 0.55
      );
      grad1.addColorStop(0, 'rgba(201, 162, 74, 0.2)');
      grad1.addColorStop(0.5, 'rgba(201, 162, 74, 0.05)');
      grad1.addColorStop(1, 'rgba(245, 242, 235, 0)');

      ctx.fillStyle = grad1;
      ctx.fillRect(0, 0, width, height);

      // Secondary cooler spotlight beam on bottom-left
      const beamX2 = width * 0.2 + Math.cos(lightBeamAngle * 0.6) * (width * 0.08);
      const beamY2 = height * 0.7 + Math.sin(lightBeamAngle * 0.7) * (height * 0.1);
      const grad2 = ctx.createRadialGradient(
        beamX2,
        beamY2,
        10,
        beamX2,
        beamY2,
        width * 0.4
      );
      grad2.addColorStop(0, 'rgba(138, 106, 34, 0.07)');
      grad2.addColorStop(1, 'rgba(245, 242, 235, 0)');

      ctx.fillStyle = grad2;
      ctx.fillRect(0, 0, width, height);

      // 2. Draw Moving Automotive Particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.speedX;
        p.y += p.speedY;

        // Wrap around viewport edges
        if (p.y < 0) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 70%, 38%, ${p.opacity})`;
        ctx.shadowColor = '#A8842C';
        ctx.shadowBlur = 4;
        ctx.fill();
        ctx.shadowBlur = 0; // reset
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [location.pathname]);

  return (
    <div 
      aria-hidden="true" 
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
    >
      {/* Dynamic Canvas with Particles and Moving Headlight Spotlights */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full opacity-90"
      />

      {/* Subtle Carbon Fiber Weave Background Texture */}
      <div className="absolute inset-0 carbon-texture opacity-30 mix-blend-overlay" />

      {/* Automotive Precision Blueprint Grid */}
      <div className="absolute inset-0 automotive-grid opacity-20" />

      {/* Moving Horizon Specular Sweep */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold/30 to-transparent animate-shimmer" />
    </div>
  );
};
