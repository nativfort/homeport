(function () {
  var root = document.documentElement;
  var stored = localStorage.getItem('nf-theme') || 'dark';
  root.classList.toggle('dark', stored === 'dark');

  function syncButtons() {
    document.querySelectorAll('[data-theme-toggle]').forEach(function (btn) {
      btn.setAttribute('aria-label', root.classList.contains('dark') ? 'Switch to light theme' : 'Switch to dark theme');
      btn.innerHTML = root.classList.contains('dark')
        ? '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="m4.93 4.93 1.41 1.41"></path><path d="m17.66 17.66 1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="m6.34 17.66-1.41 1.41"></path><path d="m19.07 4.93-1.41 1.41"></path></svg>'
        : '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path></svg>';
    });
  }

  syncButtons();
  document.querySelectorAll('[data-theme-toggle]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var next = root.classList.contains('dark') ? 'light' : 'dark';
      root.classList.toggle('dark', next === 'dark');
      localStorage.setItem('nf-theme', next);
      syncButtons();
    });
  });

  var menuToggle = document.querySelector('[data-menu-toggle]');
  var mobileNav = document.querySelector('[data-mobile-nav]');
  if (menuToggle && mobileNav) {
    menuToggle.addEventListener('click', function () {
      var open = mobileNav.classList.toggle('open');
      document.body.classList.toggle('menu-open', open);
      menuToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      menuToggle.innerHTML = open
        ? '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>'
        : '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 12h16"></path><path d="M4 6h16"></path><path d="M4 18h16"></path></svg>';
    });
  }

  var form = document.querySelector('[data-contact-form]');
  if (form) {
    var endpoint = form.getAttribute('action');
    var errorEl = form.querySelector('[data-form-error]');
    var fields = form.querySelector('[data-form-fields]');
    var success = form.querySelector('[data-form-success]');
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      if (errorEl) errorEl.textContent = '';
      var data = new FormData(form);
      var name = String(data.get('name') || '').trim();
      var email = String(data.get('email') || '').trim();
      var message = String(data.get('message') || '').trim();
      if (!name || name.length > 120) return errorEl && (errorEl.textContent = 'Please enter your name.');
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 200) return errorEl && (errorEl.textContent = 'Please enter a valid email.');
      if (message.length > 1000) return errorEl && (errorEl.textContent = 'Message is too long.');
      if (!endpoint || endpoint.indexOf('your-form-id') !== -1) {
        return errorEl && (errorEl.textContent = 'Replace the form action in contact.html with your Formspree or Basin endpoint before publishing.');
      }
      var submit = form.querySelector('button[type="submit"]');
      if (submit) { submit.disabled = true; submit.textContent = 'Sending…'; }
      fetch(endpoint, { method: 'POST', headers: { Accept: 'application/json' }, body: data })
        .then(function (res) { if (!res.ok) throw new Error('Submission failed'); form.reset(); if (fields) fields.classList.add('hidden'); if (success) success.classList.add('active'); })
        .catch(function () { if (errorEl) errorEl.textContent = 'Something went wrong. Please try again or use the scheduler.'; })
        .finally(function () { if (submit) { submit.disabled = false; submit.innerHTML = 'Send enquiry →'; } });
    });
  }
})();
