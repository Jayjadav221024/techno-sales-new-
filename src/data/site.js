/* Shared site data. Single source of truth for every page. */

export const BRAND_MARQUEE = [
  { icon: 'zap', label: 'SIEMENS SWITCHGEARS' },
  { icon: 'cog', label: 'CG MOTORS' },
  { icon: 'cable', label: 'POLYCAB CABLES' },
  { icon: 'factory', label: 'ABB MOTORS' },
  { icon: 'shield', label: 'FRP PRODUCTS' }
];

export const BLOG_POSTS = [
  {
    icon: 'layoutGrid',
    date: '5 August 2026',
    topic: 'FRP Solutions',
    title: 'Why Buy FRP Gratings and Cable Trays from Techno Sales?',
    excerpt: 'Discover why chemical plants trust our chemical-resistant fiberglass floor gratings and pultruded ladder cable trays.',
    url: 'https://technosales.in/buy-frp-gratings-cable-trays-techno-sales/'
  },
  {
    icon: 'scale',
    date: '28 July 2026',
    topic: 'Selection Guide',
    title: 'CG Motors vs Siemens Motors: Which Is Better for Industrial Applications?',
    excerpt: 'A comprehensive comparison analyzing efficiency, durability, maintenance costs, and performance in harsh environments.',
    url: 'https://technosales.in/cg-motors-vs-siemens-motors/'
  },
  {
    icon: 'zap',
    date: '20 July 2026',
    topic: 'Switchgear Insights',
    title: 'Why Siemens Switchgear Is Becoming the First Choice for Gujarat Industries',
    excerpt: 'Explore why automated units and switchboard designers prefer Siemens MCCBs and contactors for robust plant protection.',
    url: 'https://technosales.in/siemens-switchgear-gujarat-industries/'
  },
  {
    icon: 'cable',
    date: '6 July 2026',
    topic: 'Cables & Wires',
    title: 'Top Benefits of Polycab Industrial Cables',
    excerpt: 'Learn how Polycab armoured and flexible multi-core wires withstand voltage surges and keep panel connections safe.',
    url: 'https://technosales.in/top-benefits-polycab-industrial-cables/'
  },
  {
    icon: 'circuit',
    date: '18 June 2026',
    topic: 'Motors Guide',
    title: 'Industrial Motors Explained: Types, Applications, and Selection Guide',
    excerpt: 'A complete walkthrough covering IE efficiency classes, frame sizes, enclosures, and structural motor configurations.',
    url: 'https://technosales.in/industrial-motors-types-applications-selection-guide/'
  },
  {
    icon: 'grating',
    date: '3 June 2026',
    topic: 'FRP Solutions',
    title: 'FRP Gratings: Features, Benefits, and Applications',
    excerpt: 'Learn about the anti-corrosive, non-conductive floor grating grids providing durability in corrosive refinery areas.',
    url: 'https://technosales.in/frp-gratings-features-benefits-and-applications/'
  }
];

