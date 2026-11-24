import React from 'react';
import './backdrops.css';
import { CarSide } from '../transitions/sceneKit';
import {
  CAR_BODY,
  CAR_WHEEL_R,
  CAR_WHEELS,
  CAR_WING,
  CAR_WING_STRUTS,
  CAR_WINDOW_FRONT,
  CAR_WINDOW_REAR,
  cv,
  gearPath,
} from '../transitions/sceneUtils';

type Variant =
  | 'road'
  | 'launch'
  | 'wheel'
  | 'spray'
  | 'sparks'
  | 'clock'
  | 'gears'
  | 'airflow'
  | 'droplets'
  | 'circuit'
  | 'sparkle'
  | 'sweep'
  | 'spotlight'
  | 'drive'
  | 'blueprint'
  | 'gauge'
  | 'map'
  | 'radar'
  | 'hazard';

const variantForPath = (path: string): Variant => {
  if (path === '/' || path === '') return 'road';
  if (path === '/services') return 'wheel';
  if (path === '/services/car-painting') return 'spray';
  if (path === '/services/body-repair') return 'sparks';
  if (path === '/services/car-restoration') return 'clock';
  if (path === '/services/mechanical-services') return 'gears';
  if (path === '/services/car-ac') return 'airflow';
  if (path === '/services/ceramic-coating') return 'droplets';
  if (path === '/services/electrical-services') return 'circuit';
  if (path === '/services/premium-detailing') return 'sparkle';
  if (path === '/transformations') return 'sweep';
  if (path === '/our-work' || path.startsWith('/our-work/')) return 'spotlight';
  if (path === '/about') return 'drive';
  if (path === '/why-choose-us') return 'blueprint';
  if (path === '/faq') return 'gauge';
  if (path === '/book-service') return 'launch';
  if (path === '/contact') return 'map';
  if (path === '/privacy-policy') return 'radar';
  return 'hazard';
};

/** Deterministic pseudo-random in [0,1) so layouts are stable between renders. */
const rnd = (i: number, salt = 1): number => {
  const x = Math.sin(i * 12.9898 + salt * 78.233) * 43758.5453;
  return x - Math.floor(x);
};

const pct = (n: number) => `${n.toFixed(2)}%`;

/* ------------------------------------------------------------------ */
const Road: React.FC<{ fast?: boolean }> = ({ fast }) => (
  <div className="bd-road absolute inset-0">
    <div className="bd-horizon" />
    {Array.from({ length: fast ? 14 : 9 }, (_, i) => (
      <span
        key={i}
        className="bd-streak"
        style={{
          top: pct(8 + rnd(i) * 44),
          width: `${140 + rnd(i, 2) * 220}px`,
          opacity: 0.35 + rnd(i, 3) * 0.5,
          ...cv({ '--dur': `${(fast ? 0.9 : 2.2) + rnd(i, 4) * (fast ? 0.9 : 2.4)}s`, '--delay': `${-rnd(i, 5) * 4}s` }),
        }}
      />
    ))}
    <div className="bd-racer" style={{ aspectRatio: '800 / 300', ...cv({ '--dur': fast ? '4.2s' : '8s' }) }}>
      <span className="bd-racer-trail" />
      <CarSide className="w-full h-full overflow-visible" stroke="#B8923A" bodyFill="rgba(255,255,255,0.96)" headlight="#E8B93C" taillight="#ef4444" wheelSpin={0.18} />
    </div>
    <div className="bd-road-surface">
      <div className="bd-lane-edge" style={{ left: '30%' }} />
      <div className="bd-lane-edge" style={{ left: '70%' }} />
      <div className="bd-lane-center" style={cv({ '--lane': fast ? '0.45s' : '0.9s' })} />
    </div>
  </div>
);

