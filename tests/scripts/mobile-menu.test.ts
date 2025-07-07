import { describe, it, expect, beforeEach } from 'vitest';

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

// Mock implementation of the mobile-menu script functionality
function setupMobileMenuScript() {
  const menuButton = document.getElementById('menu-button');
  const closeButton = document.getElementById('close-menu');
  const mobileMenu = document.getElementById('mobile-menu');
  const menuOverlay = document.getElementById('menu-overlay');

  const openMenu = () => {
    mobileMenu?.classList.remove('translate-x-full');
    menuOverlay?.classList.remove('hidden');
    document.body.classList.add('overflow-hidden');
    menuButton?.setAttribute('aria-expanded', 'true');
  };

  const closeMenu = () => {
    mobileMenu?.classList.add('translate-x-full');
    menuOverlay?.classList.add('hidden');
    document.body.classList.remove('overflow-hidden');
    menuButton?.setAttribute('aria-expanded', 'false');
  };

  menuButton?.addEventListener('click', openMenu);
  closeButton?.addEventListener('click', closeMenu);
  menuOverlay?.addEventListener('click', closeMenu);
}

describe('Mobile Menu Script', () => {
  beforeEach(() => {
    // Setup DOM before each test
    setupDOM();
    
    // Reset body classes
    document.body.className = '';
  });
  
  it('should open the mobile menu when menu button is clicked', () => {
    // Setup the mobile menu script
    setupMobileMenuScript();
    
    // Get the elements
    const menuButton = document.getElementById('menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuOverlay = document.getElementById('menu-overlay');
    
    // Trigger the click event on the menu button
    menuButton?.dispatchEvent(new Event('click'));
    
    // Check that the menu is opened
    expect(menuButton?.getAttribute('aria-expanded')).toBe('true');
    expect(mobileMenu?.classList.contains('translate-x-full')).toBe(false);
    expect(menuOverlay?.classList.contains('hidden')).toBe(false);
    expect(document.body.classList.contains('overflow-hidden')).toBe(true);
  });
  
  it('should close the mobile menu when close button is clicked', () => {
    // Setup the mobile menu script
    setupMobileMenuScript();
    
    // Get the elements
    const menuButton = document.getElementById('menu-button');
    const closeButton = document.getElementById('close-menu');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuOverlay = document.getElementById('menu-overlay');
    
    // First open the menu
    menuButton?.dispatchEvent(new Event('click'));
    
    // Then close it
    closeButton?.dispatchEvent(new Event('click'));
    
    // Check that the menu is closed
    expect(menuButton?.getAttribute('aria-expanded')).toBe('false');
    expect(mobileMenu?.classList.contains('translate-x-full')).toBe(true);
    expect(menuOverlay?.classList.contains('hidden')).toBe(true);
    expect(document.body.classList.contains('overflow-hidden')).toBe(false);
  });
  
  it('should close the mobile menu when overlay is clicked', () => {
    // Setup the mobile menu script
    setupMobileMenuScript();
    
    // Get the elements
    const menuButton = document.getElementById('menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuOverlay = document.getElementById('menu-overlay');
    
    // First open the menu
    menuButton?.dispatchEvent(new Event('click'));
    
    // Then click the overlay
    menuOverlay?.dispatchEvent(new Event('click'));
    
    // Check that the menu is closed
    expect(menuButton?.getAttribute('aria-expanded')).toBe('false');
    expect(mobileMenu?.classList.contains('translate-x-full')).toBe(true);
    expect(menuOverlay?.classList.contains('hidden')).toBe(true);
    expect(document.body.classList.contains('overflow-hidden')).toBe(false);
  });
}); 