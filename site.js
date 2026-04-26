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

  const hero = document.querySelector('.hero-modern');
  const scrollCue = document.querySelector('.scroll-cue');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (hero && !reduceMotion) {
    const onScroll = () => {
      const scrollTop = window.scrollY || window.pageYOffset;
      const moveAmount = Math.min(scrollTop * 0.08, 24);
      hero.style.transform = `translateY(${moveAmount}px)`;

      if (scrollCue) {
        const fadeStart = 30;
        const opacity = Math.max(0, 1 - Math.max(0, scrollTop - fadeStart) / 120);
        scrollCue.style.opacity = String(opacity);
      }
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }
})();
