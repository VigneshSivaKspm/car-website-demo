import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import type { Location } from 'react-router-dom';
import {
  AirflowScene,
  BlueprintScene,
  BodyRepairScene,
  DetailingScene,
  DoorScene,
  ElectricalScene,
  GearScene,
  GpsScene,
  ShutterScene,
  SpeedoScene,
  TransformScene,
} from './TransitionScenes';
import { PageBackdrop } from '../automotive/PageBackdrop';

interface PageTransitionManagerProps {
  /**
   * Render-prop that receives the location that should currently be ON SCREEN.
   * It lags behind the real router location during a transition so the old page
   * stays visible until the overlay has fully covered it (no visible "pop").
   */
  children: (location: Location) => React.ReactNode;
}

export type TransitionType =
  | 'ignition' // Home
  | 'alloy-wheel' // Services
  | 'paint-spray' // Car Painting
  | 'panel-reconstruct' // Body Repair
  | 'time-reversal' // Restoration
  | 'gear-assembly' // Mechanical
  | 'airflow' // AC
  | 'water-repellent' // Ceramic
  | 'diagnostic-pulse' // Electrical
  | 'microfiber-polish' // Detailing
  | 'windshield-wiper' // Transformations
  | 'garage-shutter' // Our Work
  | 'reflection-sweep' // Project Details
  | 'car-door' // About
  | 'blueprint' // Why Choose Us
  | 'dashboard-panel' // FAQ
  | 'speedometer' // Book Service
  | 'gps-nav' // Contact
  | 'instrument-focus' // Privacy
  | 'wrong-turn'; // 404

const getTransitionForPath = (path: string): TransitionType => {
  if (path === '/' || path === '') return 'ignition';
  if (path === '/services') return 'alloy-wheel';
  if (path === '/services/car-painting') return 'paint-spray';
  if (path === '/services/body-repair') return 'panel-reconstruct';
  if (path === '/services/car-restoration') return 'time-reversal';
  if (path === '/services/mechanical-services') return 'gear-assembly';
  if (path === '/services/car-ac') return 'airflow';
  if (path === '/services/ceramic-coating') return 'water-repellent';
  if (path === '/services/electrical-services') return 'diagnostic-pulse';
  if (path === '/services/premium-detailing') return 'microfiber-polish';
  if (path === '/transformations') return 'windshield-wiper';
  if (path === '/our-work') return 'garage-shutter';
  if (path.startsWith('/our-work/')) return 'reflection-sweep';
  if (path === '/about') return 'car-door';
  if (path === '/why-choose-us') return 'blueprint';
  if (path === '/faq') return 'dashboard-panel';
  if (path === '/book-service') return 'speedometer';
  if (path === '/contact') return 'gps-nav';
  if (path === '/privacy-policy') return 'instrument-focus';
  return 'wrong-turn';
};

/**
 * Transition choreography (all values in ms):
 *
 *   0 ───────── COVER ───────▶ swap page ─── HOLD ───▶ ─────── REVEAL ───────▶ idle
 *   overlay fades in smoothly    (hidden under       overlay content     overlay fades out
 *   over the old page            the overlay)        is readable         slowly, new page revealed
 */
const COVER_MS = 550;
const HOLD_MS = 900;
const REVEAL_MS = 950;
/** First visit: overlay is already showing, so we only need a short hold before revealing. */
const INTRO_HOLD_MS = 700;

const COVER_EASE = 'cubic-bezier(0.4, 0, 0.2, 1)';
const REVEAL_EASE = 'cubic-bezier(0.45, 0, 0.2, 1)';

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const scrollToTopInstant = () =>
  window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });

