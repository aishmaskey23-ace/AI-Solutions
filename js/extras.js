/* ============================================================
   AI-Solutions | extras.js
   Preloader · Cookie Banner · Dark/Light Mode · Toast Notifications
   Announcement Bar · Progress Ring · Partners Scroll · Tooltips
   Author: Aish Maskey | CET333 Product Development
   ============================================================ */
'use strict';

/* ─── 1. PAGE PRELOADER ─────────────────────────────────────── */
(function initPreloader() {
  const preloader = document.getElementById('preloader');
  if (!preloader) return;
  // Hide after page fully loaded (min 1.8s for animation)
  const hideAt = Date.now() + 1800;
  window.addEventListener('load', () => {
    const delay = Math.max(0, hideAt - Date.now());
    setTimeout(() => preloader.classList.add('hidden'), delay);
  });
})();

/* ─── 2. COOKIE CONSENT ─────────────────────────────────────── */
(function initCookie() {
  const banner  = document.getElementById('cookie-banner');
  const accept  = document.getElementById('cookie-accept');
  const decline = document.getElementById('cookie-decline');
  if (!banner) return;

  // Show every time the page loads (no longer suppressed by prior consent)
  setTimeout(() => banner.classList.add('show'), 2000);

  accept?.addEventListener('click', () => {
    localStorage.setItem('ai_cookie_consent', 'accepted');
    banner.classList.remove('show');
    showToast('✅ Preferences saved. Thank you!', 'success');
  });
  decline?.addEventListener('click', () => {
    localStorage.setItem('ai_cookie_consent', 'declined');
    banner.classList.remove('show');
  });
})();

/* ─── 3. DARK / LIGHT MODE TOGGLE ──────────────────────────── */
(function initThemeToggle() {
  const toggle = document.getElementById('theme-toggle');
  if (!toggle) return;
  const thumb = toggle.querySelector('.theme-toggle-thumb');

  // Load saved preference
  const saved = localStorage.getItem('ai_theme');
  if (saved === 'light') applyLight();

  toggle.addEventListener('click', () => {
    if (document.body.classList.contains('light-mode')) {
      document.body.classList.remove('light-mode');
      toggle.classList.remove('light');
      if (thumb) thumb.textContent = '🌙';
      localStorage.setItem('ai_theme', 'dark');
      showToast('🌙 Dark mode on', 'info');
    } else {
      applyLight();
      showToast('☀️ Light mode on', 'info');
    }
  });

  function applyLight() {
    document.body.classList.add('light-mode');
    toggle.classList.add('light');
    if (thumb) thumb.textContent = '☀️';
    localStorage.setItem('ai_theme', 'light');
  }
})();

/* ─── 4. ANNOUNCEMENT BAR ───────────────────────────────────── */
(function initAnnounceBar() {
  const bar   = document.getElementById('announce-bar');
  const close = document.getElementById('announce-close');
  if (!bar) return;

  // Don't show if dismissed in this session
  if (sessionStorage.getItem('ai_announce_closed')) {
    bar.classList.add('hidden');
    document.body.classList.remove('has-announce-bar');
    return;
  }

  document.body.classList.add('has-announce-bar');

  close?.addEventListener('click', () => {
    bar.classList.add('hidden');
    document.body.classList.remove('has-announce-bar');
    sessionStorage.setItem('ai_announce_closed', '1');
  });
})();

/* ─── 5. TOAST NOTIFICATIONS ────────────────────────────────── */
function showToast(message, type = 'info', duration = 3500) {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const icons = { success: '✅', error: '❌', info: 'ℹ️', warning: '⚠️' };

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `
    <span class="toast-icon">${icons[type] || 'ℹ️'}</span>
    <span>${message}</span>
    <button class="toast-close" aria-label="Close">✕</button>
  `;

  toast.querySelector('.toast-close').addEventListener('click', () => removeToast(toast));
  container.appendChild(toast);
  setTimeout(() => removeToast(toast), duration);
}

function removeToast(toast) {
  toast.style.opacity = '0';
  toast.style.transform = 'translateX(30px)';
  toast.style.transition = 'opacity 0.3s, transform 0.3s';
  setTimeout(() => toast.remove(), 300);
}

