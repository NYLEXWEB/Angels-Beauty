import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, ZoomIn, X, Clock, CheckCircle2 } from 'lucide-react';
import { getWhatsAppBookingUrl, SITE_CONFIG } from '../config/site';

function InstagramIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>
  );
}

interface NailDesign {
  id: string;
  name: string;
  category: string;
  image: string;
  description: string;
  duration: string;
  price: string;
}

const NAIL_DESIGNS: NailDesign[] = [
  {
    id: 'bridal-nail-art',
    name: 'Opulent 3D Bridal Nail Art',
    category: 'Bridal',
    image: 'https://images.unsplash.com/photo-1632345031435-8727f6897d53?auto=format&fit=crop&w=800&q=80',
    description: 'Bespoke bridal nail couture with Swarovski crystal accents, pearl encapsulation, and subtle gold leaf foil.',
    duration: '75 mins',
    price: 'Starting from ₹1,499'
  },
  {
    id: 'acrylic-extensions',
    name: 'Sculpted Acrylic & Gel Extensions',
    category: 'Extensions',
    image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=800&q=80',
    description: 'Custom almond and coffin tip sculpting with durable non-yellowing acrylic formulation and mirror shine top coat.',
    duration: '90 mins',
    price: 'Starting from ₹1,999'
  },
  {
    id: 'french-chrome',
    name: 'Glazed French Chrome & Ombre',
    category: 'French',
    image: 'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?auto=format&fit=crop&w=800&q=80',
    description: 'Contemporary Hailey Bieber pearl-glazed chrome powder buffed over sheer nude micro-french tips.',
    duration: '60 mins',
    price: 'Starting from ₹1,199'
  },
  {
    id: 'cat-eye-velvet',
    name: 'Cat-Eye Velvet Magnetic Gel',
    category: '3D Art',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80',
    description: 'Dimensional magnetic particles arranged under precision magnet bars to create mesmerizing liquid velvet shifts.',
    duration: '60 mins',
    price: 'Starting from ₹1,299'
  },
  {
    id: 'korean-jelly-nails',
    name: 'Korean Glass & Jelly Syrup Nails',
    category: 'French',
    image: 'https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=800&q=80',
    description: 'Ultra-translucent syrup gel layering creating a dewy glass-like dimension with blush gradients.',
    duration: '60 mins',
    price: 'Starting from ₹1,299'
  },
  {
    id: 'custom-handpainted',
    name: 'Hand-Painted Floral & Fine-Line Art',
    category: '3D Art',
    image: 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&w=800&q=80',
    description: 'Micro-brush artisan illustration featuring botanical motifs, gold baroque borders, and geometric abstracts.',
    duration: '80 mins',
    price: 'Contact Us for Pricing'
  }
];

const FILTER_TABS = ['All Portfolio', 'Bridal', 'Extensions', 'French', '3D Art'];

