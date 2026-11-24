import React, { useId } from 'react';
import './transition-scenes.css';
import { CarSide, Counter, SceneCaption, SceneFrame } from './sceneKit';
import { cv, gearPath } from './sceneUtils';

/** Shared full-bleed scene shell. */
const Shell: React.FC<{ className?: string; children: React.ReactNode }> = ({ className = '', children }) => (
  <div className={`absolute inset-0 overflow-hidden ${className.includes('bg-') ? '' : 'bg-carbon-950'} ${className}`}>{children}</div>
);

const CAR_BOX =
  'absolute left-1/2 top-[46%] -translate-x-1/2 -translate-y-1/2 w-[min(92vw,1120px)] overflow-visible';

/** Polar helper for gauges (0° = 12 o'clock, clockwise). */
const polar = (cx: number, cy: number, r: number, deg: number): [number, number] => {
  const rad = (deg * Math.PI) / 180;
  return [cx + r * Math.sin(rad), cy - r * Math.cos(rad)];
};
const arcPath = (cx: number, cy: number, r: number, a0: number, a1: number): string => {
  const [x0, y0] = polar(cx, cy, r, a0);
  const [x1, y1] = polar(cx, cy, r, a1);
  const large = Math.abs(a1 - a0) > 180 ? 1 : 0;
  return `M${x0.toFixed(2)} ${y0.toFixed(2)} A${r} ${r} 0 ${large} 1 ${x1.toFixed(2)} ${y1.toFixed(2)}`;
};

/* ====================================================================
 * 1. BODY REPAIR — hydraulic dent-puller restores the door panel
 * ==================================================================== */
export const BodyRepairScene: React.FC = () => {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, '');
  const sparks = Array.from({ length: 12 }, (_, i) => {
    const a = (i / 12) * Math.PI * 2;
    const d = 46 + (i % 3) * 22;
    return { dx: Math.cos(a) * d, dy: Math.sin(a) * d, i };
  });
  return (
    <Shell>
      <div className="absolute inset-0 blueprint-grid opacity-70" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_45%,rgba(154,118,40,0.14),transparent_62%)]" />
      <SceneFrame />
      <div className={CAR_BOX} style={{ aspectRatio: '800 / 300' }}>
        <CarSide className="w-full h-full overflow-visible" draw drawDelay={0.05} drawDuration={0.95} stroke="#9A7628">
          {() => (
            <>
              <defs>
                <radialGradient id={`${uid}-dent`}>
                  <stop offset="0%" stopColor="#000" stopOpacity="0.95" />
                  <stop offset="55%" stopColor="#FFFFFF" stopOpacity="0.7" />
                  <stop offset="100%" stopColor="#B8923A" stopOpacity="0.25" />
                </radialGradient>
                <linearGradient id={`${uid}-scan`} x1="0" x2="1">
                  <stop offset="0" stopColor="#B8923A" stopOpacity="0" />
                  <stop offset="0.7" stopColor="#B8923A" stopOpacity="0.55" />
                  <stop offset="1" stopColor="#FFFFFF" stopOpacity="0.95" />
                </linearGradient>
              </defs>

              {/* the dent */}
              <g transform="translate(404 216)">
                <g className="sc-dent">
                  <ellipse rx="44" ry="19" fill={`url(#${uid}-dent)`} />
                  <ellipse rx="44" ry="19" fill="none" stroke="#B8923A" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
                </g>
                {/* suction cup + slide hammer */}
                <g className="sc-puller">
                  <line x1="0" y1="0" x2="120" y2="-110" stroke="#7A5C1C" strokeWidth="9" strokeLinecap="round" />
                  <line x1="0" y1="0" x2="120" y2="-110" stroke="#B8923A" strokeWidth="3" strokeLinecap="round" />
                  <circle cx="120" cy="-110" r="10" fill="#9A7628" />
                  <circle r="26" fill="#FFFFFF" stroke="#9A7628" strokeWidth="4" />
                  <circle r="15" fill="none" stroke="#B8923A" strokeWidth="2" />
                  <circle r="5" fill="#B8923A" />
                </g>
                {/* shockwave rings + sparks */}
                {[0, 1, 2].map((n) => (
                  <circle
                    key={n}
                    r="14"
                    fill="none"
                    stroke="#B8923A"
                    strokeWidth="3"
                    className="sc-shock"
                    style={cv({ '--delay': `${1.12 + n * 0.14}s` })}
                  />
                ))}
                {sparks.map((s) => (
                  <circle
                    key={s.i}
                    r="2.6"
                    fill="#E8B93C"
                    className="sc-spark"
                    style={cv({ '--dx': `${s.dx}px`, '--dy': `${s.dy}px`, '--delay': `${1.1 + (s.i % 4) * 0.04}s` })}
                  />
                ))}
              </g>

              {/* laser scan verifying panel alignment */}
              <g className="sc-scan">
                <rect x="-26" y="86" width="26" height="176" fill={`url(#${uid}-scan)`} />
                <rect x="0" y="80" width="2.5" height="188" fill="#E8B93C" />
              </g>

              {/* measurement callouts */}
              <g fontFamily="'JetBrains Mono', ui-monospace, monospace" fontSize="13" letterSpacing="1.5" fill="none">
                <path d="M10 96 H250 L214 170" stroke="#9A7628" strokeWidth="1.5" className="sc-draw" pathLength={1} style={cv({ '--delay': '0.6s', '--dur': '0.5s' })} />
                <text fill="#B8923A" x="10" y="86" className="sc-fade" style={cv({ '--delay': '0.9s' })}>LEFT FENDER · ALIGNED</text>

                <path d="M690 174 L712 88 L790 88" stroke="#9A7628" strokeWidth="1.5" className="sc-draw" pathLength={1} style={cv({ '--delay': '0.7s', '--dur': '0.5s' })} />
                <text fill="#B8923A" x="562" y="78" className="sc-fade" style={cv({ '--delay': '1.0s' })}>BONNET ARCH · MEASURED</text>

                <path d="M300 156 L260 70 L170 70" stroke="#9A7628" strokeWidth="1.5" className="sc-draw" pathLength={1} style={cv({ '--delay': '0.8s', '--dur': '0.5s' })} />
                <text fill="#B8923A" x="8" y="60" className="sc-fade" style={cv({ '--delay': '1.1s' })}>QUARTER PANEL · TENSIONED</text>

                <g className="sc-fade" style={cv({ '--delay': '1.25s' })}>
                  <path d="M386 266 L386 280 M422 266 L422 280 M386 274 L422 274" stroke="#B8923A" strokeWidth="1.5" />
                  <text fill="#B8923A" x="344" y="304">DOOR GAP · 3.5MM OEM</text>
                </g>
              </g>
            </>
          )}
        </CarSide>
      </div>
      <div className="absolute top-6 right-8 sm:top-12 sm:right-16 font-mono text-[10px] sm:text-xs text-gold/80 tracking-widest sc-fade" style={cv({ '--delay': '0.4s' })}>
        HYDRAULIC PULL · <Counter from={0} to={100} duration={1100} delay={600} suffix="%" />
      </div>
      <SceneCaption title="Hydraulic Panel Reconstruction" sub="Dent extracted · panel gaps verified to OEM tolerance" />
    </Shell>
  );
};

/* ====================================================================
 * 2. MECHANICAL — meshing gear train + firing pistons
 * ==================================================================== */
const GEARS = [
  { n: 34, r: 170, cx: 470, cy: 330, dur: 5, rev: false, phase: 0 },
  { n: 22, r: 110, cx: 470 + 170 + 110, cy: 330, dur: 5 * (22 / 34), rev: true, phase: 180 - (360 / 22) * 0.5 },
  { n: 14, r: 70, cx: 470 - 170 - 70, cy: 330, dur: 5 * (14 / 34), rev: true, phase: -(360 / 14) * 0.5 },
];

