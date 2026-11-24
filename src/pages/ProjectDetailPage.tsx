import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle2
} from 'lucide-react';
import { Button } from '../components/common/Button';
import { getGalleryProjectBySlug, GALLERY_PROJECTS } from '../data/gallery';

export const ProjectDetailPage: React.FC = () => {
  const { projectSlug } = useParams<{ projectSlug: string }>();
  const project = projectSlug ? getGalleryProjectBySlug(projectSlug) : undefined;

  if (!project) {
    return <Navigate to="/our-work" replace />;
  }

  // Find next and previous projects
  const currentIndex = GALLERY_PROJECTS.findIndex((p) => p.slug === project.slug);
  const prevProject = GALLERY_PROJECTS[(currentIndex - 1 + GALLERY_PROJECTS.length) % GALLERY_PROJECTS.length];
  const nextProject = GALLERY_PROJECTS[(currentIndex + 1) % GALLERY_PROJECTS.length];

  return (
    <div className="w-full bg-carbon-900 text-pearl min-h-screen pt-28 pb-24">
      
      {/* Top Header & Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <Link
          to="/our-work"
          className="inline-flex items-center gap-2 text-xs font-display uppercase tracking-widest text-silver hover:text-gold transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to All 11 Projects</span>
        </Link>
      </div>

      {/* Hero Visual Dossier Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Project Card */}
        <div className="bg-graphite-900 border border-charcoal overflow-hidden shadow-2xl mb-12">
          
          {/* Large Hero Image */}
          <div className="relative aspect-[16/9] sm:aspect-[21/9] bg-carbon-800 overflow-hidden">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-carbon-950 via-transparent to-transparent opacity-80" />
            
            <div className="absolute top-6 left-6 flex items-center gap-3">
              <span className="px-3 py-1 bg-gold text-ink font-display font-bold text-xs uppercase tracking-wider">
                {project.categoryLabel}
              </span>
              {project.isDemo && (
                <span className="px-3 py-1 bg-carbon-950/80 border border-charcoal text-silver text-[10px] font-mono uppercase">
                  Concept Demonstration
                </span>
              )}
            </div>

            <div className="absolute bottom-6 left-6 right-6">
              <h1 className="font-display font-black text-3xl sm:text-5xl uppercase tracking-tight text-pearl">
                {project.title}
              </h1>
              <p className="text-xs sm:text-sm text-gold-highlight font-medium mt-1">
                {project.summary}
              </p>
            </div>
          </div>

          {/* Details Bar */}
          <div className="p-6 sm:p-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            
            {/* Left Story Description */}
            <div className="md:col-span-7 space-y-4">
              <h2 className="font-display font-bold text-xl uppercase tracking-wider text-gold">
                Project Dossier & Methodology
              </h2>
              <p className="text-sm text-silver leading-relaxed">
                {project.details.description}
              </p>

              <div className="pt-6 border-t border-charcoal mt-6">
                <h3 className="font-display font-bold text-sm uppercase tracking-wider text-pearl mb-3">
                  Craft Highlights
                </h3>
                <ul className="space-y-2 text-xs sm:text-sm text-silver">
                  {project.details.craftHighlights.map((hl, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-gold flex-none mt-0.5" />
                      <span>{hl}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right Telemetry Column */}
            <div className="md:col-span-5 bg-carbon-950 border border-charcoal p-6 space-y-5">
              <div className="border-b border-charcoal pb-3">
                <span className="text-[10px] font-display text-gold tracking-super-wide uppercase">
                  Project Telemetry
                </span>
                <div className="text-sm font-bold text-pearl uppercase mt-0.5">
                  Specification Sheet
                </div>
              </div>

              {project.details.vehicleType && (
                <div className="flex items-center justify-between text-xs">
                  <span className="text-silver">Vehicle Type:</span>
                  <span className="text-pearl font-semibold">{project.details.vehicleType}</span>
                </div>
              )}

              {project.details.timeline && (
                <div className="flex items-center justify-between text-xs">
                  <span className="text-silver">Project Duration:</span>
                  <span className="text-gold font-semibold">{project.details.timeline}</span>
                </div>
              )}

              <div className="pt-3 border-t border-charcoal">
                <span className="text-xs text-silver block mb-2">Services Rendered:</span>
                <div className="flex flex-wrap gap-1.5">
                  {project.details.servicesRendered.map((s, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 bg-graphite-900 border border-charcoal text-[11px] font-mono text-pearl"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-charcoal">
                <Button
                  to={`/book-service?service=${encodeURIComponent(project.details.servicesRendered[0] || project.title)}`}
                  variant="ignition"
                  className="w-full text-center text-xs"
                >
                  Book Similar Service
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Previous / Next Project Navigation Bar */}
        <div className="flex items-center justify-between border-t border-charcoal pt-6">
          <Link
            to={`/our-work/${prevProject.slug}`}
            className="group flex items-center gap-2 text-xs font-display uppercase tracking-wider text-silver hover:text-gold"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Prev: {prevProject.title}</span>
          </Link>

          <Link
            to={`/our-work/${nextProject.slug}`}
            className="group flex items-center gap-2 text-xs font-display uppercase tracking-wider text-silver hover:text-gold"
          >
            <span>Next: {nextProject.title}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
};
