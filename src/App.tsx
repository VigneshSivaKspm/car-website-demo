import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { FloatingWhatsApp } from './components/common/FloatingWhatsApp';
import { PageTransitionManager } from './components/transitions/PageTransitionManager';
import { AutomotiveBackground } from './components/automotive/AutomotiveBackground';

// Pages
import { HomePage } from './pages/HomePage';
import { ServicesIndexPage } from './pages/ServicesIndexPage';
import { ServiceDetailPage } from './pages/ServiceDetailPage';
import { TransformationsPage } from './pages/TransformationsPage';
import { GalleryPage } from './pages/GalleryPage';
import { ProjectDetailPage } from './pages/ProjectDetailPage';
import { AboutPage } from './pages/AboutPage';
import { WhyChooseUsPage } from './pages/WhyChooseUsPage';
import { FaqPage } from './pages/FaqPage';
import { BookServicePage } from './pages/BookServicePage';
import { ContactPage } from './pages/ContactPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { NotFoundPage } from './pages/NotFoundPage';

export function App() {
  return (
    <Router>
      <div className="relative flex flex-col min-h-screen bg-carbon-900 text-pearl font-sans selection:bg-gold selection:text-ink overflow-x-hidden">
        {/* Dynamic Automotive Background (Spotlights, floating particles, carbon weave & blueprint grid) */}
        <AutomotiveBackground />

        {/* Global Navigation Header */}
        <Header />
        
        {/* 20 Distinct High-Impact Automotive Route Transitions */}
        <PageTransitionManager>
          {(displayLocation) => (
          <Routes location={displayLocation}>
            <Route path="/" element={<HomePage />} />
            <Route path="/services" element={<ServicesIndexPage />} />
            
            {/* 8 Dedicated Service Routes */}
            <Route path="/services/:serviceSlug" element={<ServiceDetailPage />} />
            
            {/* Transformations Before/After */}
            <Route path="/transformations" element={<TransformationsPage />} />
            
            {/* Gallery & Project Detail Dossiers */}
            <Route path="/our-work" element={<GalleryPage />} />
            <Route path="/our-work/:projectSlug" element={<ProjectDetailPage />} />
            
            {/* Core Narrative & Company Pages */}
            <Route path="/about" element={<AboutPage />} />
            <Route path="/why-choose-us" element={<WhyChooseUsPage />} />
            <Route path="/faq" element={<FaqPage />} />
            
            {/* Booking Wizard & WhatsApp Integration */}
            <Route path="/book-service" element={<BookServicePage />} />
            
            {/* Contact & Policy */}
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
            
            {/* 404 Wrong Turn */}
            <Route path="/404" element={<NotFoundPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
          )}
        </PageTransitionManager>

        <Footer />
        <FloatingWhatsApp />
      </div>
    </Router>
  );
}

export default App;
