/* EcoHubs — Join the Waitlist · interactions
   Vanilla. Handles: tweak application, hero treatments, CTA presets,
   email validation + success/error, FAQ accordion, sticky mobile CTA,
   mobile nav. No framework. */

(function () {
  'use strict';

 
  /* Default headline (with the one Fraunces italic phrase) — restored when the
     headline tweak is empty. */
  const DEFAULT_HEADLINE =
    'A new way of living \u2014 with nature, <em class="font-story italic font-normal text-ecohubs-primary">and each other</em>.';

  

  /* ---------- Email capture (hero + final form) ---------- */
  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function wireForm(form) {
    if (!form) return;
    const input = form.querySelector('input[type="email"]');
    const errorEl = form.querySelector('[data-form-error]');
    const successEl = form.querySelector('[data-form-success]');
    const fieldsEl = form.querySelector('[data-form-fields]');

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const value = (input.value || '').trim();
      if (!EMAIL_RE.test(value)) {
        if (errorEl) errorEl.classList.remove('hidden');
        input.classList.add('input-error');
        input.focus();
        return;
      }
      if (errorEl) errorEl.classList.add('hidden');
      input.classList.remove('input-error');
      // Inline success state — no real network call in the prototype.
      if (fieldsEl) fieldsEl.classList.add('hidden');
      if (successEl) {
        successEl.classList.remove('hidden');
        successEl.querySelector('[data-success-email]') &&
          (successEl.querySelector('[data-success-email]').textContent = value);
      }
    });

    if (input) {
      input.addEventListener('input', function () {
        if (errorEl && !errorEl.classList.contains('hidden') && EMAIL_RE.test(input.value.trim())) {
          errorEl.classList.add('hidden');
          input.classList.remove('input-error');
        }
      });
    }
  }

  /* ---------- FAQ accordion ---------- */
  function wireAccordion() {
    document.querySelectorAll('[data-accordion-trigger]').forEach((btn) => {
      btn.addEventListener('click', function () {
        const item = btn.closest('[data-accordion-item]');
        const panel = item.querySelector('[data-accordion-panel]');
        const open = item.hasAttribute('data-open');
        if (open) {
          item.removeAttribute('data-open');
          panel.style.maxHeight = '0px';
          btn.setAttribute('aria-expanded', 'false');
        } else {
          item.setAttribute('data-open', '');
          panel.style.maxHeight = panel.scrollHeight + 'px';
          btn.setAttribute('aria-expanded', 'true');
        }
      });
    });
  }

  /* ---------- Sticky mobile CTA: show after hero scrolls away ---------- */
  function wireStickyCTA() {
    const bar = document.getElementById('sticky-cta');
    const hero = document.getElementById('hero');
    if (!bar || !hero) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) bar.classList.add('sticky-hidden');
          else bar.classList.remove('sticky-hidden');
        });
      },
      { threshold: 0.05 }
    );
    io.observe(hero);
  }

  /* ---------- Mobile nav toggle ---------- */
  function wireNav() {
    const btn = document.getElementById('nav-toggle');
    const menu = document.getElementById('mobile-menu');
    if (!btn || !menu) return;
    btn.addEventListener('click', () => menu.classList.toggle('hidden'));
    menu.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => menu.classList.add('hidden')));
  }

  /* ---------- init ---------- */
  function init() {
    document.querySelectorAll('[data-waitlist-form]').forEach(wireForm);
    wireAccordion();
    wireStickyCTA();
    wireNav();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
