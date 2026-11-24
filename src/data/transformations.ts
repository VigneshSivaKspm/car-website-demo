import type { TransformationItem } from '../types';
import { AUTOMOTIVE_ASSETS } from './assets';

export const TRANSFORMATIONS: TransformationItem[] = [
  {
    id: "t-01",
    slug: "sedan-full-repaint",
    title: "Executive Sedan Full Respray & Clear Coat Restoration",
    vehicle: "Executive Luxury Sedan",
    // 100% matching vehicle model & camera angle:
    beforeImage: AUTOMOTIVE_ASSETS.transformations.sedanBeforeWorn,
    afterImage: AUTOMOTIVE_ASSETS.transformations.sedanAfterGoldPearl,
    beforeLabel: "BEFORE · FADED, SWIRLED & WEATHERED",
    afterLabel: "AFTER · GOLD PEARL RESPREAY & 9H CERAMIC",
    workCompleted: "Multi-stage dent repair, primer sealing, gold-pearl mica respray, oven cure, 9H ceramic coating",
    services: ["Car Painting & Repainting", "Denting & Body Repair", "Ceramic Coating & Paint Protection"],
    summary: "Complete surface transformation: decades of UV oxidation, swirl haze, and stone chips eradicated, replaced with a mirror-finish champagne gold pearl clear coat.",
    craftNotes: [
      "All minor door dings and hail depressions leveled via precision panel beating.",
      "Complete chemical decontamination and micro-abrasive wet sanding of clear coat oxidation.",
      "Three coats of computerized gold-pearl mica basecoat followed by dual high-solids clear coats.",
      "Oven baked and cured, followed by two layers of 9H ceramic coating."
    ],
    isDemo: true
  },
  {
    id: "t-02",
    slug: "hood-paint-correction-ceramic",
    title: "Heavy Swirl Correction & Liquid Mirror Ceramic Coating",
    vehicle: "Performance Sports Coupe",
    beforeImage: AUTOMOTIVE_ASSETS.transformations.hoodBeforeSwirled,
    afterImage: AUTOMOTIVE_ASSETS.transformations.hoodAfterMirror,
    beforeLabel: "BEFORE · SWIRL HAZE & WATER SPOTS",
    afterLabel: "AFTER · 99% CORRECTION & CERAMIC GLOSS",
    workCompleted: "3-stage machine paint correction, alcohol IPA wipe, dual-layer 9H SiO2 ceramic armor",
    services: ["Premium Detailing", "Ceramic Coating & Paint Protection"],
    summary: "Eliminating severe washing brush scratches, holograms, and borewell water etchings to unlock true optical depth and razor-sharp reflections.",
    craftNotes: [
      "Paint thickness electronically measured at 12 points per panel to ensure clear coat safety.",
      "Heavy cut wool pad compounding with diminishing micro-abrasive technology.",
      "Secondary foam pad jeweling for high-definition clarity.",
      "Infrared baked ceramic coating providing long-term hydrophobic protection."
    ],
    isDemo: true
  },
  {
    id: "t-03",
    slug: "wheel-caliper-restoration",
    title: "Forged Alloy Wheel & Caliper Rejuvenation",
    vehicle: "Grand Tourer Wheel Assembly",
    beforeImage: AUTOMOTIVE_ASSETS.transformations.wheelBeforeGrime,
    afterImage: AUTOMOTIVE_ASSETS.transformations.wheelAfterCeramic,
    beforeLabel: "BEFORE · BAKED BRAKE DUST & TAR",
    afterLabel: "AFTER · POLISHED & CERAMIC ENCAPSULATED",
    workCompleted: "Iron fallout dissolution, high-pressure steam degreasing, hand polishing, high-temp wheel ceramic coating",
    services: ["Premium Detailing", "Mechanical Services"],
    summary: "Restoring diamond-cut alloy face and barrel from baked-on metallic brake dust and tropical road grime to pristine showroom brilliance.",
    craftNotes: [
      "pH-neutral acid-free iron decontamination solution dissolves sintered brake dust.",
      "Wheel removed, inner barrel and brake caliper steam cleansed.",
      "High-temp 1200°C wheel ceramic coating prevents future brake dust bonding."
    ],
    isDemo: true
  }
];
