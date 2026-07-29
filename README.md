
# PETRA — Stone Sculpture Website

A single-page React application for selling hand-carved stone sculptures by Elena Marchetti, built with React 19 + Vite + Tailwind CSS v4.

---

## Color Palette

| Token | Hex | Usage |
|---|---|---|
| `--stone` | `#faf9f6` | Page background, modal background, button text on dark |
| `--ink` | `#141210` | Primary text, dark backgrounds, CTAs, nav on scroll |
| `--dust` | `#e9e6df` | Image placeholder backgrounds, card fills |
| `--warm-mid` / `C.mid` | `#b8b0a0` | Secondary text, footer links, form labels, stat labels |
| `--warm-faint` / `C.faint` | `#7a7268` | Body copy, captions, section sub-labels |
| `--amber` | `#8a6a3a` | Process step numbers (structural accent only) |
| `C.hairline` | `rgba(20,18,16,0.12)` | Borders, dividers, input outlines |

### Dark Sections
- **Hero** — full-bleed image with `rgba(20,18,16,0.55)` gradient overlay
- **Marquee strip** — solid `#141210` background
- **Divider quote band** — solid `#141210` background
- **Commission section** — solid `#141210` background with faint image overlay at `opacity: 0.18`
- **Footer** — solid `#141210` background

---

## Typography

| Face | Family | Weights | Role |
|---|---|---|---|
| Display / Headings | `Cormorant Display` | 300, 400, 500 (+ italic variants) | All `<h1>–<h4>`, prices, pull quotes |
| Small Caps / Labels | `Cormorant SC` | 300, 400, 500 | Wordmark "PETRA", marquee items, section counters |
| Body / UI | `Inter` | 300, 400, 500 | Body copy, nav links, buttons, form fields |

Loaded via Google Fonts CSS2 `@import` in `src/index.css`.

---

## Page Structure

This is a **single-page application (SPA)** — there is no client-side router. All navigation uses anchor (`#id`) scroll links. There are no separate URL routes.

```
/ (index)
├── #top          → Hero section
├── #collection   → Sculpture grid
├── #process      → Carving process
├── #about        → Sculptor biography
├── #contact      → Contact form
└── [modals]      → Overlaid on current scroll position (no URL change)
```

---

## Section-by-Section Breakdown

### 1. Navigation Bar
- **Position:** Fixed, full-width, `z-index: 80`
- **Transparent state:** White logo + links when `scrollY ≤ 40px`
- **Filled state:** `rgba(250,249,246,0.94)` + blur when `scrollY > 40px`, bottom hairline border appears
- **Links (anchor scroll):**
  - `COLLECTION` → `#collection`
  - `PROCESS` → `#process`
  - `ABOUT` → `#about`
  - `CONTACT` → `#contact`
- **ENQUIRE button** → opens the General Commission Inquiry Modal (no anchor)

---

### 2. Hero (`#top`)
- **Height:** `100vh`
- **Background:** Unsplash image (`photo-1773761542225`) — full cover, `brightness(0.52)` + gradient overlay
- **Content:**
  - Eyebrow: `HAND-CARVED STONE · PIETRASANTA · EST. 1994`
  - Headline: `Carved / from / silence` (italic on "from")
  - Two CTAs:
    - `VIEW COLLECTION` → anchor scroll to `#collection`
    - `The process →` → anchor scroll to `#process`
  - Bottom-right caption: featured work label (static text)
- **Scroll indicator:** Animated vertical line at bottom center

---

### 3. Marquee Strip
- **Background:** `#141210`
- **Content:** Scrolling loop — `Carrara · Pietrasanta · Single Maker · Hand-Carved · Since 1994 · Natural Stone ·`
- **Animation:** CSS `@keyframes marquee`, 22s linear infinite
- **No navigation — decorative only**

---

### 4. Collection (`#collection`)
- **Layout:** 3-column CSS grid, `gap: 2px`
- **Filter buttons:** All · Abstract · Figurative · Large Format
  - Filtering is React state — no page navigation
- **Cards:** Each card shows image, name, material, year, dimensions, price
  - Hover: image scales to `scale(1.04)`, dark overlay with "VIEW WORK" label appears
  - Click: opens **Sculpture Detail Modal**
- **Sold badge:** Absolute-positioned on image for sold works

#### Sculpture Catalogue

| # | Name | Sub-title | Material | Year | Dimensions | Price | Category | Status |
|---|---|---|---|---|---|---|---|---|
| 1 | Forma I | with Void | Carrara Marble | 2024 | 42 × 28 × 18 cm | £4,800 | Abstract | Available |
| 2 | Due Figure | Seated | Portuguese Limestone | 2023 | 68 × 32 × 24 cm | £7,200 | Figurative | Available |
| 3 | Visage | Terrae | Granite | 2024 | 55 × 40 × 30 cm | £6,100 | Figurative | Sold |
| 4 | Archivio | Grande | Pietra Serena | 2022 | 110 × 60 × 45 cm | £14,500 | Large Format | Available |
| 5 | Tensione | Ascendente | Carrara Marble | 2023 | 88 × 35 × 22 cm | £9,800 | Abstract | Available |
| 6 | Equilibrio | in Parco | Belgian Blue Stone | 2024 | 74 × 52 × 38 cm | £11,200 | Large Format | Available |

---

### 5. Divider Quote Band
- **Background:** `#141210`
- **Content:** Elena's quote in large italic `Cormorant Display`, attribution below in small caps
- **No navigation — decorative only**

---

