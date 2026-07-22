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


(() => {
  const consentKey = 'iccha_cookie_consent_v1';

  const ensureFooter = () => {
    if (document.querySelector('.site-legal-footer')) return;
    const footer = document.createElement('footer');
    footer.className = 'site-legal-footer';
    footer.innerHTML = `
      <div class="container">
        <nav aria-label="Legal links">
          <a href="/legal/">Legal Center</a>
          <a href="/legal/privacy/">Privacy Notice</a>
          <a href="/legal/cookies/">Cookie Notice</a>
          <a href="/legal/terms/">Terms of Use</a>
          <a href="/legal/accessibility/">Accessibility</a>
          <a href="/legal/children/">Children's Privacy</a>
          <a href="/legal/disclaimer/">Disclaimer</a>
          <a href="/legal/data-request/">Data Requests</a>
        </nav>
      </div>`;
    document.body.appendChild(footer);
  };

  const removeBanner = () => {
    const banner = document.querySelector('.cookie-banner');
    if (banner) banner.remove();
  };

  const setConsent = (value) => {
    localStorage.setItem(consentKey, value);
    removeBanner();
  };

  const ensureCookieBanner = (forceOpen = false) => {
    const hasDecision = localStorage.getItem(consentKey);
    if (hasDecision && !forceOpen) return;
    removeBanner();
    const banner = document.createElement('section');
    banner.className = 'cookie-banner';
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-label', 'Cookie preference');
    banner.innerHTML = `
      <p>We use essential cookies for site operation. Optional analytics cookies are off by default unless you accept.</p>
      <div class="cookie-banner-actions">
        <button class="cookie-accept" type="button">Accept optional analytics</button>
        <button class="cookie-reject" type="button">Keep optional analytics off</button>
      </div>`;

    banner.querySelector('.cookie-accept').addEventListener('click', () => setConsent('accepted'));
    banner.querySelector('.cookie-reject').addEventListener('click', () => setConsent('rejected'));
    document.body.appendChild(banner);
  };

  const bindCookieSettingsButton = () => {
    const cookieSettingsButton = document.getElementById('reopen-cookie-settings');
    if (!cookieSettingsButton) return;
    cookieSettingsButton.addEventListener('click', () => ensureCookieBanner(true));
  };

  ensureFooter();
  ensureCookieBanner();
  bindCookieSettingsButton();
})();