/* ------------------------------------------------------------------ */
const AlloyWheel: React.FC<{ spin: string; className: string }> = ({ spin, className }) => (
  <svg viewBox="-500 -500 1000 1000" className={className} fill="none">
    <circle r="330" stroke="#6B6F78" strokeWidth="3" strokeDasharray="3 12" />
    <path d="M300 -170 A345 345 0 0 1 300 170 L360 190 A410 410 0 0 0 360 -190 Z" fill="rgba(154,118,40,0.35)" stroke="#9A7628" strokeWidth="3" />
    <g className="bd-spin" style={cv({ '--spin': spin })}>
      <circle r="470" stroke="#9A7628" strokeWidth="14" />
      <circle r="430" stroke="#7B7F88" strokeWidth="4" />
      {Array.from({ length: 10 }, (_, i) => (
        <path key={i} d="M-26 -120 L26 -120 L46 -415 L-46 -415 Z" fill="rgba(154,118,40,0.1)" stroke="#9A7628" strokeWidth="3" transform={`rotate(${i * 36})`} />
      ))}
      <circle r="130" stroke="#B8923A" strokeWidth="6" />
      {Array.from({ length: 5 }, (_, i) => (
        <circle key={i} cx={Math.sin((i * 72 * Math.PI) / 180) * 78} cy={-Math.cos((i * 72 * Math.PI) / 180) * 78} r="14" fill="#9A7628" />
      ))}
    </g>
  </svg>
);

const Wheels: React.FC = () => (
  <>
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_50%,rgba(154,118,40,0.14),transparent_55%)]" />
    <AlloyWheel spin="70s" className="bd-wheel-a" />
    <AlloyWheel spin="50s" className="bd-wheel-b" />
  </>
);

/* ------------------------------------------------------------------ */
const Spray: React.FC = () => {
  const blobs = [
    { c: 'rgba(154,118,40,0.32)', l: '8%', t: '12%', s: '46vmin', dx: '14vw', dy: '8vh', dur: '17s' },
    { c: 'rgba(122,92,28,0.3)', l: '62%', t: '8%', s: '52vmin', dx: '-12vw', dy: '14vh', dur: '21s' },
    { c: 'rgba(120,100,60,0.12)', l: '36%', t: '52%', s: '44vmin', dx: '10vw', dy: '-10vh', dur: '19s' },
    { c: 'rgba(184,146,58,0.24)', l: '70%', t: '58%', s: '40vmin', dx: '-9vw', dy: '-8vh', dur: '15s' },
    { c: 'rgba(120,70,30,0.26)', l: '-6%', t: '60%', s: '42vmin', dx: '12vw', dy: '-6vh', dur: '23s' },
  ];
  return (
    <>
      {blobs.map((b, i) => (
        <span key={i} className="bd-blob" style={{ left: b.l, top: b.t, width: b.s, height: b.s, background: b.c, ...cv({ '--dx': b.dx, '--dy': b.dy, '--dur': b.dur }) }} />
      ))}
      <div className="bd-spray-gun" />
      {Array.from({ length: 22 }, (_, i) => (
        <span key={i} className="bd-mist" style={{ left: pct(rnd(i) * 96), top: pct(10 + rnd(i, 2) * 80), width: `${14 + rnd(i, 3) * 34}px`, height: `${14 + rnd(i, 3) * 34}px`, ...cv({ '--dur': `${3 + rnd(i, 4) * 3}s`, '--delay': `${-rnd(i, 5) * 6}s`, '--mx': `${(rnd(i, 6) - 0.5) * 120}px`, '--my': `${-20 - rnd(i, 7) * 70}px` }) }} />
      ))}
    </>
  );
};

/* ------------------------------------------------------------------ */
const Sparks: React.FC = () => {
  const emitters = [
    { x: '12%', y: '74%', dir: 1 },
    { x: '88%', y: '30%', dir: -1 },
  ];
  return (
    <>
      <svg className="absolute inset-0 w-full h-full opacity-[0.2]" preserveAspectRatio="xMidYMid slice" viewBox="0 0 120 104" fill="none">
        {Array.from({ length: 8 }, (_, r) =>
          Array.from({ length: 9 }, (_, c) => (
            <polygon key={`${r}-${c}`} points="10,0 20,5.8 20,17.3 10,23 0,17.3 0,5.8" transform={`translate(${c * 20 + (r % 2 ? 10 : 0) - 10} ${r * 17.3 - 4})`} stroke="#9A7628" strokeWidth="0.35" />
          )),
        )}
      </svg>
      <span className="bd-weld" style={{ left: '-6vmin', top: '56%' }} />
      <span className="bd-weld" style={{ right: '-10vmin', top: '8%', animationDelay: '-1.1s' }} />
      {emitters.map((e, ei) =>
        Array.from({ length: 16 }, (_, i) => (
          <span
            key={`${ei}-${i}`}
            className="bd-spark"
            style={{ left: e.x, top: e.y, ...cv({ '--dx': `${e.dir * (70 + rnd(i, ei + 1) * 300)}px`, '--dy': `${-60 - rnd(i, ei + 5) * 260 + rnd(i, ei + 9) * 160}px`, '--dur': `${1.1 + rnd(i, ei + 3) * 1.3}s`, '--delay': `${-rnd(i, ei + 7) * 2.4}s` }) }}
          />
        )),
      )}
      <div className="bd-scanline" />
    </>
  );
};

