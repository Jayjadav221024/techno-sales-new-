/**
 * Database seeder.
 *
 * Creates the menu groups, menus and the first admin user so a fresh database
 * can be logged into, and backfills the soft-delete flag. Safe to re-run:
 * everything is upserted by name/email and an existing admin user's password is
 * never overwritten.
 *
 *   npm run seed
 */
// Must stay the first import — see models/softDelete.js.
import "../models/softDelete.js";

import fs from "fs";
import path from "path";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

import MenuGroupMaster from "../models/MenuGroupMaster.js";
import MenuMaster from "../models/MenuMaster.js";
import AdminUser from "../models/AdminUser.js";
import Category from "../models/Category.js";
import Product from "../models/Product.js";
import BlogPost from "../models/BlogPost.js";
import Inquiry from "../models/Inquiry.js";
import Testimonial from "../models/Testimonial.js";
import LocationCity from "../models/LocationCity.js";
import Faq from "../models/Faq.js";
import BrandPartner from "../models/BrandPartner.js";

dotenv.config();

/**
 * Techno Sales Menu tree.
 */
const MENU_GROUPS = [
  {
    menuGroupName: "Dashboard",
    sequence: 1,
    isLink: true,
    menuUrl: "/dashboard",
    icon: "ri-dashboard-2-line",
    menus: [],
  },
  {
    menuGroupName: "Catalog",
    sequence: 2,
    icon: "ri-store-2-line",
    menus: [
      { menuName: "Products", menuUrl: "/product", icon: "ri-shopping-bag-3-line" },
      { menuName: "Categories", menuUrl: "/category", icon: "ri-folders-line" },
      { menuName: "Brand Partners", menuUrl: "/brand-partner", icon: "ri-medal-line" },
    ],
  },
  {
    menuGroupName: "Leads & RFQs",
    sequence: 3,
    icon: "ri-customer-service-2-line",
    menus: [
      { menuName: "Inquiries & RFQs", menuUrl: "/inquiry", icon: "ri-mail-star-line" },
    ],
  },
  {
    menuGroupName: "Content (CMS)",
    sequence: 4,
    icon: "ri-article-line",
    menus: [
      // Click-to-edit editor for the website's static sections. First in the
      // group because it is the screen a non-developer reaches for.
      { menuName: "Website", menuUrl: "/website", icon: "ri-layout-masonry-line" },
      { menuName: "Blog Posts", menuUrl: "/blog-post", icon: "ri-newspaper-line" },
      { menuName: "Testimonials", menuUrl: "/testimonial", icon: "ri-feedback-line" },
      { menuName: "FAQs", menuUrl: "/faq", icon: "ri-questionnaire-line" },
      { menuName: "Service Locations", menuUrl: "/location-city", icon: "ri-map-pin-range-line" },
      { menuName: "Careers", menuUrl: "/career", icon: "ri-briefcase-line" },
    ],
  },
  {
    menuGroupName: "Master & Setup",
    sequence: 5,
    icon: "ri-settings-3-line",
    menus: [
      { menuName: "Admin Users", menuUrl: "/admin-user", icon: "ri-shield-user-line" },
      { menuName: "Users", menuUrl: "/user", icon: "ri-user-3-line" },
      { menuName: "Department", menuUrl: "/department", icon: "ri-building-line" },
      { menuName: "User Roles", menuUrl: "/user-roles", icon: "ri-lock-password-line" },
      { menuName: "Country", menuUrl: "/country", icon: "ri-earth-line" },
      { menuName: "State", menuUrl: "/state", icon: "ri-map-2-line" },
      { menuName: "City", menuUrl: "/city", icon: "ri-map-pin-line" },
      { menuName: "Currency", menuUrl: "/currency-master", icon: "ri-money-dollar-circle-line" },
      { menuName: "Role Master", menuUrl: "/role-master", icon: "ri-shield-keyhole-line" },
      { menuName: "Menu Group", menuUrl: "/menu-group", icon: "ri-menu-2-line" },
      { menuName: "Menu Master", menuUrl: "/menu-master", icon: "ri-list-check-2" },
      { menuName: "Login Attempt Logs", menuUrl: "/login-attempt-logs", icon: "ri-history-line" },
    ],
  },
  {
    menuGroupName: "Email Settings",
    sequence: 6,
    icon: "ri-mail-settings-line",
    menus: [
      { menuName: "Email Setup", menuUrl: "/email-setup", icon: "ri-mail-settings-line" },
      { menuName: "Email For", menuUrl: "/email-for", icon: "ri-mail-open-line" },
      { menuName: "Email Template", menuUrl: "/email-template", icon: "ri-mail-line" },
    ],
  },
];

