import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, MessageSquare, ArrowUpRight, Sparkles } from 'lucide-react';
import { SERVICES } from '../../data/services';
import { BUSINESS_CONFIG, hasValidWhatsApp, getMapsSearchUrl } from '../../config/business';

const CURRENT_YEAR = new Date().getFullYear();

export const Footer: React.FC = () => {
  const whatsAppConfigured = hasValidWhatsApp(BUSINESS_CONFIG.whatsappNumber);

  return (
    <footer className="relative bg-carbon-950 border-t border-charcoal pt-16 pb-12 overflow-hidden">
      {/* Background Subtle Silhouette Pattern */}
      <div className="absolute inset-0 automotive-grid opacity-30 pointer-events-none" />
      
      {/* Decorative Golden Accent Top Line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-charcoal">
          
          {/* Col 1 & 2: Brand & Philosophy */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-block group mb-4">
              <span className="font-display font-black text-2xl tracking-[0.2em] text-pearl group-hover:text-gold transition-colors">
                MM NEXT LEVEL
              </span>
              <span className="block font-display font-semibold text-xs tracking-[0.4em] text-gold uppercase mt-0.5">
                CAR CARE &middot; COIMBATORE
              </span>
            </Link>

            <p className="text-silver text-sm leading-relaxed max-w-md mb-6">
              {BUSINESS_CONFIG.philosophy}
            </p>

            <div className="flex items-center gap-2 text-xs text-gold/90 font-display tracking-widest uppercase">
              <Sparkles className="w-4 h-4 text-gold" />
              <span>YOUR CAR &middot; OUR CRAFT &middot; NEXT LEVEL</span>
            </div>
          </div>

          {/* Col 3: Specialized Services */}
          <div>
            <h4 className="font-display text-sm font-bold tracking-automotive uppercase text-gold mb-4">
              Services
            </h4>
            <ul className="space-y-2.5 text-xs text-silver">
              {SERVICES.map((s) => (
                <li key={s.slug}>
                  <Link
                    to={`/services/${s.slug}`}
                    className="hover:text-gold transition-colors flex items-center justify-between group"
                  >
                    <span>{s.shortTitle}</span>
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-gold" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Quick Navigation */}
          <div>
            <h4 className="font-display text-sm font-bold tracking-automotive uppercase text-gold mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5 text-xs text-silver">
              <li>
                <Link to="/transformations" className="hover:text-gold transition-colors">
                  Before & After Transformations
                </Link>
              </li>
              <li>
                <Link to="/our-work" className="hover:text-gold transition-colors">
                  Project Gallery (11 Showcase Concepts)
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-gold transition-colors">
                  About the Workshop
                </Link>
              </li>
              <li>
                <Link to="/why-choose-us" className="hover:text-gold transition-colors">
                  Why Choose Us (6 Pillars)
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-gold transition-colors">
                  Frequently Asked Questions
                </Link>
              </li>
              <li>
                <Link to="/book-service" className="hover:text-gold transition-colors">
                  Book a Service
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-gold transition-colors">
                  Workshop Location
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="hover:text-gold transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 5: Location & Workshop Channels */}
          <div>
            <h4 className="font-display text-sm font-bold tracking-automotive uppercase text-gold mb-4">
              Workshop
            </h4>
            <div className="space-y-3 text-xs text-silver">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-gold flex-none mt-0.5" />
                <div>
                  <span className="font-semibold text-pearl">Coimbatore, Tamil Nadu, India</span>
                  <p className="text-[11px] text-silver/70 mt-0.5">
                    {BUSINESS_CONFIG.address || "Exact workshop address configurable"}
                  </p>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href={getMapsSearchUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-graphite-800 hover:bg-graphite-700 border border-charcoal text-pearl text-[11px] font-display uppercase tracking-wider transition-colors"
                >
                  <MapPin className="w-3 h-3 text-gold" />
                  View on Google Maps
                </a>
              </div>

              <div className="pt-2">
                <div className="text-[11px] text-silver/80">
                  <span className="text-gold uppercase tracking-wider block font-semibold mb-1">
                    Direct Channels:
                  </span>
                  {whatsAppConfigured ? (
                    <a
                      href={`https://wa.me/${BUSINESS_CONFIG.whatsappNumber}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-pearl hover:text-gold flex items-center gap-1.5"
                    >
                      <MessageSquare className="w-3 h-3 text-emerald-700" />
                      Chat on WhatsApp
                    </a>
                  ) : (
                    <span className="text-silver/60 italic">
                      Enquiries open via interactive booking wizard
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-silver/70">
          <div>
            &copy; {CURRENT_YEAR} {BUSINESS_CONFIG.name}. Coimbatore, Tamil Nadu. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <Link to="/privacy-policy" className="hover:text-pearl transition-colors">
              Privacy Policy
            </Link>
            <Link to="/contact" className="hover:text-pearl transition-colors">
              Workshop Contact
            </Link>
            <Link to="/book-service" className="text-gold hover:underline">
              Book Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