export const GearScene: React.FC = () => (
  <Shell>
    <div className="absolute inset-0 blueprint-grid opacity-50" />
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_40%_50%,rgba(154,118,40,0.16),transparent_60%)]" />
    <SceneFrame />
    <svg viewBox="0 0 1200 675" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid meet" fill="none">
      <defs>
        <linearGradient id="sc-gear-fill" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#DAD3C4" />
          <stop offset="1" stopColor="#B9B2A0" />
        </linearGradient>
        <linearGradient id="sc-piston-fill" x1="0" x2="1">
          <stop offset="0" stopColor="#7A5C1C" />
          <stop offset="0.5" stopColor="#B8923A" />
          <stop offset="1" stopColor="#7A5C1C" />
        </linearGradient>
      </defs>

      {GEARS.map((g, idx) => (
        <g key={g.n} className="sc-fade" style={cv({ '--delay': `${0.05 + idx * 0.12}s`, '--dur': '0.5s' })}>
          <g transform={`translate(${g.cx} ${g.cy})`}>
            <g className={g.rev ? 'sc-spin-rev' : 'sc-spin'} style={cv({ '--spin': `${g.dur}s` })}>
              <path d={gearPath(g.n, g.r, g.r * 0.12)} transform={`rotate(${g.phase})`} fill="url(#sc-gear-fill)" stroke={idx === 0 ? '#9A7628' : '#4B4F57'} strokeWidth="3" strokeLinejoin="round" />
              <circle r={g.r * 0.78} stroke="#9A7628" strokeWidth="1.5" strokeDasharray="4 8" opacity="0.6" />
              {Array.from({ length: 6 }, (_, i) => (
                <circle key={i} cx={Math.cos((i / 6) * Math.PI * 2) * g.r * 0.5} cy={Math.sin((i / 6) * Math.PI * 2) * g.r * 0.5} r={g.r * 0.16} fill="#F5F2EB" stroke="#9A7628" strokeWidth="2" opacity="0.9" />
              ))}
              <circle r={g.r * 0.22} fill="#FFFFFF" stroke="#B8923A" strokeWidth="3" />
              <circle r={g.r * 0.08} fill="#B8923A" />
            </g>
          </g>
        </g>
      ))}

      {/* piston bank */}
      <g transform="translate(880 150)">
        <text x="0" y="-24" fill="#9A7628" fontSize="14" fontFamily="'JetBrains Mono', ui-monospace, monospace" letterSpacing="3" className="sc-fade" style={cv({ '--delay': '0.4s' })}>
          4-CYL · ORDER 1-3-4-2
        </text>
        {[0, 1, 2, 3].map((i) => (
          <g key={i} transform={`translate(${i * 66} 0)`} className="sc-fade" style={cv({ '--delay': `${0.3 + i * 0.1}s` })}>
            <rect x="0" y="0" width="52" height="250" fill="#FFFFFF" stroke="#7B7F88" strokeWidth="2" />
            <rect x="4" y="4" width="44" height="38" fill="#9A7628" className="sc-flash" style={cv({ '--delay': `${i * 0.18}s`, '--cycle': '0.72s' })} />
            <g className="sc-piston" style={cv({ '--delay': `${i * 0.18}s`, '--cycle': '0.72s' })}>
              <rect x="4" y="12" width="44" height="46" fill="url(#sc-piston-fill)" stroke="#B8923A" strokeWidth="2" />
              <line x1="4" y1="26" x2="48" y2="26" stroke="#F5F2EB" strokeWidth="2" />
              <line x1="4" y1="36" x2="48" y2="36" stroke="#F5F2EB" strokeWidth="2" />
              <line x1="26" y1="58" x2="26" y2="112" stroke="#7A5C1C" strokeWidth="8" />
            </g>
          </g>
        ))}
        <rect x="-6" y="262" width="272" height="12" fill="#DAD3C4" stroke="#9A7628" strokeWidth="2" />
      </g>
    </svg>
    <div className="absolute top-6 right-8 sm:top-12 sm:right-16 text-right sc-fade" style={cv({ '--delay': '0.4s' })}>
      <div className="font-display font-black text-gold text-3xl sm:text-5xl leading-none">
        <Counter from={800} to={7200} duration={1500} delay={500} />
      </div>
      <div className="font-mono text-[10px] sm:text-xs text-silver/80 tracking-widest mt-1">RPM</div>
    </div>
    <SceneCaption title="Mechanical Timing · Valve Train Sync" sub="Timing chain tensioned · torque 480 Nm verified" />
  </Shell>
);

/* ====================================================================
 * 3. CAR AC — cold airflow over the body, frost + falling snow
 * ==================================================================== */
const AIR_PATHS = [
  'M-80 150 C 120 150, 200 30, 420 28 S 760 80, 900 150',
  'M-80 190 C 140 190, 230 60, 430 58 S 740 110, 900 180',
  'M-80 110 C 100 110, 210 -10, 420 -14 S 780 40, 900 100',
  'M-80 250 C 150 262, 300 210, 460 220 S 780 250, 900 262',
  'M-80 90 C 90 70, 220 -40, 430 -44 S 800 10, 900 60',
  'M-80 300 C 150 310, 320 280, 470 292 S 780 300, 900 310',
];

export const AirflowScene: React.FC = () => (
  <Shell className="bg-[#EAF4F7]">
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(8,145,178,0.16),transparent_65%)]" />
    <div className="absolute inset-0 sc-frost" />
    <SceneFrame tone="cyan" />
    {/* evaporator fan */}
    <svg viewBox="-300 -300 600 600" className="absolute left-1/2 top-[46%] w-[min(86vh,760px)] -translate-x-1/2 -translate-y-1/2 opacity-[0.16]" fill="none">
      <g className="sc-spin" style={cv({ '--spin': '1.1s' })}>
        {Array.from({ length: 7 }, (_, i) => (
          <path key={i} d="M0 0 C 40 -70, 130 -150, 250 -110 C 190 -70, 110 -30, 0 0 Z" fill="#0891B2" transform={`rotate(${(i * 360) / 7})`} />
        ))}
      </g>
      <circle r="285" stroke="#0891B2" strokeWidth="3" strokeDasharray="10 14" />
    </svg>

    <div className={CAR_BOX} style={{ aspectRatio: '800 / 300' }}>
      <CarSide className="w-full h-full overflow-visible" stroke="#0E7490" rim="#38BDF8" draw drawDelay={0.1} drawDuration={1.1} bodyFill="rgba(224,247,252,0.92)" windowFill="rgba(30,70,86,0.85)" wheelSpin={0.9}>
        {() => (
          <>
            {AIR_PATHS.map((d, i) => (
              <g key={i}>
                <path d={d} stroke="#0891B2" strokeWidth="2" opacity="0.16" />
                <path
                  d={d}
                  stroke={i % 2 ? '#22A7C4' : '#0891B2'}
                  strokeWidth={i % 2 ? 2.5 : 3.5}
                  strokeLinecap="round"
                  strokeDasharray="70 90"
                  className="sc-flow"
                  style={cv({ '--flow': '160', '--dur': `${0.9 + (i % 3) * 0.25}s`, '--delay': `${0.3 + i * 0.07}s` })}
                />
              </g>
            ))}
            {/* snowflakes */}
            {Array.from({ length: 16 }, (_, i) => (
              <g key={i} transform={`translate(${30 + ((i * 53) % 740)} ${-40 + ((i * 37) % 120)})`}>
                <g className="sc-snow" style={cv({ '--delay': `${0.3 + (i % 8) * 0.14}s`, '--fall': `${200 + (i % 5) * 30}px`, '--sway': `${(i % 2 ? 1 : -1) * 18}px` })}>
                  <path d="M0 -7 V7 M-6 -3.5 L6 3.5 M-6 3.5 L6 -3.5" stroke="#38BDF8" strokeWidth="1.8" strokeLinecap="round" />
                </g>
              </g>
            ))}
          </>
        )}
      </CarSide>
    </div>

    {/* HUD */}
    <div className="absolute top-6 left-8 sm:top-12 sm:left-16 font-mono text-[10px] sm:text-xs text-cyan-700 tracking-widest space-y-1 sc-fade" style={cv({ '--delay': '0.3s' })}>
      <div>R134a · LOW 32 PSI</div>
      <div>HIGH <Counter from={80} to={210} duration={1300} delay={400} /> PSI</div>
    </div>
    <div className="absolute top-6 right-8 sm:top-12 sm:right-16 text-right sc-fade" style={cv({ '--delay': '0.3s' })}>
      <div className="font-display font-black text-cyan-700 text-4xl sm:text-6xl leading-none">
        <Counter from={38} to={16.5} decimals={1} duration={1500} delay={400} />°C
      </div>
      <div className="font-mono text-[10px] sm:text-xs text-cyan-800/80 tracking-widest mt-1">CABIN TEMPERATURE</div>
    </div>
    <SceneCaption tone="cyan" title="Sub-Zero Cabin Airflow" sub="Compressor engaged · evaporator at frost point" />
  </Shell>
);