/* ------------------------------------------------------------------ */
const Clock: React.FC = () => (
  <>
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_46%,rgba(122,92,28,0.2),transparent_60%)]" />
    <svg viewBox="-500 -500 1000 1000" className="bd-clock" fill="none">
      <g className="bd-spin" style={cv({ '--spin': '240s' })}>
        <circle r="470" stroke="#9A7628" strokeWidth="3" strokeDasharray="4 14" />
        {Array.from({ length: 60 }, (_, i) => (
          <line key={i} y1="-440" y2={i % 5 === 0 ? -395 : -418} stroke="#9A7628" strokeWidth={i % 5 === 0 ? 5 : 2} transform={`rotate(${i * 6})`} />
        ))}
      </g>
      <g className="bd-spin bd-spin-rev" style={cv({ '--spin': '90s' })}>
        <circle r="340" stroke="#6B6F78" strokeWidth="2" strokeDasharray="30 18" />
      </g>
      {/* hands run backwards: time reversal */}
      <g className="bd-spin bd-spin-rev" style={{ transformBox: 'view-box', transformOrigin: '0px 0px', ...cv({ '--spin': '14s' }) }}>
        <line y1="30" y2="-300" stroke="#B8923A" strokeWidth="7" strokeLinecap="round" />
      </g>
      <g className="bd-spin bd-spin-rev" style={{ transformBox: 'view-box', transformOrigin: '0px 0px', ...cv({ '--spin': '168s' }) }}>
        <line y1="24" y2="-200" stroke="#9A7628" strokeWidth="11" strokeLinecap="round" />
      </g>
      <circle r="20" fill="#9A7628" />
    </svg>
    {Array.from({ length: 16 }, (_, i) => (
      <span key={i} className="bd-dust" style={{ left: pct(rnd(i) * 100), top: 0, ...cv({ '--dur': `${14 + rnd(i, 2) * 12}s`, '--delay': `${-rnd(i, 3) * 20}s`, '--sway': `${(rnd(i, 4) - 0.5) * 100}px` }) }} />
    ))}
  </>
);

/* ------------------------------------------------------------------ */
const TRAIN = [
  { n: 34, r: 170, cx: 300, cy: 230, dur: 90, rev: false, phase: 0 },
  { n: 22, r: 110, cx: 580, cy: 230, dur: 90 * (22 / 34), rev: true, phase: 180 - (360 / 22) * 0.5 },
  { n: 14, r: 70, cx: 60, cy: 230, dur: 90 * (14 / 34), rev: true, phase: -(360 / 14) * 0.5 },
];
const GearTrain: React.FC<{ className: string; style?: React.CSSProperties }> = ({ className, style }) => (
  <svg viewBox="-30 40 760 380" className={className} style={style} fill="none">
    {TRAIN.map((g) => (
      <g key={g.n} transform={`translate(${g.cx} ${g.cy})`}>
        <g className={`bd-spin ${g.rev ? 'bd-spin-rev' : ''}`} style={cv({ '--spin': `${g.dur}s` })}>
          <path d={gearPath(g.n, g.r, g.r * 0.12)} transform={`rotate(${g.phase})`} fill="rgba(154,118,40,0.06)" stroke="#9A7628" strokeWidth="3" strokeLinejoin="round" />
          <circle r={g.r * 0.76} stroke="#9A7628" strokeWidth="1.5" strokeDasharray="4 8" />
          {Array.from({ length: 6 }, (_, i) => (
            <circle key={i} cx={Math.cos((i / 6) * Math.PI * 2) * g.r * 0.5} cy={Math.sin((i / 6) * Math.PI * 2) * g.r * 0.5} r={g.r * 0.15} stroke="#9A7628" strokeWidth="2" />
          ))}
          <circle r={g.r * 0.2} stroke="#B8923A" strokeWidth="3" />
        </g>
      </g>
    ))}
  </svg>
);
const Gears: React.FC = () => (
  <>
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_80%,rgba(154,118,40,0.14),transparent_55%)]" />
    <GearTrain className="bd-gear" style={{ left: '-12vw', bottom: '-14vh', width: '78vw' }} />
    <GearTrain className="bd-gear" style={{ right: '-20vw', top: '-12vh', width: '58vw', opacity: 0.2 }} />
  </>
);

