import React, { useState } from 'react';
import { Sparkles, Eye } from 'lucide-react';
import { GalleryLightbox } from '../components/gallery/GalleryLightbox';
import { GALLERY_PROJECTS, GALLERY_CATEGORIES } from '../data/gallery';
import type { GalleryProject, GalleryCategory } from '../types';

export const GalleryPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<GalleryCategory>('all');
  const [activeLightboxProject, setActiveLightboxProject] = useState<GalleryProject | null>(null);

  const filtered = GALLERY_PROJECTS.filter(
    (p) => activeCategory === 'all' || p.category === activeCategory
  );

  return (
    <div className="w-full bg-carbon-900 text-pearl min-h-screen pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-graphite-900 border border-gold/30 text-gold text-xs font-display uppercase tracking-super-wide mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            Automotive Project Gallery
          </div>
          <h1 className="font-display font-black text-4xl sm:text-6xl uppercase tracking-tight text-pearl leading-[0.95]">
            Finishes Worth <span className="gold-text-gradient">A Second Look</span>.
          </h1>
          <p className="mt-5 text-silver text-sm sm:text-base leading-relaxed">
            Explore 11 concept studies spanning spray painting, panel beating, ceramic coating, vintage restoration, and precision workshop diagnostics. Click any project to open the high-resolution lightbox or view its dedicated dossier.
          </p>
        </div>

        {/* Filter Navigation */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 border-b border-charcoal no-scrollbar">
          {GALLERY_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 text-xs font-display uppercase tracking-automotive whitespace-nowrap transition-all border ${
                activeCategory === cat.id
                  ? 'bg-gold text-ink border-gold font-bold shadow-[0_0_15px_rgba(168,132,44,0.3)]'
                  : 'bg-graphite-900 text-silver border-charcoal hover:border-gold/40 hover:text-pearl'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Editorial Responsive Bento / Masonry Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((project) => {
            const spanClass = project.aspectClass === 'wide' 
              ? 'sm:col-span-2 aspect-[16/9]' 
              : project.aspectClass === 'tall' 
              ? 'aspect-[3/4]' 
              : 'aspect-[4/3]';

            return (
              <div
                key={project.id}
                onClick={() => setActiveLightboxProject(project)}
                className={`group relative bg-carbon-950 border border-charcoal hover:border-gold/50 cursor-pointer overflow-hidden transition-all duration-300 shadow-xl ${spanClass}`}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                
                {/* Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-carbon-950 via-carbon-950/20 to-transparent opacity-85 group-hover:opacity-60 transition-opacity" />

                {/* Badges */}
                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <span className="px-2.5 py-0.5 bg-carbon-950/85 border border-gold/40 text-[10px] font-display uppercase tracking-wider text-gold font-semibold">
                    {project.categoryLabel}
                  </span>
                  {project.isDemo && (
                    <span className="px-2 py-0.5 bg-carbon-950/70 border border-charcoal text-[9px] font-mono text-silver/80">
                      Sample Concept
                    </span>
                  )}
                </div>

                {/* Content Overlay */}
                <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 transform translate-y-1 group-hover:translate-y-0 transition-transform">
                  <h3 className="font-display font-black text-xl sm:text-2xl text-pearl group-hover:text-gold uppercase tracking-wide transition-colors">
                    {project.title}
                  </h3>
                  <p className="mt-1 text-xs text-silver/90 line-clamp-2 max-w-lg">
                    {project.summary}
                  </p>

                  <div className="mt-3 pt-3 border-t border-charcoal/60 flex items-center justify-between text-xs font-display uppercase tracking-wider text-gold">
                    <span className="flex items-center gap-1.5">
                      <Eye className="w-3.5 h-3.5" />
                      Inspect Lightbox
                    </span>
                    <span className="flex items-center gap-1">
                      Dossier &rarr;
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Disclaimer Notice */}
        <div className="mt-12 p-4 bg-carbon-950 border border-charcoal text-[11px] text-silver/70">
          <strong className="text-pearl">Demonstration Notice:</strong> The projects shown above illustrate the visual standards, finishes, and craft scope achievable at MM Next Level Car Care. Client vehicle photography is published with permission upon project completion.
        </div>
      </div>

      {/* Lightbox Dialog */}
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