/* ====================================================================
 * 4. ELECTRICAL — circuit board powers up the car's lights
 * ==================================================================== */
const TRACES = [
  'M0 120 H260 L330 190 H520',
  'M0 260 H180 L250 330 H470',
  'M0 420 H300 L360 360 H500',
  'M0 560 H220 L300 480 H540',
  'M1200 110 H940 L870 180 H700',
  'M1200 250 H1020 L950 320 H740',
  'M1200 430 H900 L840 370 H720',
  'M1200 570 H980 L900 490 H680',
];

const squareWave = (y: number, amp: number, step: number, count: number, offset: number): string => {
  let d = `M0 ${y}`;
  for (let i = 0; i < count; i++) {
    const hi = (i + offset) % 3 !== 0;
    d += ` V${hi ? y - amp : y + amp} H${(i + 1) * step}`;
  }
  return d;
};

export const ElectricalScene: React.FC = () => {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, '');
  return (
    <Shell>
      <div className="absolute inset-0 blueprint-grid opacity-60" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_52%,rgba(154,118,40,0.12),transparent_60%)]" />
      <SceneFrame />
      <svg viewBox="0 0 1200 675" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid slice" fill="none">
        {TRACES.map((d, i) => (
          <g key={i}>
            <path d={d} stroke="#9A7628" strokeWidth="2" opacity="0.28" className="sc-draw" pathLength={1} style={cv({ '--delay': `${0.1 + i * 0.05}s`, '--dur': '0.9s' })} />
            <path d={d} stroke="#E8B93C" strokeWidth="3.5" strokeLinecap="round" strokeDasharray="0.06 0.94" pathLength={1} className="sc-pulse" style={cv({ '--delay': `${0.5 + i * 0.09}s`, '--dur': '1.1s' })} />
          </g>
        ))}
        {[
          [260, 120], [180, 260], [300, 420], [220, 560], [940, 110], [1020, 250], [900, 430], [980, 570],
        ].map(([x, y], i) => (
          <g key={i} transform={`translate(${x} ${y})`}>
            <g className="sc-pop" style={cv({ '--delay': `${0.35 + i * 0.06}s` })}>
              <rect x="-9" y="-9" width="18" height="18" fill="#FFFFFF" stroke="#9A7628" strokeWidth="2" />
              <rect x="-3" y="-3" width="6" height="6" fill="#B8923A" />
            </g>
          </g>
        ))}
        {/* CAN bus waveforms */}
        <g clipPath={`url(#${uid}-clip)`} className="sc-fade" style={cv({ '--delay': '0.4s' })}>
          <defs>
            <clipPath id={`${uid}-clip`}>
              <rect x="0" y="528" width="1200" height="64" />
            </clipPath>
          </defs>
          <g className="sc-wave">
            <path d={squareWave(546, 11, 40, 70, 0)} stroke="#9A7628" strokeWidth="2.5" />
            <path d={squareWave(572, 11, 40, 70, 1)} stroke="#0891B2" strokeWidth="2" opacity="0.8" />
          </g>
        </g>
      </svg>

      <div className="absolute left-1/2 top-[44%] -translate-x-1/2 -translate-y-1/2 w-[min(74vw,880px)]" style={{ aspectRatio: '800 / 300' }}>
        <CarSide className="w-full h-full overflow-visible" draw drawDelay={0.15} drawDuration={1.0} headlight="#E8B93C" taillight="#ef4444" wheelSpin={0}>
          {() => (
            <>
              <defs>
                <linearGradient id={`${uid}-beam`} x1="0" x2="1">
                  <stop offset="0" stopColor="#E8B93C" stopOpacity="0.85" />
                  <stop offset="1" stopColor="#E8B93C" stopOpacity="0" />
                </linearGradient>
                <linearGradient id={`${uid}-tail`} x1="1" x2="0">
                  <stop offset="0" stopColor="#ef4444" stopOpacity="0.8" />
                  <stop offset="1" stopColor="#ef4444" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d="M776 193 L1180 90 L1180 340 L778 202 Z" fill={`url(#${uid}-beam)`} className="sc-flicker" style={cv({ '--delay': '0.9s' })} />
              <path d="M30 176 L-200 140 L-200 250 L30 184 Z" fill={`url(#${uid}-tail)`} className="sc-flicker" style={cv({ '--delay': '1.05s' })} />
            </>
          )}
        </CarSide>
      </div>

      {/* big bolt */}
      <svg viewBox="-60 -90 120 180" className="absolute left-1/2 top-[7%] -translate-x-1/2 h-[18%] sc-bolt" fill="#B8923A">
        <path d="M14 -80 L-34 6 H-4 L-16 80 L36 -12 H6 Z" />
      </svg>

      {/* battery + module status */}
      <div className="absolute top-6 left-8 sm:top-12 sm:left-16 sc-fade" style={cv({ '--delay': '0.3s' })}>
        <div className="flex items-center gap-1.5">
          <div className="flex gap-1 border-2 border-gold/80 p-1">
            {[0, 1, 2, 3, 4].map((i) => (
              <span key={i} className="w-2.5 h-4 sm:w-3.5 sm:h-6 bg-gold sc-pop" style={cv({ '--delay': `${0.5 + i * 0.18}s` })} />
            ))}
          </div>
          <span className="w-1.5 h-3 bg-gold/80" />
        </div>
        <div className="font-mono text-[10px] sm:text-xs text-gold/90 tracking-widest mt-1.5">
          <Counter from={9.2} to={12.6} decimals={1} duration={1300} delay={400} suffix=" V" />
        </div>
      </div>
      <div className="absolute top-6 right-8 sm:top-12 sm:right-16 font-mono text-[10px] sm:text-xs tracking-widest space-y-1 text-right">
        {['ECU', 'BCM', 'ABS', 'SRS'].map((m, i) => (
          <div key={m} className="text-emerald-700 sc-rise" style={cv({ '--delay': `${0.7 + i * 0.25}s`, '--y': '8px' })}>
            {m} ✓ OK
          </div>
        ))}
      </div>
      <SceneCaption title="CAN-Bus Diagnostic Scan" sub="2.5 V nominal · 0 DTCs present · all modules online" />
    </Shell>
  );
};

