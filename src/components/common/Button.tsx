import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'fill' | 'outline' | 'ghost' | 'ignition';
  href?: string;
  to?: string;
  icon?: boolean;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'fill',
  href,
  to,
  icon = true,
  children,
  className = '',
  ...props
}) => {
  const baseClasses = `
    group relative inline-flex items-center justify-center gap-3 px-7 py-3.5 
    font-display font-bold text-sm tracking-automotive uppercase 
    transition-all duration-300 select-none cursor-pointer
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold
    active:scale-[0.98]
  `;

  let variantClasses = '';
  switch (variant) {
    case 'fill':
      variantClasses = `
        bg-gold text-ink border border-gold
        hover:bg-gold-highlight hover:border-gold-highlight
        hover:shadow-[0_0_20px_rgba(168,132,44,0.4)]
      `;
      break;
    case 'outline':
      variantClasses = `
        bg-transparent text-pearl border border-gold/60
        hover:bg-gold hover:text-ink hover:border-gold
        hover:shadow-[0_0_15px_rgba(168,132,44,0.3)]
      `;
      break;
    case 'ghost':
      variantClasses = `
        bg-transparent text-silver hover:text-gold border border-charcoal hover:border-gold/40
      `;
      break;
    case 'ignition':
      variantClasses = `
        bg-gradient-to-r from-gold via-gold-highlight to-gold text-ink 
        border border-gold shadow-[0_0_25px_rgba(168,132,44,0.5)]
        hover:shadow-[0_0_35px_rgba(201,162,74,0.7)]
      `;
      break;
  }

  const combined = `${baseClasses} ${variantClasses} ${className}`;

  const content = (
    <>
      {variant === 'ignition' && (
        <span className="w-2 h-2 rounded-full bg-carbon-950 animate-ping mr-1" />
      )}
      <span>{children}</span>
      {icon && (
        <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" />
      )}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={combined}>
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={combined} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    );
  }

  return (
    <button className={combined} {...props}>
      {content}
    </button>
  );
};