### 6. Process (`#process`)
- **Layout:** 2-column grid — left: text + 4-step breakdown; right: sticky portrait image
- **Image:** Sticky at `top: 100px`, with a hairline border offset behind it
- **Steps:** Numbered 01–04 in amber (`#8a6a3a`):
  1. Stone selection
  2. Rough blocking
  3. Carving
  4. Finishing
- **No navigation within section**

---

### 7. Commission Section
- **Background:** Dark `#141210` with faint marble image at `opacity: 0.18`
- **Layout:** 2-column — left: pitch text + CTA; right: numbered deliverables list
- **Deliverables listed:**
  1. Site assessment and dimension consultation
  2. Stone block selected from quarry samples
  3. Bi-weekly photographic progress reports
  4. White-glove crating and installation
  5. Certificate of authenticity and care guide
- **CTA:** `BEGIN A CONVERSATION` → opens General Commission Inquiry Modal

---

### 8. About (`#about`)
- **Layout:** 2-column — left: sticky artist portrait; right: bio text + statistics
- **Statistics:**
  - 30+ Years practising
  - 140 Sculptures completed
  - 18 Countries reached
- **No navigation — informational only**

---

### 9. Testimonials
- **Layout:** 3-column equal grid, hairline borders between columns
- **Collectors:**
  1. James H., London, UK
  2. Dr. Sabine K., Munich, DE
  3. Takeshi M., Tokyo, JP
- **No navigation — decorative only**

---

### 10. Contact (`#contact`)
- **Layout:** 2-column — left: address details; right: contact form
- **Details shown:**
  - Studio: Via delle Colline 14, Pietrasanta, Tuscany, Italy
  - Email: studio@petrasculpture.com
  - Response time: Within 48 hours
- **Form fields:** Full Name, Email Address, Message
- **On submit:** Form replaced with "Message received" confirmation (React state, no API call)

---

### 11. Footer
- **Background:** `#141210`
- **Left:** PETRA wordmark + tagline
- **Centre:** Copyright notice
- **Right:** Instagram · Artsy · Press (all `href="#"` placeholders)

---

## Modals

### Sculpture Detail Modal
- **Trigger:** Click any sculpture card in the Collection grid
- **Dismissal:** Click backdrop · click × button · press `Escape`
- **Layout:** 2-column (55% image / 45% details)
- **Shows:** Category, name, sub-title, description note, material, year, dimensions, availability, price
- **CTA:** `ENQUIRE TO PURCHASE` → closes detail modal, opens Inquiry Modal pre-filled with sculpture name + price
- **Sold works:** CTA button is hidden

### Inquiry / Enquiry Modal
- **Triggers:**
  - Nav `ENQUIRE` button → generic commission inquiry
  - Commission section `BEGIN A CONVERSATION` → generic commission inquiry
  - Sculpture detail modal `ENQUIRE TO PURCHASE` → pre-filled with specific work
- **Dismissal:** Click backdrop · click × button · press `Escape`
- **Form fields:** Full Name, Email, Message (pre-filled based on trigger)
- **On submit:** Form replaced with "Thank you" confirmation (React state, no API call)

---

## Navigation & Redirect Map

```
Nav: COLLECTION      ──anchor──►  #collection (scroll)
Nav: PROCESS         ──anchor──►  #process    (scroll)
Nav: ABOUT           ──anchor──►  #about      (scroll)
Nav: CONTACT         ──anchor──►  #contact    (scroll)
Nav: ENQUIRE         ──state──►   Inquiry Modal (generic)

Hero: VIEW COLLECTION ──anchor──► #collection (scroll)
Hero: The process →   ──anchor──► #process    (scroll)

Collection: card click ──state──► Sculpture Detail Modal
  Detail Modal: ENQUIRE TO PURCHASE ──state──► Inquiry Modal (pre-filled)

Commission: BEGIN A CONVERSATION ──state──► Inquiry Modal (generic)

Footer: Instagram / Artsy / Press ── href="#" (placeholder, no destination)
```

---

## Animations & Interactions

| Effect | Mechanism |
|---|---|
| Section fade-in on scroll | `IntersectionObserver` + CSS opacity/translateY transition |
| Staggered card entrance | `delay` prop on `FadeIn` component (0.07s per item) |
| Nav fill on scroll | `window.scroll` event listener + React state |
| Marquee text scroll | CSS `@keyframes marquee` 22s loop |
| Card image zoom on hover | CSS `transform: scale(1.04)` with `cubic-bezier(0.25,0,0,1)` |
| Card hover overlay | CSS opacity transition |
| Modal entrance | CSS `@keyframes modalIn` — opacity + translateY(16px → 0) |
| Scroll indicator | CSS `@keyframes scrollbar` breathing animation |
| Input focus border | `onFocus`/`onBlur` inline style toggle |
| Button hover opacity | `onMouseEnter`/`onMouseLeave` inline style toggle |

---

## File Structure

```
src/
├── App.tsx          — All components and page sections
├── index.css        — Tailwind import, Google Fonts @import, CSS variables, global resets
├── main.tsx         — React entrypoint, mounts App into #root
index.html           — Vite HTML shell
vite.config.ts       — Vite + Tailwind v4 + React plugin config
```

---

## Tech Stack

| Layer | Technology |
|---|---|
| UI Framework | React 19 |
| Build Tool | Vite 8 |
| Styling | Tailwind CSS v4 (`@tailwindcss/vite`) |
| Language | TypeScript 5.7 |
| Fonts | Google Fonts (Cormorant Display, Cormorant SC, Inter) |
| Images | Unsplash CDN (parametric crop + format URLs) |
| Routing | None — single page, anchor scroll only |
| Backend / API | None — forms use local React state only |
