import { useEffect } from 'react';

const SITE_NAME = 'Techno Sales';

/** Creates the tag on first use, then reuses it on every later navigation. */
function upsertMeta(selector, create) {
  let el = document.head.querySelector(selector);
  if (!el) {
    el = create();
    document.head.appendChild(el);
  }
  return el;
}

function setNamedMeta(name, content) {
  const el = upsertMeta(`meta[name="${name}"]`, () => {
    const m = document.createElement('meta');
    m.setAttribute('name', name);
    return m;
  });
  el.setAttribute('content', content ?? '');
}

function setPropertyMeta(property, content) {
  const el = upsertMeta(`meta[property="${property}"]`, () => {
    const m = document.createElement('meta');
    m.setAttribute('property', property);
    return m;
  });
  el.setAttribute('content', content ?? '');
}

function setCanonical(href) {
  const el = upsertMeta('link[rel="canonical"]', () => {
    const l = document.createElement('link');
    l.setAttribute('rel', 'canonical');
    return l;
  });
  el.setAttribute('href', href || window.location.href);
}

/** Absolute URL for social tags - Facebook and LinkedIn reject relative paths. */
function absolute(url) {
  if (!url) return '';
  if (/^https?:\/\//i.test(url)) return url;
  return new URL(url, window.location.origin).href;
}

/** Trims to a whole word rather than cutting mid-word. */
function truncate(text, max) {
  const clean = String(text ?? '').replace(/\s+/g, ' ').trim();
  if (clean.length <= max) return clean;
  return `${clean.slice(0, clean.lastIndexOf(' ', max - 1))}…`;
}

/**
 * Writes the page's SEO tags.
 *
 * Every value is optional: whatever a record leaves blank falls back to the
 * page's own content, so records saved before the SEO fields existed keep the
 * metadata they had.
 */
export function applySeo({
  title,
  description,
  keywords,
  canonicalUrl,
  ogImage,
  ogImageAlt,
  type = 'website',
} = {}) {
  const fullTitle = title ? (title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`) : SITE_NAME;
  const desc = truncate(description, 300);
  const image = absolute(ogImage);

  document.title = fullTitle;
  setNamedMeta('description', desc);
  setNamedMeta('keywords', keywords || '');
  setCanonical(canonicalUrl);

  setPropertyMeta('og:site_name', SITE_NAME);
  setPropertyMeta('og:type', type);
  setPropertyMeta('og:title', fullTitle);
  setPropertyMeta('og:description', desc);
  setPropertyMeta('og:url', canonicalUrl || window.location.href);
  setPropertyMeta('og:image', image);
  setPropertyMeta('og:image:alt', image ? ogImageAlt || '' : '');

  setNamedMeta('twitter:card', image ? 'summary_large_image' : 'summary');
  setNamedMeta('twitter:title', fullTitle);
  setNamedMeta('twitter:description', desc);
  setNamedMeta('twitter:image', image);
}

/**
 * Builds the tag values for one record, preferring its SEO fields and falling
 * back to the content already on the page.
 *
 * `record` is a Product, Category, BlogPost or LocationCity from the API.
 */
export function seoFromRecord(record, fallback = {}) {
  if (!record) return fallback;
  return {
    title: record.metaTitle || fallback.title,
    description: record.metaDescription || fallback.description,
    keywords: record.metaKeywords || fallback.keywords,
    canonicalUrl: record.canonicalUrl || fallback.canonicalUrl,
    // The share image falls back to the record's main picture, and its alt text
    // to the alt already written for that picture.
    ogImage: record.ogImage || record.image || fallback.ogImage,
    ogImageAlt: record.ogImage
      ? record.ogImageAlt
      : record.ogImageAlt || record.imageAlt || fallback.ogImageAlt,
    type: fallback.type || 'website',
  };
}

/**
 * Applies a record's SEO once it has loaded.
 *
 * Child effects run before parent effects in React, so App.jsx deliberately
 * skips the routes that call this - otherwise the parent would overwrite these
 * tags immediately after the page set them.
 */
export function useSeo(seo, deps = []) {
  useEffect(() => {
    applySeo(seo);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
