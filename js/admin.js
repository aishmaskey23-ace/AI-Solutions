/* ============================================================
   AI-Solutions | Admin Dashboard JavaScript
   Author: Aish Maskey | CET333 Product Development
   ============================================================ */
'use strict';

/* ─── View Inquiry Modal ────────────────────────────────────── */
function viewInquiry(data) {
  const modal = document.getElementById('view-modal');
  const body  = document.getElementById('view-modal-body');
  if (!modal || !body) return;

  const fields = [
    ['Full Name',         data.full_name],
    ['Email',             data.email],
    ['Phone',             data.phone],
    ['Company',           data.company],
    ['Country',           data.country],
    ['Job Title',         data.job_title],
    ['Service Interest',  data.service_interest || '—'],
    ['Status',            data.status],
    ['Submitted',         data.created_at],
    ['Message',           data.job_details],
  ];

  body.innerHTML = fields.map(([label, val]) =>
    `<div class="detail-row">
       <div class="detail-label">${escHtml(label)}</div>
       <div class="detail-value">${escHtml(String(val || '—'))}</div>
     </div>`
  ).join('');

  modal.classList.add('open');

  // Mark as read silently via fetch if still new
  if (data.status === 'new') {
    fetch(`dashboard.php?read=${encodeURIComponent(data.id)}`, { method: 'GET' })
      .catch(() => {});
    // Update badge in row without reload
    const badge = document.querySelector(`[data-id="${data.id}"] .status-badge`);
    if (badge) { badge.className = 'status-badge status-read'; badge.textContent = 'Read'; }
  }
}

/* Close modal */
function closeViewModal() {
  document.getElementById('view-modal')?.classList.remove('open');
}

document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('view-modal');
  if (modal) {
    modal.addEventListener('click', e => { if (e.target === modal) closeViewModal(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeViewModal(); });
  }
});

/* ─── Confirm Delete ────────────────────────────────────────── */
function confirmDelete(id, name) {
  const ok = confirm(`⚠️ Delete inquiry from "${name}"?\n\nThis action cannot be undone.`);
  if (ok) window.location.href = `dashboard.php?delete=${encodeURIComponent(id)}`;
}

/* ─── Live Table Search (client-side filter) ────────────────── */
function initTableSearch(inputId, tableId) {
  const input = document.getElementById(inputId);
  const tbody = document.querySelector(`#${tableId} tbody`);
  if (!input || !tbody) return;

  input.addEventListener('input', () => {
    const q = input.value.toLowerCase().trim();
    Array.from(tbody.rows).forEach(row => {
      row.style.display = row.textContent.toLowerCase().includes(q) ? '' : 'none';
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initTableSearch('live-search', 'inquiries-table');
});

/* ─── Chart Initialiser ─────────────────────────────────────── */
function initInquiryChart(canvasId, labels, values) {
  const canvas = document.getElementById(canvasId);
  if (!canvas || typeof Chart === 'undefined') return;

  const gradient = canvas.getContext('2d').createLinearGradient(0, 0, 0, 260);
  gradient.addColorStop(0,   'rgba(0,212,255,0.35)');
  gradient.addColorStop(1,   'rgba(0,212,255,0.02)');

  new Chart(canvas, {
    type: 'bar',
    data: {
      labels,
      datasets: [{
        label: 'Inquiries',
        data:  values,
        backgroundColor: gradient,
        borderColor:     'rgba(0,212,255,0.85)',
        borderWidth:     2,
        borderRadius:    8,
        borderSkipped:   false,
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: 'rgba(8,15,30,0.95)',
          borderColor:     'rgba(0,212,255,0.3)',
          borderWidth:     1,
          titleColor:      '#f0f4ff',
          bodyColor:       '#a8b4cc',
          padding:         12,
          callbacks: {
            title:  items => items[0].label,
            label:  item  => ` ${item.parsed.y} inquiries`,
          }
        }
      },
      scales: {
        x: {
          grid:  { color: 'rgba(255,255,255,0.05)', drawBorder: false },
          ticks: { color: '#a8b4cc', font: { size: 12 } }
        },
        y: {
          grid:       { color: 'rgba(255,255,255,0.05)', drawBorder: false },
          ticks:      { color: '#a8b4cc', stepSize: 1, font: { size: 12 } },
          beginAtZero: true
        }
      }
    }
  });
}

/* ─── Utility ───────────────────────────────────────────────── */
function escHtml(str) {
  return String(str)
    .replace(/&/g,  '&amp;')
    .replace(/</g,  '&lt;')
    .replace(/>/g,  '&gt;')
    .replace(/"/g,  '&quot;')
    .replace(/'/g,  '&#039;');
}

/* ─── Auto-dismiss alerts ───────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.admin-alert[data-auto-dismiss]').forEach(el => {
    setTimeout(() => {
      el.style.opacity = '0';
      setTimeout(() => el.remove(), 400);
    }, 4000);
  });
});
