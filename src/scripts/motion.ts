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

  // Auto-recalculate dimensions when preloader opens and after layout settles
  const refreshScroll = () => {
    lenis.resize();
    lenis.start();
    ScrollTrigger.refresh();
  };

  window.addEventListener('angels:ready', refreshScroll);
  window.addEventListener('load', refreshScroll);
  window.addEventListener('resize', () => {
    lenis.resize();
  });

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
    document.fonts.ready.then(() => {
      ScrollTrigger.refresh();
    });
  }
  window.addEventListener('load', () => {
    ScrollTrigger.refresh();
  });

  // 1. Hero page-load sequence
  const heroReveal = document.querySelector('.hero-text-reveal');
  const playHeroReveal = () => {
    if (heroReveal) {
      gsap.fromTo(
        heroReveal.children,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 1.0,
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
  // As the user scrolls, each line becomes crisp, dark and visible in direct sync with scroll
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
      duration: 0.7,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: packagesTrigger,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    });
  }

  // 4. Gallery Section: Multi-Directional Scroll Reveal
  // Images enter gracefully from left, bottom, and right sides as the user scrolls
  const galleryItems = document.querySelectorAll<HTMLElement>('.gallery-item');
  if (galleryItems.length > 0) {
    const isDesktop = window.innerWidth >= 768;

    galleryItems.forEach((item, index) => {
      let xOffset = 0;
      let yOffset = 0;

      if (isDesktop) {
        const col = index % 3;
        if (col === 0) {
          xOffset = -55; // Left column slides in from left
        } else if (col === 1) {
          yOffset = 50;  // Center column rises from bottom
        } else {
          xOffset = 55;  // Right column slides in from right
        }
      } else {
        const col = index % 2;
        if (col === 0) {
          xOffset = -40; // Left on mobile
        } else {
          xOffset = 40;  // Right on mobile
        }
      }

      gsap.fromTo(
        item,
        {
          opacity: 0.2,
          x: xOffset,
          y: yOffset,
          scale: 0.94,
        },
        {
          opacity: 1,
          x: 0,
          y: 0,
          scale: 1,
          duration: 0.9,
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
  if (reviewsSection && !reviewsSection.closest('astro-island')) {
    const reviewSummary = reviewsSection.querySelector('.rounded-3xl, .rounded-2xl');
    const reviewCards = reviewsSection.querySelectorAll('.rounded-3xl:not(:first-child), .rounded-2xl:not(:first-child), article, [class*="min-h-[220px]"]');

    if (reviewSummary) {
      gsap.from(reviewSummary, {
        scrollTrigger: {
          trigger: reviewsSection,
          start: 'top 85%',
          toggleActions: 'play none none none',
          once: true
        },
        opacity: 0,
        y: 40,
        scale: 0.97,
        duration: 1.0,
        ease: 'power3.out'
      });
    }

    if (reviewCards.length > 0) {
      gsap.from(reviewCards, {
        scrollTrigger: {
          trigger: reviewCards[0],
          start: 'top 88%',
          toggleActions: 'play none none none',
          once: true
        },
        opacity: 0,
        y: 45,
        stagger: 0.15,
        duration: 1.1,
        ease: 'power3.out'
      });
    }
  }

  // 6. Section Titles Staggered Reveal
  if (window.innerWidth >= 640) {
    gsap.utils.toArray<HTMLElement>('section:not(:first-of-type)').forEach((section) => {
      if (
        section.closest('astro-island') ||
        section.querySelector('.packages-heading-reveal') ||
        section.querySelector('.about-scroll-heading')
      ) return;

      const overline = section.querySelector('span[class*="tracking-"]');
      const desc = section.querySelector('p');

      if (overline || desc) {
        gsap.from([overline, desc].filter(Boolean), {
          opacity: 0,
          y: 20,
          stagger: 0.1,
          duration: 0.9,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 82%',
            toggleActions: 'play none none none',
            once: true
          }
        });
      }
    });
  }
}
