/* Shared site data. Single source of truth for every page. */

/* Logo strip that scrolls under the hero. Every file is a 158x70 transparent
   PNG in public/images/brands, so the tiles all size identically. */
export const BRAND_MARQUEE = [
  { name: 'ABB', logo: '/images/brands/abb.png' },
  { name: 'Polycab', logo: '/images/brands/polycab.png' },
  { name: 'Siemens', logo: '/images/brands/siemens.png' },
  { name: 'CG Power and Industrial Solutions', logo: '/images/brands/cg-power.png' },
  { name: 'Innomotics', logo: '/images/brands/innomotics.png' }
];

import { BLOG_POSTS as IMPORTED_BLOG_POSTS } from './blogPosts';

export const BLOG_POSTS = IMPORTED_BLOG_POSTS;


export const PRODUCTS_DATA = [
  {
    id: 'siemens-motors',
    name: 'SIEMENS Motors',
    category: 'motors',
    brand: 'SIEMENS',
    specBadge: 'Authorized Distributor',
    specs: [
      'Low Voltage AC Motors',
      'High-Efficiency Motors (IE2/IE3/IE4)',
      'HVAC Motors',
      'Brake Motors',
      'Textile Motors',
      'Flameproof & Explosion-Proof Motors',
      'Custom & Application-Specific Motors'
    ],
    desc: 'High-performance Siemens electric motors designed for energy efficiency, extreme durability, and continuous industrial operations.',
    image: '/images/products/siemens-motors.jpg',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="9"/><path d="M12 3v18M3 12h18M6.3 6.3l11.4 11.4M6.3 17.7L17.7 6.3"/></svg>`,
    intro: [
      "We at Techno Sales, Ankleshwar, provide the entire range of Siemens Motors that are engineered to provide unparalleled performance, energy efficiency, and reliability in operations. Being an authorized Siemens distributor, we deliver motor solutions that are designed to address the dynamic demands of contemporary industrial systems.",
      "Whether you require motors for heavy industry manufacturing or application-specific applications, Siemens Motors provides dependable performance in even the most hostile environments."
    ],
    applications: [
      "Factory Plants",
      "Chemical & Pharma Units",
      "Water Treatment Plants",
      "Oil & Gas Plants",
      "Infrastructure & HVAC Projects",
      "Food & Beverage Processing"
    ],
    whyChoose: [
      "10+ years electro-mechanical experience",
      "verified/genuine product quality",
      "ready stock in Ankleshwar",
      "expert application-specific consultation",
      "trusted by 1000+ industries across Gujarat",
      "after-sales support and on-time delivery"
    ],
    faqs: [
      {
        q: "How do I choose the right Siemens motor for my application?",
        a: "Your applicant may have limited help desk wexperience. In that case, look for applicants who are motivated to grow and have some transferable nibh finibus et. Aenean eu enim justo. Vestibulum aliquam hendrerit moles accumsan"
      },
      {
        q: "What is the typical warranty period for Siemens motors?",
        a: "Siemens motors generally come with a standard manufacturer’s warranty of 12 to 24 months, depending on the model and application."
      },
      {
        q: "Can I get customized Siemens motors from Techno Sales?",
        a: "Yes, we can provide Siemens motors tailored to your specific technical requirements including special mounting, shaft dimensions, or enclosures."
      },
      {
        q: "How can I get a Siemens motor quote or catalogue?",
        a: "You can fill out our inquiry form on the website or contact us directly. We’ll share a detailed quote and the Siemens motor catalogue based on your needs."
      }
    ]
  },
  {
    id: 'cg-motors',
    name: 'CG Motors',
    category: 'motors',
    brand: 'CG (Crompton)',
    specBadge: 'Trusted Supplier',
    specs: [
      'Low Voltage AC Motors',
      'High-Efficiency Motors (IE2/IE3/IE4)',
      'HVAC Motors',
      'Brake Motors',
      'Textile Motors',
      'Flameproof & Explosion-Proof Motors'
    ],
    desc: 'Crompton Greaves (CG) heavy-duty induction motors engineered for rugged environments, pump systems, and industrial fans.',
    image: '/images/products/cg-motors.jpg',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2v20M2 12h20"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="9"/></svg>`,
    intro: [
      "At Techno Sales, Ankleshwar, we supply a comprehensive range of CG (Crompton Greaves) Motors, known for their durability, high efficiency, and cost-effective performance. As a trusted supplier of CG Industrial Motors in Ankleshwar, we cater to the diverse demands of modern industries with motors built for long-lasting, robust operations.",
      "Whether your need is for general-purpose motors or application-specific solutions, CG Motors offers reliable performance in even the most demanding and challenging environments."
    ],
    applications: [
      "Manufacturing Units",
      "Chemical & Pharmaceutical Industries",
      "Oil & Gas Refineries",
      "Water Treatment Plants",
      "HVAC & Building Infrastructure",
      "Food Processing & Packaging Units"
    ],
    whyChoose: [
      "10+ years electro-mechanical experience",
      "verified/genuine product quality",
      "ready stock in Ankleshwar",
      "expert application-specific consultation",
      "trusted by 1000+ industries across Gujarat",
      "after-sales support and on-time delivery"
    ],
    faqs: [
      {
        q: "What types of CG motors do you supply?",
        a: "We offer CG (Crompton Greaves) motors including low voltage, high voltage, energy-efficient, and flameproof motors for industrial use."
      },
      {
        q: "Do CG motors support energy-saving solutions?",
        a: "Yes, CG motors are available in IE2, IE3, and IE4 efficiency classes to help reduce your electricity bills and carbon footprint."
      },
      {
        q: "What is the warranty on CG motors?",
        a: "CG motors generally come with a standard manufacturer’s warranty of 12 to 24 months, depending on the model."
      },
      {
        q: "How do I request a CG motor quote or brochure?",
        a: "Simply contact us via our website or give us a call to receive a prompt quote and complete CG motor catalogue."
      }
    ]
  },
  {
    id: 'abb-motors',
    name: 'ABB Motors',
    category: 'motors',
    brand: 'ABB',
    specBadge: 'Trusted Supplier',
    specs: [
      'Low Voltage Motors',
      'High-Efficiency Motors (IE2/IE3/IE4)',
      'HVAC Motors',
      'Brake Motors',
      'Process Performance Motors',
      'Flameproof & Explosion-Proof Motors',
      'Custom Motors for Special Applications'
    ],
    desc: 'Top-tier ABB electric motors delivering excellent energy savings, advanced control capabilities, and low maintenance costs.',
    image: '/images/products/abb-motors.jpg',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="4" y="4" width="16" height="16" rx="2"/><circle cx="12" cy="12" r="4"/><path d="M12 4v4M12 16v4M4 12h4M16 12h4"/></svg>`,
    intro: [
      "At Techno Sales, Ankleshwar, we bring you a wide selection of ABB Motors, globally recognized for their premium quality, energy efficiency, and advanced engineering. As a trusted ABB motor supplier in Ankleshwar, we offer motor solutions that meet the evolving needs of today’s industrial and commercial environments.",
      "Whether you require low-voltage motors, explosion-proof solutions, or custom motors for process industries, ABB Industrial Motors delivers unmatched performance, reliability, and durability – even under the most demanding conditions."
    ],
    applications: [
      "Heavy Manufacturing Plants",
      "Chemical & Pharmaceutical Industries",
      "Oil & Gas Refineries",
      "Water & Wastewater Management",
      "HVAC & Building Infrastructure",
      "Food Processing & Packaging"
    ],
    whyChoose: [
      "10+ years electro-mechanical experience",
      "verified/genuine product quality",
      "ready stock in Ankleshwar",
      "expert application-specific consultation",
      "trusted by 1000+ industries across Gujarat",
      "after-sales support and on-time delivery"
    ],
    faqs: [
      {
        q: "What types of ABB motors do you offer?",
        a: "We supply a wide range of ABB motors, including low voltage, high voltage, energy-efficient, and flameproof motors for various industrial applications."
      },
      {
        q: "What is the warranty period for ABB motors?",
        a: "ABB motors typically come with a 12 to 24-month manufacturer’s warranty, depending on the model and usage conditions."
      },
      {
        q: "What industries use ABB motors?",
        a: "ABB motors are widely used in sectors like manufacturing, HVAC, water treatment, pharmaceuticals, and power generation."
      },
      {
        q: "How do I request an ABB motor quote or catalogue?",
        a: "Contact us through our website or call us directly to get a quick quote and the complete ABB motor product brochure."
      }
    ]
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
    image: '/images/products/siemens-switchgears.jpg',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="5" y="3" width="14" height="18" rx="2"/><path d="M9 7h6M9 12h6M9 17h4"/></svg>`,
    intro: [
      "At Techno Sales, Ankleshwar, we supply a comprehensive range of Siemens switchgears, contactors, and control gear components designed for industrial electrical safety. As an authorized Siemens distributor, we deliver power distribution and circuit protection solutions engineered for maximum reliability.",
      "Our switchgear lineup includes MCBs, MCCBs, SIRIUS power contactors, and ACB units to protect your plant motors and machinery from electrical faults and short circuits."
    ],
    applications: [
      "Manufacturing Industries",
      "Chemical & Pharmaceutical Plants",
      "Textile Industry",
      "Oil & Gas Sector",
      "Infrastructure & Construction"
    ],
    whyChoose: [
      "10+ years electro-mechanical experience",
      "verified/genuine product quality",
      "ready stock in Ankleshwar",
      "expert application-specific consultation",
      "trusted by 1000+ industries across Gujarat",
      "after-sales support and on-time delivery"
    ],
    faqs: [
      {
        q: "What types of Siemens switchgears do you offer?",
        a: "We supply a full range including LV & MV switchgears, ACBs, MCCBs, MCBs, contactors, and distribution boards."
      },
      {
        q: "Do Siemens switchgears support smart monitoring?",
        a: "Yes, many Siemens switchgear systems are compatible with IoT-based monitoring for real-time diagnostics and remote control."
      },
      {
        q: "Are Siemens switchgears built to safety standards?",
        a: "Yes, Siemens switchgears are fully compliant with international safety and quality standards, including IEC and IS certifications, ensuring reliable and secure performance across applications."
      },
      {
        q: "How do I get a quote or catalogue for Siemens switchgears?",
        a: "Yes, just fill out the contact form on our website or call us directly—we’ll send you the quote and product catalogue quickly."
      }
    ]
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
    image: '/images/products/polycab-cables.jpg',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="5" width="20" height="14" rx="3"/><path d="M4 12h16M4 8h16M4 16h16"/></svg>`,
    intro: [
      "Techno Sales is a leading supplier and trusted distributor of Polycab cables and wires in Ankleshwar, offering a complete range of high-performance electrical solutions for industrial, commercial, and residential needs. With a legacy of trust and excellence, Polycab is one of India’s most recognized brands for cables that ensure safety, durability, and energy efficiency.",
      "Whether you're looking for flexible wires, power cables, or industrial-grade solutions, we’ve got you covered. Backed by our strong local presence and technical expertise, Techno Sales ensures timely delivery and expert support for all your cabling requirements."
    ],
    applications: [
      "Manufacturing Plants",
      "Power Distribution Systems",
      "Residential & Commercial Buildings",
      "Process Industries",
      "HVAC & Automation Systems"
    ],
    whyChoose: [
      "10+ years electro-mechanical experience",
      "verified/genuine product quality",
      "ready stock in Ankleshwar",
      "expert application-specific consultation",
      "trusted by 1000+ industries across Gujarat",
      "after-sales support and on-time delivery"
    ],
    faqs: [
      {
        q: "What Polycab wires and cables do you offer?",
        a: "We offer a complete range of Polycab products including power cables, control cables, flexible wires, FR/FRLS wires, coaxial cables, and solar cables."
      },
      {
        q: "Are Polycab wires ISI and RoHS certified?",
        a: "Yes, Polycab wires and cables are ISI-marked and RoHS-compliant, ensuring high safety, quality, and environmental standards."
      },
      {
        q: "How do I choose the right cable for my application?",
        a: "Our technical team helps you select the correct Polycab product based on voltage, current load, environment, and usage purpose."
      },
      {
        q: "How can I get a Polycab product quote or catalogue?",
        a: "You can contact us through our website or call us directly for a prompt quote and complete product catalogue."
      }
    ]
  },
  {
    id: 'frp-products',
    name: 'FRP Products',
    category: 'frp',
    brand: 'FRP',
    specBadge: 'Supplier',
    specs: [
      'FRP Gratings',
      'FRP Cable Trays'
    ],
    desc: 'Anti-corrosive fiberglass reinforced plastic floor gratings and chemical-resistant pultruded ladder cable trays.',
    image: '/frp-products.jpg',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 3h18v18H3zM3 9h18M3 15h18M9 3v18M15 3v18"/></svg>`,
    intro: [
      "Techno Sales is a trusted supplier of high-quality FRP (Fiber Reinforced Plastic) products in Ankleshwar, specializing in FRP Gratings and FRP Cable Trays designed for tough industrial environments. With over a decade of experience in electro-mechanical solutions, we deliver lightweight, rust-proof, and maintenance-free FRP systems that ensure safety and long-term value.",
      "Our anti-corrosive fiberglass gratings and chemical-resistant pultruded ladder cable trays are ideal for power plants, refineries, chemical processing units, and water treatment systems."
    ],
    applications: [
      "Chemical & Petrochemical Plants",
      "Oil & Gas Industry",
      "Power Plants",
      "Wastewater Treatment Plants",
      "Textile & Paper Mills"
    ],
    whyChoose: [
      "10+ years electro-mechanical experience",
      "verified/genuine product quality",
      "ready stock in Ankleshwar",
      "expert application-specific consultation",
      "trusted by 1000+ industries across Gujarat",
      "after-sales support and on-time delivery"
    ],
    faqs: [
      {
        q: "What types of FRP products do you offer?",
        a: "We supply a wide range including FRP gratings, FRP cable trays, FRP ladders, handrails, and customized FRP structural components."
      },
      {
        q: "Are FRP cable trays better than metal trays?",
        a: "Yes, FRP cable trays offer superior corrosion resistance, longer life, low maintenance, and are ideal for harsh and corrosive environments."
      },
      {
        q: "Are your FRP products fire retardant?",
        a: "Yes, our FRP products are available with fire-retardant resin systems, offering enhanced safety in high-temperature or flammable areas."
      },
      {
        q: "How can I request a quote or catalogue for FRP products?",
        a: "Simply contact us via our website or call us directly to receive a quick quote and detailed product catalogue tailored to your needs."
      }
    ]
  }
];

