import React, { useEffect, useId, useState } from 'react';
import {
  CAR_BODY,
  CAR_HEADLIGHT,
  CAR_HOOD_SCOOP,
  CAR_INTAKE,
  CAR_TAILLIGHT,
  CAR_WHEELS,
  CAR_WING,
  CAR_WING_STRUTS,
  CAR_WINDOW_FRONT,
  CAR_WINDOW_REAR,
  cv,
} from './sceneUtils';

/* ------------------------------------------------------------------ *
 * Car side-profile geometry (viewBox 0 0 800 300, facing right)
 * ------------------------------------------------------------------ */
interface WheelProps {
  cx: number;
  cy: number;
  /** seconds per revolution (0 = static) */
  spin?: number;
  stroke?: string;
  rim?: string;
  archFill?: string;
}

export const Wheel: React.FC<WheelProps> = ({
  cx,
  cy,
  spin = 0,
  stroke = '#9A7628',
  rim = '#B8923A',
  archFill = 'none',
}) => (
  <g transform={`translate(${cx} ${cy})`}>
    <circle r="58" fill={archFill} />
    <circle r="50" fill="#23262C" stroke={stroke} strokeWidth="3" />
    <circle r="44" fill="none" stroke={stroke} strokeWidth="1" opacity="0.45" />
    <path d="M24 -33 A41 41 0 0 1 40 -8 L31 -5 A32 32 0 0 0 19 -26 Z" fill="#ef4444" opacity="0.85" />
    <g className={spin ? 'sc-spin' : undefined} style={spin ? cv({ '--spin': `${spin}s` }) : undefined}>
      <circle r="36" fill="none" stroke={rim} strokeWidth="2" strokeDasharray="5 4" opacity="0.8" />
      {[0, 72, 144, 216, 288].map((a) => (
        <path key={a} d="M-5 -12 L5 -12 L9 -35 L-9 -35 Z" fill={rim} opacity="0.92" transform={`rotate(${a})`} />
      ))}
      <circle r="11" fill="#23262C" stroke={stroke} strokeWidth="2.5" />
      <circle r="4" fill={rim} />
    </g>
  </g>
);

interface CarSideProps {
  className?: string;
  stroke?: string;
  strokeWidth?: number;
  bodyFill?: string;
  windowFill?: string;
  glassStroke?: string;
  /** draw the outline progressively (stroke-dash animation) */
  draw?: boolean;
  drawDelay?: number;
  drawDuration?: number;
  wheelSpin?: number;
  archFill?: string;
  /** colour of the wheel spokes / rim ring */
  rim?: string;
  headlight?: string;
  taillight?: string;
  /** extra SVG drawn inside the same coordinate space; receives the id of a clipPath matching the body */
  children?: (clipId: string) => React.ReactNode;
}

export const CarSide: React.FC<CarSideProps> = ({
  className,
  stroke = '#9A7628',
  strokeWidth = 3,
  bodyFill = 'rgba(255,255,255,0.92)',
  windowFill = 'rgba(48,58,70,0.82)',
  glassStroke,
  draw = false,
  drawDelay = 0,
  drawDuration = 1.3,
  wheelSpin = 0,
  archFill,
  rim,
  headlight,
  taillight,
  children,
}) => {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, '');
  const clipId = `${uid}-body`;
  const drawProps = draw
    ? { pathLength: 1, className: 'sc-draw', style: cv({ '--delay': `${drawDelay}s`, '--dur': `${drawDuration}s` }) }
    : {};
  return (
    <svg viewBox="0 0 800 300" className={className} fill="none" preserveAspectRatio="xMidYMid meet">
      <defs>
        <clipPath id={clipId}>
          <path d={CAR_BODY} />
        </clipPath>
      </defs>
      <path d={CAR_BODY} fill={bodyFill} className={draw ? 'sc-fade' : undefined} style={draw ? cv({ '--delay': `${drawDelay + drawDuration * 0.6}s`, '--dur': '0.6s' }) : undefined} />
      <path d={CAR_BODY} stroke={stroke} strokeWidth={strokeWidth} strokeLinejoin="round" {...drawProps} />
      <path d={CAR_WINDOW_REAR} fill={windowFill} stroke={glassStroke ?? stroke} strokeWidth={strokeWidth * 0.55} opacity="0.95" />
      <path d={CAR_WINDOW_FRONT} fill={windowFill} stroke={glassStroke ?? stroke} strokeWidth={strokeWidth * 0.55} opacity="0.95" />
      {/* muscle-car details: shoulder crease, twin side stripes, quarter scoop, hood scoop, door cut-line, roundel */}
      <g clipPath={`url(#${clipId})`}>
        <path d="M40 176 C260 168 500 170 790 192" stroke={stroke} strokeWidth="2" opacity="0.55" />
        <path d="M40 216 C260 210 520 208 796 228" stroke={stroke} strokeWidth="7" opacity="0.28" />
        <path d="M40 228 C260 222 520 220 796 238" stroke={stroke} strokeWidth="2" opacity="0.5" />
      </g>
      <path d={CAR_INTAKE} fill="rgba(70,55,20,0.16)" stroke={stroke} strokeWidth="1.8" opacity="0.9" />
      {[206, 214, 222].map((y) => (
        <path key={y} d={`M268 ${y} L318 ${y - 5}`} stroke={stroke} strokeWidth="1.5" opacity="0.7" />
      ))}
      <path d={CAR_HOOD_SCOOP} fill="rgba(70,55,20,0.16)" stroke={stroke} strokeWidth="2" strokeLinejoin="round" />
      <path d="M428 126 L428 238" stroke={stroke} strokeWidth="1.5" opacity="0.55" />
      <circle cx="506" cy="214" r="19" fill="rgba(255,255,255,0.7)" stroke={stroke} strokeWidth="2" opacity="0.9" />
      <text x="506" y="221" textAnchor="middle" fontSize="20" fontWeight="900" fontFamily="'Barlow Condensed', sans-serif" fill={stroke} opacity="0.95">07</text>
      {/* front splitter + rear valance fins */}
      <path d="M690 244 L800 244" stroke={stroke} strokeWidth="3" strokeLinecap="round" />
      {[44, 54, 64].map((x) => (
        <path key={x} d={`M${x} 232 L${x} 246`} stroke={stroke} strokeWidth="1.5" opacity="0.7" />
      ))}
      {headlight && <path d={CAR_HEADLIGHT} fill={headlight} />}
      {taillight && <path d={CAR_TAILLIGHT} fill={taillight} />}
      {/* ducktail spoiler */}
      <path d={CAR_WING_STRUTS} stroke={stroke} strokeWidth="4" strokeLinecap="round" />
      <path d={CAR_WING} fill={bodyFill} stroke={stroke} strokeWidth={strokeWidth} strokeLinejoin="round" />
      {children?.(clipId)}
      {/* dark wheel wells, clipped to the body so nothing leaks below the sill */}
      <g clipPath={`url(#${clipId})`}>
        {CAR_WHEELS.map(([cx, cy]) => (
          <circle key={cx} cx={cx} cy={cy} r="58" fill={archFill ?? '#2F3238'} />
        ))}
      </g>
      {CAR_WHEELS.map(([cx, cy]) => (
        <Wheel key={cx} cx={cx} cy={cy} spin={wheelSpin} stroke={stroke} rim={rim} />
      ))}
    </svg>
  );
};

