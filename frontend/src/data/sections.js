import { COMPANY, FEATURES, HERO_SLIDES, INDUSTRIES, PROCESS_STEPS } from './site';

/**
 * Every editable section on the website.
 *
 * This registry is the contract between three things:
 *   - the page that renders the section (reads values with useSection)
 *   - the admin's Website editor (builds a form from `fields`)
 *   - the database (stores only what someone has changed)
 *
 * `defaults` is the wording currently built into the site. A section with no
 * database row renders these, so the site is never blank and "reset" always has
 * something to fall back to.
 *
 * TO ADD A SECTION: add an entry here, then give the JSX
 * `{...sectionProps('your.key')}` and read values with `useSection('your.key')`.
 * It appears in the admin editor automatically - no admin code to touch.
 *
 * Field types: text | textarea | url | tel | email | list
 * `list` edits an array of objects; `itemFields` describes one row.
 */

const t = (name, label, hint) => ({ name, label, type: 'text', hint });
const area = (name, label, hint) => ({ name, label, type: 'textarea', hint });

export const SECTIONS = [
  // ---------------------------------------------------------------- global
  {
    key: 'global.company',
    page: 'global',
    label: 'Company Details',
    description: 'Phone, email and address. Used in the header, footer, contact page and every "call us" link across the site.',
    fields: [
      t('phone', 'Phone Number', 'Shown to visitors, e.g. +91 98980 78247'),
      t('phoneHref', 'Phone Link', 'What the button dials. Must start with tel: and contain no spaces.'),
      t('email', 'Email Address'),
      t('emailHref', 'Email Link', 'Must start with mailto:'),
      area('address', 'Street Address'),
      t('hours', 'Opening Hours'),
      area('mapsQuery', 'Google Maps Search Text', 'What the embedded map searches for. Change this only if the map pin is wrong.'),
    ],
    defaults: COMPANY,
  },

  // ------------------------------------------------------------------ home
  {
    key: 'home.hero',
    page: 'home',
    label: 'Hero Banner',
    description:
      'The rotating banner at the top of the home page. Each slide shows for six seconds before the next one.',
    fields: [
      t('headingPrefix', 'Fixed Words Before The Slide Title', 'Stays the same on every slide.'),
      t('searchPlaceholder', 'Search Box Placeholder'),
      {
        name: 'slides',
        label: 'Slides',
        type: 'list',
        itemLabel: 'Slide',
        itemFields: [
          t('badge', 'Badge Text', 'The pill above the heading.'),
          t('title', 'Slide Title', 'Appears highlighted after the fixed words.'),
          area('desc', 'Slide Description'),
          t('image', 'Image Path'),
          t('imageAlt', 'Image Alt Text'),
          t('caption', 'Image Caption'),
        ],
      },
    ],
    defaults: {
      headingPrefix: 'Powering Industry with',
      searchPlaceholder: 'Search Products (e.g. Siemens, Polycab, FRP)...',
      slides: HERO_SLIDES,
    },
  },
  {
    key: 'home.brands',
    page: 'home',
    label: 'Authorized Brands Strip',
    description: 'The scrolling brand logos band under the hero.',
    fields: [t('eyebrow', 'Label Above The Logos')],
    defaults: { eyebrow: 'Authorized Brands' },
  },
  {
    key: 'home.products',
    page: 'home',
    label: 'Products Section Heading',
    description: 'Heading above the product cards. The cards themselves come from the Products screen.',
    fields: [
      t('tag', 'Small Label'),
      area('title', 'Heading'),
      area('desc', 'Description'),
    ],
    defaults: {
      tag: 'ENGINEERED FOR INDUSTRY',
      title: 'Authorized Industrial Products',
      desc: 'Direct stock access to Siemens, ABB, CG, and Polycab with technical sizing support.',
    },
  },
  {
    key: 'home.features',
    page: 'home',
    label: 'Why Choose Us',
    description: 'The advantages grid. Edit the heading, or the individual cards below it.',
    fields: [
      t('tag', 'Small Label'),
      area('title', 'Heading'),
      area('desc', 'Description'),
      {
        name: 'items',
        label: 'Advantage Cards',
        type: 'list',
        itemLabel: 'Card',
        itemFields: [
          t('icon', 'Icon Name', 'e.g. shieldCheck, truck, cog'),
          t('image', 'Background / Illustration Image', 'e.g. /images/sections/why-choose-us.jpg'),
          t('title', 'Card Title'),
          area('desc', 'Card Text'),
        ],
      },
    ],
    defaults: {
      tag: 'THE TECHNO SALES ADVANTAGE',
      title: "Built for Ankleshwar's Toughest Industrial Demands",
      desc: '10+ years supplying GIDC chemical, pharma and manufacturing plants with verified industrial equipment.',
      items: FEATURES,
    },
  },
  {
    key: 'home.industries',
    page: 'home',
    label: 'Industries We Serve',
    fields: [
      t('tag', 'Small Label'),
      area('title', 'Heading'),
      area('desc', 'Description'),
      {
        name: 'items',
        label: 'Industry Cards',
        type: 'list',
        itemLabel: 'Industry',
        itemFields: [t('icon', 'Icon Name'), t('name', 'Industry Name'), area('desc', 'Description')],
      },
    ],
    defaults: {
      tag: 'SECTOR EXPERTISE',
      title: 'Supplying Critical Industrial Sectors',
      desc: 'Tailored electrical and mechanical solutions engineered for high-demand plant environments across Gujarat.',
      items: INDUSTRIES,
    },
  },
  {
    key: 'home.process',
    page: 'home',
    label: 'How It Works',
    fields: [
      t('tag', 'Small Label'),
      area('title', 'Heading'),
      area('desc', 'Description'),
      {
        name: 'items',
        label: 'Steps',
        type: 'list',
        itemLabel: 'Step',
        itemFields: [t('icon', 'Icon Name'), t('title', 'Step Title'), area('desc', 'Step Text')],
      },
    ],
    defaults: {
      tag: 'OUR PROCESS',
      title: 'From Inquiry to Commissioning',
      desc: "A fast, predictable process built around your plant's procurement timeline.",
      items: PROCESS_STEPS,
    },
  },
  {
    key: 'home.partnerships',
    page: 'home',
    label: 'Brand Partnerships Heading',
    description: 'Heading only. The partner cards come from the Brand Partners screen.',
    fields: [t('tag', 'Small Label'), area('title', 'Heading'), area('desc', 'Description')],
    defaults: { tag: 'TRUSTED DISTRIBUTORSHIPS', title: 'Our Brand Partnerships', desc: 'Direct channel partnerships ensuring 100% genuine products, full warranties, and factory technical backup.' },
  },
  {
    key: 'home.testimonials',
    page: 'home',
    label: 'Testimonials Heading',
    description: 'Heading only. The reviews come from the Testimonials screen.',
    // No description field: this heading renders no supporting paragraph.
    fields: [t('tag', 'Small Label'), area('title', 'Heading')],
    defaults: { tag: 'CLIENT FEEDBACK', title: 'Trusted by Industrial Leaders' },
  },
  {
    key: 'home.blog',
    page: 'home',
    label: 'Blog Section Heading',
    description: 'Heading only. The articles come from the Blog Posts screen.',
    fields: [t('tag', 'Small Label'), area('title', 'Heading'), area('desc', 'Description')],
    defaults: { tag: 'INSIGHTS & GUIDES', title: 'Technical Knowledge Hub', desc: 'Expert articles on motor efficiency, switchgear selection, and cable sizing for industrial plants.' },
  },
  {
    key: 'home.faq',
    page: 'home',
    label: 'FAQ Section Heading',
    description: 'Heading only. The questions come from the FAQs screen.',
    // No description field: this heading renders no supporting paragraph.
    fields: [t('tag', 'Small Label'), area('title', 'Heading')],
    defaults: { tag: 'FREQUENT QUESTIONS', title: 'Everything You Need to Know' },
  },

  // ----------------------------------------------------------------- about
  {
    key: 'about.intro',
    page: 'about',
    label: 'About Introduction',
    fields: [t('tag', 'Small Label'), area('title', 'Heading'), area('lead', 'Opening Paragraph')],
    defaults: {
      tag: 'THE TECHNO SALES ADVANTAGE',
      title: 'About Us',
      lead: 'A decade of supplying industrial motors, switchgear, cables and FRP structures to the plants of Ankleshwar GIDC — with the engineering support to match.',
    },
  },

  // --------------------------------------------------------------- contact
  {
    key: 'contact.intro',
    page: 'contact',
    label: 'Contact Page Heading',
    fields: [t('tag', 'Small Label'), area('title', 'Heading'), area('lead', 'Supporting Text')],
    defaults: {
      tag: 'GET IN TOUCH',
      title: 'Contact Us',
      lead: 'Visit our Ankleshwar GIDC counter or send a technical inquiry — our sales engineering team replies within two working hours.',
    },
  },

  // ------------------------------------------------------------- locations
  {
    key: 'locations.intro',
    page: 'locations',
    label: 'Locations Page Heading',
    fields: [t('tag', 'Small Label'), area('title', 'Heading'), area('lead', 'Supporting Text')],
    defaults: {
      tag: 'OUR footprint',
      title: 'Service Locations We Cover',
      lead: 'We supply and support our entire industrial product line across major industrial estates and cities in Gujarat. Click on any city to view local details, industries served, and nearby areas.',
    },
  },
];

/** Human labels and the URL each page group previews. */
export const SECTION_PAGES = [
  { id: 'home', label: 'Home', path: '/' },
  { id: 'about', label: 'About', path: '/about' },
  { id: 'contact', label: 'Contact', path: '/contact' },
  { id: 'locations', label: 'Locations', path: '/locations' },
  { id: 'global', label: 'Site-wide', path: '/' },
];

export const SECTIONS_BY_KEY = SECTIONS.reduce((acc, s) => {
  acc[s.key] = s;
  return acc;
}, {});

export const getSectionDefaults = (key) => SECTIONS_BY_KEY[key]?.defaults ?? {};