export default function NailPortfolio() {
  const [activeTab, setActiveTab] = useState<string>('All Portfolio');
  const [activeModal, setActiveModal] = useState<NailDesign | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openNailModal = (design: NailDesign) => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
    }
    setActiveModal(design);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setIsModalVisible(true);
      });
    });
  };

  const closeNailModal = () => {
    setIsModalVisible(false);
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
    }
    closeTimeoutRef.current = setTimeout(() => {
      setActiveModal(null);
    }, 280);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeNailModal();
    };

    if (activeModal) {
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
  }, [activeModal]);

  const filteredDesigns = activeTab === 'All Portfolio'
    ? NAIL_DESIGNS
    : NAIL_DESIGNS.filter(d => d.category === activeTab);

  return (
    <section className="py-16 sm:py-24 bg-canvas relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-14 gap-6 pb-6 border-b border-black/[0.06]">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-gold/30 shadow-2xs">
              <span className="text-[10px] sm:text-[11px] font-sans font-semibold tracking-[0.25em] uppercase text-charcoal/90">
                Dedicated Nail Lounge
              </span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-light text-charcoal tracking-tight">
              Nail Art & Extension <br />
              <span className="italic font-normal text-gold-deep font-serif">Studio Portfolio</span>
            </h2>

            <p className="text-xs sm:text-sm text-muted font-sans font-light leading-relaxed">
              Explore our custom nail creations crafted with imported Japanese gels, Swarovski crystals, and medical-grade sterilization.
            </p>
          </div>

          {/* Social connection */}
          <div className="flex items-center gap-3">
            <a
              href={SITE_CONFIG.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white hover:bg-neutral-50 border border-black/10 text-xs font-sans text-charcoal shadow-2xs transition-all group"
            >
              <InstagramIcon className="w-4 h-4 text-pink-600 transition-transform group-hover:scale-110" />
              <span>More Designs on @angels_beauty__parlour</span>
            </a>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {FILTER_TABS.map(tab => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`shrink-0 px-4 sm:px-5 py-2 rounded-full text-xs font-sans tracking-wide transition-all cursor-pointer ${
                activeTab === tab
                  ? 'bg-charcoal text-white font-medium shadow-xs'
                  : 'bg-white hover:bg-neutral-50 text-charcoal/70 border border-black/[0.06]'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {filteredDesigns.map((design) => {
            const waUrl = getWhatsAppBookingUrl({ serviceName: `Nail Art Portfolio: ${design.name}` });

            return (
              <div
                key={design.id}
                className="group relative rounded-3xl bg-white border border-black/[0.06] hover:border-gold-deep/40 shadow-xs hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between"
              >
                {/* Photo frame */}
                <div 
                  onClick={() => openNailModal(design)}
                  className="relative aspect-[4/3] overflow-hidden bg-surface cursor-pointer"
                >
                  <img
                    src={design.image}
                    alt={design.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        openNailModal(design);
                      }}
                      className="px-4 py-2 rounded-full bg-white/90 backdrop-blur-md text-charcoal text-xs font-sans font-medium flex items-center gap-1.5 shadow-md cursor-pointer hover:bg-white"
                    >
                      <ZoomIn className="w-3.5 h-3.5 text-gold-deep" />
                      <span>Enlarge Details</span>
                    </button>
                  </div>
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-charcoal/70 backdrop-blur-xs text-white text-[10px] font-sans tracking-wider uppercase">
                    {design.category}
                  </div>
                </div>

                {/* Details */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <h3 
                        onClick={() => openNailModal(design)}
                        className="font-sans text-base sm:text-lg font-medium text-charcoal tracking-tight group-hover:text-gold-deep transition-colors cursor-pointer"
                      >
                        {design.name}
                      </h3>
                      <span className="text-[11px] font-sans text-muted shrink-0">
                        {design.duration}
                      </span>
                    </div>

                    <p className="text-xs text-muted font-sans font-light leading-relaxed line-clamp-2">
                      {design.description}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="pt-3 border-t border-black/[0.05] flex items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={() => openNailModal(design)}
                      className="text-xs font-sans text-charcoal hover:text-gold-deep font-medium cursor-pointer"
                    >
                      View Specs
                    </button>

                    <a
                      href={waUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-charcoal hover:bg-emerald-700 text-white text-xs font-sans font-medium transition-all shadow-2xs"
                    >
                      <span>Book on WhatsApp</span>
                      <ArrowRight className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Detail Modal */}
      {activeModal && (
        <div
          data-lenis-prevent
          className={`fixed inset-0 z-[200] flex items-center justify-center p-3.5 sm:p-5 md:p-6 transition-all duration-300 ease-out select-none ${
            isModalVisible
              ? 'opacity-100 backdrop-blur-md bg-charcoal/80'
              : 'opacity-0 backdrop-blur-none bg-charcoal/0 pointer-events-none'
          }`}
          role="dialog"
          aria-modal="true"
          onClick={closeNailModal}
        >
          <div
            data-lenis-prevent
            className={`relative w-full max-w-lg bg-canvas rounded-2xl sm:rounded-3xl border border-gold/40 shadow-2xl overflow-hidden flex flex-col max-h-[calc(100dvh-1.5rem)] sm:max-h-[calc(100dvh-3rem)] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] select-text my-auto ${
              isModalVisible
                ? 'opacity-100 scale-100 translate-y-0'
                : 'opacity-0 scale-95 translate-y-3'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header Image */}
            <div className="relative h-44 sm:h-56 overflow-hidden bg-surface shrink-0">
              <img
                src={activeModal.image}
                alt={activeModal.name}
                className="w-full h-full object-cover"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-transparent to-black/20" />
              
              <button
                type="button"
                onClick={closeNailModal}
                className="absolute top-3 right-3 sm:top-4 sm:right-4 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-charcoal/70 hover:bg-charcoal text-white flex items-center justify-center backdrop-blur-md transition-all duration-200 cursor-pointer border border-white/20 hover:scale-105 active:scale-95 shadow-lg z-10"
                aria-label="Close details"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="absolute bottom-3 left-4 right-4 sm:bottom-4 sm:left-6 sm:right-6 text-white pointer-events-none">
                <span className="text-[10px] font-sans font-semibold uppercase tracking-[0.2em] text-gold-light block mb-1">
                  {activeModal.category} • CUSTOM NAIL ART
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-medium leading-tight text-white drop-shadow-sm">
                  {activeModal.name}
                </h3>
              </div>
            </div>

            {/* Scrollable Body */}
            <div className="p-4 sm:p-6 space-y-4 overflow-y-auto overscroll-contain flex-1 custom-modal-scrollbar">
              <div className="flex items-center justify-between">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface border border-gold-border/60 text-charcoal text-xs font-sans font-medium">
                  <Clock className="w-3.5 h-3.5 text-gold-deep" />
                  <span>Duration: <strong>{activeModal.duration}</strong></span>
                </div>
                <span className="text-xs font-sans text-gold-deep font-semibold">
                  {activeModal.price}
                </span>
              </div>

              <div className="space-y-1.5">
                <h4 className="text-xs font-sans font-semibold uppercase tracking-wider text-charcoal">
                  Artistry Details & Application
                </h4>
                <p className="text-xs sm:text-sm text-muted font-sans leading-relaxed">
                  {activeModal.description}
                </p>
              </div>

              <div className="space-y-2 pt-2 border-t border-gold-border/20">
                <h4 className="text-xs font-sans font-semibold uppercase tracking-wider text-charcoal">
                  Studio Inclusions
                </h4>
                <ul className="space-y-1.5 text-xs text-charcoal/80 font-sans">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Cuticle care & nail shaping included</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Imported non-yellowing high-gloss protective topcoat</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Nourishing almond cuticle oil finish</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Pinned Action Footer */}
            <div className="p-3.5 sm:px-6 sm:py-4 border-t border-gold-border/30 bg-surface/90 backdrop-blur-xs shrink-0 flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-2.5 sm:gap-3">
              <button
                type="button"
                onClick={closeNailModal}
                className="px-5 py-2.5 rounded-full text-xs font-sans font-semibold uppercase tracking-wider border border-gold-border/70 hover:bg-white text-charcoal text-center cursor-pointer transition-colors active:scale-98"
              >
                Close Window
              </button>

              <a
                href={getWhatsAppBookingUrl({ serviceName: `Nail Studio: ${activeModal.name}` })}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2.5 rounded-full bg-charcoal hover:bg-black text-white text-xs font-sans font-semibold uppercase tracking-wider shadow-sm flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-98"
              >
                Reserve on WhatsApp
              </a>
            </div>

          </div>
        </div>
      )}

    </section>
  );
}