/* ====================================================================
 * 5. PREMIUM DETAILING — rotary polisher reveals a mirror finish
 * ==================================================================== */
const SPARKLES: ReadonlyArray<readonly [number, number, number]> = [
  [240, 176, 1.0], [350, 142, 1.15], [470, 128, 1.3], [570, 150, 1.45], [660, 178, 1.6],
  [420, 206, 1.7], [120, 178, 0.95], [730, 194, 1.8], [330, 230, 1.55],
];

export const DetailingScene: React.FC = () => {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, '');
  return (
    <Shell>
      <svg width="0" height="0" className="absolute" aria-hidden="true">
        <defs>
          <linearGradient id={`${uid}-dull`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#DAD6CC" />
            <stop offset="1" stopColor="#B5B0A2" />
          </linearGradient>
          <linearGradient id={`${uid}-gloss`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#F3E2B6" />
            <stop offset="0.35" stopColor="#9A7628" />
            <stop offset="0.62" stopColor="#6C5630" />
            <stop offset="0.7" stopColor="#B8923A" />
            <stop offset="1" stopColor="#2A2113" />
          </linearGradient>
          <linearGradient id={`${uid}-gleam`} x1="0" x2="1">
            <stop offset="0" stopColor="#fff" stopOpacity="0" />
            <stop offset="0.5" stopColor="#fff" stopOpacity="0.75" />
            <stop offset="1" stopColor="#fff" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(184,146,58,0.15),transparent_62%)]" />
      <SceneFrame />

      <div className={CAR_BOX} style={{ aspectRatio: '800 / 300' }}>
        {/* BEFORE: dull, swirled paint */}
        <CarSide className="absolute inset-0 w-full h-full overflow-visible" stroke="#7B7F88" bodyFill={`url(#${uid}-dull)`} wheelSpin={0}>
          {(clip) => (
            <g clipPath={`url(#${clip})`} stroke="#fff" strokeWidth="1" opacity="0.13" fill="none">
              {Array.from({ length: 14 }, (_, i) => (
                <path key={i} d={`M${20 + i * 55} ${120 + (i % 4) * 25} q 30 -30 60 0 t 60 10`} />
              ))}
            </g>
          )}
        </CarSide>
        {/* AFTER: mirror finish, revealed left→right by the polisher */}
        <div className="absolute inset-0 sc-wipe">
          <CarSide className="w-full h-full overflow-visible" stroke="#B8923A" strokeWidth={3.5} bodyFill={`url(#${uid}-gloss)`} windowFill="rgba(48,58,70,0.85)" wheelSpin={0}>
            {(clip) => (
              <g clipPath={`url(#${clip})`}>
                <rect x="-300" y="60" width="140" height="260" fill={`url(#${uid}-gleam)`} className="sc-gleam" transform="skewX(-22)" />
              </g>
            )}
          </CarSide>
        </div>
        {/* sparkles */}
        <svg viewBox="0 0 800 300" className="absolute inset-0 w-full h-full overflow-visible" fill="none">
          {SPARKLES.map(([x, y, d], i) => (
            <g key={i} transform={`translate(${x} ${y})`}>
              <path d="M0 -16 L3.5 -3.5 L16 0 L3.5 3.5 L0 16 L-3.5 3.5 L-16 0 L-3.5 -3.5 Z" fill="#fff" className="sc-twinkle" style={cv({ '--delay': `${d}s` })} />
            </g>
          ))}
          {/* rotary polisher pad travelling with the wipe edge */}
          <g transform="translate(0 205)">
          <g className="sc-pad">
            <line x1="0" y1="-120" x2="0" y2="-26" stroke="#7B7F88" strokeWidth="10" strokeLinecap="round" />
            <rect x="-14" y="-170" width="28" height="60" rx="6" fill="#DAD3C4" stroke="#9A7628" strokeWidth="2.5" />
            <g transform="translate(0 -4)">
              <ellipse rx="56" ry="13" fill="#B8923A" opacity="0.92" />
              <ellipse rx="56" ry="13" fill="none" stroke="#FFF" strokeWidth="2" strokeDasharray="10 12" className="sc-spin" style={cv({ '--spin': '0.5s' })} />
              <ellipse rx="34" ry="8" fill="#9A7628" />
            </g>
          </g>
          </g>
        </svg>
        {/* foam bubbles */}
        <svg viewBox="0 0 800 300" className="absolute inset-0 w-full h-full overflow-visible" fill="none">
          {Array.from({ length: 12 }, (_, i) => (
            <circle key={i} cx={40 + ((i * 67) % 720)} cy={280} r={3 + (i % 4) * 2} stroke="#B8923A" strokeWidth="1.5" className="sc-bubble" style={cv({ '--delay': `${0.3 + (i % 6) * 0.2}s`, '--rise': `${-90 - (i % 5) * 30}px` })} />
          ))}
        </svg>
      </div>
      <SceneCaption title="Dual-Action Polish Clearance" sub="99% swirl eradication · concours optical gloss" />
    </Shell>
  );
};

/* ====================================================================
 * 6. BOOK SERVICE — speedometer launch
 * ==================================================================== */
const SPEED_MAX = 260;
const spToDeg = (v: number) => -120 + (v / SPEED_MAX) * 240;

const MiniGauge: React.FC<{ cx: number; cy: number; r: number; end: number; label: string; delay: number }> = ({ cx, cy, r, end, label, delay }) => (
  <g className="sc-fade" style={cv({ '--delay': `${delay}s` })}>
    <path d={arcPath(cx, cy, r, -120, 120)} stroke="#DAD3C4" strokeWidth="10" />
    <path d={arcPath(cx, cy, r, -120, 120)} stroke="#9A7628" strokeWidth="10" pathLength={1} className="sc-draw" style={cv({ '--delay': `${delay}s`, '--dur': '1.3s', '--to': 1 - end })} />
    {Array.from({ length: 13 }, (_, i) => {
      const a = -120 + i * 20;
      const [x1, y1] = polar(cx, cy, r - 14, a);
      const [x2, y2] = polar(cx, cy, r - (i % 2 ? 22 : 28), a);
      return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#6B6F78" strokeWidth="2" />;
    })}
    <g className="sc-needle" style={cv({ '--from': '-120deg', '--end': `${-120 + end * 240}deg`, '--dur': '1.5s', '--delay': `${delay}s`, transformOrigin: `${cx}px ${cy}px` })}>
      <line x1={cx} y1={cy} x2={cx} y2={cy - r + 20} stroke="#B8923A" strokeWidth="4" strokeLinecap="round" />
    </g>
    <circle cx={cx} cy={cy} r="9" fill="#FFFFFF" stroke="#9A7628" strokeWidth="3" />
    <text x={cx} y={cy + r * 0.62} textAnchor="middle" fill="#6B6F78" fontSize="13" letterSpacing="4" fontFamily="'JetBrains Mono', ui-monospace, monospace">{label}</text>
  </g>
);

