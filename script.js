(function () {
  'use strict';

  var header = document.getElementById('site-header');
  var nav = document.getElementById('site-nav');
  var toggle = document.querySelector('.nav-toggle');
  var form = document.getElementById('waitlist-form');
  var message = document.getElementById('waitlist-message');

  /* Header shadow on scroll */
  function onScroll() {
    if (!header) return;
    header.classList.toggle('is-scrolled', window.scrollY > 8);
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* Mobile navigation */
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

  /* Waitlist form placeholder — no backend yet */
  if (form && message) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var input = form.querySelector('#waitlist-email');
      var email = input && input.value.trim();

      message.classList.remove('is-error');

      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        message.textContent = '請輸入有效的電子郵件地址。';
        message.classList.add('is-error');
        return;
      }

      message.textContent = '感謝你的關注！我們會在上架時通知你。';
      form.reset();
    });
  }
})();
