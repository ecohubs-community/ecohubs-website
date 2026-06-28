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
    const step2El = form.querySelector('[data-step2]');

    // Collected across both steps. Field `name` attributes (full_name, location,
    // skills, reason) are chosen to map onto Mautic field aliases.
    const captured = { email: '' };

    function showSuccess() {
      if (step2El) step2El.classList.add('hidden');
      if (successEl) {
        successEl.classList.remove('hidden');
        const se = successEl.querySelector('[data-success-email]');
        if (se) se.textContent = captured.email;
      }
    }

    // Step 1 — email captured. In production: create/upsert the contact in
    // Mautic + listmonk HERE so the email is saved even if step 2 is skipped.
    function submitEmail(value) {
      captured.email = value;
      // TODO: POST { email: value } to your endpoint (Mautic + listmonk).
      if (fieldsEl) fieldsEl.classList.add('hidden');
      if (step2El) {
        step2El.classList.remove('hidden');
        const first = step2El.querySelector('[name="full_name"]');
        if (first) first.focus();
      } else {
        showSuccess();
      }
    }

    // Step 2 — optional profile. In production: PATCH the same contact with
    // these progressive-profiling fields.
    function submitProfile() {
      if (step2El) {
        step2El.querySelectorAll('[name]').forEach(function (el) {
          captured[el.name] = (el.value || '').trim();
        });
      }
      // TODO: PATCH `captured` to your endpoint (Mautic progressive profiling).
      console.log('[waitlist] signup', captured);
      showSuccess();
    }

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
      submitEmail(value);
    });

    if (step2El) {
      const sub = step2El.querySelector('[data-step2-submit]');
      const skip = step2El.querySelector('[data-step2-skip]');
      if (sub) sub.addEventListener('click', submitProfile);
      if (skip) skip.addEventListener('click', showSuccess);
    }

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