export const SpeedoScene: React.FC = () => {
  const cx = 600;
  const cy = 340;
  const R = 225;
  const endSpeed = 228;
  const endDeg = spToDeg(endSpeed);
  const shiftColors = ['#059669', '#059669', '#059669', '#D97706', '#D97706', '#D97706', '#ef4444', '#ef4444', '#ef4444'];
  return (
    <Shell>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_55%,rgba(154,118,40,0.18),transparent_60%)]" />
      <SceneFrame />
      <svg viewBox="0 0 1200 675" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid meet" fill="none">
        {/* road speed streaks */}
        {Array.from({ length: 16 }, (_, i) => (
          <line key={i} x1="0" x2={120 + (i % 4) * 90} y1={40 + i * 40} y2={40 + i * 40} stroke={i % 3 ? '#B8923A' : '#fff'} strokeWidth={i % 3 ? 1.5 : 2.5} opacity="0.35" strokeLinecap="round" className="sc-streak" style={cv({ '--dur': `${0.45 + (i % 5) * 0.12}s`, '--delay': `${(i % 7) * 0.07}s` })} />
        ))}
        {/* shift lights */}
        {shiftColors.map((c, i) => (
          <circle key={i} cx={510 + i * 22.5} cy={46} r="8" fill={c} className="sc-pop" style={cv({ '--delay': `${0.55 + i * 0.12}s`, filter: `drop-shadow(0 0 8px ${c})` })} />
        ))}

        {/* main dial */}
        <circle cx={cx} cy={cy} r={R + 22} fill="rgba(245,242,235,0.92)" stroke="#DAD3C4" strokeWidth="6" />
        <circle cx={cx} cy={cy} r={R + 22} stroke="#9A7628" strokeWidth="1.5" opacity="0.5" strokeDasharray="3 9" className="sc-spin-slow" />
        <path d={arcPath(cx, cy, R, -120, 120)} stroke="#DAD3C4" strokeWidth="14" />
        <path d={arcPath(cx, cy, R, spToDeg(200), 120)} stroke="#ef4444" strokeWidth="14" opacity="0.85" />
        <path d={arcPath(cx, cy, R, -120, 120)} stroke="#B8923A" strokeWidth="14" pathLength={1} className="sc-draw" style={cv({ '--delay': '0.35s', '--dur': '1.45s', '--to': 1 - (endSpeed / SPEED_MAX) })} />
        {Array.from({ length: 27 }, (_, i) => {
          const v = i * 10;
          const major = i % 2 === 0;
          const a = spToDeg(v);
          const [x1, y1] = polar(cx, cy, R - 16, a);
          const [x2, y2] = polar(cx, cy, R - (major ? 38 : 28), a);
          const [tx, ty] = polar(cx, cy, R - 58, a);
          return (
            <g key={v}>
              <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={v >= 200 ? '#ef4444' : '#4B4F57'} strokeWidth={major ? 3 : 1.5} />
              {major && (
                <text x={tx} y={ty + 6} textAnchor="middle" fill={v >= 200 ? '#DC2626' : '#4B4F57'} fontSize="16" fontFamily="'Barlow Condensed', sans-serif" fontWeight="700">
                  {v}
                </text>
              )}
            </g>
          );
        })}
        <g className="sc-needle" style={cv({ '--from': '-120deg', '--end': `${endDeg}deg`, '--dur': '1.7s', '--delay': '0.35s', transformOrigin: `${cx}px ${cy}px` })}>
          <polygon points={`${cx - 6},${cy} ${cx},${cy - R + 28} ${cx + 6},${cy}`} fill="#B8923A" />
          <line x1={cx} y1={cy} x2={cx} y2={cy + 42} stroke="#7A5C1C" strokeWidth="9" strokeLinecap="round" />
        </g>
        <circle cx={cx} cy={cy} r="26" fill="#FFFFFF" stroke="#9A7628" strokeWidth="4" />
        <circle cx={cx} cy={cy} r="8" fill="#B8923A" />
        <foreignObject x={cx - 130} y={cy + 62} width="260" height="110">
          <div style={{ textAlign: 'center', color: '#B8923A', fontFamily: "'Barlow Condensed', sans-serif", lineHeight: 1 }}>
            <div style={{ fontSize: 70, fontWeight: 900 }}>
              <Counter from={0} to={endSpeed} duration={1700} delay={350} />
            </div>
            <div style={{ fontSize: 15, letterSpacing: '0.4em', color: '#6B6F78', fontFamily: 'ui-monospace, monospace' }}>KM/H</div>
          </div>
        </foreignObject>

        <MiniGauge cx={200} cy={400} r={110} end={0.78} label="RPM ×1000" delay={0.5} />
        <MiniGauge cx={1000} cy={400} r={110} end={0.62} label="BOOST" delay={0.6} />
      </svg>
      <SceneCaption title="Service Acceleration · Redline Intake" sub="0 → 100 km/h booking transmission" />
    </Shell>
  );
};

/* ====================================================================
 * 7. TRANSFORMATIONS — weathered → restored reveal
 * ==================================================================== */
export const TransformScene: React.FC = () => {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, '');
  return (
    <Shell>
      <svg width="0" height="0" className="absolute" aria-hidden="true">
        <defs>
          <linearGradient id={`${uid}-dull`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#DAD6CC" />
            <stop offset="1" stopColor="#B5B0A2" />
          </linearGradient>
          <linearGradient id={`${uid}-gloss`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#F3E2B6" />
            <stop offset="0.4" stopColor="#9A7628" />
            <stop offset="0.65" stopColor="#6C5630" />
            <stop offset="0.72" stopColor="#B8923A" />
            <stop offset="1" stopColor="#2A2113" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(154,118,40,0.15),transparent_62%)]" />
      <SceneFrame />
      <div className={CAR_BOX} style={{ aspectRatio: '800 / 300' }}>
        {/* BEFORE */}
        <CarSide className="absolute inset-0 w-full h-full overflow-visible" stroke="#7B7F88" bodyFill={`url(#${uid}-dull)`}>
          {(clip) => (
            <g clipPath={`url(#${clip})`}>
              {[[130, 215, 22], [300, 200, 16], [560, 218, 26], [690, 226, 14], [450, 160, 12], [240, 190, 10]].map(([x, y, r], i) => (
                <circle key={i} cx={x} cy={y} r={r} fill="#6b5a40" opacity="0.5" />
              ))}
              {[[210, 190, 330, 176], [450, 168, 560, 176], [80, 208, 170, 216], [640, 206, 740, 224]].map(([a, b, c, d], i) => (
                <line key={i} x1={a} y1={b} x2={c} y2={d} stroke="#6B6F78" strokeWidth="1.5" opacity="0.5" />
              ))}
              {[[260, 228], [540, 232], [690, 226]].map(([x, y], i) => (
                <circle key={i} cx={x} cy={y} r="7" fill="#8a4b25" opacity="0.7" />
              ))}
            </g>
          )}
        </CarSide>
        <span className="absolute left-[2%] top-[-8%] font-mono text-[10px] sm:text-xs tracking-widest text-silver/70 border border-silver/30 px-2 py-1">BEFORE · WEATHERED</span>
        {/* AFTER */}
        <div className="absolute inset-0 sc-wipe">
          <CarSide className="w-full h-full overflow-visible" stroke="#B8923A" strokeWidth={3.5} bodyFill={`url(#${uid}-gloss)`} windowFill="rgba(48,58,70,0.85)" headlight="#E8B93C" taillight="#ef4444">
            {(clip) => (
              <g clipPath={`url(#${clip})`}>
                <rect x="-300" y="60" width="140" height="260" fill="#fff" opacity="0.4" className="sc-gleam" transform="skewX(-22)" />
              </g>
            )}
          </CarSide>
          <span className="absolute right-[2%] top-[-8%] font-mono text-[10px] sm:text-xs tracking-widest text-gold border border-gold/60 px-2 py-1 bg-carbon-950/70">AFTER · RESTORED</span>
        </div>
        {/* wiper blade / slider */}
        <div className="absolute top-[-18%] bottom-[-18%] w-0 sc-slider">
          <div className="absolute inset-y-0 -left-[2px] w-[4px] bg-gradient-to-b from-transparent via-[#9A7628] to-transparent shadow-[0_0_22px_6px_rgba(184,146,58,0.8)]" />
          <div className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-carbon-950 border-2 border-gold flex items-center justify-center text-gold text-sm sm:text-lg shadow-[0_0_24px_rgba(154,118,40,0.7)]">
            ◀▶
          </div>
        </div>
        {/* sparkles */}
        <svg viewBox="0 0 800 300" className="absolute inset-0 w-full h-full overflow-visible" fill="none">
          {SPARKLES.map(([x, y, d], i) => (
            <g key={i} transform={`translate(${x} ${y})`}>
              <path d="M0 -16 L3.5 -3.5 L16 0 L3.5 3.5 L0 16 L-3.5 3.5 L-16 0 L-3.5 -3.5 Z" fill="#fff" className="sc-twinkle" style={cv({ '--delay': `${d + 0.3}s` })} />
            </g>
          ))}
        </svg>
      </div>
      <SceneCaption title="Transformation Reveal" sub="Sweeping away weathered patina · showroom finish restored" />
    </Shell>
  );
};

