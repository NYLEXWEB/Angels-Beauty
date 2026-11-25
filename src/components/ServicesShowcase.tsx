import React, { useState, useEffect, useRef } from 'react';
import { SERVICES, SITE_CONFIG, getWhatsAppBookingUrl, type ServiceItem } from '../config/site';
import { Search, X, Clock, CheckCircle2, ChevronRight, ChevronLeft, ChevronDown, ChevronUp, ShieldCheck, ArrowRight } from 'lucide-react';

function InstagramIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

type CategoryKey = string;

const CATEGORIES: { key: CategoryKey; label: string; count: number; tag: string }[] = [
  { key: 'bridal', label: 'Bridal Gallery', count: SERVICES['bridal']?.length || 0, tag: 'Bridal Studio & Draping' },
  { key: 'skin', label: 'Skin Care', count: SERVICES['skin']?.length || 0, tag: 'Facials & De-Tan' },
  { key: 'hair-treatments', label: 'Hair Care', count: SERVICES['hair-treatments']?.length || 0, tag: 'Botox, Keratin & Biotin' },
  { key: 'hair-colour', label: 'Hair Colour Studio', count: SERVICES['hair-colour']?.length || 0, tag: 'Balayage & Highlights' },
  { key: 'nails', label: 'Nail Studio', count: SERVICES['nails']?.length || 0, tag: 'Nail Art & Extensions' },
  { key: 'eyes-brows', label: 'Brow Studio', count: SERVICES['eyes-brows']?.length || 0, tag: 'Microblading & Lashes' },
  { key: 'korean-spa', label: 'Korean Beauty Spa', count: SERVICES['korean-spa']?.length || 0, tag: 'Glass Skin & Head Spa' },
  { key: 'makeup-styling', label: 'Professional Makeup', count: SERVICES['makeup-styling']?.length || 0, tag: 'Occasion & Saree Draping' },
  { key: 'waxing-body', label: 'Waxing & Body Care', count: SERVICES['waxing-body']?.length || 0, tag: 'Rica Wax & Polishing' },
  { key: 'extensions', label: 'Hair Extensions', count: SERVICES['extensions']?.length || 0, tag: 'Clip-in & Volume' }
];

const INITIAL_VISIBLE_COUNT = 6;

