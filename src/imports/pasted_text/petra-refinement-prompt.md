# PETRA — Premium Refinement Prompt

Use this prompt to guide the next iteration of the PETRA site. Goal: keep the existing color palette, typography, and page structure — they already work — but replace the conventional e-commerce/SaaS interaction patterns with something that matches the "single maker, since 1994" positioning. Premium skin, premium bones.

---

## 1. Collection Grid — make sculptures feel singular, not like inventory

**Current problem:** Uniform 3-column grid, 2px gaps, hover = scale(1.04) + dark overlay + "VIEW WORK" label. This exact pattern is the most common e-commerce card treatment on the web right now — it reads as template, not gallery.

**Changes to make:**
- Replace the uniform 3-column grid with a **mixed/asymmetric layout** — give 1-2 flagship pieces (e.g. the large-format works) a full-bleed or double-width treatment, with smaller pieces filling around them. Break the grid rhythm intentionally.
- Increase gutter spacing significantly (from 2px to something like 24–40px) so each piece reads as its own object, not part of a dense wall.
- Remove the "VIEW WORK" text label and dark scale-up overlay entirely. Replace with a subtle, slow brightness/desaturation shift on hover (no scale transform) and let the cursor itself indicate interactivity (custom cursor or simple crosshair/"view" cursor) rather than a text label.
- Slow down all hover transitions — target 500–700ms ease, not the snappy 200–300ms typical of retail sites. Premium reads as unhurried.

---

## 2. Sculpture Detail Modal — let the object dominate

**Current problem:** 55/45 image/detail split is standard product-detail-page convention.

**Changes to make:**
- Shift proportions to give the image **more visual weight** — try 70/30, or consider a full-bleed image with details revealed on scroll/expand rather than a fixed side-by-side split.
- Consider replacing the modal-with-close-button pattern with a full-screen takeover for the sculpture image, with details appearing as an overlay or a slide-up panel rather than a boxed side panel — closer to how Gagosian/Hauser & Wirth/David Zwirner present individual works.
- Keep dismissal patterns as-is (backdrop click, ×, Escape) — those are fine.

---

## 3. Testimonials — remove the corporate 3-column pattern

**Current problem:** Equal 3-column grid with hairline dividers is the most conventional layout in the entire site — identical to SaaS pricing pages and agency portfolios. Weakest section for premium feel.

**Changes to make:**
- Replace with either:
  - **Option A:** A single large rotating quote (one at a time, generous whitespace, slow auto-advance or manual arrows), styled like the existing Divider Quote Band — reuse that visual language instead of introducing a new grid pattern.
  - **Option B:** Integrate quotes directly into photography of installed sculptures in collectors' actual spaces (if such photography exists or can be commissioned) — this does double duty as social proof of scale and context, which matters more for large stone pieces than text alone.
- Drop the hairline column dividers regardless of which option — they're the most "corporate" visual cue in the section.

---

## 4. Contact / Inquiry Form — make it feel considered, not transactional

**Current problem:** Plain stacked Name/Email/Message fields for a form that may result in a £5,000–£14,500 purchase.

**Changes to make:**
- Add 1–2 additional fields that make the buyer feel like they're entering a bespoke process rather than submitting a generic contact form:
  - Intended setting/space for the piece (e.g. "Interior / Garden / Public space")
  - Budget range or piece(s) of interest (can pre-fill from sculpture if triggered from Detail Modal)
  - Optional timeline field
- Keep the visual styling (hairline borders, focus states) as-is — the field *content*, not the field *chrome*, is what needs to change here.
- Confirmation state ("Thank you") should feel personal — consider varying the copy slightly based on whether it was a generic enquiry vs. a specific-piece enquiry.

---

## 5. Process Step Numbers — verify against "SaaS onboarding" pattern

**Current problem:** Numbered 01–04 steps in amber accent color risk reading like a startup onboarding flow ("01 Sign up, 02 Connect...") if not styled carefully.

**Changes to make:**
- Increase the numeral size relative to the step text, and set them in `Cormorant Display` (not a sans-serif), so they read as sculptural/editorial rather than UI iconography.
- Add generous vertical spacing between steps — avoid tight, compact step lists that resemble product onboarding checklists.

---

## 6. Marquee Strip — reconsider for longevity

**Current problem:** Scrolling ticker/marquee is a widely-used 2023–2025 web design trend. Risk: may look dated within 2-3 years, which matters more for a brand built on timelessness ("since 1994") than for a typical product launch site.

**Changes to make (pick one):**
- **Option A (keep, but slow it down):** Increase duration from 22s to ~40s and reduce it to a single pass rather than a tight loop — make it feel like a quiet detail, not an attention-grabbing device.
- **Option B (replace):** Swap for a static, centered line of the same copy (Carrara · Pietrasanta · Single Maker · Hand-Carved · Since 1994 · Natural Stone) with generous letter-spacing — same information, zero trend-risk, ages better.

---

## Explicit Non-Changes (keep as-is)

- Color palette (stone/ink/dust/warm-mid/warm-faint/amber) — do not alter
- Typography pairing (Cormorant Display + Cormorant SC + Inter) — do not alter
- Page structure / section order / anchor-scroll navigation — do not alter
- Nav bar transparent→filled scroll behavior — do not alter
- Hero, Divider Quote Band, About, Commission section layouts — do not alter, these already read as premium and editorial

---

## Priority Order

1. Collection grid + hover treatment (highest visual impact, most "template" right now)
2. Testimonials section (weakest section currently)
3. Detail modal proportions
4. Contact form fields
5. Process step number styling
6. Marquee decision