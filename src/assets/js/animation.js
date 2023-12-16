import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Animation for the first row
let tl = gsap.timeline({
  scrollTrigger: {
    trigger: '.fact-container',
    scrub: 1,
    start: 'top 55%',
    end: '+=100%',
  },
});

// Staggered animation for elements on the left
gsap.utils.toArray('.left-anim').forEach((elem, index) => {
  tl.from(elem, {
    x: '-100%',
    opacity: 0,
    duration: 1,
    scrollTrigger: {
      trigger: elem,
      scrub: 1,
      start: 'top bottom+=100',
      end: '+=100%',
    },
    ease: 'power1.inOut',
    delay: index * 0.2,
  });
});

// Animation for the second row
let tl2 = gsap.timeline({
  scrollTrigger: {
    trigger: '.fact-container2',
    scrub: 1,
    start: 'top bottom',
    end: '+=100%',
  },
});

// Staggered animation for elements on the right
gsap.utils.toArray('.right-anim').forEach((elem, index) => {
  tl2.from(elem, {
    x: '100vw',
    opacity: 0,
    duration: 1,
    scrollTrigger: {
      trigger: elem,
      scrub: 1,
      start: 'top bottom+=100',
      end: '+=100%',
    },
    ease: 'power1.inOut',
    delay: index * 0.2,
  });
});
