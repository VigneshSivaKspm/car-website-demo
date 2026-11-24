# MM Next Level Car Care — Production Web Architecture

A modern automotive care, repair, restoration, and detailing web application for **MM Next Level Car Care, Coimbatore, Tamil Nadu, India**.

Inspired by luxury automotive engineering, restoration studio craftsmanship, and digital creative agency aesthetics.

---

## 🏎️ Architectural Highlights

- **Framework**: React 19 + TypeScript + Vite.
- **Styling**: Tailwind CSS with custom automotive design tokens (Carbon Black `#0B0C0E`, Champagne Gold `#C9A96A`, Metallic Charcoal, Blueprint grids, Studio vignettes).
- **Typography**: Barlow Condensed, Space Grotesk, Manrope, Inter.
- **Routing**: Genuine multi-page routing via React Router with full route transition engine (20 distinct automotive transitions matching destination routes).
- **Cinematic Hero**: Layered studio lighting, headlight illumination sequence, metallic sweeps, and HUD telemetry indicators.
- **Transformations**: Interactive Before-and-After slider supporting drag, touch, and keyboard interaction.
- **Gallery**: Bento / Masonry layout with 11 concept studies, category filtering, accessible lightbox viewer, and individual project dossiers.
- **8 Core Services**: Dedicated service pages with technical methodologies, 5-stage workflows, benefits, and auto-preselected booking CTAs.
- **Multi-Step Booking Wizard**: 4-step wizard (Vehicle &rarr; Service &rarr; Contact &rarr; Review & WhatsApp) with validation and copy fallback.
- **Configurable Integrity**: Centralized business configuration (`src/config/business.ts`) with no fake numbers, false addresses, or fabricated reviews.

---

## 🛠️ Routes Implemented

- `/` — Homepage (Hero sequence, 8-service showcase, before/after slider, philosophy, journey, gallery preview, FAQ preview)
- `/services` — All Services Overview
- `/services/car-painting` — Car Painting & Repainting
- `/services/body-repair` — Denting & Body Repair
- `/services/car-restoration` — Car Restoration
- `/services/mechanical-services` — Mechanical Services
- `/services/car-ac` — Car AC Services
- `/services/ceramic-coating` — Ceramic Coating & Paint Protection
- `/services/electrical-services` — Electrical & Electronic Services
- `/services/premium-detailing` — Premium Detailing
- `/transformations` — Interactive Vehicle Before-and-After Comparisons
- `/our-work` — Gallery of 11 Project Concepts with Lightbox
- `/our-work/:projectSlug` — Full Project Dossier & Telemetry
- `/about` — Workshop Craft Philosophy & History
- `/why-choose-us` — The 6 Foundational Pillars & 5-Step Journey
- `/faq` — Searchable Frequently Asked Questions
- `/book-service` — 4-Step Interactive Enquiry Wizard
- `/contact` — Workshop Location, Google Maps integration & direct contacts
- `/privacy-policy` — Data flow & WhatsApp transmission transparency
- `/404` — "Wrong Turn" automotive navigation 404 page

---

## 🚀 Setup & Execution

### 1. Install Dependencies
```bash
npm install
```

### 2. Development Server
```bash
npm run dev
```

### 3. Production Build
```bash
npm run build
```

### 4. Preview Production Build
```bash
npm run preview
```

### 5. Lint Verification
```bash
npm run lint
```

---

## 📋 Production Launch Checklist (Required Client Data)

Before publishing to production, configure the verified client details in `src/config/business.ts`:

1. **WhatsApp Business Phone Number**:
   - `whatsappNumber`: Set to e.g. `"919876543210"` (digits only with country code).
2. **Exact Workshop Address**:
   - `address`: Replace null with the verified physical street address in Coimbatore.
3. **Official Phone Line**:
   - `phone`: Direct workshop reception number.
4. **Official Email Address**:
   - `email`: e.g. `service@mmnextlevelcarcare.com`.
5. **Google Maps Share URL**:
   - `googleMapsUrl`: Exact location share link.
6. **Social Media Accounts**:
   - `instagramUrl` and `facebookUrl` when active.
7. **Operating Hours**:
   - `openingHours`: e.g. `"Monday – Saturday: 9:00 AM – 7:30 PM"`.
8. **Client Vehicle Photography**:
   - Swap demonstration concept imagery with authentic workshop photos as projects are signed off.
