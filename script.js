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

  /** 生活誌示範卡：雅婷／志明 淡入輪播 */
  function initLookbookCarousel(root) {
    var slides = Array.prototype.slice.call(
      root.querySelectorAll('.lookbook-preview__frame[data-slide]'),
    );
    var dots = Array.prototype.slice.call(
      root.querySelectorAll('.lookbook-preview__dot[data-slide]'),
    );
    if (slides.length < 2) return;

    var index = 0;
    var timer = null;
    var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var intervalMs = 5200;

    function goTo(next) {
      index = ((next % slides.length) + slides.length) % slides.length;
      slides.forEach(function (slide, i) {
        var on = i === index;
        slide.classList.toggle('is-active', on);
        slide.setAttribute('aria-hidden', on ? 'false' : 'true');
      });
      dots.forEach(function (dot, i) {
        var on = i === index;
        dot.classList.toggle('is-active', on);
        dot.setAttribute('aria-selected', on ? 'true' : 'false');
      });
    }

    function stop() {
      if (timer) {
        window.clearInterval(timer);
        timer = null;
      }
    }

    function start() {
      if (reduceMotion) return;
      stop();
      timer = window.setInterval(function () {
        goTo(index + 1);
      }, intervalMs);
    }

    dots.forEach(function (dot) {
      dot.addEventListener('click', function () {
        var n = Number(dot.getAttribute('data-slide'));
        if (Number.isNaN(n)) return;
        goTo(n);
        start();
      });
    });

    root.addEventListener('mouseenter', stop);
    root.addEventListener('mouseleave', start);
    root.addEventListener('focusin', stop);
    root.addEventListener('focusout', function (e) {
      if (!root.contains(e.relatedTarget)) start();
    });

    goTo(0);
    start();
  }

  document.querySelectorAll('[data-lookbook-carousel]').forEach(initLookbookCarousel);

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var reveals = document.querySelectorAll('.reveal');
  if (!reveals.length) return;

  if (reduceMotion || !('IntersectionObserver' in window)) {
    reveals.forEach(function (el) {
      el.classList.add('is-visible');
    });
    return;
  }

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.12 },
  );

  reveals.forEach(function (el) {
    observer.observe(el);
  });
})();
