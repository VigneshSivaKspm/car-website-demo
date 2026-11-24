import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  Car, 
  Wrench, 
  User, 
  CheckCircle2, 
  Copy, 
  Check, 
  Sparkles, 
  AlertCircle,
  ShieldCheck
} from 'lucide-react';
import { Button } from '../components/common/Button';
import { SERVICES } from '../data/services';
import { buildWhatsAppUrl } from '../config/business';
import type { ServiceEnquiryFormValues } from '../types';

const TODAY_DATE = new Date().toISOString().split('T')[0];

export const BookServicePage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const preselectedService = searchParams.get('service') || '';

  // Current Step: 1: Vehicle, 2: Service, 3: Customer, 4: Review
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Form State
  const [formData, setFormData] = useState<ServiceEnquiryFormValues>(() => ({
    name: '',
    phone: '',
    vehicleBrand: '',
    vehicleModel: '',
    serviceRequired: preselectedService || SERVICES[0].title,
    preferredDate: '',
    message: '',
  }));

  // Validation Errors
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Submission / WhatsApp state
  const [submittedMessage, setSubmittedMessage] = useState<string | null>(null);
  const [copied, setCopied] = useState<boolean>(false);

  const updateField = (field: keyof ServiceEnquiryFormValues, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  // Step 1 Validation
  const validateStep1 = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.vehicleBrand.trim()) {
      newErrors.vehicleBrand = 'Please enter your vehicle brand (e.g. BMW, Honda, Hyundai).';
    }
    if (!formData.vehicleModel.trim()) {
      newErrors.vehicleModel = 'Please enter your vehicle model (e.g. 3 Series, City, Creta).';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Step 2 Validation
  const validateStep2 = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.serviceRequired) {
      newErrors.serviceRequired = 'Please select a required service specialization.';
    }
    if (formData.preferredDate && formData.preferredDate < TODAY_DATE) {
      newErrors.preferredDate = 'Preferred date cannot be in the past.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Step 3 Validation
  const validateStep3 = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Please enter your full name.';
    }
    const phoneClean = formData.phone.trim();
    if (!phoneClean) {
      newErrors.phone = 'Please enter your mobile phone number.';
    } else if (!/^[+\d][\d\s-]{8,14}$/.test(phoneClean)) {
      newErrors.phone = 'Please enter a valid mobile number (e.g. +91 98765 43210).';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (currentStep === 1 && validateStep1()) {
      setCurrentStep(2);
    } else if (currentStep === 2 && validateStep2()) {
      setCurrentStep(3);
    } else if (currentStep === 3 && validateStep3()) {
      setCurrentStep(4);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  // Final Submission to WhatsApp
  const handleSubmitEnquiry = (e: React.FormEvent) => {
    e.preventDefault();

    const formattedMessage = 
`*New Service Enquiry*
Name: ${formData.name.trim()}
Phone: ${formData.phone.trim()}
Vehicle Brand: ${formData.vehicleBrand.trim()}
Vehicle Model: ${formData.vehicleModel.trim()}
Service Required: ${formData.serviceRequired}
Preferred Date: ${formData.preferredDate || 'Not specified (earliest slot)'}
Additional Message: ${formData.message?.trim() || 'None'}`;

    setSubmittedMessage(formattedMessage);

    const { url } = buildWhatsAppUrl(formattedMessage);

    // Open WhatsApp
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleCopyMessage = () => {
    if (submittedMessage) {
      navigator.clipboard.writeText(submittedMessage);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const stepsList = [
    { number: 1, title: 'Vehicle', icon: Car },
    { number: 2, title: 'Service', icon: Wrench },
    { number: 3, title: 'Contact', icon: User },
    { number: 4, title: 'Review', icon: CheckCircle2 },
  ];

  return (
    <div className="w-full bg-carbon-900 text-pearl min-h-screen pt-32 pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-10 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-graphite-900 border border-gold/30 text-gold text-xs font-display uppercase tracking-super-wide mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            Interactive Booking Portal
          </div>
          <h1 className="font-display font-black text-3xl sm:text-5xl uppercase tracking-tight text-pearl leading-[0.95]">
            Book Your <span className="gold-text-gradient">Service Enquiry</span>.
          </h1>
          <p className="mt-3 text-silver text-xs sm:text-sm leading-relaxed max-w-2xl">
            Configure your vehicle details and service requirements. Your enquiry formats directly for our Coimbatore workshop team to continue seamlessly on WhatsApp.
          </p>
        </div>

        {/* Multi-Step Cockpit Progress Bar */}
        <div className="mb-10 p-4 bg-graphite-900 border border-charcoal">
          <div className="grid grid-cols-4 gap-2 text-center">
            {stepsList.map((st) => {
              const isPast = currentStep > st.number;
              const isCurrent = currentStep === st.number;

              return (
                <div
                  key={st.number}
                  className={`flex flex-col sm:flex-row items-center justify-center gap-2 py-2 px-1 transition-all ${
                    isCurrent
                      ? 'border-b-2 border-gold text-gold font-bold'
                      : isPast
                      ? 'text-pearl border-b-2 border-gold/40'
                      : 'text-silver/50 border-b-2 border-charcoal'
                  }`}
                >
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-mono ${
                    isCurrent ? 'bg-gold text-ink' : isPast ? 'bg-gold/30 text-gold' : 'bg-charcoal text-silver'
                  }`}>
                    {isPast ? '✓' : st.number}
                  </span>
                  <span className="font-display text-xs uppercase tracking-wider hidden sm:inline">
                    {st.title}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Main Form Container */}
        <div className="bg-graphite-900 border border-charcoal p-6 sm:p-10 shadow-2xl relative">
          
          {/* STEP 1: VEHICLE DETAILS */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="border-b border-charcoal pb-4">
                <span className="text-[11px] font-display text-gold tracking-super-wide uppercase">
                  Step 1 of 4
                </span>
                <h2 className="font-display font-bold text-2xl uppercase tracking-wider text-pearl mt-1">
                  Vehicle Information
                </h2>
                <p className="text-xs text-silver mt-1">
                  Tell us about the vehicle you would like us to care for.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-display uppercase tracking-widest text-gold mb-2">
                    Vehicle Brand *
                  </label>
                  <input
                    type="text"
                    value={formData.vehicleBrand}
                    onChange={(e) => updateField('vehicleBrand', e.target.value)}
                    placeholder="e.g. BMW, Honda, Mercedes, Hyundai"
                    className="w-full bg-carbon-950 border border-charcoal p-3.5 text-sm text-pearl placeholder:text-silver/40 focus:border-gold focus:outline-none"
                  />
                  {errors.vehicleBrand && (
                    <p className="text-[11px] text-red-600 mt-1.5 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.vehicleBrand}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-display uppercase tracking-widest text-gold mb-2">
                    Vehicle Model & Year *
                  </label>
                  <input
                    type="text"
                    value={formData.vehicleModel}
                    onChange={(e) => updateField('vehicleModel', e.target.value)}
                    placeholder="e.g. 3 Series 2021, City ZX"
                    className="w-full bg-carbon-950 border border-charcoal p-3.5 text-sm text-pearl placeholder:text-silver/40 focus:border-gold focus:outline-none"
                  />
                  {errors.vehicleModel && (
                    <p className="text-[11px] text-red-600 mt-1.5 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.vehicleModel}
                    </p>
                  )}
                </div>
              </div>

              <div className="pt-6 border-t border-charcoal flex justify-end">
                <Button onClick={handleNext} variant="fill">
                  Continue to Service Selection
                </Button>
              </div>
            </div>
          )}

          {/* STEP 2: SERVICE SELECTION */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="border-b border-charcoal pb-4">
                <span className="text-[11px] font-display text-gold tracking-super-wide uppercase">
                  Step 2 of 4
                </span>
                <h2 className="font-display font-bold text-2xl uppercase tracking-wider text-pearl mt-1">
                  Required Service & Preferred Date
                </h2>
                <p className="text-xs text-silver mt-1">
                  Select your primary workshop requirement and an optional target intake date.
                </p>
              </div>

              <div>
                <label className="block text-xs font-display uppercase tracking-widest text-gold mb-3">
                  Select Workshop Specialization *
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {SERVICES.map((s) => {
                    const isSelected = formData.serviceRequired === s.title;
                    return (
                      <div
                        key={s.slug}
                        onClick={() => updateField('serviceRequired', s.title)}
                        className={`p-3.5 border cursor-pointer transition-all flex items-start gap-3 ${
                          isSelected
                            ? 'bg-carbon-950 border-gold shadow-[0_0_12px_rgba(168,132,44,0.3)]'
                            : 'bg-carbon-950/60 border-charcoal hover:border-gold/40'
                        }`}
                      >
                        <span className={`w-4 h-4 rounded-full border mt-0.5 flex items-center justify-center ${
                          isSelected ? 'border-gold bg-gold' : 'border-charcoal'
                        }`}>
                          {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-carbon-950" />}
                        </span>
                        <div>
                          <div className={`text-xs font-display font-bold uppercase tracking-wide ${isSelected ? 'text-gold' : 'text-pearl'}`}>
                            {s.title}
                          </div>
                          <div className="text-[11px] text-silver/70 line-clamp-1 mt-0.5">
                            {s.tagline}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                {errors.serviceRequired && (
                  <p className="text-[11px] text-red-600 mt-1.5">{errors.serviceRequired}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-display uppercase tracking-widest text-gold mb-2">
                  Preferred Intake Date (Optional)
                </label>
                <input
                  type="date"
                  min={TODAY_DATE}
                  value={formData.preferredDate}
                  onChange={(e) => updateField('preferredDate', e.target.value)}
                  className="w-full sm:w-64 bg-carbon-950 border border-charcoal p-3 text-sm text-pearl focus:border-gold focus:outline-none"
                />
                {errors.preferredDate && (
                  <p className="text-[11px] text-red-600 mt-1.5">{errors.preferredDate}</p>
                )}
              </div>

              <div className="pt-6 border-t border-charcoal flex justify-between">
                <Button onClick={handleBack} variant="ghost" icon={false}>
                  &larr; Back to Vehicle
                </Button>
                <Button onClick={handleNext} variant="fill">
                  Continue to Contact Details
                </Button>
              </div>
            </div>
          )}

          {/* STEP 3: CUSTOMER DETAILS */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="border-b border-charcoal pb-4">
                <span className="text-[11px] font-display text-gold tracking-super-wide uppercase">
                  Step 3 of 4
                </span>
                <h2 className="font-display font-bold text-2xl uppercase tracking-wider text-pearl mt-1">
                  Customer & Communication
                </h2>
                <p className="text-xs text-silver mt-1">
                  Your phone number will be used to establish the direct WhatsApp conversation.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-display uppercase tracking-widest text-gold mb-2">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => updateField('name', e.target.value)}
                    placeholder="e.g. Vignesh Sundaram"
                    className="w-full bg-carbon-950 border border-charcoal p-3.5 text-sm text-pearl placeholder:text-silver/40 focus:border-gold focus:outline-none"
                  />
                  {errors.name && (
                    <p className="text-[11px] text-red-600 mt-1.5 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-display uppercase tracking-widest text-gold mb-2">
                    Mobile / WhatsApp Number *
                  </label>
                  <input
                    type="tel"
                    inputMode="tel"
                    value={formData.phone}
                    onChange={(e) => updateField('phone', e.target.value)}
                    placeholder="e.g. +91 98765 43210"
                    className="w-full bg-carbon-950 border border-charcoal p-3.5 text-sm text-pearl placeholder:text-silver/40 focus:border-gold focus:outline-none"
                  />
                  {errors.phone && (
                    <p className="text-[11px] text-red-600 mt-1.5 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.phone}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs font-display uppercase tracking-widest text-gold mb-2">
                  Additional Notes or Specific Concerns (Optional)
                </label>
                <textarea
                  rows={4}
                  value={formData.message}
                  onChange={(e) => updateField('message', e.target.value)}
                  placeholder="Describe any specific scratches, dent locations, cooling symptoms, or questions you have..."
                  className="w-full bg-carbon-950 border border-charcoal p-3 text-sm text-pearl placeholder:text-silver/40 focus:border-gold focus:outline-none resize-none"
                />
              </div>

              <div className="pt-6 border-t border-charcoal flex justify-between">
                <Button onClick={handleBack} variant="ghost" icon={false}>
                  &larr; Back to Service
                </Button>
                <Button onClick={handleNext} variant="fill">
                  Review Enquiry
                </Button>
              </div>
            </div>
          )}

          {/* STEP 4: REVIEW AND TRANSMIT TO WHATSAPP */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div className="border-b border-charcoal pb-4">
                <span className="text-[11px] font-display text-gold tracking-super-wide uppercase">
                  Step 4 of 4
                </span>
                <h2 className="font-display font-black text-2xl uppercase tracking-wider text-pearl mt-1">
                  Review & Connect on WhatsApp
                </h2>
                <p className="text-xs text-silver mt-1">
                  Please confirm your enquiry summary below before transmitting to our workshop team.
                </p>
              </div>

              {/* Summary Card */}
              <div className="p-6 bg-carbon-950 border border-charcoal space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-silver uppercase tracking-wider block text-[10px]">
                      Vehicle
                    </span>
                    <span className="text-pearl font-bold text-sm">
                      {formData.vehicleBrand} {formData.vehicleModel}
                    </span>
                  </div>

                  <div>
                    <span className="text-silver uppercase tracking-wider block text-[10px]">
                      Requested Service
                    </span>
                    <span className="text-gold font-bold text-sm">
                      {formData.serviceRequired}
                    </span>
                  </div>

                  <div>
                    <span className="text-silver uppercase tracking-wider block text-[10px]">
                      Customer Contact
                    </span>
                    <span className="text-pearl">
                      {formData.name} ({formData.phone})
                    </span>
                  </div>

                  <div>
                    <span className="text-silver uppercase tracking-wider block text-[10px]">
                      Target Date
                    </span>
                    <span className="text-pearl">
                      {formData.preferredDate || 'Earliest available appointment'}
                    </span>
                  </div>
                </div>

                {formData.message && (
                  <div className="pt-3 border-t border-charcoal/60 text-xs">
                    <span className="text-silver uppercase tracking-wider block text-[10px] mb-1">
                      Customer Message:
                    </span>
                    <p className="text-pearl/90 italic bg-graphite-900 p-3 border border-charcoal/50">
                      "{formData.message}"
                    </p>
                  </div>
                )}
              </div>

              {/* Status Notice about WhatsApp */}
              <div className="p-4 bg-graphite-800 border border-gold/40 text-xs space-y-2">
                <div className="flex items-center gap-2 font-display uppercase tracking-wider text-gold font-semibold">
                  <ShieldCheck className="w-4 h-4 text-gold flex-none" />
                  <span>Direct WhatsApp Continuation Notice</span>
                </div>
                <p className="text-silver leading-relaxed">
                  When you press the button below, WhatsApp will open with this formatted message. 
                  <strong className="text-pearl"> You must press "Send" inside WhatsApp</strong> to deliver your message to the workshop.
                </p>
              </div>

              {/* If submitted state */}
              {submittedMessage && (
                <div className="p-5 bg-carbon-950 border border-emerald-500/40 space-y-3">
                  <div className="flex items-center gap-2 text-emerald-700 font-display uppercase tracking-wider text-xs font-bold">
                    <CheckCircle2 className="w-4 h-4" />
                    Enquiry Formatted Successfully
                  </div>
                  <p className="text-xs text-silver leading-relaxed">
                    If WhatsApp did not automatically open on your device, you can copy the full enquiry text below:
                  </p>
                  <pre className="p-3 bg-graphite-900 border border-charcoal font-mono text-[11px] text-pearl/90 whitespace-pre-wrap">
                    {submittedMessage}
                  </pre>
                  <div className="flex gap-3">
                    <button
                      onClick={handleCopyMessage}
                      className="inline-flex items-center gap-1.5 px-4 py-2 bg-gold text-ink font-display font-bold text-xs uppercase tracking-wider"
                    >
                      {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      {copied ? 'Copied to Clipboard' : 'Copy Enquiry Text'}
                    </button>
                  </div>
                </div>
              )}

              <div className="pt-6 border-t border-charcoal flex flex-wrap items-center justify-between gap-4">
                <Button onClick={handleBack} variant="ghost" icon={false}>
                  &larr; Edit Details
                </Button>

                <Button
                  onClick={handleSubmitEnquiry}
                  variant="ignition"
                  className="px-8 py-3.5 text-sm"
                >
                  Send Enquiry on WhatsApp
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Reassurance Footer */}
        <div className="mt-8 text-center text-xs text-silver/60">
          MM Next Level Car Care &middot; Coimbatore, Tamil Nadu &middot; Honest Communication & Meticulous Attention
        </div>
      </div>
    </div>
  );
};