export const PRODUCTS_DATA = [
  {
    id: 'siemens-motors',
    name: 'SIEMENS Motors',
    category: 'motors',
    brand: 'SIEMENS',
    specBadge: 'Authorized Distributor',
    // Siemens skews efficiency / automation. Previously identical to the CG
    // array; differentiated per live /motors page. 'Textile Motors' removed
    // (not listed on the live site).
    specs: [
      'Low Voltage AC Motors',
      'High-Efficiency Motors (IE2 / IE3 / IE4)',
      'HVAC Motors',
      'Brake Motors',
      'Flameproof & Explosion-Proof Motors',
      'Custom & Application-Specific Motors'
    ],
    desc: 'High-performance Siemens electric motors designed for energy efficiency, extreme durability, and continuous industrial operations.',
    image: '/siemens-motors.jpg',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="9"/><path d="M12 3v18M3 12h18M6.3 6.3l11.4 11.4M6.3 17.7L17.7 6.3"/></svg>`
  },
  {
    id: 'cg-motors',
    name: 'CG Motors',
    category: 'motors',
    brand: 'CG (Crompton)',
    // TODO: confirm with client — live site claims Authorized Distributor for ABB & FRP
    specBadge: 'Trusted Supplier',
    // CG skews heavy-duty / rugged. Previously identical to the Siemens array;
    // differentiated per live /motors page. 'Textile Motors' removed (not
    // listed on the live site); 'Crane Duty Motors' added (was missing site-wide).
    specs: [
      'Low Voltage AC Motors',
      'High-Efficiency Motors (IE2 / IE3)',
      'Crane Duty Motors',
      'Brake Motors',
      'Pump & Fan Duty Motors',
      'Custom & Application-Specific Motors'
    ],
    desc: 'Crompton Greaves (CG) heavy-duty induction motors engineered for rugged environments, pump systems, and industrial fans.',
    image: '/cg-motors.jpg',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2v20M2 12h20"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="9"/></svg>`
  },
  {
    id: 'abb-motors',
    name: 'ABB Motors',
    category: 'motors',
    brand: 'ABB',
    // TODO: confirm with client — live site claims Authorized Distributor for ABB & FRP
    specBadge: 'Trusted Supplier',
    // 'Process Performance Motors' removed (not listed on the live site).
    specs: [
      'Low Voltage AC Motors',
      'High-Efficiency Motors (IE2 / IE3 / IE4)',
      'HVAC Motors',
      'Crane Duty & Brake Motors',
      'Flameproof & Explosion-Proof Motors',
      'Custom & Application-Specific Motors'
    ],
    desc: 'Top-tier ABB electric motors delivering excellent energy savings, advanced control capabilities, and low maintenance costs.',
    image: '/abb-motors.jpg',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="4" y="4" width="16" height="16" rx="2"/><circle cx="12" cy="12" r="4"/><path d="M12 4v4M12 16v4M4 12h4M16 12h4"/></svg>`
  },
  {
    id: 'siemens-switchgears',
    name: 'SIEMENS Switchgears',
    category: 'switchgears',
    brand: 'SIEMENS',
    specBadge: 'Authorized Distributor',
    specs: [
      'MCB',
      'MCCB',
      'ACB',
      'Contactors & Overload Relays',
      'Distribution Boards & Panels',
      'Low Voltage Power Distribution Products',
      'Control & Protection Devices'
    ],
    desc: 'Authorized Siemens circuit breakers, MCCBs, control switches, and contactors designed for industrial electrical safety.',
    image: '/siemens-switchgears.jpg',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="5" y="3" width="14" height="18" rx="2"/><path d="M9 7h6M9 12h6M9 17h4"/></svg>`
  },
  {
    id: 'polycab-cables-wires',
    name: 'Polycab Cables & Wires',
    category: 'cables',
    brand: 'POLYCAB',
    specBadge: 'Authorized Distributor',
    specs: [
      'Flexible Wires & House Wires',
      'LT Power Cables',
      'Control Cables',
      'Instrumentation Cables',
      'FR/FRLS/HRFR Cables'
    ],
    desc: 'Authorized Polycab power cables, panel wires, and multi-core control cables designed for safety and efficiency.',
    image: '/polycab-cables-wires.jpg',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="5" width="20" height="14" rx="3"/><path d="M4 12h16M4 8h16M4 16h16"/></svg>`
  },
  {
    id: 'frp-products',
    name: 'FRP Products',
    category: 'frp',
    brand: 'FRP',
    specBadge: 'Supplier',
    specs: [
      'FRP Gratings (slip resistant, non-conductive, high load bearing)',
      'FRP Cable Trays (lightweight, chemical resistant)'
    ],
    desc: 'Anti-corrosive fiberglass reinforced plastic floor gratings and chemical-resistant pultruded ladder cable trays.',
    image: '/frp-products.jpg',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 3h18v18H3zM3 9h18M3 15h18M9 3v18M15 3v18"/></svg>`
  }
];

