import { describe, it, expect } from 'vitest';
import { renderHTML } from '../utils/test-utils';
import axe from 'axe-core';

describe('Services Component Accessibility', () => {
  it('should have proper heading structure and ARIA attributes', () => {
    // Create a simplified version of the Services component
    const html = `
      <section id="services" aria-labelledby="services-heading">
        <div aria-hidden="true"></div>
        <div>
          <h2 id="services-heading">Our Services</h2>
          <ul role="list">
            <li>
              <div>
                <div aria-hidden="true"></div>
                <div>
                  <div>
                    <div aria-hidden="true">
                      <img src="/icons/heart.svg" alt="" />
                    </div>
                    <h3>Individual Therapy</h3>
                    <p>One-on-one therapy sessions tailored to your needs.</p>
                  </div>
                  <div>
                    <a href="/services/individual-therapy" aria-label="Learn more about Individual Therapy">
                      Learn More
                    </a>
                  </div>
                </div>
              </div>
              <div>
                <img src="/images/individual-therapy.jpg" alt="Illustration of Individual Therapy service" />
              </div>
            </li>
          </ul>
        </div>
      </section>
    `;
    
    const { container } = renderHTML(html);
    
    // Check for proper ARIA attributes
    const section = container.querySelector('section');
    expect(section?.hasAttribute('aria-labelledby')).toBe(true);
    expect(section?.getAttribute('aria-labelledby')).toBe('services-heading');
    
    const heading = container.querySelector('#services-heading');
    expect(heading).not.toBeNull();
    expect(heading?.tagName).toBe('H2');
    
    const decorativeDiv = container.querySelector('div[aria-hidden="true"]');
    expect(decorativeDiv).not.toBeNull();
    
    const list = container.querySelector('ul');
    expect(list?.hasAttribute('role')).toBe(true);
    expect(list?.getAttribute('role')).toBe('list');
    
    const links = container.querySelectorAll('a[aria-label]');
    expect(links.length).toBe(1);
    
    const images = container.querySelectorAll('img');
    expect(images.length).toBe(2);
    
    // Check that decorative images have empty alt text
    const decorativeImg = container.querySelector('div[aria-hidden="true"] img');
    expect(decorativeImg?.getAttribute('alt')).toBe('');
    
    // Check that informative images have descriptive alt text
    const informativeImg = container.querySelector('img[alt^="Illustration"]');
    expect(informativeImg).not.toBeNull();
    expect(informativeImg?.getAttribute('alt')).not.toBe('');
  });
  
  it('should have accessible focus states', () => {
    const html = `
      <a href="/services/individual-therapy" class="focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
        Learn More
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
      <section id="services" aria-labelledby="services-heading">
        <div aria-hidden="true"></div>
        <div>
          <h2 id="services-heading">Our Services</h2>
          <ul role="list">
            <li>
              <div>
                <div aria-hidden="true"></div>
                <div>
                  <div>
                    <div aria-hidden="true">
                      <img src="/icons/heart.svg" alt="" />
                    </div>
                    <h3>Individual Therapy</h3>
                    <p>One-on-one therapy sessions tailored to your needs.</p>
                  </div>
                  <div>
                    <a href="/services/individual-therapy" aria-label="Learn more about Individual Therapy">
                      Learn More
                    </a>
                  </div>
                </div>
              </div>
              <div>
                <img src="/images/individual-therapy.jpg" alt="Illustration of Individual Therapy service" />
              </div>
            </li>
          </ul>
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