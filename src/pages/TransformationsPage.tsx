import React, { useState } from 'react';
import { Sparkles, CheckCircle2 } from 'lucide-react';
import { Button } from '../components/common/Button';
import { InteractiveBeforeAfter } from '../components/automotive/InteractiveBeforeAfter';
import { TRANSFORMATIONS } from '../data/transformations';

export const TransformationsPage: React.FC = () => {
  const [selectedCase, setSelectedCase] = useState<number>(0);
  const current = TRANSFORMATIONS[selectedCase];

  return (
    <div className="w-full bg-carbon-900 text-pearl min-h-screen pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-graphite-900 border border-gold/30 text-gold text-xs font-display uppercase tracking-super-wide mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            Restoration & Detailing Studies
          </div>
          <h1 className="font-display font-black text-4xl sm:text-6xl uppercase tracking-tight text-pearl leading-[0.95]">
            Vehicle <span className="gold-text-gradient">Transformations</span>.
          </h1>
          <p className="mt-5 text-silver text-sm sm:text-base leading-relaxed">
            Every vehicle transformation at MM Next Level Car Care is an uncompromising journey of paint correction, dent realignment, and surface rejuvenation. Drag the comparison dial on each project below.
          </p>
        </div>

        {/* Project Selector Tabs */}
        <div className="flex items-center gap-3 overflow-x-auto pb-4 mb-8 border-b border-charcoal no-scrollbar">
          {TRANSFORMATIONS.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => setSelectedCase(idx)}
              className={`px-5 py-2.5 text-xs font-display uppercase tracking-automotive whitespace-nowrap transition-all border ${
                selectedCase === idx
                  ? 'bg-gold text-ink border-gold font-bold shadow-[0_0_15px_rgba(168,132,44,0.3)]'
                  : 'bg-graphite-900 text-silver border-charcoal hover:border-gold/40 hover:text-pearl'
              }`}
            >
              Case #{idx + 1}: {item.vehicle}
            </button>
          ))}
        </div>

        {/* Active Transformation Feature Container */}
        <div className="bg-graphite-900 border border-charcoal p-4 sm:p-8 lg:p-10 mb-16 shadow-2xl">
          <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-charcoal pb-4">
            <div>
              <span className="text-[11px] font-display text-gold tracking-super-wide uppercase">
                {current.vehicle} Study
              </span>
              <h2 className="font-display font-black text-2xl sm:text-3xl uppercase tracking-wide text-pearl mt-0.5">
                {current.title}
              </h2>
            </div>
            <div className="text-xs text-silver/80">
              Drag dial left/right or use keyboard arrow keys
            </div>
          </div>

          {/* Interactive Before-After Slider */}
          <InteractiveBeforeAfter
            beforeImage={current.beforeImage}
            afterImage={current.afterImage}
            beforeLabel={current.beforeLabel}
            afterLabel={current.afterLabel}
            aspectRatio="aspect-[16/9] sm:aspect-[21/9]"
            isDemo={current.isDemo}
          />

          {/* Detailed Breakdown Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10 pt-8 border-t border-charcoal">
            
            {/* Column 1: Summary */}
            <div>
              <h3 className="font-display font-bold text-sm uppercase tracking-wider text-gold mb-2">
                Transformation Summary
              </h3>
              <p className="text-xs sm:text-sm text-silver leading-relaxed">
                {current.summary}
              </p>
              <div className="mt-4 pt-4 border-t border-charcoal/60 text-xs">
                <span className="text-gold font-semibold uppercase block mb-1">
                  Scope of Work:
                </span>
                <span className="text-pearl">{current.workCompleted}</span>
              </div>
            </div>

            {/* Column 2: Craft Steps */}
            <div>
              <h3 className="font-display font-bold text-sm uppercase tracking-wider text-gold mb-2">
                Workshop Execution
              </h3>
              <ul className="space-y-2 text-xs text-silver">
                {current.craftNotes.map((note, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-gold flex-none mt-0.5" />
                    <span>{note}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Services & Action */}
            <div className="flex flex-col justify-between bg-carbon-950 p-5 border border-charcoal">
              <div>
                <h3 className="font-display font-bold text-xs uppercase tracking-wider text-gold mb-2">
                  Services Applied
                </h3>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {current.services.map((s, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 bg-graphite-900 border border-charcoal text-[10px] font-mono text-pearl"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-charcoal/60">
                <Button
                  to={`/book-service?service=${encodeURIComponent(current.services[0])}`}
                  variant="ignition"
                  className="w-full text-center text-xs"
                >
                  Enquire Similar Transformation
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Informational Guidance Banner */}
        <div className="p-8 bg-carbon-950 border border-charcoal flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-2xl">
            <h3 className="font-display font-bold text-xl uppercase tracking-wider text-pearl">
              Have an Aged, Swirled or Damaged Automobile?
            </h3>
            <p className="text-xs sm:text-sm text-silver mt-1 leading-relaxed">
              Bring your vehicle for an in-person panel inspection at our Coimbatore workshop. We measure paint depth and inspect sheet metal contours before suggesting the most appropriate restoration pathway.
            </p>
          </div>
          <Button to="/book-service" variant="outline" className="flex-none">
            Schedule Workshop Visit
          </Button>
        </div>
      </div>
    </div>
  );
};
