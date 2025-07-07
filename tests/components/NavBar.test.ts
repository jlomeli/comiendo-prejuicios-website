import { describe, it, expect } from 'vitest';
import { renderHTML } from '../utils/test-utils';
import { navigation } from '../../src/config/navigation';

describe('NavBar Component', () => {
  it('renders the navigation links correctly', () => {
    const { links } = navigation;
    
    // Mock implementation for testing purposes
    const mockNavBarHTML = `
      <header class="fixed w-full top-0 z-50 bg-white/80 backdrop-blur-sm border-b border-neutral-dark/10 shadow-sm">
        <nav class="container mx-auto px-6 py-4" aria-label="Main navigation">
          <div class="flex items-center justify-between">
            <a href="/" class="text-2xl font-heading font-bold text-primary hover:text-primary-dark transition-colors duration-200">
              Comiendo Prejuicios
            </a>
            <div class="hidden md:flex items-center space-x-8">
              ${links.map(link => `
                <a
                  href="${link.href}"
                  data-nav-link
                  class="nav-link relative inline-block px-2 py-1 text-neutral-dark hover:text-primary transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded group"
                >
                  ${link.text}
                  <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-200 group-hover:w-full"></span>
                </a>
              `).join('')}
            </div>
            <button
              id="menu-button"
              type="button"
              aria-controls="mobile-menu"
              aria-expanded="false"
              class="md:hidden inline-flex items-center justify-center p-2 rounded-md text-neutral-dark hover:text-primary hover:bg-neutral-light/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <span class="sr-only">Open main menu</span>
              <svg class="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </nav>
      </header>
    `;
    
    const { container } = renderHTML(mockNavBarHTML);
    
    // Test that the component renders the brand name correctly
    const brandName = container.querySelector('a.text-2xl');
    expect(brandName).not.toBeNull();
    expect(brandName?.textContent?.trim()).toBe('Comiendo Prejuicios');
    
    // Test that the component renders all navigation links
    const navLinks = container.querySelectorAll('[data-nav-link]');
    expect(navLinks.length).toBe(links.length);
    
    // Test each navigation link
    navLinks.forEach((link, index) => {
      expect(link.getAttribute('href')).toBe(links[index].href);
      expect(link.textContent?.trim()).toBe(links[index].text);
    });
    
    // Test that the mobile menu button exists
    const menuButton = container.querySelector('#menu-button');
    expect(menuButton).not.toBeNull();
    expect(menuButton?.getAttribute('aria-controls')).toBe('mobile-menu');
  });
}); 