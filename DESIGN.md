# DESIGN.md — Arif Mia site redesign (demo)

> Approved design context for this rebuild. Later changes must follow it or
> update it with a stated reason. (fix500: 018, 481)

## 1. Brief

- **Project:** demo redesign of arifmia.com as a static site for client review.
- **Audience:** local business owners (non-technical) deciding whether to hire
  Arif for SEO. Mostly mobile, often arriving from WhatsApp or Google.
- **Primary tasks:** (1) understand what Arif offers and whether it fits their
  business; (2) see believable proof; (3) request the free audit / start a
  conversation with minimal effort.
- **Offer (one line):** Arif Mia helps local businesses get found on Google
  Search, Google Maps, and AI-powered search — turning visibility into calls
  and customers.
- **Constraints:** static hosting (GitHub Pages, no backend); all content must
  come from arifmia.com or be explicitly marked as demo; must work without
  JavaScript for reading; must respect reduced-motion and OS theme preferences.

## 2. Content inventory & evidence rules

- **Sourced facts (may be stated):** name, location (Barhatta, Netrakona,
  Bangladesh), email, phone/WhatsApp, service list, process steps, "10+
  businesses optimized", the 6-month case-study figures (GSC: 6.21K clicks /
  957K impressions / 0.6% CTR / 11.4 avg. position; GA4: 9.8K users / 18K views
  / 56K events / 1.1K key events), two named testimonials with roles.
- **Unknown / removed:** years of experience, industry count, country count,
  "average +232% growth" as an average (kept only as the single featured
  case-study outcome with its 6-month context), star ratings (no verified
  rating source exists), packaged plans/pricing, "most popular" claims.
- **Honesty rules:** every number carries its context (what, whose, over what
  period); testimonials carry name + role + "as published on arifmia.com";
  screenshots carry source captions; the footer carries a demo label, a
  correction route, and the content owner. (fix500: 276, 278, 282, 298)

## 3. Visual direction — "evidence-led editorial"

**Why this direction:** the audience buys trust, not spectacle. The design
borrows principles (not pixels) from the reference collection:

- *Perplexity (ref 060):* answer-first, calm teal accent, typography carries
  the page, minimal chrome. Justification: matches the AI-search positioning.
- *NerdWallet (ref 050):* deep-green ladder, hairlines instead of shadows,
  comparison tables do the persuading. Justification: proof beats decoration
  for skeptical owners.
- *Claude (ref 011) / Linear (ref 037):* serif display voice + one restrained
  accent + real screenshots as proof. Justification: a human expert's site
  should not look like generic AI output (fix500: 002, 126).

**What was deliberately removed, and why:** floating glass header (unstable
reading surface, 202) → solid sticky header with hairline; hero dashboard
mockups (fabricated demonstration, 293) → real captioned figures; auto
testimonial slider (essential facts in carousels, 055; needs pause, 385) →
static quotes; marquee (384, 385) → static list; scroll-reveal on every block
(376) → content visible by default; animated counters → plain numerals;
floating buttons (246) → header + in-flow contact actions; emoji icons (184)
→ inline SVG; pill-everything (201) → shape by role.

## 4. Tokens

```text
--paper         #ffffff        page canvas (light)
--surface       #f4f8f7        tinted section surface (light)
--wash          #e9f4f1        highlight wash for key facts (light)
--ink           #0b1b33        headings, navy-ink
--body          #33415c        running text
--muted         #5a6478        secondary text (6.0:1 on paper — passes AA)
--hairline      #dde6e3        borders, dividers
--action        #046a63        deep teal: primary buttons, links, active states
--action-ink    #ffffff        text on action (6.5:1 — passes AA)
--accent        #0aa29a        brand teal: large display touches, graphics only
--navy          #061c43        footer + dark surfaces
--focus         #0aa29a        focus ring (3px, offset 2px)
--radius-btn    10px           buttons, inputs (rectangles, not pills)
--radius-card   14px           cards
--radius-tag    8px            tags ≠ buttons (shape by role)
--shadow-1      0 1px 2px rgba(6,28,67,.08), 0 8px 24px -12px rgba(6,28,67,.25)
                single elevation tier: sticky header + open menu only
Dark theme: canvas #081426, surface #0c1d3d, ink #edf3f1, body #c4d2e8,
muted #9fb0cc, hairline rgba(255,255,255,.12), action #2bb7a9 with
#052e2b text (≈7:1). Follows prefers-color-scheme unless the user saved a
choice; choice persists in localStorage; applied pre-paint (no flash).
```

