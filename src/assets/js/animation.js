import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

let mm = gsap.matchMedia();

mm.add('(min-width: 800px)', () => {
  // Desktop setup
  let tlDesktopLeft = gsap.timeline({
    scrollTrigger: {
      trigger: '.fact-container',
      start: 'top 2%',
      end: '+=10%',
    },
  });

  gsap.utils.toArray('.left-anim').forEach((elem, index) => {
    tlDesktopLeft.from(elem, {
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

  let tlDesktopRight = gsap.timeline({
    scrollTrigger: {
      trigger: '.fact-container2',
      scrub: 1,
      start: 'top bottom',
      end: '+=100%',
    },
  });

  gsap.utils.toArray('.right-anim').forEach((elem, index) => {
    tlDesktopRight.from(elem, {
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

  return () => {
    //Kill the timeline when the media query doesn't match
    tlDesktopLeft.kill();
    tlDesktopRight.kill();
  };
});

mm.add('(max-width: 799px)', () => {
  // Mobile setup
  let tlMobileLeft = gsap.timeline({
    scrollTrigger: {
      trigger: '.fact-container',
      scrub: 1,
      start: 'top 2%',
      end: '+=10%',
    },
  });

  gsap.utils.toArray('.left-anim').forEach((elem, index) => {
    tlMobileLeft.from(elem, {
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

  let tlMobileRight = gsap.timeline({
    scrollTrigger: {
      trigger: '.fact-container2',
      scrub: 1,
      start: 'top bottom',
      end: '+=100%',
    },
  });

  gsap.utils.toArray('.right-anim').forEach((elem, index) => {
    tlMobileRight.from(elem, {
      x: '0%',
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

  return () => {
    // Kill the timeline when the media query doesn't match
    tlMobileLeft.kill();
    tlMobileRight.kill();
  };
});