export const TESTIMONIALS = [
    {
      name: 'Atul Panchal',
      role: 'Shiva Pharma',
      initials: 'AP',
      text: 'Techno Sales provided top-quality FRP gratings that made our factory floor safe and durable. Their quick service and expert support ensured a smooth experience. Highly recommended for reliable industrial-grade solutions.'
    },
    {
      name: 'Abhay',
      role: 'Spectom',
      initials: 'AB',
      text: 'Techno Sales impressed us with unmatched switchgear expertise. Their quality products and expert guidance helped us choose the right components. Their professionalism and prompt service truly contributed to our project\'s success.'
    },
    {
      name: 'Mukesh Dobariya',
      role: 'Hi-Make',
      initials: 'MD',
      text: 'Always on time and competitively priced, Techno Sales is our trusted go-to partner. Their consistent support, product quality, and reliability have made them an essential part of our industrial supply chain.'
    },
    {
      name: 'Priya Desai',
      role: 'Aryan Manufacturing Co.',
      initials: 'PD',
      text: 'Techno Sales consistently delivers high-quality products with quick, dependable service. Their team is responsive and professional, making them a truly reliable partner for all our industrial procurement and support needs.'
    },
    {
      name: 'Ankit Tiwari',
      role: 'Delta Machinery Works',
      initials: 'AT',
      text: 'We\'ve been sourcing from Techno Sales for years. Their genuine products, expert advice, and quick response have consistently simplified our procurement process, making operations smoother and more efficient for our entire team.'
    },
    {
      name: 'Sneha Joshi',
      role: 'Ridhhi Engineering Pvt. Ltd.',
      initials: 'SJ',
      text: 'Techno Sales provides reliable service, genuine products, and quick response. Their consistent performance and support make them our trusted and preferred supplier for all industrial equipment and electrical component needs.'
    }
  ];


export const CATEGORIES = [
  {
    id: 'motors',
    label: 'Motors',
    navLabel: 'Motors',
    title: 'Industrial Motors',
    tagline: 'Siemens, CG & ABB induction motors',
    blurb: 'Energy-efficient IE2/IE3/IE4 induction motors from Siemens, Crompton Greaves and ABB — sized, stocked and supported for continuous plant duty across Ankleshwar GIDC.'
  },
  {
    id: 'cables',
    label: 'Cables & Wires',
    navLabel: 'Cables & Wires',
    title: 'Polycab Cables & Wires',
    tagline: 'LT power, control & flexible wiring',
    // 'XLPE LT aluminium' removed — never claimed on the live site.
    blurb: 'Authorized Polycab LT power cables, control cables and flexible copper wires — including instrumentation and FR/FRLS/HRFR cables for panels and switchboards.'
  },
  {
    id: 'switchgears',
    label: 'SIEMENS Switchgears',
    navLabel: 'SIEMENS Switchgears',
    title: 'SIEMENS Switchgears',
    tagline: 'MCB, MCCB, ACB & contactors',
    blurb: 'Authorized Siemens circuit protection — MCBs, MCCBs, ACBs, SIRIUS contactors and overload relays for industrial electrical safety and panel building.'
  },
  {
    id: 'frp',
    label: 'FRP Products',
    navLabel: 'FRP Products',
    title: 'FRP Gratings & Cable Trays',
    tagline: 'Corrosion-proof structural solutions',
    // Range is FRP Gratings and FRP Cable Trays only. Applications per live site:
    // chemical & petrochemical, oil & gas, power plants, wastewater treatment,
    // textile & paper mills.
    blurb: 'Anti-corrosive, non-conductive FRP gratings and pultruded cable trays for chemical and petrochemical plants, oil & gas, power plants, wastewater treatment plants, and textile & paper mills.'
  }
];

