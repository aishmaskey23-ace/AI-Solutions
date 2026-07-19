/* ============================================================
   AI-Solutions | main.js
   Author: Aish Maskey | CET333 Product Development
   ============================================================ */
'use strict';

/* ─── Custom Cursor ─────────────────────────────────────────── */
const cursorDot  = document.getElementById('cursor-dot');
const cursorRing = document.getElementById('cursor-ring');
if (cursorDot && cursorRing) {
  let mx=0, my=0, rx=0, ry=0;
  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    cursorDot.style.left = mx + 'px';
    cursorDot.style.top  = my + 'px';
  });
  (function loop() {
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    cursorRing.style.left = rx + 'px';
    cursorRing.style.top  = ry + 'px';
    requestAnimationFrame(loop);
  })();
  document.querySelectorAll('a,button,.btn,.service-card,.proj-card,.blog-card,.testi-card').forEach(el => {
    el.addEventListener('mouseenter', () => cursorRing.classList.add('cursor-grow'));
    el.addEventListener('mouseleave', () => cursorRing.classList.remove('cursor-grow'));
  });
}

/* ─── Scroll Progress ───────────────────────────────────────── */
const progressBar = document.getElementById('scroll-progress');
window.addEventListener('scroll', () => {
  if (progressBar) {
    const pct = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
    progressBar.style.width = pct + '%';
  }
}, { passive: true });

/* ─── Back To Top ───────────────────────────────────────────── */
const btt = document.getElementById('back-to-top');
if (btt) {
  window.addEventListener('scroll', () => btt.classList.toggle('visible', window.scrollY > 500), { passive: true });
  btt.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

/* ─── Navbar Scroll Effect ──────────────────────────────────── */
const navbar = document.getElementById('navbar');
if (navbar) {
  window.addEventListener('scroll', () => navbar.classList.toggle('scrolled', window.scrollY > 20), { passive: true });
}

/* ─── Mobile Menu ───────────────────────────────────────────── */
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('nav-links');
if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('mobile-open');
  });
  navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('mobile-open');
  }));
}

/* ─── Active Nav Link ───────────────────────────────────────── */
const currentFile = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(a => {
  if (a.getAttribute('href') === currentFile || (currentFile === '' && a.getAttribute('href') === 'index.html')) {
    a.classList.add('active');
  }
});

/* ─── Scroll Reveal ─────────────────────────────────────────── */
const revealObs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

/* ─── Animated Counters ─────────────────────────────────────── */
function animateCount(el, target, suffix, duration) {
  const start = performance.now();
  (function step(now) {
    const p = Math.min((now - start) / duration, 1);
    const ease = 1 - Math.pow(1 - p, 3);
    el.textContent = Math.floor(ease * target).toLocaleString() + suffix;
    if (p < 1) requestAnimationFrame(step);
  })(performance.now());
}
const counterObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      animateCount(e.target, +e.target.dataset.target, e.target.dataset.suffix || '', 2000);
      counterObs.unobserve(e.target);
    }
  });
}, { threshold: 0.5 });
document.querySelectorAll('[data-counter]').forEach(el => counterObs.observe(el));

/* ─── Typing Effect ─────────────────────────────────────────── */
const typingEl = document.getElementById('typing-text');
if (typingEl) {
  const words = ['AI Virtual Assistants','Smart Automation','Intelligent Chatbots','AI Analytics','Digital Transformation'];
  let wi = 0, ci = 0, del = false;
  (function type() {
    const w = words[wi];
    typingEl.textContent = del ? w.slice(0, --ci) : w.slice(0, ++ci);
    if (!del && ci === w.length) { del = true; setTimeout(type, 2000); return; }
    if (del && ci === 0) { del = false; wi = (wi + 1) % words.length; }
    setTimeout(type, del ? 45 : 80);
  })();
}

/* ─── Testimonials Slider ───────────────────────────────────── */
const track = document.getElementById('testi-track');
if (track) {
  let cur = 0;
  const cards = track.querySelectorAll('.testi-card');
  const dots  = document.querySelectorAll('.sdot');
  const per = window.innerWidth < 768 ? 1 : window.innerWidth < 1100 ? 2 : 3;
  const max = Math.max(0, cards.length - per);

  function goSlide(i) {
    cur = Math.max(0, Math.min(i, max));
    track.style.transform = `translateX(-${cur * (100 / per)}%)`;
    dots.forEach((d, j) => d.classList.toggle('active', j === cur));
  }
  document.getElementById('s-prev')?.addEventListener('click', () => goSlide(cur - 1));
  document.getElementById('s-next')?.addEventListener('click', () => goSlide(cur + 1));
  dots.forEach((d, i) => d.addEventListener('click', () => goSlide(i)));

  let ap = setInterval(() => goSlide(cur < max ? cur + 1 : 0), 4000);
  track.addEventListener('mouseenter', () => clearInterval(ap));
  track.addEventListener('mouseleave', () => ap = setInterval(() => goSlide(cur < max ? cur + 1 : 0), 4000));
  goSlide(0);
}

