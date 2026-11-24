import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight } from 'lucide-react';
import { Button } from '../components/common/Button';
import { BUSINESS_CONFIG } from '../config/business';
import { AUTOMOTIVE_ASSETS } from '../data/assets';
import { SERVICES } from '../data/services';

export const AboutPage: React.FC = () => {
  return (
    <div className="w-full bg-carbon-900 text-pearl min-h-screen pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-graphite-900 border border-gold/30 text-gold text-xs font-display uppercase tracking-super-wide mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            The Workshop Story
          </div>
          <h1 className="font-display font-black text-4xl sm:text-6xl uppercase tracking-tight text-pearl leading-[0.95]">
            Passion for Cars.<br/>
            <span className="gold-text-gradient">Commitment to Craft.</span>
          </h1>
          <p className="mt-5 text-silver text-sm sm:text-base leading-relaxed">
            Founded on the principle that automotive care should be transparent, meticulous, and uncompromised, MM Next Level Car Care serves discerning drivers across Coimbatore.
          </p>
        </div>

        {/* Philosophy Feature Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20 bg-graphite-900 border border-charcoal p-6 sm:p-12">
          <div className="lg:col-span-6 relative">
            <div className="aspect-[4/3] bg-carbon-950 border border-charcoal overflow-hidden shadow-2xl relative">
              <img
                src={AUTOMOTIVE_ASSETS.workshop.studioBay}
                alt="MM Next Level Car Care Workshop Facility"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-carbon-950/70 to-transparent" />
              <div className="absolute bottom-3 left-3 px-3 py-1 bg-carbon-950/80 border border-charcoal text-[10px] font-mono text-silver">
                Workshop Bay Study &middot; Coimbatore
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-5">
            <div className="text-xs font-display text-gold tracking-super-wide uppercase">
              Our Core Philosophy
            </div>
            <h2 className="font-display font-black text-2xl sm:text-4xl uppercase tracking-tight text-pearl leading-snug">
              A Car Should Leave <span className="gold-text-gradient">Better Than It Arrived</span>.
            </h2>
            <div className="space-y-4 text-xs sm:text-sm text-silver leading-relaxed">
              <p>
                {BUSINESS_CONFIG.philosophy}
              </p>
              <p>
                In a market filled with rushed car washes and rushed turnaround workshops, MM Next Level Car Care was created to be the opposite. We inspect panel gaps, torque every bolt, test AC cooling pressures with calibrated gauges, and use precision spectrophotometers to formulate matching paints.
              </p>
            </div>

            {/* Verified Statistics Bar (Preserving reference truths without inventing false numbers) */}
            <div className="pt-6 border-t border-charcoal grid grid-cols-2 gap-6">
              <div>
                <span className="block font-display font-black text-3xl sm:text-4xl text-gold">
                  08
                </span>
                <span className="text-xs font-display uppercase tracking-wider text-silver">
                  Specialized Service Areas
                </span>
              </div>
              <div>
                <span className="block font-display font-black text-3xl sm:text-4xl text-pearl">
                  01
                </span>
                <span className="text-xs font-display uppercase tracking-wider text-silver">
                  Unified Workshop Under One Roof
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 8 Disciplines Preview */}
        <div className="mb-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-display text-gold tracking-super-wide uppercase block mb-2">
              All Disciplines
            </span>
            <h2 className="font-display font-black text-3xl sm:text-4xl uppercase text-pearl">
              Complete Automotive Solutions Under One Roof
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {SERVICES.map((s) => (
              <Link
                key={s.slug}
                to={`/services/${s.slug}`}
                className="p-5 bg-graphite-900 border border-charcoal hover:border-gold/40 transition-colors group flex flex-col justify-between"
              >
                <div>
                  <span className="font-mono text-xs text-gold">#{s.id}</span>
                  <h3 className="font-display font-bold text-base uppercase text-pearl group-hover:text-gold transition-colors mt-1">
                    {s.title}
                  </h3>
                  <p className="text-xs text-silver mt-2 line-clamp-2">
                    {s.tagline}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-charcoal/60 text-[11px] text-gold uppercase tracking-wider flex items-center justify-between">
                  <span>Explore</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Action Callout */}
        <div className="p-8 sm:p-12 bg-carbon-950 border border-gold/30 text-center max-w-3xl mx-auto">
          <h3 className="font-display font-black text-2xl sm:text-3xl uppercase text-pearl">
            Experience the Craft Firsthand
          </h3>
          <p className="mt-3 text-xs sm:text-sm text-silver leading-relaxed max-w-xl mx-auto">
            Book an appointment for your car's next paint touchup, ceramic protection, AC overhaul, or mechanical check.
          </p>
          <div className="mt-6 flex justify-center gap-4">
            <Button to="/book-service" variant="ignition">
              Book a Service
            </Button>
            <Button to="/contact" variant="outline">
              Contact Workshop
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