export const FAQS = [
  {
    q: 'What are Siemens Switchgears used for?',
    a: 'Siemens switchgears are used for safe and efficient control of electrical power in industrial and commercial applications. They help protect electrical circuits from overloads and short circuits.'
  },
  {
    q: 'What types of electric motors do you offer?',
    a: 'Techno Sales supplies a wide range of motors including Low Voltage AC Motors, IE2/IE3/IE4 energy-efficient motors, Flameproof Motors, Crane Duty, Brake Motors, and custom-built options from trusted brands like ABB, Siemens, and Crompton.'
  },
  {
    q: 'Are your Polycab cables ISI-certified?',
    a: 'Yes, all Polycab products we supply are certified and compliant with Indian and international safety standards.'
  },
  {
    q: 'Are Polycab cables suitable for underground installations?',
    a: 'Yes, we offer Polycab armoured and unarmoured cables specifically designed for underground and high-load applications.'
  },
  {
    q: 'Do you offer bulk or project pricing?',
    a: 'Yes, we offer special pricing for bulk orders, EPC projects, and industrial contractors.'
  }
];

export const FEATURES = [
  {
    icon: 'shieldCheck',
    title: '100% Authorized & Certified',
    // TODO: confirm with client — live site claims Authorized Distributor for ABB & FRP
    // (this sentence carries the same claim as the PARTNERS badges below)
    desc: 'Authorized distributor for Siemens and Polycab, and a trusted supplier of ABB and CG products — all genuine with manufacturer warranty.'
  },
  {
    icon: 'cog',
    title: 'Technical Support & Sizing',
    desc: 'Our experienced engineering team assists you in choosing exact motor frames, breaker breaking capacities, and cable ratings.'
  },
  {
    icon: 'truck',
    title: 'Rapid Ankleshwar Dispatch',
    desc: 'Located right at Ankleshwar GIDC with ready stock available for quick dispatch to your plant floor.'
  },
  {
    icon: 'wrench',
    title: 'After-Sales Lifecycle Support',
    desc: 'Active support throughout product installation, commissioning, replacement parts, and maintenance guidance.'
  }
];

export const PARTNERS = [
  {
    name: 'SIEMENS',
    badge: 'AUTHORIZED DISTRIBUTOR',
    badgeType: 'official',
    desc: 'Authorized distributor for Siemens MCCBs, SIRIUS Power Contactors, and premium efficiency IE3/IE4 motors.',
    lines: ['Low Voltage Motors', 'Switchgears', 'IE2/IE3/IE4 Motors']
  },
  {
    name: 'CROMPTON GREAVES (CG)',
    // TODO: confirm with client — live site claims Authorized Distributor for ABB & FRP
    badge: 'TRUSTED SUPPLIER',
    badgeType: 'certified',
    desc: 'Trusted supplier of Crompton Greaves heavy-duty industrial induction motors built for harsh environments.',
    lines: ['Harsh-Duty Motors', 'Pumps & Fans', 'Industrial Drives']
  },
  {
    name: 'ABB',
    // TODO: confirm with client — live site claims Authorized Distributor for ABB & FRP
    badge: 'TRUSTED SUPPLIER',
    badgeType: 'certified',
    desc: 'Trusted supplier of ABB low voltage motors, soft starters, and smart breaker components.',
    lines: ['General Purpose Motors', 'Soft Starters', 'Control Systems']
  },
  {
    name: 'POLYCAB',
    badge: 'AUTHORIZED DISTRIBUTOR',
    badgeType: 'official',
    desc: 'Authorized distributor of Polycab LT power cables, control cables and flexible copper wires.',
    lines: ['Cables & Wires', 'Flexible Wires', 'LT Power Cables']
  },
  {
    name: 'FRP PRODUCTS',
    // TODO: confirm with client — live site claims Authorized Distributor for ABB & FRP
    badge: 'SUPPLIER',
    badgeType: 'direct',
    desc: 'Supplier of chemical-resistant pultruded FRP cable trays and moulded anti-skid floor gratings.',
    lines: ['FRP Gratings', 'FRP Cable Trays']
  }
];

