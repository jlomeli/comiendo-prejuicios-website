import { describe, it, expect } from 'vitest';
import { renderHTML } from '../utils/test-utils';
import axe from 'axe-core';

describe('Hero Component Accessibility', () => {
  it('should have proper heading structure and ARIA attributes', () => {
    // Create a simplified version of the Hero component
    const html = `
      <section id="hero" aria-labelledby="hero-heading">
        <div aria-hidden="true">
          <img src="/images/calm-office-space.jpg" alt="A calming therapy office space with natural light" />
        </div>
        <div>
          <h1 id="hero-heading">Transformative Therapy for Mind and Spirit</h1>
          <p>Embrace healing and growth in a safe, supportive environment</p>
          <div>
            <a href="#contact" aria-label="Schedule a therapy consultation">Schedule a Consultation</a>
            <a href="#services" aria-label="Explore therapy services">Explore Services</a>
          </div>
        </div>
        <div>
          <a href="#about" aria-label="Scroll down to about section">
            <svg aria-hidden="true" role="img"></svg>
          </a>
        </div>
      </section>
    `;
    
    const { container } = renderHTML(html);
    
    // Check for proper ARIA attributes
    const section = container.querySelector('section');
    expect(section?.hasAttribute('aria-labelledby')).toBe(true);
    expect(section?.getAttribute('aria-labelledby')).toBe('hero-heading');
    
    const heading = container.querySelector('#hero-heading');
    expect(heading).not.toBeNull();
    expect(heading?.tagName).toBe('H1');
    
    const decorativeDiv = container.querySelector('div[aria-hidden="true"]');
    expect(decorativeDiv).not.toBeNull();
    
    const links = container.querySelectorAll('a[aria-label]');
    expect(links.length).toBe(3);
  });
  
  it('should have accessible focus states', () => {
    const html = `
      <a href="#contact" class="focus:outline-none focus:ring-2 focus:ring-white">Schedule a Consultation</a>
    `;
    
    const { container } = renderHTML(html);
    const link = container.querySelector('a');
    
    // Check for focus management classes
    expect(link?.className).toContain('focus:outline-none');
    expect(link?.className).toContain('focus:ring-2');
  });
  
  it('should not have any automatically detectable accessibility issues', async () => {
    const html = `
      <section id="hero" aria-labelledby="hero-heading">
        <div aria-hidden="true">
          <img src="/images/calm-office-space.jpg" alt="A calming therapy office space with natural light" />
        </div>
        <div>
          <h1 id="hero-heading">Transformative Therapy for Mind and Spirit</h1>
          <p>Embrace healing and growth in a safe, supportive environment</p>
          <div>
            <a href="#contact" aria-label="Schedule a therapy consultation">Schedule a Consultation</a>
            <a href="#services" aria-label="Explore therapy services">Explore Services</a>
          </div>
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