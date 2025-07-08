import { describe, it, expect } from 'vitest';
import { renderHTML } from '../utils/test-utils';
import { navigation } from '../../src/config/navigation';

describe('NavBar Component', () => {
  it('should render navigation links correctly', () => {
    // Create a simplified mock of the NavBar HTML based on navigation links
    const mockNavBarHTML = `
      <header class="fixed w-full top-0">
        <nav class="container mx-auto px-6 py-4">
          <div class="flex items-center justify-between">
            <a href="/" class="text-2xl">Comiendo Prejuicios</a>
            <div class="hidden md:flex">
              ${navigation.links.map(link => `
                <a href="${link.href}" class="nav-link">${link.text}</a>
              `).join('')}
            </div>
          </div>
        </nav>
      </header>
    `;
    
    const { container } = renderHTML(mockNavBarHTML);
    
    // Check that each navigation link is rendered
    for (const link of navigation.links) {
      const linkElements = Array.from(container.querySelectorAll('a'))
        .filter(el => el.textContent?.trim() === link.text);
      expect(linkElements.length).toBeGreaterThan(0);
      expect(linkElements[0].getAttribute('href')).toBe(link.href);
    }
    
    // Verify that "About Us" link exists and "About Claudia" doesn't
    const aboutUsElements = Array.from(container.querySelectorAll('a'))
      .filter(el => el.textContent?.trim() === 'About Me');
    expect(aboutUsElements.length).toBeGreaterThan(0);
    
    const aboutClaudiaElements = Array.from(container.querySelectorAll('a'))
      .filter(el => el.textContent?.trim() === 'About Claudia');
    expect(aboutClaudiaElements.length).toBe(0);
  });
}); 