const seedMenus = async () => {
  let groupCount = 0;
  let menuCount = 0;

  for (const { menus, ...group } of MENU_GROUPS) {
    const savedGroup = await MenuGroupMaster.findOneAndUpdate(
      { menuGroupName: group.menuGroupName },
      { ...group, isLink: group.isLink || false, isActive: true },
      { new: true, upsert: true, setDefaultsOnInsert: true },
    );
    groupCount += 1;

    for (const [index, menu] of menus.entries()) {
      await MenuMaster.findOneAndUpdate(
        { menuName: menu.menuName, menuGroup: savedGroup._id },
        {
          ...menu,
          menuGroup: savedGroup._id,
          sequence: index + 1,
          isActive: true,
          isParent: false,
          parentMenu: null,
        },
        { new: true, upsert: true, setDefaultsOnInsert: true },
      );
      menuCount += 1;
    }
  }

  console.log(`✅ Seeded ${groupCount} menu groups and ${menuCount} menus`);
};

const seedTechnoSalesData = async () => {
  console.log("🌱 Seeding Techno Sales Catalog and CMS Data...");

  // 1. Categories
  const categoriesData = [
    {
      name: "Motors",
      slug: "motors",
      navLabel: "Motors",
      title: "Industrial Motors",
      tagline: "Siemens, CG & ABB induction motors",
      image: "/images/categories/industrial-motors.jpg",
      blurb: "Energy-efficient IE2/IE3/IE4 induction motors from Siemens, Crompton Greaves and ABB — sized, stocked and supported for continuous plant duty across Ankleshwar GIDC.",
      sequence: 1,
    },
    {
      name: "Cables & Wires",
      slug: "cables",
      navLabel: "Cables & Wires",
      title: "Polycab Cables & Wires",
      tagline: "LT power, control & flexible wiring",
      image: "/images/categories/polycab-cables.jpg",
      blurb: "Authorized Polycab LT power cables, control cables and flexible copper wires — including instrumentation and FR/FRLS/HRFR cables for panels and switchboards.",
      sequence: 2,
    },
    {
      name: "SIEMENS Switchgears",
      slug: "switchgears",
      navLabel: "SIEMENS Switchgears",
      title: "SIEMENS Switchgears",
      tagline: "MCB, MCCB, ACB & contactors",
      image: "/images/categories/siemens-switchgears.jpg",
      blurb: "Authorized Siemens circuit protection — MCBs, MCCBs, ACBs, SIRIUS contactors and overload relays for industrial electrical safety and panel building.",
      sequence: 3,
    },
    {
      name: "FRP Products",
      slug: "frp",
      navLabel: "FRP Products",
      title: "FRP Gratings & Cable Trays",
      tagline: "Corrosion-proof structural solutions",
      image: "/images/categories/frp-products.jpg",
      blurb: "Anti-corrosive, non-conductive FRP gratings and pultruded cable trays for chemical and petrochemical plants, oil & gas, power plants, wastewater treatment plants, and textile & paper mills.",
      sequence: 4,
    },
  ];

  for (const cat of categoriesData) {
    await Category.findOneAndUpdate({ slug: cat.slug }, cat, { upsert: true, setDefaultsOnInsert: true });
  }

  // 2. Products
  const productsData = [
    {
      name: "SIEMENS Motors",
      slug: "siemens-motors",
      categorySlug: "motors",
      brand: "SIEMENS",
      specBadge: "Authorized Distributor",
      specs: ["Low Voltage AC Motors", "High-Efficiency Motors (IE2/IE3/IE4)", "HVAC Motors", "Brake Motors", "Textile Motors", "Flameproof & Explosion-Proof Motors"],
      desc: "High-performance Siemens electric motors designed for energy efficiency, extreme durability, and continuous industrial operations.",
      image: "/images/products/siemens-motors.jpg",
      sequence: 1,
    },
    {
      name: "CG Motors",
      slug: "cg-motors",
      categorySlug: "motors",
      brand: "CG (Crompton)",
      specBadge: "Trusted Supplier",
      specs: ["Low Voltage AC Motors", "High-Efficiency Motors (IE2/IE3/IE4)", "HVAC Motors", "Brake Motors", "Textile Motors", "Flameproof & Explosion-Proof Motors"],
      desc: "Crompton Greaves (CG) heavy-duty induction motors engineered for rugged environments, pump systems, and industrial fans.",
      image: "/images/products/cg-motors.jpg",
      sequence: 2,
    },
    {
      name: "ABB Motors",
      slug: "abb-motors",
      categorySlug: "motors",
      brand: "ABB",
      specBadge: "Trusted Supplier",
      specs: ["Process Performance Motors", "General Performance Motors", "Hazardous Area Motors", "Flameproof Motors", "Marine Motors"],
      desc: "World-class ABB electric motors delivering high reliability, energy efficiency, and advanced process motor automation.",
      image: "/images/products/abb-motors.jpg",
      sequence: 3,
    },
    {
      name: "SIEMENS Switchgears",
      slug: "siemens-switchgears",
      categorySlug: "switchgears",
      brand: "SIEMENS",
      specBadge: "Authorized Distributor",
      specs: ["MCB", "MCCB", "ACB", "Contactors & Overload Relays", "Distribution Boards & Panels", "Low Voltage Power Distribution Products"],
      desc: "Authorized Siemens circuit breakers, MCCBs, control switches, and contactors designed for industrial electrical safety.",
      image: "/images/products/siemens-switchgears.jpg",
      sequence: 4,
    },
    {
      name: "Polycab Cables & Wires",
      slug: "polycab-cables-wires",
      categorySlug: "cables",
      brand: "POLYCAB",
      specBadge: "Authorized Distributor",
      specs: ["LT Power Cables", "LT Control Cables", "Armoured & Unarmoured Cables", "Flexible Single Core & Multi Core Copper Wires", "FR / FRLS / HRFR Building Wires"],
      desc: "Authorized Polycab industrial power and control cables built for high conductivity, superior insulation, and fire safety.",
      image: "/images/products/polycab-cables.jpg",
      sequence: 5,
    },
    {
      name: "FRP Products",
      slug: "frp-products",
      categorySlug: "frp",
      brand: "FRP",
      specBadge: "Supplier",
      specs: ["FRP Gratings", "FRP Cable Trays", "FRP Ladders & Handrails", "Custom FRP Structures"],
      desc: "Anti-corrosive fiberglass reinforced plastic floor gratings and chemical-resistant pultruded ladder cable trays.",
      image: "/images/products/frp-products.jpg",
      sequence: 6,
    },
  ];

  for (const prod of productsData) {
    await Product.findOneAndUpdate({ slug: prod.slug }, prod, { upsert: true, setDefaultsOnInsert: true });
  }

  // 3. Blog Posts
  const blogsData = [
    {
      title: "Why Buy FRP Gratings and Cable Trays from Techno Sales?",
      slug: "buy-frp-gratings-cable-trays-techno-sales",
      topic: "Motors & FRP",
      excerpt: "FRP gratings and FRP cable trays are appropriate selections for plants where the presence of corrosion, moisture, chemicals, and other challenging conditions could render normal materials ineffective.",
      image: "/images/blog/frp-gratings-cable-trays.jpg",
      publishDate: "5 August, 2026",
    },
    {
      title: "CG Motors vs Siemens Motors: Which Is Better for Industrial Applications?",
      slug: "cg-motors-vs-siemens-motors",
      topic: "Motors",
      excerpt: "Both CG Motors and Siemens Motors are reliable choices in industrial motors, but the best decision depends on your application, budget, and working environment.",
      image: "/images/blog/cg-vs-siemens-motors.jpg",
      publishDate: "28 July, 2026",
    },
    {
      title: "Why Siemens Switchgear Is Becoming the First Choice for Gujarat Industries",
      slug: "siemens-switchgear-gujarat-industries",
      topic: "Switchgears",
      excerpt: "Siemens switchgear is becoming the preferred choice for industrial electrical setups in Gujarat's GIDC chemical and engineering zones due to safety, reliability, and innovative technologies.",
      image: "/images/blog/siemens-switchgear-gujarat.jpg",
      publishDate: "20 July, 2026",
    },
    {
      title: "Top Benefits of Polycab Industrial Cables",
      slug: "top-benefits-polycab-industrial-cables",
      topic: "Cables",
      excerpt: "Polycab wires and cables are suitable for industrial use because of their high-efficiency conducting properties, strong insulation, flexibility, durability, and safety certifications.",
      image: "/images/blog/polycab-industrial-cables.jpg",
      publishDate: "6 July, 2026",
    },
  ];

  for (const b of blogsData) {
    await BlogPost.findOneAndUpdate({ slug: b.slug }, b, { upsert: true, setDefaultsOnInsert: true });
  }

  // 4. Testimonials
  const testimonialsData = [
    {
      name: "Atul Panchal",
      role: "Shiva Pharma",
      initials: "AP",
      text: "Techno Sales provided top-quality FRP gratings that made our factory floor safe and durable. Their quick service and expert support ensured a smooth experience.",
      sequence: 1,
    },
    {
      name: "Abhay",
      role: "Spectom",
      initials: "AB",
      text: "Techno Sales impressed us with unmatched switchgear expertise. Their quality products and expert guidance helped us choose the right components.",
      sequence: 2,
    },
    {
      name: "Mukesh Dobariya",
      role: "Hi-Make",
      initials: "MD",
      text: "Always on time and competitively priced, Techno Sales is our trusted go-to partner. Their consistent support and product quality make them essential.",
      sequence: 3,
    },
  ];

  for (const t of testimonialsData) {
    await Testimonial.findOneAndUpdate({ name: t.name }, t, { upsert: true, setDefaultsOnInsert: true });
  }

  // 5. Locations
  const locationsData = [
    { name: "Ankleshwar", slug: "ankleshwar", district: "Bharuch District", distance: "0 KM", zones: "8", title: "Authorized Industrial Motors, Cables & Switchgears in Ankleshwar", sequence: 1 },
    { name: "Bharuch", slug: "bharuch", district: "Bharuch District", distance: "~15 KM", zones: "6", title: "Heavy-Duty Cables, Motors & FRP Structures in Bharuch & Dahej", sequence: 2 },
    { name: "Vadodara", slug: "vadodara", district: "Vadodara District", distance: "~85 KM", zones: "5", title: "Industrial Motors, Cables & FRP Gratings in Vadodara", sequence: 3 },
    { name: "Surat", slug: "surat", district: "Surat District", distance: "~65 KM", zones: "7", title: "Industrial Panel Wires, Switchgears & Motors in Surat", sequence: 4 },
    { name: "Ahmedabad", slug: "ahmedabad", district: "Ahmedabad District", distance: "~180 KM", zones: "6", title: "FRP Gratings, Cable Trays & Industrial Drives in Ahmedabad", sequence: 5 },
    { name: "Anand", slug: "anand", district: "Anand District", distance: "~140 KM", zones: "4", title: "Power Cables, Switchgears & Motors in Anand", sequence: 6 },
    { name: "Vapi", slug: "vapi", district: "Valsad District", distance: "~140 KM", zones: "5", title: "Industrial Electrical Spares in Vapi GIDC", sequence: 7 },
  ];

  for (const l of locationsData) {
    await LocationCity.findOneAndUpdate({ slug: l.slug }, l, { upsert: true, setDefaultsOnInsert: true });
  }

  // 6. FAQs
  const faqsData = [
    { question: "What are Siemens Switchgears used for?", answer: "Siemens switchgears are used for safe and efficient control of electrical power in industrial and commercial applications. They help protect electrical circuits from overloads and short circuits.", category: "Switchgears", sequence: 1 },
    { question: "What types of electric motors do you offer?", answer: "Techno Sales supplies a wide range of motors including Low Voltage AC Motors, IE2/IE3/IE4 energy-efficient motors, Flameproof Motors, Brake Motors, and custom-built options from trusted brands like ABB, Siemens, and Crompton.", category: "Motors", sequence: 2 },
    { question: "Are your Polycab cables ISI-certified?", answer: "Yes, all Polycab products we supply are certified and compliant with Indian and international safety standards.", category: "Cables", sequence: 3 },
    { question: "Do you offer bulk or project pricing?", answer: "Yes, we offer special pricing for bulk orders, EPC projects, and industrial contractors.", category: "General", sequence: 4 },
  ];

  for (const f of faqsData) {
    await Faq.findOneAndUpdate({ question: f.question }, f, { upsert: true, setDefaultsOnInsert: true });
  }

  // 7. Brand Partners
  const brandPartnersData = [
    { name: "SIEMENS SWITCHGEARS", badge: "AUTHORIZED DISTRIBUTOR", badgeType: "official", desc: "Authorized distributor for Siemens MCCBs, SIRIUS Power Contactors, and premium efficiency IE3/IE4 motors.", lines: ["Low Voltage Motors", "Switchgears", "IE2/IE3/IE4 Motors"], sequence: 1 },
    { name: "CG MOTORS", badge: "TRUSTED SUPPLIER", badgeType: "certified", desc: "Trusted supplier of Crompton Greaves heavy-duty industrial induction motors built for harsh environments.", lines: ["Harsh-Duty Motors", "Pumps & Fans", "Industrial Drives"], sequence: 2 },
    { name: "ABB MOTORS", badge: "TRUSTED SUPPLIER", badgeType: "certified", desc: "Trusted supplier of ABB low voltage motors, soft starters, and smart breaker components.", lines: ["General Purpose Motors", "Soft Starters", "Control Systems"], sequence: 3 },
    { name: "POLYCAB CABLES", badge: "AUTHORIZED DISTRIBUTOR", badgeType: "official", desc: "Authorized distributor of Polycab LT power cables, control cables and flexible copper wires.", lines: ["Cables & Wires", "Flexible Wires", "LT Power Cables"], sequence: 4 },
    { name: "FRP PRODUCTS", badge: "SUPPLIER", badgeType: "supplier", desc: "Supplier of chemical-resistant pultruded FRP cable trays and moulded anti-skid floor gratings.", lines: ["FRP Gratings", "FRP Cable Trays"], sequence: 5 },
  ];

  for (const bp of brandPartnersData) {
    await BrandPartner.findOneAndUpdate({ name: bp.name }, bp, { upsert: true, setDefaultsOnInsert: true });
  }

  console.log("✅ Seeded Techno Sales Catalog, CMS, and Partner datasets successfully");
};

