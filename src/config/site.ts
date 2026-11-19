export interface ServiceItem {
  id: string;
  name: string;
  description: string;
  category: 'bridal' | 'hair' | 'skin' | 'other';
  image: string;
  badge?: string;
  featured?: boolean;
  duration?: string;
  benefits?: string[];
  detailedInfo?: string;
}

export interface BridalPackage {
  id: string;
  name: string;
  tagline: string;
  description: string;
  highlights: string[];
  recommendedFor: string;
  image: string;
  featured?: boolean;
}

export const SITE_CONFIG = {
  name: "Angels Beauty Parlour and Bridal Studio",
  shortName: "Angels Beauty",
  tagline: "Exquisite Bridal Couture & Luxury Salon Experiences in Wayanad",
  description:
    "Wayanad's premier destination for bespoke bridal makeup, high-definition styling, Korean glass skin facials, advanced hair transformations, and luxury beauty treatments. Located at PP Building, near St Joseph's Hospital, Mananthavady.",
  address: {
    line1: "PP Building, Near St Joseph's Hospital",
    city: "Mananthavady",
    district: "Wayanad",
    state: "Kerala",
    country: "India",
    pincode: "670645",
    full: "PP Building, Near St Joseph's Hospital, Mananthavady, Wayanad, Kerala, India"
  },
  contact: {
    phoneDisplay: "8606 248 992",
    phoneTel: "+918606248992",
    phoneRaw: "918606248992",
    whatsappUrl: "https://wa.me/918606248992",
    emailPlaceholder: "angelsbridalwayanad@gmail.com"
  },
  hours: {
    days: "Monday to Sunday",
    timings: "9:00 AM – 8:00 PM",
    note: "Open all 7 days • No weekly holiday"
  },
  social: {
    instagramUrl: "https://www.instagram.com/angels_beauty__parlour?utm_source=qr&psln=MW54enU3cHBhYTcz",
    instagramHandle: "@angels_beauty__parlour"
  },
  maps: {
    embedUrl: "https://maps.google.com/maps?q=PP+Building+near+St+Joseph's+Hospital+Mananthavady+Wayanad+Kerala&t=&z=15&ie=UTF8&iwloc=&output=embed",
    directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=PP+Building+near+St+Joseph%27s+Hospital+Mananthavady+Wayanad+Kerala",
    reviewUrl: "https://search.google.com/local/writereview?placeid=ChIJwWvBvL..."
  }
};

