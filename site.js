(() => {
  const mobileBreakpoint = window.matchMedia('(max-width: 760px)');
  const toggleButtons = document.querySelectorAll('.nav-toggle');

  toggleButtons.forEach((button) => {
    const navId = button.getAttribute('aria-controls');
    if (!navId) return;

    const nav = document.getElementById(navId);
    if (!nav) return;

    const closeMenu = () => {
      nav.classList.remove('is-open');
      button.setAttribute('aria-expanded', 'false');
      button.textContent = 'Menu';
    };

    button.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('is-open');
      button.setAttribute('aria-expanded', String(isOpen));
      button.textContent = isOpen ? 'Close' : 'Menu';
    });

    nav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        if (mobileBreakpoint.matches) closeMenu();
      });
    });

    mobileBreakpoint.addEventListener('change', (event) => {
      if (!event.matches) {
        nav.classList.remove('is-open');
        button.setAttribute('aria-expanded', 'false');
        button.textContent = 'Menu';
      }
    });
  });
})();
