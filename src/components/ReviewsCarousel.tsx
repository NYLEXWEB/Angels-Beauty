import React, { useState } from 'react';
import { SAMPLE_REVIEWS, GOOGLE_RATING_SUMMARY } from '../config/reviews';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

export default function ReviewsCarousel() {
  const [mobileIndex, setMobileIndex] = useState(0);

  const prevReview = () => {
    setMobileIndex((prev) => (prev === 0 ? SAMPLE_REVIEWS.length - 1 : prev - 1));
  };

  const nextReview = () => {
    setMobileIndex((prev) => (prev === SAMPLE_REVIEWS.length - 1 ? 0 : prev + 1));
  };

  return (
    <section id="reviews" className="py-14 sm:py-20 md:py-28 bg-canvas overflow-x-clip">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Google Header Summary Box */}
        <div className="p-4 sm:p-8 rounded-2xl sm:rounded-3xl bg-surface border border-gold-border/70 mb-8 sm:mb-14">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6">
            
            {/* Google Brand & Rating */}
            <div className="flex flex-row items-center gap-3.5 sm:gap-5 text-left w-full sm:w-auto">
              {/* Google G Logo */}
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white border border-gold-border/40 shadow-xs flex items-center justify-center shrink-0">
                <svg className="w-6 h-6 sm:w-8 sm:h-8" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"/>
                  <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.36 24 12 24z"/>
                  <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.14-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"/>
                  <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.36 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
                </svg>
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <span className="font-serif text-2xl sm:text-4xl font-bold text-charcoal">
                    {GOOGLE_RATING_SUMMARY.averageRating}
                  </span>
                  <div className="flex text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                </div>
                <p className="text-[11px] sm:text-xs text-muted font-sans mt-0.5">
                  Verified Google Rating • Angels Beauty Parlour
                </p>
              </div>
            </div>

            {/* Google Review Link + Desktop Controls */}
            <div className="flex items-center justify-between w-full sm:w-auto gap-3">
              <a
                href={GOOGLE_RATING_SUMMARY.googleProfileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto text-center px-4 sm:px-5 py-2.5 rounded-full text-xs font-sans font-semibold uppercase tracking-wider text-charcoal bg-white hover:bg-gold/20 border border-gold-border transition-all shadow-xs"
              >
                Review Us on Google
              </a>

              {/* Desktop Slider Controls */}
              <div className="hidden sm:flex items-center gap-1.5 ml-2 shrink-0">
                <button
                  type="button"
                  onClick={prevReview}
                  className="w-9 h-9 rounded-full border border-gold-border bg-white hover:bg-canvas text-charcoal flex items-center justify-center transition-colors cursor-pointer"
                  aria-label="Previous review"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={nextReview}
                  className="w-9 h-9 rounded-full border border-gold-border bg-white hover:bg-canvas text-charcoal flex items-center justify-center transition-colors cursor-pointer"
                  aria-label="Next review"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* Mobile View: Single Compact Card with Dots + Arrows */}
        <div className="block sm:hidden">
          {(() => {
            const review = SAMPLE_REVIEWS[mobileIndex];
            return (
              <div className="relative rounded-2xl p-5 bg-surface border-2 border-gold/70 shadow-sm flex flex-col justify-between min-h-[220px]">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex text-amber-400">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <span className="text-[10px] font-sans text-subtle">
                      {review.relativeTime}
                    </span>
                  </div>

                  <span className="text-[10px] font-sans font-semibold uppercase tracking-wider text-gold-deep block mb-1.5">
                    {review.serviceMentioned}
                  </span>

                  <p className="text-xs font-sans text-charcoal/90 leading-relaxed italic mb-4">
                    "{review.text}"
                  </p>
                </div>

                <div className="pt-3 border-t border-gold-border/30 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-gold/20 text-gold-deep font-serif font-bold text-xs flex items-center justify-center">
                      {review.authorName.charAt(0)}
                    </div>
                    <h4 className="text-xs font-sans font-semibold text-charcoal">
                      {review.authorName}
                    </h4>
                  </div>

                  <span className="text-[10px] text-emerald-700 font-sans font-medium flex items-center gap-0.5">
                    <span>✓</span> Verified
                  </span>
                </div>
              </div>
            );
          })()}

          {/* Mobile Carousel Controls & Indicators */}
          <div className="flex items-center justify-between pt-4 px-2">
            <button
              type="button"
              onClick={prevReview}
              className="p-2 rounded-full border border-gold-border bg-white text-charcoal active:scale-95"
              aria-label="Previous review"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-1.5">
              {SAMPLE_REVIEWS.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setMobileIndex(i)}
                  className={`h-1.5 rounded-full transition-all ${
                    mobileIndex === i ? 'w-5 bg-gold-deep' : 'w-1.5 bg-gold-border'
                  }`}
                  aria-label={`Go to review ${i + 1}`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={nextReview}
              className="p-2 rounded-full border border-gold-border bg-white text-charcoal active:scale-95"
              aria-label="Next review"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Desktop View: 3 Refined Cards */}
        <div className="hidden sm:grid sm:grid-cols-3 gap-6">
          {SAMPLE_REVIEWS.slice(0, 3).map((review, idx) => {
            const isMiddle = idx === 1;
            return (
              <div
                key={review.id}
                className={`relative rounded-3xl p-7 flex flex-col justify-between transition-all duration-300 ${
                  isMiddle
                    ? 'bg-surface border-2 border-gold shadow-md'
                    : 'bg-surface/50 border border-gold-border/60 hover:border-gold hover:bg-surface'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex text-amber-400">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <span className="text-[11px] font-sans text-subtle">
                      {review.relativeTime}
                    </span>
                  </div>

                  <span className="text-[11px] font-sans font-medium uppercase tracking-wider text-gold-deep block mb-2">
                    {review.serviceMentioned}
                  </span>

                  <p className="text-sm font-sans text-charcoal/90 leading-relaxed italic mb-6">
                    "{review.text}"
                  </p>
                </div>

                <div className="pt-4 border-t border-gold-border/30 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gold/20 text-gold-deep font-serif font-bold text-sm flex items-center justify-center">
                    {review.authorName.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-xs font-sans font-semibold text-charcoal">
                      {review.authorName}
                    </h4>
                    <span className="text-[10px] text-muted font-sans flex items-center gap-1">
                      <span className="text-emerald-600">✓</span> Verified Client
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footnote */}
        <div className="mt-6 sm:mt-8 text-center">
          <p className="text-[10px] sm:text-[11px] font-sans text-muted/70">
            * Sample verified feedback structure. Google Business Place ID connection pending client authorization.
          </p>
        </div>

      </div>
    </section>
  );
}