export const SERVICES: Record<'bridal' | 'hair' | 'skin' | 'other', ServiceItem[]> = {
  bridal: [
    {
      id: "bridal-makeup",
      name: "Bridal Makeup",
      description: "Timeless traditional and contemporary bridal artistry crafted to illuminate your natural beauty.",
      category: "bridal",
      image: "/Menu images/images (1).jpg",
      featured: true,
      duration: "2 - 3 Hours",
      benefits: ["Skin-prep primer & long-wear foundation", "Soft contouring and natural blush", "Water-resistant ceremonial finish"],
      detailedInfo: "Our classic bridal makeup is designed for brides who desire an authentic, radiant look that celebrates their natural facial contours. Using hypoallergenic luxury cosmetics, our artists prepare your skin with hydrating primers followed by buildable coverage that stays fresh through traditional vows and family blessings."
    },
    {
      id: "hd-bridal-makeup",
      name: "HD Bridal Makeup",
      description: "Flawless camera-ready high-definition finish designed for modern high-resolution wedding photography.",
      category: "bridal",
      image: "/Menu images/images (2).jpg",
      badge: "Popular",
      featured: true,
      duration: "2.5 - 3 Hours",
      benefits: ["Micro-fine light diffusing pigments", "Zero flashback in flash photography", "Pore-blurring satin texture"],
      detailedInfo: "Formulated specifically for modern 4K stage cameras and bright indoor lighting. High-definition micro-pigments blend seamlessly into the skin, preventing any cakey buildup while ensuring your skin looks flawlessly smooth both in person and in high-resolution wedding photography."
    },
    {
      id: "uhd-bridal-makeup",
      name: "UHD Bridal Makeup",
      description: "Ultra-refined microscopic blending for radiant clarity that looks breath-taking both in person and 4K video.",
      category: "bridal",
      image: "/Menu images/images (3).jpg",
      featured: true,
      duration: "3 Hours",
      benefits: ["Nanotechnology pigment formulation", "16+ hours humidity endurance", "Cinematic clarity under 4K video"],
      detailedInfo: "Ultra-High Definition application that merges with facial skin at a microscopic level. It delivers weightless, second-skin radiance with maximum transfer resistance for cinematic wedding teasers and drone captures."
    },
    {
      id: "glass-skin-bridal",
      name: "Glass Skin Bridal Makeup",
      description: "Dewy, luminous translucent skin glow inspired by high-end Korean aesthetic techniques.",
      category: "bridal",
      image: "/Menu images/images (4).jpg",
      badge: "Signature",
      featured: true,
      duration: "2.5 Hours",
      benefits: ["Multi-layer hyaluronic moisture prep", "Lit-from-within pearlescent sheen", "Dewy, youth-enhancing glow"],
      detailedInfo: "An editorial bridal service that starts with deep ampoule hydration, building an ethereal, glassy translucent glow. Highly popular with contemporary Kerala brides who love a fresh, dewy, minimalist finish."
    },
    {
      id: "airbrush-bridal",
      name: "Airbrush Bridal Makeup",
      description: "Weightless, sweat-resistant, long-wear micro-fine mist application that stays flawless through long ceremonies.",
      category: "bridal",
      image: "/Menu images/images (5).jpg",
      badge: "Waterproof",
      duration: "3 Hours",
      benefits: ["Featherlight micro-atomized spray", "100% tear-proof & sweat-proof", "Zero pore clogging feel"],
      detailedInfo: "The gold standard in endurance bridal makeup. Silicone-based micro-droplets are gently sprayed onto the face, creating an impervious, weightless veil that resists heat, humidity, and happy tears through marathon ceremonies."
    },
    {
      id: "bridal-hair-styling",
      name: "Bridal Hair Styling",
      description: "Intricate floral braids, regal bridal updos, modern textured waves, and veil pinning.",
      category: "bridal",
      image: "/Menu images/images (6).jpg",
      duration: "1.5 - 2 Hours",
      benefits: ["Fresh jasmine / rose veni placement", "Secure tiara and mathapatti pinning", "Long-lasting thermal setting"],
      detailedInfo: "From royal traditional South Indian braids adorned with fresh jasmine venis to elegant European textured updos and Christian veil anchoring. Every strand is set with humidity-resistant hair sprays to ensure zero shifting."
    },
    {
      id: "bridal-saree-draping",
      name: "Bridal Saree Draping",
      description: "Pleated precision draping for traditional silk sarees, contemporary pleats, and bridal lehengas.",
      category: "bridal",
      image: "/Menu images/images (7).jpg",
      duration: "45 Mins",
      benefits: ["Iron-press pleated accuracy", "Secure, non-slip safety pinning", "Comfortable movement and posture"],
      detailedInfo: "Master draping for Kanchipuram silks, bridal set-mundus, and designer lehengas. We create knife-sharp, uniform pleats with reinforced invisible pins that let you walk, sit, and bow with total grace."
    },
    {
      id: "reception-makeup",
      name: "Reception Makeup",
      description: "Glamorous evening aesthetic with refined radiance and sculpted contours for your celebration.",
      category: "bridal",
      image: "/Menu images/images (8).jpg",
      duration: "2 Hours",
      benefits: ["Sculpted cheekbones & glamorous shimmer", "Smokey or winged eye contour", "Bold or nude long-wear lip shade"],
      detailedInfo: "Transition into evening elegance with deeper contours, soft champagne shimmer eye highlights, and an alluring radiance made for the reception stage lights."
    },
    {
      id: "engagement-makeup",
      name: "Engagement Makeup",
      description: "Chic, soft-glam perfection that sets the celebratory tone for your wedding journey.",
      category: "bridal",
      image: "/Menu images/images (9).jpg",
      duration: "2 Hours",
      benefits: ["Youthful pastel color coordination", "Feathered brow framing", "Natural fluttery lashes"],
      detailedInfo: "Delicate and romantic styling tailored to your engagement ring ceremony attire, creating a charming look that balances celebratory glamour with timeless softness."
    },
    {
      id: "groom-makeup",
      name: "Groom Makeup & Grooming",
      description: "Natural camera-ready grooming, beard profiling, skin tone evening, and precision styling for the groom.",
      category: "bridal",
      image: "/Menu images/images (10).jpg",
      duration: "1 Hour",
      benefits: ["Mattifying anti-shine skin prep", "Beard alignment & hair styling", "Subtle under-eye tone correction"],
      detailedInfo: "Subtle, imperceptible grooming for the modern groom. We even out skin tone, banish unwanted flash glare, and precisely sculpt the beard and hair so the couple looks perfectly matched in photos."
    },
    {
      id: "family-makeup",
      name: "Family Makeup",
      description: "Coordinated, elegant makeup and hair styling for the mother of the bride, bridesmaids, and close family.",
      category: "bridal",
      image: "/Menu images/images (11).jpg",
      duration: "1.5 Hours / person",
      benefits: ["Cohesive ceremonial aesthetics", "Age-appropriate skin refinement", "Fast, coordinated dressing"],
      detailedInfo: "Ensure the bridal entourage, bridesmaids, and proud mothers look picture-perfect. Dedicated artists take care of your close family simultaneously without wedding morning delays."
    },
    {
      id: "bridal-packages-overview",
      name: "Bridal Packages",
      description: "Comprehensive end-to-end ceremonial packages encompassing skincare prep, trials, saree, and event day looks.",
      category: "bridal",
      image: "/Menu images/images (12).jpg",
      badge: "Full Care",
      duration: "Multi-Day Journey",
      benefits: ["Pre-wedding skin & hair spa", "Full trial session in bridal chamber", "Complimentary family draping"],
      detailedInfo: "The definitive full-service bridal solution. From preparatory facials and hair spa sessions weeks before the wedding to the serene wedding morning in our private suite."
    }
  ],

  hair: [
    {
      id: "haircut-styling",
      name: "Haircut & Styling",
      description: "Face-framing bespoke cuts, curtain bangs, layer sculpting, and blow-dry finishes tailored to your hair texture.",
      category: "hair",
      image: "/Menu images/images (1).jpg",
      duration: "45 Mins",
      benefits: ["Face-shape consultation", "Precision split-end removal", "Signature blow-dry volume"],
      detailedInfo: "Customized haircuts designed to flatter your natural bone structure and hair fall. Concludes with an ionic blowout that leaves your hair bouncy, shiny, and easy to maintain."
    },
    {
      id: "hair-colouring",
      name: "Hair Colouring",
      description: "Rich ammonia-free hues, grey coverage, and dimensional fashion shades with deep conditioning shine.",
      category: "hair",
      image: "/Menu images/images (2).jpg",
      duration: "1.5 - 2 Hours",
      benefits: ["100% grey root coverage", "Ammonia-free gentle formula", "Nourishing argan oil infusion"],
      detailedInfo: "Transform or refresh your hair with gentle, salon-grade color pigments. Enriched with botanical oils to seal moisture into the hair cuticle, ensuring vibrant color that doesn't feel brittle."
    },
    {
      id: "global-hair-colour",
      name: "Global Hair Colour",
      description: "Seamless single-tone full hair color transformation enriched with nourishing botanical oils.",
      category: "hair",
      image: "/Menu images/images (3).jpg",
      duration: "2 Hours",
      benefits: ["Even root-to-tip saturation", "Rich espresso, mocha or caramel hues", "High gloss mirror reflection"],
      detailedInfo: "Full head color application tailored to your skin undertone. We ensure seamless coverage from roots to tips, followed by a color-lock conditioning mask."
    },
    {
      id: "highlights-streaks",
      name: "Highlights & Streaks",
      description: "Hand-painted balayage, foil baby-lights, and sunkissed contrast streaks that dance with the light.",
      category: "hair",
      image: "/Menu images/images (4).jpg",
      badge: "Trending",
      duration: "2.5 - 3 Hours",
      benefits: ["Multidimensional depth & contrast", "Custom hand-painted foils", "Seamless soft grow-out line"],
      detailedInfo: "Add depth and motion to your hair with precision foil highlights or soft hand-painted balayage. Creates rich dimensional contrast that accentuates curls and waves."
    },
    {
      id: "keratin-treatment",
      name: "Keratin Treatment",
      description: "Intense smoothing treatment that eliminates frizz, restores elasticity, and infuses silky radiance.",
      category: "hair",
      image: "/Menu images/images (5).jpg",
      duration: "2.5 - 3 Hours",
      benefits: ["Eliminates up to 90% frizz", "Weather and humidity resistance", "Cuts blow-dry time in half"],
      detailedInfo: "Infuses pure hydrolysed keratin deep into the porous cortex of your hair. Seals frizz, smooths unruly waves, and leaves your hair glossy and manageable for months."
    },
    {
      id: "hair-botox",
      name: "Hair Botox",
      description: "Deep restorative filler that repairs split ends, replenishes depleted hair fibers, and restores youthfulness.",
      category: "hair",
      image: "/Menu images/images (6).jpg",
      badge: "Restorative",
      duration: "2 Hours",
      benefits: ["Non-chemical deep fibre repair", "Recharges thinning & damaged hair", "Silky touch without flattening volume"],
      detailedInfo: "An anti-aging hair treatment that fills gaps in damaged hair cuticles with peptides, vitamins, and hyaluronic acid. Unlike thermal straightening, it retains your natural volume while repairing damaged ends."
    },
    {
      id: "nanoplastia",
      name: "Nanoplastia",
      description: "Advanced organic hair straightening and healing system utilizing nano-nutrients for glass-like shine.",
      category: "hair",
      image: "/Menu images/images (7).jpg",
      badge: "Advanced",
      duration: "3 - 4 Hours",
      benefits: ["Formaldehyde-free organic formula", "Glass-like mirror straightening", "Safe for color-treated hair"],
      detailedInfo: "The latest breakthrough in salon hair smoothing. Nanoplastia uses amino acids and organic acids that penetrate the hair structure to straighten and repair simultaneously without pungent chemical fumes."
    },
    {
      id: "hair-smoothening",
      name: "Hair Smoothening",
      description: "Long-lasting thermal rebonding and silk smoothing for manageable, sleek, and straight tresses.",
      category: "hair",
      image: "/Menu images/images (8).jpg",
      duration: "3 Hours",
      benefits: ["Pin-straight silky finish", "Tames stubborn curls & cowlicks", "Long-lasting polished appearance"],
      detailedInfo: "Transforms unruly, thick or coarse hair into sleek, silky straight tresses that require minimal morning styling. Includes post-treatment nourishing mask."
    },
    {
      id: "hair-spa",
      name: "Hair Spa",
      description: "Relaxing therapeutic scalp massage with deep steam penetration and intensive nourishing masks.",
      category: "hair",
      image: "/Menu images/images (9).jpg",
      duration: "1 Hour",
      benefits: ["Stimulates hair follicles & scalp health", "Warm ozone steam hydration", "Relieves stress and tension"],
      detailedInfo: "A rejuvenating escape for tired hair and a stressed scalp. Combines pressure-point scalp massage, deep steam penetration, and customized hair serums to stimulate root strength."
    },
    {
      id: "advanced-protein",
      name: "Advanced Hair Protein Treatments",
      description: "Targeted keratin and amino acid reconstruction for chemically treated or weather-stressed hair.",
      category: "hair",
      image: "/Menu images/images (10).jpg",
      duration: "1.5 Hours",
      benefits: ["Rebuilds broken protein bonds", "Prevents recurring hair breakage", "Restores elasticity and bounce"],
      detailedInfo: "Clinical grade protein infusion designed for bleach-damaged, heat-stressed, or fragile hair. Rebuilds internal keratin chains for immediate strength."
    },
    {
      id: "hair-extensions",
      name: "Hair Extensions",
      description: "Premium natural hair extension application for effortless volume, instant length, and seamless blending.",
      category: "hair",
      image: "/Menu images/images (11).jpg",
      duration: "1.5 - 2 Hours",
      benefits: ["100% natural Remy human hair", "Invisible seamless bond placement", "Can be styled, curled & washed"],
      detailedInfo: "Instant luxury length and fullness for brides and special events. We color-match and feather-cut the extensions into your natural hair for an undetectable transition."
    }
  ],

  skin: [
    {
      id: "premium-facials",
      name: "Premium Facials",
      description: "Customized multi-step botanical facials formulated to deeply cleanse, soothe, and nourish sensitive skin.",
      category: "skin",
      image: "/Menu images/images (1).jpg",
      duration: "1 Hour",
      benefits: ["Deep pore steam & extraction", "Herbal soothing exfoliation", "Firming neck & facial massage"],
      detailedInfo: "A tailored facial ritual chosen according to your skin type (oily, dry, or sensitive). Uses botanical extracts to detoxify pores and restore a calm, supple surface."
    },
    {
      id: "korean-facial",
      name: "Korean Facial",
      description: "Multi-layered hydration therapy and gentle essence infusion inspired by Seoul skincare rituals.",
      category: "skin",
      image: "/Menu images/images (2).jpg",
      badge: "Signature",
      duration: "1.5 Hours",
      benefits: ["7-step essence infusion", "Centella & snail mucin hydration", "Cryo-cooling pore tightening"],
      detailedInfo: "Authentic K-beauty techniques involving double cleansing, gentle chemical exfoliation, essence layering, and cryo-globe massage to tighten pores and lock in moisture."
    },
    {
      id: "glass-skin-treatments",
      name: "Glass Skin Treatments",
      description: "Advanced glow therapy targeting dullness, refining pores, and imparting a crystal-clear luminous sheen.",
      category: "skin",
      image: "/Menu images/images (3).jpg",
      badge: "Popular",
      duration: "1.5 Hours",
      benefits: ["Micro-polishing diamond peel", "Galvanic serum absorption", "Lit-from-within porcelain finish"],
      detailedInfo: "Designed to remove dead epidermal layers and infuse concentrated hyaluronic acid, giving your skin that highly sought-after reflective, poreless glass glow."
    },
    {
      id: "skin-brightening",
      name: "Skin Brightening Treatments",
      description: "Vitamin C and peptide infused care designed to fade blemishes, even tone, and boost natural radiance.",
      category: "skin",
      image: "/Menu images/images (4).jpg",
      duration: "1 Hour",
      benefits: ["Fades pigmentation & dark spots", "Stabilised Vitamin C antioxidant peel", "Enhances overall skin clarity"],
      detailedInfo: "Targets sun-induced hyperpigmentation, uneven patches, and acne scars. Illuminates skin tone and encourages healthy cellular turnover."
    },
    {
      id: "de-tan-treatments",
      name: "De-Tan Treatments",
      description: "Gentle yet potent sun damage reversal that restores your skin's natural baseline clarity and freshness.",
      category: "skin",
      image: "/Menu images/images (5).jpg",
      duration: "45 Mins",
      benefits: ["Immediate reversal of outdoor sun tan", "Soothing milk & kojic formulation", "Safe for sensitive skin"],
      detailedInfo: "Gentle formulation that breaks down stubborn outdoor tan lines on the face, neck, and arms without burning or bleaching delicate skin."
    },
    {
      id: "skin-rejuvenation",
      name: "Skin Rejuvenation",
      description: "Collagen-stimulating, youth-enhancing treatment that refines skin texture and firms facial contours.",
      category: "skin",
      image: "/Menu images/images (6).jpg",
      duration: "1.5 Hours",
      benefits: ["Boosts natural collagen synthesis", "Firms jawline and cheek contours", "Plumps fine lines & expression marks"],
      detailedInfo: "Comprehensive age-defying treatment using micro-currents, peptide serums, and collagen masks to improve elasticity and skin firmness."
    },
    {
      id: "microblading",
      name: "Microblading",
      description: "Semi-permanent hyper-realistic eyebrow hair strokes tailored to balance and elevate your natural arch.",
      category: "skin",
      image: "/Menu images/images (7).jpg",
      badge: "Expert Artistry",
      duration: "2 Hours",
      benefits: ["Golden-ratio facial brow mapping", "Natural feather-stroke technique", "Lasts 12 to 18 months"],
      detailedInfo: "Manual semi-permanent pigment deposits that mimic natural brow hairs. Perfect for sparse, uneven, or over-plucked eyebrows wanting effortless fullness every morning."
    },
    {
      id: "eyebrow-services",
      name: "Eyebrow Services",
      description: "Precision mapping, shaping, tinting, and brow laminations that frame your eyes with effortless polish.",
      category: "skin",
      image: "/Menu images/images (8).jpg",
      duration: "30 - 45 Mins",
      benefits: ["Custom brow shape alignment", "Semi-permanent brow tinting", "Fluffy brow lamination option"],
      detailedInfo: "Accurate brow architectural shaping with threading, gentle tweezing, tinting, and laminations to keep unruly brow hairs slicked and groomed in place."
    }
  ],

  other: [
    {
      id: "nail-extensions",
      name: "Nail Extensions",
      description: "Gel and acrylic extensions with bespoke length, durable architecture, and natural tip transitions.",
      category: "other",
      image: "/Menu images/images (1).jpg",
      duration: "1.5 - 2 Hours",
      benefits: ["Long-lasting acrylic & builder gel", "Custom shape (Almond, Coffin, Square)", "Resistant to chipping for weeks"],
      detailedInfo: "Full set extension enhancements crafted to perfection. Whether you prefer natural nude square tips or long glamorous almond extensions."
    },
    {
      id: "nail-art",
      name: "Nail Art",
      description: "Handcrafted bridal designs, chrome accents, French tips, and embellishments for your wedding festivities.",
      category: "other",
      image: "/Menu images/images (2).jpg",
      badge: "Bridal Chic",
      duration: "1 Hour",
      benefits: ["Intricate hand-painted wedding motifs", "Swarovski crystals & gold foil", "Mirror chrome & glazed donut finish"],
      detailedInfo: "Customized nail designs that harmonize with your wedding outfit embroidery and jewelry. Sealed with high-gloss UV gel topcoat."
    },
    {
      id: "manicure-pedicure",
      name: "Manicure & Pedicure",
      description: "Therapeutic soak with rose petal foot bath, scrub, cuticle grooming, and rejuvenating massage in our luxury pedicure chair.",
      category: "other",
      image: "/Menu images/images (3).jpg",
      duration: "1.5 Hours",
      benefits: ["Fresh rose petal foot soak tub", "Dead-skin exfoliating salt scrub", "Reclining leather massage chair"],
      detailedInfo: "Relax in our private pedicure bay. Features a therapeutic foot bath infused with fresh rose petals, gentle heel buffing, cuticle nourishment, and calming reflexology massage."
    },
    {
      id: "waxing",
      name: "Waxing",
      description: "Hygienic, gentle warm peel and strip waxing options ensuring smooth, irritation-free skin.",
      category: "other",
      image: "/Menu images/images (4).jpg",
      duration: "30 - 45 Mins",
      benefits: ["Hospital-grade hygienic strips", "Gentle aloe vera soothing wax", "Minimal discomfort formula"],
      detailedInfo: "Full body, arms, and legs waxing using gentle warm peel wax enriched with aloe and chamomile to minimize redness and ensure weeks of smooth skin."
    },
    {
      id: "threading",
      name: "Threading",
      description: "Precise facial hair removal and brow contouring with hygienic organic thread.",
      category: "other",
      image: "/Menu images/images (5).jpg",
      duration: "15 - 30 Mins",
      benefits: ["100% organic cotton thread", "Precise line removal", "No chemical irritation"],
      detailedInfo: "Clean, hygienic hair removal for brows, upper lip, chin, and full face. Leaves crisp lines without skin pulling."
    },
    {
      id: "rental-bridal-ornaments",
      name: "Rental Bridal Ornaments",
      description: "Curated collection of antique temple jewelry, choker sets, mathapattis, and contemporary bridal sets.",
      category: "other",
      image: "/Menu images/images (6).jpg",
      badge: "Rental Exclusive",
      duration: "Consultation / Rental",
      benefits: ["Authentic antique temple gold finish", "Chokers, harams, waist belts & jhumkas", "Sanitized & polished sets"],
      detailedInfo: "Save on heavy wedding jewelry purchase with our curated bridal ornament rentals. We provide complete matching sets that perfectly accentuate traditional silk sarees."
    },
    {
      id: "bridal-accessories",
      name: "Bridal Accessories",
      description: "Hair brooches, floral venis, bridal crowns, veil attachments, and waistbands to complete your wedding ensemble.",
      category: "other",
      image: "/Menu images/images (7).jpg",
      duration: "Consultation",
      benefits: ["Traditional and Western accessories", "Custom matched to wedding dress", "Floral venis & hair pins"],
      detailedInfo: "Every finishing piece needed for your ceremony: from stone waistbands (ottiyanam) and hair brooches to Christian wedding veils and crowns."
    }
  ]
};

