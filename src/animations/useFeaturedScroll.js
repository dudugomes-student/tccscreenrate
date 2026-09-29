import { useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function buildDesktopTimeline(root, enhancedClass) {
  const frame = root.querySelector('[data-feature-frame]');
  const timeline = gsap.timeline({
    scrollTrigger: {
      trigger: root,
      start: 'top top',
      end: '+=620%',
      scrub: 0.9,
      pin: frame,
      anticipatePin: 1,
      invalidateOnRefresh: true,
    },
  });

  timeline
    .addLabel('poster', 0)
    .to('[data-feature-visual]', { xPercent: -115, scale: 2.15, duration: 1.25, ease: 'power2.inOut' }, 0.15)
    .to('[data-film-wash]', { scale: 1.08, filter: 'saturate(1.18)', duration: 1.2 }, 0.15)
    .to('[data-film-copy]', { autoAlpha: 1, pointerEvents: 'auto', duration: 0.65 }, 0.72)
    .to('[data-editorial-score]', { opacity: 1, yPercent: -8, duration: 0.55 }, 1.05)
    .addLabel('film', 1.35)
    .to('[data-film-copy]', { yPercent: -3, duration: 0.75 }, 1.35)
    .to('[data-feature-visual]', { xPercent: -108, yPercent: -4, scale: 2.25, duration: 0.75 }, 1.35)
    .addLabel('rating', 2.4)
    .to('[data-film-copy]', { autoAlpha: 0, yPercent: -16, pointerEvents: 'none', duration: 0.6 }, 2.35)
    .to('[data-editorial-score]', { opacity: 0, yPercent: -24, duration: 0.45 }, 2.35)
    .to('[data-feature-visual]', { xPercent: 120, yPercent: 8, scale: 1.35, duration: 0.85, ease: 'power2.inOut' }, 2.35)
    .to('[data-rating-layer]', { autoAlpha: 1, pointerEvents: 'auto', duration: 0.65 }, 2.65)
    .to('[data-rating-statement]', { xPercent: -2, duration: 0.9 }, 2.8)
    .addLabel('collection', 4.15)
    .to('[data-rating-layer]', { autoAlpha: 0, pointerEvents: 'none', duration: 0.6 }, 4.2)
    .to('[data-feature-visual]', { xPercent: -125, yPercent: 42, scale: 0.74, duration: 0.85, ease: 'power2.inOut' }, 4.25)
    .to('[data-collection-layer]', { autoAlpha: 1, pointerEvents: 'auto', duration: 0.7 }, 4.45)
    .to('[data-film-wash]', { filter: 'saturate(.7)', scale: 1, duration: 0.8 }, 4.35);

  root.classList.add(enhancedClass);
  return () => root.classList.remove(enhancedClass);
}

function buildMobileTimeline(root) {
  const visual = root.querySelector('[data-feature-visual]');
  gsap.to(visual, {
    scale: 1.08,
    yPercent: 5,
    ease: 'none',
    scrollTrigger: {
      trigger: visual,
      start: 'top 85%',
      end: 'bottom 15%',
      scrub: 0.45,
    },
  });
}

export function useFeaturedScroll(experienceRef, enhancedClass) {
  useLayoutEffect(() => {
    const root = experienceRef.current;
    if (!root) return undefined;
    const context = gsap.context(() => {
      const media = gsap.matchMedia();
      media.add('(prefers-reduced-motion: no-preference) and (min-width: 769px)', () => buildDesktopTimeline(root, enhancedClass));
      media.add('(prefers-reduced-motion: no-preference) and (max-width: 768px)', () => buildMobileTimeline(root));
      return () => media.revert();
    }, root);
    return () => context.revert();
  }, [experienceRef, enhancedClass]);
}
