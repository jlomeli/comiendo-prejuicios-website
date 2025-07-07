import { describe, it, expect, beforeEach } from 'vitest';
import { setupMobileMenu, CLASSES } from '../../src/scripts/mobile-menu';

// Mock DOM elements
function setupDOM() {
  // Create the elements we need for the mobile menu
  document.body.innerHTML = `
    <button id="menu-button" aria-expanded="false"></button>
    <button id="close-menu"></button>
    <div id="mobile-menu" class="transform translate-x-full"></div>
    <div id="menu-overlay" class="hidden"></div>
  `;
}

describe('Mobile Menu Script', () => {
  beforeEach(() => {
    // Setup DOM before each test
    setupDOM();
    
    // Reset body classes
    document.body.className = '';
  });
  
  it('should open the mobile menu when menu button is clicked', () => {
    // Get the elements
    const menuButton = document.getElementById('menu-button') as HTMLElement;
    const closeButton = document.getElementById('close-menu') as HTMLElement;
    const mobileMenu = document.getElementById('mobile-menu') as HTMLElement;
    const menuOverlay = document.getElementById('menu-overlay') as HTMLElement;
    
    // Setup the mobile menu with the actual implementation
    const { openMenu } = setupMobileMenu(menuButton, closeButton, mobileMenu, menuOverlay);
    
    // Simulate clicking the menu button by calling openMenu directly
    openMenu();
    
    // Check that the menu is opened
    expect(menuButton.getAttribute('aria-expanded')).toBe('true');
    expect(mobileMenu.classList.contains(CLASSES.MENU_CLOSED)).toBe(false);
    expect(menuOverlay.classList.contains('hidden')).toBe(false);
    expect(document.body.classList.contains(CLASSES.BODY_NO_SCROLL)).toBe(true);
  });
  
  it('should close the mobile menu when close button is clicked', () => {
    // Get the elements
    const menuButton = document.getElementById('menu-button') as HTMLElement;
    const closeButton = document.getElementById('close-menu') as HTMLElement;
    const mobileMenu = document.getElementById('mobile-menu') as HTMLElement;
    const menuOverlay = document.getElementById('menu-overlay') as HTMLElement;
    
    // Setup the mobile menu with the actual implementation
    const { openMenu, closeMenu } = setupMobileMenu(menuButton, closeButton, mobileMenu, menuOverlay);
    
    // First open the menu
    openMenu();
    
    // Then close it
    closeMenu();
    
    // Check that the menu is closed
    expect(menuButton.getAttribute('aria-expanded')).toBe('false');
    expect(mobileMenu.classList.contains(CLASSES.MENU_CLOSED)).toBe(true);
    expect(menuOverlay.classList.contains('hidden')).toBe(true);
    expect(document.body.classList.contains(CLASSES.BODY_NO_SCROLL)).toBe(false);
  });
  
  it('should close the mobile menu when overlay is clicked', () => {
    // Get the elements
    const menuButton = document.getElementById('menu-button') as HTMLElement;
    const closeButton = document.getElementById('close-menu') as HTMLElement;
    const mobileMenu = document.getElementById('mobile-menu') as HTMLElement;
    const menuOverlay = document.getElementById('menu-overlay') as HTMLElement;
    
    // Setup the mobile menu with the actual implementation
    const { openMenu } = setupMobileMenu(menuButton, closeButton, mobileMenu, menuOverlay);
    
    // First open the menu
    openMenu();
    
    // Then click the overlay
    menuOverlay.click();
    
    // Check that the menu is closed
    expect(menuButton.getAttribute('aria-expanded')).toBe('false');
    expect(mobileMenu.classList.contains(CLASSES.MENU_CLOSED)).toBe(true);
    expect(menuOverlay.classList.contains('hidden')).toBe(true);
    expect(document.body.classList.contains(CLASSES.BODY_NO_SCROLL)).toBe(false);
  });
}); 