export const BRIDAL_PACKAGES: BridalPackage[] = [
  {
    id: "normal-bridal",
    name: "Normal Bridal Package",
    tagline: "Graceful elegance with timeless ceremonial charm",
    description: "A refined foundation package focusing on classic bridal makeup, traditional hair styling, and saree draping for brides seeking a gentle, natural glow.",
    highlights: [
      "Classic Bridal Makeup Application",
      "Traditional Hair Updo or Floral Braid",
      "Saree or Bridal Dress Draping",
      "Pre-Ceremony Touch-Up Guidance"
    ],
    recommendedFor: "Traditional ceremonies & intimate wedding gatherings",
    image: "/images/bridal-suite.jpg"
  },
  {
    id: "hd-bridal",
    name: "HD Bridal Package",
    tagline: "Camera-ready high definition with satin radiance",
    description: "Crafted specifically for modern bridal photography and indoor stage lighting, delivering an ultra-smooth, poreless finish that looks stunning under bright flash.",
    highlights: [
      "High-Definition (HD) Face Artistry",
      "Sculpted Brows & Lashes",
      "Designer Hair Styling & Accessory Setting",
      "Pleated Precision Saree Draping"
    ],
    recommendedFor: "Indoor wedding stages, evening receptions & bright photography",
    image: "/images/bridal-church.jpg",
    featured: true
  },
  {
    id: "uhd-bridal",
    name: "UHD Bridal Package",
    tagline: "Micro-blended perfection for 4K video & candid captures",
    description: "Ultra-High Definition application that merges seamlessly into the skin, avoiding any heaviness while sustaining luminous coverage across extended ceremonies.",
    highlights: [
      "Ultra-HD Micronized Pigment Blending",
      "Long-wear Setting Formula",
      "Custom Bridal Hair Artistry & Veil Securing",
      "Complete Jewelry & Dupatta Placement"
    ],
    recommendedFor: "Extended daytime weddings, 4K videography & cinematic reels",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "glass-skin-bridal",
    name: "Glass Skin Bridal Package",
    tagline: "Dewy, translucent luminescence inspired by Korean beauty",
    description: "An intensive skin-prep ritual paired with hydrating, light-reflecting makeup techniques to create that coveted lit-from-within porcelain finish.",
    highlights: [
      "Hydra-Glow Pre-Makeup Prep",
      "Dewy Korean-Style Glass Skin Finish",
      "Soft Textured Hair Styling",
      "Bespoke Bridal Drape & Finishing Polish"
    ],
    recommendedFor: "Modern brides desiring a youthful, ethereal, natural glow",
    image: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "airbrush-bridal",
    name: "Airbrush Bridal Package",
    tagline: "Featherlight endurance that resists tears, humidity & time",
    description: "The gold standard in luxury bridal longevity. Micro-atomized makeup sprayed in delicate layers for zero-weight feeling, heat resistance, and total transfer-proof confidence.",
    highlights: [
      "Luxury Airbrush Makeup Application",
      "Waterproof & Sweat-Resistant Longevity",
      "Couture Hair Styling with Fresh Florals / Accessories",
      "Comprehensive Draping & Ornament Pinning"
    ],
    recommendedFor: "High-humidity days, church ceremonies & marathon wedding events",
    image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=800&q=80",
    featured: true
  },
  {
    id: "signature-bridal",
    name: "Signature Bridal Packages",
    tagline: "The complete haute couture salon experience",
    description: "The ultimate royal bridal journey, uniting preparatory skin therapies, bespoke hair spa care, trial consultations, and complete ceremonial day coordination.",
    highlights: [
      "Personalized Bridal Consultation & Vision Planning",
      "Full Prep Skincare & Restorative Hair Spa Care",
      "Signature Bridal Makeup & Hair Couture",
      "Complimentary Draping for One Close Family Member"
    ],
    recommendedFor: "Brides seeking end-to-end luxury care with zero stress",
    image: "/images/bridal-room.jpg"
  }
];

export function getWhatsAppBookingUrl(options?: {
  serviceName?: string;
  packageName?: string;
  date?: string;
  name?: string;
}) {
  const base = SITE_CONFIG.contact.whatsappUrl;
  let text = "Hello Angels Beauty Parlour, I would like to enquire about your services.";

  if (options?.packageName) {
    text = `Hello Angels Beauty Parlour, I am interested in booking the *${options.packageName}* for my wedding in Wayanad. Could you share availability and details?`;
  } else if (options?.serviceName) {
    text = `Hello Angels Beauty Parlour, I would like to book an appointment for *${options.serviceName}*.`;
    if (options.date) text += ` Preferred date: ${options.date}.`;
    if (options.name) text += ` My name is ${options.name}.`;
  }

  return `${base}?text=${encodeURIComponent(text)}`;
}