**Semantic roles:** teal = action/selection only; no second chromatic accent;
status is always text + icon, never hue alone. (fix500: 151, 155)

## 5. Typography

- **Display:** Newsreader (serif, optical sizing), 500–600, headlines only.
  Rationale: human, editorial, distinct from generic sans-only AI output.
- **Body/UI:** Inter 400–600. Rationale: coverage + legibility; tabular
  numerals for all data (`font-variant-numeric: tabular-nums`).
- Base 17px / 1.6; prose capped at 68ch; section eyebrows are numbered
  ("01 — Services") in small caps sans. No all-caps paragraphs; no gradient
  text; no display tracking on body.

## 6. Composition & components

- Header: solid `--paper`, hairline bottom border, sticky; logo (links home),
  nav with `aria-current="page"`, theme toggle, one primary CTA. Mobile nav
  is an in-flow expanding panel (`aria-expanded`, Escape closes, focus
  returns). Anchors use `scroll-margin-top`.
- Hero: plain-language H1 stating the offer + outcome; one primary CTA, one
  subordinate proof link; portrait captioned with its job (the human you
  work with); case-snapshot card with real, contextualized figures.
- Sections vary rhythm: statement + table, hairline index rows (services),
  ordered steps (process `<ol>`), static quote figures, native `<details>`
  FAQs, data `<table>`s with `<th scope>` for results.
- Motion: none decorative. Only theme cross-fade, hover color shifts (no
  target-moving lifts), and native disclosure. `prefers-reduced-motion`
  disables even these.
- Form: persistent `<label>`s, required marked with text "(required)",
  `autocomplete` attributes, native validation (no fake success), honest
  outcome: after submit the page offers real send-channels (Email / WhatsApp
  with prefilled text) announced via `role="status"`.

## 7. Responsive & resilience

- Fluid layout, content-driven breakpoints (~960px, ~640px); 320px reflow
  with no 2-D scrolling; touch targets ≥ 24px (most ≥ 44px); no-JS reading
  fully intact (`<noscript>` reveals nav); images carry dimensions/aspect
  ratio, hero eager, rest lazy; pinch-zoom unrestricted.

## 8. Asset provenance (fix500: 492)

| Asset | Source | License/permission |
|---|---|---|
| Portrait + screenshots + logo (hotlinked) | arifmia.com media library (client's own site) | Client-owned; demo for the same owner |
| `assets/fonts/orlean.ttf` | Supplied by the site commissioner (file upload) | ⚠️ UNVERIFIED — the file's internal name table identifies it as "SF Pro Display Semibold" (Apple proprietary, not licensed for web embedding). Owner must confirm rights or replace before production. |
| Icons | hand-drawn inline SVG in this repo | Original, MIT with repo |

## 9. Route inventory (fix500: 496)

`/` home · `/about.html` · `/services.html` · `/results.html` ·
`/contact.html` · `404.html`. States: menu open/closed · details open ·
form initial/submitted · light/dark (+ OS default) · 320px → desktop ·
no-JS · keyboard-only.

## 10. Review record (honest)

Checked by the builder (static inspection + local HTTP serve; no browser
instrumentation available in this environment):

- [x] All routes + CSS + JS return 200 locally; internal links resolve.
- [x] Contrast pairs spot-checked against WCAG ratios (AA targets).
- [x] Markup reviewed: one H1 per page, landmarks, skip link, aria-current,
      labelled controls, table headers, details/summary FAQs.
- [x] Orlean TTF serves correctly; every non-ASCII character used on-site
      verified present in its cmap; no external font requests remain.
- [ ] Rendered visual review at 320/768/1280px — needs human check.
- [ ] Keyboard walkthrough + screen-reader pass — needs human check.
- [ ] Field performance (LCP/INP/CLS) — needs real-device measurement.
- [ ] Final claim sign-off by content owner (Arif Mia).
