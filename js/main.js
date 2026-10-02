// Legacy Fundraising — shared site behavior (nav, profit slider, FAQ, forecast form)

document.addEventListener('DOMContentLoaded', () => {
  initNavToggle();
  initProfitSlider();
  initFaqAccordion();
  initForecastForm();
});

function initNavToggle() {
  const toggle = document.querySelector('[data-nav-toggle]');
  const menu = document.querySelector('[data-nav-menu]');
  if (!toggle || !menu) return;

  toggle.addEventListener('click', () => {
    const open = menu.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(open));
  });

  menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// Roster 10–60 -> estimated program profit range at $275–$575 / participant.
// This range is intentionally wide — actual profit per participant depends on
// team size, team type, participation minimums, pricing and offer structure,
// so we don't collapse it to a single "average" figure anywhere on the site.
const PROFIT_PER_PARTICIPANT_LOW = 275;
const PROFIT_PER_PARTICIPANT_HIGH = 575;

function initProfitSlider() {
  const slider = document.querySelector('[data-roster-slider]');
  if (!slider) return;

  const rosterOut = document.querySelectorAll('[data-roster-value]');
  const rangeOut = document.querySelectorAll('[data-profit-range]');
  const fmt = n => '$' + n.toLocaleString('en-US');

  const update = () => {
    const n = Number(slider.value);
    rosterOut.forEach(el => { el.textContent = n; });
    rangeOut.forEach(el => {
      el.textContent = `${fmt(n * PROFIT_PER_PARTICIPANT_LOW)}–${fmt(n * PROFIT_PER_PARTICIPANT_HIGH)}`;
    });
  };

  slider.addEventListener('input', update);
  update();
}

function initFaqAccordion() {
  const items = document.querySelectorAll('[data-faq-item]');
  if (!items.length) return;

  items.forEach(item => {
    const q = item.querySelector('[data-faq-q]');
    const a = item.querySelector('[data-faq-a]');
    if (!q || !a) return;

    q.addEventListener('click', () => {
      const isOpen = item.classList.contains('is-open');
      items.forEach(other => {
        other.classList.remove('is-open');
        const otherA = other.querySelector('[data-faq-a]');
        if (otherA) otherA.style.maxHeight = null;
        const otherQ = other.querySelector('[data-faq-q]');
        if (otherQ) otherQ.setAttribute('aria-expanded', 'false');
      });
      if (!isOpen) {
        item.classList.add('is-open');
        a.style.maxHeight = a.scrollHeight + 'px';
        q.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

// Fundraising Forecast form — submits to Formspree via fetch with an inline
// confirmation. See README.md for how to change this later.
const FORECAST_FORM_ENDPOINT = 'https://formspree.io/f/mgavbraw';

function initForecastForm() {
  const form = document.querySelector('[data-forecast-form]');
  if (!form) return;

  const status = form.querySelector('[data-form-status]');
  const submitBtn = form.querySelector('[type="submit"]');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const originalLabel = submitBtn ? submitBtn.textContent : '';
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending…';
    }
    setStatus(status, null);

    const isPlaceholder = FORECAST_FORM_ENDPOINT.includes('REPLACE_WITH_YOUR_FORM_ID');

    try {
      if (isPlaceholder) {
        // No real endpoint configured yet — don't attempt a network call
        // that will fail. Simulate success locally so the flow can be
        // reviewed end-to-end before the real endpoint is wired up.
        await new Promise(r => setTimeout(r, 400));
        form.reset();
        setStatus(status, 'success',
          "Thank you. A Legacy fundraising partner will review your information and contact you to discuss your program's goals and potential campaign." +
          ' (Note: this form is not yet wired to a live endpoint — see README.md.)');
      } else {
        const res = await fetch(FORECAST_FORM_ENDPOINT, {
          method: 'POST',
          headers: { Accept: 'application/json' },
          body: new FormData(form),
        });
        if (res.ok) {
          form.reset();
          setStatus(status, 'success',
            "Thank you. A Legacy fundraising partner will review your information and contact you to discuss your program's goals and potential campaign.");
        } else {
          throw new Error('Form service responded with an error');
        }
      }
    } catch (err) {
      setStatus(status, 'error',
        `Something went wrong sending your forecast request. Please email us directly at contact@legacyfundraising.org and we'll follow up right away.`);
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = originalLabel;
      }
    }
  });
}

function setStatus(el, type, message) {
  if (!el) return;
  el.classList.remove('is-success', 'is-error');
  if (!type) {
    el.textContent = '';
    return;
  }
  el.classList.add(type === 'success' ? 'is-success' : 'is-error');
  el.textContent = message;
  el.setAttribute('role', 'status');
  el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}
