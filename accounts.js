// ============================================================
//  accounts.js — Accounts Page Logic
//  Full-Stack App (Student Build)
// ============================================================

document.addEventListener('DOMContentLoaded', () => {

  initNav();

  const tbody    = document.getElementById('accounts-table-body');
  const formCard = document.getElementById('account-form-card');
  let   accounts = JSON.parse(sessionStorage.getItem('accounts') || JSON.stringify([
    { name: 'Admin User', email: 'admin@example.com', role: 'admin', verified: true, password: 'admin123' },
  ]));
  let editingIndex = null;

  // ── Render Table ──
  function renderTable() {
    tbody.innerHTML = accounts.map((acc, i) => `
      <tr>
        <td>${acc.name}</td>
        <td>${acc.email}</td>
        <td>${acc.role.charAt(0).toUpperCase() + acc.role.slice(1)}</td>
        <td><span class="badge ${acc.verified ? 'bg-success' : 'bg-secondary'}">${acc.verified ? '✔' : '✗'}</span></td>
        <td>
          <button class="btn btn-outline-primary btn-sm me-1" onclick="editAccount(${i})">Edit</button>
          <button class="btn btn-outline-warning btn-sm me-1" onclick="resetPassword(${i})">Reset Password</button>
          <button class="btn btn-outline-danger btn-sm" onclick="deleteAccount(${i})">Delete</button>
        </td>
      </tr>
    `).join('');
  }

  // ── Show / Hide Form ──
  document.getElementById('btn-add-account').addEventListener('click', () => {
    editingIndex = null;
    document.getElementById('acc-firstname').value = '';
    document.getElementById('acc-lastname').value  = '';
    document.getElementById('acc-email').value     = '';
    document.getElementById('acc-password').value  = '';
    document.getElementById('acc-role-user').checked = true;
    document.getElementById('acc-verified').checked  = false;
    formCard.classList.remove('d-none');
  });

  document.getElementById('btn-cancel-account').addEventListener('click', () => {
    formCard.classList.add('d-none');
  });

  // ── Save Account ──
  document.getElementById('btn-save-account').addEventListener('click', () => {
    const firstName = document.getElementById('acc-firstname').value.trim();
    const lastName  = document.getElementById('acc-lastname').value.trim();
    const email     = document.getElementById('acc-email').value.trim();
    const password  = document.getElementById('acc-password').value;
    const role      = document.querySelector('input[name="acc-role"]:checked').value;
    const verified  = document.getElementById('acc-verified').checked;

    if (!firstName || !lastName || !email) {
      alert('First name, last name, and email are required.');
      return;
    }

    const acc = { name: `${firstName} ${lastName}`, email, password, role, verified };

    if (editingIndex !== null) {
      accounts[editingIndex] = acc;
    } else {
      accounts.push(acc);
    }

    sessionStorage.setItem('accounts', JSON.stringify(accounts));
    formCard.classList.add('d-none');
    renderTable();
  });

  // ── Edit / Delete / Reset Password ──
  window.editAccount = function(i) {
    editingIndex = i;
    const acc = accounts[i];
    const nameParts = acc.name.split(' ');
    document.getElementById('acc-firstname').value = nameParts[0] || '';
    document.getElementById('acc-lastname').value  = nameParts.slice(1).join(' ') || '';
    document.getElementById('acc-email').value     = acc.email;
    document.getElementById('acc-password').value  = acc.password || '';
    document.querySelector(`input[name="acc-role"][value="${acc.role}"]`).checked = true;
    document.getElementById('acc-verified').checked = acc.verified;
    formCard.classList.remove('d-none');
  };

  window.deleteAccount = function(i) {
    if (confirm('Delete this account?')) {
      accounts.splice(i, 1);
      sessionStorage.setItem('accounts', JSON.stringify(accounts));
      renderTable();
    }
  };

  window.resetPassword = function(i) {
    const newPass = prompt('Enter new password for ' + accounts[i].name + ':');
    if (newPass) {
      accounts[i].password = newPass;
      sessionStorage.setItem('accounts', JSON.stringify(accounts));
      alert('Password reset successfully.');
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
