import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { 
  CheckCircle2, 
  ArrowRight, 
  HelpCircle, 
  ShieldCheck, 
  ArrowLeft,
  Wrench
} from 'lucide-react';
import { SectionHeading } from '../components/common/SectionHeading';
import { Button } from '../components/common/Button';
import { getServiceBySlug } from '../data/services';

export const ServiceDetailPage: React.FC = () => {
  const { serviceSlug } = useParams<{ serviceSlug: string }>();
  const service = serviceSlug ? getServiceBySlug(serviceSlug) : undefined;

  if (!service) {
    return <Navigate to="/services" replace />;
  }

  // Get related services objects
  const relatedServices = service.recommendedWith
    .map((slug) => getServiceBySlug(slug))
    .filter((s): s is typeof service => s !== undefined);

  return (
    <div className="w-full bg-carbon-900 text-pearl min-h-screen pt-28 pb-24">
      
      {/* ======================================================== */}
      {/* 1. DEDICATED SERVICE HERO */}
      {/* ======================================================== */}
      <section className="relative min-h-[60vh] sm:min-h-[70vh] flex items-end pb-16 pt-20 overflow-hidden bg-carbon-950 border-b border-charcoal">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src={service.heroImage}
            alt={service.title}
            className="w-full h-full object-cover object-center brightness-75"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-carbon-950 via-carbon-950/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-carbon-950 via-transparent to-carbon-950/60" />
          <div className="absolute inset-0 automotive-grid opacity-30" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          {/* Back link */}
          <Link
            to="/services"
            className="inline-flex items-center gap-2 text-xs font-display uppercase tracking-widest text-silver hover:text-gold mb-6 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Services</span>
          </Link>

          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-2.5 py-1 bg-gold text-ink font-mono font-bold text-xs uppercase">
                SERVICE #{service.id}
              </span>
              <span className="px-2.5 py-1 bg-carbon-950/80 border border-charcoal text-silver font-display text-[11px] uppercase tracking-wider">
                {service.category}
              </span>
              {service.badge && (
                <span className="px-2.5 py-1 bg-carbon-950/80 border border-gold/40 text-gold font-display text-[11px] uppercase tracking-wider">
                  {service.badge}
                </span>
              )}
            </div>

            <h1 className="font-display font-black text-4xl sm:text-6xl uppercase tracking-tight text-pearl leading-[0.95]">
              {service.title}
            </h1>

            <p className="mt-4 text-base sm:text-lg text-gold-highlight font-medium leading-relaxed">
              {service.tagline}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button
                to={`/book-service?service=${encodeURIComponent(service.title)}`}
                variant="ignition"
              >
                Book This Service
              </Button>
              <Button to="/transformations" variant="outline">
                View Transformations
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 2. IN-DEPTH OVERVIEW & PHILOSOPHY */}
      {/* ======================================================== */}
      <section className="py-20 bg-carbon-900 border-b border-charcoal">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Narrative */}
            <div className="lg:col-span-7">
              <SectionHeading
                eyebrow="Craftsmanship Overview"
                title="The Standard of<br/>Execution."
              />
              <div className="space-y-4 text-sm sm:text-base text-silver leading-relaxed">
                <p>{service.extendedDescription}</p>
                <p>{service.description}</p>
              </div>

              {/* Key Features List */}
              <div className="mt-10 pt-8 border-t border-charcoal">
                <h3 className="font-display font-bold text-lg uppercase tracking-wider text-gold mb-5">
                  Technical Specifications & Inclusions
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
                  {service.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 p-3 bg-graphite-900 border border-charcoal">
                      <CheckCircle2 className="w-4 h-4 text-gold flex-none mt-0.5" />
                      <span className="text-pearl/90 leading-snug">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Benefits & Quick Facts Panel */}
            <div className="lg:col-span-5 bg-graphite-900 border border-charcoal p-6 sm:p-8 space-y-6">
              <div className="border-b border-charcoal pb-4">
                <div className="text-[11px] font-display text-gold tracking-super-wide uppercase">
                  Service Benefits
                </div>
                <h3 className="font-display font-bold text-xl uppercase tracking-wider text-pearl mt-1">
                  Why It Matters
                </h3>
              </div>

              <div className="space-y-3">
                {service.benefits.map((benefit, i) => (
                  <div key={i} className="flex items-start gap-3 text-xs sm:text-sm text-silver">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold flex-none mt-2" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>

              <div className="pt-6 border-t border-charcoal space-y-3 text-xs text-silver/80">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-gold" />
                  <span>Transparent evaluation prior to work commencement</span>
                </div>
                <div className="flex items-center gap-2">
                  <Wrench className="w-4 h-4 text-gold" />
                  <span>Coimbatore facility with dedicated equipment</span>
                </div>
              </div>

              <div className="pt-4">
                <Button
                  to={`/book-service?service=${encodeURIComponent(service.title)}`}
                  variant="fill"
                  className="w-full text-center"
                >
                  Request Consultation on WhatsApp
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 3. STEP-BY-STEP WORKSHOP PROCESS */}
      {/* ======================================================== */}
      <section className="py-20 bg-carbon-950 border-b border-charcoal">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Our Workflow"
            title="The Step-by-Step<br/>Process."
            lead="No guesswork. Here is the exact methodology our technicians apply to your vehicle."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {service.processSteps.map((step) => (
              <div
                key={step.number}
                className="p-6 bg-graphite-900 border border-charcoal flex flex-col justify-between group hover:border-gold/40 transition-colors"
              >
                <div>
                  <span className="font-display font-black text-3xl text-gold/40 group-hover:text-gold transition-colors block mb-3">
                    {step.number}
                  </span>
                  <h3 className="font-display font-bold text-base uppercase text-pearl mb-2">
                    {step.title}
                  </h3>
                  <p className="text-xs text-silver leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 4. PHOTOGRAPHY SHOWCASE FOR THIS SERVICE */}
      {/* ======================================================== */}
      {service.featuredImages && service.featuredImages.length > 0 && (
        <section className="py-20 bg-graphite-900 border-b border-charcoal">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow="Visual Studies"
              title="Surface & Craft<br/>Perspectives."
            />
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {service.featuredImages.map((img, i) => (
                <div key={i} className="aspect-[4/3] bg-carbon-950 border border-charcoal overflow-hidden relative group">
                  <img
                    src={img}
                    alt={`${service.title} study ${i + 1}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-carbon-950/80 via-transparent to-transparent opacity-60" />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ======================================================== */}
      {/* 5. SERVICE SPECIFIC FAQS */}
      {/* ======================================================== */}
      {service.faq && service.faq.length > 0 && (
        <section className="py-20 bg-carbon-950 border-b border-charcoal">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow="Common Questions"
              title={`Inquiries About<br/>${service.shortTitle}.`}
            />

            <div className="space-y-4">
              {service.faq.map((item, idx) => (
                <div
                  key={idx}
                  className="p-6 bg-graphite-900 border border-charcoal"
                >
                  <div className="flex items-start gap-3">
                    <HelpCircle className="w-5 h-5 text-gold flex-none mt-0.5" />
                    <div>
                      <h3 className="font-display font-bold text-base sm:text-lg uppercase text-pearl">
                        {item.question}
                      </h3>
                      <p className="mt-2 text-xs sm:text-sm text-silver leading-relaxed">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ======================================================== */}
      {/* 6. RELATED SERVICES CROSS-LINKING */}
      {/* ======================================================== */}
      {relatedServices.length > 0 && (
        <section className="py-20 bg-carbon-900 border-b border-charcoal">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
              <div>
                <span className="text-xs font-display text-gold tracking-widest uppercase">
                  Comprehensive Car Care
                </span>
                <h2 className="font-display font-black text-2xl sm:text-3xl uppercase tracking-tight text-pearl mt-1">
                  Frequently Combined With
                </h2>
              </div>
              <Link to="/services" className="text-xs font-display text-gold uppercase tracking-wider hover:underline">
                View all services &rarr;
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedServices.map((rel) => (
                <Link
                  key={rel.slug}
                  to={`/services/${rel.slug}`}
                  className="group p-5 bg-graphite-900 border border-charcoal hover:border-gold/40 transition-all flex flex-col justify-between"
                >
                  <div>
                    <span className="font-mono text-xs text-gold">#{rel.id}</span>
                    <h3 className="font-display font-bold text-lg uppercase text-pearl group-hover:text-gold transition-colors mt-1">
                      {rel.title}
                    </h3>
                    <p className="text-xs text-silver mt-2 line-clamp-2">
                      {rel.tagline}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-charcoal/60 text-xs text-gold flex items-center gap-1">
                    <span>View Methodology</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ======================================================== */}
      {/* 7. PRE-SELECTED SERVICE ENQUIRY CTA */}
      {/* ======================================================== */}
      <section className="py-20 bg-gradient-to-b from-graphite-900 to-carbon-950 text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display font-black text-3xl sm:text-5xl uppercase tracking-tight text-pearl">
            Ready to Begin with <span className="gold-text-gradient">{service.shortTitle}</span>?
          </h2>
          <p className="mt-4 text-xs sm:text-sm text-silver leading-relaxed max-w-xl mx-auto">
            Book an appointment directly. Your service selection ({service.title}) will be pre-filled automatically on the enquiry form.
          </p>
          <div className="mt-8 flex justify-center">
            <Button
              to={`/book-service?service=${encodeURIComponent(service.title)}`}
              variant="ignition"
              className="px-8 py-4"
            >
              Proceed to Service Enquiry
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};