/* ------------------------------------------------------------------ */
const AIR = [
  'M-50 120 C 300 110, 500 40, 760 70 S 1150 160, 1260 130',
  'M-50 220 C 260 230, 520 140, 780 170 S 1120 250, 1260 230',
  'M-50 330 C 300 320, 480 250, 760 290 S 1140 340, 1260 320',
  'M-50 440 C 280 450, 520 380, 800 410 S 1140 470, 1260 440',
  'M-50 540 C 320 530, 540 480, 800 510 S 1120 570, 1260 550',
  'M-50 620 C 300 640, 560 590, 820 610 S 1140 650, 1260 630',
];
const Airflow: React.FC = () => (
  <>
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_45%,rgba(8,145,178,0.12),transparent_62%)]" />
    <div className="bd-frost" />
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1200 675" preserveAspectRatio="none" fill="none">
      {AIR.map((d, i) => (
        <g key={i}>
          <path d={d} stroke="#0891B2" strokeWidth="1.5" opacity="0.18" vectorEffect="non-scaling-stroke" />
          <path d={d} stroke={i % 2 ? '#22A7C4' : '#0891B2'} strokeWidth={i % 2 ? 2 : 3} opacity="0.6" strokeLinecap="round" strokeDasharray="90 130" className="bd-flow" vectorEffect="non-scaling-stroke" style={cv({ '--flow': '220', '--dur': `${2.2 + (i % 3) * 0.7}s` })} />
        </g>
      ))}
    </svg>
    {Array.from({ length: 34 }, (_, i) => (
      <span key={i} className="bd-snow" style={{ left: pct(rnd(i) * 100), ...cv({ '--s': `${3 + rnd(i, 2) * 5}px`, '--dur': `${7 + rnd(i, 3) * 8}s`, '--delay': `${-rnd(i, 4) * 15}s`, '--sway': `${(rnd(i, 5) - 0.5) * 120}px` }) }} />
    ))}
  </>
);

/* ------------------------------------------------------------------ */
const Droplets: React.FC = () => (
  <>
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_30%,rgba(154,118,40,0.1),transparent_60%)]" />
    {Array.from({ length: 30 }, (_, i) => (
      <span key={i} className="bd-bead" style={{ left: pct(rnd(i) * 98), top: pct(rnd(i, 2) * 70), ...cv({ '--s': `${8 + rnd(i, 3) * 16}px`, '--dur': `${6 + rnd(i, 4) * 7}s`, '--delay': `${-rnd(i, 5) * 12}s`, '--drop': `${140 + rnd(i, 6) * 240}px`, '--sx': `${(rnd(i, 7) - 0.5) * 14}px` }) }} />
    ))}
    {Array.from({ length: 5 }, (_, i) => (
      <span key={i} className="bd-ripple" style={{ left: pct(10 + rnd(i, 9) * 80), top: pct(30 + rnd(i, 10) * 55), marginLeft: -60, marginTop: -60, ...cv({ '--s': `${90 + rnd(i, 11) * 90}px`, '--dur': `${4 + rnd(i, 12) * 3}s`, '--delay': `${-rnd(i, 13) * 6}s` }) }} />
    ))}
  </>
);