const seedAdminUser = async () => {
  const email = (process.env.SEED_ADMIN_EMAIL || "admin@demopanel.com")
    .trim()
    .toLowerCase();
  const password = process.env.SEED_ADMIN_PASSWORD || "Admin@123";

  const existing = await AdminUser.findOne({ email });
  if (existing) {
    console.log(`ℹ️  Admin user ${email} already exists, password left as is`);
    return;
  }

  await AdminUser.create({
    adminName: process.env.SEED_ADMIN_NAME || "Super Admin",
    email,
    password: await bcrypt.hash(password, 10),
    mobileNumber: process.env.SEED_ADMIN_MOBILE || "9999999999",
    isActive: true,
  });

  console.log(`✅ Created admin user ${email} (password: ${password})`);
};

/**
 * Backfill for the soft-delete plugin (ADR-001), and the only place the unique
 * indexes get rebuilt as partial ones.
 *
 * Documents written before the plugin existed have no `isDeleted` field. Reads
 * still show them — the filter is `$ne: true` — but a partial unique index
 * keyed on `isDeleted: false` would skip them, so uniqueness would silently
 * stop being enforced on exactly the rows that predate this. Set the field
 * first, then sync.
 *
 * Idempotent: the update matches nothing on a second run, and `syncIndexes` is
 * a no-op once the indexes match the schema.
 */
