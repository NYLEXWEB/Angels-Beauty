import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initMotion() {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) return;

  // Initialize Lenis Smooth Scroll
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    touchMultiplier: 1.4,
  });

  lenis.on('scroll', ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);

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
  const reviewsSection = document.querySelector('#reviews');
  if (reviewsSection) {
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
  const allImages = document.querySelectorAll('img:not(.hero-text-reveal img):not(#site-header img):not(#gallery-lightbox img)');
  
  allImages.forEach((img, index) => {
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
  if (window.innerWidth >= 640) {
    gsap.utils.toArray<HTMLElement>('section:not(:first-of-type)').forEach((section) => {
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
