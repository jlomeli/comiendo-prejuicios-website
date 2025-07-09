interface Section {
  element: Element;
  navLink: HTMLAnchorElement | null;
  id: string;
}

// Intersection Observer options
const options = {
  root: null,
  rootMargin: '-20% 0px -79% 0px', // Adjust these values to control when sections are considered "active"
  threshold: 0
};

// Only apply section highlighting on the home page
const isHomePage = window.location.pathname === '/';

// Get all sections that are targets of navigation
const sections: Section[] = Array.from(document.querySelectorAll<HTMLElement>('section[id]'))
  .map(element => ({
    element,
    navLink: document.querySelector<HTMLAnchorElement>(`a[href="/#${element.id}"]`),
    id: element.id
  }))
  .filter(section => section.navLink !== null); // Only include sections that have corresponding navigation links

// Get all navigation links that point to sections
const navLinks = document.querySelectorAll<HTMLAnchorElement>('a[href^="/#"]');

// Clear all active states from navigation links
function clearAllActiveLinks() {
  navLinks.forEach(link => {
    link.classList.remove('text-primary');
    link.removeAttribute('aria-current');
    
    // Reset the underline indicator
    const indicator = link.querySelector('span');
    if (indicator) {
      indicator.classList.remove('w-full');
      indicator.classList.add('w-0');
    }
  });
}

// Function to update active link styles
function updateActiveLink(sectionId: string | null) {
  // Only update active links for hash navigation on the home page
  if (!isHomePage || !sectionId) return;
  
  // First, clear all active states
  clearAllActiveLinks();
  
  // Then set the active state for the current section
  const activeLink = document.querySelector(`a[href="/#${sectionId}"]`);
  if (activeLink) {
    activeLink.classList.add('text-primary');
    activeLink.setAttribute('aria-current', 'page');
    
    // Update the underline indicator
    const indicator = activeLink.querySelector('span');
    if (indicator) {
      indicator.classList.remove('w-0');
      indicator.classList.add('w-full');
    }
  }
}

// Function to handle smooth scrolling and mobile menu
function handleNavClick(event: MouseEvent, targetId: string) {
  event.preventDefault();
  const targetSection = document.querySelector(targetId);
  if (!targetSection) return;

  targetSection.scrollIntoView({
    behavior: 'smooth',
    block: 'start'
  });

  if (isHomePage) {
    updateActiveLink(targetId.slice(1));
  }

  // Close mobile menu if open
  const mobileMenu = document.getElementById('mobile-menu');
  const menuOverlay = document.getElementById('menu-overlay');
  const menuButton = document.getElementById('menu-button');
  
  if (mobileMenu?.classList.contains('translate-x-0')) {
    mobileMenu.classList.remove('translate-x-0');
    mobileMenu.classList.add('translate-x-full');
    menuOverlay?.classList.add('hidden');
    menuButton?.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('overflow-hidden');
  }
}

// Intersection Observer callback
function observerCallback(entries: IntersectionObserverEntry[]) {
  // Find the first intersecting section
  const intersectingEntry = entries.find(entry => entry.isIntersecting);
  
  if (intersectingEntry) {
    const sectionId = intersectingEntry.target.id;
    updateActiveLink(sectionId);
  }
}

// Handle initial state and direct navigation
function handleInitialState() {
  const hash = window.location.hash;
  if (hash) {
    const targetSection = document.querySelector(hash);
    if (targetSection) {
      updateActiveLink(hash.slice(1));
      // Smooth scroll to the section
      targetSection.scrollIntoView({ behavior: 'smooth' });
    }
  } else {
    // Find the first visible section
    const firstVisibleSection = Array.from(sections).find(section => {
      const rect = section.element.getBoundingClientRect();
      return rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2;
    });
    if (firstVisibleSection) {
      updateActiveLink(firstVisibleSection.id);
    } else if (sections.length > 0) {
      // If no section is visible, highlight the first section
      updateActiveLink(sections[0].id);
    }
  }
}

// Only set up intersection observer on the home page
if (isHomePage) {
  // Create and start the observer
  const observer = new IntersectionObserver(observerCallback, options);

  // Observe all sections
  sections.forEach(section => {
    observer.observe(section.element);
  });

  // Handle initial state
  document.addEventListener('DOMContentLoaded', () => {
    // Reset any active states that might have been set by the server
    if (sections.length > 0) {
      clearAllActiveLinks();
      handleInitialState();
    }
  });
}

// Add click handlers to all navigation links
navLinks.forEach(link => {
  link.addEventListener('click', (event: MouseEvent) => {
    const href = link.getAttribute('href');
    if (href && href.startsWith('/#')) {
      handleNavClick(event, href.substring(1)); // Remove the leading slash
    }
  });
}); 