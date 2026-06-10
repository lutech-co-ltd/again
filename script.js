(function () {
  'use strict';

  var header = document.getElementById('site-header');
  var nav = document.getElementById('site-nav');
  var toggle = document.querySelector('.nav-toggle');
  var form = document.getElementById('waitlist-form');
  var msg = document.getElementById('waitlist-msg');

  /* Scroll shadow on header */
  function onScroll() {
    if (header) {
      header.classList.toggle('is-scrolled', window.scrollY > 6);
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* Mobile nav */
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

  /* Waitlist form (UI only — no backend) */
  if (form && msg) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var input = document.getElementById('email');
      var email = input && input.value.trim();

      msg.classList.remove('is-error');

      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        msg.textContent = '請輸入有效的電子郵件地址。';
        msg.classList.add('is-error');
        return;
      }

      msg.textContent = '感謝你的關注！我們會在上架時第一時間通知你。';
      form.reset();
    });
  }
})();
