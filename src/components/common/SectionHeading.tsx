import React from 'react';

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  lead?: string;
  align?: 'left' | 'center';
  light?: boolean;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  eyebrow,
  title,
  lead,
  align = 'left',
  light = false,
}) => {
  const isCenter = align === 'center';

  return (
    <div className={`mb-12 sm:mb-16 ${isCenter ? 'text-center mx-auto max-w-3xl' : 'max-w-3xl'}`}>
      {/* Eyebrow with gold dash */}
      <div className={`flex items-center gap-3 mb-4 ${isCenter ? 'justify-center' : ''}`}>
        <span className="w-8 h-[1px] bg-gold flex-none" />
        <span className="font-display font-semibold text-xs sm:text-sm tracking-[0.25em] text-gold uppercase">
          {eyebrow}
        </span>
      </div>

      {/* Editorial Oversized Title */}
      <h2
        className={`font-display font-black text-3xl sm:text-5xl lg:text-6xl tracking-tight leading-[0.95] uppercase ${
          light ? 'text-ink' : 'text-pearl'
        }`}
        dangerouslySetInnerHTML={{ __html: title.replace(/\n/g, '<br/>') }}
      />

      {/* Lead Text */}
      {lead && (
        <p className={`mt-5 text-sm sm:text-base leading-relaxed ${light ? 'text-charcoal' : 'text-silver'}`}>
          {lead}
        </p>
      )}
    </div>
  );
};
