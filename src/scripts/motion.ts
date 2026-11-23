import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

export function initMotion() {
  if (typeof window === 'undefined') return;

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) return;

  // Prevent duplicate Lenis instances on re-initialization
  if (window.__lenis) {
    window.__lenis.destroy();
  }

  // Initialize Ultra-Smooth Lenis Momentum Scrolling
  const lenis = new Lenis({
    lerp: 0.08, // Silky luxury linear interpolation for buttery momentum
    duration: 1.3,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 1.0,
    touchMultiplier: 1.5,
    autoResize: true,
  });

  window.__lenis = lenis;

  // Seamless GSAP ScrollTrigger Synchronization
  lenis.on('scroll', ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);

  // Smooth scroll for in-page anchor links (e.g. #services, #contact)
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

  // Refresh ScrollTrigger calculations after all fonts and layout settle
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

  if (heroReveal) {
    gsap.from(heroReveal.children, {
      opacity: 0,
      y: 35,
      stagger: 0.1,
      duration: 1.1,
      ease: 'power3.out',
      delay: 0.15
    });
  }

  // 2. Google Reviews Card Reveal Animation
  // Skip mutating if inside an astro-island (React client component) to prevent hydration mismatches
  const reviewsSection = document.querySelector('#reviews');
  if (reviewsSection && !reviewsSection.closest('astro-island')) {
    const reviewSummary = reviewsSection.querySelector('.rounded-3xl, .rounded-2xl');
    const reviewCards = reviewsSection.querySelectorAll('.rounded-3xl:not(:first-child), .rounded-2xl:not(:first-child), article, [class*="min-h-[220px]"]');

    if (reviewSummary) {
      gsap.from(reviewSummary, {
        scrollTrigger: {
          trigger: reviewsSection,
          start: 'top 85%',
          toggleActions: 'play none none none'
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
          toggleActions: 'play none none none'
        },
        opacity: 0,
        y: 45,
        stagger: 0.15,
        duration: 1.1,
        ease: 'power3.out'
      });
    }
  }

  // 3. Image Reveal Variety Animations (GSAP ScrollTrigger)
  // Skip images inside client-hydrated React components (astro-island) to prevent hydration mismatches
  const allImages = document.querySelectorAll('img:not(.hero-text-reveal img):not(#site-header img):not(#gallery-lightbox img)');

  allImages.forEach((img, index) => {
    if (img.closest('astro-island')) return;

    const parent = img.parentElement;
    if (!parent) return;

    const styleVariant = index % 3;

    if (styleVariant === 0) {
      // Style A: Smooth Curtain Clip-path reveal (Bottom to Top)
      gsap.fromTo(
        img,
        {
          clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)',
          scale: 1.08,
          opacity: 0.8
        },
        {
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
          scale: 1,
          opacity: 1,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: parent,
            start: 'top 88%',
            toggleActions: 'play none none none'
          }
        }
      );
    } else if (styleVariant === 1) {
      // Style B: Scale-In & Radiant Fade Reveal
      gsap.fromTo(
        img,
        {
          scale: 1.12,
          opacity: 0
        },
        {
          scale: 1,
          opacity: 1,
          duration: 1.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: parent,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      );
    } else {
      // Style C: Side Curtain Reveal (Left to Right)
      gsap.fromTo(
        img,
        {
          clipPath: 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)',
          scale: 1.06,
          opacity: 0.85
        },
        {
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
          scale: 1,
          opacity: 1,
          duration: 1.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: parent,
            start: 'top 86%',
            toggleActions: 'play none none none'
          }
        }
      );
    }
  });

  // 4. Section Titles Staggered Reveal
  // Skip sections inside client-hydrated React components (astro-island) to prevent hydration mismatches
  if (window.innerWidth >= 640) {
    gsap.utils.toArray<HTMLElement>('section:not(:first-of-type)').forEach((section) => {
      if (section.closest('astro-island')) return;

      const heading = section.querySelector('h2');
      const overline = section.querySelector('span[class*="tracking-"]');
      const desc = section.querySelector('p');

      if (heading) {
        gsap.from([overline, heading, desc].filter(Boolean), {
          opacity: 0,
          y: 30,
          stagger: 0.1,
          duration: 0.9,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 82%',
            toggleActions: 'play none none none'
          }
        });
      }
    });
  }
}
