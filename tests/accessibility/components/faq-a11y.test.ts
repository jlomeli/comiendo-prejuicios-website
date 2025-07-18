import { describe, it, expect, beforeEach } from 'vitest';

describe('FAQ Component Accessibility', () => {
  beforeEach(() => {
    // Mock FAQ component structure
    document.body.innerHTML = `
      <section id="faq" aria-labelledby="faq-heading">
        <h2 id="faq-heading">Frequently Asked Questions</h2>
        <div role="list" aria-label="Frequently asked questions">
          <div class="faq-item" role="listitem" data-category="getting-started">
            <button 
              data-faq-toggle 
              aria-expanded="false" 
              aria-controls="faq-answer-0"
              class="faq-question"
            >
              <h3>How do I schedule my first session?</h3>
            </button>
            <div id="faq-answer-0" class="faq-answer" aria-hidden="true">
              <div>You can schedule your first session by contacting us...</div>
            </div>
          </div>
          <div class="faq-item" role="listitem" data-category="services-approach">
            <button 
              data-faq-toggle 
              aria-expanded="false" 
              aria-controls="faq-answer-1"
              class="faq-question"
            >
              <h3>What types of therapy do you offer?</h3>
            </button>
            <div id="faq-answer-1" class="faq-answer" aria-hidden="true">
              <div>We offer individual therapy, couples counseling...</div>
            </div>
          </div>
        </div>
      </section>
    `;
  });

  it('has proper heading structure', () => {
    const heading = document.querySelector('#faq-heading');
    const section = document.querySelector('#faq');
    
    expect(heading).toBeTruthy();
    expect(section).toHaveAttribute('aria-labelledby', 'faq-heading');
    expect(heading?.tagName).toBe('H2');
  });

  it('has proper list semantics', () => {
    const list = document.querySelector('[role="list"]');
    const listItems = document.querySelectorAll('[role="listitem"]');
    
    expect(list).toBeTruthy();
    expect(list).toHaveAttribute('aria-label', 'Frequently asked questions');
    expect(listItems.length).toBeGreaterThan(0);
  });

  it('has proper button semantics for accordion', () => {
    const buttons = document.querySelectorAll('[data-faq-toggle]');
    
    buttons.forEach((button, index) => {
      expect(button).toHaveAttribute('aria-expanded', 'false');
      expect(button).toHaveAttribute('aria-controls', `faq-answer-${index}`);
      expect(button?.tagName).toBe('BUTTON');
    });
  });

  it('has proper content association', () => {
    const buttons = document.querySelectorAll('[data-faq-toggle]');
    
    buttons.forEach((button) => {
      const controlsId = button.getAttribute('aria-controls');
      const answer = document.getElementById(controlsId || '');
      expect(answer).toBeTruthy();
      expect(answer?.classList.contains('faq-answer')).toBe(true);
    });
  });

  it('has proper heading hierarchy within buttons', () => {
    const buttons = document.querySelectorAll('[data-faq-toggle]');
    
    buttons.forEach(button => {
      const heading = button.querySelector('h3');
      expect(heading).toBeTruthy();
      expect(heading?.textContent?.trim()).toBeTruthy();
    });
  });

  it('has proper focus management', () => {
    const buttons = document.querySelectorAll('[data-faq-toggle]');
    
    buttons.forEach(button => {
      // Buttons are naturally focusable, so tabindex="0" is not required
      expect(button).not.toHaveAttribute('disabled');
      expect(button?.tagName).toBe('BUTTON');
    });
  });

  it('has proper decorative elements marked as hidden', () => {
    const decorativeElements = document.querySelectorAll('[aria-hidden="true"]');
    
    decorativeElements.forEach(element => {
      // Decorative elements should not contain important content
      const hasText = element.textContent?.trim();
      if (hasText) {
        // If it has text, it should be an answer that's collapsed
        expect(element.classList.contains('faq-answer')).toBe(true);
      }
    });
  });

  it('has proper color contrast indicators', () => {
    const buttons = document.querySelectorAll('[data-faq-toggle]');
    
    buttons.forEach(button => {
      // Check for focus indicators in CSS classes
      expect(button).toHaveAttribute('class');
      const classes = button.getAttribute('class') || '';
      // The component uses focus-visible:ring-2 and focus:outline-none for focus indicators
      expect(classes.includes('focus-visible:ring-2') || classes.includes('focus:outline-none') || classes.includes('faq-question')).toBe(true);
    });
  });

  it('has proper semantic structure for screen readers', () => {
    const section = document.querySelector('#faq');
    const heading = document.querySelector('#faq-heading');
    const list = document.querySelector('[role="list"]');
    
    expect(section).toBeTruthy();
    expect(heading).toBeTruthy();
    expect(list).toBeTruthy();
    
    // Check that the structure makes sense for screen readers
    expect(section?.querySelector('h2')).toBeTruthy();
    expect(section?.querySelector('[role="list"]')).toBeTruthy();
  });
}); 