import type { BusinessConfig } from '../types';

export const BUSINESS_CONFIG: BusinessConfig = {
  name: "MM Next Level Car Care",
  tagline: "Your Car. Our Craft. Next Level.",
  city: "Coimbatore",
  state: "Tamil Nadu",
  country: "India",
  headline: "YOUR CAR. OUR CRAFT. NEXT LEVEL.",
  brandPositioning: "Precision care, expert craftsmanship, and premium automotive restoration — giving every vehicle the attention it deserves.",
  philosophy: "MM Next Level Car Care is a Coimbatore workshop built around a simple idea: a car should leave better than it arrived. From bodywork and paint to mechanical, AC and electrical care, the focus is careful workmanship, honest communication, and details that most people overlook. Every vehicle is treated as if it were our own, because the people who drive them depend on it.",
  
  // In strict accordance with client guidelines:
  // Fictional phone numbers, addresses, emails, social accounts are NOT invented.
  whatsappNumber: "", // Set to e.g. "919XXXXXXXXX" when production number is ready
  address: null, // Configurable: exact workshop address to be published upon verification
  phone: null, // Configurable: published contact line
  email: null, // Configurable: business inquiries
  googleMapsUrl: null, // Set to Google Maps share link
  instagramUrl: null, // Coming soon
  facebookUrl: null, // Coming soon
  openingHours: null, // e.g. "Monday – Saturday: 9:00 AM – 7:30 PM"
};

export const hasValidWhatsApp = (num: string): boolean => {
  return /^\d{10,15}$/.test(num.trim());
};

export const buildWhatsAppUrl = (text: string): { url: string; isConfigured: boolean } => {
  const num = BUSINESS_CONFIG.whatsappNumber.trim();
  const isConfigured = hasValidWhatsApp(num);
  const encodedText = encodeURIComponent(text);
  
  if (isConfigured) {
    return {
      url: `https://wa.me/${num}?text=${encodedText}`,
      isConfigured: true
    };
  }
  
  // If no number is configured, return generic link or copy fallback
  return {
    url: `https://wa.me/?text=${encodedText}`,
    isConfigured: false
  };
};

export const getMapsSearchUrl = (): string => {
  if (BUSINESS_CONFIG.googleMapsUrl) {
    return BUSINESS_CONFIG.googleMapsUrl;
  }
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${BUSINESS_CONFIG.name} ${BUSINESS_CONFIG.city} ${BUSINESS_CONFIG.state}`
  )}`;
};
