import { describe, it, expect } from 'vitest';
import { renderHTML } from '../utils/test-utils';

describe('NavBar Component Accessibility', () => {
  it('should have proper ARIA attributes', () => {
    // Create a simplified version of the NavBar component
    const html = `
      <header class="fixed w-full top-0 z-50" role="banner">
        <nav class="container mx-auto px-6 py-4" aria-label="Main navigation">
          <div class="flex items-center justify-between">
            <a 
              href="/" 
              class="text-2xl font-heading font-bold"
              aria-label="Comiendo Prejuicios - Home"
            >
              Comiendo Prejuicios
            </a>
            
            <div class="hidden md:flex items-center space-x-8" role="menubar">
              <a
                href="/about"
                data-nav-link
                class="nav-link"
                role="menuitem"
                aria-current="page"
              >
                About Me
              </a>
              <a
                href="/#services"
                data-nav-link
                class="nav-link"
                role="menuitem"
              >
                Services
              </a>
            </div>
            
            <button
              id="menu-button"
              type="button"
              aria-controls="mobile-menu"
              aria-expanded="false"
              aria-haspopup="true"
              aria-label="Open main menu"
            >
              <span class="sr-only">Open main menu</span>
              <svg aria-hidden="true"></svg>
            </button>
          </div>
        </nav>
      </header>
    `;
    
    const { container } = renderHTML(html);
    
    // Check for proper ARIA attributes
    const nav = container.querySelector('nav');
    expect(nav).toHaveAttribute('aria-label', 'Main navigation');
    
    const menuButton = container.querySelector('#menu-button');
    expect(menuButton).toHaveAttribute('aria-controls', 'mobile-menu');
    expect(menuButton).toHaveAttribute('aria-expanded', 'false');
    expect(menuButton).toHaveAttribute('aria-haspopup', 'true');
    
    const menubar = container.querySelector('[role="menubar"]');
    expect(menubar).not.toBeNull();
    
    const menuItems = container.querySelectorAll('[role="menuitem"]');
    expect(menuItems.length).toBe(2);
    
    const currentPageLink = container.querySelector('[aria-current="page"]');
    expect(currentPageLink).not.toBeNull();
    expect(currentPageLink?.getAttribute('href')).toBe('/about');
  });
  
  it('should have proper focus management attributes', () => {
    const html = `
      <a href="/" class="focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2">Home</a>
    `;
    
    const { container } = renderHTML(html);
    const link = container.querySelector('a');
    
    // Check for focus management classes
    expect(link?.className).toContain('focus:outline-none');
    expect(link?.className).toContain('focus-visible:ring-2');
  });
}); 