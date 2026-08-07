# CONTENT-DIFF — data-only content audit

**Scope:** data/content only. No layout, styling, component, animation, 3D-canvas or
routing changes were made.

**Files changed:** `src/data/site.js` (only)

**Source of truth:** https://technosales.in

> ⚠️ **The live site could not be reached for verification.** Both
> `https://technosales.in/` and `https://technosales.in/blog/` returned
> **HTTP 403 Forbidden** to automated requests. Every change below is therefore
> applied from the values supplied in the brief, not independently re-verified
> against the live pages. Anything the brief did not supply is listed as
> **BLOCKED** rather than invented — see §8.

---

## 1. STATS — `MILESTONES` ✅ done

| # | Old | New |
|---|---|---|
| 1 | `10+ Years of Experience` | unchanged |
| 2 | `1000+ Clients Across Gujarat` | unchanged |
| 3 | `99% Client Retention` | unchanged (moved to last) |
| 4 | `5 — Authorized Brand Lines` | **REMOVED** |
| 5 | — | **ADDED** `8,000+ Happy Customers` |
| 6 | — | **ADDED** `10,000+ SKUs` |

Removal reason retained as an inline comment in the data file: not on the live
site, and it contradicts our own copy (only Siemens and Polycab are described as
authorized distributorships).

**Note:** the band now renders **5** tiles instead of 4. The grid is
`repeat(auto-fit, minmax(220px, 1fr))`, so it reflows on its own — no CSS was
touched — but the row will wrap to 2 lines at narrower widths. Flagging as a
visual consequence of the data change, not a defect.

Renders in: Home, About, Testimonials.

---

## 2. BRAND AUTHORIZATION LABELS ✅ flagged, not changed

Badges left exactly as-is. `// TODO: confirm with client — live site claims
Authorized Distributor for ABB & FRP` added at **4** places:

| Location | Current value |
|---|---|
| `PARTNERS` → CROMPTON GREAVES (CG) | `TRUSTED SUPPLIER` |
| `PARTNERS` → ABB | `TRUSTED SUPPLIER` |
| `PARTNERS` → FRP PRODUCTS | `SUPPLIER` |
| `PRODUCTS_DATA` → CG Motors `specBadge` | `Trusted Supplier` |
| `PRODUCTS_DATA` → ABB Motors `specBadge` | `Trusted Supplier` |

**Added beyond the brief:** the same claim is also asserted in prose in
`FEATURES[0].desc` — *"Authorized distributor for Siemens and Polycab, and a
trusted supplier of ABB and CG products"*. Flagged with the same TODO, since
changing the badges without this sentence would leave the site contradicting
itself.

---

## 3. MOTOR SPECIFICATIONS ✅ done

### SIEMENS Motors — now efficiency / automation oriented

| Old | New |
|---|---|
| Low Voltage Motors | Low Voltage AC Motors |
| High-Efficiency Motors (IE2/IE3/IE4) | High-Efficiency Motors (IE2 / IE3 / IE4) |
| HVAC Motors | HVAC Motors |
| Brake Motors | Brake Motors |
| **Textile Motors** | **REMOVED** |
| Flameproof & Explosion-Proof Motors | Flameproof & Explosion-Proof Motors |
| — | **ADDED** Custom & Application-Specific Motors |

### CG Motors — now heavy-duty / rugged

Was a byte-identical copy of the Siemens array. Now differentiated.

| Old | New |
|---|---|
| Low Voltage Motors | Low Voltage AC Motors |
| High-Efficiency Motors (IE2/IE3/IE4) | High-Efficiency Motors (IE2 / IE3) |
| HVAC Motors | **REPLACED** → Crane Duty Motors |
| Brake Motors | Brake Motors |
| **Textile Motors** | **REPLACED** → Pump & Fan Duty Motors |
| Flameproof & Explosion-Proof Motors | **REPLACED** → Custom & Application-Specific Motors |

### ABB Motors

| Old | New |
|---|---|
| Low Voltage Motors | Low Voltage AC Motors |
| HVAC Motors | HVAC Motors |
| Brake Motors | Crane Duty & Brake Motors |
| **Process Performance Motors** | **REMOVED** |
| High-Efficiency Motors (IE2/IE3/IE4) | High-Efficiency Motors (IE2 / IE3 / IE4) |
| Flameproof & Explosion-Proof Motors | Flameproof & Explosion-Proof Motors |
| Custom Motors for Special Applications | Custom & Application-Specific Motors *(wording normalised)* |

