import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    document.querySelectorAll<HTMLElement>('[data-animation]').forEach(el => {
      el.style.opacity = '1';
    });
    return;
  }
  gsap.utils.toArray<HTMLElement>('[data-animation="fade-in"]').forEach(element => {
    gsap.fromTo(element, 
      { opacity: 0, y: 30 }, 
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: element,
          start: "top bottom-=100px",
          toggleActions: "play none none none"
        }
      }
    );
  });
});
