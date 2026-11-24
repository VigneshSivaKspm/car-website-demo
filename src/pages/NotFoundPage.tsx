import React from 'react';
import { Compass } from 'lucide-react';
import { Button } from '../components/common/Button';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="w-full bg-carbon-900 text-pearl min-h-screen flex items-center justify-center px-4 py-28 relative overflow-hidden">
      <div className="absolute inset-0 blueprint-grid opacity-25 pointer-events-none" />
      
      <div className="relative z-10 max-w-lg w-full text-center bg-graphite-900 border border-charcoal p-8 sm:p-12 shadow-2xl">
        
        {/* Navigation Indicator Icon */}
        <div className="w-16 h-16 rounded-full bg-carbon-950 border border-gold/40 flex items-center justify-center text-gold mx-auto mb-6">
          <Compass className="w-8 h-8 animate-spin" style={{ animationDuration: '8s' }} />
        </div>

        <div className="text-xs font-mono text-gold tracking-widest uppercase mb-1">
          NAVIGATION ERROR &middot; CODE 404
        </div>

        <h1 className="font-display font-black text-4xl sm:text-5xl uppercase tracking-tight text-pearl">
          Wrong Turn.
        </h1>

        <p className="mt-4 text-xs sm:text-sm text-silver leading-relaxed">
          The automotive route you requested does not exist on our map. Let's recalculate and return you to the workshop showroom.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button to="/" variant="fill" className="w-full sm:w-auto">
            Return to Home
          </Button>
          <Button to="/services" variant="outline" className="w-full sm:w-auto">
            Explore Services
          </Button>
        </div>
      </div>
    </div>
  );
};
