# Master Prompt: Angels Beauty Parlour and Bridal Studio (Antigravity IDE)

## ROLE
You are a senior creative developer and art director building a high-end sample website for a real client: "Angels Beauty Parlour and Bridal Studio", Mananthavady, Wayanad, Kerala. This is a pitch sample. The client will only sign the project if the first impression is exceptional, so every pixel, spacing value and animation must be deliberate. Think Awwwards-level, hand-crafted work, not a template.

## BEFORE WRITING ANY CODE
1. Inspect `/public`. Use the logo and every image found there. Extract the logo's exact colours and shape language and let them inform the palette, so the site feels like one brand.
2. Research the tools below (docs/readmes) and use only what genuinely improves the result:
   - **Impeccable** (design critique skill): run it on every section and fix what it flags.
   - **React Bits**: animated components; adapt only the tasteful ones.
   - **GSAP + ScrollTrigger**: core animation engine.
   - **Awesome Design MD**: study 2-3 refined, editorial design systems for spacing/typography logic. Do not copy any brand.
   - **Refero**: research real luxury beauty/bridal/salon sites for layout patterns, then create something original.
3. Write a short `DESIGN.md` first (palette, type scale, spacing scale, radii, motion rules, component rules) and follow it strictly.

## STACK
Astro + Tailwind CSS. Use React islands only where interactivity needs it (booking form, reviews carousel, floating actions). Install any packages you need: `gsap`, `@gsap/react` if needed, `lenis` (smooth scroll), `astro-icon` or `lucide`, fonts via `fontsource`. TypeScript. Static output, fast, accessible, SEO-ready (meta, Open Graph, LocalBusiness JSON-LD, sitemap, alt text).

Keep all business data in one file: `src/config/site.ts` (name, phone, WhatsApp, address, hours, Instagram URL, Google Maps URL, review URL, services data) so client details are easy to change.

## BUSINESS DATA
- **Name:** Angels Beauty Parlour and Bridal Studio
- **Address:** PP Building, Near St Joseph's Hospital, Mananthavady, Wayanad, Kerala, India
- **Phone and WhatsApp:** 8606 248 992 (use +918606248992 for `tel:` and `wa.me` links)
- **Hours:** Monday to Sunday, 9:00 AM to 8:00 PM. Open all days, no weekly holiday.
- **Instagram:** placeholder in config (`INSTAGRAM_URL`), to be replaced
- **Google Maps / Review links:** placeholders in config. Until replaced, build the map embed from the address query "PP Building near St Joseph's Hospital Mananthavady"

## SERVICES (use exactly these)
**A. Bridal:** Bridal Makeup, HD Bridal Makeup, UHD Bridal Makeup, Glass Skin Bridal Makeup, Airbrush Bridal Makeup, Bridal Hair Styling, Bridal Saree Draping, Reception Makeup, Engagement Makeup, Groom Makeup & Grooming, Family Makeup, Bridal Packages

**B. Hair:** Haircut & Styling, Hair Colouring, Global Hair Colour, Highlights & Streaks, Keratin Treatment, Hair Botox, Nanoplastia, Hair Smoothening, Hair Spa, Advanced Hair Protein Treatments, Hair Extensions

**C. Skin:** Premium Facials, Korean Facial, Glass Skin Treatments, Skin Brightening Treatments, De-Tan Treatments, Skin Rejuvenation, Microblading, Eyebrow Services

**D. Other:** Nail Extensions, Nail Art, Manicure & Pedicure, Waxing, Threading, Rental Bridal Ornaments, Bridal Accessories

Do not invent prices. Show no prices; use "Enquire" / "Book" actions.

## BRIDAL PACKAGES (separate dedicated page: `/bridal`)
Normal Bridal Package, HD Bridal Package, UHD Bridal Package, Glass Skin Bridal Package, Airbrush Bridal Package, Signature Bridal Packages.

Design these as an elegant comparison: each package a refined card with a short description (tasteful, non-specific copy; no invented inclusions or prices) and a "Book on WhatsApp" button that pre-fills the package name in the message.

