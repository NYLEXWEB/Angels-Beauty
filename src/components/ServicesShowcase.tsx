import React, { useState, useEffect } from 'react';
import { SERVICES, getWhatsAppBookingUrl, type ServiceItem } from '../config/site';
import { Search, X, Clock, CheckCircle2, ChevronRight, ShieldCheck, Sparkles } from 'lucide-react';

type CategoryKey = string;

const CATEGORIES: { key: CategoryKey; label: string; count: number; tag: string }[] = [
  { key: 'bridal', label: 'Bridal Studio', count: SERVICES['bridal']?.length || 0, tag: 'Ceremonial & Draping' },
  { key: 'hair-treatments', label: 'Hair Care & Treatments', count: SERVICES['hair-treatments']?.length || 0, tag: 'Biotin, Keratin & Spa' },
  { key: 'hair-colour', label: 'Hair Colouring', count: SERVICES['hair-colour']?.length || 0, tag: 'Artistry & Balayage' },
  { key: 'skin', label: 'Skin Care & Facials', count: SERVICES['skin']?.length || 0, tag: 'Clinical & De-Tan' },
  { key: 'korean-spa', label: 'Korean Beauty & Spa', count: SERVICES['korean-spa']?.length || 0, tag: 'Glass Skin Rituals' },
  { key: 'nails', label: 'Nail Lounge & Art', count: SERVICES['nails']?.length || 0, tag: 'Extensions & 3D Art' },
  { key: 'eyes-brows', label: 'Brows & Lashes', count: SERVICES['eyes-brows']?.length || 0, tag: 'Microblading & Lashes' },
  { key: 'waxing-body', label: 'Waxing & Body Care', count: SERVICES['waxing-body']?.length || 0, tag: 'Threading, Rica & Scrub' },
  { key: 'extensions', label: 'Hair Extensions', count: SERVICES['extensions']?.length || 0, tag: 'Volume & Length' }
];