/* ------------------------------------------------------------------ *
 * Counter – smoothly counts a number (used for HUD read-outs)
 * ------------------------------------------------------------------ */
interface CounterProps {
  from: number;
  to: number;
  /** ms */
  duration?: number;
  /** ms */
  delay?: number;
  decimals?: number;
  suffix?: string;
  pad?: number;
}

export const Counter: React.FC<CounterProps> = ({
  from,
  to,
  duration = 1300,
  delay = 150,
  decimals = 0,
  suffix = '',
  pad = 0,
}) => {
  const [value, setValue] = useState<number>(from);

  useEffect(() => {
    let raf = 0;
    const start = performance.now() + delay;
    const tick = (now: number) => {
      const p = Math.min(1, Math.max(0, (now - start) / duration));
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(from + (to - from) * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [from, to, duration, delay]);

  const text = value.toFixed(decimals);
  return (
    <>
      {pad ? text.padStart(pad, '0') : text}
      {suffix}
    </>
  );
};

/* ------------------------------------------------------------------ *
 * Layout helpers
 * ------------------------------------------------------------------ */
export const SceneCaption: React.FC<{
  title: string;
  sub?: string;
  tone?: 'gold' | 'cyan';
  className?: string;
}> = ({ title, sub, tone = 'gold', className = '' }) => (
  <div
    className={`absolute inset-x-0 bottom-8 sm:bottom-12 flex flex-col items-center text-center px-4 sc-caption ${className}`}
  >
    <span
      className={`font-display font-black text-sm sm:text-xl tracking-super-wide uppercase ${
        tone === 'cyan' ? 'text-cyan-700' : 'text-gold'
      }`}
    >
      {title}
    </span>
    {sub && (
      <span
        className={`font-mono text-[10px] sm:text-xs mt-1.5 tracking-widest uppercase ${
          tone === 'cyan' ? 'text-cyan-800/80' : 'text-silver/80'
        }`}
      >
        {sub}
      </span>
    )}
  </div>
);

/** Four HUD corner brackets that draw themselves in. */
export const SceneFrame: React.FC<{ tone?: 'gold' | 'cyan' }> = ({ tone = 'gold' }) => {
  const color = tone === 'cyan' ? 'border-cyan-600/60' : 'border-gold/60';
  const base = `absolute w-10 h-10 sm:w-16 sm:h-16 sc-fade ${color}`;
  return (
    <>
      <span className={`${base} top-4 left-4 sm:top-8 sm:left-8 border-t-2 border-l-2`} style={cv({ '--delay': '0.15s' })} />
      <span className={`${base} top-4 right-4 sm:top-8 sm:right-8 border-t-2 border-r-2`} style={cv({ '--delay': '0.25s' })} />
      <span className={`${base} bottom-4 left-4 sm:bottom-8 sm:left-8 border-b-2 border-l-2`} style={cv({ '--delay': '0.35s' })} />
      <span className={`${base} bottom-4 right-4 sm:bottom-8 sm:right-8 border-b-2 border-r-2`} style={cv({ '--delay': '0.45s' })} />
    </>
  );
};

