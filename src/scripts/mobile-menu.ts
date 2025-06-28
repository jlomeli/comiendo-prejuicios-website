document.addEventListener('DOMContentLoaded', () => {
  const menuButton = document.getElementById('menu-button');
  const mobileMenu = document.getElementById('mobile-menu');
  const overlay = document.getElementById('menu-overlay');
  let isMenuOpen = false;

  const toggleMenu = () => {
    isMenuOpen = !isMenuOpen;
    menuButton?.setAttribute('aria-expanded', isMenuOpen.toString());
    mobileMenu?.classList.toggle('translate-x-full');
    overlay?.classList.toggle('hidden');
    document.body.classList.toggle('overflow-hidden');
  };

  menuButton?.addEventListener('click', toggleMenu);
  overlay?.addEventListener('click', toggleMenu);
}); 