const backfillSoftDelete = async () => {
  // Every model, not just the ones this file seeds — and without a hand-kept
  // list that the seventeenth model would drop off.
  const modelsDir = path.join(import.meta.dirname, "../models");
  for (const file of fs.readdirSync(modelsDir)) {
    if (file.endsWith(".js") && !file.endsWith(".test.js")) await import(`../models/${file}`);
  }

  let flagged = 0;
  for (const model of Object.values(mongoose.models)) {
    const result = await model.collection.updateMany(
      { isDeleted: { $exists: false } },
      { $set: { isDeleted: false } },
    );
    flagged += result.modifiedCount;
    // Rewrites plain unique indexes as partial ones. Note this also drops any
    // index that exists in the database but not in a schema.
    await model.syncIndexes();
  }

  console.log(`✅ Soft delete: flagged ${flagged} existing documents, indexes in sync`);
};

const run = async () => {
  if (!process.env.DATABASE) {
    console.error("❌ DATABASE is not set in .env");
    process.exit(1);
  }

  mongoose.set("strictQuery", false);
  await mongoose.connect(process.env.DATABASE, {
    serverSelectionTimeoutMS: 10000,
  });
  console.log("✅ DB connected");

  await backfillSoftDelete();
  await seedMenus();
  await seedAdminUser();
  await seedTechnoSalesData();

  await mongoose.disconnect();
  console.log("✅ Seeding complete");
};

run().catch(async (error) => {
  console.error("❌ Seeding failed:", error);
  await mongoose.disconnect();
  process.exit(1);
});
