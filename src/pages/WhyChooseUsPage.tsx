import React from 'react';
import { 
  CheckCircle2, 
  Sparkles
} from 'lucide-react';
import { SectionHeading } from '../components/common/SectionHeading';
import { Button } from '../components/common/Button';
import { WHY_CHOOSE_US_POINTS, SERVICE_JOURNEY_STEPS } from '../data/whyUs';

export const WhyChooseUsPage: React.FC = () => {
  return (
    <div className="w-full bg-carbon-900 text-pearl min-h-screen pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-graphite-900 border border-gold/30 text-gold text-xs font-display uppercase tracking-super-wide mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            The Next Level Difference
          </div>
          <h1 className="font-display font-black text-4xl sm:text-6xl uppercase tracking-tight text-pearl leading-[0.95]">
            Care That Goes<br/>
            <span className="gold-text-gradient">Beyond the Surface</span>.
          </h1>
          <p className="mt-5 text-silver text-sm sm:text-base leading-relaxed">
            From the moment your vehicle enters our Coimbatore workshop to the moment you turn the key at handover, every single process is governed by six foundational pillars of craftsmanship.
          </p>
        </div>

        {/* 6 Core Pillars - Detailed Cinematic Sections */}
        <div className="space-y-8 mb-24">
          {WHY_CHOOSE_US_POINTS.map((item, idx) => (
            <div
              key={item.id}
              className="p-8 sm:p-10 bg-graphite-900 border border-charcoal hover:border-gold/40 transition-all duration-300 grid grid-cols-1 md:grid-cols-12 gap-8 items-center shadow-xl"
            >
              <div className="md:col-span-1 flex items-center justify-center">
                <span className="font-display font-black text-4xl sm:text-5xl text-gold/30">
                  0{idx + 1}
                </span>
              </div>

              <div className="md:col-span-7">
                <div className="text-[11px] font-display text-gold tracking-super-wide uppercase mb-1">
                  Pillar #{idx + 1}
                </div>
                <h2 className="font-display font-black text-2xl sm:text-3xl uppercase tracking-wide text-pearl">
                  {item.title}
                </h2>
                <div className="text-xs sm:text-sm text-gold-highlight font-medium mt-1 mb-3">
                  {item.tagline}
                </div>
                <p className="text-xs sm:text-sm text-silver leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="md:col-span-4 p-5 bg-carbon-950 border border-charcoal">
                <div className="flex items-center gap-2 text-xs font-display uppercase tracking-wider text-pearl font-semibold mb-2">
                  <CheckCircle2 className="w-4 h-4 text-gold flex-none" />
                  <span>Workshop Guarantee</span>
                </div>
                <p className="text-xs text-silver/80 italic leading-relaxed">
                  "{item.craftDetail}"
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* 5-Step Service Journey */}
        <div className="p-8 sm:p-12 bg-carbon-950 border border-charcoal mb-20">
          <SectionHeading
            eyebrow="Illustrative Journey"
            title="The 5-Stage Protocol."
            lead="Here is how a typical project progresses through our facility with zero surprises."
          />

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mt-10">
            {SERVICE_JOURNEY_STEPS.map((step) => (
              <div
                key={step.step}
                className="p-5 bg-graphite-900 border border-charcoal flex flex-col justify-between"
              >
                <div>
                  <span className="font-display font-black text-2xl text-gold block mb-2">
                    {step.step}
                  </span>
                  <h3 className="font-display font-bold text-sm uppercase text-pearl mb-2">
                    {step.title}
                  </h3>
                  <p className="text-xs text-silver leading-relaxed mb-4">
                    {step.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-charcoal/60">
                  <span className="text-[10px] font-display uppercase tracking-wider text-gold block mb-1">
                    Key Highlights:
                  </span>
                  <ul className="text-[11px] text-silver/70 space-y-1">
                    {step.highlights.map((h, i) => (
                      <li key={i} className="flex items-center gap-1">
                        <span className="w-1 h-1 rounded-full bg-gold/50" />
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center max-w-2xl mx-auto">
          <h3 className="font-display font-black text-2xl sm:text-3xl uppercase text-pearl">
            Give Your Vehicle the Attention It Deserves
          </h3>
          <p className="mt-3 text-xs sm:text-sm text-silver leading-relaxed">
            Reach out via WhatsApp or visit our Coimbatore facility.
          </p>
          <div className="mt-6 flex justify-center gap-4">
            <Button to="/book-service" variant="ignition">
              Book Your Service
            </Button>
            <Button to="/services" variant="outline">
              Explore Services
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
