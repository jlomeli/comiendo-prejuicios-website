/**
 * FAQ Accordion functionality
 * Handles expand/collapse, keyboard navigation, and accessibility
 */

interface FAQState {
  isExpanded: boolean;
  answerElement: HTMLElement;
  buttonElement: HTMLButtonElement;
  iconElement: SVGElement;
}

class FAQAccordion {
  private faqItems: Map<HTMLElement, FAQState> = new Map();
  private allowMultiple: boolean = false; // Set to true to allow multiple open items

  constructor() {
    this.init();
  }

  private init(): void {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.setupFAQ());
    } else {
      this.setupFAQ();
    }
  }

  private setupFAQ(): void {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach((item) => {
      const button = item.querySelector('[data-faq-toggle]') as HTMLButtonElement;
      const answer = item.querySelector('.faq-answer') as HTMLElement;
      const icon = item.querySelector('.faq-icon') as SVGElement;

      if (!button || !answer || !icon) {
        console.warn('FAQ item missing required elements:', item);
        return;
      }

      // Store state
      this.faqItems.set(item as HTMLElement, {
        isExpanded: false,
        answerElement: answer,
        buttonElement: button,
        iconElement: icon
      });

      // Add event listeners
      this.addEventListeners(item as HTMLElement, button);
    });

    // Add GSAP animations if available
    this.setupAnimations();
  }

  private addEventListeners(item: HTMLElement, button: HTMLButtonElement): void {
    // Click handler
    button.addEventListener('click', (e) => {
      e.preventDefault();
      this.toggleFAQ(item);
    });

    // Keyboard navigation
    button.addEventListener('keydown', (e) => {
      this.handleKeyboard(e, item);
    });

    // Focus management
    button.addEventListener('focus', () => {
      this.handleFocus(item);
    });
  }

  private toggleFAQ(item: HTMLElement): void {
    const state = this.faqItems.get(item);
    if (!state) return;

    if (state.isExpanded) {
      this.collapseFAQ(item);
    } else {
      this.expandFAQ(item);
    }
  }

  private expandFAQ(item: HTMLElement): void {
    const state = this.faqItems.get(item);
    if (!state) return;

    // Close other items if not allowing multiple
    if (!this.allowMultiple) {
      this.closeAllOtherItems(item);
    }

    // Update state
    state.isExpanded = true;
    item.setAttribute('data-expanded', 'true');

    // Update ARIA attributes
    state.buttonElement.setAttribute('aria-expanded', 'true');
    state.answerElement.setAttribute('aria-hidden', 'false');

    // Animate expansion
    this.animateExpansion(state.answerElement, state.iconElement, true);
  }

  private collapseFAQ(item: HTMLElement): void {
    const state = this.faqItems.get(item);
    if (!state) return;

    // Update state
    state.isExpanded = false;
    item.removeAttribute('data-expanded');

    // Update ARIA attributes
    state.buttonElement.setAttribute('aria-expanded', 'false');
    state.answerElement.setAttribute('aria-hidden', 'true');

    // Animate collapse
    this.animateExpansion(state.answerElement, state.iconElement, false);
  }

  private closeAllOtherItems(currentItem: HTMLElement): void {
    this.faqItems.forEach((state, item) => {
      if (item !== currentItem && state.isExpanded) {
        this.collapseFAQ(item);
      }
    });
  }

  private animateExpansion(answerElement: HTMLElement, iconElement: SVGElement, expand: boolean): void {
    if (expand) {
      // Expand
      const content = answerElement.querySelector('div');
      if (content) {
        const height = content.scrollHeight;
        answerElement.style.maxHeight = `${height}px`;
      }
      iconElement.style.transform = 'rotate(180deg)';
    } else {
      // Collapse
      answerElement.style.maxHeight = '0px';
      iconElement.style.transform = 'rotate(0deg)';
    }
  }

  private handleKeyboard(event: KeyboardEvent, item: HTMLElement): void {
    const items = Array.from(this.faqItems.keys());
    const currentIndex = items.indexOf(item);

    switch (event.key) {
      case 'Enter':
      case ' ':
        event.preventDefault();
        this.toggleFAQ(item);
        break;

      case 'ArrowDown': {
        event.preventDefault();
        const nextIndex = (currentIndex + 1) % items.length;
        const nextButton = (items[nextIndex] as HTMLElement).querySelector('[data-faq-toggle]') as HTMLButtonElement;
        nextButton?.focus();
        break;
      }

      case 'ArrowUp': {
        event.preventDefault();
        const prevIndex = currentIndex === 0 ? items.length - 1 : currentIndex - 1;
        const prevButton = (items[prevIndex] as HTMLElement).querySelector('[data-faq-toggle]') as HTMLButtonElement;
        prevButton?.focus();
        break;
      }

      case 'Home': {
        event.preventDefault();
        const firstButton = (items[0] as HTMLElement).querySelector('[data-faq-toggle]') as HTMLButtonElement;
        firstButton?.focus();
        break;
      }

      case 'End': {
        event.preventDefault();
        const lastButton = (items[items.length - 1] as HTMLElement).querySelector('[data-faq-toggle]') as HTMLButtonElement;
        lastButton?.focus();
        break;
      }

      case 'Escape':
        event.preventDefault();
        if (this.faqItems.get(item)?.isExpanded) {
          this.collapseFAQ(item);
        }
        break;
    }
  }

  private handleFocus(item: HTMLElement): void {
    // Add focus indicator
    item.classList.add('focus-within');
    
    // Remove focus indicator on blur
    const button = item.querySelector('[data-faq-toggle]') as HTMLButtonElement;
    button.addEventListener('blur', () => {
      item.classList.remove('focus-within');
    }, { once: true });
  }

  private setupAnimations(): void {
    // Check if GSAP is available
    if (typeof gsap !== 'undefined') {
      const faqItems = document.querySelectorAll('.faq-item');
      
      // Set initial state for GSAP animation
      faqItems.forEach(item => {
        item.classList.add('opacity-0', 'translate-y-8');
      });
      
      gsap.fromTo(faqItems, 
        {
          opacity: 0,
          y: 50
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: "#faq",
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );
    } else {
      // Fallback animation using Intersection Observer
      this.setupFallbackAnimations();
    }
  }

  private setupFallbackAnimations(): void {
    const faqItems = document.querySelectorAll('.faq-item');
    
    // Set initial state for fallback animation
    faqItems.forEach(item => {
      item.classList.add('opacity-0', 'translate-y-8');
    });
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.remove('opacity-0', 'translate-y-8');
            entry.target.classList.add('opacity-100', 'translate-y-0');
          }, index * 100);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    faqItems.forEach(item => {
      observer.observe(item);
    });
  }

  // Public methods for external control
  public expandAll(): void {
    this.faqItems.forEach((state, item) => {
      if (!state.isExpanded) {
        this.expandFAQ(item);
      }
    });
  }

  public collapseAll(): void {
    this.faqItems.forEach((state, item) => {
      if (state.isExpanded) {
        this.collapseFAQ(item);
      }
    });
  }

  public expandByCategory(category: string): void {
    this.faqItems.forEach((state, item) => {
      if (item.getAttribute('data-category') === category && !state.isExpanded) {
        this.expandFAQ(item);
      }
    });
  }
}

// Initialize FAQ accordion
new FAQAccordion();

// Export for potential external use
export default FAQAccordion; 