/* ─── Project Filter ────────────────────────────────────────── */
document.querySelectorAll('.ftab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.ftab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    const f = tab.dataset.filter;
    document.querySelectorAll('.proj-card[data-cat]').forEach(c => {
      const show = f === 'all' || c.dataset.cat === f;
      c.style.opacity = '0'; c.style.transform = 'scale(0.9)';
      setTimeout(() => {
        c.style.display = show ? '' : 'none';
        if (show) setTimeout(() => { c.style.opacity = '1'; c.style.transform = ''; }, 30);
      }, 200);
    });
  });
});

/* ─── Blog Search & Filter ──────────────────────────────────── */
const blogSearch = document.getElementById('blog-search');
if (blogSearch) {
  blogSearch.addEventListener('input', () => {
    const q = blogSearch.value.toLowerCase();
    document.querySelectorAll('.blog-card').forEach(c => {
      c.style.display = c.textContent.toLowerCase().includes(q) ? '' : 'none';
    });
  });
}
document.querySelectorAll('.blog-ftab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.blog-ftab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    const f = tab.dataset.filter;
    document.querySelectorAll('.blog-card').forEach(c => {
      c.style.display = (f === 'all' || c.dataset.cat === f) ? '' : 'none';
    });
  });
});

/* ─── Gallery Lightbox ──────────────────────────────────────── */
document.querySelectorAll('.gallery-item').forEach(item => {
  item.addEventListener('click', () => {
    const emoji = item.querySelector('.gallery-thumb')?.textContent.trim() || '🖼️';
    const lb = document.createElement('div');
    lb.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.92);z-index:3000;display:flex;align-items:center;justify-content:center;cursor:pointer;animation:fadeUp .3s ease;';
    lb.innerHTML = `<div style="text-align:center"><div style="font-size:10rem;animation:coreFloat 3s ease-in-out infinite">${emoji}</div><p style="color:var(--text-muted);margin-top:24px;font-size:.9rem">Click anywhere to close</p></div>`;
    lb.addEventListener('click', () => lb.remove());
    document.body.appendChild(lb);
  });
});

/* ─── Project Modal ─────────────────────────────────────────── */
const projModal = document.getElementById('proj-modal');
if (projModal) {
  document.querySelectorAll('[data-open-modal]').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      const card = btn.closest('.proj-card');
      document.getElementById('m-title').textContent  = card?.querySelector('h3')?.textContent || '';
      document.getElementById('m-desc').textContent   = card?.querySelector('p')?.textContent  || '';
      document.getElementById('m-cat').textContent    = card?.querySelector('.proj-cat')?.textContent || '';
      projModal.classList.add('open');
    });
  });
  document.getElementById('m-close')?.addEventListener('click', () => projModal.classList.remove('open'));
  projModal.addEventListener('click', e => { if (e.target === projModal) projModal.classList.remove('open'); });
}

/* ─── AI Chatbot ────────────────────────────────────────────── */
const cbToggle = document.getElementById('cb-toggle');
const cbWin    = document.getElementById('cb-win');
const cbClose  = document.getElementById('cb-close');
const cbMsgs   = document.getElementById('cb-msgs');
const cbInput  = document.getElementById('cb-input');
const cbSend   = document.getElementById('cb-send');

const RESPONSES = {
  hello:    "Hello! 👋 I'm ARIA, your AI-Solutions assistant. How can I help you today?",
  hi:       "Hi there! 👋 Welcome to AI-Solutions. Ask me anything!",
  hey:      "Hey! 😊 I'm ARIA. How can I assist you today?",
  services: "We offer 6 core AI services:\n• 🤖 AI Virtual Assistants\n• ⚡ AI Automation\n• 💬 Chatbot Development\n• 📊 AI Analytics\n• 🧠 Smart Business Solutions\n• 🔬 AI Prototyping\n\nWhich interests you?",
  pricing:  "Our pricing is tailored to each client's needs. Contact us at info@ai-solutions.com or use our Contact page for a custom quote!",
  contact:  "You can reach us at:\n📧 info@ai-solutions.com\n📞 +44 191 000 0000\n📍 Sunderland, UK\n\nOr visit our Contact page to send a direct message!",
  chatbot:  "Our AI Chatbot service builds NLP-powered bots for websites, apps, and messaging platforms — handling thousands of queries at once, 24/7.",
  analytics:"Our AI Analytics platform delivers real-time dashboards, predictive models, and anomaly detection to drive smarter business decisions.",
  automation:"Our AI Automation removes repetitive workflows, reduces errors, and frees your team for high-value tasks — boosting productivity by up to 60%.",
  assistant:"Our AI Virtual Assistants handle customer queries, bookings, and support around the clock, integrated with your existing CRM and tools.",
  location: "We're based in Sunderland, UK, and serve clients globally. Remote-first delivery model! 🌍",
  team:     "We're a passionate team of AI engineers, data scientists, UX designers, and business strategists — all dedicated to delivering measurable AI outcomes.",
  demo:     "Absolutely! Book a free discovery call via our Contact page and we'll show you exactly what we can build for your business. 🚀",
  default:  "Thanks for your message! I'm ARIA. You can ask me about our AI services, pricing, or how to get in touch. For complex queries, please use our Contact page and a human will respond within 24 hours. 😊"
};

