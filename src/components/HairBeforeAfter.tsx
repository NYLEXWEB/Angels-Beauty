import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, Sliders, ShieldCheck } from 'lucide-react';
import { getWhatsAppBookingUrl } from '../config/site';

interface TransformationItem {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  beforeImg: string;
  afterImg: string;
  beforeDesc: string;
  afterDesc: string;
  results: string[];
  duration: string;
  startingPrice: string;
}

const TRANSFORMATIONS: TransformationItem[] = [
  {
    id: 'keratin-nanoplastia',
    title: 'Nanoplastia & Keratin Smoothing',
    subtitle: 'Zero-Formaldehyde Silk Glass Realignment',
    category: 'Hair Treatments',
    beforeImg: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=800&q=80',
    afterImg: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80',
    beforeDesc: 'Extremely frizzy, coarse and humidity-damaged hair prone to tangles and breakage.',
    afterDesc: 'Glass-smooth, mirror-reflective straight hair with natural bounce and 6-month frizz shield.',
    results: ['100% Frizz Elimination', 'Instant Mirror Gloss', 'Humidity Resistant', 'Safe for Color-Treated Hair'],
    duration: '3.5 - 4.5 Hours',
    startingPrice: 'Starting from ₹4,999'
  },
  {
    id: 'botox-biotin',
    title: 'Hair Botox & Biotin Restorative Therapy',
    subtitle: 'Deep Cellular Repair & Cortex Fortification',
    category: 'Hair Treatments',
    beforeImg: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&w=800&q=80',
    afterImg: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=80',
    beforeDesc: 'Chemically compromised, bleached strands with split ends and thinning cuticle layers.',
    afterDesc: 'Re-densified, deeply hydrated strands with restored tensile strength and luminous volume.',
    results: ['Deep Keratin Infusion', 'Split End Sealing', 'Reverses Heat & Chemical Damage', 'Biotin Root Nourishment'],
    duration: '2.5 - 3 Hours',
    startingPrice: 'Starting from ₹3,999'
  },
  {
    id: 'balayage-colour',
    title: 'Dimensional Balayage & Colour Artistry',
    subtitle: 'Seamless Sun-Kissed Melt & Tone Neutralization',
    category: 'Hair Colour Studio',
    beforeImg: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=800&q=80',
    afterImg: 'https://images.unsplash.com/photo-1560869713-7d0a29430803?auto=format&fit=crop&w=800&q=80',
    beforeDesc: 'Flat, uneven brassy undertones from previous box dyes with dull contrast.',
    afterDesc: 'Multi-tonal champagne & honey caramel ribbons with soft shadow root and liquid shine gloss.',
    results: ['Custom Tone Formulations', 'No Harsh Line of Demarcation', 'Bond-Builder Protection', 'Gloss Toner Seal'],
    duration: '4 - 5 Hours',
    startingPrice: 'Starting from ₹4,500'
  }
];

