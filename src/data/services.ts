import type { ServiceDetail } from '../types';
import { AUTOMOTIVE_ASSETS } from './assets';

export const SERVICES: ServiceDetail[] = [
  {
    id: "01",
    slug: "car-painting",
    title: "Car Painting & Repainting",
    shortTitle: "Car Painting",
    tagline: "Premium paint finishes, color restoration, and professional repainting.",
    description: "Multi-stage paint correction, computerized color formulation, downdraft spray booth application, and mirror-finish clear coats engineered for Coimbatore weather.",
    extendedDescription: "Automotive paint is more than just color — it is the primary shield protecting your vehicle's alloy and steel against tropical moisture, road grime, and harsh UV degradation. At MM Next Level Car Care, we treat painting as an exact science and fine art. From spot panels and stone-chip blending to complete bare-metal color transformations, our process uses high-grade basecoats, precision computerized spectrophotometer color matching, and premium ceramic-infused clear coats.",
    accentColor: "#C9A96A",
    category: "paint",
    heroImage: AUTOMOTIVE_ASSETS.services.painting,
    featuredImages: [
      AUTOMOTIVE_ASSETS.services.painting,
      AUTOMOTIVE_ASSETS.gallery.colourMatch,
      AUTOMOTIVE_ASSETS.gallery.goldPearlRespray,
    ],
    badge: "Master Spray Craft",
    features: [
      "Spectrophotometer computerized paint code & tint matching",
      "Dust-free downdraft heated spray booth baking",
      "Multi-stage high-solids polyurethane clear coats",
      "Precision panel feathering and anti-corrosion primer application",
      "Orange-peel reduction wet sanding and mirror finishing",
      "Complete vehicle color changes with door jambs and boot interiors"
    ],
    processSteps: [
      {
        number: "01",
        title: "Surface Decontamination & Prep",
        description: "Complete chemical wash, degreasing, and clay bar treatment to remove industrial fallout and road tar before any sanding begins."
      },
      {
        number: "02",
        title: "Substrate Correction & Priming",
        description: "Imperfections are leveled, high-build epoxy primer is applied to prevent rust creep, and guide coats ensure zero wave distortion."
      },
      {
        number: "03",
        title: "Computerized Color Formulation",
        description: "Paint codes and vehicle weathering are analyzed using precision optical tools to mix an exact factory or custom pearl hue."
      },
      {
        number: "04",
        title: "Downdraft Booth Application & Cure",
        description: "Basecoat and scratch-resistant clear coat are sprayed in a positive-pressure, filtered environment followed by controlled infrared curing."
      },
      {
        number: "05",
        title: "Color Sanding & Mirror Polish",
        description: "Micro-abrasive dry/wet finishing followed by progressive rotary and dual-action compounding for depth, clarity, and reflection."
      }
    ],
    benefits: [
      "OEM-grade gloss levels with zero peeling or cloudiness",
      "Superior resistance to Coimbatore's intense sun and monsoon moisture",
      "Seamless blending with adjoining original panels",
      "Restores resale value and showroom curb appeal"
    ],
    faq: [
      {
        question: "How do you ensure the repaint matches the rest of my car's weathered panels?",
        answer: "We never simply read the factory VIN color code. Vehicle paint naturally shifts with age and UV exposure in Tamil Nadu. We take spectrophotometer color readings directly from your car's adjacent panels and fine-tune tints under controlled daylight lamps before spraying."
      },
      {
        question: "How long should I wait before washing or waxing fresh paint?",
        answer: "While our booth curing fully bakes the clear coat for safe handling and driving within hours, paint continues to off-gas microscopic solvents for approximately 3 weeks. We advise gentle pH-neutral contact washing only and recommend waiting 30 days before applying waxes or sealants."
      }
    ],
    recommendedWith: ["body-repair", "ceramic-coating", "premium-detailing"]
  },
  {
    id: "02",
    slug: "body-repair",
    title: "Denting & Body Repair",
    shortTitle: "Body Repair",
    tagline: "Precision bodywork to restore your vehicle's original appearance.",
    description: "Specialized metal working, panel beating, Paintless Dent Removal (PDR) assessment, and laser-straight alignment for body lines and door gaps.",
    extendedDescription: "A dent isn't just cosmetic; it stretches sheet metal, compromises protective undercoatings, and disrupts vehicle aerodynamics and styling lines. MM Next Level Car Care focuses on genuine metal craftsmanship. Where possible, we massage dents from behind panels to conserve original factory paint. When structural or heavier cosmetic work is necessary, we reform contours, reconstruct bumpers, and ensure precision panel gaps that line up exactly with OEM tolerances.",
    accentColor: "#2F2F33",
    category: "body",
    heroImage: AUTOMOTIVE_ASSETS.services.bodyRepair,
    featuredImages: [
      AUTOMOTIVE_ASSETS.services.bodyRepair,
      AUTOMOTIVE_ASSETS.gallery.dentRepair,
      AUTOMOTIVE_ASSETS.gallery.bumperRebuild,
    ],
    badge: "Structural Alignment",
    features: [
      "Paintless Dent Removal (PDR) evaluation for door dings and hail marks",
      "Precision stud-welder dent pulling for enclosed double-wall panels",
      "Thermoplastic bumper welding and crack reconstruction",
      "Strict panel gap and body line alignment measurement",
      "Anti-rust zinc primer protection behind repaired inner arches",
      "Fender, bonnet, tailgate, and quarter panel contour restoration"
    ],
    processSteps: [
      {
        number: "01",
        title: "Damage & Line Inspection",
        description: "Assessing depth of metal stretch, access points behind panels, and structural alignment lines under specialized line boards."
      },
      {
        number: "02",
        title: "Access & Metal Reshaping",
        description: "Skilled metalworkers gently manipulate the deformed substrate using specialized dollies, spoons, or precision pulling studs."
      },
      {
        number: "03",
        title: "Panel Gap Calibration",
        description: "Checking uniform clearances between doors, wings, hood, and headlights to ensure seamless closure and original factory acoustics."
      },
      {
        number: "04",
        title: "Anti-Corrosion Under-Seal",
        description: "Application of inner-cavity wax and anti-corrosive primers to shield stressed bare metal from Coimbatore moisture."
      }
    ],
    benefits: [
      "Maintains the structural integrity and aerodynamic poise of your car",
      "Preserves original vehicle value without excessive filler usage",
      "Seamless door closes and uniform panel gaps",
      "Prevents hidden rust from forming along stressed metal seams"
    ],
    faq: [
      {
        question: "Can all dents be fixed without repainting?",
        answer: "If the factory paint is unbroken and the metal has not severely creased or stretched beyond elastic memory, Paintless Dent Removal (PDR) can often restore the panel. If the paint has chipped or cracked, conventional metal reforming followed by precision spot repainting is required."
      },
      {
        question: "Do you repair cracked fiberglass or plastic bumpers?",
        answer: "Yes, we utilize specialized plastic nitrogen welding and reinforced structural bonding to repair bumper cracks, broken tabs, and scuffs rather than forcing unnecessary part replacements."
      }
    ],
    recommendedWith: ["car-painting", "ceramic-coating"]
  },
  {
    id: "03",
    slug: "car-restoration",
    title: "Car Restoration",
    shortTitle: "Car Restoration",
    tagline: "Complete restoration services for vehicles that deserve a second life.",
    description: "Full strip-down automotive rebirth, vintage & modern-classic restoration, mechanical overhaul, rust remediation, and timeless interior craftsmanship.",
    extendedDescription: "Some cars are not just machines; they are family heirlooms, beloved classics, or modern legends that have weathered decades on the road. Car restoration at MM Next Level Car Care is an uncompromising labor of dedication. We take vehicles back to their fundamentals: stripping tired paint, arresting hidden corrosion, rebuilding engines, refurbishing mechanicals, and stitching handcrafted upholstery.",
    accentColor: "#3D2B22",
    category: "restoration",
    heroImage: AUTOMOTIVE_ASSETS.services.restoration,
    featuredImages: [
      AUTOMOTIVE_ASSETS.services.restoration,
      AUTOMOTIVE_ASSETS.gallery.classicRevival,
      AUTOMOTIVE_ASSETS.gallery.panelRestoration,
    ],
    badge: "Heritage Reborn",
    features: [
      "Complete vehicle disassembly, photographic cataloging & staging",
      "Chassis and undercarriage rust treatment and epoxy sealing",
      "Engine bay wire tucking, mechanical refresh & carburetor/injection tuning",
      "Suspension bush, damper, and steering assembly rebuilds",
      "Custom leather, Alcantara, and period-correct fabric upholstery renewal",
      "Brightwork, chrome polishing, and bespoke hardware replating"
    ],
    processSteps: [
      {
        number: "01",
        title: "Disassembly & Condition Audit",
        description: "Every trim, harness, glass, and fastener is carefully labeled, photographed, and assessed for salvageability or replacement."
      },
      {
        number: "02",
        title: "Chassis & Metal Rejuvenation",
        description: "Corroded floor pans, rocker panels, and arches are cut clean, fresh steel is TIG-welded, and zinc-rich coatings are sealed."
      },
      {
        number: "03",
        title: "Mechanical & Powertrain Rebuild",
        description: "Engines, gearboxes, brakes, and cooling loops undergo comprehensive overhaul with genuine or bespoke fabricated components."
      },
      {
        number: "04",
        title: "Show-Quality Paint Finish",
        description: "Multi-layer primer, sealer, period-accurate basecoats, and modern high-solid clears baked to deep mirror perfection."
      },
      {
        number: "05",
        title: "Trim Fitting & Shakedown Runs",
        description: "Reassembly with fresh rubber weatherstrips, interior sound deadening, and rigorous road testing before client delivery."
      }
    ],
    benefits: [
      "Breathes decades of new life into vintage, classic, or sentimental vehicles",
      "Comprehensive rust proofing engineered for Indian climate longevity",
      "Modern reliability infused with classic mechanical character",
      "A documented, transparent restoration story from start to finish"
    ],
    faq: [
      {
        question: "How long does a full vehicle restoration typically take?",
        answer: "Restoration timelines depend entirely on parts availability, metal condition, and project scope. Minor cosmetic/mechanical restorations may take several weeks, while full ground-up rotisserie projects require dedicated months. We provide structured progress milestones and photo updates throughout."
      },
      {
        question: "Do you restore modern cars as well as vintage classics?",
        answer: "Yes. From 1980s and 90s modern classics to 10-year-old sedans and SUVs that require comprehensive rejuvenation, our workshop handles modern classics with the exact same dedication as vintage collector cars."
      }
    ],
    recommendedWith: ["car-painting", "mechanical-services", "premium-detailing"]
  },
  {
    id: "04",
    slug: "mechanical-services",
    title: "Mechanical Services",
    shortTitle: "Mechanical Services",
    tagline: "Reliable mechanical inspection, repair, and maintenance.",
    description: "Engine diagnostics, precision suspension tuning, brake overhauls, transmission fluid exchanges, and preventative maintenance for dependable driving.",
    extendedDescription: "A gorgeous vehicle must drive as flawlessly as it looks. At MM Next Level Car Care, our mechanical department operates with surgical discipline. We believe in diagnostics before guesswork. From regular periodic servicing and fluid exchanges using manufacturer-approved grades, to brake disc skimming, clutch replacements, and complete suspension rebuilds, we ensure your vehicle operates smoothly and safely on Coimbatore roads.",
    accentColor: "#25282C",
    category: "workshop",
    heroImage: AUTOMOTIVE_ASSETS.services.mechanical,
    featuredImages: [
      AUTOMOTIVE_ASSETS.services.mechanical,
      AUTOMOTIVE_ASSETS.gallery.bayAtWork,
      AUTOMOTIVE_ASSETS.workshop.technicianTools,
    ],
    badge: "Precision Engineering",
    features: [
      "Comprehensive multi-point vehicle health & safety inspection",
      "Engine oil, transmission, coolant, and brake fluid laboratory-grade exchange",
      "Brake pad, rotor, caliper overhaul, and hydraulic pressure testing",
      "Suspension strut, lower arm, ball joint, and steering rack rebuilds",
      "Clutch plate, flywheel, and drive belt replacements",
      "Exhaust, intake, and fuel injection system decarbonization"
    ],
    processSteps: [
      {
        number: "01",
        title: "Intake Inspection & Diagnostic Test",
        description: "Digital scanning, underbody hoist examination, suspension bushing play check, and test drive evaluation."
      },
      {
        number: "02",
        title: "Transparent Discussion & Estimate",
        description: "Clear explanation of required repairs versus preventative items with zero surprise fees or unapproved part swaps."
      },
      {
        number: "03",
        title: "Surgical Mechanical Execution",
        description: "Work carried out using calibrated torque wrenches, specialized pullers, and OEM/OEM-equivalent replacement parts."
      },
      {
        number: "04",
        title: "Road Testing & Verification",
        description: "Real-world road testing over varied surfaces to verify alignment, braking balance, and NVH dampening."
      }
    ],
    benefits: [
      "Restores smooth engine refinement and crisp throttle response",
      "Eliminates suspension rattles, squeaks, and unstable high-speed float",
      "Guaranteed braking confidence in emergency urban and highway stops",
      "Prevents catastrophic breakdowns through timely preventative care"
    ],
    faq: [
      {
        question: "What brand of engine oils and fluids do you use?",
        answer: "We strictly utilize synthetic and semi-synthetic fluids matching the specific manufacturer viscosity index and API/ACEA specifications recommended for your exact vehicle make and model."
      },
      {
        question: "Can I bring my vehicle for routine periodic servicing here?",
        answer: "Yes, our periodic maintenance service includes comprehensive oil changes, air and fuel filter replacements, brake inspection, undercarriage torque check, fluid top-offs, and computer diagnostics."
      }
    ],
    recommendedWith: ["car-ac", "electrical-services", "body-repair"]
  },
  {
    id: "05",
    slug: "car-ac",
    title: "Car AC Services",
    shortTitle: "Car AC Services",
    tagline: "AC diagnosis, servicing, and cooling system maintenance.",
    description: "Rapid cooling restoration, vacuum leak testing, condenser deep-cleaning, evaporator disinfection, and refrigerant gas replenishment for tropical comfort.",
    extendedDescription: "Coimbatore heat and humidity demand an air conditioning system operating at peak thermal efficiency. Weak cooling, foul odors, or strange hissing sounds often indicate compromised refrigerant levels, clogged cabin filters, or bacterial buildup inside the cooling coil. MM Next Level Car Care diagnoses car AC systems using specialized manifold gauges, electronic sniffing tools, and ultrasonic evaporative cleaning.",
    accentColor: "#1F2E33",
    category: "workshop",
    heroImage: AUTOMOTIVE_ASSETS.services.ac,
    featuredImages: [
      AUTOMOTIVE_ASSETS.services.ac,
      AUTOMOTIVE_ASSETS.gallery.bayAtWork,
      AUTOMOTIVE_ASSETS.services.electrical,
    ],
    badge: "Climate Perfection",
    features: [
      "Precision nitrogen and vacuum pressure decay leak testing",
      "Automated R134a / R1234yf refrigerant recovery, recycling & charging",
      "Compressor clutch, solenoid valve, and bearing inspection",
      "Condenser fin ultrasonic descaling and airflow restoration",
      "Cooling coil (evaporator) anti-bacterial cleaning without dashboard removal where possible",
      "Cabin air pollen filter replacement and duct sterilization"
    ],
    processSteps: [
      {
        number: "01",
        title: "Thermal Vent & Pressure Baseline",
        description: "Digital probe temperature reading at air vents combined with high/low pressure manifold gauge diagnostics."
      },
      {
        number: "02",
        title: "Vacuum Leak Detection",
        description: "System evacuation to -30 inHg to eliminate moisture and verify that O-rings, hoses, and condenser maintain airtight seal."
      },
      {
        number: "03",
        title: "Compressor Oil & Refrigerant Charge",
        description: "Addition of fresh PAG compressor lubricant followed by exact weight-metered refrigerant charging."
      },
      {
        number: "04",
        title: "Evaporator Sanitization & Deodorization",
        description: "Eliminating mildew, mold, and tobacco residues from ductwork to ensure fresh, crisp cabin airflow."
      }
    ],
    benefits: [
      "Ice-cold cabin temperatures within seconds of turning on the AC",
      "Removal of stale, sour, and musty odors from ventilation ducts",
      "Reduced engine drag and improved fuel efficiency from a healthy compressor",
      "Quiet, vibration-free blower and climate control operation"
    ],
    faq: [
      {
        question: "Why does my car AC blow warm air while stopped in traffic but cold while driving?",
        answer: "This is usually caused by an inoperative condenser radiator cooling fan, a condenser blocked with dirt/road debris, or low refrigerant levels that fail to transfer heat adequately at engine idle."
      },
      {
        question: "How often should car AC gas be refilled?",
        answer: "An automotive AC system is a closed loop; if refrigerant is low, it almost always signifies a microscopic leak in an O-ring, valve, or condenser seam. We always locate and seal the leak before recharging."
      }
    ],
    recommendedWith: ["mechanical-services", "electrical-services", "premium-detailing"]
  },
  {
    id: "06",
    slug: "ceramic-coating",
    title: "Ceramic Coating & Paint Protection",
    shortTitle: "Ceramic Coating",
    tagline: "Protect your vehicle's finish and enhance its gloss.",
    description: "9H nanotechnology ceramic shields, multi-year hydrophobicity, ultra-deep gloss enhancement, and protection against bird strikes, borewell water spots, and UV fading.",
    extendedDescription: "True ceramic coating is not a temporary wax or polymer sealant; it is a permanent liquid silica (SiO2/SiC) matrix that molecularly bonds to your car's clear coat. At MM Next Level Car Care, we never apply ceramic coating over flawed paint. We spend 70% of the project time in clinical multi-stage paint correction to eliminate swirl marks, holograms, and oxidation. The result is a rock-hard, hydrophobic armor with mesmerizing liquid-candy reflection.",
    accentColor: "#C9A96A",
    category: "detailing",
    heroImage: AUTOMOTIVE_ASSETS.services.ceramic,
    featuredImages: [
      AUTOMOTIVE_ASSETS.services.ceramic,
      AUTOMOTIVE_ASSETS.gallery.ceramicGloss,
      AUTOMOTIVE_ASSETS.gallery.showroomFinish,
    ],
    badge: "Hydrophobic Armor",
    features: [
      "Multi-stage machine paint correction to eliminate up to 90%+ of swirls",
      "Molecular SiO2/SiC 9H ceramic matrix cross-linking with clear coat",
      "Ultra-hydrophobic contact angle (110°+) causing water and mud to sheet off effortlessly",
      "Protection against harsh Coimbatore hard water marks and borewell mineral etching",
      "Extreme UV resistance preventing clear coat clouding and color fade",
      "Dedicated wheel rim ceramic protection and windshield glass rain repellent"
    ],
    processSteps: [
      {
        number: "01",
        title: "Intensive Chemical Decontamination",
        description: "pH-neutral snow foam, iron-remover fall-out spray, and grade-fine synthetic clay bar purification."
      },
      {
        number: "02",
        title: "Multi-Stage Paint Correction",
        description: "Rotary and dual-action machine polishing with micro-abrasive pads to eliminate scratches, swirls, and haze."
      },
      {
        number: "03",
        title: "IPA Alcohol Wipe-down",
        description: "Stripping all polishing oils and residue so the bare clear coat is 100% sterile for true ceramic cross-linking."
      },
      {
        number: "04",
        title: "Layered Ceramic Application",
        description: "Hand-applied panel by panel with cross-hatch strokes, timed flash-off monitoring, and plush microfiber leveling."
      },
      {
        number: "05",
        title: "Infrared Curing Inspection",
        description: "Shortwave infrared lamp baking ensures rapid initial crystallization before release into ambient humidity."
      }
    ],
    benefits: [
      "Incredible wet-look gloss that turns heads on every drive",
      "Wash your car in half the time — dirt slides off with gentle rinsing",
      "Protects paintwork against acidic bird droppings and tree sap",
      "Maintains showroom finish year after year with minimal effort"
    ],
    faq: [
      {
        question: "Does ceramic coating make my car 100% scratch-proof?",
        answer: "No protective coating is scratch-proof against intentional stone strikes or harsh dry-cloth wiping. Ceramic coating provides sacrificial micro-scratch resistance, makes the surface significantly slicker, and prevents washing swirls while providing world-class chemical and UV protection."
      },
      {
        question: "How do I maintain my car after ceramic coating?",
        answer: "We recommend a two-bucket contact wash using pH-neutral automotive shampoo, avoiding harsh alkaline automatic brushes, and drying with a soft twisted-loop microfiber towel."
      }
    ],
    recommendedWith: ["car-painting", "premium-detailing"]
  },
  {
    id: "07",
    slug: "electrical-services",
    title: "Electrical & Electronic Services",
    shortTitle: "Electrical Services",
    tagline: "Electrical diagnostics, wiring, central locking, and related services.",
    description: "Advanced OBD-II computer diagnostics, sensor calibration, wiring harness restoration, starter/alternator repairs, and precision accessory integration.",
    extendedDescription: "Modern automobiles are networks of sophisticated microprocessors, CAN-bus communication channels, sensors, and high-amperage electrical circuits. When an electrical fault occurs, guessing can cause costly control module failures. MM Next Level Car Care utilizes high-end diagnostic scan tools, digital multimeters, and automotive oscilloscopes to trace faults, repair wiring harnesses, restore power windows, and troubleshoot charging systems.",
    accentColor: "#2A2A2A",
    category: "workshop",
    heroImage: AUTOMOTIVE_ASSETS.services.electrical,
    featuredImages: [
      AUTOMOTIVE_ASSETS.services.electrical,
      AUTOMOTIVE_ASSETS.hero.carbonInterior,
      AUTOMOTIVE_ASSETS.services.mechanical,
    ],
    badge: "Digital Precision",
    features: [
      "Comprehensive multi-system OBD-II diagnostic scanning & DTC fault decoding",
      "Alternator charging voltage output and starter motor cranking draw test",
      "Automotive battery conductance and health analysis",
      "Power window regulator, central locking, and actuator restoration",
      "Headlamp beam leveling, relay wiring, and LED upgrade harness optimization",
      "Engine bay wire rodent damage repair and heat-shrink protective looming"
    ],
    processSteps: [
      {
        number: "01",
        title: "Computer Diagnostic Scan",
        description: "Interrogating ECU, BCM, ABS, and SRS modules for current and historical trouble codes."
      },
      {
        number: "02",
        title: "Live Data & Schematic Verification",
        description: "Checking sensor inputs, circuit resistance, voltage drop, and ground paths against wiring diagrams."
      },
      {
        number: "03",
        title: "OEM-Standard Repair & Soldering",
        description: "Using solder-sealed crimps, flame-retardant automotive split loom, and weather-pack moisture connectors."
      },
      {
        number: "04",
        title: "System Reset & Adaptations",
        description: "Clearing verified DTCs, performing throttle/steering angle adaptions, and full functional testing."
      }
    ],
    benefits: [
      "Accurate root-cause resolution without replacing expensive parts unnecessarily",
      "Safe, fire-resistant wiring practices adhering to automotive standards",
      "Restores reliability of central locking, power windows, and lighting",
      "Prevents unexpected roadside battery draining and no-start situations"
    ],
    faq: [
      {
        question: "Why is my Check Engine Light on if the car feels like it is driving normally?",
        answer: "A Check Engine Light indicates an emissions, sensor, or powertrain discrepancy logged by the ECU. Even if you don't feel a misfire yet, ignoring it can damage oxygen sensors, reduce fuel mileage, or lead to catalytic converter failure. We pull live telemetry to tell you exactly what is happening."
      },
      {
        question: "Can you fix wiring damaged by rodents or rats?",
        answer: "Yes, rodent damage to engine harnesses is common. We trace bitten conductors, splice and solder according to OEM resistance standards, and reinstall reinforced corrugated tubing."
      }
    ],
    recommendedWith: ["mechanical-services", "car-ac"]
  },
  {
    id: "08",
    slug: "premium-detailing",
    title: "Premium Detailing",
    shortTitle: "Premium Detailing",
    tagline: "Professional cleaning, polishing, and exterior/interior detailing.",
    description: "Deep luxury interior rejuvenation, leather feeding, multi-stage exterior foam washing, engine bay dressing, and perfectionist finishing for automotive connoisseurs.",
    extendedDescription: "Detailing is not a hurried 20-minute car wash; it is the systematic art of restoring every surface of a vehicle to its cleanest, most pristine state. From conditioning fine European nappa leather and vacuuming microscopic crevices to deep-cleaning wheel barrels and gloss-enhancing tired paint, our premium detailing service leaves your automobile smelling fresh, feeling immaculate, and looking breathtaking.",
    accentColor: "#3B3326",
    category: "detailing",
    heroImage: AUTOMOTIVE_ASSETS.services.detailing,
    featuredImages: [
      AUTOMOTIVE_ASSETS.services.detailing,
      AUTOMOTIVE_ASSETS.gallery.paintCorrection,
      AUTOMOTIVE_ASSETS.hero.carbonInterior,
    ],
    badge: "Immaculate Finish",
    features: [
      "Touchless pre-wash and two-bucket pH-neutral microfiber foam wash",
      "Alloy wheel face, barrel, brake caliper, and arch degreasing",
      "Steam cleaning and antimicrobial extraction for carpets and headliners",
      "pH-balanced leather cleansing, deep conditioning, and matte UV sealant",
      "Exterior rubber, trim, and plastic hydrophobic satin restoration",
      "Engine bay safe steam cleaning, degreasing, and non-greasy dressing"
    ],
    processSteps: [
      {
        number: "01",
        title: "Deep Exterior Decontamination",
        description: "High-lubricity foam soak to encapsulate road grit before gentle contact washing, followed by rim and barrel cleaning."
      },
      {
        number: "02",
        title: "Crevice & Emblem Brushing",
        description: "Boar-hair and ultra-soft synthetic brushes clean window sills, badge lettering, grilles, and fuel filler pockets."
      },
      {
        number: "03",
        title: "Interior Purge & Steam Extraction",
        description: "Deep vacuuming, high-temp steam cleaning of vents, and hot-water injection extraction on fabric mats and carpets."
      },
      {
        number: "04",
        title: "Leather & Vinyl Conditioning",
        description: "Feeding essential oils into leather to prevent cracking, leaving a non-greasy, OEM satin matte feel."
      },
      {
        number: "05",
        title: "Glass Clarity & Final Dressing",
        description: "Streak-free interior/exterior glass cleaning, tire dressing with zero sling, and final inspection under high-CRI inspection lights."
      }
    ],
    benefits: [
      "Eliminates 99% of interior bacteria, dust mites, and persistent allergens",
      "Restores the rich, supple feel and scent of genuine automotive leather",
      "Leaves paint with deep gloss and slick surface protection",
      "Ensures crystal-clear glass visibility during rainy night drives"
    ],
    faq: [
      {
        question: "How long does a comprehensive premium detailing session take?",
        answer: "A true premium exterior and interior detailing service takes anywhere between 6 to 12 hours depending on vehicle size and starting condition. We do not rush through the details."
      },
      {
        question: "Will interior detailing leave my car smelling like artificial chemicals?",
        answer: "Never. We use premium water-based, pH-balanced European and Japanese cleaning solutions that eliminate odor-causing bacteria rather than masking them with overpowering artificial perfumes."
      }
    ],
    recommendedWith: ["ceramic-coating", "car-painting"]
  }
];

export const getServiceBySlug = (slug: string): ServiceDetail | undefined => {
  return SERVICES.find(s => s.slug === slug);
};