function botReply(input) {
  const l = input.toLowerCase();
  for (const [key, reply] of Object.entries(RESPONSES)) {
    if (l.includes(key)) return reply;
  }
  return RESPONSES.default;
}

function addMsg(text, who) {
  const b = document.createElement('div');
  b.className = `msg-bubble ${who}`;
  b.textContent = text;
  cbMsgs?.appendChild(b);
  cbMsgs?.scrollTo({ top: cbMsgs.scrollHeight, behavior: 'smooth' });
}

function addMsgHTML(html, who) {
  const b = document.createElement('div');
  b.className = `msg-bubble ${who}`;
  b.innerHTML = html;
  cbMsgs?.appendChild(b);
  cbMsgs?.scrollTo({ top: cbMsgs.scrollHeight, behavior: 'smooth' });
}

const ESCALATE_HTML = `🙋 It looks like you need personalised assistance!<br><br>
ARIA has detected your query requires a human touch. Our specialists are ready to help.<br><br>
➡ <a href="${window.location.pathname.includes('/pages/') ? 'contact.html' : 'pages/contact.html'}" style="color:#00bcd4;font-weight:bold;text-decoration:underline;">Visit our Contact Us page</a> to:<br>
• Submit your detailed enquiry<br>
• Book a free discovery call<br>
• Reach our team directly<br><br>
📧 <a href="mailto:info@ai-solutions.com" style="color:#00bcd4;">info@ai-solutions.com</a><br>
📱 <a href="tel:+441910000000" style="color:#00bcd4;">+44 191 000 0000</a><br><br>
We respond within 24 hours on business days. 😊`;

async function handleSend() {
  const txt = cbInput?.value.trim();
  if (!txt) return;
  cbInput.value = '';
  addMsg(txt, 'user');
  // typing indicator
  const typing = document.createElement('div');
  typing.className = 'msg-bubble bot typing-indicator';
  typing.innerHTML = '<div class="tdot"></div><div class="tdot"></div><div class="tdot"></div>';
  cbMsgs?.appendChild(typing);
  cbMsgs?.scrollTo({ top: cbMsgs.scrollHeight, behavior: 'smooth' });
  await new Promise(r => setTimeout(r, 700 + Math.random() * 500));
  typing.remove();
  const reply = botReply(txt);
  if (reply === '__ESCALATE__') {
    addMsgHTML(ESCALATE_HTML, 'bot');
  } else {
    addMsg(reply, 'bot');
  }
}

cbToggle?.addEventListener('click', () => {
  cbWin?.classList.toggle('open');
  if (cbWin?.classList.contains('open') && cbMsgs?.children.length === 0) {
    setTimeout(() => addMsg("👋 Hi! I'm ARIA, your AI-Solutions assistant. How can I help you today?", 'bot'), 300);
  }
});
cbClose?.addEventListener('click', () => cbWin?.classList.remove('open'));
cbSend?.addEventListener('click', handleSend);
cbInput?.addEventListener('keypress', e => { if (e.key === 'Enter') handleSend(); });

/* ─── Contact Form (fetch to PHP) ──────────────────────────── */
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', async e => {
    e.preventDefault();
    const btn = contactForm.querySelector('button[type="submit"]');
    const msg = document.getElementById('form-msg');
    btn.disabled = true;
    btn.textContent = 'Sending…';
    try {
      const res  = await fetch('../php/contact.php', { method: 'POST', body: new FormData(contactForm) });
      const data = await res.json();
      msg.className = 'form-msg ' + (data.success ? 'success' : 'error');
      msg.textContent = (data.success ? '✅ ' : '❌ ') + data.message;
      if (data.success) contactForm.reset();
    } catch {
      msg.className = 'form-msg error';
      msg.textContent = '❌ Something went wrong. Please try again.';
    } finally {
      btn.disabled = false;
      btn.textContent = 'Send Message';
    }
  });
}
