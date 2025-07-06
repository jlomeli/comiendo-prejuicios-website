// Constants
const SELECTORS = {
  MENU_BUTTON: '#menu-button',
  MENU_CLOSE_BUTTON: '#menu-close-button',
  MOBILE_MENU: '#mobile-menu',
  MENU_OVERLAY: '#menu-overlay',
  FOCUSABLE_ELEMENTS: 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
};

const CLASSES = {
  MENU_OPEN: 'translate-x-0',
  MENU_CLOSED: 'translate-x-full',
  OVERLAY_VISIBLE: 'block',
  OVERLAY_HIDDEN: 'hidden',
  BODY_NO_SCROLL: 'overflow-hidden',
};

// Keep track of the element that had focus before opening the menu
let previousActiveElement: Element | null = null;

// Get DOM elements
const menuButton = document.querySelector(SELECTORS.MENU_BUTTON) as HTMLButtonElement;
const closeButton = document.querySelector(SELECTORS.MENU_CLOSE_BUTTON) as HTMLButtonElement;
const mobileMenu = document.querySelector(SELECTORS.MOBILE_MENU) as HTMLElement;
const menuOverlay = document.querySelector(SELECTORS.MENU_OVERLAY) as HTMLElement;

// Get all focusable elements in the mobile menu
const getFocusableElements = () => {
  return Array.from(mobileMenu.querySelectorAll(SELECTORS.FOCUSABLE_ELEMENTS));
};

// Trap focus within the mobile menu
const trapFocus = (event: KeyboardEvent) => {
  if (!mobileMenu.classList.contains(CLASSES.MENU_OPEN)) return;

  const focusableElements = getFocusableElements();
  const firstFocusableElement = focusableElements[0] as HTMLElement;
  const lastFocusableElement = focusableElements[focusableElements.length - 1] as HTMLElement;

  // Handle Tab key
  if (event.key === 'Tab') {
    if (event.shiftKey) {
      // Shift + Tab
      if (document.activeElement === firstFocusableElement) {
        event.preventDefault();
        lastFocusableElement.focus();
      }
    } else {
      // Tab
      if (document.activeElement === lastFocusableElement) {
        event.preventDefault();
        firstFocusableElement.focus();
      }
    }
  }
};

// Open the mobile menu
const openMenu = () => {
  // Store the currently focused element
  previousActiveElement = document.activeElement;

  // Show menu and overlay
  mobileMenu.classList.remove(CLASSES.MENU_CLOSED);
  mobileMenu.classList.add(CLASSES.MENU_OPEN);
  menuOverlay.classList.remove(CLASSES.OVERLAY_HIDDEN);
  menuOverlay.classList.add(CLASSES.OVERLAY_VISIBLE);
  document.body.classList.add(CLASSES.BODY_NO_SCROLL);

  // Update ARIA attributes
  menuButton.setAttribute('aria-expanded', 'true');

  // Focus the close button
  closeButton.focus();

  // Add keyboard event listeners
  document.addEventListener('keydown', handleKeyDown);
  mobileMenu.addEventListener('keydown', trapFocus);
};

// Close the mobile menu
const closeMenu = () => {
  // Hide menu and overlay
  mobileMenu.classList.remove(CLASSES.MENU_OPEN);
  mobileMenu.classList.add(CLASSES.MENU_CLOSED);
  menuOverlay.classList.remove(CLASSES.OVERLAY_VISIBLE);
  menuOverlay.classList.add(CLASSES.OVERLAY_HIDDEN);
  document.body.classList.remove(CLASSES.BODY_NO_SCROLL);

  // Update ARIA attributes
  menuButton.setAttribute('aria-expanded', 'false');

  // Remove keyboard event listeners
  document.removeEventListener('keydown', handleKeyDown);
  mobileMenu.removeEventListener('keydown', trapFocus);

  // Restore focus to the previous element
  if (previousActiveElement instanceof HTMLElement) {
    previousActiveElement.focus();
  }
};

// Handle keyboard events
const handleKeyDown = (event: KeyboardEvent) => {
  if (event.key === 'Escape') {
    closeMenu();
  }
};

// Event listeners
menuButton?.addEventListener('click', openMenu);
closeButton?.addEventListener('click', closeMenu);
menuOverlay?.addEventListener('click', closeMenu);

// Handle mobile menu links
const mobileMenuLinks = mobileMenu?.querySelectorAll('a[href^="#"]');
mobileMenuLinks?.forEach(link => {
  link.addEventListener('click', () => {
    closeMenu();
  });
});

// Close menu on window resize if it would switch to desktop view
let resizeTimer: number;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = window.setTimeout(() => {
    if (window.innerWidth >= 768 && mobileMenu?.classList.contains(CLASSES.MENU_OPEN)) {
      closeMenu();
    }
  }, 250);
}); 