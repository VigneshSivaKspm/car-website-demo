import React from 'react';
import { Lock } from 'lucide-react';

export const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="w-full bg-carbon-900 text-pearl min-h-screen pt-32 pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-graphite-900 border border-gold/30 text-gold text-xs font-display uppercase tracking-super-wide mb-4">
            <Lock className="w-3.5 h-3.5" />
            Data Protection & Transparency
          </div>
          <h1 className="font-display font-black text-4xl sm:text-5xl uppercase tracking-tight text-pearl leading-[0.95]">
            Privacy <span className="gold-text-gradient">Information</span>.
          </h1>
          <p className="mt-4 text-silver text-xs sm:text-sm leading-relaxed">
            Effective Date: 2026 &middot; MM Next Level Car Care, Coimbatore, Tamil Nadu, India.
          </p>
        </div>

        {/* Content sections */}
        <div className="space-y-8 text-xs sm:text-sm text-silver leading-relaxed bg-graphite-900 border border-charcoal p-6 sm:p-10 shadow-xl">
          <section>
            <h2 className="font-display font-bold text-base sm:text-lg uppercase text-pearl mb-2">
              1. Information We Collect
            </h2>
            <p>
              When you submit a service enquiry through our booking form, we collect the information necessary to evaluate your vehicle requirements:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-pearl/90">
              <li>Customer full name</li>
              <li>Contact telephone / WhatsApp number</li>
              <li>Vehicle brand and model</li>
              <li>Requested workshop service and preferred date</li>
              <li>Any optional vehicle condition notes you choose to share</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display font-bold text-base sm:text-lg uppercase text-pearl mb-2">
              2. How Your Enquiry Is Handled (WhatsApp Integration)
            </h2>
            <p>
              Our website does not silently transfer or sell your private contact details to external marketing databases. The details you enter into the booking interface are packaged into a structured message and transmitted directly via the WhatsApp application on your device. You maintain full control to review the message before pressing Send.
            </p>
          </section>

          <section>
            <h2 className="font-display font-bold text-base sm:text-lg uppercase text-pearl mb-2">
              3. Purpose of Processing
            </h2>
            <p>
              We process your vehicle and contact details solely to:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-pearl/90">
              <li>Provide accurate service estimates and timeframes</li>
              <li>Schedule your vehicle inspection at our Coimbatore workshop</li>
              <li>Provide transparent updates regarding parts, repair stages, and completion</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display font-bold text-base sm:text-lg uppercase text-pearl mb-2">
              4. Third-Party Services
            </h2>
            <p>
              Our website provides external links to Google Maps for location navigation and WhatsApp for direct customer messaging. These third-party services operate under their respective privacy policies.
            </p>
          </section>

          <section>
            <h2 className="font-display font-bold text-base sm:text-lg uppercase text-pearl mb-2">
              5. Contacting the Workshop
            </h2>
            <p>
              If you have any questions regarding how your details are handled, please contact MM Next Level Car Care directly via our Coimbatore workshop facility or website booking portal.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};
