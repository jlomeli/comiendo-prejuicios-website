// Initialize GSAP
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Handle expandable quotes
function initExpandableQuotes() {
  const quotes = document.querySelectorAll('.testimonial-quote');
  const lineHeight = parseFloat(getComputedStyle(document.documentElement).fontSize) * 1.5; // Base line height
  const maxLines = 3;
  const maxHeight = lineHeight * maxLines;

  quotes.forEach(quote => {
    const content = quote.querySelector('.quote-content');
    const button = quote.querySelector('.expand-button');
    
    if (!content || !button) return;

    // Only setup expansion if content is taller than max height
    if (content.scrollHeight > maxHeight) {
      quote.classList.add('expandable');
      
      // Set initial state
      gsap.set(content, {
        height: maxHeight,
        overflow: 'hidden'
      });

      // Toggle expansion
      button.addEventListener('click', () => {
        const isExpanded = quote.classList.contains('expanded');
        
        // Animate the height
        gsap.to(content, {
          height: isExpanded ? maxHeight : content.scrollHeight,
          duration: 0.4,
          ease: "power2.out"
        });

        // Update states
        quote.classList.toggle('expanded');
        button.setAttribute('aria-expanded', !isExpanded);
        button.querySelector('.button-text').textContent = isExpanded ? 'Read more' : 'Show less';
      });
    } else {
      // Hide button if content is short
      button.style.display = 'none';
    }
  });
}

// Animate testimonials on scroll
function initTestimonialAnimations() {
  const testimonials = document.querySelectorAll('.testimonial-card');
  
  testimonials.forEach((card, index) => {
    ScrollTrigger.create({
      trigger: card,
      start: "top bottom-=100",
      onEnter: () => {
        gsap.to(card, {
          opacity: 1,
          y: 0,
          rotation: 0,
          duration: 0.6,
          delay: index * 0.1,
          ease: "power2.out"
        });
      },
      once: true
    });
  });
}

// Initialize parallax effects
function initParallaxEffects() {
  const backgrounds = document.querySelectorAll('.parallax-bg');
  
  backgrounds.forEach(bg => {
    gsap.to(bg, {
      yPercent: -20,
      ease: "none",
      scrollTrigger: {
        trigger: bg.parentElement,
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    });
  });
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  // Check if user prefers reduced motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!prefersReducedMotion) {
    initTestimonialAnimations();
    initParallaxEffects();
  }
  
  // Always initialize expandable quotes as it's a functional feature
  initExpandableQuotes();

  const readMoreButtons = document.querySelectorAll('[data-read-more]');

  readMoreButtons.forEach(button => {
    const contentId = button.getAttribute('data-read-more');
    const content = document.getElementById(contentId);

    if (content) {
      // Get the computed line height to calculate max-height
      const lineHeight = parseInt(window.getComputedStyle(content).lineHeight);
      const maxLines = 3;
      content.style.maxHeight = `${lineHeight * maxLines}px`;
      content.style.overflow = 'hidden';
      content.classList.add('transition-all', 'duration-300', 'ease-in-out');

      button.addEventListener('click', () => {
        if (content.style.maxHeight === `${lineHeight * maxLines}px`) {
          content.style.maxHeight = `${content.scrollHeight}px`;
          button.textContent = 'Read Less';
        } else {
          content.style.maxHeight = `${lineHeight * maxLines}px`;
          button.textContent = 'Read More';
        }
      });
    }
  });
});
