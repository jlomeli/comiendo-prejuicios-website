interface MenuElements {
  button: HTMLElement | null;
  menu: HTMLElement | null;
  overlay: HTMLElement | null;
  closeButton: HTMLElement | null;
}

document.addEventListener('DOMContentLoaded', () => {
  const elements: MenuElements = {
    button: document.getElementById('menu-button'),
    menu: document.getElementById('mobile-menu'),
    overlay: document.getElementById('menu-overlay'),
    closeButton: document.getElementById('menu-close-button')
  };

  let isMenuOpen = false;

  const toggleMenu = (shouldOpen?: boolean) => {
    isMenuOpen = shouldOpen ?? !isMenuOpen;
    elements.button?.setAttribute('aria-expanded', isMenuOpen.toString());
    
    if (isMenuOpen) {
      elements.menu?.classList.remove('translate-x-full');
      elements.menu?.classList.add('translate-x-0');
      elements.overlay?.classList.remove('hidden');
      document.body.classList.add('overflow-hidden');
      
      // Focus trap
      const focusableElements = elements.menu?.querySelectorAll(
        'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      
      if (focusableElements?.length) {
        (focusableElements[0] as HTMLElement).focus();
      }
    } else {
      elements.menu?.classList.add('translate-x-full');
      elements.menu?.classList.remove('translate-x-0');
      elements.overlay?.classList.add('hidden');
      document.body.classList.remove('overflow-hidden');
      elements.button?.focus();
    }
  };

  // Click handlers
  elements.button?.addEventListener('click', () => toggleMenu());
  elements.overlay?.addEventListener('click', () => toggleMenu(false));
  elements.closeButton?.addEventListener('click', () => toggleMenu(false));

  // Keyboard handlers
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isMenuOpen) {
      toggleMenu(false);
    }
  });

  // Close menu on window resize if it would switch to desktop view
  let resizeTimer: number;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(() => {
      if (window.innerWidth >= 768 && isMenuOpen) {
        toggleMenu(false);
      }
    }, 100);
  });
}); 