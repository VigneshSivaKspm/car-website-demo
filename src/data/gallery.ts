import type { GalleryProject, GalleryCategory } from '../types';
import { AUTOMOTIVE_ASSETS } from './assets';

export const GALLERY_CATEGORIES: { id: GalleryCategory; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'paint', label: 'Paint' },
  { id: 'restoration', label: 'Restoration' },
  { id: 'detailing', label: 'Detailing' },
  { id: 'body', label: 'Body Repairs' },
  { id: 'premium', label: 'Premium Vehicles' },
  { id: 'workshop', label: 'Workshop' },
];

export const GALLERY_PROJECTS: GalleryProject[] = [
  {
    id: "g-01",
    slug: "gold-pearl-respray",
    title: "Gold Pearl Respray",
    category: "paint",
    categoryLabel: "Paint",
    aspectClass: "wide",
    image: AUTOMOTIVE_ASSETS.gallery.goldPearlRespray,
    accentColor: "#4A3B1F",
    isDemo: true,
    summary: "Complete multi-stage custom pearl respray with deep optical gold reflections.",
    details: {
      vehicleType: "Executive Sedan",
      servicesRendered: ["Car Painting & Repainting", "Ceramic Coating", "Body Repair"],
      timeline: "7 Days",
      craftHighlights: [
        "Computerized gold mica pearl formulation",
        "Dual polyurethane high-solids clear coat baking",
        "Elimination of all factory surface orange peel"
      ],
      description: "A comprehensive paint transformation project showcasing high-solids metallic mica formulation. The car underwent full body strip-down, surface leveling, 3 coats of base pearl, and an oven-cured high-solids clear coat finished with a surgical mirror wet sand."
    }
  },
  {
    id: "g-02",
    slug: "panel-restoration",
    title: "Panel Restoration",
    category: "restoration",
    categoryLabel: "Restoration",
    aspectClass: "tall",
    image: AUTOMOTIVE_ASSETS.gallery.panelRestoration,
    accentColor: "#3D2B22",
    isDemo: true,
    summary: "Precision sheet metal reforming and rust remediation on classic curved body panels.",
    details: {
      vehicleType: "Heritage Touring Car",
      servicesRendered: ["Car Restoration", "Denting & Body Repair"],
      timeline: "14 Days",
      craftHighlights: [
        "TIG-welded patch panels for floor arches",
        "Lead wiping and metal hammer finish",
        "Zinc-rich epoxy primer encapsulation"
      ],
      description: "Restoring aged bodywork without losing the original metal integrity. Corroded floor pans and outer door skins were meticulously cut back, fresh steel formed by hand, and welded with precision to ensure exact gap tolerances."
    }
  },
  {
    id: "g-03",
    slug: "paint-correction",
    title: "Paint Correction",
    category: "detailing",
    categoryLabel: "Detailing",
    aspectClass: "normal",
    image: AUTOMOTIVE_ASSETS.gallery.paintCorrection,
    accentColor: "#33322F",
    isDemo: true,
    summary: "Multi-stage rotary and dual-action compounding eliminating 90%+ swirls and water spots.",
    details: {
      vehicleType: "Sports Coupe",
      servicesRendered: ["Premium Detailing", "Ceramic Coating"],
      timeline: "2 Days",
      craftHighlights: [
        "Paint depth gauge digital mapping across all panels",
        "Compound cut with micro-abrasive diminishing particles",
        "Jeweling polish for extreme optical clarity"
      ],
      description: "Severe dealership wash scratches and mineral water spots were eradicated using a 3-step paint correction process, restoring true depth and mirror reflections to the dark clear coat."
    }
  },
  {
    id: "g-04",
    slug: "dent-repair",
    title: "Dent Repair",
    category: "body",
    categoryLabel: "Body Repairs",
    aspectClass: "normal",
    image: AUTOMOTIVE_ASSETS.gallery.dentRepair,
    accentColor: "#2F2F33",
    isDemo: true,
    summary: "Precision panel beating and stud dent pulling restoring factory body lines.",
    details: {
      vehicleType: "Compact SUV",
      servicesRendered: ["Denting & Body Repair"],
      timeline: "3 Days",
      craftHighlights: [
        "Specialized body line reflector verification",
        "Controlled stud welding along reinforced creases",
        "Micro-filler feathering under infrared lamp"
      ],
      description: "Impact along the lower passenger door crease was pulled out without distorting the door inner intrusion beams, followed by exact contour restoration matching the vehicle's factory stance."
    }
  },
  {
    id: "g-05",
    slug: "showroom-finish",
    title: "Showroom Finish",
    category: "premium",
    categoryLabel: "Premium Vehicles",
    aspectClass: "tall",
    image: AUTOMOTIVE_ASSETS.gallery.showroomFinish,
    accentColor: "#262626",
    isDemo: true,
    summary: "Comprehensive multi-point exterior and interior detailing for luxury vehicles.",
    details: {
      vehicleType: "Luxury Grand Tourer",
      servicesRendered: ["Premium Detailing", "Ceramic Coating", "Mechanical Services"],
      timeline: "4 Days",
      craftHighlights: [
        "Wheel face, barrel, and caliper ceramic encapsulation",
        "Nappa leather steam purification and satin conditioning",
        "Engine bay carbon fiber and rubber dressing"
      ],
      description: "A masterclass in automotive presentation. Every square inch of the vehicle — from suspension arms behind alloy wheels to leather stitching on the console — was brought to concours standard."
    }
  },
  {
    id: "g-06",
    slug: "ceramic-gloss",
    title: "Ceramic Gloss",
    category: "detailing",
    categoryLabel: "Detailing",
    aspectClass: "wide",
    image: AUTOMOTIVE_ASSETS.gallery.ceramicGloss,
    accentColor: "#43391F",
    isDemo: true,
    summary: "9H nanotechnology ceramic shield delivering mesmerizing hydrophobic beading.",
    details: {
      vehicleType: "Performance Hatchback",
      servicesRendered: ["Ceramic Coating & Paint Protection"],
      timeline: "3 Days",
      craftHighlights: [
        "110-degree water contact angle verification",
        "Double-layer 9H SiO2 ceramic application",
        "Windshield hydrophobic glass bonding"
      ],
      description: "Applied in a climate-controlled detailing bay with infrared curing. The resulting coating creates extreme surface slickness, making washing effortless while protecting against harsh Coimbatore mineral water."
    }
  },
  {
    id: "g-07",
    slug: "bay-at-work",
    title: "Bay at Work",
    category: "workshop",
    categoryLabel: "Workshop",
    aspectClass: "normal",
    image: AUTOMOTIVE_ASSETS.gallery.bayAtWork,
    accentColor: "#25282C",
    isDemo: true,
    summary: "Active workshop diagnostics, precision hoist lifting, and systematic technician care.",
    details: {
      vehicleType: "Workshop Facility",
      servicesRendered: ["Mechanical Services", "Car AC Services", "Electrical Services"],
      timeline: "Ongoing",
      craftHighlights: [
        "Calibrated torque tools and hydraulic lift safety",
        "Digital OBD-II diagnostic interrogation stations",
        "Dedicated clean areas for electrical and AC servicing"
      ],
      description: "An authentic glimpse into our daily workflow: organized tool trolleys, illuminated bays, and technicians focused on diagnosing root causes rather than temporary patches."
    }
  },
  {
    id: "g-08",
    slug: "classic-revival",
    title: "Classic Revival",
    category: "restoration",
    categoryLabel: "Restoration",
    aspectClass: "normal",
    image: AUTOMOTIVE_ASSETS.gallery.classicRevival,
    accentColor: "#3A2A20",
    isDemo: true,
    summary: "Mechanical overhaul, brightwork polishing, and sympathetic restoration of a vintage icon.",
    details: {
      vehicleType: "Vintage Roadster",
      servicesRendered: ["Car Restoration", "Mechanical Services", "Car Painting & Repainting"],
      timeline: "45 Days",
      craftHighlights: [
        "Carburetor sync and ignition timing calibration",
        "Period-authentic coachwork refinishing",
        "Original chrome brightwork re-polishing"
      ],
      description: "Preserving historical character while rebuilding mechanical reliability. Wiring harnesses were carefully routed, suspension components refreshed, and engine compression restored to optimal performance."
    }
  },
  {
    id: "g-09",
    slug: "midnight-black",
    title: "Midnight Black",
    category: "premium",
    categoryLabel: "Premium Vehicles",
    aspectClass: "normal",
    image: AUTOMOTIVE_ASSETS.gallery.midnightBlack,
    accentColor: "#1C1C1E",
    isDemo: true,
    summary: "Obsidian deep-black paint refinement with zero swirl interference or clouding.",
    details: {
      vehicleType: "Flagship Luxury Saloon",
      servicesRendered: ["Premium Detailing", "Ceramic Coating"],
      timeline: "3 Days",
      craftHighlights: [
        "Deep black jetting with optical gloss enhancement",
        "Piano black pillar and trim scratch eradication",
        "Extreme depth of reflection under direct sunlight"
      ],
      description: "Black paint is notoriously unforgiving. Our multi-stage compounding eradicated wash trails and buffer trails, leaving a flawless liquid-mirror surface that absorbs light like obsidian."
    }
  },
  {
    id: "g-10",
    slug: "colour-match",
    title: "Colour Match",
    category: "paint",
    categoryLabel: "Paint",
    aspectClass: "wide",
    image: AUTOMOTIVE_ASSETS.gallery.colourMatch,
    accentColor: "#3B3326",
    isDemo: true,
    summary: "Spectrophotometer computerized tint matching seamlessly blending with aged factory panels.",
    details: {
      vehicleType: "Crossover SUV",
      servicesRendered: ["Car Painting & Repainting", "Denting & Body Repair"],
      timeline: "4 Days",
      craftHighlights: [
        "Digitally measured paint flake distribution",
        "Feathered edge blending across door panels",
        "Zero color difference under artificial and natural daylight"
      ],
      description: "When only one fender or quarter panel is repaired, amateur paintwork sticks out immediately. We calibrated our formula to match the subtle aging of the vehicle's original finish with undetectable transitions."
    }
  },
  {
    id: "g-11",
    slug: "bumper-rebuild",
    title: "Bumper Rebuild",
    category: "body",
    categoryLabel: "Body Repairs",
    aspectClass: "normal",
    image: AUTOMOTIVE_ASSETS.gallery.bumperRebuild,
    accentColor: "#2C2C30",
    isDemo: true,
    summary: "Plastic nitrogen welding, cracked tab repair, and smooth aerodynamic refitting.",
    details: {
      vehicleType: "Sedan",
      servicesRendered: ["Denting & Body Repair", "Car Painting & Repainting"],
      timeline: "3 Days",
      craftHighlights: [
        "Thermoplastic fusion welding of structural cracks",
        "Reinforced backing brackets for parking sensor mounts",
        "OEM flex-agent primer to prevent future paint cracking"
      ],
      description: "Rather than burdening the customer with the high cost of a complete OEM replacement bumper, we welded the split plastic tabs, restored the impact structure, and refinished the skin to factory standard."
    }
  }
];

export const getGalleryProjectBySlug = (slug: string): GalleryProject | undefined => {
  return GALLERY_PROJECTS.find(p => p.slug === slug);
};
