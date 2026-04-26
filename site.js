(() => {
  window.requestAnimationFrame(() => {
    document.body.classList.add('page-ready');
  });

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

  const revealTargets = document.querySelectorAll(
    '.hero, .section, .card, .gallery-item, .leader-card, .metric, .stat'
  );

  if (!revealTargets.length) return;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    revealTargets.forEach((item) => item.classList.add('is-visible'));
    return;
  }

  revealTargets.forEach((item, index) => {
    item.classList.add('reveal-on-scroll');
    item.style.transitionDelay = `${Math.min(index * 45, 240)}ms`;
  });

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    },
    {
      root: null,
      threshold: 0.15,
      rootMargin: '0px 0px -8% 0px',
    }
  );

  revealTargets.forEach((item) => revealObserver.observe(item));

  const heroAccentOrb = document.querySelector('.hero-accent-orb');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!reduceMotion) {
    document.querySelectorAll('.modern-pop-card').forEach((item, index) => {
      item.style.animationDelay = `${Math.min(index * 110, 440)}ms`;
    });
  }

  if (heroAccentOrb && !reduceMotion) {
    const onScroll = () => {
      const scrollTop = window.scrollY || window.pageYOffset;
      const moveAmount = Math.min(scrollTop * 0.06, 18);
      heroAccentOrb.style.transform = `translateY(${moveAmount}px)`;
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }
})();