/* ------------------------------------------------------------------ */
const TRACES = [
  'M0 90 H300 L380 170 H620',
  'M0 230 H200 L290 320 H520',
  'M0 400 H340 L420 330 H640',
  'M0 560 H260 L340 480 H600',
  'M1200 80 H900 L820 160 H600',
  'M1200 240 H1010 L930 320 H700',
  'M1200 410 H880 L800 340 H660',
  'M1200 590 H960 L880 500 H640',
  'M600 0 V160 M600 515 V675',
];
const Circuit: React.FC = () => (
  <>
    <div className="absolute inset-0 blueprint-grid opacity-60" />
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(154,118,40,0.1),transparent_60%)]" />
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1200 675" preserveAspectRatio="xMidYMid slice" fill="none">
      {TRACES.map((d, i) => (
        <g key={i}>
          <path d={d} stroke="#9A7628" strokeWidth="1.8" opacity="0.32" />
          <path d={d} pathLength={1} stroke="#E8B93C" strokeWidth="3.5" strokeLinecap="round" className="bd-trace-pulse" style={cv({ '--dur': `${3 + (i % 4) * 0.8}s`, '--delay': `${-i * 0.6}s` })} />
        </g>
      ))}
      {[[300, 90], [200, 230], [340, 400], [260, 560], [900, 80], [1010, 240], [880, 410], [960, 590]].map(([x, y], i) => (
        <rect key={i} x={x - 8} y={y - 8} width="16" height="16" fill="#FFFFFF" stroke="#9A7628" strokeWidth="2" opacity="0.5" style={{ animation: `bd-pulse ${2.4 + (i % 3) * 0.5}s ease-in-out ${-i * 0.4}s infinite`, ...cv({ '--lo': 0.2, '--hi': 0.8 }) }} />
      ))}
    </svg>
  </>
);

/* ------------------------------------------------------------------ */
const Star: React.FC<{ className?: string; style?: React.CSSProperties }> = ({ className, style }) => (
  <svg viewBox="-16 -16 32 32" className={className} style={style}>
    <path d="M0 -16 L3.5 -3.5 L16 0 L3.5 3.5 L0 16 L-3.5 3.5 L-16 0 L-3.5 -3.5 Z" fill="#C9A24A" />
  </svg>
);
const Sparkle: React.FC = () => (
  <>
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_40%,rgba(184,146,58,0.12),transparent_60%)]" />
    {Array.from({ length: 12 }, (_, i) => (
      <span key={i} className="bd-blob" style={{ left: pct(rnd(i) * 95), top: pct(rnd(i, 2) * 90), width: `${10 + rnd(i, 3) * 16}vmin`, height: `${10 + rnd(i, 3) * 16}vmin`, background: `rgba(228,207,159,${0.07 + rnd(i, 4) * 0.1})`, filter: 'blur(36px)', ...cv({ '--dx': `${(rnd(i, 5) - 0.5) * 12}vw`, '--dy': `${(rnd(i, 6) - 0.5) * 12}vh`, '--dur': `${12 + rnd(i, 7) * 12}s` }) }} />
    ))}
    {Array.from({ length: 20 }, (_, i) => (
      <Star key={i} className="bd-star" style={{ left: pct(rnd(i, 8) * 97), top: pct(rnd(i, 9) * 92), ...cv({ '--s': `${10 + rnd(i, 10) * 22}px`, '--dur': `${2.6 + rnd(i, 11) * 2.6}s`, '--delay': `${-rnd(i, 12) * 5}s` }) }} />
    ))}
    <div className="bd-gleam" />
  </>
);

/* ------------------------------------------------------------------ */
const Sweep: React.FC = () => (
  <>
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_100%,rgba(154,118,40,0.14),transparent_60%)]" />
    {[
      { l: '28%', d: '5.5s', delay: '0s' },
      { l: '72%', d: '5.5s', delay: '-0.6s' },
    ].map((w) => (
      <React.Fragment key={w.l}>
        <div className="bd-fan" style={{ left: w.l, borderRadius: '50% 50% 0 0' }} />
        <div className="bd-wiper" style={{ left: w.l, animationDelay: w.delay, ...cv({ '--dur': w.d }) }} />
      </React.Fragment>
    ))}
    <div className="bd-gleam" style={{ animationDuration: '7s' }} />
  </>
);

