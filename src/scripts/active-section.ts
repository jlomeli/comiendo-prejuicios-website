interface Section {
  element: Element;
  navLink: HTMLAnchorElement | null;
}

const observerOptions = {
  root: null, // viewport
  rootMargin: '-20% 0px -70% 0px', // Trigger when section is 20% from top and 70% from bottom
  threshold: 0
};

document.addEventListener('DOMContentLoaded', () => {
  const sections: Section[] = Array.from(document.querySelectorAll('section[id]')).map(section => ({
    element: section,
    navLink: document.querySelector(`a[href="#${section.id}"]`)
  }));

  const activeClass = 'text-primary';
  let currentActiveSection: Element | null = null;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const section = sections.find(s => s.element === entry.target);
      if (!section?.navLink) return;

      if (entry.isIntersecting) {
        // Remove active class from all nav links
        sections.forEach(s => s.navLink?.classList.remove(activeClass));
        
        // Add active class to current section's nav link
        section.navLink.classList.add(activeClass);
        currentActiveSection = section.element;
      }
    });
  }, observerOptions);

  // Observe all sections
  sections.forEach(section => observer.observe(section.element));

  // Handle smooth scrolling
  sections.forEach(({ navLink }) => {
    navLink?.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = navLink.getAttribute('href');
      if (!targetId) return;

      const targetSection = document.querySelector(targetId);
      if (!targetSection) return;

      targetSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });

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
    });
  });
}); 