## VISUAL DIRECTION
- **Completely light theme.** Base: warm white / ivory (#FFFDF9 range). Luxury cream (#F6EFE3 range) for alternating sections. Champagne gold (#C9A66B / #D9BD8A range, tune to match the logo) for accents, hairlines, icons and buttons. Deep warm charcoal-brown (#2A2420 range) for text. No pure black, no dark sections, no purple or pink gradients.
- Gold is used sparingly: thin 1px rules, small ornaments, button fills, hover states, one subtle metallic gradient on key headings or CTAs. Never flood sections with gold.
- **Typography:** an elegant high-contrast serif for display (Cormorant Garamond or Playfair Display; pick one and commit) paired with a clean sans for body (Jost, Manrope or DM Sans). Large, confident headings; generous letter-spacing on small-caps labels. Strict type scale from `DESIGN.md`.
- **Layout:** lots of whitespace, asymmetric editorial compositions, large imagery with soft rounded or arched frames (arches suit bridal), fine gold borders, soft shadows tinted warm not grey. Consistent 8px spacing system.
- **Avoid the generic AI look:** no emoji, no stock gradient blobs, no identical card grids repeated down the page, no cluttered badges, no glassmorphism overload. Every section has its own composition while feeling part of one system.
- **Content is minimal and calm.** Short headlines, one-line descriptions, no walls of text. A visitor should understand who they are, what they offer and how to book within seconds.

## PAGES AND SECTIONS

### Home (`/`)
1. **Header:** logo, minimal nav (Services, Bridal, About, Gallery, Reviews, Contact), "Book Now" button. Transparent at top, refined solid ivory with hairline on scroll. Mobile: clean full-screen menu.
2. **Hero:** striking headline about bridal and beauty in Wayanad, one line of support text, two buttons (Book Appointment, View Bridal Packages). Use the best image from `/public` in an arched or layered frame, with subtle parallax and a staggered text reveal. Small row: "Open daily, 9 AM to 8 PM" and "Mananthavady".
3. **Intro / About:** short brand story, 3 quiet highlights (Bridal specialists, Hair and skin experts, Open all days). Use only claims derivable from the provided data; no fake years of experience or client counts.
4. **Services (the showpiece):** four categories (Bridal, Hair, Skin, Beauty Extras). Desktop: elegant category tabs or a pinned GSAP ScrollTrigger sequence where each category's services reveal in a refined list with hover interactions. Mobile: compact horizontal category switcher with a tidy two-column list or accordion so the section does not become a long scroll. Each service has a thin gold bullet or number, the name, and a quick "Enquire" WhatsApp link with the service pre-filled.
5. **Bridal highlight:** teaser of the packages, linking to `/bridal`.
6. **Gallery:** curated masonry or horizontal-scroll gallery from `/public` images, lightbox, lazy loading, optimised via `astro:assets`.
7. **Instagram section:** styled in an Instagram-inspired look (gradient-ring avatar, profile header with handle, Follow button, grid of post/reel tiles with play icons). Link out to the Instagram URL. Use `/public` images as tiles. Add a code note on swapping in a live embed or feed later.
8. **Google Reviews:** rating summary header with Google styling, a smooth carousel of review cards, and a "Review us on Google" button. Real reviews are not provided, so keep data in `src/config/reviews.ts` with clearly marked sample entries and a TODO to replace with genuine reviews. Do not present invented reviews as real anywhere beyond the marked placeholder data.
9. **Booking:** appointment form (name, phone, service dropdown, preferred date, preferred time, optional message). On submit, open WhatsApp (`wa.me`) with a neatly formatted pre-filled message. Add a "Chat on WhatsApp" button beside it. Validate inputs, good error states.
10. **Contact + Location:** contact form that sends to email (Formspree-style endpoint or Astro API route with a configurable env variable, with a clear setup note), address, phone, hours, Google Maps embed in a styled frame, and a "Get Directions" button opening Google Maps directions.
11. **Footer:** logo, quick links, hours, address, social icons, small credit line "Designed by NYLEX".

### Bridal page (`/bridal`)
Hero, intro line, package cards, a "what to expect" 3-step flow (Consultation, Trial, Wedding Day), gallery strip, booking CTA.

## GLOBAL FEATURES
- **Floating action buttons**, bottom-right on all pages: WhatsApp (brand green, refined) and Instagram. Gentle entrance animation, subtle pulse on WhatsApp, tooltips on desktop, safe spacing on mobile so they never cover content or form fields.
- Smooth scrolling with Lenis, wired to GSAP ScrollTrigger.

## MOTION (GSAP)
- Page-load sequence: logo and hero text mask-reveal, image scale-in.
- Scroll reveals: fade-up with small distance and soft easing (`power3.out`), staggered children, never bouncy or flashy.
- Parallax on hero and gallery images, gold line draw-in animations, magnetic hover on primary buttons, refined hover states on service rows.
- Respect `prefers-reduced-motion`. Disable heavy effects and pinning on mobile.
- Keep 60fps: animate transform and opacity only; clean up ScrollTrigger instances.

## MOBILE FIRST
Most visitors are on phones in Kerala, often mid-range devices. Design phone layouts deliberately: tight vertical rhythm, compact services UI, thumb-reachable CTAs, no section taller than about two screens, no horizontal overflow. Desktop gets the richer animated experience.

## QUALITY BAR
- Lighthouse targets: Performance 90+, Accessibility 95+, SEO 100. Optimise images, preload fonts, no layout shift.
- Semantic HTML, visible focus states, AA contrast (use a darker gold for gold text on cream).
- Test breakpoints: 360, 390, 768, 1024, 1440.
- Clean component structure, no dead code, a README with run, build and "how to edit business details" instructions.

## PROCESS
1. Analyse `/public` assets and write `DESIGN.md`. **Pause and show the design direction before continuing.**
2. Scaffold the project and config.
3. Build sections one by one, running the Impeccable critique after each and fixing every issue.
4. Final pass: polish spacing, motion timing, copy trimming, responsive checks, performance.
5. Summarise what was built and list placeholders that still need real data (Instagram URL, Maps link, reviews, email endpoint).