**"Crane Duty" is now present site-wide** — on CG (`Crane Duty Motors`) and ABB
(`Crane Duty & Brake Motors`). It was absent everywhere before.

---

## 4. CABLES

### ✅ done — invented "XLPE LT aluminium" wording removed

| Location | Old | New |
|---|---|---|
| `CATEGORIES` → cables `blurb` | "Authorized Polycab **XLPE LT aluminium** power cables, multi-core control cables and high-conductivity flexible copper wires…" | "Authorized Polycab LT power cables, control cables and flexible copper wires — including instrumentation and FR/FRLS/HRFR cables for panels and switchboards." |
| `PARTNERS` → POLYCAB `desc` | "Authorized distributor of Polycab **XLPE LT aluminium** power cables, control cables, and flexible copper control wires." | "Authorized distributor of Polycab LT power cables, control cables and flexible copper wires." |

### ⛔ NOT DONE — 2 items require UI changes

**a) Third instance of "XLPE LT Aluminium" still live.**
`src/components/Hero.jsx` → `HERO_SLIDES[2].desc` reads *"Heavy-duty Polycab
**XLPE LT Aluminium** power cables and high-conductivity flexible copper control
wires…"*. Left untouched because it lives in a component file, which the brief
put out of scope. **This is a one-string fix** — replace with:

> `'Heavy-duty Polycab LT power cables and high-conductivity flexible copper control wires for switchboards and panel wiring.'`

**b) Cards drop "FR/FRLS/HRFR Cables".** The detail page is correct and shows all
5. The truncation is in `src/components/ProductCard.jsx`:

```jsx
{product.specs.slice(0, 4).map(...)}
```

Showing all 5, or adding a "+1 more" indicator, requires editing that component.

---

## 5. SWITCHGEARS

### ✅ verified — no change needed

`PRODUCTS_DATA` → SIEMENS Switchgears already lists all 7 correctly: MCB, MCCB,
ACB, Contactors & Overload Relays, Distribution Boards & Panels, Low Voltage
Power Distribution Products, Control & Protection Devices.

### ⛔ NOT DONE — cards show only 4

Same root cause as §4b — `ProductCard.jsx` `slice(0, 4)`. Showing all 7 or a
"+3 more" indicator is a component change.

---

## 6. FRP PRODUCTS ✅ done

| Location | Old | New |
|---|---|---|
| `PARTNERS` → FRP `desc` | "…pultruded cable trays, **structural meshes**, and molded anti-skid floor gratings." | "…pultruded FRP cable trays and moulded anti-skid floor gratings." |
| `PARTNERS` → FRP `lines` | `['FRP Gratings', 'FRP Cable Trays', 'Acid-Resistant Profiles']` | `['FRP Gratings', 'FRP Cable Trays']` |
| `CATEGORIES` → frp `blurb` | "…built for chemical plants and refinery environments." | "…for chemical and petrochemical plants, oil & gas, power plants, wastewater treatment plants, and textile & paper mills." |

`PRODUCTS_DATA` → FRP Products `specs` was already correct (gratings + cable
trays only) — verified, unchanged.

---

## 7. INDUSTRIES SERVED ✅ done — 6 replaced with 8

**Removed:** `Food & Beverage`, `Engineering & Fabrication` (neither on the live site).

| # | Industry | Status |
|---|---|---|
| 1 | Chemical & Petrochemical | kept |
| 2 | Pharmaceutical | kept |
| 3 | Textile & Paper Mills | **renamed** from "Textile & Processing" |
| 4 | Oil & Gas | **added** |
| 5 | Power Plants & Power Distribution | **added** |
| 6 | Wastewater / Effluent Treatment | **renamed** from "Water & Effluent Treatment" |
| 7 | Manufacturing & Infrastructure | **added** |
| 8 | HVAC & Automation | **added** |

Descriptions for the 4 new entries were written to match the product range we
actually stock. **They are new marketing copy and should be reviewed.**

Icons are reused from the existing set (`flask`, `shieldCheck`, `layers`,
`factory`, `zap`, `droplet`, `wrench`, `cog`) specifically so that `Icon.jsx`
did not need editing.

---

## 8. BLOG ⛔ BLOCKED — cannot be completed data-only

This item could not be delivered, for two independent reasons.

### Reason 1 — the required content does not exist and could not be retrieved

The brief supplies **33 titles**, but:

| Field | Supplied | Missing |
|---|---|---|
| Title | 33 / 33 | — |
| Publish date | **10** (page 1 only) | **23** |
| Excerpt | 6 (already in our data) | **27** |
| Slug / URL | 6 (already in our data) | **27** |

