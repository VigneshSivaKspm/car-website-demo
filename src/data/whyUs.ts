import type { WhyUsPoint, ServiceJourneyStep } from '../types';

export const WHY_CHOOSE_US_POINTS: WhyUsPoint[] = [
  {
    id: "technicians",
    iconName: "users",
    title: "Skilled Technicians",
    tagline: "Hands that know the difference between fixed and finished.",
    description: "Our technicians aren't hurried line workers; they are automotive craftsmen who take pride in precision tolerances, clean welds, and flawless paint leveling.",
    craftDetail: "Every vehicle is supervised by senior automotive specialists with years of hands-on experience in sheet metal, electronics, and spray booth chemistry."
  },
  {
    id: "materials",
    iconName: "layers",
    title: "Quality Materials",
    tagline: "Paints, coatings and parts chosen to last, not just to pass.",
    description: "We use high-grade European basecoats, high-solid clear coats, authentic 9H nano-ceramics, and OEM-spec fluids designed to withstand tropical Indian heat and monsoons.",
    craftDetail: "Zero dilution, zero counterfeit components, and zero shortcut fillers that wash away after two rainstorms."
  },
  {
    id: "detail",
    iconName: "eye",
    title: "Attention to Every Detail",
    tagline: "The panel gaps, the edges, the corners nobody checks.",
    description: "We inspect the hidden zones: door shut edges, boot gutters, wiring harnesses beneath split loom, and aerodynamic underbody trays.",
    craftDetail: "Careful masking prevents overspray in jambs, and final quality checks verify uniform panel gaps before handover."
  },
  {
    id: "one-roof",
    iconName: "home",
    title: "Complete Car Care Under One Roof",
    tagline: "Paint, body, mechanical, AC and electrical in one workshop.",
    description: "No need to bounce between separate workshops for AC gas, dent repair, suspension clunks, and paint correction. We handle it all seamlessly in Coimbatore.",
    craftDetail: "Unified diagnostic communication across body, mechanical, electrical, and detailing departments."
  },
  {
    id: "customer",
    iconName: "messageSquare",
    title: "Customer-Focused Service",
    tagline: "Clear updates and honest advice before any work begins.",
    description: "We believe in complete transparency. We walk you through diagnostic findings, provide photo documentation, and explain what is urgent versus optional.",
    craftDetail: "Zero surprise bills, transparent WhatsApp photo updates during repairs, and straightforward advice."
  },
  {
    id: "workmanship",
    iconName: "checkCircle",
    title: "Reliable Workmanship",
    tagline: "Careful work you can trust on the road, day after day.",
    description: "Every bolt is torqued to specification, electrical connections are insulated, and every paint job undergoes controlled curing for enduring durability.",
    craftDetail: "Vehicles undergo comprehensive road testing and multi-point inspection before client return."
  }
];

export const SERVICE_JOURNEY_STEPS: ServiceJourneyStep[] = [
  {
    step: "01",
    title: "Intake & Clinical Inspection",
    description: "We inspect your vehicle under high-intensity workshop lighting and hoists, assessing body panels, paint depth, electrical codes, and mechanical health.",
    highlights: ["Visual & digital diagnostic log", "Pre-existing scratch & dent mapping", "Direct discussion of your concerns"]
  },
  {
    step: "02",
    title: "Transparent Discussion & Planning",
    description: "We discuss options clearly: repair vs. replacement, paintless dent removal vs. respray, or detailing stages suited to your vehicle's condition.",
    highlights: ["Clear scope of work", "No unneeded upselling", "Estimated timeline breakdown"]
  },
  {
    step: "03",
    title: "Precision Craftsmanship",
    description: "Your vehicle is placed in the hands of dedicated specialists — whether in our heated spray booth, mechanical lift bay, or climate-controlled detailing bay.",
    highlights: ["Specialized tooling & materials", "Daily WhatsApp progress updates", "Strict protocol adherence"]
  },
  {
    step: "04",
    title: "Multi-Point Quality Audit",
    description: "Before sign-off, a senior workshop inspector checks panel alignments, paint gloss consistency, AC vent temperatures, and road-test behavior.",
    highlights: ["Panel gap calibration", "Inspection lamp clarity review", "Acoustic & road feel check"]
  },
  {
    step: "05",
    title: "Showroom Handover",
    description: "We present your refreshed vehicle in clean daylight, walk you through the completed work, and provide clear care instructions for long-term enjoyment.",
    highlights: ["Detailed walkthrough", "Maintenance recommendations", "Care guidance"]
  }
];
