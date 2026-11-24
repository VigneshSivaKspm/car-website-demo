import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Button } from '../components/common/Button';
import { SERVICES } from '../data/services';

export const ServicesIndexPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Services (8)' },
    { id: 'paint', label: 'Paint & Body' },
    { id: 'workshop', label: 'Mechanical & Climate' },
    { id: 'detailing', label: 'Detailing & Protection' },
    { id: 'restoration', label: 'Restoration' },
  ];

  const filteredServices = SERVICES.filter((s) => {
    if (selectedCategory === 'all') return true;
    if (selectedCategory === 'paint') return s.category === 'paint' || s.category === 'body';
    if (selectedCategory === 'workshop') return s.category === 'workshop';
    if (selectedCategory === 'detailing') return s.category === 'detailing';
    if (selectedCategory === 'restoration') return s.category === 'restoration';
    return true;
  });

  return (
    <div className="w-full bg-carbon-900 text-pearl min-h-screen pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-graphite-900 border border-gold/30 text-gold text-xs font-display uppercase tracking-super-wide mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            Complete Automotive Workshop
          </div>
          <h1 className="font-display font-black text-4xl sm:text-6xl uppercase tracking-tight text-pearl leading-[0.95]">
            Eight Craft Disciplines.<br/>
            <span className="gold-text-gradient">One Dedicated Roof.</span>
          </h1>
          <p className="mt-5 text-silver text-sm sm:text-base leading-relaxed">
            MM Next Level Car Care houses complete mechanical, body, paint, electrical, and detailing expertise within our Coimbatore facility. Explore each dedicated service below to understand our techniques and process.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-12 border-b border-charcoal no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-5 py-2.5 text-xs font-display uppercase tracking-automotive whitespace-nowrap transition-all border ${
                selectedCategory === cat.id
                  ? 'bg-gold text-ink border-gold font-bold shadow-[0_0_15px_rgba(168,132,44,0.3)]'
                  : 'bg-graphite-900 text-silver border-charcoal hover:border-gold/40 hover:text-pearl'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Services List / Cards */}
        <div className="space-y-12">
          {filteredServices.map((service) => (
            <div
              key={service.slug}
              className="bg-graphite-900 border border-charcoal hover:border-gold/40 transition-all duration-300 grid grid-cols-1 lg:grid-cols-12 overflow-hidden shadow-xl"
            >
              {/* Visual Column */}
              <div className="lg:col-span-5 relative min-h-[280px] lg:min-h-full bg-carbon-950 overflow-hidden">
                <img
                  src={service.heroImage}
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-carbon-950 via-transparent to-transparent opacity-70" />
                
                {/* ID Tag */}
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span className="px-2.5 py-1 bg-carbon-950/90 border border-gold/40 font-mono text-gold font-bold text-xs">
                    SERVICE #{service.id}
                  </span>
                  {service.badge && (
                    <span className="px-2 py-1 bg-carbon-950/80 border border-charcoal text-[10px] font-display uppercase tracking-wider text-silver">
                      {service.badge}
                    </span>
                  )}
                </div>
              </div>

              {/* Content Column */}
              <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between">
                <div>
                  <div className="text-[11px] font-display text-gold tracking-super-wide uppercase mb-2">
                    {service.category} &middot; Precision Standard
                  </div>
                  <h2 className="font-display font-black text-2xl sm:text-3xl uppercase tracking-wide text-pearl">
                    {service.title}
                  </h2>
                  <p className="mt-2 text-gold-highlight text-xs sm:text-sm font-medium">
                    {service.tagline}
                  </p>
                  <p className="mt-4 text-xs sm:text-sm text-silver leading-relaxed">
                    {service.description}
                  </p>

                  {/* Highlights Bullet List */}
                  <div className="mt-6 pt-6 border-t border-charcoal/60 grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-pearl/90">
                    {service.features.slice(0, 4).map((f, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-gold flex-none mt-0.5" />
                        <span className="text-[11px] leading-tight">{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTAs */}
                <div className="mt-8 pt-6 border-t border-charcoal/60 flex flex-wrap items-center justify-between gap-4">
                  <Link
                    to={`/services/${service.slug}`}
                    className="inline-flex items-center gap-2 font-display text-xs font-bold uppercase tracking-automotive text-gold hover:text-gold-highlight transition-colors"
                  >
                    <span>Full Service Methodology & Process</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <Button
                    to={`/book-service?service=${encodeURIComponent(service.title)}`}
                    variant="outline"
                    className="px-5 py-2.5 text-xs"
                  >
                    Enquire for {service.shortTitle}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Booking Banner */}
        <div className="mt-20 p-8 sm:p-12 bg-carbon-950 border border-gold/30 text-center relative overflow-hidden">
          <div className="relative z-10 max-w-2xl mx-auto">
            <h3 className="font-display font-black text-2xl sm:text-4xl uppercase tracking-tight text-pearl">
              Unsure Which Service Your Vehicle Needs?
            </h3>
            <p className="mt-3 text-silver text-xs sm:text-sm leading-relaxed">
              Bring your car to our Coimbatore workshop for a comprehensive diagnostic assessment, or start a preliminary consultation via our WhatsApp booking enquiry.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button to="/book-service" variant="ignition">
                Initiate Service Enquiry
              </Button>
              <Button to="/contact" variant="outline">
                Visit Workshop
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
