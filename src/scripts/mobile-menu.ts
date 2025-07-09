// Constants
export const SELECTORS = {
  MENU_BUTTON: '#menu-button',
  MENU_CLOSE_BUTTON: '#close-menu',
  MOBILE_MENU: '#mobile-menu',
  MENU_OVERLAY: '#menu-overlay',
  FOCUSABLE_ELEMENTS: 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
};

export const CLASSES = {
  MENU_OPEN: 'translate-x-0',
  MENU_CLOSED: 'translate-x-full',
  OVERLAY_VISIBLE: 'block',
  OVERLAY_HIDDEN: 'hidden',
  BODY_NO_SCROLL: 'overflow-hidden',
};

/**
 * Sets up the mobile menu functionality with proper accessibility support
 * @param menuButton - The menu button element
 * @param closeButton - The close button element
 * @param mobileMenu - The mobile menu element
 * @param menuOverlay - The menu overlay element
 * @returns An object containing the openMenu and closeMenu functions
 */
export function setupMobileMenu(
  menuButton: HTMLElement,
  closeButton: HTMLElement,
  mobileMenu: HTMLElement,
  menuOverlay: HTMLElement
) {
  // Keep track of the element that had focus before opening the menu
  let previousActiveElement: Element | null = null;

  // Get all focusable elements in the mobile menu
  const getFocusableElements = () => {
    return Array.from(mobileMenu.querySelectorAll(SELECTORS.FOCUSABLE_ELEMENTS));
  };

  // Trap focus within the mobile menu
  const trapFocus = (event: KeyboardEvent) => {
    if (!mobileMenu.classList.contains(CLASSES.MENU_OPEN)) return;

    const focusableElements = getFocusableElements();
    if (focusableElements.length === 0) return;
    
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

  // Handle keyboard events
  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      closeMenu();
    }
  };

  // Announce menu state to screen readers
  const announceMenuState = (isOpen: boolean) => {
    // Update ARIA attributes
    menuButton.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    mobileMenu.setAttribute('aria-hidden', isOpen ? 'false' : 'true');
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
    announceMenuState(true);

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
    announceMenuState(false);

    // Remove keyboard event listeners
    document.removeEventListener('keydown', handleKeyDown);
    mobileMenu.removeEventListener('keydown', trapFocus);

    // Restore focus to the previous element
    if (previousActiveElement instanceof HTMLElement) {
      previousActiveElement.focus();
    }
  };

  // Set up event listeners
  menuButton.addEventListener('click', openMenu);
  closeButton.addEventListener('click', closeMenu);
  menuOverlay.addEventListener('click', closeMenu);

  // Handle mobile menu links
  const mobileMenuLinks = mobileMenu.querySelectorAll('a[href^="#"]');
  mobileMenuLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeMenu();
    });
  });

  // Initialize ARIA attributes
  announceMenuState(false);

  // Return functions for testing
  return {
    openMenu,
    closeMenu,
  };
}

// Initialize the mobile menu when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  const menuButton = document.querySelector(SELECTORS.MENU_BUTTON) as HTMLElement;
  const closeButton = document.querySelector(SELECTORS.MENU_CLOSE_BUTTON) as HTMLElement;
  const mobileMenu = document.querySelector(SELECTORS.MOBILE_MENU) as HTMLElement;
  const menuOverlay = document.querySelector(SELECTORS.MENU_OVERLAY) as HTMLElement;

  if (menuButton && closeButton && mobileMenu && menuOverlay) {
    setupMobileMenu(menuButton, closeButton, mobileMenu, menuOverlay);

    // Close menu on window resize if it would switch to desktop view
    let resizeTimer: number;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        if (window.innerWidth >= 768 && mobileMenu.classList.contains(CLASSES.MENU_OPEN)) {
          const { closeMenu } = setupMobileMenu(menuButton, closeButton, mobileMenu, menuOverlay);
          closeMenu();
        }
      }, 250);
    });
  }
}); 