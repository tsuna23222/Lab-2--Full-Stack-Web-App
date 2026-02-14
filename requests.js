// ============================================================
//  requests.js — Requests Page Logic
//  Full-Stack App (Student Build)
// ============================================================

document.addEventListener('DOMContentLoaded', () => {

  initNav();

  const emptyMsg  = document.getElementById('requests-empty-msg');
  const table     = document.getElementById('requests-table');
  const tbody     = document.getElementById('requests-table-body');
  const modal     = new bootstrap.Modal(document.getElementById('requestModal'));
  let   requests  = JSON.parse(sessionStorage.getItem('requests') || '[]');

  // ── Render Table ──
  function renderTable() {
    if (requests.length === 0) {
      emptyMsg.classList.remove('d-none');
      table.classList.add('d-none');
      return;
    }
    emptyMsg.classList.add('d-none');
    table.classList.remove('d-none');
    tbody.innerHTML = requests.map((req, i) => `
      <tr>
        <td>${req.type}</td>
        <td>${req.items.map(it => `${it.name} (${it.qty})`).join(', ')}</td>
        <td><span class="badge bg-warning text-dark">${req.status}</span></td>
        <td>
          <button class="btn btn-outline-danger btn-sm" onclick="deleteRequest(${i})">Delete</button>
        </td>
      </tr>
    `).join('');
  }

  // ── Open Modal ──
  document.getElementById('btn-new-request').addEventListener('click', () => {
    // Reset modal fields
    document.getElementById('req-type').value = 'Equipment';
    document.getElementById('req-items-list').innerHTML = `
      <div class="req-item-row d-flex gap-2 mb-2">
        <input type="text" class="form-control" placeholder="Item name" />
        <input type="number" class="form-control" style="width:70px" value="1" min="1" />
        <button class="btn btn-outline-danger btn-sm remove-item">x</button>
      </div>
    `;
    modal.show();
  });

  // ── Add Item Row ──
  document.getElementById('btn-add-req-item').addEventListener('click', () => {
    const row = document.createElement('div');
    row.className = 'req-item-row d-flex gap-2 mb-2';
    row.innerHTML = `
      <input type="text" class="form-control" placeholder="Item name" />
      <input type="number" class="form-control" style="width:70px" value="1" min="1" />
      <button class="btn btn-outline-danger btn-sm remove-item">x</button>
    `;
    document.getElementById('req-items-list').appendChild(row);
  });

  // ── Remove Item Row (event delegation) ──
  document.getElementById('req-items-list').addEventListener('click', (e) => {
    if (e.target.classList.contains('remove-item')) {
      const rows = document.querySelectorAll('.req-item-row');
      if (rows.length > 1) e.target.closest('.req-item-row').remove();
    }
  });

  // ── Submit Request ──
  document.getElementById('btn-submit-request').addEventListener('click', () => {
    const type  = document.getElementById('req-type').value;
    const rows  = document.querySelectorAll('.req-item-row');
    const items = [];

    rows.forEach(row => {
      const name = row.querySelector('input[type="text"]').value.trim();
      const qty  = row.querySelector('input[type="number"]').value;
      if (name) items.push({ name, qty });
    });

    if (items.length === 0) {
      alert('Please add at least one item.');
      return;
    }

    requests.push({ type, items, status: 'Pending' });
    sessionStorage.setItem('requests', JSON.stringify(requests));
    modal.hide();
    renderTable();
  });

  // ── Delete Request ──
  window.deleteRequest = function(i) {
    if (confirm('Delete this request?')) {
      requests.splice(i, 1);
      sessionStorage.setItem('requests', JSON.stringify(requests));
      renderTable();
    }
  };

  // ── Logout ──
  document.getElementById('btn-logout').addEventListener('click', (e) => {
    e.preventDefault();
    sessionStorage.removeItem('currentUser');
    window.location.href = 'index.html';
  });

  renderTable();
});
