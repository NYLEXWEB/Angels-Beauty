# Design System & Creative Direction
**Brand:** Angels Beauty Parlour and Bridal Studio  
**Location:** PP Building, Near St Joseph's Hospital, Mananthavady, Wayanad, Kerala  
**Design Lead:** Senior Creative Developer & Art Director  

---

## 1. Brand Palette & Color Tokens

Extracted directly from the brand circular emblem, salon interior finishes (warm fluted oak, back-lit mirror halos, and polished stone), and bridal aesthetic.

| Token | Hex / Value | Semantic Role |
| :--- | :--- | :--- |
| `--color-canvas` | `#FDFBF7` | Primary page background (warm ivory / pearl white) |
| `--color-surface` | `#F8F3EC` | Secondary section background (luxury warm cream) |
| `--color-surface-card` | `#FFFFFF` | Card & container fill (pure light contrast) |
| `--color-surface-hover`| `#F3ECE2` | Interactive card hover tint |
| `--color-gold-light` | `#F5E5C9` | Pale champagne highlight & shimmer |
| `--color-gold` | `#C9A66B` | Primary champagne gold accent & badges |
| `--color-gold-deep` | `#9E7B35` | High-contrast gold for text on light backgrounds (AA accessible) |
| `--color-gold-border` | `rgba(201, 166, 107, 0.3)` | Elegant 1px hairline divider & container border |
| `--color-gold-border-strong` | `rgba(201, 166, 107, 0.6)` | Interactive & focus state hairline |
| `--color-text-main` | `#221C18` | Deep warm charcoal-brown (high contrast, zero sterile black) |
| `--color-text-muted`| `#6B6056` | Editorial secondary copy, subtitles, meta text |
| `--color-text-subtle`| `#8E8277` | Captions, small caps labels, hints |
| `--color-whatsapp` | `#25D366` | Official WhatsApp floating CTA accent |
| `--color-instagram`| `#E1306C` | Official Instagram floating CTA accent |

---

## 2. Typography Scale

- **Display Serif:** Cormorant Garamond (`@fontsource-variable/cormorant-garamond`)
  - Conveys bridal couture, timeless grace, and editorial authority.
  - Used for Section Titles, Hero Statements, Package Names, Numbers.
- **Body & Functional Sans:** Jost (`@fontsource-variable/jost`)
  - Clean, geometric yet warm sans-serif with exceptional legibility on mobile screens.
  - Used for Navigation, Body Prose, Button Labels, Badges, Tables, Form Inputs.

### Type Scale Hierarchy
- **Hero Display:** `clamp(2.75rem, 6vw, 5.25rem)` / line-height 1.08 / tracking -0.02em / Cormorant Garamond
- **Section Heading (H2):** `clamp(2rem, 4vw, 3.5rem)` / line-height 1.15 / tracking -0.015em / Cormorant Garamond
- **Card Heading (H3):** `clamp(1.35rem, 2.5vw, 2rem)` / line-height 1.25 / Cormorant Garamond
- **Subheading (H4):** `1.15rem - 1.35rem` / line-height 1.35 / Cormorant Garamond 600
- **Overline / Category Tag:** `0.75rem - 0.85rem` / tracking 0.2em / uppercase / Jost 600
- **Body Regular:** `1rem` (16px) / line-height 1.65 / Jost 400
- **Body Large / Lead:** `1.125rem` (18px) / line-height 1.7 / Jost 400
- **Small / Meta:** `0.875rem` (14px) / line-height 1.5 / Jost 400

---

## 3. Spacing, Grid & Sizing System

Based on an 8px modular baseline:
- `space-1`: 4px
- `space-2`: 8px
- `space-3`: 12px
- `space-4`: 16px
- `space-6`: 24px
- `space-8`: 32px
- `space-12`: 48px
- `space-16`: 64px
- `space-24`: 96px
- `space-32`: 128px

**Containers:**
- Standard Content: `max-w-7xl` (1280px) with responsive horizontal padding (`px-4 sm:px-6 lg:px-8`)
- Editorial / Reading Width: `max-w-3xl` (768px)
- Full Bleed Showcase: `w-full` with inner margins

---

## 4. Radii & Shape Language

- **Arched Frames:** `rounded-t-full` or custom `border-radius: 180px 180px 24px 24px` for hero and bridal showcase imagery, echoing the salon's signature curved illuminated mirrors and bridal pavilion.
- **Pill Elements:** `rounded-full` for all primary buttons, badges, category filters, and floating trigger bubbles.
- **Card Containers:** `rounded-2xl` (16px) to `rounded-3xl` (24px) with soft 1px gold hairline borders.
- **Form Inputs:** `rounded-xl` (12px) with subtle warm cream background and gold focus ring.

---

## 5. Motion & Interaction Rules

- **Engine:** GSAP 3 + ScrollTrigger + Lenis smooth scroll.
- **Entrance Masking:** Hero headline splits/fades up with `y: 40`, `opacity: 0` -> `y: 0`, `opacity: 1`, duration 1.1s, ease `power3.out`.
- **Image Parallax:** Gentle 6%–10% parallax scroll on large arched imagery.
- **ScrollTrigger Reveals:** Staggered reveal for cards and service rows (`stagger: 0.08`, `y: 30`, `duration: 0.8`).
- **Interactive Feedback:**
  - Buttons: Smooth scale (`scale: 1.02`), soft shadow expansion, and subtle gold gradient shift.
  - Service rows: Left border gold highlight expand, background tint shift.
- **Accessibility (`prefers-reduced-motion`):**
  - GSAP animations bypassed or reduced to instantaneous opacity when reduced motion is detected.
  - No pinning or heavy scrolljacking on mobile viewports (< 768px).

---

## 6. Component System Guidelines

1. **Header / Navigation:**
   - Starts transparent over hero; transitions to frosted ivory (`bg-canvas/90 backdrop-blur-md border-b border-gold/20`) on scroll.
   - Clean desktop navigation links with gold indicator line.
   - Mobile: Fullscreen slide-over drawer with luxury typography and quick WhatsApp/Tel contact links.
2. **Services Showcase:**
   - 4 Tabs: Bridal, Hair, Skin, Beauty Extras.
   - Refined service listing with gold numeric index (`01`, `02`), service name, and instant "Enquire via WhatsApp" pre-filled direct button.
3. **Bridal Packages Comparison (`/bridal` and teaser on Home):**
   - 6 Packages: Normal Bridal, HD Bridal, UHD Bridal, Glass Skin Bridal, Airbrush Bridal, Signature Bridal.
   - Distinct cards with gold badge, feature bullets, consultation note, and direct WhatsApp booking trigger with package name pre-filled.
4. **Booking Component:**
   - Interactive appointment form that constructs an encoded WhatsApp message to `+91 8606 248 992` with selected service, date, time, and client name.
5. **Floating Action Controls:**
   - Stacked bottom-right: WhatsApp button (direct chat) and Instagram button (`@angels_beauty__parlour`).
   - Positioned cleanly with `z-50`, avoiding mobile touch clash.
