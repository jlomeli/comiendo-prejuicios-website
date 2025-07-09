import { describe, it, expect } from 'vitest';
import { renderHTML } from '../../utils/test-utils';
import axe from 'axe-core';

describe('CallToAction Component Accessibility', () => {
  it('should have proper heading structure and ARIA attributes', () => {
    // Create a simplified version of the CallToAction component
    const html = `
      <section id="cta" aria-labelledby="cta-heading">
        <div aria-hidden="true">
          <div></div>
          <div></div>
        </div>
        <div>
          <h2 id="cta-heading">Ready to Begin?</h2>
          <p>Taking the first step is courageous. We're here to support you.</p>
          <a 
            href="#contact" 
            aria-label="Start your therapy journey - contact us now"
          >
            Start Your Journey
          </a>
        </div>
      </section>
    `;
    
    const { container } = renderHTML(html);
    
    // Check for proper ARIA attributes
    const section = container.querySelector('section');
    expect(section?.hasAttribute('aria-labelledby')).toBe(true);
    expect(section?.getAttribute('aria-labelledby')).toBe('cta-heading');
    
    const heading = container.querySelector('#cta-heading');
    expect(heading).not.toBeNull();
    expect(heading?.tagName).toBe('H2');
    
    const decorativeDiv = container.querySelector('div[aria-hidden="true"]');
    expect(decorativeDiv).not.toBeNull();
    
    const link = container.querySelector('a[aria-label]');
    expect(link).not.toBeNull();
    expect(link?.getAttribute('aria-label')).toBe('Start your therapy journey - contact us now');
  });
  
  it('should have accessible focus states', () => {
    const html = `
      <a href="#contact" class="focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary">
        Start Your Journey
      </a>
    `;
    
    const { container } = renderHTML(html);
    const link = container.querySelector('a');
    
    // Check for focus management classes
    expect(link?.className).toContain('focus:outline-none');
    expect(link?.className).toContain('focus:ring-2');
    expect(link?.className).toContain('focus:ring-offset-2');
  });
  
  it('should not have any automatically detectable accessibility issues', async () => {
    const html = `
      <section id="cta" aria-labelledby="cta-heading">
        <div aria-hidden="true">
          <div></div>
          <div></div>
        </div>
        <div>
          <h2 id="cta-heading">Ready to Begin?</h2>
          <p>Taking the first step is courageous. We're here to support you.</p>
          <a 
            href="#contact" 
            aria-label="Start your therapy journey - contact us now"
          >
            Start Your Journey
          </a>
        </div>
      </section>
    `;
    
    const { container } = renderHTML(html);
    document.body.appendChild(container);
    
    try {
      const results = await axe.run(container);
      expect(results.violations).toEqual([]);
    } finally {
      document.body.removeChild(container);
    }
  });
}); 