/* ====================================================================
 * 8. OUR WORK — workshop shutter rolls up on the showcase bay
 * ==================================================================== */
export const ShutterScene: React.FC = () => (
  <Shell className="bg-[#F5F2EB]">
    {/* back wall + gallery frames */}
    <div className="absolute inset-x-0 top-0 h-[68%] bg-gradient-to-b from-[#E9E4D8] to-[#E4DFD2]" />
    <div className="absolute inset-x-0 top-[12%] flex justify-center gap-[4%] px-[8%]">
      {[0, 1, 2].map((i) => (
        <div key={i} className="relative flex-1 max-w-[260px] aspect-[4/3] border-2 border-gold/70 bg-gradient-to-br from-graphite-800 to-carbon-950 sc-frame-on" style={cv({ '--delay': `${1.05 + i * 0.18}s` })}>
          <div className="absolute inset-2 border border-gold/25" />
          <div className="absolute inset-0 flex items-end justify-center pb-2 font-mono text-[9px] sm:text-[11px] tracking-widest text-gold/80">PROJECT 0{i + 1}</div>
        </div>
      ))}
    </div>
    {/* floor */}
    <div className="absolute inset-x-0 bottom-0 h-[34%] bg-gradient-to-b from-[#E4DFD2] to-[#BFB8A6]" />
    <div className="absolute inset-x-0 bottom-[34%] h-px bg-gold/50" />
    <div className="absolute inset-x-[10%] bottom-[8%] h-[16%] rounded-[50%] bg-[radial-gradient(ellipse,rgba(184,146,58,0.28),transparent_70%)] sc-frame-on" style={cv({ '--delay': '1.1s' })} />
    {/* ceiling spotlights */}
    {[18, 50, 82].map((left, i) => (
      <div key={left} className="absolute top-0 h-[70%] w-[28%] sc-spot" style={{ left: `${left}%`, transform: 'translateX(-50%)', ...cv({ '--delay': `${0.95 + i * 0.16}s` }) }} />
    ))}
    {/* car under the lights */}
    <div className="absolute left-1/2 bottom-[10%] -translate-x-1/2 w-[min(78vw,940px)] sc-car-in" style={{ aspectRatio: '800 / 300' }}>
      <CarSide className="w-full h-full overflow-visible" stroke="#B8923A" bodyFill="rgba(255,255,255,0.98)" headlight="#E8B93C" taillight="#ef4444" wheelSpin={0} />
    </div>
    {/* bay sign */}
    <div className="absolute top-[4%] left-1/2 -translate-x-1/2 px-5 py-2 border-2 border-gold text-gold font-display font-black text-xs sm:text-lg tracking-super-wide uppercase sc-neon" style={cv({ '--delay': '1.0s' })}>
      Bay 01 · Showcase Gallery
    </div>

    {/* ROLLER SHUTTER */}
    <div className="absolute inset-0 sc-shutter">
      <div
        className="absolute inset-0"
        style={{
          background:
            'repeating-linear-gradient(to bottom, #F3EFE5 0px, #E1DCCF 26px, #B3AC9A 30px, #FFFFFF 32px, #D6D0C1 34px)',
          boxShadow: 'inset 0 -30px 60px rgba(70,55,20,0.16)',
        }}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="px-6 py-2 bg-carbon-950/90 border border-gold text-gold font-display font-black text-sm sm:text-2xl tracking-super-wide uppercase">
          Bay Access · Opening
        </span>
      </div>
      <div className="absolute inset-x-0 bottom-0 h-5 bg-gradient-to-b from-gold to-gold-dark shadow-[0_0_30px_rgba(154,118,40,0.8)]" />
      <div className="absolute left-1/2 bottom-5 -translate-x-1/2 w-24 h-3 bg-carbon-950 border-x border-b border-gold/70" />
    </div>
    <div className="absolute inset-x-0 top-0 h-5 bg-gradient-to-b from-carbon-950 to-graphite-800 border-b border-gold/60 z-10" />
  </Shell>
);

/* ====================================================================
 * 9. ABOUT — car doors swing open on the cabin
 * ==================================================================== */
