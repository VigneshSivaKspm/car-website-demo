import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  HelpCircle, 
  ArrowUpRight,
  Compass,
  Sparkles
} from 'lucide-react';
import { SectionHeading } from '../components/common/SectionHeading';
import { Button } from '../components/common/Button';
import { InteractiveBeforeAfter } from '../components/automotive/InteractiveBeforeAfter';
import { GalleryLightbox } from '../components/gallery/GalleryLightbox';
import { SERVICES } from '../data/services';
import { GALLERY_PROJECTS, GALLERY_CATEGORIES } from '../data/gallery';
import { TRANSFORMATIONS } from '../data/transformations';
import { WHY_CHOOSE_US_POINTS, SERVICE_JOURNEY_STEPS } from '../data/whyUs';
import { FAQS } from '../data/faqs';
import { AUTOMOTIVE_ASSETS } from '../data/assets';
import { BUSINESS_CONFIG } from '../config/business';
import type { GalleryProject, GalleryCategory } from '../types';

export const HomePage: React.FC = () => {
  // Hero ignition sequence states
  const [ignitionActive, setIgnitionActive] = useState(false);
  const [headlightsOn, setHeadlightsOn] = useState(false);
  const [selectedGalleryCategory, setSelectedGalleryCategory] = useState<GalleryCategory>('all');
  const [activeLightboxProject, setActiveLightboxProject] = useState<GalleryProject | null>(null);

  useEffect(() => {
    // Elegant entrance ignition sequence
    const t1 = setTimeout(() => setIgnitionActive(true), 200);
    const t2 = setTimeout(() => setHeadlightsOn(true), 600);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  // Filtered gallery items (show top 6 on homepage)
  const filteredGallery = GALLERY_PROJECTS.filter(
    (p) => selectedGalleryCategory === 'all' || p.category === selectedGalleryCategory
  ).slice(0, 6);

  const featuredTransformation = TRANSFORMATIONS[0];

  return (
    <div className="w-full bg-carbon-900 text-pearl overflow-hidden">
      
      {/* ======================================================== */}
      {/* 1. CINEMATIC AUTOMOTIVE HERO SECTION */}
      {/* ======================================================== */}
      <section className="relative min-h-[100svh] flex items-end pb-20 pt-32 overflow-hidden bg-carbon-950">
        
        {/* Layer 1: Automotive Background Studio Imagery */}
        <div className="absolute inset-0 z-0">
          <img
            src={AUTOMOTIVE_ASSETS.hero.darkStudioCar}
            alt="Luxury automotive studio presentation"
            className={`w-full h-full object-cover object-center transition-all duration-1000 ${
              headlightsOn ? 'scale-100 opacity-85 brightness-100' : 'scale-105 opacity-45 brightness-110'
            }`}
          />
          {/* Studio Vignettes & Atmospheric Lighting */}
          <div className="absolute inset-0 bg-gradient-to-r from-carbon-950 via-carbon-950/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-carbon-950 via-transparent to-carbon-950/40" />
          <div className="absolute inset-0 automotive-grid opacity-25" />
        </div>

        {/* Layer 2: Headlight Illumination & Metallic Reflection Sweeps */}
        <div 
          className={`absolute inset-0 pointer-events-none transition-opacity duration-700 ${
            headlightsOn ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {/* Headlight beam sweeps */}
          <div className="absolute top-1/3 right-1/4 w-[450px] h-[300px] bg-gold/15 rounded-full blur-3xl animate-headlight-sweep" />
          <div className="absolute bottom-1/4 right-10 w-[600px] h-[150px] bg-gradient-to-r from-gold/20 via-white/10 to-transparent rotate-12 blur-2xl" />
        </div>

        {/* Layer 3: Minimal Automotive Instrument HUD Details */}
        <div className="absolute top-24 right-6 sm:right-12 z-10 hidden sm:flex items-center gap-6 text-[10px] font-mono tracking-widest text-silver px-3 py-1.5 bg-white/75 backdrop-blur-sm border border-charcoal">
          <div className="flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${ignitionActive ? 'bg-emerald-400 shadow-[0_0_8px_#34d399]' : 'bg-charcoal'}`} />
            <span>SYSTEM: {ignitionActive ? 'CALIBRATED' : 'STANDBY'}</span>
          </div>
          <div>LOC: 11.0168° N, 76.9558° E</div>
          <div className="text-gold">FACILITY: COIMBATORE</div>
        </div>

        {/* Layer 4: Hero Content Container */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-3xl">
            
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-3 px-3 py-1 bg-graphite-900/90 border border-gold/30 rounded-none mb-6">
              <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
              <span className="font-display font-semibold text-xs tracking-super-wide text-gold uppercase">
                Premium Automotive Care &middot; Coimbatore
              </span>
            </div>

            {/* Oversized Cinematic Editorial Headline */}
            <h1 className="font-display font-black text-5xl sm:text-7xl lg:text-8xl tracking-tight leading-[0.9] uppercase text-pearl">
              <span className="block transform transition-transform duration-700">YOUR CAR.</span>
              <span className="block gold-text-gradient transform transition-transform duration-700 delay-100">
                OUR CRAFT.
              </span>
              <span className="block transform transition-transform duration-700 delay-200">
                NEXT LEVEL.
              </span>
            </h1>

            {/* Brand Positioning */}
            <p className="mt-6 text-base sm:text-lg text-pearl/90 leading-relaxed font-sans max-w-xl">
              {BUSINESS_CONFIG.brandPositioning}
            </p>

            {/* Hero CTAs */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button to="/services" variant="ignition">
                Explore Our Services
              </Button>
              <Button to="/book-service" variant="outline">
                Book Your Service
              </Button>
            </div>

            {/* Quick Metrics Bar (from reference) */}
            <div className="mt-12 pt-8 border-t border-charcoal/80 grid grid-cols-3 gap-6 max-w-md">
              <div>
                <span className="block font-display font-black text-3xl sm:text-4xl text-gold leading-none">
                  08
                </span>
                <span className="text-[11px] font-display uppercase tracking-wider text-silver">
                  Specialized Services
                </span>
              </div>
              <div>
                <span className="block font-display font-black text-3xl sm:text-4xl text-pearl leading-none">
                  01
                </span>
                <span className="text-[11px] font-display uppercase tracking-wider text-silver">
                  Workshop Under One Roof
                </span>
              </div>
              <div>
                <span className="block font-display font-black text-3xl sm:text-4xl text-gold-highlight leading-none">
                  100%
                </span>
                <span className="text-[11px] font-display uppercase tracking-wider text-silver">
                  Dedicated Attention
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute right-6 sm:right-12 bottom-10 z-10 hidden md:flex flex-col items-center gap-2">
          <span className="text-[10px] font-display tracking-super-wide text-silver/60 uppercase [writing-mode:vertical-rl]">
            SCROLL DOWN
          </span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-gold via-gold/40 to-transparent animate-pulse" />
        </div>
      </section>

      {/* ======================================================== */}
      {/* 2. SERVICES INTERACTIVE SHOWCASE (8 Core Services) */}
      {/* ======================================================== */}
      <section className="py-24 sm:py-32 bg-carbon-900 border-t border-charcoal relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <SectionHeading
              eyebrow="What We Do"
              title="Expert Care.<br/>Every Detail Matters."
              lead="Complete automotive care solutions engineered for longevity, protection, and immaculate aesthetics."
            />
            <Button to="/services" variant="outline" className="self-start md:self-end">
              View All 8 Services
            </Button>
          </div>

          {/* 8 Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICES.map((service) => (
              <div
                key={service.slug}
                className="group relative bg-graphite-900 border border-charcoal hover:border-gold/50 transition-all duration-300 flex flex-col justify-between overflow-hidden p-6 hover:shadow-[0_10px_30px_rgba(70,55,20,0.16)]"
              >
                {/* Accent Top Border */}
                <div 
                  className="absolute top-0 left-0 right-0 h-1 transition-all duration-300 opacity-60 group-hover:opacity-100 group-hover:h-1.5"
                  style={{ backgroundColor: service.accentColor }}
                />

                <div>
                  {/* Service Number & Category */}
                  <div className="flex items-center justify-between text-xs mb-4">
                    <span className="font-mono text-gold font-bold">
                      #{service.id}
                    </span>
                    <span className="px-2 py-0.5 bg-carbon-950 border border-charcoal text-[10px] font-display uppercase tracking-wider text-silver">
                      {service.category}
                    </span>
                  </div>

                  {/* Thumbnail */}
                  <div className="relative aspect-[16/10] overflow-hidden mb-5 bg-carbon-950">
                    <img
                      src={service.heroImage}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-carbon-950 via-transparent to-transparent opacity-80" />
                    {service.badge && (
                      <span className="absolute bottom-2 left-2 text-[10px] font-display uppercase tracking-wider bg-carbon-950/80 px-2 py-0.5 border border-gold/30 text-gold">
                        {service.badge}
                      </span>
                    )}
                  </div>

                  {/* Title & Description */}
                  <h3 className="font-display font-bold text-xl uppercase tracking-wide text-pearl group-hover:text-gold transition-colors">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-xs text-silver leading-relaxed line-clamp-3">
                    {service.tagline}
                  </p>
                </div>

                {/* Footer Link & Book shortcut */}
                <div className="mt-6 pt-4 border-t border-charcoal/60 flex items-center justify-between text-xs font-display uppercase tracking-wider">
                  <Link
                    to={`/services/${service.slug}`}
                    className="text-gold hover:text-gold-highlight flex items-center gap-1 group-hover:gap-2 transition-all font-semibold"
                  >
                    <span>Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                  <Link
                    to={`/book-service?service=${encodeURIComponent(service.title)}`}
                    className="text-silver/60 hover:text-pearl transition-colors"
                  >
                    Enquire
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 3. FEATURED TRANSFORMATION SECTION */}
      {/* ======================================================== */}
      <section className="py-24 sm:py-32 bg-graphite-900 border-t border-charcoal relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <SectionHeading
            eyebrow="Transformations"
            title="From Worn Out<br/>to Next Level."
            lead="Every vehicle transformation tells a story of patience, metalwork, and surface perfection. Drag the slider to reveal the difference."
          />

          {/* Interactive Slider Card */}
          <div className="bg-carbon-950 border border-charcoal p-4 sm:p-8">
            <InteractiveBeforeAfter
              beforeImage={featuredTransformation.beforeImage}
              afterImage={featuredTransformation.afterImage}
              beforeLabel={featuredTransformation.beforeLabel}
              afterLabel={featuredTransformation.afterLabel}
              aspectRatio="aspect-[16/9] sm:aspect-[21/9]"
              isDemo={featuredTransformation.isDemo}
            />

            {/* Transformation Project Summary Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8 pt-8 border-t border-charcoal">
              <div>
                <span className="block text-[11px] font-display uppercase tracking-widest text-gold font-semibold">
                  Project Case
                </span>
                <p className="text-sm font-semibold text-pearl mt-1">
                  {featuredTransformation.title}
                </p>
              </div>

              <div>
                <span className="block text-[11px] font-display uppercase tracking-widest text-gold font-semibold">
                  Work Completed
                </span>
                <p className="text-xs text-silver mt-1">
                  {featuredTransformation.workCompleted}
                </p>
              </div>

              <div>
                <span className="block text-[11px] font-display uppercase tracking-widest text-gold font-semibold">
                  Craft Areas
                </span>
                <p className="text-xs text-silver mt-1">
                  {featuredTransformation.services.join(' &middot; ')}
                </p>
              </div>

              <div className="flex items-center sm:justify-end">
                <Button to="/transformations" variant="fill" className="w-full sm:w-auto">
                  View Transformations
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 4. WORKSHOP PHILOSOPHY & ABOUT PREVIEW */}
      {/* ======================================================== */}
      <section className="py-24 sm:py-32 bg-carbon-950 border-t border-charcoal relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Imagery & Workshop Showcase */}
            <div className="lg:col-span-6 relative">
              <div className="relative aspect-[4/5] bg-graphite-900 border border-charcoal overflow-hidden shadow-2xl">
                <img
                  src={AUTOMOTIVE_ASSETS.workshop.studioBay}
                  alt="MM Next Level Car Care Workshop Facility in Coimbatore"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-carbon-950 via-transparent to-transparent opacity-60" />
                <div className="absolute top-6 left-6 right-6 p-4 bg-carbon-950/90 backdrop-blur-md border border-gold/30">
                  <div className="text-gold font-display text-xs tracking-super-wide uppercase">
                    Coimbatore Workshop Facility
                  </div>
                  <div className="text-pearl text-sm font-semibold mt-1">
                    Careful workmanship, honest communication & overlooked details.
                  </div>
                </div>
              </div>

              {/* Decorative Blueprint Accent Card */}
              <div className="hidden sm:block absolute -bottom-6 -right-6 bg-graphite-800 border border-gold/40 p-5 shadow-2xl max-w-xs">
                <div className="flex items-center gap-2 text-gold font-mono text-[11px] mb-1">
                  <Compass className="w-4 h-4" />
                  <span>CRAFT PHILOSOPHY</span>
                </div>
                <p className="text-xs text-silver">
                  Every vehicle is treated as if it were our own, because the people who drive them depend on it.
                </p>
              </div>
            </div>

            {/* Right Storytelling Content */}
            <div className="lg:col-span-6">
              <SectionHeading
                eyebrow="About the Workshop"
                title="Passion for Cars.<br/>Commitment to Craft."
              />

              <div className="space-y-4 text-sm sm:text-base text-silver leading-relaxed">
                <p>
                  MM Next Level Car Care is a Coimbatore workshop built around a simple idea: 
                  <strong className="text-pearl font-semibold"> a car should leave better than it arrived.</strong> From bodywork and paint to mechanical, AC and electrical care, the focus is careful workmanship, honest communication, and details that most people overlook.
                </p>
                <p>
                  Whether addressing a troubling air conditioning leak, restoring an aged body panel to laser-straight perfection, or applying an ultra-gloss 9H ceramic shield, we work with patient discipline rather than shortcuts.
                </p>
              </div>

              {/* 3 Key Operational Truths */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-8">
                <div className="p-4 bg-graphite-900 border border-charcoal">
                  <div className="text-gold font-display font-bold text-lg uppercase">
                    One Unified Facility
                  </div>
                  <p className="text-xs text-silver/80 mt-1">
                    No subcontracting. Body, paint, mechanical, AC, and detailing handled under one roof.
                  </p>
                </div>
                <div className="p-4 bg-graphite-900 border border-charcoal">
                  <div className="text-gold font-display font-bold text-lg uppercase">
                    Direct Transparency
                  </div>
                  <p className="text-xs text-silver/80 mt-1">
                    Detailed photo documentation and clear advice before any tool touches your car.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <Button to="/about" variant="outline">
                  Read Our Full Story
                </Button>
                <Button to="/why-choose-us" variant="ghost">
                  Why Choose Us
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 5. WHY CHOOSE US (6 PILLARS) */}
      {/* ======================================================== */}
      <section className="py-24 sm:py-32 bg-carbon-900 border-t border-charcoal relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 text-gold font-display text-xs tracking-super-wide uppercase mb-3">
              <span className="w-6 h-[1px] bg-gold" />
              The Next Level Standard
              <span className="w-6 h-[1px] bg-gold" />
            </div>
            <h2 className="font-display font-black text-3xl sm:text-5xl uppercase tracking-tight text-pearl">
              Care That Goes Beyond The Surface
            </h2>
            <p className="mt-4 text-silver text-sm sm:text-base leading-relaxed">
              From the first inspection to the final polish, every vehicle receives the same patient, uncompromising attention.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {WHY_CHOOSE_US_POINTS.map((item, idx) => (
              <div
                key={item.id}
                className="group p-6 bg-graphite-900 border border-charcoal hover:border-gold/40 transition-all duration-300 relative flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xs text-gold/60">0{idx + 1}</span>
                    <span className="w-8 h-8 rounded-full bg-carbon-950 border border-charcoal flex items-center justify-center text-gold group-hover:border-gold transition-colors">
                      <CheckCircle2 className="w-4 h-4" />
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-xl uppercase tracking-wide text-pearl group-hover:text-gold transition-colors">
                    {item.title}
                  </h3>
                  <div className="text-xs text-gold/90 font-medium mt-1 mb-3">
                    {item.tagline}
                  </div>
                  <p className="text-xs text-silver leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-charcoal/60 text-[11px] text-silver/60 italic">
                  {item.craftDetail}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 6. OUR WORK — GALLERY PREVIEW */}
      {/* ======================================================== */}
      <section className="py-24 sm:py-32 bg-graphite-900 border-t border-charcoal relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <SectionHeading
              eyebrow="Our Work"
              title="Finishes Worth<br/>A Second Look."
              lead="Explore sample projects and finish studies from our paint booth, detailing bay, and mechanical floor."
            />
            <Button to="/our-work" variant="outline" className="self-start md:self-end">
              View All 11 Projects
            </Button>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
            {GALLERY_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedGalleryCategory(cat.id)}
                className={`px-4 py-2 text-xs font-display uppercase tracking-automotive whitespace-nowrap transition-all border ${
                  selectedGalleryCategory === cat.id
                    ? 'bg-gold text-ink border-gold font-bold shadow-[0_0_12px_rgba(168,132,44,0.3)]'
                    : 'bg-carbon-950 text-silver border-charcoal hover:border-gold/40 hover:text-pearl'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Gallery Masonry-style Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGallery.map((project) => (
              <div
                key={project.id}
                onClick={() => setActiveLightboxProject(project)}
                className="group relative bg-carbon-950 border border-charcoal hover:border-gold/50 cursor-pointer overflow-hidden transition-all duration-300"
              >
                <div className="aspect-[16/11] overflow-hidden relative">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-carbon-950 via-carbon-950/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />
                  
                  <div className="absolute top-3 left-3 px-2 py-0.5 bg-carbon-950/80 border border-gold/30 text-[10px] font-display uppercase tracking-wider text-gold">
                    {project.categoryLabel}
                  </div>

                  {project.isDemo && (
                    <div className="absolute top-3 right-3 px-2 py-0.5 bg-carbon-950/70 text-[9px] font-mono uppercase text-silver/70">
                      Sample Concept
                    </div>
                  )}

                  {/* Overlay on hover */}
                  <div className="absolute inset-x-0 bottom-0 p-5 transform translate-y-2 group-hover:translate-y-0 transition-transform">
                    <h3 className="font-display font-bold text-lg text-pearl group-hover:text-gold uppercase tracking-wider transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-xs text-silver/80 line-clamp-2 mt-1">
                      {project.summary}
                    </p>
                    <div className="flex items-center gap-1.5 text-xs text-gold font-display uppercase tracking-wider mt-3">
                      <span>Inspect Project</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <p className="text-[11px] text-silver/60 mt-6">
            Sample concepts and illustrative photography. Client vehicle photography published upon owner sign-off.
          </p>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 7. SERVICE JOURNEY (5 STEPS) */}
      {/* ======================================================== */}
      <section className="py-24 sm:py-32 bg-carbon-950 border-t border-charcoal relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <SectionHeading
            eyebrow="The Service Journey"
            title="How We Care<br/>For Your Automobile."
            lead="A disciplined, five-stage protocol ensuring clear expectations, surgical craftsmanship, and uncompromising standards."
          />

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
            {SERVICE_JOURNEY_STEPS.map((step) => (
              <div
                key={step.step}
                className="p-6 bg-graphite-900 border border-charcoal flex flex-col justify-between relative group hover:border-gold/40 transition-colors"
              >
                <div>
                  <span className="font-display font-black text-3xl text-gold/40 group-hover:text-gold transition-colors block mb-3">
                    {step.step}
                  </span>
                  <h3 className="font-display font-bold text-base uppercase text-pearl mb-2">
                    {step.title}
                  </h3>
                  <p className="text-xs text-silver leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-charcoal/60">
                  <ul className="space-y-1 text-[11px] text-silver/70">
                    {step.highlights.map((h, i) => (
                      <li key={i} className="flex items-center gap-1.5">
                        <span className="w-1 h-1 rounded-full bg-gold/60" />
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 8. VERIFIED CUSTOMER REVIEWS (NON-MISLEADING EMPTY STATE) */}
      {/* ======================================================== */}
      <section className="py-20 bg-graphite-900 border-t border-charcoal relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 text-gold font-display text-xs tracking-super-wide uppercase mb-3">
              <span className="w-6 h-[1px] bg-gold" />
              Verified Client Feedback
              <span className="w-6 h-[1px] bg-gold" />
            </div>
            <h2 className="font-display font-black text-2xl sm:text-4xl uppercase tracking-tight text-pearl">
              Transparent Customer Voices
            </h2>
            <p className="mt-3 text-silver text-xs sm:text-sm leading-relaxed">
              We uphold genuine transparency: MM Next Level Car Care does not publish fictitious reviews or fabricated ratings. Verified feedback from authenticated workshop visits will appear here following customer sign-off.
            </p>
            <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 bg-carbon-950 border border-charcoal text-xs text-silver">
              <ShieldCheck className="w-4 h-4 text-gold" />
              <span>Verified Review Submissions Active for Workshop Clients</span>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 9. FREQUENTLY ASKED QUESTIONS PREVIEW */}
      {/* ======================================================== */}
      <section className="py-24 sm:py-32 bg-carbon-950 border-t border-charcoal relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
            <SectionHeading
              eyebrow="Got Questions?"
              title="Frequently Asked<br/>Questions."
            />
            <Button to="/faq" variant="outline" className="self-start sm:self-end">
              View All FAQs
            </Button>
          </div>

          <div className="space-y-4">
            {FAQS.slice(0, 4).map((faq) => (
              <div
                key={faq.id}
                className="p-6 bg-graphite-900 border border-charcoal hover:border-gold/30 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <HelpCircle className="w-5 h-5 text-gold flex-none mt-0.5" />
                  <div>
                    <h3 className="font-display font-bold text-base sm:text-lg uppercase text-pearl">
                      {faq.question}
                    </h3>
                    <p className="mt-2 text-xs sm:text-sm text-silver leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 10. LARGE FINAL ENQUIRY CTA SECTION */}
      {/* ======================================================== */}
      <section className="py-24 sm:py-32 bg-gradient-to-b from-graphite-900 via-carbon-950 to-carbon-950 border-t border-charcoal relative overflow-hidden text-center">
        <div className="absolute inset-0 automotive-grid opacity-30 pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-graphite-800 border border-gold/30 text-gold text-xs font-display uppercase tracking-widest mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            Let's Get Your Car Back to Its Best
          </div>

          <h2 className="font-display font-black text-4xl sm:text-6xl lg:text-7xl uppercase tracking-tight text-pearl leading-[0.95]">
            Ready to Take Your Car to the <span className="gold-text-gradient">Next Level</span>?
          </h2>

          <p className="mt-6 text-sm sm:text-base text-silver leading-relaxed max-w-2xl mx-auto">
            Share your vehicle details and required service. We will review your request and connect with you on WhatsApp to discuss your options.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Button to="/book-service" variant="ignition" className="px-8 py-4 text-base">
              Book Your Service Enquiry
            </Button>
            <Button to="/contact" variant="outline" className="px-8 py-4 text-base">
              Visit Coimbatore Workshop
            </Button>
          </div>

          <div className="mt-12 text-xs text-silver/60 flex items-center justify-center gap-6">
            <span>&bull; Direct WhatsApp Continuation</span>
            <span>&bull; No Prepayment Required</span>
            <span>&bull; Coimbatore, Tamil Nadu</span>
          </div>
        </div>
      </section>

      {/* Lightbox for Gallery */}
      <GalleryLightbox
        project={activeLightboxProject}
        isOpen={!!activeLightboxProject}
        onClose={() => setActiveLightboxProject(null)}
        onPrev={() => {
          if (!activeLightboxProject) return;
          const currIdx = GALLERY_PROJECTS.findIndex((p) => p.id === activeLightboxProject.id);
          const nextIdx = (currIdx - 1 + GALLERY_PROJECTS.length) % GALLERY_PROJECTS.length;
          setActiveLightboxProject(GALLERY_PROJECTS[nextIdx]);
        }}
        onNext={() => {
          if (!activeLightboxProject) return;
          const currIdx = GALLERY_PROJECTS.findIndex((p) => p.id === activeLightboxProject.id);
          const nextIdx = (currIdx + 1) % GALLERY_PROJECTS.length;
          setActiveLightboxProject(GALLERY_PROJECTS[nextIdx]);
        }}
      />
    </div>
  );
};
