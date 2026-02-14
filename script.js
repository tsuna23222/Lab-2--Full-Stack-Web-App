// ============================================================
//  script.js — Main JavaScript
//  Full-Stack App (Student Build) — Phase 1
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
  console.log('✅ script.js loaded.');

  // ── App State ──────────────────────────────────────────────
  const appState = {
    currentUser: null,  // { name, email, role, verified }
  };


  // ── Helper: Navigate to a Page ────────────────────────────
  // Removes "active" from all .page sections, adds it to the target.
  // Works with the CSS: .page { display:none } / .page.active { display:block }
  function showPage(pageId) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    const target = document.getElementById('page-' + pageId);
    if (target) {
      target.classList.add('active');
    } else {
      console.warn(`showPage: no element found with id "page-${pageId}"`);
    }
  }


  // ── Helper: Update Body Classes ───────────────────────────
  // Body classes control visibility of nav links via CSS:
  //   not-authenticated  → .role-logged-in hidden
  //   authenticated      → .role-logged-out hidden
  //   is-admin           → .role-admin visible
  function updateBodyClasses() {
    const body = document.body;
    const user = appState.currentUser;

    if (user) {
      body.classList.remove('not-authenticated');
      body.classList.add('authenticated');
      body.classList.toggle('is-admin', user.role === 'admin');
    } else {
      body.classList.add('not-authenticated');
      body.classList.remove('authenticated', 'is-admin');
    }
  }


  // ── Helper: Update Navbar Username ────────────────────────
  function updateNavUsername() {
    const el = document.getElementById('nav-username');
    if (el && appState.currentUser) {
      el.textContent = appState.currentUser.name;
    }
  }


  // ── Helper: Update Profile Page ───────────────────────────
  function updateProfilePage() {
    const user = appState.currentUser;
    if (!user) return;
    document.getElementById('profile-name').textContent  = user.name;
    document.getElementById('profile-email').textContent = user.email;
    document.getElementById('profile-role').textContent  =
      user.role.charAt(0).toUpperCase() + user.role.slice(1);
  }


  // ── Global Navigation: data-page links ────────────────────
  // Any element with data-page="xxx" will navigate to that page on click.
  // This covers navbar links, Cancel buttons, Get Started, etc.
  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('[data-page]');
    if (trigger) {
      e.preventDefault();
      showPage(trigger.dataset.page);
    }
  });


  // ── Logout ────────────────────────────────────────────────
  document.getElementById('btn-logout').addEventListener('click', (e) => {
    e.preventDefault();
    appState.currentUser = null;
    updateBodyClasses();
    showPage('home');
    console.log('🔓 Logged out.');
  });


  // ── Register ──────────────────────────────────────────────
  document.getElementById('btn-signup').addEventListener('click', () => {
    const firstName = document.getElementById('reg-firstname').value.trim();
    const lastName  = document.getElementById('reg-lastname').value.trim();
    const email     = document.getElementById('reg-email').value.trim();
    const password  = document.getElementById('reg-password').value;
    const errEl     = document.getElementById('reg-error');

    // Basic validation
    if (!firstName || !lastName || !email || !password) {
      errEl.textContent = 'All fields are required.';
      errEl.classList.remove('d-none');
      return;
    }
    errEl.classList.add('d-none');

    // Store the pending user (not yet verified)
    // Phase 2 will use localStorage; for now we store in memory
    appState.pendingUser = { name: `${firstName} ${lastName}`, email, password, role: 'user', verified: false };

    // Show the verify email page and populate the email display
    document.getElementById('verify-email-display').textContent = email;
    document.getElementById('verify-success-msg').classList.add('d-none');
    showPage('verify-email');
    console.log(`📧 Verification email "sent" to ${email}`);
  });


  // ── Verify Email ──────────────────────────────────────────
  document.getElementById('btn-simulate-verify').addEventListener('click', () => {
    if (appState.pendingUser) {
      appState.pendingUser.verified = true;
    }
    // Show success message
    document.getElementById('verify-success-msg').classList.remove('d-none');
    console.log('✅ Email verified (simulated).');

    // Auto-navigate to login after short delay
    setTimeout(() => showPage('login'), 1200);
  });


  // ── Login ─────────────────────────────────────────────────
  document.getElementById('btn-login').addEventListener('click', () => {
    const email    = document.getElementById('login-email').value.trim();
    const password = document.getElementById('login-password').value;
    const errEl    = document.getElementById('login-error');

    // Built-in admin account for testing
    const builtInAdmin = { name: 'Admin User', email: 'admin@example.com', password: 'admin123', role: 'admin', verified: true };

    // Check against built-in admin or pending registered user
    let matchedUser = null;
    if (email === builtInAdmin.email && password === builtInAdmin.password) {
      matchedUser = builtInAdmin;
    } else if (
      appState.pendingUser &&
      appState.pendingUser.email === email &&
      appState.pendingUser.password === password
    ) {
      if (!appState.pendingUser.verified) {
        errEl.textContent = 'Please verify your email before logging in.';
        errEl.classList.remove('d-none');
        return;
      }
      matchedUser = appState.pendingUser;
    }

    if (!matchedUser) {
      errEl.textContent = 'Invalid email or password.';
      errEl.classList.remove('d-none');
      return;
    }

    errEl.classList.add('d-none');
    appState.currentUser = matchedUser;
    updateBodyClasses();
    updateNavUsername();
    updateProfilePage();
    showPage('profile');
    console.log(`🔐 Logged in as ${matchedUser.name} (${matchedUser.role})`);
  });


  // ── New Request Modal ─────────────────────────────────────
  const requestModal = new bootstrap.Modal(document.getElementById('requestModal'));

  document.getElementById('btn-new-request').addEventListener('click', () => {
    requestModal.show();
  });

  // Add item row inside modal
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

  // Remove item row (event delegation)
  document.getElementById('req-items-list').addEventListener('click', (e) => {
    if (e.target.classList.contains('remove-item')) {
      e.target.closest('.req-item-row').remove();
    }
  });


  // ── Employee Form Toggle ──────────────────────────────────
  document.getElementById('btn-add-employee').addEventListener('click', () => {
    document.getElementById('employee-form-card').classList.remove('d-none');
  });
  document.getElementById('btn-cancel-employee').addEventListener('click', () => {
    document.getElementById('employee-form-card').classList.add('d-none');
  });


  // ── Account Form Toggle ───────────────────────────────────
  document.getElementById('btn-add-account').addEventListener('click', () => {
    document.getElementById('account-form-card').classList.remove('d-none');
  });
  document.getElementById('btn-cancel-account').addEventListener('click', () => {
    document.getElementById('account-form-card').classList.add('d-none');
  });


  // ── DEV HELPER: Simulate Login from Console ───────────────
  // Usage: simulateLogin('admin') | simulateLogin('user') | simulateLogin()
  window.simulateLogin = function(role) {
    if (!role) {
      appState.currentUser = null;
    } else {
      appState.currentUser = {
        name:     role === 'admin' ? 'Admin User' : 'Regular User',
        email:    role === 'admin' ? 'admin@example.com' : 'user@example.com',
        role:     role,
        verified: true,
      };
    }
    updateBodyClasses();
    updateNavUsername();
    if (appState.currentUser) updateProfilePage();
    showPage(role ? 'profile' : 'home');
    console.log(`🔐 Simulated login as: ${role || 'guest'}`);
  };


  // ── Initialization ────────────────────────────────────────
  updateBodyClasses();   // apply correct body classes
  showPage('home');      // start on home page
});