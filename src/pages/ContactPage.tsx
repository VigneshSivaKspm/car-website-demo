import React from 'react';
import { MapPin, Phone, Mail, Clock, Compass, Sparkles, ExternalLink } from 'lucide-react';
import { Button } from '../components/common/Button';
import { BUSINESS_CONFIG, getMapsSearchUrl } from '../config/business';

export const ContactPage: React.FC = () => {
  return (
    <div className="w-full bg-carbon-900 text-pearl min-h-screen pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-graphite-900 border border-gold/30 text-gold text-xs font-display uppercase tracking-super-wide mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            Workshop Location & Connect
          </div>
          <h1 className="font-display font-black text-4xl sm:text-6xl uppercase tracking-tight text-pearl leading-[0.95]">
            Visit the <span className="gold-text-gradient">Workshop</span>.
          </h1>
          <p className="mt-5 text-silver text-sm sm:text-base leading-relaxed">
            MM Next Level Car Care is based in Coimbatore, Tamil Nadu. Find directions, inquire on WhatsApp, or book a scheduled intake slot.
          </p>
        </div>

        {/* Main Grid: Details + Map */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16">
          
          {/* Left Details Card */}
          <div className="lg:col-span-5 bg-graphite-900 border border-charcoal p-6 sm:p-8 space-y-6">
            <div>
              <span className="text-[11px] font-display text-gold tracking-super-wide uppercase">
                Facility Directory
              </span>
              <h2 className="font-display font-black text-2xl uppercase tracking-wider text-pearl mt-1">
                MM Next Level Car Care
              </h2>
              <p className="text-xs text-silver mt-1">
                {BUSINESS_CONFIG.city}, {BUSINESS_CONFIG.state}, {BUSINESS_CONFIG.country}
              </p>
            </div>

            <div className="space-y-4 pt-4 border-t border-charcoal text-xs sm:text-sm">
              {/* Address */}
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-gold flex-none mt-1" />
                <div>
                  <span className="text-pearl font-semibold block">Address</span>
                  <span className="text-silver">
                    {BUSINESS_CONFIG.address || "Workshop address: to be published upon verification"}
                  </span>
                </div>
              </div>

              {/* Phone Line */}
              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-gold flex-none mt-1" />
                <div>
                  <span className="text-pearl font-semibold block">Telephone</span>
                  <span className="text-silver">
                    {BUSINESS_CONFIG.phone || "Direct workshop phone: to be published"}
                  </span>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-gold flex-none mt-1" />
                <div>
                  <span className="text-pearl font-semibold block">Email</span>
                  <span className="text-silver">
                    {BUSINESS_CONFIG.email || "Official email: to be published"}
                  </span>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-gold flex-none mt-1" />
                <div>
                  <span className="text-pearl font-semibold block">Workshop Hours</span>
                  <span className="text-silver">
                    {BUSINESS_CONFIG.openingHours || "Operating hours: to be published"}
                  </span>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="pt-6 border-t border-charcoal space-y-3">
              <a
                href={getMapsSearchUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 px-5 py-3 bg-gold text-ink font-display font-bold text-xs uppercase tracking-automotive hover:bg-gold-highlight transition-colors"
              >
                <span>Get Directions on Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <Button to="/book-service" variant="outline" className="w-full text-center text-xs">
                Book a Service Enquiry
              </Button>
            </div>
          </div>

          {/* Right Map Placeholder / Blueprint Map */}
          <div className="lg:col-span-7 bg-carbon-950 border border-charcoal p-6 sm:p-10 flex flex-col items-center justify-center text-center min-h-[420px] relative overflow-hidden">
            <div className="absolute inset-0 blueprint-grid opacity-20 pointer-events-none" />
            
            <div className="relative z-10 max-w-md">
              <div className="w-14 h-14 rounded-full bg-graphite-900 border border-gold/40 flex items-center justify-center text-gold mx-auto mb-4">
                <Compass className="w-7 h-7" />
              </div>

              <h3 className="font-display font-bold text-xl uppercase tracking-wider text-pearl">
                Coimbatore Workshop Location
              </h3>
              
              <p className="mt-2 text-xs sm:text-sm text-silver leading-relaxed">
                Our facility is strategically positioned in Coimbatore, equipped with a sealed paint booth, hydraulic hoist lifts, AC vacuum stations, and climate-controlled detailing bays.
              </p>

              <div className="mt-6 p-3 bg-graphite-900 border border-charcoal text-[11px] font-mono text-gold/80">
                COORDINATES: 11.0168° N, 76.9558° E &middot; COIMBATORE
              </div>

              <div className="mt-6">
                <a
                  href={getMapsSearchUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-display uppercase tracking-widest text-gold hover:underline"
                >
                  <span>Open live Google Maps navigation</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
