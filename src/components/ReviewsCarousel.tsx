import React, { useState } from 'react';
import { SAMPLE_REVIEWS, GOOGLE_RATING_SUMMARY } from '../config/reviews';
import { Star, ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react';

const AVATAR_COLORS = [
  'bg-blue-600',
  'bg-emerald-600',
  'bg-purple-600',
  'bg-amber-600',
  'bg-teal-600'
];

export default function ReviewsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevReview = () => {
    setCurrentIndex((prev) => (prev === 0 ? SAMPLE_REVIEWS.length - 1 : prev - 1));
  };

  const nextReview = () => {
    setCurrentIndex((prev) => (prev === SAMPLE_REVIEWS.length - 1 ? 0 : prev + 1));
  };

  return (
    <section id="reviews" suppressHydrationWarning className="py-14 sm:py-18 bg-canvas overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Minimalist Google Header Summary Card */}
        <div suppressHydrationWarning className="p-6 sm:p-8 rounded-3xl bg-white border border-black/[0.06] shadow-sm mb-8 sm:mb-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">

            {/* Google Brand Rating Left */}
            <div className="flex items-center gap-4 sm:gap-5">
              {/* Google 4-Color G Emblem */}
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-surface border border-black/[0.05] flex items-center justify-center shrink-0 shadow-2xs">
                <svg className="w-7 h-7 sm:w-8 sm:h-8" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z" />
                  <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.36 24 12 24z" />
                  <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.14-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z" />
                  <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.36 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z" />
                </svg>
              </div>

              <div>
                <div className="flex items-center gap-2.5">
                  <span className="font-display text-3xl sm:text-4xl font-bold text-charcoal tracking-tight">
                    {GOOGLE_RATING_SUMMARY.averageRating}
                  </span>
                  <div className="flex text-[#FBBC05] gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 fill-[#FBBC05] text-[#FBBC05]" />
                    ))}
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-muted font-sans mt-0.5">
                  Based on <span className="font-semibold text-charcoal">{GOOGLE_RATING_SUMMARY.totalReviews}+ Verified Google Reviews</span> · Mananthavady
                </p>
              </div>
            </div>

            {/* Google Action + Navigation Controls */}
            <div className="flex flex-wrap items-center justify-between md:justify-end gap-3 pt-3 md:pt-0 border-t md:border-t-0 border-black/[0.06]">
              <a
                href={GOOGLE_RATING_SUMMARY.writeReviewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold text-charcoal bg-white hover:bg-neutral-50 border border-black/[0.1] hover:border-gold-deep/60 transition-all shadow-2xs hover:shadow-xs active:scale-97 group cursor-pointer"
                aria-label="Write a Review for Angels Beauty Parlour on Google"
              >
                <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z" />
                  <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.36 24 12 24z" />
                  <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.14-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z" />
                  <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.36 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z" />
                </svg>
                <span>Write a Review</span>
                <span className="text-[#FBBC05] text-xs">★</span>
              </a>

              {/* Slider Arrows */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={prevReview}
                  className="w-10 h-10 rounded-full border border-black/[0.08] bg-white hover:bg-surface text-charcoal flex items-center justify-center transition-all shadow-2xs hover:shadow-xs active:scale-95 cursor-pointer"
                  aria-label="Previous review"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={nextReview}
                  className="w-10 h-10 rounded-full border border-black/[0.08] bg-white hover:bg-surface text-charcoal flex items-center justify-center transition-all shadow-2xs hover:shadow-xs active:scale-95 cursor-pointer"
                  aria-label="Next review"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* Minimalist Google Review Cards Grid (Desktop: 3 Visible, Mobile: Single card slider) */}
        <div className="hidden md:grid md:grid-cols-3 gap-6">
          {[0, 1, 2].map((offset) => {
            const index = (currentIndex + offset) % SAMPLE_REVIEWS.length;
            const review = SAMPLE_REVIEWS[index];
            const avatarColor = AVATAR_COLORS[index % AVATAR_COLORS.length];

            return (
              <div
                key={`${review.id}-${offset}`}
                suppressHydrationWarning
                className="rounded-3xl bg-white border border-black/[0.06] hover:border-black/[0.12] p-6 sm:p-7 flex flex-col justify-between shadow-2xs hover:shadow-md transition-all duration-300 group"
              >
                <div className="space-y-4">

                  {/* Top: Reviewer Info + Small Google G */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full ${avatarColor} text-white font-sans font-bold text-sm flex items-center justify-center shadow-xs`}>
                        {review.authorName.charAt(0)}
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-charcoal font-sans leading-tight">
                          {review.authorName}
                        </h4>
                        <div className="flex items-center gap-1.5 text-[11px] text-muted font-sans mt-0.5">
                          <span>{review.relativeTime}</span>
                          <span className="w-1 h-1 rounded-full bg-neutral-300"></span>
                          <span className="text-emerald-700 font-medium flex items-center gap-0.5">
                            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                            Verified
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Subtle Google G in corner */}
                    <div className="w-6 h-6 rounded-full bg-surface flex items-center justify-center shrink-0">
                      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z" />
                        <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.36 24 12 24z" />
                        <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.14-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z" />
                        <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.36 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z" />
                      </svg>
                    </div>
                  </div>

                  {/* Stars Row */}
                  <div className="flex text-[#FBBC05] gap-0.5">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#FBBC05] text-[#FBBC05]" />
                    ))}
                  </div>

                  {/* Review Quote Text */}
                  <p className="text-sm text-charcoal/85 font-sans leading-relaxed">
                    "{review.text}"
                  </p>

                </div>

                {/* Treatment Tag Pill */}
                <div className="pt-4 mt-4 border-t border-black/[0.05]">
                  <span className="text-[11px] font-sans font-medium text-gold-deep bg-gold-light/40 px-3 py-1 rounded-full inline-block">
                    {review.serviceMentioned}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile View: Single Clean Google Card */}
        <div className="block md:hidden">
          {(() => {
            const review = SAMPLE_REVIEWS[currentIndex];
            const avatarColor = AVATAR_COLORS[currentIndex % AVATAR_COLORS.length];

            return (
              <div suppressHydrationWarning className="rounded-3xl bg-white border border-black/[0.08] p-6 shadow-sm flex flex-col justify-between min-h-[240px]">
                <div className="space-y-3.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full ${avatarColor} text-white font-sans font-bold text-sm flex items-center justify-center shadow-xs`}>
                        {review.authorName.charAt(0)}
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-charcoal font-sans">
                          {review.authorName}
                        </h4>
                        <div className="flex items-center gap-1.5 text-[11px] text-muted font-sans mt-0.5">
                          <span>{review.relativeTime}</span>
                          <span className="w-1 h-1 rounded-full bg-neutral-300"></span>
                          <span className="text-emerald-700 font-medium flex items-center gap-0.5">
                            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                            Verified
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="w-6 h-6 rounded-full bg-surface flex items-center justify-center shrink-0">
                      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z" />
                        <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.36 24 12 24z" />
                        <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.14-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z" />
                        <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.36 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z" />
                      </svg>
                    </div>
                  </div>

                  <div className="flex text-[#FBBC05] gap-0.5">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#FBBC05] text-[#FBBC05]" />
                    ))}
                  </div>

                  <p className="text-sm text-charcoal/85 font-sans leading-relaxed italic">
                    "{review.text}"
                  </p>
                </div>

                <div className="pt-3.5 mt-4 border-t border-black/[0.05]">
                  <span className="text-[11px] font-sans font-medium text-gold-deep bg-gold-light/40 px-3 py-1 rounded-full inline-block">
                    {review.serviceMentioned}
                  </span>
                </div>
              </div>
            );
          })()}

          {/* Mobile Carousel Indicators */}
          <div className="flex items-center justify-center gap-1.5 pt-5 pb-4">
            {SAMPLE_REVIEWS.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setCurrentIndex(i)}
                className={`h-1.5 rounded-full transition-all ${currentIndex === i ? 'w-6 bg-charcoal' : 'w-1.5 bg-neutral-300'
                  }`}
                aria-label={`Go to review ${i + 1}`}
              />
            ))}
          </div>

          {/* Mobile Direct "Write a Review" Call to Action */}
          <div className="pt-2">
            <a
              href={GOOGLE_RATING_SUMMARY.writeReviewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2.5 py-3 px-5 rounded-full text-xs font-semibold tracking-wide text-charcoal bg-white border border-black/[0.1] shadow-2xs hover:shadow-xs active:scale-98 transition-all"
            >
              <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z" />
                <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.36 24 12 24z" />
                <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.14-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z" />
                <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.36 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z" />
              </svg>
              <span>Write a Review on Google (4.9 ★)</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
