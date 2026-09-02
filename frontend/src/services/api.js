/**
 * Client-side API Service to communicate with the Techno Sales backend API.
 * Provides fallback to static data in case backend is offline or loading.
 */

import {
  PRODUCTS_DATA,
  CATEGORIES,
  BLOG_POSTS,
  TESTIMONIALS,
  FAQS,
  PARTNERS,
  JOB_OPENINGS,
} from '../data/site';

const BACKEND_BASE = (import.meta.env.VITE_API_URL || '').replace(/\/+$/, '');
const API_BASE = `${BACKEND_BASE}/api/v1`;


/**
 * Fetch all active products from backend API (with fallback).
 */
export async function fetchProducts() {
  try {
    const res = await fetch(`${API_BASE}/public/products`);
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    const json = await res.json();
    if (json?.data && Array.isArray(json.data) && json.data.length > 0) {
      return json.data.map(normalizeProduct);
    }
  } catch (err) {
    console.warn('Backend products API unavailable, using cached site data:', err.message);
  }
  return PRODUCTS_DATA;
}

/**
 * Fetch product details by slug or id.
 */
export async function fetchProductBySlug(slug) {
  try {
    const res = await fetch(`${API_BASE}/public/products/${encodeURIComponent(slug)}`);
    if (res.ok) {
      const json = await res.json();
      if (json?.data) {
        return normalizeProduct(json.data);
      }
    }
  } catch (err) {
    console.warn('Backend product detail API error:', err.message);
  }
  return PRODUCTS_DATA.find((p) => p.id === slug || p.slug === slug) || null;
}

/**
 * Fetch one service location by slug.
 *
 * CityDetailPage renders its copy from the CITY_DATA map in that file, so this
 * is currently only used for the record's SEO fields. Returns null when the
 * city has no row in the database yet, in which case the page keeps the
 * metadata it generates from the city name.
 */
export async function fetchLocationBySlug(slug) {
  try {
    const res = await fetch(`${API_BASE}/public/locations/${encodeURIComponent(slug)}`);
    if (res.ok) {
      const json = await res.json();
      if (json?.data) return json.data;
    }
  } catch (err) {
    console.warn('Backend location detail API error:', err.message);
  }
  return null;
}

/**
 * Fetch all active categories from backend API.
 */
export async function fetchCategories() {
  try {
    const res = await fetch(`${API_BASE}/public/categories`);
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    const json = await res.json();
    if (json?.data && Array.isArray(json.data) && json.data.length > 0) {
      return json.data.map(normalizeCategory);
    }
  } catch (err) {
    console.warn('Backend categories API unavailable, using cached site data:', err.message);
  }
  return CATEGORIES;
}

/**
 * Fetch all active blog posts from backend API.
 */
export async function fetchBlogPosts() {
  try {
    const res = await fetch(`${API_BASE}/public/blogs`);
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    const json = await res.json();
    if (json?.data && Array.isArray(json.data) && json.data.length > 0) {
      return json.data.map(normalizeBlogPost);
    }
  } catch (err) {
    console.warn('Backend blogs API unavailable, using cached site data:', err.message);
  }
  return BLOG_POSTS;
}

/**
 * Fetch blog post details by slug.
 */
export async function fetchBlogPostBySlug(slug) {
  try {
    const res = await fetch(`${API_BASE}/public/blogs/${encodeURIComponent(slug)}`);
    if (res.ok) {
      const json = await res.json();
      if (json?.data) {
        return normalizeBlogPost(json.data);
      }
    }
  } catch (err) {
    console.warn('Backend blog post detail API error:', err.message);
  }
  return BLOG_POSTS.find((p) => p.slug === slug) || null;
}

/**
 * Fetch all active testimonials from backend API.
 */
export async function fetchTestimonials() {
  try {
    const res = await fetch(`${API_BASE}/public/testimonials`);
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    const json = await res.json();
    if (json?.data && Array.isArray(json.data) && json.data.length > 0) {
      return json.data.map(normalizeTestimonial);
    }
  } catch (err) {
    console.warn('Backend testimonials API unavailable, using cached site data:', err.message);
  }
  return TESTIMONIALS;
}

/**
 * Fetch all active FAQs from backend API.
 */
export async function fetchFaqs() {
  try {
    const res = await fetch(`${API_BASE}/public/faqs`);
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    const json = await res.json();
    if (json?.data && Array.isArray(json.data) && json.data.length > 0) {
      return json.data.map((f) => ({
        q: f.question,
        a: f.answer,
        category: f.category || 'General',
      }));
    }
  } catch (err) {
    console.warn('Backend FAQs API unavailable, using cached site data:', err.message);
  }
  return FAQS;
}

/**
 * Fetch brand partners from backend API.
 */
export async function fetchBrandPartners() {
  try {
    const res = await fetch(`${API_BASE}/public/brands`);
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    const json = await res.json();
    if (json?.data && Array.isArray(json.data) && json.data.length > 0) {
      return json.data.map(normalizeBrandPartner);
    }
  } catch (err) {
    console.warn('Backend brand partners API unavailable, using cached site data:', err.message);
  }
  return PARTNERS;
}

