import React, { useState } from 'react';
import { MessageSquare, Copy, Check, X } from 'lucide-react';
import { BUSINESS_CONFIG, hasValidWhatsApp } from '../../config/business';

export const FloatingWhatsApp: React.FC = () => {
  const isConfigured = hasValidWhatsApp(BUSINESS_CONFIG.whatsappNumber);
  const [modalOpen, setModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const defaultGreeting = "Hello MM Next Level Car Care, I would like to enquire about your services.";

  const handleClick = (e: React.MouseEvent) => {
    if (!isConfigured) {
      e.preventDefault();
      setModalOpen(true);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(defaultGreeting);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-40 group">
        <a
          href={isConfigured ? `https://wa.me/${BUSINESS_CONFIG.whatsappNumber}?text=${encodeURIComponent(defaultGreeting)}` : '#'}
          onClick={handleClick}
          target={isConfigured ? "_blank" : "_self"}
          rel="noopener noreferrer"
          className="relative flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-tr from-gold via-gold-highlight to-gold text-ink shadow-[0_8px_30px_rgba(168,132,44,0.4)] hover:scale-110 active:scale-95 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
          aria-label="Contact MM Next Level Car Care on WhatsApp"
        >
          <span className="absolute inset-0 rounded-full bg-gold animate-ping opacity-25 pointer-events-none" />
          <MessageSquare className="w-6 h-6 fill-current" />
        </a>

        {/* Hover Tooltip */}
        <div className="hidden lg:block absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-carbon-950/95 border border-charcoal text-pearl text-xs font-display tracking-wider uppercase px-3 py-1.5 rounded shadow-xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          {isConfigured ? "Chat on WhatsApp" : "Enquiry Assistant"}
        </div>
      </div>

      {/* Unconfigured WhatsApp notice dialog */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-carbon-950/80 backdrop-blur-sm p-4">
          <div className="bg-carbon-950 border border-gold/40 max-w-md w-full p-6 relative rounded shadow-2xl">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 text-silver hover:text-pearl"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="font-display text-lg text-gold font-bold uppercase tracking-wider mb-2">
              WhatsApp Integration Notice
            </div>
            <p className="text-silver text-xs leading-relaxed mb-4">
              The direct WhatsApp business phone line for MM Next Level Car Care is currently in setup mode for this deployment. You can copy the enquiry template or use our interactive booking wizard on the website.
            </p>
            <div className="p-3 bg-graphite-900 border border-charcoal rounded text-xs font-mono text-pearl/90 mb-4 break-words">
              {defaultGreeting}
            </div>
            <div className="flex justify-end gap-3">
              <button
                onClick={handleCopy}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-gold text-ink font-display font-bold text-xs uppercase tracking-wider"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? "Copied" : "Copy Message"}
              </button>
              <button
                onClick={() => setModalOpen(false)}
                className="px-4 py-2 border border-charcoal text-silver hover:text-pearl text-xs font-display uppercase tracking-wider"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
