/**
 * Per-record SEO fields, shared by every model that has a public URL:
 * Product, Category, BlogPost and LocationCity.
 *
 * Kept flat rather than nested under a `seo` object to match the rest of the
 * models in this folder, and so the admin's entity-config forms can bind to the
 * field names directly with no toForm/toPayload mapping.
 *
 * Every field is optional. When one is blank the public site falls back to the
 * record's own content (name/title, excerpt/desc), so an untouched record keeps
 * exactly the SEO it has today.
 */
export const seoFields = {
  // ~60 chars before Google truncates it in the results page.
  metaTitle: { type: String, trim: true },
  // ~160 chars before truncation.
  metaDescription: { type: String, trim: true },
  metaKeywords: { type: String, trim: true },
  // Set when this record duplicates another URL and should not compete with it.
  canonicalUrl: { type: String, trim: true },
  // Preview image for social shares (og:image / twitter:image).
  ogImage: { type: String, trim: true },
  ogImageAlt: { type: String, trim: true },
};

/**
 * Alt text for a model's main `image`. Separate from seoFields because
 * LocationCity has no image of its own.
 */
export const imageAltField = {
  imageAlt: { type: String, trim: true },
};

/** The keys a controller must pick off req.body for the fields above. */
export const SEO_KEYS = Object.keys(seoFields);
export const SEO_KEYS_WITH_IMAGE_ALT = [...SEO_KEYS, ...Object.keys(imageAltField)];

/**
 * Picks just the SEO keys out of a request body.
 *
 * Controllers here destructure req.body field by field, so anything not named
 * explicitly is dropped on save. This keeps that behaviour (no blind spread of
 * user input) without repeating six keys in eight places.
 */
export const pickSeo = (body = {}, { withImageAlt = false } = {}) => {
  const keys = withImageAlt ? SEO_KEYS_WITH_IMAGE_ALT : SEO_KEYS;
  return keys.reduce((acc, key) => {
    if (body[key] !== undefined) acc[key] = body[key];
    return acc;
  }, {});
};
