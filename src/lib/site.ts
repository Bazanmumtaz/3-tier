export const site = {
  name: "Aster & Oak",
  tagline: "A design-and-build studio for calm, well-made spaces.",
  email: "hello@asterandoak.studio",
  phone: "+1 (555) 014-2210",
  address: "14 Fairmont Lane, Portland, OR",
  hours: "Mon–Fri, 9am–5pm",
};

export type Service = {
  id: string;
  number: string;
  title: string;
  summary: string;
  details: string[];
};

export const services: Service[] = [
  {
    id: "interiors",
    number: "01",
    title: "Interior styling",
    summary:
      "Layered, lived-in rooms built around what you already own — textiles, art, and objects that belong.",
    details: [
      "Room-by-room styling plans",
      "Color, material, and lighting palettes",
      "Sourcing from makers and small workshops",
    ],
  },
  {
    id: "furniture",
    number: "02",
    title: "Custom furniture",
    summary:
      "One-off pieces designed with our woodshop partners, from first sketch to the last coat of oil.",
    details: [
      "Tables, seating, storage, and beds",
      "Solid, sustainably harvested timber",
      "Built to last generations, not seasons",
    ],
  },
  {
    id: "planning",
    number: "03",
    title: "Space planning",
    summary:
      "Layouts that make small and awkward rooms work harder, without moving a single wall.",
    details: [
      "Measured floor plans and flow studies",
      "Furniture placement and sightlines",
      "Practical storage that hides the clutter",
    ],
  },
  {
    id: "renovation",
    number: "04",
    title: "Light renovations",
    summary:
      "Kitchens, bathrooms, and small extensions managed end to end with trades we trust.",
    details: [
      "Scope, budget, and schedule in writing",
      "One point of contact from start to finish",
      "Weekly photo updates while you're away",
    ],
  },
];

export const process = [
  {
    step: "Discover",
    text: "We visit, measure, and listen. You get a written brief and a clear budget before anything begins.",
  },
  {
    step: "Design",
    text: "Sketches, samples, and 3D views — revised with you until every room feels right on paper.",
  },
  {
    step: "Deliver",
    text: "We schedule the work, manage the trades, and hand back a finished space with everything in its place.",
  },
];
