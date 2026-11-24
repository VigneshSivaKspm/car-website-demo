import React, { useState, useRef, useCallback, useEffect } from 'react';

interface InteractiveBeforeAfterProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
  aspectRatio?: string;
  isDemo?: boolean;
  beforeFilter?: string; // Optional custom filter for visual matching
  afterFilter?: string;
}

export const InteractiveBeforeAfter: React.FC<InteractiveBeforeAfterProps> = ({
  beforeImage,
  afterImage,
  beforeLabel = "BEFORE · FADED & WEATHERED",
  afterLabel = "AFTER · GOLD PEARL RESPREAY",
  aspectRatio = "aspect-[16/9] sm:aspect-[21/9]",
  isDemo = true,
}) => {
  const [sliderPosition, setSliderPosition] = useState<number>(50);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percent = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percent);
  }, []);

  const handlePointerDown = (e: React.PointerEvent) => {
    e.preventDefault();
    setIsDragging(true);
    updatePosition(e.clientX);
    // Capture pointer to container so rapid dragging never loses tracking
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    updatePosition(e.clientX);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    setIsDragging(false);
    try {
      (e.target as HTMLElement).releasePointerCapture?.(e.pointerId);
    } catch {
      // Ignore if not captured
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      setSliderPosition((prev) => Math.max(0, prev - 4));
    } else if (e.key === 'ArrowRight') {
      setSliderPosition((prev) => Math.min(100, prev + 4));
    }
  };

  // Window-level mouseup fallback
  useEffect(() => {
    const handleGlobalMouseUp = () => setIsDragging(false);
    window.addEventListener('pointerup', handleGlobalMouseUp);
    return () => window.removeEventListener('pointerup', handleGlobalMouseUp);
  }, []);

  return (
    <div className="w-full select-none">
      <div
        ref={containerRef}
        tabIndex={0}
        role="slider"
        aria-label="Before and after transformation comparison slider"
        aria-valuenow={Math.round(sliderPosition)}
        aria-valuemin={0}
        aria-valuemax={100}
        onKeyDown={handleKeyDown}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        className={`relative w-full ${aspectRatio} overflow-hidden rounded-none border border-charcoal/80 select-none cursor-ew-resize focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold bg-carbon-950 group shadow-2xl`}
        style={{ touchAction: 'none' }}
      >
        {/* AFTER Image (Full background container) */}
        <div className="absolute inset-0 pointer-events-none select-none">
          <img
            src={afterImage}
            alt="Vehicle after transformation"
            draggable={false}
            onDragStart={(e) => e.preventDefault()}
            className="w-full h-full object-cover object-center pointer-events-none select-none"
            loading="lazy"
          />
          {/* Subtle gloss sheen overlay on After */}
          <div className="absolute inset-0 bg-gradient-to-tr from-gold/5 via-transparent to-transparent pointer-events-none" />
          
          <div className="absolute bottom-4 right-4 z-10 px-3.5 py-1.5 bg-carbon-950/85 backdrop-blur-md border border-gold/60 text-gold font-display font-bold text-xs tracking-automotive uppercase pointer-events-none shadow-lg">
            {afterLabel}
          </div>
        </div>

        {/* BEFORE Image (Clipped overlay) */}
        <div
          className="absolute inset-0 overflow-hidden pointer-events-none select-none"
          style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
        >
          <img
            src={beforeImage}
            alt="Vehicle before transformation"
            draggable={false}
            onDragStart={(e) => e.preventDefault()}
            className="w-full h-full object-cover object-center pointer-events-none select-none filter contrast-[95%] brightness-90 saturate-75"
            loading="lazy"
          />
          {/* Weathering texture and matte dust overlay for Before */}
          <div className="absolute inset-0 bg-carbon-950/25 pointer-events-none" />
          
          <div className="absolute bottom-4 left-4 z-10 px-3.5 py-1.5 bg-carbon-950/85 backdrop-blur-md border border-silver/50 text-silver font-display font-bold text-xs tracking-automotive uppercase pointer-events-none shadow-lg">
            {beforeLabel}
          </div>
        </div>

        {/* Vertical Divider Line with Dial Knob */}
        <div
          className="absolute top-0 bottom-0 z-20 pointer-events-none"
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="w-[2px] h-full bg-gradient-to-b from-gold-highlight via-gold to-gold-dark shadow-[0_0_15px_#C9A24A]" />
          
          {/* Dial / Knob */}
          <div className={`absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-gradient-to-tr from-gold-dark via-gold to-gold-highlight text-ink font-display font-black text-xs tracking-tighter flex items-center justify-center shadow-[0_0_25px_rgba(168,132,44,0.9)] border-2 border-pearl transition-transform ${isDragging ? 'scale-110 ring-4 ring-gold/40' : 'group-hover:scale-105'}`}>
            <span className="flex items-center gap-0.5 text-[11px] font-black pointer-events-none">
              &lang;&rang;
            </span>
          </div>
        </div>

        {/* Native Range Input for accessibility & keyboard manipulation */}
        <input
          type="range"
          min="0"
          max="100"
          value={sliderPosition}
          onChange={(e) => setSliderPosition(Number(e.target.value))}
          className="sr-only"
          aria-label="Drag slider to compare before and after transformation"
        />
      </div>

      {/* Demonstration Notice */}
      {isDemo && (
        <p className="text-[11px] font-sans text-silver/60 mt-3 flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-gold/50" />
          Illustrative comparison study. Authentic workshop before/after documentation published upon project sign-off.
        </p>
      )}
    </div>
  );
};