export default function HairBeforeAfter() {
  const [activeTab, setActiveTab] = useState<string>(TRANSFORMATIONS[0].id);
  const [sliderPositions, setSliderPositions] = useState<Record<string, number>>({
    'keratin-nanoplastia': 50,
    'botox-biotin': 50,
    'balayage-colour': 50
  });

  const activeItem = TRANSFORMATIONS.find(t => t.id === activeTab) || TRANSFORMATIONS[0];
  const currentSlider = sliderPositions[activeItem.id] ?? 50;

  const handleSliderChange = (val: number) => {
    setSliderPositions(prev => ({
      ...prev,
      [activeItem.id]: val
    }));
  };

  const bookingUrl = getWhatsAppBookingUrl({ serviceName: activeItem.title });

  return (
    <section className="py-16 sm:py-24 bg-surface border-y border-gold/20 relative overflow-hidden">
      
      {/* Background radial glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none opacity-40">
        <div className="absolute top-12 left-10 w-96 h-96 bg-gold/10 rounded-full blur-3xl" />
        <div className="absolute bottom-12 right-10 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-gold/30 shadow-2xs">
            <span className="text-[10px] sm:text-[11px] font-sans font-semibold tracking-[0.25em] uppercase text-charcoal/90">
              Hair Transformation Studio
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-light text-charcoal tracking-tight">
            Real Hair Transformations <br />
            <span className="italic font-normal text-gold-deep font-serif">Before & After Results</span>
          </h2>

          <p className="text-xs sm:text-sm text-muted font-sans font-light leading-relaxed max-w-xl mx-auto">
            Interact with our comparison slider below to see how our certified hair technicians restore damaged hair with Botox, Nanoplastia, Keratin, and Balayage artistry.
          </p>

          {/* Treatment Selection Tabs */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-2">
            {TRANSFORMATIONS.map(item => (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveTab(item.id)}
                className={`px-4 sm:px-5 py-2 rounded-full text-xs font-sans tracking-wide transition-all cursor-pointer ${
                  activeTab === item.id
                    ? 'bg-charcoal text-white font-medium shadow-xs scale-[1.02]'
                    : 'bg-white hover:bg-neutral-50 text-charcoal/70 border border-black/10'
                }`}
              >
                {item.title.split('&')[0].trim()}
              </button>
            ))}
          </div>
        </div>

        {/* Interactive Comparison Card */}
        <div className="bg-white rounded-3xl border border-gold/30 shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 max-w-5xl mx-auto">

          {/* Left Column: Interactive Comparison Canvas (7 cols) */}
          <div className="lg:col-span-7 relative bg-neutral-900 select-none overflow-hidden aspect-[4/3] sm:aspect-[16/11]">
            
            {/* After Image (Full Background) */}
            <img
              src={activeItem.afterImg}
              alt={`${activeItem.title} After`}
              className="absolute inset-0 w-full h-full object-cover"
              loading="lazy"
              decoding="async"
            />
            <div className="absolute top-4 right-4 z-10 px-3 py-1 rounded-full bg-emerald-600/90 text-white text-[11px] font-sans font-semibold tracking-wider uppercase backdrop-blur-xs border border-white/20 shadow-xs">
              After Treatment
            </div>

            {/* Before Image (Clipped Left Layer) */}
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${currentSlider}%` }}
            >
              <img
                src={activeItem.beforeImg}
                alt={`${activeItem.title} Before`}
                className="absolute inset-0 w-full h-full object-cover max-w-none"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                loading="lazy"
                decoding="async"
              />
              <div className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full bg-charcoal/80 text-white text-[11px] font-sans font-semibold tracking-wider uppercase backdrop-blur-xs border border-white/20 shadow-xs">
                Before
              </div>
            </div>

            {/* Draggable Divider Handle Line */}
            <div
              className="absolute top-0 bottom-0 w-0.5 bg-white shadow-[0_0_10px_rgba(0,0,0,0.5)] z-20 pointer-events-none"
              style={{ left: `${currentSlider}%` }}
            >
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white text-charcoal shadow-lg border border-gold/40 flex items-center justify-center pointer-events-auto cursor-ew-resize">
                <Sliders className="w-3.5 h-3.5 text-gold-deep rotate-90" />
              </div>
            </div>

            {/* Range Input Overlay for Drag / Touch Control */}
            <input
              type="range"
              min="0"
              max="100"
              value={currentSlider}
              onChange={(e) => handleSliderChange(Number(e.target.value))}
              aria-label="Drag to compare before and after"
              className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-30"
            />

            {/* Micro Helper Tag */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 px-3 py-1 rounded-full bg-charcoal/70 backdrop-blur-md text-white/90 text-[10px] font-sans tracking-wider pointer-events-none">
              ← Drag slider to compare →
            </div>
          </div>

          {/* Right Column: Treatment Highlights & Inclusions (5 cols) */}
          <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between bg-white border-t lg:border-t-0 lg:border-l border-black/[0.06] space-y-6">

            <div className="space-y-4">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[10px] font-sans font-semibold uppercase tracking-[0.2em] text-gold-deep">
                  {activeItem.category}
                </span>
                <span className="text-xs font-sans text-muted">
                  Duration: <strong className="text-charcoal font-medium">{activeItem.duration}</strong>
                </span>
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-light text-charcoal tracking-tight">
                  {activeItem.title}
                </h3>
                <p className="text-xs text-gold-deep font-sans font-medium mt-0.5">
                  {activeItem.subtitle}
                </p>
              </div>

              {/* Clinical Description */}
              <div className="space-y-2 text-xs font-sans text-muted leading-relaxed">
                <p>
                  <strong className="text-charcoal font-medium">Pre-Condition:</strong> {activeItem.beforeDesc}
                </p>
                <p>
                  <strong className="text-emerald-700 font-medium">Post-Treatment:</strong> {activeItem.afterDesc}
                </p>
              </div>

              {/* Key Results Checklist */}
              <div className="space-y-2 pt-2 border-t border-black/[0.05]">
                <h4 className="text-[11px] font-sans font-semibold uppercase tracking-wider text-charcoal">
                  Guaranteed Benefits
                </h4>
                <ul className="grid grid-cols-1 gap-1.5">
                  {activeItem.results.map((res, i) => (
                    <li key={i} className="flex items-center gap-2 text-xs font-sans text-charcoal/90">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{res}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Action Bar */}
            <div className="pt-4 border-t border-black/[0.06] space-y-2">
              <a
                href={bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-5 rounded-full bg-charcoal hover:bg-emerald-700 text-white text-xs font-sans font-semibold tracking-wide transition-all shadow-md group"
              >
                <span>Book This Hair Transformation on WhatsApp</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </a>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-muted font-sans">
                <ShieldCheck className="w-3.5 h-3.5 text-gold-deep" />
                <span>Zero Formaldehyde • Patch Test Available Prior to Session</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