export const TESTIMONIALS = [
    {
      name: 'Atul Panchal',
      role: 'Shiva Pharma', // TODO: Confirm company name (lacks source on legacy site)
      initials: 'AP',
      text: 'Techno Sales provided top-quality FRP gratings that made our factory floor safe and durable. Their quick service and expert support ensured a smooth experience. Highly recommended for reliable industrial-grade solutions.'
    },
    {
      name: 'Abhay',
      role: 'Spectom', // TODO: Confirm company name (lacks source on legacy site)
      initials: 'AB',
      text: 'Techno Sales impressed us with unmatched switchgear expertise. Their quality products and expert guidance helped us choose the right components. Their professionalism and prompt service truly contributed to our project\'s success.'
    },
    {
      name: 'Mukesh Dobariya',
      role: 'Hi-Make', // TODO: Confirm company name (lacks source on legacy site)
      initials: 'MD',
      text: 'Always on time and competitively priced, Techno Sales is our trusted go-to partner. Their consistent support, product quality, and reliability have made them an essential part of our industrial supply chain.'
    },
    {
      name: 'Priya Desai',
      role: 'Aryan Manufacturing Co.', // TODO: Confirm company name (lacks source on legacy site)
      initials: 'PD',
      text: 'Techno Sales consistently delivers high-quality products with quick, dependable service. Their team is responsive and professional, making them a truly reliable partner for all our industrial procurement and support needs.'
    },
    {
      name: 'Ankit Tiwari',
      role: 'Delta Machinery Works', // TODO: Confirm company name (lacks source on legacy site)
      initials: 'AT',
      text: 'We\'ve been sourcing from Techno Sales for years. Their genuine products, expert advice, and quick response have consistently simplified our procurement process, making operations smoother and more efficient for our entire team.'
    },
    {
      name: 'Sneha Joshi',
      role: 'Ridhhi Engineering Pvt. Ltd.', // TODO: Confirm company name (lacks source on legacy site)
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
    blurb: 'Energy-efficient IE2/IE3/IE4 induction motors from Siemens, Crompton Greaves and ABB — sized, stocked and supported for continuous plant duty across Ankleshwar GIDC.',
    longIntro: [
      "Techno Sales offers a wide range of high-quality electric motors designed for energy efficiency, durability, and consistent performance across diverse industrial applications. With decades of expertise in the electro-mechanical industry, we provide motors suitable for general-purpose use as well as heavy-duty operations.",
      "Our motor solutions are ideal for sectors such as manufacturing, chemical, pharmaceutical, textile, infrastructure, and more. Known for their robust construction, long service life, and low maintenance needs, our motor offerings ensure smooth and reliable operations that enhance overall productivity.",
      "Whether you’re upgrading existing systems or setting up new operations, Techno Sales is your trusted partner for dependable motor solutions tailored to your industrial needs."
    ],
    subcategories: [
      {
        title: "Low Voltage Motors",
        desc: "Robust and compact, ABB low-voltage motors are built for reliability in standard industrial uses."
      },
      {
        title: "High-Efficiency Motors (IE2 / IE3 / IE4)",
        desc: "Designed to reduce energy consumption and enhance system performance."
      },
      {
        title: "Flameproof & Explosion-Proof Motors",
        desc: "Ideal for hazardous and chemical environments such as refineries and pharma plants."
      },
      {
        title: "HVAC Motors",
        desc: "Specifically tailored for ventilation, air handling, and cooling applications."
      },
      {
        title: "Custom & Application-Specific Motors",
        desc: "Motors are designed for use in conveyors, pumps, compressors, and other applications."
      }
    ],
    faqs: [
      {
        q: "What is the difference between IE2, IE3, and IE4 motors?",
        a: "These are energy efficiency classes. IE2 is standard efficiency, IE3 is premium, and IE4 is super premium. Higher classes offer lower energy losses and better performance."
      },
      {
        q: "Do you offer customized motor solutions?",
        a: "Yes, we can supply motors with customized specifications based on your unique operational needs."
      },
      {
        q: "Are your motors Industry 4.0 ready?",
        a: "Yes, we offer smart motors that support remote monitoring, diagnostics, and integration with IoT systems for improved control and efficiency."
      },
      {
        q: "How do I choose the right motor for my application?",
        a: "Our team of experts can help you select the ideal motor based on your operational requirements such as load, speed, voltage, and application type."
      }
    ]
  },
  {
    id: 'cables',
    label: 'Cables & Wires',
    navLabel: 'Cables & Wires',
    title: 'Polycab Cables & Wires',
    tagline: 'LT power, control & flexible wiring',
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
    name: 'SIEMENS SWITCHGEARS',
    badge: 'AUTHORIZED DISTRIBUTOR',
    badgeType: 'official',
    desc: 'Authorized distributor for Siemens MCCBs, SIRIUS Power Contactors, and premium efficiency IE3/IE4 motors.',
    lines: ['Low Voltage Motors', 'Switchgears', 'IE2/IE3/IE4 Motors']
  },
  {
    name: 'CG MOTORS',
    // TODO: confirm with client — live site claims Authorized Distributor for ABB & FRP
    badge: 'TRUSTED SUPPLIER',
    badgeType: 'certified',
    desc: 'Trusted supplier of Crompton Greaves heavy-duty industrial induction motors built for harsh environments.',
    lines: ['Harsh-Duty Motors', 'Pumps & Fans', 'Industrial Drives']
  },
  {
    name: 'ABB MOTORS',
    // TODO: confirm with client — live site claims Authorized Distributor for ABB & FRP
    badge: 'TRUSTED SUPPLIER',
    badgeType: 'certified',
    desc: 'Trusted supplier of ABB low voltage motors, soft starters, and smart breaker components.',
    lines: ['General Purpose Motors', 'Soft Starters', 'Control Systems']
  },
  {
    name: 'POLYCAB CABLES',
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
  { value: '8,000+', label: 'Happy Customers' }, // TODO: Confirm stat (lacks source on legacy site)
  { value: '10,000+', label: 'SKUs' }, // TODO: Confirm stat (lacks source on legacy site)
  { value: '99%', label: 'Client Retention' }
  // REMOVED: { value: '5', label: 'Authorized Brand Lines' }
  // Not present on technosales.in, and it contradicts our own copy — only
  // Siemens and Polycab are described as authorized distributorships.
];

export const TEAM = [
  { name: 'Hemant Patel', role: 'Director', photo: '/images/team/hemant-patel.jpg' },
  { name: 'Manish Patel', role: 'General Manager', photo: '/images/team/manish-patel.png' }
];

export const COMPANY = {
  phone: '+91 98980 78247',
  phoneHref: 'tel:+919898078247',
  email: 'Mktg@Technosales.In',
  emailHref: 'mailto:Mktg@Technosales.In',
  address: 'Old N H, No 8, B/5-6, Kewal Shopping Centre, Ankleshwar GIDC, Ankleshwar, Gujarat 393002',
  hours: 'Monday - Friday: 09:00 AM - 06:00 PM',
  /* What the Google Maps embed and the directions links are pointed at. Google
     geocodes this text, so it stays in sync with `address` by hand. If the pin
     ever lands on the wrong unit, replace this with the exact coordinates
     ("21.6279,73.0143") or the place's short URL and nothing else changes. */
  mapsQuery: 'Techno Sales, Kewal Shopping Centre, Old NH 8, Ankleshwar GIDC, Ankleshwar, Gujarat 393002'
};

/* Every Google Maps URL on the site, built once from COMPANY.mapsQuery.
   `output=embed` is the key-free embed — the Embed API endpoint
   (maps/embed/v1/place) renders the same map but refuses to load without a
   billing-enabled API key, which this site has no other use for. */
const mapsQ = encodeURIComponent(COMPANY.mapsQuery);

export const MAPS = {
  embed: `https://www.google.com/maps?q=${mapsQ}&z=16&hl=en&output=embed`,
  directions: `https://www.google.com/maps/dir/?api=1&destination=${mapsQ}`,
  place: `https://www.google.com/maps/search/?api=1&query=${mapsQ}`
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
  },
  {
    icon: 'factory',
    name: 'Food & Beverage Processing',
    desc: 'Hygienic motors, distribution cables, and safety switchgear rated for washdown areas and packaging units.'
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
