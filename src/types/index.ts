export type ServiceCategory = 'paint' | 'body' | 'restoration' | 'workshop' | 'detailing';

export interface ServiceDetail {
  id: string;
  slug: string;
  title: string;
  shortTitle: string;
  tagline: string;
  description: string;
  extendedDescription: string;
  accentColor: string;
  category: ServiceCategory;
  heroImage: string;
  featuredImages: string[];
  features: string[];
  processSteps: {
    number: string;
    title: string;
    description: string;
  }[];
  benefits: string[];
  faq: {
    question: string;
    answer: string;
  }[];
  recommendedWith: string[]; // slugs of related services
  badge?: string;
}

export type GalleryCategory = 'all' | 'paint' | 'restoration' | 'detailing' | 'body' | 'premium' | 'workshop';

export interface GalleryProject {
  id: string;
  slug: string;
  title: string;
  category: GalleryCategory;
  categoryLabel: string;
  aspectClass: 'normal' | 'wide' | 'tall';
  image: string;
  accentColor: string;
  isDemo: boolean;
  summary: string;
  details: {
    vehicleType?: string;
    servicesRendered: string[];
    timeline?: string;
    craftHighlights: string[];
    description: string;
  };
}

export interface TransformationItem {
  id: string;
  slug: string;
  title: string;
  vehicle: string;
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
  workCompleted: string;
  services: string[];
  summary: string;
  craftNotes: string[];
  isDemo: boolean;
}

export interface WhyUsPoint {
  id: string;
  iconName: 'users' | 'layers' | 'eye' | 'home' | 'messageSquare' | 'checkCircle';
  title: string;
  tagline: string;
  description: string;
  craftDetail: string;
}

export interface ServiceJourneyStep {
  step: string;
  title: string;
  description: string;
  highlights: string[];
}

export interface VerifiedReview {
  id: string;
  customerName: string;
  reviewText: string;
  rating?: number;
  serviceCategory?: string;
  isVerified: boolean;
  date?: string;
}

export interface BusinessConfig {
  name: string;
  tagline: string;
  city: string;
  state: string;
  country: string;
  headline: string;
  brandPositioning: string;
  philosophy: string;
  whatsappNumber: string; // e.g. "919XXXXXXXXX" or empty if unconfigured
  address: string | null;
  phone: string | null;
  email: string | null;
  googleMapsUrl: string | null;
  instagramUrl: string | null;
  facebookUrl: string | null;
  openingHours: string | null;
}

export interface ServiceEnquiryFormValues {
  name: string;
  phone: string;
  vehicleBrand: string;
  vehicleModel: string;
  serviceRequired: string;
  preferredDate?: string;
  message?: string;
}
