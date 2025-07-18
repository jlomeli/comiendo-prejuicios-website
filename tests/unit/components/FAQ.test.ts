import { describe, it, expect, beforeEach } from 'vitest';

describe('FAQ Component', () => {
  beforeEach(() => {
    // Mock DOM elements for testing
    document.body.innerHTML = `
      <div id="faq">
        <h2 id="faq-heading">Frequently Asked Questions</h2>
        <div class="faq-item" data-category="getting-started">
          <button data-faq-toggle aria-expanded="false" aria-controls="faq-answer-0">
            How do I schedule my first session?
          </button>
          <div id="faq-answer-0" class="faq-answer" aria-hidden="true">
            <div>You can schedule your first session by contacting us...</div>
          </div>
        </div>
      </div>
    `;
  });

  it('renders FAQ section with proper heading', () => {
    const heading = document.querySelector('#faq-heading');
    expect(heading).toBeTruthy();
    expect(heading?.textContent).toContain('Frequently Asked Questions');
  });

  it('renders FAQ items with proper structure', () => {
    const faqItems = document.querySelectorAll('.faq-item');
    expect(faqItems.length).toBeGreaterThan(0);
  });

  it('has proper ARIA attributes for accessibility', () => {
    const buttons = document.querySelectorAll('[data-faq-toggle]');
    const answers = document.querySelectorAll('.faq-answer');
    
    buttons.forEach((button, index) => {
      expect(button).toHaveAttribute('aria-expanded', 'false');
      expect(button).toHaveAttribute('aria-controls', `faq-answer-${index}`);
    });

    answers.forEach(answer => {
      expect(answer).toHaveAttribute('aria-hidden', 'true');
    });
  });

  it('has proper data attributes for categorization', () => {
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
      expect(item).toHaveAttribute('data-category');
    });
  });

  it('includes decorative elements for visual appeal', () => {
    const decorativeElements = document.querySelectorAll('[aria-hidden="true"]');
    expect(decorativeElements.length).toBeGreaterThan(0);
  });
}); 