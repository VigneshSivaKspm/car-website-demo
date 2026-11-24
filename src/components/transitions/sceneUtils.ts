import type React from 'react';

/** Typed helper for passing CSS custom properties through `style`. */
export const cv = (vars: Record<string, string | number>): React.CSSProperties =>
  vars as unknown as React.CSSProperties;

/* ------------------------------------------------------------------ *
 * Modern muscle car (Mustang / Challenger style) side profile, facing right.
 * viewBox 0 0 800 300 · wheel centres (192,246) & (614,246) · roof y≈118
 * ------------------------------------------------------------------ */
export const CAR_BODY =
  'M30 236 L28 196 C28 176 32 166 46 162 L232 154 C272 150 312 142 342 130 C366 121 386 118 410 118 L476 118 C520 119 556 138 590 160 L612 164 L770 184 L772 188 C786 192 794 204 796 220 L798 240 L792 246 L30 246 Z';
/** rear quarter glass */
export const CAR_WINDOW_REAR = 'M346 138 C364 130 386 127 410 127 L420 127 L420 160 L318 160 Z';
/** door glass */
export const CAR_WINDOW_FRONT = 'M436 127 L478 126 C512 127 540 143 566 160 L436 160 Z';
/** ducktail rear spoiler + posts */
export const CAR_WING = 'M26 166 L34 148 L150 146 L152 156 L46 162 Z';
export const CAR_WING_STRUTS = 'M64 148 L64 160 M124 148 L124 160';
/** rear quarter scoop */
export const CAR_INTAKE = 'M262 202 L324 196 L324 226 L262 228 Z';
export const CAR_HOOD_SCOOP = 'M650 162 L716 171 L712 178 L646 169 Z';
export const CAR_HEADLIGHT = 'M742 188 L776 193 L778 202 L744 197 Z';
export const CAR_TAILLIGHT = 'M30 172 L66 168 L66 178 L30 184 Z';
export const CAR_WHEEL_R = 50;
export const CAR_WHEELS: ReadonlyArray<readonly [number, number]> = [
  [192, 246],
  [614, 246],
];

/** Procedural gear outline centred on (0,0). */
export const gearPath = (teeth: number, pitchR: number, depth: number): string => {
  const outer = pitchR + depth / 2;
  const inner = pitchR - depth / 2;
  const step = (Math.PI * 2) / teeth;
  const pts: string[] = [];
  for (let i = 0; i < teeth; i++) {
    const a = i * step;
    // trapezoid tooth centred on angle a
    const q = step / 4;
    const p = (r: number, ang: number) => `${(Math.cos(ang) * r).toFixed(2)} ${(Math.sin(ang) * r).toFixed(2)}`;
    pts.push(
      `${i === 0 ? 'M' : 'L'}${p(inner, a - q * 1.9)}`,
      `L${p(outer, a - q * 0.8)}`,
      `L${p(outer, a + q * 0.8)}`,
      `L${p(inner, a + q * 1.9)}`,
    );
  }
  return `${pts.join(' ')} Z`;
};