export default function ServicesShowcase() {
  const [activeCategory, setActiveCategory] = useState<CategoryKey>('bridal');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});
  const categoryScrollRef = useRef<HTMLDivElement>(null);

  const scrollCategories = (direction: 'left' | 'right') => {
    if (categoryScrollRef.current) {
      const scrollAmount = direction === 'left' ? -320 : 320;
      categoryScrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const openServiceModal = (service: ServiceItem) => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
    }
    setSelectedService(service);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setIsModalVisible(true);
      });
    });
  };

  const closeServiceModal = () => {
    setIsModalVisible(false);
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
    }
    closeTimeoutRef.current = setTimeout(() => {
      setSelectedService(null);
    }, 280);
  };

  // Close modal on Escape key & synchronize scroll prevention with Lenis
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeServiceModal();
    };

    if (selectedService) {
      document.documentElement.classList.add('overflow-hidden');
      document.body.classList.add('overflow-hidden');
      if (typeof window !== 'undefined') {
        (window as any).__lenis?.stop();
        window.addEventListener('keydown', handleKeyDown);
      }
    } else {
      document.documentElement.classList.remove('overflow-hidden');
      document.body.classList.remove('overflow-hidden');
      if (typeof window !== 'undefined') {
        (window as any).__lenis?.start();
      }
    }

    return () => {
      document.documentElement.classList.remove('overflow-hidden');
      document.body.classList.remove('overflow-hidden');
      if (typeof window !== 'undefined') {
        (window as any).__lenis?.start();
        window.removeEventListener('keydown', handleKeyDown);
      }
      if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    };
  }, [selectedService]);

  const toggleCategoryExpand = (catKey: string) => {
    setExpandedCategories(prev => ({
      ...prev,
      [catKey]: !prev[catKey]
    }));
  };

  const currentServices = SERVICES[activeCategory] || [];
  const allServicesList = Object.values(SERVICES).flat();

  const isSearching = searchQuery.trim().length > 0;

  const filteredServices = isSearching
    ? allServicesList.filter(s =>
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (s.category && s.category.toLowerCase().includes(searchQuery.toLowerCase()))
    )
    : currentServices;

  const isExpanded = expandedCategories[activeCategory] || false;
  const displayedServices = isSearching || isExpanded
    ? filteredServices
    : filteredServices.slice(0, INITIAL_VISIBLE_COUNT);

  const hasMore = !isSearching && filteredServices.length > INITIAL_VISIBLE_COUNT;
  const remainingCount = filteredServices.length - INITIAL_VISIBLE_COUNT;

  const activeCategoryMeta = CATEGORIES.find(c => c.key === activeCategory);

  return (
    <section id="services" suppressHydrationWarning className="pt-14 sm:pt-20 pb-8 sm:pb-12 bg-canvas relative overflow-x-clip">

      {/* Subtle luxury ambient glow */}
      <div className="absolute top-1/4 -left-40 w-96 h-96 bg-gold/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-40 w-96 h-96 bg-gold/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header: Minimalist Editorial Haute-Couture */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-10 sm:mb-14 gap-6 sm:gap-8 pb-8 sm:pb-10 border-b border-black/[0.06]">

          <div className="max-w-2xl space-y-3 sm:space-y-4">
            {/* Overline badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/90 backdrop-blur-md border border-black/[0.06] shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-gold-deep animate-pulse" />
              <span className="text-[10px] sm:text-[11px] font-sans font-medium tracking-[0.25em] uppercase text-charcoal/80">
                Studio Treatment Menu
              </span>
            </div>

            <h2 className="text-3xl sm:text-5xl md:text-6xl font-light text-charcoal tracking-tight leading-[1.12]">
              Curated Services & <br className="hidden sm:inline" />
              <span className="italic font-normal text-gold-deep font-serif">Ceremonial Artistry</span>
            </h2>

            <p className="text-muted text-xs sm:text-sm md:text-base font-sans font-light leading-relaxed max-w-xl">
              Each experience is delivered in private, air-conditioned suites using hypoallergenic international formulations and unhurried artisanal precision.
            </p>

            {/* Quick Instagram connect pill */}
            <div className="pt-1 flex items-center gap-3">
              <a
                href={SITE_CONFIG.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-purple-50 via-pink-50 to-orange-50 hover:from-purple-100 hover:to-orange-100 border border-pink-200/50 text-charcoal text-xs font-sans transition-all shadow-2xs group"
                aria-label="Connect with Angels Beauty on Instagram"
              >
                <InstagramIcon className="w-3.5 h-3.5 text-pink-600 transition-transform group-hover:scale-110" />
                <span className="text-[11px] font-medium text-pink-900">@angels_beauty__parlour</span>
              </a>
              <span className="text-[11px] text-muted font-sans">• 100+ Bespoke Treatments</span>
            </div>
          </div>

          {/* Minimalist Glass Search Input */}
          <div className="w-full lg:w-80">
            <div className="relative group">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search treatments (e.g. Botox, Biotin)..."
                aria-label="Search treatments and services"
                className="w-full pl-10 pr-9 py-2.5 sm:py-3 rounded-full border border-black/[0.08] bg-white/90 backdrop-blur-md text-charcoal text-xs sm:text-sm placeholder:text-muted/60 focus:outline-none focus:border-gold-deep focus:ring-1 focus:ring-gold-deep/30 focus:bg-white transition-all shadow-2xs group-hover:border-black/20"
              />
              <Search className="w-4 h-4 text-muted/70 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none group-focus-within:text-gold-deep transition-colors" />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted hover:text-charcoal cursor-pointer p-0.5 rounded-full hover:bg-black/5 transition-colors"
                  aria-label="Clear search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Quick trust reassurance */}
            <div className="flex items-center gap-1.5 mt-2 px-1 text-[11px] text-muted font-sans">
              <ShieldCheck className="w-3.5 h-3.5 text-gold-deep shrink-0" />
              <span>Certified cosmetologists • Hospital-grade hygiene</span>
            </div>
          </div>

        </div>

        {/* Category Switcher: Minimalist Architectural Tabs with Navigation Controls */}
        <div className="mb-8 sm:mb-12">
          <div className="relative flex items-center gap-1.5 sm:gap-2">

            {/* Left Scroll Navigation Button */}
            <button
              type="button"
              onClick={() => scrollCategories('left')}
              className="shrink-0 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white hover:bg-neutral-100 text-charcoal border border-black/10 shadow-xs flex items-center justify-center cursor-pointer transition-all hover:scale-105 active:scale-95 z-10"
              aria-label="Scroll categories left"
            >
              <ChevronLeft className="w-4 h-4 text-charcoal" />
            </button>

            {/* Scrollable Tabs Track */}
            <div
              ref={categoryScrollRef}
              className="flex items-center gap-2 overflow-x-auto pb-2 scroll-smooth w-full no-scrollbar select-none"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {CATEGORIES.map((cat) => {
                const isActive = activeCategory === cat.key;
                return (
                  <button
                    key={cat.key}
                    type="button"
                    onClick={(e) => {
                      setActiveCategory(cat.key);
                      setSearchQuery('');
                      e.currentTarget.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
                    }}
                    className={`shrink-0 px-4 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm font-sans tracking-wide transition-all duration-300 flex items-center gap-2 cursor-pointer ${isActive
                      ? 'bg-charcoal text-white shadow-xs font-medium scale-[1.01]'
                      : 'bg-white hover:bg-neutral-50 text-charcoal/70 hover:text-charcoal border border-black/[0.06] hover:border-black/15 shadow-2xs'
                      }`}
                  >
                    <span>{cat.label}</span>
                    <span
                      className={`text-[10px] font-medium px-2 py-0.5 rounded-full transition-colors ${isActive
                        ? 'bg-white/20 text-gold-light'
                        : 'bg-black/[0.04] text-muted'
                        }`}
                    >
                      {cat.count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Right Scroll Navigation Button */}
            <button
              type="button"
              onClick={() => scrollCategories('right')}
              className="shrink-0 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white hover:bg-neutral-100 text-charcoal border border-black/10 shadow-xs flex items-center justify-center cursor-pointer transition-all hover:scale-105 active:scale-95 z-10"
              aria-label="Scroll categories right"
            >
              <ChevronRight className="w-4 h-4 text-charcoal" />
            </button>

          </div>
        </div>

        {/* SPECIAL CALLOUT BANNER: Bridal Gallery Special Section */}
        {activeCategory === 'bridal' && !isSearching && (
          <div className="mb-8 p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-amber-50 via-surface to-rose-50 border border-gold/30 shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 text-[11px] font-sans font-medium uppercase tracking-wider text-gold-deep">
                <span>Dedicated Bridal Studio & Portfolio</span>
              </div>
              <h3 className="text-base sm:text-lg font-serif font-medium text-charcoal">
                Explore Our Complete Bridal Gallery — 15+ Real Brides & Muhurtham Looks
              </h3>
              <p className="text-xs text-muted font-sans">
                Hindu, Christian, and Muslim bridal styling captured in high-definition detail with saree pre-pleating and jewellery setting.
              </p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <a
                href="/gallery"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-charcoal hover:bg-gold-deep text-white text-xs font-sans font-medium transition-all shadow-xs"
              >
                <span>View Bridal Gallery</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
              <a
                href="/bridal"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white hover:bg-surface text-charcoal border border-black/10 text-xs font-sans font-medium transition-all shadow-2xs"
              >
                <span>Bridal Packages</span>
              </a>
            </div>
          </div>
        )}

        {/* 
          SERVICES SHOWCASE CARDS:
          - Mobile: 3D Layered Stacking Cards (cards smoothly stack in tiered 3D layers as you scroll)
          - Desktop: Elegant 2-column or 3-column editorial grid
        */}
        <div className="relative flex flex-col md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-7 pb-20 sm:pb-28">
          {displayedServices.map((service, index) => {
            const formattedIndex = String(index + 1).padStart(2, '0');
            const waUrl = getWhatsAppBookingUrl({ serviceName: service.name });

            // 3D Stacking Cards: Stepped top offset so cards form a tiered layered physical deck
            const stackLevel = index % 5;
            const mobileTopOffset = 75 + stackLevel * 16;
            const cardZIndex = 20 + index;

            return (
              <div
                key={service.id}
                style={{
                  top: `${mobileTopOffset}px`,
                  zIndex: cardZIndex
                }}
                className="mobile-stack-card sticky md:static md:top-auto mb-20 sm:mb-28 md:mb-0 last:mb-0 w-full group relative rounded-[28px] sm:rounded-3xl bg-white border border-black/[0.08] shadow-[0_-10px_28px_-4px_rgba(0,0,0,0.12),0_20px_45px_-8px_rgba(34,28,24,0.18)] md:shadow-[0_4px_20px_-4px_rgba(34,28,24,0.06)] hover:shadow-[0_16px_36px_-8px_rgba(158,123,53,0.18)] transition-all duration-300 overflow-hidden flex flex-col justify-between md:!z-auto"
              >
                {/* 3D Luxury Gold Top Rim Highlight on Mobile */}
                <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-gold/50 to-transparent pointer-events-none md:hidden z-20" />

                {/* 1. Cinematic Clean Photo Frame (Zero text overlays on the image) */}
                <div
                  onClick={() => openServiceModal(service)}
                  className="relative aspect-[16/10] overflow-hidden bg-surface cursor-pointer"
                >
                  <img
                    src={service.image}
                    alt={service.name}
                    suppressHydrationWarning
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-103"
                    loading="lazy"
                    decoding="async"
                    width={400}
                    height={250}
                  />

                  {/* Refined Luxury Badges Top Bar */}
                  <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between pointer-events-none">
                    <span className="font-sans text-white/95 font-medium text-[10px] sm:text-[11px] tracking-[0.22em] px-2.5 py-1 rounded-full bg-charcoal/60 backdrop-blur-md border border-white/15 shadow-2xs">
                      № {formattedIndex}
                    </span>
                    {service.badge && (
                      <span className="text-[9px] sm:text-[10px] font-sans font-semibold tracking-[0.18em] uppercase px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-charcoal border border-gold/30 shadow-xs">
                        {service.badge}
                      </span>
                    )}
                  </div>
                </div>

                {/* 2. Editorial Text Body */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4 bg-white">

                  <div className="space-y-3">
                    {/* Eyebrow: Category + Duration */}
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] font-sans font-semibold uppercase tracking-[0.22em] text-gold-deep">
                        {service.category.toUpperCase()} • SUITE
                      </span>
                      {service.duration && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-surface border border-black/[0.04] text-[11px] font-sans text-charcoal/70">
                          <Clock className="w-3 h-3 text-gold-deep" />
                          <span>{service.duration}</span>
                        </span>
                      )}
                    </div>

                    {/* Service Title */}
                    <h3
                      onClick={() => openServiceModal(service)}
                      className="font-sans text-lg sm:text-xl font-normal text-charcoal tracking-tight group-hover:text-gold-deep transition-colors duration-200 leading-snug cursor-pointer"
                    >
                      {service.name}
                    </h3>

                    {/* Description */}
                    <p className="text-xs sm:text-[13px] text-muted font-sans font-light leading-relaxed line-clamp-2">
                      {service.description}
                    </p>
                  </div>

                  {/* 3. Action Bar: Minimalist Luxury */}
                  <div className="pt-4 border-t border-black/[0.05] flex items-center justify-between gap-3">

                    {/* Inclusions Trigger */}
                    <button
                      type="button"
                      onClick={() => openServiceModal(service)}
                      className="inline-flex items-center gap-1 text-xs font-sans font-medium text-charcoal/80 hover:text-gold-deep transition-colors py-2 cursor-pointer group/link"
                      aria-label={`View full details for ${service.name}`}
                    >
                      <span>Inclusions</span>
                      <ChevronRight className="w-3.5 h-3.5 text-gold-deep transition-transform duration-200 group-hover/link:translate-x-0.5" />
                    </button>

                    {/* WhatsApp Direct Booking Button */}
                    <a
                      href={waUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 py-2 px-3.5 sm:px-4 rounded-full bg-charcoal hover:bg-black text-white text-xs font-sans font-medium tracking-wide transition-all duration-300 shadow-2xs hover:shadow-xs active:scale-97 shrink-0 group/btn"
                      aria-label={`Enquire about ${service.name} on WhatsApp`}
                    >
                      <svg className="w-3.5 h-3.5 fill-[#25D366] text-[#25D366] shrink-0 group-hover/btn:scale-110 transition-transform" viewBox="0 0 24 24">
                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                      </svg>
                      <span>Book on WhatsApp</span>
                    </a>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

        {/* 
          VIEW MORE SERVICES EXPANDER BUTTON
          As requested by user:
          "ഓരോ വിഭാഗത്തിലും View More Services എന്നൊരു ഓപ്ഷൻ കൊടുക്കണം.
          ഉദാഹരണത്തിന് Hair Treatments ക്ലിക്ക് ചെയ്താൽ Botox, Keratin, Nanoplastia തുടങ്ങിയ സർവീസുകളുടെ വിവരങ്ങളും ചിത്രങ്ങളും കാണണം."
        */}
        {hasMore && (
          <div className="pt-4 pb-2 flex flex-col items-center justify-center">
            <button
              type="button"
              onClick={() => toggleCategoryExpand(activeCategory)}
              className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-white hover:bg-neutral-50 text-charcoal border border-gold/40 hover:border-gold shadow-md hover:shadow-lg transition-all duration-300 font-sans text-xs sm:text-sm font-medium tracking-wide active:scale-98 cursor-pointer group"
            >
              <span>
                {isExpanded ? 'Show Less Services' : `View More Services (+${remainingCount} More Treatments)`}
              </span>
              {isExpanded ? (
                <ChevronUp className="w-4 h-4 text-gold-deep transition-transform group-hover:-translate-y-0.5" />
              ) : (
                <ChevronDown className="w-4 h-4 text-gold-deep transition-transform group-hover:translate-y-0.5" />
              )}
            </button>
            <p className="text-[11px] font-sans text-muted mt-2">
              Click to view all {filteredServices.length} {activeCategoryMeta?.label} treatments with photos, descriptions and pricing.
            </p>
          </div>
        )}

        {/* Empty Search State */}
        {filteredServices.length === 0 && (
          <div className="py-16 text-center bg-white rounded-3xl border border-black/[0.06] p-8 max-w-md mx-auto">
            <p className="text-sm font-sans text-charcoal font-medium">No treatments found matching "{searchQuery}".</p>
            <p className="text-xs font-sans text-muted mt-1">Please try searching with another keyword or explore categories above.</p>
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="mt-4 px-4 py-2 rounded-full text-xs font-sans font-semibold bg-surface hover:bg-surface-hover text-charcoal border border-black/[0.08] transition-colors cursor-pointer"
            >
              Reset Search Filter
            </button>
          </div>
        )}

      </div>

      {/* POPUP MODAL: Treatment Dossier Dialog */}
      {selectedService && (
        <div
          data-lenis-prevent
          className={`fixed inset-0 z-[200] flex items-center justify-center p-3.5 sm:p-5 md:p-6 transition-all duration-300 ease-out select-none ${
            isModalVisible
              ? 'opacity-100 backdrop-blur-md bg-charcoal/80'
              : 'opacity-0 backdrop-blur-none bg-charcoal/0 pointer-events-none'
          }`}
          role="dialog"
          aria-modal="true"
          aria-labelledby="treatment-dialog-title"
          onClick={closeServiceModal}
        >
          <div
            data-lenis-prevent
            className={`relative w-full max-w-lg lg:max-w-xl bg-canvas rounded-2xl sm:rounded-3xl border border-gold/40 shadow-2xl overflow-hidden flex flex-col max-h-[calc(100dvh-1.5rem)] sm:max-h-[calc(100dvh-3rem)] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] select-text my-auto ${
              isModalVisible
                ? 'opacity-100 scale-100 translate-y-0'
                : 'opacity-0 scale-95 translate-y-3'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Image Header */}
            <div className="relative h-40 xs:h-44 sm:h-52 md:h-56 w-full shrink-0 overflow-hidden bg-surface">
              <img
                src={selectedService.image}
                alt={selectedService.name}
                className="w-full h-full object-cover"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/95 via-charcoal/40 to-black/25" />

              {/* Close Button Top Right */}
              <button
                type="button"
                onClick={closeServiceModal}
                className="absolute top-3 right-3 sm:top-4 sm:right-4 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-charcoal/70 hover:bg-charcoal text-white flex items-center justify-center backdrop-blur-md transition-all duration-200 cursor-pointer border border-white/20 hover:scale-105 active:scale-95 shadow-lg z-10"
                aria-label="Close details"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Text on Image Header */}
              <div className="absolute bottom-3 left-4 right-4 sm:bottom-4 sm:left-6 sm:right-6 text-white pointer-events-none">
                <span className="text-[10px] font-sans font-semibold uppercase tracking-[0.2em] text-gold-light block mb-1">
                  {selectedService.category.toUpperCase()} • ANGELS BESPOKE STUDIO
                </span>
                <h3
                  id="treatment-dialog-title"
                  className="font-serif text-xl sm:text-2xl md:text-3xl font-medium leading-tight text-white drop-shadow-sm line-clamp-2"
                >
                  {selectedService.name}
                </h3>
              </div>
            </div>

            {/* Modal Body Content (Scrollable with smooth luxury scrollbar) */}
            <div className="p-4 sm:p-6 md:p-7 space-y-4 sm:space-y-5 overflow-y-auto overscroll-contain flex-1 custom-modal-scrollbar">

              {/* Duration Pill */}
              {selectedService.duration && (
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface border border-gold-border/60 text-charcoal text-xs font-sans font-medium">
                  <Clock className="w-3.5 h-3.5 text-gold-deep shrink-0" />
                  <span>Estimated Duration: <strong className="font-semibold text-charcoal">{selectedService.duration}</strong></span>
                </div>
              )}

              {/* Description */}
              <div className="space-y-1.5">
                <h4 className="text-xs font-sans font-semibold uppercase tracking-wider text-charcoal">
                  Treatment Overview & Philosophy
                </h4>
                <p className="text-xs sm:text-[13px] md:text-sm text-muted font-sans font-light leading-relaxed">
                  {selectedService.detailedInfo || selectedService.description}
                </p>
              </div>

              {/* Benefits Checklist */}
              {selectedService.benefits && selectedService.benefits.length > 0 && (
                <div className="space-y-2.5 pt-3 border-t border-gold-border/25">
                  <h4 className="text-xs font-sans font-semibold uppercase tracking-wider text-charcoal">
                    Key Highlights & Inclusions
                  </h4>
                  <ul className="space-y-2">
                    {selectedService.benefits.map((b, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs sm:text-[13px] font-sans text-charcoal/90">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="leading-snug">{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

            </div>

            {/* Modal Pinned Action Footer (Always visible, perfectly responsive on all devices) */}
            <div className="p-3.5 sm:px-6 sm:py-4 border-t border-gold-border/30 bg-surface/90 backdrop-blur-xs shrink-0 flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-2.5 sm:gap-3">
              <button
                type="button"
                onClick={closeServiceModal}
                className="px-5 py-2.5 sm:py-3 rounded-full text-xs font-sans font-semibold uppercase tracking-wider border border-gold-border/70 hover:bg-white text-charcoal text-center cursor-pointer transition-colors active:scale-98"
              >
                Close Window
              </button>

              <a
                href={getWhatsAppBookingUrl({ serviceName: selectedService.name })}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 sm:px-6 py-2.5 sm:py-3 rounded-full text-xs font-sans font-semibold uppercase tracking-wider bg-charcoal hover:bg-black text-white shadow-sm flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-98 group"
              >
                <svg className="w-4 h-4 fill-[#25D366] text-[#25D366] shrink-0 group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                </svg>
                <span>Reserve on WhatsApp</span>
              </a>
            </div>

          </div>
        </div>
      )}

    </section>
  );
}
