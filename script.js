(function () {
  'use strict';

  var header = document.getElementById('site-header');
  var nav = document.getElementById('site-nav');
  var toggle = document.querySelector('.header__menu-btn');

  function onScroll() {
    if (header) {
      header.classList.toggle('is-scrolled', window.scrollY > 4);
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!open));
      nav.classList.toggle('is-open', !open);
    });

    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        toggle.setAttribute('aria-expanded', 'false');
        nav.classList.remove('is-open');
      });
    });
  }
})();