export const MILESTONES = [
  { value: '10+', label: 'Years of Experience' },
  { value: '1000+', label: 'Clients Across Gujarat' },
  { value: '8,000+', label: 'Happy Customers' },
  { value: '10,000+', label: 'SKUs' },
  { value: '99%', label: 'Client Retention' }
  // REMOVED: { value: '5', label: 'Authorized Brand Lines' }
  // Not present on technosales.in, and it contradicts our own copy — only
  // Siemens and Polycab are described as authorized distributorships.
];

export const TEAM = [
  { name: 'Hemant Patel', role: 'Director' },
  { name: 'Manish Patel', role: 'General Manager' }
];

export const COMPANY = {
  phone: '+91 98980 78247',
  phoneHref: 'tel:+919898078247',
  email: 'Mktg@Technosales.In',
  emailHref: 'mailto:Mktg@Technosales.In',
  address: 'Old N H, No 8, B/5-6, Kewal Shopping Centre, Ankleshwar GIDC, Ankleshwar, Gujarat 393002',
  hours: 'Monday - Friday: 09:00 AM - 06:00 PM'
};

/** Products belonging to a category id. */
export const productsInCategory = (categoryId) =>
  PRODUCTS_DATA.filter((p) => p.category === categoryId);

/** Look up a category descriptor by id. */
export const findCategory = (categoryId) =>
  CATEGORIES.find((c) => c.id === categoryId);

/** Look up a product by id. */
export const findProduct = (productId) =>
  PRODUCTS_DATA.find((p) => p.id === productId);

/* Sectors per the live site. 'Food & Beverage' and 'Engineering & Fabrication'
   were removed — neither appears on technosales.in.
   Icons are reused from the existing set so no component changes are needed. */
export const INDUSTRIES = [
  {
    icon: 'flask',
    name: 'Chemical & Petrochemical',
    desc: 'Flameproof motors, corrosion-proof FRP walkways and cable trays built for aggressive plant atmospheres.'
  },
  {
    icon: 'shieldCheck',
    name: 'Pharmaceutical',
    desc: 'Clean-running IE3/IE4 motors and reliable switchgear for validated, uptime-critical production lines.'
  },
  {
    icon: 'layers',
    name: 'Textile & Paper Mills',
    desc: 'Continuous-duty motors, drives and control wiring engineered for sustained high-load running.'
  },
  {
    icon: 'factory',
    name: 'Oil & Gas',
    desc: 'Explosion-proof motors and non-conductive FRP structures rated for hazardous-area installations.'
  },
  {
    icon: 'zap',
    name: 'Power Plants & Power Distribution',
    desc: 'Siemens switchgear, LT power cables and distribution boards for generation and distribution networks.'
  },
  {
    icon: 'droplet',
    name: 'Wastewater / Effluent Treatment',
    desc: 'Pump-duty motors, starters and armoured cable for ETP, STP and utility water networks.'
  },
  {
    icon: 'wrench',
    name: 'Manufacturing & Infrastructure',
    desc: 'General-purpose motors, contactors and LT cables for production plants and construction projects.'
  },
  {
    icon: 'cog',
    name: 'HVAC & Automation',
    desc: 'HVAC-duty motors, contactors and control devices for building services and automated lines.'
  }
];

export const PROCESS_STEPS = [
  {
    icon: 'fileText',
    title: 'Share Your Requirement',
    desc: 'Send a BOQ, a frame size, or just describe the application — a photo of the nameplate is often enough.'
  },
  {
    icon: 'cog',
    title: 'We Size It Correctly',
    desc: 'Our engineers confirm the rating, enclosure, breaking capacity or cable gauge before anything is quoted.'
  },
  {
    icon: 'zap',
    title: 'Quotation Within Hours',
    desc: 'You get a written quote with genuine-brand pricing and realistic availability, usually the same day.'
  },
  {
    icon: 'truck',
    title: 'Dispatch & Aftercare',
    desc: 'Ready stock leaves Ankleshwar GIDC quickly, and we stay on call through commissioning and beyond.'
  }
];
