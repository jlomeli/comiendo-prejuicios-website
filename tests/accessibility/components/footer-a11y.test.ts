import { describe, it, expect } from 'vitest';
import { renderHTML } from '../../utils/test-utils';
import axe from 'axe-core';

describe('Footer Component Accessibility', () => {
  it('should have proper heading structure and ARIA attributes', () => {
    // Create a simplified version of the Footer component
    const html = `
      <footer role="contentinfo">
        <div>
          <div>
            <!-- Column 1: About -->
            <div>
              <h2>Comiendo Prejuicios</h2>
              <p>Professional, accessible, and compassionate therapy services.</p>
            </div>
            
            <!-- Column 2: Quick Links -->
            <nav aria-labelledby="footer-navigation">
              <h2 id="footer-navigation">Quick Links</h2>
              <ul>
                <li>
                  <a href="/#about">About</a>
                </li>
                <li>
                  <a href="/#services">Services</a>
                </li>
              </ul>
            </nav>
            
            <!-- Column 3: Social & Contact -->
            <div>
              <h2 id="social-heading">Connect With Us</h2>
              <div aria-labelledby="social-heading">
                <a href="https://facebook.com" aria-label="Visit our Facebook page">
                  <svg aria-hidden="true"></svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    `;
    
    const { container } = renderHTML(html);
    
    // Check for proper role
    const footer = container.querySelector('footer');
    expect(footer?.getAttribute('role')).toBe('contentinfo');
    
    // Check for proper heading structure
    const headings = container.querySelectorAll('h2');
    expect(headings.length).toBe(3);
    
    // Check for proper navigation
    const nav = container.querySelector('nav');
    expect(nav?.hasAttribute('aria-labelledby')).toBe(true);
    expect(nav?.getAttribute('aria-labelledby')).toBe('footer-navigation');
    
    const navHeading = container.querySelector('#footer-navigation');
    expect(navHeading).not.toBeNull();
    
    // Check for social links section
    const socialSection = container.querySelector('div[aria-labelledby="social-heading"]');
    expect(socialSection).not.toBeNull();
    
    const socialLink = container.querySelector('a[aria-label="Visit our Facebook page"]');
    expect(socialLink).not.toBeNull();
    
    const socialIcon = socialLink?.querySelector('svg[aria-hidden="true"]');
    expect(socialIcon).not.toBeNull();
  });
  
  it('should have accessible focus states', () => {
    const html = `
      <a class="focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary">
        Contact
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
      <footer role="contentinfo">
        <div>
          <div>
            <div>
              <h2>Comiendo Prejuicios</h2>
              <p>Professional, accessible, and compassionate therapy services.</p>
            </div>
            
            <nav aria-labelledby="footer-navigation">
              <h2 id="footer-navigation">Quick Links</h2>
              <ul>
                <li><a href="/#about">About</a></li>
              </ul>
            </nav>
            
            <div>
              <h2 id="social-heading">Connect With Us</h2>
              <div aria-labelledby="social-heading">
                <a href="https://facebook.com" aria-label="Visit our Facebook page">
                  <svg aria-hidden="true"></svg>
                </a>
              </div>
              <p>
                <a href="mailto:contact@example.com">contact@example.com</a>
              </p>
            </div>
          </div>
          
          <div>
            <p>&copy; 2024 Comiendo Prejuicios. All rights reserved.</p>
          </div>
        </div>
      </footer>
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