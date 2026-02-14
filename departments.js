// ============================================================
//  departments.js — Departments Page Logic
//  Full-Stack App (Student Build)
// ============================================================

document.addEventListener('DOMContentLoaded', () => {

  initNav();

  const tbody    = document.getElementById('departments-table-body');
  const formCard = document.getElementById('dept-form-card');
  let   departments  = JSON.parse(sessionStorage.getItem('departments') || JSON.stringify([
    { name: 'Engineering', description: 'Software team' },
    { name: 'HR',          description: 'Human Resources' },
  ]));
  let editingIndex = null;

  // ── Render Table ──
  function renderTable() {
    tbody.innerHTML = departments.map((dept, i) => `
      <tr>
        <td>${dept.name}</td>
        <td>${dept.description}</td>
        <td>
          <button class="btn btn-outline-primary btn-sm me-1" onclick="editDept(${i})">Edit</button>
          <button class="btn btn-outline-danger btn-sm" onclick="deleteDept(${i})">Delete</button>
        </td>
      </tr>
    `).join('');
  }

  // ── Show / Hide Form ──
  document.getElementById('btn-add-dept').addEventListener('click', () => {
    editingIndex = null;
    document.getElementById('dept-name').value        = '';
    document.getElementById('dept-description').value = '';
    formCard.classList.remove('d-none');
  });

  document.getElementById('btn-cancel-dept').addEventListener('click', () => {
    formCard.classList.add('d-none');
  });

  // ── Save Department ──
  document.getElementById('btn-save-dept').addEventListener('click', () => {
    const dept = {
      name:        document.getElementById('dept-name').value.trim(),
      description: document.getElementById('dept-description').value.trim(),
    };

    if (!dept.name) {
      alert('Department name is required.');
      return;
    }

    if (editingIndex !== null) {
      departments[editingIndex] = dept;
    } else {
      departments.push(dept);
    }

    sessionStorage.setItem('departments', JSON.stringify(departments));
    formCard.classList.add('d-none');
    renderTable();
  });

  // ── Edit / Delete ──
  window.editDept = function(i) {
    editingIndex = i;
    document.getElementById('dept-name').value        = departments[i].name;
    document.getElementById('dept-description').value = departments[i].description;
    formCard.classList.remove('d-none');
  };

  window.deleteDept = function(i) {
    if (confirm('Delete this department?')) {
      departments.splice(i, 1);
      sessionStorage.setItem('departments', JSON.stringify(departments));
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