/* ------------------------------------------------------------------ */
const Spotlight: React.FC = () => (
  <>
    {[
      { l: '20%', a: '14deg', d: '8s' },
      { l: '50%', a: '10deg', d: '11s' },
      { l: '80%', a: '14deg', d: '9s' },
    ].map((b, i) => (
      <span key={i} className="bd-beam" style={{ left: b.l, animationDelay: `${-i * 2.2}s`, ...cv({ '--a': b.a, '--dur': b.d }) }} />
    ))}
    <div className="bd-floor-glow" />
    {Array.from({ length: 20 }, (_, i) => (
      <span key={i} className="bd-dust" style={{ left: pct(rnd(i) * 100), ...cv({ '--dur': `${12 + rnd(i, 2) * 12}s`, '--delay': `${-rnd(i, 3) * 20}s`, '--sway': `${(rnd(i, 4) - 0.5) * 80}px` }) }} />
    ))}
  </>
);

/* ------------------------------------------------------------------ */
const Skyline: React.FC<{ seed: number; fill: string; win: number; h: number }> = ({ seed, fill, win, h }) => {
  const buildings: React.ReactNode[] = [];
  let x = 0;
  let i = 0;
  while (x < 1200) {
    const w = 50 + rnd(i + seed, 1) * 90;
    const bh = h * (0.35 + rnd(i + seed, 2) * 0.65);
    buildings.push(<rect key={`b${i}`} x={x} y={220 - bh} width={w} height={bh} fill={fill} />);
    for (let wy = 220 - bh + 10; wy < 210; wy += 16) {
      for (let wx = x + 8; wx < x + w - 10; wx += 14) {
        if (rnd(wx + wy + seed, 3) > 0.72) buildings.push(<rect key={`w${i}-${wx}-${wy}`} x={wx} y={wy} width="5" height="7" fill="#FFF6D6" opacity={win} />);
      }
    }
    x += w + 2;
    i++;
  }
  return (
    <svg viewBox="0 0 1200 220" preserveAspectRatio="none" style={{ height: '28vh' }}>
      {buildings}
    </svg>
  );
};
const Drive: React.FC = () => (
  <>
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_18%,rgba(184,146,58,0.18),transparent_42%)]" />
    <span className="absolute rounded-full" style={{ right: '12%', top: '10%', width: 90, height: 90, background: 'radial-gradient(circle at 35% 35%, #F5F4F0, #9A7628 60%, rgba(154,118,40,0))', opacity: 0.35 }} />
    <div className="bd-city" style={{ ...cv({ '--dur': '110s' }), opacity: 0.5, bottom: '13vh' }}>
      <Skyline seed={3} fill="#D6CFBF" win={0.35} h={170} />
      <Skyline seed={3} fill="#D6CFBF" win={0.35} h={170} />
    </div>
    <div className="bd-city" style={{ ...cv({ '--dur': '55s' }), opacity: 0.8 }}>
      <Skyline seed={11} fill="#B9B19D" win={0.7} h={130} />
      <Skyline seed={11} fill="#B9B19D" win={0.7} h={130} />
    </div>
    <div className="bd-ground">
      <div className="bd-ground-dash" />
    </div>
    <div className="bd-cruiser" style={{ aspectRatio: '800 / 300' }}>
      <CarSide className="w-full h-full overflow-visible" stroke="#B8923A" bodyFill="rgba(255,255,255,0.95)" headlight="#E8B93C" taillight="#ef4444" wheelSpin={0.35}>
        {() => (
          <>
            <defs>
              <linearGradient id="bd-beam" x1="0" x2="1">
                <stop offset="0" stopColor="#E8B93C" stopOpacity="0.7" />
                <stop offset="1" stopColor="#E8B93C" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d="M776 193 L1150 110 L1150 320 L778 202 Z" fill="url(#bd-beam)" />
          </>
        )}
      </CarSide>
    </div>
  </>
);

