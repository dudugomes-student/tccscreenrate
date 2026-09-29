import { useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const posterTargets = {
  farLeft: { xPercent: -65, yPercent: 24, z: -260, scale: 0.68, rotationZ: -13, filter: 'blur(5px) brightness(0.48)' },
  left: { xPercent: -28, yPercent: -28, z: -150, scale: 0.75, rotationZ: 9, filter: 'blur(2.8px) brightness(0.58)' },
  nearLeft: { xPercent: -18, yPercent: 18, z: 90, scale: 1.03, rotationZ: -5, filter: 'blur(0px) brightness(0.92)' },
  center: { xPercent: 0, yPercent: -14, z: 190, scale: 1.13, rotationZ: 0, filter: 'blur(0px) brightness(0.96)' },
  nearRight: { xPercent: 18, yPercent: 20, z: 85, scale: 1.01, rotationZ: 5, filter: 'blur(0px) brightness(0.9)' },
  right: { xPercent: 32, yPercent: -26, z: -155, scale: 0.75, rotationZ: -9, filter: 'blur(2.8px) brightness(0.56)' },
  farRight: { xPercent: 66, yPercent: 22, z: -270, scale: 0.66, rotationZ: 13, filter: 'blur(5px) brightness(0.46)' },
};

const convergenceTargets = {
  farLeft: { xPercent: 120, yPercent: 6, z: -110, scale: 0.76, rotationZ: -5, filter: 'blur(2px) brightness(0.62)' },
  left: { xPercent: 70, yPercent: -12, z: -40, scale: 0.82, rotationZ: 3, filter: 'blur(1px) brightness(0.7)' },
  nearLeft: { xPercent: 34, yPercent: 10, z: 45, scale: 0.91, rotationZ: -2, filter: 'blur(0px) brightness(0.8)' },
  center: { xPercent: 0, yPercent: 5, z: 115, scale: 1.02, rotationZ: 0, filter: 'blur(0px) brightness(0.84)' },
  nearRight: { xPercent: -32, yPercent: 10, z: 40, scale: 0.9, rotationZ: 2, filter: 'blur(0px) brightness(0.78)' },
  right: { xPercent: -70, yPercent: -12, z: -45, scale: 0.82, rotationZ: -3, filter: 'blur(1px) brightness(0.68)' },
  farRight: { xPercent: -120, yPercent: 6, z: -115, scale: 0.74, rotationZ: 5, filter: 'blur(2px) brightness(0.6)' },
};

function addPosterState(timeline, targets, position, duration) {
  Object.entries(targets).forEach(([slot, values]) => {
    timeline.to(`[data-slot="${slot}"]`, { ...values, duration, ease: 'power2.inOut' }, position);
  });
}

function createDesktopTimeline(root) {
  const timeline = gsap.timeline({
    defaults: { ease: 'none' },
    scrollTrigger: {
      trigger: root,
      start: 'top top',
      end: '+=220%',
      scrub: 0.85,
      pin: true,
      anticipatePin: 1,
      invalidateOnRefresh: true,
    },
  });

  timeline
    .addLabel('completeHero', 0)
    .addLabel('headlineRecedes', 1)
    .to('[data-hero-copy]', { scale: 0.94, yPercent: -9, opacity: 0.38, duration: 0.9 }, 0.75)
    .to('[data-scroll-cue]', { opacity: 0, yPercent: 45, duration: 0.45 }, 0.55)
    .to('[data-scene-meta]', { opacity: 0.2, duration: 0.75 }, 0.75)
    .addLabel('depthExpands', 2);

  addPosterState(timeline, posterTargets, 1.6, 1.25);

  timeline
    .to('[data-poster-stage]', { scale: 1.04, duration: 1.15 }, 1.75)
    .addLabel('convergence', 3);

  addPosterState(timeline, convergenceTargets, 2.9, 1.05);

  timeline
    .to('[data-hero-copy]', { opacity: 0.08, scale: 0.86, yPercent: -22, duration: 0.85 }, 3)
    .to('[data-poster-stage]', { yPercent: -8, scale: 0.93, duration: 0.95 }, 3)
    .addLabel('discoveryReady', 4);

  return timeline;
}

function createMobileTimeline(root) {
  const timeline = gsap.timeline({
    scrollTrigger: {
      trigger: root,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.65,
      invalidateOnRefresh: true,
    },
  });

  timeline
    .to('[data-hero-copy]', { opacity: 0.42, scale: 0.95, yPercent: -10, duration: 1 }, 0.4)
    .to('[data-scroll-cue]', { opacity: 0, duration: 0.4 }, 0.3)
    .to('[data-slot="left"]', { xPercent: -22, yPercent: -8, scale: 0.68, filter: 'blur(2px) brightness(0.5)', duration: 1.2 }, 0.9)
    .to('[data-slot="nearLeft"]', { xPercent: 28, yPercent: -4, scale: 0.9, rotationZ: -2, duration: 1.2 }, 0.9)
    .to('[data-slot="center"]', { yPercent: 18, scale: 1.03, filter: 'brightness(0.92)', duration: 1.2 }, 0.9)
    .to('[data-slot="nearRight"]', { xPercent: -28, yPercent: -3, scale: 0.89, rotationZ: 2, duration: 1.2 }, 0.9)
    .to('[data-slot="right"]', { xPercent: 22, yPercent: -8, scale: 0.68, filter: 'blur(2px) brightness(0.5)', duration: 1.2 }, 0.9)
    .to('[data-hero-copy]', { opacity: 0.12, yPercent: -20, duration: 0.8 }, 1.8)
    .to('[data-poster-stage]', { yPercent: -5, scale: 0.94, duration: 0.8 }, 1.8);

  return timeline;
}

export function useHeroScroll(sceneRef) {
  useLayoutEffect(() => {
    const root = sceneRef.current;
    if (!root) return undefined;

    const context = gsap.context(() => {
      const header = document.querySelector('[data-site-header]');
      const media = gsap.matchMedia();

      if (header) {
        ScrollTrigger.create({
          trigger: root,
          start: 'top -24',
          end: 'max',
          onToggle: ({ isActive }) => {
            header.dataset.scrolled = String(isActive);
          },
        });
      }

      media.add('(prefers-reduced-motion: no-preference) and (min-width: 769px)', () => {
        createDesktopTimeline(root);
      });

      media.add('(prefers-reduced-motion: no-preference) and (max-width: 768px)', () => {
        createMobileTimeline(root);
      });

      return () => media.revert();
    }, root);

    return () => context.revert();
  }, [sceneRef]);
}