export const PageTransitionManager: React.FC<PageTransitionManagerProps> = ({ children }) => {
  const location = useLocation();

  // The location that is actually rendered. Lags behind `location` while the overlay covers the screen.
  const [displayLocation, setDisplayLocation] = useState<Location>(location);
  const [active, setActiveState] = useState<boolean>(() => !prefersReducedMotion());
  const [transitionType, setTransitionType] = useState<TransitionType>(() =>
    getTransitionForPath(location.pathname),
  );
  const [runId, setRunId] = useState<number>(0);
  const [progressMs, setProgressMs] = useState<number>(INTRO_HOLD_MS);

  const overlayRef = useRef<HTMLDivElement | null>(null);
  const fadeRef = useRef<Animation | null>(null);
  const timersRef = useRef<number[]>([]);
  const displayRef = useRef<Location>(location);
  const activeRef = useRef<boolean>(active);
  const introPendingRef = useRef<boolean>(true);

  // Opacity the overlay starts with on the very first paint (intro) – never changes, so React never touches it again.
  const [initialOpacity] = useState<number>(() => (prefersReducedMotion() ? 0 : 1));

  const setActive = useCallback((value: boolean) => {
    activeRef.current = value;
    setActiveState(value);
  }, []);

  const clearTimers = useCallback(() => {
    timersRef.current.forEach((id) => window.clearTimeout(id));
    timersRef.current = [];
  }, []);

  const later = useCallback((fn: () => void, delay: number) => {
    timersRef.current.push(window.setTimeout(fn, delay));
  }, []);

  /**
   * Smoothly animates the overlay opacity from wherever it currently is.
   * Starting from the *current* value means interrupted transitions never flash or jump.
   */
  const fadeOverlay = useCallback((to: number, duration: number, easing: string) => {
    const el = overlayRef.current;
    if (!el) return;

    const from = parseFloat(getComputedStyle(el).opacity);
    const start = Number.isNaN(from) ? 0 : from;

    fadeRef.current?.cancel();
    fadeRef.current = null;

    if (Math.abs(to - start) < 0.01) {
      el.style.opacity = String(to);
      return;
    }

    // Scale duration with the remaining distance so partial fades keep the same speed.
    const scaled = Math.max(180, duration * Math.abs(to - start));
    const anim = el.animate([{ opacity: start }, { opacity: to }], {
      duration: scaled,
      easing,
      fill: 'forwards',
    });
    fadeRef.current = anim;
    anim.onfinish = () => {
      el.style.opacity = String(to);
      anim.cancel();
      if (fadeRef.current === anim) fadeRef.current = null;
    };
  }, []);

  const applyLocation = useCallback((next: Location, resetScroll: boolean) => {
    displayRef.current = next;
    setDisplayLocation(next);
    if (resetScroll) scrollToTopInstant();
  }, []);

  /** Fade the overlay out after `delay`, then unmount its content. */
  const scheduleReveal = useCallback(
    (delay: number) => {
      later(() => fadeOverlay(0, REVEAL_MS, REVEAL_EASE), delay);
      later(() => {
        introPendingRef.current = false;
        setActive(false);
      }, delay + REVEAL_MS + 60);
    },
    [fadeOverlay, later, setActive],
  );

  // Take over scroll restoration so the browser never jumps the page before the overlay covers it.
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      const previous = window.history.scrollRestoration;
      window.history.scrollRestoration = 'manual';
      return () => {
        window.history.scrollRestoration = previous;
      };
    }
  }, []);

  // Release everything on unmount.
  useEffect(
    () => () => {
      clearTimers();
      fadeRef.current?.cancel();
    },
    [clearTimers],
  );

  useEffect(() => {
    clearTimers();

    const pathChanged = location.pathname !== displayRef.current.pathname;

    // ---- Reduced motion: no overlay, instant swap -------------------------------------------
    if (prefersReducedMotion()) {
      // oxlint-disable-next-line react/set-state-in-effect -- intentional: mirrors router location into the displayed page
      applyLocation(location, pathChanged);
      introPendingRef.current = false;
      fadeRef.current?.cancel();
      fadeRef.current = null;
      if (overlayRef.current) overlayRef.current.style.opacity = '0';
      setActive(false);
      return;
    }

    // ---- Same page (query / hash / state change): no transition needed ------------------------
    if (!pathChanged) {
      applyLocation(location, false);

      if (introPendingRef.current) {
        // First visit: overlay is already on screen – hold briefly, then reveal the page.
        setProgressMs(INTRO_HOLD_MS);
        scheduleReveal(INTRO_HOLD_MS);
      } else if (activeRef.current) {
        // User bounced back to the page that is still displayed – just dismiss the overlay.
        scheduleReveal(120);
      }
      return;
    }

    // ---- Real navigation ---------------------------------------------------------------------
    introPendingRef.current = false;
    setTransitionType(getTransitionForPath(location.pathname));
    setRunId((n) => n + 1);
    setProgressMs(COVER_MS + HOLD_MS);
    setActive(true);

    // 1) Smoothly cover the old page.
    fadeOverlay(1, COVER_MS, COVER_EASE);

    // 2) Once fully covered, swap the page underneath and jump to the top (user can't see it).
    later(() => applyLocation(location, true), COVER_MS);

    // 3) Let the cinematic title card breathe, then dissolve to the new page.
    scheduleReveal(COVER_MS + HOLD_MS);
  }, [location, applyLocation, clearTimers, fadeOverlay, later, scheduleReveal, setActive]);

  return (
    <div className="relative min-h-screen">
      {/* Themed, animated car-related backdrop – follows the page that is actually on screen */}
      <PageBackdrop pathname={displayLocation.pathname} />

      {/* High-Impact Visual Transition Overlay (always mounted so opacity can animate smoothly) */}
      <div
        ref={overlayRef}
        aria-hidden="true"
        data-page-transition=""
        style={{ opacity: initialOpacity, visibility: active ? 'visible' : 'hidden' }}
        className="fixed inset-0 z-[100] pointer-events-none flex items-center justify-center overflow-hidden bg-carbon-950 will-change-[opacity]"
      >
        {active && (
          <>
            <div key={runId} className="absolute inset-0 pt-content">
              {renderTransitionOverlay(transitionType)}
            </div>
            {/* Thin gold progress line – gives the transition a sense of continuity */}
            <div className="absolute inset-x-0 bottom-0 h-[2px] bg-gold/10">
              <div
                key={`progress-${runId}`}
                className="h-full w-full bg-gradient-to-r from-gold-dark via-gold to-gold-highlight shadow-[0_0_12px_#C9A24A] pt-progress"
                style={{ animationDuration: `${progressMs}ms` }}
              />
            </div>
          </>
        )}
      </div>

      {/* Main Routed Page Content */}
      <main className="w-full relative z-10">
        {children(displayLocation)}
      </main>
    </div>
  );
};


