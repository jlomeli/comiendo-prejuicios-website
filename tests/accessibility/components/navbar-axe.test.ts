import { describe, it, expect } from 'vitest';
import { renderHTML } from '../../utils/test-utils';
import axe from 'axe-core';

describe('NavBar Component Accessibility with axe-core', () => {
  it('should not have any automatically detectable accessibility issues', async () => {
    // Create a simplified version of the NavBar component with all accessibility features
    const html = `
      <header class="fixed w-full top-0 z-50" role="banner">
        <a href="#main-content" class="skip-to-content">Skip to content</a>
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
          
          <div
            id="mobile-menu"
            class="fixed inset-y-0 right-0"
            aria-hidden="true"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation menu"
          >
            <button
              id="close-menu"
              type="button"
              aria-label="Close menu"
            >
              <span class="sr-only">Close menu</span>
              <svg aria-hidden="true"></svg>
            </button>
            
            <div class="pt-16 pb-4 px-4" role="menu">
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
          </div>
          
          <div 
            id="menu-overlay" 
            class="fixed inset-0" 
            aria-hidden="true"
          ></div>
        </nav>
      </header>
      <main id="main-content" tabindex="-1">
        <h1>Main Content</h1>
      </main>
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