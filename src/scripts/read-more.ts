// Initialize GSAP
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Handle expandable quotes
function initExpandableQuotes(): void {
  const quotes = document.querySelectorAll<HTMLElement>('.testimonial-quote');
  const lineHeight = parseFloat(getComputedStyle(document.documentElement).fontSize) * 1.5; // Base line height
  const maxLines = 3;
  const maxHeight = lineHeight * maxLines;

  quotes.forEach(quote => {
    const content = quote.querySelector<HTMLElement>('.quote-content');
    const button = quote.querySelector<HTMLButtonElement>('.expand-button');
    
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
        button.setAttribute('aria-expanded', (!isExpanded).toString());
        const buttonText = button.querySelector<HTMLElement>('.button-text');
        if (buttonText) {
          buttonText.textContent = isExpanded ? 'Read more' : 'Show less';
        }
      });
    } else {
      // Hide button if content is short
      button.style.display = 'none';
    }
  });
}

// Animate testimonials on scroll
function initTestimonialAnimations(): void {
  const testimonials = document.querySelectorAll<HTMLElement>('.testimonial-card');
  
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
function initParallaxEffects(): void {
  const backgrounds = document.querySelectorAll<HTMLElement>('.parallax-bg');
  
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

// Handle read more functionality
function initReadMore(): void {
  const readMoreButtons = document.querySelectorAll<HTMLElement>('[data-read-more]');

  readMoreButtons.forEach(button => {
    const contentId = button.getAttribute('data-read-more');
    if (!contentId) return;
    
    const content = document.getElementById(contentId);
    if (!content) return;

    const computedStyle = window.getComputedStyle(content);
    const lineHeight = parseInt(computedStyle.lineHeight);
    const maxLines = 3;
    const maxHeight = `${lineHeight * maxLines}px`;
    
    content.style.maxHeight = maxHeight;
    content.style.overflow = 'hidden';
    content.classList.add('transition-all', 'duration-300', 'ease-in-out');

    button.addEventListener('click', () => {
      if (content.style.maxHeight === maxHeight) {
        content.style.maxHeight = `${content.scrollHeight}px`;
        button.textContent = 'Read Less';
      } else {
        content.style.maxHeight = maxHeight;
        button.textContent = 'Read More';
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
  
  // Always initialize expandable quotes and read more as they're functional features
  initExpandableQuotes();
  initReadMore();
}); 