`https://technosales.in/blog/` returns **403 Forbidden** to automated requests,
so the missing dates, excerpts and slugs could not be sourced.

Writing 27 excerpts and 23 dates myself would mean inventing content — the exact
class of error this whole task exists to remove. **I did not do it.** The 6
existing posts are left intact and correct.

### Reason 2 — the rest of the item is UI work, which is out of scope

| Requirement | Why it can't be data-only |
|---|---|
| Internal route `/blog/:slug` | Needs a new `<Route>` in `App.jsx` + a `BlogPostPage` component |
| Pagination, 10 per page × 4 pages | Needs pagination state + controls in `BlogPage.jsx` |
| "Popular Feeds" sidebar | Needs new markup in `BlogPage.jsx` |
| Remove category tags (`topic`) | `BlogPage.jsx` / `HomePage.jsx` render `{post.date}<span class="blog-date-sep"/>{post.topic}` — deleting `topic` alone leaves a **dangling separator dot**. Needs a 2-line JSX change in both files. |

Also note: dropping the external `technosales.in` links *before* `/blog/:slug`
exists would leave all "Read Article" buttons pointing at a 404. The external
links were therefore left in place.

**To unblock:** supply the 23 dates + 27 excerpts + slugs (or an export/feed from
the WordPress site), and authorise the `BlogPage` / routing work.

---

## 9. FOOTER / GLOBAL ⛔ NOT DONE — all four items need component changes

| Item | Required change | Status |
|---|---|---|
| "Product Categories" list | Live wants **6** entries (CG Motors, Siemens Motors, ABB Motors, Siemens Switchgears, Cables & Wires, FRP Products). `Footer.jsx` currently maps `CATEGORIES`, which is the **4** browse-categories. Needs a new data array *and* a one-line import/map change in `Footer.jsx`. | ⛔ |
| Newsletter block ("Never Miss News" / "Subscribe") | New markup + stub form in `Footer.jsx` | ⛔ |
| "Follow us:" social row | New markup in `Footer.jsx`; **links still TBD from client** | ⛔ |
| Copyright year | `Footer.jsx` hardcodes **2026**; live shows **2024** | ⛔ **TODO: confirm correct year with client** |

None were applied — each requires editing `Footer.jsx`.

---

## 10. VERIFY-ONLY — confirmed correct, untouched ✅

| Item | Result |
|---|---|
| Address — Old N H, No 8, B/5-6, Kewal Shopping Centre, Ankleshwar GIDC, Ankleshwar, Gujarat 393002 | ✅ matches |
| Phone — +91 98980 78247 | ✅ matches |
| Email — Mktg@Technosales.In | ✅ matches |
| Hours — Monday–Friday 09:00 AM – 06:00 PM | ✅ matches |
| Team — Hemant Patel (Director), Manish Patel (General Manager) | ✅ matches |
| Testimonials | ✅ 6 present |
| FAQs | ✅ 5 present |
| Mission & Vision | ✅ present, unchanged (in `AboutPage.jsx`) |

Live-site placeholder junk ("Main Street, Melbourne, Australia",
"Info@Example.Com", "+11002345909", "09am-05pm", "Ploycab") correctly **not**
imported — our values were already right.

---

## Summary

| § | Item | Status |
|---|---|---|
| 1 | Stats | ✅ done |
| 2 | Brand authorization labels | ✅ flagged (5 TODOs) |
| 3 | Motor specifications | ✅ done |
| 4 | Cables | ⚠️ partial — 2 UI items outstanding |
| 5 | Switchgears | ✅ verified / ⛔ card truncation is UI |
| 6 | FRP products | ✅ done |
| 7 | Industries served | ✅ done |
| 8 | Blog | ⛔ blocked — missing source content + UI work |
| 9 | Footer / global | ⛔ all UI work |
| 10 | Verify-only | ✅ all correct |

### Open TODOs for client confirmation

1. **ABB / FRP / CG authorization status** — is the live site's "Authorized
   Distributor" claim correct? Affects 5 badge values and 1 prose sentence.
2. **Copyright year** — 2024 (live) or 2026 (ours)?
3. **Social media URLs** — needed before the "Follow us" row can be built.
4. **Blog category tags** — keep our invented ones, or drop as the brief suggests?
5. **Food & Beverage / Engineering & Fabrication** — removed from industries;
   confirm they should stay out.
6. **23 blog dates + 27 excerpts + slugs** — required before blog migration.
