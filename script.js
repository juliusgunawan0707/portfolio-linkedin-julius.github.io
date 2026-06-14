/* =========================================================
   Julius Gunawan — Portfolio interactions
   ========================================================= */
(function () {
  'use strict';

  /* ---- Config: edit these two lines if needed ---- */
  // Email is assembled at runtime (anti-scrape). Change parts here.
  var EMAIL_USER = 'juliusgunawan1307';
  var EMAIL_DOMAIN = 'gmail.com';
  var GITHUB_USER = 'juliusgunawan0707'; // GitHub username

  var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---- Year ---- */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---- Obfuscated email + GitHub ---- */
  var emailLink = document.getElementById('emailLink');
  if (emailLink) {
    var addr = EMAIL_USER + '@' + EMAIL_DOMAIN;
    emailLink.setAttribute('href', 'mailto:' + addr + '?subject=' +
      encodeURIComponent('Hello Julius — AI Automation opportunity'));
    emailLink.textContent = 'Email Me';
  }
  var githubLink = document.getElementById('githubLink');
  if (githubLink) githubLink.setAttribute('href', 'https://github.com/' + GITHUB_USER);

  /* ---- Nav: scrolled state + mobile toggle ---- */
  var nav = document.getElementById('nav');
  var navToggle = document.getElementById('navToggle');
  var navLinks = document.querySelector('.nav-links');

  function onScrollNav() {
    if (window.scrollY > 40) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  }

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      var open = navLinks.classList.toggle('open');
      navToggle.classList.toggle('open', open);
      navToggle.setAttribute('aria-expanded', String(open));
    });
    navLinks.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        navLinks.classList.remove('open');
        navToggle.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---- Scroll progress bar ---- */
  var progress = document.getElementById('scrollProgress');
  function onScrollProgress() {
    var h = document.documentElement;
    var scrolled = (h.scrollTop) / (h.scrollHeight - h.clientHeight);
    if (progress) progress.style.width = (scrolled * 100) + '%';
  }

  /* ---- Parallax background layers ---- */
  var grid = document.querySelector('.bg-grid');
  var glow1 = document.querySelector('.bg-glow-1');
  var glow2 = document.querySelector('.bg-glow-2');

  function onScrollParallax() {
    if (prefersReduced) return;
    var y = window.scrollY;
    if (grid) grid.style.transform = 'translateY(' + (y * 0.18) + 'px)';
    if (glow1) glow1.style.transform = 'translate(' + (y * 0.06) + 'px,' + (y * 0.12) + 'px)';
    if (glow2) glow2.style.transform = 'translate(' + (-y * 0.05) + 'px,' + (-y * 0.08) + 'px)';
  }

  /* ---- rAF-throttled scroll handler ---- */
  var ticking = false;
  function onScroll() {
    if (!ticking) {
      window.requestAnimationFrame(function () {
        onScrollNav();
        onScrollProgress();
        onScrollParallax();
        ticking = false;
      });
      ticking = true;
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---- Reveal on scroll (Intersection Observer) ---- */
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !prefersReduced) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry, i) {
        if (entry.isIntersecting) {
          // small stagger within the same batch
          var delay = Math.min(i * 70, 280);
          setTimeout(function () { entry.target.classList.add('visible'); }, delay);
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    // Fallback: show everything
    reveals.forEach(function (el) { el.classList.add('visible'); });
  }

  /* ---- Active nav link highlight ---- */
  var sections = document.querySelectorAll('section[id]');
  var navAnchors = document.querySelectorAll('.nav-links a');
  if ('IntersectionObserver' in window) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var id = entry.target.getAttribute('id');
          navAnchors.forEach(function (a) {
            a.style.color = a.getAttribute('href') === '#' + id ? 'var(--cyan)' : '';
          });
        }
      });
    }, { threshold: 0.4 });
    sections.forEach(function (s) { spy.observe(s); });
  }
})();
