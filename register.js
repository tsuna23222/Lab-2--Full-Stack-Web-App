// ============================================================
//  register.js — Register Page Logic
//  Full-Stack App (Student Build)
// ============================================================

document.addEventListener('DOMContentLoaded', () => {

  document.getElementById('btn-cancel').addEventListener('click', () => {
    window.location.href = 'index.html';
  });

  document.getElementById('btn-signup').addEventListener('click', () => {
    const firstName = document.getElementById('reg-firstname').value.trim();
    const lastName  = document.getElementById('reg-lastname').value.trim();
    const email     = document.getElementById('reg-email').value.trim();
    const password  = document.getElementById('reg-password').value;
    const errEl     = document.getElementById('reg-error');

    // Validation: all fields required
    if (!firstName || !lastName || !email || !password) {
      errEl.textContent = 'All fields are required.';
      errEl.classList.remove('d-none');
      return;
    }

    // Validation: basic email format
    if (!email.includes('@')) {
      errEl.textContent = 'Please enter a valid email address.';
      errEl.classList.remove('d-none');
      return;
    }

    errEl.classList.add('d-none');

    // Save pending user to sessionStorage so verify-email.html can read it
    const pendingUser = {
      name:     `${firstName} ${lastName}`,
      email,
      password,
      role:     'user',
      verified: false,
    };
    sessionStorage.setItem('pendingUser', JSON.stringify(pendingUser));

    // Navigate to verify email page
    window.location.href = 'verify-email.html';
  });

});