/* ------------------------------------------------------------------ */
const Blueprint: React.FC = () => (
  <>
    <div className="absolute inset-0 blueprint-grid opacity-90" />
    <svg viewBox="-400 -400 800 800" className="absolute" style={{ right: '-14vmin', top: '4vh', width: '92vmin', opacity: 0.24 }} fill="none">
      <g className="bd-spin" style={cv({ '--spin': '80s' })}>
        <circle r="380" stroke="#9A7628" strokeWidth="1.5" strokeDasharray="2 10" />
        <circle r="330" stroke="#6B6F78" strokeWidth="1" />
        {Array.from({ length: 72 }, (_, i) => (
          <line key={i} y1="-330" y2={i % 6 === 0 ? -300 : -316} stroke="#6B6F78" strokeWidth={i % 6 === 0 ? 2 : 1} transform={`rotate(${i * 5})`} />
        ))}
      </g>
      <g className="bd-spin bd-spin-rev" style={cv({ '--spin': '60s' })}>
        <circle r="250" stroke="#9A7628" strokeWidth="1" strokeDasharray="14 10" />
      </g>
      <line x1="-400" y1="0" x2="400" y2="0" stroke="#9A7628" strokeWidth="1" strokeDasharray="12 6" />
      <line x1="0" y1="-400" x2="0" y2="400" stroke="#9A7628" strokeWidth="1" strokeDasharray="12 6" />
    </svg>
    <svg viewBox="0 0 800 300" className="absolute" style={{ left: '-4vw', bottom: '4vh', width: 'min(74vw, 960px)', opacity: 0.3 }} fill="none">
      <path d={CAR_BODY} stroke="#2F3238" strokeWidth="2" pathLength={1} className="bd-draw-loop" />
      <path d={CAR_WINDOW_REAR} stroke="#2F3238" strokeWidth="1.5" pathLength={1} className="bd-draw-loop" style={{ animationDelay: '0.3s' }} />
      <path d={CAR_WINDOW_FRONT} stroke="#2F3238" strokeWidth="1.5" pathLength={1} className="bd-draw-loop" style={{ animationDelay: '0.3s' }} />
      <path d={CAR_WING} stroke="#2F3238" strokeWidth="1.8" pathLength={1} className="bd-draw-loop" style={{ animationDelay: '0.45s' }} />
      <path d={CAR_WING_STRUTS} stroke="#2F3238" strokeWidth="1.8" pathLength={1} className="bd-draw-loop" style={{ animationDelay: '0.45s' }} />
      {CAR_WHEELS.map(([cx, cy]) => (
        <circle key={cx} cx={cx} cy={cy} r={CAR_WHEEL_R} stroke="#2F3238" strokeWidth="2" pathLength={1} className="bd-draw-loop" style={{ animationDelay: '0.6s' }} />
      ))}
      <path d="M-20 246 H820" stroke="#9A7628" strokeWidth="1" strokeDasharray="14 6" />
      <path d="M192 270 H614 M192 262 V280 M614 262 V280" stroke="#9A7628" strokeWidth="1.2" />
    </svg>
  </>
);

/* ------------------------------------------------------------------ */
const Dial: React.FC<{ style: React.CSSProperties; dur: string; redline?: boolean }> = ({ style, dur, redline }) => (
  <svg viewBox="-300 -300 600 600" className="bd-dial" style={style} fill="none">
    <circle r="280" stroke="#9A7628" strokeWidth="4" />
    <circle r="262" stroke="#7B7F88" strokeWidth="1.5" />
    {Array.from({ length: 27 }, (_, i) => {
      const a = -120 + i * 10;
      const major = i % 2 === 0;
      return <line key={i} y1="-250" y2={major ? -215 : -232} stroke={redline && i > 20 ? '#ef4444' : '#4B4F57'} strokeWidth={major ? 4 : 2} transform={`rotate(${a})`} />;
    })}
    <g className="bd-needle" style={{ transformOrigin: '0px 0px', ...cv({ '--dur': dur }) }}>
      <polygon points="-8,0 0,-225 8,0" fill="#B8923A" />
    </g>
    <circle r="22" fill="#FFFFFF" stroke="#9A7628" strokeWidth="4" />
  </svg>
);
const Gauges: React.FC = () => (
  <>
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_100%,rgba(154,118,40,0.12),transparent_60%)]" />
    <Dial style={{ left: '-14vmin', bottom: '-16vmin', width: '78vmin' }} dur="7s" redline />
    <Dial style={{ right: '-12vmin', top: '4vh', width: '60vmin', opacity: 0.18 }} dur="9s" />
  </>
);