// Make globally available
window.showToast = showToast;

/* ─── 6. SCROLL PROGRESS RING (replaces back-to-top) ────────── */
(function initProgressRing() {
  const wrap = document.getElementById('progress-ring-wrap');
  const fill = document.getElementById('ring-fill');
  const btn  = document.getElementById('ring-btn');
  if (!wrap || !fill) return;

  const radius = 20;
  const circ   = 2 * Math.PI * radius;
  fill.style.strokeDasharray  = circ;
  fill.style.strokeDashoffset = circ;

  window.addEventListener('scroll', () => {
    const pct    = window.scrollY / (document.body.scrollHeight - window.innerHeight);
    const offset = circ - pct * circ;
    fill.style.strokeDashoffset = offset;
    wrap.classList.toggle('visible', window.scrollY > 300);
  }, { passive: true });

  btn?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
})();

/* ─── 7. PARTNERS AUTO-SCROLL (duplicate for infinite) ──────── */
(function initPartners() {
  const track = document.querySelector('.partners-track');
  if (!track) return;
  // Duplicate children for seamless infinite scroll
  const clone = track.cloneNode(true);
  track.parentNode.appendChild(clone);
})();

/* ─── 8. SMOOTH NAV ACTIVE STATE ON SCROLL ──────────────────── */
(function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  if (!sections.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const id = e.target.id;
        document.querySelectorAll('.nav-links a').forEach(a => {
          a.classList.toggle('active', a.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(s => observer.observe(s));
})();

/* ─── 9. IMAGE LAZY LOADING ─────────────────────────────────── */
(function initLazyLoad() {
  if ('IntersectionObserver' in window) {
    const lazy = document.querySelectorAll('img[data-src]');
    const obs  = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const img = e.target;
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          obs.unobserve(img);
        }
      });
    });
    lazy.forEach(img => obs.observe(img));
  }
})();

/* ─── 10. KEYBOARD NAVIGATION (Accessibility) ───────────────── */
document.addEventListener('keydown', e => {
  // Close modals with Escape
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal-overlay.open, .view-modal-overlay.open').forEach(m => {
      m.classList.remove('open');
    });
    document.getElementById('cb-win')?.classList.remove('open');
  }
});

/* ─── 11. FORM INPUT ANIMATION ──────────────────────────────── */
document.querySelectorAll('.form-group input, .form-group textarea, .form-group select').forEach(input => {
  input.addEventListener('focus', () => {
    input.closest('.form-group')?.classList.add('focused');
  });
  input.addEventListener('blur', () => {
    input.closest('.form-group')?.classList.remove('focused');
    if (input.value.trim()) input.closest('.form-group')?.classList.add('filled');
    else input.closest('.form-group')?.classList.remove('filled');
  });
});

/* ─── 12. PAGE TRANSITION ───────────────────────────────────── */
(function initPageTransitions() {
  // Fade-out on internal link click
  document.querySelectorAll('a[href]').forEach(link => {
    const href = link.getAttribute('href');
    if (!href || href.startsWith('#') || href.startsWith('mailto') || href.startsWith('tel') || link.target === '_blank') return;
    link.addEventListener('click', e => {
      e.preventDefault();
      document.body.style.opacity = '0';
      document.body.style.transition = 'opacity 0.25s ease';
      setTimeout(() => { window.location.href = href; }, 250);
    });
  });
  // Fade-in on load
  document.body.style.opacity = '0';
  window.addEventListener('load', () => {
    document.body.style.transition = 'opacity 0.4s ease';
    document.body.style.opacity = '1';
  });
})();

/* ─── 13. ANIMATE NUMBERS ON SCROLL ─────────────────────────── */
// (already handled in main.js — this extends it for any new counters)
document.querySelectorAll('[data-count]').forEach(el => {
  const obs = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      const target = +el.dataset.count;
      const suffix = el.dataset.suffix || '';
      let current = 0;
      const step  = target / 60;
      const timer = setInterval(() => {
        current = Math.min(current + step, target);
        el.textContent = Math.floor(current).toLocaleString() + suffix;
        if (current >= target) clearInterval(timer);
      }, 25);
      obs.unobserve(el);
    }
  }, { threshold: 0.5 });
  obs.observe(el);
});
