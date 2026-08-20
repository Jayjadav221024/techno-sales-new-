import { Hash02, Image01, Link01, SearchLg, Tag01 } from "@untitledui/icons";

/**
 * The SEO block shared by every entity with a public URL: Product, Category,
 * Blog Post and Service Location.
 *
 * Field names match models/seo.js on the server one-for-one, so the generic
 * CRUD form can post them straight through with no toForm/toPayload mapping.
 *
 * All of it is optional. Left blank, the public site falls back to the record's
 * own name/title and description - see frontend/src/utils/seo.js.
 */
export const SEO_SECTION = {
    id: "seo",
    title: "SEO & Social Sharing",
    description:
        "Controls how this page looks in Google results and when shared on WhatsApp, LinkedIn or Facebook. Leave blank to use the page's own title and description.",
};

export const SEO_FIELDS = [
    {
        name: "metaTitle",
        icon: SearchLg,
        label: "Meta Title",
        section: "seo",
        full: true,
        placeholder: "e.g. Siemens Industrial Motors in Ankleshwar | Techno Sales",
        hint: "Shown as the blue headline in Google. Around 60 characters before it gets cut off.",
    },
    {
        name: "metaDescription",
        type: "textarea",
        label: "Meta Description",
        section: "seo",
        full: true,
        rows: 3,
        placeholder: "Short summary that appears under the title in search results...",
        hint: "The grey text under the Google headline. Around 160 characters.",
    },
    {
        name: "metaKeywords",
        icon: Tag01,
        label: "Meta Keywords",
        section: "seo",
        full: true,
        placeholder: "siemens motors, industrial motors ankleshwar, ie3 motors",
        hint: "Comma separated. Google ignores these, but some other search engines and internal tools still read them.",
    },
    {
        name: "canonicalUrl",
        icon: Link01,
        label: "Canonical URL",
        section: "seo",
        placeholder: "https://technosales.in/products/siemens-motors",
        hint: "Only set this if the same content exists on another URL that should rank instead.",
    },
    {
        name: "ogImage",
        icon: Image01,
        label: "Social Share Image URL",
        section: "seo",
        placeholder: "/images/products/siemens-motors-og.jpg",
        hint: "The preview picture when the link is shared. Falls back to the main image. Best at 1200x630.",
    },
    {
        name: "ogImageAlt",
        label: "Social Share Image Alt Text",
        section: "seo",
        placeholder: "Siemens IE3 industrial motor on a workshop bench",
        hint: "Describes the share image for screen readers.",
    },
];

/**
 * Alt text for the record's main image. Lives beside the image field rather
 * than in the SEO block, so it is filled in while the image is on screen.
 */
export const imageAltField = (section, label = "Image Alt Text") => ({
    name: "imageAlt",
    icon: Hash02,
    label,
    section,
    full: true,
    placeholder: "Describe what the picture shows, e.g. Polycab LT power cable drum",
    hint: "Read aloud by screen readers and shown if the image fails to load. Describe the picture, don't repeat the product name.",
});