export const DoorScene: React.FC = () => (
  <Shell className="bg-[#F5F2EB]" >
    {/* cabin interior */}
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_62%,rgba(154,118,40,0.22),transparent_62%)]" />
    <svg viewBox="0 0 1200 675" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid slice" fill="none">
      {/* A-pillars, roof line and rear-view mirror frame the windscreen */}
      <g className="sc-fade" style={cv({ '--delay': '0.7s', '--dur': '0.9s' })}>
        <path d="M0 0 H150 L330 400 H0 Z" fill="#E9E4D8" stroke="#9A7628" strokeWidth="2" opacity="0.95" />
        <path d="M1200 0 H1050 L870 400 H1200 Z" fill="#E9E4D8" stroke="#9A7628" strokeWidth="2" opacity="0.95" />
        <path d="M150 0 H1050" stroke="#9A7628" strokeWidth="2" opacity="0.5" />
        <path d="M600 0 V34" stroke="#7B7F88" strokeWidth="6" />
        <rect x="520" y="34" width="160" height="46" rx="12" fill="#FFFFFF" stroke="#B8923A" strokeWidth="2.5" />
        <path d="M530 64 H670" stroke="#0891B2" strokeWidth="1.5" opacity="0.6" />
      </g>
      {/* dashboard */}
      <path d="M0 470 C 200 400, 400 380, 600 380 S 1000 400, 1200 470 V675 H0 Z" fill="#E6E1D4" stroke="#9A7628" strokeWidth="2" opacity="0.95" />
      <path d="M0 470 C 200 400, 400 380, 600 380 S 1000 400, 1200 470" stroke="#B8923A" strokeWidth="4" className="sc-ambient" />
      <path d="M20 500 C 220 435, 410 414, 600 414 S 980 435, 1180 500" stroke="#9A7628" strokeWidth="2" strokeDasharray="10 8" opacity="0.6" className="sc-fade" style={cv({ '--delay': '0.5s', '--dur': '1.2s' })} />
      {/* instrument cluster */}
      <g className="sc-fade" style={cv({ '--delay': '0.6s' })}>
        <circle cx="470" cy="455" r="70" fill="#F5F2EB" stroke="#9A7628" strokeWidth="3" />
        <circle cx="730" cy="455" r="70" fill="#F5F2EB" stroke="#9A7628" strokeWidth="3" />
        <line x1="470" y1="455" x2="500" y2="410" stroke="#B8923A" strokeWidth="4" strokeLinecap="round" className="sc-needle-idle" style={{ transformOrigin: '470px 455px' }} />
        <line x1="730" y1="455" x2="700" y2="405" stroke="#B8923A" strokeWidth="4" strokeLinecap="round" className="sc-needle-idle" style={{ transformOrigin: '730px 455px' }} />
        <rect x="548" y="410" width="104" height="62" rx="6" fill="#DDF3F8" stroke="#0891B2" strokeWidth="1.5" opacity="0.9" />
      </g>
      {/* steering wheel */}
      <g className="sc-wheel-rock" style={{ transformOrigin: '600px 560px' }}>
        <circle cx="600" cy="560" r="150" stroke="#1d1f24" strokeWidth="30" />
        <circle cx="600" cy="560" r="150" stroke="#9A7628" strokeWidth="2.5" strokeDasharray="7 6" className="sc-fade" style={cv({ '--delay': '0.7s', '--dur': '1.0s' })} />
        <path d="M455 560 H520 M680 560 H745 M600 575 V700" stroke="#1d1f24" strokeWidth="26" strokeLinecap="round" />
        <circle cx="600" cy="560" r="34" fill="#FFFFFF" stroke="#B8923A" strokeWidth="3" />
        <text x="600" y="567" textAnchor="middle" fill="#B8923A" fontSize="18" fontWeight="900" fontFamily="'Barlow Condensed', sans-serif">MM</text>
      </g>
      {/* seat stitching */}
      {[0, 1, 2, 3].map((i) => (
        <path key={i} d={`M${60 + i * 36} 675 C ${90 + i * 36} 560, ${120 + i * 36} 470, ${180 + i * 36} 410`} stroke="#9A7628" strokeWidth="1.8" strokeDasharray="6 7" opacity="0.55" className="sc-fade" style={cv({ '--delay': `${0.7 + i * 0.1}s`, '--dur': '0.8s' })} />
      ))}
      {[0, 1, 2, 3].map((i) => (
        <path key={i} d={`M${1140 - i * 36} 675 C ${1110 - i * 36} 560, ${1080 - i * 36} 470, ${1020 - i * 36} 410`} stroke="#9A7628" strokeWidth="1.8" strokeDasharray="6 7" opacity="0.55" className="sc-fade" style={cv({ '--delay': `${0.7 + i * 0.1}s`, '--dur': '0.8s' })} />
      ))}
    </svg>

    {/* light spilling through the seam */}
    <div className="absolute inset-y-0 left-1/2 w-[3px] -translate-x-1/2 bg-gradient-to-b from-transparent via-gold-highlight to-transparent shadow-[0_0_40px_14px_rgba(184,146,58,0.7)] sc-seam" />

    {/* doors */}
    <div className="absolute inset-0" style={{ perspective: '1500px' }}>
      {(['left', 'right'] as const).map((side) => (
        <div
          key={side}
          className={`absolute inset-y-0 w-1/2 ${side === 'left' ? 'left-0 sc-door-left' : 'right-0 sc-door-right'}`}
          style={{ transformOrigin: side === 'left' ? 'left center' : 'right center' }}
        >
          <div className={`absolute inset-0 bg-gradient-to-b from-[#FFFFFF] via-[#EDE8DC] to-[#CFC8B6] border-gold/50 ${side === 'left' ? 'border-r-2' : 'border-l-2'}`}>
            {/* window */}
            <div className={`absolute top-[8%] h-[34%] ${side === 'left' ? 'left-[10%] right-[8%]' : 'left-[8%] right-[10%]'} border border-gold/40 bg-gradient-to-b from-[#9FB8C4]/70 to-[#C9DCE4]`} style={{ clipPath: side === 'left' ? 'polygon(0 0, 100% 0, 100% 100%, 0 100%, 0 40%)' : 'polygon(0 0, 100% 0, 100% 40%, 100% 100%, 0 100%)' }} />
            {/* shoulder line + handle */}
            <div className="absolute top-[48%] inset-x-[6%] h-[2px] bg-gradient-to-r from-transparent via-gold/60 to-transparent" />
            <div className={`absolute top-[52%] ${side === 'left' ? 'right-[10%]' : 'left-[10%]'} w-[22%] h-3 rounded-full bg-gradient-to-b from-gold-highlight to-gold-dark shadow-[0_0_14px_rgba(154,118,40,0.6)]`} />
            <div className="absolute bottom-[10%] inset-x-[8%] h-[2px] bg-gold/30" />
            <div className="absolute inset-0 bg-gradient-to-r from-white/40 via-transparent to-[#8A7A55]/25" />
          </div>
        </div>
      ))}
    </div>
    <SceneCaption title="Cabin Craftsmanship · Doors Open" sub="Passion for cars · commitment to craft" />
  </Shell>
);

/* ====================================================================
 * 10. WHY US — engineering blueprint of the car
 * ==================================================================== */
const PILLARS: ReadonlyArray<{ label: string; to: readonly [number, number]; at: readonly [number, number]; anchor: 'start' | 'end' }> = [
  { label: '01 SKILLED TECHNICIANS', to: [90, 150], at: [-10, 40], anchor: 'start' },
  { label: '02 QUALITY MATERIALS', to: [440, 119], at: [250, -22], anchor: 'start' },
  { label: '03 ATTENTION TO DETAIL', to: [670, 172], at: [590, -2], anchor: 'start' },
  { label: '04 ONE-ROOF CAR CARE', to: [200, 232], at: [-10, 300], anchor: 'start' },
  { label: '05 CUSTOMER-FIRST', to: [506, 232], at: [370, 318], anchor: 'start' },
  { label: '06 RELIABLE WORKMANSHIP', to: [762, 196], at: [612, 292], anchor: 'start' },
];

