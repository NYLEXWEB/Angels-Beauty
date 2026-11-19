import React, { useState, useEffect } from 'react';
import { SERVICES, getWhatsAppBookingUrl, type ServiceItem } from '../config/site';
import { Sparkles, Search, X, Info, Clock, CheckCircle2 } from 'lucide-react';

type CategoryKey = 'bridal' | 'hair' | 'skin' | 'other';

const CATEGORIES: { key: CategoryKey; label: string; count: number }[] = [
  { key: 'bridal', label: 'Bridal Artistry', count: SERVICES.bridal.length },
  { key: 'hair', label: 'Hair Couture', count: SERVICES.hair.length },
  { key: 'skin', label: 'Skin Therapies', count: SERVICES.skin.length },
  { key: 'other', label: 'Beauty Extras', count: SERVICES.other.length }
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

  const currentServices = SERVICES[activeCategory];
  const filteredServices = searchQuery.trim() === ''
    ? currentServices
    : currentServices.filter(s => 
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.description.toLowerCase().includes(searchQuery.toLowerCase())
      );

  return (
    <section id="services" className="py-14 sm:py-20 md:py-28 bg-canvas relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-5">
          <div className="max-w-2xl space-y-2 sm:space-y-3">
            <div className="inline-flex items-center gap-2 text-[11px] sm:text-xs font-sans font-semibold tracking-[0.2em] sm:tracking-[0.25em] uppercase text-gold-deep">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Studio Treatment Menu</span>
            </div>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-serif text-charcoal tracking-tight">
              Curated Services & Ceremonial Artistry
            </h2>
            <p className="text-muted text-xs sm:text-sm md:text-base font-sans">
              Every service is delivered with dedicated time, hospital-grade hygiene, and premium international formulations.
            </p>
          </div>

          {/* Search Filter */}
          <div className="w-full md:w-72 relative">
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search 38 treatments..."
              aria-label="Search treatments and services"
              className="w-full pl-9 pr-8 py-2.5 rounded-full border border-gold-border bg-surface text-charcoal text-xs sm:text-sm placeholder:text-muted/60 focus:outline-none focus:border-gold-strong focus:bg-white transition-all shadow-xs"
            />
            <Search className="w-4 h-4 text-muted absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-charcoal cursor-pointer"
                aria-label="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Category Switcher Carousel */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 sm:mb-10 no-scrollbar scroll-smooth -mx-4 px-4 sm:mx-0 sm:px-0">
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
                className={`shrink-0 px-4 sm:px-5 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-sans tracking-wide transition-all duration-300 flex items-center gap-2 cursor-pointer ${
                  isActive
                    ? 'bg-charcoal text-white shadow-md font-medium'
                    : 'bg-surface hover:bg-surface-hover text-charcoal border border-gold-border/60'
                }`}
              >
                <span>{cat.label}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  isActive ? 'bg-gold/30 text-gold-light' : 'bg-gold/15 text-gold-deep'
                }`}>
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* 
          SERVICES CARDS:
          - Mobile: True Sticky Stacking Cards. As you scroll, card 2 smoothly slides up and places directly on top of card 1, card 3 over card 2, etc.
          - Desktop: Elegant 2-column grid with service-matched photography
          - Both include "More Details" popup trigger + WhatsApp-themed Enquire button
        */}
        <div className="relative space-y-6 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-6 pb-8">
          {filteredServices.map((service, index) => {
            const formattedIndex = String(index + 1).padStart(2, '0');
            const waUrl = getWhatsAppBookingUrl({ serviceName: service.name });
            // Stepped offset for physical card deck stacking on mobile
            const mobileTopOffset = 76 + (index % 6) * 8;

            return (
              <div
                key={service.id}
                style={{
                  top: `${mobileTopOffset}px`,
                  zIndex: 10 + index
                }}
                className="mobile-stack-card sm:static group rounded-3xl bg-white border-2 border-gold/60 sm:border border-gold-border/70 hover:border-gold shadow-[0_16px_36px_-6px_rgba(34,28,24,0.22)] sm:shadow-xs hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between"
              >
                {/* Specific Corresponding Image Container */}
                <div className="relative aspect-[16/9] sm:aspect-[16/10] overflow-hidden bg-surface">
                  <img 
                    src={service.image} 
                    alt={service.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-charcoal/10 to-transparent"></div>

                  {/* Top Bar: Index + Badge */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                    <span className="font-serif text-white font-semibold text-xs tracking-widest px-2.5 py-0.5 rounded-full bg-charcoal/60 backdrop-blur-xs border border-white/20">
                      {formattedIndex}
                    </span>
                    {service.badge && (
                      <span className="text-[10px] font-sans font-semibold tracking-wider uppercase px-2.5 py-0.5 rounded-full bg-gold text-charcoal shadow-xs">
                        {service.badge}
                      </span>
                    )}
                  </div>

                  <div className="absolute bottom-3 left-3 right-3">
                    <h3 className="font-serif text-xl sm:text-2xl text-white font-medium drop-shadow-sm leading-snug">
                      {service.name}
                    </h3>
                  </div>
                </div>

                {/* Card Content & Buttons */}
                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-4 bg-white">
                  <p className="text-xs sm:text-sm text-muted font-sans leading-relaxed line-clamp-2 sm:line-clamp-3">
                    {service.description}
                  </p>

                  <div className="pt-3 border-t border-gold-border/30 flex items-center justify-between gap-2.5">
                    {/* More Details Button (Opens Popup) */}
                    <button
                      type="button"
                      onClick={() => setSelectedService(service)}
                      className="inline-flex items-center gap-1.5 py-2 px-3 rounded-full border border-gold-border text-charcoal hover:bg-surface text-xs font-sans font-semibold tracking-wide transition-colors cursor-pointer"
                      aria-label={`View full details for ${service.name}`}
                    >
                      <Info className="w-3.5 h-3.5 text-gold-deep" />
                      <span>More Details</span>
                    </button>

                    {/* WhatsApp-Themed Enquire Button with Original WhatsApp Icon */}
                    <a
                      href={waUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 py-2 px-3.5 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-sans font-semibold tracking-wide transition-all shadow-sm hover:shadow-md active:scale-95 shrink-0"
                      aria-label={`Enquire about ${service.name} on WhatsApp`}
                    >
                      <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                      </svg>
                      <span>Enquire</span>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredServices.length === 0 && (
          <div className="py-12 text-center text-muted font-sans">
            <p className="text-sm sm:text-base">No services found matching "{searchQuery}".</p>
            <button 
              type="button"
              onClick={() => setSearchQuery('')}
              className="mt-2 text-xs text-gold-deep underline font-medium cursor-pointer"
            >
              Clear search filter
            </button>
          </div>
        )}

      </div>

      {/* POPUP MODAL: Interactive Full Details Dialog */}
      {selectedService && (
        <div 
          className="fixed inset-0 z-50 bg-charcoal/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
          role="dialog"
          aria-modal="true"
          onClick={() => setSelectedService(null)}
        >
          <div 
            className="relative w-full max-w-xl bg-canvas rounded-3xl border border-gold shadow-2xl overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Image Header */}
            <div className="relative aspect-[16/9] w-full overflow-hidden bg-surface">
              <img 
                src={selectedService.image} 
                alt={selectedService.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/30 to-transparent"></div>

              {/* Close Button */}
              <button
                type="button"
                onClick={() => setSelectedService(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-charcoal/60 hover:bg-charcoal text-white flex items-center justify-center backdrop-blur-xs transition-colors cursor-pointer"
                aria-label="Close details"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="absolute bottom-4 left-5 right-5 text-white">
                <span className="text-[10px] font-sans font-semibold uppercase tracking-[0.2em] text-gold-light block mb-1">
                  {selectedService.category.toUpperCase()} • ANGELS STUDIO
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-medium leading-tight text-white drop-shadow-sm">
                  {selectedService.name}
                </h3>
              </div>
            </div>

            {/* Modal Body Content */}
            <div className="p-5 sm:p-7 space-y-5 max-h-[60dvh] overflow-y-auto">
              
              {/* Duration / Schedule Pill */}
              {selectedService.duration && (
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface border border-gold-border text-charcoal text-xs font-sans font-medium">
                  <Clock className="w-3.5 h-3.5 text-gold-deep" />
                  <span>Estimated Duration: <strong>{selectedService.duration}</strong></span>
                </div>
              )}

              {/* In-Depth Description */}
              <div className="space-y-1.5">
                <h4 className="text-xs font-sans font-semibold uppercase tracking-wider text-charcoal">
                  Service Overview
                </h4>
                <p className="text-xs sm:text-sm text-muted font-sans leading-relaxed">
                  {selectedService.detailedInfo || selectedService.description}
                </p>
              </div>

              {/* Benefits Checklist */}
              {selectedService.benefits && selectedService.benefits.length > 0 && (
                <div className="space-y-2 pt-2 border-t border-gold-border/30">
                  <h4 className="text-xs font-sans font-semibold uppercase tracking-wider text-charcoal">
                    Key Highlights & Inclusions
                  </h4>
                  <ul className="space-y-1.5">
                    {selectedService.benefits.map((b, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs font-sans text-charcoal/90">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Action Buttons in Modal */}
              <div className="pt-4 border-t border-gold-border/40 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedService(null)}
                  className="px-5 py-3 rounded-full text-xs font-sans font-semibold uppercase tracking-wider border border-gold-border hover:bg-surface text-charcoal text-center cursor-pointer order-2 sm:order-1"
                >
                  Close Window
                </button>

                <a
                  href={getWhatsAppBookingUrl({ serviceName: selectedService.name })}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-full text-xs font-sans font-semibold uppercase tracking-wider bg-[#25D366] hover:bg-[#20ba5a] text-white shadow-sm flex items-center justify-center gap-2 transition-all cursor-pointer order-1 sm:order-2"
                >
                  <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                  </svg>
                  <span>Book on WhatsApp</span>
                </a>
              </div>

            </div>
          </div>
        </div>
      )}

    </section>
  );
}
