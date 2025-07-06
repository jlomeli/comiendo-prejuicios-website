interface Section {
  element: Element;
  navLink: HTMLAnchorElement | null;
}

// Intersection Observer options
const options = {
  root: null,
  rootMargin: '-20% 0px -79% 0px', // Adjust these values to control when sections are considered "active"
  threshold: 0
};

// Get all sections that are targets of navigation
const sections: Section[] = Array.from(document.querySelectorAll<HTMLElement>('section[id]'))
  .map(element => ({
    element,
    navLink: document.querySelector<HTMLAnchorElement>(`a[href="#${element.id}"]`)
  }));

// Get all navigation links that point to sections
const navLinks = document.querySelectorAll<HTMLAnchorElement>('a[data-nav-link]');

// Function to update active link styles
function updateActiveLink(sectionId: string | null) {
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href && href.startsWith('#')) {
      const linkSectionId = href.slice(1);
      if (linkSectionId === sectionId) {
        link.classList.add('text-primary');
      } else {
        link.classList.remove('text-primary');
      }
    }
  });
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

  updateActiveLink(targetId.slice(1));

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
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const sectionId = entry.target.id;
      updateActiveLink(sectionId);
    }
  });
}

// Create and start the observer
const observer = new IntersectionObserver(observerCallback, options);

// Observe all sections
sections.forEach(section => {
  observer.observe(section.element);
});

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
      updateActiveLink(firstVisibleSection.element.id);
    }
  }
}

// Handle initial state
handleInitialState();

// Add click handlers to all navigation links
navLinks.forEach(link => {
  link.addEventListener('click', (event: MouseEvent) => {
    const href = link.getAttribute('href');
    if (href && href.startsWith('#')) {
      handleNavClick(event, href);
    }
  });
}); 