export const BlueprintScene: React.FC = () => (
  <Shell>
    <div className="absolute inset-0 blueprint-grid opacity-90" />
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_48%,rgba(75,79,87,0.08),transparent_62%)]" />
    <SceneFrame />
    {/* rotating drafting compass */}
    <svg viewBox="-400 -400 800 800" className="absolute left-1/2 top-[46%] -translate-x-1/2 -translate-y-1/2 w-[min(120vh,1000px)] opacity-30" fill="none">
      <g className="sc-spin-slow" style={cv({ '--spin': '24s' })}>
        <circle r="380" stroke="#9A7628" strokeWidth="1.5" strokeDasharray="2 10" />
        <circle r="330" stroke="#6B6F78" strokeWidth="1" />
        {Array.from({ length: 72 }, (_, i) => (
          <line key={i} x1="0" y1="-330" x2="0" y2={i % 6 === 0 ? -300 : -316} stroke="#6B6F78" strokeWidth={i % 6 === 0 ? 2 : 1} transform={`rotate(${i * 5})`} />
        ))}
      </g>
      <g className="sc-spin-rev-slow">
        <circle r="250" stroke="#9A7628" strokeWidth="1" strokeDasharray="14 10" />
      </g>
      <line x1="-400" y1="0" x2="400" y2="0" stroke="#9A7628" strokeWidth="1" strokeDasharray="12 6" />
      <line x1="0" y1="-400" x2="0" y2="400" stroke="#9A7628" strokeWidth="1" strokeDasharray="12 6" />
    </svg>

    <div className={CAR_BOX} style={{ aspectRatio: '800 / 300' }}>
      <CarSide className="w-full h-full overflow-visible" draw drawDelay={0.1} drawDuration={1.5} stroke="#2F3238" strokeWidth={2} bodyFill="rgba(255,255,255,0.55)" windowFill="rgba(48,58,70,0.12)" archFill="rgba(245,242,235,0.8)">
        {() => (
          <g fontFamily="'JetBrains Mono', ui-monospace, monospace" fontSize="12" letterSpacing="1.5" fill="none">
            {/* axes */}
            <line x1="-40" y1="246" x2="840" y2="246" stroke="#9A7628" strokeWidth="1" strokeDasharray="14 6" className="sc-fade" style={cv({ '--delay': '0.4s', '--dur': '0.9s' })} />
            <line x1="402" y1="60" x2="402" y2="290" stroke="#9A7628" strokeWidth="1" strokeDasharray="14 6" className="sc-fade" style={cv({ '--delay': '0.5s', '--dur': '0.9s' })} />
            {/* wheelbase dimension */}
            <g className="sc-fade" style={cv({ '--delay': '1.2s' })}>
              <path d="M192 262 V282 M614 262 V282 M192 276 H614" stroke="#9A7628" strokeWidth="1.5" />
              <path d="M192 276 l10 -4 v8 Z M614 276 l-10 -4 v8 Z" fill="#9A7628" />
              <text x="402" y="272" textAnchor="middle" fill="#B8923A">WHEELBASE 2,700</text>
            </g>
            {/* height dimension */}
            <g className="sc-fade" style={cv({ '--delay': '1.3s' })}>
              <path d="M806 118 H826 M806 246 H826 M820 118 V246" stroke="#9A7628" strokeWidth="1.5" />
              <path d="M820 118 l-4 10 h8 Z M820 246 l-4 -10 h8 Z" fill="#9A7628" />
              <text fill="#B8923A" x="832" y="182" transform="rotate(90 832 182)" textAnchor="middle">H 1,300</text>
            </g>
            {/* pillar callouts */}
            {PILLARS.map((p, i) => (
              <g key={p.label}>
                <path d={`M${p.at[0] + 6} ${p.at[1] + (p.at[1] < 100 ? 6 : -14)} L${p.to[0]} ${p.to[1]}`} stroke="#9A7628" strokeWidth="1.2" className="sc-draw" pathLength={1} style={cv({ '--delay': `${0.9 + i * 0.12}s`, '--dur': '0.5s' })} />
                <circle cx={p.to[0]} cy={p.to[1]} r="4.5" fill="#B8923A" className="sc-pop" style={cv({ '--delay': `${1.15 + i * 0.12}s` })} />
                <text fill="#B8923A" x={p.at[0]} y={p.at[1]} textAnchor={p.anchor} className="sc-fade" style={cv({ '--delay': `${1.0 + i * 0.12}s` })}>{p.label}</text>
              </g>
            ))}
          </g>
        )}
      </CarSide>
    </div>
    {/* scan line */}
    <div className="absolute top-[14%] bottom-[18%] w-[2px] bg-gradient-to-b from-transparent via-gold-highlight to-transparent shadow-[0_0_20px_4px_rgba(184,146,58,0.55)] sc-hscan" />
    <SceneCaption title="Engineering Standards · 6 Pillars" sub="Chassis, coatings & mechanical rigor · drawn to tolerance" />
  </Shell>
);

/* ====================================================================
 * 11. CONTACT — GPS route to the workshop
 * ==================================================================== */
const ROUTE = 'M110 580 H360 Q400 580 400 540 V430 Q400 390 440 390 H700 Q740 390 740 350 V250 Q740 210 780 210 H960';
export const GpsScene: React.FC = () => (
  <Shell className="bg-[#F5F2EB]">
    <svg viewBox="0 0 1200 675" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid slice" fill="none">
      {/* city blocks */}
      {Array.from({ length: 6 }, (_, r) =>
        Array.from({ length: 10 }, (_, c) => (
          <rect key={`${r}-${c}`} x={40 + c * 118} y={50 + r * 106} width="96" height="84" fill="#EAE5D9" stroke="#D9D2C2" strokeWidth="1" className="sc-fade" style={cv({ '--delay': `${(r + c) * 0.025}s`, '--dur': '0.5s' })} />
        )),
      )}
      {/* roads */}
      {['M0 480 H1200', 'M0 300 H1200', 'M260 0 V675', 'M640 0 V675', 'M960 0 V675', 'M0 120 L1200 560'].map((d, i) => (
        <path key={i} d={d} stroke="#D2CBBA" strokeWidth="16" />
      ))}
      {/* river */}
      <path d="M-20 640 C 250 560, 500 700, 760 600 S 1100 560, 1240 620" stroke="#BFD9E4" strokeWidth="26" opacity="0.9" />
      {/* route */}
      <path id="sc-route" d={ROUTE} stroke="#9A7628" strokeWidth="16" opacity="0.18" />
      <path d={ROUTE} stroke="#B8923A" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" pathLength={1} className="sc-draw" style={cv({ '--delay': '0.3s', '--dur': '1.5s', filter: 'drop-shadow(0 0 8px #9A7628)' })} />
      {/* waypoint dots */}
      {[[400, 430], [740, 350]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="8" fill="#FFFFFF" stroke="#B8923A" strokeWidth="3" className="sc-pop" style={cv({ '--delay': `${0.8 + i * 0.4}s` })} />
      ))}
      {/* moving car marker */}
      <g>
        <animateMotion dur="1.5s" begin="0.3s" fill="freeze" rotate="auto" keyPoints="0;1" keyTimes="0;1" calcMode="spline" keySplines="0.45 0 0.25 1">
          <mpath href="#sc-route" />
        </animateMotion>
        <g className="sc-fade" style={cv({ '--delay': '0.3s', '--dur': '0.2s' })}>
          <circle r="20" fill="rgba(154,118,40,0.25)" />
          <path d="M16 0 L-10 -11 L-5 0 L-10 11 Z" fill="#E8B93C" stroke="#9A7628" strokeWidth="2" strokeLinejoin="round" />
        </g>
      </g>
      {/* destination pin */}
      <g transform="translate(960 210)">
        {[0, 1, 2].map((n) => (
          <circle key={n} r="14" stroke="#B8923A" strokeWidth="3" className="sc-ping" style={cv({ '--delay': `${1.5 + n * 0.45}s` })} />
        ))}
        <g className="sc-pin-drop" style={cv({ '--delay': '1.35s' })}>
          <path d="M0 0 C -26 -34, -30 -62, 0 -74 C 30 -62, 26 -34, 0 0 Z" fill="#9A7628" stroke="#E8B93C" strokeWidth="3" />
          <circle cy="-48" r="10" fill="#FFFFFF" />
        </g>
      </g>
    </svg>
    {/* radar sweep */}
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(110vh,900px)] aspect-square opacity-40">
      <div className="w-full h-full rounded-full sc-radar" style={{ background: 'conic-gradient(from 0deg, rgba(154,118,40,0) 0deg, rgba(154,118,40,0.5) 70deg, rgba(154,118,40,0) 72deg)' }} />
    </div>
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(245,242,235,0.85)_100%)]" />
    <SceneFrame />
    {/* turn card */}
    <div className="absolute top-6 left-8 sm:top-12 sm:left-16 border border-gold/60 bg-carbon-950/90 px-4 py-3 sc-rise" style={cv({ '--delay': '0.6s', '--y': '-20px' })}>
      <div className="font-display font-black text-gold text-2xl sm:text-4xl leading-none">
        <Counter from={4.2} to={0.1} decimals={1} duration={1500} delay={500} /> <span className="text-sm sm:text-lg">KM</span>
      </div>
      <div className="font-mono text-[10px] sm:text-xs text-silver/80 tracking-widest mt-1">ARRIVE · MM NEXT LEVEL</div>
    </div>
    <SceneCaption title="Routing To Coimbatore Workshop" sub="11.0168° N, 76.9558° E · Target acquired" />
  </Shell>
);
