# Angels Beauty Parlour and Bridal Studio — Pitch Website

A bespoke, high-end editorial website built for **Angels Beauty Parlour and Bridal Studio** located at PP Building, Near St Joseph's Hospital, Mananthavady, Wayanad, Kerala.

Designed and engineered with an Awwwards-level creative direction: warm ivory and luxury cream canvas, champagne gold hairlines, Cormorant Garamond display serif typography paired with Jost, smooth Lenis scrolling, GSAP entrance and reveal animations, and interactive React islands.

---

## 🌟 Key Features

1. **Brand-Rooted Identity & Light Palette:**
   - Colors and styling directly derived from the official circular emblem and real salon interior architecture.
   - 100% light luxury aesthetic: warm ivory (`#FDFBF7`), cream surfaces (`#F8F3EC`), champagne gold (`#C9A66B`), and deep charcoal-brown typography (`#221C18`).
2. **Dedicated Bridal Experience (`/bridal`):**
   - Detailed comparison cards for all 6 signature bridal formulations: *Normal Bridal, HD Bridal, UHD Bridal, Glass Skin Bridal, Airbrush Bridal, and Signature Bridal Packages*.
   - What to Expect 3-Step Journey (Consultation & Skin Prep, Hair & Jewelry Alignment, The Wedding Day Artistry).
   - "Book on WhatsApp" triggers pre-filling the exact package name.
3. **Comprehensive Services Showcase (The Showpiece):**
   - Four distinct categories: *Bridal Artistry (12 services), Hair Couture (11 services), Skin Therapies (8 services), Beauty Extras & Spa (7 services)*.
   - Interactive category switcher with search filtering and instant WhatsApp "Enquire" buttons.
4. **Authentic Salon Space Gallery:**
   - Featuring real photography from the salon: Private Bridal Chamber, Illuminated Styling Aisle, Floral Dressing Bay, Aesthetic Skin & Hair Lounge, and Rose Petal Pedicure Spa.
   - Interactive zoom Lightbox modal with accessible keyboard and click controls.
5. **Instagram Experience:**
   - Custom Instagram-styled profile header linking directly to [@angels_beauty__parlour](https://www.instagram.com/angels_beauty__parlour?utm_source=qr&psln=MW54enU3cHBhYTcz).
   - Post and reel preview tiles with engagement overlays.
6. **Google Customer Reviews Carousel:**
   - 4.9-star summary header with Google styling and link to write a review.
   - Carousel cards with client testimonials.
7. **Instant WhatsApp Appointment Reservation:**
   - Validated booking form: selects treatment, preferred date, and time slot.
   - Generates and launches an encoded WhatsApp message to `+91 8606 248 992`.
8. **Contact & Location:**
   - Integrated Google Maps embed for PP Building, Mananthavady.
   - Direct "Get Directions" trigger.
   - Email-ready contact enquiry form.
9. **Global Floating Action Buttons:**
   - Stacked bottom-right: WhatsApp chat with gentle breathing pulse and Instagram profile button.
10. **Performance & SEO Ready:**
    - Static HTML output via Astro.
    - LocalBusiness JSON-LD schema with geo-coordinates, opening hours (9 AM – 8 PM daily), telephone, and service catalog.
    - Automatic sitemap generation (`@astrojs/sitemap`).

---

## 🛠️ Tech Stack

- **Framework:** [Astro 5+](https://astro.build) (Static Site Generation)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com) + `@tailwindcss/vite`
- **Typography:** `@fontsource-variable/cormorant-garamond` & `@fontsource-variable/jost`
- **Interactivity:** React 19 Islands (`client:load` / `client:visible`)
- **Animation & Motion:** GSAP 3 + ScrollTrigger + Lenis smooth scroll
- **Icons:** Inline SVG & Lucide React
- **Hosting / Deploy Target:** Any static host (Cloudflare Pages, Vercel, Netlify, GitHub Pages)

---

## 🚀 Development & Build Commands

All commands can be executed using `pnpm` (or `pnpm.cmd` on Windows):

```bash
# Install dependencies
pnpm install

# Start local development server (http://localhost:4321)
pnpm dev

# Build production static bundle (dist/)
pnpm build

# Preview production build locally
pnpm preview
```

---

## 📝 How to Edit Business Details & Placeholders

All core business details are centralized in one single configuration file:
👉 **`src/config/site.ts`**

### 1. Instagram Profile URL & Handle
To update the Instagram URL or handle, edit:
```typescript
social: {
  instagramUrl: "https://www.instagram.com/angels_beauty__parlour?utm_source=qr&psln=MW54enU3cHBhYTcz",
  instagramHandle: "@angels_beauty__parlour"
}
```

### 2. Phone Number & WhatsApp
To update contact numbers:
```typescript
contact: {
  phoneDisplay: "8606 248 992",
  phoneTel: "+918606248992",
  phoneRaw: "918606248992",
  whatsappUrl: "https://wa.me/918606248992"
}
```

### 3. Studio Address & Hours
```typescript
address: {
  line1: "PP Building, Near St Joseph's Hospital",
  city: "Mananthavady",
  district: "Wayanad",
  state: "Kerala",
  country: "India",
  pincode: "670645",
  full: "PP Building, Near St Joseph's Hospital, Mananthavady, Wayanad, Kerala, India"
},
hours: {
  days: "Monday to Sunday",
  timings: "9:00 AM – 8:00 PM",
  note: "Open all 7 days • No weekly holiday"
}
```

### 4. Google Reviews Place ID
To link genuine reviews once obtained from Google Business:
- Open `src/config/reviews.ts`
- Update `GOOGLE_RATING_SUMMARY.googleProfileUrl` and `writeReviewUrl` with the client's Google Place ID.
- Replace sample testimonials in `SAMPLE_REVIEWS` with verified reviews.

### 5. Contact Form Email Endpoint
In `src/components/ContactSection.astro`, replace the form `action` URL:
```html
<form action="https://formspree.io/f/YOUR_FORMSPREE_ID" method="POST">
```

---

## 🎨 Creative Credits
Designed & Developed by **NYLEX** for **Angels Beauty Parlour and Bridal Studio**, Mananthavady, Wayanad.