/**
 * Fetch the active job openings shown on /career.
 *
 * Fetched by CareersPage itself rather than SiteDataContext — only one route
 * needs it, and it is not worth a request on every page load.
 */
export async function fetchJobOpenings() {
  try {
    const res = await fetch(`${API_BASE}/public/careers`);
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    const json = await res.json();
    if (json?.data && Array.isArray(json.data) && json.data.length > 0) {
      return json.data.map(normalizeJobOpening);
    }
  } catch (err) {
    console.warn('Backend careers API unavailable, using cached site data:', err.message);
  }
  return JOB_OPENINGS;
}

/**
 * Submit RFQ or contact form to backend database.
 */
export async function submitInquiry(inquiryData) {
  try {
    const res = await fetch(`${API_BASE}/public/inquiries`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inquiryData),
    });
    return await res.json();
  } catch (err) {
    console.error('Error submitting inquiry to backend:', err);
    return { status: 'error', message: err.message };
  }
}

// Data normalizers so backend DB records match website schema
/**
 * The normalizers below are strict whitelists, so any field not named here is
 * dropped before it reaches a page. Carries the admin-managed SEO fields
 * through. Keep in step with backend/server/models/seo.js.
 */
function seoPassthrough(r) {
  return {
    metaTitle: r.metaTitle || '',
    metaDescription: r.metaDescription || '',
    metaKeywords: r.metaKeywords || '',
    canonicalUrl: r.canonicalUrl || '',
    ogImage: r.ogImage || '',
    ogImageAlt: r.ogImageAlt || '',
    imageAlt: r.imageAlt || '',
  };
}

function normalizeProduct(p) {
  return {
    ...seoPassthrough(p),
    id: p.slug || p._id,
    _id: p._id,
    name: p.name,
    slug: p.slug,
    category: p.categorySlug || p.category,
    brand: p.brand,
    specBadge: p.specBadge || 'Authorized Distributor',
    specs: Array.isArray(p.specs) ? p.specs : typeof p.specs === 'string' ? p.specs.split(',').map(s => s.trim()) : [],
    desc: p.desc || '',
    image: p.image || '',
    icon: p.icon || `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="9"/><path d="M12 3v18M3 12h18M6.3 6.3l11.4 11.4M6.3 17.7L17.7 6.3"/></svg>`,
    intro: Array.isArray(p.intro) ? p.intro : p.intro ? [p.intro] : [],
    applications: Array.isArray(p.applications) ? p.applications : typeof p.applications === 'string' ? p.applications.split(',').map(s => s.trim()) : [],
    whyChoose: Array.isArray(p.whyChoose) ? p.whyChoose : typeof p.whyChoose === 'string' ? p.whyChoose.split(',').map(s => s.trim()) : [],
    faqs: Array.isArray(p.faqs) ? p.faqs : [],
  };
}

function normalizeCategory(c) {
  return {
    ...seoPassthrough(c),
    id: c.slug || c._id,
    _id: c._id,
    name: c.name,
    slug: c.slug,
    navLabel: c.navLabel || c.name,
    title: c.title || c.name,
    tagline: c.tagline || '',
    image: c.image || '',
    blurb: c.blurb || '',
    longIntro: Array.isArray(c.longIntro) ? c.longIntro : c.longIntro ? [c.longIntro] : [],
    subcategories: Array.isArray(c.subcategories) ? c.subcategories : [],
    faqs: Array.isArray(c.faqs) ? c.faqs : [],
  };
}

function normalizeBlogPost(b) {
  return {
    ...seoPassthrough(b),
    slug: b.slug,
    _id: b._id,
    title: b.title,
    topic: b.topic || 'Industrial Guide',
    date: b.publishDate || b.date || '',
    readTime: b.readTime || '5 min read',
    excerpt: b.excerpt || '',
    content: b.content || b.body || '',
    body: b.content || b.body || '',
    image: b.image || '',
  };
}

function normalizeTestimonial(t) {
  return {
    _id: t._id,
    name: t.name,
    role: t.role,
    initials: t.initials || t.name?.split(' ').map(n => n[0]).join('').slice(0, 2) || 'TS',
    rating: t.rating || 5,
    text: t.text || '',
  };
}

function normalizeJobOpening(j) {
  const bullets = (v) =>
    Array.isArray(v) ? v : typeof v === 'string' && v ? v.split('\n').map((s) => s.trim()).filter(Boolean) : [];

  return {
    _id: j._id,
    title: j.title,
    department: j.department || '',
    location: j.location || '',
    employmentType: j.employmentType || 'full-time',
    experience: j.experience || '',
    openings: j.openings ?? 1,
    salaryRange: j.salaryRange || '',
    desc: j.desc || '',
    responsibilities: bullets(j.responsibilities),
    requirements: bullets(j.requirements),
    applyEmail: j.applyEmail || '',
  };
}

function normalizeBrandPartner(bp) {
  return {
    _id: bp._id,
    name: bp.name,
    badge: bp.badge || 'SUPPLIER',
    badgeType: bp.badgeType || 'supplier',
    desc: bp.desc || '',
    lines: Array.isArray(bp.lines) ? bp.lines : typeof bp.lines === 'string' ? bp.lines.split(',').map(s => s.trim()) : [],
    logo: bp.logo || '',
  };
}
