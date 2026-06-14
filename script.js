/* =====================================================
   CRUZ ORTEGA · Valuación e Ingeniería — interactions
   ===================================================== */
(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {

    /* ---------- Año ---------- */
    var y = document.getElementById('year');
    if (y) y.textContent = new Date().getFullYear();

    /* ---------- Navbar al hacer scroll ---------- */
    var nav = document.getElementById('nav');
    function onScroll() {
      if (window.scrollY > 50) nav.classList.add('scrolled');
      else nav.classList.remove('scrolled');
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    /* ---------- Menú móvil ---------- */
    var burger = document.getElementById('navBurger');
    var links = document.getElementById('navLinks');
    burger.addEventListener('click', function () {
      burger.classList.toggle('active');
      links.classList.toggle('open');
    });
    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        burger.classList.remove('active');
        links.classList.remove('open');
      });
    });

    /* ---------- Reveal al hacer scroll ---------- */
    var reveals = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
      reveals.forEach(function (el) { io.observe(el); });
    } else {
      reveals.forEach(function (el) { el.classList.add('in'); });
    }

    /* ---------- Parallax sutil del hero ---------- */
    var heroBg = document.querySelector('.hero__bg');
    if (heroBg) {
      window.addEventListener('scroll', function () {
        var sc = window.scrollY;
        if (sc < window.innerHeight) heroBg.style.transform = 'translateY(' + (sc * 0.14) + 'px)';
      }, { passive: true });
    }

    /* ---------- Contadores animados ---------- */
    var counters = document.querySelectorAll('.stat__num');
    var cObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        var el = e.target;
        var target = parseInt(el.getAttribute('data-target'), 10);
        var suffix = el.getAttribute('data-suffix') || '';
        var dur = 1700, start = null;
        function step(ts) {
          if (!start) start = ts;
          var p = Math.min((ts - start) / dur, 1);
          el.textContent = Math.floor((1 - Math.pow(1 - p, 3)) * target) + suffix;
          if (p < 1) requestAnimationFrame(step);
          else el.textContent = target + suffix;
        }
        requestAnimationFrame(step);
        cObs.unobserve(el);
      });
    }, { threshold: 0.5 });
    counters.forEach(function (c) { cObs.observe(c); });

    /* ---------- FAQ: solo una abierta ---------- */
    var faqs = document.querySelectorAll('.faq__item');
    faqs.forEach(function (item) {
      item.addEventListener('toggle', function () {
        if (item.open) faqs.forEach(function (o) { if (o !== item) o.open = false; });
      });
    });

  });
})();
