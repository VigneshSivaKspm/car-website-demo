import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Sparkles } from 'lucide-react';
import { SERVICES } from '../../data/services';

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const location = useLocation();

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenus = () => {
    setMobileMenuOpen(false);
    setServicesDropdownOpen(false);
  };

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Services', path: '/services', isMega: true },
    { label: 'Transformations', path: '/transformations' },
    { label: 'Our Work', path: '/our-work' },
    { label: 'About Us', path: '/about' },
    { label: 'Why Us', path: '/why-choose-us' },
    { label: 'Contact', path: '/contact' },
  ];

  const isCurrent = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        mobileMenuOpen
          ? 'bg-carbon-950 border-b border-charcoal/80 py-3'
          : isScrolled
            ? 'bg-carbon-950/90 backdrop-blur-md border-b border-charcoal/80 py-3 shadow-[0_4px_30px_rgba(70,55,20,0.16)]'
            : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo / Wordmark */}
          <Link
            to="/"
            onClick={closeMenus}
            className="group flex flex-col focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
            aria-label="MM Next Level Car Care Home"
          >
            <span className="font-display font-extrabold text-xl sm:text-2xl tracking-[0.2em] text-pearl group-hover:text-gold transition-colors">
              MM NEXT LEVEL
            </span>
            <span className="font-display font-semibold text-[10px] tracking-[0.45em] text-gold uppercase mt-0.5">
              CAR CARE &middot; COIMBATORE
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8" aria-label="Main Navigation">
            {navLinks.map((link) => {
              if (link.isMega) {
                return (
                  <div
                    key={link.path}
                    className="relative"
                    onMouseEnter={() => setServicesDropdownOpen(true)}
                    onMouseLeave={() => setServicesDropdownOpen(false)}
                  >
                    <Link
                      to={link.path}
                      onClick={closeMenus}
                      className={`flex items-center gap-1.5 font-display text-sm tracking-automotive uppercase py-2 transition-colors relative ${
                        isCurrent(link.path) ? 'text-gold' : 'text-pearl/80 hover:text-gold'
                      }`}
                      aria-expanded={servicesDropdownOpen}
                    >
                      {link.label}
                      <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${servicesDropdownOpen ? 'rotate-180 text-gold' : ''}`} />
                      {isCurrent(link.path) && (
                        <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gold shadow-[0_0_8px_#C9A24A]" />
                      )}
                    </Link>

                    {/* Services Mega Dropdown */}
                    {servicesDropdownOpen && (
                      <div className="absolute top-full left-1/2 -translate-x-1/2 w-[720px] bg-carbon-950/95 backdrop-blur-xl border border-charcoal rounded-lg shadow-2xl p-6 grid grid-cols-2 gap-4 animate-in fade-in slide-in-from-top-2 duration-200">
                        <div className="col-span-2 pb-2 mb-2 border-b border-charcoal/60 flex items-center justify-between">
                          <span className="text-xs font-display text-gold tracking-super-wide uppercase flex items-center gap-2">
                            <Sparkles className="w-3.5 h-3.5" /> All 8 Workshop Specializations
                          </span>
                          <Link to="/services" onClick={closeMenus} className="text-xs text-silver hover:text-pearl transition-colors">
                            Explore full directory &rarr;
                          </Link>
                        </div>
                        {SERVICES.map((s) => (
                          <Link
                            key={s.slug}
                            to={`/services/${s.slug}`}
                            onClick={closeMenus}
                            className="group/item flex items-start gap-3 p-2.5 rounded hover:bg-graphite-800/60 border border-transparent hover:border-gold/20 transition-all"
                          >
                            <span className="font-display text-xs text-gold font-bold px-1.5 py-0.5 rounded bg-graphite-700/60 border border-gold/30 mt-0.5">
                              {s.id}
                            </span>
                            <div>
                              <div className="font-display text-sm font-semibold tracking-wide text-pearl group-hover/item:text-gold transition-colors">
                                {s.title}
                              </div>
                              <div className="text-xs text-silver/70 line-clamp-1 mt-0.5">
                                {s.tagline}
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={closeMenus}
                  className={`font-display text-sm tracking-automotive uppercase py-2 transition-colors relative ${
                    isCurrent(link.path) ? 'text-gold' : 'text-pearl/80 hover:text-gold'
                  }`}
                >
                  {link.label}
                  {isCurrent(link.path) && (
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gold shadow-[0_0_8px_#C9A24A]" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-4">
            <Link
              to="/book-service"
              onClick={closeMenus}
              className="relative inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-gradient-to-r from-gold via-gold-highlight to-gold text-ink font-display font-bold text-sm tracking-automotive uppercase rounded-none transition-all duration-300 hover:shadow-[0_0_20px_rgba(168,132,44,0.5)] hover:scale-[1.02] active:scale-[0.98] border border-gold"
            >
              <span className="w-2 h-2 rounded-full bg-carbon-950 animate-ping" />
              Book a Service
            </Link>
          </div>

          {/* Mobile Menu Hamburger Toggle */}
          <div className="lg:hidden flex items-center gap-2">
            <Link
              to="/book-service"
              onClick={closeMenus}
              className="px-3 py-1.5 bg-gold text-ink font-display font-bold text-xs tracking-wider uppercase"
            >
              Book
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-pearl hover:text-gold focus-visible:outline-none"
              aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute inset-x-0 top-full bg-carbon-950 border-b border-charcoal shadow-[0_20px_40px_rgba(70,55,20,0.16)] px-6 py-4 max-h-[calc(100vh-72px)] overflow-y-auto overscroll-contain">
          <div className="flex flex-col gap-1.5">
            <div className="pb-2 mb-1 border-b border-charcoal/80">
              <span className="text-[11px] font-display text-gold tracking-super-wide uppercase">
                Navigation Directory
              </span>
            </div>
            {navLinks.map((link) => (
              <div key={link.path}>
                <Link
                  to={link.path}
                  onClick={closeMenus}
                  className={`block py-1.5 font-display text-lg tracking-wider uppercase transition-colors ${
                    isCurrent(link.path) ? 'text-gold pl-2 border-l-2 border-gold' : 'text-pearl hover:text-gold'
                  }`}
                >
                  {link.label}
                </Link>
                {link.isMega && (
                  <div className="pl-4 mt-1 mb-1 space-y-1 border-l border-charcoal/60">
                    {SERVICES.map((s) => (
                      <Link
                        key={s.slug}
                        to={`/services/${s.slug}`}
                        onClick={closeMenus}
                        className="block text-xs text-silver hover:text-gold py-1"
                      >
                        <span className="text-gold font-mono mr-2">{s.id}</span>
                        {s.shortTitle}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            <div className="pt-4 border-t border-charcoal flex flex-col gap-3">
              <Link
                to="/book-service"
                onClick={closeMenus}
                className="w-full text-center py-3 bg-gold text-ink font-display font-bold text-sm tracking-automotive uppercase"
              >
                Book Your Service
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
