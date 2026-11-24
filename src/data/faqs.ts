export interface FAQItem {
  id: string;
  category: string;
  question: string;
  answer: string;
}

export const FAQS: FAQItem[] = [
  {
    id: "faq-01",
    category: "General",
    question: "Where is MM Next Level Car Care located?",
    answer: "We are proudly based in Coimbatore, Tamil Nadu, India. Our workshop is equipped to provide comprehensive body, paint, mechanical, AC, electrical, and detailing services under one roof."
  },
  {
    id: "faq-02",
    category: "General",
    question: "Do I need to book an appointment before visiting the workshop?",
    answer: "While we welcome direct visits for quick visual assessments, we strongly encourage booking an appointment or sending an enquiry via WhatsApp. This ensures a dedicated technician or service advisor is ready to inspect your vehicle without delay."
  },
  {
    id: "faq-03",
    category: "Paint & Body",
    question: "How long does a full exterior repaint take?",
    answer: "A meticulous full exterior respray usually requires 7 to 14 working days. This timeframe allows for complete panel preparation, rust mitigation, multi-stage primer leveling, computerized color formulation, downdraft booth baking, and multi-stage mirror clear coat curing."
  },
  {
    id: "faq-04",
    category: "Paint & Body",
    question: "What is the difference between conventional denting and Paintless Dent Removal (PDR)?",
    answer: "PDR is a specialized technique that massages shallow dings and hail marks from behind the panel without damaging the factory paint. If the paint has cracked or the metal is deeply creased, conventional metal reshaping, primer sealing, and precision color blending will be required."
  },
  {
    id: "faq-05",
    category: "Ceramic & Detailing",
    question: "How does ceramic coating protect my car compared to regular wax?",
    answer: "Wax sits loosely on top of the paint and washes off in weeks under heat and detergent. Ceramic coating forms a permanent chemical SiO2/SiC quartz bond with your clear coat that lasts years. It provides extreme hydrophobicity, resistance to bird droppings and borewell water mineral stains, and intense optical gloss."
  },
  {
    id: "faq-06",
    category: "Mechanical & AC",
    question: "Why is regular car AC servicing critical in Coimbatore?",
    answer: "Coimbatore experiences high humidity and tropical heat. Over time, road dust clogs the condenser fins, bacteria form on damp cooling coils (causing sour smells), and microscopic refrigerant leaks reduce cooling capacity. Periodic servicing protects the expensive compressor and ensures immediate ice-cold airflow."
  },
  {
    id: "faq-07",
    category: "Restoration",
    question: "What types of restoration projects do you undertake?",
    answer: "We handle complete strip-down restorations for classic and modern-classic vehicles: chassis rust repair, complete body panel fabrication, engine/gearbox rebuilds, wiring harness restoration, bespoke interior upholstery, and concours-level paint finishes."
  },
  {
    id: "faq-08",
    category: "Booking & Communication",
    question: "How do service enquiries work on this website?",
    answer: "Our booking system gathers your vehicle make, model, desired service, and preferred date, and formats a structured message that opens directly in WhatsApp. You can review the details before pressing send to begin a transparent conversation with our workshop team."
  }
];