/* ------------------------------------------------------------------ */
const ROUTE = 'M-20 560 H260 Q300 560 300 520 V420 Q300 380 340 380 H640 Q680 380 680 340 V230 Q680 190 720 190 H940';
const MapBackdrop: React.FC = () => (
  <>
    <div className="bd-radar-sweep" />
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1200 675" preserveAspectRatio="xMidYMid slice" fill="none">
      {Array.from({ length: 6 }, (_, r) =>
        Array.from({ length: 10 }, (_, c) => (
          <rect key={`${r}-${c}`} x={40 + c * 118} y={50 + r * 106} width="96" height="84" stroke="#9A7628" strokeWidth="1" opacity="0.1" />
        )),
      )}
      {['M0 480 H1200', 'M0 300 H1200', 'M260 0 V675', 'M640 0 V675', 'M960 0 V675'].map((d, i) => (
        <path key={i} d={d} stroke="#9A7628" strokeWidth="1.5" opacity="0.14" />
      ))}
      <path d={ROUTE} stroke="#9A7628" strokeWidth="3" opacity="0.25" />
      <path d={ROUTE} pathLength={1} stroke="#E8B93C" strokeWidth="5" strokeLinecap="round" className="bd-trace-pulse" style={cv({ '--dur': '4.5s' })} />
      <g transform="translate(940 190)">
        {[0, 1, 2].map((n) => (
          <circle key={n} r="14" stroke="#B8923A" strokeWidth="2.5" className="bd-ping" style={cv({ '--delay': `${n}s` })} />
        ))}
        <circle r="8" fill="#B8923A" />
      </g>
    </svg>
  </>
);

/* ------------------------------------------------------------------ */
const Radar: React.FC = () => (
  <>
    <div className="bd-radar-sweep" />
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1200 675" preserveAspectRatio="xMidYMid slice" fill="none">
      <g transform="translate(600 310)">
        {[110, 210, 310, 410].map((r) => (
          <circle key={r} r={r} stroke="#9A7628" strokeWidth="1.2" opacity="0.18" />
        ))}
        {[0, 1, 2].map((n) => (
          <circle key={n} r="60" stroke="#B8923A" strokeWidth="2" className="bd-ping" style={cv({ '--delay': `${n * 1}s` })} />
        ))}
        <path d="M0 -70 L56 -44 V22 C56 56 28 78 0 90 C-28 78 -56 56 -56 22 V-44 Z" stroke="#9A7628" strokeWidth="3" opacity="0.55" />
        <path d="M-20 4 L-4 20 L24 -14" stroke="#B8923A" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" opacity="0.7" />
      </g>
    </svg>
  </>
);

/* ------------------------------------------------------------------ */
const Hazard: React.FC = () => (
  <>
    <Road />
    <span className="bd-hazard" style={{ left: '4%' }} />
    <span className="bd-hazard" style={{ right: '4%' }} />
  </>
);

/* ------------------------------------------------------------------ */
const renderVariant = (v: Variant): React.ReactNode => {
  switch (v) {
    case 'road':
      return <Road />;
    case 'launch':
      return <Road fast />;
    case 'wheel':
      return <Wheels />;
    case 'spray':
      return <Spray />;
    case 'sparks':
      return <Sparks />;
    case 'clock':
      return <Clock />;
    case 'gears':
      return <Gears />;
    case 'airflow':
      return <Airflow />;
    case 'droplets':
      return <Droplets />;
    case 'circuit':
      return <Circuit />;
    case 'sparkle':
      return <Sparkle />;
    case 'sweep':
      return <Sweep />;
    case 'spotlight':
      return <Spotlight />;
    case 'drive':
      return <Drive />;
    case 'blueprint':
      return <Blueprint />;
    case 'gauge':
      return <Gauges />;
    case 'map':
      return <MapBackdrop />;
    case 'radar':
      return <Radar />;
    default:
      return <Hazard />;
  }
};

/** Themed, animated, car-related background that changes with every page. */
export const PageBackdrop: React.FC<{ pathname: string }> = ({ pathname }) => {
  const variant = variantForPath(pathname);
  return (
    <div key={variant} aria-hidden="true" className="bd-root">
      {renderVariant(variant)}
      <div className="bd-vignette" />
    </div>
  );
};