const renderTransitionOverlay = (type: TransitionType) => {
  switch (type) {
    // Large, car-themed cinematic scenes (see TransitionScenes.tsx)
    case 'panel-reconstruct':
      return <BodyRepairScene />;
    case 'gear-assembly':
      return <GearScene />;
    case 'airflow':
      return <AirflowScene />;
    case 'diagnostic-pulse':
      return <ElectricalScene />;
    case 'microfiber-polish':
      return <DetailingScene />;
    case 'windshield-wiper':
      return <TransformScene />;
    case 'garage-shutter':
      return <ShutterScene />;
    case 'car-door':
      return <DoorScene />;
    case 'blueprint':
      return <BlueprintScene />;
    case 'speedometer':
      return <SpeedoScene />;
    case 'gps-nav':
      return <GpsScene />;

    // ==========================================
    // 1. HOME: IGNITION & BI-XENON LASER SWEEP
    // ==========================================
    case 'ignition':
      return (
        <div className="absolute inset-0 bg-carbon-950 flex flex-col items-center justify-center">
          {/* Dual Bi-Xenon Headlight Laser Flares */}
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-10 pointer-events-none">
            <div className="w-96 h-96 rounded-full bg-gradient-to-r from-gold via-white/50 to-transparent blur-3xl opacity-80 animate-ping" />
            <div className="w-96 h-96 rounded-full bg-gradient-to-l from-gold via-white/50 to-transparent blur-3xl opacity-80 animate-ping" />
          </div>

          {/* Golden Specular Horizon Line */}
          <div className="w-full h-1 bg-gradient-to-r from-transparent via-gold-highlight to-transparent shadow-[0_0_35px_#C9A24A] animate-pulse" />

          {/* Engine Start Button Graphics */}
          <div className="mt-8 flex flex-col items-center gap-3">
            <div className="relative w-20 h-20 rounded-full bg-graphite-900 border-2 border-gold flex items-center justify-center shadow-[0_0_30px_rgba(168,132,44,0.6)]">
              <span className="w-12 h-12 rounded-full bg-gradient-to-tr from-gold-dark via-gold to-gold-highlight animate-pulse flex items-center justify-center text-ink font-display font-black text-[11px] tracking-tighter">
                START
              </span>
            </div>
            <div className="font-display font-bold text-xs tracking-super-wide text-gold uppercase flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>IGNITION &middot; V8 TWIN TURBO ACTIVE</span>
            </div>
          </div>
        </div>
      );

    // ==========================================
    // 2. SERVICES: ALLOY WHEEL ROTATING IRIS WIPE
    // ==========================================
    case 'alloy-wheel':
      return (
        <div className="absolute inset-0 bg-carbon-950 flex items-center justify-center overflow-hidden">
          {/* Rotating Forged Alloy Wheel */}
          <div className="relative w-96 h-96 border-4 border-charcoal/80 rounded-full flex items-center justify-center shadow-[0_0_60px_rgba(70,55,20,0.16)] pt-wheel-spin">
            {/* Drilled Carbon Ceramic Brake Disc */}
            <div className="absolute inset-4 rounded-full border border-silver/30 bg-graphite-900/60 blueprint-grid" />
            
            {/* Brembo Style Golden Caliper */}
            <div className="absolute -top-3 left-1/3 px-4 py-1.5 bg-gradient-to-r from-gold-dark to-gold text-ink font-display font-black text-[10px] tracking-wider rounded-sm shadow-xl">
              BREMBO &middot; NEXT LEVEL
            </div>

            {/* Turbine Rim Spokes */}
            <svg className="w-full h-full text-gold/80" viewBox="0 0 100 100" fill="none" stroke="currentColor">
              <circle cx="50" cy="50" r="46" strokeWidth="2" strokeDasharray="8 4"/>
              <circle cx="50" cy="50" r="14" strokeWidth="4" fill="#FFFFFF"/>
              <path d="M50 4 L50 36 M50 64 L50 96 M4 50 L36 50 M64 50 L96 50 M17 17 L40 40 M60 60 L83 83 M17 83 L40 60 M60 40 L83 17" strokeWidth="3" strokeLinecap="round"/>
            </svg>
          </div>

          <div className="absolute bottom-16 text-center">
            <span className="px-4 py-1.5 bg-carbon-950 border border-gold/40 text-gold font-display font-bold text-xs uppercase tracking-super-wide">
              Eight Disciplines Synchronized
            </span>
          </div>
        </div>
      );

    // ==========================================
    // 3. CAR PAINTING: METALLIC PAINT SPRAY SWEEP
    // ==========================================
    case 'paint-spray':
      return (
        <div className="absolute inset-0 bg-carbon-950 flex items-center justify-center overflow-hidden">
          {/* Atomized High-Pressure Spray Cloud */}
          <div className="absolute inset-y-0 left-0 w-full bg-gradient-to-r from-gold/40 via-gold-highlight/20 to-transparent pt-spray" />
          
          <div className="relative z-10 flex flex-col items-center gap-4">
            <div className="w-32 h-1 bg-gradient-to-r from-gold to-white shadow-[0_0_25px_#C9A24A] animate-pulse" />
            <div className="p-3 bg-carbon-950/90 border border-gold/50 shadow-2xl text-center">
              <span className="text-[10px] font-mono text-gold tracking-widest uppercase block">
                HVLP DOWNDRAFT SPRAY BOOTH &middot; 2.2 BAR
              </span>
              <span className="font-display font-black text-sm uppercase text-pearl tracking-widest mt-1 block">
                GOLD PEARL MICA METALLIC COATING
              </span>
            </div>
          </div>
        </div>
      );

    // ==========================================
    // 5. RESTORATION: TIME REVERSAL CHRONOLOGY
    // ==========================================
    case 'time-reversal':
      return (
        <div className="absolute inset-0 bg-carbon-950 flex flex-col items-center justify-center p-6">
          <div className="w-72 h-72 rounded-full border-2 border-gold/40 flex items-center justify-center relative animate-[spin_2s_linear_infinite_reverse]">
            <div className="w-1 h-32 bg-gold absolute top-4 origin-bottom transform rotate-45" />
            <div className="w-2 h-2 rounded-full bg-gold" />
          </div>
          <div className="mt-6 text-center">
            <span className="text-xs font-display font-black uppercase tracking-super-wide text-gold block">
              HERITAGE RESTORATION &middot; TIME REVERSAL
            </span>
            <span className="text-[11px] font-mono text-silver/80 mt-1 block">
              CORROSION ARRESTED &middot; FACTORY CHASSIS RESTORED
            </span>
          </div>
        </div>
      );

    // ==========================================
    // 8. CERAMIC COATING: HYDROPHOBIC WATER REPELLENT
    // ==========================================
    case 'water-repellent':
      return (
        <div className="absolute inset-0 bg-carbon-950 flex items-center justify-center">
          <div className="relative w-80 h-80 rounded-full border border-gold/30 flex items-center justify-center">
            <div className="w-60 h-60 rounded-full border border-gold-highlight/40 animate-ping" />
            <div className="absolute text-center">
              <span className="font-display font-black text-sm text-gold tracking-super-wide uppercase block">
                9H SiO2 CERAMIC MATRIX
              </span>
              <span className="text-[10px] font-mono text-silver mt-1 block">
                110° HYDROPHOBIC CONTACT ANGLE VERIFIED
              </span>
            </div>
          </div>
        </div>
      );

    // ==========================================
    // 13. PROJECT DETAILS: SPECULAR REFLECTION SWEEP
    // ==========================================
    case 'reflection-sweep':
      return (
        <div className="absolute inset-0 bg-carbon-950 flex items-center justify-center overflow-hidden">
          <div className="absolute w-[300%] h-32 bg-gradient-to-r from-transparent via-white/15 to-transparent pt-sheen" />
          <div className="relative text-center">
            <span className="font-display font-black text-xs text-gold tracking-super-wide uppercase block">
              PROJECT TELEMETRY DOSSIER
            </span>
            <span className="text-[10px] font-mono text-silver/80 mt-1 block">
              SURFACE SPECIFICATION VERIFIED
            </span>
          </div>
        </div>
      );

    // ==========================================
    // 16. FAQ: INSTRUMENT CLUSTER GAUGES
    // ==========================================
    case 'dashboard-panel':
      return (
        <div className="absolute inset-0 bg-carbon-950 flex items-center justify-center p-6">
          <div className="p-5 bg-graphite-900 border border-gold/30 text-center max-w-sm w-full">
            <div className="flex items-center justify-center gap-2 text-gold font-display font-bold text-xs uppercase tracking-super-wide">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              COCKPIT INFORMATION DESK
            </div>
            <div className="text-[10px] font-mono text-silver/80 mt-1">
              SYSTEM KNOWLEDGE &amp; POLICIES
            </div>
          </div>
        </div>
      );

    // ==========================================
    // 19. PRIVACY & 20. 404
    // ==========================================
    case 'instrument-focus':
    case 'wrong-turn':
    default:
      return (
        <div className="absolute inset-0 bg-carbon-950 flex items-center justify-center">
          <div className="w-16 h-1 bg-gold shadow-[0_0_20px_#C9A24A] animate-pulse" />
        </div>
      );
  }
};
