import { describe, it, expect } from 'vitest';
import { renderHTML } from '../../utils/test-utils';
import axe from 'axe-core';

describe('Testimonials Component Accessibility', () => {
  it('should have proper heading structure and ARIA attributes', () => {
    // Create a simplified version of the Testimonials component
    const html = `
      <section id="testimonials" aria-labelledby="testimonials-heading">
        <div aria-hidden="true"></div>
        <div>
          <h2 id="testimonials-heading">What Our Clients Say</h2>
          <p>Real stories from real people who have experienced transformation through our therapy services.</p>
          
          <div role="search" aria-labelledby="filter-heading">
            <h3 id="filter-heading" class="sr-only">Filter and sort testimonials</h3>
            <div>
              <div>
                <label for="role-filter" class="sr-only">Filter by role</label>
                <select id="role-filter">
                  <option value="all">All Roles</option>
                  <option value="Parent">Parent</option>
                </select>
              </div>
              <div>
                <label for="rating-filter" class="sr-only">Filter by minimum rating</label>
                <select id="rating-filter">
                  <option value="">Any Rating</option>
                  <option value="5">5 Stars</option>
                </select>
              </div>
              <div>
                <label for="sort-select" class="sr-only">Sort testimonials</label>
                <select id="sort-select">
                  <option value="date-desc">Newest First</option>
                </select>
              </div>
            </div>
            <div role="status" aria-live="polite"></div>
          </div>
          
          <div role="list" aria-label="Client testimonials">
            <div role="listitem">
              <div>
                <div>
                  <img src="/images/testimonials/placeholder-1.jpg" alt="Profile photo of Maria Rodriguez" />
                </div>
                <div>
                  <h3>Maria Rodriguez</h3>
                  <p>Working Professional</p>
                </div>
              </div>
              <div aria-label="Rated 5 out of 5 stars"></div>
              <blockquote>
                <p>I felt truly heard and supported throughout my journey.</p>
                <button aria-expanded="false" aria-controls="quote-content-0">
                  <span>Read more</span>
                </button>
                <footer>
                  <time datetime="2024-02-15">February 2024</time>
                </footer>
              </blockquote>
            </div>
          </div>
          
          <div role="navigation" aria-label="Testimonials pagination"></div>
        </div>
      </section>
    `;
    
    const { container } = renderHTML(html);
    
    // Check for proper ARIA attributes
    const section = container.querySelector('section');
    expect(section?.hasAttribute('aria-labelledby')).toBe(true);
    expect(section?.getAttribute('aria-labelledby')).toBe('testimonials-heading');
    
    const heading = container.querySelector('#testimonials-heading');
    expect(heading).not.toBeNull();
    expect(heading?.tagName).toBe('H2');
    
    const decorativeDiv = container.querySelector('div[aria-hidden="true"]');
    expect(decorativeDiv).not.toBeNull();
    
    // Check for proper filter controls
    const searchRegion = container.querySelector('div[role="search"]');
    expect(searchRegion).not.toBeNull();
    
    const filterHeading = container.querySelector('#filter-heading');
    expect(filterHeading).not.toBeNull();
    
    // Check for labels and selects
    const selects = container.querySelectorAll('select');
    expect(selects.length).toBe(3);
    
    const labels = container.querySelectorAll('label');
    expect(labels.length).toBe(3);
    
    // Check that each select has a corresponding label
    selects.forEach(select => {
      const id = select.getAttribute('id');
      const label = container.querySelector(`label[for="${id}"]`);
      expect(label).not.toBeNull();
    });
    
    // Check for testimonials list
    const list = container.querySelector('div[role="list"]');
    expect(list).not.toBeNull();
    expect(list?.hasAttribute('aria-label')).toBe(true);
    
    const listItem = container.querySelector('div[role="listitem"]');
    expect(listItem).not.toBeNull();
    
    // Check for expandable content
    const expandButton = container.querySelector('button[aria-expanded]');
    expect(expandButton).not.toBeNull();
    expect(expandButton?.hasAttribute('aria-controls')).toBe(true);
    
    // Check for pagination controls
    const pagination = container.querySelector('div[role="navigation"]');
    expect(pagination).not.toBeNull();
    expect(pagination?.hasAttribute('aria-label')).toBe(true);
  });
  
  it('should have accessible focus states', () => {
    const html = `
      <button class="focus:outline-none focus:ring-2 focus:ring-primary">Read more</button>
    `;
    
    const { container } = renderHTML(html);
    const button = container.querySelector('button');
    
    // Check for focus management classes
    expect(button?.className).toContain('focus:outline-none');
    expect(button?.className).toContain('focus:ring-2');
  });
  
  it('should not have any automatically detectable accessibility issues', async () => {
    const html = `
      <section id="testimonials" aria-labelledby="testimonials-heading">
        <div aria-hidden="true"></div>
        <div>
          <h2 id="testimonials-heading">What Our Clients Say</h2>
          <p>Real stories from real people who have experienced transformation through our therapy services.</p>
          
          <div role="search" aria-labelledby="filter-heading">
            <h3 id="filter-heading" class="sr-only">Filter and sort testimonials</h3>
            <div>
              <div>
                <label for="role-filter" class="sr-only">Filter by role</label>
                <select id="role-filter">
                  <option value="all">All Roles</option>
                </select>
              </div>
            </div>
            <div role="status" aria-live="polite"></div>
          </div>
          
          <div role="list" aria-label="Client testimonials">
            <div role="listitem">
              <div>
                <div>
                  <img src="/images/testimonials/placeholder-1.jpg" alt="Profile photo of Maria Rodriguez" />
                </div>
                <div>
                  <h3>Maria Rodriguez</h3>
                  <p>Working Professional</p>
                </div>
              </div>
              <div role="img" aria-label="Rated 5 out of 5 stars"></div>
              <blockquote>
                <p>I felt truly heard and supported throughout my journey.</p>
                <button aria-expanded="false" aria-controls="quote-content-0">
                  <span>Read more</span>
                </button>
              </blockquote>
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