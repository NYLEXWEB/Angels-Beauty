import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

declare global {
  interface Window {
    __lenis?: Lenis;
    __lenisTicker?: (time: number) => void;
  }
}

export function initMotion() {
  if (typeof window === 'undefined') return;

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) return;

  // Prevent duplicate Lenis instances and kill old ScrollTriggers on re-initialization
  if (window.__lenis) {
    window.__lenis.destroy();
    ScrollTrigger.getAll().forEach(t => t.kill());
  }
  if (window.__lenisTicker) {
    gsap.ticker.remove(window.__lenisTicker);
  }

  // Initialize Ultra-Smooth Luxury Momentum Scrolling Engine (Lenis 1.3+)
  const lenis = new Lenis({
    lerp: 0.1,
    duration: 1.0,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 1.0,
    touchMultiplier: 1.0,
    syncTouch: false,
    autoResize: true,
  });

  window.__lenis = lenis;

  // Seamless GSAP ScrollTrigger Synchronization
  lenis.on('scroll', ScrollTrigger.update);

  const tickerCallback = (time: number) => {
    lenis.raf(time * 1000);
  };
  window.__lenisTicker = tickerCallback;
  gsap.ticker.add(tickerCallback);
  gsap.ticker.lagSmoothing(500, 33);

  // Debounced recalculation to prevent forced reflow layout thrashing
  let refreshTimer: ReturnType<typeof setTimeout> | null = null;
  const refreshScroll = () => {
    if (refreshTimer) clearTimeout(refreshTimer);
    refreshTimer = setTimeout(() => {
      lenis.resize();
      lenis.start();
      ScrollTrigger.refresh();
    }, 80);
  };

  window.addEventListener('angels:ready', refreshScroll, { once: true });
  window.addEventListener('load', refreshScroll, { once: true });
  window.addEventListener('resize', refreshScroll, { passive: true });

  // Smooth scroll for in-page anchor links
  document.querySelectorAll<HTMLAnchorElement>('a[href*="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (!href) return;
      const url = new URL(href, window.location.origin);
      if (url.pathname === window.location.pathname && url.hash && url.hash.length > 1) {
        const target = document.querySelector(url.hash);
        if (target) {
          e.preventDefault();
          lenis.scrollTo(target as HTMLElement, {
            offset: -75,
            duration: 1.3,
          });
        }
      }
    });
  });

  if (document.fonts) {
    document.fonts.ready.then(refreshScroll);
  }

  // 1. Hero Page-Load Cinematic Deblur & Stagger Sequence
  const heroReveal = document.querySelector('.hero-text-reveal');
  const playHeroReveal = () => {
    if (heroReveal) {
      gsap.fromTo(
        heroReveal.children,
        { opacity: 0, y: 26, filter: 'blur(6px)' },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          stagger: 0.12,
          duration: 1.05,
          ease: 'power3.out'
        }
      );
    }
  };

  const preloaderEl = document.getElementById('angels-preloader');
  const isSkipPreloader = document.documentElement.classList.contains('skip-preloader');
  if (preloaderEl && !isSkipPreloader) {
    window.addEventListener('angels:ready', playHeroReveal, { once: true });
  } else {
    playHeroReveal();
  }

  // 2. About Section: Line-by-Line Scroll-Tied Heading Reveal
  const aboutHeadings = document.querySelectorAll('.about-scroll-heading');
  aboutHeadings.forEach((heading) => {
    const lines = heading.querySelectorAll('.about-heading-line');
    if (lines.length > 0) {
      gsap.to(lines, {
        opacity: 1,
        color: '#221C18',
        stagger: 0.15,
        ease: 'none',
        scrollTrigger: {
          trigger: heading,
          start: 'top 85%',
          end: 'bottom 55%',
          scrub: 0.35,
        },
      });
    }
  });

  // 3. Packages Heading Reveal Animation (Smooth Word-by-Word Automatic Reveal)
  const bridalWords = document.querySelectorAll('.bridal-word');
  const packagesTrigger = document.querySelector('.packages-heading-reveal');

  if (bridalWords.length > 0 && packagesTrigger) {
    gsap.to(bridalWords, {
      opacity: 1,
      y: 0,
      color: '#1A1614',
      stagger: 0.1,
      duration: 0.75,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: packagesTrigger,
        start: 'top 85%',
        toggleActions: 'play none none none',
        once: true
      },
    });
  }

  // 4. Gallery Section: Multi-Directional Scroll Reveal (Left, Center-Up, Right)
  const galleryItems = document.querySelectorAll<HTMLElement>('.gallery-item');
  if (galleryItems.length > 0) {
    const isDesktop = window.innerWidth >= 768;

    galleryItems.forEach((item, index) => {
      let xOffset = 0;
      let yOffset = 0;

      if (isDesktop) {
        const col = index % 3;
        if (col === 0) {
          xOffset = -45;
        } else if (col === 1) {
          yOffset = 40;
        } else {
          xOffset = 45;
        }
      } else {
        const col = index % 2;
        if (col === 0) {
          xOffset = -30;
        } else {
          xOffset = 30;
        }
      }

      gsap.fromTo(
        item,
        {
          opacity: 0.2,
          x: xOffset,
          y: yOffset,
          scale: 0.95,
        },
        {
          opacity: 1,
          x: 0,
          y: 0,
          scale: 1,
          duration: 0.85,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 90%',
            toggleActions: 'play none none none',
            once: true,
          },
        }
      );
    });
  }

  // 5. Google Reviews Card Reveal Animation
  const reviewsSection = document.querySelector('#reviews');
  if (reviewsSection) {
    const reviewSummary = reviewsSection.querySelector('.rounded-3xl');
    if (reviewSummary) {
      gsap.fromTo(
        reviewSummary,
        { opacity: 0, y: 35, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.95,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: reviewsSection,
            start: 'top 85%',
            toggleActions: 'play none none none',
            once: true
          }
        }
      );
    }
  }

  // 6. Bridal Package Cards Staggered Reveal
  const bridalCards = document.querySelectorAll<HTMLElement>('.bridal-package-card');
  if (bridalCards.length > 0) {
    gsap.fromTo(
      bridalCards,
      { opacity: 0, y: 35, scale: 0.97 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        stagger: 0.12,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: bridalCards[0],
          start: 'top 88%',
          toggleActions: 'play none none none',
          once: true,
        },
      }
    );
  }

  // 7. Universal Section Headings Deblur & Rise Reveal (All Sections Across All 8 Pages)
  const allSectionHeadings = document.querySelectorAll<HTMLElement>(
    'section:not(:first-of-type) h2:not(.about-scroll-heading):not(.packages-heading-reveal)'
  );
  allSectionHeadings.forEach((heading) => {
    gsap.fromTo(
      heading,
      {
        opacity: 0,
        y: 28,
        filter: 'blur(5px)',
      },
      {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 0.95,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: heading,
          start: 'top 88%',
          toggleActions: 'play none none none',
          once: true,
        },
      }
    );
  });

  // 8. Universal Section Overline Badges Soft Float
  const allOverlinePills = document.querySelectorAll<HTMLElement>(
    'section:not(:first-of-type) div.inline-flex.rounded-full, section:not(:first-of-type) > div > div > span[class*="tracking-"]'
  );
  allOverlinePills.forEach((pill) => {
    if (pill.closest('.hero-text-reveal') || pill.closest('.mobile-stack-card')) return;
    gsap.fromTo(
      pill,
      { opacity: 0, y: 16, scale: 0.96 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.75,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: pill,
          start: 'top 90%',
          toggleActions: 'play none none none',
          once: true,
        },
      }
    );
  });
}
