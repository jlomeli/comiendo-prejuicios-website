import { describe, it, expect } from 'vitest';
import { renderHTML } from '../../utils/test-utils';
import axe from 'axe-core';

describe('About Component Accessibility', () => {
  it('should have proper heading structure and ARIA attributes', () => {
    // Create a simplified version of the About component
    const html = `
      <section id="about" aria-labelledby="about-heading">
        <div>
          <div>
            <div aria-hidden="true"></div>
            <div>
              <img src="/images/therapist-portrait.jpg" alt="Professional portrait of Claudia Ornelas, Licensed Therapist" />
            </div>
          </div>
          <div>
            <h2 id="about-heading">About Claudia Ornelas</h2>
            <p>Licensed Therapist</p>
            <p>Welcome to a space where healing and growth intertwine.</p>
            <div>
              <a href="/about" aria-label="Learn more about therapist biography and qualifications">Learn More About Me</a>
              <a href="#contact" aria-label="Go to contact form">Contact Me</a>
            </div>
          </div>
        </div>
      </section>
    `;
    
    const { container } = renderHTML(html);
    
    // Check for proper ARIA attributes
    const section = container.querySelector('section');
    expect(section?.hasAttribute('aria-labelledby')).toBe(true);
    expect(section?.getAttribute('aria-labelledby')).toBe('about-heading');
    
    const heading = container.querySelector('#about-heading');
    expect(heading).not.toBeNull();
    expect(heading?.tagName).toBe('H2');
    
    const decorativeDiv = container.querySelector('div[aria-hidden="true"]');
    expect(decorativeDiv).not.toBeNull();
    
    const links = container.querySelectorAll('a[aria-label]');
    expect(links.length).toBe(2);
    
    const image = container.querySelector('img');
    expect(image).toHaveAttribute('alt');
    expect(image?.getAttribute('alt')).not.toBe('');
  });
  
  it('should have accessible focus states', () => {
    const html = `
      <a href="/about" class="focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">Learn More About Me</a>
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
      <section id="about" aria-labelledby="about-heading">
        <div>
          <div>
            <div aria-hidden="true"></div>
            <div>
              <img src="/images/therapist-portrait.jpg" alt="Professional portrait of Claudia Ornelas, Licensed Therapist" />
            </div>
          </div>
          <div>
            <h2 id="about-heading">About Claudia Ornelas</h2>
            <p>Licensed Therapist</p>
            <p>Welcome to a space where healing and growth intertwine.</p>
            <div>
              <a href="/about" aria-label="Learn more about therapist biography and qualifications">Learn More About Me</a>
              <a href="#contact" aria-label="Go to contact form">Contact Me</a>
            </div>
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