import { useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function buildTransitionTimeline(root, mobile = false) {
  const scene = root.querySelector('[data-discovery-transition]');
  const posters = gsap.utils.toArray('[data-transition-portal] > [data-poster]', root);
  const timeline = gsap.timeline({
    scrollTrigger: {
      trigger: scene,
      start: 'top top',
      end: 'bottom bottom',
      scrub: mobile ? 0.55 : 0.85,
      invalidateOnRefresh: true,
    },
  });

  timeline
    .to('[data-transition-copy]', { scale: mobile ? 0.92 : 0.88, opacity: 0.24, yPercent: -12, duration: 1 }, 0.55)
    .to('[data-transition-aside]', { opacity: 0, yPercent: 25, duration: 0.55 }, 0.45)
    .to('[data-transition-portal]', { scale: mobile ? 1.08 : 1.22, duration: 1.25 }, 0.55);

  posters.forEach((poster, index) => {
    const direction = index % 2 === 0 ? -1 : 1;
    timeline.to(poster, {
      xPercent: direction * (mobile ? 28 : 58),
      yPercent: index === 2 ? 48 : -10 + index * 7,
      z: index === 2 ? 180 : -70 + index * 18,
      scale: index === 2 ? 1.13 : 0.72,
      rotationZ: direction * (4 + index),
      filter: index === 2 ? 'blur(0px) brightness(0.9)' : 'blur(2px) brightness(0.5)',
      duration: 1.35,
      ease: 'power2.inOut',
    }, 0.62);
  });

  timeline
    .to('[data-transition-copy]', { opacity: 0.06, scale: 0.78, duration: 0.7 }, 1.45)
    .to('[data-transition-portal]', { yPercent: -6, scale: mobile ? 0.98 : 0.9, duration: 0.75 }, 1.45);
}

function buildDesktopGenres(root, enhancedClass) {
  root.classList.add(enhancedClass);
  const scene = root.querySelector('[data-genres-scene]');
  const track = root.querySelector('[data-genres-track]');
  const railItems = gsap.utils.toArray('[data-rail-item]', root);
  const setActive = (index) => railItems.forEach((item, itemIndex) => {
    item.dataset.active = String(itemIndex === index);
  });

  setActive(0);
  let timeline;
  try {
    timeline = gsap.timeline({
      scrollTrigger: {
        trigger: scene,
        start: 'top top',
        end: '+=520%',
        scrub: 0.9,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: ({ progress }) => setActive(Math.min(4, Math.round(progress * 4))),
      },
    });
  } catch (error) {
    root.classList.remove(enhancedClass);
    throw error;
  }

  timeline
    .to(track, { xPercent: -80, duration: 4, ease: 'none' }, 0)
    .to('[data-genre-chapter] [data-genre-posters]', { xPercent: -10, duration: 4, ease: 'none' }, 0)
    .to('[data-selection-note]', { opacity: 0.25, yPercent: 20, duration: 0.3 }, 3.55)
    .to('[data-genre-index="4"] [data-poster]:not([data-feature-poster])', {
      opacity: 0.16, scale: 0.72, filter: 'blur(3px) brightness(0.45)', duration: 0.55,
    }, 3.58)
    .to('[data-feature-poster]', {
      xPercent: -34, yPercent: -4, scale: 1.62, rotationZ: 0,
      filter: 'brightness(0.9)', duration: 0.55, ease: 'power2.inOut',
    }, 3.58)
    .to('[data-genre-index="4"] [data-giant-genre]', { opacity: 0.2, duration: 0.4 }, 3.6);

  return () => {
    root.classList.remove(enhancedClass);
    railItems.forEach((item) => delete item.dataset.active);
  };
}

export function useDiscoveryScroll(discoveryRef, enhancedClass) {
  useLayoutEffect(() => {
    const root = discoveryRef.current;
    if (!root) return undefined;

    const context = gsap.context(() => {
      const media = gsap.matchMedia();
      media.add('(prefers-reduced-motion: no-preference) and (min-width: 769px)', () => {
        buildTransitionTimeline(root, false);
        return buildDesktopGenres(root, enhancedClass);
      });
      media.add('(prefers-reduced-motion: no-preference) and (max-width: 768px)', () => {
        buildTransitionTimeline(root, true);
      });
      return () => media.revert();
    }, root);

    return () => context.revert();
  }, [discoveryRef, enhancedClass]);
}
