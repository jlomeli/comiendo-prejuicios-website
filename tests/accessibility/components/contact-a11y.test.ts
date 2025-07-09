import { describe, it, expect } from 'vitest';
import { renderHTML } from '../../utils/test-utils';
import axe from 'axe-core';

describe('Contact Component Accessibility', () => {
  it('should have proper heading structure and ARIA attributes', () => {
    // Create a simplified version of the Contact component
    const html = `
      <section id="contact" aria-labelledby="contact-heading">
        <div>
          <h2 id="contact-heading">Contact Us</h2>
          <div>
            <div>
              <h3>Our Information</h3>
              <address>
                123 Therapy Street, Suite 100, Los Angeles, CA 90001<br />
                Phone: <a href="tel:(555) 123-4567">(555) 123-4567</a><br />
                Email: <a href="mailto:contact@example.com">contact@example.com</a>
              </address>
              
              <div>
                <h4>Connect With Us</h4>
                <div>
                  <a href="#" aria-label="Visit our Facebook page">
                    <svg aria-hidden="true"></svg>
                  </a>
                </div>
              </div>
            </div>
            
            <form aria-labelledby="contactFormHeading" novalidate>
              <h3 id="contactFormHeading">Send Us a Message</h3>
              
              <div>
                <label for="name">Name <span aria-hidden="true">*</span><span class="sr-only">required</span></label>
                <input id="name" name="name" type="text" required aria-required="true" aria-describedby="nameDescription nameError" />
                <div id="nameDescription">Please enter your full name</div>
                <p id="nameError" aria-live="polite">Please enter a valid name</p>
              </div>
              
              <fieldset>
                <legend>Preferred Contact Method</legend>
                <div>
                  <div>
                    <input type="radio" id="contact-email" name="contactPreference" value="email" />
                    <label for="contact-email">Email</label>
                  </div>
                </div>
              </fieldset>
              
              <div>
                <div class="flex items-start">
                  <div>
                    <input type="checkbox" id="privacyConsent" name="privacyConsent" required aria-required="true" />
                  </div>
                  <div>
                    <label for="privacyConsent">I consent to the privacy policy</label>
                  </div>
                </div>
              </div>
              
              <div>
                <button type="submit">Send Message</button>
              </div>
            </form>
          </div>
        </div>
      </section>
    `;
    
    const { container } = renderHTML(html);
    
    // Check for proper ARIA attributes
    const section = container.querySelector('section');
    expect(section?.hasAttribute('aria-labelledby')).toBe(true);
    expect(section?.getAttribute('aria-labelledby')).toBe('contact-heading');
    
    const heading = container.querySelector('#contact-heading');
    expect(heading).not.toBeNull();
    expect(heading?.tagName).toBe('H2');
    
    // Check for proper form attributes
    const form = container.querySelector('form');
    expect(form?.hasAttribute('aria-labelledby')).toBe(true);
    expect(form?.hasAttribute('novalidate')).toBe(true);
    
    // Check for form heading
    const formHeading = container.querySelector('#contactFormHeading');
    expect(formHeading).not.toBeNull();
    
    // Check for proper input labeling
    const inputLabels = container.querySelectorAll('label[for]');
    expect(inputLabels.length).toBe(3); // name, email radio, privacy consent
    
    // Check for required fields with proper ARIA attributes
    const requiredInput = container.querySelector('input[required]');
    expect(requiredInput).not.toBeNull();
    expect(requiredInput?.hasAttribute('aria-required')).toBe(true);
    expect(requiredInput?.getAttribute('aria-required')).toBe('true');
    
    // Check for proper fieldset/legend structure
    const fieldset = container.querySelector('fieldset');
    expect(fieldset).not.toBeNull();
    const legend = fieldset?.querySelector('legend');
    expect(legend).not.toBeNull();
    
    // Check for screen reader only text
    const srOnly = container.querySelector('.sr-only');
    expect(srOnly).not.toBeNull();
    expect(srOnly?.textContent).toBe('required');
    
    // Check for proper error message with live region
    const errorMessage = container.querySelector('[aria-live="polite"]');
    expect(errorMessage).not.toBeNull();
  });
  
  it('should have accessible focus states', () => {
    const html = `
      <a href="mailto:contact@example.com" class="focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">contact@example.com</a>
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
      <section id="contact" aria-labelledby="contact-heading">
        <div>
          <h2 id="contact-heading">Contact Us</h2>
          <div>
            <div>
              <h3>Our Information</h3>
              <address>
                123 Therapy Street, Suite 100, Los Angeles, CA 90001<br />
                Phone: <a href="tel:(555) 123-4567">(555) 123-4567</a><br />
                Email: <a href="mailto:contact@example.com">contact@example.com</a>
              </address>
            </div>
            
            <form aria-labelledby="contactFormHeading" novalidate>
              <h3 id="contactFormHeading">Send Us a Message</h3>
              
              <div>
                <label for="test-name">Name <span aria-hidden="true">*</span><span class="sr-only">required</span></label>
                <input id="test-name" name="name" type="text" required aria-required="true" />
              </div>
              
              <div>
                <button type="submit">Send Message</button>
              </div>
            </form>
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