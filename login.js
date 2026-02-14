// ============================================================
//  login.js — Login Page Logic
//  Full-Stack App (Student Build)
// ============================================================

document.addEventListener('DOMContentLoaded', () => {

  // Show verified banner if coming from verify-email page
  const pendingUser = JSON.parse(sessionStorage.getItem('pendingUser') || 'null');
  if (pendingUser && pendingUser.verified) {
    document.getElementById('verify-banner').classList.remove('d-none');
  }

  // Built-in admin account for testing
  const ADMIN = {
    name:     'Admin User',
    email:    'admin@example.com',
    password: 'admin123',
    role:     'admin',
    verified: true,
  };

  document.getElementById('btn-login').addEventListener('click', () => {
    const email    = document.getElementById('login-email').value.trim();
    const password = document.getElementById('login-password').value;
    const errEl    = document.getElementById('login-error');

    // Validation
    if (!email || !password) {
      errEl.textContent = 'Email and password are required.';
      errEl.classList.remove('d-none');
      return;
    }

    let matchedUser = null;

    // Check built-in admin
    if (email === ADMIN.email && password === ADMIN.password) {
      matchedUser = ADMIN;
    }
    // Check registered user from sessionStorage
    else if (pendingUser && pendingUser.email === email && pendingUser.password === password) {
      if (!pendingUser.verified) {
        errEl.textContent = 'Please verify your email before logging in.';
        errEl.classList.remove('d-none');
        return;
      }
      matchedUser = pendingUser;
    }

    if (!matchedUser) {
      errEl.textContent = 'Invalid email or password.';
      errEl.classList.remove('d-none');
      return;
    }

    errEl.classList.add('d-none');

    // Save current user to sessionStorage (used by nav.js on all auth pages)
    sessionStorage.setItem('currentUser', JSON.stringify(matchedUser));

    // Navigate to profile
    window.location.href = 'profile.html';
  });

  document.getElementById('btn-cancel').addEventListener('click', () => {
    window.location.href = 'index.html';
  });

});
