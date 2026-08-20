/**
 * Hand-written SEO copy, keyed by pathname.
 *
 * This used to be an if/else chain inside App.jsx. It stays because it is the
 * fallback: a record whose SEO fields are still blank in the admin panel keeps
 * exactly the title and description it has today. Anything entered in the
 * admin's "SEO & Social Sharing" section overrides the matching entry here.
 *
 * Prefer filling the fields in the admin panel over adding rows to this file -
 * new entries here are invisible to whoever manages the site.
 */
export const SEO_DEFAULTS = {
  '/': {
    title: 'Leading Industrial Motors, Cables & wires, Switchgears & FRP Product Suppliers in Ankleshwar',
    description: 'Techno Sales is the leading supplier of industrial motors, cables & wires, switchgears, and FRP products in Ankleshwar GIDC.',
  },
  '/about': {
    title: 'Trusted Partner for Industrial Solutions in Ankleshwar | Techno Sales',
    description: 'Learn about Techno Sales, a premier industrial supplier in Gujarat with over 10 years of electro-mechanical expertise.',
  },
  '/products/motors': {
    title: 'Industrial Motors Supplier in Ankleshwar – Best Prices, Top Brands',
    description: 'Authorized Siemens, CG, and ABB industrial motors supplier in Ankleshwar. Best prices and ready GIDC stock.',
  },
  '/product/siemens-motors': {
    title: 'Siemens Motors Supplier in Ankleshwar | Techno Sales',
    description: 'Get high-efficiency Siemens AC low voltage motors from authorized distributor Techno Sales in Ankleshwar.',
  },
  '/product/cg-motors': {
    title: 'CG Motors Suppliers in Ankleshwar | Techno Sales',
    description: 'Looking for Crompton Greaves (CG) heavy-duty induction motors? Techno Sales in Ankleshwar GIDC has ready stock.',
  },
  '/product/polycab-cables-wires': {
    title: 'Authorized Polycab Cables & Wires Supplier in Ankleshwar – Techno Sales',
    description: 'Get genuine Polycab power cables, panel wires, and multi-core control cables from authorized distributor in Ankleshwar.',
  },
  '/product/siemens-switchgears': {
    title: 'Ankleshwar Siemens Switchgear Experts – Power Distribution Solutions by TechnoSales',
    description: 'Authorized distributor of Siemens switchgears, circuit breakers, MCBs, MCCBs, and ACBs in Ankleshwar.',
  },
  '/product/frp-products': {
    title: 'Industrial FRP Products Supplier in Ankleshwar | Techno Sales',
    description: 'Buy anti-corrosive fiberglass reinforced plastic gratings and lightweight, chemical-resistant pultruded cable trays.',
  },
  '/contact': {
    title: 'Contact Us - Techno Sales',
    description: 'Get in touch with Techno Sales in Ankleshwar GIDC. Get quick responses and same-day quotations from our team.',
  },
  '/locations': {
    title: 'Service Locations Covered in Gujarat | Techno Sales',
    description: 'Techno Sales supplies and supports electric motors, switchgears, cables, and FRP products across major industrial estates and cities in Gujarat.',
  },
  '/products': {
    title: 'Industrial Products & Equipment | Techno Sales',
    description: 'Browse industrial motors, switchgears, cables & wires and FRP products stocked in Ankleshwar GIDC.',
  },
  '/blog': {
    title: 'Blog - Techno Sales',
    description: 'Stay updated with switchgear standards, motor efficiency benchmarks, cable selection guides, and electrical safety.',
  },
  '/faq': {
    title: 'FAQ - Techno Sales',
    description: 'Find quick answers about our industrial motors, Siemens switchgear, Polycab cables, and FRP products.',
  },
  '/career': {
    title: 'Careers at Techno Sales - Industrial Sales & Stores Jobs in Ankleshwar',
    description: 'Current openings at Techno Sales, Ankleshwar GIDC — sales engineers, technical sales executives and stores staff working with Siemens, Polycab, ABB and CG product lines.',
  },
  '/testimonials': {
    title: 'Testimonial - Techno Sales',
    description: 'Read what chemical, pharmaceutical, and manufacturing plants across Ankleshwar GIDC say about Techno Sales.',
  },
};

export const SITE_FALLBACK = {
  title: 'Techno Sales',
  description: 'Authorized distributor for Siemens and Polycab, and a trusted supplier of ABB and CG products in Ankleshwar.',
};

export const getSeoDefault = (pathname) => SEO_DEFAULTS[pathname] ?? SITE_FALLBACK;