export default function ServicesShowcase() {
  const [activeCategory, setActiveCategory] = useState<CategoryKey>('bridal');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedService(null);
    };
    if (selectedService) {
      document.body.classList.add('overflow-hidden');
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.classList.remove('overflow-hidden');
    }
    return () => {
      document.body.classList.remove('overflow-hidden');
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedService]);

  const currentServices = SERVICES[activeCategory] || [];
  const allServicesList = Object.values(SERVICES).flat();
  const filteredServices = searchQuery.trim() === ''
    ? currentServices
    : allServicesList.filter(s =>
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (s.category && s.category.toLowerCase().includes(searchQuery.toLowerCase()))
    );

  const activeCategoryMeta = CATEGORIES.find(c => c.key === activeCategory);

  return (
    <section id="services" suppressHydrationWarning className="py-20 sm:py-28 lg:py-32 bg-canvas relative">

      {/* Subtle luxury ambient glow */}
      <div className="absolute top-1/3 -left-40 w-96 h-96 bg-gold/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 -right-40 w-96 h-96 bg-gold/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header: Minimalist Editorial Haute-Couture */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 sm:mb-16 gap-6 sm:gap-8 pb-8 sm:pb-10 border-b border-black/[0.06]">

          <div className="max-w-2xl space-y-3 sm:space-y-4">

            {/* Overline badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md border border-black/[0.06] shadow-2xs">
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
          </div>

          {/* Minimalist Glass Search Input */}
          <div className="w-full lg:w-80">
            <div className="relative group">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search 100+ bespoke treatments (e.g. Biotin, Balayage)..."
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

        {/* Category Switcher: Minimalist Architectural Tabs */}
        <div className="mb-10 sm:mb-14">
          <div className="flex items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar scroll-smooth -mx-4 px-4 sm:mx-0 sm:px-0">
              {CATEGORIES.map((cat) => {
                const isActive = activeCategory === cat.key;
                return (
                  <button
                    key={cat.key}
                    type="button"
                    onClick={() => {
                      setActiveCategory(cat.key);
                      setSearchQuery('');
                    }}
                    className={`shrink-0 px-5 sm:px-6 py-2.5 rounded-full text-xs sm:text-sm font-sans tracking-wide transition-all duration-300 flex items-center gap-2.5 cursor-pointer ${isActive
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

            {/* Category Subtext desktop */}
            <span className="hidden md:inline-block text-xs font-sans text-muted shrink-0">
              {activeCategoryMeta?.tag} • {filteredServices.length} Treatments
            </span>
          </div>
        </div>

        {/* 
          SERVICES SHOWCASE CARDS:
          - Mobile: Physical Luxury Stacking Cards (cards smoothly stack on top of each other as you scroll)
          - Desktop: Elegant 2-column editorial grid
        */}
        <div className="relative space-y-6 md:space-y-0 md:grid md:grid-cols-2 md:gap-7 pb-16">
          {filteredServices.map((service, index) => {
            const formattedIndex = String(index + 1).padStart(2, '0');
            const waUrl = getWhatsAppBookingUrl({ serviceName: service.name });
            // Stepped offset so each card nests/stacks directly on top of the previous card on mobile
            const mobileTopOffset = 76 + Math.min(index, 6) * 8;

            return (
              <div
                key={service.id}
                style={{
                  top: `${mobileTopOffset}px`,
                  zIndex: 10 + index
                }}
                className="mobile-stack-card group relative rounded-3xl bg-white border border-black/[0.06] hover:border-gold-deep/40 shadow-[0_10px_30px_-8px_rgba(34,28,24,0.12)] md:shadow-[0_2px_12px_-2px_rgba(34,28,24,0.04)] hover:shadow-[0_16px_36px_-8px_rgba(158,123,53,0.12)] transition-all duration-300 overflow-hidden flex flex-col justify-between"
              >
                {/* 1. Cinematic Clean Photo Frame (Zero text overlays on the image) */}
                <div className="relative aspect-[16/10] overflow-hidden bg-surface">
                  <img
                    src={service.image}
                    alt={service.name}
                    suppressHydrationWarning
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-103"
                    loading="lazy"
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
                        {service.category.toUpperCase()} • PRIVATE SUITE
                      </span>
                      {service.duration && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-surface border border-black/[0.04] text-[11px] font-sans text-charcoal/70">
                          <Clock className="w-3 h-3 text-gold-deep" />
                          <span>{service.duration}</span>
                        </span>
                      )}
                    </div>

                    {/* Service Title */}
                    <h3 className="font-sans text-xl sm:text-2xl font-normal text-charcoal tracking-tight group-hover:text-gold-deep transition-colors duration-200 leading-snug">
                      {service.name}
                    </h3>

                    {/* Description */}
                    <p className="text-xs sm:text-[13px] text-muted font-sans font-light leading-relaxed line-clamp-2">
                      {service.description}
                    </p>

                    {/* Key Benefits Preview Pills */}
                    {service.benefits && service.benefits.length > 0 && (
                      <div className="pt-1 flex flex-wrap gap-1.5">
                        {service.benefits.slice(0, 2).map((benefit, i) => (
                          <span
                            key={i}
                            className="inline-flex items-center gap-1.5 text-[11px] font-sans text-charcoal/80 bg-surface px-2.5 py-1 rounded-full border border-black/[0.04]"
                          >
                            <span className="w-1 h-1 rounded-full bg-gold-deep shrink-0" />
                            <span className="truncate max-w-[220px]">{benefit}</span>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* 3. Action Bar: Minimalist Luxury */}
                  <div className="pt-4 border-t border-black/[0.05] flex items-center justify-between gap-3">

                    {/* Inclusions Trigger */}
                    <button
                      type="button"
                      onClick={() => setSelectedService(service)}
                      className="inline-flex items-center gap-1.5 text-xs font-sans font-medium text-charcoal/80 hover:text-gold-deep transition-colors py-2 px-1 cursor-pointer group/link"
                      aria-label={`View full details for ${service.name}`}
                    >
                      <span>View Inclusions</span>
                      <ChevronRight className="w-3.5 h-3.5 text-gold-deep transition-transform duration-200 group-hover/link:translate-x-0.5" />
                    </button>

                    {/* Luxury Reserve Pill */}
                    <a
                      href={waUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 py-2 px-4 sm:px-5 rounded-full bg-charcoal hover:bg-gold-deep text-white text-xs font-sans font-medium tracking-wide transition-all duration-300 shadow-2xs hover:shadow-xs active:scale-97 shrink-0 group/btn"
                      aria-label={`Enquire about ${service.name} on WhatsApp`}
                    >
                      <svg className="w-3.5 h-3.5 fill-current text-white/90 group-hover/btn:text-white transition-colors" viewBox="0 0 24 24">
                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                      </svg>
                      <span>Enquire</span>
                    </a>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

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
          className="fixed inset-0 z-50 bg-charcoal/70 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
          role="dialog"
          aria-modal="true"
          onClick={() => setSelectedService(null)}
        >
          <div
            className="relative w-full max-w-xl bg-canvas rounded-3xl border border-gold/40 shadow-2xl overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Image Header */}
            <div className="relative aspect-[16/9] w-full overflow-hidden bg-surface">
              <img
                src={selectedService.image}
                alt={selectedService.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/30 to-transparent" />

              {/* Close Button */}
              <button
                type="button"
                onClick={() => setSelectedService(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-charcoal/60 hover:bg-charcoal text-white flex items-center justify-center backdrop-blur-xs transition-colors cursor-pointer border border-white/20"
                aria-label="Close details"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="absolute bottom-4 left-5 right-5 text-white">
                <span className="text-[10px] font-sans font-semibold uppercase tracking-[0.2em] text-gold-light block mb-1">
                  {selectedService.category.toUpperCase()} • ANGELS BESPOKE STUDIO
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-medium leading-tight text-white drop-shadow-sm">
                  {selectedService.name}
                </h3>
              </div>
            </div>

            {/* Modal Body Content */}
            <div className="p-6 sm:p-8 space-y-6 max-h-[60dvh] overflow-y-auto">

              {/* Duration Pill */}
              {selectedService.duration && (
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface border border-gold-border/60 text-charcoal text-xs font-sans font-medium">
                  <Clock className="w-3.5 h-3.5 text-gold-deep" />
                  <span>Estimated Duration: <strong className="font-semibold">{selectedService.duration}</strong></span>
                </div>
              )}

              {/* Description */}
              <div className="space-y-2">
                <h4 className="text-xs font-sans font-semibold uppercase tracking-wider text-charcoal">
                  Treatment Overview & Philosophy
                </h4>
                <p className="text-xs sm:text-sm text-muted font-sans font-light leading-relaxed">
                  {selectedService.detailedInfo || selectedService.description}
                </p>
              </div>

              {/* Benefits Checklist */}
              {selectedService.benefits && selectedService.benefits.length > 0 && (
                <div className="space-y-3 pt-4 border-t border-gold-border/30">
                  <h4 className="text-xs font-sans font-semibold uppercase tracking-wider text-charcoal">
                    Key Highlights & Inclusions
                  </h4>
                  <ul className="space-y-2">
                    {selectedService.benefits.map((b, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm font-sans text-charcoal/90">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Action Buttons in Modal */}
              <div className="pt-6 border-t border-gold-border/40 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedService(null)}
                  className="px-5 py-3 rounded-full text-xs font-sans font-semibold uppercase tracking-wider border border-gold-border hover:bg-surface text-charcoal text-center cursor-pointer order-2 sm:order-1 transition-colors"
                >
                  Close Window
                </button>

                <a
                  href={getWhatsAppBookingUrl({ serviceName: selectedService.name })}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-full text-xs font-sans font-semibold uppercase tracking-wider bg-charcoal hover:bg-gold-deep text-white shadow-sm flex items-center justify-center gap-2 transition-all cursor-pointer order-1 sm:order-2 group"
                >
                  <svg className="w-4 h-4 fill-current text-white/90 group-hover:text-white transition-colors shrink-0" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                  </svg>
                  <span>Reserve on WhatsApp</span>
                </a>
              </div>

            </div>
          </div>
        </div>
      )}

    </section>
  );
}
