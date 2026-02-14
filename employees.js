// ============================================================
//  employees.js — Employees Page Logic
//  Full-Stack App (Student Build)
// ============================================================

document.addEventListener('DOMContentLoaded', () => {

  initNav();

  const tbody       = document.getElementById('employees-table-body');
  const formCard    = document.getElementById('employee-form-card');
  let   employees   = JSON.parse(sessionStorage.getItem('employees') || '[]');
  let   editingIndex = null;

  // ── Render Table ──
  function renderTable() {
    if (employees.length === 0) {
      tbody.innerHTML = '<tr><td colspan="5" class="text-center text-muted">No employees.</td></tr>';
      return;
    }
    tbody.innerHTML = employees.map((emp, i) => `
      <tr>
        <td>${emp.id}</td>
        <td>${emp.name}</td>
        <td>${emp.position}</td>
        <td>${emp.dept}</td>
        <td>
          <button class="btn btn-outline-primary btn-sm me-1" onclick="editEmployee(${i})">Edit</button>
          <button class="btn btn-outline-danger btn-sm" onclick="deleteEmployee(${i})">Delete</button>
        </td>
      </tr>
    `).join('');
  }

  // ── Show / Hide Form ──
  document.getElementById('btn-add-employee').addEventListener('click', () => {
    editingIndex = null;
    document.getElementById('emp-id').value        = '';
    document.getElementById('emp-email').value     = '';
    document.getElementById('emp-position').value  = '';
    document.getElementById('emp-hire-date').value = '';
    formCard.classList.remove('d-none');
  });

  document.getElementById('btn-cancel-employee').addEventListener('click', () => {
    formCard.classList.add('d-none');
  });

  // ── Save Employee ──
  document.getElementById('btn-save-employee').addEventListener('click', () => {
    const emp = {
      id:       document.getElementById('emp-id').value.trim(),
      name:     document.getElementById('emp-email').value.trim(),
      position: document.getElementById('emp-position').value.trim(),
      dept:     document.getElementById('emp-dept').value,
      hireDate: document.getElementById('emp-hire-date').value,
    };

    if (!emp.id || !emp.name || !emp.position) {
      alert('ID, Email, and Position are required.');
      return;
    }

    if (editingIndex !== null) {
      employees[editingIndex] = emp;
    } else {
      employees.push(emp);
    }

    sessionStorage.setItem('employees', JSON.stringify(employees));
    formCard.classList.add('d-none');
    renderTable();
  });

  // ── Edit / Delete (global so onclick in table can call them) ──
  window.editEmployee = function(i) {
    editingIndex = i;
    const emp = employees[i];
    document.getElementById('emp-id').value        = emp.id;
    document.getElementById('emp-email').value     = emp.name;
    document.getElementById('emp-position').value  = emp.position;
    document.getElementById('emp-dept').value      = emp.dept;
    document.getElementById('emp-hire-date').value = emp.hireDate;
    formCard.classList.remove('d-none');
  };

  window.deleteEmployee = function(i) {
    if (confirm('Delete this employee?')) {
      employees.splice(i, 1);
      sessionStorage.setItem('employees', JSON.stringify(employees));
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
