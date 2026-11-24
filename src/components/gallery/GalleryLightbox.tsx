import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPortal } from 'react-dom';
import type { GalleryProject } from '../../types';

interface GalleryLightboxProps {
  project: GalleryProject | null;
  isOpen: boolean;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export const GalleryLightbox: React.FC<GalleryLightboxProps> = ({
  project,
  isOpen,
  onClose,
  onPrev,
  onNext,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose, onPrev, onNext]);

  if (!isOpen || !project) return null;

  // Portal to <body> so the dialog escapes the page's stacking context and sits above the fixed site header.
  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Gallery Viewer: ${project.title}`}
      className="fixed inset-0 z-[120] flex items-center justify-center bg-carbon-950/90 backdrop-blur-md p-4 sm:p-6 lg:p-10 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative max-w-5xl w-full bg-carbon-950 border border-charcoal shadow-2xl rounded-none flex flex-col max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Control Bar */}
        <div className="sticky top-0 z-10 flex-none flex items-center justify-between px-5 py-3.5 border-b border-charcoal bg-graphite-900">
          <div className="flex items-center gap-3">
            <span className="px-2 py-0.5 text-[10px] font-display font-semibold uppercase tracking-wider bg-gold/20 text-gold border border-gold/40">
              {project.categoryLabel}
            </span>
            <h3 className="font-display font-bold text-base sm:text-lg tracking-wider text-pearl uppercase">
              {project.title}
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onPrev}
              className="p-2 border border-charcoal hover:border-gold text-silver hover:text-gold transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold"
              aria-label="Previous project"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={onNext}
              className="p-2 border border-charcoal hover:border-gold text-silver hover:text-gold transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold"
              aria-label="Next project"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 border border-charcoal hover:border-red-500/60 text-silver hover:text-pearl transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold"
              aria-label="Close dialog"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Image Display */}
        <div className="relative flex-none bg-carbon-800 flex items-center justify-center overflow-hidden min-h-[200px]">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-auto max-h-[48vh] object-contain"
          />
          {project.isDemo && (
            <div className="absolute top-3 left-3 px-2.5 py-1 bg-carbon-950/75 border border-charcoal text-[10px] font-display uppercase tracking-wider text-silver/80">
              Sample Project Concept
            </div>
          )}
        </div>

        {/* Bottom Details Footer */}
        <div className="flex-none p-5 border-t border-charcoal bg-graphite-900 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <p className="text-xs text-silver leading-relaxed max-w-2xl">
              {project.summary}
            </p>
            <div className="flex flex-wrap gap-2 mt-2">
              {project.details.servicesRendered.map((svc, i) => (
                <span key={i} className="text-[10px] font-mono text-gold/80 bg-graphite-800 px-2 py-0.5 border border-charcoal">
                  {svc}
                </span>
              ))}
            </div>
          </div>

          <Link
            to={`/our-work/${project.slug}`}
            onClick={onClose}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-gold hover:bg-gold-highlight text-ink font-display font-bold text-xs uppercase tracking-automotive transition-colors flex-none"
          >
            <span>Full Project Dossier</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>,
    document.body,
  );
};
